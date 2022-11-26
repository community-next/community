import NextAuth from "next-auth";
import { authOptions } from "models/auth";

// @see ./lib/auth
export default NextAuth(authOptions);
