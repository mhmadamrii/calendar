"use client";

import { Switch } from "~/components/ui/switch";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export function MenuActiveSwitcher({
  initialChecked,
  eventId,
}: {
  initialChecked: boolean;
  eventId: string;
}) {
  const { mutate, isPending } = api.event.toggleActiveEvent.useMutation({
    onSuccess: (res) => {
      toast.success(`Event is now ${res.active ? "active" : "inactive"}`);
    },
  });

  return (
    <Switch
      defaultChecked={initialChecked}
      disabled={isPending}
      onCheckedChange={(isChecked) => {
        console.log("isChecked", isChecked);
        mutate({
          id: eventId,
          isActive: isChecked,
        });
      }}
    />
  );
}
