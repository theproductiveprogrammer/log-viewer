import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
          <textarea></textarea>
        </div>
        <div className={styles.display}>
          <div className={styles.title}>Log Viewer</div>
          <LogViewer />
        </div>
      </main>
    </>
  )
}

function LogViewer({txt}) {
  return (
    <div className={styles.logContainer}>
    </div>
  );
}
