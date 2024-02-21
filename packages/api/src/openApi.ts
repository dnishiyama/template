import { generateOpenApiDocument } from "trpc-openapi";

import { env } from "@acme/auth/env";

import { appRouter } from ".";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "template",
  version: "1.0.0",
  description: "template application",
  baseUrl: env.NEXT_PUBLIC_URL,
});
