import { protectedRoute } from "@/lib/auth/auth";

export const GET = protectedRoute((req) => {
  if (req.auth) {
    return Response.json({ data: "Protected data" });
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
});
