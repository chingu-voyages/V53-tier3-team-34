import type { JoinEventData } from "@/app/(pages)/events/join/[eventID]/_templates/JoinEvent";
import { Button } from "@/components/ui/button";
import { activities } from "@/createEvent/config/activityConfig";
import { icons } from "@/createEvent/config/icons";
import RSVPEmojiPicker from "@/createEvent/molecules/RSVPEmojiPicker";
import { useCreateEventTheme } from "@/providers/themeProvider";
import { formatDate } from "date-fns";
import Image from "next/image";
import type React from "react";
import type {
  ChipInfo,
  PreviewFormData,
  RSVPMoodInfo,
} from "../_templates/PreviewEvent";

interface EventDetailProps {
  eventData: PreviewFormData | JoinEventData;
  onRequestToJoin?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onRVSP?: (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>,
    mood: RSVPMoodInfo,
  ) => void;
}
const EventDetail: React.FC<EventDetailProps> = ({
  eventData,
  onRequestToJoin,
  onRVSP,
}) => {
  const { theme } = useCreateEventTheme();
  const {
    title,
    startDateTime,
    endDateTime,
    description,
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
    chips,
  } = eventData;
  console.log(rsvpMoods);

  const activityDetails = activities.find((act) => act.value === activity);
  // Additional details array with icons
  const details = [
    { label: "Guest of Honor", value: guestHonor, icon: icons.person },
    { label: "Host", value: host, icon: icons.host },
    { label: "Address", value: address, icon: icons.location },
    { label: "Outdoor", value: isOutdoor ? "Yes" : "No", icon: icons.sunrise },
    { label: "Max Guests", value: maxGuestLimit, icon: icons.chair },
    {
      label: "User Guest Limit",
      value: userGuestLimit,
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
    <div className="gap-6 h-full pb-3 grid grid-flow-row-dense auto-rows-auto lg:grid-flow-col-dense w-full items-start justify-center gap-10 items-stretch justify-items-start ">
      {/* 1) Image in a relative container */}
      <Image
        src={imageUrl || "/assets/images/events/defaultEvent.png"}
        alt="Event Banner"
        width={300}
        height={320}
        className="w-full max-w-screen lg:max-w-[486px] h-[320px] lg:h-[527px] shadow-lg row-start-1 lg:col-start-1"
      />

      <div
        className={`justify-self-center flex gap-4 sm:gap-10 row-start-3 lg:row-start-2 lg:col-start-1
        ${requireGuestApproval ? "m-auto py-2.5" : "py-10"}`}
      >
        {requireGuestApproval ? (
          <Button
            className="h-16 px-6 py-2 text-center bg-[#aeaaaa]/30 backdrop-blur-2xl text-white text-base font-bold leading-normal rounded-none"
            onClick={onRequestToJoin}
          >
            Request to Join
          </Button>
        ) : (
          <>
            {rsvpMoods.map((mood) => (
              <div
                key={mood.value}
                className="flex flex-col items-center"
                onClick={(e) => onRVSP?.(e, mood)}
                onKeyDown={(e) => onRVSP?.(e, mood)}
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

      {/* RIGHT Column: Event details */}
      <div className="w-full row-start-2 lg:row-start-1 lg:col-start-2">
        <h1 className="text-white text-8xl font-semibold font-['Mona Sans']">
          {title || "Untitled Event"}
        </h1>
        <p className="text-white text-4xl font-medium font-['Mona Sans'] leading-[50px]">
          {startDateTime
            ? formatDate(startDateTime, "iiii, MMM dd, hh:mm a")
            : "No Start Date"}
        </p>
        <p className="text-white text-4xl font-medium font-['Mona Sans'] leading-[50px] ">
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
              case "Guest of Honor":
                displayText = item.value
                  ? `Honour of Guest (${item.value})`
                  : "N/A";
                break;
              case "Host":
                displayText = item.value ? `Hosted by (${item.value})` : "N/A";
                break;
              case "Max Guests":
                displayText = item.value ? `${item.value} Attendance` : "N/A";
                break;
              case "User Guest Limit":
                displayText = item.value
                  ? `Bring Guest (${item.value})`
                  : "N/A";
                break;
              case "Address":
                displayText = item.value ? String(item.value) : "N/A";
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
          {chips.map((item: ChipInfo) => (
            <div
              key={item.id}
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
  );
};

export default EventDetail;
