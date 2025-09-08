"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "TimeKeeper makes scheduling meetings effortless. It's fast, intuitive, and keeps my team on track.",
    author: "John Doe",
    company: "Meta",
    logo: "/meta.svg",
  },
  {
    quote:
      "I love how TimeKeeper integrates seamlessly with Google Calendar. My workflow has never been smoother!",
    author: "Jane Smith",
    company: "Google",
    logo: "/google.svg",
  },
  {
    quote:
      "Professional, reliable, and secure. TimeKeeper has saved us countless hours of coordination.",
    author: "Michael Brown",
    company: "Microsoft",
    logo: "/microsoft.svg",
  },
  {
    quote:
      "Very well organized and fast to schedule a meeting, very well suited for busy scheduling",
    author: "Jenny Wilson",
    company: "Amazon",
    logo: "/amazon.svg",
  },
];

export function Testimonials() {
  const repeatedTestimonials = [...testimonials, ...testimonials];
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 20,
        ease: "linear",
      },
    });
  }, [controls]);

  const pauseAnimation = () => {
    controls.stop();
  };

  const resumeAnimation = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 20,
        ease: "linear",
      },
    });
  };

  return (
    <section className="py-16 w-full">
      <h2 className="text-center text-3xl sm:text-4xl font-semibold text-primary mb-12">
        What our users say
      </h2>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={pauseAnimation}
        onMouseLeave={resumeAnimation}
      >
        <motion.div className="flex gap-8" animate={controls}>
          {repeatedTestimonials.map((t, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-96 bg-transparent rounded-2xl p-8 shadow-lg"
            >
              <Image
                src={t.logo}
                alt={t.company}
                width={40}
                height={20}
                className="mb-4 object-contain"
              />
              <p className="text-gray-700 dark:text-gray-200 text-lg sm:text-xl font-medium mb-6">
                “{t.quote}”
              </p>
              <p className="font-semibold text-primary">{t.author}</p>
              <p className="text-gray-500 dark:text-gray-400">{t.company}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
