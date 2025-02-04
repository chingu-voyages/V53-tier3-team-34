
"use client";
import { useCreateEventTheme } from "../../../../providers/themeProvider";

import { SessionProvider } from "next-auth/react"; 
import { useSession } from "next-auth/react";
import { Peralta } from "next/font/google";

import Image from "next/image";
import { useEffect, useState } from "react";
import { icons } from "../../../../createEvent/config/icons";

import { defaultFormValuesRSVPMoods } from "../../../../createEvent/config/rvspMood";
import { ThemeProvider } from "../../../../providers/themeProvider";
import RSVPEmojiPicker from "../../../../createEvent/molecules/RSVPEmojiPicker";
import Link from "next/link";

interface ChipModel {
  icon: React.ReactNode;
  text: string;
  value: string;
  inputValue?: string;
  maxCountCharacters: number;
  placeholderText?: string;
  placeholderClassName?: string;
  preText?: string;
}

const chipForm: ChipModel[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Music Styled"
      >
        <title>Music Styled</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.97852 18.8007C8.99272 18.7241 9 18.641 9 18.5512V18.5V8C9 8 13.0263 7.23253 14 7C14.4512 6.89226 15 6.51789 15 5.93171V4.17317C15 3.38226 14.2639 2.81827 13.5394 3.05418L7.78944 4.81272C7.31978 4.96567 7 5.41894 7 5.93171V16.1423C6.68722 16.0501 6.35064 16 6 16C4.34315 16 3 17.1193 3 18.5C3 19.8807 4.34315 21 6 21C7.53473 21 8.80029 20.0396 8.97852 18.8007Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 10C15 9.44772 15.4477 9 16 9H20C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H16C15.4477 11 15 10.5523 15 10ZM13 14C13 13.4477 13.4477 13 14 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H14C13.4477 15 13 14.5523 13 14ZM14 17C13.4477 17 13 17.4477 13 18C13 18.5523 13.4477 19 14 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H14Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Music Styled",
    value: "musicStyled",
    maxCountCharacters: 200,
    placeholderText: "Www.Spotify.com",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Food Served"
      >
        <title>Food Served</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 15V20C2 21.6569 4.23858 23 7 23C8.9791 23 10.6896 22.3101 11.5 21.3092C12.3104 22.3101 14.0209 23 16 23C18.7614 23 21 21.6569 21 20V15C21 13.3431 18.7614 12 16 12C14.0209 12 12.3104 12.6899 11.5 13.6908C10.6896 12.6899 8.9791 12 7 12C4.23858 12 2 13.3431 2 15ZM16 17C18.281 17 20 15.9686 20 15C20 14.0314 18.281 13 16 13C13.719 13 12 14.0314 12 15C12 15.9686 13.719 17 16 17ZM11 15C11 14.0314 9.281 13 7 13C4.719 13 3 14.0314 3 15C3 15.9686 4.719 17 7 17C9.281 17 11 15.9686 11 15Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.6609 2.02107C19.8361 2.52971 19.5657 3.08401 19.0571 3.25915C19.049 3.26193 19.0409 3.26461 19.0327 3.26717L2.33572 8.52934C2.07035 8.61297 1.78665 8.46995 1.69606 8.20687C1.60547 7.94378 1.74098 7.65642 2.00159 7.55894L18.3987 1.42588C18.9026 1.23743 19.4638 1.4931 19.6523 1.99696C19.6552 2.00496 19.6581 2.013 19.6609 2.02107ZM20.9716 6.55165C21.065 7.08142 20.7113 7.58661 20.1815 7.68002C20.1731 7.68151 20.1646 7.68288 20.1562 7.68414L2.84157 10.2695C2.56638 10.3106 2.30855 10.125 2.26023 9.85097C2.21191 9.57695 2.3907 9.31432 2.66336 9.25881L19.818 5.76634C20.3452 5.65902 20.8595 5.99935 20.9668 6.52647C20.9685 6.53485 20.9701 6.54324 20.9716 6.55165ZM16.0001 16C16.8285 16 17.5001 15.5523 17.5001 15C17.5001 14.4477 16.8285 14 16.0001 14C15.1716 14 14.5001 14.4477 14.5001 15C14.5001 15.5523 15.1716 16 16.0001 16ZM8.50007 15C8.50007 15.5523 7.82849 16 7.00007 16C6.17164 16 5.50007 15.5523 5.50007 15C5.50007 14.4477 6.17164 14 7.00007 14C7.82849 14 8.50007 14.4477 8.50007 15Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Food Served",
    value: "foodServed",
    maxCountCharacters: 200,
    placeholderText: "Chinese Food like Dumplings",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="BYOY"
      >
        <title>BYOY</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 18V22C8 22.5523 8.44772 23 9 23H15C15.5523 23 16 22.5523 16 22V10.4142C16 10.149 15.8946 9.89464 15.7071 9.70711L14.2929 8.29289C14.1054 8.10536 14 7.851 14 7.58579V5C14 4.44772 13.5523 4 13 4H11C10.4477 4 10 4.44772 10 5V7.58579C10 7.851 9.89464 8.10536 9.70711 8.29289L8.29289 9.70711C8.10536 9.89464 8 10.149 8 10.4142V13H12V18H8Z"
          fill="currentColor"
        />
        <rect x="10" y="1" width="4" height="2" rx="1" fill="currentColor" />
      </svg>
    ),
    text: "BYOY",
    value: "byoy",
    maxCountCharacters: 200,
    placeholderText:
      "Yes, it's BYOB! Feel free to bring whatever you’d like to drink.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Dress Code"
      >
        <title>Dress Code</title>
        <path
          d="M16.0722 21.7006C15.9771 23.1833 8.02338 23.0991 7.92236 21.7006C7.63066 14.0682 8.79639 11.19 9.16483 8.56434C9.25398 7.92998 8.46906 6.80236 8.27345 6.01795C7.85547 4.36045 8.4542 2.91192 7.85547 1.54514L8.71914 1.21875C9.20645 3.12038 10.4921 4.47877 12.0015 4.47877C13.5109 4.47877 14.7965 3.12038 15.2838 1.21875L16.1475 1.54509C15.5487 2.91192 16.1475 4.36041 15.7295 6.01791C15.5314 6.80236 14.747 7.92994 14.8381 8.56434C15.1981 11.1905 16.3639 14.0687 16.0722 21.7006Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Dress Code",
    value: "dressCode",
    maxCountCharacters: 200,
    placeholderText: "It’s a red theme—get creative with your outfit!",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Registry"
      >
        <title>Registry</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7V8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8V7ZM4 12C4 11.4477 4.44772 11 5 11H10C10.5523 11 11 11.4477 11 12V19C11 19.5523 10.5523 20 10 20H5C4.44772 20 4 19.5523 4 19V12ZM14 11C13.4477 11 13 11.4477 13 12V19C13 19.5523 13.4477 20 14 20H19C19.5523 20 20 19.5523 20 19V12C20 11.4477 19.5523 11 19 11H14Z"
          fill="currentColor"
        />
        <path
          d="M14.4454 2.16796C14.9049 1.86161 15.5258 1.98579 15.8322 2.44531C16.1385 2.90484 16.0143 3.52571 15.5548 3.83206L12.0001 6.20187L8.44541 3.83206C7.98588 3.52571 7.8617 2.90484 8.16806 2.44531C8.47441 1.98579 9.09528 1.86161 9.55481 2.16796L12.0001 3.79816L14.4454 2.16796Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Registry",
    value: "registry",
    maxCountCharacters: 200,
    placeholderText: "[Insert Registry Link]",
    placeholderClassName: "italic  placeholder-[#094ce7]",
    preText: "Find it here:",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Special Group"
      >
        <title>Special Group</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 7C5 9.20914 6.79086 11 9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7ZM15 11C15 12.6569 16.3431 14 18 14C19.6569 14 21 12.6569 21 11C21 9.34315 19.6569 8 18 8C16.3431 8 15 9.34315 15 11Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.98334 13C4.26191 13 0.388259 15.4265 0.000651684 20.1992C-0.0204618 20.4592 0.476712 21 0.727502 21H17.2467C17.9979 21 18.0096 20.3955 17.9979 20.2C17.7049 15.2932 13.7712 13 8.98334 13ZM23.4559 21H19.6C19.6 18.7491 18.8563 16.6718 17.6012 15.0006C21.0077 15.0379 23.7892 16.7601 23.9985 20.4C24.0069 20.5466 23.9985 21 23.4559 21Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Special Group",
    value: "specialGroup",
    maxCountCharacters: 200,
    placeholderText:
      "No, this is a casual get-together for friends and family.",
  },
];





