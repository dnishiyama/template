import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not defined");

// for migrations
export const sql = mysql.createPool({ uri: databaseUrl, connectionLimit: 10 });
export const db = drizzle(sql, { schema, mode: "default" });
