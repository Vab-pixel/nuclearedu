import { d as createLucideIcon, r as reactExports, a0 as React, j as jsxRuntimeExports, e as cn, b as Badge, B as Button, C as ChevronRight } from "./index-BllujZqD.js";
import { A as ALL_CHAINS } from "./decayChain-BaYm-5US.js";
import { s as select, d as dispatch, i as identity, T as Transform, a as interrupt } from "./transform-DXkNLPGV.js";
import { P as Pause } from "./pause-BlLX7EV2.js";
import { P as Play } from "./play-BG4WeTjY.js";
import { R as RotateCcw } from "./rotate-ccw-BOFUVrcG.js";
import { R as ResponsiveContainer, a as ReferenceLine, T as Tooltip, P as Legend, B as Bar, C as Cell } from "./generateCategoricalChart-BCXr-Xg0.js";
import { L as LineChart, C as CartesianGrid, a as Line } from "./LineChart-BMtkn0nI.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DOCRXNFP.js";
import { B as BarChart } from "./BarChart-BxkKLnjS.js";
import { R as RadarChart, P as PolarGrid, a as PolarAngleAxis, b as Radar } from "./RadarChart-DxQXx5zm.js";
import { D as Download } from "./download-DJCDhF0Y.js";
import "./string-CugKFzKt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
const interpolateZoom = function zoomRho(rho, rho2, rho4) {
  function zoom2(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom2.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom2;
}(Math.SQRT2, 2, 4);
const PanelGroupContext = reactExports.createContext(null);
PanelGroupContext.displayName = "PanelGroupContext";
const DATA_ATTRIBUTES = {
  group: "data-panel-group",
  groupDirection: "data-panel-group-direction",
  groupId: "data-panel-group-id",
  panel: "data-panel",
  panelCollapsible: "data-panel-collapsible",
  panelId: "data-panel-id",
  panelSize: "data-panel-size",
  resizeHandle: "data-resize-handle",
  resizeHandleActive: "data-resize-handle-active",
  resizeHandleEnabled: "data-panel-resize-handle-enabled",
  resizeHandleId: "data-panel-resize-handle-id",
  resizeHandleState: "data-resize-handle-state"
};
const PRECISION = 10;
const useIsomorphicLayoutEffect = reactExports.useLayoutEffect;
const useId = React["useId".toString()];
const wrappedUseId = typeof useId === "function" ? useId : () => null;
let counter = 0;
function useUniqueId(idFromParams = null) {
  const idFromUseId = wrappedUseId();
  const idRef = reactExports.useRef(idFromParams || idFromUseId || null);
  if (idRef.current === null) {
    idRef.current = "" + counter++;
  }
  return idFromParams !== null && idFromParams !== void 0 ? idFromParams : idRef.current;
}
function PanelWithForwardedRef({
  children,
  className: classNameFromProps = "",
  collapsedSize,
  collapsible,
  defaultSize,
  forwardedRef,
  id: idFromProps,
  maxSize,
  minSize,
  onCollapse,
  onExpand,
  onResize,
  order,
  style: styleFromProps,
  tagName: Type = "div",
  ...rest
}) {
  const context = reactExports.useContext(PanelGroupContext);
  if (context === null) {
    throw Error(`Panel components must be rendered within a PanelGroup container`);
  }
  const {
    collapsePanel,
    expandPanel,
    getPanelSize,
    getPanelStyle,
    groupId,
    isPanelCollapsed,
    reevaluatePanelConstraints,
    registerPanel,
    resizePanel: resizePanel2,
    unregisterPanel
  } = context;
  const panelId = useUniqueId(idFromProps);
  const panelDataRef = reactExports.useRef({
    callbacks: {
      onCollapse,
      onExpand,
      onResize
    },
    constraints: {
      collapsedSize,
      collapsible,
      defaultSize,
      maxSize,
      minSize
    },
    id: panelId,
    idIsFromProps: idFromProps !== void 0,
    order
  });
  reactExports.useRef({
    didLogMissingDefaultSizeWarning: false
  });
  useIsomorphicLayoutEffect(() => {
    const {
      callbacks,
      constraints
    } = panelDataRef.current;
    const prevConstraints = {
      ...constraints
    };
    panelDataRef.current.id = panelId;
    panelDataRef.current.idIsFromProps = idFromProps !== void 0;
    panelDataRef.current.order = order;
    callbacks.onCollapse = onCollapse;
    callbacks.onExpand = onExpand;
    callbacks.onResize = onResize;
    constraints.collapsedSize = collapsedSize;
    constraints.collapsible = collapsible;
    constraints.defaultSize = defaultSize;
    constraints.maxSize = maxSize;
    constraints.minSize = minSize;
    if (prevConstraints.collapsedSize !== constraints.collapsedSize || prevConstraints.collapsible !== constraints.collapsible || prevConstraints.maxSize !== constraints.maxSize || prevConstraints.minSize !== constraints.minSize) {
      reevaluatePanelConstraints(panelDataRef.current, prevConstraints);
    }
  });
  useIsomorphicLayoutEffect(() => {
    const panelData = panelDataRef.current;
    registerPanel(panelData);
    return () => {
      unregisterPanel(panelData);
    };
  }, [order, panelId, registerPanel, unregisterPanel]);
  reactExports.useImperativeHandle(forwardedRef, () => ({
    collapse: () => {
      collapsePanel(panelDataRef.current);
    },
    expand: (minSize2) => {
      expandPanel(panelDataRef.current, minSize2);
    },
    getId() {
      return panelId;
    },
    getSize() {
      return getPanelSize(panelDataRef.current);
    },
    isCollapsed() {
      return isPanelCollapsed(panelDataRef.current);
    },
    isExpanded() {
      return !isPanelCollapsed(panelDataRef.current);
    },
    resize: (size) => {
      resizePanel2(panelDataRef.current, size);
    }
  }), [collapsePanel, expandPanel, getPanelSize, isPanelCollapsed, panelId, resizePanel2]);
  const style = getPanelStyle(panelDataRef.current, defaultSize);
  return reactExports.createElement(Type, {
    ...rest,
    children,
    className: classNameFromProps,
    id: panelId,
    style: {
      ...style,
      ...styleFromProps
    },
    // CSS selectors
    [DATA_ATTRIBUTES.groupId]: groupId,
    [DATA_ATTRIBUTES.panel]: "",
    [DATA_ATTRIBUTES.panelCollapsible]: collapsible || void 0,
    [DATA_ATTRIBUTES.panelId]: panelId,
    [DATA_ATTRIBUTES.panelSize]: parseFloat("" + style.flexGrow).toFixed(1)
  });
}
const Panel = reactExports.forwardRef((props2, ref) => reactExports.createElement(PanelWithForwardedRef, {
  ...props2,
  forwardedRef: ref
}));
PanelWithForwardedRef.displayName = "Panel";
Panel.displayName = "forwardRef(Panel)";
let currentCursorStyle = null;
let prevRuleIndex = -1;
let styleElement = null;
function getCursorStyle(state, constraintFlags) {
  if (constraintFlags) {
    const horizontalMin = (constraintFlags & EXCEEDED_HORIZONTAL_MIN) !== 0;
    const horizontalMax = (constraintFlags & EXCEEDED_HORIZONTAL_MAX) !== 0;
    const verticalMin = (constraintFlags & EXCEEDED_VERTICAL_MIN) !== 0;
    const verticalMax = (constraintFlags & EXCEEDED_VERTICAL_MAX) !== 0;
    if (horizontalMin) {
      if (verticalMin) {
        return "se-resize";
      } else if (verticalMax) {
        return "ne-resize";
      } else {
        return "e-resize";
      }
    } else if (horizontalMax) {
      if (verticalMin) {
        return "sw-resize";
      } else if (verticalMax) {
        return "nw-resize";
      } else {
        return "w-resize";
      }
    } else if (verticalMin) {
      return "s-resize";
    } else if (verticalMax) {
      return "n-resize";
    }
  }
  switch (state) {
    case "horizontal":
      return "ew-resize";
    case "intersection":
      return "move";
    case "vertical":
      return "ns-resize";
  }
}
function resetGlobalCursorStyle() {
  if (styleElement !== null) {
    document.head.removeChild(styleElement);
    currentCursorStyle = null;
    styleElement = null;
    prevRuleIndex = -1;
  }
}
function setGlobalCursorStyle(state, constraintFlags) {
  var _styleElement$sheet$i, _styleElement$sheet2;
  const style = getCursorStyle(state, constraintFlags);
  if (currentCursorStyle === style) {
    return;
  }
  currentCursorStyle = style;
  if (styleElement === null) {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }
  if (prevRuleIndex >= 0) {
    var _styleElement$sheet;
    (_styleElement$sheet = styleElement.sheet) === null || _styleElement$sheet === void 0 ? void 0 : _styleElement$sheet.removeRule(prevRuleIndex);
  }
  prevRuleIndex = (_styleElement$sheet$i = (_styleElement$sheet2 = styleElement.sheet) === null || _styleElement$sheet2 === void 0 ? void 0 : _styleElement$sheet2.insertRule(`*{cursor: ${style} !important;}`)) !== null && _styleElement$sheet$i !== void 0 ? _styleElement$sheet$i : -1;
}
function isKeyDown(event) {
  return event.type === "keydown";
}
function isPointerEvent(event) {
  return event.type.startsWith("pointer");
}
function isMouseEvent(event) {
  return event.type.startsWith("mouse");
}
function getResizeEventCoordinates(event) {
  if (isPointerEvent(event)) {
    if (event.isPrimary) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
  } else if (isMouseEvent(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return {
    x: Infinity,
    y: Infinity
  };
}
function getInputType() {
  if (typeof matchMedia === "function") {
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
  }
}
function intersects(rectOne, rectTwo, strict) {
  {
    return rectOne.x < rectTwo.x + rectTwo.width && rectOne.x + rectOne.width > rectTwo.x && rectOne.y < rectTwo.y + rectTwo.height && rectOne.y + rectOne.height > rectTwo.y;
  }
}
function compare(a, b) {
  if (a === b) throw new Error("Cannot compare node with itself");
  const ancestors = {
    a: get_ancestors(a),
    b: get_ancestors(b)
  };
  let common_ancestor;
  while (ancestors.a.at(-1) === ancestors.b.at(-1)) {
    a = ancestors.a.pop();
    b = ancestors.b.pop();
    common_ancestor = a;
  }
  assert(common_ancestor, "Stacking order can only be calculated for elements with a common ancestor");
  const z_indexes = {
    a: get_z_index(find_stacking_context(ancestors.a)),
    b: get_z_index(find_stacking_context(ancestors.b))
  };
  if (z_indexes.a === z_indexes.b) {
    const children = common_ancestor.childNodes;
    const furthest_ancestors = {
      a: ancestors.a.at(-1),
      b: ancestors.b.at(-1)
    };
    let i = children.length;
    while (i--) {
      const child = children[i];
      if (child === furthest_ancestors.a) return 1;
      if (child === furthest_ancestors.b) return -1;
    }
  }
  return Math.sign(z_indexes.a - z_indexes.b);
}
const props = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function is_flex_item(node) {
  var _get_parent;
  const display = getComputedStyle((_get_parent = get_parent(node)) !== null && _get_parent !== void 0 ? _get_parent : node).display;
  return display === "flex" || display === "inline-flex";
}
function creates_stacking_context(node) {
  const style = getComputedStyle(node);
  if (style.position === "fixed") return true;
  if (style.zIndex !== "auto" && (style.position !== "static" || is_flex_item(node))) return true;
  if (+style.opacity < 1) return true;
  if ("transform" in style && style.transform !== "none") return true;
  if ("webkitTransform" in style && style.webkitTransform !== "none") return true;
  if ("mixBlendMode" in style && style.mixBlendMode !== "normal") return true;
  if ("filter" in style && style.filter !== "none") return true;
  if ("webkitFilter" in style && style.webkitFilter !== "none") return true;
  if ("isolation" in style && style.isolation === "isolate") return true;
  if (props.test(style.willChange)) return true;
  if (style.webkitOverflowScrolling === "touch") return true;
  return false;
}
function find_stacking_context(nodes) {
  let i = nodes.length;
  while (i--) {
    const node = nodes[i];
    assert(node, "Missing node");
    if (creates_stacking_context(node)) return node;
  }
  return null;
}
function get_z_index(node) {
  return node && Number(getComputedStyle(node).zIndex) || 0;
}
function get_ancestors(node) {
  const ancestors = [];
  while (node) {
    ancestors.push(node);
    node = get_parent(node);
  }
  return ancestors;
}
function get_parent(node) {
  const {
    parentNode
  } = node;
  if (parentNode && parentNode instanceof ShadowRoot) {
    return parentNode.host;
  }
  return parentNode;
}
const EXCEEDED_HORIZONTAL_MIN = 1;
const EXCEEDED_HORIZONTAL_MAX = 2;
const EXCEEDED_VERTICAL_MIN = 4;
const EXCEEDED_VERTICAL_MAX = 8;
const isCoarsePointer = getInputType() === "coarse";
let intersectingHandles = [];
let isPointerDown = false;
let ownerDocumentCounts = /* @__PURE__ */ new Map();
let panelConstraintFlags = /* @__PURE__ */ new Map();
const registeredResizeHandlers = /* @__PURE__ */ new Set();
function registerResizeHandle(resizeHandleId, element, direction, hitAreaMargins, setResizeHandlerState) {
  var _ownerDocumentCounts$;
  const {
    ownerDocument
  } = element;
  const data = {
    direction,
    element,
    hitAreaMargins,
    setResizeHandlerState
  };
  const count = (_ownerDocumentCounts$ = ownerDocumentCounts.get(ownerDocument)) !== null && _ownerDocumentCounts$ !== void 0 ? _ownerDocumentCounts$ : 0;
  ownerDocumentCounts.set(ownerDocument, count + 1);
  registeredResizeHandlers.add(data);
  updateListeners();
  return function unregisterResizeHandle() {
    var _ownerDocumentCounts$2;
    panelConstraintFlags.delete(resizeHandleId);
    registeredResizeHandlers.delete(data);
    const count2 = (_ownerDocumentCounts$2 = ownerDocumentCounts.get(ownerDocument)) !== null && _ownerDocumentCounts$2 !== void 0 ? _ownerDocumentCounts$2 : 1;
    ownerDocumentCounts.set(ownerDocument, count2 - 1);
    updateListeners();
    if (count2 === 1) {
      ownerDocumentCounts.delete(ownerDocument);
    }
    if (intersectingHandles.includes(data)) {
      const index = intersectingHandles.indexOf(data);
      if (index >= 0) {
        intersectingHandles.splice(index, 1);
      }
      updateCursor();
      setResizeHandlerState("up", true, null);
    }
  };
}
function handlePointerDown(event) {
  const {
    target
  } = event;
  const {
    x,
    y
  } = getResizeEventCoordinates(event);
  isPointerDown = true;
  recalculateIntersectingHandles({
    target,
    x,
    y
  });
  updateListeners();
  if (intersectingHandles.length > 0) {
    updateResizeHandlerStates("down", event);
    event.preventDefault();
    if (!isWithinResizeHandle(target)) {
      event.stopImmediatePropagation();
    }
  }
}
function handlePointerMove(event) {
  const {
    x,
    y
  } = getResizeEventCoordinates(event);
  if (isPointerDown && event.buttons === 0) {
    isPointerDown = false;
    updateResizeHandlerStates("up", event);
  }
  if (!isPointerDown) {
    const {
      target
    } = event;
    recalculateIntersectingHandles({
      target,
      x,
      y
    });
  }
  updateResizeHandlerStates("move", event);
  updateCursor();
  if (intersectingHandles.length > 0) {
    event.preventDefault();
  }
}
function handlePointerUp(event) {
  const {
    target
  } = event;
  const {
    x,
    y
  } = getResizeEventCoordinates(event);
  panelConstraintFlags.clear();
  isPointerDown = false;
  if (intersectingHandles.length > 0) {
    event.preventDefault();
    if (!isWithinResizeHandle(target)) {
      event.stopImmediatePropagation();
    }
  }
  updateResizeHandlerStates("up", event);
  recalculateIntersectingHandles({
    target,
    x,
    y
  });
  updateCursor();
  updateListeners();
}
function isWithinResizeHandle(element) {
  let currentElement = element;
  while (currentElement) {
    if (currentElement.hasAttribute(DATA_ATTRIBUTES.resizeHandle)) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }
  return false;
}
function recalculateIntersectingHandles({
  target,
  x,
  y
}) {
  intersectingHandles.splice(0);
  let targetElement = null;
  if (target instanceof HTMLElement || target instanceof SVGElement) {
    targetElement = target;
  }
  registeredResizeHandlers.forEach((data) => {
    const {
      element: dragHandleElement,
      hitAreaMargins
    } = data;
    const dragHandleRect = dragHandleElement.getBoundingClientRect();
    const {
      bottom,
      left,
      right,
      top
    } = dragHandleRect;
    const margin = isCoarsePointer ? hitAreaMargins.coarse : hitAreaMargins.fine;
    const eventIntersects = x >= left - margin && x <= right + margin && y >= top - margin && y <= bottom + margin;
    if (eventIntersects) {
      if (targetElement !== null && document.contains(targetElement) && dragHandleElement !== targetElement && !dragHandleElement.contains(targetElement) && !targetElement.contains(dragHandleElement) && // Calculating stacking order has a cost, so we should avoid it if possible
      // That is why we only check potentially intersecting handles,
      // and why we skip if the event target is within the handle's DOM
      compare(targetElement, dragHandleElement) > 0) {
        let currentElement = targetElement;
        let didIntersect = false;
        while (currentElement) {
          if (currentElement.contains(dragHandleElement)) {
            break;
          } else if (intersects(currentElement.getBoundingClientRect(), dragHandleRect)) {
            didIntersect = true;
            break;
          }
          currentElement = currentElement.parentElement;
        }
        if (didIntersect) {
          return;
        }
      }
      intersectingHandles.push(data);
    }
  });
}
function reportConstraintsViolation(resizeHandleId, flag) {
  panelConstraintFlags.set(resizeHandleId, flag);
}
function updateCursor() {
  let intersectsHorizontal = false;
  let intersectsVertical = false;
  intersectingHandles.forEach((data) => {
    const {
      direction
    } = data;
    if (direction === "horizontal") {
      intersectsHorizontal = true;
    } else {
      intersectsVertical = true;
    }
  });
  let constraintFlags = 0;
  panelConstraintFlags.forEach((flag) => {
    constraintFlags |= flag;
  });
  if (intersectsHorizontal && intersectsVertical) {
    setGlobalCursorStyle("intersection", constraintFlags);
  } else if (intersectsHorizontal) {
    setGlobalCursorStyle("horizontal", constraintFlags);
  } else if (intersectsVertical) {
    setGlobalCursorStyle("vertical", constraintFlags);
  } else {
    resetGlobalCursorStyle();
  }
}
let listenersAbortController = new AbortController();
function updateListeners() {
  listenersAbortController.abort();
  listenersAbortController = new AbortController();
  const options = {
    capture: true,
    signal: listenersAbortController.signal
  };
  if (!registeredResizeHandlers.size) {
    return;
  }
  if (isPointerDown) {
    if (intersectingHandles.length > 0) {
      ownerDocumentCounts.forEach((count, ownerDocument) => {
        const {
          body
        } = ownerDocument;
        if (count > 0) {
          body.addEventListener("contextmenu", handlePointerUp, options);
          body.addEventListener("pointerleave", handlePointerMove, options);
          body.addEventListener("pointermove", handlePointerMove, options);
        }
      });
    }
    window.addEventListener("pointerup", handlePointerUp, options);
    window.addEventListener("pointercancel", handlePointerUp, options);
  } else {
    ownerDocumentCounts.forEach((count, ownerDocument) => {
      const {
        body
      } = ownerDocument;
      if (count > 0) {
        body.addEventListener("pointerdown", handlePointerDown, options);
        body.addEventListener("pointermove", handlePointerMove, options);
      }
    });
  }
}
function updateResizeHandlerStates(action, event) {
  registeredResizeHandlers.forEach((data) => {
    const {
      setResizeHandlerState
    } = data;
    const isActive = intersectingHandles.includes(data);
    setResizeHandlerState(action, isActive, event);
  });
}
function useForceUpdate() {
  const [_, setCount] = reactExports.useState(0);
  return reactExports.useCallback(() => setCount((prevCount) => prevCount + 1), []);
}
function assert(expectedCondition, message) {
  if (!expectedCondition) {
    console.error(message);
    throw Error(message);
  }
}
function fuzzyCompareNumbers(actual, expected, fractionDigits = PRECISION) {
  if (actual.toFixed(fractionDigits) === expected.toFixed(fractionDigits)) {
    return 0;
  } else {
    return actual > expected ? 1 : -1;
  }
}
function fuzzyNumbersEqual$1(actual, expected, fractionDigits = PRECISION) {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyNumbersEqual(actual, expected, fractionDigits) {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyLayoutsEqual(actual, expected, fractionDigits) {
  if (actual.length !== expected.length) {
    return false;
  }
  for (let index = 0; index < actual.length; index++) {
    const actualSize = actual[index];
    const expectedSize = expected[index];
    if (!fuzzyNumbersEqual(actualSize, expectedSize, fractionDigits)) {
      return false;
    }
  }
  return true;
}
function resizePanel({
  panelConstraints: panelConstraintsArray,
  panelIndex,
  size
}) {
  const panelConstraints = panelConstraintsArray[panelIndex];
  assert(panelConstraints != null, `Panel constraints not found for index ${panelIndex}`);
  let {
    collapsedSize = 0,
    collapsible,
    maxSize = 100,
    minSize = 0
  } = panelConstraints;
  if (fuzzyCompareNumbers(size, minSize) < 0) {
    if (collapsible) {
      const halfwayPoint = (collapsedSize + minSize) / 2;
      if (fuzzyCompareNumbers(size, halfwayPoint) < 0) {
        size = collapsedSize;
      } else {
        size = minSize;
      }
    } else {
      size = minSize;
    }
  }
  size = Math.min(maxSize, size);
  size = parseFloat(size.toFixed(PRECISION));
  return size;
}
function adjustLayoutByDelta({
  delta,
  initialLayout,
  panelConstraints: panelConstraintsArray,
  pivotIndices,
  prevLayout,
  trigger
}) {
  if (fuzzyNumbersEqual(delta, 0)) {
    return initialLayout;
  }
  const nextLayout = [...initialLayout];
  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  assert(firstPivotIndex != null, "Invalid first pivot index");
  assert(secondPivotIndex != null, "Invalid second pivot index");
  let deltaApplied = 0;
  {
    if (trigger === "keyboard") {
      {
        const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const panelConstraints = panelConstraintsArray[index];
        assert(panelConstraints, `Panel constraints not found for index ${index}`);
        const {
          collapsedSize = 0,
          collapsible,
          minSize = 0
        } = panelConstraints;
        if (collapsible) {
          const prevSize = initialLayout[index];
          assert(prevSize != null, `Previous layout not found for panel index ${index}`);
          if (fuzzyNumbersEqual(prevSize, collapsedSize)) {
            const localDelta = minSize - prevSize;
            if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
      {
        const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
        const panelConstraints = panelConstraintsArray[index];
        assert(panelConstraints, `No panel constraints found for index ${index}`);
        const {
          collapsedSize = 0,
          collapsible,
          minSize = 0
        } = panelConstraints;
        if (collapsible) {
          const prevSize = initialLayout[index];
          assert(prevSize != null, `Previous layout not found for panel index ${index}`);
          if (fuzzyNumbersEqual(prevSize, minSize)) {
            const localDelta = prevSize - collapsedSize;
            if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
    }
  }
  {
    const increment = delta < 0 ? 1 : -1;
    let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
    let maxAvailableDelta = 0;
    while (true) {
      const prevSize = initialLayout[index];
      assert(prevSize != null, `Previous layout not found for panel index ${index}`);
      const maxSafeSize = resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index,
        size: 100
      });
      const delta2 = maxSafeSize - prevSize;
      maxAvailableDelta += delta2;
      index += increment;
      if (index < 0 || index >= panelConstraintsArray.length) {
        break;
      }
    }
    const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
    delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
  }
  {
    const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
    let index = pivotIndex;
    while (index >= 0 && index < panelConstraintsArray.length) {
      const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
      const prevSize = initialLayout[index];
      assert(prevSize != null, `Previous layout not found for panel index ${index}`);
      const unsafeSize = prevSize - deltaRemaining;
      const safeSize = resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index,
        size: unsafeSize
      });
      if (!fuzzyNumbersEqual(prevSize, safeSize)) {
        deltaApplied += prevSize - safeSize;
        nextLayout[index] = safeSize;
        if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
          numeric: true
        }) >= 0) {
          break;
        }
      }
      if (delta < 0) {
        index--;
      } else {
        index++;
      }
    }
  }
  if (fuzzyLayoutsEqual(prevLayout, nextLayout)) {
    return prevLayout;
  }
  {
    const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    const prevSize = initialLayout[pivotIndex];
    assert(prevSize != null, `Previous layout not found for panel index ${pivotIndex}`);
    const unsafeSize = prevSize + deltaApplied;
    const safeSize = resizePanel({
      panelConstraints: panelConstraintsArray,
      panelIndex: pivotIndex,
      size: unsafeSize
    });
    nextLayout[pivotIndex] = safeSize;
    if (!fuzzyNumbersEqual(safeSize, unsafeSize)) {
      let deltaRemaining = unsafeSize - safeSize;
      const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
      let index = pivotIndex2;
      while (index >= 0 && index < panelConstraintsArray.length) {
        const prevSize2 = nextLayout[index];
        assert(prevSize2 != null, `Previous layout not found for panel index ${index}`);
        const unsafeSize2 = prevSize2 + deltaRemaining;
        const safeSize2 = resizePanel({
          panelConstraints: panelConstraintsArray,
          panelIndex: index,
          size: unsafeSize2
        });
        if (!fuzzyNumbersEqual(prevSize2, safeSize2)) {
          deltaRemaining -= safeSize2 - prevSize2;
          nextLayout[index] = safeSize2;
        }
        if (fuzzyNumbersEqual(deltaRemaining, 0)) {
          break;
        }
        if (delta > 0) {
          index--;
        } else {
          index++;
        }
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!fuzzyNumbersEqual(totalSize, 100)) {
    return prevLayout;
  }
  return nextLayout;
}
function calculateAriaValues({
  layout,
  panelsArray,
  pivotIndices
}) {
  let currentMinSize = 0;
  let currentMaxSize = 100;
  let totalMinSize = 0;
  let totalMaxSize = 0;
  const firstIndex = pivotIndices[0];
  assert(firstIndex != null, "No pivot index found");
  panelsArray.forEach((panelData, index) => {
    const {
      constraints
    } = panelData;
    const {
      maxSize = 100,
      minSize = 0
    } = constraints;
    if (index === firstIndex) {
      currentMinSize = minSize;
      currentMaxSize = maxSize;
    } else {
      totalMinSize += minSize;
      totalMaxSize += maxSize;
    }
  });
  const valueMax = Math.min(currentMaxSize, 100 - totalMinSize);
  const valueMin = Math.max(currentMinSize, 100 - totalMaxSize);
  const valueNow = layout[firstIndex];
  return {
    valueMax,
    valueMin,
    valueNow
  };
}
function getResizeHandleElementsForGroup(groupId, scope = document) {
  return Array.from(scope.querySelectorAll(`[${DATA_ATTRIBUTES.resizeHandleId}][data-panel-group-id="${groupId}"]`));
}
function getResizeHandleElementIndex(groupId, id, scope = document) {
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index = handles.findIndex((handle) => handle.getAttribute(DATA_ATTRIBUTES.resizeHandleId) === id);
  return index !== null && index !== void 0 ? index : null;
}
function determinePivotIndices(groupId, dragHandleId, panelGroupElement) {
  const index = getResizeHandleElementIndex(groupId, dragHandleId, panelGroupElement);
  return index != null ? [index, index + 1] : [-1, -1];
}
function getPanelGroupElement(id, rootElement = document) {
  var _dataset;
  if (rootElement instanceof HTMLElement && (rootElement === null || rootElement === void 0 ? void 0 : (_dataset = rootElement.dataset) === null || _dataset === void 0 ? void 0 : _dataset.panelGroupId) == id) {
    return rootElement;
  }
  const element = rootElement.querySelector(`[data-panel-group][data-panel-group-id="${id}"]`);
  if (element) {
    return element;
  }
  return null;
}
function getResizeHandleElement(id, scope = document) {
  const element = scope.querySelector(`[${DATA_ATTRIBUTES.resizeHandleId}="${id}"]`);
  if (element) {
    return element;
  }
  return null;
}
function getResizeHandlePanelIds(groupId, handleId, panelsArray, scope = document) {
  var _panelsArray$index$id, _panelsArray$index, _panelsArray$id, _panelsArray;
  const handle = getResizeHandleElement(handleId, scope);
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index = handle ? handles.indexOf(handle) : -1;
  const idBefore = (_panelsArray$index$id = (_panelsArray$index = panelsArray[index]) === null || _panelsArray$index === void 0 ? void 0 : _panelsArray$index.id) !== null && _panelsArray$index$id !== void 0 ? _panelsArray$index$id : null;
  const idAfter = (_panelsArray$id = (_panelsArray = panelsArray[index + 1]) === null || _panelsArray === void 0 ? void 0 : _panelsArray.id) !== null && _panelsArray$id !== void 0 ? _panelsArray$id : null;
  return [idBefore, idAfter];
}
function useWindowSplitterPanelGroupBehavior({
  committedValuesRef,
  eagerValuesRef,
  groupId,
  layout,
  panelDataArray,
  panelGroupElement,
  setLayout
}) {
  reactExports.useRef({
    didWarnAboutMissingResizeHandle: false
  });
  useIsomorphicLayoutEffect(() => {
    if (!panelGroupElement) {
      return;
    }
    const resizeHandleElements = getResizeHandleElementsForGroup(groupId, panelGroupElement);
    for (let index = 0; index < panelDataArray.length - 1; index++) {
      const {
        valueMax,
        valueMin,
        valueNow
      } = calculateAriaValues({
        layout,
        panelsArray: panelDataArray,
        pivotIndices: [index, index + 1]
      });
      const resizeHandleElement = resizeHandleElements[index];
      if (resizeHandleElement == null) ;
      else {
        const panelData = panelDataArray[index];
        assert(panelData, `No panel data found for index "${index}"`);
        resizeHandleElement.setAttribute("aria-controls", panelData.id);
        resizeHandleElement.setAttribute("aria-valuemax", "" + Math.round(valueMax));
        resizeHandleElement.setAttribute("aria-valuemin", "" + Math.round(valueMin));
        resizeHandleElement.setAttribute("aria-valuenow", valueNow != null ? "" + Math.round(valueNow) : "");
      }
    }
    return () => {
      resizeHandleElements.forEach((resizeHandleElement, index) => {
        resizeHandleElement.removeAttribute("aria-controls");
        resizeHandleElement.removeAttribute("aria-valuemax");
        resizeHandleElement.removeAttribute("aria-valuemin");
        resizeHandleElement.removeAttribute("aria-valuenow");
      });
    };
  }, [groupId, layout, panelDataArray, panelGroupElement]);
  reactExports.useEffect(() => {
    if (!panelGroupElement) {
      return;
    }
    const eagerValues = eagerValuesRef.current;
    assert(eagerValues, `Eager values not found`);
    const {
      panelDataArray: panelDataArray2
    } = eagerValues;
    const groupElement = getPanelGroupElement(groupId, panelGroupElement);
    assert(groupElement != null, `No group found for id "${groupId}"`);
    const handles = getResizeHandleElementsForGroup(groupId, panelGroupElement);
    assert(handles, `No resize handles found for group id "${groupId}"`);
    const cleanupFunctions = handles.map((handle) => {
      const handleId = handle.getAttribute(DATA_ATTRIBUTES.resizeHandleId);
      assert(handleId, `Resize handle element has no handle id attribute`);
      const [idBefore, idAfter] = getResizeHandlePanelIds(groupId, handleId, panelDataArray2, panelGroupElement);
      if (idBefore == null || idAfter == null) {
        return () => {
        };
      }
      const onKeyDown = (event) => {
        if (event.defaultPrevented) {
          return;
        }
        switch (event.key) {
          case "Enter": {
            event.preventDefault();
            const index = panelDataArray2.findIndex((panelData) => panelData.id === idBefore);
            if (index >= 0) {
              const panelData = panelDataArray2[index];
              assert(panelData, `No panel data found for index ${index}`);
              const size = layout[index];
              const {
                collapsedSize = 0,
                collapsible,
                minSize = 0
              } = panelData.constraints;
              if (size != null && collapsible) {
                const nextLayout = adjustLayoutByDelta({
                  delta: fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
                  initialLayout: layout,
                  panelConstraints: panelDataArray2.map((panelData2) => panelData2.constraints),
                  pivotIndices: determinePivotIndices(groupId, handleId, panelGroupElement),
                  prevLayout: layout,
                  trigger: "keyboard"
                });
                if (layout !== nextLayout) {
                  setLayout(nextLayout);
                }
              }
            }
            break;
          }
        }
      };
      handle.addEventListener("keydown", onKeyDown);
      return () => {
        handle.removeEventListener("keydown", onKeyDown);
      };
    });
    return () => {
      cleanupFunctions.forEach((cleanupFunction) => cleanupFunction());
    };
  }, [panelGroupElement, committedValuesRef, eagerValuesRef, groupId, layout, panelDataArray, setLayout]);
}
function areEqual(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }
  for (let index = 0; index < arrayA.length; index++) {
    if (arrayA[index] !== arrayB[index]) {
      return false;
    }
  }
  return true;
}
function getResizeEventCursorPosition(direction, event) {
  const isHorizontal = direction === "horizontal";
  const {
    x,
    y
  } = getResizeEventCoordinates(event);
  return isHorizontal ? x : y;
}
function calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement) {
  const isHorizontal = direction === "horizontal";
  const handleElement = getResizeHandleElement(dragHandleId, panelGroupElement);
  assert(handleElement, `No resize handle element found for id "${dragHandleId}"`);
  const groupId = handleElement.getAttribute(DATA_ATTRIBUTES.groupId);
  assert(groupId, `Resize handle element has no group id attribute`);
  let {
    initialCursorPosition
  } = initialDragState;
  const cursorPosition = getResizeEventCursorPosition(direction, event);
  const groupElement = getPanelGroupElement(groupId, panelGroupElement);
  assert(groupElement, `No group element found for id "${groupId}"`);
  const groupRect = groupElement.getBoundingClientRect();
  const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
  const offsetPixels = cursorPosition - initialCursorPosition;
  const offsetPercentage = offsetPixels / groupSizeInPixels * 100;
  return offsetPercentage;
}
function calculateDeltaPercentage(event, dragHandleId, direction, initialDragState, keyboardResizeBy, panelGroupElement) {
  if (isKeyDown(event)) {
    const isHorizontal = direction === "horizontal";
    let delta = 0;
    if (event.shiftKey) {
      delta = 100;
    } else if (keyboardResizeBy != null) {
      delta = keyboardResizeBy;
    } else {
      delta = 10;
    }
    let movement = 0;
    switch (event.key) {
      case "ArrowDown":
        movement = isHorizontal ? 0 : delta;
        break;
      case "ArrowLeft":
        movement = isHorizontal ? -delta : 0;
        break;
      case "ArrowRight":
        movement = isHorizontal ? delta : 0;
        break;
      case "ArrowUp":
        movement = isHorizontal ? 0 : -delta;
        break;
      case "End":
        movement = 100;
        break;
      case "Home":
        movement = -100;
        break;
    }
    return movement;
  } else {
    if (initialDragState == null) {
      return 0;
    }
    return calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement);
  }
}
function calculateUnsafeDefaultLayout({
  panelDataArray
}) {
  const layout = Array(panelDataArray.length);
  const panelConstraintsArray = panelDataArray.map((panelData) => panelData.constraints);
  let numPanelsWithSizes = 0;
  let remainingSize = 100;
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints, `Panel constraints not found for index ${index}`);
    const {
      defaultSize
    } = panelConstraints;
    if (defaultSize != null) {
      numPanelsWithSizes++;
      layout[index] = defaultSize;
      remainingSize -= defaultSize;
    }
  }
  for (let index = 0; index < panelDataArray.length; index++) {
    const panelConstraints = panelConstraintsArray[index];
    assert(panelConstraints, `Panel constraints not found for index ${index}`);
    const {
      defaultSize
    } = panelConstraints;
    if (defaultSize != null) {
      continue;
    }
    const numRemainingPanels = panelDataArray.length - numPanelsWithSizes;
    const size = remainingSize / numRemainingPanels;
    numPanelsWithSizes++;
    layout[index] = size;
    remainingSize -= size;
  }
  return layout;
}
function callPanelCallbacks(panelsArray, layout, panelIdToLastNotifiedSizeMap) {
  layout.forEach((size, index) => {
    const panelData = panelsArray[index];
    assert(panelData, `Panel data not found for index ${index}`);
    const {
      callbacks,
      constraints,
      id: panelId
    } = panelData;
    const {
      collapsedSize = 0,
      collapsible
    } = constraints;
    const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
    if (lastNotifiedSize == null || size !== lastNotifiedSize) {
      panelIdToLastNotifiedSizeMap[panelId] = size;
      const {
        onCollapse,
        onExpand,
        onResize
      } = callbacks;
      if (onResize) {
        onResize(size, lastNotifiedSize);
      }
      if (collapsible && (onCollapse || onExpand)) {
        if (onExpand && (lastNotifiedSize == null || fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && !fuzzyNumbersEqual$1(size, collapsedSize)) {
          onExpand();
        }
        if (onCollapse && (lastNotifiedSize == null || !fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && fuzzyNumbersEqual$1(size, collapsedSize)) {
          onCollapse();
        }
      }
    }
  });
}
function compareLayouts(a, b) {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let index = 0; index < a.length; index++) {
      if (a[index] != b[index]) {
        return false;
      }
    }
  }
  return true;
}
function computePanelFlexBoxStyle({
  defaultSize,
  dragState,
  layout,
  panelData,
  panelIndex,
  precision = 3
}) {
  const size = layout[panelIndex];
  let flexGrow;
  if (size == null) {
    flexGrow = defaultSize != void 0 ? defaultSize.toPrecision(precision) : "1";
  } else if (panelData.length === 1) {
    flexGrow = "1";
  } else {
    flexGrow = size.toPrecision(precision);
  }
  return {
    flexBasis: 0,
    flexGrow,
    flexShrink: 1,
    // Without this, Panel sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a panel during resize
    // This avoid edge cases like nested iframes
    pointerEvents: dragState !== null ? "none" : void 0
  };
}
function debounce(callback, durationMs = 10) {
  let timeoutId = null;
  let callable = (...args) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, durationMs);
  };
  return callable;
}
function initializeDefaultStorage(storageObject) {
  try {
    if (typeof localStorage !== "undefined") {
      storageObject.getItem = (name) => {
        return localStorage.getItem(name);
      };
      storageObject.setItem = (name, value) => {
        localStorage.setItem(name, value);
      };
    } else {
      throw new Error("localStorage not supported in this environment");
    }
  } catch (error) {
    console.error(error);
    storageObject.getItem = () => null;
    storageObject.setItem = () => {
    };
  }
}
function getPanelGroupKey(autoSaveId) {
  return `react-resizable-panels:${autoSaveId}`;
}
function getPanelKey(panels) {
  return panels.map((panel) => {
    const {
      constraints,
      id,
      idIsFromProps,
      order
    } = panel;
    if (idIsFromProps) {
      return id;
    } else {
      return order ? `${order}:${JSON.stringify(constraints)}` : JSON.stringify(constraints);
    }
  }).sort((a, b) => a.localeCompare(b)).join(",");
}
function loadSerializedPanelGroupState(autoSaveId, storage) {
  try {
    const panelGroupKey = getPanelGroupKey(autoSaveId);
    const serialized = storage.getItem(panelGroupKey);
    if (serialized) {
      const parsed = JSON.parse(serialized);
      if (typeof parsed === "object" && parsed != null) {
        return parsed;
      }
    }
  } catch (error) {
  }
  return null;
}
function loadPanelGroupState(autoSaveId, panels, storage) {
  var _loadSerializedPanelG, _state$panelKey;
  const state = (_loadSerializedPanelG = loadSerializedPanelGroupState(autoSaveId, storage)) !== null && _loadSerializedPanelG !== void 0 ? _loadSerializedPanelG : {};
  const panelKey = getPanelKey(panels);
  return (_state$panelKey = state[panelKey]) !== null && _state$panelKey !== void 0 ? _state$panelKey : null;
}
function savePanelGroupState(autoSaveId, panels, panelSizesBeforeCollapse, sizes, storage) {
  var _loadSerializedPanelG2;
  const panelGroupKey = getPanelGroupKey(autoSaveId);
  const panelKey = getPanelKey(panels);
  const state = (_loadSerializedPanelG2 = loadSerializedPanelGroupState(autoSaveId, storage)) !== null && _loadSerializedPanelG2 !== void 0 ? _loadSerializedPanelG2 : {};
  state[panelKey] = {
    expandToSizes: Object.fromEntries(panelSizesBeforeCollapse.entries()),
    layout: sizes
  };
  try {
    storage.setItem(panelGroupKey, JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
}
function validatePanelGroupLayout({
  layout: prevLayout,
  panelConstraints
}) {
  const nextLayout = [...prevLayout];
  const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
  if (nextLayout.length !== panelConstraints.length) {
    throw Error(`Invalid ${panelConstraints.length} panel layout: ${nextLayout.map((size) => `${size}%`).join(", ")}`);
  } else if (!fuzzyNumbersEqual(nextLayoutTotalSize, 100) && nextLayout.length > 0) {
    for (let index = 0; index < panelConstraints.length; index++) {
      const unsafeSize = nextLayout[index];
      assert(unsafeSize != null, `No layout data found for index ${index}`);
      const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
      nextLayout[index] = safeSize;
    }
  }
  let remainingSize = 0;
  for (let index = 0; index < panelConstraints.length; index++) {
    const unsafeSize = nextLayout[index];
    assert(unsafeSize != null, `No layout data found for index ${index}`);
    const safeSize = resizePanel({
      panelConstraints,
      panelIndex: index,
      size: unsafeSize
    });
    if (unsafeSize != safeSize) {
      remainingSize += unsafeSize - safeSize;
      nextLayout[index] = safeSize;
    }
  }
  if (!fuzzyNumbersEqual(remainingSize, 0)) {
    for (let index = 0; index < panelConstraints.length; index++) {
      const prevSize = nextLayout[index];
      assert(prevSize != null, `No layout data found for index ${index}`);
      const unsafeSize = prevSize + remainingSize;
      const safeSize = resizePanel({
        panelConstraints,
        panelIndex: index,
        size: unsafeSize
      });
      if (prevSize !== safeSize) {
        remainingSize -= safeSize - prevSize;
        nextLayout[index] = safeSize;
        if (fuzzyNumbersEqual(remainingSize, 0)) {
          break;
        }
      }
    }
  }
  return nextLayout;
}
const LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
const defaultStorage = {
  getItem: (name) => {
    initializeDefaultStorage(defaultStorage);
    return defaultStorage.getItem(name);
  },
  setItem: (name, value) => {
    initializeDefaultStorage(defaultStorage);
    defaultStorage.setItem(name, value);
  }
};
const debounceMap = {};
function PanelGroupWithForwardedRef({
  autoSaveId = null,
  children,
  className: classNameFromProps = "",
  direction,
  forwardedRef,
  id: idFromProps = null,
  onLayout = null,
  keyboardResizeBy = null,
  storage = defaultStorage,
  style: styleFromProps,
  tagName: Type = "div",
  ...rest
}) {
  const groupId = useUniqueId(idFromProps);
  const panelGroupElementRef = reactExports.useRef(null);
  const [dragState, setDragState] = reactExports.useState(null);
  const [layout, setLayout] = reactExports.useState([]);
  const forceUpdate = useForceUpdate();
  const panelIdToLastNotifiedSizeMapRef = reactExports.useRef({});
  const panelSizeBeforeCollapseRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const prevDeltaRef = reactExports.useRef(0);
  const committedValuesRef = reactExports.useRef({
    autoSaveId,
    direction,
    dragState,
    id: groupId,
    keyboardResizeBy,
    onLayout,
    storage
  });
  const eagerValuesRef = reactExports.useRef({
    layout,
    panelDataArray: [],
    panelDataArrayChanged: false
  });
  reactExports.useRef({
    didLogIdAndOrderWarning: false,
    didLogPanelConstraintsWarning: false,
    prevPanelIds: []
  });
  reactExports.useImperativeHandle(forwardedRef, () => ({
    getId: () => committedValuesRef.current.id,
    getLayout: () => {
      const {
        layout: layout2
      } = eagerValuesRef.current;
      return layout2;
    },
    setLayout: (unsafeLayout) => {
      const {
        onLayout: onLayout2
      } = committedValuesRef.current;
      const {
        layout: prevLayout,
        panelDataArray
      } = eagerValuesRef.current;
      const safeLayout = validatePanelGroupLayout({
        layout: unsafeLayout,
        panelConstraints: panelDataArray.map((panelData) => panelData.constraints)
      });
      if (!areEqual(prevLayout, safeLayout)) {
        setLayout(safeLayout);
        eagerValuesRef.current.layout = safeLayout;
        if (onLayout2) {
          onLayout2(safeLayout);
        }
        callPanelCallbacks(panelDataArray, safeLayout, panelIdToLastNotifiedSizeMapRef.current);
      }
    }
  }), []);
  useIsomorphicLayoutEffect(() => {
    committedValuesRef.current.autoSaveId = autoSaveId;
    committedValuesRef.current.direction = direction;
    committedValuesRef.current.dragState = dragState;
    committedValuesRef.current.id = groupId;
    committedValuesRef.current.onLayout = onLayout;
    committedValuesRef.current.storage = storage;
  });
  useWindowSplitterPanelGroupBehavior({
    committedValuesRef,
    eagerValuesRef,
    groupId,
    layout,
    panelDataArray: eagerValuesRef.current.panelDataArray,
    setLayout,
    panelGroupElement: panelGroupElementRef.current
  });
  reactExports.useEffect(() => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    if (autoSaveId) {
      if (layout.length === 0 || layout.length !== panelDataArray.length) {
        return;
      }
      let debouncedSave = debounceMap[autoSaveId];
      if (debouncedSave == null) {
        debouncedSave = debounce(savePanelGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
        debounceMap[autoSaveId] = debouncedSave;
      }
      const clonedPanelDataArray = [...panelDataArray];
      const clonedPanelSizesBeforeCollapse = new Map(panelSizeBeforeCollapseRef.current);
      debouncedSave(autoSaveId, clonedPanelDataArray, clonedPanelSizesBeforeCollapse, layout, storage);
    }
  }, [autoSaveId, layout, storage]);
  reactExports.useEffect(() => {
  });
  const collapsePanel = reactExports.useCallback((panelData) => {
    const {
      onLayout: onLayout2
    } = committedValuesRef.current;
    const {
      layout: prevLayout,
      panelDataArray
    } = eagerValuesRef.current;
    if (panelData.constraints.collapsible) {
      const panelConstraintsArray = panelDataArray.map((panelData2) => panelData2.constraints);
      const {
        collapsedSize = 0,
        panelSize,
        pivotIndices
      } = panelDataHelper(panelDataArray, panelData, prevLayout);
      assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
      if (!fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
        panelSizeBeforeCollapseRef.current.set(panelData.id, panelSize);
        const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
        const delta = isLastPanel ? panelSize - collapsedSize : collapsedSize - panelSize;
        const nextLayout = adjustLayoutByDelta({
          delta,
          initialLayout: prevLayout,
          panelConstraints: panelConstraintsArray,
          pivotIndices,
          prevLayout,
          trigger: "imperative-api"
        });
        if (!compareLayouts(prevLayout, nextLayout)) {
          setLayout(nextLayout);
          eagerValuesRef.current.layout = nextLayout;
          if (onLayout2) {
            onLayout2(nextLayout);
          }
          callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
        }
      }
    }
  }, []);
  const expandPanel = reactExports.useCallback((panelData, minSizeOverride) => {
    const {
      onLayout: onLayout2
    } = committedValuesRef.current;
    const {
      layout: prevLayout,
      panelDataArray
    } = eagerValuesRef.current;
    if (panelData.constraints.collapsible) {
      const panelConstraintsArray = panelDataArray.map((panelData2) => panelData2.constraints);
      const {
        collapsedSize = 0,
        panelSize = 0,
        minSize: minSizeFromProps = 0,
        pivotIndices
      } = panelDataHelper(panelDataArray, panelData, prevLayout);
      const minSize = minSizeOverride !== null && minSizeOverride !== void 0 ? minSizeOverride : minSizeFromProps;
      if (fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
        const prevPanelSize = panelSizeBeforeCollapseRef.current.get(panelData.id);
        const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
        const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
        const delta = isLastPanel ? panelSize - baseSize : baseSize - panelSize;
        const nextLayout = adjustLayoutByDelta({
          delta,
          initialLayout: prevLayout,
          panelConstraints: panelConstraintsArray,
          pivotIndices,
          prevLayout,
          trigger: "imperative-api"
        });
        if (!compareLayouts(prevLayout, nextLayout)) {
          setLayout(nextLayout);
          eagerValuesRef.current.layout = nextLayout;
          if (onLayout2) {
            onLayout2(nextLayout);
          }
          callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
        }
      }
    }
  }, []);
  const getPanelSize = reactExports.useCallback((panelData) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      panelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    return panelSize;
  }, []);
  const getPanelStyle = reactExports.useCallback((panelData, defaultSize) => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    const panelIndex = findPanelDataIndex(panelDataArray, panelData);
    return computePanelFlexBoxStyle({
      defaultSize,
      dragState,
      layout,
      panelData: panelDataArray,
      panelIndex
    });
  }, [dragState, layout]);
  const isPanelCollapsed = reactExports.useCallback((panelData) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      collapsedSize = 0,
      collapsible,
      panelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    return collapsible === true && fuzzyNumbersEqual$1(panelSize, collapsedSize);
  }, []);
  const isPanelExpanded = reactExports.useCallback((panelData) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      collapsedSize = 0,
      collapsible,
      panelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    return !collapsible || fuzzyCompareNumbers(panelSize, collapsedSize) > 0;
  }, []);
  const registerPanel = reactExports.useCallback((panelData) => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    panelDataArray.push(panelData);
    panelDataArray.sort((panelA, panelB) => {
      const orderA = panelA.order;
      const orderB = panelB.order;
      if (orderA == null && orderB == null) {
        return 0;
      } else if (orderA == null) {
        return -1;
      } else if (orderB == null) {
        return 1;
      } else {
        return orderA - orderB;
      }
    });
    eagerValuesRef.current.panelDataArrayChanged = true;
    forceUpdate();
  }, [forceUpdate]);
  useIsomorphicLayoutEffect(() => {
    if (eagerValuesRef.current.panelDataArrayChanged) {
      eagerValuesRef.current.panelDataArrayChanged = false;
      const {
        autoSaveId: autoSaveId2,
        onLayout: onLayout2,
        storage: storage2
      } = committedValuesRef.current;
      const {
        layout: prevLayout,
        panelDataArray
      } = eagerValuesRef.current;
      let unsafeLayout = null;
      if (autoSaveId2) {
        const state = loadPanelGroupState(autoSaveId2, panelDataArray, storage2);
        if (state) {
          panelSizeBeforeCollapseRef.current = new Map(Object.entries(state.expandToSizes));
          unsafeLayout = state.layout;
        }
      }
      if (unsafeLayout == null) {
        unsafeLayout = calculateUnsafeDefaultLayout({
          panelDataArray
        });
      }
      const nextLayout = validatePanelGroupLayout({
        layout: unsafeLayout,
        panelConstraints: panelDataArray.map((panelData) => panelData.constraints)
      });
      if (!areEqual(prevLayout, nextLayout)) {
        setLayout(nextLayout);
        eagerValuesRef.current.layout = nextLayout;
        if (onLayout2) {
          onLayout2(nextLayout);
        }
        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
      }
    }
  });
  useIsomorphicLayoutEffect(() => {
    const eagerValues = eagerValuesRef.current;
    return () => {
      eagerValues.layout = [];
    };
  }, []);
  const registerResizeHandle2 = reactExports.useCallback((dragHandleId) => {
    let isRTL = false;
    const panelGroupElement = panelGroupElementRef.current;
    if (panelGroupElement) {
      const style2 = window.getComputedStyle(panelGroupElement, null);
      if (style2.getPropertyValue("direction") === "rtl") {
        isRTL = true;
      }
    }
    return function resizeHandler(event) {
      event.preventDefault();
      const panelGroupElement2 = panelGroupElementRef.current;
      if (!panelGroupElement2) {
        return () => null;
      }
      const {
        direction: direction2,
        dragState: dragState2,
        id: groupId2,
        keyboardResizeBy: keyboardResizeBy2,
        onLayout: onLayout2
      } = committedValuesRef.current;
      const {
        layout: prevLayout,
        panelDataArray
      } = eagerValuesRef.current;
      const {
        initialLayout
      } = dragState2 !== null && dragState2 !== void 0 ? dragState2 : {};
      const pivotIndices = determinePivotIndices(groupId2, dragHandleId, panelGroupElement2);
      let delta = calculateDeltaPercentage(event, dragHandleId, direction2, dragState2, keyboardResizeBy2, panelGroupElement2);
      const isHorizontal = direction2 === "horizontal";
      if (isHorizontal && isRTL) {
        delta = -delta;
      }
      const panelConstraints = panelDataArray.map((panelData) => panelData.constraints);
      const nextLayout = adjustLayoutByDelta({
        delta,
        initialLayout: initialLayout !== null && initialLayout !== void 0 ? initialLayout : prevLayout,
        panelConstraints,
        pivotIndices,
        prevLayout,
        trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
      });
      const layoutChanged = !compareLayouts(prevLayout, nextLayout);
      if (isPointerEvent(event) || isMouseEvent(event)) {
        if (prevDeltaRef.current != delta) {
          prevDeltaRef.current = delta;
          if (!layoutChanged && delta !== 0) {
            if (isHorizontal) {
              reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_HORIZONTAL_MIN : EXCEEDED_HORIZONTAL_MAX);
            } else {
              reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_VERTICAL_MIN : EXCEEDED_VERTICAL_MAX);
            }
          } else {
            reportConstraintsViolation(dragHandleId, 0);
          }
        }
      }
      if (layoutChanged) {
        setLayout(nextLayout);
        eagerValuesRef.current.layout = nextLayout;
        if (onLayout2) {
          onLayout2(nextLayout);
        }
        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
      }
    };
  }, []);
  const resizePanel2 = reactExports.useCallback((panelData, unsafePanelSize) => {
    const {
      onLayout: onLayout2
    } = committedValuesRef.current;
    const {
      layout: prevLayout,
      panelDataArray
    } = eagerValuesRef.current;
    const panelConstraintsArray = panelDataArray.map((panelData2) => panelData2.constraints);
    const {
      panelSize,
      pivotIndices
    } = panelDataHelper(panelDataArray, panelData, prevLayout);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
    const delta = isLastPanel ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      initialLayout: prevLayout,
      panelConstraints: panelConstraintsArray,
      pivotIndices,
      prevLayout,
      trigger: "imperative-api"
    });
    if (!compareLayouts(prevLayout, nextLayout)) {
      setLayout(nextLayout);
      eagerValuesRef.current.layout = nextLayout;
      if (onLayout2) {
        onLayout2(nextLayout);
      }
      callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
    }
  }, []);
  const reevaluatePanelConstraints = reactExports.useCallback((panelData, prevConstraints) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      collapsedSize: prevCollapsedSize = 0,
      collapsible: prevCollapsible
    } = prevConstraints;
    const {
      collapsedSize: nextCollapsedSize = 0,
      collapsible: nextCollapsible,
      maxSize: nextMaxSize = 100,
      minSize: nextMinSize = 0
    } = panelData.constraints;
    const {
      panelSize: prevPanelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    if (prevPanelSize == null) {
      return;
    }
    if (prevCollapsible && nextCollapsible && fuzzyNumbersEqual$1(prevPanelSize, prevCollapsedSize)) {
      if (!fuzzyNumbersEqual$1(prevCollapsedSize, nextCollapsedSize)) {
        resizePanel2(panelData, nextCollapsedSize);
      }
    } else if (prevPanelSize < nextMinSize) {
      resizePanel2(panelData, nextMinSize);
    } else if (prevPanelSize > nextMaxSize) {
      resizePanel2(panelData, nextMaxSize);
    }
  }, [resizePanel2]);
  const startDragging = reactExports.useCallback((dragHandleId, event) => {
    const {
      direction: direction2
    } = committedValuesRef.current;
    const {
      layout: layout2
    } = eagerValuesRef.current;
    if (!panelGroupElementRef.current) {
      return;
    }
    const handleElement = getResizeHandleElement(dragHandleId, panelGroupElementRef.current);
    assert(handleElement, `Drag handle element not found for id "${dragHandleId}"`);
    const initialCursorPosition = getResizeEventCursorPosition(direction2, event);
    setDragState({
      dragHandleId,
      dragHandleRect: handleElement.getBoundingClientRect(),
      initialCursorPosition,
      initialLayout: layout2
    });
  }, []);
  const stopDragging = reactExports.useCallback(() => {
    setDragState(null);
  }, []);
  const unregisterPanel = reactExports.useCallback((panelData) => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    const index = findPanelDataIndex(panelDataArray, panelData);
    if (index >= 0) {
      panelDataArray.splice(index, 1);
      delete panelIdToLastNotifiedSizeMapRef.current[panelData.id];
      eagerValuesRef.current.panelDataArrayChanged = true;
      forceUpdate();
    }
  }, [forceUpdate]);
  const context = reactExports.useMemo(() => ({
    collapsePanel,
    direction,
    dragState,
    expandPanel,
    getPanelSize,
    getPanelStyle,
    groupId,
    isPanelCollapsed,
    isPanelExpanded,
    reevaluatePanelConstraints,
    registerPanel,
    registerResizeHandle: registerResizeHandle2,
    resizePanel: resizePanel2,
    startDragging,
    stopDragging,
    unregisterPanel,
    panelGroupElement: panelGroupElementRef.current
  }), [collapsePanel, dragState, direction, expandPanel, getPanelSize, getPanelStyle, groupId, isPanelCollapsed, isPanelExpanded, reevaluatePanelConstraints, registerPanel, registerResizeHandle2, resizePanel2, startDragging, stopDragging, unregisterPanel]);
  const style = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    height: "100%",
    overflow: "hidden",
    width: "100%"
  };
  return reactExports.createElement(PanelGroupContext.Provider, {
    value: context
  }, reactExports.createElement(Type, {
    ...rest,
    children,
    className: classNameFromProps,
    id: idFromProps,
    ref: panelGroupElementRef,
    style: {
      ...style,
      ...styleFromProps
    },
    // CSS selectors
    [DATA_ATTRIBUTES.group]: "",
    [DATA_ATTRIBUTES.groupDirection]: direction,
    [DATA_ATTRIBUTES.groupId]: groupId
  }));
}
const PanelGroup = reactExports.forwardRef((props2, ref) => reactExports.createElement(PanelGroupWithForwardedRef, {
  ...props2,
  forwardedRef: ref
}));
PanelGroupWithForwardedRef.displayName = "PanelGroup";
PanelGroup.displayName = "forwardRef(PanelGroup)";
function findPanelDataIndex(panelDataArray, panelData) {
  return panelDataArray.findIndex((prevPanelData) => prevPanelData === panelData || prevPanelData.id === panelData.id);
}
function panelDataHelper(panelDataArray, panelData, layout) {
  const panelIndex = findPanelDataIndex(panelDataArray, panelData);
  const isLastPanel = panelIndex === panelDataArray.length - 1;
  const pivotIndices = isLastPanel ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];
  const panelSize = layout[panelIndex];
  return {
    ...panelData.constraints,
    panelSize,
    pivotIndices
  };
}
function useWindowSplitterResizeHandlerBehavior({
  disabled,
  handleId,
  resizeHandler,
  panelGroupElement
}) {
  reactExports.useEffect(() => {
    if (disabled || resizeHandler == null || panelGroupElement == null) {
      return;
    }
    const handleElement = getResizeHandleElement(handleId, panelGroupElement);
    if (handleElement == null) {
      return;
    }
    const onKeyDown = (event) => {
      if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "End":
        case "Home": {
          event.preventDefault();
          resizeHandler(event);
          break;
        }
        case "F6": {
          event.preventDefault();
          const groupId = handleElement.getAttribute(DATA_ATTRIBUTES.groupId);
          assert(groupId, `No group element found for id "${groupId}"`);
          const handles = getResizeHandleElementsForGroup(groupId, panelGroupElement);
          const index = getResizeHandleElementIndex(groupId, handleId, panelGroupElement);
          assert(index !== null, `No resize element found for id "${handleId}"`);
          const nextIndex = event.shiftKey ? index > 0 ? index - 1 : handles.length - 1 : index + 1 < handles.length ? index + 1 : 0;
          const nextHandle = handles[nextIndex];
          nextHandle.focus();
          break;
        }
      }
    };
    handleElement.addEventListener("keydown", onKeyDown);
    return () => {
      handleElement.removeEventListener("keydown", onKeyDown);
    };
  }, [panelGroupElement, disabled, handleId, resizeHandler]);
}
function PanelResizeHandle({
  children = null,
  className: classNameFromProps = "",
  disabled = false,
  hitAreaMargins,
  id: idFromProps,
  onBlur,
  onClick,
  onDragging,
  onFocus,
  onPointerDown,
  onPointerUp,
  style: styleFromProps = {},
  tabIndex = 0,
  tagName: Type = "div",
  ...rest
}) {
  var _hitAreaMargins$coars, _hitAreaMargins$fine;
  const elementRef = reactExports.useRef(null);
  const callbacksRef = reactExports.useRef({
    onClick,
    onDragging,
    onPointerDown,
    onPointerUp
  });
  reactExports.useEffect(() => {
    callbacksRef.current.onClick = onClick;
    callbacksRef.current.onDragging = onDragging;
    callbacksRef.current.onPointerDown = onPointerDown;
    callbacksRef.current.onPointerUp = onPointerUp;
  });
  const panelGroupContext = reactExports.useContext(PanelGroupContext);
  if (panelGroupContext === null) {
    throw Error(`PanelResizeHandle components must be rendered within a PanelGroup container`);
  }
  const {
    direction,
    groupId,
    registerResizeHandle: registerResizeHandleWithParentGroup,
    startDragging,
    stopDragging,
    panelGroupElement
  } = panelGroupContext;
  const resizeHandleId = useUniqueId(idFromProps);
  const [state, setState] = reactExports.useState("inactive");
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const [resizeHandler, setResizeHandler] = reactExports.useState(null);
  const committedValuesRef = reactExports.useRef({
    state
  });
  useIsomorphicLayoutEffect(() => {
    committedValuesRef.current.state = state;
  });
  reactExports.useEffect(() => {
    if (disabled) {
      setResizeHandler(null);
    } else {
      const resizeHandler2 = registerResizeHandleWithParentGroup(resizeHandleId);
      setResizeHandler(() => resizeHandler2);
    }
  }, [disabled, resizeHandleId, registerResizeHandleWithParentGroup]);
  const coarseHitAreaMargins = (_hitAreaMargins$coars = hitAreaMargins === null || hitAreaMargins === void 0 ? void 0 : hitAreaMargins.coarse) !== null && _hitAreaMargins$coars !== void 0 ? _hitAreaMargins$coars : 15;
  const fineHitAreaMargins = (_hitAreaMargins$fine = hitAreaMargins === null || hitAreaMargins === void 0 ? void 0 : hitAreaMargins.fine) !== null && _hitAreaMargins$fine !== void 0 ? _hitAreaMargins$fine : 5;
  reactExports.useEffect(() => {
    if (disabled || resizeHandler == null) {
      return;
    }
    const element = elementRef.current;
    assert(element, "Element ref not attached");
    let didMove = false;
    const setResizeHandlerState = (action, isActive, event) => {
      if (!isActive) {
        setState("inactive");
        return;
      }
      switch (action) {
        case "down": {
          setState("drag");
          didMove = false;
          assert(event, 'Expected event to be defined for "down" action');
          startDragging(resizeHandleId, event);
          const {
            onDragging: onDragging2,
            onPointerDown: onPointerDown2
          } = callbacksRef.current;
          onDragging2 === null || onDragging2 === void 0 ? void 0 : onDragging2(true);
          onPointerDown2 === null || onPointerDown2 === void 0 ? void 0 : onPointerDown2();
          break;
        }
        case "move": {
          const {
            state: state2
          } = committedValuesRef.current;
          didMove = true;
          if (state2 !== "drag") {
            setState("hover");
          }
          assert(event, 'Expected event to be defined for "move" action');
          resizeHandler(event);
          break;
        }
        case "up": {
          setState("hover");
          stopDragging();
          const {
            onClick: onClick2,
            onDragging: onDragging2,
            onPointerUp: onPointerUp2
          } = callbacksRef.current;
          onDragging2 === null || onDragging2 === void 0 ? void 0 : onDragging2(false);
          onPointerUp2 === null || onPointerUp2 === void 0 ? void 0 : onPointerUp2();
          if (!didMove) {
            onClick2 === null || onClick2 === void 0 ? void 0 : onClick2();
          }
          break;
        }
      }
    };
    return registerResizeHandle(resizeHandleId, element, direction, {
      coarse: coarseHitAreaMargins,
      fine: fineHitAreaMargins
    }, setResizeHandlerState);
  }, [coarseHitAreaMargins, direction, disabled, fineHitAreaMargins, registerResizeHandleWithParentGroup, resizeHandleId, resizeHandler, startDragging, stopDragging]);
  useWindowSplitterResizeHandlerBehavior({
    disabled,
    handleId: resizeHandleId,
    resizeHandler,
    panelGroupElement
  });
  const style = {
    touchAction: "none",
    userSelect: "none"
  };
  return reactExports.createElement(Type, {
    ...rest,
    children,
    className: classNameFromProps,
    id: idFromProps,
    onBlur: () => {
      setIsFocused(false);
      onBlur === null || onBlur === void 0 ? void 0 : onBlur();
    },
    onFocus: () => {
      setIsFocused(true);
      onFocus === null || onFocus === void 0 ? void 0 : onFocus();
    },
    ref: elementRef,
    role: "separator",
    style: {
      ...style,
      ...styleFromProps
    },
    tabIndex,
    // CSS selectors
    [DATA_ATTRIBUTES.groupDirection]: direction,
    [DATA_ATTRIBUTES.groupId]: groupId,
    [DATA_ATTRIBUTES.resizeHandle]: "",
    [DATA_ATTRIBUTES.resizeHandleActive]: state === "drag" ? "pointer" : isFocused ? "keyboard" : void 0,
    [DATA_ATTRIBUTES.resizeHandleEnabled]: !disabled,
    [DATA_ATTRIBUTES.resizeHandleId]: resizeHandleId,
    [DATA_ATTRIBUTES.resizeHandleState]: state
  });
}
PanelResizeHandle.displayName = "PanelResizeHandle";
function ResizablePanelGroup({
  className,
  ...props2
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PanelGroup,
    {
      "data-slot": "resizable-panel-group",
      className: cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      ),
      ...props2
    }
  );
}
function ResizablePanel({
  ...props2
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { "data-slot": "resizable-panel", ...props2 });
}
function ResizableHandle({
  withHandle,
  className,
  ...props2
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props2,
      children: withHandle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "size-2.5" }) })
    }
  );
}
function sourceEvent(event) {
  let sourceEvent2;
  while (sourceEvent2 = event.sourceEvent) event = sourceEvent2;
  return event;
}
function pointer(event, node) {
  event = sourceEvent(event);
  if (node === void 0) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}
