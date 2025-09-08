import { DeleteEventAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteEvent({
  params,
}: {
  params: { eventTypeId: string };
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Delete Event</CardTitle>
          <CardDescription>
            Are you sure you want to delete this event?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventAction}>
            <input type="hidden" name="id" value={params.eventTypeId} />
            <SubmitButton text="Delete Event" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
