import type { MoodType, Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../prisma/client";

export async function CRUDMoods(
  RVSPMoods: { value: MoodType; emoji: string | null }[],
  eventId: string,
  prismaClient: PrismaClient | Prisma.TransactionClient = prisma,
) {
  const filteredValues = RVSPMoods.map((mood) => mood.value);

  // Perform deletion for records that are not in the filtered values
  await prismaClient.rSVPMood.deleteMany({
    where: {
      NOT: {
        value: {
          in: filteredValues,
        },
      },
      eventId: eventId,
    },
  });

  // Fetch existing moods for the given eventId
  const existingValues = await prismaClient.rSVPMood.findMany({
    where: {
      value: { in: filteredValues },
      eventId: eventId,
    },
    select: { value: true },
  });

  const existingValuesSet = new Set(existingValues.map((mood) => mood.value));

  // Create new moods (those that are not already present)
  const newMoods = RVSPMoods.filter(
    (mood) => !existingValuesSet.has(mood.value),
  );

  if (newMoods.length > 0) {
    await prismaClient.rSVPMood.createMany({
      data: newMoods.map((mood) => ({
        ...mood,
        eventId: eventId,
      })),
    });
  }

  // Update existing moods (those that already exist in the database)
  const moodsToUpdate = RVSPMoods.filter((mood) =>
    existingValuesSet.has(mood.value),
  );

  if (moodsToUpdate.length > 0) {
    await prismaClient.rSVPMood.updateMany({
      where: {
        value: {
          in: moodsToUpdate.map((mood) => mood.value),
        },
        eventId: eventId,
      },
      data: moodsToUpdate,
    });
  }
}
