import { NextResponse } from "next/server";
import prisma from "../../prisma/client";

const getTrendingEvents = async () => {
  try {
    console.log("Fetching events...");
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
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 },
    );
  }
};

export default getTrendingEvents;
