"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { TypeEventRouter } from "~/server/api/routers/event";
import { EventType, User } from "@prisma/client";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { ButtonGroup } from "~/components/ui/button-group";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  duration: z.string().min(1),
  url: z.string().url(),
  description: z.string().min(2).max(50),
});

export function EditEvent({ event }: { event: TypeEventRouter }) {
  const [activePlatform, setActivePlatform] = useState<Platform>("Google Meet");

  const togglePlatform = (platform: Platform) => {
    setActivePlatform(platform);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: "",
      url: "",
      description: "",
    },
  });

  const { mutate, isPending } = api.event.editEvent.useMutation({
    onSuccess: (_) => {
      toast.success("Event created");
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      id: event!.id,
      title: values.title,
      duration: parseInt(values.duration),
      url: values.url,
      description: values.description,
      videoCallSoftware: activePlatform,
    });
  }

  useEffect(() => {
    if (event!.user) {
      form.setValue("title", event!.title);
      form.setValue("duration", event!.duration.toString());
      form.setValue("url", event!.url);
      form.setValue("description", event!.description);
    }
  }, [event]);

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create a new appointment type that allows people to book times.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="flex gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="John Marshal"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your event title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="John Marshal"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can <span>@mention</span> other users and
                        organizations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Duration</SelectLabel>
                            <SelectItem value="15">15 Mins</SelectItem>
                            <SelectItem value="30">30 Min</SelectItem>
                            <SelectItem value="45">45 Mins</SelectItem>
                            <SelectItem value="60">1 Hour</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-y-2">
                  <input
                    type="hidden"
                    name="videoCallSoftware"
                    value={activePlatform}
                    disabled={isPending}
                  />
                  <Label>Video Call Provider</Label>
                  <ButtonGroup className="w-full">
                    <Button
                      onClick={() => togglePlatform("Zoom Meeting")}
                      type="button"
                      className="w-full"
                      variant={
                        activePlatform === "Zoom Meeting"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      Zoom
                    </Button>
                    <Button
                      onClick={() => togglePlatform("Google Meet")}
                      type="button"
                      className="w-full"
                      variant={
                        activePlatform === "Google Meet"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      Google Meet
                    </Button>
                    <Button
                      variant={
                        activePlatform === "Microsoft Teams"
                          ? "secondary"
                          : "outline"
                      }
                      type="button"
                      className="w-full"
                      onClick={() => togglePlatform("Microsoft Teams")}
                    >
                      Microsoft Teams
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex w-full justify-between">
              <Button asChild variant="secondary">
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button>Edit Event Type</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
