// user clerk component to render sign-up page
// we can set up a form to collect other user data (screenName, bio, location, interestes, etc)
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { SignUp } from "@clerk/nextjs";

export default function signUpPage() {
  return (
    <>
      <div>
        <SignUp className={`#`} />
      </div>
    </>
  );
}
