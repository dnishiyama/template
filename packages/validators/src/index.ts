import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "@acme/db/schema/auth";
import { post } from "@acme/db/schema/post";

// POST SCHEMA
export const PostSelectSchema = createSelectSchema(post);
export const PostInsertSchema = createInsertSchema(post);

export const CreatePostSchema = PostInsertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpsertPostSchema = PostInsertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// USER SCHEMA
export const UserSelectSchema = createSelectSchema(users);
export const UserInsertSchema = createInsertSchema(users);

// AUTH SCHEMA
export const EmailAuthSchema = UserInsertSchema.pick({
  email: true,
}).extend({
  email: z.string().email(),
});
