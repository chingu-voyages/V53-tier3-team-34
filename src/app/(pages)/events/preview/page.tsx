"use client";
import { useCreateEventTheme } from "@/providers/themeProvider";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Peralta } from "next/font/google";

import { Button } from "@/components/ui/button";
import { activities } from "@/createEvent/config/activityConfig";
import { chips } from "@/createEvent/config/chipConfig";
import { icons } from "@/createEvent/config/icons";
import {
  type RSVPMood,
  defaultFormValuesRSVPMoods,
} from "@/createEvent/config/rvspMood";
import RSVPEmojiPicker from "@/createEvent/molecules/RSVPEmojiPicker";
import { getDateAdjustedForTimezone } from "@/createEvent/organisms/DateRangePicker";
import type { EventFormData } from "@/createEvent/templates/EventForm";
import { ThemeProvider } from "@/providers/themeProvider";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getEventFromIndexedDB } from "../create/indexedDBActions";

const peralta = Peralta({
  weight: "400",
  subsets: ["latin"],
});

type ChipType = {
  icon: React.ReactNode;
  label: string;
  value: string;
  inputValue: string;
};

interface PreviewFormData extends EventFormData {
  rsvpMoods: RSVPMood[];
  chips: ChipType[];
}

const PreviewPage = () => {
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
    activity: null,
  });

  const { data: session } = useSession();

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
            console.log("Chips Data in Preview page", cachedData.chips);

            cachedData.endDateTime = getDateAdjustedForTimezone(
              new Date(cachedData.endDateTime),
            );

            const rsvpMoods = (
              cachedData.rsvpMoods || defaultFormValuesRSVPMoods
            )
              .filter((mood) =>
                ["attending", "maybe", "regretfully"].includes(mood.value),
              )
              .map(
                (mood): RSVPMood => ({
                  ...mood,
                  name:
                    mood.value === "attending"
                      ? "Attending"
                      : mood.value === "maybe"
                        ? "Maybe"
                        : "Regretfully",
                }),
              ) as RSVPMood[];

            cachedData.rsvpMoods = rsvpMoods;

            cachedData.chips = cachedData.chips.reduce(
              (acc, formChip: { value: string; inputValue: string }) => {
                const chipConfig = chips.find(
                  (chip) => chip.value === formChip.value,
                );

                if (chipConfig) {
                  console.log(chipConfig.placeholderText);
                  acc.push({
                    ...formChip,
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
              [] as ChipType[],
            );

            console.log(
              "Chips Data in Preview page after reduce function",
              cachedData.chips,
            );
            console.log(cachedData);
            setEventData(cachedData);
          }
        } catch (error) {
          console.error("Failed to load event data from IndexedDB", error);
        }
      }
    };

    loadData(); // Run the async function
  }, []);

  const { theme } = useCreateEventTheme();

  const handleClick = (target: "previewing" | "copy") => {
    setIsClicked((prevState) => ({
      previewing: target === "previewing" ? !prevState.previewing : false,
      copy: target === "copy" ? !prevState.copy : false,
    }));
  };

  if (!eventData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    title,
    startDateTime,
    endDateTime,
    description,
    reason,
    guestHonor,
    host,
    address,
    isOutdoor,
    rsvpMoods,
    userGuestLimit,
    maxGuestLimit,
    requireGuestApproval,
    costPerPerson,
    imageUrl,
    activity,
  } = eventData;

  const activityDetails = activities.find((act) => act.value === activity);
  // Additional details array with icons
  const details = [
    { label: "Reason", value: reason || "N/A", icon: icons.cake },
    { label: "Guest of Honor", value: guestHonor || "N/A", icon: icons.person },
    { label: "Host", value: host || "N/A", icon: icons.host },
    { label: "Address", value: address || "N/A", icon: icons.location },
    { label: "Outdoor", value: isOutdoor ? "Yes" : "No", icon: icons.sunrise },
    { label: "Max Guests", value: maxGuestLimit || "N/A", icon: icons.chair },
    {
      label: "User Guest Limit",
      value: userGuestLimit || "N/A",
      icon: icons.addPeople,
    },
    {
      label: "Cost Per Person",
      value: costPerPerson ? `$${costPerPerson}` : "Free",
      icon: icons.cost,
    },
    {
      label: "Activity",
      value: activityDetails?.text,
      icon: activityDetails?.icon,
    },
  ];

  return (
    <>
      <header className="flex justify-between items-center bg-red-600 py-9 px-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="Partiyo Logo"
            width={56}
            height={56}
          />
          <h1
            className={`text-white pl-2 text-4xl font-normal ${peralta.className} leading-tight`}
          >
            Partiyo
          </h1>
        </Link>
        {!session && (
          <Link href="/register">
            <Button
              className="px-6 py-2 h-16 bg-[#084be7] text-white text-center text-base font-bold leading-normal w-max inline self-end rounded-none"
              type="button"
            >
              Sign In
            </Button>
          </Link>
        )}
      </header>

      {/* Main Content */}
      <main
        className={`text-white h-full flex flex-col items-center justify-between bg-cover ${theme.pageBgImage}`}
      >
        {/* 2) Preview Toolbar (dark background + icons) */}
        <div className="flex flex-col items-start text-white px-20">
          <div
            className={`backdrop-blur-2xl max-w-screen md:w-max justify-start items-center flex overflow-hidden  ${theme.inputBgColor} ${theme.textColor} text-base `}
          >
            {/* “Previewing” Button */}
            <button
              type="button"
              className={`flex items-center gap-[18px] px-4 py-6 leading-tight self-stretch ${
                isClicked.previewing && "bg-black/20"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="53"
                height="52"
                viewBox="0 0 53 52"
                fill="none"
              >
                <title>Previewing</title>
                <mask
                  id="mask0_692_55345"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="3"
                  y="12"
                  width="47"
                  height="28"
                >
                  <path
                    d="M26.5 39C38.4665 39 48.1666 26 48.1666 26C48.1666 26 38.4665 13 26.5 13C14.5335 13 4.83331 26 4.83331 26C4.83331 26 14.5335 39 26.5 39Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.5 31.4173C27.9366 31.4173 29.3143 30.8466 30.3301 29.8308C31.346 28.815 31.9166 27.4372 31.9166 26.0007C31.9166 24.5641 31.346 23.1863 30.3301 22.1705C29.3143 21.1547 27.9366 20.584 26.5 20.584C25.0634 20.584 23.6856 21.1547 22.6698 22.1705C21.654 23.1863 21.0833 24.5641 21.0833 26.0007C21.0833 27.4372 21.654 28.815 22.6698 29.8308C23.6856 30.8466 25.0634 31.4173 26.5 31.4173Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </mask>
                <g mask="url(#mask0_692_55345)">
                  <path d="M0.5 0L52.5 0L52.5 52L0.5 52L0.5 0Z" fill="white" />
                </g>
              </svg>
              <span>Previewing</span>
            </button>

            {/* Divider line */}
            <span className={`w-px h-14 ${theme.dividerColor}`} />
            {/* “Back” Button */}
            <button
              type="button"
              className="flex items-center gap-[18px] px-4 py-6 leading-tight self-stretch"
              onClick={() => history.back()}
            >
              {/* <ArrowLeftIcon className="h-4 w-4" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="53"
                height="52"
                viewBox="0 0 53 52"
                fill="none"
              >
                <rect
                  width="4.33333"
                  height="30.3333"
                  rx="1"
                  transform="matrix(0 -1 -1 0 37.3334 28.166)"
                  fill="white"
                />
                <title>Back</title>
                <rect
                  x="41.6666"
                  y="6.5"
                  width="4.33333"
                  height="39"
                  rx="1.5"
                  fill="white"
                />
                <path
                  d="M23.6987 37.4673C24.5449 38.3134 24.5449 39.6853 23.6987 40.5314C22.8526 41.3775 21.4807 41.3775 20.6346 40.5314L7.6346 27.5314C6.81435 26.7112 6.78565 25.3904 7.5695 24.5353L19.4862 11.5353C20.2948 10.6532 21.6653 10.5936 22.5474 11.4022C23.4295 12.2108 23.4891 13.5813 22.6805 14.4634L12.1656 25.9342L23.6987 37.4673Z"
                  fill="white"
                />
              </svg>
              <span>Back</span>
            </button>

            {/* Divider line */}
            <span className={`w-px h-14 ${theme.dividerColor}`} />
            {/* “Copy” Button */}
            <button
              type="button"
              className={`flex items-center gap-[18px] px-4 py-6 leading-tight self-stretch ${
                isClicked.copy && "bg-black/20"
              }`}
              onClick={() => handleClick("copy")}
            >
              {/* <LinkIcon className="h-4 w-4" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
              >
                <title>Copy</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.49734 32.2459C6.71629 33.027 6.7163 34.2933 7.49734 35.0744L16.9254 44.5025C17.7065 45.2835 18.9728 45.2835 19.7539 44.5025L29.182 35.0744C29.963 34.2933 29.963 33.027 29.182 32.2459L26 29.064L20.5788 34.4851C20.1883 34.8756 19.5551 34.8756 19.1646 34.4851L17.5147 32.8352C17.1242 32.4447 17.1242 31.8115 17.5147 31.421L22.9358 25.9998L19.7539 22.8179C18.9728 22.0368 17.7065 22.0368 16.9254 22.8179L7.49734 32.2459Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.818 16.9256C22.037 17.7067 22.037 18.973 22.818 19.7541L26 22.936L31.4212 17.5149C31.8117 17.1244 32.4448 17.1244 32.8354 17.5149L34.4853 19.1648C34.8758 19.5553 34.8758 20.1885 34.4853 20.579L29.0641 26.0002L32.2461 29.1821C33.0272 29.9632 34.2935 29.9632 35.0745 29.1821L44.5026 19.7541C45.2837 18.973 45.2837 17.7067 44.5026 16.9256L35.0745 7.49754C34.2935 6.71649 33.0272 6.71649 32.2461 7.49754L22.818 16.9256Z"
                  fill="white"
                />
              </svg>
              <span>Copy</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row w-full items-start justify-center gap-10">
            {/* LEFT Column: Image + RSVP */}
            <div className="w-full lg:w-1/2">
              {/* 1) Image in a relative container */}
              <div className="flex flex-col justify-start w-full">
                <Image
                  src={imageUrl || "/assets/images/events/defaultEvent.png"}
                  alt="Event Banner"
                  width={600}
                  height={600}
                  className="shadow-lg object-cover"
                />

                <div
                  className={`px-10 flex gap-10 ${
                    requireGuestApproval ? "m-auto py-2.5" : ""
                  }`}
                >
                  <div className="px-10 flex gap-10 m-auto p-10">
                    {requireGuestApproval ? (
                      <Button className="h-16 px-6 py-2 text-center bg-[#aeaaaa]/30 backdrop-blur-2xl text-white text-base font-bold leading-normal rounded-none">
                        Request to Join
                      </Button>
                    ) : (
                      <>
                        {rsvpMoods.map((mood) => (
                          <div
                            key={mood.value}
                            className="flex flex-col items-center"
                          >
                            <RSVPEmojiPicker
                              mood={mood}
                              theme={theme}
                              selectedRSVPEmoji={null}
                              disablePicker={true}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT Column: Event details */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-white text-8xl font-semibold font-['Mona Sans']">
                {title || "Untitled Event"}
              </h1>
              <p className="text-white text-4xl font-medium font-['Mona Sans'] leading-loose">
                {startDateTime
                  ? formatDate(startDateTime, "iiii, MMM dd, hh:mm a")
                  : "No Start Date"}
              </p>
              <p className="text-white text-4xl font-medium font-['Mona Sans'] ">
                {endDateTime
                  ? formatDate(endDateTime, "iiii, MMM dd, hh:mm a")
                  : "No End Date"}
              </p>

              {/* Additional bullet lines (with custom text) */}
              <div className="mt-9 gap-6">
                {details.map((item) => {
                  // 2) Switch label => custom line
                  let displayText = "";
                  switch (item.label) {
                    case "Reason":
                      displayText = `For ${item.value}`;
                      break;
                    case "Guest of Honor":
                      displayText = `Honour of Guest (${item.value})`;
                      break;
                    case "Host":
                      displayText = `Hosted by (${item.value})`;
                      break;
                    case "Max Guests":
                      displayText = `${item.value} Attendance`;
                      break;
                    case "User Guest Limit":
                      displayText = `Bring Guest (${item.value})`;
                      break;
                    case "Address":
                      displayText = String(item.value);
                      break;
                    case "Outdoor":
                      displayText = item.value === "Yes" ? "Outdoor" : "";
                      break;
                    case "Activity":
                      displayText = item.value ? String(item.value) : "N/A";
                      break;
                    default:
                      displayText = String(item.value);
                  }

                  // If it's empty or "N/A," skip
                  if (!displayText || displayText === "N/A") return null;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-[#dbd8d8] text-xl font-medium font-['Mona Sans'] leading-loose"
                    >
                      {/* Icon */}

                      <div className="w-6 h-6">{item.icon}</div>

                      {/* Text */}
                      <span className="">{displayText}</span>
                    </div>
                  );
                })}
              </div>

              {/* Rendering the chips */}
              <div className="flex flex-col gap-2">
                {eventData.chips.map((item: ChipType) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-[#dbd8d8] text-xl font-medium font-['Mona Sans'] leading-normal"
                  >
                    <div className={`${theme.iconColor} flex-shrink-0`}>
                      {item.icon}
                    </div>

                    <span>{item.inputValue}</span>
                  </div>
                ))}
              </div>

              {description && (
                <p className="text-xl mt-4 text-[#dbd8d8] font-medium font-['Mona Sans'] leading-loose">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
        <footer
          className={`w-full px-2 py-12 ${theme.inputBgColor} backdrop-blur-2xl flex-col justify-center items-center gap-2.5 inline-flex`}
        >
          <div className="text-[#d1d1d1] text-5xl font-normal font-['Peralta'] leading-tight">
            Partiyo
          </div>
          <div className="text-center text-white/40 text-base font-normal font-['Inter'] leading-normal">
            Copyright &#169; 2025 Partiyo
          </div>
        </footer>
      </main>
    </>
  );
};

const PreviewPageWrapper = () => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <PreviewPage />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default PreviewPageWrapper;
