"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../prisma/client";

const deleteEventImage = async (eventId: string) => {
  try {
    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        image: null,
      },
    });

    revalidatePath("[userId]/events/[eventId]");

    return event;
  } catch (error) {
    console.error("Error deleting event image", error);
    return null;
  }
};

export default deleteEventImage;
