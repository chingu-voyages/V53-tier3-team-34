import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { Emoji, type EmojiClickData } from "emoji-picker-react";
import type React from "react";
import type { Theme } from "../../providers/themeConfig";
import type { MoodType, RSVPMood } from "../config/rvspMood";

interface RVSPEmojiPickerProps {
  mood: RSVPMood;
  theme: Theme;
  onChange: (value: MoodType, emoji: string) => void;
  selectedRSVPEmoji?: string;
}

const RVSPEmojiPicker: React.FC<RVSPEmojiPickerProps> = ({
  mood,
  theme,
  onChange,
  selectedRSVPEmoji,
}) => {
  const onEmojiClick = (emojiData: EmojiClickData) => {
    onChange(mood.value, emojiData.unified);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div
            className={`flex items-center justify-center w-28 h-28 rounded-full border-none cursor-pointer border backdrop-blur-2xl ${theme.focusInputBorderColor}`}
          >
            <Emoji
              unified={selectedRSVPEmoji ? selectedRSVPEmoji : mood.emoji}
              size={50}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-0 h-0 p-0 bg-none border-0">
          <EmojiPicker
            previewConfig={{ defaultEmoji: mood.emoji, showPreview: false }}
            onEmojiClick={onEmojiClick}
            className={`${theme.emojiPickerTextColor} ${theme.emojiPickerBgColor} ${theme.emojiPickerHoverBgColor} ${theme.emojiPickerCategoryLabelBgColor}`}
          />
        </PopoverContent>
      </Popover>
      <p className={`${theme.textColor} text-xl font-medium text-center p-2`}>
        {mood.name}
      </p>
    </div>
  );
};

export default RVSPEmojiPicker;
