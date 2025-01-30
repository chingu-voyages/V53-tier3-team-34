import { ScrollArea } from "@/components/ui/scroll-area";
import { Inter } from "next/font/google";
import type React from "react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

interface TimePickerProps {
  initialHour?: number;
  initialMinute?: number;
  initialPeriod?: "AM" | "PM";
  onChange?: (time: TimeObject) => void;
}

interface TimeObject {
  hours: number;
  minutes: number;
  period: "AM" | "PM";
}

const TimePicker: React.FC<TimePickerProps> = ({
  initialHour = 9,
  initialMinute = 0,
  initialPeriod = "AM",
  onChange,
}) => {
  // Format initial time to match our time slot format
  const formatInitialTime = (): string => {
    return `${initialHour}:${initialMinute
      .toString()
      .padStart(2, "0")} ${initialPeriod}`;
  };

  const [selectedTime, setSelectedTime] = useState<string>(formatInitialTime());

  // Parse time string to TimeObject
  const parseTimeString = (timeString: string): TimeObject => {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    return {
      hours: hours === 12 ? 12 : hours,
      minutes,
      period: period as "AM" | "PM",
    };
  };

  // Generate time slots from 12 AM to 11:55 PM in 15-minute intervals
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const period = hour < 12 ? "AM" : "PM";
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const timeString = `${displayHour}:${minute
          .toString()
          .padStart(2, "0")} ${period}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: string): void => {
    setSelectedTime(time);
    const timeObject = parseTimeString(time);
    onChange?.(timeObject);
  };

  return (
    <div className="w-40 rounded-none border-l text-center">
      <ScrollArea className="h-96 rounded-md">
        <div className="p-2">
          {timeSlots.map((time, index) => (
            <button
              key={time}
              type="button"
              className={`h-10 cursor-pointer rounded-none px-4 py-2 text-center text-[#7a7878] text-sm font-medium ${inter.className} ${
                selectedTime === time
                  ? "bg-[#084be7] text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleTimeSelect(time)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTimeSelect(time);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  // Get the next or previous button
                  const nextIndex =
                    e.key === "ArrowDown" ? index + 1 : index - 1;

                  // Ensure that the next/previous index is within bounds
                  if (nextIndex >= 0 && nextIndex < timeSlots.length) {
                    const nextButton =
                      document.querySelectorAll("button")[nextIndex];
                    nextButton?.focus(); // Shift focus to the next or previous button
                  }
                }
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TimePicker;
