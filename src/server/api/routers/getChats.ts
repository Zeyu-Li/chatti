import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  subscribedProcedure,
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

  createNewChat: subscribedProcedure.mutation(async ({ ctx }) => {
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

      // complex decision tree for return message
      const response = input.message.trim().toLowerCase();

      const heyWords = ["hey", "hi", "hello", "howdy", "sup", "heya"];

      let messageResponse = "So how was your day?";
      // emoji responses
      if (response.includes("😘")) {
        messageResponse = "😘";
      } else if (response.includes("👋")) {
        messageResponse = "Heyyyy there";
      } else if (response.includes("🥰")) {
        messageResponse = "🥰";
      }
      // text contains
      else if (heyWords.some((word) => response.includes(word))) {
        messageResponse = "Hello there 👋";
      } else if (response.includes("you")) {
        if (response.includes("fine") || response.includes("good")) {
          messageResponse = "Thanks! 🥺";
        } else if (response.includes("bad") || response.includes("terrible")) {
          messageResponse = "😢";
        }
      }
      // how was your day || how are you
      else if (response.includes("day")) {
        messageResponse = "It was good, thanks for asking! 🥰";
      }

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
        return await ctx.prisma.message.create({
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

      // return await ctx.prisma.message.findMany({
      //   where: {
      //     chatSessionId: input.chatId,
      //   },
      // });
    }),
});
