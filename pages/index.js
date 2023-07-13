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
      date: null,
      level: null,
      meta: [],
      source: null,
      msg: null,
    };
  }
  let curr = new_ll_1();

  lines.forEach(l => {
    while(true) {
      if(!curr.date) curr.date = get_date_1(l);
      const chunk = get_chunk_1(l);
      break;
    }
    if(l.curr_chunk) {
      if(l.line_left) l.line_left = l.curr_chunk + " " + l.line_left;
      else l.line_left = l.curr_chunk;
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
        l.curr_chunk = l.line_left.substring(0, sz).trim();
        l.line_left = l.line_left.substring(sz).trim();
        return dt;
      }
      sz--;
    }
  }

  function get_chunk_1(l) {
    const ndx = l.line_left.indexOf(/\s/);
    if(ndx != -1) {
      l.curr_chunk = l.line_left.substring(0, ndx).trim();
      l.line_left = l.line_left.substring(ndx).trim();
    }
    return l;
  }
}
