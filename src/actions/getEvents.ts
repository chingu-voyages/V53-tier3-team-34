import prisma from "../../prisma/client";
import getUserSession from "./getUserSession";

const getEvents = async () => {
  try {
    const user = await getUserSession();

    if (!user) {
      return null;
    }

    const events = await prisma.event.findMany({
      where: {
        authorId: user.userID,
      },
      select: {
        id: true,
        title: true,
      },
    });
    return events;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getEvents;
