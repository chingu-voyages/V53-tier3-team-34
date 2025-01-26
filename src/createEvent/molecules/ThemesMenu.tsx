import { type StyleMood, styleMoods } from "@/createEvent/config/styleMoods";
import { useCreateEventTheme } from "@/providers/themeProvider";
import { type ThemeName, themeStyles } from "../../providers/themeConfig";
const ThemesMenu: React.FC = () => {
  const { theme, setThemeName } = useCreateEventTheme();

  return (
    <div className="bg-white text-black absolute p-6 flex flex-col space-y-5 h-80 overflow-x-auto z-10 top-[100px]">
      <div className="space-y-3">
        <h1 className="text-black text-2xl font-medium leading-loose">
          Pick A Style
        </h1>
        <div className="flex flex-wrap gap-4">
          {styleMoods.map((mood: StyleMood) => (
            <div
              key={mood.mood}
              className="px-3 py-2 bg-slate-400 rounded-full text-sm"
            >
              {mood.emoji} {mood.mood}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-10">
        {Object.keys(themeStyles).map((themeName) => (
          <div
            key={themeName}
            className={`w-24 h-24 rounded-full ${
              themeStyles[themeName as ThemeName].pageBgImage
            } ${
              theme.pageBgImage ===
              themeStyles[themeName as ThemeName].pageBgImage
                ? "border-8 border-[#084be7]"
                : ""
            }`}
            onClick={() => setThemeName(themeName as ThemeName)}
            onKeyDown={() => setThemeName(themeName as ThemeName)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemesMenu;
