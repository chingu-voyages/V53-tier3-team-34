import type React from "react";
import RSVPEmojiPicker from "../molecules/RSVPEmojiPicker";

import { useCreateEventTheme } from "@/providers/themeProvider";
import { type MoodType, type RSVPMood, rsvpMoods } from "../config/rvspMood";

interface RSVPProps {
  selectedRVSPMoods: Omit<RSVPMood, "name">[];
  onChange: (value: MoodType, emoji: string) => void;
}
export const RSVP: React.FC<RSVPProps> = ({ selectedRVSPMoods, onChange }) => {
  const { theme } = useCreateEventTheme();
  return (
    <div
      className={`flex flex-col gap-2 p-2 backdrop-blur-2xl ${theme.inputBgColor}`}
    >
      <p className={`${theme.textColor} text-2xl font-medium`}>RVSP</p>
      <div className="px-10 flex gap-10">
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
      </div>
    </div>
  );
};
