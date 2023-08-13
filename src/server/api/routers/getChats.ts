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

  createNewChat: protectedProcedure.mutation(async ({ ctx }) => {
    const id = ctx.session.user.id;

    // TODO: check if subscription or chat already exists
    return await ctx.prisma.chatSession.create({
      data: {
        userId: id,
      },
    });
  }),

  getChatMessages: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      // return all messages from ChatSession with id
      try {
        const ChatSession = await ctx.prisma.message.findMany({
          where: {
            chatSessionId: input.chatId,
          },
        });

        return ChatSession;
      } catch (err) {
        console.log(err);
        return [];
      }
    }),

  writeChatMessage: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;

      let ChatSession;

      // get ChatSession with id and append message to messages
      try {
        ChatSession = await ctx.prisma.chatSession.findUnique({
          where: {
            id: input.chatId,
          },
        });
      } catch (err) {
        console.error("Couldn't find chat session: ", err);
        return [];
      }

      // TODO: complex decision tree for return message
      const messageResponse = "Testing message";

      // save message to database
      try {
        // current user is the sender
        await ctx.prisma.message.create({
          data: {
            text: input.message,
            chatSessionId: input.chatId,
          },
        });

        // response message from bot
        await ctx.prisma.message.create({
          data: {
            text: messageResponse,
            chatSessionId: input.chatId,
            sender: "Kali",
          },
        });
      } catch (err) {
        console.error("Couldn't save message to database: ", err);
        return [];
      }
    }),
});
