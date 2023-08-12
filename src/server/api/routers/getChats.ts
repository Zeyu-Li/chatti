import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const getChats = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  getAllChats: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    return await ctx.prisma.chatSession.findMany({
      where: {
        userId: id,
      },
    });
  }),

  createNewChat: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    return await ctx.prisma.chatSession.create({
      data: {
        userId: id,
      },
    });
  }),
});

// export const exampleRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
