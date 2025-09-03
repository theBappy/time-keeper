"use client"

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import Google from "@/public/google.svg";
import Github from "@/public/github.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";

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
