"use client";
import { useState } from "react";
import { LuCrown, LuDollarSign, LuMapPin, LuUsers } from "react-icons/lu"; // Assuming these are the correct imports for your icons
import Input from "../molecules/Input";
import TextArea from "../molecules/TextArea";
import ToggleInput from "../molecules/ToggleInput";
import ChipsList from "../oragnisms/ChipsList";
import { RSVP } from "../oragnisms/RSVP";

import { z } from "zod";
import { createEvent } from "../../app/create/action";

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
  guestCount: z.number().nullable(),
  address: z.string().nullable(),
  isOutdoor: z.boolean().default(false),
  costPerPerson: z.number().nullable(),
  isPublic: z.boolean().default(false),
  requireGuestApproval: z.boolean().default(false),
  rsvpMoods: z.array(
    z.object({
      name: z.enum(["Attending", "Maybe", "Regretfully"]),
      emoji: z.string().nullable(),
    }),
  ),
  chips: z.array(z.string()),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

export type MoodType = "Attending" | "Maybe" | "Regretfully";

export interface RSVPMood {
  name: MoodType;
  emoji: string | null;
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
    guestCount: null,
    address: null,
    isOutdoor: false,
    costPerPerson: null,
    isPublic: false,
    requireGuestApproval: false,
    rsvpMoods: [
      {
        name: "Attending",
        emoji: null,
      },
      {
        name: "Maybe",
        emoji: null,
      },
      {
        name: "Regretfully",
        emoji: null,
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
  const handleRSVPMoodChange = (name: string, emoji: string | null) => {
    setFormData((prevState) => ({
      ...prevState,
      rsvpMoods: prevState.rsvpMoods.map((mood) =>
        mood.name === name ? { ...mood, emoji } : mood,
      ),
    }));
  };

  const handleChipsChange = (value: string) => {
    let chips = formData.chips;
    if (!chips.includes(value)) {
      chips = [...chips, value];
      setFormData((prevState) => ({
        ...prevState,
        chips,
      }));
    }
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-3 p-4 bg-black">
        <div className="flex flex-col space-y-3">
          <Input
            name="title"
            placeholder="Untitled Event"
            value={formData.title}
            onChange={handleChange}
            isRequired={true}
            toolTipContent="(Required) Event Title"
            className="text-6xl leading-10"
          />

          <Input
            name="guestHonor"
            value={formData.guestHonor || ""}
            onChange={handleChange}
            preText="Guest of Honor"
            toolTipContent="(Optional) Guest Honor"
            placeholder="(Optional) Name"
          />

          <Input
            icon={<LuCrown size={18} />}
            preText="Hosted by"
            placeholder="(Optional) Name"
            value={formData.host || ""}
            onChange={handleChange}
            name="host"
            toolTipContent="(Optional) Organizer"
            className="text-[#dbd8d8] text-xl font-medium font-['Mona Sans'] leading-loose"
          />

          <Input
            icon={<LuMapPin size={18} />}
            placeholder="Place name, address, or link"
            value={formData.address || ""}
            onChange={handleChange}
            name="address"
            toolTipContent="(Optional) Location"
          />

          <Input
            icon={<LuUsers size={18} />}
            placeholder="Number"
            preText="Bring Guest"
            value={formData.guestCount || ""}
            onChange={handleChange}
            name="guestCount"
            toolTipContent="(Optional) Max Capacity"
            type="number"
          />

          <Input
            icon={<LuDollarSign size={18} />}
            placeholder="Number"
            value={formData.costPerPerson || ""}
            onChange={handleChange}
            name="costPerPerson"
            type="number"
            toolTipContent="(Optional) Cost per person"
            postText="cost per person"
          />

          <ToggleInput
            text="Outdoor"
            name="outdoor"
            toolTipContent="(Optional) Outdoor Event"
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
            toolTipContent="(Optional) Description"
            placeholder="Add a description of your event"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <ToggleInput
            name="isPublic"
            text="Public Event"
            toolTipContent="(Optional) Public Event"
            isToggled={formData.isPublic}
            onChange={handleToggleChange}
          />

          <ToggleInput
            name="requireGuestApproval"
            text="Require Guest Approval"
            toolTipContent="(Optional) Require Guest Approval"
            isToggled={formData.requireGuestApproval}
            onChange={handleToggleChange}
          />

          <RSVP
            rvspMoods={formData.rsvpMoods}
            onChange={handleRSVPMoodChange}
          />
        </div>
      </div>
    </form>
  );
};

export default EventForm;
