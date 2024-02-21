import { authRouter } from "./router/auth";
import { pingRouter } from "./router/ping";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  ping: pingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
