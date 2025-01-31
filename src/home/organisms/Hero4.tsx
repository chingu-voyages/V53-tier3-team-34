"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import BlueButton from "../molecules/BlueButton";

const MotionBlueButton = motion.create(BlueButton);
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
    <div className="p-8 lg:py-28 bg-white flex flex-col items-center justify-center gap-16">
      <motion.div
        className="text-center text-black text-3xl font-semibold font-['Mona Sans'] leading-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        Let&apos;s explore together and never feel lost in the cold city again –
        create and join events effortlessly!
      </motion.div>
      <motion.div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 lg:pl-3 flex-wrap">
        {listOfImages.map((img, index) => {
          // Create a wrapper for every 2 images
          if (index % 2 === 0) {
            return (
              <motion.div
                key={`eventSnap-${img}`}
                className="flex flex-col space-y-3 items-center lg:items-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: false }}
              >
                <Image
                  src={img}
                  alt={`eventSnap-${index}`}
                  width={422}
                  height={index % 2 === 0 ? 280 : 527}
                  className={`w-min lg:w-full object-cover max-w-[422px] ${
                    index % 2 === 0 ? "max-h-[280px]" : "max-h-[527px]"
                  }`}
                />
                {index + 1 < listOfImages.length && (
                  <Image
                    src={listOfImages[index + 1]}
                    alt={`eventSnap-${index + 1}`}
                    width={422}
                    height={(index + 1) % 2 === 0 ? 280 : 527}
                    className={`w-min lg:w-full object-cover max-w-[422px] ${
                      (index + 1) % 2 === 0 ? "max-h-[280px]" : "max-h-[527px]"
                    }`}
                  />
                )}
              </motion.div>
            );
          }
          return null; // No need to render anything when index is odd, as it's handled in the even index
        })}
      </motion.div>
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
  );
};

export default Hero4;
