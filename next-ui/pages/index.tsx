import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Computer Science and Maths</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Computer Science and Maths</h1>

        <p className={styles.description}>
          Contains interactive examples of concepts from Computer Science A
          Level.
        </p>

        <h2>Computer Science</h2>
        <div className={styles.grid}></div>

        <h2>Maths</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>
              <Link href="/maths/divisibility">Divisibility Rules</Link>
            </h3>
            <p>
              Break down methods for determining the divisibility of numbers.
            </p>
          </div>
        </div>
        <h2>Fun</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>
              <Link href="/fun/tom-binary">Tom Binary</Link>
            </h3>
            <p>Tom's custom method of representing with binary.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>Created by Joe Sharp</footer>
    </div>
  );
}