import { Button } from "@/components/ui/button";

const peralta = Peralta({
  weight: "400",
  subsets: ["latin"],
});
type ChipType = {
  value: string;
  inputValue: string;
};
type EventDataType = {
  title: string;
  startDateTime: Date;
  endDateTime: Date; // Change from string to Date
  description: string | null;
  reason: string | null;
  guestHonor: string | null;
  host: string | null;
  address: string | null;
  isOutdoor: boolean;
  rsvpMoods: { value: string; emoji: string }[];
  userGuestLimit: number | null;
  maxGuestLimit: number | null;
  isPublic: boolean;
  requireGuestApproval: boolean;
  imageUrl: string |null;
  costPerPerson: number | null;
  chip: ChipType[];
};

const PreviewPage = () => {
  const [detailChips, setDetailChips] = useState<ChipType | null>([]);

  const [eventData, setEventData] = useState<EventDataType | null>(() => {
    
    // Default form values if no cached data
    return {
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
      rsvpMoods: defaultFormValuesRSVPMoods,
      chip: [],
    };
  });
  const { data: session } = useSession();
  

  useEffect(() => {
    const cachedData = localStorage.getItem("cachedEventData");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      console.log(parsedData);
      
      // ✅ Rename 'chips' to 'chip' and remove 'chips'
    const updatedLocal = { ...parsedData, chip: parsedData.chips || [] };
    const { chips, ...updatedLocalData } = updatedLocal; // Removes 'chips'

    
  
      // Convert date fields back to Date objects
      if (updatedLocalData.startDateTime) {
        updatedLocalData.startDateTime = new Date(updatedLocalData.startDateTime);
      }
      if (updatedLocalData.endDateTime) {
        updatedLocalData.endDateTime = new Date(updatedLocalData.endDateTime);
      }
      if (updatedLocalData.rsvpMoods) {
        updatedLocalData.rsvpMoods = updatedLocalData.rsvpMoods.map((mood: any) => ({
          ...mood,
          name:
            mood.value === "attending"
              ? "Attending"
              : mood.value === "maybe"
              ? "Maybe"
              : mood.value === "regretfully"
              ? "Regretfully"
              : "Unknown",
        }));
      }
      console.log(updatedLocalData.rsvpMoods);
      // if (!updatedLocalData.chip) {
      //   updatedLocalData.chip = [];
      // }
      console.log(updatedLocalData.chip);
      setEventData(updatedLocalData);
      console.log("Loaded cached form data:", updatedLocalData);



      console.log(parsedData.chips);
      setDetailChips( updatedLocalData?.chip?.map((c) => { 
        const chipConfig = chipForm.find((chipItem) => chipItem.value === c.value);
        console.log("chipConfig found:", chipConfig);
        return {
          label: chipConfig?.text || c.value, 
          value: c.inputValue || chipConfig?.placeholderText,
          inputValue: c.inputValue || "", 
          icon: chipConfig?.icon || "", 
        };
      }) || []);
      

    }
    
  }, []);
  console.log(eventData);
  console.log(detailChips);
  console.log(detailChips);

  const { theme } = useCreateEventTheme();

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
    isPublic,
    requireGuestApproval,
    costPerPerson,
    imageUrl,
    chip,
  } = eventData;
  console.log("RSVP Moods in PreviewPage:", rsvpMoods);
  console.log("chips in PreviewPage:", chip);

  console.log("Chips:", chip);

  // Additional details array with icons
  const details = [
    { label: "Reason", value: reason || "N/A", icon: "cake" },
    { label: "Guest of Honor", value: guestHonor || "N/A", icon: "person" },
    { label: "Host", value: host || "N/A", icon: "host" },
    { label: "Address", value: address || "N/A", icon: "location" },
    { label: "Outdoor", value: isOutdoor ? "Yes" : "No", icon: "sunrise" },
    { label: "Max Guests", value: maxGuestLimit || "N/A", icon: "chair" },
    {
      label: "User Guest Limit",
      value: userGuestLimit || "N/A",
      icon: "addPeople",
    },
    {
      label: "Cost Per Person",
      value: costPerPerson ? `$${costPerPerson}` : "Free",
      icon: "cost",
    },
    { label: "Public Event", value: isPublic ? "Yes" : "No", icon: "chair" },
    {
      label: "Guest Approval Required",
      value: requireGuestApproval ? "Yes" : "No",
      icon: "person",
    },

  ];


  
  
  const formatDate = (date: Date, locale = "en-us"): string => {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-hour format
    });
  };

  return (
    <>
  

      <header className="flex justify-between items-center bg-red-600 py-9 px-16">
        <h1
          className={`text-white text-4xl font-normal ${peralta.className} leading-tight`}
        >
          Partiyo
        </h1>
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

      {/* Main Content */}
      <main
        className={`flex flex-col items-start bg-red-900 text-white px-20 min-h-screen ${
          theme.pageBgImage || ""
        }`}
        style={{ backgroundSize: "cover" }}
      >
        {/* 2) Preview Toolbar (dark background + icons) */}

        <div className=" flex justify-center  gap-3 backdrop-blur-2xl items-center  text-white py-6 px-4">
          {/* “Previewing” Button */}
          
          
        <button
          type="button"
          className="flex items-center gap-2 hover:bg-gray-600 px-3 py-3 rounded uppercase text-md text-white"
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
              style={{ maskType: 'luminance' }}
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
              <path
                d="M0.5 0L52.5 0L52.5 52L0.5 52L0.5 0Z"
                fill="white"
              />
            </g>
          </svg>
          <span>Previewing</span>
        </button>

          {/* Divider line */}
          <span className="w-px h-14 bg-white" />
          {/* “Back” Button */}
          <button
            type="button"
            className="flex items-center gap-1  hover:bg-gray-600 px-3 py-3 rounded uppercase text-md"
            onClick={() => history.back()}
          >
            {/* <ArrowLeftIcon className="h-4 w-4" /> */}
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="53" height="52" viewBox="0 0 53 52" 
              fill="none">
              <rect width="4.33333" 
              height="30.3333" rx="1" 
              transform="matrix(0 -1 -1 0 37.3334 28.166)" 
              fill="white"/>
              <title>Back</title>
              <rect x="41.6666" y="6.5" 
              width="4.33333" height="39" 
              rx="1.5" fill="white"/>
              <path d="M23.6987 37.4673C24.5449 38.3134 24.5449 39.6853 23.6987 40.5314C22.8526 41.3775 21.4807 41.3775 20.6346 40.5314L7.6346 27.5314C6.81435 26.7112 6.78565 25.3904 7.5695 24.5353L19.4862 11.5353C20.2948 10.6532 21.6653 10.5936 22.5474 11.4022C23.4295 12.2108 23.4891 13.5813 22.6805 14.4634L12.1656 25.9342L23.6987 37.4673Z" 
              fill="white"/>
            </svg>
            <span>Back</span>
          </button>

          {/* Divider line */}
          <span className="w-px h-14 bg-white" />
          {/* “Copy” Button */}
          <button
            type="button"
            className="flex items-center gap-1  hover:bg-gray-600 px-3 py-3 rounded uppercase text-md"
          >
            {/* <LinkIcon className="h-4 w-4" /> */}
            <svg xmlns="http://www.w3.org/2000/svg"
              width="52" height="52" viewBox="0 0 52 52" 
              fill="none">
              <title>Copy</title>
              <path fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M7.49734 32.2459C6.71629 33.027 6.7163 34.2933 7.49734 35.0744L16.9254 44.5025C17.7065 45.2835 18.9728 45.2835 19.7539 44.5025L29.182 35.0744C29.963 34.2933 29.963 33.027 29.182 32.2459L26 29.064L20.5788 34.4851C20.1883 34.8756 19.5551 34.8756 19.1646 34.4851L17.5147 32.8352C17.1242 32.4447 17.1242 31.8115 17.5147 31.421L22.9358 25.9998L19.7539 22.8179C18.9728 22.0368 17.7065 22.0368 16.9254 22.8179L7.49734 32.2459Z" 
              fill="white"/>
              <path 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M22.818 16.9256C22.037 17.7067 22.037 18.973 22.818 19.7541L26 22.936L31.4212 17.5149C31.8117 17.1244 32.4448 17.1244 32.8354 17.5149L34.4853 19.1648C34.8758 19.5553 34.8758 20.1885 34.4853 20.579L29.0641 26.0002L32.2461 29.1821C33.0272 29.9632 34.2935 29.9632 35.0745 29.1821L44.5026 19.7541C45.2837 18.973 45.2837 17.7067 44.5026 16.9256L35.0745 7.49754C34.2935 6.71649 33.0272 6.71649 32.2461 7.49754L22.818 16.9256Z" 
              fill="white"/>
            </svg>
            <span>Copy</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row w-full  items-start gap-10">
          {/* LEFT Column: Image + RSVP */}
          <div className="w-full lg:w-1/2">
            {/* 1) Image in a relative container */}
            <div className="flex flex-col items-center justify-column w-full">
              <Image
                src={imageUrl ? imageUrl :"/assets/images/events/defaultEvent.png"}
                alt="Event Banner"
                // Provide width/height or use "fill"
                width={600}
                height={600}
                className="w-full rounded-md shadow-lg object-cover"
              />

        <div
          className={`px-10 flex gap-10 ${
            requireGuestApproval ? "m-auto py-2.5" : ""
          }`}
        >
          {requireGuestApproval ? (
            <Button className="h-16 px-6 py-2 text-center bg-[#aeaaaa]/30 text-white text-base font-bold leading-normal rounded-none">
              Request to Join
            </Button>
          ) : (
            <>
            {rsvpMoods?.map((mood) => (
              <div key={mood.value} className="flex flex-col items-center">
                <RSVPEmojiPicker
                  mood={mood}
                  theme={theme}
                  selectedRSVPEmoji={null} 
                  disablePicker={true} // Disable emoji picker in preview mode
                />
               
              </div>
            ))}
          </>
        )}
        </div>
            </div>
          </div>

          {/* RIGHT Column: Event details */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl font-bold">{title || "Untitled Event"}</h1>
            <p className="text-xl mt-2">
              {startDateTime ? formatDate(startDateTime, "en-us") : "No Start Date"}
            </p>
            <p className="text-xl mt-2">
              {endDateTime ? formatDate(endDateTime, "en-us") : "No End Date"}
            </p>

            {/* Additional bullet lines (with custom text) */}
            <div className="mt-8 space-y-3 text-lg">
              {details.map((item) => {
                // 2) Switch label => custom line
                let displayText = "";
                switch (item.label) {
                  case "Reason":
                    displayText = `For   ${item.value}`;
                    break;
                  case "Guest of Honor":
                    displayText = `Honour of Guest  (${item.value})`;
                    break;
                  case "Host":
                    displayText = `Hosted by   (${item.value})`;
                    break;
                  case "Max Guests":
                    displayText = `${item.value} Attendance`;
                    // or "Max Guests: 18" if you prefer
                    break;
                  case "User Guest Limit":
                    displayText = `Bring Guest (${item.value})`;
                    break;
                  case "Address":
                    displayText = String(item.value);;
                    break;
                  case "Outdoor":
                    displayText = item.value === "Yes" ? "Outdoor" : "";
                    break;
                  default:
                    displayText = String(item.value);;
                }

                // If it's empty or "N/A," skip
                if (!displayText || displayText === "N/A") return null;

                return (
                  <div key={item.label} className="flex items-center gap-2">
                    {/* Icon */}
                    <div className="w-5 h-5 flex-none">{icons?.[item.icon as IconName]}</div>
                    {/* Text */}
                    <p>{displayText}</p>
                  </div>
                );
              })}
            </div>

            {/* Rendering the chips */}
            {detailChips?.map((item) => (
              <div key={item.label} className="flex items-center gap-2 space-y-3">
                <div className="w-5 h-5 flex-none">{item.icon}</div>
                <p>{item.label}:    {item.inputValue || item.value}</p>
              
              </div>
            ))}
             
            
            <p className="text-xl mt-4">
              {description || "No description provided."}
            </p>
          </div>
        </div>
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

