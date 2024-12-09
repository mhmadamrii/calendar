"use client";

import Link from "next/link";

import { ScrollArea } from "~/components/ui/scroll-area";
import { useQueryState } from "nuqs";
import { api } from "~/trpc/react";
import { EmptyState } from "../_components/EmptyData";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const MeetingStatus = ({ status }: { status: string }) => {
  const renderMeeting = () => {
    switch (status) {
      case "regular":
        return (
          <span className="flex w-[80px] items-center justify-center rounded-lg bg-green-300 font-semibold text-green-800">
            Regular
          </span>
        );

      case "urgent":
        return (
          <span className="flex w-[80px] items-center justify-center rounded-lg bg-red-300 font-semibold text-red-800">
            Urgent
          </span>
        );

      default:
        break;
    }
  };

  return renderMeeting();
};

export default function Meetings() {
  const [status, setStatus] = useQueryState("status", { defaultValue: "all" });

  const {
    data: activeMeetings,
    refetch,
    isLoading,
  } = api.event.getActiveMeetings.useQuery({
    status,
  });

  const onValueChange = (value: string) => {
    setStatus(value);
  };

  useEffect(() => {
    if (status) {
      refetch();
    }
  }, [status]);

  return (
    <>
      {activeMeetings?.length! < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription className="flex justify-between">
              <h1>
                See upcoming and past events booked through your event type
                links.
              </h1>
              <Select onValueChange={onValueChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && <h1>Retreiving data...</h1>}
            <ScrollArea className="h-[480px]">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Meeting Platform</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-center">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeMeetings!?.map((item) => (
                    <TableRow key={item.id} className="h-32">
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/event/${item.id}`}>
                          {item.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <MeetingStatus status={item.status} />
                      </TableCell>
                      <TableCell>
                        <span>{item.description}</span>
                      </TableCell>
                      <TableCell>
                        <span>{item.videoCallSoftware}</span>
                      </TableCell>
                      <TableCell>
                        <span>{item.duration} Minutes</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={item.url}
                          className="text-primary hover:underline"
                          target="_blank"
                        >
                          Link
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </>
  );
}
