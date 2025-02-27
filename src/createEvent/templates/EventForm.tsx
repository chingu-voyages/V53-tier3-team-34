"use client";
import { createOrUpdateEvent } from "@/actions/createEvent";
import {
  clearIndexedDB,
  getEventFromIndexedDB,
  saveEventToIndexedDB,
} from "@/app/(pages)/events/create/indexedDBActions";
import ImagePicker from "@/createEvent/organisms/ImagePicker";
import { useCreateEventTheme } from "@/providers/themeProvider";
import { ActivityType, ChipType, MoodType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { icons } from "../config/icons";
import { defaultFormValuesRSVPMoods } from "../config/rvspMood";
import {
  type DateRange,
  getDateAdjustedForTimezone,
} from "../organisms/DateRangePicker";
import "../../app/globals.css";
import { EventImage, Input, TextArea, ToggleInput } from "../molecules";
import {
  ActivitySelector,
  AnimatedButton,
  ChipsList,
  DateRangePicker,
  ImageUpload,
  RSVP,
  SettingsSidebar,
  TopMenu,
} from "../organisms";
import Header from "../organisms/Header";

// const eventFormSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   startDateTime: z.date(),
//   endDateTime: z.date(),
//   description: z.string().nullable(),
//   style: z.string().nullable(),
//   imageUrl: z.string().url().nullable(),
//   guestHonor: z.string().nullable(),
//   host: z.string().nullable(),
//   userGuestLimit: z.number().nullable(),
//   maxGuestLimit: z.number().nullable(),
//   address: z.string().nullable(),
//   isOutdoor: z.boolean().default(false),
//   costPerPerson: z.number().nullable(),
//   isPublic: z.boolean().default(false),
//   requireGuestApproval: z.boolean().default(false),
//   rsvpMoods: z.array(
//     z.object({
//       value: z.nativeEnum(MoodType),
//       emoji: z.string().nullable(),
//     }),
//   ),
//   chips: z.array(
//     z.object({ value: z.nativeEnum(ChipType), inputValue: z.string() }),
//   ),
//   activity: z.nativeEnum(ActivityType).nullable(),
// });

const eventFormSchema = z.object({
  id: z.string().default("0"), // Add ID with default value 0
  title: z.string().min(1, "Title is required"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  description: z.string().nullable(),
  style: z.string().nullable(),
  imageUrl: z.string().url().nullable(),
  guestHonor: z.string().nullable(),
  host: z.string().nullable(),
  userGuestLimit: z.number().nullable(),
  maxGuestLimit: z.number().nullable(),
  address: z.string().nullable(),
  isOutdoor: z.boolean().default(false),
  costPerPerson: z.number().nullable(),
  isPublic: z.boolean().default(false),
  requireGuestApproval: z.boolean().default(false),
  status: z.enum(["TEMPORARY", "PERMANENT"]).default("TEMPORARY"),
  rsvpMoods: z.array(
    z.object({
      value: z.nativeEnum(MoodType),
      emoji: z.string().nullable(),
    }),
  ),
  chips: z.array(
    z.object({ value: z.nativeEnum(ChipType), inputValue: z.string() }),
  ),
  activity: z.nativeEnum(ActivityType).nullable(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

const EventForm = () => {
  const { data: session } = useSession();
  const { themeName, theme } = useCreateEventTheme();
  const [isFormMounted, setIsFormMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const [formData, setFormData] = useState<EventFormData>({
  //   title: "",
  //   startDateTime: getDateAdjustedForTimezone(new Date()),
  //   endDateTime: getDateAdjustedForTimezone(
  //     new Date(new Date().getTime() + 15 * 60 * 1000),
  //   ),
  //   description: null,
  //   style: themeName,
  //   imageUrl: null,
  //   guestHonor: null,
  //   host: null,
  //   userGuestLimit: null,
  //   maxGuestLimit: null,
  //   address: null,
  //   isOutdoor: false,
  //   costPerPerson: null,
  //   isPublic: false,
  //   requireGuestApproval: false,
  //   rsvpMoods: defaultFormValuesRSVPMoods,
  //   chips: [],
  //   activity: null,
  // });

  const [formData, setFormData] = useState<EventFormData>({
    id: "0", // Default ID is 0
    title: "",
    startDateTime: getDateAdjustedForTimezone(new Date()),
    endDateTime: getDateAdjustedForTimezone(
      new Date(new Date().getTime() + 15 * 60 * 1000),
    ),
    description: null,
    style: themeName,
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
    status: "TEMPORARY",
    rsvpMoods: defaultFormValuesRSVPMoods,
    chips: [],
    activity: null,
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
      rsvpMoods:
        name === "requireGuestApproval" && prevState[name]
          ? defaultFormValuesRSVPMoods
          : [],
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

  const handleChipsChange = (
    chipValue: ChipType,
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

    const updatedData = {
      ...formData,
      chips: chips,
    };

    setFormData(updatedData);
  };

  const handleImageChange = useCallback((imageURL?: string) => {
    if (imageURL) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrl: imageURL,
      }));
      <EventImage image={imageURL} />;
    }
  }, []);

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   clearIndexedDB();
  //   try {
  //     e.preventDefault();
  //     eventFormSchema.parse(formData); // Will throw an error if validation fails
  //     if (!session) {
  //       saveEventToIndexedDB(formData);
  //       console.log(formData);
  //       return;
  //     }
  //     console.log("Form is valid! Submitting...");
  //     console.log("Form Data:", formData);
  //     await createEvent(formData);
  //     // Proceed with submission logic
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      alert("You must be signed in to finalize the event.");
      return;
    }

    try {
      setFormData((prev) => ({ ...prev, status: "PERMANENT" }));
      eventFormSchema.parse(formData);
      const response = await createOrUpdateEvent(formData);
      if (response?.eventId && formData.id === "0") {
        setFormData((prev) => ({ ...prev, id: response.eventId }));
      }
      clearIndexedDB();
    } catch (error) {
      console.log("Error finalizing event:", error);
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

  const onChangeActivity = useCallback((activityValue: ActivityType) => {
    setFormData((prevState) => ({
      ...prevState,
      activity: activityValue,
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
            eventFormSchema.parse(formData);
            const response = await createOrUpdateEvent(formData);
            if (response?.eventId && formData.id === "0") {
              setFormData((prev) => ({ ...prev, id: response.eventId }));
            }
            console.log("Id for response", response.eventBody);
            console.log("Id for eventId", formData.id);
            // console.log("Chips data from eventPage", formData.chips);
            // console.log("Activity data from eventPage", formData.activity);
            if (response?.eventId && formData.id === "0") {
              await saveEventToIndexedDB({ ...formData, id: response.eventId });
            } else {
              await saveEventToIndexedDB(formData);
            }
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

      <Header />

      <form
        onSubmit={handleSubmit}
        className={`p-2 pt-0 md:pb-9 md:px-16 flex flex-col items-center gap-3 ${theme.pageBgImage} bg-cover bg-center `}
      >
        <div className="w-max flex flex-col justify-between md:flex-row md:justify-center space-y-3 md:space-y-0 md:space-x-11">
          <div className="flex flex-col w-1/2">
            {/* Pass handleToggleSidebar to TopMenu */}
            <TopMenu
              onSettingsClick={handleToggleSidebar}
              isSettingsOpen={isSidebarOpen}
            />
            <div className="flex flex-col space-y-3 ">
              {/* Moved onchange and imageUrl props to image picker component */}
              <ImageUpload
                showImagePicker={handleShowImagePicker}
                imageURL={formData.imageUrl}
              />

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
                placeholder="Ministry Of Sound, 103 Gaunt ST, LONDON, SE1 6DP"
                value={formData.address || ""}
                onChange={handleChange}
                parentClassName="h-10"
                className="text-xl placeholder:text-xl font-medium leading-loose"
              />

              <ActivitySelector
                selectedActivity={formData.activity}
                onChange={onChangeActivity}
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
            </div>
          </div>

          <div className="flex flex-col w-1/2 space-y-3 pt-0 md:pt-28">
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
        <AnimatedButton />
      </form>
      {isSidebarOpen && (
        <SettingsSidebar handleToggleSidebar={handleToggleSidebar} />
      )}
    </div>
  );
};

export default EventForm;
