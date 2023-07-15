import { useState, useEffect } from 'react';
import styles from '@/styles/LogViewer.module.css'

import { DateTime } from 'luxon';

export default function LogViewer({title, txt}) {
  const [search, setSearch] = useState("");

  let search_rx = null;
  if(search) {
    try { search_rx = new RegExp(search, 'i'); } catch(e) { /* ignore */ }
    if(!search_rx) {
      try { search_rx = new RegExp(escapeRegex(search), 'i'); } catch(e) { /* ignore */ }
    }
  }

  const lines = txt ? txt.split(/[\r\n]+/g).map((txt,i) => {
    txt = txt.trim();
    if(!txt) return null;

    const search_match = search_rx ? txt.search(search_rx) != -1 : null;

    return {
      txt,
      num: i+1,
      search_match,
    }
  }).filter(l => l) : null;


  return (
    <>
      <div className={styles.title}>{title}</div>
      <Search lines={lines} search={search} setSearch={setSearch}/>
      <Viewer lines={lines}/>
    </>
  );
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


function Search({lines, search, setSearch}) {

  let search_results = 0;
  lines && lines.forEach(line => {
    if(line.search_match) search_results++;
  });

  function copySearch() {
    if(!lines) return;
    const results = lines.filter(line => line.search_match).map(line => line.txt);
    if(!results.length) return;
    copyToClipboard(results.join("\n"))
    .then(() => alert('copied to clipboard'))
    .catch(err => console.error(err));
  }

  return (
    <div className={styles.searchcont}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.search}
        type="text"
        placeholder="/search" />
      {search ? (
        <div className={styles.srcont}>
          <div className={styles.srcopy} onClick={copySearch}>&#128269; {search_results}</div>
          <div className={styles.srclear} onClick={() => setSearch("")}>&#9447;</div>
        </div>
      ) : ""}
    </div>
  );
}

export function Viewer({lines}) {
  const [marks, setMarks] = useState({});
  const [sel, setSel] = useState("");
  const [mx, setMx] = useState(100);

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
    setMarks(prev => {
      return {
        ...prev,
        [ll.num]: curr + 1,
      };
    });
  }

  function handleSel() {
    if(window.getSelection()) setSel(window.getSelection().toString());
    else setSel("");
  }

  return (
    <>
      <div className={styles.counter}>
        {prev}
        <div className={styles.count}>{view.length} shown</div>
      </div>
      <Marks marks={marks} loglines={loglines} />
      <div className={styles.logcontainer} onMouseUp={handleSel} onDoubleClick={handleSel}>
      {loglines.map(ll => <LogLine key={ll.num} ll={ll} mark={mark} sel={sel}/>)}
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
    if(!(k%3)) continue;
    const markstyle = styles[`mark${k % 3}`] || "";
    show.push((
      <div key={k} className={`${styles.markscopy} ${markstyle}`} onClick={() => copyMarks(k)}>
        <div key={k} className={styles.mark}></div><div>{types[k]}</div>
      </div>
    ));
  }

  return (
    <div className={styles.markscopycont}>
    {show}
    </div>
  );
}

function LogLine({ll,mark,sel}) {
  const markstyle = styles[`mark${(ll.mark || 0) % 3}`] || "";
  const levelstyle = styles[`level-${ll.level}`.toLowerCase()] || "";
  let searchstyle = "";
  if(ll.search_match === false) searchstyle = styles.search_result_fail;
  if(ll.search_match === true) searchstyle = styles.search_result_pass;
  const headercontent = ll.date || ll.level;
  return (
    <div className={`${styles.logline} ${levelstyle} ${markstyle} ${searchstyle}`}>

      <div className={styles.mark} onClick={() => mark(ll)}></div>

      <div className={styles.logcontent}>
      {headercontent ? (
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
        </div>

        <div className={styles.metacont}>
        {ll.meta.map((meta,i) => <div key={i} className={styles.meta}>{meta}</div>)}
        </div>
      </div>


    </div>
  );

  function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function hl(txt) {
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
      if(l.startsWith("at ")) {
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
  const new_ll_1 = () => {
    return {
      txt: null,
      meta: [],
      date: null,
      level: null,
      source: null,
      msg: null,
      num: null,
      search_match: null,
    };
  }
  let curr = new_ll_1();

  lines.forEach(line => {
    if(!curr.txt) curr.txt = line.txt;
    else curr.txt += '\n' + line.txt;

    const l = {
      line_left: line.txt,
      curr_chunk: null,
    };
    while(true) {
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
        l.line_left = chunk + " " + l.line_left;
        break;
      }
      if(/^(INFO|DEBUG|TRACE|WARN|ERROR)$/.test(chunk)) {
        curr.level = chunk;
        continue;
      }
      curr.meta.push(chunk);
    }
    if(loglines.length == 0 || curr.date || curr.level || curr.sources || curr.meta.length) {
      curr.msg = l.line_left;
      curr.num = line.num;
      curr.mark = marks[curr.num];
      if(line.search_match === true) curr.search_match = true;
      if(line.search_match === false && !curr.search_match) curr.search_match = false;
      loglines.push(curr);
    } else if(l.line_left) {
      const prev = loglines[loglines.length - 1];
      if(line.search_match) prev.search_match = true;
      if(line.search_match === true) prev.search_match = true;
      if(line.search_match === false && !prev.search_match) prev.search_match = false;
      prev.msg += '\n' + l.line_left;
      prev.txt += '\n' + curr.txt;
    }
    curr = new_ll_1();
  });

  return loglines;

  function get_date_1(l) {
    const l_ = l.line_left;
    let sz = l_.length;
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

    let rx = /^\s*\[/
    let m = l.line_left.match(rx);
    if(m) {
      const ndx = l.line_left.indexOf(']');
      l.curr_chunk = l.line_left.substring(m[0].length, ndx).trim();
      l.line_left = l.line_left.substring(ndx+1).trim();
      l.sep = '[]';
      return l.curr_chunk;
    }

    rx = /[\s:-]+/;
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
}
