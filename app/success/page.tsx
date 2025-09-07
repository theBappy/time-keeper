"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    setShowConfetti(true);

    const timer = setTimeout(() => setShowConfetti(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center relative">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      
      <Card className="max-w-[400px] w-full mx-auto z-10">
        <CardContent className="p-6 flex flex-col w-full items-center">
          {/* Animated Check */}
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center relative">
            <Check className="w-8 h-8 text-green-500 stroke-[3] animate-draw-check" />
          </div>

          <h1 className="text-2xl font-semibold mt-4 text-center">
            This event is scheduled
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            We emailed you a calendar invitation with all the details and video
            call link!
          </p>
        </CardContent>

        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Go Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
