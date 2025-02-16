"use server";
import prisma from "../../prisma/client";

export default async function getEventDetail(eventID: string) {
  return await prisma.event.findUnique({
    where: {
      id: eventID,
    },
    include: {
      chips: true,
      rsvpMoods: true,
      author: {
        select: {
          id: true,
        },
      },
    },
  });
}
