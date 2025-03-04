"use client";

// import { CldImage } from "next-cloudinary";
import Image from "next/image";
// import DefaultEventImage from "../../../public/assets/images/events/defaultEvent.png";

interface EventImageProps {
  image: string | null;
}
const EventImage: React.FC<EventImageProps> = ({ image }) => {
  return image ? (
    <Image
      src={image}
      alt="event image"
      width={320}
      height={320}
      className="w-full max-w-screen lg:max-w-[486px] h-[320px] lg:h-[527px]"
      loading="lazy"
    />
  ) : (
    <Image
      src="/assets/images/events/defaultEvent.png"
      alt="default event image"
      className="w-full max-w-screen lg:max-w-[486px] h-[320px] lg:h-[527px]"
      width={320}
      height={320}
    />
  );
};
// image !== null ? (
//   <CldImage
//     src={image}
//     alt="event image"
//     width={486}
//     height={527}
//     className="w-full h-[527px]"
//     loading="lazy"
//   />
// ) : (
//   <Image
//     src={DefaultEventImage.src}
//     alt="event image"
//     className="w-full h-[527px]"
//     width={486}
//     height={527}
//   />
// );

export default EventImage;
