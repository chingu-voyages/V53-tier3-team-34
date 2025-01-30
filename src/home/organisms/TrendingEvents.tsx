"use client";
import getTrendingEvents from "@/actions/getTrendingEvents";
import { motion } from "framer-motion";
import { Mona_Sans } from "next/font/google";
import type React from "react";
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

const TrendingEvents: React.FC = async () => {
  let trendingEvents = await getTrendingEvents();
  if (!trendingEvents || trendingEvents.length === 0) {
    trendingEvents = defaultEvents;
  }
  return (
    <div className="py-12">
      <motion.h3
        className={`text-3xl text-black leading-10 pl-16 ${monaSans.className}`}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        Trending Now
      </motion.h3>
      <div className="w-full inline-flex flex-nowrap overflow-x-hidden">
        {trendingEvents && (
          <div className="flex items-center justify-center gap-8 py-12 pl-8 [--scroll-duration:20s] animate-infinite-scroll">
            {trendingEvents.map((event) => (
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
        {trendingEvents && (
          <div className="flex items-center justify-center gap-8 py-12 pl-8 [--scroll-duration:20s] animate-infinite-scroll">
            {trendingEvents.map((event) => (
              <EventCard
                key={event.id}
                id={`Event${event.id}-duplicate`}
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
