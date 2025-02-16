import { useCreateEventTheme } from "@/providers/themeProvider";
import React from "react";

const Footer = () => {
  const { theme } = useCreateEventTheme();
  return (
    <footer
      className={`w-full px-2 py-12 ${theme.inputBgColor} backdrop-blur-2xl flex-col justify-center items-center gap-2.5 inline-flex`}
    >
      <div className="text-[#d1d1d1] text-5xl font-normal font-['Peralta'] leading-tight">
        Partiyo
      </div>
      <div className="text-center text-white/40 text-base font-normal font-['Inter'] leading-normal">
        Copyright &#169; 2025 Partiyo
      </div>
    </footer>
  );
};

export default Footer;
