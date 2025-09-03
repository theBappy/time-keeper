import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "../ui/dialog";
import Logo from "@/public/logo.png";
import { signIn } from "../../lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "../submit-button";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row items-center justify-center gap-2">
          <Image src={Logo} alt="logo" className="size-8" />
          <h4 className="text-2xl font-medium">
            Time
            <span className="text-primary">Keeper</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
            className="w-full"
          >
            <GoogleAuthButton />
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
            className="w-full"
          >
            <GithubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
