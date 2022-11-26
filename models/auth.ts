import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { getUserByEmail } from "./users";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
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
      if (token.email) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          return {
            id: dbUser.id,
            name: dbUser.displayName,
            email: dbUser.email,
            picture: dbUser.profileUrl,
          };
        }
      }
      token.id = user?.id;
      return token;
    },
  },
};
