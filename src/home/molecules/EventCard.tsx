import type { EventFormData } from "@/createEvent/templates/EventForm";
import { Inter, Mona_Sans } from "next/font/google";
import Image from "next/image";
import type React from "react";
export interface EventCardProps
  extends Pick<
    EventFormData,
    "title" | "imageUrl" | "startDateTime" | "address" | "costPerPerson"
  > {
  id: string;
}

const inter = Inter({ subsets: ["latin"], weight: "600" });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });

const EventCard: React.FC<EventCardProps> = ({
  title,
  imageUrl,
  startDateTime,
  address,
  costPerPerson,
}) => {
  const widthOfImage = "292";
  const heightOfImage = "292";
  return (
    <div
      className={`flex flex-col gap-2 align-start min-w-[${widthOfImage}px] self-start`}
    >
      <Image
        src={imageUrl || "/assets/images/events/defaultEvent.png"}
        alt="Event"
        width={widthOfImage}
        height={heightOfImage}
        className={`w-[${widthOfImage}px] h-[${heightOfImage}px]`}
      />
      <h2
        className={`text-black text-xl leading-loose break-words ${monaSans.className}`}
      >
        {title}
      </h2>
      <div
        className={`text-[#084be7] text-base text-wrap leading-loose break-words ${inter.className}`}
      >
        {startDateTime.toString()}
      </div>
      <div
        className={`text-[#26282b] text-base leading-loose break-words ${inter.className}`}
      >
        {address}
      </div>
      {costPerPerson && costPerPerson > 0 ? (
        <p
          className={`text-[#26282b] text-base leading-loose break-words ${inter.className}`}
        >
          ${costPerPerson}
        </p>
      ) : (
        <p
          className={`text-[#26282b] text-base leading-loose break-words ${inter.className}`}
        >
          Free
        </p>
      )}
    </div>
  );
};

export default EventCard;
