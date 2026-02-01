import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./add-going.module.css";

export default async function AddGoingPage({ params }) {
  const user = await currentUser();
  const userName = user.username;
  const slug = await params;
  const gigID = slug.gig;

  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      gig_id: gigID,
      username: userName,
      going: rawFormData.get("going"),
    };
    const query = await db.query(
      `INSERT INTO users_going (gig_id, username, going) VALUES ($1, $2, $3)`,
      [formValues.gig_id, formValues.username, formValues.going],
    );
    revalidatePath("/gigs");
    redirect(`/gigs`);
  }

  return (
    <>
      <div>
        <h2 className={styles.h2}>
          {userName} - Add a ~going~ status for this gig{" "}
          <i>(you can change this later)</i>
        </h2>

        <form action={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="going">
            Your new ~going~ status:
          </label>
          <select className={styles.select} name="going">
            <option defaultValue selected disabled>
              Please select an option
            </option>
            <option value="going">going</option>
            <option value="maybe going">maybe going</option>
          </select>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
