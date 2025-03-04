"use client";
import RVSPEvent from "@/actions/RVSPEvent";
import getEventDetail from "@/actions/getEvent";
import requestToJoinEvent from "@/actions/requestToJoinEvent";
import EventDetail from "@/app/(pages)/events/preview/_organisms/EventDetail";
import Footer from "@/app/(pages)/events/preview/_organisms/Footer";
import type {
  ChipInfo,
  RSVPMoodInfo,
} from "@/app/(pages)/events/preview/_templates/PreviewEvent";
import { chips } from "@/createEvent/config/chipConfig";
import Header from "@/createEvent/organisms/Header";
import type { ThemeName } from "@/providers/themeConfig";
import { ThemeProvider, useCreateEventTheme } from "@/providers/themeProvider";
import {
  type Chip,
  type ChipType,
  type Event,
  MoodType,
  type RSVPMood,
} from "@prisma/client";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { getEventFromIndexedDB } from "../../../create/indexedDBActions";

export interface JoinEventData extends Event {
  rsvpMoods: RSVPMoodInfo[];
  chips: ChipInfo[];
}

interface JoinEventProps {
  eventID: string;
}

const JoinEvent: React.FC<JoinEventProps> = ({ eventID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const { theme, setThemeName } = useCreateEventTheme();
  const [eventData, setEventData] = useState<JoinEventData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchEventDetails = async () => {
      try {
        const eventDetail =
          eventID === "0"
            ? await getEventFromIndexedDB()
            : await getEventDetail(eventID);
        if (!eventDetail) {
          throw new Error("Event does not exist");
        }

        setEventData({
          image: null,
          authorId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...eventDetail,
          rsvpMoods: eventDetail.rsvpMoods
            .filter(
              (mood: RSVPMood | { value: MoodType; emoji: string | null }) =>
                mood.value in MoodType,
            )
            .map(
              (
                mood: RSVPMood | { value: MoodType; emoji: string | null },
                index: number,
              ): RSVPMoodInfo => ({
                id: index,
                eventId: "0",
                ...mood,
                name:
                  mood.value === "ATTENDING"
                    ? "Attending"
                    : mood.value === "MAYBE"
                      ? "Maybe"
                      : "Regretfully",
              }),
            ),
          chips: eventDetail.chips.reduce(
            (
              acc: ChipInfo[],
              eventChip: { value: ChipType; inputValue: string } | Chip,
              index: number,
            ) => {
              const chipConfig = chips.find(
                (chip) => chip.value === eventChip.value,
              );

              if (chipConfig) {
                console.log(chipConfig.placeholderText);
                acc.push({
                  id: index,
                  eventId: "0",
                  ...eventChip,
                  label: chipConfig.text,
                  icon: chipConfig.icon,
                  inputValue:
                    eventChip.inputValue.trim() === ""
                      ? chipConfig.placeholderText || ""
                      : eventChip.inputValue,
                });
              }

              return acc;
            },
            [],
          ),
        });

        setThemeName(
          eventDetail.style !== null
            ? (eventDetail.style as ThemeName)
            : "light",
        );
      } catch (error) {
        console.error("Error fetching event:", error);
        setEventData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventID, setThemeName]);

  const handleRequestToJoin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!session) {
      return;
    }

    if (
      session.userID === eventData?.authorId ||
      !eventData ||
      eventData.id === "0"
    ) {
      return;
    }

    try {
      await requestToJoinEvent(eventData.id);
      alert(
        "We have got your request to join the event. We will get back to you as soon as possible.",
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleRVSPMood = async (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>,
    mood: RSVPMoodInfo,
  ) => {
    e.preventDefault();

    if (!session) {
      return;
    }

    if (
      !eventData ||
      session.userID === eventData?.authorId ||
      eventData.id === "0"
    ) {
      return;
    }

    try {
      await RVSPEvent(eventData.id, mood.id);
      alert(
        mood.value === "ATTENDING"
          ? "We look forward to see you at the event."
          : mood.value === "REGRETFULLY"
            ? "We regret not being able to see you at the event."
            : "We look forward to see you at the event.",
      );
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) {
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

  if (!eventData) {
    return (
      <div className="text-white h-full flex flex-col items-center justify-between bg-cover">
        <h1>Event not found</h1>
      </div>
    );
  }

  console.log(eventData);

  return (
    <SessionProvider>
      <ThemeProvider>
        <div className="flex flex-col h-screen">
          <Header />
          <main
            className={`flex-1 text-white flex flex-col items-center justify-between bg-cover ${theme.pageBgImage}`}
          >
            <div className="flex flex-col items-start text-white px-4 md:px-10 lg:px-20 py-20">
              <EventDetail
                eventData={eventData}
                onRequestToJoin={handleRequestToJoin}
                onRVSP={handleRVSPMood}
              />
            </div>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default JoinEvent;
