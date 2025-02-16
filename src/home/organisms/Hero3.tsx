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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { data: session } = useSession();
  const handleViewportChange = (inView: boolean) => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play(); // Play video when in view
      } else {
        videoRef.current.pause(); // Pause video when out of view
      }
    }
  };

  return (
    <div className="bg-black p-8 md:p-20 lg:py-40 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-16">
      <motion.video
        ref={videoRef}
        className="rounded-2xl"
        autoPlay
        muted
        loop
        style={{ height: "700px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
        onViewportEnter={() => handleViewportChange(true)}
        onViewportLeave={() => handleViewportChange(false)}
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
          href={session?.user ? "/events/public" : "/register"}
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
