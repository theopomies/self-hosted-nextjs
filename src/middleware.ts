import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Necessary if I want a middleware because DrizzleAdapter can only run on the server
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
