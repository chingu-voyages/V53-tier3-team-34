"use server";
import prisma from "../../prisma/client";
import getUserSession from "./getUserSession";

const RVSPEvent = async (eventID: string, rsvpMoodId: number) => {
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
    throw new Error("The event you are trying to RVSP does not exist");
  }

  try {
    const existingResponse = await prisma.eventResponse.findUnique({
      where: {
        eventId_userId: {
          eventId: eventID,
          userId: session.userID,
        },
      },
    });

    if (existingResponse) {
      if (existingResponse.rsvpMoodId !== rsvpMoodId) {
        await prisma.eventResponse.update({
          where: {
            eventId_userId: {
              eventId: eventID,
              userId: session.userID,
            },
          },
          data: {
            rsvpMoodId: rsvpMoodId,
            status: "RSVPED",
          },
        });
      }
    } else {
      await prisma.eventResponse.create({
        data: {
          eventId: eventID,
          userId: session.userID,
          status: "RSVPED",
          rsvpMoodId: rsvpMoodId,
        },
      });
    }
  } catch (error) {
    console.error("Error in RVSP Event : ", error);
    throw new Error("Something went wrong. Please try again.");
  }
};

export default RVSPEvent;
