import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { quizTopics } from "@/data/quizzes";
import { useLearningStore } from "@/store/learningStore";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Atom,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Factory,
  FlaskConical,
  HeartPulse,
  History,
  Radiation,
  RotateCcw,
  Save,
  ShieldCheck,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Atom,
  Radiation,
  Zap,
  Factory,
  HeartPulse,
  ShieldCheck,
  BookOpen,
  FlaskConical,
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function relativeTime(isoOrMs: string | number): string {
  const ms =
    typeof isoOrMs === "number" ? isoOrMs : new Date(isoOrMs).getTime();
  const diffSec = Math.floor((Date.now() - ms) / 1000);
  if (diffSec < 10) return "Just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 30) return `${diffD} day${diffD !== 1 ? "s" : ""} ago`;
  const diffMo = Math.floor(diffD / 30);
  return `${diffMo} month${diffMo !== 1 ? "s" : ""} ago`;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

function ringColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ProgressRing({
  percent,
  bestScore,
  size = 52,
  strokeWidth = 4,
}: {
  percent: number;
  bestScore: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = bestScore > 0 ? ringColor(bestScore) : "text-primary";
  return (
    <svg width={size} height={size} aria-hidden="true" role="img">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/40"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={color}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

function TopicStatusBadge({
  status,
}: {
  status: "not-started" | "in-progress" | "completed";
}) {
  if (status === "completed")
    return (
      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
        Completed
      </Badge>
    );
  if (status === "in-progress")
    return (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
        In Progress
      </Badge>
    );
  return (
    <Badge variant="outline" className="text-muted-foreground text-xs">
      Not Started
    </Badge>
  );
}

function SyncStatusBadge({
  syncStatus,
  lastSyncTimestamp,
}: {
  syncStatus: "idle" | "saving" | "saved";
  lastSyncTimestamp: number | null;
}) {
  if (syncStatus === "saving") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs text-amber-400"
        aria-label="Saving progress"
        aria-live="polite"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
        Saving…
      </span>
    );
  }
  if (syncStatus === "saved" && lastSyncTimestamp) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs text-emerald-400"
        aria-label={`Progress saved to browser ${relativeTime(lastSyncTimestamp)}`}
        aria-live="polite"
      >
        <Save className="h-3 w-3" aria-hidden="true" />
        Progress saved · {relativeTime(lastSyncTimestamp)}
      </span>
    );
  }
  return null;
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function LearningLab() {
  const {
    topicProgress,
    quizHistory,
    syncStatus,
    lastSyncTimestamp,
    resetProgress,
    resetTopicProgress,
  } = useLearningStore();

  const [audienceFilter, setAudienceFilter] = useState<
    "all" | "beginner" | "intermediate" | "advanced"
  >("all");

  const allProgress = Object.values(topicProgress);
  const totalAttempts = allProgress.reduce((s, p) => s + p.attempts, 0);
  const totalQuestionsAnswered = allProgress.reduce(
    (s, p) => s + p.questionsAttempted,
    0,
  );
  const avgAccuracy =
    allProgress.length > 0
      ? Math.round(
          allProgress.reduce((s, p) => s + p.bestScore, 0) / allProgress.length,
        )
      : 0;
  const topicsCompleted = allProgress.filter((p) => p.bestScore >= 80).length;
  const totalTopics = quizTopics.length;

  function getTopicStatus(
    topicId: string,
  ): "not-started" | "in-progress" | "completed" {
    const p = topicProgress[topicId];
    if (!p) return "not-started";
    if (p.bestScore >= 80) return "completed";
    return "in-progress";
  }

  function getFilteredQuestionCount(topicId: string): number {
    const topic = quizTopics.find((t) => t.id === topicId);
    if (!topic) return 0;
    if (audienceFilter === "all") return topic.questions.length;
    return topic.questions.filter((q) => q.audience === audienceFilter).length;
  }

  const filteredTopics = quizTopics.map((topic) => ({
    ...topic,
    filteredCount: getFilteredQuestionCount(topic.id),
  }));

  const handleExportCSV = useCallback(() => {
    const rows = [
      [
        "Topic",
        "Best Score (%)",
        "Attempts",
        "Questions Attempted",
        "Last Attempt (ISO)",
      ],
      ...quizTopics.map((t) => {
        const p = topicProgress[t.id];
        return [
          t.title,
          p ? String(p.bestScore) : "0",
          p ? String(p.attempts) : "0",
          p ? String(p.questionsAttempted) : "0",
          p ? p.lastAttempt : "",
        ];
      }),
    ];
    const csv = rows
      .map((r) => r.map((cell) => `"${cell}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nuclearedu-quiz-results.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [topicProgress]);

  const recentHistory = quizHistory.slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Header with sync status */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <PageHeader
            title="Learning Lab"
            subtitle="Test your nuclear science knowledge with interactive quizzes covering all major topics — from atomic structure to advanced reactor designs."
            readTimeMin={5}
          />
        </div>
        <div className="pt-2 shrink-0">
          <SyncStatusBadge
            syncStatus={syncStatus}
            lastSyncTimestamp={lastSyncTimestamp}
          />
        </div>
      </div>

      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        data-ocid="learning-lab.stats.section"
      >
        {[
          {
            label: "Topics Completed",
            value: `${topicsCompleted}/${totalTopics}`,
            icon: Trophy,
            color: "text-amber-400",
          },
          {
            label: "Questions Answered",
            value: totalQuestionsAnswered,
            icon: Target,
            color: "text-cyan-400",
          },
          {
            label: "Quiz Attempts",
            value: totalAttempts,
            icon: BarChart3,
            color: "text-purple-400",
          },
          {
            label: "Avg. Best Score",
            value: avgAccuracy > 0 ? `${avgAccuracy}%` : "—",
            icon: CheckCircle2,
            color: "text-emerald-400",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <SectionCard
              key={stat.label}
              className="flex items-center gap-3 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 shrink-0">
                <Icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold font-display text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </div>
            </SectionCard>
          );
        })}
      </motion.div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div
          className="flex items-center gap-2 flex-wrap"
          data-ocid="learning-lab.audience-filter"
        >
          <span className="text-sm text-muted-foreground">Difficulty:</span>
          {(["all", "beginner", "intermediate", "advanced"] as const).map(
            (level) => (
              <button
                key={level}
                type="button"
                onClick={() => setAudienceFilter(level)}
                data-ocid={`learning-lab.filter.${level}`}
                aria-pressed={audienceFilter === level}
                className={[
                  "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors border",
                  audienceFilter === level
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
                ].join(" ")}
              >
                {level}
              </button>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1.5"
            onClick={handleExportCSV}
            data-ocid="learning-lab.export_button"
            aria-label="Export quiz results as CSV file"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Export CSV
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive gap-1.5"
                data-ocid="learning-lab.reset.open_modal_button"
                aria-label="Reset all quiz progress"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-ocid="learning-lab.reset.dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all quiz progress, scores, and
                  attempt history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="learning-lab.reset.cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetProgress}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  data-ocid="learning-lab.reset.confirm_button"
                >
                  Reset Progress
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Topic Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        data-ocid="learning-lab.topics.list"
      >
        {filteredTopics.map((topic, index) => {
          const IconComponent = iconMap[topic.icon] ?? Atom;
          const progress = topicProgress[topic.id];
          const status = getTopicStatus(topic.id);
          const bestScore = progress?.bestScore ?? 0;
          const attempts = progress?.attempts ?? 0;
          const progressPct = progress
            ? Math.min(
                100,
                (progress.questionsAttempted / topic.questions.length) * 100,
              )
            : 0;
          const hasQuestions = topic.filteredCount > 0;

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              data-ocid={`learning-lab.topic.item.${index + 1}`}
            >
              <SectionCard
                className="flex flex-col h-full hover:border-primary/30 transition-colors"
                glowAccent={status === "completed"}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                    <IconComponent
                      className={`h-5 w-5 ${topic.color}`}
                      aria-hidden="true"
                    />
                  </div>
                  <TopicStatusBadge status={status} />
                </div>

                <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-1.5">
                  {topic.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-2">
                  {topic.description}
                </p>

                {/* Progress ring + stats */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative shrink-0">
                    <ProgressRing
                      percent={progressPct}
                      bestScore={bestScore}
                      size={52}
                      strokeWidth={4}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-foreground">
                        {Math.round(progressPct)}%
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {topic.filteredCount}
                      </span>{" "}
                      {audienceFilter === "all" ? "" : `${audienceFilter} `}
                      questions
                    </div>
                    {attempts > 0 && (
                      <>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Best:{" "}
                          <span
                            className={`font-semibold ${scoreColor(bestScore)}`}
                          >
                            {bestScore}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                          {attempts} attempt{attempts !== 1 ? "s" : ""}
                        </div>
                        {progress?.lastAttempt && (
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">
                            {relativeTime(progress.lastAttempt)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* CTA + per-topic reset */}
                <div className="flex flex-col gap-2 mt-auto">
                  {hasQuestions ? (
                    <Link
                      to="/learning-lab/$topicId"
                      params={{ topicId: topic.id }}
                    >
                      <Button
                        size="sm"
                        variant={
                          status === "not-started" ? "default" : "outline"
                        }
                        className="w-full gap-1.5 text-xs"
                        data-ocid={`learning-lab.topic.start_button.${index + 1}`}
                      >
                        {status === "not-started" ? (
                          <>
                            Start Quiz{" "}
                            <ArrowRight
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          </>
                        ) : status === "completed" ? (
                          <>
                            Retake{" "}
                            <RotateCcw className="h-3 w-3" aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            Continue{" "}
                            <ArrowRight
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      disabled
                    >
                      No {audienceFilter} questions
                    </Button>
                  )}

                  {/* Per-topic reset (only shown if there's progress) */}
                  {attempts > 0 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full text-xs text-muted-foreground hover:text-destructive gap-1 h-7"
                          data-ocid={`learning-lab.topic.reset_button.${index + 1}`}
                          aria-label={`Reset progress for ${topic.title}`}
                        >
                          <X className="h-3 w-3" aria-hidden="true" />
                          Reset topic
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        data-ocid={`learning-lab.topic.reset.dialog.${index + 1}`}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Reset "{topic.title}" progress?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will delete your score, attempts, and history
                            for this topic only. Other topics are unaffected.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            data-ocid={`learning-lab.topic.reset.cancel_button.${index + 1}`}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => resetTopicProgress(topic.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            data-ocid={`learning-lab.topic.reset.confirm_button.${index + 1}`}
                          >
                            Reset Topic
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </SectionCard>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 text-center text-xs text-muted-foreground space-y-1">
        <div className="inline-flex items-center gap-4 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />≥ 80%
            — Completed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            50–79% — In Progress
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            &lt; 50% — Needs Practice
          </span>
        </div>
      </div>

      {/* Quiz History */}
      {recentHistory.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12"
          aria-labelledby="history-heading"
          data-ocid="learning-lab.history.section"
        >
          <div className="flex items-center gap-2 mb-4">
            <History
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <h2
              id="history-heading"
              className="text-sm font-semibold text-foreground"
            >
              Recent Quiz History
            </h2>
            <Badge
              variant="outline"
              className="text-xs text-muted-foreground ml-1"
            >
              Last {recentHistory.length}
            </Badge>
          </div>

          <SectionCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                aria-label="Recent quiz attempts"
              >
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Topic
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                      Questions
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                      Duration
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentHistory.map((entry, i) => (
                    <tr
                      key={`${entry.topicId}-${entry.completedAt}`}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors"
                      data-ocid={`learning-lab.history.item.${i + 1}`}
                    >
                      <td className="px-4 py-3 text-foreground font-medium truncate max-w-[160px]">
                        {entry.topicTitle}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`font-bold tabular-nums ${scoreColor(entry.score)}`}
                        >
                          {entry.score}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground tabular-nums hidden sm:table-cell">
                        {entry.questionsAttempted}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                        {entry.durationSeconds > 0
                          ? formatDuration(entry.durationSeconds)
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground text-xs">
                        {relativeTime(entry.completedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </motion.section>
      )}
    </div>
  );
}
