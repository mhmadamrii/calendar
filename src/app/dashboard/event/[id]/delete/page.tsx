import Link from "next/link";
import Form from "next/form";
import React from "react";

import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const loggerFn = async (formData: FormData) => {
  "use server";

  const deleteEvent = await db.eventType.delete({
    where: {
      id: formData.get("id") as string,
    },
  });

  if (deleteEvent) {
    redirect("/dashboard");
  }
};

export default async function DeleteEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Delete Event Type</CardTitle>
          <CardDescription>
            Are you sure you want to delete this event type?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-between">
          <Button asChild variant="secondary">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          {/* @ts-expect-error */}
          <Form action={loggerFn}>
            <input type="hidden" name="id" value={id} />
            <Button variant="destructive">Delete</Button>
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
}
