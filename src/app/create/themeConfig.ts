export interface Theme {
  iconColor: string;
  inputBgColor: string;
  focusInputBorderColor: string;
  textColor: string;
  placeholderTextColor: string;
  toggleSwitchColor: string;
  emojiPickerHoverBgColor: string;
  emojiPickerBgColor: string;
  emojiPickerTextColor: string;
  emojiPickerCategoryLabelBgColor: string;
}

export type ThemeName = "light" | "dark"; // This defines the available theme names

// Now, we create the themeStyles with correct typing
export const themeStyles: Record<ThemeName, Theme> = {
  light: {
    iconColor: "text-gray-600",
    inputBgColor: "bg-white",
    focusInputBorderColor: "border-blue-500",
    textColor: "text-gray-600",
    placeholderTextColor: "text-gray-400",
    toggleSwitchColor: "bg-green-500",
    emojiPickerHoverBgColor: "bg-gray-200",
    emojiPickerBgColor: "bg-white",
    emojiPickerTextColor: "text-gray-600",
    emojiPickerCategoryLabelBgColor: "bg-white",
  },
  dark: {
    iconColor: "text-[#dbd8d8]",
    inputBgColor: "bg-[#d6ff04]/30",
    focusInputBorderColor: "text-[#dbd8d8]",
    textColor: "text-[#dbd8d8]",
    placeholderTextColor: "text-gray-500",
    toggleSwitchColor: "bg-red-500",
    emojiPickerHoverBgColor: "gray",
    emojiPickerBgColor: "#d6ff04",
    emojiPickerTextColor: "gray",
    emojiPickerCategoryLabelBgColor: "gray",
  },
};
