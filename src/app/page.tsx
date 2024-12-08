import { CTA } from "~/components/CTA";
import { Features } from "~/components/Features";
import { Hero } from "~/components/Hero";
import { Logos } from "~/components/Logos";
import { Navbar } from "~/components/Navbar";
import { Testimonial } from "~/components/Testimonial";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar />
      {/* @ts-expect-error: RSC is stupid */}
      <Hero />
      <Logos />
      <Features />
      <Testimonial />
      <CTA />
    </div>
  );
}
