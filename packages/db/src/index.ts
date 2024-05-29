import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@acme/env";

import { accounts, sessions, users, verificationTokens } from "./schema/auth";
import { post } from "./schema/post";

export const schema = { accounts, sessions, users, verificationTokens, post };

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
