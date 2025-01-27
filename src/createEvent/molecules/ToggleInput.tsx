import { Switch } from "@/components/ui/switch";
import { useCreateEventTheme } from "@/providers/themeProvider";
import { memo } from "react";
import type { BooleanKeys, EventFormData } from "../templates/EventForm";

interface ToggleInputProps {
  icon?: React.ReactNode;
  text: string;
  name: BooleanKeys<EventFormData>;
  isToggled: boolean;
  onChange: (value: BooleanKeys<EventFormData>) => void;
}

const ToggleInput: React.FC<ToggleInputProps> = memo(
  ({ icon, isToggled, text, name, onChange }) => {
    const { theme } = useCreateEventTheme();
    return (
      <div
        className={`flex items-center space-x-2 p-2 backdrop-blur-2xl h-10 ${theme.inputBgColor} ${theme.inputHoverBgColor}`}
      >
        {icon && (
          <div className={`${theme.iconColor} flex-shrink-0`}>{icon}</div>
        )}
        <Switch
          checked={isToggled}
          onCheckedChange={() => {
            onChange(name);
          }}
          className={theme.toggleSwitchColor}
        />
        <span
          className={`text-xl font-medium leading-normal ${theme.textColor}`}
        >
          {text}
        </span>
      </div>
    );
  },
);

ToggleInput.displayName = "ToggleInput";

export default ToggleInput;
