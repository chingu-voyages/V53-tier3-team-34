"use client";
import { motion } from "framer-motion";
import { Inter, Mona_Sans } from "next/font/google";
import Image from "next/image";
import type React from "react";
import BlueButton from "../molecules/BlueButton";

const inter = Inter({ weight: "600", subsets: ["latin"] });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });

const Hero2: React.FC = () => {
  return (
    <div className="relative w-dvw h-dvh px-16 py-36 flex flex-col items-center justify-center h-dvh w-screen overflow-hidden bg-hero2-gradient">
      <div className=" flex flex-row items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-8 w-1/2">
          <motion.h1
            className={`text-6xl leading-tight text-center ${monaSans.className}`}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            Discover customised activities around you
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
          <BlueButton text="Browse Events" href="/events" />
        </div>
        <div className="w-1/2">
          <MovingCirclesAndImages />
        </div>
      </div>
    </div>
  );
};

export default Hero2;

const MovingCirclesAndImages = () => {
  const circles = Array.from({ length: 7 }, (_, index) => index + 1);
  const radius = 120; // Radius of the circular path for the images
  const angleOffset = Math.PI / 4; // Offset angle to position the images correctly
  return (
    <div className="relative w-96 h-96" style={{ perspective: "1000px" }}>
      {/* Concentric Circles */}
      {circles.map((value, index) => (
        <motion.div
          key={value}
          className="absolute rounded-full border border-white"
          style={{
            width: `${(7 - index) * 3}rem`,
            height: `${(7 - index) * 3}rem`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            transform: [
              "translate(-50%, -50%) translateZ(0px)",
              "translate(-50%, -50%) translateZ(160px)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moving Images in Circular Path */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Image 1 */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "center",
          }}
          animate={{
            x: radius * Math.cos(0 + angleOffset),
            y: radius * Math.sin(0 + angleOffset),
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 5,
            ease: "linear",
          }}
        >
          <Image
            src="/assets/images/hero/hero21.png"
            width={224}
            height={280}
            alt={"Event Image"}
          />
        </motion.div>

        {/* Image 2 */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "center",
          }}
          animate={{
            x: radius * Math.cos(Math.PI / 2 + angleOffset), // 90 degrees offset
            y: radius * Math.sin(Math.PI / 2 + angleOffset),
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 5,
            ease: "linear",
          }}
        >
          <Image
            src="/assets/images/hero/hero22.png"
            width={295}
            height={314}
            alt={"Event Image"}
          />
        </motion.div>

        {/* Image 3 */}
        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "center",
          }}
          animate={{
            x: radius * Math.cos(Math.PI + angleOffset), // 180 degrees offset
            y: radius * Math.sin(Math.PI + angleOffset),
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 5,
            ease: "linear",
          }}
        >
          <Image
            src="/assets/images/hero/hero23.png"
            width={360}
            height={360}
            alt={"Event Image"}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
