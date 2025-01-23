import { useCreateEventTheme } from "@/providers/themeProvider";
import type React from "react";
import { type ChangeEvent, useRef } from "react";

interface InputProps {
  icon?: React.ReactNode;
  preText?: string;
  placeholder?: string;
  postText?: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  isRequired?: boolean;
  parentClassName?: string;
  className?: string;
  maxCount?: number;
  postButton?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  icon,
  preText,
  placeholder,
  postText,
  name,
  value,
  onChange,
  type = "text",
  isRequired = false,
  parentClassName,
  className,
  maxCount,
  postButton,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { theme } = useCreateEventTheme();

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div
      className={`
          flex items-center gap-3 backdrop-blur-2xl p-2
          ${theme.inputBgColor}
          ${
            ref.current &&
            ref.current === document.activeElement &&
            `border ${theme.focusInputBorderColor}`
          }
          ${parentClassName}
        `}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      {/* Left icon */}
      {icon && <div className={`${theme.iconColor} flex-shrink-0`}>{icon}</div>}

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
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
        min={type === "number" ? 0 : undefined} // Only set min if type is number
        max={type === "number" ? undefined : undefined} // No max for number type (remove or leave as undefined)
        className={`
            w-full
            bg-transparent border-none outline-none
            ${theme.textColor}
            ${theme.placeholderTextColor}
            font-medium leading-loose
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

      <div className="text-right text-[#faf1e5] text-sm font-normal leading-normal flex gap-0.5">
        {maxCount && typeof value === "string" && value.length > 0 && (
          <span>
            ({value.length - 1}/{maxCount})
          </span>
        )}
        {postButton}
      </div>
    </div>
  );
};

export default Input;
