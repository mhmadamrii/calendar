import Image from "next/image";
import Link from "next/link";

import { CalendarCheck2 } from "lucide-react";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Grant() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You Are Almost Done!</CardTitle>
          <CardDescription>
            We have to now connect your calendar to your account.
          </CardDescription>
          <Image
            src="/work-is-almost-over-happy.gif"
            width={100}
            height={100}
            alt="Almost Finished"
            className="w-full rounded-lg"
            unoptimized
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="mr-2 size-4" />
              Connect Calender to Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
