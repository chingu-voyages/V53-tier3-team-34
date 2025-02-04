
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, {
  Emoji,
  EmojiStyle,
  type EmojiClickData,
} from "emoji-picker-react";
import type React from "react";
import type { Theme } from "../../providers/themeConfig";
import type { MoodType, RSVPMood } from "../config/rvspMood";

interface RVSPEmojiPickerProps {
  mood: RSVPMood;
  theme: Theme;
  onChange?: (value: MoodType, emoji: string) => void; // onChange is optional now
  selectedRSVPEmoji?: string | null;
  disablePicker?: boolean; // New prop to disable emoji picker
}

const RVSPEmojiPicker: React.FC<RVSPEmojiPickerProps> = ({
  mood,
  theme,
  onChange,
  selectedRSVPEmoji,
  disablePicker = false, // Default is false, picker enabled
}) => {
  const onEmojiClick = (emojiData: EmojiClickData) => {
    if (onChange) {
      onChange(mood.value, emojiData.unified);
    }
  };

  return (
    <div>
      {!disablePicker ? (
        <Popover>
          <PopoverTrigger>
            <div
              className={`flex items-center justify-center w-28 h-28 rounded-full border-none cursor-pointer border backdrop-blur-2xl ${theme.focusInputBorderColor}`}
            >
              {!selectedRSVPEmoji && !mood.emoji ? (
                <svg
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Add Emoji</title>
                  <path
                    d="M23.5 25.9048H12.5V23.9048H23.5V12.9048H25.5V23.9048H36.5V25.9048H25.5V36.9048H23.5V25.9048Z"
                    fill="white"
                  />
                </svg>
              ) : selectedRSVPEmoji ? (
                <Emoji unified={selectedRSVPEmoji} size={50} />
              ) : (
                mood.emoji && <Emoji unified={mood.emoji} size={50} />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="h-[450px] w-[350px] p-0 bg-none border-0">
            <EmojiPicker
              emojiStyle={EmojiStyle.APPLE}
              previewConfig={{
                defaultEmoji: mood.emoji || undefined,
                showPreview: false,
              }}
              onEmojiClick={onEmojiClick}
            />
          </PopoverContent>
        </Popover>
      ) : (
        // Show emoji but disable interaction when in preview mode
        <div
          className={`flex items-center justify-center w-28 h-28 rounded-full border-none border backdrop-blur-2xl ${theme.focusInputBorderColor}`}
        >
          {selectedRSVPEmoji ? (
            <Emoji unified={selectedRSVPEmoji} size={50} />
          ) : (
            mood.emoji && <Emoji unified={mood.emoji} size={50} />
          )}
        </div>
      )}
      <p className={`${theme.textColor} text-xl font-medium text-center p-2`}>
        {mood.name}
      </p>
    </div>
  );
};

export default RVSPEmojiPicker;
