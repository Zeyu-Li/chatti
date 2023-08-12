import { createTRPCRouter } from "~/server/api/trpc";
import { getChats } from "~/server/api/routers/getChats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  getChats: getChats,
});

// export type definition of API
export type AppRouter = typeof appRouter;
