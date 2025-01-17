import type React from "react";
import type { ChangeEvent } from "react";
import { useCreateEventTheme } from "../create/provider";
import Tooltip from "./ToolTip";

interface TextAreaProps {
  name: string;
  value: string | number;
  toolTipContent: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  placeholder,
  toolTipContent,
  onChange,
}) => {
  const { theme } = useCreateEventTheme();

  return (
    <Tooltip toolTipContent={toolTipContent}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        maxLength={1000}
        className={`
        ${theme.inputBgColor}
        ${theme.inputTextColor}
        ${theme.placeholderTextColor}
        border-none
        focus:border focus:${theme.focusInputBorderColor}
        w-full p-2 rounded-md
        outline-none
        `}
      />
    </Tooltip>
  );
};

export default TextArea;
