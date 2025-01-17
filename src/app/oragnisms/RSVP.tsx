import type React from "react";
import RSVPMoodEmojiPicker from "../molecules/RSVPMoodEmojiPicker";

import { useCreateEventTheme } from "../create/provider";
import type { RSVPMood } from "../templates/EventForm";
interface RSVPProps {
  rvspMoods: RSVPMood[];
  onChange: (name: string, emoji: string | null) => void;
}
export const RSVP: React.FC<RSVPProps> = ({ rvspMoods, onChange }) => {
  const { theme } = useCreateEventTheme();
  return (
    <div className={`flex flex-col gap-2 rounded p-4 ${theme.inputBgColor}`}>
      <p className={`${theme.textColor} text-2xl font-medium`}>RVSP</p>
      <div className="flex gap-2">
        {rvspMoods.map((mood) => (
          <RSVPMoodEmojiPicker
            key={mood.name}
            mood={mood}
            theme={theme}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};
