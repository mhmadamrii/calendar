import Image from "next/image";

export function Logos() {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the best companies in the world
      </h2>
      <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src="/nylas-logo.png"
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
          width={300}
          height={100}
        />
        <Image
          src="/nextjs-logo.svg"
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
          width={100}
          height={100}
        />
        <Image
          src="vercel.svg"
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
          width={100}
          height={100}
        />
        <Image
          src="/nextjs-logo.svg"
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
          width={100}
          height={100}
        />
        <Image
          src="/nextjs-logo.svg"
          alt="Logo"
          className="col-span-2 max-h-12 w-full object-contain dark:invert lg:col-span-1"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
