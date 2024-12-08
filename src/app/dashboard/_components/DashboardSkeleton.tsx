import { Skeleton } from "~/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <section className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
      <Skeleton className="min-h-[130px] min-w-[200px]" />
    </section>
  );
}
