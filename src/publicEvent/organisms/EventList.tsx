import EventCard, { type EventCardInfo } from "@/home/molecules/EventCard";
import Link from "next/link";

export default function EventList({ events }: { events: EventCardInfo[] }) {
  return (
    <div className="flex flex-wrap gap-10 align-start justify-center">
      {events.map((event) => (
        <Link href={`/events/${event.id}`} key={event.id}>
          <EventCard event={event} textColor="text-white" />
        </Link>
      ))}
    </div>
  );
}
