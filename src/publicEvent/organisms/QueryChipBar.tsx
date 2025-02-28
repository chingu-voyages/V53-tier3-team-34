"use client";

import { queryChips } from "@/app/(pages)/events/public/queryChipList";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useDebounce } from "use-debounce";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

interface FilterState {
  chipText: string;
  price: number[];
  date: DateRange;
}
export default function QueryChipBar() {
  // States
  const router = useRouter();
  const queryParams = useSearchParams();
  const [filterState, setFilterState] = useState<FilterState>({
    chipText: "",
    price: [0, 1000],
    date: {
      from: new Date(),
      to: undefined,
    },
  });

  const [priceClicked, setPriceClicked] = useState(false);

  const location = queryParams.get("location") || "";
  const title = queryParams.get("title") || "";

  // Memoized Handlers
  const handleClick = useCallback((text: string) => {
    setFilterState((prevState) => ({ ...prevState, chipText: text }));
  }, []);

  const handlePriceClick = useCallback(() => {
    setPriceClicked(!priceClicked);
  }, [priceClicked]);

  const handlePriceChange = useCallback((newValue: number[]) => {
    if (newValue[0] < newValue[1]) {
      setFilterState((prevState) => ({ ...prevState, price: newValue }));
    }
  }, []);

  const handleDateChange = useCallback((range: DateRange) => {
    setFilterState((prevState) => ({
      ...prevState,
      date: range,
    }));
  }, []);

  const memoizedState = useMemo(
    () => ({
      title,
      location,
      filterState,
    }),
    [title, location, filterState],
  );

  const [debouncedState] = useDebounce(memoizedState, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    const { title, location, filterState } = debouncedState;
    if (title) params.set("title", title);
    if (location) params.set("location", location);

    if (filterState.date?.from) {
      params.set("from", format(filterState.date.from, "yyyy-MM-dd"));
      params.set(
        "to",
        filterState.date.to
          ? format(filterState.date.to, "yyyy-MM-dd")
          : format(filterState.date.from, "yyyy-MM-dd"),
      );
    }
    if (filterState.price[0] !== 0 || filterState.price[1] !== 1000) {
      params.set("minPrice", filterState.price[0].toString());
      params.set("maxPrice", filterState.price[1].toString());
    }
    if (filterState.chipText) params.set("chipText", filterState.chipText);

    // Update URL when debounced parameters change
    router.push(`/events/public?${params.toString()}`);
  }, [debouncedState, router]);

  const { price, date } = filterState;
  return (
    <div>
      <div className="flex gap-5 mb-5">
        <button
          type="button"
          className="h-[72px] p-3 min-w-20 bg-dimGray bg-opacity-30 flex items-center gap-2"
        >
          <Image
            src="/assets/chipIcons/location.svg"
            alt="Location Icon"
            width={24}
            height={24}
          />
          {location !== "" ? location : "Location"}
        </button>
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  " justify-center rounded-none bg-dimGray bg-opacity-30 h-[72px] border-none",
                  !date && "text-muted-foreground",
                )}
              >
                <Image
                  src="/assets/chipIcons/dateIcon.svg"
                  alt="Date Icon"
                  width={24}
                  height={24}
                />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span className="text-white">Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto border-none p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={1}
                captionLabelClassName="text-sm font-medium"
                rangeStartClassName="!bg-[#084be7] [&>button]:!bg-[#084be7] [&>button]:rounded-r-none text-white"
                rangeMiddleClassName="!rounded-none !bg-blue-200 !text-black"
                rangeEndClassName="!bg-[#084be7] [&>button]:!bg-[#084be7] [&>button]:rounded-l-none text-white"
                todayClassName="[&>button]:bg-red-500 text-white"
                monthCaptionClassName={`text-center text-black text-base font-normal leading-normal font-normal ${inter.className}`}
                weekdayClassName={`w-12 h-4 text-center text-[#7a7878] text-xs font-medium ${inter.className}`}
                dayClassName={`w-12 h-12 text-center text-[#d1d1d1] text-base font-medium ${inter.className} leading-normal`}
                className="!w-max"
                required
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative">
          <button
            onClick={handlePriceClick}
            type="button"
            className="h-[72px] p-3 min-w-20 mb-2 bg-dimGray bg-opacity-30 flex items-center gap-2"
          >
            <Image
              src="/assets/chipIcons/priceIcon.svg"
              alt="Date Icon"
              width={24}
              height={24}
            />
            Price
          </button>

          {priceClicked && (
            <div className="absolute min-w-60 flex items-center gap-2">
              <span>${price[0]}</span>
              <Slider
                value={price}
                onValueChange={handlePriceChange}
                min={0}
                max={1000}
                step={1}
              />
              <span>${price[1] !== 1000 ? price[1] : "Any"}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between w-full relative overflow-hidden mask">
        {/* Toggle left button */}
        <button type="button" className="absolute top-1/2 -translate-y-1/2">
          <Image
            src="/assets/chipIcons/left.svg"
            alt="Left icon"
            width={29}
            height={29}
          />
        </button>

        {queryChips.map((chip) => (
          <button
            type="button"
            key={chip.text}
            onClick={() => handleClick(chip.text)}
            className="bg-dimGray p-3 min-w-20 flex flex-col items-start bg-opacity-30"
          >
            <Image
              src={chip.chipIconUrl}
              alt={`${chip.text} logo`}
              width={24}
              height={24}
            />
            <p>{chip.text}</p>
          </button>
        ))}

        {/* Toggle right button */}
        <button
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <Image
            src="/assets/chipIcons/right.svg"
            alt="Right icon"
            width={29}
            height={29}
          />
        </button>
      </div>
    </div>
  );
}
