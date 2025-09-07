"use client"

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { toast } from "sonner";

export function CopyLink({ meetingUrl }: { meetingUrl: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("URL has been copied")
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy URL")
    }
  };
  return (
    <DropdownMenuItem 
    onSelect={handleCopy}
    className="cursor-pointer">
      <Link2 className="mr-2 size-4" />
      Copy
    </DropdownMenuItem>
  );
}
