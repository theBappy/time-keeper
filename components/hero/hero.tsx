import { AuthModal } from "../auth-modal/auth-modal";
import Image from "next/image";
import HeroImage from "@/public/hero.png";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          Introducing TimeKeeper 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
          Scheduling Made 
          <span className="block text-primary -mt-1">Effortlessly Simple</span>
        </h1>
        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Save tons of time by scheduling your daily workloads with TimeKeeper.
          Have a meeting with your clients in scheduled time.
        </p>
        <div className="mt-5 mb-12">
          <AuthModal />
        </div>
      </div>

      {/* Hero Image with Gradient Glow */}
      <div className="relative items-center w-full py-12 mx-auto mt-12">
        {/* Gradient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-primary/30 via-primary/20 to-transparent blur-3xl rounded-full pointer-events-none" />

        {/* Actual image */}
        <Image
          src={HeroImage}
          alt="hero-image"
          className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
        />
      </div>
    </section>
  );
}
