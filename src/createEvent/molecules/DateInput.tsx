import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useRef } from "react";

interface DateInputProps {
  value?: Date;
  onChange: (date: Date) => void;
}

interface DateParts {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  hour12: "AM" | "PM";
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const [date, setDate] = React.useState<DateParts>(() => {
    const d = value ? new Date(value) : new Date();
    return {
      day: d.getDate(),
      month: d.getMonth() + 1, // JavaScript months are 0-indexed
      year: d.getFullYear(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      hour12: d.getHours() >= 12 ? "PM" : "AM",
    };
  });

  const monthRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef<HTMLInputElement | null>(null);
  const yearRef = useRef<HTMLInputElement | null>(null);
  const hourRef = useRef<HTMLInputElement | null>(null);
  const minuteRef = useRef<HTMLInputElement | null>(null);
  const hour12Ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const d = value ? new Date(value) : new Date();
    setDate({
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
      hour: d.getHours() > 12 ? d.getHours() - 12 : d.getHours(),
      minute: d.getMinutes(),
      hour12: d.getHours() >= 12 ? "PM" : "AM",
    });
  }, [value]);

  const validateDate = (field: keyof DateParts, value: number): boolean => {
    if (
      (field === "day" && (value < 1 || value > 31)) ||
      (field === "month" && (value < 1 || value > 12)) ||
      (field === "year" && (value < 1000 || value > 9999)) ||
      (field === "hour" && (value < 0 || value > 12)) ||
      (field === "minute" && (value < 0 || value > 59))
    ) {
      return false;
    }

    // Validate the day of the month
    const newDate = { ...date, [field]: value };
    const d = new Date(
      newDate.year,
      newDate.month - 1,
      newDate.day,
      newDate.hour,
      newDate.minute,
    );
    return (
      d.getFullYear() === newDate.year &&
      d.getMonth() + 1 === newDate.month &&
      d.getDate() === newDate.day &&
      d.getHours() === newDate.hour &&
      d.getMinutes() === newDate.minute
    );
  };

  const handleInputChange =
    (field: keyof DateParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      const newValue = e.target.value ? Number(e.target.value) : "";
      const isValid =
        typeof newValue === "number" && validateDate(field, newValue);
      // If the new value is valid, update the date
      const newDate = { ...date, [field]: newValue };
      setDate(newDate);

      // only call onChange when the entry is valid
      if (isValid) {
        onChange(
          new Date(
            newDate.year,
            newDate.month - 1,
            newDate.day,
            newDate.hour12 === "PM" ? newDate.hour + 12 : newDate.hour,
            newDate.minute,
          ),
        );
      }
    };

  const initialDate = useRef<DateParts>(date);

  const handleBlur =
    (field: keyof DateParts) =>
    (e: React.FocusEvent<HTMLInputElement>): void => {
      if (!e.target.value) {
        setDate(initialDate.current);
        return;
      }

      const newValue = Number(e.target.value);
      const isValid = validateDate(field, newValue);

      if (!isValid) {
        setDate(initialDate.current);
      } else {
        // If the new value is valid, update the initial value
        initialDate.current = { ...date, [field]: newValue };
      }
    };

  const handleKeyDown =
    (field: keyof DateParts) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow command (or control) combinations
      if (e.metaKey || e.ctrlKey) {
        return;
      }

      // Prevent non-numeric characters, excluding allowed keys
      if (
        !/^[0-9]$/.test(e.key) &&
        ![
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Delete",
          "Tab",
          "Backspace",
          "Enter",
        ].includes(e.key)
      ) {
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowUp" || e.key) {
        e.preventDefault();
        let newDate = { ...date };

        if (field === "day") {
          if (date[field] === new Date(date.year, date.month, 0).getDate()) {
            newDate = { ...newDate, day: 1, month: (date.month % 12) + 1 };
            if (newDate.month === 1) newDate.year += 1;
          } else {
            newDate.day += 1;
          }
        }

        if (field === "month") {
          if (date[field] === 12) {
            newDate = { ...newDate, month: 1, year: date.year + 1 };
          } else {
            newDate.month += 1;
          }
        }

        if (field === "year") {
          newDate.year += 1;
        }

        if (field === "hour12") {
          newDate.hour12 = newDate.hour12 === "AM" ? "PM" : "AM";
        }
        if (field === "hour") {
          newDate.hour = newDate.hour < 12 ? newDate.hour + 1 : 0;
        }

        if (field === "minute") {
          newDate.minute = newDate.minute < 59 ? newDate.minute + 1 : 0;
        }
        setDate(newDate);
        onChange(
          new Date(
            newDate.year,
            newDate.month - 1,
            newDate.day,
            newDate.hour12 === "PM" ? newDate.hour + 12 : newDate.hour,
            newDate.minute,
          ),
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        let newDate = { ...date };

        if (field === "day") {
          if (date[field] === 1) {
            newDate.month -= 1;
            if (newDate.month === 0) {
              newDate.month = 12;
              newDate.year -= 1;
            }
            newDate.day = new Date(newDate.year, newDate.month, 0).getDate();
          } else {
            newDate.day -= 1;
          }
        }

        if (field === "month") {
          if (date[field] === 1) {
            newDate = { ...newDate, month: 12, year: date.year - 1 };
          } else {
            newDate.month -= 1;
          }
        }

        if (field === "year") {
          newDate.year -= 1;
        }

        if (field === "hour12") {
          newDate.hour12 = newDate.hour12 === "AM" ? "PM" : "AM";
        }

        if (field === "hour") {
          newDate.hour = newDate.hour > 0 ? newDate.hour - 1 : 12;
        }

        if (field === "minute") {
          newDate.minute = newDate.minute > 0 ? newDate.minute - 1 : 59;
        }

        setDate(newDate);
        onChange(
          new Date(
            newDate.year,
            newDate.month - 1,
            newDate.day,
            newDate.hour12 === "PM" ? newDate.hour + 12 : newDate.hour,
            newDate.minute,
            0,
            0,
          ),
        );
      }

      if (e.key === "ArrowRight") {
        if (
          e.currentTarget.selectionStart === e.currentTarget.value.length ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault();
          if (field === "month") dayRef.current?.focus();
          if (field === "day") yearRef.current?.focus();
          if (field === "year") hourRef.current?.focus();
          if (field === "hour") minuteRef.current?.focus();
          if (field === "minute") hour12Ref.current?.focus();
        }
      } else if (e.key === "ArrowLeft") {
        if (
          e.currentTarget.selectionStart === 0 ||
          (e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === e.currentTarget.value.length)
        ) {
          e.preventDefault();
          if (field === "day") monthRef.current?.focus();
          if (field === "year") dayRef.current?.focus();
          if (field === "hour") yearRef.current?.focus();
          if (field === "minute") hourRef.current?.focus();
          if (field === "hour12") minuteRef.current?.focus();
        }
      }
    };

  const handleHour12Click = (value: "AM" | "PM") => {
    const newDate = { ...date, hour12: value };
    setDate(newDate);
  };

  return (
    <div className="flex border rounded-lg items-center text-sm p-2.5">
      <input
        type="text"
        ref={monthRef}
        max={12}
        maxLength={2}
        value={date.month.toString()}
        onChange={handleInputChange("month")}
        onKeyDown={handleKeyDown("month")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("month")}
        className="p-0 outline-none w-6 border-none text-center"
        placeholder="M"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={dayRef}
        max={31}
        maxLength={2}
        value={date.day.toString()}
        onChange={handleInputChange("day")}
        onKeyDown={handleKeyDown("day")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("day")}
        className="p-0 outline-none w-7 border-none text-center"
        placeholder="D"
      />
      <span className="opacity-20 -mx-px">/</span>
      <input
        type="text"
        ref={yearRef}
        max={9999}
        maxLength={4}
        value={date.year.toString()}
        onChange={handleInputChange("year")}
        onKeyDown={handleKeyDown("year")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("year")}
        className="p-0 outline-none w-12 border-none text-center"
        placeholder="YYYY"
      />
      <span className="opacity-20 -mx-px"> </span>
      <input
        type="text"
        ref={hourRef}
        max={12}
        maxLength={2}
        value={date.hour < 10 ? `0${date.hour}` : date.hour.toString()}
        onChange={handleInputChange("hour")}
        onKeyDown={handleKeyDown("hour")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("hour")}
        className="p-0 outline-none w-6 border-none text-center"
        placeholder="HH"
      />
      <span className="opacity-20 -mx-px">:</span>
      <input
        type="text"
        ref={minuteRef}
        max={59}
        maxLength={2}
        value={date.minute < 10 ? `0${date.minute}` : date.minute.toString()}
        onChange={handleInputChange("minute")}
        onKeyDown={handleKeyDown("minute")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("minute")}
        className="p-0 outline-none w-6 border-none text-center"
        placeholder="MM"
      />
      <span className="opacity-20 mx-px"></span>
      <DropdownMenu>
        <DropdownMenuTrigger ref={hour12Ref}>{date.hour12}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={date.hour12 === "AM"}
            onCheckedChange={() => handleHour12Click("AM")}
          >
            AM
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={date.hour12 === "PM"}
            onCheckedChange={() => handleHour12Click("PM")}
          >
            PM
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

DateInput.displayName = "DateInput";

export { DateInput };
