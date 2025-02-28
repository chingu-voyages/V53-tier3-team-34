"use server";
import prisma from "../../prisma/client";
import getUserSession from "./getUserSession";

export default async function requestToJoinEvent(eventID: string) {
  const session = await getUserSession();
  if (!session || !session?.userID) {
    throw new Error("You must be logged in to join an event");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventID,
      status: "PERMANENT",
    },
  });

  if (!event) {
    throw new Error("The event you are trying to join does not exist");
  }

  try {
    await prisma.eventResponse.create({
      data: {
        eventId: eventID,
        userId: session.userID,
        status: "PENDING",
      },
    });
  } catch (error) {
    console.error("Request to join event failed", error);
    throw new Error("Something went wrong. Please try again.");
  }
}
