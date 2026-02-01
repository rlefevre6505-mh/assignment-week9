"use server";

import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./delete-gig.module.css";

export default async function DeleteGigPage({ params }) {
  const user = await currentUser();
  const userName = user.username;
  const slug = await params;
  const gigID = slug.gig;

  const currentQuery = await db.query(`SELECT * FROM gigs WHERE id = $1`, [
    gigID,
  ]);
  const data = currentQuery.rows[0];
  const yearString = data.date.toString().slice(11, 15);
  const monthString = data.date.toString().slice(4, 7);
  const dayString = data.date.toString().slice(8, 10);
  const dateString = `${yearString} - ${dayString} ${monthString}`;

  async function handleSubmit() {
    "use server";

    const formValues = {
      id: gigID,
      poster: userName,
    };

    const CurrentQuery = db.query(
      `Delete FROM gigs WHERE id = $1 AND poster=$2`,
      [formValues.id, formValues.poster],
    );
    revalidatePath("/profile/:username");
    redirect(`/profile/:username`);
  }
  return (
    <>
      <h2 className={styles.h2}>Delete this gig?</h2>
      <p className={styles.p}>
        ***{" "}
        <i>
          This function is only available when no users have an active ~going~
          status for this gig{" "}
        </i>
        ***
      </p>
      <p
        className={styles.p}
      >{`${data.title} - ${data.location} - ${dateString}`}</p>
      <form className={styles.form} action={handleSubmit}>
        <button type="submit" className={styles.button}>
          Click here to confirm deletion
        </button>
      </form>
    </>
  );
}
