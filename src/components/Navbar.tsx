import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "~/components/ThemeToggle";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  return (
    <div className="relative mx-auto flex w-full flex-col py-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            className="size-10"
            alt="Logo"
          />

          <h4 className="text-3xl font-semibold">
            Cal<span className="text-primary">Endar</span>
          </h4>
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      <nav className="hidden md:flex md:justify-end md:space-x-4">
        <ThemeToggle />
        <AuthModal />
      </nav>
    </div>
  );
}
