"use client";
import { useSession } from "next-auth/react";
import { Peralta } from "next/font/google";
import { useState } from "react";
import { z } from "zod";
import Input from "../molecules/Input";
import TextArea from "../molecules/TextArea";
import ToggleInput from "../molecules/ToggleInput";
import ChipsList from "../oragnisms/ChipsList";
import { RSVP } from "../oragnisms/RSVP";

import { createEvent } from "@/actions/createEvent";
import { saveEventToIndexedDB } from "@/app/(pages)/events/create/indexedDBActions";
import ImagePicker from "@/components/imagePicker/ImagePicker";
import { Button } from "@/components/ui/button";
import { useCreateEventTheme } from "@/providers/themeProvider";
import Link from "next/link";
import { icons } from "../config/icons";
import type { MoodType } from "../config/rvspMood";
import EventImage from "../molecules/EventImage";
import ImageUpload from "../oragnisms/ImageUpload";
import TopMenu from "../oragnisms/TopMenu";

const peralta = Peralta({
  weight: "400",
  subsets: ["latin"],
});

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date(),
  description: z.string().nullable(),
  style: z.string().nullable(),
  imageUrl: z.string().url().nullable(),
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
      value: z.enum(["attending", "maybe", "regretfully"]),
      emoji: z.string(),
    }),
  ),
  chips: z.array(z.object({ value: z.string(), inputValue: z.string() })),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

const EventForm = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: new Date(),
    description: null,
    style: null,
    reason: null,
    imageUrl: null,
    guestHonor: null,
    host: null,
    userGuestLimit: null,
    maxGuestLimit: null,
    address: null,
    isOutdoor: false,
    costPerPerson: null,
    isPublic: false,
    requireGuestApproval: false,
    rsvpMoods: [],
    chips: [],
  });

  // State to manage image picker
  const [showImagePicker, setShowImagePicker] = useState(false);

  function handleShowImagePicker(state: boolean) {
    setShowImagePicker(state);
  }

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
  const handleRSVPMoodChange = (value: MoodType, emoji: string) => {
    setFormData((prevState) => ({
      ...prevState,
      rsvpMoods: prevState.rsvpMoods.map((mood) =>
        mood.value === value ? { ...mood, emoji } : mood,
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
      (chip) => chip.value === chipValue,
    );

    if (!isSelected) {
      chips.splice(existingChipIndex, 1);
    } else if (existingChipIndex === -1) {
      chips.push({ value: chipValue, inputValue });
    } else {
      const chip = chips[existingChipIndex];
      chip.inputValue = inputValue;
    }

    setFormData({
      ...formData,
      chips,
    });
  };

  const handleImageChange = (imageURL?: string) => {
    if (imageURL) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrl: imageURL,
      }));
      <EventImage image={imageURL} />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      eventFormSchema.parse(formData); // Will throw an error if validation fails
      if (!session) {
        saveEventToIndexedDB(formData);
        return;
      }
      console.log("Form is valid! Submitting...");
      createEvent(formData);
      // Proceed with submission logic
    } catch (e) {
      console.log(e);
    }
  };

  const { theme } = useCreateEventTheme();

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Placed onchange and image url from image upload in image picker  */}

      <ImagePicker
        onChange={handleImageChange}
        showImagePicker={showImagePicker}
        onClose={() => handleShowImagePicker(false)}
      />

      <header className="flex justify-between items-center bg-red-600 py-9 px-16">
        <h1
          className={`text-white text-4xl font-normal ${peralta.className} leading-tight`}
        >
          Partiyo
        </h1>
        {!session && (
          <Link href="/register">
            <button
              className="px-6 py-2 h-16 bg-[#084be7] text-center text-white text-base font-bold leading-normal"
              type="button"
            >
              Sign In
            </button>
          </Link>
        )}
      </header>

      <form
        onSubmit={handleSubmit}
        className={`pb-9 px-16 flex-1 flex flex-col gap-3 ${theme.pageBgImage} bg-cover bg-center `}
      >
        <div className="w-full flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-11">
          <div className="flex flex-col space-y-3">
            <TopMenu />
            <Input
              name="title"
              placeholder="Untitled Event"
              value={formData.title}
              onChange={handleChange}
              isRequired={true}
              parentClassName="h-24"
              className="text-6xl placeholder:text-6xl leading-10 h-24"
            />

            <Input
              icon={icons.cake}
              name="reason"
              placeholder="Reason to Celebrate"
              value={formData.reason || ""}
              onChange={handleChange}
              isRequired={true}
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.person}
              name="guestHonor"
              value={formData.guestHonor || ""}
              onChange={handleChange}
              preText="Guest of Honor"
              placeholder="(Maria Tash)"
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.host}
              preText="Hosted by"
              placeholder="(Kaia)"
              value={formData.host || ""}
              onChange={handleChange}
              name="host"
              parentClassName="h-10"
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
              parentClassName="h-10"
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
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.location}
              name="address"
              placeholder="MInistry Of Sound, 103 Gaunt ST, LONDON, SE1 6DP"
              value={formData.address || ""}
              onChange={handleChange}
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.cost}
              placeholder="Add Cost Per Person"
              value={formData.costPerPerson || ""}
              onChange={handleChange}
              name="costPerPerson"
              type="number"
              parentClassName="h-10"
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

          <div className="flex flex-col space-y-3 pt-28">
            {/* Moved onchange and imageUrl props to image picker component */}
            <ImageUpload
              showImagePicker={handleShowImagePicker}
              imageURL={formData.imageUrl}
            />

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
              selectedRVSPMoods={formData.rsvpMoods}
              onChange={handleRSVPMoodChange}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="px-6 py-2 h-16 bg-[#084be7] text-white text-center text-base font-bold leading-normal w-max inline self-end rounded-none"
        >
          Done
        </Button>
      </form>
    </div>
  );
};

export default EventForm;
