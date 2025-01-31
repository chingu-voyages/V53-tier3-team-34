"use client";
import { motion } from "framer-motion";
import { Mona_Sans } from "next/font/google";
import type React from "react";
import { useEffect, useState } from "react";
import EventCard, { type EventCardProps } from "../molecules/EventCard";

const defaultEvents: EventCardProps[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-06-15T09:00:00"),
    address: "123 Tech St, Silicon Valley, CA",
    costPerPerson: 299,
  },
  {
    id: "9",
    title: "Yoga & Wellness Retreat",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-05-10T08:00:00"),
    address: "45 Tranquil Path, Sedona, AZ",
    costPerPerson: 399,
  },
  {
    id: "2",
    title: "Food Festival 2025",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-04-22T11:00:00"),
    address: "Market Square, Downtown, LA",
    costPerPerson: 50,
  },
  {
    id: "3",
    title: "Art Exhibition: Modern Masters",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-07-01T10:00:00"),
    address: "Art Gallery, 77 Museum Blvd, NYC",
    costPerPerson: 25,
  },
  {
    id: "4",
    title: "Charity Gala 2025",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-08-14T19:00:00"),
    address: "Grand Ballroom, 400 Park Ave, NYC",
    costPerPerson: 500,
  },
  {
    id: "5",
    title: "Outdoor Music Festival",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-06-25T13:00:00"),
    address: "Sunny Park, 250 Hillside Dr, Austin, TX",
    costPerPerson: 120,
  },
  {
    id: "6",
    title: "Cooking Class: Italian Cuisine",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-04-18T18:00:00"),
    address: "Culinary Institute, 300 Main St, Chicago, IL",
    costPerPerson: 85,
  },
  {
    id: "10",
    title: "Virtual Coding Bootcamp",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-05-05T09:00:00"),
    address: "Online Event",
    costPerPerson: 499,
  },
  {
    id: "7",
    title: "Film Premiere: Adventure Awaits",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-06-10T20:00:00"),
    address: "Hollywood Theatre, 1300 Vine St, LA",
    costPerPerson: 45,
  },
  {
    id: "8",
    title: "Sustainable Living Workshop",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4d66/e63e/7b7e0fa51e93aa430339c4e7f8889158?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=InC84EIb6tGpfncN-qpum39SQU1jAEOeSvGA4a2Rkd3qHXwLNa1WDYtVgM2UKdjZotPFnUmR~0waRTwCFNj7V5reMCkVMDXGi9HQoNeSOYMKYX2njxEuKF80tFOAe0dYT4Gcqj~BGxvNjCSD2R8HVHsQI-yABiFHkCl-UCjj6~8aQaZqEogYOKFYKzAa8Gm9UqFRbhvhrPxXM8rg9q7f3~vUuF~zkE7hMxtWRn~mZtB2T~ervJigLbBlu4Tmyx~EZgxLc9iNSYPzyUYM3kG2MHoUifm4lIlM9bpncfDvAks64ChMoc4utBgL7MimKFx~oJhOvp-mFrPrZlAHKBXEQA__",
    startDateTime: new Date("2025-07-20T10:00:00"),
    address: "Eco Center, 100 Greenway Dr, Portland, OR",
    costPerPerson: 60,
  },
];

const monaSans = Mona_Sans({
  weight: "600",
  subsets: ["latin"],
});

const TrendingEvents: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [trendingEvents, setTrendingEvents] = useState<EventCardProps[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<EventCardProps[]>([]);
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
              <EventCard
                key={event.id}
                id={`Event${event.id}`}
                title={event.title}
                imageUrl={event.imageUrl}
                startDateTime={event.startDateTime}
                address={event.address}
                costPerPerson={event.costPerPerson}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingEvents;
