"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useCreateEventTheme } from "@/providers/themeProvider";
import { Inter } from "next/font/google";
import React, { type FC, useState, useEffect, useRef, memo } from "react";
import TimePicker from "../molecules/TimePicker";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });
export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate: (range: DateRange) => void;
  /** Initial value for start date */
  initialDateFrom?: Date | string;
  /** Initial value for end date */
  initialDateTo?: Date | string;
  /** Initial value for start date for compare */
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

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> = memo(
  ({
    initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
    initialDateTo = new Date(new Date().setHours(0, 0, 0, 0)),
    onUpdate,
    align = "end",
    locale = "en-US",
  }) => {
    const { theme } = useCreateEventTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);

    const [range, setRange] = useState<DateRange>({
      from: getDateAdjustedForTimezone(initialDateFrom),
      to: initialDateTo
        ? getDateAdjustedForTimezone(initialDateTo)
        : getDateAdjustedForTimezone(initialDateFrom),
    });

    // Refs to store the values of range and rangeCompare when the date picker is opened
    const openedRangeRef = useRef<DateRange | undefined>(undefined);

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
    };

    useEffect(() => {
      if (isOpen) {
        openedRangeRef.current = range;
      }
    }, [isOpen, range]);

    useEffect(() => {
      onUpdate(range);
    }, [range, onUpdate]);

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
                <div>
                  {range.to != null ? formatDate(range.to, locale) : ""}
                </div>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className="w-auto p-0 rounded-none border-0"
        >
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between align-center gap-2 border-b border-[#d1d1d1]">
                <div className="flex flex-row">
                  <Button
                    className={`${
                      isSelectingStartDate ? "bg-[#084be7]" : "bg-[#d1d1d1]"
                    } rounded-none h-16 px-6 py-2`}
                    onClick={() => setIsSelectingStartDate(true)}
                  >
                    Start
                  </Button>
                  <Button
                    className={`${
                      !isSelectingStartDate ? "bg-[#084be7]" : "bg-[#d1d1d1]"
                    } rounded-none h-16 px-6 py-2`}
                    disabled={range.from === null}
                    onClick={() => setIsSelectingStartDate(false)}
                  >
                    End
                    {range.from === null ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="Add"
                      >
                        <title>Add</title>
                        <path
                          d="M6.40038 18.308L5.69238 17.6L11.2924 12L5.69238 6.4L6.40038 5.692L12.0004 11.292L17.6004 5.692L18.3084 6.4L12.7084 12L18.3084 17.6L17.6004 18.308L12.0004 12.708L6.40038 18.308Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="Close"
                      >
                        <title>Close</title>
                        <path
                          d="M11.5 12.5H6V11.5H11.5V6H12.5V11.5H18V12.5H12.5V18H11.5V12.5Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
                <div className="w-40 h-16 px-6 py-2 inline-flex items-center justify-center text-[#7a7878] text-base font-bold font-['Mona Sans'] leading-normal border-l border-[#d1d1d1]">
                  {isSelectingStartDate ? "Start Time" : "End Time"}
                </div>
              </div>

              <div className="flex flex-row">
                <Calendar
                  mode="range"
                  onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                    if (value?.from != null) {
                      setRange({ from: value.from, to: value?.to });
                    }
                  }}
                  selected={range}
                  numberOfMonths={1}
                  defaultMonth={
                    new Date(
                      new Date().setMonth(
                        new Date().getMonth() - (isSmallScreen ? 0 : 1),
                      ),
                    )
                  }
                  captionLabelClassName="text-sm font-medium"
                  rangeStartClassName="!bg-[#084be7] [&>button]:!bg-[#084be7] [&>button]:rounded-r-none text-white"
                  rangeMiddleClassName="!rounded-none !bg-blue-200 !text-black"
                  rangeEndClassName="!bg-[#084be7] [&>button]:!bg-[#084be7] [&>button]:rounded-l-none text-white"
                  todayClassName="[&>button]:bg-red-500 text-white"
                  monthCaptionClassName={`text-center text-black text-base font-normal leading-normal font-normal ${inter.className}`}
                  weekdayClassName={`w-12 h-4 text-center text-[#7a7878] text-xs font-medium ${inter.className}`}
                  dayClassName={`w-12 h-12 text-center text-[#d1d1d1] text-base font-medium ${inter.className} leading-normal`}
                  className="!w-max"
                />
                <TimePicker
                  initialHour={range.from.getHours()}
                  initialMinute={range.from.getMinutes()}
                  onChange={(time) => {
                    if (isSelectingStartDate) {
                      setRange((prevRange) => ({
                        ...prevRange,
                        from: new Date(
                          prevRange.from.getFullYear(),
                          prevRange.from.getMonth(),
                          prevRange.from.getDate(),
                          time.hours,
                          time.minutes,
                        ),
                      }));
                    } else {
                      setRange((prevRange) => {
                        // Check if `to` is undefined
                        const toDate = prevRange.to
                          ? new Date(
                              prevRange.to.getFullYear(),
                              prevRange.to.getMonth(),
                              prevRange.to.getDate(),
                              time.hours,
                              time.minutes,
                            )
                          : new Date(prevRange.from); // If `to` is undefined, use `from` date and add +1 day

                        // If `to` is undefined, set it to one day after `from`
                        if (!prevRange.to) {
                          toDate.setDate(toDate.getDate() + 1); // Add one day
                        }

                        // Return updated range
                        return {
                          ...prevRange,
                          to: toDate,
                        };
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";

export default DateRangePicker;
