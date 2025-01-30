"use client";
import { motion } from "framer-motion";
import { Inter, Mona_Sans } from "next/font/google";
import type React from "react";
import BlueButton from "../molecules/BlueButton";
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });
const inter = Inter({ weight: "600", subsets: ["latin"] });
const Hero1: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-hero1 bg-center bg-origin-border bg-no-repeat bg-cover">
      <div className="flex flex-col items-center justify-center gap-14">
        <motion.h1
          className={`md:w-3/4 text-center text-black text-6xl font-semibold leading-tight ${monaSans.className}`}
          initial={false}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          Host your events in seconds
        </motion.h1>
        <motion.p
          className={`md:w-3/4 text-center text-[#4d4d4d] text-2xl font-semibold leading-tight ${inter.className}`}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          Spend less time on logistics and more time enjoying your event. Host
          private events in seconds with our easy-to-use Partiyo
        </motion.p>
        <div className="flex flex-col items-center justify-center gap-2">
          <BlueButton text="Create Event" href="/events/create" />
        </div>
      </div>
    </div>
  );
};

export default Hero1;
