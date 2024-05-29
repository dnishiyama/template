import type { Config } from "drizzle-kit";

import { env } from "@acme/env";

const url = env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not defined");

export default {
  schema: "./src/schema",
  dialect: "postgresql",
  dbCredentials: { url },
  tablesFilter: ["template_*"],
  out: "../db/drizzle",
} satisfies Config;
