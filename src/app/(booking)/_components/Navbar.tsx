import Link from "next/link";

export function Navbar() {
  return (
    <div className="sticky top-0 z-10 flex h-14 items-center border border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <p className="text-xl font-bold">
          Meet<span className="text-primary">Book</span>
        </p>
      </Link>
    </div>
  );
}
