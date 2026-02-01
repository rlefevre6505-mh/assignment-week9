import Link from "next/link";
import styles from "./Footer.module.css";
import { currentUser } from "@clerk/nextjs/server";

export default async function Footer({ searchParams }) {
  const user = await currentUser();

  if (!user) return <></>;

  return (
    <footer className="@apply fixed bottom-0 inset-x-0 ">
      <nav className="@apply flex flex-row grow justify-evenly items-center w-full h-16 absolute bottom-0 ">
        <Link className={styles.link} href="/profile/:username">
          My Profile
        </Link>
        <Link className={styles.link} href="/gigs">
          View gigs
        </Link>
        <Link className={styles.link} href="/new-gig">
          Add a gig
        </Link>
      </nav>
    </footer>
  );
}
