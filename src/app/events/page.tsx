import getEvents from "@/actions/getEvents";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EventsPage = async () => {
  const events = await getEvents();

  if (!events) {
    return <div>No events</div>;
  }

  return (
    <div className="p-14">
      <h1>User dashboard</h1>
      <h2 className="text-3xl font-bold p-3">Events</h2>
      {events.map((event) => (
        <div
          key={event.id}
          className="p-3 text-slate-900 border-2 border-solid max-w-80 rounded-lg"
        >
          <div key={event.id}>
            <h3 className="font-semibold text-2xl ">{event.title}</h3>
          </div>
          <Button variant="secondary">
            <Link href={`/events/${event.id}`}>View</Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EventsPage;
