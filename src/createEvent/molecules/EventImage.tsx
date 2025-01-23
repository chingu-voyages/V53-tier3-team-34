"use client";

import { CldImage } from "next-cloudinary";
import Image from "next/image";
import DefaultEventImage from "../../../public/assets/images/events/defaultEvent.png";

interface EventImageProps {
  image?: string;
}
const EventImage: React.FC<EventImageProps> = ({ image }) =>
  image ? (
    <CldImage
      src={image}
      alt="event image"
      width={486}
      height={527}
      className="w-full h-[527px]"
      loading="lazy" // Optional, but good for performance.
    />
  ) : (
    <Image
      src={DefaultEventImage.src} // Or the direct URL to your default image.
      alt="event image"
      className="w-full h-[527px]"
      width={486}
      height={527}
    />
  );

export default EventImage;
