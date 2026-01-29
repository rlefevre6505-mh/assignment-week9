// dynamic route with username
// TODO: render user's data
// READ users data from table
// option to render a list of all the user's posts (READ)
//
// clerk user id doesnt exist until user signs up (users can never see a profile page until sign up). User should sign up/sign in immediately on reaching the site! All routes apart from Home should be protected routes
//
// Clerk has 'auth()' which has userID inside (destructure) and all info in 'currentUser()' which also can be destructured - check docs for these (optional chaining can be helpful here incase details are missing)

export default function ProfilePage() {
  // db queries to GET info from tables go here

  return (
    <>
      <h1>User&apos;s info</h1>
      <h1>User&apos;s posts</h1>
    </>
  );
}
