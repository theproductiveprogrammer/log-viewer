import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { DateTime } from 'luxon';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [txt, setTxt] = useState("");
  const [search, setSearch] = useState("");

  const search_rx = search ? new RegExp(search, 'i') : null;

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
      <Head>
        <title>Log Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.entry}>
          <p>
            Paste your log below:
          </p>
          <textarea value={txt} onChange={e => setTxt(e.target.value)}></textarea>
        </div>
        <div className={styles.display}>
          <div className={styles.title}>Log Viewer</div>
          <Search search={search} setSearch={setSearch}/>

          <LogViewer search={search} lines={lines}/>
        </div>
      </main>
    </>
  )
}

function Search({search, setSearch}) {
  return (
    <div className={styles.searchcont}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.search}
        type="text"
        placeholder="/search" />
    </div>
  );
}

function LogViewer({lines}) {
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
      <div className={styles.logcontainer} onMouseUp={handleSel} onDoubleClick={handleSel}>
      {loglines.map(ll => <LogLine key={ll.num} ll={ll} mark={mark} sel={sel}/>)}
      </div>
    </>
  );
}

function LogLine({ll,mark,sel}) {
  const markstyle = styles[`mark${(ll.mark || 0) % 3}`];
  const levelstyle = styles[`level-${ll.level}`.toLowerCase()];
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
    if(!sel || sel.length < 5) return txt;
    const regex = new RegExp(escapeRegex(sel), 'gi');

    txt = txt.replace(regex, `<span class="${styles.selected}">$&</span>`);

    return (
      <div dangerouslySetInnerHTML={{ __html: txt }} />
    );
  }


}

function parseLog(lines, marks, sel) {
  const loglines = [];
  const new_ll_1 = () => {
    return {
      meta: [],
      date: null,
      level: null,
      source: null,
      msg: null,
      num: null,
      search_match: false,
    };
  }
  let curr = new_ll_1();

  lines.forEach(line => {
    const l = {
      line_left: line.txt,
      curr_chunk: null,
    };
    while(true) {
      if(!curr.date) curr.date = get_date_1(l);
      const chunk = get_chunk_1(l);
      if(!chunk) {
        l.line_left = curr.meta.join(" ");
        curr.meta = [];
        break;
      }
      if(curr.level) {
        curr.source = chunk;
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
      if(line.search_match) curr.search_match = true;
      loglines.push(curr);
    } else if(l.line_left) {
      const prev = loglines[loglines.length - 1];
      if(line.search_match) prev.search_match = true;
      prev.msg += '\n' + l.line_left;
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
    if(!l.line_left) return null;

    let rx = /^\s*\[/
    let m = l.line_left.match(rx);
    if(m) {
      const ndx = l.line_left.indexOf(']');
      l.curr_chunk = l.line_left.substring(m[0].length, ndx).trim();
      l.line_left = l.line_left.substring(ndx+1).trim();
      return l.curr_chunk;
    }

    rx = /[\s:-]+/;
    m = l.line_left.match(rx);
    if(!m) {
      l.curr_chunk = l.line_left;
      l.line_left = "";
    } else {
      l.curr_chunk = l.line_left.substring(0, m.index);
      l.line_left = l.line_left.substring(m.index + m[0].length);
    }
    return l.curr_chunk;
  }
}
