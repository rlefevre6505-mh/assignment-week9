import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import styles from "./home.module.css";

export default async function HomePage() {
  const user = await currentUser();

  if (!user)
    return (
      <>
        <div classsname="flex flex-col text-white">
          <h2 className={styles.h2}>Welcome to Gig Log!</h2>
          <p>Please sign in or sign up to continue</p>
          <div className={styles.links}>
            <Link className={styles.link} href="/sign-in">
              Sign In
            </Link>
            <Link className={styles.link} href="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div classsname="flex flex-col center text-white">
        <p>Welcome {user?.username}!</p>
        <div className={styles.links}>
          <Link className={styles.link} href="/profile">
            Continue to my profile
          </Link>
          <Link className={styles.link} href="/gigs">
            View gigs
          </Link>
        </div>
        <SignOutButton>
          <button>Sign out</button>
        </SignOutButton>
      </div>
    </>
  );
}
