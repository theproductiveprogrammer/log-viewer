import { DateTime } from 'luxon';
import { cleanHtml, rx_ify_or_str } from './util.js';

/*    problem/
 * we are given a large log text that we need to
 * process into a suitably parsed structure:
 *    log.lines = [ { num:1, txt, nfo }, { num:2, txt, nfo },... ]
 * where:
 *    num - line number starting from 1
 *    txt - original text
 *    nfo - parsed information
 * the parsing process can be expensive and so we
 * don't want to keep doing it.
 *    way/
 * we split the text into lines and keep the first text
 * and last number of the already parsed lines in an `_optim`
 * field so that we can compare it with the new text.
 */
export default async function makeLog(name, transformers, txt, log) {
  log.txt = txt;
  let lines = txt2Lines(txt);
  lines = transform(transformers, lines);
  if(!lines || !lines.length) {
    log.lines = [];
    log._optim = null;
    return;
  }

  let start_num = 1;
  if(log._optim) {
    if(log._optim.first == lines[0].txt &&
      log._optim.last <= lines[lines.length-1].num) {
      start_num = log._optim.last + 1;
    }
  }
  const optim = log._optim || { first: lines[0].txt };
  log._optim = null;

  for(let i = start_num - 1;i < lines.length;i++) {
    if(((i - (start_num - 1)) % 500) == 0) {
      await new Promise(res => setTimeout(() => res()));
    }
    if(((i - (start_num - 1)) % 10000) == 0) {
      console.log(`Parsing ${name}...   ${i}`);
    }
    const l = lines[i];
    const nfo = parseLine(l);
    const prev = log.lines.length ? log.lines[log.lines.length - 1] : null;
    if(!i || hasNfo(nfo)) {
      if(prev && prev.nfo.date && nfo.date) {
        nfo.after = nfo.date.diff(prev.nfo.date, ["hours", "minutes", "seconds", "milliseconds"]).toObject();
      }
      log.lines.push({
        num: l.num,
        txt: l.txt,
        nfo,
      });
      optim.last = l.num;
    } else if(nfo.msg) {
      prev.nfo.msg += '\n' + nfo.msg;
      prev.txt += '\n' + l.txt;
    }
  }

  xtractXcptions(log);

  log._optim = optim;
  return log;
}

/*    way/
 * check if the line message looks like an exception.
 * If it does, spit it into the key " at XXX" and
 * other lines.
 */
function xtractXcptions(log) {
  if(!log || !log.lines) return;
  log.lines.forEach(l => {
    if(l.nfo.level != 'ERROR' && l.nfo.level !== 'EXCEPTION' && l.nfo.level !== 'WARN' && l.nfo.level !== 'WARNING') return;
    const txt = l.nfo.msg;
    if(txt.indexOf('\n') === -1) return;
    if(txt.search(/exception|error/i) === -1) return;

    const p = txt.split(/[\r\n \t]*at /g);
    if(p.length > 1) {
      l.nfo.msg = cleanHtml(p.shift());
      l.nfo.exception = p.map(l => {
        let ndx = l.search(/[\r\n]/);
        if(ndx == -1) return { at: "at " + l, txt: "" };
        else return { at: l.substring(0, ndx), txt: l.substring(ndx+1) };
      });
    }
  });
}

/*    way
 * split the text into lines and gather them,
 * joining what obviously look like continuations
 * (lines starting with whitespace, or tiny lines).
 */
export function txt2Lines(txt) {
  if(!txt) return null;
  txt = txt.split(/[\r\n]+/g)
  const lines = [];
  for(let i = 0;i < txt.length;i++) {
    const c = txt[i];
    if(!c) continue;
    if(lines.length && is_probably_attached_to_previous_line(c)) {
      const last_ = lines[lines.length-1].txt;
      lines[lines.length-1].txt += "\n" + c;
    } else {
      lines.push({
        txt: c,
        num: i + 1,
      });
    }
  }
  return lines;

  function is_probably_attached_to_previous_line(txt) {
    return txt.length < 8 || txt.startsWith(" ") || txt.startsWith("\t");
  }
}

