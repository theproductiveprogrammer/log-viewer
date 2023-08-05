import { useState, useEffect } from 'react';
import styles from '@/styles/LogViewer.module.css'

import { DateTime } from 'luxon';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const jsonStyle = Object.assign({}, defaultStyles, {
  container: styles.json_container,
  label: styles.json_label,
  nullValue: styles.json_nullValue,
  stringValue: styles.json_stringValue,
});

function srx(search) {
  if(!search) return null;
  const numberRegex = /^\d+$/;
  if(numberRegex.test(search)) {
    try { return new RegExp(`\\b${search}\\b`, 'i'); } catch(e) { /* ignore */ }
  }
  try { return new RegExp(search, 'i'); } catch(e) { /* ignore */ }
  try { return new RegExp(escapeRegex(search), 'i'); } catch(e) { /* ignore */ }
  return null;
}

function filter(marks, filters, lines) {
  if(!lines || !lines.length || !filters || !filters.length) return lines;
  filters.forEach(f => {
    let ret = [];
    let show_next = false;
    for(let i = 0;i < lines.length;i++) {
      const line = lines[i];
      if(marks[line.num]) {
        ret.push(line);
        show_next = true;
        continue;
      }
      if(show_next) {
        show_next = false;
        ret.push(line);
        continue;
      }
      show_next = false;

      if(f.t === '+') {
        if(line.txt.search(f.s) != -1) ret.push(line);
      } else {
        if(line.txt.search(f.s) == -1) ret.push(line);
      }
    }
    lines = ret;
  });
  return lines;
}

export default function LogViewer({title, txt, refresh}) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [marks, setMarks] = useState({});

  const search_rx = srx(search);

  const lines = filter(marks, filters, txtToLines(txt));
  if(lines) {
    lines.forEach(line => {
      line.search_match = (search_rx && line.txt) ? line.txt.search(search_rx) != -1 : null;
    });
  }

  return (
    <>
      <div className={styles.title}>{title}</div>
      <Search lines={lines} search={search} setSearch={setSearch} filters={filters} setFilters={setFilters}/>
      <Viewer marks={marks} setMarks={setMarks} lines={lines} refresh={refresh}/>
    </>
  );
}

