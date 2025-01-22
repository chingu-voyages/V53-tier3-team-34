"use server";

import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import type { EventFormData } from "../../createEvent/templates/EventForm";

const prisma = new PrismaClient();

export async function createEvent(
  session: Session,
  eventFormData: EventFormData,
) {
  if (!eventFormData) {
    return {
      status: 400,
      body: "Bad request",
    };
  }

  if (!session || !session.user) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const image = eventFormData.image
    ? Buffer.from(await eventFormData.image.arrayBuffer())
    : null;

  const filteredRVSPMoods = eventFormData.rsvpMoods.filter((mood) => {
    return mood.value && mood.emoji;
  });

  const filteredChips = eventFormData.chips.filter((chip) => {
    return chip.value && chip.inputValue;
  });

  await prisma.event.create({
    data: {
      title: eventFormData.title,
      date: eventFormData.date,
      description: eventFormData.description,
      image: image,
      style: eventFormData.style,
      reason: eventFormData.reason || "",
      guestHonor: eventFormData.guestHonor,
      host: eventFormData.host,
      userGuestLimit: eventFormData.userGuestLimit,
      maxGuestLimit: eventFormData.maxGuestLimit,
      address: eventFormData.address,
      isOutdoor: eventFormData.isOutdoor,
      costPerPerson: eventFormData.costPerPerson,
      isPublic: eventFormData.isPublic,
      requireGuestApproval: eventFormData.requireGuestApproval,
      authorId: session.userID,
      rsvpMoods: {
        createMany: {
          data: filteredRVSPMoods,
        },
      },
      chips: {
        createMany: {
          data: filteredChips,
        },
      },
    },
  });
}

export const getEventByID = async (session: Session, eventId: string) => {
  if (!session || !session.user) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const events = await prisma.event.findUnique({
    where: {
      id: eventId,
      authorId: session.userID,
    },
  });

  return events;
};
