"use server";

import type { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { revalidatePath } from "next/cache";

const addImageToDb = async ({
  res,
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

  return null;
};

export default addImageToDb;
