import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  subscribedProcedure,
} from "~/server/api/trpc";
import { type prisma } from "~/server/db";

import { fuzzy } from "fast-fuzzy";

/**
 * Throws NOT_FOUND unless the chat exists and belongs to the user, so one user can't read or write
 * another user's chat by guessing or reusing its id.
 */
const assertOwnsChat = async (
  db: typeof prisma,
  chatId: string,
  userId: string
): Promise<void> => {
  const chat = await db.chatSession.findFirst({
    where: { id: chatId, userId },
    select: { id: true },
  });
  if (!chat) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Chat not found" });
  }
};

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
      await assertOwnsChat(ctx.prisma, input.chatId, ctx.session.user.id);

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
      await assertOwnsChat(ctx.prisma, input.chatId, ctx.session.user.id);

      // removed previous chatgpt and converted to mocked responses
      // complex decision tree for return message
      const response = input.message.trim().toLowerCase();

      const heyWords = ["hey", "hello", "howdy", "sup", "heya"];
      const responsePairs = {
        "how are you": "I'm good, what can I help you with today?",
        "how are you doing": "I'm good, what can I help you with today?",
        "what's up": "not much",
        "who are you": "I'm Kali",
      };
      const threshold = 0.86;

      // includes words
      const wordResponses = {
        engineering: "I love engineering",
        coffee: "I'm addicted to coffee",
        joke: "I'm not a clown haha, I'm just an AI",
        turbotax:
          "TurboTax is a popular tax preparation software developed by Intuit.",
      };

      let messageResponse =
        "Sorry, but I haven't been trained to respond to that yet 🥲";
      let did_respond = false;
      // fuzzy search??
      // more formed responses first
      for (const [key, value] of Object.entries(responsePairs)) {
        if (fuzzy(response, key) > threshold) {
          messageResponse = value;
          // console.log(fuzzy(response, key));
          did_respond = true;
          break;
        }
      }

      if (!did_respond) {
        for (const heyWord of heyWords) {
          if (response.includes(heyWord)) {
            messageResponse = "Hello!";
            did_respond = true;
            break;
          }
        }
      }

      if (!did_respond) {
        for (const [key, value] of Object.entries(wordResponses)) {
          if (response.includes(key)) {
            messageResponse = value;
            break;
          }
        }
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
