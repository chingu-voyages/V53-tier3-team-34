import prisma from "../../prisma/client";
import getUser from "./getUser";

const getEvents = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const events = await prisma.event.findMany({
      where: {
        authorId: user.id,
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
