import { Navbar } from "./_components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen w-full flex-col border">
      <Navbar />
      {children}
    </div>
  );
}
