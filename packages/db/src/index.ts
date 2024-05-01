import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@acme/env";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not defined");

export const sql = postgres(databaseUrl, { max: 10 });

export const db = drizzle(sql, { schema });
