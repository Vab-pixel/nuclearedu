import { useIsotopeStore } from "@/store/isotopeStore";
import type { IsotopeRecord } from "@/types/isotopes";
import { validateIsotopeRecord } from "@/types/isotopes";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 100;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const RETRY_DELAY_MS = 60 * 1000; // 1 minute on error

async function fetchAllPages(): Promise<IsotopeRecord[]> {
  // Dynamic import — the backend module may not expose methods in stub mode
  const backendModule = await import("@/backend");

  // biome-ignore lint/suspicious/noExplicitAny: dynamic actor access
  const mod = backendModule as Record<string, unknown>;
  if (typeof mod.fetchAllIsotopesPage !== "function") {
    throw new Error("fetchAllIsotopesPage not available on backend module");
  }

  type PageResult =
    | { ok: { items: IsotopeRecord[]; totalCount: bigint } }
    | { err: string };
  const fetchPage = mod.fetchAllIsotopesPage as (
    page: bigint,
    pageSize: bigint,
  ) => Promise<PageResult>;

  const collected: IsotopeRecord[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const result = await fetchPage(BigInt(page), BigInt(PAGE_SIZE));

    if ("err" in result) throw new Error(result.err);

    const { items, totalCount } = result.ok;
    for (const item of items) {
      const missing = validateIsotopeRecord(item);
      for (const field of missing) {
        console.warn(`IAEA schema mismatch: missing field ${field}`, item);
      }
      collected.push(item);
    }
    const total = Number(totalCount);
    hasMore = collected.length < total && items.length === PAGE_SIZE;
    page++;
  }

  return collected;
}

/**
 * Fetches isotope records from the backend canister using pagination.
 * Falls back gracefully on network/schema error.
 * Sets up a 5-minute auto-refresh interval.
 */
export function useAutoRefreshIsotopes() {
  const {
    liveIsotopes,
    fetchStatus,
    mergeIsotopes,
    setFetchStatus,
    setLastFetchTimestamp,
    setErrorMessage,
  } = useIsotopeStore();

  const abortedRef = useRef(false);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevCountRef = useRef(liveIsotopes.length);

  // Stable refs so doFetch closure stays stable
  const storeRef = useRef({
    mergeIsotopes,
    setFetchStatus,
    setLastFetchTimestamp,
    setErrorMessage,
  });
  storeRef.current = {
    mergeIsotopes,
    setFetchStatus,
    setLastFetchTimestamp,
    setErrorMessage,
  };

  const doFetchRef = useRef<((isManual: boolean) => Promise<void>) | null>(
    null,
  );

  doFetchRef.current = async (isManual: boolean) => {
    if (abortedRef.current) return;
    storeRef.current.setFetchStatus("loading");

    try {
      const records = await fetchAllPages();
      if (abortedRef.current) return;

      const prevCount = prevCountRef.current;
      storeRef.current.mergeIsotopes(records);
      storeRef.current.setLastFetchTimestamp(Date.now());
      storeRef.current.setFetchStatus("success");
      storeRef.current.setErrorMessage(null);

      const newCount = records.length - prevCount;
      prevCountRef.current = records.length;

      if (isManual) {
        const time = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
          hour12: false,
        });
        toast.success(`Updated: ${records.length} isotopes · ${time} UTC`);
      } else if (newCount > 0) {
        toast.info(
          `${newCount} new isotope record${newCount > 1 ? "s" : ""} added`,
        );
      }
    } catch (err) {
      if (abortedRef.current) return;
      const msg =
        err instanceof Error ? err.message : "Unknown error fetching isotopes";
      storeRef.current.setFetchStatus("error");
      storeRef.current.setErrorMessage(msg);

      if (isManual) {
        toast.error("Live data unavailable — using cached data");
      }

      retryTimeoutRef.current = setTimeout(() => {
        if (!abortedRef.current) doFetchRef.current?.(false);
      }, RETRY_DELAY_MS);
    }
  };

  useEffect(() => {
    abortedRef.current = false;
    doFetchRef.current?.(false);

    intervalRef.current = setInterval(() => {
      doFetchRef.current?.(false);
    }, REFRESH_INTERVAL_MS);

    return () => {
      abortedRef.current = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, []); // intentionally empty — all state via refs

  const manualRefresh = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    doFetchRef.current?.(true);
  }, []);

  return {
    fetchStatus,
    manualRefresh,
    isFetching: fetchStatus === "loading",
  };
}
