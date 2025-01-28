import prisma from "../../prisma/client";

const getTrendingEvents = async () => {
  try {
    const events = await prisma.event.findMany({
      where: {
        endDateTime: {
          lt: new Date(),
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
    return events;
  } catch (error) {
    console.error("Failed to get trending events: ", error);
    return null;
  }
};

export default getTrendingEvents;
