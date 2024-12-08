"use client";

import Image from "next/image";

import { UploadDropzone } from "~/components/UploadDropzone";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";
import { Session } from "next-auth";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
  fullname: z.string().min(2).max(50),
  email: z.string().email(),
});

export function SettingForm({ session }: { session: Session }) {
  const [currentProfileImage, setCurrentProfileImage] = useState(
    session.current_user?.image,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
  }

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  const isPending = false;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4 bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Marshal" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="marshal@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {currentProfileImage ? (
              <div className="relative size-16">
                <Image
                  src={currentProfileImage}
                  alt="Profile"
                  width={300}
                  height={300}
                  className="size-16 rounded-lg"
                />
                <Button
                  type="button"
                  onClick={handleDeleteImage}
                  variant="destructive"
                  size="icon"
                  className="absolute -right-3 -top-3"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  container: "border-muted",
                }}
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0]?.url);
                  toast.success("Profile image uploaded");
                }}
                onUploadError={(error) => {
                  toast.error(error.message);
                }}
              />
            )}
            <Button type="submit">{isPending ? "Loading..." : "Submit"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
