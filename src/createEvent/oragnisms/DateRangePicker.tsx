"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DateInput } from "@/createEvent/molecules/DateInput";
import { cn } from "@/lib/utils";
import { useCreateEventTheme } from "@/providers/themeProvider";
import React, {
  type FC,
  useState,
  useEffect,
  useRef,
  type JSX,
  useCallback,
} from "react";
import { RxCheck } from "react-icons/rx";

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange; rangeCompare?: DateRange }) => void;
  /** Initial value for start date */
  initialDateFrom?: Date | string;
  /** Initial value for end date */
  initialDateTo?: Date | string;
  /** Initial value for start date for compare */
  initialCompareFrom?: Date | string;
  /** Initial value for end date for compare */
  initialCompareTo?: Date | string;
  /** Alignment of popover */
  align?: "start" | "center" | "end";
  /** Option for locale */
  locale?: string;
  /** Option for showing compare feature */
  showCompare?: boolean;
}

const formatDate = (date: Date, locale = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit", // Include hour (2-digit format)
    minute: "2-digit", // Include minute (2-digit format)
    hour12: true, // Optional: 12-hour format (you can set to false for 24-hour format)
  });
};

const getDateAdjustedForTimezone = (dateInput: Date | string): Date => {
  if (typeof dateInput === "string") {
    // Split the date string to get year, month, and day parts
    const parts = dateInput.split("-").map((part) => Number.parseInt(part, 10));
    // Create a new Date object using the local timezone
    // Note: Month is 0-indexed, so subtract 1 from the month part
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date;
  }
  // If dateInput is already a Date object, return it directly
  return dateInput;
};

interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface Preset {
  name: string;
  label: string;
}

