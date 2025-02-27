"use server";

// import prisma from "@/../prisma/client";
// import getUserSession from "@/actions/getUserSession";
// import { rsvpMoods } from "@/createEvent/config/rvspMood";
// import type { EventFormData } from "@/createEvent/templates/EventForm";

// export async function createEvent(eventFormData: EventFormData) {
//   const session = await getUserSession();

//   if (!eventFormData) {
//     return {
//       status: 400,
//       body: "Bad request",
//     };
//   }

//   if (!session?.user) {
//     return {
//       status: 401,
//       body: "Unauthorized",
//     };
//   }

//   const filteredRVSPMoods = eventFormData.rsvpMoods.map((mood) => {
//     return {
//       value: mood.value,
//       emoji:
//         mood.emoji === null
//           ? rsvpMoods.find((m) => m.value === mood.value)?.emoji || null
//           : mood.emoji,
//     };
//   });

//   const filteredChips = eventFormData.chips.filter((chip) => {
//     return chip.value && chip.inputValue;
//   });

//   await prisma.event.create({
//     data: {
//       title: eventFormData.title,
//       startDateTime: eventFormData.startDateTime,
//       endDateTime: eventFormData.endDateTime,
//       description: eventFormData.description,
//       imageUrl: eventFormData.imageUrl,
//       style: eventFormData.style,
//       guestHonor: eventFormData.guestHonor,
//       host: eventFormData.host,
//       userGuestLimit: eventFormData.userGuestLimit,
//       maxGuestLimit: eventFormData.maxGuestLimit,
//       address: eventFormData.address,
//       isOutdoor: eventFormData.isOutdoor,
//       costPerPerson: eventFormData.costPerPerson,
//       isPublic: eventFormData.isPublic,
//       requireGuestApproval: eventFormData.requireGuestApproval,
//       authorId: session.userID,
//       rsvpMoods: {
//         createMany: {
//           data: filteredRVSPMoods,
//         },
//       },
//       chips: {
//         createMany: {
//           data: filteredChips,
//         },
//       },
//       activity: eventFormData.activity,
//     },
//   });
// }

// "use server";
// import prisma from "@/../prisma/client";
// import getUserSession from "@/actions/getUserSession";
// import { rsvpMoods } from "@/createEvent/config/rvspMood";
// import type { EventFormData } from "@/createEvent/templates/EventForm";
// import { EventStatus, PrismaClient } from "@prisma/client";

// export async function createOrUpdateEvent(eventFormData: EventFormData) {
//   const session = await getUserSession();
//   const userId = session?.userID;

//   if (!eventFormData) {
//     return { status: 400, body: "Bad request" };
//   }

//   if (!session?.user && eventFormData.status === EventStatus.PERMANENT) {
//     return {
//       status: 401,
//       body: "Unauthorized",
//     };
//   }
//   const filteredRVSPMoods = eventFormData.rsvpMoods.map((mood) => {
//     return {
//       value: mood.value,
//       emoji:
//         mood.emoji === null
//           ? rsvpMoods.find((m) => m.value === mood.value)?.emoji || null
//           : mood.emoji,
//     };
//   });
//   const filteredChips = eventFormData.chips.filter(
//     (chip) => chip.value && chip.inputValue,
//   );

//   let existingEvent = null;
//   if (eventFormData.id !== "0") {
//     existingEvent = await prisma.event.findUnique({
//       where: { id: eventFormData.id },
//     });
//   }

