import { CancelMeeting } from "@/app/actions";
import { EmptyState } from "@/components/empty-state";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { nylas } from "@/lib/nylas";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

export default async function MeetingsPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <div className="space-y-6">
          {data.data.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-muted-foreground">
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="size-5 text-primary" />
                    {item.conferencing?.details?.url ? (
                      <a
                        href={item.conferencing.details.url}
                        target="_blank"
                        className="text-xs text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                      >
                        Join Meeting
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No meeting link
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {item.participants?.length > 0
                        ? `You and ${item.participants
                            .map((p) => p.name)
                            .join(", ")}`
                        : "Just you"}
                    </p>
                  </div>
                  <div>
                    <form action={CancelMeeting}>
                      <input name="eventId" type="hidden" value={item.id} />
                      <SubmitButton
                        text="Cancel Event"
                        variant="destructive"
                        className="w-full sm:w-auto cursor-pointer"
                      />
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
