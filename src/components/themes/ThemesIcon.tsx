"use client";
import { useTheme } from "@/utils/themeContext";
import { useState } from "react";
import ThemesMenu from "./ThemesMenu";

type clickProp = {
  onclick: () => void;
};

export default function ThemesIcon({ onclick }: clickProp) {
  const { background } = useTheme();

  return (
    <button
      type="button"
      onClick={onclick}
      className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded-md"
    >
      <div
        style={{ background: background }}
        className="bg-blue-800 h-10 w-10 rounded-full"
      />
      <p>Style</p>
    </button>
  );
}