function txtToLines(txt) {
  if(!txt) return null;
  txt = txt.split(/[\r\n]+/g)
  const lines = [];
  for(let i = 0;i < txt.length;i++) {
    const c = txt[i];
    if(!c) continue;
    if(lines.length && is_probably_attached_to_previous_line(c)) {
      const last_ = lines[lines.length-1].txt;
      if(looks_like_start_of_exception_1(last_) && lines.length > 1) {
        const ex = lines.pop().txt + "\n" + c;
        lines[lines.length-1].txt += "\n" + ex;
      } else {
        lines[lines.length-1].txt += "\n" + c;
      }
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

  function looks_like_start_of_exception_1(txt) {
    if(!txt) return false;
    if(is_probably_attached_to_previous_line(txt)) return false;
    if(txt.indexOf('\n') !== -1) return false;
    if(txt.search(/exception|error/i) === -1) return false;
    return true;
  }
}

// from: https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
async function copyToClipboard(textToCopy) {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
}


function Search({lines, search, setSearch, filters, setFilters}) {

  let search_results = 0;
  lines && lines.forEach(line => {
    if(line.search_match) search_results++;
  });
  if(!search_results) search_results = "";

  const srch_class = search ? styles.enabled : styles.disabled;
  const filter_class = filters && filters.length ? styles.enabled : styles.disabled;

  function copySearch() {
    if(!search) return;
    if(!lines) return;
    const results = lines.filter(line => line.search_match).map(line => line.txt);
    if(!results.length) return;
    copyToClipboard(results.join("\n"))
    .then(() => alert('copied to clipboard'))
    .catch(err => console.error(err));
  }

  function filterIn() {
    if(!search) return;
    setFilters(prev => prev.concat({t:'+',s:srx(search)}));
    setSearch("");
  }
  function filterOut() {
    if(!search) return;
    setFilters(prev => prev.concat({t:'-',s:srx(search)}));
    setSearch("");
  }
  function filterPop() {
    setFilters(prev => prev.slice(0, -1));
    setSearch("");
  }

  return (
    <div className={styles.searchcont}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.search}
        type="text"
        placeholder="/search" />
        <div className={styles.srcont}>
          <div className={`${styles.srcopy} ${srch_class}`} onClick={copySearch}>&#128269; {search_results}</div>
          <div className={styles.filter_bar}>
            <div className={`${styles.filter_in} ${srch_class}`} onClick={filterIn}>&#x2713;</div>
            <div className={`${styles.filter_out} ${srch_class}`} onClick={filterOut}>&#120273;</div>
            <div className={`${styles.filter_pop} ${filter_class}`} onClick={filterPop}>&#10226;</div>
          </div>
          <div className={styles.srclear} onClick={() => setSearch("")}>&#9447;</div>
        </div>
    </div>
  );
}

export function Viewer({marks, setMarks, lines, refresh}) {
  const [sel, setSel] = useState("");
  const [mx, setMx] = useState(100);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if(!lines || !lines.length) return;

    let mx_ = mx;
    let i = 0;
    while(lines.length > mx_) {
      i++;
      if(i > 100) return;
      const start = lines.length-mx_;
      const ll = parseLog([lines[start]], {}, "")[0];
      if(ll.date || ll.meta.length || ll.level || ll.source) break;
      mx_ += 1;
    }
    if(mx_ != mx) setMx(mx_);
  }, [mx,lines]);

  function showMore() {
    const start = mx + 1;
    for(let i = start;lines.length > i;i++) {
      const line = lines[lines.length-i];
      if(line.search_match) {
        setMx(i);
        return;
      }
    }
    setMx(mx + 50);
  }

  if(!lines || !lines.length) return (<div></div>);

  let prev = <div className={styles.prev}>0 left</div>;
  let view = lines;
  let start = 0;
  if(lines.length > mx) {
    const start = lines.length - mx;
    view = lines.slice(start, lines.length);
    prev = <div className={styles.prevactive} onClick={showMore}>&#8593;...{start} more</div>
  }

  let loglines = parseLog(view, marks, sel);

  function mark(ll) {
    const curr = marks[ll.num] || 0;
    const num = (curr + 1) % 3;
    setMarks(prev => {
      return {
        ...prev,
        [ll.num]: num,
      };
    });
  }

  function handleSel() {
    if(window.getSelection()) setSel(window.getSelection().toString());
    else setSel("");
  }

  return (
    <>
      {refresh ? <div className={styles.refreshbtn} onClick={refresh}>Refresh</div> : ""}
      <div className={styles.refreshbtn} onClick={() => setCompact(!compact)}>{compact?"Full":"Compact"}</div>
      <div className={styles.counter}>
        {prev}
        <div className={styles.count}>{view.length} shown</div>
      </div>
      <Marks marks={marks} loglines={loglines} />
      <div className={styles.logcontainer} onMouseUp={handleSel} onDoubleClick={handleSel}>
      {loglines.map(ll => <LogLine compact={compact} key={ll.num} ll={ll} mark={mark} sel={sel}/>)}
      </div>
    </>
  );
}

function Marks({loglines, marks}) {
  const types = {};
  for(let k in marks) {
    const curr = types[marks[k]] || 0;
    types[marks[k]] = curr + 1;
  }

  function find_logline_1(k) {
    for(let i = 0;i< loglines.length;i++) {
      const ll = loglines[i];
      if(ll.num == k) return ll;
    }
  }

  function copyMarks(type) {
    const marked = [];
    for(let k in marks) {
      if(marks[k] != type) continue;
      const ll = find_logline_1(k);
      if(ll) marked.push(ll.txt);
    }
    if(marked.length == 0) return;
    copyToClipboard(marked.join("\n"))
    .then(() => alert('copied to clipboard'))
    .catch(err => console.error(err));
  }

  const show = []
  for(let k in types) {
    if(!k || k == '0') continue;
    const markstyle = styles[`mark${k}`] || "";
    show.push((
      <div key={k} className={`${styles.markscopy} ${markstyle}`} onClick={() => copyMarks(k)}>
        <div key={k} className={styles.mark}></div><div>{types[k]}</div>
      </div>
    ));
  }

  return (
    <div className={styles.markscopycont}>
    {show}
    &nbsp;
    </div>
  );
}

