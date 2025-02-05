"use client";
import { defaultEvents } from "@/app/(pages)/events/public/dummyEvents";
import { motion } from "framer-motion";
import { Mona_Sans } from "next/font/google";
import type React from "react";
import { useEffect, useState } from "react";
import EventCard, { type EventCardInfo } from "../molecules/EventCard";

const monaSans = Mona_Sans({
  weight: "600",
  subsets: ["latin"],
});

const TrendingEvents: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [trendingEvents, setTrendingEvents] = useState<EventCardInfo[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<EventCardInfo[]>([]);
  const itemWidth = 292; // Width of each event card

  useEffect(() => {
    const fetchTrendingEvents = async () => {
      try {
        const response = await fetch("/api/events/getTrendingEvents");
        if (!response.ok) throw new Error("Failed to fetch trending events");
        const data = await response.json();
        if (data.length === 0) {
          setTrendingEvents(defaultEvents);
        } else {
          setTrendingEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchTrendingEvents();
  }, []);

  useEffect(() => {
    const updateDisplayedEvents = () => {
      const numberOfItemsToDisplay = Math.floor(window.innerWidth / itemWidth);
      const startIndex = Math.max(0, activeIndex - numberOfItemsToDisplay + 1);
      const endIndex = Math.min(
        trendingEvents.length,
        activeIndex + numberOfItemsToDisplay,
      );

      setDisplayedEvents(trendingEvents.slice(startIndex, endIndex));
    };

    if (trendingEvents.length > 0) {
      updateDisplayedEvents();
    }

    window.addEventListener("resize", updateDisplayedEvents);

    return () => {
      window.removeEventListener("resize", updateDisplayedEvents);
    };
  }, [activeIndex, trendingEvents]);

  const handlePreviousClick = () => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        prevIndex - 1 >= 0 ? prevIndex - 1 : trendingEvents.length - 1;
      return newIndex;
    });
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        prevIndex + 1 < trendingEvents.length ? prevIndex + 1 : 0;
      return newIndex;
    });
  };

  return (
    <div className="p-8 lg:p-16">
      <div className="flex flex-row justify-between">
        <motion.h3
          className={`text-3xl text-black leading-10  ${monaSans.className}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          Trending Now
        </motion.h3>
        <div className="flex flex-row gap-4">
          <button
            className="w-12 h-12"
            type="button"
            onClick={handlePreviousClick}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="Previous"
            >
              <title>Previous</title>
              <path
                d="M31.4142 13.4142C32.1953 12.6332 32.1953 11.3668 31.4142 10.5858C30.6332 9.80474 29.3668 9.80474 28.5858 10.5858L16.5858 22.5858C15.8286 23.3429 15.8021 24.5621 16.5257 25.3514L27.5257 37.3514C28.2721 38.1657 29.5372 38.2207 30.3515 37.4743C31.1657 36.7279 31.2207 35.4628 30.4743 34.6486L20.7683 24.0602L31.4142 13.4142Z"
                fill="#7A7878"
              />
            </svg>
          </button>
          <button className="w-12 h-12" type="button" onClick={handleNextClick}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180)"
              aria-labelledby="Next"
            >
              <title>Next</title>
              <path
                d="M31.4142 13.4142C32.1953 12.6332 32.1953 11.3668 31.4142 10.5858C30.6332 9.80474 29.3668 9.80474 28.5858 10.5858L16.5858 22.5858C15.8286 23.3429 15.8021 24.5621 16.5257 25.3514L27.5257 37.3514C28.2721 38.1657 29.5372 38.2207 30.3515 37.4743C31.1657 36.7279 31.2207 35.4628 30.4743 34.6486L20.7683 24.0602L31.4142 13.4142Z"
                fill="#7A7878"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full inline-flex flex-nowrap overflow-x-hidden">
        {trendingEvents.length > 0 && (
          <div className="flex items-center justify-center gap-8 pt-12">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingEvents;
