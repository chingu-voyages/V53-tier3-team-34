"use server";
import prisma from "../../prisma/client";

export default async function getFilteredEvents(
  title: string,
  location: string,
) {
  try {
    const events = await prisma.event.findMany({
      where: {
        address: {
          contains: location,
          mode: "insensitive",
        },
        title: {
          contains: title,
          mode: "insensitive",
        },
        isPublic: true,
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
