import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>GigLog</h1>
      {/* text showing currently logged in usere goes here */}
      <div className={styles.links}>
        {" "}
        <Link className={styles.link} href="/">
          Home
        </Link>
        <Link className={styles.link} href="/about">
          About
        </Link>
      </div>
    </header>
  );
}
