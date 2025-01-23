"use server";

import type { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";

const addImageToDb = async ({
  res,
  eventId,
}: {
  res: CloudinaryUploadWidgetResults;
  eventId: string;
}) => {
  if (typeof res.info === "string") {
    throw new Error("Image upload failed");
  }

  // We need to decide on saving the image to the database or the url

  // const event = await prisma.event.update({
  //   where: {
  //     id: eventId,
  //   },
  //   data: {
  //     image: res.info?.url,
  //   },
  // });

  revalidatePath("/[userId]/events/[eventId]");

  return event.image;
};

export default addImageToDb;
