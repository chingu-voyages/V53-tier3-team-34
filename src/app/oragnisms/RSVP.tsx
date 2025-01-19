import type React from "react";
import RSVPEmojiPicker from "../molecules/RSVPEmojiPicker";

import { useCreateEventTheme } from "../create/provider";
import type { RSVPMood } from "../templates/EventForm";
interface RSVPProps {
  rvspMoods: RSVPMood[];
  onChange: (name: string, emoji: string | null) => void;
}
export const RSVP: React.FC<RSVPProps> = ({ rvspMoods, onChange }) => {
  const { theme } = useCreateEventTheme();
  return (
    <div className={`flex flex-col gap-2 py-2 ${theme.inputBgColor}`}>
      <p className={`${theme.textColor} text-2xl font-medium`}>RVSP</p>
      <div className="px-10 flex gap-10">
        {rvspMoods.map((mood) => (
          <RSVPEmojiPicker
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
