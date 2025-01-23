export interface Theme {
  pageBgImage: string;
  iconColor: string;
  inputBgColor: string;
  focusInputBorderColor: string;
  textColor: string;
  dividerColor: string;
  placeholderTextColor: string;
  toggleSwitchColor: string;
  emojiPickerHoverBgColor: string;
  emojiPickerBgColor: string;
  emojiPickerTextColor: string;
  emojiPickerCategoryLabelBgColor: string;
  chipUnselectedBgColor: string;
  chipUnselectedTextColor: string;
  chipSelectedBgColor: string;
  chipSelectedTextColor: string;
}

export type ThemeName = "light" | "dark"; // This defines the available theme names

// Now, we create the themeStyles with correct typing
export const themeStyles: Record<ThemeName, Theme> = {
  light: {
    pageBgImage: `bg-[url('/assets/images/background/light.jpg')]`,
    iconColor: "text-[#dbd8d8]",
    inputBgColor: "bg-white/10",
    focusInputBorderColor: "text-[#dbd8d8]",
    textColor: "text-[#dbd8d8]",
    dividerColor: "divide-[#dbd8d8]",
    placeholderTextColor: "placeholder-[#dbd8d8]",
    toggleSwitchColor: "data-[state=checked]:bg-[#084be7]",
    emojiPickerHoverBgColor: "![--epr-hover-bg-color:gray]",
    emojiPickerBgColor: "![--epr-bg-color:#d6ff04]",
    emojiPickerTextColor: "![--epr-text-color:gray]",
    emojiPickerCategoryLabelBgColor: "![--epr-category-label-bg-color:#d6ff04]",
    chipUnselectedBgColor: "bg-white/10",
    chipUnselectedTextColor: "text-white",
    chipSelectedBgColor: "bg-white/40",
    chipSelectedTextColor: "text-white",
  },
  dark: {
    pageBgImage: `bg-[url('/assets/images/background/dark.jpg')]`,
    iconColor: "text-[#dbd8d8]",
    inputBgColor: "bg-white/10",
    focusInputBorderColor: "text-[#dbd8d8]",
    textColor: "text-[#dbd8d8]",
    dividerColor: "divide-[#dbd8d8]",
    placeholderTextColor: "placeholder-[#dbd8d8]",
    toggleSwitchColor: "data-[state=checked]:bg-[#084be7]",
    emojiPickerHoverBgColor: "![--epr-hover-bg-color:gray]",
    emojiPickerBgColor: "![--epr-bg-color:#d6ff04]",
    emojiPickerTextColor: "![--epr-text-color:gray]",
    emojiPickerCategoryLabelBgColor: "![--epr-category-label-bg-color:#d6ff04]",
    chipUnselectedBgColor: "bg-white/10",
    chipUnselectedTextColor: "text-white",
    chipSelectedBgColor: "bg-white/40",
    chipSelectedTextColor: "text-white",
  },
};
