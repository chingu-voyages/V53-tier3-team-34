import type React from "react";
import { type ChangeEvent, useRef } from "react";
import { useCreateEventTheme } from "../../app/create/provider";
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
  const ref = useRef<HTMLInputElement>(null);
  const { theme } = useCreateEventTheme();

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <Tooltip toolTipContent={toolTipContent} isRequired={isRequired}>
      <div
        className={`
          flex items-center gap-3
          ${theme.inputBgColor}
          ${
            ref.current &&
            ref.current === document.activeElement &&
            `border ${theme.focusInputBorderColor}`
          }
          backdrop-blur-sm transition-all duration-200 group
        `}
        onClick={handleClick}
        onKeyDown={handleClick}
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
