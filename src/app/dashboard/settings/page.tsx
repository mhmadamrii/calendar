import { auth } from "~/server/auth";
import { SettingForm } from "../_components/SettingForm";

export default async function Settings() {
  const session = await auth();
  return <SettingForm session={session} />;
}
