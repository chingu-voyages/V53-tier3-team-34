import React, { type ChangeEvent } from "react";
import { useCreateEventTheme } from "../create/provider";
import Tooltip from "./ToolTip";

interface InputProps {
  icon?: React.ReactNode;
  preText?: string;
  placeholder?: string;
  postText?: string;
  toolTipContent: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  isRequired?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  icon,
  preText,
  placeholder,
  postText,
  toolTipContent,
  name,
  value,
  onChange,
  type = "text",
  isRequired = false,
  className,
}) => {
  const [isFocussed, setIsFocussed] = React.useState(false);
  const { theme } = useCreateEventTheme();

  const ref = (ref: HTMLDivElement | null) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref?.contains(event.target as Node)) {
        setIsFocussed(false);
      }
    };

    // Add event listener for outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };

  return (
    <Tooltip toolTipContent={toolTipContent} isRequired={isRequired}>
      <div
        ref={ref}
        className={`
          flex items-center gap-3 p-4 rounded-lg
          ${theme.inputBgColor}
          ${isFocussed && `border ${theme.focusInputBorderColor}`}
          backdrop-blur-sm transition-all duration-200 group
        `}
        onClick={() => setIsFocussed(true)}
      >
        {/* Left icon */}
        {icon && (
          <div className={`${theme.iconColor} flex-shrink-0`}>{icon}</div>
        )}

        {/* Pre-text label */}
        {preText && (
          <span
            className={`text-xl font-medium leading-loose whitespace-nowrap ${theme.textColor}`}
          >
            {preText}
          </span>
        )}

        {/* Input field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={isRequired}
          autoFocus={isFocussed}
          onFocus={() => setIsFocussed(true)}
          min={type === "number" ? 0 : undefined} // Only set min if type is number
          max={type === "number" ? undefined : undefined} // No max for number type (remove or leave as undefined)
          className={`
            w-full
            bg-transparent border-none outline-none
            ${theme.textColor}
            ${theme.placeholderTextColor}
            text-[#7a7878] text-xl font-medium leading-loose
            ${value ? "no-underline" : "underline"}
            ${className}
          `}
        />

        {/* Post-text label */}
        {postText && (
          <span
            className={`text-xl text-left font-medium leading-loose whitespace-nowrap ${theme.textColor}`}
          >
            {postText}
          </span>
        )}
      </div>
    </Tooltip>
  );
};

export default Input;
