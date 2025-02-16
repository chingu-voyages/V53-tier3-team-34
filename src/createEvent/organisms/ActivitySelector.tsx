import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useCreateEventTheme } from "@/providers/themeProvider";
import type { ActivityType } from "@prisma/client";
import { activities } from "../config/activityConfig";

interface ActivitySelectorProps {
  selectedActivity: string | null;
  onChange: (activityValue: ActivityType) => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  selectedActivity,
  onChange,
}) => {
  const { theme } = useCreateEventTheme();
  const filteredActivities = activities.filter(
    (activity) => activity.value === selectedActivity,
  );

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={`rounded-none !border-none text-xl font-medium font-['Mona Sans'] leading-normal backdrop-blur-2xl p-2 ${theme.inputBgColor}
          ${theme.textColor}
          ${theme.placeholderTextColor}
          ${theme.inputHoverBgColor}`}
        defaultValue={selectedActivity ? selectedActivity : undefined}
      >
        <div className="flex items-center gap-2 items-center justify-start">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <title> Add activity categories</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.96682 20.4734L3.52271 14.0293C2.82576 13.3282 2.82576 12.1959 3.52271 11.4948L11.6128 3.54111C11.9489 3.2106 12.4015 3.02539 12.873 3.02539H19.3274C20.3202 3.02539 21.1249 3.83017 21.1249 4.82291V11.2589C21.1249 11.7413 20.9311 12.2034 20.5869 12.5414L12.5103 20.4734C12.1732 20.811 11.7156 21.0006 11.2386 21.0006C10.7615 21.0006 10.304 20.811 9.96682 20.4734ZM18.7282 7.21961C18.7282 8.21235 17.9235 9.01713 16.9307 9.01713C15.938 9.01713 15.1332 8.21235 15.1332 7.21961C15.1332 6.22686 15.938 5.42209 16.9307 5.42209C17.9235 5.42209 18.7282 6.22686 18.7282 7.21961Z"
                fill="white"
              />
            </svg>
          </span>
          <span>
            {filteredActivities.length > 0
              ? filteredActivities[0].text
              : "Add activity categories"}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-[#aeaaaa]/30 backdrop-blur-2xl rounded-none">
        {activities.map((activity) => (
          <SelectItem
            className="p-2 text-white text-base font-medium font-['Inter'] leading-normal hover:!bg-black hover:!rounded-none hover:!text-white"
            key={activity.value}
            value={activity.value}
          >
            <div className="flex flex-row justify-start items-center gap-2">
              <span>{activity.icon}</span>
              <span>{activity.text}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ActivitySelector;
