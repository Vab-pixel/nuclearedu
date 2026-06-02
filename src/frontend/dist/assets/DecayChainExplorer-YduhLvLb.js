import { w as createLucideIcon, r as reactExports, b1 as React, j as jsxRuntimeExports, q as cn, k as Badge, B as Button, g as ChevronRight, E as EquationBlock, R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, a as ReferenceLine, T as Tooltip, ag as Legend, b as Line, s as BarChart, t as Bar, u as Cell } from "./index-DTpTSWSe.js";
import { I as InlineEquation } from "./InlineEquation-CdIBZYFd.js";
import { A as ALL_CHAINS } from "./decayChain-D5_xRgat.js";
import { d as dispatch, i as identity, T as Transform, a as interrupt } from "./transform-HVroAnEf.js";
import { s as select } from "./select-FR2wsuHH.js";
import { P as Pause } from "./pause-DYO54iOG.js";
import { P as Play } from "./play-B2CFo7P5.js";
import { R as RotateCcw } from "./rotate-ccw-jft29M4M.js";
import { D as Download } from "./download-cTEAWr-B.js";
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
  u235: [
    { nuclide: "U-235", energy_keV: 185.7, intensity: 57 },
    { nuclide: "Th-227", energy_keV: 236, intensity: 12 },
    { nuclide: "Ra-223", energy_keV: 269, intensity: 14 },
    { nuclide: "Ra-223", energy_keV: 154, intensity: 6 },
    { nuclide: "Bi-211", energy_keV: 351, intensity: 13 }
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
  rn222: [
    { nuclide: "Pb-214", energy_keV: 352, intensity: 37 },
    { nuclide: "Pb-214", energy_keV: 295, intensity: 19 },
    { nuclide: "Bi-214", energy_keV: 609, intensity: 46 },
    { nuclide: "Bi-214", energy_keV: 1120, intensity: 15 }
  ],
  cs137: [{ nuclide: "Ba-137m", energy_keV: 661.7, intensity: 100 }],
  co60: [
    { nuclide: "Ni-60m", energy_keV: 1173.2, intensity: 100 },
    { nuclide: "Ni-60m", energy_keV: 1332.5, intensity: 100 }
  ],
  am241: [
    { nuclide: "Am-241", energy_keV: 59.5, intensity: 100 },
    { nuclide: "Am-241", energy_keV: 26.3, intensity: 24 },
    { nuclide: "Np-237", energy_keV: 86.5, intensity: 12 }
  ],
  np237: [
    { nuclide: "Np-237", energy_keV: 86.5, intensity: 12 },
    { nuclide: "Pa-233", energy_keV: 311, intensity: 38 },
    { nuclide: "Pa-233", energy_keV: 341, intensity: 4 }
  ],
  i131: [
    { nuclide: "I-131", energy_keV: 364.5, intensity: 100 },
    { nuclide: "I-131", energy_keV: 637, intensity: 7.3 },
    { nuclide: "I-131", energy_keV: 284.3, intensity: 6.1 },
    { nuclide: "Xe-131m", energy_keV: 163.9, intensity: 2 }
  ],
  sr90: [{ nuclide: "Y-90", energy_keV: 1760.6, intensity: 0.01 }]
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
  const renderRef = reactExports.useRef(0);
  const chain = chainDef.steps;
  const svgW = chain.length * HX + MX * 2 + NW;
  const svgH = NH + MY * 2 + 48;
  const cy = MY + NH / 2;
  reactExports.useEffect(() => {
    const step = chain[activeStep];
    if (!step || step.decayMode === "stable") return;
    const x1 = MX + activeStep * HX + NW;
    const x2 = MX + (activeStep + 1) * HX;
    const now2 = performance.now();
    const mode = step.decayMode;
    const newParticles = [];
    const count = mode === "alpha" ? 3 : mode === "gamma" ? 2 : 2;
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: ++particleId.current,
        x1,
        y1: cy + (i - Math.floor(count / 2)) * 8,
        x2,
        y2: cy + (i - Math.floor(count / 2)) * 4,
        mode,
        born: now2,
        offset: i * 80
      });
    }
    setParticles((p) => [...p, ...newParticles]);
  }, [activeStep, chain, cy]);
  reactExports.useEffect(() => {
    let running = true;
    const DURATION2 = 1e3;
    function loop() {
      if (!running) return;
      const now2 = performance.now();
      setParticles(
        (prev) => prev.filter((p) => now2 - p.born < DURATION2 + p.offset)
      );
      renderRef.current += 1;
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
    const zoomBehavior = zoom().scaleExtent([0.2, 4]).on("zoom", (event) => {
      wrap.attr("transform", event.transform.toString());
    });
    svg.call(zoomBehavior);
    return () => {
      svg.on(".zoom", null);
    };
  }, []);
  const resetZoom = reactExports.useCallback(() => {
    if (!svgRef.current) return;
    const svg = select(svgRef.current);
    svg.transition().duration(400).call(zoom().transform, identity);
  }, []);
  const now = performance.now();
  const DURATION = 1e3;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-0 gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: chainDef.steps.length }),
        " ",
        "steps — scroll/pinch to zoom, drag to pan"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "h-7 px-2 text-xs gap-1",
          onClick: resetZoom,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
            " Reset"
          ]
        }
      )
    ] }),
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
                  if (i !== activeStep) return null;
                  const nx = MX + i * HX;
                  const modeColor = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "ellipse",
                    {
                      cx: nx + NW / 2,
                      cy,
                      rx: NW * 0.8,
                      ry: NH * 0.9,
                      fill: modeColor,
                      opacity: 0.06,
                      style: { filter: "blur(8px)" }
                    },
                    `glow-${step.nuclide}`
                  );
                }),
                chain.map((step, i) => {
                  if (step.decayMode === "stable") return null;
                  const x1 = MX + i * HX + NW;
                  const x2 = MX + (i + 1) * HX;
                  const color = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
                  const isAct = i === activeStep;
                  const midX = (x1 + x2) / 2;
                  const label = step.decayMode === "beta-" ? "β⁻" : step.decayMode === "beta+" ? "β⁺" : step.decayMode === "alpha" ? "α" : step.decayMode === "ec" ? "ε" : step.decayMode === "gamma" ? "γ" : step.decayMode;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { opacity: isAct ? 1 : 0.3, children: [
                    isAct && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1,
                        y1: cy,
                        x2: x2 - 10,
                        y2: cy,
                        stroke: color,
                        strokeWidth: 12,
                        opacity: 0.12
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
                        x: midX - 18,
                        y: cy - 32,
                        width: 36,
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
                        y: cy - 18,
                        textAnchor: "middle",
                        fill: color,
                        fontSize: "11",
                        fontFamily: "monospace",
                        fontWeight: isAct ? "bold" : "normal",
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: midX,
                        y: cy + 30,
                        textAnchor: "middle",
                        fill: isAct ? "#d1d5db" : "#4b5563",
                        fontSize: "7.5",
                        fontFamily: "monospace",
                        children: step.halfLifeStr
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: midX,
                        y: cy + 40,
                        textAnchor: "middle",
                        fill: isAct ? color : "#374151",
                        fontSize: "7",
                        fontFamily: "monospace",
                        children: step.Qvalue_MeV > 0 ? `${step.Qvalue_MeV} MeV` : ""
                      }
                    )
                  ] }, `edge-${step.nuclide}-${i}`);
                }),
                particles.map((p) => {
                  const elapsed = now - p.born - p.offset;
                  if (elapsed < 0) return null;
                  const progress = Math.min(elapsed / DURATION, 1);
                  const travel = Math.min(progress / 0.4, 1);
                  const px = p.x1 + (p.x2 - p.x1) * 0.35 * travel;
                  const opacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) / 0.5;
                  const color = p.mode === "alpha" ? "#fbbf24" : p.mode === "beta-" ? "#60a5fa" : p.mode === "beta+" ? "#f87171" : p.mode === "gamma" ? "#c084fc" : "#22d3ee";
                  const r = p.mode === "alpha" ? 5.5 : p.mode === "gamma" ? 3.5 : 3;
                  const shape = p.mode === "gamma" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polygon",
                    {
                      points: `${px},${p.y1 - r * 1.4} ${px + r},${p.y1 + r * 0.7} ${px - r},${p.y1 + r * 0.7}`,
                      fill: color,
                      opacity,
                      style: { filter: `drop-shadow(0 0 ${r + 3}px ${color})` }
                    },
                    p.id
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: px,
                      cy: p.y1,
                      r,
                      fill: color,
                      opacity,
                      style: { filter: `drop-shadow(0 0 ${r + 2}px ${color})` }
                    },
                    p.id
                  );
                  return shape;
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
                            x: nx - 5,
                            y: ny - 5,
                            width: NW + 10,
                            height: NH + 10,
                            rx: 13,
                            fill: `${modeColor}18`,
                            stroke: modeColor,
                            strokeWidth: 2,
                            style: { filter: `drop-shadow(0 0 10px ${modeColor}80)` }
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
                            opacity: 0.85
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
                            fill: isAct ? `${modeColor}28` : "#0d1520",
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
                            fill: isStable ? "#4ade80" : isAct ? "#9ca3af" : "#374151",
                            fontSize: "9",
                            fontFamily: "monospace",
                            fontWeight: isStable ? "bold" : "normal",
                            pointerEvents: "none",
                            children: isStable ? "STABLE" : `Z${step.Z} A${step.A}`
                          }
                        )
                      ]
                    },
                    `node-${step.nuclide}-${i}`
                  );
                })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NuclideDetailCard,
      {
        step: chain[activeStep],
        stepIndex: activeStep,
        total: chain.length
      }
    )
  ] });
}
function NuclideDetailCard({
  step,
  stepIndex,
  total
}) {
  if (!step) return null;
  const modeColor = DECAY_COLORS[step.decayMode] ?? DECAY_COLORS.other;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/80 p-3 shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-base font-mono font-bold",
            style: { color: modeColor },
            children: step.nuclide
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "rounded-full px-2 py-0.5 text-xs font-semibold font-mono",
            style: {
              background: `${modeColor}20`,
              color: modeColor,
              border: `1px solid ${modeColor}40`
            },
            children: step.decayMode
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
        "Step ",
        stepIndex + 1,
        " / ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 text-xs", children: [
      { label: "Z", value: step.Z },
      { label: "N", value: step.N },
      { label: "A", value: step.A },
      { label: "Q (MeV)", value: step.Qvalue_MeV || "—" },
      { label: "t½", value: step.halfLifeStr, span: 2 },
      { label: "Daughter", value: step.daughter, span: 2 }
    ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `rounded-lg bg-muted/20 border border-border/40 px-2 py-1.5 ${f.span === 2 ? "col-span-2" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px] uppercase tracking-widest", children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground truncate", children: String(f.value) })
        ]
      },
      f.label
    )) }),
    step.particleEmitted && step.decayMode !== "stable" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-muted-foreground font-mono", children: [
      "Emitted:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: modeColor }, children: step.particleEmitted }),
      step.branchingPercent < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground", children: [
        "(",
        step.branchingPercent,
        "% branch)"
      ] })
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
  const data = reactExports.useMemo(() => buildActivityData(chain, 80), [chain]);
  if (members.length === 0 || data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground p-4 text-sm", children: "No radioactive members in this chain." });
  }
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
              tickFormatter: (v) => formatTime(v),
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
              stroke: "#4b5563",
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
                value.toFixed(4),
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
function GammaTab({ chainId }) {
  const peaks = GAMMA_PEAKS[chainId];
  const [marker, setMarker] = reactExports.useState(null);
  const [hovered, setHovered] = reactExports.useState(null);
  if (!peaks || peaks.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "Detailed gamma spectroscopy data is not catalogued for this chain. Selected chains with gamma data: U-238, U-235, Th-232, Ra-226, Rn-222, Cs-137, Co-60, Am-241, Np-237, I-131, Sr-90." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Source: NNDC/ENSDF. Relative intensities normalized to strongest peak." })
    ] });
  }
  const sorted = [...peaks].sort((a, b) => a.energy_keV - b.energy_keV);
  const maxIntensity = Math.max(...sorted.map((p) => p.intensity));
  const chartData = sorted.map((p) => ({
    energy: p.energy_keV,
    intensity: p.intensity,
    normalizedIntensity: p.intensity / maxIntensity * 100,
    label: `${p.nuclide} ${p.energy_keV} keV`,
    nuclide: p.nuclide,
    raw: p
  }));
  const maxEnergy = Math.max(...sorted.map((p) => p.energy_keV));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-3 h-full min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Gamma-Ray Spectroscopy Peaks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click a peak to place energy marker. Hover for isotope details. Source: NNDC/ENSDF" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data: chartData,
        margin: { top: 8, right: 16, left: 0, bottom: 32 },
        onClick: (state) => {
          var _a;
          if ((_a = state == null ? void 0 : state.activePayload) == null ? void 0 : _a[0]) {
            const energy = state.activePayload[0].payload.energy;
            setMarker(energy);
            setHovered(state.activePayload[0].payload.raw);
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
                var _a, _b;
                return [
                  `${value.toFixed(1)}%`,
                  `${((_a = entry == null ? void 0 : entry.payload) == null ? void 0 : _a.nuclide) ?? ""} @ ${((_b = entry == null ? void 0 : entry.payload) == null ? void 0 : _b.energy) ?? ""} keV`
                ];
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "intensity", barSize: 4, radius: [3, 3, 0, 0], children: chartData.map((_entry, i) => {
            var _a, _b, _c;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Cell,
              {
                fill: DECAY_COLORS[((_a = peaks[i]) == null ? void 0 : _a.nuclide) ? "alpha" : "other"] ?? "#c084fc",
                style: { fill: "#c084fc" },
                opacity: 0.9
              },
              `gamma-peak-${((_b = peaks[i]) == null ? void 0 : _b.nuclide) ?? i}-${((_c = peaks[i]) == null ? void 0 : _c.energy_keV) ?? i}`
            );
          }) })
        ]
      }
    ) }),
    hovered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: hovered.nuclide }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-2", children: [
        "E = ",
        hovered.energy_keV,
        " keV"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-2", children: [
        "I = ",
        hovered.intensity,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "ml-auto float-right text-muted-foreground underline",
          onClick: () => {
            setMarker(null);
            setHovered(null);
          },
          children: "clear"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Isotope", "Energy (keV)", "Intensity (%)", "Relative"].map(
        (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-3 py-1.5 text-left font-semibold text-muted-foreground",
            children: h
          },
          h
        )
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-t border-border/30 hover:bg-muted/20 cursor-pointer",
          onClick: () => setMarker(p.energy_keV),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ")
              setMarker(p.energy_keV);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1 font-mono text-primary", children: p.nuclide }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1 font-mono", children: p.energy_keV }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1 font-mono", children: p.intensity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-2 rounded-full bg-primary/60",
                  style: {
                    width: `${p.intensity / maxIntensity * 60}px`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-[10px]", children: [
                (p.intensity / maxIntensity * 100).toFixed(0),
                "%"
              ] })
            ] }) })
          ]
        },
        `${p.nuclide}-${p.energy_keV}`
      )) })
    ] }) })
  ] });
}
function MassDefectTab({ chain }) {
  const U_TO_MEV = 931.494;
  const rows = chain.filter((s) => s.decayMode !== "stable").map((s) => {
    const massDefect = s.Qvalue_MeV / U_TO_MEV;
    return {
      step: s.stepIndex,
      parent: s.nuclide,
      daughter: s.daughter,
      mode: s.decayMode,
      massDefect: massDefect.toFixed(7),
      Q: s.Qvalue_MeV,
      beChange: (massDefect * U_TO_MEV).toFixed(3)
    };
  });
  const totalQ = rows.reduce((a, r) => a + r.Q, 0);
  const barData = rows.map((r) => ({ name: r.parent, Q: r.Q, mode: r.mode }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-3 h-full min-h-0 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Mass Defect & Q-Values per Step" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-primary/15 border border-primary/30 px-2.5 py-0.5 text-xs font-mono text-primary", children: [
        "Total Q = ",
        totalQ.toFixed(3),
        " MeV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-muted/10 px-3 py-2 text-xs font-mono text-muted-foreground", children: "Δm = Q / 931.494 MeV·u⁻¹  |  M(⁴He) = 4.002602 u  |  m(e) = 0.000549 u" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono text-xs", children: r.massDefect }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono text-primary", children: r.Q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1 font-mono", children: r.beChange })
          ]
        },
        r.step
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data: barData,
        layout: "vertical",
        margin: { top: 4, right: 16, left: 64, bottom: 4 },
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
              width: 60
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Q", radius: [0, 3, 3, 0], barSize: 9, children: barData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cell,
            {
              fill: DECAY_COLORS[entry.mode] ?? DECAY_COLORS.other,
              opacity: 0.85
            },
            `qbar-${entry.name}`
          )) })
        ]
      }
    ) })
  ] });
}
const C14_HALF_LIFE = 5730;
const C14_LAMBDA = Math.LN2 / C14_HALF_LIFE;
const SAMPLE_PRESETS = [
  {
    id: "wood",
    label: "Wood",
    pMC: 100,
    note: "Trees equilibrate with atmospheric CO₂; initial pMC ≈ 100"
  },
  {
    id: "bone",
    label: "Bone",
    pMC: 100,
    note: "Collagen carbon derives from diet; pMC reflects atmospheric C-14 at death"
  },
  {
    id: "charcoal",
    label: "Charcoal",
    pMC: 100,
    note: "From wood — retains the C-14 signature of the living wood"
  },
  {
    id: "cloth",
    label: "Cloth/Linen",
    pMC: 100,
    note: "Plant-fiber textiles incorporate atmospheric C-14 during growth"
  },
  {
    id: "peat",
    label: "Peat",
    pMC: 100,
    note: "Organic peat accumulates from contemporary plant material"
  }
];
const DECAY_CURVE_DATA = Array.from({ length: 101 }, (_, i) => {
  const t = i / 100 * 5e4;
  return { t, fraction: Math.exp(-C14_LAMBDA * t) * 100 };
});
function CarbonDatingTab() {
  const [preset, setPreset] = reactExports.useState("wood");
  const [nPMC, setNpMC] = reactExports.useState(50);
  const [result, setResult] = reactExports.useState(
    null
  );
  const [inputError, setInputError] = reactExports.useState(null);
  const selectedPreset = SAMPLE_PRESETS.find((p) => p.id === preset) ?? SAMPLE_PRESETS[0];
  function handleCalculate() {
    if (nPMC <= 0 || nPMC >= 100) {
      setInputError("Current pMC must be between 0 and 100 (exclusive).");
      return;
    }
    setInputError(null);
    const ratio = nPMC / 100;
    const age = -Math.log(ratio) / C14_LAMBDA;
    const sigmaAge = age * Math.sqrt(2 * 5e-3 ** 2 + (40 / C14_HALF_LIFE) ** 2);
    setResult({ age, sigma: sigmaAge });
  }
  const samplePoint = result ? { t: Math.round(result.age), fraction: nPMC } : null;
  const HALF_LIFE_MARKERS = [5730, 11460, 17190, 22920];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-3 h-full min-h-0 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "¹⁴C Carbon Dating Calculator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Calculate radiocarbon age using the Libby half-life (5730 ± 40 yr). Based on first-order decay: N(t) = N₀ · e^(−λt)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "material-preset-select",
            className: "block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5",
            children: "Material Preset"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "material-preset-select",
            value: preset,
            onChange: (e) => {
              setPreset(e.target.value);
              setResult(null);
              setInputError(null);
            },
            className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "data-ocid": "carbon-tab.sample_type.select",
            children: SAMPLE_PRESETS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.label }, s.id))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-muted-foreground leading-relaxed", children: selectedPreset.note })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "npmc-input",
            className: "block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5",
            children: "Current ¹⁴C Activity — N(t) [pMC]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "npmc-input",
            type: "number",
            min: "0.001",
            max: "99.999",
            step: "0.1",
            value: nPMC,
            onChange: (e) => {
              setNpMC(Number.parseFloat(e.target.value) || 0);
              setResult(null);
              setInputError(null);
            },
            className: "w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs font-mono text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "data-ocid": "carbon-tab.npmc.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-muted-foreground", children: "% Modern Carbon (pMC). Modern standard = 100 pMC." })
      ] })
    ] }),
    inputError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-amber-500/40 bg-amber-950/30 px-3 py-2 text-xs text-amber-300",
        role: "alert",
        "data-ocid": "carbon-tab.error_state",
        children: [
          "⚠ ",
          inputError
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleCalculate,
        className: "w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-opacity",
        "data-ocid": "carbon-tab.calculate.primary_button",
        children: "Calculate Age"
      }
    ),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2",
        "data-ocid": "carbon-tab.result.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 px-3 py-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Radiocarbon Age" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xl font-bold text-primary", children: Math.round(result.age).toLocaleString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "yr BP" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 px-3 py-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "±1σ Uncertainty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xl font-bold text-foreground", children: [
                "±",
                Math.round(result.sigma).toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "yr" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            "Age = ",
            result.age.toFixed(1),
            " ± ",
            result.sigma.toFixed(1),
            " yr BP  |  Precision:",
            " ",
            (result.sigma / result.age * 100).toFixed(2),
            "%"
          ] }),
          result.age > 5e4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2 text-xs text-red-300", children: "⚠ Age exceeds ~50,000 yr practical limit for radiocarbon dating." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "IntCal20 calibration (Reimer et al. 2020) may shift calendar age ±100–500 yr." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5", children: "¹⁴C Decay Curve (50,000 yr)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        LineChart,
        {
          data: DECAY_CURVE_DATA,
          margin: { top: 4, right: 12, left: 0, bottom: 20 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1a2535" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "t",
                type: "number",
                tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`,
                tick: { fontSize: 9, fill: "#6b7280" },
                label: {
                  value: "Time (yr BP)",
                  position: "insideBottom",
                  offset: -12,
                  fill: "#6b7280",
                  fontSize: 9
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                domain: [0, 100],
                tickFormatter: (v) => `${v}%`,
                tick: { fontSize: 9, fill: "#6b7280" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "#0d1520",
                  border: "1px solid #1e2d45",
                  borderRadius: 8,
                  fontSize: 10
                },
                formatter: (v) => [`${v.toFixed(2)}%`, "¹⁴C remaining"],
                labelFormatter: (v) => `${Math.round(v).toLocaleString()} yr BP`
              }
            ),
            HALF_LIFE_MARKERS.map((yr, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReferenceLine,
              {
                x: yr,
                stroke: "#a855f7",
                strokeDasharray: "6 3",
                strokeWidth: 1,
                opacity: 0.6,
                label: {
                  value: `${i + 1}t½`,
                  position: "top",
                  fontSize: 9,
                  fill: "#a855f7"
                }
              },
              yr
            )),
            samplePoint && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReferenceLine,
              {
                x: samplePoint.t,
                stroke: "#f59e0b",
                strokeWidth: 2,
                label: {
                  value: `${samplePoint.fraction.toFixed(1)}% pMC`,
                  position: "insideTopRight",
                  fontSize: 9,
                  fill: "#f59e0b"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "fraction",
                stroke: "#22d3ee",
                strokeWidth: 2.5,
                dot: false
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/10 p-2.5 text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Methodology:" }),
      " Libby half-life 5730 ± 40 yr. Uncertainty propagated via quadrature (analytical 0.5% + t½ uncertainty). Conventional radiocarbon age in yr BP (AD 1950 reference). Calibrate with IntCal20 before research use."
    ] })
  ] });
}
const TABS = ["Activity", "Gamma", "Mass Defect", "Carbon Dating"];
const SPEED_OPTIONS = [0.5, 1, 2, 4];
function DecayChainExplorer() {
  const [selectedChainId, setSelectedChainId] = reactExports.useState("u238");
  const [activeStep, setActiveStep] = reactExports.useState(0);
  const [activeTab, setActiveTab] = reactExports.useState("Activity");
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [speed, setSpeed] = reactExports.useState(1);
  const intervalRef = reactExports.useRef(null);
  const prevChainId = reactExports.useRef(selectedChainId);
  const chainDef = ALL_CHAINS.find((c) => c.id === selectedChainId) ?? ALL_CHAINS[0];
  const chain = chainDef.steps;
  const chainLen = chain.length;
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
    const delay = 1800 / speed;
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
  const modeColor = DECAY_COLORS[currentStep == null ? void 0 : currentStep.decayMode] ?? DECAY_COLORS.other;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-screen min-h-0 bg-background",
      "data-ocid": "decay-chain.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-4 py-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/20 text-primary border-primary/30 text-xs", children: "Simulator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "D3 · Recharts · Bateman" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
              ALL_CHAINS.length,
              " Chains"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Decay Chain Explorer & Simulator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5 max-w-2xl", children: "Split-pane research dashboard — animated decay trees, secular equilibrium curves, gamma spectroscopy, mass defect analysis, and integrated Carbon Dating Calculator." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/80 px-4 py-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mr-1 font-semibold", children: "Chain:" }),
          ALL_CHAINS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedChainId(c.id),
              "data-ocid": `decay-chain.chain_selector.${c.id}`,
              "aria-pressed": selectedChainId === c.id,
              className: `rounded-full border px-2 py-0.5 text-xs font-medium transition-all ${selectedChainId === c.id ? "border-primary bg-primary/15 text-primary shadow-sm" : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
              children: c.parent
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Speed:" }),
            SPEED_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSpeed(s),
                "data-ocid": `decay-chain.speed_${s}x`,
                className: `rounded px-2 py-0.5 text-xs font-mono transition-colors ${speed === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
                children: [
                  s,
                  "×"
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground min-w-[72px] text-center", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden xl:flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-2 w-2 rounded-full",
                style: { background: modeColor }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: currentStep == null ? void 0 : currentStep.nuclide }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: currentStep == null ? void 0 : currentStep.daughter }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: currentStep == null ? void 0 : currentStep.halfLifeStr })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-8 px-2 text-xs gap-1 hidden lg:flex",
              onClick: () => downloadCSV(chainDef),
              "data-ocid": "decay-chain.csv_download_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
                " CSV"
              ]
            }
          )
        ] }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "^A_Z X \\\\rightarrow ^{A-4}_{Z-2}Y + ^4_2\\\\text{He} + Q",
              annotation: "Alpha decay: nucleus emits a helium-4 nucleus (alpha particle). Q-value = (M_parent - M_daughter - M_alpha)c².",
              label: "Alpha Decay"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "^A_Z X \\\\rightarrow ^A_{Z+1}Y + e^- + \\\\bar{\\\\nu}_e",
              annotation: "Beta-minus decay: a neutron converts to a proton, emitting an electron and electron antineutrino.",
              label: "Beta⁻ Decay"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "^A_Z X \\\\rightarrow ^A_{Z-1}Y + e^+ + \\\\nu_e",
              annotation: "Beta-plus decay: a proton converts to a neutron, emitting a positron and electron neutrino.",
              label: "Beta⁺ Decay"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "^A_Z X + e^- \\\\rightarrow ^A_{Z-1}Y + \\\\nu_e",
              annotation: "Electron capture: a proton captures an inner-shell electron, converting to a neutron with emission of an electron neutrino.",
              label: "Electron Capture"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EquationBlock,
            {
              latex: "^A_Z X^* \\\\rightarrow ^A_Z X + \\\\gamma",
              annotation: "Gamma decay: an excited nucleus releases excess energy as a high-energy photon (gamma ray) without changing Z or A.",
              label: "Gamma Decay"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 px-4 py-1.5 bg-card/30 shrink-0 border-b border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-semibold", children: "t½ color:" }),
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
          ] }, item.label)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 ml-auto", children: ["alpha", "beta-", "beta+", "gamma", "ec"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-2 w-2 rounded-full",
                style: { background: DECAY_COLORS[mode] }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: mode === "beta-" ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineEquation, { tex: "\\\\beta^-" }) : mode === "beta+" ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineEquation, { tex: "\\\\beta^+" }) : mode === "ec" ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineEquation, { tex: "\\\\text{EC}" }) : mode })
          ] }, mode)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResizablePanel,
            {
              defaultSize: 50,
              minSize: 35,
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
              defaultSize: 50,
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
                        "data-ocid": `decay-chain.tab_${tab.toLowerCase().replace(/ /g, "_")}`,
                        className: `px-3 py-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
                        children: tab
                      },
                      tab
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 overflow-y-auto", role: "tabpanel", children: [
                  activeTab === "Activity" && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTab, { chain }),
                  activeTab === "Gamma" && /* @__PURE__ */ jsxRuntimeExports.jsx(GammaTab, { chainId: selectedChainId }),
                  activeTab === "Mass Defect" && /* @__PURE__ */ jsxRuntimeExports.jsx(MassDefectTab, { chain }),
                  activeTab === "Carbon Dating" && /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonDatingTab, {})
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
  DECAY_COLORS,
  DecayChainExplorer,
  HALF_LIFE_LEGEND,
  DecayChainExplorer as default,
  halfLifeColor
};
