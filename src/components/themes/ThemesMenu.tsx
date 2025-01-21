import { moods } from "@/utils/mood";
import { useTheme } from "@/utils/themeContext";
import { themes } from "@/utils/themes";

export default function ThemesMenu() {
  const { setBackground } = useTheme();

  return (
    <div className="bg-white text-black w-full absolute p-5 flex flex-col space-y-10 h-80 overflow-x-auto">
      <div className="space-y-3">
        <h1 className="text-xl font-bold">Pick a style</h1>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <div
              key={mood.mood}
              className="px-3 py-2 bg-slate-400 rounded-full text-sm"
            >
              {mood.emoji} {mood.mood}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {themes.map((theme) => (
          <button
            type="button"
            key={theme.color}
            className="w-16 h-16 rounded-full"
            style={{ background: theme.color }}
            onClick={() => setBackground(theme.color)}
          />
        ))}
      </div>
    </div>
  );
}
