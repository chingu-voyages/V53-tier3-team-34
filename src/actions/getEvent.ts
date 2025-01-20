import prisma from "../../prisma/client";

const getEvent = async (eventId: string, userId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
        authorId: userId,
      },
    });
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getEvent;