function parseLine(line) {
  const curr = {
    json: null,
    meta: [],
    date: null,
    level: null,
    source: null,
    msg: null,
  };

  const l = {
    line_left: line.txt,
    curr_chunk: null,
  };
  while(true) {
    if(l.line_left.startsWith("{") || l.line_left.startsWith("[")) {
      set_curr_json(l, 0, curr);
      if(curr.json) break;
    }
    if(!curr.date) curr.date = get_date_1(l);
    const chunk = get_chunk_1(l);
    if(!chunk && !l.line_left) {
      l.line_left = curr.meta.join(" ");
      curr.meta = [];
      break;
    }
    if(!chunk) continue;
    if(curr.level) {
      if(l.sep) curr.source = chunk;
      else l.line_left = chunk + " " + l.line_left;
      break;
    }
    if(/^(INFO|DEBUG|TRACE|WARN|ERROR)$/.test(chunk)) {
      curr.level = chunk;
      continue;
    }
    curr.meta.push(chunk);
  }
  if(!curr.json) {
    const possibleJsonIndex = l.line_left.indexOf("{");
    set_curr_json(l, possibleJsonIndex, curr);
  }
  if(!curr.json) {
    const possibleJsonIndex = l.line_left.indexOf("[");
    set_curr_json(l, possibleJsonIndex, curr);
  }
  logline_from_json(curr);
  curr.msg = l.line_left;
  return curr;

  function set_curr_json(l, possibleJsonIndex, curr) {
    if(possibleJsonIndex == -1) return;
    if(!l.line_left) return;
    try {
      if(possibleJsonIndex) {
        const possibleJson = l.line_left.substring(possibleJsonIndex).trim();
        curr.json = JSON.parse(possibleJson);
        l.line_left = l.line_left.substring(0, possibleJsonIndex);
      } else {
        curr.json = JSON.parse(l.line_left);
        l.line_left = null;
      }
    } catch(e) { /* */ }
  }

  function get_date_1(l) {
    const l_ = l.line_left;
    let sz = l_.length;
    const m = l.line_left.match(/[\r\n]/);
    if(m) sz = m.index;
    if(sz > 35) sz = 35
    while(sz > 8) {
      const dt = getDate(l_.substring(0, sz));
      if(dt) {
        l.curr_chunk = null;
        l.line_left = l.line_left.substring(sz).trim();
        return dt;
      }
      sz--;
    }
  }

  function get_chunk_1(l) {
    l.sep = null;
    if(!l.line_left) return null;
    if(l.line_left.startsWith("\n") || l.line_left.startsWith("\r")) {
      l.curr_chunk = l.line_left;
      l.line_left = "";
      return l.curr_chunk;
    }

    let rx = /^[ \t]*\[/
    let m = l.line_left.match(rx);
    if(m) {
      const ndx = l.line_left.indexOf(']');
      if(ndx != -1) {
        l.curr_chunk = l.line_left.substring(m[0].length, ndx).trim();
        l.line_left = l.line_left.substring(ndx+1).trim();
        l.sep = '[]';
        return l.curr_chunk;
      }
    }

    rx = /[ \t:-]+/;
    m = l.line_left.match(rx);
    if(!m) {
      l.curr_chunk = l.line_left;
      l.line_left = "";
    } else {
      l.curr_chunk = l.line_left.substring(0, m.index);
      const sep = m[0].trim();
      if(sep.length) l.sep = sep;
      l.line_left = l.line_left.substring(m.index + m[0].length);
    }
    return l.curr_chunk;
  }

  function logline_from_json(curr) {
    const j = curr.json;
    if(!j) return;

    if(!curr.date && j.timestamp) curr.date = getDate(j.timestamp);
    if(!curr.date && j.ts) curr.date = getDate(j.ts);
    if(!curr.date && j.tm) curr.date = getDate(j.tm);
    if(!curr.date && j.date) curr.date = getDate(j.date);
    if(!curr.date && j.datetime) curr.date = getDate(j.datetime);

    if(!curr.level && j.level) curr.level = j.level;
    if(!curr.level && j.error) curr.level = "ERROR";

    if(!curr.source && j.source) curr.source = j.source;

  }

}

function getDate(s) {
  if(typeof s === "number") {
    let dt = DateTime.fromMillis(s);
    if(dt && !dt.invalid) return dt;
    dt = DateTime.fromSeconds(s);
    if(dt && !dt.invalid) return dt;
    return;
  }

  if(typeof s !== "string") return;

  const converters = [
    DateTime.fromISO,
    DateTime.fromRFC2822,
    DateTime.fromHTTP,
    DateTime.fromSQL,
  ];

  for(let i = 0;i < converters.length;i++) {
    const dt = converters[i](s);
    if(!dt.invalid) return dt;
  }
}

export function hasNfo(nfo) {
  if(!nfo) return false;
  return nfo.json || nfo.date || nfo.level || nfo.sources || nfo.meta.length;
}


export function transform(transformers, lines) {
  if(!transformers || !lines) return lines;
  let i = 0;
  return lines.map(l => {
    let txt = l.txt;
    if(txt) {
      transformers.forEach(t => {
        if(!t.match || txt.match(t.match)) {
          txt = txt.replace(t.find, t.replace);
        }
      });
    }
    l.txt = txt;
    return l;
  });
}

/*    understand/
 * We get transformers as a list of tranformations to
 * be applied to each log line:
 *    [ {
 *        match: <reg exp>,
 *        find: <reg exp>,
 *        replace: "replacement string"
 *      }
 *      {...
 *    ]
 *
 * The problem is we get the expressions as strings as
 * they come over the wire and we need to transform the
 * match and find into regular expressions.
 *      way/
 * To do this, we check if the string is in the form
 *    "/regexp/flags"
 * or simply in the form
 *    "regexp"
 * For the first, we create a `new RegExp()` with the flags
 * and for the second we just create with the default flags.
 */
export function str2rx(str) {
  if(!str) return;
  if(str.startsWith('/')) {
    const ndx = str.lastIndexOf('/');
    if(ndx) {
      return new RegExp(str.substring(1, ndx), str.substring(ndx+1));
    }
  }
  return new RegExp(str);
}

export function rx_ify(transformers) {
  const ret = [];
  transformers.forEach(t => {
    try {
      const transform = { match: str2rx(t.match), find: str2rx(t.find), replace: t.replace };
      if(!transform.replace) {
        transform.replace = "";
      }
      if(!transform.find) {
        console.error("Invalid or missing `find:` key", t);
        return;
      }
      ret.push(transform);
    } catch(e) {
      console.error('Failed to parse regular expression', t);
    }
  });
  return ret;
}

/*    way/
 * walk backwards through the log lines, incrementing
 * the numlines that have not been filtered out, until
 * we reach on (or before) the given number.
 */
export function adjustNumlinesTill(num, log) {
  try {
    num = parseInt(num);
  } catch(e) { /* ignore */ }
  if(isNaN(num)) return;
  if(num < 1) return;
  if(!log.lines) return;

  let numlines = 1;
  for(let i = log.lines.length-1;i >= 0;i--) {
    const line = log.lines[i];
    if(line.num <= num) break;
    if(!line.x) numlines++;
  }

  log.view.numlines.set(numlines);
}

/*    way/
 * walk backwards through the log lines, gathering `numlines`
 * items that have not been filtered out
 */
export function applyNumlines(log, numlines) {
  let display = numlines;
  if(display < 1) display = 1;

  const ret = [];
  if(log.lines) {
    for(let i = log.lines.length-1;i >= 0;i--) {
      const line = log.lines[i];
      if(line.x) continue;
      ret.unshift(line);
      if(ret.length == display) break;
    }
  }
  return ret;
}

/*    way/
 * walk through the log lines, applying filters
 * until one filters it out.
 */
export function applyFilters(log, filters) {
  if(!log.lines) return;
  log.lines.forEach(line => {
    delete line.x;
  });
  if(!filters) return;
  log.lines.forEach(line => {
    if(!line.txt) {
      line.x = true;
      return;
    }
    for(let i = 0;i < filters.length;i++) {
      const f = filters[i];
      if(f.type == '-') {
        if(f.rx.test(line.txt)) {
          line.x = true;
          break;
        }
      } else {
        if(!f.rx.test(line.txt)) {
          line.x = true;
          break;
        }
      }
    }
  });
}

export function removeFilter(log, filters, f) {
  console.log(filters)
  log.view.filters.set(filters.filter(filt => filt.id != f.id));
}

export function addFilter(type, val, log) {
  const rx = rx_ify_or_str(val);
  if(!rx) return;
  log.view.filters.update(v => {
    const f = { type, rx, val, id: v.length+1 };
    return [...v, f ];
  });
}

export function setSearch(val, log) {
  log.view.search.set(rx_ify_or_str(val));
}


/*    way/
 * walk through the log lines, applying search
 * or clearing it.
 */
export function applySearch(log, search) {
  if(!log.lines) return;
  log.lines.forEach(line => {
    if(search) line.found = search.test(line.txt);
    else delete line.found;
  });
}

