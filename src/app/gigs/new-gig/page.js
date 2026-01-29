// render form to intsert post data to table

// we also need to insert the userID from the user's table or use the auth() function from clerk to get the userID

export default function newPostPage() {
  function handleSubmit() {
    "use server";
    const formValues = {
      title: formData.get("title"),
      date: formData.get("date"),
      location: formData.get("location"),
      poster: `get from querystring`,
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

  return (
    <>
      <h1>Add a new post</h1>
      <form action={handleSubmit}></form>

      <label htmlFor="title"></label>
      <input anme="title"></input>

      <label htmlFor="date"></label>
      <input name="date"></input>

      <label htmlFor="location"></label>
      <input name="location"></input>
    </>
  );
}
