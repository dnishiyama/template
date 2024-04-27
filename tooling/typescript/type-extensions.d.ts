import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 * Need separate declaration in @acme/nextjs and @acme/auth
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user:
      | (DefaultSession["user"] & {
          id: string;
          // ...other properties
          // role: Role
          // role: UserRole;
        })
      | undefined;
  }
  interface JWT extends DefaultJWT {
    // ...other properties
    // role: Role
    // role: UserRole;
    signinunixsecondsepoch: number;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// https://stackoverflow.com/questions/71099924/cannot-find-module-file-name-png-or-its-corresponding-type-declarations-type
declare global {
  declare module "*.png" {
    const content: string;
    export default content;
  }
  declare module "*.svg" {
    const content: string;
    export default content;
  }
  declare module "*.jpeg" {
    const content: string;
    export default content;
  }
  declare module "*.jpg" {
    const content: string;
    export default content;
  }
  declare module "*.webp" {
    const content: string;
    export default content;
  }
}
