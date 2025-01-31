import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

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

    if (events) {
      return NextResponse.json(events, { status: 200 });
    }

    return NextResponse.json(
      { message: "No events found", data: events },
      { status: 404 },
    );
  } catch (error) {
    console.error(error);
  }
};

export default getTrendingEvents;