//   if (existingEvent) {
//     // Update existing event
//     await prisma.event.update({
//       where: { id: existingEvent.id },
//       data: {
//         title: eventFormData.title,
//         startDateTime: eventFormData.startDateTime,
//         endDateTime: eventFormData.endDateTime,
//         description: eventFormData.description,
//         imageUrl: eventFormData.imageUrl,
//         style: eventFormData.style,
//         guestHonor: eventFormData.guestHonor,
//         host: eventFormData.host,
//         userGuestLimit: eventFormData.userGuestLimit,
//         maxGuestLimit: eventFormData.maxGuestLimit,
//         address: eventFormData.address,
//         isOutdoor: eventFormData.isOutdoor,
//         costPerPerson: eventFormData.costPerPerson,
//         isPublic: eventFormData.isPublic,
//         requireGuestApproval: eventFormData.requireGuestApproval,
//         rsvpMoods: { deleteMany: {}, createMany: { data: filteredRVSPMoods } },
//         chips: { deleteMany: {}, createMany: { data: filteredChips } },
//         activity: eventFormData.activity,
//         status: eventFormData.status, // Keep status updated
//       },
//     });
//   } else {
//     // Create new event
//     const newEvent = await prisma.event.create({
//       data: {
//         title: eventFormData.title,
//         startDateTime: eventFormData.startDateTime,
//         endDateTime: eventFormData.endDateTime,
//         description: eventFormData.description,
//         imageUrl: eventFormData.imageUrl,
//         style: eventFormData.style,
//         guestHonor: eventFormData.guestHonor,
//         host: eventFormData.host,
//         userGuestLimit: eventFormData.userGuestLimit,
//         maxGuestLimit: eventFormData.maxGuestLimit,
//         address: eventFormData.address,
//         isOutdoor: eventFormData.isOutdoor,
//         costPerPerson: eventFormData.costPerPerson,
//         isPublic: eventFormData.isPublic,
//         requireGuestApproval: eventFormData.requireGuestApproval,
//         status: "TEMPORARY", // Default status
//         rsvpMoods: { createMany: { data: filteredRVSPMoods } },
//         chips: { createMany: { data: filteredChips } },
//         activity: eventFormData.activity,
//         authorId: userId || undefined, // If userId exists, set it; otherwise, it's undefined
//       },
//     });

//     return { eventId: newEvent.id }; // Return new ID
//   }
// }

import prisma from "@/../prisma/client";
import getUserSession from "@/actions/getUserSession";
import { rsvpMoods } from "@/createEvent/config/rvspMood";
import type { EventFormData } from "@/createEvent/templates/EventForm";
import { EventStatus } from "@prisma/client";

