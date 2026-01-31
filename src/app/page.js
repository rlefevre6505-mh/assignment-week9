import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import styles from "./home.module.css";

export default async function HomePage() {
  const user = await currentUser();

  if (!user)
    return (
      <>
        <div classsname={styles.main}>
          <h2 className={styles.h2}>Welcome to Gig Log!</h2>
          <p className={styles.welcome}>Please sign in or sign up to continue</p>
          <div className={styles.links}>
            <Link className={styles.button} href="/sign-in">
              Sign In
            </Link> 
            <Link className={styles.button} href="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div classsname={styles.main}>
        <h2 className={styles.h2}>Welcome {user?.username}</h2>
        <div className={styles.links}>
          <Link className={styles.button} href="/profile/:username">
            Continue to my profile
          </Link>
                  <SignOutButton>
          <button className={styles.button}>Sign out</button>
        </SignOutButton>
        </div>

      </div>
    </>
  );
}
