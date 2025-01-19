import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolTipProps {
  children: React.ReactNode;
  isRequired?: boolean;
  toolTipContent: string | React.ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({
  children,
  toolTipContent,
  isRequired = false,
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent align="start">
          {isRequired && <sup>*</sup>}
          <span>{toolTipContent}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
