import { nylas } from "~/lib/nylas";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface TimeSlotsProps {
  id: string;
  isActive: boolean;
  day: any;
  fromTime: string;
  tillTime: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const availableTimeSlot = [
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
] as const;

export async function TimeSlots({
  availability,
  grantId,
  grantEmail,
}: {
  availability: TimeSlotsProps[] | undefined;
  grantId: string | undefined | null;
  grantEmail: string | undefined | null;
}) {
  const startOfDay = new Date();
  const endOfDay = new Date();

  // const nylasCalendarData = await nylas.calendars.getFreeBusy({
  //   identifier: grantId as string,
  //   requestBody: {
  //     startTime: Math.floor(startOfDay.getTime() / 1000),
  //     endTime: Math.floor(endOfDay.getTime() / 1000),
  //     emails: [grantEmail] as unknown as string[],
  //   },
  // });

  return (
    <section>
      <ScrollArea className="h-[90%]">
        {availableTimeSlot?.map((slot, index) => {
          return (
            <div key={index}>
              <Button variant="outline" className="mb-2 w-full">
                {slot.day}
              </Button>
            </div>
          );
        })}
      </ScrollArea>
    </section>
  );
}
