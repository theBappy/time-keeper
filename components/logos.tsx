"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Google from "@/public/google.png"
import Meta from "@/public/meta.svg"
import Microsoft from "@/public/microsoft.svg"
import Netflix from "@/public/review4.svg"
import N8N from "@/public/n8n.svg"

const logos = [
  {
    src: Microsoft,
    alt: "Microsoft",
    width: 60,
  },
  {
    src: Meta,
    alt: "Meta",
    width: 80,
  },
  {
    src: Google,
    alt: "Google",
    width: 120,
  },
  {
    src: Netflix,
    alt: "Netflix",
    width: 60,
  },
  {
    src: N8N,
    alt: "N8N",
    width: 100,
  },
];

export function Logos() {
  return (
    <div className="py-12 overflow-hidden">
      <h2 className="text-center text-lg font-semibold leading-7 text-primary mb-10">
        Trusted by the best companies in the world
      </h2>

      <motion.div
        className="flex gap-16 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={40}
            className="object-contain transition"
          />
        ))}
      </motion.div>
    </div>
  );
}
