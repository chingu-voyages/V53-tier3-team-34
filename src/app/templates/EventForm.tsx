"use client";
import { useState } from "react";
import { LuCrown, LuDollarSign, LuMapPin, LuUsers } from "react-icons/lu"; // Assuming these are the correct imports for your icons
import Input from "../molecules/Input";
import TextArea from "../molecules/TextArea";
import ToggleInput from "../molecules/ToggleInput";
import ChipsList from "../oragnisms/ChipsList";
import { RSVP } from "../oragnisms/RSVP";

interface EventFormData {
  title: string;
  date: Date;
  description: string | null;
  reason: string | null;
  guestHonor: string | null;
  host: string | null;
  guestCount: number | null;
  address: string | null;
  outdoor: boolean;
  costPerPerson: number;
  isPublic: boolean;
  requireGuestApproval: boolean;
  rsvpMoods: RSVPMood[];
  chips: string[];
}

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
    reason: null,
    guestHonor: null,
    host: null,
    guestCount: null,
    address: null,
    outdoor: false,
    costPerPerson: 0,
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

    // Handle checkboxes differently (for `outdoor`, `isPublic`, and `requireGuestApproval`)
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

  return (
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
          isToggled={formData.outdoor}
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

        <RSVP rvspMoods={formData.rsvpMoods} onChange={handleRSVPMoodChange} />
      </div>
    </div>
  );
};

export default EventForm;
