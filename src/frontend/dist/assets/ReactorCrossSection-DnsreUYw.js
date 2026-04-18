import { a0 as isEasingArray, a1 as VisualElement, a2 as createBox, a3 as useConstant, a4 as motionValue, r as reactExports, a5 as MotionConfigContext, a6 as resolveElements, a7 as mixNumber, a8 as removeItem, a9 as isMotionValue, aa as defaultOffset, ab as createGeneratorEasing, ac as fillOffset, ad as isGenerator, ae as secondsToMilliseconds, af as progress, ag as isSVGElement, ah as isSVGSVGElement, ai as SVGVisualElement, aj as HTMLVisualElement, ak as visualElementStore, al as animateSingleValue, am as animateTarget, an as spring, j as jsxRuntimeExports, b as Badge, B as Button } from "./index-jNE18aF1.js";
import { u as useReducedMotion, S as Slider } from "./slider-nJZZ75ah.js";
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
function getEasingForSegment(easing, i) {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
class GroupAnimation {
  constructor(animations) {
    this.stop = () => this.runAll("stop");
    this.animations = animations.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => animation.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline) {
    const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time) {
    this.setAll("time", time);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return getMax(this.animations, "duration");
  }
  get iterationDuration() {
    return getMax(this.animations, "iterationDuration");
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function getMax(animations, propName) {
  let max = 0;
  for (let i = 0; i < animations.length; i++) {
    const value = animations[i][propName];
    if (value !== null && value > max) {
      max = value;
    }
  }
  return max;
}
class GroupAnimationWithThen extends GroupAnimation {
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
}
function isObjectKey(key, object) {
  return key in object;
}
class ObjectVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return void 0;
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, { output }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function isDOMKeyframes(keyframes) {
  return typeof keyframes === "object" && !Array.isArray(keyframes);
}
function resolveSubjects(subject, keyframes, scope, selectorCache) {
  if (subject == null) {
    return [];
  }
  if (typeof subject === "string" && isDOMKeyframes(keyframes)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject.filter((s) => s != null);
  } else {
    return [subject];
  }
}
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
  return duration * (repeat + 1);
}
function calcNextTime(current, next, prev, labels) {
  if (typeof next === "number") {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else if (next.startsWith("<")) {
    return Math.max(0, prev + parseFloat(next.slice(1)));
  } else {
    return labels.get(next) ?? current;
  }
}
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      removeItem(sequence, keyframe);
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes.length; i++) {
    sequence.push({
      value: keyframes[i],
      at: mixNumber(startTime, endTime, offset[i]),
      easing: getEasingForSegment(easing, i)
    });
  }
}
function normalizeTimes(times, repeat) {
  for (let i = 0; i < times.length; i++) {
    times[i] = times[i] / (repeat + 1);
  }
}
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null)
      return 1;
    if (b.value === null)
      return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}
