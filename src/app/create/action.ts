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
      guestCount: eventFormData.guestCount,
      address: eventFormData.address,
      isOutdoor: eventFormData.isOutdoor,
      costPerPerson: eventFormData.costPerPerson,
      isPublic: eventFormData.isPublic,
      requireGuestApproval: eventFormData.requireGuestApproval,
      rsvpMoods: eventFormData.rsvpMoods.map((mood) => ({
        name: mood.name,
        emoji: mood.emoji,
        eventID: null,
      })),
      authorId: session.userID,
    },
  });
}
