import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./delete-going.module.css";

export default async function DeleteGoingPage({ params }) {
  const user = await currentUser();
  const userName = user.username;
  const slug = await params;
  const gigID = slug.gig;

  async function handleSubmit(rawFormData) {
    "use server";

    const formValues = {
      gig_id: gigID,
      username: userName,
    };

    const query = await db.query(
      `DELETE FROM users_going WHERE gig_id = $1 AND username = $2`,
      [formValues.gig_id, formValues.username],
    );
    revalidatePath("/gigs");
    redirect(`/gigs`);
  }

  return (
    <>
      <div>
        <h2 className={styles.h2}>{userName} - Delete your ~going~ status for this gig?</h2>
        <form className={styles.form} action={handleSubmit} className={styles.form}>
          <button className={styles.button}type="submit">
            Click here to confirm removal of ~going~ status
          </button>
        </form>
      </div>
    </>
  );
}