const defaultSegmentEasing = "easeInOut";
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = /* @__PURE__ */ new Map();
  const sequences = /* @__PURE__ */ new Map();
  const elementCache = {};
  const timeLabels = /* @__PURE__ */ new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes, transition = {}] = segment;
    if (transition.at !== void 0) {
      currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
    }
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const { delay = 0, times = defaultOffset(valueKeyframesAsList), type = defaultTransition.type || "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
      let { ease = defaultTransition.ease || "easeOut", duration } = valueTransition;
      const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = isGenerator(type) ? type : generators == null ? void 0 : generators[type || "keyframes"];
      if (numKeyframes <= 2 && createGenerator) {
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = {
          ...defaultTransition,
          ...remainingTransition
        };
        if (duration !== void 0) {
          springTransition.duration = secondsToMilliseconds(duration);
        }
        const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
        ease = springEasing.ease;
        duration = springEasing.duration;
      }
      duration ?? (duration = defaultDuration);
      const startTime = currentTime + calculatedDelay;
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && fillOffset(times, remainder);
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      if (repeat) {
        duration = calculateRepeatDuration(duration, repeat);
        const originalKeyframes = [...valueKeyframesAsList];
        const originalTimes = [...times];
        ease = Array.isArray(ease) ? [...ease] : [ease];
        const originalEase = [...ease];
        for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
          valueKeyframesAsList.push(...originalKeyframes);
          for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
            times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
            ease.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
          }
        }
        normalizeTimes(times, repeat);
      }
      const targetTime = startTime + duration;
      addKeyframes(valueSequence, valueKeyframesAsList, ease, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if (isMotionValue(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = resolveSubjects(subject, keyframes, scope, elementCache);
      const numSubjects = subjects.length;
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        keyframes = keyframes;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes) {
          resolveValueSequence(keyframes[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      valueSequence.sort(compareByTime);
      const keyframes = [];
      const valueOffset = [];
      const valueEasing = [];
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i];
        keyframes.push(value);
        valueOffset.push(progress(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes.unshift(keyframes[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes;
      const { type: _type, ...remainingDefaultTransition } = defaultTransition;
      definition.transition[key] = {
        ...remainingDefaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name])
    sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes) {
  return Array.isArray(keyframes) ? keyframes : [keyframes];
}
function getValueTransition(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : { ...transition };
}
const isNumber = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes) => keyframes.every(isNumber);
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}
function isSingleValue(subject, keyframes) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes);
}
function animateSubject(subject, keyframes, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes)) {
    animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes) ? keyframes.default || keyframes : keyframes, options ? options.default || options : options));
  } else {
    if (subject == null) {
      return animations;
    }
    const subjects = resolveSubjects(subject, keyframes, scope);
    const numSubjects = subjects.length;
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...animateTarget(visualElement, { ...keyframes, transition }, {}));
    }
  }
  return animations;
}
function animateSequence(sequence, options, scope) {
  const animations = [];
  const processedSequence = sequence.map((segment) => {
    if (Array.isArray(segment) && typeof segment[0] === "function") {
      const callback = segment[0];
      const mv = motionValue(0);
      mv.on("change", callback);
      if (segment.length === 1) {
        return [mv, [0, 1]];
      } else if (segment.length === 2) {
        return [mv, [0, 1], segment[1]];
      } else {
        return [mv, segment[1], segment[2]];
      }
    }
    return segment;
  });
  const animationDefinitions = createAnimationsFromSequence(processedSequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes, transition));
  });
  return animations;
}
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(options = {}) {
  const { scope, reduceMotion } = options;
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options2) {
    let animations = [];
    let animationOnComplete;
    if (isSequence(subjectOrSequence)) {
      const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSequence(subjectOrSequence, reduceMotion !== void 0 ? { reduceMotion, ...sequenceOptions } : sequenceOptions, scope);
    } else {
      const { onComplete, ...rest } = options2 || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations = animateSubject(subjectOrSequence, optionsOrKeyframes, reduceMotion !== void 0 ? { reduceMotion, ...rest } : rest, scope);
    }
    const animation = new GroupAnimationWithThen(animations);
    if (animationOnComplete) {
      animation.finished.then(animationOnComplete);
    }
    if (scope) {
      scope.animations.push(animation);
      animation.finished.then(() => {
        removeItem(scope.animations, animation);
      });
    }
    return animation;
  }
  return scopedAnimate;
}
const animate = createScopedAnimate();
function getPowerState(insertion) {
  if (insertion < 30) {
    return {
      label: "HIGH",
      color: "bg-red-500/20 border-red-500/40",
      textColor: "text-red-400",
      description: "Control rods withdrawn — high neutron flux, maximum heat generation"
    };
  }
  if (insertion < 70) {
    return {
      label: "NORMAL",
      color: "bg-emerald-500/20 border-emerald-500/40",
      textColor: "text-emerald-400",
      description: "Partial rod insertion — controlled chain reaction at rated power"
    };
  }
  return {
    label: "LOW / SHUTDOWN",
    color: "bg-blue-500/20 border-blue-500/40",
    textColor: "text-blue-400",
    description: "Rods fully inserted — chain reaction suppressed, decay heat only"
  };
}
function getPWRTemps(insertion) {
  const t = insertion / 100;
  const inlet = Math.round(295 - t * 25);
  const outlet = Math.round(330 - t * 25);
  return { inlet, outlet };
}
function CoolantPath({
  d,
  color,
  animate: shouldAnimate
}) {
  const dashOffset = useMotionValue(0);
  const pathRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!shouldAnimate) {
      dashOffset.set(0);
      return;
    }
    const controls = animate(dashOffset, -200, {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear"
    });
    return () => controls.stop();
  }, [shouldAnimate, dashOffset]);
  reactExports.useEffect(() => {
    if (pathRef.current) {
      return dashOffset.on("change", (v) => {
        if (pathRef.current) pathRef.current.style.strokeDashoffset = String(v);
      });
    }
  }, [dashOffset]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      ref: pathRef,
      d,
      fill: "none",
      stroke: color,
      strokeWidth: "3",
      strokeDasharray: "10 6",
      strokeDashoffset: "0",
      opacity: "0.75"
    }
  );
}
function FuelRods({
  x,
  y,
  width,
  height
}) {
  const cols = 4;
  const rows = 5;
  const rodW = (width - 10) / cols - 3;
  const rodH = (height - 10) / rows - 3;
  const rods = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) rods.push({ r, c });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: rods.map(({ r, c }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "rect",
    {
      x: x + 5 + c * (rodW + 3),
      y: y + 5 + r * (rodH + 3),
      width: rodW,
      height: rodH,
      rx: 1.5,
      fill: "#fbbf24",
      opacity: 0.88
    },
    `rod-${r}-${c}`
  )) });
}
function PWRDiagram({
  insertion,
  showLabels,
  shouldAnimate
}) {
  const V_W = 600;
  const V_H = 420;
  const PV_X = 60;
  const PV_Y = 40;
  const PV_W = 280;
  const PV_H = 340;
  const CORE_X = PV_X + 30;
  const CORE_Y = PV_Y + 60;
  const CORE_W = 140;
  const CORE_H = 200;
  const MAX_ROD_H = CORE_H * 0.85;
  const rodH = insertion / 100 * MAX_ROD_H;
  const rodW = 10;
  const numRods = 4;
  const rodSpacing = CORE_W / (numRods + 1);
  const SG_X = PV_X + PV_W + 30;
  const SG_Y = PV_Y + 40;
  const SG_W = 90;
  const SG_H = 200;
  const PRESS_X = PV_X + PV_W / 2 - 20;
  const PRESS_Y = PV_Y - 50;
  const PRESS_W = 40;
  const PRESS_H = 40;
  const hotLeg = `M ${PV_X + PV_W} ${PV_Y + 80} C ${PV_X + PV_W + 20} ${PV_Y + 80} ${SG_X} ${SG_Y + 40} ${SG_X} ${SG_Y + 40}`;
  const coldLeg = `M ${SG_X} ${SG_Y + SG_H - 40} C ${SG_X} ${SG_Y + SG_H} ${PV_X + PV_W + 20} ${PV_Y + PV_H - 60} ${PV_X + PV_W} ${PV_Y + PV_H - 60}`;
  const powerColor = insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const power = getPowerState(insertion);
  const temps = getPWRTemps(insertion);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${V_W} ${V_H}`,
      width: "100%",
      style: { aspectRatio: `${V_W} / ${V_H}`, display: "block" },
      role: "img",
      "aria-label": "Simplified PWR cross-section with animated coolant flow",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Pressurized Water Reactor Cross-Section (Schematic)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: V_W, height: V_H, fill: "transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: PV_X - 4,
            y: PV_Y - 4,
            width: PV_W + 8,
            height: PV_H + 8,
            rx: 15,
            fill: "none",
            stroke: "#374151",
            strokeWidth: 1,
            opacity: 0.4
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: PV_X,
            y: PV_Y,
            width: PV_W,
            height: PV_H,
            rx: 12,
            fill: "#111827",
            stroke: "#6b7280",
            strokeWidth: 2.5
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PV_X + 4,
            y: PV_Y - 9,
            fill: "#9ca3af",
            fontSize: "11",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Pressure Vessel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CORE_X,
            y: CORE_Y,
            width: CORE_W,
            height: CORE_H,
            rx: 5,
            fill: "#fbbf2410",
            stroke: "#fbbf2450",
            strokeWidth: 1.5
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W / 2,
            y: CORE_Y + CORE_H + 18,
            textAnchor: "middle",
            fill: "#fbbf24",
            fontSize: "10",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Reactor Core"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FuelRods,
          {
            x: CORE_X + 5,
            y: CORE_Y + 10,
            width: CORE_W - 10,
            height: CORE_H - 20
          }
        ),
        Array.from({ length: numRods }, (_, i) => {
          const rx = CORE_X + rodSpacing * (i + 1) - rodW / 2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x: rx - 1,
                y: CORE_Y - 12,
                width: rodW + 2,
                height: 14,
                rx: 2,
                fill: "#1f2937",
                stroke: "#4b5563",
                strokeWidth: 0.8,
                opacity: 0.7
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x: rx,
                y: CORE_Y,
                width: rodW,
                height: rodH,
                rx: 2,
                fill: "#374151",
                stroke: "#6b7280",
                strokeWidth: 1,
                opacity: 0.95
              }
            )
          ] }, `pwr-ctrl-rx${rx.toFixed(0)}`);
        }),
        showLabels && rodH > 10 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W / 2,
            y: CORE_Y - 16,
            textAnchor: "middle",
            fill: "#9ca3af",
            fontSize: "10",
            fontFamily: "sans-serif",
            children: "Control Rods"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: PRESS_X,
            y: PRESS_Y,
            width: PRESS_W,
            height: PRESS_H,
            rx: 7,
            fill: "#1d4ed820",
            stroke: "#3b82f6",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PRESS_X + PRESS_W / 2,
            y1: PRESS_Y + PRESS_H,
            x2: PRESS_X + PRESS_W / 2,
            y2: PV_Y,
            stroke: "#3b82f640",
            strokeWidth: 4
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PRESS_X + PRESS_W / 2,
            y: PRESS_Y - 7,
            textAnchor: "middle",
            fill: "#60a5fa",
            fontSize: "10",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Pressurizer"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: SG_X,
            y: SG_Y,
            width: SG_W,
            height: SG_H,
            rx: 8,
            fill: "#581c8720",
            stroke: "#a855f7",
            strokeWidth: 1.5
          }
        ),
        [20, 52, 84, 116, 148].map((yOff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: SG_X + 12,
            y1: SG_Y + yOff,
            x2: SG_X + SG_W - 12,
            y2: SG_Y + yOff,
            stroke: "#a855f730",
            strokeWidth: 4,
            strokeLinecap: "round"
          },
          `sg-${yOff}`
        )),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: SG_X + SG_W / 2,
              y: SG_Y - 9,
              textAnchor: "middle",
              fill: "#c084fc",
              fontSize: "10",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "Steam Generator"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: SG_X + SG_W / 2,
              y: SG_Y + SG_H + 16,
              textAnchor: "middle",
              fill: "#9ca3af",
              fontSize: "9",
              fontFamily: "sans-serif",
              children: "→ to turbine"
            }
          )
        ] }),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: hotLeg, color: "#f87171", animate: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: coldLeg, color: "#60a5fa", animate: true })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: hotLeg,
              fill: "none",
              stroke: "#f87171",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: coldLeg,
              fill: "none",
              stroke: "#60a5fa",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          )
        ] }),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: PV_X + PV_W + 8,
              y: PV_Y + 68,
              fill: "#f87171",
              fontSize: "8.5",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "hot leg →"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: PV_X + PV_W + 8,
              y: PV_Y + PV_H - 48,
              fill: "#60a5fa",
              fontSize: "8.5",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "← cold leg"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: V_W - 124,
            y: 18,
            width: 108,
            height: 58,
            rx: 9,
            fill: "#0d111888",
            stroke: powerColor,
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: V_W - 70,
            y: 36,
            textAnchor: "middle",
            fill: "#9ca3af",
            fontSize: "8.5",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
            children: "POWER OUTPUT"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: V_W - 70,
            y: 58,
            textAnchor: "middle",
            fill: powerColor,
            fontSize: "13",
            fontWeight: "bold",
            fontFamily: "monospace",
            children: power.label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: PV_X,
            y: V_H - 80,
            width: 115,
            height: 60,
            rx: 8,
            fill: "#0d111888",
            stroke: "#374151",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PV_X + 8,
            y: V_H - 63,
            fill: "#9ca3af",
            fontSize: "8",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
            children: "COOLANT TEMPS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: PV_X + 8,
            y: V_H - 48,
            fill: "#60a5fa",
            fontSize: "9",
            fontFamily: "monospace",
            children: [
              "In: ",
              temps.inlet,
              "°C"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: PV_X + 8,
            y: V_H - 34,
            fill: "#f87171",
            fontSize: "9",
            fontFamily: "monospace",
            children: [
              "Out: ",
              temps.outlet,
              "°C"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PV_X,
            y: V_H - 10,
            fill: "#4b5563",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "Schematic only — not to scale, not for operational use"
          }
        )
      ]
    }
  );
}
function BWRDiagram({
  insertion,
  showLabels,
  shouldAnimate
}) {
  const V_W = 600;
  const V_H = 420;
  const RPV_X = 80;
  const RPV_Y = 50;
  const RPV_W = 260;
  const RPV_H = 300;
  const CORE_X = RPV_X + 40;
  const CORE_Y = RPV_Y + 120;
  const CORE_W = 130;
  const CORE_H = 120;
  const MAX_ROD_H = CORE_H * 0.85;
  const rodH = insertion / 100 * MAX_ROD_H;
  const rodW = 10;
  const numRods = 4;
  const rodSpacing = CORE_W / (numRods + 1);
  const SEP_X = RPV_X + 30;
  const SEP_Y = RPV_Y + 30;
  const SEP_W = RPV_W - 60;
  const SEP_H = 60;
  const POOL_X = RPV_X - 20;
  const POOL_Y = RPV_Y + RPV_H + 20;
  const POOL_W = RPV_W + 40;
  const POOL_H = 50;
  const TURB_X = RPV_X + RPV_W + 40;
  const TURB_Y = RPV_Y + 30;
  const TURB_W = 110;
  const TURB_H = 60;
  const steamLine = `M ${RPV_X + RPV_W / 2} ${RPV_Y} L ${RPV_X + RPV_W / 2} ${RPV_Y - 20} L ${TURB_X} ${TURB_Y + TURB_H / 2}`;
  const condensateLine = `M ${TURB_X + TURB_W} ${TURB_Y + TURB_H} C ${TURB_X + TURB_W + 20} ${TURB_Y + TURB_H + 40} ${RPV_X + RPV_W} ${RPV_Y + RPV_H - 30} ${RPV_X + RPV_W} ${RPV_Y + RPV_H - 30}`;
  const powerColor = insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const power = getPowerState(insertion);
  const temps = getPWRTemps(insertion);
  const bwrInlet = Math.round(temps.inlet - 10);
  const bwrOutlet = Math.round(temps.outlet - 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${V_W} ${V_H}`,
      width: "100%",
      style: { aspectRatio: `${V_W} / ${V_H}`, display: "block" },
      role: "img",
      "aria-label": "Simplified BWR cross-section diagram",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Boiling Water Reactor Cross-Section (Schematic)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: V_W, height: V_H, fill: "transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: RPV_X,
            y: RPV_Y,
            width: RPV_W,
            height: RPV_H,
            rx: 12,
            fill: "#111827",
            stroke: "#6b7280",
            strokeWidth: 2.5
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: RPV_X + 4,
            y: RPV_Y - 9,
            fill: "#9ca3af",
            fontSize: "11",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Reactor Pressure Vessel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: SEP_X,
            y: SEP_Y,
            width: SEP_W,
            height: SEP_H,
            rx: 5,
            fill: "#7dd3fc18",
            stroke: "#7dd3fc50",
            strokeWidth: 1.5,
            strokeDasharray: "4 2"
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: SEP_X + SEP_W / 2,
            y: SEP_Y + SEP_H / 2 + 4,
            textAnchor: "middle",
            fill: "#7dd3fc",
            fontSize: "9",
            fontFamily: "sans-serif",
            children: "Steam Separator / Dryer"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CORE_X,
            y: CORE_Y,
            width: CORE_W,
            height: CORE_H,
            rx: 5,
            fill: "#fbbf2410",
            stroke: "#fbbf2450",
            strokeWidth: 1.5
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W / 2,
            y: CORE_Y + CORE_H + 16,
            textAnchor: "middle",
            fill: "#fbbf24",
            fontSize: "10",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Reactor Core"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FuelRods,
          {
            x: CORE_X + 5,
            y: CORE_Y + 5,
            width: CORE_W - 10,
            height: CORE_H - 10
          }
        ),
        Array.from({ length: numRods }, (_, i) => {
          const rx = CORE_X + rodSpacing * (i + 1) - rodW / 2;
          const ry = CORE_Y + CORE_H - rodH;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("g", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: rx,
              y: ry,
              width: rodW,
              height: rodH,
              rx: 2,
              fill: "#374151",
              stroke: "#6b7280",
              strokeWidth: 1,
              opacity: 0.95
            }
          ) }, `bwr-ctrl-rx${rx.toFixed(0)}`);
        }),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W / 2,
            y: CORE_Y + CORE_H + 30,
            textAnchor: "middle",
            fill: "#9ca3af",
            fontSize: "9",
            fontFamily: "sans-serif",
            children: "↑ Control Rods (bottom-entry)"
          }
        ),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: steamLine, color: "#7dd3fc", animate: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: steamLine,
            fill: "none",
            stroke: "#7dd3fc",
            strokeWidth: 3,
            strokeDasharray: "10 6",
            opacity: 0.75
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: RPV_X + RPV_W / 2 + 8,
            y: RPV_Y - 24,
            fill: "#7dd3fc",
            fontSize: "8.5",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Steam →"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: TURB_X,
            y: TURB_Y,
            width: TURB_W,
            height: TURB_H,
            rx: 8,
            fill: "#0f172a",
            stroke: "#7dd3fc",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: TURB_X + TURB_W / 2,
            y: TURB_Y + 22,
            textAnchor: "middle",
            fill: "#7dd3fc",
            fontSize: "10",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Turbine /"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: TURB_X + TURB_W / 2,
            y: TURB_Y + 36,
            textAnchor: "middle",
            fill: "#7dd3fc",
            fontSize: "10",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Generator"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: TURB_X + TURB_W / 2,
            y: TURB_Y + 52,
            textAnchor: "middle",
            fill: "#4b5563",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "(direct cycle)"
          }
        ),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: condensateLine, color: "#60a5fa", animate: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: condensateLine,
            fill: "none",
            stroke: "#60a5fa",
            strokeWidth: 3,
            strokeDasharray: "10 6",
            opacity: 0.75
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: TURB_X + TURB_W + 8,
            y: TURB_Y + TURB_H + 14,
            fill: "#60a5fa",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "← Condensate return"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: POOL_X,
            y: POOL_Y,
            width: POOL_W,
            height: POOL_H,
            rx: 8,
            fill: "#1e3a5f",
            stroke: "#3b82f6",
            strokeWidth: 1.5
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: POOL_X + POOL_W / 2,
            y: POOL_Y + POOL_H / 2 + 4,
            textAnchor: "middle",
            fill: "#60a5fa",
            fontSize: "10",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Suppression Pool (Wetwell)"
          }
        ),
        [0.3, 0.7].map((frac) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: RPV_X + frac * RPV_W,
            y1: RPV_Y + RPV_H,
            x2: POOL_X + frac * POOL_W,
            y2: POOL_Y,
            stroke: "#3b82f650",
            strokeWidth: 6
          },
          `vent-${frac}`
        )),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: POOL_X + POOL_W / 2,
            y: POOL_Y - 6,
            textAnchor: "middle",
            fill: "#4b5563",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "↓ Emergency vent lines"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: V_W - 124,
            y: 18,
            width: 108,
            height: 58,
            rx: 9,
            fill: "#0d111888",
            stroke: powerColor,
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: V_W - 70,
            y: 36,
            textAnchor: "middle",
            fill: "#9ca3af",
            fontSize: "8.5",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
            children: "POWER OUTPUT"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: V_W - 70,
            y: 58,
            textAnchor: "middle",
            fill: powerColor,
            fontSize: "13",
            fontWeight: "bold",
            fontFamily: "monospace",
            children: power.label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: TURB_X,
            y: TURB_Y + TURB_H + 30,
            width: 115,
            height: 55,
            rx: 8,
            fill: "#0d111888",
            stroke: "#374151",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: TURB_X + 8,
            y: TURB_Y + TURB_H + 47,
            fill: "#9ca3af",
            fontSize: "8",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
            children: "COOLANT TEMPS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: TURB_X + 8,
            y: TURB_Y + TURB_H + 62,
            fill: "#60a5fa",
            fontSize: "9",
            fontFamily: "monospace",
            children: [
              "In: ",
              bwrInlet,
              "°C"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: TURB_X + 8,
            y: TURB_Y + TURB_H + 76,
            fill: "#f87171",
            fontSize: "9",
            fontFamily: "monospace",
            children: [
              "Out: ",
              bwrOutlet,
              "°C (steam)"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: RPV_X,
            y: V_H - 10,
            fill: "#4b5563",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "Schematic only — not to scale, not for operational use"
          }
        )
      ]
    }
  );
}
function CANDUDiagram({
  insertion,
  showLabels,
  shouldAnimate
}) {
  const V_W = 600;
  const V_H = 420;
  const CAL_X = 60;
  const CAL_Y = 100;
  const CAL_W = 320;
  const CAL_H = 180;
  const numTubes = 7;
  const tubeSpacing = CAL_H / (numTubes + 1);
  const SG_X = CAL_X + CAL_W + 40;
  const SG_Y = CAL_Y + 20;
  const SG_W = 80;
  const SG_H = 140;
  const ARM_X = CAL_X - 60;
  const ARM_Y = CAL_Y + CAL_H / 2 - 10;
  const ARM_W = 55;
  const ARM_H = 20;
  const ARM2_X = CAL_X + CAL_W;
  const ARM2_Y = ARM_Y;
  const ARM2_W = 55;
  const ARM2_H = 20;
  const coolantLoop = `M ${CAL_X + CAL_W} ${CAL_Y + CAL_H / 2} C ${CAL_X + CAL_W + 20} ${CAL_Y + CAL_H / 2} ${SG_X} ${SG_Y + 30} ${SG_X} ${SG_Y + 30}`;
  const returnLoop = `M ${SG_X} ${SG_Y + SG_H - 30} C ${SG_X} ${SG_Y + SG_H} ${CAL_X + CAL_W + 20} ${CAL_Y + CAL_H - 20} ${CAL_X + CAL_W} ${CAL_Y + CAL_H - 20}`;
  const powerColor = insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const power = getPowerState(insertion);
  const temps = getPWRTemps(insertion);
  const canduInlet = Math.round(temps.inlet - 15);
  const canduOutlet = Math.round(temps.outlet - 15);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${V_W} ${V_H}`,
      width: "100%",
      style: { aspectRatio: `${V_W} / ${V_H}`, display: "block" },
      role: "img",
      "aria-label": "Simplified CANDU reactor cross-section diagram",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "CANDU Reactor Cross-Section (Schematic)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: V_W, height: V_H, fill: "transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CAL_X,
            y: CAL_Y,
            width: CAL_W,
            height: CAL_H,
            rx: 10,
            fill: "#111827",
            stroke: "#6b7280",
            strokeWidth: 2.5
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: CAL_X + 4,
              y: CAL_Y - 9,
              fill: "#9ca3af",
              fontSize: "11",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "Calandria Vessel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: CAL_X + CAL_W / 2,
              y: CAL_Y + CAL_H + 18,
              textAnchor: "middle",
              fill: "#22d3ee",
              fontSize: "9",
              fontFamily: "sans-serif",
              children: "Heavy Water Moderator (D₂O)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CAL_X + 2,
            y: CAL_Y + 2,
            width: CAL_W - 4,
            height: CAL_H - 4,
            rx: 9,
            fill: "#0e7490",
            opacity: 0.08
          }
        ),
        Array.from({ length: numTubes }, (_, i) => {
          const ty = CAL_Y + tubeSpacing * (i + 1);
          const isFueled = i < 5;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: CAL_X,
                y1: ty,
                x2: CAL_X + CAL_W,
                y2: ty,
                stroke: isFueled ? "#fbbf24" : "#4b5563",
                strokeWidth: isFueled ? 7 : 5,
                strokeLinecap: "round",
                opacity: 0.85
              }
            ),
            isFueled && Array.from({ length: 4 }, (__, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: CAL_X + CAL_W / 5 * (j + 1),
                cy: ty,
                r: 4,
                fill: "#fbbf24",
                opacity: 0.9
              },
              `bundle-cx${Math.round(CAL_X + CAL_W / 5 * (j + 1))}-ty${Math.round(ty)}`
            ))
          ] }, `tube-ty${Math.round(CAL_Y + tubeSpacing * (i + 1))}`);
        }),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CAL_X + CAL_W / 2,
            y: CAL_Y + tubeSpacing - 6,
            textAnchor: "middle",
            fill: "#fbbf24",
            fontSize: "9",
            fontFamily: "sans-serif",
            children: "← Pressure Tube + Fuel Bundles (UO₂, natural U) →"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: ARM_X,
            y: ARM_Y,
            width: ARM_W,
            height: ARM_H,
            rx: 5,
            fill: "#1f293780",
            stroke: "#4ade80",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: ARM2_X,
            y: ARM2_Y,
            width: ARM2_W,
            height: ARM2_H,
            rx: 5,
            fill: "#1f293780",
            stroke: "#4ade80",
            strokeWidth: 1.5
          }
        ),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: ARM_X + ARM_W / 2,
              y: ARM_Y - 7,
              textAnchor: "middle",
              fill: "#4ade80",
              fontSize: "8.5",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "Fueling"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: ARM_X + ARM_W / 2,
              y: ARM_Y + ARM_H + 12,
              textAnchor: "middle",
              fill: "#4ade80",
              fontSize: "7.5",
              fontFamily: "sans-serif",
              children: "Machine A"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: ARM2_X + ARM2_W / 2,
              y: ARM2_Y - 7,
              textAnchor: "middle",
              fill: "#4ade80",
              fontSize: "8.5",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "Fueling"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: ARM2_X + ARM2_W / 2,
              y: ARM2_Y + ARM2_H + 12,
              textAnchor: "middle",
              fill: "#4ade80",
              fontSize: "7.5",
              fontFamily: "sans-serif",
              children: "Machine B"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: CAL_X + CAL_W / 2,
              y: CAL_Y + CAL_H + 32,
              textAnchor: "middle",
              fill: "#4ade80",
              fontSize: "8.5",
              fontFamily: "sans-serif",
              children: "↕ Online refueling — no shutdown required"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: SG_X,
            y: SG_Y,
            width: SG_W,
            height: SG_H,
            rx: 8,
            fill: "#581c8720",
            stroke: "#a855f7",
            strokeWidth: 1.5
          }
        ),
        [15, 40, 65, 90, 115].map((yOff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: SG_X + 10,
            y1: SG_Y + yOff,
            x2: SG_X + SG_W - 10,
            y2: SG_Y + yOff,
            stroke: "#a855f730",
            strokeWidth: 4,
            strokeLinecap: "round"
          },
          `candu-sg-${yOff}`
        )),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: SG_X + SG_W / 2,
              y: SG_Y - 9,
              textAnchor: "middle",
              fill: "#c084fc",
              fontSize: "10",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "Steam Generator"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: SG_X + SG_W / 2,
              y: SG_Y + SG_H + 16,
              textAnchor: "middle",
              fill: "#9ca3af",
              fontSize: "9",
              fontFamily: "sans-serif",
              children: "→ to turbine"
            }
          )
        ] }),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: coolantLoop, color: "#f87171", animate: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: returnLoop, color: "#60a5fa", animate: true })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: coolantLoop,
              fill: "none",
              stroke: "#f87171",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: returnLoop,
              fill: "none",
              stroke: "#60a5fa",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          )
        ] }),
        showLabels && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: CAL_X + CAL_W + 8,
              y: CAL_Y + CAL_H / 2 - 6,
              fill: "#f87171",
              fontSize: "8",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "hot →"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: CAL_X + CAL_W + 8,
              y: CAL_Y + CAL_H - 8,
              fill: "#60a5fa",
              fontSize: "8",
              fontFamily: "sans-serif",
              fontWeight: "600",
              children: "← cold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: V_W - 124,
            y: 18,
            width: 108,
            height: 58,
            rx: 9,
            fill: "#0d111888",
            stroke: powerColor,
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: V_W - 70,
            y: 36,
            textAnchor: "middle",
            fill: "#9ca3af",
            fontSize: "8.5",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
            children: "POWER OUTPUT"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: V_W - 70,
            y: 58,
            textAnchor: "middle",
            fill: powerColor,
            fontSize: "13",
            fontWeight: "bold",
            fontFamily: "monospace",
            children: power.label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CAL_X,
            y: V_H - 80,
            width: 115,
            height: 60,
            rx: 8,
            fill: "#0d111888",
            stroke: "#374151",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CAL_X + 8,
            y: V_H - 63,
            fill: "#9ca3af",
            fontSize: "8",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
            children: "COOLANT TEMPS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: CAL_X + 8,
            y: V_H - 48,
            fill: "#60a5fa",
            fontSize: "9",
            fontFamily: "monospace",
            children: [
              "In: ",
              canduInlet,
              "°C"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: CAL_X + 8,
            y: V_H - 34,
            fill: "#f87171",
            fontSize: "9",
            fontFamily: "monospace",
            children: [
              "Out: ",
              canduOutlet,
              "°C"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CAL_X,
            y: V_H - 10,
            fill: "#4b5563",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "Schematic only — not to scale, not for operational use"
          }
        )
      ]
    }
  );
}
const REACTOR_INFO = {
  PWR: {
    title: "Pressurized Water Reactor (PWR)",
    shortDesc: "Most common reactor type worldwide. Primary coolant is kept liquid under ~155 bar pressure. Heat transferred via steam generators to a separate secondary loop.",
    components: [
      {
        term: "Pressure Vessel",
        desc: "Heavy steel shell (8–12 in thick) containing core and primary coolant at ~155 bar. Keeps water liquid above 300 °C."
      },
      {
        term: "Fuel Rods",
        desc: "Cylindrical UO₂ pellets in Zircaloy cladding. Fission heat is generated here and transferred to the coolant."
      },
      {
        term: "Control Rods",
        desc: "Boron or hafnium rods that absorb neutrons. Insertion from above reduces reactivity; full insertion shuts down the reaction."
      },
      {
        term: "Pressurizer",
        desc: "Maintains system pressure so primary coolant stays liquid. Heaters and spray nozzles regulate pressure precisely."
      },
      {
        term: "Steam Generator",
        desc: "Heat exchanger between primary (radioactive) and secondary (clean) loops. Secondary water boils to drive the turbine."
      },
      {
        term: "Primary Coolant",
        desc: "Hot leg (red) carries heat from core to steam generator. Cold leg (blue) returns cooled water to the core."
      }
    ]
  },
  BWR: {
    title: "Boiling Water Reactor (BWR)",
    shortDesc: "Water boils directly inside the reactor vessel, producing steam that drives the turbine directly — no steam generator needed. Control rods insert from the bottom.",
    components: [
      {
        term: "Reactor Pressure Vessel",
        desc: "Houses both the reactor core and the steam separator. Water boils at ~70 bar, producing steam directly at ~285 °C."
      },
      {
        term: "Steam Separator / Dryer",
        desc: "Located above the core inside the vessel. Separates steam from liquid water before it reaches the turbine."
      },
      {
        term: "Control Rods (bottom-entry)",
        desc: "Unlike PWRs, BWR control rods insert from below using hydraulic drives. This simplifies the vessel head."
      },
      {
        term: "Direct Steam Cycle",
        desc: "Steam from the reactor goes directly to the turbine. No secondary loop needed, but turbine becomes mildly radioactive."
      },
      {
        term: "Suppression Pool (Wetwell)",
        desc: "Large water pool below the vessel. In an accident, excess steam is vented here to rapidly condense it and reduce pressure."
      },
      {
        term: "Fuel Assemblies",
        desc: "Similar UO₂ fuel in Zircaloy cladding, grouped in 8×8 or 10×10 arrays. Slightly lower enrichment than PWR."
      }
    ]
  },
  CANDU: {
    title: "CANDU Reactor (CANadian Deuterium Uranium)",
    shortDesc: "Uses heavy water (D₂O) as both moderator and coolant in separate systems. Pressure tubes replace a large pressure vessel, enabling online refueling without shutdown.",
    components: [
      {
        term: "Calandria Vessel",
        desc: "Large horizontal tank filled with heavy water moderator at low pressure and near room temperature. Not a pressure vessel."
      },
      {
        term: "Pressure Tubes",
        desc: "Individual horizontal zirconium-alloy tubes through the calandria carry pressurized D₂O coolant and fuel bundles at ~100 bar."
      },
      {
        term: "Natural Uranium Fuel",
        desc: "CANDU uses unenriched natural uranium (0.7% U-235). Low fuel costs, but larger core required than enriched-fuel reactors."
      },
      {
        term: "Online Refueling",
        desc: "Two fueling machines work simultaneously from each end while the reactor operates at full power — a unique CANDU advantage."
      },
      {
        term: "Heavy Water Moderator",
        desc: "D₂O has low neutron absorption, enabling use of natural uranium. Separate from the pressurized coolant circuit."
      },
      {
        term: "Steam Generators",
        desc: "Heavy water coolant transfers heat to light water in steam generators, producing steam for the turbine generator."
      }
    ]
  }
};
const REACTOR_TABS = [
  { id: "PWR", label: "PWR", badge: "Pressurized Water" },
  { id: "BWR", label: "BWR", badge: "Boiling Water" },
  { id: "CANDU", label: "CANDU", badge: "Heavy Water" }
];
function ReactorCrossSection() {
  const [insertion, setInsertion] = reactExports.useState(40);
  const [showLabels, setShowLabels] = reactExports.useState(true);
  const [reactorType, setReactorType] = reactExports.useState("PWR");
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;
  const power = getPowerState(insertion);
  const info = REACTOR_INFO[reactorType];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen bg-background",
      "data-ocid": "reactor-viz.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-intermediate", children: "Intermediate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "audience-badge audience-advanced", children: "SVG · Animated" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground md:text-3xl", children: "Reactor Cross-Section Explorer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-xl", children: "Simplified schematic views of PWR, BWR, and CANDU reactors. Adjust the control rod slider to see how insertion affects power output and coolant temperatures." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl px-4 py-8 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm p-1 w-fit shadow-sm",
              role: "tablist",
              "aria-label": "Reactor type selector",
              children: REACTOR_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  role: "tab",
                  type: "button",
                  "aria-selected": reactorType === tab.id,
                  onClick: () => setReactorType(tab.id),
                  "data-ocid": `reactor-viz.type_tab.${tab.id.toLowerCase()}`,
                  className: `rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${reactorType === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
                  children: [
                    tab.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `ml-1.5 text-xs font-normal hidden sm:inline ${reactorType === tab.id ? "opacity-80" : "opacity-50"}`,
                        children: tab.badge
                      }
                    )
                  ]
                },
                tab.id
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border bg-card p-3 sm:p-4",
              "data-ocid": "reactor-viz.svg_diagram",
              children: [
                reactorType === "PWR" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PWRDiagram,
                  {
                    insertion,
                    showLabels,
                    shouldAnimate
                  }
                ),
                reactorType === "BWR" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  BWRDiagram,
                  {
                    insertion,
                    showLabels,
                    shouldAnimate
                  }
                ),
                reactorType === "CANDU" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CANDUDiagram,
                  {
                    insertion,
                    showLabels,
                    shouldAnimate
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              "data-ocid": "reactor-viz.controls",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "rod-insertion",
                        className: "text-sm font-semibold text-foreground",
                        children: "Control Rod Insertion"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-bold text-foreground", children: [
                      insertion,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Slider,
                    {
                      id: "rod-insertion",
                      min: 0,
                      max: 100,
                      step: 1,
                      value: [insertion],
                      onValueChange: ([v]) => setInsertion(v),
                      "aria-label": "Control rod insertion percentage",
                      "aria-valuenow": insertion,
                      "aria-valuemin": 0,
                      "aria-valuemax": 100,
                      "data-ocid": "reactor-viz.rod_slider"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0% — Withdrawn (High Power)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100% — Full Insertion" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `rounded-xl border p-5 ${power.color}`,
                    "aria-live": "polite",
                    "data-ocid": "reactor-viz.power_status",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `h-2.5 w-2.5 rounded-full ${insertion < 30 ? "bg-red-400" : insertion < 70 ? "bg-emerald-400" : "bg-blue-400"}`,
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `font-mono text-sm font-bold ${power.textColor}`,
                            children: power.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: power.description }),
                      reactorType === "PWR" && (() => {
                        const t = getPWRTemps(insertion);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/40 grid grid-cols-2 gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Coolant In" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-bold text-blue-400", children: [
                              t.inlet,
                              "°C"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Coolant Out" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-bold text-red-400", children: [
                              t.outlet,
                              "°C"
                            ] })
                          ] })
                        ] });
                      })(),
                      reactorType === "BWR" && (() => {
                        const t = getPWRTemps(insertion);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/40 grid grid-cols-2 gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Feed Water In" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-bold text-blue-400", children: [
                              t.inlet - 10,
                              "°C"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Steam Out" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-bold text-red-400", children: [
                              t.outlet - 5,
                              "°C"
                            ] })
                          ] })
                        ] });
                      })(),
                      reactorType === "CANDU" && (() => {
                        const t = getPWRTemps(insertion);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/40 grid grid-cols-2 gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "D₂O Coolant In" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-bold text-blue-400", children: [
                              t.inlet - 15,
                              "°C"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "D₂O Coolant Out" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-bold text-red-400", children: [
                              t.outlet - 15,
                              "°C"
                            ] })
                          ] })
                        ] });
                      })()
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-sm px-2 py-1 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "rounded-full h-7 px-3 text-xs",
                onClick: () => setShowLabels((v) => !v),
                "data-ocid": "reactor-viz.toggle_labels_button",
                "aria-pressed": showLabels,
                children: showLabels ? "Hide Labels" : "Show Labels"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: showLabels ? "Click to hide diagram labels" : "Click to show diagram labels" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card/60 px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: info.shortDesc }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-border bg-card p-5",
              "data-ocid": "reactor-viz.component_descriptions",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground mb-3", children: [
                  info.title,
                  " — Component Guide"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: info.components.map(({ term, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-semibold text-foreground uppercase tracking-wider", children: term }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-sm text-muted-foreground leading-relaxed", children: desc })
                ] }, term)) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ReactorCrossSection as default
};
