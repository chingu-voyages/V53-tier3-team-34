import { defaultEvents } from "./dummyEvents";

type QueryParamsProp = {
  title: string;
  location: string;
};

export default async function queriedEvents({
  title,
  location,
}: QueryParamsProp) {
  const foundEvents = defaultEvents.filter(
    (events) =>
      events.title?.toLowerCase().includes(title.toLowerCase()) &&
      events.address?.toLowerCase().includes(location.toLowerCase()),
  );

  return foundEvents;
}
