import type React from "react";
import { useEffect, useState } from "react";
import { type ChipModel, chips } from "../create/chipConfig";
import { useCreateEventTheme } from "../create/provider";
import Chip from "../molecules/Chip";

interface ChipsListProps {
  selectedChips: string[];
  onChange: (value: string) => void;
}
const ChipsList: React.FC<ChipsListProps> = ({ selectedChips, onChange }) => {
  const [displayedChips, setDisplayedChips] = useState(chips);
  const [showLess, setShowLess] = useState(false);
  const { theme } = useCreateEventTheme();

  const isSelected = (chip: ChipModel) => selectedChips.includes(chip.value);
  useEffect(() => {
    setDisplayedChips(chips.slice(0, showLess ? 3 : chips.length));
  }, [showLess]);

  return (
    <div className="flex flex-wrap gap-2">
      {displayedChips.map((chip) => (
        <Chip
          key={chip.value}
          chip={chip}
          theme={theme}
          isSelected={isSelected(chip)}
          onChange={onChange}
        />
      ))}
      <button
        className="bg-none text-base font-medium text-white"
        type="button"
        onClick={() => setShowLess(!showLess)}
      >
        {showLess ? "Show more" : "Show less"}
      </button>
    </div>
  );
};

export default ChipsList;
