"use client";

import { Availability } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { times } from "~/lib/constants";
import { CardContent, CardFooter } from "~/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function AvailabilityForm({
  availability,
}: {
  availability: Availability[];
}) {
  return (
    <form>
      <CardContent className="flex flex-col gap-y-4">
        {availability.map((item) => (
          <div
            className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3"
            key={item.id}
          >
            <input type="hidden" name={`id-${item.id}`} value={item.id} />
            <div className="flex items-center gap-x-3">
              <Switch
                name={`isActive-${item.id}`}
                defaultChecked={item.isActive}
              />
              <p>{item.day}</p>
            </div>
            <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="From Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {times.map((time) => (
                    <SelectItem key={time.id} value={time.time}>
                      {time.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="To Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {times.map((time) => (
                    <SelectItem key={time.id} value={time.time}>
                      {time.time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </form>
  );
}
