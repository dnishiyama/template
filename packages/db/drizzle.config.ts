import type { Config } from "drizzle-kit";

import { env } from "@acme/env";

const uri = env.DATABASE_URL;
if (!uri) throw new Error("DATABASE_URL is not defined");

export default {
  schema: "./src/schema",
  driver: "mysql2",
  dbCredentials: { uri },
  tablesFilter: ["template_*"],
  out: "../db/drizzle",
} satisfies Config;
