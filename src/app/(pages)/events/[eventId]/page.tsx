import getEvent from "@/actions/getEvent";
import EventImage from "@/components/eventImage/EventImage";
import ImageUpload from "@/components/imageUpload";
import RemoveEventImage from "@/components/removeEventImage";

const UserEvents = async ({
  params,
}: {
  params: Promise<{
    eventId: string;
  }>;
}) => {
  const { eventId } = await params;
  const event = await getEvent(eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="p-14">
      <h1>Event</h1>
      <h2 className="text-3xl font-bold p-3">{event.title}</h2>
      <p>{event.description}</p>
      {event.imageUrl && (
        <div>
          <EventImage image={event.imageUrl} />
          <RemoveEventImage eventId={event.id} />
        </div>
      )}
      {!event.image && <ImageUpload eventId={event.id} />}
    </div>
  );
};

export default UserEvents;
