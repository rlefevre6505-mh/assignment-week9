import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UserDetailsFromPage() {
  const user = await currentUser();

  const today = new Date();

  function handleSubmit() {
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
    redirect("/rollercoasters");
  }

  return (
    <>
      <h2>Please provide some information for your profile</h2>
      <form action={handleSubmit}>
        <label htmlFor="age">How old are you?</label>
        <input name="age"></input>

        <label htmlFor="location">Where are you based?</label>
        <input name="location"></input>

        <label htmlFor="bio">Tell everyone a bit about yourself</label>
        <input name="bio"></input>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
