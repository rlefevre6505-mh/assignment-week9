import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./new-gig.module.css";

// render form to intsert post data to table

// we also need to insert the userID from the user's table or use the auth() function from clerk to get the userID

export default async function newPostPage() {
  const user = await currentUser();

  const queryUsers = await db.query(`SELECT username FROM users`);
  const users = queryUsers.rows;
  const userArr = [];
  users.map((u) => {
    if (u.username.includes(user.username)) {
      userArr.push(user.username);
    } else {
      null;
    }
  });
  if (userArr.length === 0) {
    redirect(`/:username/user-details-form`);
  }

  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      title: rawFormData.get("title"),
      date: rawFormData.get("date"),
      location: rawFormData.get("location"),
      poster: user.username,
    };

    db.query(
      `INSERT INTO gigs (title, date, location, poster) VALUES ($1, $2, $3, $4)`,
      [
        formValues.title,
        formValues.date,
        formValues.location,
        formValues.poster,
      ],
    );
    revalidatePath("/gigs");
    redirect(`/gigs/`);
  }

  const today = new Date();
  // const day = today.getDate();
  // const month = today.getMonth() + 1;
  // const year = today.getFullYear();
  // let currentDate = `${day}/${month}/${year}`;

  return (
    <>
      <h1 className={styles.h1}>Add a new post</h1>
      <form className={styles.form} action={handleSubmit}>
        <label
          htmlFor="title"
          placeholder="Name of band or festival"
          className={styles.label}
        >
          Title:{" "}
        </label>
        <input
          type="text"
          maxLength="60"
          className={styles.input}
          name="title"
        ></input>
        <label htmlFor="date" className={styles.label}>
          Date:{" "}
        </label>
        <input
          className={styles.input}
          name="date"
          type="date"
          max={today} // this doesnt work...
        ></input>
        <label htmlFor="location" className={styles.label}>
          Location:{" "}
        </label>
        <input
          type="text"
          maxLength="60"
          className={styles.input}
          name="location"
          placeholder="Town or city name"
        ></input>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </>
  );
}
