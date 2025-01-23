import { useCreateEventTheme } from "@/providers/themeProvider";
import type React from "react";
import type { ChangeEvent } from "react";

interface TextAreaProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  placeholder,
  onChange,
}) => {
  const { theme } = useCreateEventTheme();

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      maxLength={1000}
      className={`
        backdrop-blur-2xl
        ${theme.inputBgColor}
        ${theme.textColor}
        ${theme.placeholderTextColor}
        ${theme.inputHoverBgColor}
        placeholder:text-xl
        focus:border focus:${theme.focusInputBorderColor}
        w-full p-2
        outline-none
        `}
    />
  );
};

export default TextArea;
