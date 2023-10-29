import "server-only";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set (src/db/index.ts)");
}

const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql, {
  schema,
});

// This line is commented because it also causes troubles when building but by looping forever so I dont get the error message
// await migrate(db, { migrationsFolder: "drizzle" });
