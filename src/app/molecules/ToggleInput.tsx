import { Switch } from "@/components/ui/switch";
import { useCreateEventTheme } from "../create/provider";
import ToolTip from "./ToolTip";

interface ToggleInputProps {
  text: string;
  name: string;
  isToggled: boolean;
  onChange: (value: string) => void;
  toolTipContent: string;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  toolTipContent,
  isToggled,
  text,
  name,
  onChange,
}) => {
  const { theme } = useCreateEventTheme();
  return (
    <div className={`flex items-center space-x-2 ${theme.inputBgColor}`}>
      <Switch
        checked={isToggled}
        onCheckedChange={() => {
          onChange(name);
        }}
        color={theme.toggleSwitchColor}
      />
      <ToolTip toolTipContent={toolTipContent}>
        <span
          className={`text-xl font-medium leading-normal ${theme.textColor}`}
        >
          {text}
        </span>
      </ToolTip>
    </div>
  );
};

export default ToggleInput;
