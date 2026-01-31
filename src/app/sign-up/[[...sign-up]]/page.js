// user clerk component to render sign-up page
// we can set up a form to collect other user data (screenName, bio, location, interestes, etc)
// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
import { SignUp } from "@clerk/nextjs";
import styles from "./sign-up.module.css"

export default function signUpPage() {
  return (
    <>
      <div className={styles.div}>
        <SignUp />
      </div>
    </>
  );
}