// Define presets
const PRESETS: Preset[] = [
  { name: "today", label: "Today" },
  { name: "tomorrow", label: "Tomorrow" },
  { name: "next7", label: "Next 7 days" },
  { name: "next14", label: "Next 14 days" },
  { name: "next30", label: "Next 30 days" },
  { name: "thisWeek", label: "This Week" },
  { name: "nextWeek", label: "Next Week" },
  { name: "thisMonth", label: "This Month" },
  { name: "nextMonth", label: "Next Month" },
];

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string;
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = "end",
  locale = "en-US",
  showCompare = true,
}): JSX.Element => {
  const { theme } = useCreateEventTheme();
  const [isOpen, setIsOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: getDateAdjustedForTimezone(initialDateFrom),
    to: initialDateTo
      ? getDateAdjustedForTimezone(initialDateTo)
      : getDateAdjustedForTimezone(initialDateFrom),
  });
  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom
      ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
        }
      : undefined,
  );

  // Refs to store the values of range and rangeCompare when the date picker is opened
  const openedRangeRef = useRef<DateRange | undefined>(undefined);
  const openedRangeCompareRef = useRef<DateRange | undefined>(undefined);

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined,
  );

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false,
  );

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPresetRange = useCallback((presetName: string): DateRange => {
    const preset = PRESETS.find(({ name }) => name === presetName);
    if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
    const from = new Date();
    const to = new Date();
    // const first = from.getDate() - from.getDay();

    switch (preset.name) {
      case "today": {
        from.setHours(0, 0, 0, 0); // Start of today
        to.setHours(23, 59, 59, 999); // End of today
        break;
      }
      case "tomorrow": {
        from.setDate(from.getDate() + 1); // Move to tomorrow
        from.setHours(0, 0, 0, 0); // Start of tomorrow
        to.setDate(to.getDate() + 1); // Move to tomorrow
        to.setHours(23, 59, 59, 999); // End of tomorrow
        break;
      }
      case "next7": {
        from.setDate(from.getDate() + 1); // Start from tomorrow
        from.setHours(0, 0, 0, 0);
        to.setDate(to.getDate() + 7); // End in 7 days from now
        to.setHours(23, 59, 59, 999);
        break;
      }
      case "next14": {
        from.setDate(from.getDate() + 1); // Start from tomorrow
        from.setHours(0, 0, 0, 0);
        to.setDate(to.getDate() + 14); // End in 14 days
        to.setHours(23, 59, 59, 999);
        break;
      }
      case "next30": {
        from.setDate(from.getDate() + 1); // Start from tomorrow
        from.setHours(0, 0, 0, 0);
        to.setDate(to.getDate() + 30); // End in 30 days
        to.setHours(23, 59, 59, 999);
        break;
      }
      case "thisWeek": {
        const today = new Date();
        const tomorrowForWeek = new Date(today); // Set the date for tomorrow
        tomorrowForWeek.setDate(today.getDate() + 1); // Move to tomorrow
        from.setTime(tomorrowForWeek.setHours(0, 0, 0, 0)); // Set the date for tomorrow
        const endOfWeek = new Date(tomorrowForWeek); // Set 'to' to the end of the week (Sunday at 11:{59 PM)
        endOfWeek.setDate(tomorrowForWeek.getDate() + (7 - endOfWeek.getDay())); // Next Sunday
        endOfWeek.setHours(23, 59, 59, 999); // End of Sunday
        to.setTime(endOfWeek.getTime());
        break;
      }
      case "nextWeek": {
        const nextWeekStart = new Date();
        nextWeekStart.setDate(
          nextWeekStart.getDate() + (7 - nextWeekStart.getDay()),
        ); // Next week's start
        nextWeekStart.setHours(0, 0, 0, 0);
        from.setTime(nextWeekStart.getTime());
        to.setDate(nextWeekStart.getDate() + 6); // End of next week
        to.setHours(23, 59, 59, 999);
        break;
      }
      case "thisMonth": {
        const tomorrowForMonth = new Date();
        tomorrowForMonth.setDate(tomorrowForMonth.getDate() + 1); // Start from tomorrow
        from.setTime(tomorrowForMonth.getTime()); // Set 'from' to tomorrow
        to.setMonth(from.getMonth() + 1); // End at the end of the next month
        to.setDate(0); // Last day of this month
        to.setHours(23, 59, 59, 999);
        break;
      }
      case "nextMonth": {
        from.setMonth(from.getMonth() + 1); // Move to the next month
        from.setDate(1); // Start of next month
        from.setHours(0, 0, 0, 0);
        to.setMonth(from.getMonth() + 1); // Next month's end
        to.setDate(0); // Last day of next month
        to.setHours(23, 59, 59, 999);
        break;
      }
    }

    return { from, to };
  }, []);

  const setPreset = (preset: string): void => {
    const range = getPresetRange(preset);
    setRange(range);
    if (rangeCompare) {
      const rangeCompare = {
        from: new Date(
          range.from.getFullYear() - 1,
          range.from.getMonth(),
          range.from.getDate(),
        ),
        to: range.to
          ? new Date(
              range.to.getFullYear() - 1,
              range.to.getMonth(),
              range.to.getDate(),
            )
          : undefined,
      };
      setRangeCompare(rangeCompare);
    }
  };

  const checkPreset = useCallback((): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name);

      const normalizedRangeFrom = new Date(range.from);
      normalizedRangeFrom.setHours(0, 0, 0, 0);
      const normalizedPresetFrom = new Date(
        presetRange.from.setHours(0, 0, 0, 0),
      );

      const normalizedRangeTo = new Date(range.to ?? 0);
      normalizedRangeTo.setHours(0, 0, 0, 0);
      const normalizedPresetTo = new Date(
        presetRange.to?.setHours(0, 0, 0, 0) ?? 0,
      );

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPreset(preset.name);
        return;
      }
    }

    setSelectedPreset(undefined);
  }, [range, getPresetRange]);

  const resetValues = (): void => {
    setRange({
      from:
        typeof initialDateFrom === "string"
          ? getDateAdjustedForTimezone(initialDateFrom)
          : initialDateFrom,
      to: initialDateTo
        ? typeof initialDateTo === "string"
          ? getDateAdjustedForTimezone(initialDateTo)
          : initialDateTo
        : typeof initialDateFrom === "string"
          ? getDateAdjustedForTimezone(initialDateFrom)
          : initialDateFrom,
    });
    setRangeCompare(
      initialCompareFrom
        ? {
            from:
              typeof initialCompareFrom === "string"
                ? getDateAdjustedForTimezone(initialCompareFrom)
                : initialCompareFrom,
            to: initialCompareTo
              ? typeof initialCompareTo === "string"
                ? getDateAdjustedForTimezone(initialCompareTo)
                : initialCompareTo
              : typeof initialCompareFrom === "string"
                ? getDateAdjustedForTimezone(initialCompareFrom)
                : initialCompareFrom,
          }
        : undefined,
    );
  };

  useEffect(() => {
    checkPreset();
  }, [range, checkPreset]);

  const PresetButton = ({
    preset,
    label,
    isSelected,
  }: {
    preset: string;
    label: string;
    isSelected: boolean;
  }): JSX.Element => (
    <Button
      className={cn(isSelected && "pointer-events-none")}
      variant="ghost"
      onClick={() => {
        setPreset(preset);
      }}
    >
      <>
        <span className={cn("pr-2 opacity-0", isSelected && "opacity-70")}>
          <RxCheck width={18} height={18} />
        </span>
        {label}
      </>
    </Button>
  );

  // Helper function to check if two date ranges are equal
  const areRangesEqual = (a?: DateRange, b?: DateRange): boolean => {
    if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
      openedRangeCompareRef.current = rangeCompare;
    }
  }, [isOpen, range, rangeCompare]);

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          resetValues();
        }
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${theme.inputBgColor} hover:${theme.inputBgColor} rounded-none border-none justify-start backdrop-blur-2xl ${theme.focusInputBorderColor} h-28 px-2`}
        >
          <div className="text-left p-0 mt-0">
            <div className="text-white text-4xl font-medium font-['Mona Sans'] leading-10 align-left">
              <div>
                {formatDate(range.from, locale)}
                {" - "}
              </div>
              <div>{range.to != null ? formatDate(range.to, locale) : ""}</div>
            </div>
            {rangeCompare != null && (
              <div className="opacity-60 text-xs -mt-1">
                <>
                  vs. {formatDate(rangeCompare.from, locale)}
                  {rangeCompare.to != null
                    ? ` - ${formatDate(rangeCompare.to, locale)}`
                    : ""}
                </>
              </div>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto">
        <div className="flex py-2">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex flex-col justify-center lg:flex-row gap-2 px-3 justify-end items-center lg:items-start pb-4 lg:pb-0">
                {showCompare && (
                  <div className="flex items-center space-x-2 pr-4 py-1">
                    <Switch
                      defaultChecked={Boolean(rangeCompare)}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          if (!range.to) {
                            setRange({
                              from: range.from,
                              to: range.from,
                            });
                          }
                          setRangeCompare({
                            from: new Date(
                              range.from.getFullYear(),
                              range.from.getMonth(),
                              range.from.getDate() - 365,
                            ),
                            to: range.to
                              ? new Date(
                                  range.to.getFullYear() - 1,
                                  range.to.getMonth(),
                                  range.to.getDate(),
                                )
                              : new Date(
                                  range.from.getFullYear() - 1,
                                  range.from.getMonth(),
                                  range.from.getDate(),
                                ),
                          });
                        } else {
                          setRangeCompare(undefined);
                        }
                      }}
                      id="compare-mode"
                    />
                    <Label htmlFor="compare-mode">Compare</Label>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col align-center gap-1 lg:flex-row lg:gap-2">
                    <DateInput
                      value={range.from}
                      onChange={(date) => {
                        const toDate =
                          range.to == null || date > range.to ? date : range.to;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: date,
                          to: toDate,
                        }));
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={range.to}
                      onChange={(date) => {
                        const fromDate = date < range.from ? date : range.from;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: fromDate,
                          to: date,
                        }));
                      }}
                    />
                  </div>
                  {rangeCompare != null && (
                    <div className="flex gap-2">
                      <DateInput
                        value={rangeCompare?.from}
                        onChange={(date) => {
                          if (rangeCompare) {
                            const compareToDate =
                              rangeCompare.to == null || date > rangeCompare.to
                                ? date
                                : rangeCompare.to;
                            setRangeCompare((prevRangeCompare) => ({
                              ...prevRangeCompare,
                              from: date,
                              to: compareToDate,
                            }));
                          } else {
                            setRangeCompare({
                              from: date,
                              to: new Date(),
                            });
                          }
                        }}
                      />
                      <div className="py-1">-</div>
                      <DateInput
                        value={rangeCompare?.to}
                        onChange={(date) => {
                          if (rangeCompare && rangeCompare.from) {
                            const compareFromDate =
                              date < rangeCompare.from
                                ? date
                                : rangeCompare.from;
                            setRangeCompare({
                              ...rangeCompare,
                              from: compareFromDate,
                              to: date,
                            });
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {isSmallScreen && (
                <Select
                  defaultValue={selectedPreset}
                  onValueChange={(value) => {
                    setPreset(value);
                  }}
                >
                  <SelectTrigger className="w-[180px] mx-auto mb-2">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map((preset) => (
                      <SelectItem key={preset.name} value={preset.name}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div>
                <Calendar
                  mode="range"
                  onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                    if (value?.from != null) {
                      setRange({ from: value.from, to: value?.to });
                    }
                  }}
                  selected={range}
                  numberOfMonths={isSmallScreen ? 1 : 2}
                  defaultMonth={
                    new Date(
                      new Date().setMonth(
                        new Date().getMonth() - (isSmallScreen ? 0 : 1),
                      ),
                    )
                  }
                  classNames={{
                    caption_label: "text-sm font-medium",
                    day_range_start: "!bg-[#084be7] rounded-r-none text-white",
                    day_range_middle: "rounded-none bg-blue-200 !text-black",
                    day_range_end: "!bg-[#084be7] rounded-l-none text-white",
                  }}
                />
              </div>
            </div>
          </div>
          {!isSmallScreen && (
            <div className="flex flex-col items-end gap-1 pr-2 pl-6 pb-6">
              <div className="flex w-full flex-col items-end gap-1 px-2 pb-6">
                {PRESETS.map((preset) => (
                  <PresetButton
                    key={preset.name}
                    preset={preset.name}
                    label={preset.label}
                    isSelected={selectedPreset === preset.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              setIsOpen(false);
              resetValues();
            }}
            variant="ghost"
            className="px-6 py-2 bg-[#d1d1d1] h-16 font-bold leading-normal text-white rounded-none"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              if (
                !areRangesEqual(range, openedRangeRef.current) ||
                !areRangesEqual(rangeCompare, openedRangeCompareRef.current)
              ) {
                onUpdate?.({ range, rangeCompare });
              }
            }}
            className="px-6 py-2 bg-[#084be7] h-16 font-bold leading-normal text-white rounded-none"
          >
            Update
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

DateRangePicker.displayName = "DateRangePicker";
DateRangePicker.filePath =
  "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx";
