"use client";
import EventCard, { type EventCardInfo } from "@/home/molecules/EventCard";
import Header from "@/home/organisms/Header";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import queriedEvents from "./queryEvents";

export default function PublicEvents() {
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
    <main className="bg-black px-16 text-white min-h-screen">
      <Header />

      <section>
        {(title || location) && (
          <h1 className="mb-5 text-3xl">
            <span className="text-dimGray">Search:</span> {title && title}{" "}
            {location && `in ${location}`}
          </h1>
        )}
        <div className="flex flex-wrap gap-10 justify-between">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCard event={event} textColor="text-white" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
