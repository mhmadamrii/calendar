import { auth } from "~/server/auth";
import { Suspense } from "react";
import { Spinner } from "~/components/Spinner";
import { SettingForm } from "../_components/SettingForm";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Settings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error */}
        <SettingsWithAuth />
      </Suspense>
    </Card>
  );
}

async function SettingsWithAuth() {
  const session = await auth();
  return <SettingForm session={session} />;
}

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
};
