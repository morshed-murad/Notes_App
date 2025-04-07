import useDarkModeStore from "../../store/useDarkModeStore";
import { NotesManager } from "./components/note-manage";
export function ThemeTogglePage() {
  const { isDarkMode, toggleDark, toggleLight } = useDarkModeStore();
  return (
    <div className="pb-10">
      <h1
        className={`text-2xl font-bold ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </h1>
      <div className="flex justify-center items-center gap-20 mt-10">
        <div
          onClick={toggleDark}
          className="w-2xs h-72 bg-slate-800 border-8 border-black rounded-4xl shadow-2xl p-5 flex flex-col gap-4"
        >
          <div className="w-full h-12 bg-black rounded-4xl"></div>
          <div className="w-full h-26 bg-black rounded-4xl"></div>
          <div className="w-full h-12 bg-black rounded-4xl"></div>
        </div>
        <div
          onClick={toggleLight}
          className="w-2xs h-72 bg-slate-100 border-8 border-slate-400 rounded-4xl shadow-2xl p-5 flex flex-col gap-4"
        >
          <div className="w-full h-12 bg-slate-400 rounded-4xl"></div>
          <div className="w-full h-26 bg-slate-400 rounded-4xl"></div>
          <div className="w-full h-12 bg-slate-400 rounded-4xl"></div>
        </div>
      </div>
      <div className="mt-10">
        <NotesManager />
      </div>
    </div>
  );
}
