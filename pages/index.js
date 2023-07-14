import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { DateTime } from 'luxon';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [txt, setTxt] = useState("");

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
          <LogViewer txt={txt}/>
        </div>
      </main>
    </>
  )
}

function LogViewer({txt}) {
  const [marks, setMarks] = useState({});
  const [sel, setSel] = useState("");
  const [mx, setMx] = useState(100);

  if(!txt) return (<div></div>);

  const orig = txt.split(/[\r\n]+/g);
  let prev = <div className={styles.prev}>0 left</div>;
  let start = 0;
  let lines = orig;
  if(orig.length > mx) {
    start = orig.length-mx;
    lines = orig.slice(start, orig.length);
    prev = <div className={styles.prevactive} onClick={() => setMx(mx + 50)}>&#8593;...{start} more</div>
  }

  const loglines = parseLog(start, lines, marks, sel);

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
        <div className={styles.count}>{lines.length} shown</div>
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
  const headercontent = ll.date || ll.level;
  return (
    <div className={`${styles.logline} ${levelstyle} ${markstyle}`}>

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

function parseLog(start, lines, marks, sel) {
  lines = lines.map(l => {
    return {
      line_left: l.trim(),
      curr_chunk: null,
    }
  });
  const loglines = [];
  const new_ll_1 = () => {
    return {
      meta: [],
      date: null,
      level: null,
      source: null,
      msg: null,
    };
  }
  let curr = new_ll_1();

  lines.forEach(l => {
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
      loglines.push(curr);
    } else if(l.line_left) {
      loglines[loglines.length - 1].msg += '\n' + l.line_left;
    }
    curr = new_ll_1();
  });

  loglines.forEach((ll,i) => {
    ll.num = start + i;
    ll.mark = marks[ll.num];
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
