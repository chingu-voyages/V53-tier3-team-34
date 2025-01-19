import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";
import {
  type Theme,
  type ThemeName,
  themeStyles,
} from "../../createEvent/config/themeConfig"; // Import the theme styles and types

interface ThemeContextType {
  theme: Theme;
  setThemeName: (themeName: ThemeName) => void;
}

const defaultTheme: ThemeContextType = {
  theme: themeStyles.light,
  setThemeName: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>("dark");
  const currentTheme = themeStyles[themeName];

  const changeTheme = (newThemeName: ThemeName) => {
    setThemeName(newThemeName);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, setThemeName: changeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useCreateEventTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
