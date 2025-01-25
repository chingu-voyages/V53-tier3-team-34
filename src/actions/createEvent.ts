"use server";

import prisma from "@/../prisma/client";
import getUserSession from "@/actions/getUserSession";
import type { EventFormData } from "@/createEvent/templates/EventForm";

export async function createEvent(eventFormData: EventFormData) {
  const session = await getUserSession();

  if (!eventFormData) {
    return {
      status: 400,
      body: "Bad request",
    };
  }

  if (!session?.user) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  const filteredRVSPMoods = eventFormData.rsvpMoods.filter((mood) => {
    return mood.value && mood.emoji;
  });

  const filteredChips = eventFormData.chips.filter((chip) => {
    return chip.value && chip.inputValue;
  });

  await prisma.event.create({
    data: {
      title: eventFormData.title,
      startDateTime: eventFormData.startDateTime,
      endDateTime: eventFormData.endDateTime,
      description: eventFormData.description,
      imageUrl: eventFormData.imageUrl,
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
