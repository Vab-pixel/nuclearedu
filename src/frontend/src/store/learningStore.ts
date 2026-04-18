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
};

interface LearningState {
  topicProgress: Record<string, TopicProgress>;
  setProgress: (topicId: string, result: QuizResult) => void;
  resetProgress: () => void;
  getTopicProgress: (topicId: string) => TopicProgress | undefined;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      topicProgress: {},

      setProgress: (topicId, result) => {
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
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: updated,
            },
          };
        });
      },

      resetProgress: () => set({ topicProgress: {} }),

      getTopicProgress: (topicId) => {
        return get().topicProgress[topicId];
      },
    }),
    { name: "nuclear-lab-progress" },
  ),
);
