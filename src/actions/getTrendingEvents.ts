"use server";
import prisma from "../../prisma/client";

export default async function getTrendingEvents() {
  try {
    const events = await prisma.event.findMany({
      where: {
        endDateTime: {
          gt: new Date(),
        },
        isPublic: true,
        status: "PERMANENT",
      },
      orderBy: {
        maxGuestLimit: "desc",
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        startDateTime: true,
        address: true,
        costPerPerson: true,
      },
    });

    if (events) {
      return events;
    }

    return [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
