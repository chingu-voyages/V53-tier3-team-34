import JoinEvent from "./_templates/JoinEvent";

export default async function Page({
  params,
}: {
  params: Promise<{ eventID: string }>;
}) {
  const eventID = (await params).eventID;
  if (!eventID) return <div>Event not found</div>;

  return <JoinEvent eventID={eventID} />;
}
