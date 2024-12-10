import { Suspense } from "react";
import { Spinner } from "~/components/Spinner";
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
    <section className="flex flex-grow items-center justify-center">
      <Card className="min-h-[300px] w-full">
        <CardHeader>
          <CardTitle>Availability</CardTitle>
          <CardDescription>
            In this section you can manage your availability.
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<Loading />}>
          {/* @ts-expect-error: due RSC is stupid */}
          <Availability />
        </Suspense>
      </Card>
    </section>
  );
}

function Loading() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Spinner />
    </section>
  );
}

async function Availability() {
  const availability = await api.user.getAvailability();

  return <AvailabilityForm availability={availability} />;
}
