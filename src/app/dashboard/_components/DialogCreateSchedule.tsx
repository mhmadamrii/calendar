"use client";

import { MultiSelect } from "~/components/ui/multi-select";
import { api } from "~/trpc/react";
import { Spinner } from "~/components/Spinner";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { CalendarCheck2 } from "lucide-react";
import { Label } from "~/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  duration: z.string().min(1),
  url: z.string().url(),
  description: z.string().min(2).max(50),
  status: z.string().min(1),
});

export function DialogCreateSchedule() {
  const [isLoading, seIsLoading] = useState(false);
  const [initialOpen, setInitialOpen] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  const { data: userLists } = api.user.getAllUsers.useQuery(undefined, {
    enabled: initialOpen,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: "",
      url: "",
      description: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setInitialOpen(true)} size="icon">
          <CalendarCheck2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <section>
          <MultiSelect
            // @ts-expect-error: due RSC is stupid
            options={
              userLists?.map((u) => {
                return {
                  label: u.name,
                  value: u.id,
                };
              }) ?? []
            }
            onValueChange={setSelectedFrameworks}
            defaultValue={[]}
            placeholder="Select Attendees"
            variant="inverted"
            animation={2}
            maxCount={3}
          />
        </section>
        <DialogFooter>
          <Button
            onClick={async () => {
              seIsLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              seIsLoading(false);
              toast.success("Schedule created");
            }}
            type="submit"
            className="flex w-[140px] items-center justify-center"
          >
            {isLoading ? <Spinner /> : "Create Schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
