import { useCreateEventTheme } from "@/providers/themeProvider";
import type React from "react";
import { type ChangeEvent, memo } from "react";

interface TextAreaProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<TextAreaProps> = memo(
  ({ name, value, placeholder, onChange }) => {
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
        text-lg md:text-xl placeholder:text-lg md:placeholder:text-xl
        focus:border focus:${theme.focusInputBorderColor}
        p-2
        outline-none
        text-wrap
        `}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
