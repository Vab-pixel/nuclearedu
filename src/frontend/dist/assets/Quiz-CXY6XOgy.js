import { d as createLucideIcon, K as useParams, u as useAppStore, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, m as motion, y as Clock, f as BookOpen, k as AnimatePresence, a as ChevronDown, b as Badge } from "./index-BllujZqD.js";
import { E as EquationBlock } from "./EquationBlock-DmXtXln_.js";
import { S as SectionCard } from "./SectionCard-BruuPt5P.js";
import { u as useLearningStore, q as quizTopics, T as Trophy, A as ArrowRight } from "./learningStore-CRA_ue_J.js";
import { R as RotateCcw } from "./rotate-ccw-BOFUVrcG.js";
import { C as CircleCheck } from "./circle-check-BesYm-yN.js";
import { C as ChevronUp } from "./chevron-up-CUcJa0Nz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const audienceMap = {
  public: "all",
  student: "intermediate",
  researcher: "advanced"
};
function ScoreGrade({ score }) {
  if (score >= 90)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: "Excellent!" });
  if (score >= 80)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: "Great job!" });
  if (score >= 70)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-bold", children: "Good effort!" });
  if (score >= 60)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-bold", children: "Keep studying!" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400 font-bold", children: "Keep practicing!" });
}
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function Quiz() {
  const { topicId } = useParams({ strict: false });
  const { setProgress, setSyncStatus } = useLearningStore();
  const { audienceLevel } = useAppStore();
  const topic = quizTopics.find((t) => t.id === topicId);
  const preferredAudience = audienceMap[audienceLevel];
  const questions = (topic == null ? void 0 : topic.questions.filter(
    (q) => preferredAudience === "all" || q.audience === preferredAudience
  )) ?? (topic == null ? void 0 : topic.questions) ?? [];
  const [phase, setPhase] = reactExports.useState("quiz");
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [selectedIndex, setSelectedIndex] = reactExports.useState(null);
  const [answered, setAnswered] = reactExports.useState(false);
  const [answers, setAnswers] = reactExports.useState([]);
  const [startTime] = reactExports.useState(Date.now());
  const [elapsed, setElapsed] = reactExports.useState(0);
  const [finalElapsed, setFinalElapsed] = reactExports.useState(0);
  const [reviewOpen, setReviewOpen] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (phase !== "quiz") return;
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - startTime) / 1e3)),
      1e3
    );
    return () => clearInterval(id);
  }, [phase, startTime]);
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const handleSelect = reactExports.useCallback(
    (optionIndex) => {
      if (answered || !currentQuestion) return;
      setSelectedIndex(optionIndex);
      setAnswered(true);
      setAnswers((prev) => [
        ...prev,
        {
          questionIndex: currentIndex,
          selectedIndex: optionIndex,
          correct: optionIndex === currentQuestion.correctIndex
        }
      ]);
    },
    [answered, currentQuestion, currentIndex]
  );
  const handleNext = reactExports.useCallback(() => {
    if (currentIndex + 1 >= totalQuestions) {
      const secs = Math.floor((Date.now() - startTime) / 1e3);
      setFinalElapsed(secs);
      const score = Math.round(
        answers.filter((a) => a.correct).length / totalQuestions * 100
      );
      const completedAt = (/* @__PURE__ */ new Date()).toISOString();
      setSyncStatus("saving");
      setProgress(topicId, (topic == null ? void 0 : topic.title) ?? topicId, {
        score,
        questionsAttempted: totalQuestions,
        dateTaken: completedAt,
        durationSeconds: secs
      });
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
    topic == null ? void 0 : topic.title,
    setProgress,
    setSyncStatus
  ]);
  reactExports.useEffect(() => {
    if (phase !== "quiz") return;
    function onKey(e) {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 max-w-2xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { "data-ocid": "quiz.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: !topic ? "Topic not found." : "No questions available for your current audience level." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/learning-lab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2",
          "aria-label": "Back to Learning Lab",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }),
            "Back to Learning Lab"
          ]
        }
      ) })
    ] }) });
  }
  if (phase === "results" || phase === "review") {
    const correctCount = answers.filter((a) => a.correct).length;
    const score = Math.round(correctCount / totalQuestions * 100);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-10 max-w-3xl",
        "data-ocid": "quiz.results.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.96 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { glowAccent: score >= 80, className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `flex h-20 w-20 items-center justify-center rounded-full border-4 ${score >= 80 ? "border-emerald-400/50 bg-emerald-400/10" : score >= 60 ? "border-amber-400/50 bg-amber-400/10" : "border-rose-400/50 bg-rose-400/10"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Trophy,
                      {
                        className: `h-9 w-9 ${score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-rose-400"}`,
                        "aria-hidden": "true"
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground mb-1", children: [
                  score,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreGrade, { score }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
                  correctCount,
                  " of ",
                  totalQuestions,
                  " correct"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                    "Time: ",
                    formatTime(finalElapsed)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                    topic.title
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-3 rounded-full bg-muted/40 overflow-hidden mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${score}%` },
                    transition: { duration: 0.8, ease: "easeOut" },
                    className: `h-full rounded-full ${score >= 80 ? "bg-emerald-400" : score >= 60 ? "bg-amber-400" : "bg-rose-400"}`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleRetake,
                      variant: "outline",
                      className: "gap-2",
                      "data-ocid": "quiz.results.retake_button",
                      "aria-label": "Retake this quiz",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4", "aria-hidden": "true" }),
                        "Retake Quiz"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: () => setPhase(phase === "review" ? "results" : "review"),
                      variant: "outline",
                      className: "gap-2",
                      "data-ocid": "quiz.results.review_button",
                      "aria-label": phase === "review" ? "Hide answer review" : "Review your answers",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4", "aria-hidden": "true" }),
                        phase === "review" ? "Hide Review" : "Review Answers"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/learning-lab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "default",
                      className: "gap-2",
                      "data-ocid": "quiz.results.back_button",
                      "aria-label": "Return to Learning Lab",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }),
                        "Learning Lab"
                      ]
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: phase === "review" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  transition: { duration: 0.3 },
                  className: "space-y-3",
                  "data-ocid": "quiz.review.list",
                  children: questions.map((q, qi) => {
                    const record = answers[qi];
                    const wasCorrect = (record == null ? void 0 : record.correct) ?? false;
                    const isOpen = reviewOpen[qi] ?? false;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      SectionCard,
                      {
                        className: `border-l-4 ${wasCorrect ? "border-l-emerald-500" : "border-l-rose-500"}`,
                        "data-ocid": `quiz.review.item.${qi + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              className: "flex w-full items-start justify-between gap-3 text-left",
                              onClick: () => setReviewOpen((prev) => ({
                                ...prev,
                                [qi]: !prev[qi]
                              })),
                              "aria-expanded": isOpen,
                              "aria-label": `Question ${qi + 1}: ${wasCorrect ? "Correct" : "Incorrect"} — ${q.question}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0", children: [
                                  wasCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    CircleCheck,
                                    {
                                      className: "h-4 w-4 text-emerald-400 mt-0.5 shrink-0",
                                      "aria-hidden": "true"
                                    }
                                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    CircleX,
                                    {
                                      className: "h-4 w-4 text-rose-400 mt-0.5 shrink-0",
                                      "aria-hidden": "true"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground leading-snug", children: [
                                    "Q",
                                    qi + 1,
                                    ". ",
                                    q.question
                                  ] })
                                ] }),
                                isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  ChevronUp,
                                  {
                                    className: "h-4 w-4 text-muted-foreground shrink-0",
                                    "aria-hidden": "true"
                                  }
                                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  ChevronDown,
                                  {
                                    className: "h-4 w-4 text-muted-foreground shrink-0",
                                    "aria-hidden": "true"
                                  }
                                )
                              ]
                            }
                          ),
                          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pl-6 space-y-2", children: [
                            q.options.map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: [
                                  "rounded-lg border px-3 py-2 text-sm",
                                  oi === q.correctIndex ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" : (record == null ? void 0 : record.selectedIndex) === oi && !wasCorrect ? "border-rose-500/50 bg-rose-500/10 text-rose-300" : "border-border text-muted-foreground"
                                ].join(" "),
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs mr-2 opacity-60", children: [
                                    oi + 1,
                                    "."
                                  ] }),
                                  opt,
                                  oi === q.correctIndex && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30", children: "Correct" })
                                ]
                              },
                              `${q.id}-opt-${oi}`
                            )),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/30 border border-border px-3 py-2 text-xs text-muted-foreground italic mt-2", children: q.explanation }),
                            q.equation && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              EquationBlock,
                              {
                                latex: q.equation,
                                annotation: `Equation for: ${q.question}`
                              }
                            )
                          ] })
                        ]
                      },
                      q.id
                    );
                  })
                },
                "review"
              ) })
            ]
          }
        )
      }
    );
  }
  const progressPct = currentIndex / totalQuestions * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-10 max-w-2xl",
      "data-ocid": "quiz.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/learning-lab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 text-muted-foreground hover:text-foreground",
              "data-ocid": "quiz.back_button",
              "aria-label": "Back to Learning Lab",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }),
                "Learning Lab"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-1",
                "aria-label": `Elapsed time: ${formatTime(elapsed)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                  formatTime(elapsed)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                "aria-label": `Question ${currentIndex + 1} of ${totalQuestions}`,
                children: [
                  currentIndex + 1,
                  " / ",
                  totalQuestions
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative h-2 rounded-full bg-muted/40 overflow-hidden mb-6",
            "data-ocid": "quiz.progress_bar",
            "aria-label": `Question ${currentIndex + 1} of ${totalQuestions}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { width: `${progressPct}%` },
                transition: { duration: 0.4 },
                className: "h-full bg-primary rounded-full"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs text-muted-foreground", children: topic.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs capitalize text-muted-foreground",
              children: currentQuestion.audience
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 24 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -24 },
            transition: { duration: 0.25 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-medium text-foreground leading-relaxed mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm font-normal mr-2", children: [
                    "Q",
                    currentIndex + 1,
                    "."
                  ] }),
                  currentQuestion.question
                ] }),
                currentQuestion.equation && !answered && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EquationBlock,
                  {
                    latex: currentQuestion.equation,
                    annotation: `Equation for question ${currentIndex + 1}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", "data-ocid": "quiz.options.list", children: currentQuestion.options.map((option, oi) => {
                const optKey = `${currentQuestion.id}-${oi}`;
                const isSelected = selectedIndex === oi;
                const isCorrect = oi === currentQuestion.correctIndex;
                let stateClass = "border-border bg-card hover:border-primary/50 hover:bg-muted/30 cursor-pointer";
                if (answered) {
                  if (isCorrect)
                    stateClass = "border-emerald-500/60 bg-emerald-500/10 cursor-default";
                  else if (isSelected && !isCorrect)
                    stateClass = "border-rose-500/60 bg-rose-500/10 cursor-default";
                  else
                    stateClass = "border-border bg-card/60 cursor-default opacity-60";
                }
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSelect(oi),
                    disabled: answered,
                    "data-ocid": `quiz.option.item.${oi + 1}`,
                    "aria-label": `Option ${oi + 1}: ${option}${answered && isCorrect ? " (correct)" : ""}${answered && isSelected && !isCorrect ? " (your incorrect answer)" : ""}`,
                    className: [
                      "w-full rounded-xl border px-4 py-3.5 text-left transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                      stateClass
                    ].join(" "),
                    "aria-pressed": isSelected,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: [
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-mono font-bold mt-0.5",
                            answered && isCorrect ? "border-emerald-500 text-emerald-400 bg-emerald-500/20" : answered && isSelected && !isCorrect ? "border-rose-500 text-rose-400 bg-rose-500/20" : isSelected ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"
                          ].join(" "),
                          "aria-hidden": "true",
                          children: oi + 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground leading-relaxed", children: option }),
                      answered && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleCheck,
                        {
                          className: "h-4 w-4 text-emerald-400 ml-auto mt-0.5 shrink-0",
                          "aria-hidden": "true"
                        }
                      ),
                      answered && isSelected && !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleX,
                        {
                          className: "h-4 w-4 text-rose-400 ml-auto mt-0.5 shrink-0",
                          "aria-hidden": "true"
                        }
                      )
                    ] })
                  },
                  optKey
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: answered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.3 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      SectionCard,
                      {
                        className: `border-l-4 mb-5 ${selectedIndex === currentQuestion.correctIndex ? "border-l-emerald-500" : "border-l-rose-500"}`,
                        "data-ocid": "quiz.explanation.section",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Explanation" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: currentQuestion.explanation }),
                          currentQuestion.equation && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            EquationBlock,
                            {
                              latex: currentQuestion.equation,
                              annotation: `Equation for: ${currentQuestion.question}`
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        onClick: handleNext,
                        className: "w-full gap-2",
                        "data-ocid": "quiz.next_button",
                        "aria-label": currentIndex + 1 >= totalQuestions ? "See quiz results" : "Next question",
                        children: currentIndex + 1 >= totalQuestions ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          "See Results",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4", "aria-hidden": "true" })
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          "Next Question",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-2", children: [
                      "Press ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-muted/60 rounded px-1", children: "Enter" }),
                      " to continue"
                    ] })
                  ]
                }
              ) }),
              !answered && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                "Press ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-muted/60 rounded px-1", children: "1" }),
                "–",
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "bg-muted/60 rounded px-1", children: "4" }),
                " to select an answer"
              ] })
            ]
          },
          currentIndex
        ) })
      ]
    }
  );
}
export {
  Quiz as default
};
