import Image from "next/image";

import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButton";
import { signIn } from "~/server/auth";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle></DialogTitle>
        <DialogHeader className="flex-row items-center justify-center gap-x-2">
          <Image
            width={100}
            height={100}
            src="/logo.png"
            className="size-10"
            alt="Logo"
          />
          <h4 className="text-3xl font-semibold">
            Meet<span className="text-primary">Book</span>
          </h4>
        </DialogHeader>
        <div className="mt-5 flex flex-col gap-3">
          <form
            className="w-full"
            // @ts-expect-error: expecting error due react stupid
            action={async () => {
              "use server";
              await signIn("google");
              redirect("/onboarding");
            }}
          >
            <GoogleAuthButton />
          </form>

          <form
            className="w-full"
            // @ts-expect-error: expecting error due react stupid
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
