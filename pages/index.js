import { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })

import styles from '@/styles/Home.module.css';

import LogViewer from '../components/LogViewer.js';

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
          <LogViewer title="Log Viewer" txt={txt}/>
        </div>
      </main>
    </>
  )
}