export async function createOrUpdateEvent(eventFormData: EventFormData) {
  //   try {
  //     console.log("Received Event Data:", eventFormData);
  //     const session = await getUserSession();
  //     const userId = session?.userID;

  //     if (!eventFormData) {
  //       return { status: 400, body: "Bad request" };
  //     }

  //     if (!session?.user && eventFormData.status === EventStatus.PERMANENT) {
  //       return {
  //         status: 401,
  //         body: "Unauthorized",
  //       };
  //     }
  //     const eventId = null;

  //     const filteredRVSPMoods = eventFormData.rsvpMoods.map((mood) => {
  //       return {
  //         value: mood.value,
  //         emoji:
  //           mood.emoji === null
  //             ? rsvpMoods.find((m) => m.value === mood.value)?.emoji || null
  //             : mood.emoji,
  //       };
  //     });
  //     const filteredChips = eventFormData.chips.filter(
  //       (chip) => chip.value && chip.inputValue,
  //     );

  //     let existingEvent = null;
  //     if (eventFormData.id !== "0") {
  //       existingEvent = await prisma.event.findUnique({
  //         where: { id: eventFormData.id },
  //       });
  //     }

  //     if (existingEvent) {
  //       // Update existing event
  //       const updatedEvent = await prisma.event.update({
  //         where: { id: existingEvent.id },
  //         data: {
  //           title: eventFormData.title,
  //           startDateTime: eventFormData.startDateTime,
  //           endDateTime: eventFormData.endDateTime,
  //           description: eventFormData.description,
  //           imageUrl: eventFormData.imageUrl,
  //           style: eventFormData.style,
  //           guestHonor: eventFormData.guestHonor,
  //           host: eventFormData.host,
  //           userGuestLimit: eventFormData.userGuestLimit,
  //           maxGuestLimit: eventFormData.maxGuestLimit,
  //           address: eventFormData.address,
  //           isOutdoor: eventFormData.isOutdoor,
  //           costPerPerson: eventFormData.costPerPerson,
  //           isPublic: eventFormData.isPublic,
  //           requireGuestApproval: eventFormData.requireGuestApproval,
  //           rsvpMoods: {
  //             deleteMany: {},
  //             createMany: { data: filteredRVSPMoods },
  //           },
  //           chips: { deleteMany: {}, createMany: { data: filteredChips } },
  //           activity: eventFormData.activity,
  //           status: eventFormData.status, // Keep status updated
  //         },
  //       });
  //       return { eventId: updatedEvent.id };
  //     } else {
  //       // Create new event
  //       // Prepare data for new event
  //       const newEvent = await prisma.event.create({
  //         data: {
  //           title: eventFormData.title,
  //           startDateTime: eventFormData.startDateTime,
  //           endDateTime: eventFormData.endDateTime,
  //           description: eventFormData.description,
  //           imageUrl: eventFormData.imageUrl,
  //           style: eventFormData.style,
  //           guestHonor: eventFormData.guestHonor,
  //           host: eventFormData.host,
  //           userGuestLimit: eventFormData.userGuestLimit,
  //           maxGuestLimit: eventFormData.maxGuestLimit,
  //           address: eventFormData.address,
  //           isOutdoor: eventFormData.isOutdoor,
  //           costPerPerson: eventFormData.costPerPerson,
  //           isPublic: eventFormData.isPublic,
  //           requireGuestApproval: eventFormData.requireGuestApproval,
  //           status: "TEMPORARY",
  //           authorId: userId || "gest",
  //           rsvpMoods: { createMany: { data: filteredRVSPMoods } },
  //           chips: { createMany: { data: filteredChips } },
  //           activity: eventFormData.activity,
  //         },
  //       });
  //       console.log("New Event Created:", newEvent.id);
  //       return { eventId: newEvent.id };
  //     }
  //   } catch (error) {
  //     console.error("Error creating/updating event:", error);
  //     return { status: 500, body: "Internal Server Error" };
  //   }
  // }
  try {
    console.log("Received Event Data:", eventFormData);

    const session = await getUserSession();
    console.log("User Session:", session);

    const userId = session?.userID;
    if (!eventFormData) {
      return { status: 400, body: "Bad request" };
    }

    if (!session?.user && eventFormData.status === EventStatus.PERMANENT) {
      return { status: 401, body: "Unauthorized" };
    }

    const filteredRVSPMoods = eventFormData.rsvpMoods.map((mood) => {
      return {
        value: mood.value,
        emoji:
          mood.emoji === null
            ? rsvpMoods.find((m) => m.value === mood.value)?.emoji || null
            : mood.emoji,
      };
    });
    const filteredChips = eventFormData.chips.filter(
      (chip) => chip.value && chip.inputValue,
    );
    let eventId = null;

    let existingEvent = null;
    if (eventFormData.id !== "0") {
      existingEvent = await prisma.event.findUnique({
        where: { id: eventFormData.id },
      });
      console.log("Existing Event:", existingEvent);
    }

    if (existingEvent) {
      const updatedEvent = await prisma.event.update({
        where: { id: existingEvent.id },
        data: {
          title: eventFormData.title,
          startDateTime: eventFormData.startDateTime,
          endDateTime: eventFormData.endDateTime,
          description: eventFormData.description,
          imageUrl: eventFormData.imageUrl,
          style: eventFormData.style,
          guestHonor: eventFormData.guestHonor,
          host: eventFormData.host,
          userGuestLimit: eventFormData.userGuestLimit,
          maxGuestLimit: eventFormData.maxGuestLimit,
          address: eventFormData.address,
          isOutdoor: eventFormData.isOutdoor,
          costPerPerson: eventFormData.costPerPerson,
          isPublic: eventFormData.isPublic,
          requireGuestApproval: eventFormData.requireGuestApproval,
          status: eventFormData.status,
        },
      });

      eventId = updatedEvent.id;
    } else {
      const newEvent = await prisma.event.create({
        data: {
          title: eventFormData.title,
          startDateTime: eventFormData.startDateTime,
          endDateTime: eventFormData.endDateTime,
          description: eventFormData.description,
          imageUrl: eventFormData.imageUrl,
          style: eventFormData.style,
          guestHonor: eventFormData.guestHonor,
          host: eventFormData.host,
          userGuestLimit: eventFormData.userGuestLimit,
          maxGuestLimit: eventFormData.maxGuestLimit,
          address: eventFormData.address,
          isOutdoor: eventFormData.isOutdoor,
          costPerPerson: eventFormData.costPerPerson,
          isPublic: eventFormData.isPublic,
          requireGuestApproval: eventFormData.requireGuestApproval,
          status: "TEMPORARY",
          authorId: userId || "guest",
        },
      });

      eventId = newEvent.id;
      console.log("New Event Created:", newEvent);
    }

    console.log("Returning Event ID:", eventId);

    return { status: 200, eventId };
  } catch (error) {
    console.error("Error creating/updating event:", error);
    return { status: 500, body: "Internal Server Error" };
  }
}
