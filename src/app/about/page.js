import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <>
      <h2 className={styles.h2}>How to use GigLog</h2>
      <div className={styles.main}>
        <p className={styles.p}>
          <b>Sign Up:</b> When you first sign up, you&apos;ll need to fill out
          some basic information for your profile. You&apos;ll be unable to
          access the rest of the app until you do this!
        </p>
        <p className={styles.p}>
          <b>Profile:</b> In your profile you can see you profile info as well
          as edit your info and see the gigs you&apos;ve posted. You can also
          edit details of gigs or delete them from here, as well as see
          who&apos;s goinf to your posted gigs.
        </p>
        <p className={styles.p}>
          <b>View Gigs:</b> Here you can view all gigs, posted by anyone, and
          set a status of ~going~ or ~maybe going~, or delete your ~going~
          status. You can also see which other users are goinf to each gig.
        </p>
        <p className={styles.p}>
          <b>Add A Gig:</b> Here you can post a new gig with details of the
          band/festival name, location and date.
        </p>
      </div>
    </>
  );
}
