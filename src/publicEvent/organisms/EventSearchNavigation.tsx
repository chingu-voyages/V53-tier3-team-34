"use client";
import queriedEvents from "@/app/(pages)/events/public/queryEvents";
import type { EventCardInfo } from "@/home/molecules/EventCard";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import EventList from "./EventList";

const EventSearchNavigation: React.FC = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const [events, setEvents] = useState<EventCardInfo[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const foundEvents = await queriedEvents({ title, location });
      setEvents(foundEvents);
    };
    fetchEvents();
  }, [title, location]);

  return (
    <section>
      <EventList events={events} />
    </section>
  );
};

export default EventSearchNavigation;
