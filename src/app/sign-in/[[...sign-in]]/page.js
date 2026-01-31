// user clerk component to render sign-in page

import { SignIn } from "@clerk/nextjs";
// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
import styles from "./sign-in.module.css";

export default function signInPage() {
  return (
    <>
      <div className={styles.div}>
        <SignIn /> 
      </div>
    </>
  );
}