function LogLine({ll,mark,sel,compact}) {
  const markstyle = styles[`mark${ll.mark || 0}`] || "";
  const levelstyle = styles[`level-${ll.level}`.toLowerCase()] || "";
  const compactstyle = compact ? styles.compact : "";
  const levelExpand = compact ? 0 : 1;
  let searchstyle = "";
  if(ll.search_match === false) searchstyle = styles.search_result_fail;
  if(ll.search_match === true) searchstyle = styles.search_result_pass;
  const headercontent = ll.date || ll.level;

  return (
    <div className={`${styles.logline} ${compactstyle} ${levelstyle} ${markstyle} ${searchstyle}`}>

      <div className={styles.mark} onClick={() => mark(ll)}></div>

      <div className={styles.logcontent}>
      {!compact && headercontent ? (
        <div className={styles.logline_header}>
          <div className={styles.date}>{ll.date && ll.date.toLocaleString(DateTime.DATETIME_FULL)}</div>
          <div className={styles.level}>{ll.level && `[${ll.level}]`}</div>
        {ll.source ? (
          <div className={styles.source}>{ll.source}: </div>
        ) : ""}
        </div>
      ) : ""}

        <div className={styles.msgcont}>
          <div className={styles.msg}>{hl(ll.msg)}</div>
          {ll.json ? (
            <JsonView data={ll.json} shouldInitiallyExpand={level => level < levelExpand} style={jsonStyle} />
          ): ""}
        </div>

      {compact ? "" : (
        <div className={styles.metacont}>
        {ll.meta.map((meta,i) => <div key={i} className={styles.meta}>{meta}</div>)}
        </div>
      )}
      </div>


    </div>
  );

  function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function hl(txt) {
    if(!txt) return;

    txt = hl_errorstack(txt);

    txt = hl_selected(txt);

    return (
      <div dangerouslySetInnerHTML={{ __html: txt }} />
    );
  }

  function hl_errorstack(txt) {
    if(!ll.level) return txt;
    if(ll.level.toLowerCase() != "error" && ll.level.toLowerCase() != "warn") return txt;
    let lines = txt.split(/[\r\n]/g);
    let found = false;
    lines = lines.map(l => {
      if(l.trim().startsWith("at ")) {
        found = true;
        return `<span class="${styles.err_stack_minim}">${l}</span>`;
      } else {
        return `<span class="${styles.err_stack_hl}">${l}</span>`;
      }
    });
    if(!found) return txt;
    lines.unshift(`<div class="${styles.err_stack_block}">`)
    lines.push(`</div>`);
    return lines.join('\n');
  }

  function hl_selected(txt) {
    if(!sel || sel.length < 5) return txt;
    const regex = new RegExp(escapeRegex(sel), 'gi');

    return txt.replace(regex, `<span class="${styles.selected}">$&</span>`);
  }


}

function parseLog(lines, marks, sel) {
  const loglines = [];
  lines.forEach(line => {
    const curr = line2Logline(line);

    if(loglines.length == 0 || curr.json || curr.date || curr.level || curr.sources || curr.meta.length) {
      curr.num = line.num;
      curr.mark = marks[curr.num];
      if(line.search_match === true) curr.search_match = true;
      if(line.search_match === false && !curr.search_match) curr.search_match = false;
      loglines.push(curr);
    } else if(curr.msg) {
      const prev = loglines[loglines.length - 1];
      if(line.search_match) prev.search_match = true;
      if(line.search_match === true) prev.search_match = true;
      if(line.search_match === false && !prev.search_match) prev.search_match = false;
      prev.msg += '\n' + curr.msg;
      prev.txt += '\n' + curr.txt;
    }
  });

  return loglines;

  function line2Logline(line) {
    const curr = {
      json: null,
      txt: line.txt,
      meta: [],
      date: null,
      level: null,
      source: null,
      msg: null,
      num: null,
      search_match: null,
    };

    const l = {
      line_left: line.txt,
      curr_chunk: null,
    };
    while(true) {
      if(l.line_left.startsWith("{")) {
        try {
          curr.json = JSON.parse(l.line_left);
          l.line_left = null;
          break;
        } catch(e) { /* */ }
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
      const possibleJsonIndex = l.line_left ? l.line_left.indexOf("{") : -1;
      if(possibleJsonIndex > -1) {
        try {
          const possibleJson = l.line_left.substring(possibleJsonIndex).trim();
          curr.json = JSON.parse(possibleJson);
          l.line_left = l.line_left.substring(0, possibleJsonIndex);
        } catch(e) { /* */ }
      }
    }
    logline_from_json(curr);
    curr.msg = l.line_left;
    return curr;
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
