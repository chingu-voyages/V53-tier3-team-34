"use client";
import { useState } from "react";
import Input from "../molecules/Input";
import TextArea from "../molecules/TextArea";
import ToggleInput from "../molecules/ToggleInput";
import ChipsList from "../oragnisms/ChipsList";
import { RSVP } from "../oragnisms/RSVP";

import { useCreateEventTheme } from "@/app/create/provider";
import { z } from "zod";
import { createEvent } from "../../app/create/action";
import { icons } from "../config/icons";
import TopMenu from "../oragnisms/TopMenu";

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date(),
  description: z.string().nullable(),
  style: z.string().nullable(),
  image: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: "The event picture must be a maximum of 10MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Only images are allowed to be sent.",
    })
    .nullable(),
  reason: z.string().nullable(),
  guestHonor: z.string().nullable(),
  host: z.string().nullable(),
  userGuestLimit: z.number().nullable(),
  maxGuestLimit: z.number().nullable(),
  address: z.string().nullable(),
  isOutdoor: z.boolean().default(false),
  costPerPerson: z.number().nullable(),
  isPublic: z.boolean().default(false),
  requireGuestApproval: z.boolean().default(false),
  rsvpMoods: z.array(
    z.object({
      name: z.enum(["Attending", "Maybe", "Regretfully"]),
      emoji: z.string(),
    }),
  ),
  chips: z.array(z.object({ chipValue: z.string(), inputValue: z.string() })),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

export type MoodType = "Attending" | "Maybe" | "Regretfully";

export interface RSVPMood {
  name: MoodType;
  emoji: string;
}

const EventForm = () => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: new Date(),
    description: null,
    style: null,
    reason: null,
    image: null,
    guestHonor: null,
    host: null,
    userGuestLimit: null,
    maxGuestLimit: null,
    address: null,
    isOutdoor: false,
    costPerPerson: null,
    isPublic: false,
    requireGuestApproval: false,
    rsvpMoods: [
      {
        name: "Attending",
        emoji: "1f970",
      },
      {
        name: "Maybe",
        emoji: "1f9d0",
      },
      {
        name: "Regretfully",
        emoji: "1f614",
      },
    ],
    chips: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Handle switches differently (for `isOutdoor`, `isPublic`, and `requireGuestApproval`)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggleChange = (name: string) => {
    if (name in formData) {
      setFormData((prevState) => ({
        ...prevState,
        [name as keyof EventFormData]: !prevState[name as keyof EventFormData], // Toggle the value
      }));
    }
  };
  const handleRSVPMoodChange = (name: string, emoji: string) => {
    setFormData((prevState) => ({
      ...prevState,
      rsvpMoods: prevState.rsvpMoods.map((mood) =>
        mood.name === name ? { ...mood, emoji } : mood,
      ),
    }));
  };

  const handleChipsChange = (
    chipValue: string,
    inputValue: string,
    isSelected: boolean,
  ) => {
    const chips = formData.chips;

    const existingChipIndex = chips.findIndex(
      (chip) => chip.chipValue === chipValue,
    );

    if (!isSelected) {
      chips.splice(existingChipIndex, 1);
    } else if (existingChipIndex === -1) {
      chips.push({ chipValue, inputValue });
    } else {
      const chip = chips[existingChipIndex];
      chip.inputValue = inputValue;
    }

    setFormData({
      ...formData,
      chips,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      eventFormSchema.parse(formData); // Will throw an error if validation fails
      console.log("Form is valid! Submitting...");
      createEvent(formData);
      // Proceed with submission logic
    } catch (e) {
      console.log(e);
      //   if (e instanceof z.ZodError) {
      //     // Map the errors to a user-friendly format
      //     const errorMap = e.errors.reduce((acc, curr) => {
      //       acc[curr.path[0]] = curr.message; // Map field to error message
      //       return acc;
      //     }, {});
      //     setErrors(errorMap); // Update errors state
      //   }
    }
  };

  const { theme } = useCreateEventTheme();
  return (
    <>
      <header className="flex justify-between items-center bg-red-600 py-9 px-16">
        <h1 className="text-white text-4xl font-normal font-['Peralta'] leading-tight">
          Partiyo
        </h1>
        <button
          className="px-6 py-2 h-16 bg-[#084be7] text-center text-white text-base font-bold leading-normal"
          type="button"
        >
          Sign In
        </button>
      </header>
      <form
        onSubmit={handleSubmit}
        className={`p-4 flex flex-col gap-3 ${theme.pageBgImage} bg-cover`}
      >
        <div className="w-full flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-3">
          <div className="flex flex-col space-y-3">
            <TopMenu />
            <Input
              name="title"
              placeholder="Untitled Event"
              value={formData.title}
              onChange={handleChange}
              isRequired={true}
              className="text-6xl placeholder:text-6xl leading-10 h-24"
            />

            <Input
              icon={icons.cake}
              name="reason"
              placeholder="Reason to Celebrate"
              value={formData.reason || ""}
              onChange={handleChange}
              isRequired={true}
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.person}
              name="guestHonor"
              value={formData.guestHonor || ""}
              onChange={handleChange}
              preText="Guest of Honor"
              placeholder="(Maria Tash)"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.host}
              preText="Hosted by"
              placeholder="(Kaia)"
              value={formData.host || ""}
              onChange={handleChange}
              name="host"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.chair}
              placeholder="(Maximum)"
              postText="Attendance"
              value={formData.userGuestLimit || ""}
              onChange={handleChange}
              name="maxGuestLimit"
              type="number"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.addPeople}
              placeholder="(0)"
              preText="Bring Guest"
              value={formData.userGuestLimit || ""}
              onChange={handleChange}
              name="userGuestLimit"
              type="number"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.location}
              name="address"
              placeholder="MInistry Of Sound, 103 Gaunt ST, LONDON, SE1 6DP"
              value={formData.address || ""}
              onChange={handleChange}
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.cost}
              placeholder="Add Cost Per Person"
              value={formData.costPerPerson || ""}
              onChange={handleChange}
              name="costPerPerson"
              type="number"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <ToggleInput
              icon={icons.sunrise}
              text="Outdoor"
              name="outdoor"
              isToggled={formData.isOutdoor}
              onChange={handleToggleChange}
            />

            <ChipsList
              selectedChips={formData.chips}
              onChange={handleChipsChange}
            />

            <TextArea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Add a description of your event"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <ToggleInput
              name="isPublic"
              text="Public Event"
              isToggled={formData.isPublic}
              onChange={handleToggleChange}
            />

            <ToggleInput
              name="requireGuestApproval"
              text="Require Guest Approval"
              isToggled={formData.requireGuestApproval}
              onChange={handleToggleChange}
            />

            <RSVP
              rvspMoods={formData.rsvpMoods}
              onChange={handleRSVPMoodChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 h-16 bg-[#084be7] text-white text-center text-base font-bold leading-normal w-max inline self-end"
        >
          Done
        </button>
      </form>
    </>
  );
};

export default EventForm;
