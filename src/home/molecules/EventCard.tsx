"use client";
import type { EventFormData } from "@/createEvent/templates/EventForm";
import { motion } from "framer-motion";
import { Inter, Mona_Sans } from "next/font/google";
import Image from "next/image";
import type React from "react";

export type EventCardProps = {
  event: EventCardInfo;
  textColor?: string;
};
export type EventCardInfo = Pick<
  EventFormData,
  "title" | "imageUrl" | "startDateTime" | "address" | "costPerPerson"
> & {
  id: string;
};

const inter = Inter({ subsets: ["latin"], weight: "600" });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });

const EventCard: React.FC<EventCardProps> = ({
  event: { title, imageUrl, startDateTime, address, costPerPerson },
  textColor,
}) => {
  return (
    <motion.div
      className={
        "flex flex-col gap-2 align-start min-w-[292px] max-w-[292px] self-start"
      }
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: false }}
    >
      {/* Keep minimum width of div same as image width */}
      <div className="relative ">
        <Image
          src={imageUrl || "/assets/images/events/defaultEvent.png"}
          alt="Event"
          width={292}
          height={292}
          className={"w-[292px] h-[292px]"}
        />
        <button
          type="button"
          className="absolute bottom-2 right-2 p-2 bg-[#aeaaaa]/30 rounded-full"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 17 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="Favorite"
          >
            <title>Favorite</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3158 0C10.8475 0 9.13033 1.58135 8.21053 2.6C7.29072 1.58135 5.57358 0 4.10526 0C1.50618 0 0 1.92589 0 4.37702C0 8.45 8.21053 13 8.21053 13C8.21053 13 16.4211 8.45 16.4211 4.55C16.4211 2.09887 14.9149 0 12.3158 0Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <h2
        className={`${textColor ? textColor : "text-black"} text-xl leading-loose break-words ${monaSans.className}`}
      >
        {title}
      </h2>
      <div
        className={`${textColor ? textColor : "text-[#084be7]"} text-base text-wrap leading-loose break-words ${inter.className}`}
      >
        {startDateTime.toString()}
      </div>
      <div
        className={`${textColor ? textColor : "text-black"} text-base leading-loose break-words ${inter.className}`}
      >
        {address}
      </div>
      <p
        className={`${textColor ? textColor : "text-black"} text-base leading-loose break-words ${inter.className}`}
      >
        {costPerPerson && costPerPerson > 0 ? `$${costPerPerson}` : "Free"}
      </p>
    </motion.div>
  );
};

export default EventCard;
