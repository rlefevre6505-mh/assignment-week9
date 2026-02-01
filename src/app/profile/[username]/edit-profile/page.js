"use server";

import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./edit-profile.module.css";

export default async function EditProfilePage() {
  const user = await currentUser();
  const userName = user.username;

  const currentQuery = await db.query(
    `SELECT * FROM users WHERE username = $1`,
    [userName],
  );
  const data = currentQuery.rows[0];
  console.log(data);

  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      age: rawFormData.get("age"),
      location: rawFormData.get("location"),
      bio: rawFormData.get("bio"),
    };
    const query = await db.query(
      `UPDATE users SET age='${formValues.age}', location='${formValues.location}', bio='${formValues.bio}' WHERE username = $1`,
      [userName],
    );
    revalidatePath("http://localhost:3000/profile/:username");
    redirect(`http://localhost:3000/profile/:username`);
  }

  return (
    <>
      <h2 className={styles.h2}>Edit profile for {`${data.username}`}:</h2>
      <form className={styles.form} action={handleSubmit}>
        <label className={styles.label} htmlFor="age">
          How old are you?
        </label>
        <input
          className={styles.input}
          type="number"
          name="age"
          min="1"
          defaultValue={data.age}
        ></input>
        <label className={styles.label} htmlFor="location">
          Where are you based?
        </label>
        <input
          className={styles.input}
          name="location"
          defaultValue={data.location}
        ></input>
        <label className={styles.label} htmlFor="bio">
          Tell everyone a bit about yourself
        </label>
        <textarea
          className={styles.area}
          name="bio"
          maxLength="99"
          defaultValue={data.bio}
        ></textarea>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </>
  );
}
