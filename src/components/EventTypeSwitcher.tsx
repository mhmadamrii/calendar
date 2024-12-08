"use client";

import React, { useEffect, useTransition } from "react";

import { Switch } from "~/components/ui/switch";
// @ts-expect-error: due RSC is stupid
import { useActionState } from "react-dom";
import { toast } from "sonner";

export function MenuActiveSwitcher({
  initialChecked,
  eventTypeId,
}: {
  eventTypeId: string;
  initialChecked: boolean;
}) {
  const updateEventTypeStatusAction = async () => {
    console.log("updating");
  };

  const [isPending, startTransition] = useTransition();
  // const [state, action] = useActionState(
  //   updateEventTypeStatusAction,
  //   undefined,
  // );

  // useEffect(() => {
  //   if (state?.status === "success") {
  //     toast.success(state.message);
  //   } else if (state?.status === "error") {
  //     toast.error(state.message);
  //   }
  // }, [state]);

  return (
    <Switch
      defaultChecked={initialChecked}
      disabled={isPending}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          console.log("isChecked", isChecked);
          // action({
          //   isChecked: isChecked,
          //   eventTypeId,
          // });
        });
      }}
    />
  );
}
