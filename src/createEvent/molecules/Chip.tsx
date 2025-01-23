import type React from "react";
import type { Theme } from "../../providers/themeConfig";
import type { ChipModel } from "../config/chipConfig";

interface ChipProps {
  chip: ChipModel;
  onChange: (value: string) => void;
  isSelected: boolean;
  theme: Theme;
}

const Chip: React.FC<ChipProps> = ({ chip, isSelected, onChange, theme }) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onChange(chip.value);
    }
  };

  return (
    <div
      className={`h-10 px-3 py-2 rounded-3xl backdrop-blur-[34px] flex items-center gap-1 text-white text-base font-normal ${
        isSelected
          ? `${theme.chipSelectedTextColor} ${theme.chipSelectedBgColor}`
          : `${theme.chipUnselectedTextColor} ${theme.chipUnselectedBgColor}`
      }`}
      onClick={() => onChange(chip.value)}
      onKeyDown={onKeyDown}
    >
      {chip.icon}
      <span>{chip.text}</span>
    </div>
  );
};

export default Chip;
