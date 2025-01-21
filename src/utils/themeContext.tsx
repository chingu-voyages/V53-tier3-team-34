"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  background: string;
  setBackground: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [background, setBackground] = useState<string>(() => {
    const savedBackground = localStorage.getItem("background");
    return savedBackground || "";
  });

  useEffect(() => {
    if (background) {
      localStorage.setItem("background", background);
    }
  }, [background]);

  return (
    <ThemeContext.Provider value={{ background, setBackground }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
