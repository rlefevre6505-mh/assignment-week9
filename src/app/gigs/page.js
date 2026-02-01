import styles from "./gigs.module.css";
import { db } from "@/utils/dbconnection";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function GigsPage({ searchParams }) {
  const query = await db.query(`SELECT * FROM gigs`);
  const gigs = query.rows;
  const queryGoing = await db.query(`SELECT * FROM users_going`);
  const attendees = queryGoing.rows;
  const userName = await currentUser();

  const queryUsers = await db.query(`SELECT username FROM users`);
  const users = queryUsers.rows;
  const userArr = [];
  users.map((user) => {
    if (user.username.includes(userName.username)) {
      userArr.push(userName.username);
    } else {
      null;
    }
  });
  if (userArr.length === 0) {
    redirect(`/:username/user-details-form`);
  }

  // TODO: implement sorting by title of date

  return (
    <>
      <h2 className={styles.h2}>All Gigs</h2>
      <div className={styles.gigs}>
        {gigs.map((gig, i) => {
          const yearString = gig.date.toString().slice(11, 15);
          const monthString = gig.date.toString().slice(4, 7);
          const dayString = gig.date.toString().slice(8, 10);
          const dateString = `${yearString} - ${dayString} ${monthString}`;
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
                    href={`/gigs/delete-going/${gig.id}`}
                  >
                    Remove your ~going~ status
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
