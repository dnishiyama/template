import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "@acme/env";

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not defined");

// for migrations
const sql = postgres(databaseUrl);

const main = async () => {
  const drizzleMigrationClient = drizzle(sql);

  return await migrate(drizzleMigrationClient, {
    migrationsTable: "migrations",
    migrationsFolder: "drizzle",
  });
};

void main()
  .then(() => console.log("Migration complete"))
  .catch((error) => console.log("Migration failed", error))
  .finally(() => {
    void sql.end();
  });
