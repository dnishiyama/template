import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not defined");

// for migrations
const sql = mysql.createConnection({ uri: databaseUrl });

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