const nonpassivecapture = { capture: true, passive: false };
function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function dragDisable(view) {
  var root = view.document.documentElement, selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent$1, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root = view.document.documentElement, selection = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent$1, nonpassivecapture);
    setTimeout(function() {
      selection.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}
const constant = (x) => () => x;
function ZoomEvent(type, {
  sourceEvent: sourceEvent2,
  target,
  transform,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent2, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
function nopropagation(event) {
  event.stopImmediatePropagation();
}
function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom() {
  var filter = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = interpolateZoom, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom2(selection) {
    selection.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom2.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform).end();
      });
    }
  };
  zoom2.scaleBy = function(selection, k, p, event) {
    zoom2.scaleTo(selection, function() {
      var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };
  zoom2.scaleTo = function(selection, k, p, event) {
    zoom2.transform(selection, function() {
      var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };
  zoom2.translateBy = function(selection, x, y, event) {
    zoom2.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom2.translateTo = function(selection, x, y, p, event) {
    zoom2.transform(selection, function() {
      var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };
  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }
  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }
  function centroid(extent2) {
    return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
  }
  function schedule(transition, transform, point, event) {
    transition.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform === "function" ? transform.apply(that, args) : transform, i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
      return function(t) {
        if (t === 1) t = b;
        else {
          var l = i(t), k = w / l[2];
          t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer(event);
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    } else if (t.k === k) return;
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }
    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();
    function mousemoved(event2) {
      noevent(event2);
      if (!g.moved) {
        var dx = event2.clientX - x0, dy = event2.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped(event2) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g.moved);
      noevent(event2);
      g.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom, p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    noevent(event);
    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
    else select(this).call(zoom2.transform, t1, p0, event);
  }
  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
        touchstarting = null;
      }, touchDelay);
      interrupt(this);
      g.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }
  zoom2.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom2) : wheelDelta;
  };
  zoom2.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom2) : filter;
  };
  zoom2.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom2) : touchable;
  };
  zoom2.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom2) : extent;
  };
  zoom2.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom2) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom2.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom2) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom2.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom2) : constrain;
  };
  zoom2.duration = function(_) {
    return arguments.length ? (duration = +_, zoom2) : duration;
  };
  zoom2.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom2) : interpolate;
  };
  zoom2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom2 : value;
  };
  zoom2.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom2) : Math.sqrt(clickDistance2);
  };
  zoom2.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom2) : tapDistance;
  };
  return zoom2;
}
const DECAY_COLORS = {
  alpha: "#fbbf24",
  "beta-": "#60a5fa",
  "beta+": "#f87171",
  gamma: "#c084fc",
  ec: "#34d399",
  stable: "#6b7280",
  other: "#22d3ee"
};
const HALF_LIFE_LEGEND = [
  { label: "< 1 s", color: "#f87171" },
  { label: "Seconds", color: "#fb923c" },
  { label: "Minutes", color: "#fbbf24" },
  { label: "Hours", color: "#facc15" },
  { label: "Days", color: "#4ade80" },
  { label: "Years", color: "#22d3ee" },
  { label: "Myr+", color: "#a78bfa" },
  { label: "Stable", color: "#6b7280" }
];
function halfLifeColor(s) {
  if (!Number.isFinite(s)) return "#6b7280";
  if (s < 1) return "#f87171";
  if (s < 60) return "#fb923c";
  if (s < 3600) return "#fbbf24";
  if (s < 86400) return "#facc15";
  if (s < 31536e3) return "#4ade80";
  if (s < 3156e6) return "#22d3ee";
  return "#a78bfa";
}
const ra226StandaloneSteps = [
  {
    nuclide: "Ra-226",
    Z: 88,
    N: 138,
    A: 226,
    decayMode: "alpha",
    daughter: "Rn-222",
    halfLifeStr: "1600 yr",
    halfLifeSeconds: 505e8,
    Qvalue_MeV: 4.87,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 1
  },
  {
    nuclide: "Rn-222",
    Z: 86,
    N: 136,
    A: 222,
    decayMode: "alpha",
    daughter: "Po-218",
    halfLifeStr: "3.82 d",
    halfLifeSeconds: 330393,
    Qvalue_MeV: 5.49,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 2
  },
  {
    nuclide: "Po-218",
    Z: 84,
    N: 134,
    A: 218,
    decayMode: "alpha",
    daughter: "Pb-214",
    halfLifeStr: "3.05 min",
    halfLifeSeconds: 183,
    Qvalue_MeV: 6,
    branchingPercent: 99.98,
    particleEmitted: "⁴He (α)",
    stepIndex: 3
  },
  {
    nuclide: "Pb-214",
    Z: 82,
    N: 132,
    A: 214,
    decayMode: "beta-",
    daughter: "Bi-214",
    halfLifeStr: "19.7 min",
    halfLifeSeconds: 1182,
    Qvalue_MeV: 1.02,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 4
  },
  {
    nuclide: "Bi-214",
    Z: 83,
    N: 131,
    A: 214,
    decayMode: "beta-",
    daughter: "Po-214",
    halfLifeStr: "26.8 min",
    halfLifeSeconds: 1608,
    Qvalue_MeV: 3.27,
    branchingPercent: 99.98,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 5
  },
  {
    nuclide: "Po-214",
    Z: 84,
    N: 130,
    A: 214,
    decayMode: "alpha",
    daughter: "Pb-210",
    halfLifeStr: "164 μs",
    halfLifeSeconds: 164e-6,
    Qvalue_MeV: 7.69,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 6
  },
  {
    nuclide: "Pb-210",
    Z: 82,
    N: 128,
    A: 210,
    decayMode: "beta-",
    daughter: "Bi-210",
    halfLifeStr: "22.3 yr",
    halfLifeSeconds: 704e6,
    Qvalue_MeV: 0.064,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 7
  },
  {
    nuclide: "Bi-210",
    Z: 83,
    N: 127,
    A: 210,
    decayMode: "beta-",
    daughter: "Po-210",
    halfLifeStr: "5.01 d",
    halfLifeSeconds: 432864,
    Qvalue_MeV: 1.163,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻)",
    stepIndex: 8
  },
  {
    nuclide: "Po-210",
    Z: 84,
    N: 126,
    A: 210,
    decayMode: "alpha",
    daughter: "Pb-206",
    halfLifeStr: "138.4 d",
    halfLifeSeconds: 11957760,
    Qvalue_MeV: 5.41,
    branchingPercent: 100,
    particleEmitted: "⁴He (α)",
    stepIndex: 9
  },
  {
    nuclide: "Pb-206",
    Z: 82,
    N: 124,
    A: 206,
    decayMode: "stable",
    daughter: "—",
    halfLifeStr: "Stable",
    halfLifeSeconds: Number.POSITIVE_INFINITY,
    Qvalue_MeV: 0,
    branchingPercent: 100,
    particleEmitted: "None (stable)",
    stepIndex: 10
  }
];
const c14Steps = [
  {
    nuclide: "C-14",
    Z: 6,
    N: 8,
    A: 14,
    decayMode: "beta-",
    daughter: "N-14",
    halfLifeStr: "5730 yr",
    halfLifeSeconds: 1808e8,
    Qvalue_MeV: 0.156,
    branchingPercent: 100,
    particleEmitted: "e⁻ (β⁻) + ν̄ₑ",
    stepIndex: 1
  },
  {
    nuclide: "N-14",
    Z: 7,
    N: 7,
    A: 14,
    decayMode: "stable",
    daughter: "—",
    halfLifeStr: "Stable",
    halfLifeSeconds: Number.POSITIVE_INFINITY,
    Qvalue_MeV: 0,
    branchingPercent: 100,
    particleEmitted: "None (stable)",
    stepIndex: 2
  }
];
const k40Steps = [
  {
    nuclide: "K-40",
    Z: 19,
    N: 21,
    A: 40,
    decayMode: "beta-",
    daughter: "Ca-40",
    halfLifeStr: "1.248×10⁹ yr",
    halfLifeSeconds: 394e14,
    Qvalue_MeV: 1.311,
    branchingPercent: 89.28,
    particleEmitted: "e⁻ (β⁻) + ν̄ₑ",
    stepIndex: 1
  },
  {
    nuclide: "K-40 (EC)",
    Z: 19,
    N: 21,
    A: 40,
    decayMode: "ec",
    daughter: "Ar-40",
    halfLifeStr: "1.248×10⁹ yr",
    halfLifeSeconds: 394e14,
    Qvalue_MeV: 1.504,
    branchingPercent: 10.72,
    particleEmitted: "ν̄ₑ (EC)",
    stepIndex: 2
  },
  {
    nuclide: "Ca-40",
    Z: 20,
    N: 20,
    A: 40,
    decayMode: "stable",
    daughter: "—",
    halfLifeStr: "Stable",
    halfLifeSeconds: Number.POSITIVE_INFINITY,
    Qvalue_MeV: 0,
    branchingPercent: 100,
    particleEmitted: "None (stable)",
    stepIndex: 3
  }
];
const EXTRA_CHAINS = [
  {
    id: "ra226s",
    label: "Ra-226 → Pb-206 (standalone)",
    parent: "Ra-226",
    product: "Pb-206",
    steps: ra226StandaloneSteps
  },
  {
    id: "c14",
    label: "C-14 → N-14 (Carbon-14)",
    parent: "C-14",
    product: "N-14",
    steps: c14Steps
  },
  {
    id: "k40",
    label: "K-40 → Ca-40/Ar-40",
    parent: "K-40",
    product: "Ca-40/Ar-40",
    steps: k40Steps
  }
];
const ALL_AVAILABLE_CHAINS = [...ALL_CHAINS, ...EXTRA_CHAINS];
const GAMMA_PEAKS = {
  u238: [
    { nuclide: "Pa-234m", energy_keV: 1001, intensity: 100 },
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Pb-214", energy_keV: 295, intensity: 19 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 },
    { nuclide: "Bi-214", energy_keV: 1120, intensity: 15 },
    { nuclide: "Bi-214", energy_keV: 1764, intensity: 15 },
    { nuclide: "Bi-214", energy_keV: 2204, intensity: 5 }
  ],
  th232: [
    { nuclide: "Ac-228", energy_keV: 911, intensity: 26 },
    { nuclide: "Ac-228", energy_keV: 969, intensity: 17 },
    { nuclide: "Tl-208", energy_keV: 2614, intensity: 100 },
    { nuclide: "Bi-212", energy_keV: 727, intensity: 7 },
    { nuclide: "Pb-212", energy_keV: 238, intensity: 43 },
    { nuclide: "Tl-208", energy_keV: 583, intensity: 84 }
  ],
  ra226: [
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Pb-214", energy_keV: 295, intensity: 19 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 },
    { nuclide: "Bi-214", energy_keV: 1764, intensity: 15 }
  ],
  ra226s: [
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 }
  ]
};
function batemanActivity(chain, tSeconds) {
  const members = chain.filter(
    (s) => s.decayMode !== "stable" && Number.isFinite(s.halfLifeSeconds)
  );
  if (members.length === 0) return [];
  const lambdas = members.map((s) => Math.LN2 / s.halfLifeSeconds);
  const n = Math.min(members.length, 8);
  const A = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const li = lambdas[i];
    if (i === 0) {
      A[i] = Math.exp(-li * tSeconds);
    } else {
      let sum = 0;
      for (let k = 0; k <= i; k++) {
        let denom = 1;
        for (let j = 0; j <= i; j++) {
          if (j !== k) denom *= lambdas[j] - lambdas[k];
        }
        if (Math.abs(denom) < 1e-40) continue;
        sum += Math.exp(-lambdas[k] * tSeconds) / denom;
      }
      let lprod = 1;
      for (let j = 0; j < i; j++) lprod *= lambdas[j];
      A[i] = lprod * sum;
    }
  }
  return A;
}
function buildActivityData(chain, numPoints = 80) {
  const members = chain.filter(
    (s) => s.decayMode !== "stable" && Number.isFinite(s.halfLifeSeconds)
  );
  if (members.length === 0) return [];
  const parentHL = members[0].halfLifeSeconds;
  const tMin = parentHL * 1e-4;
  const tMax = parentHL * 5;
  const data = [];
  for (let i = 0; i <= numPoints; i++) {
    const tFrac = i / numPoints;
    const tSec = tMin * (tMax / tMin) ** tFrac;
    const activities = batemanActivity(chain, tSec);
    const row = { t: tSec };
    members.forEach((m, idx) => {
      if (idx < activities.length) {
        const v = Math.max(0, activities[idx]);
        row[m.nuclide] = Number.isFinite(v) ? Number(v.toFixed(6)) : 0;
      }
    });
    data.push(row);
  }
  return data;
}
function formatTime(seconds) {
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} h`;
  if (seconds < 31536e3) return `${(seconds / 86400).toFixed(1)} d`;
  if (seconds < 3156e6) return `${(seconds / 31536e3).toFixed(1)} yr`;
  return `${(seconds / 3156e6).toFixed(2)} Gyr`;
}
function downloadCSV(chain) {
  const header = "Step,Nuclide,Z,N,A,Decay Mode,Daughter,Half-life,Q-value (MeV),Branching (%),Particle\n";
  const rows = chain.steps.map(
    (s) => `${s.stepIndex},${s.nuclide},${s.Z},${s.N},${s.A},${s.decayMode},${s.daughter},"${s.halfLifeStr}",${s.Qvalue_MeV},${s.branchingPercent},"${s.particleEmitted}"`
  ).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${chain.label.replace(/[^a-z0-9]/gi, "_")}_decay_chain.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
const NW = 90;
const NH = 56;
const HX = 160;
const MY = 48;
const MX = 24;
function DecayTree({
  chainDef,
  activeStep,
  onStepSelect
}) {
  const svgRef = reactExports.useRef(null);
  const wrapRef = reactExports.useRef(null);
  const [particles, setParticles] = reactExports.useState([]);
  const particleId = reactExports.useRef(0);
  const animRef = reactExports.useRef(0);
  const chain = chainDef.steps;
  const svgW = chain.length * HX + MX * 2 + NW;
  const svgH = NH + MY * 2 + 32;
  const cy = MY + NH / 2;
  reactExports.useEffect(() => {
    const step = chain[activeStep];
    if (!step || step.decayMode === "stable") return;
    const x1 = MX + activeStep * HX + NW;
    const x2 = MX + (activeStep + 1) * HX;
    const now2 = performance.now();
    const mode = step.decayMode;
    const newParticles = [];
    if (mode === "alpha") {
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy - 6,
        x2,
        y2: cy - 6,
        mode,
        born: now2
      });
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy + 6,
        x2,
        y2: cy + 6,
        mode,
        born: now2
      });
    } else {
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy,
        x2,
        y2: cy,
        mode,
        born: now2
      });
    }
    setParticles((p) => [...p, ...newParticles]);
  }, [activeStep, chain, cy]);
  reactExports.useEffect(() => {
    let running = true;
    const DURATION2 = 800;
    function loop() {
      if (!running) return;
      const now2 = performance.now();
      setParticles((prev) => prev.filter((p) => now2 - p.born < DURATION2));
      animRef.current = requestAnimationFrame(loop);
    }
    animRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!svgRef.current || !wrapRef.current) return;
    const svg = select(svgRef.current);
    const wrap = select(wrapRef.current);
    const zoomBehavior = zoom().scaleExtent([0.25, 3]).on("zoom", (event) => {
      wrap.attr("transform", event.transform.toString());
    });
    svg.call(zoomBehavior);
    return () => {
      svg.on(".zoom", null);
    };
  }, []);
  const resetZoom = () => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);
    svg.transition().duration(400).call(zoom().transform, identity);
  };
  const now = performance.now();
  const DURATION = 800;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-0 gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "ghost",
        className: "h-7 px-2 text-xs gap-1",
        onClick: resetZoom,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
          " Reset Zoom"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 min-h-0 overflow-hidden rounded-xl border border-border bg-card relative",
        style: { minHeight: 160 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            ref: svgRef,
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${svgW} ${svgH}`,
            preserveAspectRatio: "xMidYMid meet",
            role: "img",
            "aria-label": `${chainDef.label} decay chain`,
            style: { display: "block", cursor: "grab" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
                chainDef.label,
                " Decay Chain"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { ref: wrapRef, children: [
                chain.map((step, i) => {
                  if (step.decayMode === "stable") return null;
                  const x1 = MX + i * HX + NW;
                  const x2 = MX + (i + 1) * HX;
                  const color = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
                  const isAct = i === activeStep;
                  const midX = (x1 + x2) / 2;
                  const label = step.decayMode === "beta-" ? "β⁻" : step.decayMode === "beta+" ? "β⁺" : step.decayMode === "alpha" ? "α" : step.decayMode === "ec" ? "ε" : step.decayMode;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { opacity: isAct ? 1 : 0.35, children: [
                    isAct && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1,
                        y1: cy,
                        x2: x2 - 10,
                        y2: cy,
                        stroke: color,
                        strokeWidth: 10,
                        opacity: 0.15
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1,
                        y1: cy,
                        x2: x2 - 10,
                        y2: cy,
                        stroke: color,
                        strokeWidth: isAct ? 2.5 : 1.5
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "polygon",
                      {
                        points: `${x2 - 10},${cy - 5} ${x2},${cy} ${x2 - 10},${cy + 5}`,
                        fill: color
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: midX - 16,
                        y: cy - 30,
                        width: 32,
                        height: 18,
                        rx: 9,
                        fill: `${color}22`,
                        stroke: `${color}55`,
                        strokeWidth: 0.8
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: midX,
                        y: cy - 17,
                        textAnchor: "middle",
                        fill: color,
                        fontSize: "10",
                        fontFamily: "monospace",
                        fontWeight: isAct ? "bold" : "normal",
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: midX,
                        y: cy + 28,
                        textAnchor: "middle",
                        fill: isAct ? "#d1d5db" : "#6b7280",
                        fontSize: "7.5",
                        fontFamily: "monospace",
                        children: step.halfLifeStr
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "text",
                      {
                        x: midX,
                        y: cy + 38,
                        textAnchor: "middle",
                        fill: isAct ? color : "#4b5563",
                        fontSize: "7",
                        fontFamily: "monospace",
                        children: [
                          step.Qvalue_MeV,
                          " MeV"
                        ]
                      }
                    )
                  ] }, `edge-${step.nuclide}`);
                }),
                particles.map((p) => {
                  const elapsed = now - p.born;
                  const progress = Math.min(elapsed / DURATION, 1);
                  const travelProgress = Math.min(progress / 0.3, 1);
                  const cx2 = p.x1 + (p.x2 - p.x1) * 0.3 * travelProgress;
                  const opacity = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;
                  const color = p.mode === "alpha" ? "#fbbf24" : p.mode === "beta-" ? "#60a5fa" : p.mode === "beta+" ? "#f87171" : "#c084fc";
                  const r = p.mode === "alpha" ? 5 : 3;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: cx2,
                      cy: p.y1,
                      r,
                      fill: color,
                      opacity,
                      style: { filter: `drop-shadow(0 0 ${r + 2}px ${color})` }
                    },
                    p.id
                  );
                }),
                chain.map((step, i) => {
                  const nx = MX + i * HX;
                  const ny = MY;
                  const isAct = i === activeStep;
                  const isStable = step.decayMode === "stable";
                  const modeColor = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
                  const hlColor = halfLifeColor(step.halfLifeSeconds);
                  const handleClick = () => onStepSelect(i);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "g",
                    {
                      "data-ocid": `decay-chain.node.${i + 1}`,
                      style: { cursor: "pointer" },
                      onClick: handleClick,
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") handleClick();
                      },
                      children: [
                        isAct && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: nx - 4,
                            y: ny - 4,
                            width: NW + 8,
                            height: NH + 8,
                            rx: 12,
                            fill: `${modeColor}15`,
                            stroke: modeColor,
                            strokeWidth: 1.5,
                            style: { filter: `drop-shadow(0 0 8px ${modeColor})` }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: nx,
                            y: ny + NH - 5,
                            width: NW,
                            height: 5,
                            rx: 3,
                            fill: isStable ? "#6b7280" : hlColor,
                            opacity: 0.8
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "rect",
                          {
                            x: nx,
                            y: ny,
                            width: NW,
                            height: NH,
                            rx: 8,
                            fill: isAct ? `${modeColor}22` : "#131b2a",
                            stroke: isAct ? modeColor : "#1e2d45",
                            strokeWidth: isAct ? 2 : 1,
                            tabIndex: 0,
                            role: "button",
                            "aria-label": `${step.nuclide}, step ${i + 1}`,
                            onKeyDown: (e) => {
                              if (e.key === "Enter" || e.key === " ") handleClick();
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: nx + NW / 2,
                            y: ny + 22,
                            textAnchor: "middle",
                            fill: isAct ? modeColor : "#e5e7eb",
                            fontSize: "13",
                            fontWeight: "bold",
                            fontFamily: "monospace",
                            pointerEvents: "none",
                            children: step.nuclide
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            x: nx + NW / 2,
                            y: ny + 37,
                            textAnchor: "middle",
                            fill: isStable ? "#4ade80" : isAct ? "#9ca3af" : "#4b5563",
                            fontSize: "9",
                            fontFamily: "monospace",
                            fontWeight: isStable ? "bold" : "normal",
                            pointerEvents: "none",
                            children: isStable ? "STABLE" : `Z${step.Z} A${step.A}`
                          }
                        )
                      ]
                    },
                    `node-${step.nuclide}-${step.stepIndex}`
                  );
                })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-lg border border-border/60 bg-card/50 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "px-3 py-2 cursor-pointer font-semibold text-muted-foreground select-none hover:text-foreground", children: [
        "Accessible Table (",
        chain.length,
        " steps)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-left",
          "aria-label": `${chainDef.label} decay chain`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border text-muted-foreground", children: [
              "#",
              "Nuclide",
              "Mode",
              "Daughter",
              "t½",
              "Q (MeV)",
              "Branch%"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-1 pr-3 font-semibold", children: h }, h)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: chain.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border/30 hover:bg-muted/20",
                "data-ocid": `decay-chain.table_row.${step.stepIndex}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono", children: step.stepIndex }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono font-bold", children: step.nuclide }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "py-1 pr-3 font-mono",
                      style: { color: DECAY_COLORS[step.decayMode] },
                      children: step.decayMode
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono", children: step.daughter }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono", children: step.halfLifeStr }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1 pr-3 font-mono", children: step.Qvalue_MeV }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-1 font-mono", children: [
                    step.branchingPercent,
                    "%"
                  ] })
                ]
              },
              step.stepIndex
            )) })
          ]
        }
      ) })
    ] })
  ] });
}
const LINE_PALETTE = [
  "#fbbf24",
  "#60a5fa",
  "#f87171",
  "#4ade80",
  "#c084fc",
  "#22d3ee",
  "#fb923c",
  "#a78bfa"
];
function ActivityTab({ chain }) {
  const members = chain.filter(
    (s) => s.decayMode !== "stable" && Number.isFinite(s.halfLifeSeconds)
  );
  const data = buildActivityData(chain, 80);
  if (members.length === 0 || data.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground p-4", children: "No radioactive members in this chain." });
  const xFormatter = (v) => formatTime(v);
  const tooltipFormatter = (value) => value.toFixed(4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-3 h-full min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Activity Over Time — Secular Equilibrium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Bateman equation for linear decay chains. Y-axis normalized to parent initial activity = 1.0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      LineChart,
      {
        data,
        margin: { top: 8, right: 12, left: 0, bottom: 24 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1a2535" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "t",
              scale: "log",
              type: "number",
              domain: ["auto", "auto"],
              tickFormatter: xFormatter,
              tick: { fontSize: 9, fill: "#6b7280", fontFamily: "monospace" },
              label: {
                value: "Time (log scale)",
                position: "insideBottom",
                offset: -12,
                fill: "#6b7280",
                fontSize: 10
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 9, fill: "#6b7280" },
              label: {
                value: "Relative Activity",
                angle: -90,
                position: "insideLeft",
                offset: 12,
                fill: "#6b7280",
                fontSize: 10
              },
              domain: [0, 1.2]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceLine,
            {
              y: 1,
              stroke: "#6b7280",
              strokeDasharray: "4 4",
              label: { value: "Equilibrium", fill: "#6b7280", fontSize: 9 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "#0d1520",
                border: "1px solid #1e2d45",
                borderRadius: 8,
                fontSize: 11
              },
              labelStyle: { color: "#9ca3af" },
              labelFormatter: (v) => `t = ${formatTime(v)}`,
              formatter: (value, name) => [
                tooltipFormatter(value),
                name
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 10, paddingTop: 8 } }),
          members.slice(0, 8).map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: m.nuclide,
              stroke: LINE_PALETTE[i % LINE_PALETTE.length],
              strokeWidth: 1.8,
              dot: false
            },
            m.nuclide
          ))
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground border-t border-border pt-2", children: "Secular equilibrium occurs when t½(parent) ≫ t½(daughter). Source: Bateman (1910); Faure & Mensing (2005)." })
  ] });
}
function MassDefectTab({ chain }) {
  const M_ALPHA = 4.002602;
  const M_ELECTRON = 549e-6;
  const U_TO_MEV = 931.494;
  const rows = chain.filter((s) => s.decayMode !== "stable").map((s) => {
    let mEmitted = 0;
    if (s.decayMode === "alpha") mEmitted = M_ALPHA;
    else if (s.decayMode === "beta-") mEmitted = M_ELECTRON;
    else if (s.decayMode === "beta+" || s.decayMode === "ec")
      mEmitted = M_ELECTRON;
    const massDefect = s.Qvalue_MeV / U_TO_MEV;
    const beChange = massDefect * U_TO_MEV;
    return {
      step: s.stepIndex,
      parent: s.nuclide,
      daughter: s.daughter,
      mode: s.decayMode,
      massDefect: massDefect.toFixed(6),
      Q: s.Qvalue_MeV,
      beChange: beChange.toFixed(3),
      mEmitted
    };
  });
  const barData = rows.map((r) => ({ name: r.parent, Q: r.Q, mode: r.mode }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-3 h-full min-h-0 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Mass Defect & Q-Values per Step" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Step",
        "Parent",
        "Daughter",
        "Mode",
        "Δm (u)",
        "Q (MeV)",
        "ΔBE (MeV)"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-2 py-1.5 text-left font-semibold text-muted-foreground",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-t border-border/40 hover:bg-muted/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono", children: r.step }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono font-bold", children: r.parent }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono", children: r.daughter }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: "px-2 py-1 font-mono",
                style: { color: DECAY_COLORS[r.mode] },
                children: r.mode
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono", children: r.massDefect }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono text-primary", children: r.Q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono", children: r.beChange })
          ]
        },
        r.step
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono bg-muted/20 p-2 rounded border border-border", children: "Δm = M(parent) − M(daughter) − m(emitted)  |  Q = Δm × 931.494 MeV/u  |  M(⁴He) = 4.002602 u" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data: barData,
        layout: "vertical",
        margin: { top: 4, right: 16, left: 60, bottom: 4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "#1a2535",
              horizontal: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              type: "number",
              tick: { fontSize: 9, fill: "#6b7280" },
              label: {
                value: "Q (MeV)",
                position: "insideBottom",
                fill: "#6b7280",
                fontSize: 10
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              dataKey: "name",
              type: "category",
              tick: { fontSize: 9, fill: "#9ca3af", fontFamily: "monospace" },
              width: 56
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "#0d1520",
                border: "1px solid #1e2d45",
                borderRadius: 8,
                fontSize: 11
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Q", radius: [0, 3, 3, 0], barSize: 10, children: barData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cell,
            {
              fill: DECAY_COLORS[entry.mode] ?? DECAY_COLORS.other,
              opacity: 0.85
            },
            `m-${entry.name}`
          )) })
        ]
      }
    ) })
  ] });
}
function GammaTab({ chainId }) {
  const peaks = GAMMA_PEAKS[chainId];
  const [marker, setMarker] = reactExports.useState(null);
  if (!peaks) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "Detailed gamma spectroscopy data is available for the U-238 and Th-232 series." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Source: NNDC/ENSDF. Relative intensities normalized to strongest peak." })
    ] });
  }
  const sorted = [...peaks].sort((a, b) => a.energy_keV - b.energy_keV);
  const chartData = sorted.map((p) => ({
    energy: p.energy_keV,
    intensity: p.intensity,
    label: `${p.nuclide} ${p.energy_keV}keV`
  }));
  const maxEnergy = Math.max(...sorted.map((p) => p.energy_keV));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-3 h-full min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Gamma-Ray Spectroscopy Peaks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click chart to place energy marker. Source: NNDC/ENSDF" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data: chartData,
        margin: { top: 8, right: 16, left: 0, bottom: 32 },
        onClick: (state) => {
          var _a;
          if ((_a = state == null ? void 0 : state.activePayload) == null ? void 0 : _a[0]) {
            setMarker(state.activePayload[0].payload.energy);
          }
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1a2535" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "energy",
              type: "number",
              domain: [0, maxEnergy + 200],
              tick: { fontSize: 9, fill: "#6b7280" },
              label: {
                value: "Energy (keV)",
                position: "insideBottom",
                offset: -14,
                fill: "#6b7280",
                fontSize: 10
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 9, fill: "#6b7280" },
              label: {
                value: "Intensity (%)",
                angle: -90,
                position: "insideLeft",
                offset: 8,
                fill: "#6b7280",
                fontSize: 10
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "#0d1520",
                border: "1px solid #1e2d45",
                borderRadius: 8,
                fontSize: 11
              },
              formatter: (value, _, entry) => {
                var _a;
                return [`${value}%`, ((_a = entry == null ? void 0 : entry.payload) == null ? void 0 : _a.label) ?? ""];
              }
            }
          ),
          marker !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceLine,
            {
              x: marker,
              stroke: "#22d3ee",
              strokeDasharray: "4 4",
              label: { value: `${marker} keV`, fill: "#22d3ee", fontSize: 9 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "intensity",
              fill: "#c084fc",
              barSize: 3,
              radius: [2, 2, 0, 0],
              opacity: 0.9
            }
          )
        ]
      }
    ) }),
    marker !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-mono", children: [
      "Marker: ",
      marker,
      " keV  ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "underline text-muted-foreground",
          onClick: () => setMarker(null),
          children: "clear"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground border-t border-border pt-2", children: "Gamma spectroscopy peaks from NNDC/ENSDF. Relative intensities normalized to strongest peak." })
  ] });
}
function SummaryTab({ chainDef }) {
  const chain = chainDef.steps;
  const decaySteps = chain.filter((s) => s.decayMode !== "stable");
  const alphaCount = decaySteps.filter((s) => s.decayMode === "alpha").length;
  const betaCount = decaySteps.filter(
    (s) => s.decayMode === "beta-" || s.decayMode === "beta+"
  ).length;
  const totalQ = decaySteps.reduce((a, s) => a + s.Qvalue_MeV, 0);
  const alphaTotalQ = decaySteps.filter((s) => s.decayMode === "alpha").reduce((a, s) => a + s.Qvalue_MeV, 0);
  const betaTotalQ = decaySteps.filter((s) => s.decayMode === "beta-" || s.decayMode === "beta+").reduce((a, s) => a + s.Qvalue_MeV, 0);
  const stableEnd = chain.find((s) => s.decayMode === "stable");
  const slowest = decaySteps.reduce(
    (a, s) => s.halfLifeSeconds > a.halfLifeSeconds ? s : a,
    decaySteps[0]
  );
  const parent = chain[0];
  const chainTypeMap = {
    0: "4n (Thorium)",
    1: "4n+1 (Neptunium)",
    2: "4n+2 (Uranium)",
    3: "4n+3 (Actinium)"
  };
  const chainType = parent ? chainTypeMap[parent.A % 4] ?? "—" : "—";
  const radarData = [
    { subject: "Alpha Q", value: alphaTotalQ },
    { subject: "Beta Q", value: betaTotalQ },
    { subject: "Alpha Steps", value: alphaCount * 2 },
    { subject: "Beta Steps", value: betaCount * 2 },
    { subject: "Total Q/10", value: totalQ / 10 }
  ];
  const stats = [
    { label: "Decay steps", value: decaySteps.length },
    { label: "Alpha decays", value: alphaCount },
    { label: "Beta decays", value: betaCount },
    { label: "Total Q-value", value: `${totalQ.toFixed(2)} MeV` },
    { label: "Final stable", value: (stableEnd == null ? void 0 : stableEnd.nuclide) ?? "—" },
    { label: "Chain type", value: chainType },
    {
      label: "Slowest step",
      value: slowest ? `${slowest.nuclide} (${slowest.halfLifeStr})` : "—"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-3 h-full min-h-0 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Chain Summary Statistics" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg bg-muted/20 border border-border/50 p-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-bold text-foreground", children: s.value })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      RadarChart,
      {
        data: radarData,
        margin: { top: 8, right: 16, bottom: 8, left: 16 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "#1e2d45" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PolarAngleAxis,
            {
              dataKey: "subject",
              tick: { fill: "#6b7280", fontSize: 9 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radar,
            {
              name: "Chain",
              dataKey: "value",
              stroke: "#60a5fa",
              fill: "#60a5fa",
              fillOpacity: 0.3
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "self-start",
        onClick: () => downloadCSV(chainDef),
        "data-ocid": "decay-chain.csv_download_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5 mr-1.5" }),
          "Export All Data (CSV)"
        ]
      }
    )
  ] });
}
const TABS = ["Activity", "Mass Defect", "Gamma", "Summary"];
function DecayChainExplorer() {
  const [selectedChainId, setSelectedChainId] = reactExports.useState("u238");
  const [activeStep, setActiveStep] = reactExports.useState(0);
  const [activeTab, setActiveTab] = reactExports.useState("Activity");
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [speed, setSpeed] = reactExports.useState(1);
  const intervalRef = reactExports.useRef(null);
  const chainDef = ALL_AVAILABLE_CHAINS.find((c) => c.id === selectedChainId) ?? ALL_AVAILABLE_CHAINS[0];
  const chain = chainDef.steps;
  const chainLen = chain.length;
  const prevChainId = reactExports.useRef(selectedChainId);
  if (prevChainId.current !== selectedChainId) {
    prevChainId.current = selectedChainId;
    setActiveStep(0);
    setIsPlaying(false);
  }
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") setActiveStep((s) => Math.max(0, s - 1));
      if (e.key === "ArrowRight")
        setActiveStep((s) => Math.min(chainLen - 1, s + 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [chainLen]);
  reactExports.useEffect(() => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (!isPlaying) return;
    const delay = 2e3 / speed;
    intervalRef.current = setTimeout(() => {
      setActiveStep((s) => {
        const next = s + 1;
        if (next >= chainLen) {
          setIsPlaying(false);
          return s;
        }
        return next;
      });
    }, delay);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPlaying, speed, chainLen]);
  const togglePlay = () => {
    if (activeStep >= chain.length - 1) {
      setActiveStep(0);
      setIsPlaying(true);
    } else setIsPlaying((p) => !p);
  };
  const currentStep = chain[activeStep] ?? chain[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-screen min-h-0 bg-background",
      "data-ocid": "decay-chain.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-4 py-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/20 text-primary border-primary/30 text-xs", children: "Simulator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "D3 · Recharts · Bateman" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Decay Chain Explorer & Simulator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5 max-w-2xl", children: "Split-pane research dashboard with animated decay trees, secular equilibrium curves, gamma spectroscopy, and mass defect analysis." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/80 px-4 py-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mr-1 font-semibold", children: "Chain:" }),
          ALL_AVAILABLE_CHAINS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedChainId(c.id),
              "data-ocid": `decay-chain.chain_selector.${c.id}`,
              "aria-pressed": selectedChainId === c.id,
              className: `rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${selectedChainId === c.id ? "border-primary bg-primary/15 text-primary shadow-sm" : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
              children: c.label
            },
            c.id
          ))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-muted/20 px-4 py-2 shrink-0 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: isPlaying ? "secondary" : "default",
                className: "h-8 px-3 gap-1.5 text-xs",
                onClick: togglePlay,
                "data-ocid": "decay-chain.play_button",
                "aria-label": isPlaying ? "Pause simulation" : "Play simulation",
                children: [
                  isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }),
                  isPlaying ? "Pause" : "Play"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 px-2 text-xs gap-1",
                onClick: () => {
                  setIsPlaying(false);
                  setActiveStep(0);
                },
                "data-ocid": "decay-chain.reset_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
                  " Reset"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Speed:" }),
            [0.5, 1, 2].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSpeed(s),
                "data-ocid": `decay-chain.speed_${s}x`,
                className: `rounded px-2 py-0.5 text-xs font-mono transition-colors ${speed === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
                children: [
                  s,
                  "x"
                ]
              },
              s
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 px-2 text-xs gap-1",
                onClick: () => setActiveStep((s) => Math.max(0, s - 1)),
                disabled: activeStep === 0,
                "data-ocid": "decay-chain.step_back_button",
                "aria-label": "Previous step",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
                  " Prev"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground min-w-[64px] text-center", children: [
              "Step ",
              activeStep + 1,
              " / ",
              chain.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 px-2 text-xs gap-1",
                onClick: () => setActiveStep((s) => Math.min(chain.length - 1, s + 1)),
                disabled: activeStep === chain.length - 1,
                "data-ocid": "decay-chain.step_forward_button",
                "aria-label": "Next step",
                children: [
                  "Next ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-1.5 ml-2 rounded-full border border-border bg-card px-3 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-2 w-2 rounded-full",
                style: {
                  background: DECAY_COLORS[currentStep.decayMode] ?? DECAY_COLORS.other
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: currentStep.nuclide }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: currentStep.daughter }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: currentStep.halfLifeStr })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 px-4 py-1.5 bg-card/30 shrink-0 border-b border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-semibold", children: "t½:" }),
          HALF_LIFE_LEGEND.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-2 w-2 rounded-full",
                style: { background: item.color },
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.label })
          ] }, item.label))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResizablePanel,
            {
              defaultSize: 52,
              minSize: 38,
              maxSize: 65,
              className: "flex flex-col min-h-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 h-full overflow-hidden flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                DecayTree,
                {
                  chainDef,
                  activeStep,
                  onStepSelect: setActiveStep
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResizableHandle,
            {
              withHandle: true,
              className: "bg-border/50 hover:bg-primary/40 transition-colors"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            ResizablePanel,
            {
              defaultSize: 48,
              minSize: 35,
              className: "flex flex-col min-h-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex border-b border-border bg-card shrink-0",
                    role: "tablist",
                    "aria-label": "Analysis tabs",
                    children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        role: "tab",
                        "aria-selected": activeTab === tab,
                        onClick: () => setActiveTab(tab),
                        "data-ocid": `decay-chain.tab_${tab.toLowerCase().replace(" ", "_")}`,
                        className: `px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                        children: tab
                      },
                      tab
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 overflow-y-auto", role: "tabpanel", children: [
                  activeTab === "Activity" && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTab, { chain }),
                  activeTab === "Mass Defect" && /* @__PURE__ */ jsxRuntimeExports.jsx(MassDefectTab, { chain }),
                  activeTab === "Gamma" && /* @__PURE__ */ jsxRuntimeExports.jsx(GammaTab, { chainId: selectedChainId }),
                  activeTab === "Summary" && /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryTab, { chainDef })
                ] })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  DecayChainExplorer,
  DecayChainExplorer as default
};
