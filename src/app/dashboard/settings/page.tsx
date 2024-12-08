import { auth } from "~/server/auth";
import { SettingForm } from "../_components/SettingForm";

export default async function Settings() {
  const session = await auth();
  return (
    <section>
      <SettingForm session={session} />
    </section>
  );
}
