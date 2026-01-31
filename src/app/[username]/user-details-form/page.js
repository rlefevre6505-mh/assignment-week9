import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import styles from "./user-details-form.module.css"

export default async function UserDetailsFromPage() {
  const user = await currentUser();
  const today = new Date();

  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      username: user.username,
      age: rawFormData.get("age"),
      location: rawFormData.get("location"),
      bio: rawFormData.get("bio"),
      join_date: today,
    };
    try {
      db.query(
        `INSERT INTO users (username, age, location, bio, join_date) VALUES ($1, $2, $3, $4, $5)
    `,
        [
          formValues.username,
          formValues.age,
          formValues.location,
          formValues.bio,
          formValues.join_date,
        ],
      );
    } catch (error) {
      console.error(error);
    }
    redirect("/profile/:username");
  }

  return (
    <>
   
    <h2 className={styles.h2}>Welcome {user.username}, please provide some information for your profile</h2>
    
      <form action={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="age">How old are you?</label>
        <input className={styles.input} type="number" name="age" min="1"></input>
        <label className={styles.label} htmlFor="location">Where are you based?</label>
        <input className={styles.input} name="location"></input>
        <label className={styles.label} htmlFor="bio">Tell everyone a bit about yourself</label>
        <textarea className={styles.area} name="bio" maxLength="99"></textarea>
        <button className={styles.button} type="submit">Continue</button>
      </form>
    </>
  );
}
