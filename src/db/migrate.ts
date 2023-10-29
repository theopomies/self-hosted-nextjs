import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

migrate(db, { migrationsFolder: "drizzle" })
  .then(() => {
    console.log("migrations complete");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
