import EventCard, { type EventCardInfo } from "@/home/molecules/EventCard";

export default function EventList({ events }: { events: EventCardInfo[] }) {
  return (
    <div className="flex flex-wrap gap-10 align-start justify-center">
      {events.map((event) => (
        <EventCard key={event.id} event={event} textColor="text-white" />
      ))}
    </div>
  );
}
