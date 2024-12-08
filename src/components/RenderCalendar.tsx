"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar } from "./ui/calendar";

import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
  parseDate,
} from "@internationalized/date";

interface iAppProps {
  daysofWeek: { day: string; isActive: boolean }[];
}

export function RenderCalendar({ daysofWeek }: iAppProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
