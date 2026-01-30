// user clerk component to render sign-in page

import { SignIn } from "@clerk/nextjs";
// import * as Clerk from "@clerk/elements/common";
// import * as SignIn from "@clerk/elements/sign-in";
// import styles from "./sign-in.module.css";

export default function signInPage() {
  return (
    <>
      <div className={`#`}>
        <SignIn />
      </div>
    </>
  );
}

// export default function signInPage() {
//   return (
//     <SignIn.Root>
//       <SignIn.Step name="start" className={styles.startStep}>
//         <Clerk.Connection name="google" className={styles.provider}>
//           Sign in with Google
//         </Clerk.Connection>
//         <Clerk.Field name="identifier">
//           <Clerk.Label className={styles.label}>Email</Clerk.Label>
//           <Clerk.Input className={styles.input} />
//           <Clerk.FieldError className={styles.error} />
//         </Clerk.Field>
//         <SignIn.Action submit className={styles.submit}>
//           Continue
//         </SignIn.Action>
//       </SignIn.Step>
//       <SignIn.Step name="verifications" className={styles.verificationsStep}>
//         <SignIn.Strategy name="email_code">
//           <Clerk.Field name="code">
//             <Clerk.Label className={styles.label}>Code</Clerk.Label>
//             <Clerk.Input className={styles.input} />
//             <Clerk.FieldError className={styles.error} />
//           </Clerk.Field>
//           <SignIn.Action submit className={styles.submit}>
//             Verify
//           </SignIn.Action>
//         </SignIn.Strategy>
//       </SignIn.Step>
//     </SignIn.Root>
//   );
// }
