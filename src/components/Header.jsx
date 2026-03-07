import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/images/header_image.jpg"
        alt="a crowd with hands in the air"
        width="600"
        height="100"
        className={styles.header_image}
      ></Image>
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
