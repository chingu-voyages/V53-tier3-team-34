"use client";
import { useSession } from "next-auth/react";
import { Peralta } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import Input from "../molecules/Input";
import TextArea from "../molecules/TextArea";
import ToggleInput from "../molecules/ToggleInput";
import ChipsList from "../oragnisms/ChipsList";
import RSVP from "../oragnisms/RSVP";

import { createEvent } from "@/actions/createEvent";
import {
  clearIndexedDB,
  getEventFromIndexedDB,
  saveEventToIndexedDB,
} from "@/app/(pages)/events/create/indexedDBActions";
import { Button } from "@/components/ui/button";
import ImagePicker from "@/createEvent/oragnisms/ImagePicker";
import { useCreateEventTheme } from "@/providers/themeProvider";
import Link from "next/link";
import { icons } from "../config/icons";
import { type MoodType, defaultFormValuesRSVPMoods } from "../config/rvspMood";
import EventImage from "../molecules/EventImage";
import DateRangePicker, {
  type DateRange,
  getDateAdjustedForTimezone,
} from "../oragnisms/DateRangePicker";
import ImageUpload from "../oragnisms/ImageUpload";
import TopMenu from "../oragnisms/TopMenu";
import "../../app/globals.css";
import SettingsSidebar from "../oragnisms/SettingsSidebar";
const peralta = Peralta({
  weight: "400",
  subsets: ["latin"],
});

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startDateTime: z.date(),
  endDateTime: z.date(),
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
      emoji: z.string().nullable(),
    }),
  ),
  chips: z.array(z.object({ value: z.string(), inputValue: z.string() })),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

