"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Inter, Mona_Sans } from "next/font/google";
import { useRef } from "react";
import BlueButton from "../molecules/BlueButton";

const inter = Inter({ weight: "600", subsets: ["latin"] });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });
const MotionBlueButton = motion.create(BlueButton);

const EventHero: React.FC = () => {
  const scrollRef = useRef(null);
  const buttonRef = useRef(null);
  const { data: session } = useSession();

  return (
    <div
      ref={scrollRef}
      className="bg-black py-40 px-16 flex items-center justify-center gap-16"
    >
      {/* biome-ignore lint: This video doesn't need captions*/}
      <motion.video
        className="rounded-2xl"
        autoPlay
        loop
        style={{ height: "700px" }}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <source src="/assets/videos/hero3.mp4" type="video/mp4" />
      </motion.video>
      <div className="w-1/2 flex flex-col items-center gap-8 text-white text-center">
        <motion.h1
          className={`text-6xl leading-tight ${monaSans.className}`}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          Your one-piece adventure awaits. Discover your activities now.
        </motion.h1>
        <motion.p
          className={`text-2xl leading-tight ${inter.className}`}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          Attending the same events and sharing the same interests
        </motion.p>
        {session?.user ? (
          <MotionBlueButton
            ref={buttonRef}
            text="Browse Events"
            href="/events"
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileInView={{ opacity: 1, scale: 1 }}
          />
        ) : (
          <MotionBlueButton
            ref={buttonRef}
            text="Join Now"
            href="/register"
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            //transition={{ type: "spring", repeat: Infinity, bounce: 0.5, duration: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
          />
        )}
      </div>
    </div>
  );
};

export default EventHero;
