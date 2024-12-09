import { z } from "zod";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        duration: z.number().min(1),
        url: z.string().min(1),
        description: z.string().min(1),
        videoCallSoftware: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.eventType.create({
        data: {
          title: input.title,
          duration: input.duration,
          url: input.url,
          description: input.description,
          userId: ctx.session.user.id,
          videoCallSoftware: input.videoCallSoftware,
        },
      });
    }),

  editEvent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        duration: z.number().min(1),
        url: z.string().min(1),
        description: z.string().min(1),
        videoCallSoftware: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.eventType.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          duration: input.duration,
          url: input.url,
          description: input.description,
          userId: ctx.session.user.id,
          videoCallSoftware: input.videoCallSoftware,
        },
      });
    }),

  deleteEvent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.eventType.delete({
        where: {
          id: input.id,
        },
      });
    }),

  toggleActiveEvent: protectedProcedure
    .input(z.object({ id: z.string(), isActive: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.eventType.update({
        where: {
          id: input.id,
        },
        data: {
          active: input.isActive,
        },
      });
    }),

  getEvents: protectedProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.eventType.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        user: true,
      },
    });

    return events;
  }),

  getEventById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.eventType.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: {
            include: {
              Availability: true,
            },
          },
        },
      });

      return event;
    }),

  getEventDetailById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.eventType.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: true,
        },
      });

      return event;
    }),
});

type EventRouter = typeof eventRouter;
type RouterInput = inferRouterInputs<EventRouter>;
type RouterOutput = inferRouterOutputs<EventRouter>;

export type TypeEventRouterInput = RouterInput["create"];
export type TypeEventRouter = RouterOutput["getEventById"];
