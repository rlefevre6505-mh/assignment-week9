"use client";
import Link from "next/link";
import styles from "./global-error.module.css";

export default function GlobalError({ error, reset }) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className={styles.main}>
          <h2 className={styles.h2}>Something went wrong!</h2>
          <Link className={styles.link} href="/">
            Return to GigLog home page
          </Link>
        </div>
      </body>
    </html>
  );
}
