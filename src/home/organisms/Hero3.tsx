"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Inter, Mona_Sans } from "next/font/google";
import BlueButton from "../molecules/BlueButton";

const inter = Inter({ weight: "600", subsets: ["latin"] });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });
const MotionBlueButton = motion.create(BlueButton);

const EventHero: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-black p-8 md:p-20 lg:py-40 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-16">
      {/* biome-ignore lint: This video doesn't need captions*/}
      <motion.video
        className="rounded-2xl"
        autoPlay
        loop
        style={{ height: "700px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <source src="/assets/videos/hero3.mp4" type="video/mp4" />
      </motion.video>
      <div className="lg:w-1/2 flex flex-col items-center gap-8 text-white text-center">
        <motion.h1
          className={`text-6xl leading-tight ${monaSans.className}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          Your one-piece adventure awaits. Discover your activities now.
        </motion.h1>
        <motion.p
          className={`text-2xl leading-tight ${inter.className}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          Attending the same events and sharing the same interests
        </motion.p>
        <MotionBlueButton
          text={session?.user ? "Browse Events" : "Join Now"}
          href={session?.user ? "/events" : "/register"}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
      </div>
    </div>
  );
};

export default EventHero;
