"use client";

import { CldImage } from "next-cloudinary";

const EventImage = ({ image }: { image: string }) => {
  return <CldImage src={image} alt={"event image"} width={100} height={100} />;
};

export default EventImage;
