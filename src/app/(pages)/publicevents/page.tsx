import queriedEvents from "./queryEvents";
import Header from "@/home/organisms/Header";
import { defaultEvents } from "./dummyEvents";
import Image from "next/image";
import Link from "next/link";
import QueryChipBar from "@/components/ChipBar/QueryChipBar";

type SearchParams = Record<string, string | string[] | undefined>;

interface Props {
  searchParams: SearchParams;
  title: string;
  location: string;
}

export default async function PublicEvents({ searchParams }: Props) {
  let events = defaultEvents;

  const title = Array.isArray(searchParams.title)
    ? searchParams.title[0]
    : searchParams.title || "";

  const location = Array.isArray(searchParams.location)
    ? searchParams.location[0]
    : searchParams.location || "";

  if (title || location) {
    events = await queriedEvents({ title, location });
  }

  return (
    <main className="bg-black px-16 text-white min-h-screen space-y-10">
      <Header />
      <QueryChipBar />
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
              <Image
                src={event.imageUrl}
                width={292}
                height={292}
                alt="Event flyer"
              />
              <div className="space-y-3 mt-3">
                <p>{event.title}</p>
                <p>{event.startDateTime.toLocaleString()}</p>
                <p>{event.address}</p>
                <p>${event.costPerPerson}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
