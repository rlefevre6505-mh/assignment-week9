import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function HomePage() {
  const user = await currentUser();

  if (!user)
    return (
      <>
        {" "}
        <h1>Home Page</h1>
        <p>Welcome to Gig Log!</p>
        <p>Please sign in or sign up to continue</p>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </>
    );

  console.log(user);
  return (
    <>
      <p>Welcome {user?.username}!</p>
      <Link href="/profile">Continue to my profile</Link>
      <Link href="/gigs">View gigs</Link>
      <SignOutButton>
        <button>Sign out</button>
      </SignOutButton>
    </>
  );
}
