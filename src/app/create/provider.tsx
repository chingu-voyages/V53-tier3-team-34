import type React from "react";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const currentTheme = themeStyles[themeName];

  const changeTheme = useCallback((newThemeName: ThemeName) => {
    setThemeName(newThemeName);
    localStorage.setItem("theme", newThemeName);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setThemeName(savedTheme as ThemeName);
    } else {
      changeTheme("light");
    }
  }, [changeTheme]);

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
