"use client";
import { chips } from "@/createEvent/config/chipConfig";
import { defaultFormValuesRSVPMoods } from "@/createEvent/config/rvspMood";
import { getDateAdjustedForTimezone } from "@/createEvent/organisms/DateRangePicker";
import Header from "@/createEvent/organisms/Header";
import type { EventFormData } from "@/createEvent/templates/EventForm";
import type { ThemeName } from "@/providers/themeConfig";
import { useCreateEventTheme } from "@/providers/themeProvider";
import type { Chip, ChipType, RSVPMood } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getEventFromIndexedDB } from "../../create/indexedDBActions";
import EventDetail from "../_organisms/EventDetail";
import Footer from "../_organisms/Footer";
import TopMenu from "../_organisms/TopMenu";

export interface ChipInfo extends Chip {
  icon: React.ReactNode;
  label: string;
}

export interface RSVPMoodInfo extends RSVPMood {
  name: string;
}

export interface PreviewFormData extends EventFormData {
  rsvpMoods: RSVPMoodInfo[];
  chips: ChipInfo[];
}

const PreviewEvent = () => {
  const { theme, setThemeName } = useCreateEventTheme();
  const [isClicked, setIsClicked] = useState({
    previewing: true,
    copy: false,
  });

  const [eventData, setEventData] = useState<PreviewFormData>({
    title: "",
    startDateTime: new Date(),
    endDateTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    description: null,
    style: null,
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
    activity: null,
  });

  useEffect(() => {
    const loadData = async () => {
      if (typeof window !== "undefined") {
        try {
          const cachedData =
            (await getEventFromIndexedDB()) as PreviewFormData | null;
          if (cachedData !== null) {
            cachedData.startDateTime = getDateAdjustedForTimezone(
              new Date(cachedData.startDateTime),
            );
            // console.log("Chips Data in Preview page", cachedData.chips);

            cachedData.endDateTime = getDateAdjustedForTimezone(
              new Date(cachedData.endDateTime),
            );

            const rsvpMoods = (
              cachedData.rsvpMoods || defaultFormValuesRSVPMoods
            )
              .filter((mood) =>
                ["ATTENDING", "MAYBE", "REGRETFULLY"].includes(mood.value),
              )
              .map(
                (mood, index): RSVPMoodInfo => ({
                  ...mood,
                  id: index,
                  name:
                    mood.value === "ATTENDING"
                      ? "Attending"
                      : mood.value === "MAYBE"
                        ? "Maybe"
                        : "Regretfully",
                }),
              );

            cachedData.rsvpMoods = rsvpMoods;

            // console.log(
            //   "RSVP Moods Data in Preview page after reduce function",
            //   cachedData.rsvpMoods,
            // );

            cachedData.chips = cachedData.chips.reduce(
              (
                acc,
                formChip: { value: ChipType; inputValue: string },
                index,
              ) => {
                const chipConfig = chips.find(
                  (chip) => chip.value === formChip.value,
                );

                if (chipConfig) {
                  acc.push({
                    ...formChip,
                    id: index,
                    eventId: Date.now().toString(),
                    label: chipConfig.text,
                    icon: chipConfig.icon,
                    inputValue:
                      formChip.inputValue.trim() === ""
                        ? chipConfig.placeholderText || ""
                        : formChip.inputValue,
                  });
                }

                return acc;
              },
              [] as ChipInfo[],
            );

            // console.log(
            //   "Chips Data in Preview page after reduce function",
            //   cachedData.chips
            // );
            // console.log(cachedData);
            setEventData(cachedData);
            if (cachedData.style) {
              setThemeName(cachedData.style as ThemeName);
            }
          }
        } catch (error) {
          console.error("Failed to load event data from IndexedDB", error);
        }
      }
    };

    loadData(); // Run the async function
  }, [setThemeName]);

  const handleClick = (target: "previewing" | "copy") => {
    setIsClicked((prevState) => ({
      previewing: target === "previewing" ? !prevState.previewing : false,
      copy: target === "copy" ? !prevState.copy : false,
    }));
  };

  if (!eventData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Image
          src="/assets/images/spinner.svg"
          width={40}
          height={40}
          alt="Loading"
          className="bg-black"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main
        className={`text-white h-max lg:h-full flex flex-col items-center justify-between bg-cover ${theme.pageBgImage}`}
      >
        <div className="flex flex-col items-start text-white px-20">
          <TopMenu isClicked={isClicked} handleClick={handleClick} />
          <EventDetail eventData={eventData} />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default PreviewEvent;
