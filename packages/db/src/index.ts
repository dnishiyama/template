import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@acme/env";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { pgTable as tableCreator } from "./schema/_table";

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not defined");

const getDb = () => {
  return drizzle(postgres(databaseUrl), { schema });
};

export type AppDb = ReturnType<typeof getDb>;

declare global {
  // eslint-disable-next-line no-var
  var db: AppDb | null;
}

let db: AppDb;

export * from "drizzle-orm";

if (env.NODE_ENV === "production") {
  db = getDb();
} else {
  if (!global.db) global.db = getDb();
  db = global.db;
}

export { db };
