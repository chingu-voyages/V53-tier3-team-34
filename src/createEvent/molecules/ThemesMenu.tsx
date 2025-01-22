import { useCreateEventTheme } from "@/app/create/provider";
import { type StyleMood, styleMoods } from "@/createEvent/config/styleMoods";
import { type ThemeName, themeStyles } from "../config/themeConfig";
export default function ThemesMenu() {
  const { setThemeName } = useCreateEventTheme();

  return (
    <div className="bg-white text-black absolute p-5 flex flex-col space-y-5 h-80 overflow-x-auto z-10 top-[100px]">
      <div className="space-y-3">
        <h1 className="text-black text-2xl font-medium leading-loose">
          Pick A Style
        </h1>
        <div className="flex flex-wrap gap-2">
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

      <div className="flex flex-wrap gap-5">
        {Object.keys(themeStyles).map((theme) => (
          <div
            key={theme}
            className={`w-24 h-24 rounded-full ${
              themeStyles[theme as ThemeName].pageBgImage
            }`}
            onClick={() => setThemeName(theme as ThemeName)}
            onKeyDown={() => setThemeName(theme as ThemeName)}
          />
        ))}
      </div>
    </div>
  );
}
