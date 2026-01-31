import Link from "next/link";
import styles from "./not-found.module.css"

export default function NotFound() {
  return (
    <div className={styles.main}>
      <h2 className={styles.h2}>Page not found!</h2>
      <Link className={styles.link}
        href="/"
      >
        Return to GigLog homepage
      </Link>
    </div>
  );
}
