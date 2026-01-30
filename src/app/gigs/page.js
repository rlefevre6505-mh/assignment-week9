// render lits of all posts (we could also render who posted them)

import styles from "./gigs.module.css";
import { db } from "@/utils/dbconnection";
// import Link from "next/link";

export default async function GigsPage({ searchParams }) {
  const query = await db.query(`SELECT * FROM gigs`);
  const gigs = query.rows;
  const queryGoing = await db.query(`SELECT * FROM users_going`);
  const attendees = queryGoing.rows;

  // TODO: implement sorting by title of date
  // const queryString = await searchParams;
  //
  // if (queryString.sort === "desc") {
  //   data.sort((a, b) => {
  //     return b.title.localeCompare(a.title);
  //   });
  // } else if (queryString.sort === "asc") {
  //   data.sort((a, b) => {
  //     return a.title.localeCompare(b.title);
  //   });
  // } else if (queryString.sort === "datedesc") {
  //   data.sort((a, b) => {
  //     return new Date(b.date) - new Date(a.date);
  //   });
  // } else if (queryString.sort === "dateasc") {
  //   data.sort((a, b) => {
  //     new Date(a.date) - new Date(b.date);
  //   });
  // }

  return (
    <>
      <h2 className={styles.h2}>All Gigs</h2>

      {/* TODO: set up links for sorting */}
      <div className={`#`}>
        {/* <div className={styles.links1}>
          <Link
            className="@apply ml-4 mb-2 text-var(--color-purple)"
            href="/posts?sort=asc"
          >
            Sort By Title A-Z
          </Link>
          <Link className="@apply ml-4 mb-2" href="/posts?sort=desc">
            Sort By Title Z-A
          </Link>
        </div>
        <div className={styles.links2}>
          <Link className="@apply ml-4 mb-2" href="/posts?sort=dateasc">
            Sort By Newest
          </Link>
          <Link className="@apply ml-4 mb-2" href="/posts?sort=datedesc">
            Sort By Oldest
          </Link>
        </div> */}
      </div>
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
