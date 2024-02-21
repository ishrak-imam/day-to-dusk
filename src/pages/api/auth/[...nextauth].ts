import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase";

export const authOptions = {
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/auth-error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (credentials as any).email || "",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (credentials as any).password || "",
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch(() => {
            throw new Error("Invalid credentials");
          });
      },
    }),
  ],
};
export default NextAuth(authOptions);
