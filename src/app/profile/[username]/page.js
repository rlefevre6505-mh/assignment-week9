import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import styles from "./profile.module.css";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await currentUser();
  const queryProfile = await db.query(
    `SELECT * FROM users WHERE username = $1`,
    [user.username],
  );
  const data = queryProfile.rows;

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

  const queryGigs = await db.query(`SELECT * FROM gigs`);
  const gigs = queryGigs.rows;
  const queryGoing = await db.query(`SELECT * FROM users_going`);
  const attendees = queryGoing.rows;

  return (
    <>
      <div className={styles.main}>
        <h2 className={styles.h2}>Profile: {user.username}</h2>
        {data.map((datum, i) => {
          const yearString = datum.join_date.toString().slice(11, 15);
          const monthString = datum.join_date.toString().slice(4, 7);
          const dayString = datum.join_date.toString().slice(8, 10);
          const dateString = `${dayString} ${monthString} ${yearString}`;
          console.log(dateString);
          return (
            <div key={`profile${i}`} className={styles.profile}>
              <p className={styles.p}>
                {datum.age} years old, from {datum.location}.
              </p>
              <p className={styles.p}>Joined GigLog on {dateString}</p>
              <div className={styles.p}>
                <p>Bio:</p>
                <p>{datum.bio}</p>
              </div>
              <Link
                className={styles.button}
                href={`/profile/:username/edit-profile`}
              >
                Edit profile
              </Link>
            </div>
          );
        })}
        <h3 className={styles.h3}>My posted gigs:</h3>
        <div className={styles.gigs}>
          {gigs.map((gig, i) => {
            const yearString = gig.date.toString().slice(11, 15);
            const monthString = gig.date.toString().slice(4, 7);
            const dayString = gig.date.toString().slice(8, 10);
            const dateString = `${yearString} - ${dayString} ${monthString}`;
            if (user.username == gig.poster)
              return (
                <div key={`gigpost${i}`} className={styles.gig}>
                  <Dropdown props={gig.id} />
                  <h3 className={styles.title}>{gig.title}</h3>
                  <p className="@apply text-40 text-center mb-4">
                    {gig.location} - {dateString}
                  </p>
                  <div>
                    <h4 className={styles.h4}>Who&apos;s going?</h4>
                    <div className={styles.going}>
                      {attendees.map((attendee, i) => {
                        if (attendee.gig_id === gig.id) {
                          return (
                            <div
                              key={`attendees-div${i}`}
                              className={styles.attendee}
                            >
                              <p>{attendee.username}</p>
                              <p>{`~ ${attendee.going} ~`}</p>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                      <div className={styles.gignav}>
                        <Link
                          className={styles.link}
                          href={`/gigs/add-going/${gig.id}`}
                        >
                          Add a ~going~ status
                        </Link>
                        <Link
                          className={styles.link}
                          href={`/gigs/edit-going/${gig.id}`}
                        >
                          Edit your current ~going~ status
                        </Link>
                        <Link
                          className={styles.link}
                          // add conditional here for if user is already going
                          href={`/gigs/delete-going/${gig.id}`}
                        >
                          Remove your ~going~ status
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
}
