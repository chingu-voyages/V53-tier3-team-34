import { useCreateEventTheme } from "@/providers/themeProvider";
import type React from "react";
import { type ChangeEvent, memo, useEffect, useRef, useState } from "react";

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

const Input: React.FC<InputProps> = memo(
  ({
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
    const [isEditing, setIsEditing] = useState(false); // Track if we're editing

    const handleClick = () => {
      if (ref.current) {
        ref.current.focus();
      }
      setIsEditing(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
    };

    useEffect(() => {
      if (ref.current && isEditing) {
        ref.current.focus();
      }
    }, [isEditing]);

    return (
      <div
        className={`
          flex items-center gap-3 backdrop-blur-2xl p-2 h-min font-medium leading-tight
          ${theme.inputBgColor}
          ${
            ref.current &&
            ref.current === document.activeElement &&
            `border ${theme.focusInputBorderColor}`
          }
          ${theme.inputHoverBgColor}
          ${parentClassName}
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
            className={`text-xl font-medium leading-tight whitespace-nowrap ${theme.textColor}`}
          >
            {preText}
          </span>
        )}

        {/* Input field */}
        {isEditing ? (
          <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onBlur={handleBlur}
            required={isRequired}
            min={type === "number" ? 0 : undefined} // Only set min if type is number
            max={type === "number" ? undefined : undefined} // No max for number type (remove or leave as undefined)
            className={`
              bg-transparent border-none outline-none 
              ${theme.textColor}
              ${theme.placeholderTextColor}
              ${preText && "-ml-1.5"}
              ${postText ? "w-28 -mr-1.5" : "w-full"}
              -my-2
              ${className}
            `}
          />
        ) : (
          <span
            className={`bg-transparent border-none outline-none flex items-center leading-tight
              ${theme.textColor} 
              ${className} 
              ${preText && "-ml-1.5"}
              ${postText && "-mr-1.5"}`}
          >
            {value || placeholder}
          </span>
        )}

        {/* Post-text label */}
        {postText && (
          <span
            className={`text-xl text-left whitespace-nowrap ${theme.textColor}`}
          >
            {postText}
          </span>
        )}

        <div className="text-right text-[#faf1e5] text-sm font-normal leading-normal flex items-center gap-0.5 ml-auto">
          {maxCount && typeof value === "string" && value.length > 0 && (
            <span>
              ({value.length - 1}/{maxCount})
            </span>
          )}
          {postButton}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
