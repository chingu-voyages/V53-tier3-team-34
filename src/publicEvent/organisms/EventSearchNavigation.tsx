"use client";
import getFilteredEvents from "@/actions/getFilteredEvents";
import type { EventCardInfo } from "@/home/molecules/EventCard";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import EventList from "./EventList";
import EventNotFound from "./EventNotFound";

const EventSearchNavigation: React.FC = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const [events, setEvents] = useState<EventCardInfo[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const foundEvents = await getFilteredEvents(title, location);
      setEvents(foundEvents);
    };
    fetchEvents();
  }, [title, location]);

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
