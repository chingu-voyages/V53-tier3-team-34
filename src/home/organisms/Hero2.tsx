"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Inter, Mona_Sans } from "next/font/google";
import Image from "next/image";
import type React from "react";
import BlueButton from "../molecules/BlueButton";

const inter = Inter({ weight: "600", subsets: ["latin"] });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });

const MotionBlueButton = motion.create(BlueButton);

const Hero2: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="relative w-dvw p-8 lg:px-16 lg:py-36 flex lg:flex-row flex-col items-center justify-center h-dvh w-screen overflow-hidden bg-hero2-gradient">
      <div className=" flex flex-row items-center justify-center gap-12">
        <div className="flex flex-col items-center justify-center gap-8 w-1/2">
          <motion.h1
            className={`text-6xl leading-tight text-center ${monaSans.className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: false }}
          >
            Discover customised activities around you
          </motion.h1>
          <motion.p
            className={`text-2xl leading-tight text-center ${inter.className}`}
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
        <div className="w-1/2 hidden lg:block">
          <MovingCirclesAndImages />
        </div>
      </div>
    </div>
  );
};

export default Hero2;

const MovingCirclesAndImages = () => {
  const circles = Array.from({ length: 7 }, (_, index) => index + 1);

  return (
    <div className="relative w-full h-dvh">
      <div className="absolute w-full h-full" style={{ perspective: "1000px" }}>
        {circles.map((value, index) => (
          <motion.div
            key={value}
            className="absolute rounded-full border border-white"
            style={{
              width: `${(7 - index) * 6}rem`,
              height: `${(7 - index) * 6}rem`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: false }}
            // animate={{
            //   transform: [
            //     "translate(-50%, -50%) translateZ(0px)",
            //     "translate(-50%, -50%) translateZ(160px)",
            //   ],
            // }}
            // transition={{
            //   duration: 1.5,
            //   repeat: Number.POSITIVE_INFINITY,
            //   repeatType: "reverse",
            //   delay: index * 0.15,
            //   ease: "easeInOut",
            // }}
          />
        ))}
      </div>

      {/* Image 1 - Starting from top right */}
      <motion.div
        className="absolute"
        style={{
          top: "19.5%",
          right: "12%",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
        // animate={{
        // transform: [
        //   "translate(0%, 0%)",
        //   "translate(10%, 200%) scale(2)",
        //   "translate(-100%, 50%) scale(1.5)",
        //   "translate(0%, 0%)",
        // ],
        // }}
        // transition={{
        //   duration: 5,
        //   repeat: Infinity,
        //   ease: "linear",
        //   times: [0, 0.25, 0.5, 0.75, 1],
        // }}
      >
        <Image
          src="/assets/images/hero/hero21.png"
          width={224}
          height={280}
          alt="Event Image"
          className="w-56 h-70"
        />
      </motion.div>

      {/* Image 2 - Starting from middle left */}
      <motion.div
        className="absolute"
        style={{
          left: "0%",
          top: "30%",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
        // animate={{
        //   transform: [
        //     "translate(0%, 0%)",
        //     "translate(60%, -65%)",
        //     "translate(120%, 90%) scale(1.2)",
        //   ],
        // }}
        // transition={{
        //   duration: 5,
        //   repeat: Number.POSITIVE_INFINITY,
        //   ease: "linear",
        //   times: [0, 0.25, 0.5, 0.75, 1],
        // }}
      >
        <Image
          src="/assets/images/hero/hero22.png"
          width={295}
          height={314}
          alt="Event Image"
        />
      </motion.div>

      {/* Image 3 - Starting from bottom right */}
      <motion.div
        className="absolute"
        style={{
          bottom: "20.8%",
          right: "-10%",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
        // animate={
        //   {
        //   }
        // }
        // transition={{
        //   duration: 5,
        //   repeat: Infinity,
        //   ease: "linear",
        //   times: [0, 0.25, 0.5, 0.75, 1],
        // }}
      >
        <Image
          src="/assets/images/hero/hero23.png"
          width={360}
          height={360}
          alt="Event Image"
        />
      </motion.div>
    </div>
  );
};
