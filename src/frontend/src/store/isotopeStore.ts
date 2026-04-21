import type { FetchStatus, IsotopeRecord } from "@/types/isotopes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IsotopeStore {
  liveIsotopes: IsotopeRecord[];
  fetchStatus: FetchStatus;
  lastFetchTimestamp: number | null;
  cachedCount: number;
  errorMessage: string | null;

  setLiveIsotopes: (isotopes: IsotopeRecord[]) => void;
  mergeIsotopes: (incoming: IsotopeRecord[]) => void;
  setFetchStatus: (status: FetchStatus) => void;
  setLastFetchTimestamp: (ts: number) => void;
  setCachedCount: (count: number) => void;
  setErrorMessage: (msg: string | null) => void;
}

export const useIsotopeStore = create<IsotopeStore>()(
  persist(
    (set, get) => ({
      liveIsotopes: [],
      fetchStatus: "idle",
      lastFetchTimestamp: null,
      cachedCount: 0,
      errorMessage: null,

      setLiveIsotopes: (isotopes) =>
        set({ liveIsotopes: isotopes, cachedCount: isotopes.length }),

      mergeIsotopes: (incoming) => {
        const existing = get().liveIsotopes;
        // Build lookup by symbol (unique key)
        const map = new Map<string, IsotopeRecord>();
        for (const iso of existing) map.set(iso.symbol, iso);
        for (const iso of incoming) map.set(iso.symbol, iso);
        const merged = Array.from(map.values());
        set({ liveIsotopes: merged, cachedCount: merged.length });
      },

      setFetchStatus: (status) => set({ fetchStatus: status }),
      setLastFetchTimestamp: (ts) => set({ lastFetchTimestamp: ts }),
      setCachedCount: (count) => set({ cachedCount: count }),
      setErrorMessage: (msg) => set({ errorMessage: msg }),
    }),
    {
      name: "nuclear-edu-isotope-store",
      // Only persist isotopes + timestamps, not transient fetch state
      partialize: (state) => ({
        liveIsotopes: state.liveIsotopes,
        lastFetchTimestamp: state.lastFetchTimestamp,
        cachedCount: state.cachedCount,
      }),
    },
  ),
);
