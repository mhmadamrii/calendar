import Image from "next/image";

import { BookMarked, CalendarX2, Clock } from "lucide-react";
import { TimeSlots } from "~/components/TimeSlots";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";
import { RenderCalendar } from "~/components/RenderCalendar";
import { Card, CardContent } from "~/components/ui/card";

export default async function Booking({
  params,
}: {
  params: Promise<{ username: string; eventId: string }>;
}) {
  const { username, eventId } = await params;

  const eventData = await api.event.getEventById({ id: eventId });
  const showForm = false;

  const formattedDate = "hello world";

  return (
    <div className="flex w-full flex-grow items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px]">
          <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr,auto,1fr]">
            <div>
              <Image
                src={eventData?.user.image as string}
                alt={`${eventData?.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={30}
                height={30}
              />
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {eventData?.user.name}
              </p>
              <h1 className="mt-2 text-xl font-semibold">{eventData?.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {eventData?.description}
              </p>

              <div className="mt-5 grid gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {eventData?.duration} Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <BookMarked className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {eventData?.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />

            <h1>Some forms</h1>
          </CardContent>
        </Card>
      ) : (
        <Card className="mx-auto w-full max-w-[1000px]">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-4">
            <div>
              <Image
                src={eventData?.user.image as string}
                alt={`${eventData?.user.name}'s profile picture`}
                className="size-9 rounded-full"
                width={30}
                height={30}
              />
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {eventData?.user.name}
              </p>
              <h1 className="mt-2 text-xl font-semibold">{eventData?.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {eventData?.description}
              </p>
              <div className="mt-5 grid gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {eventData?.duration} Mins
                  </span>
                </p>
                <p className="flex items-center">
                  <BookMarked className="mr-2 size-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Google Meet
                  </span>
                </p>
              </div>
            </div>

            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />

            <div className="my-4 md:my-0">
              <RenderCalendar
                daysofWeek={eventData?.user?.Availability || []}
              />
            </div>

            <Separator
              orientation="vertical"
              className="hidden h-full w-[1px] md:block"
            />

            {/* @ts-expect-error */}
            <TimeSlots
              grantId={eventData?.user?.grantId}
              grantEmail={eventData?.user?.grantEmail}
              availability={eventData?.user?.Availability}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
