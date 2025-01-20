"use client";
import { useTheme } from "@/utils/themeContext";
import { useState } from "react";
import ThemesMenu from "./ThemesMenu";

export default function ThemesIcon() {
  const [clicked, setClicked] = useState(false);
  const { background } = useTheme();

  function handleClick() {
    setClicked((prevState) => !prevState);
  }
  return (
    <div className="absolute z-10">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-5 bg-gray-600 p-4"
      >
        <div
          style={{ background: background }}
          className="bg-blue-800 h-10 w-10 rounded-full"
        />
        <p>Style</p>
      </button>
      {clicked && <ThemesMenu />}
    </div>
  );
}
