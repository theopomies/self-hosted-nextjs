import "server-only";
import NextAuth, { Session } from "next-auth";
import { NextRequest } from "next/server";
import { authConfig } from "@/lib/auth/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "../db";

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
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
