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
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// Date picker component imports
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { useDebounce } from "use-debounce";

export default function QueryChipBar() {
  const router = useRouter();
  const queryParams = useSearchParams();

  // States
  const [chipText, setChipText] = useState("");
  const [priceClicked, setPriceClicked] = useState(false);
  const [price, setPrice] = useState([0, 1000]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const location = queryParams.get("location") || "";
  const title = queryParams.get("title") || "";
  const [debouncedPrice] = useDebounce(price, 500);

  // Memoized Handlers
  const handleClick = useCallback((text: string) => {
    setChipText(text);
  }, []);

  const handlePriceClick = useCallback(() => {
    setPriceClicked((prev) => !prev);
  }, []);

  const handlePriceChange = useCallback((newValue: number[]) => {
    if (newValue[0] < newValue[1]) setPrice(newValue);
  }, []);

  // Update URL Parameters on State Changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (title) params.set("title", title);
    if (location) params.set("location", location);
    if (date?.from) {
      params.set("from", format(date.from, "yyyy-MM-dd"));
      params.set(
        "to",
        date.to
          ? format(date.to, "yyyy-MM-dd")
          : format(date.from, "yyyy-MM-dd"),
      );
    }
    if (price[0] !== 0 || price[1] !== 1000) {
      params.set("minPrice", price[0].toString());
      params.set("maxPrice", price[1].toString());
    }
    if (chipText) params.set("chipText", chipText);

    router.push(`/events/public?${params.toString()}`);
  }, [title, location, date, price, chipText, router]);

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
                {date?.from ? (
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
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                className="bg-black p-4 text-white w-auto lg:min-w-[350px]"
                classNames={{
                  root: "w-full",
                  months: "w-full flex justify-center",
                  month: "w-full",
                  table: "w-full border-collapse",
                  head_row: "w-full flex justify-between text-gray-400",
                  row: "w-full flex justify-between",
                  day: "w-10 h-8 flex items-center justify-center rounded-md transition-colors duration-300 ease-in-out hover:bg-gray-700",
                  day_selected:
                    "bg-white text-black rounded-md h-8 w-10 p-2 flex items-center justify-center",
                  day_range_start:
                    "bg-white text-black rounded-md h-8 w-10 p-2 flex items-center justify-center",
                  day_range_end:
                    "bg-white text-black rounded-md h-8 w-10 p-2 flex items-center justify-center",
                  day_range_middle:
                    "bg-white bg-opacity-30 text-black rounded-md h-8 w-10 p-2 flex items-center justify-center",
                  caption: "text-white font-semibold w-full text-center",
                  head: "text-gray-400 w-full",
                  nav: "text-white flex justify-between w-full mb-2",
                }}
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
