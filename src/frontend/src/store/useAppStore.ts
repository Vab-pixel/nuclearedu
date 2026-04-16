import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AudienceLevel = "public" | "student" | "researcher";

interface AppStore {
  audienceLevel: AudienceLevel;
  setAudienceLevel: (level: AudienceLevel) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedNuclide: string | null;
  setSelectedNuclide: (nuclide: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      audienceLevel: "public",
      setAudienceLevel: (level) => set({ audienceLevel: level }),
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      selectedNuclide: null,
      setSelectedNuclide: (nuclide) => set({ selectedNuclide: nuclide }),
    }),
    { name: "nuclear-edu-store" },
  ),
);
