import { updateScheduledAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import { times } from "@/lib/time";
import { notFound } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.scheduled.findMany({
    where: {
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ScheduledPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Scheduled</CardTitle>
        <CardDescription>In here you can manage your schedule!</CardDescription>
      </CardHeader>
      <form action={updateScheduledAction}>
        <CardContent className="flex flex-col gap-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
            >
              <input type="hidden" name={`id-${item.id}`} value={item.id} />
              <div className="flex items-center gap-x-3">
                <Switch
                  name={`isActive-${item.id}`}
                  defaultChecked={item.isActive}
                  className="cursor-pointer"
                />
                <p>{item.day}</p>
              </div>

              {/* From Time */}
              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time, idx) => (
                      <SelectItem className="cursor-pointer" key={`from-${item.id}-${idx}`} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Till Time */}
              <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Till Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time, idx) => (
                      <SelectItem className="cursor-pointer" key={`till-${item.id}-${idx}`} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <SubmitButton className="cursor-pointer mt-4" text="Save changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
