import type React from "react";
import type { ChangeEvent } from "react";
import { useCreateEventTheme } from "../../app/create/provider";
import Tooltip from "./ToolTip";

interface TextAreaProps {
  name: string;
  value: string;
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
        ${theme.textColor}
        ${theme.placeholderTextColor}
        focus:border focus:${theme.focusInputBorderColor}
        w-full py-2
        outline-none
        `}
      />
    </Tooltip>
  );
};

export default TextArea;
