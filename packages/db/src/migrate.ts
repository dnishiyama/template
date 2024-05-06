import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

import { env } from "@acme/env";

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not defined");

// for migrations
const sql = neon(databaseUrl);
const drizzleMigrationClient = drizzle(sql);

const main = async () => {
  if (!databaseUrl) return;
  if (process.env.CI) return;
  if (!drizzleMigrationClient) return;

  // get the channel from the database url (e.g. postgres://localhost:5432/acme_dev -> dev; postgres://localhost:5432/acme -> acme)
  const channel = databaseUrl.split("/").slice(-1)[0]?.split("_").slice(-1)[0];

  console.log("Migrating channel", channel);
  return await migrate(drizzleMigrationClient, {
    migrationsTable: `__drizzle_migrations_${channel}`,
    migrationsFolder: "drizzle",
  });
};

void main()
  .then(() => console.log("Migration complete"))
  .catch((error) => console.log("Migration failed", error))
  .finally(() => {
    // void sql.end();
  });
