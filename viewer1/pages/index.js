import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import { useRouter } from 'next/router'

import styles from '@/styles/Home.module.css';

import LogViewer from '../components/LogViewer.js';

export default function Home() {
  const [txt, setTxt] = useState("");
  const [canRefresh, setRefresh] = useState(false);
  const [plain, setPlain] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const logurl = router.query.l;
    if(logurl) {
      setLoading(true);
      fetch(logurl)
        .then(async res => {
          if(!res.ok) {
            setLoading(false);
            throw new Error("Network response was not ok");
          }
          const txt = await res.text();
          setLoading(false);
          setTxt(txt);
          setRefresh(true);
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

  if(loading) return <div className={styles.loading}>Loading...</div>;

  const refresh = () => router.reload();

  if(plain) return (
      <main className={`${styles.plain} ${inter.className}`}>
        <LogViewer title="Log Viewer" refresh={refresh} txt={txt}/>
        <TextArea className={styles.plainentry} setTxt={setTxt} />
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
          <TextArea setTxt={setTxt} />
        </div>
        <div className={styles.display}>
          <LogViewer title="Log Viewer" txt={txt}/>
        </div>
      </main>
    </>
  )
}

function TextArea({className, setTxt}) {
  return (
    <textarea className={className}
    autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
    onPaste={e => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text/plain');
      setTxt(pasted);
      e.target.disabled = true;
      if(pasted.length > 10000) {
        e.target.value=pasted.substring(0, 5000) + "\n...\n\n...\n\n(cut)\n\n...\n\n...\n" + pasted.substring(pasted.length - 5000);
      } else {
        e.target.value=pasted;
      }
    }}
    ></textarea>
  )
}
