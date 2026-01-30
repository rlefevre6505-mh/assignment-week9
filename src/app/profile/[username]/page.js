// dynamic route with username
// TODO: render user's data
// READ users data from table
// option to render a list of all the user's posts (READ)
//
// clerk user id doesnt exist until user signs up (users can never see a profile page until sign up). User should sign up/sign in immediately on reaching the site! All routes apart from Home should be protected routes
//
// Clerk has 'auth()' which has userID inside (destructure) and all info in 'currentUser()' which also can be destructured - check docs for these (optional chaining can be helpful here incase details are missing)

import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import styles from "./profile.module.css";

export default async function ProfilePage() {
  // db queries to GET info from tables go here
  const user = await currentUser();
  const queryProfile = await db.query(
    `SELECT * FROM users WHERE username = $1`,
    [user.username],
  );
  const data = queryProfile.rows;
  console.log(data[0]);

  const queryGigs = await db.query(`SELECT * FROM gigs`);
  const gigs = queryGigs.rows;
  const queryGoing = await db.query(`SELECT * FROM users_going`);
  const attendees = queryGoing.rows;

  return (
    <>
      <div className={`#`}>
        <h2>Profile: {user.username}</h2>
        {data.map((datum, i) => {
          // const yearString = datum.join_date.toString().slice(11, 15);
          // const monthString = datum.join_date.toString().slice(4, 7);
          // const dayString = datum.join_date.toString().slice(8, 10);
          // const dateString = `${dayString} ${monthString} ${yearString}`;

          return (
            <div key={`profile${i}`}>
              <p>
                {datum.age} years old, from {datum.location}.
              </p>
              <p>Joined GigLog on {`dateString`}</p>
              <p>Bio:</p>
              <p>{datum.bio}</p>
            </div>
          );
        })}
        <h3>{user.username}&apos;s posted gigs</h3>
        <div className={styles.gigs}>
          {gigs.map((gig, i) => {
            const yearString = gig.date.toString().slice(11, 15);
            const monthString = gig.date.toString().slice(4, 7);
            const dayString = gig.date.toString().slice(8, 10);
            const dateString = `${yearString} - ${dayString} ${monthString}`;
            if (user.username === gig.poster)
              return (
                <div key={`gigpost${i}`} className={styles.gig}>
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
