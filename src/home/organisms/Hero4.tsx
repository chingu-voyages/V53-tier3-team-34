"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import type React from "react";
import BlueButton from "../molecules/BlueButton";
const Hero4: React.FC = () => {
  const { data: session } = useSession();
  const listOfImages = [
    "/assets/images/hero/hero41.png",
    "/assets/images/hero/hero42.png",
    "/assets/images/hero/hero43.png",
    "/assets/images/hero/hero44.png",
    "/assets/images/hero/hero45.png",
    "/assets/images/hero/hero46.png",
    "/assets/images/hero/hero47.png",
  ];
  return (
    <div className="py-28 bg-white flex flex-col items-center justify-center gap-16">
      <motion.div
        className="text-center text-black text-3xl font-semibold font-['Mona Sans'] leading-10"
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        Let&apos;s explore together and never feel lost in the cold city again –
        create and join events effortlessly!
      </motion.div>
      <div className="w-full inline-flex flex-nowrap">
        <motion.div className="flex flex-row items-start justify-start gap-3 pl-3 [--scroll-duration:15s] animate-infinite-scroll">
          {listOfImages.map((img, index) => {
            // Create a wrapper for every 2 images
            if (index % 2 === 0) {
              return (
                <motion.div
                  key={`eventSnap-${img}`}
                  className="flex flex-col space-y-3"
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn" }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <Image
                    src={img}
                    alt={`eventSnap-${index}`}
                    width={422}
                    height={index % 2 === 0 ? 280 : 527}
                    className={`object-cover max-w-[422px] ${
                      index % 2 === 0 ? "max-h-[280px]" : "max-h-[527px]"
                    }`}
                  />
                  {index + 1 < listOfImages.length && (
                    <Image
                      src={listOfImages[index + 1]}
                      alt={`eventSnap-${index + 1}`}
                      width={422}
                      height={(index + 1) % 2 === 0 ? 280 : 527}
                      className={`object-cover max-w-[422px] ${
                        (index + 1) % 2 === 0
                          ? "max-h-[280px]"
                          : "max-h-[527px]"
                      }`}
                    />
                  )}
                </motion.div>
              );
            }
            return null; // No need to render anything when index is odd, as it's handled in the even index
          })}
        </motion.div>
        <div className="flex flex-row items-start justify-start gap-3 pl-3 [--scroll-duration:15s] animate-infinite-scroll">
          {listOfImages.map((img, index) => {
            // Create a wrapper for every 2 images
            if (index % 2 === 0) {
              return (
                <motion.div
                  key={`eventSnap-${img}-duplicate`}
                  className="flex flex-col space-y-3"
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn" }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <Image
                    src={img}
                    alt={`eventSnap-${index}-duplicate`}
                    width={422}
                    height={index % 2 === 0 ? 280 : 527}
                    className={`object-cover max-w-[422px] ${
                      index % 2 === 0 ? "max-h-[280px]" : "max-h-[527px]"
                    }`}
                  />
                  {index + 1 < listOfImages.length && (
                    <Image
                      src={listOfImages[index + 1]}
                      alt={`eventSnap-${index + 1}-duplicate`}
                      width={422}
                      height={(index + 1) % 2 === 0 ? 280 : 527}
                      className={`object-cover max-w-[422px] ${
                        (index + 1) % 2 === 0
                          ? "max-h-[280px]"
                          : "max-h-[527px]"
                      }`}
                    />
                  )}
                </motion.div>
              );
            }
            return null; // No need to render anything when index is odd, as it's handled in the even index
          })}
        </div>
      </div>
      {session?.user ? (
        <BlueButton text="Browse Events" href="/events" />
      ) : (
        <BlueButton text="Join Now" href="/register" />
      )}
    </div>
  );
};

export default Hero4;
