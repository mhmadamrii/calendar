import Link from "next/link";

import { EmptyState } from "./_components/EmptyData";
import { DashboardSkeleton } from "./_components/DashboardSkeleton";
import { Suspense } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { ExternalLink, Pen, Settings, Trash, Users2 } from "lucide-react";
import { CopyLinkMenuItem } from "~/components/CopyLinkMenuItem";
import { MenuActiveSwitcher } from "~/components/EventTypeSwitcher";
import { api } from "~/trpc/server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default async function Dashboard() {
  return (
    <section className="flex h-[400px] flex-grow flex-col gap-10">
      <div className="flex items-center justify-between px-2">
        <div className="hidden gap-1 sm:grid">
          <h1 className="font-heading text-3xl md:text-4xl">Event Types</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your event types.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create New Event</Link>
        </Button>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        {/* @ts-expect-error: due RSC is stupid */}
        <DashboardWithData />
      </Suspense>
    </section>
  );
}

async function DashboardWithData() {
  const data = await api.event.getEvents();

  return (
    <ScrollArea>
      {data.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below."
          buttonText="Add Event Type"
          href="/dashboard/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              className="relative overflow-hidden rounded-lg border shadow"
              key={item.id}
            >
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-20" align="end">
                    <DropdownMenuLabel>Event</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href={`/${item.user.username}/${item.url}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </Link>
                      </DropdownMenuItem>
                      <CopyLinkMenuItem
                        meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${item.user.username}/${item.url}`}
                      />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/event/${item.id}`}>
                          <Pen className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/event/${item.id}/delete`}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link href={`/dashboard/event/${item.id}`}>
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users2 className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium">
                          {item.duration} Minutes Meeting
                        </dt>
                        <dd>
                          <div className="text-lg font-medium">
                            {item.title}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-between bg-muted px-5 py-3 dark:bg-gray-900">
                <MenuActiveSwitcher
                  initialChecked={item.active}
                  eventTypeId={item.id}
                />

                <Link href={`/dashboard/event/${item.id}`}>
                  <Button className="">Edit Event</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
