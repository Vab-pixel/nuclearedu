import { EquationBlock } from "@/components/EquationBlock";
import { SectionCard } from "@/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { quizTopics } from "@/data/quizzes";
import type { QuizQuestion } from "@/data/quizzes";
import { useLearningStore } from "@/store/learningStore";
import { useAppStore } from "@/store/useAppStore";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

type QuizPhase = "quiz" | "results" | "review";

type AnswerRecord = {
  questionIndex: number;
  selectedIndex: number;
  correct: boolean;
};

const audienceMap = {
  public: "all",
  student: "intermediate",
  researcher: "advanced",
} as const;

function ScoreGrade({ score }: { score: number }) {
  if (score >= 90)
    return <span className="text-emerald-400 font-bold">Excellent!</span>;
  if (score >= 80)
    return <span className="text-emerald-400 font-bold">Great job!</span>;
  if (score >= 70)
    return <span className="text-amber-400 font-bold">Good effort!</span>;
  if (score >= 60)
    return <span className="text-amber-400 font-bold">Keep studying!</span>;
  return <span className="text-rose-400 font-bold">Keep practicing!</span>;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Quiz() {
  const { topicId } = useParams({ strict: false }) as { topicId: string };
  const { setProgress, setSyncStatus } = useLearningStore();
  const { audienceLevel } = useAppStore();

  const topic = quizTopics.find((t) => t.id === topicId);

  // Filter questions based on audience
  const preferredAudience = audienceMap[audienceLevel];
  const questions =
    topic?.questions.filter(
      (q) => preferredAudience === "all" || q.audience === preferredAudience,
    ) ??
    topic?.questions ??
    [];

  const [phase, setPhase] = useState<QuizPhase>("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [finalElapsed, setFinalElapsed] = useState(0);
  const [reviewOpen, setReviewOpen] = useState<Record<number, boolean>>({});

  // Timer
  useEffect(() => {
    if (phase !== "quiz") return;
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - startTime) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, [phase, startTime]);

  const currentQuestion: QuizQuestion | undefined = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (answered || !currentQuestion) return;
      setSelectedIndex(optionIndex);
      setAnswered(true);
      setAnswers((prev) => [
        ...prev,
        {
          questionIndex: currentIndex,
          selectedIndex: optionIndex,
          correct: optionIndex === currentQuestion.correctIndex,
        },
      ]);
    },
    [answered, currentQuestion, currentIndex],
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= totalQuestions) {
      const secs = Math.floor((Date.now() - startTime) / 1000);
      setFinalElapsed(secs);
      const score = Math.round(
        (answers.filter((a) => a.correct).length / totalQuestions) * 100,
      );
      const completedAt = new Date().toISOString();

      // Set saving state
      setSyncStatus("saving");

      setProgress(topicId, topic?.title ?? topicId, {
        score,
        questionsAttempted: totalQuestions,
        dateTaken: completedAt,
        durationSeconds: secs,
      });

      // Transition to saved after a brief delay to show the saving indicator
      setTimeout(() => {
        setSyncStatus("saved", Date.now());
      }, 600);

      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setAnswered(false);
    }
  }, [
    currentIndex,
    totalQuestions,
    answers,
    startTime,
    topicId,
    topic?.title,
    setProgress,
    setSyncStatus,
  ]);

  // Keyboard navigation
  useEffect(() => {
    if (phase !== "quiz") return;
    function onKey(e: KeyboardEvent) {
      if (answered) {
        if (e.key === "Enter") handleNext();
        return;
      }
      const num = Number.parseInt(e.key);
      if (num >= 1 && num <= 4) handleSelect(num - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answered, handleNext, handleSelect]);

  function handleRetake() {
    setPhase("quiz");
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswered(false);
    setAnswers([]);
    setElapsed(0);
  }

  if (!topic || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <SectionCard data-ocid="quiz.empty_state">
          <p className="text-muted-foreground mb-4">
            {!topic
              ? "Topic not found."
              : "No questions available for your current audience level."}
          </p>
          <Link to="/learning-lab">
            <Button
              variant="outline"
              className="gap-2"
              aria-label="Back to Learning Lab"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Learning Lab
            </Button>
          </Link>
        </SectionCard>
      </div>
    );
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  if (phase === "results" || phase === "review") {
    const correctCount = answers.filter((a) => a.correct).length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div
        className="container mx-auto px-4 py-10 max-w-3xl"
        data-ocid="quiz.results.section"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SectionCard glowAccent={score >= 80} className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full border-4 ${
                  score >= 80
                    ? "border-emerald-400/50 bg-emerald-400/10"
                    : score >= 60
                      ? "border-amber-400/50 bg-amber-400/10"
                      : "border-rose-400/50 bg-rose-400/10"
                }`}
              >
                <Trophy
                  className={`h-9 w-9 ${score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-rose-400"}`}
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              {score}%
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              <ScoreGrade score={score} />
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {correctCount} of {totalQuestions} correct
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Time: {formatTime(finalElapsed)}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {topic.title}
              </span>
            </div>

            {/* Score breakdown bar */}
            <div className="relative h-3 rounded-full bg-muted/40 overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  score >= 80
                    ? "bg-emerald-400"
                    : score >= 60
                      ? "bg-amber-400"
                      : "bg-rose-400"
                }`}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={handleRetake}
                variant="outline"
                className="gap-2"
                data-ocid="quiz.results.retake_button"
                aria-label="Retake this quiz"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Retake Quiz
              </Button>
              <Button
                onClick={() =>
                  setPhase(phase === "review" ? "results" : "review")
                }
                variant="outline"
                className="gap-2"
                data-ocid="quiz.results.review_button"
                aria-label={
                  phase === "review"
                    ? "Hide answer review"
                    : "Review your answers"
                }
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {phase === "review" ? "Hide Review" : "Review Answers"}
              </Button>
              <Link to="/learning-lab">
                <Button
                  variant="default"
                  className="gap-2"
                  data-ocid="quiz.results.back_button"
                  aria-label="Return to Learning Lab"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Learning Lab
                </Button>
              </Link>
            </div>
          </SectionCard>

          {/* Review section */}
          <AnimatePresence>
            {phase === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
                data-ocid="quiz.review.list"
              >
                {questions.map((q, qi) => {
                  const record = answers[qi];
                  const wasCorrect = record?.correct ?? false;
                  const isOpen = reviewOpen[qi] ?? false;

                  return (
                    <SectionCard
                      key={q.id}
                      className={`border-l-4 ${wasCorrect ? "border-l-emerald-500" : "border-l-rose-500"}`}
                      data-ocid={`quiz.review.item.${qi + 1}`}
                    >
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-3 text-left"
                        onClick={() =>
                          setReviewOpen((prev) => ({
                            ...prev,
                            [qi]: !prev[qi],
                          }))
                        }
                        aria-expanded={isOpen}
                        aria-label={`Question ${qi + 1}: ${wasCorrect ? "Correct" : "Incorrect"} — ${q.question}`}
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          {wasCorrect ? (
                            <CheckCircle2
                              className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="h-4 w-4 text-rose-400 mt-0.5 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <span className="text-sm font-medium text-foreground leading-snug">
                            Q{qi + 1}. {q.question}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp
                            className="h-4 w-4 text-muted-foreground shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDown
                            className="h-4 w-4 text-muted-foreground shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      {isOpen && (
                        <div className="mt-3 pl-6 space-y-2">
                          {q.options.map((opt, oi) => (
                            <div
                              key={`${q.id}-opt-${oi}`}
                              className={[
                                "rounded-lg border px-3 py-2 text-sm",
                                oi === q.correctIndex
                                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                                  : record?.selectedIndex === oi && !wasCorrect
                                    ? "border-rose-500/50 bg-rose-500/10 text-rose-300"
                                    : "border-border text-muted-foreground",
                              ].join(" ")}
                            >
                              <span className="font-mono text-xs mr-2 opacity-60">
                                {oi + 1}.
                              </span>
                              {opt}
                              {oi === q.correctIndex && (
                                <Badge className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                  Correct
                                </Badge>
                              )}
                            </div>
                          ))}
                          <div className="rounded-lg bg-muted/30 border border-border px-3 py-2 text-xs text-muted-foreground italic mt-2">
                            {q.explanation}
                          </div>
                          {q.equation && (
                            <EquationBlock
                              latex={q.equation}
                              annotation={`Equation for: ${q.question}`}
                            />
                          )}
                        </div>
                      )}
                    </SectionCard>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── Quiz screen ─────────────────────────────────────────────────────────────
  const progressPct = (currentIndex / totalQuestions) * 100;

  return (
    <div
      className="container mx-auto px-4 py-10 max-w-2xl"
      data-ocid="quiz.section"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/learning-lab">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            data-ocid="quiz.back_button"
            aria-label="Back to Learning Lab"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Learning Lab
          </Button>
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span
            className="flex items-center gap-1"
            aria-label={`Elapsed time: ${formatTime(elapsed)}`}
          >
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {formatTime(elapsed)}
          </span>
          <span
            aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
          >
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="relative h-2 rounded-full bg-muted/40 overflow-hidden mb-6"
        data-ocid="quiz.progress_bar"
        aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
      >
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-primary rounded-full"
        />
      </div>

      {/* Topic label */}
      <div className="flex items-center gap-2 mb-6">
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {topic.title}
        </Badge>
        <Badge
          variant="outline"
          className="text-xs capitalize text-muted-foreground"
        >
          {currentQuestion.audience}
        </Badge>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <SectionCard className="mb-5">
            <p className="text-base font-medium text-foreground leading-relaxed mb-1">
              <span className="text-muted-foreground text-sm font-normal mr-2">
                Q{currentIndex + 1}.
              </span>
              {currentQuestion.question}
            </p>
            {currentQuestion.equation && !answered && (
              <EquationBlock
                latex={currentQuestion.equation}
                annotation={`Equation for question ${currentIndex + 1}`}
              />
            )}
          </SectionCard>

          {/* Options */}
          <div className="space-y-3 mb-6" data-ocid="quiz.options.list">
            {currentQuestion.options.map((option, oi) => {
              const optKey = `${currentQuestion.id}-${oi}`;
              const isSelected = selectedIndex === oi;
              const isCorrect = oi === currentQuestion.correctIndex;
              let stateClass =
                "border-border bg-card hover:border-primary/50 hover:bg-muted/30 cursor-pointer";
              if (answered) {
                if (isCorrect)
                  stateClass =
                    "border-emerald-500/60 bg-emerald-500/10 cursor-default";
                else if (isSelected && !isCorrect)
                  stateClass =
                    "border-rose-500/60 bg-rose-500/10 cursor-default";
                else
                  stateClass =
                    "border-border bg-card/60 cursor-default opacity-60";
              }

              return (
                <button
                  key={optKey}
                  type="button"
                  onClick={() => handleSelect(oi)}
                  disabled={answered}
                  data-ocid={`quiz.option.item.${oi + 1}`}
                  aria-label={`Option ${oi + 1}: ${option}${answered && isCorrect ? " (correct)" : ""}${answered && isSelected && !isCorrect ? " (your incorrect answer)" : ""}`}
                  className={[
                    "w-full rounded-xl border px-4 py-3.5 text-left transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    stateClass,
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-mono font-bold mt-0.5",
                        answered && isCorrect
                          ? "border-emerald-500 text-emerald-400 bg-emerald-500/20"
                          : answered && isSelected && !isCorrect
                            ? "border-rose-500 text-rose-400 bg-rose-500/20"
                            : isSelected
                              ? "border-primary text-primary bg-primary/10"
                              : "border-border text-muted-foreground",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {oi + 1}
                    </span>
                    <span className="text-sm text-foreground leading-relaxed">
                      {option}
                    </span>
                    {answered && isCorrect && (
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-400 ml-auto mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {answered && isSelected && !isCorrect && (
                      <XCircle
                        className="h-4 w-4 text-rose-400 ml-auto mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation (shown after answer) */}
          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SectionCard
                  className={`border-l-4 mb-5 ${
                    selectedIndex === currentQuestion.correctIndex
                      ? "border-l-emerald-500"
                      : "border-l-rose-500"
                  }`}
                  data-ocid="quiz.explanation.section"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Explanation
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.equation && (
                    <EquationBlock
                      latex={currentQuestion.equation}
                      annotation={`Equation for: ${currentQuestion.question}`}
                    />
                  )}
                </SectionCard>

                <Button
                  onClick={handleNext}
                  className="w-full gap-2"
                  data-ocid="quiz.next_button"
                  aria-label={
                    currentIndex + 1 >= totalQuestions
                      ? "See quiz results"
                      : "Next question"
                  }
                >
                  {currentIndex + 1 >= totalQuestions ? (
                    <>
                      See Results{" "}
                      <Trophy className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Next Question{" "}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Press <kbd className="bg-muted/60 rounded px-1">Enter</kbd> to
                  continue
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!answered && (
            <p className="text-center text-xs text-muted-foreground">
              Press <kbd className="bg-muted/60 rounded px-1">1</kbd>–
              <kbd className="bg-muted/60 rounded px-1">4</kbd> to select an
              answer
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
