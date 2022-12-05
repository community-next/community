import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { createUser, getUserByEmail, updateUser } from "./users";
import { getTimestampInSeconds } from "@community-next/utils";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          ...session.user,
          ...token,
          image: token.picture,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      const { email, name, picture } = token;
      if (email) {
        let dbUser = await getUserByEmail(email);
        if (!dbUser) {
          dbUser = await createUser(
            email,
            name ?? email.split("@")[0],
            picture ?? undefined
          );
        } else {
          const timestamp = getTimestampInSeconds();
          dbUser.lastActivityAt = timestamp;

          // no need to await the result
          updateUser(dbUser);
        }

        return {
          ...dbUser,
          id: dbUser.id,
          name: dbUser.displayName,
          email: dbUser.email,
          picture: dbUser.avatarUrl,
        };
      }
      token.id = user?.id;
      return token;
    },
  },
};
