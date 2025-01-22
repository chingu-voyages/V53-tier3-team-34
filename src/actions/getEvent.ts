import prisma from "../../prisma/client";
import getUserSession from "./getUserSession";

const getEvent = async (eventId: string) => {
  const session = await getUserSession();

  if (!session?.user) {
    return null;
  }

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
        authorId: session.userID,
      },
    });
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getEvent;
