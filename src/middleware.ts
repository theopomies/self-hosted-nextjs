import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";
import { NextResponse } from "next/server";

// Necessary if I want a middleware because Database Adapter can only run on the server
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/protected");

  if (isProtectedRoute) {
    if (req.auth) {
      console.log("Authenticated");
      return;
    }

    console.log("Not authenticated");
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
