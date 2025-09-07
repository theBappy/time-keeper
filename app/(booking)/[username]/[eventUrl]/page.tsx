
import { RenderCalendar } from "@/components/meeting-form/render-calender";
import { TimeTable } from "@/components/meeting-form/time-table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/db";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          scheduled: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BookingForm({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: Promise<{ date?: string }>;
}) {
  const { username, eventUrl } = await params;

  const data = await getData(eventUrl, username);

  // Await searchParams properly
  const { date } = await searchParams;

  const selectedDate = date ? new Date(date) : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-5">
          {/* Left column */}
          <div className="col-start-1 col-end-2">
            <img
              src={data.User?.image as string}
              alt="user-image"
              className="size-10 rounded-full"
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.User?.name}
            </p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>
            <div className="mt-5 flex flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="text-primary mr-2 size-4" />
                <span className="text-sm font-medium text-muted-foreground">
                  {formattedDate}
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="text-primary mr-2 size-4" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.duration} Minutes
                </span>
              </p>
              <p className="flex items-center">
                <VideoIcon className="text-primary mr-2 size-4" />
                <span className="text-sm font-medium text-muted-foreground">
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>

          {/* Separator 1 */}
          <Separator
            orientation="vertical"
            className="h-full w-[1px] col-start-2"
          />

          {/* Calendar (middle) */}
          <div className="col-start-3 col-end-4">
            <RenderCalendar scheduled={data.User?.scheduled as any} />
          </div>

          {/* Separator 2 */}
          <Separator
            orientation="vertical"
            className="h-full w-[1px] col-start-4"
          />

          {/* Right section */}
          <div className="col-start-5 col-end-6">
            <TimeTable duration={data.duration} userName={username} selectedDate={selectedDate} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
