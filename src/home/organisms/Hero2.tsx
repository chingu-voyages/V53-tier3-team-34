"use client";
import { motion } from "framer-motion";
import { Inter, Mona_Sans } from "next/font/google";
import type React from "react";
import BlueButton from "../molecules/BlueButton";

const inter = Inter({ weight: "600", subsets: ["latin"] });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });

const Hero2: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      <div className="w-1/2 h-1/2 bg-[#d6ff0b] blur-3xl rounded-b-full" />
      <div className="absolute -left-[150px] -bottom-[100px] w-3/4 h-full bg-[#F5AFB9] shadow-2xl blur-3xl rounded-full" />
      <div className="absolute -right-[100px] -bottom-[100px] w-1/2 h-1/2 bg-[#0249ED] shadow-[34.57rem_34.57rem_34.57rem] blur-3xl rounded-full" />
      <div className="w-full absolute left-0 top-0 h-full px-16 py-36 bg-gradient-to-r from-neutral-50 flex flex-row items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-8 w-1/2">
          <h1
            className={`text-6xl leading-tight text-center ${monaSans.className}`}
          >
            Discover customised activities around you
          </h1>
          <p className={`text-2xl leading-tight ${inter.className}`}>
            Attending the same events and sharing the same interests
          </p>
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

  return (
    <div className="relative w-96 h-96" style={{ perspective: "1000px" }}>
      {/* Circles */}
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

      {/* Images moving in circular motion
      {["image1.png", "image2.png", "image3.png"].map((img, index) => (
        <motion.img
          key={index}
          src={img}
          alt={`image-${index}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "50px",
            height: "50px",
          }}
          animate={{
            rotate: [0, 360],
            x: Math.sin((index / 3) * Math.PI * 2) * 160,
            y: Math.cos((index / 3) * Math.PI * 2) * 160,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 8,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      ))} */}
    </div>
  );
};
