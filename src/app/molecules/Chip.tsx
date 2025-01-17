interface ChipProps {
  icon?: React.ReactNode; // Optional icon prop
  text: string;
}

const Chip: React.FC<ChipProps> = ({ icon, text }) => {
  return (
    <div className="h-10 px-3 py-2 bg-[#aeaaaa]/30 rounded-3xl backdrop-blur-[34px] inline-flex items-center gap-1 text-white text-base font-normal">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default Chip;
