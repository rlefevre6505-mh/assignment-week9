"use server";

import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./edit-gig.module.css";

export default async function EditGigPage() {
  const user = await currentUser();
  const userName = user.username;

  const currentQuery = await db.query(`SELECT * FROM gigs WHERE id = $1`, [
    gig,
  ]);
  const data = currentQuery.rows[0];

  async function handleSubmit(rawFormData) {
    "use server";
    const formValues = {
      title: rawFormData.get("title"),
      date: rawFormData.get("date"),
      location: rawFormData.get("location"),
    };
    const query = await db.query(
      `UPDATE gigs SET title='${formValues.title}', date='${formValues.date}', location='${formValues.location}' WHERE id = $1`,
      [gig],
    );
    revalidatePath("http://localhost:3000/profile/:username");
    redirect(`http://localhost:3000/profile/:username`);
  }

  const currentDate = data.date.toString();
  console.log(currentDate);

  function getDate() {
    const month = currentDate.slice(4, 7);
    if (month === "Jan") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "01";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Feb") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "02";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Mar") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "03";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Apr") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "04";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "May") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "05";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Jun") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "06";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Jul") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "07";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Aug") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "08";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Sep") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "09";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Oct") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "10";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Nov") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "011";
      return `${yearString}-${monthString}-${dayString}`;
    } else if (month === "Dec") {
      const yearString = currentDate.slice(11, 15);
      const dayString = currentDate.slice(8, 10);
      const monthString = "12";
      return `${yearString}-${monthString}-${dayString}`;
    }
  }

  return (
    <>
      <h2 className={styles.h2}>Edit details of this gig:</h2>
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
          defaultValue={data.title}
          required
        ></input>
        <label htmlFor="date" className={styles.label}>
          Date:{" "}
        </label>
        <input
          className={styles.input}
          name="date"
          type="date"
          defaultValue={getDate()}
          required
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
          defaultValue={data.location}
          required
        ></input>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </>
  );
}
