import { Suspense } from "react";
import { AvailabilityForm } from "../_components/AvailabilityForm";
import { api } from "~/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function AvailabilityPage() {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error: due RSC is stupid */}
      <Availability />
    </Suspense>
  );
}

function Loading() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <h1 className="animate-bounce text-3xl font-semibold">Loading...</h1>
    </section>
  );
}

async function Availability() {
  const availability = await api.user.getAvailability();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this section you can manage your availability.
        </CardDescription>
      </CardHeader>
      <AvailabilityForm availability={availability} />
    </Card>
  );
}
