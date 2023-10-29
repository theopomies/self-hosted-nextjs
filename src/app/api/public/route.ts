import { NextRequest } from "next/server";

export const GET = (_req: NextRequest) => {
  return Response.json({ data: "Public data" });
};
