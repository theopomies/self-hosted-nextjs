import "server-only";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { Session } from "next-auth";
import { NextRequest } from "next/server";
import { db } from "./db";
import { authConfig } from "@/auth.config";

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
});

export function protectedRoute(
  handler: (
    req: NextRequest & { auth: Session | null }
  ) => void | Response | Promise<void | Response>
): (req: NextRequest) => void | Response | Promise<void | Response> {
  return auth((req) => {
    if (req.auth) {
      return handler(req);
    }

    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }) as (req: NextRequest) => void | Response | Promise<void | Response>;
}
