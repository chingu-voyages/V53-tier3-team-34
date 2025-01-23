import type React from "react";
import RSVPEmojiPicker from "../molecules/RSVPEmojiPicker";

import { Button } from "@/components/ui/button";
import { useCreateEventTheme } from "@/providers/themeProvider";
import { type MoodType, type RSVPMood, rsvpMoods } from "../config/rvspMood";

interface RSVPProps {
  requireGuestApproval: boolean;
  selectedRVSPMoods: Omit<RSVPMood, "name">[];
  onChange: (value: MoodType, emoji: string) => void;
}
export const RSVP: React.FC<RSVPProps> = ({
  selectedRVSPMoods,
  requireGuestApproval,
  onChange,
}) => {
  const { theme } = useCreateEventTheme();
  return (
    <div
      className={`flex flex-col gap-2 p-2 backdrop-blur-2xl ${theme.inputBgColor}`}
    >
      <p className={`${theme.textColor} text-2xl font-medium`}>RVSP</p>
      <div
        className={`px-10 flex gap-10 ${requireGuestApproval ? "m-auto py-2.5" : ""}`}
      >
        {requireGuestApproval ? (
          <Button className="h-16 px-6 py-2 text-center bg-[#aeaaaa]/30 text-white text-base font-bold leading-normal rounded-none">
            Request to Join
          </Button>
        ) : (
          <>
            {rsvpMoods.map((mood) => (
              <RSVPEmojiPicker
                key={mood.value}
                mood={mood}
                theme={theme}
                onChange={onChange}
                selectedRSVPEmoji={
                  selectedRVSPMoods.find(
                    (selectedMood) => selectedMood.value === mood.value,
                  )?.emoji
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
