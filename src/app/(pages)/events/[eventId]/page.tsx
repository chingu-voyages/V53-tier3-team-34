import getEvent from "@/actions/getEvent";
import EventImage from "@/components/eventImage/EventImage";
import ImageUpload from "@/components/imageUpload";
import RemoveEventImage from "@/components/removeEventImage";

const UserEvents = async ({
  params,
}: {
  params: Promise<{
    eventId: string;
    userId: string;
  }>;
}) => {
  const { eventId, userId } = await params;
  const event = await getEvent(eventId, userId);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-14">
      <h1>Event</h1>
      <h2 className="text-3xl font-bold p-3">{event.title}</h2>
      <p>{event.description}</p>
      {event.image && (
        <div>
          <EventImage image={event.image} />
          <RemoveEventImage eventId={event.id} />
        </div>
      )}
      {!event.image && <ImageUpload eventId={event.id} />}
    </div>
  );
};

export default UserEvents;
