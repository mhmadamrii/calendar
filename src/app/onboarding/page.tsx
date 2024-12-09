import OnboardingForm from "./_components/OnboardingForm";

import { auth } from "~/server/auth";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default function Onboarding() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      {/* @ts-expect-error: due RSC is stupid */}
      <OnboardingWithSession />
    </Suspense>
  );
}

async function OnboardingWithSession() {
  const session = await auth();

  if (session.current_user.name !== null) {
    redirect("/dashboard");
  }
  return <OnboardingForm session={session} />;
}
