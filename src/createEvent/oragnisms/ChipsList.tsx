import type React from "react";
import { type ChangeEvent, useEffect, useState } from "react";
import { useCreateEventTheme } from "../../app/create/provider";
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
const ChipsList: React.FC<ChipsListProps> = ({ selectedChips, onChange }) => {
  const [displayedChips, setDisplayedChips] = useState(chips);
  const [showLess, setShowLess] = useState(false);
  const { theme } = useCreateEventTheme();

  const isSelected = (selectedChip: ChipModel) =>
    selectedChips.findIndex((chip) => chip.chipValue === selectedChip.value) !==
    -1;

  useEffect(() => {
    setDisplayedChips(chips.slice(0, showLess ? 3 : chips.length));
  }, [showLess]);

  const onClose = (chip: ChipModel) => {
    onChange(chip.value, "", false);
  };

  const onInputChange = (chip: ChipModel, e: ChangeEvent<HTMLInputElement>) => {
    onChange(chip.value, e.target.value, true);
  };

  const onSelected = (chip: ChipModel) => {
    onChange(chip.value, "", true);
  };

  return (
    <>
      {displayedChips.map(
        (chip) =>
          isSelected(chip) && (
            <Input
              icon={chip.icon}
              key={`input${chip.value}`}
              name={chip.text}
              value={""}
              onChange={(e) => onInputChange(chip, e)}
              placeholder={chip.placeholderText}
              preText={chip.preText}
              maxCount={chip.maxCountCharacters}
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
        <button
          className="bg-none text-base font-medium text-white"
          type="button"
          onClick={() => setShowLess(!showLess)}
        >
          {showLess ? "Show more" : "Show less"}
        </button>
      </div>
    </>
  );
};

export default ChipsList;
