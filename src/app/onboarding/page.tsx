import OnboardingForm from "./_components/OnboardingForm";

import { auth } from "~/server/auth";
import { Suspense } from "react";

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
  console.log("session", session);
  return <OnboardingForm session={session} />;
}
