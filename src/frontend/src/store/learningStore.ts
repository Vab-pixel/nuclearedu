import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TopicProgress = {
  bestScore: number; // percentage 0-100
  attempts: number;
  questionsAttempted: number;
  lastAttempt: string; // ISO date string
};

export type QuizResult = {
  score: number; // percentage 0-100
  questionsAttempted: number;
  dateTaken: string; // ISO date string
  durationSeconds?: number;
};

export type QuizHistoryEntry = {
  topicId: string;
  topicTitle: string;
  score: number; // percentage 0-100
  attempts: number;
  questionsAttempted: number;
  completedAt: number; // unix timestamp ms
  durationSeconds: number;
};

export type SyncStatus = "idle" | "saving" | "saved";

interface LearningState {
  topicProgress: Record<string, TopicProgress>;
  quizHistory: QuizHistoryEntry[];
  syncStatus: SyncStatus;
  lastSyncTimestamp: number | null; // unix ms

  setProgress: (
    topicId: string,
    topicTitle: string,
    result: QuizResult,
  ) => void;
  resetProgress: () => void;
  resetTopicProgress: (topicId: string) => void;
  getTopicProgress: (topicId: string) => TopicProgress | undefined;
  setSyncStatus: (status: SyncStatus, timestamp?: number) => void;
}

const MAX_HISTORY = 50;

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      topicProgress: {},
      quizHistory: [],
      syncStatus: "idle",
      lastSyncTimestamp: null,

      setProgress: (topicId, topicTitle, result) => {
        set((state) => {
          const existing = state.topicProgress[topicId];
          const updated: TopicProgress = {
            bestScore: existing
              ? Math.max(existing.bestScore, result.score)
              : result.score,
            attempts: existing ? existing.attempts + 1 : 1,
            questionsAttempted: result.questionsAttempted,
            lastAttempt: result.dateTaken,
          };

          const historyEntry: QuizHistoryEntry = {
            topicId,
            topicTitle,
            score: result.score,
            attempts: updated.attempts,
            questionsAttempted: result.questionsAttempted,
            completedAt: new Date(result.dateTaken).getTime(),
            durationSeconds: result.durationSeconds ?? 0,
          };

          const newHistory = [historyEntry, ...state.quizHistory].slice(
            0,
            MAX_HISTORY,
          );

          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: updated,
            },
            quizHistory: newHistory,
          };
        });
      },

      resetProgress: () =>
        set({
          topicProgress: {},
          quizHistory: [],
          syncStatus: "idle",
          lastSyncTimestamp: null,
        }),

      resetTopicProgress: (topicId) => {
        set((state) => {
          const { [topicId]: _removed, ...rest } = state.topicProgress;
          return {
            topicProgress: rest,
            quizHistory: state.quizHistory.filter((h) => h.topicId !== topicId),
          };
        });
      },

      getTopicProgress: (topicId) => {
        return get().topicProgress[topicId];
      },

      setSyncStatus: (status, timestamp) => {
        set({
          syncStatus: status,
          ...(timestamp !== undefined ? { lastSyncTimestamp: timestamp } : {}),
        });
      },
    }),
    { name: "nuclear-lab-progress" },
  ),
);
