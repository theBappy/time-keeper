import { MeetingCreation } from "@/app/actions";
import { RenderCalendar } from "@/components/meeting-form/render-calender";
import { TimeTable } from "@/components/meeting-form/time-table";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  if (!data) return notFound();
  return data;
}

export default async function BookingForm({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; eventUrl: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  const { username, eventUrl } = await params;

  const data = await getData(eventUrl, username);

  const { date, time } = await searchParams;
  const selectedDate =
    date && !isNaN(Date.parse(date)) ? new Date(date) : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!date && !!time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] md:gap-5">
            {/* Left column */}
            <div className="col-start-1 col-end-2">
              <img
                src={data.User?.image || ""}
                alt="user-image"
                className="w-10 h-10 rounded-full"
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
                  <CalendarX2 className="text-primary mr-2 w-4 h-4" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="text-primary mr-2 w-4 h-4" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="text-primary mr-2 w-4 h-4" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="h-full w-[1px] col-start-2"
            />

            {/* Booking Form */}
            <div className="col-start-3 col-end-4">
              <form action={MeetingCreation} className="flex flex-col gap-y-4">
                <input type="hidden" name="fromTime" value={time} />
                <input type="hidden" name="eventDate" value={date} />
                <input
                  type="hidden"
                  name="meetingLength"
                  value={data.duration}
                />
                <input
                  type="hidden"
                  name="provider"
                  value={data.videoCallSoftware}
                />
                <input type="hidden" name="username" value={username} />
                <input type="hidden" name="eventTypeId" value={data.id} />

                <div className="flex flex-col gap-y-1">
                  <Label>Your Name</Label>
                  <Input
                    name="name"
                    placeholder="eg. John Doe"
                    className="mt-2"
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label>Your Email</Label>
                  <Input
                    name="email"
                    placeholder="johndoe@example.com"
                    className="mt-2"
                  />
                </div>

                <SubmitButton text="Book Meeting" className="w-full mt-4" />
              </form>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] md:gap-5">
            {/* Left column */}
            <div className="col-start-1 col-end-2">
              <img
                src={data.User?.image || ""}
                alt="user-image"
                className="w-10 h-10 rounded-full"
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
                  <CalendarX2 className="text-primary mr-2 w-4 h-4" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="text-primary mr-2 w-4 h-4" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutes
                  </span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="text-primary mr-2 w-4 h-4" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="h-full w-[1px] col-start-2"
            />

            {/* Calendar */}
            <div className="col-start-3 col-end-4">
              <RenderCalendar scheduled={data.User?.scheduled || []} />
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="h-full w-[1px] col-start-4"
            />

            {/* Right section */}
            <div className="col-start-5 col-end-6">
              <TimeTable
                duration={data.duration}
                userName={username}
                selectedDate={selectedDate}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
