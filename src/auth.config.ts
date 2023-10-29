import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

export const authConfig = {
  session: { strategy: "jwt" },
  providers: [Github],
} satisfies NextAuthConfig;
