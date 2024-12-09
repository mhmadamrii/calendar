import { Suspense } from "react";
import { api } from "~/trpc/server";
import { EditEvent } from "../../_components/EditEvent";

export default async function EventById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <Suspense fallback={<p>loading...</p>}>
      {/* @ts-expect-error: due RSC is stupid */}
      <EventByIdWithData id={id} />
    </Suspense>
  );
}

async function EventByIdWithData({ id }: { id: string }) {
  const data = await api.event.getEventById({ id });

  return <EditEvent event={data} />;
}