const EventForm = () => {
  const { data: session } = useSession();
  const { theme } = useCreateEventTheme();
  const [isFormMounted, setIsFormMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    startDateTime: getDateAdjustedForTimezone(new Date()),
    endDateTime: getDateAdjustedForTimezone(
      new Date(new Date().getTime() + 15 * 60 * 1000),
    ),
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
    rsvpMoods: defaultFormValuesRSVPMoods,
    chips: [],
  });

  // State to manage image picker
  const [showImagePicker, setShowImagePicker] = useState(false);

  function handleShowImagePicker(state: boolean) {
    setShowImagePicker(state);
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;

      // Handle switches differently (for `isOutdoor`, `isPublic`, and `requireGuestApproval`)
      setFormData((prevState) => {
        const updatedData = {
          ...prevState,
          [name]: type === "number" ? (value ? Number(value) : null) : value,
        };

        return updatedData;
      });
    },
    [],
  );

  const handleToggleChange = useCallback((name: BooleanKeys<EventFormData>) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: !prevState[name], // Toggle the value
    }));
  }, []);

  const handleRSVPMoodChange = useCallback((value: MoodType, emoji: string) => {
    setFormData((prevState) => ({
      ...prevState,
      rsvpMoods: prevState.rsvpMoods.map((mood) =>
        mood.value === value ? { ...mood, emoji } : mood,
      ),
    }));
  }, []);

  const handleChipsChange = useCallback(
    (chipValue: string, inputValue: string, isSelected: boolean) => {
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

      // console.log(chips);
      setFormData((prevState) => {
        const updatedData = {
          ...prevState,
          chips: chips, // React state maintains 'chips'
        };

        return updatedData;
      });
    },
    [formData.chips],
  );

  const handleImageChange = useCallback((imageURL?: string) => {
    if (imageURL) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrl: imageURL,
      }));
      <EventImage image={imageURL} />;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    clearIndexedDB();
    try {
      e.preventDefault();
      eventFormSchema.parse(formData); // Will throw an error if validation fails
      if (!session) {
        saveEventToIndexedDB(formData);
        console.log(formData.chips);
        return;
      }
      console.log("Form is valid! Submitting...");
      createEvent(formData);
      // Proceed with submission logic
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, []);

  const updateDateRange = useCallback((range: DateRange) => {
    setFormData((prevState) => ({
      ...prevState,
      startDateTime: getDateAdjustedForTimezone(range.from),
      endDateTime: getDateAdjustedForTimezone(
        range.to ? range.to : new Date(range.from.getTime() + 15 * 60 * 1000),
      ),
    }));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadData = async () => {
        if (typeof window !== "undefined") {
          try {
            const savedData = await getEventFromIndexedDB();
            console.log("Saved Data:", savedData);
            if (savedData !== null) {
              savedData.startDateTime = getDateAdjustedForTimezone(new Date());
              savedData.endDateTime = getDateAdjustedForTimezone(
                new Date(new Date().getTime() + 15 * 60 * 1000),
              );
              setFormData(savedData);
            }
          } catch (error) {
            console.error("Failed to load event data from IndexedDB", error);
          } finally {
            setIsFormMounted(true);
          }
        }
      };

      loadData();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isFormMounted) {
      const saveData = async () => {
        if (typeof window !== "undefined") {
          try {
            await saveEventToIndexedDB(formData);
          } catch (error) {
            console.error("Failed to save event data to IndexedDB", error);
          }
        }
      };

      saveData();
    }
  }, [formData, isFormMounted]);

  return (
    <div className="flex flex-col min-h-screen items-stretch">
      {/* Placed onchange and image url from image upload in image picker  */}

      <ImagePicker
        onImageSelect={handleImageChange}
        isVisible={showImagePicker}
        onClose={() => handleShowImagePicker(false)}
      />
      <header className="flex justify-between items-center bg-red-600 p-2 md:py-9 md:px-16">
        <Link href="/">
          <div className="flex items-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Partiyo</title>
              <circle
                cx="28"
                cy="28"
                r="24.2637"
                fill="#D6FF0B"
                stroke="black"
                stroke-width="0.527388"
              />
              <path
                d="M23.5323 18.23C21.3842 17.123 19.9305 18.8016 19.3397 19.6758C19.287 19.7539 19.1868 19.784 19.1005 19.7463L18.6098 19.5318C18.601 19.528 18.5918 19.5248 18.5826 19.5222C18.3307 19.4529 18.2059 19.3706 17.2915 19.2908C16.1274 19.1891 13.5669 20.1147 13.9917 22.1908C14.4166 24.2669 16.49 25.9435 17.4917 26.9127C18.4933 27.8819 19.7062 30.9398 20.5258 31.0193C21.3455 31.0988 21.9189 29.2202 22.9384 26.1998C23.958 23.1793 26.3647 19.6898 23.5323 18.23Z"
                fill="black"
              />
              <path
                d="M37.846 9.61917L31.9438 10.3183C31.8841 10.3254 31.8355 10.3698 31.8231 10.4286L29.9754 19.2054C29.959 19.2833 30.0107 19.3592 30.0891 19.3725L33.8553 20.0105C33.9382 20.0246 33.9902 20.1079 33.9663 20.1886L30.5936 31.5793C30.5472 31.7362 30.7613 31.832 30.8473 31.6928L39.1129 18.3199C39.1664 18.2333 39.1127 18.1203 39.0117 18.1071L35.1696 17.6064C35.0795 17.5947 35.0242 17.5017 35.0569 17.4169L37.9933 9.80889C38.0314 9.71036 37.9509 9.60675 37.846 9.61917Z"
                fill="black"
                stroke="black"
                stroke-width="0.140208"
              />
              <path
                d="M11.75 31.389C11.75 37.0706 17.7622 44.1903 25.7785 44.1903C33.7948 44.1903 41.1255 38.811 43.446 26.959"
                stroke="black"
                stroke-width="1.05478"
              />
              <path
                d="M9.37891 32.7581C9.95898 31.8264 11.8152 30.364 14.5995 31.9671"
                stroke="black"
                stroke-width="1.05478"
                stroke-linecap="round"
              />
              <path
                d="M40.707 28.4868C41.3223 27.4849 43.2277 25.924 45.9277 27.6958"
                stroke="black"
                stroke-width="1.05478"
                stroke-linecap="round"
              />
            </svg>

            <h1
              className={`text-white pl-2 text-4xl font-normal ${peralta.className} leading-tight`}
            >
              Partiyo
            </h1>
          </div>
        </Link>
        {!session && (
          <Link href="/register">
            <Button
              // className="px-6 py-2 h-16 bg-[#084be7] text-center text-white text-base font-bold leading-normal"
              className="px-6 py-2 h-16 bg-[#084be7] text-white text-center text-base font-bold leading-normal w-max inline self-end rounded-none"
              type="button"
            >
              Sign In
            </Button>
          </Link>
        )}
      </header>

      <form
        onSubmit={handleSubmit}
        className={`p-2 pt-0 md:pb-9 md:px-16 flex-1 flex flex-col gap-3 ${theme.pageBgImage} bg-cover bg-center `}
      >
        <div className="w-full flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-11">
          <div className="flex flex-col ">
            {/* Pass handleToggleSidebar to TopMenu */}
            <TopMenu onSettingsClick={handleToggleSidebar} />
            <div className="flex flex-col space-y-3">
              <Input
                name="title"
                placeholder="Untitled Event"
                value={formData.title}
                onChange={handleChange}
                isRequired={true}
                parentClassName="h-24"
                className="text-6xl placeholder:text-6xl leading-10 h-24 font-semibold"
              />

              <DateRangePicker
                initialDateFrom={formData.startDateTime}
                initialDateTo={formData.endDateTime}
                showCompare={false}
                align="start"
                onUpdate={updateDateRange}
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
                value={formData.maxGuestLimit || ""}
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
                name="isOutdoor"
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
          </div>

          <div className="flex flex-col space-y-3 pt-0 md:pt-28">
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
              requireGuestApproval={formData.requireGuestApproval}
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
      {isSidebarOpen && (
        <SettingsSidebar handleToggleSidebar={handleToggleSidebar} />
      )}
    </div>
  );
};

export default EventForm;
