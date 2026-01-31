import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./edit-going.module.css"

export default async function EditGoingPage({ params }) {
  const user = await currentUser();
  const userName = user.username;
  const slug = await params;
  const gigID = slug.gig;

  const query = await db.query(
    `SELECT going FROM users_going WHERE gig_id = $1 AND username = $2`,

    [gigID, userName],
  );
  const status = query.rows;
  console.log(status);
  console.log(gigID, userName);

  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      going: rawFormData.get("going"),
    };
    const query = await db.query(
      `UPDATE users_going SET going='${formValues.going}' WHERE gig_id = $1 AND username = $2`,
      [gigID, userName],
    );
    revalidatePath("/gigs");
    redirect(`/gigs`);
  }

  return (
    <>
      <h2 className={styles.h2}>{userName} - Update your ~going~ status for this gig</h2>
      <form className={styles.form} action={handleSubmit}>
        <label htmlFor="going">Your new ~going~ status:</label>
        <select className={styles.select} name="going">
          <option selected default disabled>
            Please select an option
          </option>
          <option value="going">going</option>
          <option value="maybe going">maybe going</option>
        </select>
        <button className={styles.button} type="submit">Submit</button>
      </form>
    </>
  );
}
