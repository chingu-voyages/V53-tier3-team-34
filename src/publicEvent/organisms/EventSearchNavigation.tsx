"use client";
import getFilteredEvents from "@/actions/getFilteredEvents";
import type { EventCardInfo } from "@/home/molecules/EventCard";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import EventList from "./EventList";
import EventNotFound from "./EventNotFound";

const EventSearchNavigation: React.FC = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title")?.trim() || "";
  const location = searchParams.get("location")?.trim() || "";
  const fromDate = searchParams.get("from") || "";
  const toDate = searchParams.get("to") || "";
  const minPrice = searchParams.get("price[0]") || "";
  const maxPrice = searchParams.get("price[1]") || "";
  const [events, setEvents] = useState<EventCardInfo[]>([]);

  const price = useMemo<[number, number]>(
    () => [
      minPrice ? Number.parseFloat(minPrice) : 0,
      maxPrice ? Number.parseFloat(maxPrice) : Number.POSITIVE_INFINITY,
    ],
    [minPrice, maxPrice],
  );

  // useEffect(() => {
  //   // Avoid fetching if no search filters are provided
  //   if (
  //     (!title && !location) ||
  //     (price[0] === 0 && price[1] === Number.POSITIVE_INFINITY)
  //   ) {
  //     setEvents([]);
  //     return;
  //   }

  //   const fetchEvents = async () => {
  //     const foundEvents = await getFilteredEvents(title, location, price);
  //     setEvents(foundEvents);
  //   };

  //   fetchEvents();
  // }, [title, location, price]);

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const chipText = searchParams.get("chipText") || "";

  useEffect(() => {
    async function fetchEvents() {
      const filteredEvents = await getFilteredEvents(
        title,
        location,
        price,
        from,
        to,
        chipText,
      );

      setEvents(filteredEvents);
    }

    fetchEvents();
  }, [title, location, price, from, to, chipText]);

  return (
    <section className="flex flex-col items-center">
      {events.length === 0 ? (
        <div>
          <h1 className="text-3xl mb-5">
            <span className="text-gray-500">Search: </span>
            {title && title}{" "}
            {location && <span className="text-gray-500">in {location}</span>}
          </h1>
          <EventNotFound />
        </div>
      ) : (
        <div>
          <h1 className="text-3xl mb-5">
            <span className="text-gray-500">Search: </span>
            {title && title}{" "}
            {location && <span className="text-gray-500">in {location}</span>}
          </h1>

          <EventList events={events} />
        </div>
      )}
    </section>
  );
};

export default EventSearchNavigation;
