import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUser: publicProcedure
    .input(
      z.object({ fullname: z.string(), username: z.string(), id: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateUser = await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          Availability: {
            createMany: {
              data: [
                {
                  day: "Monday",
                  fromTime: "08:00",
                  tillTime: "18:00",
                },
                {
                  day: "Tuesday",
                  fromTime: "08:00",
                  tillTime: "18:00",
                },
                {
                  day: "Wednesday",
                  fromTime: "08:00",
                  tillTime: "18:00",
                },
                {
                  day: "Thursday",
                  fromTime: "08:00",
                  tillTime: "18:00",
                },
                {
                  day: "Friday",
                  fromTime: "08:00",
                  tillTime: "18:00",
                },
                {
                  day: "Saturday",
                  fromTime: "08:00",
                  tillTime: "18:00",
                },
                {
                  day: "Sunday",
                  fromTime: "08:00",
                  tillTime: "18:00",
                },
              ],
            },
          },
        },
      });

      return updateUser;
    }),

  updateAvailability: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isActive: z.boolean(),
        day: z.string(),
        fromTime: z.string(),
        tillTime: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateAvailability = await ctx.db.availability.update({
        where: {
          id: input.id,
        },
        data: {
          isActive: input.isActive,
          day: input.day,
          fromTime: input.fromTime,
          tillTime: input.tillTime,
        },
      });

      return updateAvailability;
    }),

  updateUserSetting: protectedProcedure
    .input(z.object({ username: z.string(), fullname: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input.username,
          name: input.fullname,
        },
      });
    }),

  getAvailability: protectedProcedure.query(async ({ ctx }) => {
    const availability = await ctx.db.availability.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return availability;
  }),
});
