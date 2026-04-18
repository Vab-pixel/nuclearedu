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
  Factory,
  FlaskConical,
  HeartPulse,
  Radiation,
  RotateCcw,
  ShieldCheck,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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

function ProgressRing({
  percent,
  size = 52,
  strokeWidth = 4,
  color,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} aria-hidden="true">
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

export default function LearningLab() {
  const { topicProgress, resetProgress } = useLearningStore();
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

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <PageHeader
        title="Learning Lab"
        subtitle="Test your nuclear science knowledge with interactive quizzes covering all major topics — from atomic structure to advanced reactor designs."
        readTimeMin={5}
      />

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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive gap-1.5"
              data-ocid="learning-lab.reset.open_modal_button"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset All Progress
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative shrink-0">
                    <ProgressRing
                      percent={progressPct}
                      size={52}
                      strokeWidth={4}
                      color={topic.color}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-foreground">
                        {Math.round(progressPct)}%
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
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
                            className={`font-semibold ${
                              bestScore >= 80
                                ? "text-emerald-400"
                                : bestScore >= 60
                                  ? "text-amber-400"
                                  : "text-rose-400"
                            }`}
                          >
                            {bestScore}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                          {attempts} attempt{attempts !== 1 ? "s" : ""}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* CTA */}
                {hasQuestions ? (
                  <Link
                    to="/learning-lab/$topicId"
                    params={{ topicId: topic.id }}
                  >
                    <Button
                      size="sm"
                      variant={status === "not-started" ? "default" : "outline"}
                      className="w-full gap-1.5 text-xs"
                      data-ocid={`learning-lab.topic.start_button.${index + 1}`}
                    >
                      {status === "not-started" ? (
                        <>
                          Start Quiz{" "}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </>
                      ) : status === "completed" ? (
                        <>
                          Retake{" "}
                          <RotateCcw className="h-3 w-3" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          Continue{" "}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
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
              </SectionCard>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2
            className="h-3 w-3 text-emerald-400"
            aria-hidden="true"
          />
          Score ≥ 80% marks a topic as completed
        </span>
      </div>
    </div>
  );
}
