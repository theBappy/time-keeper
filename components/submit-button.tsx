"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import Google from "@/public/google.svg";
import Github from "@/public/github.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
}

export function SubmitButton({ text, variant, className }: Props) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className={cn("w-fit", className)} disabled variant="outline">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          className={cn("w-fit", className)}
          type="submit"
          variant={variant}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="animate-spin size-4 mr-2" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={Google} alt="google logo" className="size-4 mr-2" />
          Sign in with Google
        </Button>
      )}
    </>
  );
}
export function GithubAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="animate-spin size-4 mr-2" /> Please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={Github} alt="google logo" className="size-4 mr-2" />
          Sign in with Github
        </Button>
      )}
    </>
  );
}
