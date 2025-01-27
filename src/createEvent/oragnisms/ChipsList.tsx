import { Button } from "@/components/ui/button";
import { useCreateEventTheme } from "@/providers/themeProvider";
import { Inter } from "next/font/google";
import type React from "react";
import { type ChangeEvent, useEffect, useState } from "react";
import { type ChipModel, chips } from "../config/chipConfig";
import Chip from "../molecules/Chip";
import Input from "../molecules/Input";
import type { EventFormData } from "../templates/EventForm";

interface ChipsListProps {
  selectedChips: EventFormData["chips"];
  onChange: (
    chipValue: string,
    inputValue: string,
    isSelected: boolean,
  ) => void;
}

const inter = Inter({ subsets: ["latin"] });

const ChipsList: React.FC<ChipsListProps> = ({ selectedChips, onChange }) => {
  const [displayedChips, setDisplayedChips] = useState(chips);
  const [showLess, setShowLess] = useState(false);
  const { theme } = useCreateEventTheme();

  const selectedChipMap = new Map(
    selectedChips.map((chip) => [chip.value, chip]),
  );

  const isSelected = (chip: ChipModel) => selectedChipMap.has(chip.value);

  const getInputValue = (chip: ChipModel) =>
    selectedChipMap.get(chip.value)?.inputValue || "";

  const onClose = (chip: ChipModel) => {
    onChange(chip.value, "", false);
  };

  const onInputChange = (chip: ChipModel, e: ChangeEvent<HTMLInputElement>) => {
    onChange(chip.value, e.target.value, true);
  };

  const onSelected = (chip: ChipModel) => {
    onChange(chip.value, "", !isSelected(chip));
  };

  useEffect(() => {
    if (selectedChips.length > 3) {
      setShowLess(false);
      setDisplayedChips(chips);
    } else if (showLess) {
      setDisplayedChips(chips.slice(0, 3));
    } else {
      setDisplayedChips(chips);
    }
  }, [showLess, selectedChips]);

  return (
    <>
      {displayedChips.map(
        (chip) =>
          isSelected(chip) && (
            <Input
              icon={chip.icon}
              key={`input${chip.value}`}
              name={chip.text}
              value={getInputValue(chip)}
              onChange={(e) => onInputChange(chip, e)}
              placeholder={chip.placeholderText}
              preText={chip.preText}
              maxCount={chip.maxCountCharacters}
              parentClassName={`h-10 bg-white/40 ${inter.className}`}
              className={`text-xl placeholder:text-xl font-medium font-['Inter'] leading-loose ${
                chip.placeholderClassName || ""
              }`}
              postButton={
                <button type="button" onClick={() => onClose(chip)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <title>Close</title>
                    <path
                      d="M7.75708 16.7428L16.2431 8.25684M16.2431 16.7428L7.75708 8.25684"
                      stroke="#FAF1E5"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              }
            />
          ),
      )}

      <div className="flex flex-wrap gap-2">
        {displayedChips.map((chip) => (
          <Chip
            key={`chip${chip.value}`}
            chip={chip}
            theme={theme}
            isSelected={isSelected(chip)}
            onChange={() => onSelected(chip)}
          />
        ))}
        {selectedChips.length <= 3 && (
          <Button
            className="bg-none text-base font-medium text-white hover:bg-transparent hover:text-white"
            type="button"
            variant="ghost"
            onClick={() => setShowLess(!showLess)}
          >
            {showLess ? "Show more" : "Show less"}
          </Button>
        )}
      </div>
    </>
  );
};

ChipsList.displayName = "ChipsList";

export default ChipsList;
