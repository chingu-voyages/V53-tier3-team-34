import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { Emoji, type EmojiClickData } from "emoji-picker-react";
import type React from "react";
import { GoPlus } from "react-icons/go";
import type { Theme } from "../create/themeConfig";
import type { RSVPMood } from "../templates/EventForm";

interface RSVPMoodEmojiPickerProps {
  mood: RSVPMood;
  theme: Theme;
  onChange: (name: string, emoji: string | null) => void;
}

const RSVPMoodEmojiPicker: React.FC<RSVPMoodEmojiPickerProps> = ({
  mood,
  theme,
  onChange,
}) => {
  const onEmojiClick = (emojiData: EmojiClickData) => {
    onChange(mood.name, emojiData.unified);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div
            className={`flex items-center justify-center w-24 h-24 rounded-full cursor-pointer border ${theme.focusInputBorderColor}`}
          >
            {mood.emoji ? (
              <Emoji unified={mood.emoji} size={50} />
            ) : (
              <GoPlus size={25} className={`${theme.iconColor}`} />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-0 h-0 p-0 bg-none border-0">
          <EmojiPicker
            previewConfig={{ showPreview: false }}
            onEmojiClick={onEmojiClick}
            className={`![--epr-hover-bg-color:${theme.emojiPickerHoverBgColor}] ![--epr-bg-color:${theme.emojiPickerBgColor}] ![--epr-category-label-bg-color:${theme.emojiPickerCategoryLabelBgColor}] ![--epr-text-color:${theme.emojiPickerTextColor}]`}
          />
        </PopoverContent>
      </Popover>
      <p className={`${theme.textColor} text-xl font-medium text-center p-2`}>
        {mood.name}
      </p>
    </div>
  );
};

export default RSVPMoodEmojiPicker;
