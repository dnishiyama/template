import { env } from "@acme/env";

import { db } from ".";
import { users } from "./schema/auth";
import { post } from "./schema/post";

if (!("DATABASE_URL" in env))
  throw new Error("DATABASE_URL not found on .env.development");

const _reseedFromScratch = async () => {
  console.log("Seed start", env.DATABASE_URL);

  await db.delete(post);
  await db.delete(users);

  await db.insert(post).values({
    title: "Seeded post",
    content: "This post was seeded into the database",
  });
};

export const seed = async () => {
  await _reseedFromScratch();
};

if (require.main === module) {
  void seed()
    .then(() => console.log("Seed done"))
    .catch((e) => {
      console.log("Seed failed", e);
    })
    .finally(() => {
      process.exit();
    });
}
