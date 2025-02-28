import type { ChipType, Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../prisma/client";

export async function CRUDChips(
  chips: { value: ChipType; inputValue: string }[],
  eventId: string,
  prismaClient: PrismaClient | Prisma.TransactionClient = prisma,
) {
  const filteredValues = chips.map((chip) => chip.value);

  // Perform deletion for records that are not in the filtered values
  await prismaClient.chip.deleteMany({
    where: {
      NOT: {
        value: {
          in: filteredValues,
        },
      },
      eventId: eventId,
    },
  });

  // Fetch existing chips for the given eventId
  const existingValues = await prismaClient.chip.findMany({
    where: {
      value: { in: filteredValues },
      eventId: eventId,
    },
    select: { value: true },
  });

  const existingValuesSet = new Set(existingValues.map((chip) => chip.value));

  // Create new chips (those that are not already present)
  const newChips = chips.filter((chip) => !existingValuesSet.has(chip.value));

  if (newChips.length > 0) {
    await prismaClient.chip.createMany({
      data: newChips.map((chip) => ({
        ...chip,
        eventId: eventId,
      })),
    });
  }

  // Update existing chips (those that already exist in the database)
  const chipsToUpdate = chips.filter((chip) =>
    existingValuesSet.has(chip.value),
  );

  if (chipsToUpdate.length > 0) {
    await prismaClient.chip.updateMany({
      where: {
        value: {
          in: chipsToUpdate.map((chip) => chip.value),
        },
        eventId: eventId,
      },
      data: chipsToUpdate,
    });
  }
}
