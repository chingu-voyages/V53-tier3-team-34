"use server";
import prisma from "../../prisma/client";
import getUserSession from "./getUserSession";

export default async function getTemporaryEventDetail() {
  const session = await getUserSession();
  if (!session || !session?.userID) {
    throw new Error("Unauthorized");
  }

  return await prisma.event.findFirst({
    where: {
      author: {
        id: session.userID,
      },
      status: "TEMPORARY",
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
