"use server";
import prisma from "../../prisma/client";

export default async function getFilteredEvents(
  title: string,
  location: string,
  price?: [number, number],
  from?: string,
  to?: string,
  chipText?: string,
) {
  try {
    const events = await prisma.event.findMany({
      where: {
        isPublic: true,

        address: {
          contains: location,
          mode: "insensitive",
        },
        title: {
          contains: title,
          mode: "insensitive",
        },

        costPerPerson: {
          gte: price ? price[0] : 0,
          lte: price ? price[1] : Number.POSITIVE_INFINITY,
        },

        startDateTime: from ? { gte: from } : undefined,

        endDateTime: to ? { lte: to } : undefined,

        chips: chipText
          ? {
              some: {
                inputValue: {
                  contains: chipText,
                  mode: "insensitive",
                },
              },
            }
          : undefined,
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
