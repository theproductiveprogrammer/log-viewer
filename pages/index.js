import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

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
  if(!txt) return (<div></div>);
  const loglines = parseLog(txt);
  return (
    <div className={styles.logContainer}>
    {loglines.map(ll => <LogLine ll={ll} />)}
    </div>
  );
}

function LogLine({ll}) {
  return (
    <div className={styles.logLine}>
    {JSON.stringify(ll)}
    </div>
  );
}

function parseLog(txt) {
  const lines = txt.split(/[\r\n]+/g).map(l => {
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

  return loglines;

  function get_date_1(l) {
    const l_ = l.line_left;
    let sz = l_.length;
    while(sz > 0) {
      const dt = new Date(l_.substring(0, sz));
      if(!isNaN(dt.getTime())) {
        l.curr_chunk = null;
        l.line_left = l.line_left.substring(sz).trim();
        return dt;
      }
      sz--;
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
