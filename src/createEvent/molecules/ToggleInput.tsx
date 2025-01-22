import { Switch } from "@/components/ui/switch";
import { useCreateEventTheme } from "@/providers/themeProvider";

interface ToggleInputProps {
  icon?: React.ReactNode;
  text: string;
  name: string;
  isToggled: boolean;
  onChange: (value: string) => void;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  icon,
  isToggled,
  text,
  name,
  onChange,
}) => {
  const { theme } = useCreateEventTheme();
  return (
    <div
      className={`flex items-center space-x-2 p-2 backdrop-blur-2xl h-10 ${theme.inputBgColor}`}
    >
      {icon && <div className={`${theme.iconColor} flex-shrink-0`}>{icon}</div>}
      <Switch
        checked={isToggled}
        onCheckedChange={() => {
          onChange(name);
        }}
        className={theme.toggleSwitchColor}
      />
      <span className={`text-xl font-medium leading-normal ${theme.textColor}`}>
        {text}
      </span>
    </div>
  );
};

export default ToggleInput;
