import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import VideoGif from "@/public/2.gif";
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// authenticate with nylas to get grant-id for further api request
export default function OnboardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          Your are almost done!
          <CardDescription className="mb-2">
            We&apos;ve to connect  calendar to the account.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="almost done gif"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" />
              Connect Calender to Your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
