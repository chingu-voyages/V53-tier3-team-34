"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import type { EventFormData } from "../../createEvent/templates/EventForm";
import { AuthConfig } from "../api/auth/[...nextauth]/config";

const prisma = new PrismaClient();

export async function createEvent(eventFormData: EventFormData) {
  const session = await getServerSession(AuthConfig);

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
