import { d as createLucideIcon, a1 as isEasingArray, a2 as VisualElement, a3 as createBox, a4 as useConstant, a5 as motionValue, r as reactExports, a6 as MotionConfigContext, a7 as resolveElements, a8 as mixNumber, a9 as removeItem, aa as isMotionValue, ab as defaultOffset, ac as createGeneratorEasing, ad as fillOffset, ae as isGenerator, af as secondsToMilliseconds, ag as progress, ah as isSVGElement, ai as isSVGSVGElement, aj as SVGVisualElement, ak as HTMLVisualElement, al as visualElementStore, am as animateSingleValue, an as animateTarget, ao as spring, ap as reactDomExports, j as jsxRuntimeExports, E as Primitive, s as useComposedRefs, w as createContextScope, J as useLayoutEffect2, W as useDirection, z as useControllableState, D as useId, t as composeEventHandlers, V as createCollection, H as createSlot, a as ChevronDown, e as cn, k as AnimatePresence, m as motion, B as Button, X, P as Presence, aq as Activity, Z as Zap, b as Badge, C as ChevronRight } from "./index-BllujZqD.js";
import { c as useSize, d as usePrevious, e as clamp$1, u as useReducedMotion, S as Slider, C as Canvas, O as OrbitControls, a as useThree, P as PCFSoftShadowMap, A as ACESFilmicToneMapping, b as useFrame, f as MeshStandardMaterial, D as DoubleSide, g as Color, B as BackSide, h as CylinderGeometry, R as RingGeometry, i as SphereGeometry, T as TorusGeometry, j as Object3D, k as CircleGeometry, V as Vector3 } from "./OrbitControls-8hBFxDCY.js";
import { a as useCallbackRef, P as Portal$1, h as hideOthers, u as useFocusGuards, R as ReactRemoveScroll, F as FocusScope, D as DismissableLayer } from "./index-Djikuig1.js";
import { C as Check } from "./check-X5y_DcTb.js";
import { C as ChevronUp } from "./chevron-up-CUcJa0Nz.js";
import { D as Download } from "./download-DJCDhF0Y.js";
import { R as RefreshCw } from "./refresh-cw-CEgaUDRK.js";
import { P as Pause } from "./pause-BlLX7EV2.js";
import { P as Play } from "./play-BG4WeTjY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
const Maximize2 = createLucideIcon("maximize-2", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["polygon", { points: "19 20 9 12 19 4 19 20", key: "o2sva" }],
  ["line", { x1: "5", x2: "5", y1: "19", y2: "5", key: "1ocqjk" }]
];
const SkipBack = createLucideIcon("skip-back", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
];
const SkipForward = createLucideIcon("skip-forward", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
const Thermometer = createLucideIcon("thermometer", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2", key: "1re2ne" }]
];
const Unlink2 = createLucideIcon("unlink-2", __iconNode);
const wrap = (min2, max2, v) => {
  const rangeSize = max2 - min2;
  return ((v - min2) % rangeSize + rangeSize) % rangeSize + min2;
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
  let max2 = 0;
  for (let i = 0; i < animations.length; i++) {
    const value = animations[i][propName];
    if (value !== null && value > max2) {
      max2 = value;
    }
  }
  return max2;
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
function addKeyframes(sequence, keyframes, easing, offset2, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes.length; i++) {
    sequence.push({
      value: keyframes[i],
      at: mixNumber(startTime, endTime, offset2[i]),
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
const sides = ["top", "right", "bottom", "left"];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow$3 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$2 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const limitShift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset2, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
const size$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset$1 = offset$2;
const shift$1 = shift$2;
const flip$1 = flip$2;
const size$1 = size$2;
const hide$1 = hide$2;
const arrow$2 = arrow$3;
const limitShift$1 = limitShift$2;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var isClient = typeof document !== "undefined";
var noop = function noop2() {
};
var index = isClient ? reactExports.useLayoutEffect : noop;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = reactExports.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = reactExports.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = reactExports.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = reactExports.useState(null);
  const [_floating, _setFloating] = reactExports.useState(null);
  const setReference = reactExports.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = reactExports.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = reactExports.useRef(null);
  const floatingRef = reactExports.useRef(null);
  const dataRef = reactExports.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = reactExports.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        reactDomExports.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = reactExports.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = reactExports.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = reactExports.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = reactExports.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return reactExports.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
const arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow$2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow$2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
const offset = (options, deps) => {
  const result = offset$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const shift = (options, deps) => {
  const result = shift$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const limitShift = (options, deps) => {
  const result = limitShift$1(options);
  return {
    fn: result.fn,
    options: [options, deps]
  };
};
const flip = (options, deps) => {
  const result = flip$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const size = (options, deps) => {
  const result = size$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const hide = (options, deps) => {
  const result = hide$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const arrow = (options, deps) => {
  const result = arrow$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var NAME$1 = "Arrow";
var Arrow$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow$1.displayName = NAME$1;
var Root$1 = Arrow$1;
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME, __scopePopper);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const anchorRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      const previousAnchor = anchorRef.current;
      anchorRef.current = (virtualRef == null ? void 0 : virtualRef.current) || ref.current;
      if (previousAnchor !== anchorRef.current) {
        context.onAnchorChange(anchorRef.current);
      }
    });
    return virtualRef ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...anchorProps, ref: composedRefs });
  }
);
PopperAnchor.displayName = ANCHOR_NAME;
var CONTENT_NAME$2 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$2);
var PopperContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    var _a, _b, _c, _d, _e, _f;
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext(CONTENT_NAME$2, __scopePopper);
    const [content, setContent] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow$12, setArrow] = reactExports.useState(null);
    const arrowSize = useSize(arrow$12);
    const arrowWidth = (arrowSize == null ? void 0 : arrowSize.width) ?? 0;
    const arrowHeight = (arrowSize == null ? void 0 : arrowSize.height) ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip({ ...detectOverflowOptions }),
        size({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$12 && arrow({ element: arrow$12, padding: arrowPadding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide({ strategy: "referenceHidden", ...detectOverflowOptions })
      ]
    });
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced == null ? void 0 : handlePlaced();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = (_a = middlewareData.arrow) == null ? void 0 : _a.x;
    const arrowY = (_b = middlewareData.arrow) == null ? void 0 : _b.y;
    const cannotCenterArrow = ((_c = middlewareData.arrow) == null ? void 0 : _c.centerOffset) !== 0;
    const [contentZIndex, setContentZIndex] = reactExports.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          ["--radix-popper-transform-origin"]: [
            (_d = middlewareData.transformOrigin) == null ? void 0 : _d.x,
            (_e = middlewareData.transformOrigin) == null ? void 0 : _e.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((_f = middlewareData.hide) == null ? void 0 : _f.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PopperContentProvider,
          {
            scope: __scopePopper,
            placedSide,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned ? "none" : void 0
                }
              }
            )
          }
        )
      }
    );
  }
);
PopperContent.displayName = CONTENT_NAME$2;
var ARROW_NAME$1 = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = reactExports.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext(ARROW_NAME$1, __scopePopper);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        ref: contentContext.onArrowChange,
        style: {
          position: "absolute",
          left: contentContext.arrowX,
          top: contentContext.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[contentContext.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[contentContext.placedSide],
          visibility: contentContext.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root$1,
          {
            ...arrowProps,
            ref: forwardedRef,
            style: {
              ...arrowProps.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
PopperArrow.displayName = ARROW_NAME$1;
function isNotNull(value) {
  return value !== null;
}
var transformOrigin = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    var _a, _b, _c;
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = ((_a = middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (((_b = middlewareData.arrow) == null ? void 0 : _b.x) ?? 0) + arrowWidth / 2;
    const arrowYCenter = (((_c = middlewareData.arrow) == null ? void 0 : _c.y) ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
});
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root2$2 = Popper;
var Anchor = PopperAnchor;
var Content$1 = PopperContent;
var Arrow = PopperArrow;
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;
var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection$1, useCollection$1, createCollectionScope$1] = createCollection(SELECT_NAME);
var [createSelectContext] = createContextScope(SELECT_NAME, [
  createCollectionScope$1,
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select$1 = (props) => {
  const {
    __scopeSelect,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    dir,
    name,
    autoComplete,
    disabled,
    required,
    form
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  const [trigger, setTrigger] = reactExports.useState(null);
  const [valueNode, setValueNode] = reactExports.useState(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = reactExports.useState(false);
  const direction = useDirection(dir);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SELECT_NAME
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: SELECT_NAME
  });
  const triggerPointerDownPosRef = reactExports.useRef(null);
  const isFormControl = trigger ? form || !!trigger.closest("form") : true;
  const [nativeOptionsSet, setNativeOptionsSet] = reactExports.useState(/* @__PURE__ */ new Set());
  const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$2, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SelectProvider,
    {
      required,
      scope: __scopeSelect,
      trigger,
      onTriggerChange: setTrigger,
      valueNode,
      onValueNodeChange: setValueNode,
      valueNodeHasChildren,
      onValueNodeHasChildrenChange: setValueNodeHasChildren,
      contentId: useId(),
      value,
      onValueChange: setValue,
      open,
      onOpenChange: setOpen,
      dir: direction,
      triggerPointerDownPosRef,
      disabled,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Collection$1.Provider, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectNativeOptionsProvider,
          {
            scope: props.__scopeSelect,
            onNativeOptionAdd: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => new Set(prev).add(option));
            }, []),
            onNativeOptionRemove: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => {
                const optionsSet = new Set(prev);
                optionsSet.delete(option);
                return optionsSet;
              });
            }, []),
            children
          }
        ) }),
        isFormControl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SelectBubbleInput,
          {
            "aria-hidden": true,
            required,
            tabIndex: -1,
            name,
            autoComplete,
            value,
            onChange: (event) => setValue(event.target.value),
            disabled,
            form,
            children: [
              value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }) : null,
              Array.from(nativeOptionsSet)
            ]
          },
          nativeSelectKey
        ) : null
      ]
    }
  ) });
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME$1 = "SelectTrigger";
var SelectTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME$1, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
    const getItems = useCollection$1(__scopeSelect);
    const pointerTypeRef = reactExports.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.value === context.value);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem !== void 0) {
        context.onValueChange(nextItem.value);
      }
    });
    const handleOpen = (pointerEvent) => {
      if (!isDisabled) {
        context.onOpenChange(true);
        resetTypeahead();
      }
      if (pointerEvent) {
        context.triggerPointerDownPosRef.current = {
          x: Math.round(pointerEvent.pageX),
          y: Math.round(pointerEvent.pageY)
        };
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": context.contentId,
        "aria-expanded": context.open,
        "aria-required": context.required,
        "aria-autocomplete": "none",
        dir: context.dir,
        "data-state": context.open ? "open" : "closed",
        disabled: isDisabled,
        "data-disabled": isDisabled ? "" : void 0,
        "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
        ...triggerProps,
        ref: composedRefs,
        onClick: composeEventHandlers(triggerProps.onClick, (event) => {
          event.currentTarget.focus();
          if (pointerTypeRef.current !== "mouse") {
            handleOpen(event);
          }
        }),
        onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
          pointerTypeRef.current = event.pointerType;
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
          }
          if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
            handleOpen(event);
            event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
          const isTypingAhead = searchRef.current !== "";
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
          if (isTypingAhead && event.key === " ") return;
          if (OPEN_KEYS.includes(event.key)) {
            handleOpen();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
SelectTrigger$1.displayName = TRIGGER_NAME$1;
var VALUE_NAME = "SelectValue";
var SelectValue$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
    useLayoutEffect2(() => {
      onValueNodeHasChildrenChange(hasChildren);
    }, [onValueNodeHasChildrenChange, hasChildren]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...valueProps,
        ref: composedRefs,
        style: { pointerEvents: "none" },
        children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: placeholder }) : children
      }
    );
  }
);
SelectValue$1.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { "aria-hidden": true, ...iconProps, ref: forwardedRef, children: children || "▼" });
  }
);
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var SelectPortal = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, ...props });
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME$1 = "SelectContent";
var SelectContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useSelectContext(CONTENT_NAME$1, props.__scopeSelect);
    const [fragment, setFragment] = reactExports.useState();
    useLayoutEffect2(() => {
      setFragment(new DocumentFragment());
    }, []);
    if (!context.open) {
      const frag = fragment;
      return frag ? reactDomExports.createPortal(
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentProvider, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection$1.Slot, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: props.children }) }) }),
        frag
      ) : null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentImpl, { ...props, ref: forwardedRef });
  }
);
SelectContent$1.displayName = CONTENT_NAME$1;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME$1);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      position = "item-aligned",
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      //
      // PopperContent props
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions,
      //
      ...contentProps
    } = props;
    const context = useSelectContext(CONTENT_NAME$1, __scopeSelect);
    const [content, setContent] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [selectedItem, setSelectedItem] = reactExports.useState(null);
    const [selectedItemText, setSelectedItemText] = reactExports.useState(
      null
    );
    const getItems = useCollection$1(__scopeSelect);
    const [isPositioned, setIsPositioned] = reactExports.useState(false);
    const firstValidItemFoundRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (content) return hideOthers(content);
    }, [content]);
    useFocusGuards();
    const focusFirst2 = reactExports.useCallback(
      (candidates) => {
        const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
          if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
          candidate == null ? void 0 : candidate.scrollIntoView({ block: "nearest" });
          if (candidate === firstItem && viewport) viewport.scrollTop = 0;
          if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
          candidate == null ? void 0 : candidate.focus();
          if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
      },
      [getItems, viewport]
    );
    const focusSelectedItem = reactExports.useCallback(
      () => focusFirst2([selectedItem, content]),
      [focusFirst2, selectedItem, content]
    );
    reactExports.useEffect(() => {
      if (isPositioned) {
        focusSelectedItem();
      }
    }, [isPositioned, focusSelectedItem]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    reactExports.useEffect(() => {
      if (content) {
        let pointerMoveDelta = { x: 0, y: 0 };
        const handlePointerMove = (event) => {
          var _a, _b;
          pointerMoveDelta = {
            x: Math.abs(Math.round(event.pageX) - (((_a = triggerPointerDownPosRef.current) == null ? void 0 : _a.x) ?? 0)),
            y: Math.abs(Math.round(event.pageY) - (((_b = triggerPointerDownPosRef.current) == null ? void 0 : _b.y) ?? 0))
          };
        };
        const handlePointerUp = (event) => {
          if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
            event.preventDefault();
          } else {
            if (!content.contains(event.target)) {
              onOpenChange(false);
            }
          }
          document.removeEventListener("pointermove", handlePointerMove);
          triggerPointerDownPosRef.current = null;
        };
        if (triggerPointerDownPosRef.current !== null) {
          document.addEventListener("pointermove", handlePointerMove);
          document.addEventListener("pointerup", handlePointerUp, { capture: true, once: true });
        }
        return () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp, { capture: true });
        };
      }
    }, [content, onOpenChange, triggerPointerDownPosRef]);
    reactExports.useEffect(() => {
      const close = () => onOpenChange(false);
      window.addEventListener("blur", close);
      window.addEventListener("resize", close);
      return () => {
        window.removeEventListener("blur", close);
        window.removeEventListener("resize", close);
      };
    }, [onOpenChange]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.ref.current === document.activeElement);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem) {
        setTimeout(() => nextItem.ref.current.focus());
      }
    });
    const itemRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItem(node);
          if (isFirstValidItem) firstValidItemFoundRef.current = true;
        }
      },
      [context.value]
    );
    const handleItemLeave = reactExports.useCallback(() => content == null ? void 0 : content.focus(), [content]);
    const itemTextRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItemText(node);
        }
      },
      [context.value]
    );
    const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions
    } : {};
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectContentProvider,
      {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FocusScope,
          {
            asChild: true,
            trapped: context.open,
            onMountAutoFocus: (event) => {
              event.preventDefault();
            },
            onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
              var _a;
              (_a = context.trigger) == null ? void 0 : _a.focus({ preventScroll: true });
              event.preventDefault();
            }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents: true,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside: (event) => event.preventDefault(),
                onDismiss: () => context.onOpenChange(false),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectPosition,
                  {
                    role: "listbox",
                    id: context.contentId,
                    "data-state": context.open ? "open" : "closed",
                    dir: context.dir,
                    onContextMenu: (event) => event.preventDefault(),
                    ...contentProps,
                    ...popperContentProps,
                    onPlaced: () => setIsPositioned(true),
                    ref: composedRefs,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...contentProps.style
                    },
                    onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                      if (event.key === "Tab") event.preventDefault();
                      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                        const items = getItems().filter((item) => !item.disabled);
                        let candidateNodes = items.map((item) => item.ref.current);
                        if (["ArrowUp", "End"].includes(event.key)) {
                          candidateNodes = candidateNodes.slice().reverse();
                        }
                        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                          const currentElement = event.target;
                          const currentIndex = candidateNodes.indexOf(currentElement);
                          candidateNodes = candidateNodes.slice(currentIndex + 1);
                        }
                        setTimeout(() => focusFirst2(candidateNodes));
                        event.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = useSelectContext(CONTENT_NAME$1, __scopeSelect);
  const contentContext = useSelectContentContext(CONTENT_NAME$1, __scopeSelect);
  const [contentWrapper, setContentWrapper] = reactExports.useState(null);
  const [content, setContent] = reactExports.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const getItems = useCollection$1(__scopeSelect);
  const shouldExpandOnScrollRef = reactExports.useRef(false);
  const shouldRepositionRef = reactExports.useRef(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = reactExports.useCallback(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedLeft = clamp$1(left, [
          CONTENT_MARGIN,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedRight = clamp$1(right, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(
          triggerMiddleToBottomEdge,
          selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth
        );
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(
          topEdgeToTriggerMiddle,
          contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight
        );
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced == null ? void 0 : onPlaced();
      requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  useLayoutEffect2(() => position(), [position]);
  const [contentZIndex, setContentZIndex] = reactExports.useState();
  useLayoutEffect2(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  const handleScrollButtonChange = reactExports.useCallback(
    (node) => {
      if (node && shouldRepositionRef.current === true) {
        position();
        focusSelectedItem == null ? void 0 : focusSelectedItem();
        shouldRepositionRef.current = false;
      }
    },
    [position, focusSelectedItem]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectViewportProvider,
    {
      scope: __scopeSelect,
      contentWrapper,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: setContentWrapper,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: contentZIndex
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.div,
            {
              ...popperProps,
              ref: composedRefs,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...popperProps.style
              }
            }
          )
        }
      )
    }
  );
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    align = "start",
    collisionPadding = CONTENT_MARGIN,
    ...popperProps
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content$1,
    {
      ...popperScope,
      ...popperProps,
      ref: forwardedRef,
      align,
      collisionPadding,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...popperProps.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-select-content-available-width": "var(--radix-popper-available-width)",
          "--radix-select-content-available-height": "var(--radix-popper-available-height)",
          "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME$1, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = reactExports.useRef(0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Collection$1.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...viewportProps,
          ref: composedRefs,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...viewportProps.style
          },
          onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
            const viewport = event.currentTarget;
            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
            if ((shouldExpandOnScrollRef == null ? void 0 : shouldExpandOnScrollRef.current) && contentWrapper) {
              const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
              if (scrolledBy > 0) {
                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                const cssHeight = parseFloat(contentWrapper.style.height);
                const prevHeight = Math.max(cssMinHeight, cssHeight);
                if (prevHeight < availableHeight) {
                  const nextHeight = prevHeight + scrolledBy;
                  const clampedNextHeight = Math.min(availableHeight, nextHeight);
                  const heightDiff = nextHeight - clampedNextHeight;
                  contentWrapper.style.height = clampedNextHeight + "px";
                  if (contentWrapper.style.bottom === "0px") {
                    viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                    contentWrapper.style.justifyContent = "flex-end";
                  }
                }
              }
            }
            prevScrollTopRef.current = viewport.scrollTop;
          })
        }
      ) })
    ] });
  }
);
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME$1 = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME$1);
var SelectGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...groupProps } = props;
    const groupId = useId();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectGroupContextProvider, { scope: __scopeSelect, id: groupId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { role: "group", "aria-labelledby": groupId, ...groupProps, ref: forwardedRef }) });
  }
);
SelectGroup.displayName = GROUP_NAME$1;
var LABEL_NAME = "SelectLabel";
var SelectLabel = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { id: groupContext.id, ...labelProps, ref: forwardedRef });
  }
);
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME$1 = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME$1);
var SelectItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      value,
      disabled = false,
      textValue: textValueProp,
      ...itemProps
    } = props;
    const context = useSelectContext(ITEM_NAME$1, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME$1, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = reactExports.useState(textValueProp ?? "");
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => {
        var _a;
        return (_a = contentContext.itemRefCallback) == null ? void 0 : _a.call(contentContext, node, value, disabled);
      }
    );
    const textId = useId();
    const pointerTypeRef = reactExports.useRef("touch");
    const handleSelect = () => {
      if (!disabled) {
        context.onValueChange(value);
        context.onOpenChange(false);
      }
    };
    if (value === "") {
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectItemContextProvider,
      {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: reactExports.useCallback((node) => {
          setTextValue((prevTextValue) => prevTextValue || ((node == null ? void 0 : node.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Collection$1.ItemSlot,
          {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
                onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
                onClick: composeEventHandlers(itemProps.onClick, () => {
                  if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
                  if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
                  var _a;
                  pointerTypeRef.current = event.pointerType;
                  if (disabled) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  } else if (pointerTypeRef.current === "mouse") {
                    event.currentTarget.focus({ preventScroll: true });
                  }
                }),
                onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
                  var _a;
                  if (event.currentTarget === document.activeElement) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  }
                }),
                onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
                  var _a;
                  const isTypingAhead = ((_a = contentContext.searchRef) == null ? void 0 : _a.current) !== "";
                  if (isTypingAhead && event.key === " ") return;
                  if (SELECTION_KEYS.includes(event.key)) handleSelect();
                  if (event.key === " ") event.preventDefault();
                })
              }
            )
          }
        )
      }
    );
  }
);
SelectItem$1.displayName = ITEM_NAME$1;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = reactExports.useState(null);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => setItemTextNode(node),
      itemContext.onItemTextChange,
      (node) => {
        var _a;
        return (_a = contentContext.itemTextRefCallback) == null ? void 0 : _a.call(contentContext, node, itemContext.value, itemContext.disabled);
      }
    );
    const textContent = itemTextNode == null ? void 0 : itemTextNode.textContent;
    const nativeOption = reactExports.useMemo(
      () => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: itemContext.value, disabled: itemContext.disabled, children: textContent }, itemContext.value),
      [itemContext.disabled, itemContext.value, textContent]
    );
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    useLayoutEffect2(() => {
      onNativeOptionAdd(nativeOption);
      return () => onNativeOptionRemove(nativeOption);
    }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { id: itemContext.textId, ...itemTextProps, ref: composedRefs }),
      itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? reactDomExports.createPortal(itemTextProps.children, context.valueNode) : null
    ] });
  }
);
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { "aria-hidden": true, ...itemIndicatorProps, ref: forwardedRef }) : null;
  }
);
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp, setCanScrollUp] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const canScrollUp2 = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollUp ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollUpButton$1.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown, setCanScrollDown] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollDown ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollDownButton$1.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = reactExports.useRef(null);
  const getItems = useCollection$1(__scopeSelect);
  const clearAutoScrollTimer = reactExports.useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => {
    return () => clearAutoScrollTimer();
  }, [clearAutoScrollTimer]);
  useLayoutEffect2(() => {
    var _a;
    const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
    (_a = activeItem == null ? void 0 : activeItem.ref.current) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "aria-hidden": true,
      ...scrollIndicatorProps,
      ref: forwardedRef,
      style: { flexShrink: 0, ...scrollIndicatorProps.style },
      onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
        var _a;
        (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
        clearAutoScrollTimer();
      })
    }
  );
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { "aria-hidden": true, ...separatorProps, ref: forwardedRef });
  }
);
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(ARROW_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
    return context.open && contentContext.position === "popper" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef }) : null;
  }
);
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = reactExports.forwardRef(
  ({ __scopeSelect, value, ...props }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const prevValue = usePrevious(value);
    reactExports.useEffect(() => {
      const select = ref.current;
      if (!select) return;
      const selectProto = window.HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        "value"
      );
      const setValue = descriptor.set;
      if (prevValue !== value && setValue) {
        const event = new Event("change", { bubbles: true });
        setValue.call(select, value);
        select.dispatchEvent(event);
      }
    }, [prevValue, value]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.select,
      {
        ...props,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style },
        ref: composedRefs,
        defaultValue: value
      }
    );
  }
);
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = useCallbackRef(onSearchChange);
  const searchRef = reactExports.useRef("");
  const timerRef = reactExports.useRef(0);
  const handleTypeaheadSearch = reactExports.useCallback(
    (key) => {
      const search = searchRef.current + key;
      handleSearchChange(search);
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
    },
    [handleSearchChange]
  );
  const resetTypeahead = reactExports.useCallback(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  reactExports.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [searchRef, handleTypeaheadSearch, resetTypeahead];
}
function findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = wrapArray$1(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
  const nextItem = wrappedItems.find(
    (item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray$1(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var Root2$1 = Select$1;
var Trigger$1 = SelectTrigger$1;
var Value = SelectValue$1;
var Icon = SelectIcon;
var Portal = SelectPortal;
var Content2 = SelectContent$1;
var Viewport = SelectViewport;
var Item$1 = SelectItem$1;
var ItemText = SelectItemText;
var ItemIndicator = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton$1;
var ScrollDownButton = SelectScrollDownButton$1;
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size: size2 = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger$1,
    {
      "data-slot": "select-trigger",
      "data-size": size2,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Item$1,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4" })
    }
  );
}
const REACTOR_DATA = {
  PWR: {
    label: "Pressurized Water Reactor",
    thermalMW: 3411,
    electricalMW: 1150,
    fuel: "UO₂ (3–5% U-235)",
    coolant: "Light Water (H₂O)",
    moderator: "Light Water (H₂O)",
    inletC: 293,
    outletC: 328,
    pressureBar: 155,
    efficiency: 33.7,
    refueling: "Shutdown, ~18 months",
    coreColor: "#fbbf24",
    coolantHotColor: "#f87171",
    coolantColdColor: "#60a5fa",
    description: "Most common reactor type (~70% of global fleet). Primary coolant stays liquid under high pressure; heat transferred via steam generators."
  },
  BWR: {
    label: "Boiling Water Reactor",
    thermalMW: 3930,
    electricalMW: 1380,
    fuel: "UO₂ (3–4% U-235)",
    coolant: "Water / Steam (H₂O)",
    moderator: "Light Water (H₂O)",
    inletC: 215,
    outletC: 286,
    pressureBar: 72,
    efficiency: 35.1,
    refueling: "Shutdown, ~18 months",
    coreColor: "#fbbf24",
    coolantHotColor: "#7dd3fc",
    coolantColdColor: "#60a5fa",
    description: "Water boils directly inside the vessel, driving the turbine without a steam generator. Simpler design but mildly radioactive turbine."
  },
  CANDU: {
    label: "CANDU (Heavy Water)",
    thermalMW: 2064,
    electricalMW: 700,
    fuel: "Natural UO₂ (0.7% U-235)",
    coolant: "Heavy Water (D₂O)",
    moderator: "Heavy Water (D₂O)",
    inletC: 266,
    outletC: 313,
    pressureBar: 104,
    efficiency: 33.9,
    refueling: "Online — no shutdown",
    coreColor: "#fbbf24",
    coolantHotColor: "#f87171",
    coolantColdColor: "#22d3ee",
    description: "Uses unenriched natural uranium. Unique online refueling capability. Heavy water moderator enables high neutron economy."
  },
  SMR: {
    label: "Small Modular Reactor",
    thermalMW: 160,
    electricalMW: 50,
    fuel: "UO₂ (4–20% U-235)",
    coolant: "Light Water (H₂O)",
    moderator: "Light Water (H₂O)",
    inletC: 280,
    outletC: 320,
    pressureBar: 160,
    efficiency: 31.3,
    refueling: "10–15 year sealed core",
    coreColor: "#a78bfa",
    coolantHotColor: "#f87171",
    coolantColdColor: "#60a5fa",
    description: "Factory-fabricated, passively safe, compact design. Ideal for remote locations or phased capacity additions. Integral primary systems."
  },
  GAS: {
    label: "Gas-Cooled Reactor (AGR)",
    thermalMW: 1500,
    electricalMW: 660,
    fuel: "UO₂ (2.5–3.5% U-235)",
    coolant: "Carbon Dioxide (CO₂)",
    moderator: "Graphite",
    inletC: 290,
    outletC: 640,
    pressureBar: 40,
    efficiency: 44,
    refueling: "Online (some designs)",
    coreColor: "#fb923c",
    coolantHotColor: "#fb923c",
    coolantColdColor: "#94a3b8",
    description: "High outlet temperature enables high thermal efficiency. CO₂ coolant is non-corrosive. Graphite moderator enables use of slightly-enriched uranium."
  },
  MSR: {
    label: "Thorium Molten Salt Reactor",
    thermalMW: 1e3,
    electricalMW: 430,
    fuel: "Th-232 / U-233 dissolved salt",
    coolant: "Liquid Fluoride Salt",
    moderator: "Graphite",
    inletC: 565,
    outletC: 700,
    pressureBar: 1,
    efficiency: 43,
    refueling: "Continuous online addition",
    coreColor: "#4ade80",
    coolantHotColor: "#f59e0b",
    coolantColdColor: "#4ade80",
    description: "Liquid fuel dissolved in molten fluoride salt. Atmospheric pressure operation. Thorium fuel cycle — ~3× more abundant than uranium."
  }
};
const REACTOR_OPTIONS = [
  { value: "PWR", label: "PWR — Pressurized Water" },
  { value: "BWR", label: "BWR — Boiling Water" },
  { value: "CANDU", label: "CANDU — Heavy Water" },
  { value: "SMR", label: "SMR — Small Modular" },
  { value: "GAS", label: "Gas-Cooled (AGR)" },
  { value: "MSR", label: "Thorium MSR" }
];
function CoolantPath({
  d,
  color,
  shouldAnimate
}) {
  const dashOffset = useMotionValue(0);
  const pathRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!shouldAnimate) {
      dashOffset.set(0);
      return;
    }
    const controls = animate(dashOffset, -240, {
      duration: 3.2,
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
      opacity: "0.8"
    }
  );
}
function powerIndicator(W, insertion) {
  const powerColor = insertion < 30 ? "#f87171" : insertion < 70 ? "#4ade80" : "#60a5fa";
  const powerLabel = insertion < 30 ? "HIGH" : insertion < 70 ? "NORMAL" : "LOW";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x: W - 100,
        y: 10,
        width: 86,
        height: 44,
        rx: 7,
        fill: "#0d111888",
        stroke: powerColor,
        strokeWidth: 1.5
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: W - 57,
        y: 26,
        textAnchor: "middle",
        fill: "#9ca3af",
        fontSize: "7.5",
        fontFamily: "monospace",
        children: "POWER"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: W - 57,
        y: 44,
        textAnchor: "middle",
        fill: powerColor,
        fontSize: "11",
        fontWeight: "bold",
        fontFamily: "monospace",
        children: powerLabel
      }
    )
  ] });
}
function PWRSVGDiagram({
  type,
  insertion,
  shouldAnimate,
  data
}) {
  const W = 480;
  const H = 300;
  const fluxOpacity = 0.15 + (1 - insertion / 100) * 0.55;
  const isSmr = type === "SMR";
  const VX = isSmr ? 100 : 60;
  const VY = 30;
  const VW = isSmr ? 100 : 160;
  const VH = isSmr ? 200 : 230;
  const CX = VX + VW * 0.18;
  const CY = VY + VH * 0.2;
  const CW = VW * 0.6;
  const CH = VH * 0.55;
  const rodH = insertion / 100 * CH * 0.82;
  const SGX = VX + VW + 30;
  const SGY = VY + 20;
  const SGW = 60;
  const SGH = isSmr ? 100 : 150;
  const hotLeg = `M ${VX + VW} ${VY + VH * 0.25} C ${VX + VW + 15} ${VY + VH * 0.25} ${SGX} ${SGY + 25} ${SGX} ${SGY + 25}`;
  const coldLeg = `M ${SGX} ${SGY + SGH - 25} C ${SGX} ${SGY + SGH + 10} ${VX + VW + 15} ${VY + VH * 0.8} ${VX + VW} ${VY + VH * 0.8}`;
  const PRESS_X = isSmr ? VX + VW * 0.35 : VX + VW * 0.38;
  const PRESS_Y = VY - 30;
  const FUEL_IDS = [
    "r0c0",
    "r0c1",
    "r0c2",
    "r1c0",
    "r1c1",
    "r1c2",
    "r2c0",
    "r2c1",
    "r2c2"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      role: "img",
      "aria-label": `${data.label} schematic`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: `flux-${type}`, cx: "50%", cy: "50%", r: "50%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "0%",
              stopColor: data.coreColor,
              stopOpacity: fluxOpacity
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "stop",
            {
              offset: "60%",
              stopColor: data.coreColor,
              stopOpacity: fluxOpacity * 0.3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: data.coreColor, stopOpacity: "0" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: CX + CW / 2,
            cy: CY + CH / 2,
            rx: CW * 0.7,
            ry: CH * 0.5,
            fill: `url(#flux-${type})`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: VX,
            y: VY,
            width: VW,
            height: VH,
            rx: 10,
            fill: "#0d1117",
            stroke: "#4b5563",
            strokeWidth: 2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CX,
            y: CY,
            width: CW,
            height: CH,
            rx: 4,
            fill: `${data.coreColor}18`,
            stroke: `${data.coreColor}60`,
            strokeWidth: 1.5
          }
        ),
        FUEL_IDS.map((id, i) => {
          const r = Math.floor(i / 3);
          const c = i % 3;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: CX + 6 + c * ((CW - 12) / 3 + 1),
              y: CY + 5 + r * ((CH - 10) / 3 + 2),
              width: (CW - 12) / 3 - 1,
              height: (CH - 10) / 3 - 2,
              rx: 1,
              fill: data.coreColor,
              opacity: 0.8
            },
            `fuel-${id}`
          );
        }),
        ["p30", "p50", "p70"].map((pos) => {
          const frac = pos === "p30" ? 0.3 : pos === "p50" ? 0.5 : 0.7;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: CX + CW * frac - 4,
              y: CY,
              width: 8,
              height: rodH,
              rx: 2,
              fill: "#374151",
              stroke: "#6b7280",
              strokeWidth: 1,
              opacity: 0.95
            },
            `cr-${pos}`
          );
        }),
        !isSmr && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: PRESS_X,
              y: PRESS_Y,
              width: 24,
              height: 24,
              rx: 5,
              fill: "#1d4ed820",
              stroke: "#3b82f6",
              strokeWidth: 1.5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: PRESS_X + 12,
              y1: PRESS_Y + 24,
              x2: PRESS_X + 12,
              y2: VY,
              stroke: "#3b82f640",
              strokeWidth: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: SGX,
            y: SGY,
            width: SGW,
            height: SGH,
            rx: 7,
            fill: "#581c8720",
            stroke: "#a855f7",
            strokeWidth: 1.5
          }
        ),
        [12, 32, 52, 72].slice(0, isSmr ? 3 : 4).map((yOff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: SGX + 8,
            y1: SGY + yOff,
            x2: SGX + SGW - 8,
            y2: SGY + yOff,
            stroke: "#a855f730",
            strokeWidth: 3,
            strokeLinecap: "round"
          },
          `sg-${yOff}`
        )),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: hotLeg, color: data.coolantHotColor, shouldAnimate: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CoolantPath,
            {
              d: coldLeg,
              color: data.coolantColdColor,
              shouldAnimate: true
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: hotLeg,
              fill: "none",
              stroke: data.coolantHotColor,
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
              stroke: data.coolantColdColor,
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: VX + 3,
            y: VY - 6,
            fill: "#6b7280",
            fontSize: "8.5",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: isSmr ? "SMR Vessel" : "Pressure Vessel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CX + CW / 2,
            y: CY + CH + 13,
            textAnchor: "middle",
            fill: data.coreColor,
            fontSize: "8",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Core"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: SGX + SGW / 2,
            y: SGY - 6,
            textAnchor: "middle",
            fill: "#c084fc",
            fontSize: "8",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "S/G"
          }
        ),
        powerIndicator(W, insertion),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 4, y: H - 5, fill: "#374151", fontSize: "7", fontFamily: "sans-serif", children: "Schematic — not to scale" })
      ]
    }
  );
}
function BWRSVGDiagram({
  insertion,
  shouldAnimate
}) {
  const W = 480;
  const H = 300;
  const fluxOpacity = 0.15 + (1 - insertion / 100) * 0.55;
  const VX = 70;
  const VY = 30;
  const VW = 180;
  const VH = 220;
  const CX = VX + 30;
  const CY = VY + 100;
  const CW = 110;
  const CH = 90;
  const rodH = insertion / 100 * CH * 0.85;
  const SEP_X = VX + 20;
  const SEP_Y = VY + 20;
  const SEP_W = VW - 40;
  const SEP_H = 50;
  const TURB_X = VX + VW + 30;
  const TURB_Y = VY + 20;
  const steamLine = `M ${VX + VW / 2} ${VY} L ${VX + VW / 2} ${VY - 15} L ${TURB_X} ${TURB_Y + 25}`;
  const BWR_FUEL = [
    "b0",
    "b1",
    "b2",
    "b3",
    "b4",
    "b5",
    "b6",
    "b7",
    "b8"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      role: "img",
      "aria-label": "BWR schematic",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "flux-BWR", cx: "50%", cy: "50%", r: "50%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#fbbf24", stopOpacity: fluxOpacity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#fbbf24", stopOpacity: "0" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: CX + CW / 2,
            cy: CY + CH / 2,
            rx: CW * 0.7,
            ry: CH * 0.55,
            fill: "url(#flux-BWR)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: VX,
            y: VY,
            width: VW,
            height: VH,
            rx: 10,
            fill: "#0d1117",
            stroke: "#4b5563",
            strokeWidth: 2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: SEP_X,
            y: SEP_Y,
            width: SEP_W,
            height: SEP_H,
            rx: 4,
            fill: "#7dd3fc12",
            stroke: "#7dd3fc50",
            strokeWidth: 1.5,
            strokeDasharray: "4 2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: SEP_X + SEP_W / 2,
            y: SEP_Y + SEP_H / 2 + 4,
            textAnchor: "middle",
            fill: "#7dd3fc",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "Steam Separator"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CX,
            y: CY,
            width: CW,
            height: CH,
            rx: 4,
            fill: "#fbbf2418",
            stroke: "#fbbf2450",
            strokeWidth: 1.5
          }
        ),
        BWR_FUEL.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CX + 6 + i % 3 * 34,
            y: CY + 5 + Math.floor(i / 3) * 26,
            width: 26,
            height: 20,
            rx: 1,
            fill: "#fbbf24",
            opacity: 0.8
          },
          `bwr-fuel-${id}`
        )),
        ["p30", "p50", "p70"].map((pos) => {
          const frac = pos === "p30" ? 0.3 : pos === "p50" ? 0.5 : 0.7;
          const ry = CY + CH - rodH;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: CX + CW * frac - 4,
              y: ry,
              width: 8,
              height: rodH,
              rx: 2,
              fill: "#374151",
              stroke: "#6b7280",
              strokeWidth: 1,
              opacity: 0.95
            },
            `bwr-cr-${pos}`
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: TURB_X,
            y: TURB_Y,
            width: 80,
            height: 50,
            rx: 7,
            fill: "#0f172a",
            stroke: "#7dd3fc",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: TURB_X + 40,
            y: TURB_Y + 20,
            textAnchor: "middle",
            fill: "#7dd3fc",
            fontSize: "9",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Turbine /"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: TURB_X + 40,
            y: TURB_Y + 34,
            textAnchor: "middle",
            fill: "#7dd3fc",
            fontSize: "9",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Generator"
          }
        ),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: steamLine, color: "#7dd3fc", shouldAnimate: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: VX - 15,
            y: VY + VH + 12,
            width: VW + 30,
            height: 36,
            rx: 6,
            fill: "#1e3a5f",
            stroke: "#3b82f6",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: VX + VW / 2,
            y: VY + VH + 35,
            textAnchor: "middle",
            fill: "#60a5fa",
            fontSize: "9",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Suppression Pool (Wetwell)"
          }
        ),
        powerIndicator(W, insertion),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 4, y: H - 5, fill: "#374151", fontSize: "7", fontFamily: "sans-serif", children: "Schematic — not to scale" })
      ]
    }
  );
}
function CANDUSVGDiagram({
  insertion,
  shouldAnimate
}) {
  const W = 480;
  const H = 300;
  const CAL_X = 30;
  const CAL_Y = 60;
  const CAL_W = 240;
  const CAL_H = 140;
  const numTubes = 6;
  const tubeSpacing = CAL_H / (numTubes + 1);
  const SGX = CAL_X + CAL_W + 35;
  const SGY = CAL_Y + 10;
  const SGW = 60;
  const SGH = 120;
  const hotLeg = `M ${CAL_X + CAL_W} ${CAL_Y + CAL_H / 2} C ${CAL_X + CAL_W + 18} ${CAL_Y + CAL_H / 2} ${SGX} ${SGY + 25} ${SGX} ${SGY + 25}`;
  const coldLeg = `M ${SGX} ${SGY + SGH - 25} C ${SGX} ${SGY + SGH} ${CAL_X + CAL_W + 18} ${CAL_Y + CAL_H - 18} ${CAL_X + CAL_W} ${CAL_Y + CAL_H - 18}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      role: "img",
      "aria-label": "CANDU reactor schematic",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CAL_X,
            y: CAL_Y,
            width: CAL_W,
            height: CAL_H,
            rx: 8,
            fill: "#0d1117",
            stroke: "#4b5563",
            strokeWidth: 2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CAL_X + 2,
            y: CAL_Y + 2,
            width: CAL_W - 4,
            height: CAL_H - 4,
            rx: 7,
            fill: "#0e7490",
            opacity: 0.08
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CAL_X + 4,
            y: CAL_Y - 6,
            fill: "#6b7280",
            fontSize: "8.5",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Calandria (D₂O Moderator)"
          }
        ),
        Array.from({ length: numTubes }, (_, i) => {
          const ty = CAL_Y + tubeSpacing * (i + 1);
          const tubeKey = `tube-y${Math.round(ty)}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: CAL_X,
                y1: ty,
                x2: CAL_X + CAL_W,
                y2: ty,
                stroke: "#fbbf24",
                strokeWidth: 6,
                strokeLinecap: "round",
                opacity: 0.82
              }
            ),
            [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: CAL_X + CAL_W / 5 * n,
                cy: ty,
                r: 3.5,
                fill: "#fbbf24",
                opacity: 0.9
              },
              `${tubeKey}-b${n}`
            ))
          ] }, tubeKey);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CAL_X - 44,
            y: CAL_Y + CAL_H / 2 - 10,
            width: 40,
            height: 20,
            rx: 4,
            fill: "#1f293780",
            stroke: "#4ade80",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CAL_X + CAL_W + 4,
            y: CAL_Y + CAL_H / 2 - 10,
            width: 40,
            height: 20,
            rx: 4,
            fill: "#1f293780",
            stroke: "#4ade80",
            strokeWidth: 1.5
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CAL_X - 24,
            y: CAL_Y + CAL_H / 2 + 4,
            textAnchor: "middle",
            fill: "#4ade80",
            fontSize: "7.5",
            fontFamily: "sans-serif",
            children: "Fuel-A"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CAL_X + CAL_W + 24,
            y: CAL_Y + CAL_H / 2 + 4,
            textAnchor: "middle",
            fill: "#4ade80",
            fontSize: "7.5",
            fontFamily: "sans-serif",
            children: "Fuel-B"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: SGX,
            y: SGY,
            width: SGW,
            height: SGH,
            rx: 7,
            fill: "#581c8720",
            stroke: "#a855f7",
            strokeWidth: 1.5
          }
        ),
        [12, 35, 58, 82, 100].map((yOff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: SGX + 8,
            y1: SGY + yOff,
            x2: SGX + SGW - 8,
            y2: SGY + yOff,
            stroke: "#a855f730",
            strokeWidth: 3,
            strokeLinecap: "round"
          },
          `csg-${yOff}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: SGX + SGW / 2,
            y: SGY - 6,
            textAnchor: "middle",
            fill: "#c084fc",
            fontSize: "8",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "S/G"
          }
        ),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: hotLeg, color: "#f87171", shouldAnimate: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: coldLeg, color: "#22d3ee", shouldAnimate: true })
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
              stroke: "#22d3ee",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          )
        ] }),
        powerIndicator(W, insertion),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 4, y: H - 5, fill: "#374151", fontSize: "7", fontFamily: "sans-serif", children: "Schematic — not to scale" })
      ]
    }
  );
}
function GASSVGDiagram({
  insertion,
  shouldAnimate
}) {
  const W = 480;
  const H = 300;
  const CORE_X = 60;
  const CORE_Y = 40;
  const CORE_W = 200;
  const CORE_H = 200;
  const HEX_R = 22;
  const hexCenters = [
    [CORE_X + 100, CORE_Y + 55],
    [CORE_X + 55, CORE_Y + 95],
    [CORE_X + 145, CORE_Y + 95],
    [CORE_X + 100, CORE_Y + 135],
    [CORE_X + 55, CORE_Y + 165],
    [CORE_X + 145, CORE_Y + 165],
    [CORE_X + 100, CORE_Y + 195]
  ];
  const hexPath = (cx, cy, r) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = Math.PI / 180 * (60 * i - 30);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  };
  const SG_X = CORE_X + CORE_W + 35;
  const SG_Y = CORE_Y + 20;
  const hotPath = `M ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 - 15} C ${CORE_X + CORE_W + 20} ${CORE_Y + CORE_H / 2 - 15} ${SG_X} ${SG_Y + 20} ${SG_X} ${SG_Y + 20}`;
  const coldPath = `M ${SG_X} ${SG_Y + 130} C ${SG_X} ${SG_Y + 150} ${CORE_X + CORE_W + 20} ${CORE_Y + CORE_H / 2 + 15} ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 + 15}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      role: "img",
      "aria-label": "Gas-cooled reactor schematic",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CORE_X - 10,
            y: CORE_Y - 10,
            width: CORE_W + 20,
            height: CORE_H + 20,
            rx: 8,
            fill: "#0d1117",
            stroke: "#4b5563",
            strokeWidth: 2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CORE_X - 8,
            y: CORE_Y - 8,
            width: CORE_W + 16,
            height: CORE_H + 16,
            rx: 7,
            fill: "#92400e",
            opacity: 0.07
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X - 8,
            y: CORE_Y - 14,
            fill: "#6b7280",
            fontSize: "8.5",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Graphite Core"
          }
        ),
        hexCenters.map(([cx, cy]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: hexPath(cx, cy, HEX_R),
              fill: "#92400e20",
              stroke: "#fb923c60",
              strokeWidth: 1.5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: cx - 4,
              y: cy - HEX_R * 0.5,
              width: 8,
              height: HEX_R,
              rx: 2,
              fill: "#374151",
              stroke: "#6b7280",
              strokeWidth: 0.8,
              opacity: 0.9
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: 5, fill: "#fb923c", opacity: 0.85 })
        ] }, `hex-cx${Math.round(cx)}-cy${Math.round(cy)}`)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: SG_X,
            y: SG_Y,
            width: 65,
            height: 150,
            rx: 7,
            fill: "#581c8720",
            stroke: "#a855f7",
            strokeWidth: 1.5
          }
        ),
        [18, 42, 66, 90, 114, 132].map((yOff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: SG_X + 8,
            y1: SG_Y + yOff,
            x2: SG_X + 57,
            y2: SG_Y + yOff,
            stroke: "#a855f730",
            strokeWidth: 3,
            strokeLinecap: "round"
          },
          `gsg-${yOff}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: SG_X + 33,
            y: SG_Y - 6,
            textAnchor: "middle",
            fill: "#c084fc",
            fontSize: "8",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Heat Exch."
          }
        ),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: hotPath, color: "#fb923c", shouldAnimate: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: coldPath, color: "#94a3b8", shouldAnimate: true })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: hotPath,
              fill: "none",
              stroke: "#fb923c",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: coldPath,
              fill: "none",
              stroke: "#94a3b8",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W + 5,
            y: CORE_Y + CORE_H / 2 - 18,
            fill: "#fb923c",
            fontSize: "7.5",
            fontFamily: "sans-serif",
            children: "CO₂ →"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W + 5,
            y: CORE_Y + CORE_H / 2 + 26,
            fill: "#94a3b8",
            fontSize: "7.5",
            fontFamily: "sans-serif",
            children: "← CO₂"
          }
        ),
        powerIndicator(W, insertion),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 4, y: H - 5, fill: "#374151", fontSize: "7", fontFamily: "sans-serif", children: "Schematic — not to scale" })
      ]
    }
  );
}
function MSRSVGDiagram({
  insertion,
  shouldAnimate
}) {
  const W = 480;
  const H = 300;
  const CORE_X = 60;
  const CORE_Y = 60;
  const CORE_W = 120;
  const CORE_H = 160;
  const HX_X = CORE_X + CORE_W + 50;
  const HX_Y = CORE_Y + 20;
  const saltLoop = `M ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 - 20} C ${CORE_X + CORE_W + 25} ${CORE_Y + CORE_H / 2 - 20} ${HX_X} ${HX_Y + 20} ${HX_X} ${HX_Y + 20}`;
  const saltReturn = `M ${HX_X} ${HX_Y + 110} C ${HX_X} ${HX_Y + 130} ${CORE_X + CORE_W + 25} ${CORE_Y + CORE_H / 2 + 20} ${CORE_X + CORE_W} ${CORE_Y + CORE_H / 2 + 20}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      role: "img",
      "aria-label": "Thorium MSR schematic",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CORE_X,
            y: CORE_Y,
            width: CORE_W,
            height: CORE_H,
            rx: 8,
            fill: "#0d1117",
            stroke: "#4ade8060",
            strokeWidth: 2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CORE_X + 2,
            y: CORE_Y + 2,
            width: CORE_W - 4,
            height: CORE_H - 4,
            rx: 7,
            fill: "#4ade80",
            opacity: 0.05
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + 4,
            y: CORE_Y - 6,
            fill: "#4ade80",
            fontSize: "8.5",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "MSR Core (Liquid Salt)"
          }
        ),
        ["ch25", "ch50", "ch75"].map((id) => {
          const frac = id === "ch25" ? 0.25 : id === "ch50" ? 0.5 : 0.75;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: CORE_X + 10,
              y: CORE_Y + CORE_H * frac - 8,
              width: CORE_W - 20,
              height: 16,
              rx: 4,
              fill: "#4ade8025",
              stroke: "#4ade8050",
              strokeWidth: 1
            },
            `msr-ch-${id}`
          );
        }),
        ["g38", "g62"].map((id) => {
          const frac = id === "g38" ? 0.38 : 0.62;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: CORE_X + 8,
              y: CORE_Y + CORE_H * frac - 4,
              width: CORE_W - 16,
              height: 8,
              rx: 2,
              fill: "#374151",
              opacity: 0.7
            },
            `msr-g-${id}`
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W / 2,
            y: CORE_Y + CORE_H + 14,
            textAnchor: "middle",
            fill: "#4ade80",
            fontSize: "8",
            fontFamily: "sans-serif",
            children: "Liquid Th-U Fluoride Salt"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: HX_X,
            y: HX_Y,
            width: 65,
            height: 130,
            rx: 7,
            fill: "#78350f20",
            stroke: "#f59e0b",
            strokeWidth: 1.5
          }
        ),
        [15, 36, 57, 78, 99, 115].map((yOff) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: HX_X + 8,
            y1: HX_Y + yOff,
            x2: HX_X + 57,
            y2: HX_Y + yOff,
            stroke: "#f59e0b30",
            strokeWidth: 3,
            strokeLinecap: "round"
          },
          `mhx-${yOff}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: HX_X + 33,
            y: HX_Y - 6,
            textAnchor: "middle",
            fill: "#f59e0b",
            fontSize: "8",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Heat Exch."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: HX_X + 33,
            y: HX_Y + 145,
            textAnchor: "middle",
            fill: "#6b7280",
            fontSize: "7.5",
            fontFamily: "sans-serif",
            children: "→ secondary salt"
          }
        ),
        shouldAnimate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: saltLoop, color: "#f59e0b", shouldAnimate: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPath, { d: saltReturn, color: "#4ade80", shouldAnimate: true })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: saltLoop,
              fill: "none",
              stroke: "#f59e0b",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: saltReturn,
              fill: "none",
              stroke: "#4ade80",
              strokeWidth: 3,
              strokeDasharray: "10 6",
              opacity: 0.75
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: CORE_X - 55,
            y: CORE_Y + CORE_H / 2 - 20,
            width: 42,
            height: 40,
            rx: 6,
            fill: "#1f293780",
            stroke: "#4ade8060",
            strokeWidth: 1.5,
            strokeDasharray: "3 2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X - 34,
            y: CORE_Y + CORE_H / 2 - 6,
            textAnchor: "middle",
            fill: "#4ade80",
            fontSize: "7",
            fontFamily: "sans-serif",
            children: "Drain"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X - 34,
            y: CORE_Y + CORE_H / 2 + 7,
            textAnchor: "middle",
            fill: "#4ade80",
            fontSize: "7",
            fontFamily: "sans-serif",
            children: "Tank"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: CORE_X - 13,
            y1: CORE_Y + CORE_H / 2,
            x2: CORE_X,
            y2: CORE_Y + CORE_H / 2,
            stroke: "#4ade8040",
            strokeWidth: 2,
            strokeDasharray: "3 2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: CORE_X + CORE_W / 2,
            y: CORE_Y - 20,
            textAnchor: "middle",
            fill: "#6b7280",
            fontSize: "7.5",
            fontFamily: "monospace",
            children: "≈1 bar (near-atmospheric)"
          }
        ),
        powerIndicator(W, insertion),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: 4, y: H - 5, fill: "#374151", fontSize: "7", fontFamily: "sans-serif", children: "Schematic — not to scale" })
      ]
    }
  );
}
function CompactReactorSVG({
  type,
  insertion,
  shouldAnimate,
  data
}) {
  if (type === "PWR" || type === "SMR") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PWRSVGDiagram,
      {
        type,
        insertion,
        shouldAnimate,
        data
      }
    );
  }
  if (type === "BWR") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BWRSVGDiagram, { insertion, shouldAnimate });
  }
  if (type === "CANDU") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CANDUSVGDiagram, { insertion, shouldAnimate });
  }
  if (type === "GAS") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(GASSVGDiagram, { insertion, shouldAnimate });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MSRSVGDiagram, { insertion, shouldAnimate });
}
function ReactorPane({
  paneId,
  reactorType,
  insertion,
  onReactorChange,
  onInsertionChange,
  shouldAnimate
}) {
  const data = REACTOR_DATA[reactorType];
  const powerColor = insertion < 30 ? "text-red-400" : insertion < 70 ? "text-emerald-400" : "text-blue-400";
  const powerLabel = insertion < 30 ? "HIGH" : insertion < 70 ? "NORMAL" : "LOW / SHUTDOWN";
  const tempScale = 1 - insertion / 100;
  const inletTemp = Math.round(
    data.inletC - tempScale * 20 + (1 - tempScale) * 20
  );
  const outletTemp = Math.round(
    data.outletC - tempScale * 20 + (1 - tempScale) * 20
  );
  const thermalPower = Math.round(data.thermalMW * (0.35 + 0.65 * tempScale));
  const telemetryItems = [
    { label: "THERMAL", value: `${thermalPower} MWth`, className: "" },
    { label: "ELECTRICAL", value: `${data.electricalMW} MWe`, className: "" },
    { label: "PRESSURE", value: `${data.pressureBar} bar`, className: "" },
    { label: "INLET", value: `${inletTemp}°C`, className: "text-blue-400" },
    { label: "OUTLET", value: `${outletTemp}°C`, className: "text-red-400" },
    { label: "POWER", value: powerLabel, className: powerColor }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-0 h-full",
      "data-ocid": `reactor-compare.pane.${paneId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 p-3 border-b border-border/60 bg-card/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: reactorType,
            onValueChange: (v) => onReactorChange(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "flex-1 h-8 text-xs font-semibold bg-background/60 border-border/60",
                  "aria-label": `Reactor type for ${paneId} pane`,
                  "data-ocid": `reactor-compare.${paneId}_type_select`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REACTOR_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, className: "text-xs", children: opt.label }, opt.value)) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 min-h-0 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative rounded-lg overflow-hidden border border-cyan-500/20 bg-background/30",
            style: {
              boxShadow: "0 0 16px oklch(0.72 0.22 200 / 0.15), 0 0 48px oklch(0.72 0.22 200 / 0.06), inset 0 0 20px oklch(0.72 0.22 200 / 0.04)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompactReactorSVG,
              {
                type: reactorType,
                insertion,
                shouldAnimate,
                data
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-px bg-border/40 border-t border-b border-border/60 text-[10px] font-mono", children: telemetryItems.map(({ label, value, className }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card/40 px-2 py-1.5 flex flex-col gap-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold ${className || "text-foreground"}`, children: value })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 bg-card/30 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: `rod-${paneId}`,
                className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
                children: "Control Rod Insertion"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground", children: [
              insertion,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Slider,
            {
              id: `rod-${paneId}`,
              min: 0,
              max: 100,
              step: 1,
              value: [insertion],
              onValueChange: ([v]) => onInsertionChange(v),
              "aria-label": `Control rod insertion for ${paneId} pane`,
              "data-ocid": `reactor-compare.${paneId}_rod_slider`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[9px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0% — High Power" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100% — Shutdown" })
          ] })
        ] })
      ]
    }
  );
}
function TelemetryTable({
  leftType,
  rightType
}) {
  const L = REACTOR_DATA[leftType];
  const R = REACTOR_DATA[rightType];
  const rows = [
    {
      label: "Thermal Power",
      left: `${L.thermalMW} MWth`,
      right: `${R.thermalMW} MWth`
    },
    {
      label: "Electrical Output",
      left: `${L.electricalMW} MWe`,
      right: `${R.electricalMW} MWe`
    },
    {
      label: "Thermal Efficiency",
      left: `${L.efficiency}%`,
      right: `${R.efficiency}%`
    },
    { label: "Fuel Type", left: L.fuel, right: R.fuel },
    { label: "Coolant", left: L.coolant, right: R.coolant },
    { label: "Moderator", left: L.moderator, right: R.moderator },
    { label: "Inlet Temp", left: `${L.inletC}°C`, right: `${R.inletC}°C` },
    { label: "Outlet Temp", left: `${L.outletC}°C`, right: `${R.outletC}°C` },
    {
      label: "Pressure",
      left: `${L.pressureBar} bar`,
      right: `${R.pressureBar} bar`
    },
    { label: "Refueling", left: L.refueling, right: R.refueling }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "overflow-x-auto",
      "data-ocid": "reactor-compare.telemetry_table",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-[11px]",
          "aria-label": "Reactor telemetry comparison",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2 px-3 font-mono text-muted-foreground uppercase tracking-wider text-[10px] w-[30%]", children: "Parameter" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2 px-3 font-semibold text-cyan-400 uppercase tracking-wider text-[10px] w-[35%]", children: L.label.split(" ").slice(0, 2).join(" ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-2 px-3 font-semibold text-violet-400 uppercase tracking-wider text-[10px] w-[35%]", children: R.label.split(" ").slice(0, 2).join(" ") })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-border/30 ${i % 2 === 0 ? "bg-muted/20" : ""}`,
                "data-ocid": `reactor-compare.telemetry_row.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3 text-muted-foreground font-medium", children: row.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3 text-center font-mono font-semibold text-foreground", children: row.left }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3 text-center font-mono font-semibold text-foreground", children: row.right })
                ]
              },
              row.label
            )) })
          ]
        }
      )
    }
  );
}
function ReactorComparisonModal({
  isOpen,
  onClose
}) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = !prefersReduced;
  const [leftType, setLeftType] = reactExports.useState("PWR");
  const [rightType, setRightType] = reactExports.useState("BWR");
  const [leftInsertion, setLeftInsertion] = reactExports.useState(40);
  const [rightInsertion, setRightInsertion] = reactExports.useState(40);
  const [syncPanes, setSyncPanes] = reactExports.useState(false);
  const [timeline, setTimeline] = reactExports.useState(50);
  const [activeTab, setActiveTab] = reactExports.useState("specs");
  const modalRef = reactExports.useRef(null);
  const closeButtonRef = reactExports.useRef(null);
  const handleLeftInsertion = reactExports.useCallback(
    (v) => {
      setLeftInsertion(v);
      if (syncPanes) setRightInsertion(v);
    },
    [syncPanes]
  );
  const handleRightInsertion = reactExports.useCallback(
    (v) => {
      setRightInsertion(v);
      if (syncPanes) setLeftInsertion(v);
    },
    [syncPanes]
  );
  const handleTimeline = reactExports.useCallback(
    (v) => {
      setTimeline(v);
      if (syncPanes) {
        setLeftInsertion(v);
        setRightInsertion(v);
      }
    },
    [syncPanes]
  );
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );
  reactExports.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        var _a;
        return (_a = closeButtonRef.current) == null ? void 0 : _a.focus();
      }, 50);
    }
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const handleExportCSV = reactExports.useCallback(() => {
    const L = REACTOR_DATA[leftType];
    const R = REACTOR_DATA[rightType];
    const rows = [
      ["Parameter", L.label, R.label],
      ["Thermal Power (MWth)", String(L.thermalMW), String(R.thermalMW)],
      [
        "Electrical Output (MWe)",
        String(L.electricalMW),
        String(R.electricalMW)
      ],
      ["Thermal Efficiency (%)", String(L.efficiency), String(R.efficiency)],
      ["Fuel", L.fuel, R.fuel],
      ["Coolant", L.coolant, R.coolant],
      ["Moderator", L.moderator, R.moderator],
      ["Inlet Temp (°C)", String(L.inletC), String(R.inletC)],
      ["Outlet Temp (°C)", String(L.outletC), String(R.outletC)],
      ["Pressure (bar)", String(L.pressureBar), String(R.pressureBar)],
      ["Refueling", L.refueling, R.refueling],
      [
        "Control Rod Insertion (%)",
        String(leftInsertion),
        String(rightInsertion)
      ]
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reactor-comparison-${leftType}-vs-${rightType}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [leftType, rightType, leftInsertion, rightInsertion]);
  const handleBackdropKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") onClose();
    },
    [onClose]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.18 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "button",
            tabIndex: 0,
            className: "absolute inset-0 bg-background/90 backdrop-blur-sm cursor-default",
            onClick: onClose,
            onKeyDown: handleBackdropKeyDown,
            "aria-label": "Close modal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.dialog,
          {
            ref: modalRef,
            "aria-modal": "true",
            "aria-label": "Reactor Comparison Dashboard",
            open: true,
            className: "relative z-10 flex flex-col bg-card border border-border/60 rounded-2xl overflow-hidden shadow-2xl p-0",
            style: {
              width: "95vw",
              maxWidth: "1400px",
              height: "90vh",
              boxShadow: "0 0 0 1px oklch(0.72 0.22 200 / 0.18), 0 0 40px oklch(0.72 0.22 200 / 0.12), 0 32px 64px rgba(0,0,0,0.6)"
            },
            initial: { scale: 0.96, opacity: 0, y: 12 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.96, opacity: 0, y: 12 },
            transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
            onKeyDown: handleKeyDown,
            "data-ocid": "reactor-compare.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 left-0 right-0 h-px pointer-events-none z-10",
                  style: {
                    background: "linear-gradient(90deg, transparent 0%, oklch(0.72 0.22 200 / 0.5) 30%, oklch(0.75 0.2 256 / 0.7) 50%, oklch(0.72 0.22 200 / 0.5) 70%, transparent 100%)"
                  },
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/60 bg-card/80 backdrop-blur-sm shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-2 w-2 rounded-full bg-cyan-400 animate-pulse",
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground", children: "Reactor Comparison Dashboard" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-xs text-muted-foreground", children: "Side-by-side simulator" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "h-7 text-xs gap-1.5 border-border/60",
                      onClick: handleExportCSV,
                      "aria-label": "Export comparison data as CSV",
                      "data-ocid": "reactor-compare.export_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Export CSV" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      ref: closeButtonRef,
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 w-7 p-0 rounded-full",
                      onClick: onClose,
                      "aria-label": "Close comparison modal",
                      "data-ocid": "reactor-compare.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 min-h-0 overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 flex-1 min-h-0 divide-x divide-border/60 overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "overflow-y-auto flex flex-col",
                      style: {
                        borderLeft: "2px solid transparent",
                        borderImageSlice: 1,
                        borderImageSource: "linear-gradient(to bottom, oklch(0.72 0.22 200 / 0.6), oklch(0.75 0.2 256 / 0.2))"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ReactorPane,
                        {
                          paneId: "left",
                          reactorType: leftType,
                          insertion: leftInsertion,
                          onReactorChange: setLeftType,
                          onInsertionChange: handleLeftInsertion,
                          shouldAnimate
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "overflow-y-auto flex flex-col",
                      style: {
                        borderRight: "2px solid transparent",
                        borderImageSlice: 1,
                        borderImageSource: "linear-gradient(to bottom, oklch(0.78 0.2 286 / 0.6), oklch(0.78 0.2 286 / 0.2))"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ReactorPane,
                        {
                          paneId: "right",
                          reactorType: rightType,
                          insertion: rightInsertion,
                          onReactorChange: setRightType,
                          onInsertionChange: handleRightInsertion,
                          shouldAnimate
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 border-t border-border/60 bg-card/60 flex flex-col max-h-[45%] overflow-y-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-4 py-2 border-b border-border/40 bg-card/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider shrink-0", children: "Timeline" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Slider,
                      {
                        min: 0,
                        max: 100,
                        step: 1,
                        value: [timeline],
                        onValueChange: ([v]) => handleTimeline(v),
                        "aria-label": "Simulation timeline scrub",
                        "data-ocid": "reactor-compare.timeline_slider"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-foreground shrink-0 w-10 text-right", children: [
                      timeline,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSyncPanes((v) => !v),
                        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-colors ${syncPanes ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400" : "bg-muted/40 border-border/40 text-muted-foreground hover:text-foreground"}`,
                        "aria-pressed": syncPanes,
                        "aria-label": syncPanes ? "Unsync panes" : "Sync panes",
                        "data-ocid": "reactor-compare.sync_toggle",
                        children: [
                          syncPanes ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Unlink2, { className: "h-3 w-3" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sync Panes" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center gap-0 border-b border-border/40",
                      role: "tablist",
                      "aria-label": "Bottom panel tabs",
                      children: ["specs", "telemetry"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          role: "tab",
                          type: "button",
                          "aria-selected": activeTab === tab,
                          onClick: () => setActiveTab(tab),
                          className: `px-4 py-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                          "data-ocid": `reactor-compare.${tab}_tab`,
                          children: tab === "specs" ? "Reactor Specs" : "Telemetry Comparison"
                        },
                        tab
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto", children: activeTab === "specs" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 divide-x divide-border/40 text-xs", children: [
                    {
                      type: leftType,
                      label: "Left Pane",
                      color: "text-cyan-400"
                    },
                    {
                      type: rightType,
                      label: "Right Pane",
                      color: "text-violet-400"
                    }
                  ].map(({ type, label, color }) => {
                    const d = REACTOR_DATA[type];
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "px-4 py-3 flex flex-col gap-1.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: `text-[10px] font-mono uppercase tracking-wider ${color}`,
                              children: [
                                label,
                                " — ",
                                d.label
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-[11px]", children: d.description })
                        ]
                      },
                      type
                    );
                  }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TelemetryTable, { leftType, rightType }) })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function computeSimState(base) {
  const {
    controlRodInsertion,
    powerLevel,
    coolantTempIn,
    coolantFlow,
    moderatorVoided
  } = base;
  const voidPenalty = moderatorVoided ? 0.08 : 0;
  const keff = Math.max(
    0,
    1 + (1 - controlRodInsertion / 100) * 0.15 - (coolantTempIn - 300) * 2e-4 - voidPenalty
  );
  const thermalPower = powerLevel * (keff > 0.99 ? 1 + (keff - 1) * 10 : 0.5);
  const coolantTempOut = coolantTempIn + thermalPower / (coolantFlow * 4.2);
  const neutronFluxDensity = Math.min(1, thermalPower / 3e3);
  const coreAvgTemp = (coolantTempIn + coolantTempOut) / 2;
  return {
    keff,
    thermalPower,
    coolantTempOut,
    neutronFluxDensity,
    coreAvgTemp
  };
}
class WebGLErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.warn("WebGL canvas error:", error, info);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
function getTempColor(t) {
  if (t < 0.33)
    return new Color().lerpColors(
      new Color(128),
      new Color(65535),
      t / 0.33
    );
  if (t < 0.66)
    return new Color().lerpColors(
      new Color(65535),
      new Color(16776960),
      (t - 0.33) / 0.33
    );
  return new Color().lerpColors(
    new Color(16776960),
    new Color(16729088),
    (t - 0.66) / 0.34
  );
}
const FUEL_ROD_ROWS = 9;
const FUEL_ROD_COLS = 9;
const ROD_RADIUS = 0.055;
const ROD_HEIGHT = 2.6;
const ROD_SPACING = 0.2;
const FuelRodAssembly = reactExports.memo(function FuelRodAssembly2({
  neutronFlux,
  coreTemp
}) {
  const meshRef = reactExports.useRef(null);
  const glowRef = reactExports.useRef(null);
  const count = FUEL_ROD_ROWS * FUEL_ROD_COLS;
  const dummy = reactExports.useMemo(() => new Object3D(), []);
  reactExports.useEffect(() => {
    if (!meshRef.current || !glowRef.current) return;
    let idx = 0;
    for (let r = 0; r < FUEL_ROD_ROWS; r++) {
      for (let c = 0; c < FUEL_ROD_COLS; c++) {
        const x = (r - (FUEL_ROD_ROWS - 1) / 2) * ROD_SPACING;
        const z = (c - (FUEL_ROD_COLS - 1) / 2) * ROD_SPACING;
        dummy.position.set(x, 0, z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
        glowRef.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);
  useFrame(({ clock }) => {
    if (!glowRef.current) return;
    const t = clock.getElapsedTime();
    const glowIntensity = 0.5 + 0.5 * Math.sin(t * 2.5) * neutronFlux;
    const mat = glowRef.current.material;
    mat.emissiveIntensity = glowIntensity * 4 * neutronFlux + 0.5;
    const tempT = Math.min(1, (coreTemp - 280) / 300);
    mat.emissive = getTempColor(tempT);
  });
  const fuelMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(2763306),
      metalness: 0.9,
      roughness: 0.1
    }),
    []
  );
  const glowMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(4386),
      emissive: new Color(51455),
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.5,
      metalness: 0,
      roughness: 1
    }),
    []
  );
  const cylGeo = reactExports.useMemo(
    () => new CylinderGeometry(ROD_RADIUS, ROD_RADIUS, ROD_HEIGHT, 10),
    []
  );
  const glowGeo = reactExports.useMemo(
    () => new CylinderGeometry(
      ROD_RADIUS * 2,
      ROD_RADIUS * 2,
      ROD_HEIGHT * 1.05,
      10
    ),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, 0, 0], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "instancedMesh",
      {
        ref: meshRef,
        args: [cylGeo, fuelMat, count],
        castShadow: true,
        receiveShadow: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("instancedMesh", { ref: glowRef, args: [glowGeo, glowMat, count] })
  ] });
});
const CONTROL_ROD_POSITIONS = [
  [0, 0],
  [0.44, 0],
  [-0.44, 0],
  [0, 0.44],
  [0, -0.44],
  [0.44, 0.44],
  [-0.44, -0.44]
];
const ControlRods = reactExports.memo(function ControlRods2({
  insertion
}) {
  const yOffset = 1.3 - insertion / 100 * 2.6;
  const rodMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(1710638),
      metalness: 0.95,
      roughness: 0.05,
      emissive: new Color(657952),
      emissiveIntensity: 0.3
    }),
    []
  );
  const capMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(6974090),
      metalness: 0.98,
      roughness: 0.02
    }),
    []
  );
  const cylGeo = reactExports.useMemo(
    () => new CylinderGeometry(0.035, 0.035, 3, 8),
    []
  );
  const capGeo = reactExports.useMemo(
    () => new CylinderGeometry(0.065, 0.065, 0.1, 8),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { children: CONTROL_ROD_POSITIONS.map(([x, z]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [x, yOffset, z], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: cylGeo, material: rodMat, castShadow: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        geometry: capGeo,
        material: capMat,
        position: [0, 1.55, 0],
        castShadow: true
      }
    )
  ] }, `cr-${x}-${z}`)) });
});
const COOLANT_COUNT = 120;
const CoolantParticles = reactExports.memo(function CoolantParticles2({
  flux,
  active
}) {
  const meshRef = reactExports.useRef(null);
  const particles = reactExports.useRef([]);
  const dummy = reactExports.useMemo(() => new Object3D(), []);
  const initParticle = reactExports.useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.6 + Math.random() * 0.5;
    return {
      position: new Vector3(
        Math.cos(angle) * r * 0.8,
        -1.3 + Math.random() * 0.3,
        Math.sin(angle) * r * 0.8
      ),
      velocity: new Vector3(
        (Math.random() - 0.5) * 0.01,
        0.5 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.01
      ),
      life: Math.random(),
      maxLife: 2.5 + Math.random() * 2
    };
  }, []);
  reactExports.useEffect(() => {
    particles.current = Array.from({ length: COOLANT_COUNT }, initParticle);
  }, [initParticle]);
  const mat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(65535),
      emissive: new Color(43775),
      emissiveIntensity: 3.5,
      transparent: true,
      opacity: 0.85,
      metalness: 0,
      roughness: 0
    }),
    []
  );
  const geo = reactExports.useMemo(() => new SphereGeometry(0.03, 4, 4), []);
  useFrame((_, delta) => {
    if (!meshRef.current || !active) return;
    const speed = 0.5 + flux * 2;
    particles.current.forEach((p, i) => {
      p.life += delta * speed;
      p.position.addScaledVector(p.velocity, delta * speed);
      if (p.life > p.maxLife || p.position.y > 1.6) {
        Object.assign(p, initParticle());
      }
      dummy.position.copy(p.position);
      const s = 0.8 + 0.4 * (p.life / p.maxLife);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("instancedMesh", { ref: meshRef, args: [geo, mat, COOLANT_COUNT] });
});
const NEUTRON_COUNT = 200;
const NeutronParticles = reactExports.memo(function NeutronParticles2({
  flux,
  active
}) {
  const meshRef = reactExports.useRef(null);
  const particles = reactExports.useRef([]);
  const dummy = reactExports.useMemo(() => new Object3D(), []);
  const initNeutron = reactExports.useCallback(() => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * 0.5;
    return {
      position: new Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        (Math.random() - 0.5) * 2,
        r * Math.sin(phi) * Math.sin(theta)
      ),
      velocity: new Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize().multiplyScalar(1.2 + Math.random() * 1.2),
      life: Math.random() * 0.5,
      maxLife: 0.4 + Math.random() * 0.8
    };
  }, []);
  reactExports.useEffect(() => {
    particles.current = Array.from({ length: NEUTRON_COUNT }, initNeutron);
  }, [initNeutron]);
  const mat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(16777215),
      emissive: new Color(8974079),
      emissiveIntensity: 6,
      transparent: true,
      opacity: 0.95
    }),
    []
  );
  const geo = reactExports.useMemo(() => new SphereGeometry(0.015, 4, 4), []);
  useFrame((_, delta) => {
    if (!meshRef.current || !active || flux < 0.05) return;
    const speed = flux * 3;
    particles.current.forEach((p, i) => {
      p.life += delta * speed;
      p.position.addScaledVector(p.velocity, delta * speed * 0.5);
      if (p.life > p.maxLife || p.position.length() > 1.8) {
        Object.assign(p, initNeutron());
      }
      dummy.position.copy(p.position);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("instancedMesh", { ref: meshRef, args: [geo, mat, NEUTRON_COUNT] });
});
const STEAM_COUNT = 35;
const SteamParticles = reactExports.memo(function SteamParticles2({
  active
}) {
  const meshRef = reactExports.useRef(null);
  const particles = reactExports.useRef([]);
  const dummy = reactExports.useMemo(() => new Object3D(), []);
  const initSteam = reactExports.useCallback(
    () => ({
      position: new Vector3(
        (Math.random() - 0.5) * 1.2,
        1.3 + Math.random() * 0.2,
        (Math.random() - 0.5) * 1.2
      ),
      velocity: new Vector3(
        (Math.random() - 0.5) * 0.08,
        0.25 + Math.random() * 0.35,
        (Math.random() - 0.5) * 0.08
      ),
      life: Math.random() * 2,
      maxLife: 3 + Math.random() * 2
    }),
    []
  );
  reactExports.useEffect(() => {
    particles.current = Array.from({ length: STEAM_COUNT }, initSteam);
  }, [initSteam]);
  const mat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(16777215),
      emissive: new Color(11193582),
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.3
    }),
    []
  );
  const geo = reactExports.useMemo(() => new SphereGeometry(0.07, 4, 4), []);
  useFrame((_, delta) => {
    if (!meshRef.current || !active) return;
    particles.current.forEach((p, i) => {
      p.life += delta;
      p.position.addScaledVector(p.velocity, delta);
      if (p.life > p.maxLife || p.position.y > 4) {
        Object.assign(p, initSteam());
      }
      dummy.position.copy(p.position);
      const fade = 1 - p.life / p.maxLife;
      dummy.scale.setScalar(fade * 1.8 + 0.5);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("instancedMesh", { ref: meshRef, args: [geo, mat, STEAM_COUNT] });
});
const PressureVessel = reactExports.memo(function PressureVessel2() {
  const outerMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(2767434),
      metalness: 0.92,
      roughness: 0.08,
      side: DoubleSide,
      envMapIntensity: 1.5
    }),
    []
  );
  const innerMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(1713456),
      metalness: 0.8,
      roughness: 0.2,
      side: BackSide
    }),
    []
  );
  const outerGeo = reactExports.useMemo(
    () => new CylinderGeometry(1.65, 1.65, 3.5, 64, 1, true),
    []
  );
  const bottomGeo = reactExports.useMemo(() => new RingGeometry(1.4, 1.65, 64), []);
  const headGeo = reactExports.useMemo(
    () => new SphereGeometry(1.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    []
  );
  const shroudGeo = reactExports.useMemo(
    () => new CylinderGeometry(1.05, 1.05, 3.1, 32, 1, true),
    []
  );
  const bottomDishGeo = reactExports.useMemo(
    () => new SphereGeometry(
      1.65,
      32,
      16,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2
    ),
    []
  );
  const gridGeo = reactExports.useMemo(() => new RingGeometry(0.2, 1.05, 32, 1), []);
  const gridMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(4478310),
      metalness: 0.9,
      roughness: 0.1,
      side: DoubleSide
    }),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: outerGeo, material: outerMat, castShadow: true, receiveShadow: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: outerGeo, material: innerMat }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        geometry: headGeo,
        material: outerMat,
        position: [0, 1.75, 0],
        castShadow: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        geometry: bottomDishGeo,
        material: outerMat,
        position: [0, -1.75, 0],
        rotation: [Math.PI, 0, 0],
        castShadow: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: shroudGeo, material: gridMat, castShadow: true }),
    [-0.9, 0, 0.9].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        geometry: gridGeo,
        material: gridMat,
        position: [0, y, 0],
        rotation: [Math.PI / 2, 0, 0]
      },
      `grid-${y}`
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        geometry: bottomGeo,
        material: outerMat,
        position: [0, -1.75, 0],
        rotation: [Math.PI / 2, 0, 0]
      }
    )
  ] });
});
const CoolantPipes = reactExports.memo(function CoolantPipes2() {
  const pipeMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(1981023),
      metalness: 0.95,
      roughness: 0.05,
      emissive: new Color(13158),
      emissiveIntensity: 0.5
    }),
    []
  );
  const pipeGeo = reactExports.useMemo(
    () => new TorusGeometry(1.4, 0.045, 8, 32, Math.PI * 0.6),
    []
  );
  const vertGeo = reactExports.useMemo(
    () => new CylinderGeometry(0.045, 0.045, 0.9, 8),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { rotation: [0, i * Math.PI / 2, 0], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        geometry: pipeGeo,
        material: pipeMat,
        position: [0, -0.7, 0],
        rotation: [Math.PI / 2, 0, Math.PI * 0.2]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        geometry: vertGeo,
        material: pipeMat,
        position: [1.4, -0.25, 0]
      }
    )
  ] }, i)) });
});
const CherenkovGlow = reactExports.memo(function CherenkovGlow2({ flux }) {
  const meshRef = reactExports.useRef(null);
  const diskRef = reactExports.useRef(null);
  const outerRef = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (!meshRef.current || !diskRef.current || !outerRef.current) return;
    const t = clock.getElapsedTime();
    const intensity = (0.5 + 0.5 * Math.sin(t * 2.5)) * flux;
    const mat = meshRef.current.material;
    mat.emissiveIntensity = intensity * 3.5 + 0.5;
    mat.opacity = 0.35 + intensity * 0.4;
    const dMat = diskRef.current.material;
    dMat.emissiveIntensity = intensity * 2;
    dMat.opacity = 0.2 + intensity * 0.3;
    const oMat = outerRef.current.material;
    oMat.emissiveIntensity = intensity * 1.5 + 0.2;
    oMat.opacity = 0.1 + intensity * 0.15;
  });
  const cylinderGeo = reactExports.useMemo(
    () => new CylinderGeometry(0.9, 0.9, 2.8, 32, 1, true),
    []
  );
  const outerCylGeo = reactExports.useMemo(
    () => new CylinderGeometry(1.2, 1.2, 3, 32, 1, true),
    []
  );
  const diskGeo = reactExports.useMemo(() => new CircleGeometry(0.9, 32), []);
  const glowMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(4403),
      emissive: new Color(51455),
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.45,
      side: DoubleSide,
      depthWrite: false
    }),
    []
  );
  const outerGlowMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(2080),
      emissive: new Color(22015),
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.15,
      side: DoubleSide,
      depthWrite: false
    }),
    []
  );
  const diskMat = reactExports.useMemo(
    () => new MeshStandardMaterial({
      color: new Color(2080),
      emissive: new Color(33023),
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.25,
      depthWrite: false
    }),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { ref: meshRef, geometry: cylinderGeo, material: glowMat }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { ref: outerRef, geometry: outerCylGeo, material: outerGlowMat }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mesh",
      {
        ref: diskRef,
        geometry: diskGeo,
        material: diskMat,
        position: [0, 1.4, 0],
        rotation: [-Math.PI / 2, 0, 0]
      }
    )
  ] });
});
const CoreLighting = reactExports.memo(function CoreLighting2({
  flux,
  powerLevel
}) {
  const coreRef = reactExports.useRef(null);
  const hotRef = reactExports.useRef(null);
  useFrame(({ clock }) => {
    if (!coreRef.current || !hotRef.current) return;
    const t = clock.getElapsedTime();
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.5);
    const baseIntensity = (0.8 + pulse * 0.8) * flux * (powerLevel / 3e3) * 6;
    coreRef.current.intensity = baseIntensity;
    hotRef.current.intensity = baseIntensity * 0.8;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "directionalLight",
      {
        position: [5, 8, 4],
        intensity: 2.8,
        color: 16774624,
        castShadow: true,
        "shadow-mapSize": [2048, 2048],
        "shadow-camera-far": 30,
        "shadow-camera-left": -8,
        "shadow-camera-right": 8,
        "shadow-camera-top": 8,
        "shadow-camera-bottom": -8
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "directionalLight",
      {
        position: [-4, 2, -3],
        intensity: 0.7,
        color: 6328575
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "directionalLight",
      {
        position: [0, -3, 5],
        intensity: 0.35,
        color: 35020
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointLight",
      {
        ref: coreRef,
        position: [0, 0, 0],
        color: 51455,
        intensity: 3,
        distance: 8,
        decay: 2,
        castShadow: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointLight",
      {
        ref: hotRef,
        position: [0, 0.5, 0],
        color: 16746496,
        intensity: 2,
        distance: 5,
        decay: 2
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.06, color: 662058 })
  ] });
});
function SceneSetup() {
  const { gl } = useThree();
  reactExports.useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = PCFSoftShadowMap;
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.toneMapping = ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [gl]);
  return null;
}
const ReactorScene = reactExports.memo(function ReactorScene2({
  sim,
  reducedMotion
}) {
  const active = sim.isPlaying && !reducedMotion;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SceneSetup, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("fog", { attach: "fog", args: [198672, 10, 28] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CoreLighting, { flux: sim.neutronFluxDensity, powerLevel: sim.powerLevel }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PressureVessel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantPipes, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FuelRodAssembly,
      {
        neutronFlux: sim.neutronFluxDensity,
        coreTemp: sim.coreAvgTemp
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ControlRods, { insertion: sim.controlRodInsertion }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CherenkovGlow, { flux: sim.neutronFluxDensity }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CoolantParticles, { flux: sim.neutronFluxDensity, active }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NeutronParticles, { flux: sim.neutronFluxDensity, active }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SteamParticles, { active: active && sim.coolantTempOut > 320 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitControls,
      {
        enableDamping: true,
        dampingFactor: 0.05,
        minPolarAngle: 0.3,
        maxPolarAngle: 1.8,
        minDistance: 4,
        maxDistance: 18,
        autoRotate: false,
        makeDefault: true
      }
    )
  ] });
});
const HOLO_LABELS = [
  {
    id: "fuel",
    text: "FUEL ROD ARRAY",
    subtext: "UO₂ Zircaloy-4 Clad",
    screenX: 55,
    screenY: 42,
    visible: true
  },
  {
    id: "control",
    text: "CONTROL RODS",
    subtext: "B₄C Neutron Absorber",
    screenX: 52,
    screenY: 22,
    visible: true
  },
  {
    id: "coolant",
    text: "PRIMARY COOLANT",
    subtext: "H₂O @ 15.5 MPa",
    screenX: 20,
    screenY: 55,
    visible: true
  },
  {
    id: "cherenkov",
    text: "CHERENKOV GLOW",
    subtext: "β⁻ → Čerenkov Radiation",
    screenX: 72,
    screenY: 35,
    visible: true
  },
  {
    id: "shroud",
    text: "CORE SHROUD",
    subtext: "316L Stainless Steel",
    screenX: 18,
    screenY: 38,
    visible: true
  }
];
function HoloLabels({ visible }) {
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 pointer-events-none",
      style: { zIndex: 10 },
      children: HOLO_LABELS.map((lbl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute flex items-center gap-1.5",
          style: { left: `${lbl.screenX}%`, top: `${lbl.screenY}%` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "holo-panel px-2 py-1 rounded",
                style: { borderLeft: "1px solid oklch(0.72 0.25 286 / 0.6)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "holo-text text-[10px] leading-tight", children: lbl.text }),
                  lbl.subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground font-mono opacity-70", children: lbl.subtext })
                ]
              }
            )
          ]
        },
        lbl.id
      ))
    }
  );
}
function GaugeBar({
  label,
  value,
  min: min2,
  max: max2,
  unit,
  warnAbove,
  dangerAbove
}) {
  const pct = Math.min(100, Math.max(0, (value - min2) / (max2 - min2) * 100));
  const isDanger = dangerAbove !== void 0 && value > dangerAbove;
  const isWarn = !isDanger && warnAbove !== void 0 && value > warnAbove;
  const barColor = isDanger ? "#ef4444" : isWarn ? "#f59e0b" : "#00d4ff";
  const glowColor = isDanger ? "rgba(239,68,68,0.5)" : isWarn ? "rgba(245,158,11,0.5)" : "rgba(0,212,255,0.5)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono uppercase tracking-wider", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `text-xs font-mono font-bold ${isDanger ? "text-red-400" : isWarn ? "text-amber-400" : "text-foreground"}`,
          children: [
            typeof value === "number" ? value.toFixed(value < 10 ? 3 : 0) : value,
            " ",
            unit
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-2 bg-muted/30 rounded-full overflow-hidden",
        style: { boxShadow: "inset 0 0 4px rgba(0,0,0,0.5)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full transition-all duration-500",
            style: {
              width: `${pct}%`,
              background: barColor,
              boxShadow: `0 0 8px ${glowColor}`
            }
          }
        )
      }
    )
  ] });
}
function SimTimeline({
  simTime,
  isPlaying,
  onToggle,
  onReset,
  onSeek
}) {
  const MAX_TIME = 120;
  const pct = simTime / MAX_TIME * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "holo-panel rounded-lg p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest", children: "SIMULATION TIMELINE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-foreground", children: [
        simTime.toFixed(1),
        "s / ",
        MAX_TIME,
        "s"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 mb-3", children: ["NEUTRON FLUX", "COOLANT FLOW", "FUEL TEMP"].map((track, ti) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-mono w-20 shrink-0", children: track }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "timeline-track flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-y-0 left-0 bg-primary/40 rounded-full",
            style: { width: `${pct * (0.85 + ti * 0.05)}%` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "timeline-handle",
            style: {
              left: `calc(${Math.min(95, pct * (0.85 + ti * 0.05))}% - 8px)`
            }
          }
        )
      ] })
    ] }, track)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "w-7 h-7 text-muted-foreground hover:text-foreground",
          onClick: onReset,
          "data-ocid": "reactor.timeline_skip_back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipBack, { className: "w-3 h-3" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "w-8 h-8 bg-primary/20 text-primary hover:bg-primary/30",
          onClick: onToggle,
          "data-ocid": "reactor.sim_play_button",
          children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "w-7 h-7 text-muted-foreground hover:text-foreground",
          "data-ocid": "reactor.timeline_skip_forward",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-3 h-3" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: MAX_TIME,
          step: 0.5,
          value: simTime,
          onChange: (e) => onSeek(Number.parseFloat(e.target.value)),
          className: "w-full h-2 appearance-none bg-muted/40 rounded-full cursor-pointer accent-primary",
          "data-ocid": "reactor.timeline_scrubber"
        }
      ) })
    ] })
  ] });
}
const REACTOR_TYPE_DATA = {
  PWR: {
    name: "PWR",
    full: "Pressurized Water Reactor",
    coolantFlow: 18e3,
    maxPower: 3400,
    country: "USA/FR/CN"
  },
  BWR: {
    name: "BWR",
    full: "Boiling Water Reactor",
    coolantFlow: 14e3,
    maxPower: 3300,
    country: "USA/JP"
  },
  CANDU: {
    name: "CANDU",
    full: "CANDU Pressurized Heavy Water",
    coolantFlow: 16e3,
    maxPower: 2e3,
    country: "CA"
  },
  SMR: {
    name: "SMR",
    full: "Small Modular Reactor",
    coolantFlow: 5e3,
    maxPower: 300,
    country: "Multi"
  }
};
function ClassicReactorView({
  sim,
  updateSim,
  handleReset
}) {
  const [classicTab, setClassicTab] = reactExports.useState(
    "depletion"
  );
  const [animTime, setAnimTime] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!sim.isPlaying) return;
    const id = setInterval(() => setAnimTime((t) => t + 0.05), 50);
    return () => clearInterval(id);
  }, [sim.isPlaying]);
  const coreGlowIntensity = sim.neutronFluxDensity;
  const powerPct = Math.min(100, sim.powerLevel / 3400 * 100);
  const keffStatus = sim.keff > 1.05 ? "SUPERCRITICAL" : sim.keff > 0.99 ? "CRITICAL" : "SUBCRITICAL";
  const keffColor = sim.keff > 1.05 ? "#ef4444" : sim.keff > 0.99 ? "#f59e0b" : "#00d4ff";
  const efficiency = 34;
  const neutronDots = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: i / 12 * 360 + animTime * (30 + i * 5),
    r: 60 + i % 3 * 20,
    opacity: 0.4 + 0.6 * (i % 3 / 3)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-full rounded-xl overflow-hidden",
      style: {
        background: "linear-gradient(135deg, #050a14 0%, #0a0e1a 50%, #070d18 100%)",
        border: "1px solid rgba(0, 212, 255, 0.25)",
        boxShadow: "0 0 40px rgba(0, 100, 200, 0.15), inset 0 0 60px rgba(0, 50, 100, 0.1)",
        fontFamily: "'Geist Mono', monospace"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(0,212,255,0.15)",
              background: "rgba(0,20,40,0.8)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#00ff88",
                      boxShadow: "0 0 8px #00ff88",
                      animation: "pulse 2s infinite"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      color: "#00d4ff",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.15em"
                    },
                    children: "REACTOR THEORY & DESIGN — DIGITAL TWIN"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateSim({ isPlaying: !sim.isPlaying }),
                    style: {
                      padding: "4px 12px",
                      borderRadius: 4,
                      border: "1px solid rgba(0,255,136,0.4)",
                      background: sim.isPlaying ? "rgba(0,255,136,0.2)" : "rgba(0,255,136,0.08)",
                      color: "#00ff88",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.1em"
                    },
                    "data-ocid": "reactor.classic_play_button",
                    children: sim.isPlaying ? "⏸ PAUSE" : "▶ START SIMULATOR"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    style: {
                      padding: "4px 10px",
                      borderRadius: 4,
                      border: "1px solid rgba(0,212,255,0.3)",
                      background: "rgba(0,212,255,0.08)",
                      color: "#00d4ff",
                      fontSize: 10,
                      cursor: "pointer"
                    },
                    "data-ocid": "reactor.classic_load",
                    children: "LOAD DESIGN"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    style: {
                      padding: "4px 10px",
                      borderRadius: 4,
                      border: "1px solid rgba(0,212,255,0.3)",
                      background: "rgba(0,212,255,0.08)",
                      color: "#00d4ff",
                      fontSize: 10,
                      cursor: "pointer"
                    },
                    "data-ocid": "reactor.classic_save",
                    children: "SAVE DESIGN"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleReset,
                    style: {
                      padding: "4px 10px",
                      borderRadius: 4,
                      border: "1px solid rgba(255,100,100,0.3)",
                      background: "rgba(255,60,60,0.08)",
                      color: "#ff6060",
                      fontSize: 10,
                      cursor: "pointer"
                    },
                    "data-ocid": "reactor.classic_reset",
                    children: "RESET"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "200px 1fr 220px",
              gap: 0,
              minHeight: 520
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    borderRight: "1px solid rgba(0,212,255,0.15)",
                    padding: "14px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    background: "rgba(0,10,25,0.6)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          color: "#00d4ff",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          fontWeight: 700,
                          marginBottom: 4
                        },
                        children: "REACTOR THEORY & DESIGN"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: ["PWR", "BWR", "CANDU", "SMR"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateSim({
                          reactorType: type,
                          coolantFlow: REACTOR_TYPE_DATA[type].coolantFlow
                        }),
                        style: {
                          padding: "6px 10px",
                          borderRadius: 4,
                          border: `1px solid ${sim.reactorType === type ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.15)"}`,
                          background: sim.reactorType === type ? "rgba(0,212,255,0.15)" : "transparent",
                          color: sim.reactorType === type ? "#00d4ff" : "rgba(0,212,255,0.5)",
                          fontSize: 10,
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        },
                        "data-ocid": `reactor.classic_type_${type.toLowerCase()}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: sim.reactorType === type ? "#00d4ff" : "rgba(0,212,255,0.3)",
                                display: "inline-block",
                                flexShrink: 0
                              }
                            }
                          ),
                          REACTOR_TYPE_DATA[type].full
                        ]
                      },
                      type
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "hr",
                      {
                        style: {
                          border: "none",
                          borderTop: "1px solid rgba(0,212,255,0.1)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 4
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(0,212,255,0.6)", fontSize: 9 }, children: "CONTROL RODS" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#00d4ff", fontSize: 9 }, children: [
                                sim.controlRodInsertion,
                                "%"
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "range",
                            min: 0,
                            max: 100,
                            step: 1,
                            value: sim.controlRodInsertion,
                            onChange: (e) => updateSim({ controlRodInsertion: Number(e.target.value) }),
                            style: { width: "100%", accentColor: "#00d4ff" },
                            "data-ocid": "reactor.classic_rod_slider"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(0,212,255,0.4)", fontSize: 8 }, children: "OUT" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(0,212,255,0.4)", fontSize: 8 }, children: "IN" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 4
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(0,212,255,0.6)", fontSize: 9 }, children: "COOLANT FLOW" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#00d4ff", fontSize: 9 }, children: [
                                (sim.coolantFlow / 1e3).toFixed(0),
                                "k kg/s"
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "range",
                            min: 1e3,
                            max: 2e4,
                            step: 500,
                            value: sim.coolantFlow,
                            onChange: (e) => updateSim({ coolantFlow: Number(e.target.value) }),
                            style: { width: "100%", accentColor: "#00ffaa" },
                            "data-ocid": "reactor.classic_flow_slider"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 4
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(0,212,255,0.6)", fontSize: 9 }, children: "POWER LEVEL" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#00d4ff", fontSize: 9 }, children: [
                                sim.powerLevel,
                                " MWth"
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "range",
                            min: 0,
                            max: REACTOR_TYPE_DATA[sim.reactorType].maxPower,
                            step: 50,
                            value: sim.powerLevel,
                            onChange: (e) => updateSim({ powerLevel: Number(e.target.value) }),
                            style: { width: "100%", accentColor: "#ffaa00" },
                            "data-ocid": "reactor.classic_power_slider"
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px 10px",
                    gap: 10
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          color: "#00d4ff",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textAlign: "center",
                          marginBottom: 4,
                          textShadow: "0 0 12px rgba(0,212,255,0.8)"
                        },
                        children: "HYPER-DETAILED 3D REACTOR DIGITAL TWIN"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "relative", width: "100%", maxWidth: 380 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        viewBox: "0 0 380 400",
                        style: {
                          width: "100%",
                          filter: `brightness(${0.9 + coreGlowIntensity * 0.3}) saturate(1.3)`
                        },
                        "aria-label": "Reactor cross-section visualization",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Nuclear Reactor Cross-Section" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "coreGradient", cx: "50%", cy: "50%", r: "50%", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#ffff00", stopOpacity: "0.95" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "30%", stopColor: "#ff8c00", stopOpacity: "0.9" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "70%", stopColor: "#ff4400", stopOpacity: "0.7" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#220000", stopOpacity: "0.3" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "cherenkovGlow", cx: "50%", cy: "50%", r: "50%", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "stop",
                                {
                                  offset: "0%",
                                  stopColor: "#0088ff",
                                  stopOpacity: 0.3 + coreGlowIntensity * 0.4
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "stop",
                                {
                                  offset: "50%",
                                  stopColor: "#0044aa",
                                  stopOpacity: 0.2 + coreGlowIntensity * 0.2
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#000033", stopOpacity: "0.05" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "vesselGrad", cx: "50%", cy: "50%", r: "50%", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#1e3a5f" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#0a1520" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "strongGlow", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "6", result: "blur" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: "vesselClip", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "190", cy: "210", rx: "130", ry: "160" }) })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ellipse",
                            {
                              cx: "190",
                              cy: "210",
                              rx: "165",
                              ry: "190",
                              fill: "none",
                              stroke: "rgba(30,60,100,0.6)",
                              strokeWidth: "8"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ellipse",
                            {
                              cx: "190",
                              cy: "210",
                              rx: "157",
                              ry: "182",
                              fill: "none",
                              stroke: "rgba(0,212,255,0.12)",
                              strokeWidth: "2",
                              strokeDasharray: "8,4"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ellipse",
                            {
                              cx: "190",
                              cy: "210",
                              rx: "135",
                              ry: "165",
                              fill: "url(#vesselGrad)",
                              stroke: "#1e4a7a",
                              strokeWidth: "3"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ellipse",
                            {
                              cx: "190",
                              cy: "210",
                              rx: "128",
                              ry: "158",
                              fill: "none",
                              stroke: "rgba(0,212,255,0.25)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ellipse",
                            {
                              cx: "190",
                              cy: "210",
                              rx: "100",
                              ry: "130",
                              fill: "url(#cherenkovGlow)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ellipse",
                            {
                              cx: "190",
                              cy: "210",
                              rx: "78",
                              ry: "100",
                              fill: "url(#coreGradient)",
                              filter: "url(#strongGlow)"
                            }
                          ),
                          (() => {
                            const rods = [];
                            for (let row = 0; row < 7; row++) {
                              for (let col = 0; col < 7; col++) {
                                const cx = 190 - 3 * 20 + col * 20;
                                const cy = 210 - 3 * 25 + row * 25;
                                const dx = Math.abs(col - 3);
                                const dy = Math.abs(row - 3);
                                if (dx * 1.2 + dy > 4.5) continue;
                                const tempT = Math.min(1, 1 - (dx + dy) / 5);
                                const rc = 204 + Math.round(tempT * 51);
                                const gc = Math.round(100 + tempT * 80);
                                rods.push(
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "rect",
                                    {
                                      x: cx - 4,
                                      y: cy - 10,
                                      width: 8,
                                      height: 20,
                                      rx: 2,
                                      fill: `rgb(${rc},${gc},0)`,
                                      stroke: "rgba(255,255,100,0.3)",
                                      strokeWidth: "0.5",
                                      filter: tempT > 0.7 ? "url(#glow)" : void 0,
                                      opacity: 0.85 + tempT * 0.15
                                    },
                                    `rod-${row}-${col}`
                                  )
                                );
                              }
                            }
                            return rods;
                          })(),
                          [170, 190, 210].map((cx) => /* @__PURE__ */ jsxRuntimeExports.jsx("g", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: cx - 3,
                              y: 60,
                              width: 6,
                              height: 100 + sim.controlRodInsertion / 100 * 80,
                              rx: 2,
                              fill: "#1a1a3e",
                              stroke: "#6666cc",
                              strokeWidth: 1,
                              opacity: 0.9
                            }
                          ) }, cx)),
                          [150, 190, 230].map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: x,
                              y1: "350",
                              x2: x,
                              y2: "70",
                              stroke: "rgba(0,200,255,0.4)",
                              strokeWidth: "1.5",
                              strokeDasharray: "6,8",
                              strokeDashoffset: -(animTime * 80 + i * 20) % 28
                            },
                            x
                          )),
                          neutronDots.map((dot) => {
                            const rad = dot.angle * Math.PI / 180;
                            const x = 190 + Math.cos(rad) * dot.r;
                            const y = 210 + Math.sin(rad) * dot.r * 0.78;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                cx: x,
                                cy: y,
                                r: 2.5,
                                fill: "white",
                                opacity: dot.opacity,
                                filter: "url(#glow)"
                              },
                              dot.id
                            );
                          }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: "248",
                              y1: "210",
                              x2: "295",
                              y2: "190",
                              stroke: "rgba(0,212,255,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: "296",
                              y: "180",
                              width: "70",
                              height: "20",
                              rx: "3",
                              fill: "rgba(0,10,30,0.9)",
                              stroke: "rgba(0,212,255,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "text",
                            {
                              x: "330",
                              y: "194",
                              fill: "#00d4ff",
                              fontSize: "9",
                              textAnchor: "middle",
                              fontFamily: "monospace",
                              fontWeight: "bold",
                              children: "FUEL RODS"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: "190",
                              y1: "140",
                              x2: "240",
                              y2: "105",
                              stroke: "rgba(150,150,255,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: "241",
                              y: "96",
                              width: "80",
                              height: "20",
                              rx: "3",
                              fill: "rgba(0,10,30,0.9)",
                              stroke: "rgba(150,150,255,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "text",
                            {
                              x: "281",
                              y: "110",
                              fill: "#9999ff",
                              fontSize: "9",
                              textAnchor: "middle",
                              fontFamily: "monospace",
                              fontWeight: "bold",
                              children: "CONTROL RODS"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: "60",
                              y1: "310",
                              x2: "90",
                              y2: "310",
                              stroke: "rgba(0,200,255,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: "0",
                              y: "300",
                              width: "88",
                              height: "20",
                              rx: "3",
                              fill: "rgba(0,10,30,0.9)",
                              stroke: "rgba(0,200,255,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "text",
                            {
                              x: "44",
                              y: "314",
                              fill: "#00c8ff",
                              fontSize: "9",
                              textAnchor: "middle",
                              fontFamily: "monospace",
                              fontWeight: "bold",
                              children: "COOLANT FLOW"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: "60",
                              y1: "150",
                              x2: "93",
                              y2: "170",
                              stroke: "rgba(0,212,255,0.4)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: "0",
                              y: "140",
                              width: "90",
                              height: "20",
                              rx: "3",
                              fill: "rgba(0,10,30,0.9)",
                              stroke: "rgba(0,212,255,0.4)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "text",
                            {
                              x: "45",
                              y: "154",
                              fill: "#00d4ff",
                              fontSize: "9",
                              textAnchor: "middle",
                              fontFamily: "monospace",
                              children: "PRESSURE VESSEL"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: "190",
                              y1: "270",
                              x2: "190",
                              y2: "330",
                              stroke: "rgba(255,150,0,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: "138",
                              y: "331",
                              width: "104",
                              height: "20",
                              rx: "3",
                              fill: "rgba(0,10,30,0.9)",
                              stroke: "rgba(255,150,0,0.5)",
                              strokeWidth: "1"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "text",
                            {
                              x: "190",
                              y: "345",
                              fill: "#ffaa00",
                              fontSize: "9",
                              textAnchor: "middle",
                              fontFamily: "monospace",
                              fontWeight: "bold",
                              children: [
                                "CORE TEMP: ",
                                sim.coreAvgTemp.toFixed(0),
                                "°C"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ellipse",
                            {
                              cx: "190",
                              cy: "210",
                              rx: "150",
                              ry: "180",
                              fill: "none",
                              stroke: "rgba(0,180,255,0.2)",
                              strokeWidth: "2",
                              strokeDasharray: "12,6",
                              strokeDashoffset: -(animTime * 60) % 36
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          width: "100%",
                          background: "rgba(0,10,25,0.8)",
                          border: "1px solid rgba(0,212,255,0.2)",
                          borderRadius: 8,
                          padding: "10px 14px"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 8
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => setClassicTab("depletion"),
                                    style: {
                                      padding: "3px 10px",
                                      borderRadius: 4,
                                      border: `1px solid ${classicTab === "depletion" ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)"}`,
                                      background: classicTab === "depletion" ? "rgba(0,212,255,0.15)" : "transparent",
                                      color: classicTab === "depletion" ? "#00d4ff" : "rgba(0,212,255,0.4)",
                                      fontSize: 9,
                                      cursor: "pointer",
                                      letterSpacing: "0.08em"
                                    },
                                    "data-ocid": "reactor.classic_tab_depletion",
                                    children: "FUEL DEPLETION"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => setClassicTab("transients"),
                                    style: {
                                      padding: "3px 10px",
                                      borderRadius: 4,
                                      border: `1px solid ${classicTab === "transients" ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)"}`,
                                      background: classicTab === "transients" ? "rgba(0,212,255,0.15)" : "transparent",
                                      color: classicTab === "transients" ? "#00d4ff" : "rgba(0,212,255,0.4)",
                                      fontSize: 9,
                                      cursor: "pointer",
                                      letterSpacing: "0.08em"
                                    },
                                    "data-ocid": "reactor.classic_tab_transients",
                                    children: "TRANSIENTS"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => updateSim({ isPlaying: !sim.isPlaying }),
                                style: {
                                  width: 28,
                                  height: 28,
                                  borderRadius: 4,
                                  border: "1px solid rgba(0,212,255,0.4)",
                                  background: "rgba(0,212,255,0.12)",
                                  color: "#00d4ff",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0
                                },
                                "data-ocid": "reactor.classic_timeline_play",
                                children: sim.isPlaying ? "⏸" : "▶"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  display: "flex",
                                  gap: 4,
                                  fontSize: 8,
                                  color: "rgba(0,212,255,0.5)",
                                  flexShrink: 0
                                },
                                children: ["SEC", "MIN", "HR", "DAY", "MON"].map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      padding: "2px 5px",
                                      border: "1px solid rgba(0,212,255,0.15)",
                                      borderRadius: 3
                                    },
                                    children: u
                                  },
                                  u
                                ))
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                type: "range",
                                min: 0,
                                max: 120,
                                step: 0.5,
                                value: sim.simTime,
                                onChange: (e) => updateSim({ simTime: Number(e.target.value) }),
                                style: { flex: 1, accentColor: "#00d4ff" },
                                "data-ocid": "reactor.classic_timeline_scrubber"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#00d4ff", fontSize: 9, flexShrink: 0 }, children: [
                              sim.simTime.toFixed(1),
                              "s"
                            ] })
                          ] })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    borderLeft: "1px solid rgba(0,212,255,0.15)",
                    padding: "14px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    background: "rgba(0,10,25,0.6)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          border: "1px solid rgba(0,212,255,0.25)",
                          borderRadius: 6,
                          padding: "10px 10px",
                          background: "rgba(0,5,15,0.8)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "#00d4ff",
                                fontSize: 9,
                                letterSpacing: "0.18em",
                                marginBottom: 8,
                                fontWeight: 700
                              },
                              children: "TECHNICAL OVERLAY"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "rgba(0,212,255,0.5)",
                                fontSize: 8,
                                marginBottom: 6
                              },
                              children: "Core Temperature Distribution"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              viewBox: "0 0 160 90",
                              style: { width: "100%", borderRadius: 4, overflow: "hidden" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Core Temperature Heatmap" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "heatmap", cx: "50%", cy: "50%", r: "50%", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#ffff00", stopOpacity: "1" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "25%", stopColor: "#ff8800", stopOpacity: "1" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#ff2200", stopOpacity: "0.9" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "75%", stopColor: "#006688", stopOpacity: "0.8" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#000033", stopOpacity: "1" })
                                ] }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "160", height: "90", fill: "#000033" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "80", cy: "45", rx: "70", ry: "42", fill: "url(#heatmap)" }),
                                [40, 80, 120].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "line",
                                  {
                                    x1: x,
                                    y1: "5",
                                    x2: x,
                                    y2: "85",
                                    stroke: "rgba(0,212,255,0.15)",
                                    strokeWidth: "0.5"
                                  },
                                  x
                                )),
                                [22, 45, 67].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "line",
                                  {
                                    x1: "5",
                                    y1: y,
                                    x2: "155",
                                    y2: y,
                                    stroke: "rgba(0,212,255,0.15)",
                                    strokeWidth: "0.5"
                                  },
                                  y
                                )),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "text",
                                  {
                                    x: "5",
                                    y: "88",
                                    fill: "#000088",
                                    fontSize: "6",
                                    fontFamily: "monospace",
                                    children: "280°C"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "text",
                                  {
                                    x: "130",
                                    y: "88",
                                    fill: "#ffff00",
                                    fontSize: "6",
                                    fontFamily: "monospace",
                                    children: "580°C+"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                height: 8,
                                borderRadius: 4,
                                marginTop: 6,
                                background: "linear-gradient(to right, #000080, #0088ff, #00ffff, #ffff00, #ff8800, #ff0000)"
                              }
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          border: "1px solid rgba(0,212,255,0.25)",
                          borderRadius: 6,
                          padding: "10px 10px",
                          background: "rgba(0,5,15,0.8)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "#00d4ff",
                                fontSize: 9,
                                letterSpacing: "0.18em",
                                marginBottom: 10,
                                fontWeight: 700
                              },
                              children: "CORE PHYSICS"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginBottom: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 80 50", style: { width: "100%" }, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "k-eff Gauge" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M10 45 A 30 30 0 0 1 70 45",
                                fill: "none",
                                stroke: "rgba(0,212,255,0.2)",
                                strokeWidth: "5",
                                strokeLinecap: "round"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M10 45 A 30 30 0 0 1 70 45",
                                fill: "none",
                                stroke: keffColor,
                                strokeWidth: "5",
                                strokeLinecap: "round",
                                strokeDasharray: "94.2",
                                strokeDashoffset: 94.2 - Math.min(94.2, (sim.keff - 0.8) / 0.4 * 94.2),
                                style: { filter: `drop-shadow(0 0 4px ${keffColor})` }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "text",
                              {
                                x: "40",
                                y: "38",
                                fill: keffColor,
                                textAnchor: "middle",
                                fontSize: "12",
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                children: sim.keff.toFixed(3)
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "text",
                              {
                                x: "40",
                                y: "48",
                                fill: "rgba(0,212,255,0.5)",
                                textAnchor: "middle",
                                fontSize: "6",
                                fontFamily: "monospace",
                                children: "k-eff (0–2)"
                              }
                            )
                          ] }) }),
                          [
                            {
                              label: "THERMAL POWER",
                              val: sim.thermalPower,
                              max: 3600,
                              unit: "MWth",
                              color: "#ff8800"
                            },
                            {
                              label: "CONTROL FLOW",
                              val: sim.controlRodInsertion,
                              max: 100,
                              unit: "%",
                              color: "#00aaff"
                            },
                            {
                              label: "NEUTRON FLUX",
                              val: sim.neutronFluxDensity * 100,
                              max: 100,
                              unit: "%",
                              color: "#88ffff"
                            }
                          ].map(({ label, val, max: max2, unit, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 8 }, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                style: {
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: 2
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(0,212,255,0.5)", fontSize: 8 }, children: label }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color, fontSize: 8, fontWeight: "bold" }, children: [
                                    val.toFixed(0),
                                    " ",
                                    unit
                                  ] })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  height: 5,
                                  background: "rgba(0,212,255,0.1)",
                                  borderRadius: 3,
                                  overflow: "hidden"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    style: {
                                      height: "100%",
                                      width: `${Math.min(100, val / max2 * 100)}%`,
                                      background: color,
                                      borderRadius: 3,
                                      boxShadow: `0 0 6px ${color}88`,
                                      transition: "width 0.5s ease"
                                    }
                                  }
                                )
                              }
                            )
                          ] }, label))
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          border: "1px solid rgba(0,212,255,0.25)",
                          borderRadius: 6,
                          padding: "10px 10px",
                          background: "rgba(0,5,15,0.8)",
                          flex: 1
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "#00d4ff",
                                fontSize: 9,
                                letterSpacing: "0.18em",
                                marginBottom: 10,
                                fontWeight: 700
                              },
                              children: "DATA OUTPUT"
                            }
                          ),
                          [
                            {
                              label: "Power Level",
                              value: `${powerPct.toFixed(0)}% MWe`,
                              color: "#ffff00",
                              big: true
                            },
                            { label: "Core Status", value: keffStatus, color: keffColor },
                            {
                              label: "Efficiency",
                              value: `${efficiency}%`,
                              color: "#00ff88"
                            },
                            {
                              label: "Coolant Temp",
                              value: `${sim.coolantTempOut.toFixed(0)}°C`,
                              color: "#00c8ff"
                            },
                            {
                              label: "Steam Flow",
                              value: `${(sim.coolantFlow * 0.12).toFixed(0)} kg/s`,
                              color: "#aaccff"
                            },
                            {
                              label: "Sim Time",
                              value: `${sim.simTime.toFixed(1)}s`,
                              color: "rgba(0,212,255,0.6)"
                            }
                          ].map(({ label, value, color, big }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 7,
                                paddingBottom: 7,
                                borderBottom: "1px solid rgba(0,212,255,0.08)"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      color: "rgba(0,212,255,0.5)",
                                      fontSize: big ? 9 : 8
                                    },
                                    children: label
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      color,
                                      fontSize: big ? 12 : 9,
                                      fontWeight: "bold",
                                      textShadow: `0 0 8px ${color}88`
                                    },
                                    children: value
                                  }
                                )
                              ]
                            },
                            label
                          ))
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      ` })
      ]
    }
  );
}
function PWRSchemDiagram() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 600 380",
      className: "w-full max-w-2xl mx-auto h-auto",
      role: "img",
      "aria-label": "PWR Schematic Diagram",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "PWR Simplified Schematic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "vesselGrad2", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#1e3a5f" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#0a1a2e" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "coreGrad2", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#ff6600", stopOpacity: "0.9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#ff0000", stopOpacity: "0.7" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "600", height: "380", fill: "#050e1a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "60",
            y: "60",
            width: "160",
            height: "240",
            rx: "20",
            fill: "url(#vesselGrad2)",
            stroke: "#4a90d9",
            strokeWidth: "2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "140",
            y: "52",
            fill: "#7ab3e0",
            textAnchor: "middle",
            fontSize: "11",
            fontFamily: "monospace",
            children: "REACTOR VESSEL"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "90",
            y: "100",
            width: "100",
            height: "160",
            rx: "4",
            fill: "url(#coreGrad2)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "140",
            y: "188",
            fill: "#fff",
            textAnchor: "middle",
            fontSize: "10",
            fontFamily: "monospace",
            children: "CORE"
          }
        ),
        [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 100 + i * 14,
            y: "105",
            width: "6",
            height: "150",
            rx: "2",
            fill: "#333",
            stroke: "#666",
            strokeWidth: "0.5"
          },
          i
        )),
        [1, 3, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 100 + i * 14 + 1,
            y: "60",
            width: "4",
            height: "60",
            rx: "1",
            fill: "#1a1a3e",
            stroke: "#6666cc",
            strokeWidth: "0.5"
          },
          i
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "320",
            y: "80",
            width: "100",
            height: "200",
            rx: "12",
            fill: "#1a2a3a",
            stroke: "#4a90d9",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "370",
            y: "72",
            fill: "#7ab3e0",
            textAnchor: "middle",
            fontSize: "11",
            fontFamily: "monospace",
            children: "STEAM GEN"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M340 120 Q370 160 340 200 Q370 240 340 260",
            fill: "none",
            stroke: "#0088cc",
            strokeWidth: "1.5",
            opacity: "0.7"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M220 140 C270 140 280 120 320 120",
            fill: "none",
            stroke: "#ff6600",
            strokeWidth: "3",
            strokeDasharray: "8 4",
            opacity: "0.8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "265",
            y: "112",
            fill: "#ff9944",
            fontSize: "9",
            fontFamily: "monospace",
            children: "HOT LEG 290°C"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M320 240 C280 240 270 250 220 240",
            fill: "none",
            stroke: "#0099ff",
            strokeWidth: "3",
            strokeDasharray: "8 4",
            opacity: "0.8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "258",
            y: "256",
            fill: "#66bbff",
            fontSize: "9",
            fontFamily: "monospace",
            children: "COLD LEG 260°C"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "240",
            y: "60",
            width: "40",
            height: "70",
            rx: "6",
            fill: "#1a2a40",
            stroke: "#4a90d9",
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "260",
            y: "52",
            fill: "#7ab3e0",
            textAnchor: "middle",
            fontSize: "9",
            fontFamily: "monospace",
            children: "PRSZR"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "500",
            cy: "160",
            rx: "50",
            ry: "60",
            fill: "#0e2233",
            stroke: "#4a90d9",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "500",
            y: "164",
            fill: "#7ab3e0",
            textAnchor: "middle",
            fontSize: "11",
            fontFamily: "monospace",
            children: "TURBINE"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M420 140 L450 150", stroke: "#999", strokeWidth: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M420 220 L450 170",
            stroke: "#66bbff",
            strokeWidth: "2",
            strokeDasharray: "4 2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "300",
            y: "358",
            fill: "#445566",
            textAnchor: "middle",
            fontSize: "9",
            fontFamily: "monospace",
            children: "PWR SIMPLIFIED SCHEMATIC — NuclearEdu"
          }
        )
      ]
    }
  ) });
}
function TechSpecsPanel({
  reactorType
}) {
  const d = REACTOR_TYPE_DATA[reactorType];
  const specs = {
    PWR: [
      { label: "Fuel Type", value: "UO₂ (3–5% ²³⁵U enriched)" },
      { label: "Coolant", value: "Light Water (H₂O), 155 bar" },
      { label: "Moderator", value: "Light Water (H₂O)" },
      { label: "Fuel Cladding", value: "Zircaloy-4" },
      { label: "Core Temp (avg)", value: "~310°C" },
      { label: "Steam Temp", value: "~280°C secondary" },
      { label: "Thermal Efficiency", value: "~33%" },
      { label: "Fuel Assembly", value: "17×17 array, 264 fuel rods" },
      { label: "Refueling", value: "Every 12–18 months offline" }
    ],
    BWR: [
      { label: "Fuel Type", value: "UO₂ (3–5% enriched)" },
      { label: "Coolant", value: "Light Water (H₂O), 75 bar" },
      { label: "Moderator", value: "Boiling Light Water" },
      { label: "Steam Gen", value: "Direct — no secondary loop" },
      { label: "Core Temp (avg)", value: "~288°C" },
      { label: "Steam Temp", value: "~288°C (direct to turbine)" },
      { label: "Thermal Efficiency", value: "~32%" }
    ],
    CANDU: [
      { label: "Fuel Type", value: "Natural UO₂ (0.7% ²³⁵U)" },
      { label: "Coolant", value: "Heavy Water (D₂O), 100 bar" },
      { label: "Moderator", value: "Heavy Water (D₂O)" },
      { label: "Pressure Tubes", value: "480 horizontal Zircaloy tubes" },
      { label: "Core Temp", value: "~266°C inlet / 310°C outlet" },
      { label: "Refueling", value: "On-power continuous" }
    ],
    SMR: [
      { label: "Fuel Type", value: "UO₂ or HALEU (5–20% enriched)" },
      { label: "Coolant", value: "Light Water or Gas" },
      { label: "Power Output", value: "≤ 300 MWe per module" },
      { label: "Design", value: "Integral / modular, factory-built" },
      { label: "Safety", value: "Passive safety systems" },
      { label: "Applications", value: "Remote, district heat, H₂ prod." }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "holo-panel rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "holo-text text-sm mb-1", children: d.full }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
        "Country of Origin: ",
        d.country
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1.5", children: specs[reactorType].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex justify-between items-start gap-2 py-1 border-b border-border/30",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-mono text-right", children: s.value })
        ]
      },
      s.label
    )) })
  ] });
}
function HowItWorksPanel() {
  const steps = [
    {
      title: "1. Fission Chain Reaction",
      body: "U-235 nuclei absorb thermal neutrons and split (fission), releasing ~200 MeV of energy and 2–3 prompt neutrons per fission. The neutron multiplication factor keff controls whether the reaction is sustaining (keff = 1), growing (keff > 1), or diminishing (keff < 1)."
    },
    {
      title: "2. Neutron Moderation",
      body: "Fast neutrons (2 MeV) collide with moderator atoms (H₂O in PWR/BWR), losing kinetic energy until they reach thermal energies (~0.025 eV) where fission cross-sections are orders of magnitude higher. The Four-Factor Formula (k∞ = η·ε·p·f) quantifies this process."
    },
    {
      title: "3. Heat Transfer",
      body: "Fission energy appears as kinetic energy in fission fragments and prompt neutrons, rapidly thermalized in the UO₂ fuel pellets. Heat conducts through the Zircaloy cladding into the pressurized coolant, raising its temperature by ~30–40°C per pass through the core."
    },
    {
      title: "4. Power Regulation",
      body: "Control rod insertion reduces neutron population by absorbing thermal neutrons in B₄C or Ag-In-Cd absorber material. Temperature feedback (Doppler broadening in U-238) provides inherent negative reactivity feedback — self-regulating behavior is a fundamental safety feature."
    },
    {
      title: "5. Steam Generation & Turbine",
      body: "In PWR: Hot primary coolant (155 bar, ~310°C) transfers heat via steam generators to a secondary loop that flashes to steam at ~280°C/70 bar. In BWR: Primary coolant boils directly at ~288°C/75 bar. Steam drives a turbine-generator at ~33% thermal efficiency."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "holo-panel rounded-lg p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-display font-semibold text-foreground mb-1", children: s.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: s.body })
  ] }, s.title)) });
}
function SafetySystemsPanel() {
  const systems = [
    {
      name: "SCRAM / Emergency Shutdown",
      desc: "All control rods drop by gravity within 2–3 seconds. Boron injection provides backup negative reactivity.",
      color: "text-red-400"
    },
    {
      name: "ECCS (Emergency Core Cooling)",
      desc: "High/low pressure injection and accumulators deliver water to the core within seconds of loss-of-coolant accident (LOCA) detection.",
      color: "text-amber-400"
    },
    {
      name: "Negative Reactivity Coefficients",
      desc: "Doppler broadening in U-238 and moderator temperature/void coefficients provide self-limiting feedback — physics inherently opposes runaway.",
      color: "text-primary"
    },
    {
      name: "Containment Structure",
      desc: "Reinforced concrete/steel containment vessel (≥1m thick) surrounds the reactor building, designed to withstand extreme pressure and projectile impact.",
      color: "text-cyan-400"
    },
    {
      name: "Passive Safety (Gen III+)",
      desc: "AP1000, EPR, and SMR designs rely on gravity, natural circulation, and compressed gas — no pumps needed — for 72-hour passive safety.",
      color: "text-emerald-400"
    },
    {
      name: "Defense in Depth",
      desc: "Five independent barriers: UO₂ pellet → Zircaloy cladding → Reactor coolant boundary → Reactor building → Containment building.",
      color: "text-violet-400"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: systems.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-3 p-3 bg-card rounded-lg border border-border/40",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: `w-4 h-4 mt-0.5 shrink-0 ${s.color}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `text-xs font-bold font-mono mb-0.5 ${s.color}`, children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: s.desc })
        ] })
      ]
    },
    s.name
  )) });
}
function DataGlossaryPanel() {
  const terms = [
    {
      term: "keff",
      def: "Effective neutron multiplication factor. keff = 1 → critical (steady). keff > 1 → supercritical (power rising). keff < 1 → subcritical (shutdown)."
    },
    {
      term: "Reactivity (ρ)",
      def: "ρ = (keff − 1) / keff. Measure of deviation from criticality. Units: pcm (per cent mille = 10⁻⁵)."
    },
    {
      term: "Thermal Power (MWth)",
      def: "Total heat generated in the reactor core by fission. Electrical output = Thermal × η (typically ~33%)."
    },
    {
      term: "Neutron Flux (Φ)",
      def: "Φ = n·v (neutrons/cm²/s). Typical PWR core: ~3×10¹³ n/cm²/s. Determines fission rate and material activation."
    },
    {
      term: "Burnup (GWd/tU)",
      def: "Energy extracted per ton of uranium fuel. Modern PWR reaches ~45 GWd/tU per cycle before refueling."
    },
    {
      term: "Doppler Broadening",
      def: "As fuel temperature rises, U-238 resonance capture cross-section widens → absorbs more neutrons → negative reactivity feedback (k drops)."
    },
    {
      term: "Void Coefficient",
      def: "Change in reactivity per % increase in coolant void fraction. Negative in PWR (safe); slightly positive in BWR under some conditions."
    },
    {
      term: "SCRAM",
      def: "Safety Control Rod Axe Man — emergency shutdown by rapid full rod insertion. Acronym attributed to CP-1 (Chicago Pile, 1942)."
    },
    {
      term: "Decay Heat",
      def: "Residual heat from radioactive decay of fission products after reactor shutdown. ~7% initial power → requires continuous cooling for days-weeks."
    },
    {
      term: "PCM",
      def: "Per cent mille (10⁻⁵) — standard unit for reactivity worth. A 100 pcm insertion reduces keff by 0.001."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: terms.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-baseline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold font-mono text-primary shrink-0 w-32", children: t.term }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: t.def })
  ] }) }, t.term)) });
}
function ReactorCrossSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const [showCompare, setShowCompare] = reactExports.useState(false);
  const [showLabels, setShowLabels] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("technical");
  const [viewMode, setViewMode] = reactExports.useState("classic");
  const simTimerRef = reactExports.useRef(null);
  const [sim, setSim] = reactExports.useState(() => {
    const base = {
      reactorType: "PWR",
      controlRodInsertion: 45,
      powerLevel: 1800,
      coolantTempIn: 295,
      coolantFlow: 18e3,
      isPlaying: true,
      simTime: 0,
      moderatorVoided: false
    };
    return { ...base, ...computeSimState(base) };
  });
  reactExports.useEffect(() => {
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    if (sim.isPlaying) {
      simTimerRef.current = setInterval(() => {
        setSim((prev) => {
          const newTime = prev.simTime >= 120 ? 0 : prev.simTime + 0.1;
          const fluxMod = 1 + 0.03 * Math.sin(newTime * 0.5);
          const newPower = Math.round(prev.powerLevel * fluxMod);
          return {
            ...prev,
            simTime: newTime,
            ...computeSimState({ ...prev, powerLevel: newPower })
          };
        });
      }, 100);
    }
    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, [sim.isPlaying]);
  const updateSim = reactExports.useCallback((patch) => {
    setSim((prev) => {
      const next = { ...prev, ...patch };
      return { ...next, ...computeSimState(next) };
    });
  }, []);
  const handleReset = reactExports.useCallback(() => {
    const base = {
      reactorType: "PWR",
      controlRodInsertion: 45,
      powerLevel: 1800,
      coolantTempIn: 295,
      coolantFlow: 18e3,
      isPlaying: false,
      simTime: 0,
      moderatorVoided: false
    };
    setSim({ ...base, ...computeSimState(base) });
  }, []);
  const keffColor = sim.keff > 1.05 ? "text-red-400" : sim.keff > 1 ? "text-amber-400" : "text-primary";
  const fallback = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full bg-card rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "3D Reactor visualization unavailable" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "WebGL not supported in this environment" })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-6 h-6 text-primary" }),
          "Reactor Digital Twin"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Interactive simulation of a nuclear reactor core — Classic 2D & Cinematic 3D views" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowLabels((v) => !v),
            className: "text-xs",
            "data-ocid": "reactor.toggle_labels",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 mr-1" }),
              showLabels ? "Hide" : "Show",
              " Labels"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowCompare(true),
            className: "text-xs",
            "data-ocid": "reactor.compare_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-3 h-3 mr-1" }),
              "Compare Reactors"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-2 p-1 bg-muted/30 rounded-xl border border-border/50 w-fit",
        "data-ocid": "reactor.view_switcher",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setViewMode("classic"),
              className: `px-5 py-2 rounded-lg text-sm font-mono font-bold transition-all duration-200 ${viewMode === "classic" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "reactor.tab_classic_view",
              children: "⚡ Classic View"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setViewMode("3d"),
              className: `px-5 py-2 rounded-lg text-sm font-mono font-bold transition-all duration-200 ${viewMode === "3d" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "reactor.tab_3d_view",
              children: "🔷 3D Cinematic View"
            }
          )
        ]
      }
    ),
    viewMode === "classic" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClassicReactorView,
      {
        sim,
        updateSim,
        handleReset
      }
    ),
    viewMode === "3d" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-xl overflow-hidden border border-border reactor-core-glow",
        style: {
          minHeight: 600,
          maxHeight: "80vh",
          filter: "brightness(1.1) saturate(1.2)"
        },
        "data-ocid": "reactor.viewport_3d",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WebGLErrorBoundary, { fallback, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            reactExports.Suspense,
            {
              fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Initializing Reactor Core…" })
              ] }) }),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Canvas,
                {
                  camera: { position: [5, 3.5, 7], fov: 42 },
                  style: {
                    height: "62vh",
                    minHeight: 560,
                    background: "#030810",
                    display: "block",
                    width: "100%"
                  },
                  shadows: true,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReactorScene, { sim, reducedMotion })
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "holo-panel rounded-lg px-3 py-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "holo-text text-xs font-mono tracking-widest", children: "3D REACTOR DIGITAL TWIN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground font-mono", children: REACTOR_TYPE_DATA[sim.reactorType].full })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[9px] border-emerald-500/40 text-emerald-400 ml-2",
                children: "ONLINE"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-3 right-3 z-20 w-52",
              "data-ocid": "reactor.command_panel",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "holo-panel rounded-lg p-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "holo-text text-[9px] font-mono tracking-widest mb-2", children: "COMMAND CENTER" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-overlay-grid space-y-1.5", children: [
                  {
                    label: "CORE TEMP:",
                    val: `${sim.coreAvgTemp.toFixed(0)}°C`
                  },
                  {
                    label: "POWER OUTPUT:",
                    val: `${(sim.thermalPower / 1e3).toFixed(2)} GWth`
                  },
                  {
                    label: "COOLANT FLOW:",
                    val: `${(sim.coolantFlow / 1e3).toFixed(1)}k kg/s`
                  },
                  { label: "keff:", val: sim.keff.toFixed(4), highlight: true },
                  {
                    label: "STATUS:",
                    val: sim.keff > 1.05 ? "SUPERCRITICAL" : sim.keff > 0.99 ? "OPERATIONAL" : "SUBCRITICAL"
                  }
                ].map(({ label, val, highlight }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-bold ${highlight ? keffColor : "text-foreground"}`,
                      children: val
                    }
                  )
                ] }, label)) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 -translate-y-1/2 right-3 z-20 w-48",
              "data-ocid": "reactor.gauges_panel",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "holo-panel rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "holo-text text-[9px] font-mono tracking-widest mb-2", children: "CORE PHYSICS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GaugeBar,
                  {
                    label: "keff",
                    value: sim.keff,
                    min: 0.8,
                    max: 1.2,
                    unit: "",
                    warnAbove: 1,
                    dangerAbove: 1.05
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GaugeBar,
                  {
                    label: "Thermal Power",
                    value: sim.thermalPower,
                    min: 0,
                    max: 3600,
                    unit: "MWth",
                    warnAbove: 3200
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GaugeBar,
                  {
                    label: "Coolant Flow",
                    value: sim.coolantFlow,
                    min: 0,
                    max: 2e4,
                    unit: "kg/s"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GaugeBar,
                  {
                    label: "Core Avg Temp",
                    value: sim.coreAvgTemp,
                    min: 280,
                    max: 580,
                    unit: "°C",
                    warnAbove: 500,
                    dangerAbove: 550
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HoloLabels, { visible: showLabels }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 z-20 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SimTimeline,
            {
              simTime: sim.simTime,
              isPlaying: sim.isPlaying,
              onToggle: () => updateSim({ isPlaying: !sim.isPlaying }),
              onReset: handleReset,
              onSeek: (t) => updateSim({ simTime: t })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:col-span-2 holo-panel rounded-xl p-4 space-y-4",
          "data-ocid": "reactor.controls_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "holo-text text-sm", children: "Simulation Controls" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-xs",
                  onClick: handleReset,
                  "data-ocid": "reactor.reset_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 mr-1" }),
                    "Reset Nominal"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono mb-2 block", children: "REACTOR TYPE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-2 flex-wrap",
                  role: "radiogroup",
                  "aria-label": "Reactor type selector",
                  children: ["PWR", "BWR", "CANDU", "SMR"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateSim({
                        reactorType: type,
                        coolantFlow: REACTOR_TYPE_DATA[type].coolantFlow,
                        powerLevel: Math.min(
                          sim.powerLevel,
                          REACTOR_TYPE_DATA[type].maxPower
                        )
                      }),
                      "aria-pressed": sim.reactorType === type,
                      className: `px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition-all duration-200 ${sim.reactorType === type ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
                      "data-ocid": `reactor.type_${type.toLowerCase()}`,
                      children: type
                    },
                    type
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "CONTROL ROD INSERTION" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-foreground", children: [
                    sim.controlRodInsertion,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    min: 0,
                    max: 100,
                    step: 1,
                    value: [sim.controlRodInsertion],
                    onValueChange: ([v]) => updateSim({ controlRodInsertion: v }),
                    "aria-label": "Control rod insertion percentage",
                    "data-ocid": "reactor.control_rod_slider"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-mono", children: "WITHDRAWN" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-mono", children: "INSERTED" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "POWER LEVEL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-foreground", children: [
                    sim.powerLevel,
                    " MWth"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    min: 0,
                    max: REACTOR_TYPE_DATA[sim.reactorType].maxPower,
                    step: 50,
                    value: [sim.powerLevel],
                    onValueChange: ([v]) => updateSim({ powerLevel: v }),
                    "aria-label": "Power level in MWth",
                    "data-ocid": "reactor.power_slider"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-mono", children: "0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground font-mono", children: [
                    REACTOR_TYPE_DATA[sim.reactorType].maxPower,
                    " MWth"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "COOLANT INLET TEMP" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-foreground", children: [
                    sim.coolantTempIn,
                    "°C"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    min: 280,
                    max: 360,
                    step: 1,
                    value: [sim.coolantTempIn],
                    onValueChange: ([v]) => updateSim({ coolantTempIn: v }),
                    "aria-label": "Coolant inlet temperature",
                    "data-ocid": "reactor.coolant_temp_slider"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "COOLANT FLOW RATE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-foreground", children: [
                    sim.coolantFlow.toLocaleString(),
                    " kg/s"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    min: 1e3,
                    max: 2e4,
                    step: 100,
                    value: [sim.coolantFlow],
                    onValueChange: ([v]) => updateSim({ coolantFlow: v }),
                    "aria-label": "Coolant flow rate",
                    "data-ocid": "reactor.coolant_flow_slider"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono", children: "MODERATOR DENSITY" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground/60 font-mono mt-0.5", children: "Void = steam bubbles reduce moderation, affects keff" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-2",
                  role: "radiogroup",
                  "aria-label": "Moderator density mode",
                  children: ["Normal", "Voided"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateSim({ moderatorVoided: mode === "Voided" }),
                      "aria-pressed": mode === "Voided" === sim.moderatorVoided,
                      className: `px-3 py-1 rounded text-xs font-mono border transition-all ${mode === "Voided" === sim.moderatorVoided ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-muted/20 text-muted-foreground border-border hover:border-primary/30"}`,
                      "data-ocid": `reactor.moderator_${mode.toLowerCase()}`,
                      children: mode
                    },
                    mode
                  ))
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "holo-panel rounded-xl p-4",
          "data-ocid": "reactor.telemetry_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "holo-text text-sm mb-3", children: "Live Telemetry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "data-overlay-grid space-y-2", children: [
              {
                label: "keff",
                value: sim.keff.toFixed(4),
                highlight: sim.keff > 1
              },
              {
                label: "Thermal Power",
                value: `${sim.thermalPower.toFixed(0)} MWth`
              },
              {
                label: "Electrical ~33%",
                value: `${(sim.thermalPower * 0.33).toFixed(0)} MWe`
              },
              { label: "Coolant In", value: `${sim.coolantTempIn}°C` },
              {
                label: "Coolant Out",
                value: `${sim.coolantTempOut.toFixed(1)}°C`
              },
              {
                label: "ΔT Coolant",
                value: `${(sim.coolantTempOut - sim.coolantTempIn).toFixed(1)}°C`
              },
              {
                label: "Core Avg Temp",
                value: `${sim.coreAvgTemp.toFixed(0)}°C`
              },
              {
                label: "Neutron Flux",
                value: `${(sim.neutronFluxDensity * 3e13).toExponential(1)} n/cm²/s`
              },
              {
                label: "Flow Rate",
                value: `${sim.coolantFlow.toLocaleString()} kg/s`
              },
              {
                label: "Moderator",
                value: sim.moderatorVoided ? "VOIDED ⚠" : "NORMAL"
              },
              { label: "Sim Time", value: `${sim.simTime.toFixed(1)}s` },
              {
                label: "Status",
                value: sim.keff > 1.05 ? "SUPERCRITICAL" : sim.keff > 0.99 ? "CRITICAL" : "SUBCRITICAL"
              }
            ].map(({ label, value, highlight }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between items-center py-0.5 border-b border-border/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[10px] font-mono", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[10px] font-mono font-bold ${highlight ? "text-amber-400" : "text-foreground"}`,
                      children: value
                    }
                  )
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-muted-foreground font-mono mb-1.5 uppercase tracking-wider", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: "inline w-3 h-3 mr-1" }),
                "Core Heatmap"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-3 rounded-full overflow-hidden",
                  style: {
                    background: "linear-gradient(to right, #000080, #00ffff, #ffff00, #ff4400)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground font-mono", children: "280°C" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground font-mono", children: "580°C" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-2 h-2 bg-foreground rounded-full mt-1 transition-all duration-500",
                  style: {
                    marginLeft: `calc(${Math.min(95, Math.max(2, (sim.coreAvgTemp - 280) / 300 * 100))}% - 4px)`
                  }
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        "data-ocid": "reactor.info_tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-5 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "technical", "data-ocid": "reactor.tab_technical", children: "Technical Specs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "how", "data-ocid": "reactor.tab_how", children: "How It Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "safety", "data-ocid": "reactor.tab_safety", children: "Safety Systems" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "glossary", "data-ocid": "reactor.tab_glossary", children: "Data Glossary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "schematic", "data-ocid": "reactor.tab_schematic", children: "Schematic" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "technical", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TechSpecsPanel, { reactorType: sim.reactorType }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "how", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksPanel, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "safety", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SafetySystemsPanel, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "glossary", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataGlossaryPanel, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "schematic", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "holo-panel rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "holo-text text-sm mb-3", children: "PWR Simplified Schematic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PWRSchemDiagram, {})
          ] }) })
        ]
      }
    ),
    showCompare && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReactorComparisonModal,
      {
        isOpen: showCompare,
        onClose: () => setShowCompare(false)
      }
    )
  ] });
}
export {
  ReactorCrossSection as default
};
