import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface DarkModeState {
  isDarkMode: boolean;
  toggleDark: () => void;
  toggleLight: () => void;
}

const persistOptions: PersistOptions<DarkModeState> = {
  name: "dark-mode-storage",
};

const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDark: () =>
        set(() => ({
          isDarkMode: true,
        })),
      toggleLight: () =>
        set(() => ({
          isDarkMode: false,
        })),
    }),
    persistOptions
  )
);

export default useDarkModeStore;
