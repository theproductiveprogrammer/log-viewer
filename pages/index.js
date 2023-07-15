import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import { useRouter } from 'next/router'

import styles from '@/styles/Home.module.css';

import LogViewer from '../components/LogViewer.js';

export default function Home() {
  const [txt, setTxt] = useState("");
  const [plain, setPlain] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const logurl = router.query.l;
    if(logurl) {
      setLoading(true);
      fetch(logurl)
        .then(async res => {
          setLoading(false);
          if(!res.ok) {
            throw new Error("Network response was not ok");
          }
          const txt = await res.text();
          setTxt(txt);
        })
        .catch(err => {
          setLoading(false);
          console.error(err);
        });
    }

    const isplain = router.query.q;
    if(isplain) setPlain(true);
    else setPlain(false);

  }, [router]);

  if(loading) return <div class={styles.loading}>Loading...</div>;

  if(plain) return (
      <main className={`${styles.plain} ${inter.className}`}>
        <LogViewer title="Log Viewer" txt={txt}/>
        <textarea className={styles.plainentry} value={txt} onChange={e => setTxt(e.target.value)}></textarea>
      </main>
  );

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
          <LogViewer title="Log Viewer" txt={txt}/>
        </div>
      </main>
    </>
  )
}
