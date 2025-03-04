import prisma from "@/../prisma/client";
import getUserSession from "@/actions/getUserSession";
import { rsvpMoods } from "@/createEvent/config/rvspMood";
import type { EventFormData } from "@/createEvent/templates/EventForm";
import { CRUDChips } from "./CRUDChips";
import { CRUDMoods } from "./CRUDMoods";

export async function createOrUpdateEvent(eventFormData: EventFormData) {
  const session = await getUserSession();

  if (!eventFormData) {
    throw new Error("Bad request");
  }

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const filteredRVSPMoods = eventFormData.rsvpMoods.map((mood) => ({
    value: mood.value,
    emoji:
      mood.emoji === null
        ? rsvpMoods.find((m) => m.value === mood.value)?.emoji || null
        : mood.emoji,
  }));

  const filteredChips = eventFormData.chips.filter(
    (chip) => chip.value && chip.inputValue,
  );

  const data = {
    title: eventFormData.title,
    startDateTime: eventFormData.startDateTime,
    endDateTime: eventFormData.endDateTime,
    description: eventFormData.description,
    imageUrl: eventFormData.imageUrl,
    style: eventFormData.style,
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
    activity: eventFormData.activity,
    status: eventFormData.status,
  };

  return await prisma.$transaction(async (prisma) => {
    await CRUDMoods(filteredRVSPMoods, eventFormData.id, prisma);
    await CRUDChips(filteredChips, eventFormData.id, prisma);
    return await prisma.event.upsert({
      where: {
        id: eventFormData.id,
      },
      include: {
        rsvpMoods: true,
        chips: true,
      },
      create: data,
      update: data,
    });
  });
}
