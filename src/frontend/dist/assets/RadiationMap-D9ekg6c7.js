import { d as React, a3 as isFunction, a0 as clsx, bz as Curve, al as Text, $ as filterProps, a1 as polarToCartesian, ac as isNil, a5 as Layer, aa as getValueByDataKey, an as adaptEventsOfChild, bA as Shape, a6 as Animate, bB as get, a7 as interpolateNumber, a8 as isEqual, bC as isNumber, ao as Label, v as LabelList, r as reactExports, bD as uniqueId, a9 as Global, bE as mathSign, bF as findAllByType, u as Cell, bG as getMaxRadius, bH as getPercentValue, bI as warn, ad as generateCategoricalChart, ae as formatAxisMap, j as jsxRuntimeExports, P as PageHeader, k as Badge, I as Info, G as Globe, Z as Zap, m as motion, c as AnimatePresence, J as X, R as ResponsiveContainer, T as Tooltip, s as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, a as ReferenceLine, t as Bar, h as ChevronDown } from "./index-DTpTSWSe.js";
import { a as PolarAngleAxis, b as PolarRadiusAxis } from "./PolarAngleAxis-CWbwdejE.js";
var _Pie;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Pie = /* @__PURE__ */ function(_PureComponent) {
  function Pie2(props) {
    var _this;
    _classCallCheck(this, Pie2);
    _this = _callSuper(this, Pie2, [props]);
    _defineProperty(_this, "pieRef", null);
    _defineProperty(_this, "sectorRefs", []);
    _defineProperty(_this, "id", uniqueId("recharts-pie-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _this.state = {
      isAnimationFinished: !props.isAnimationActive,
      prevIsAnimationActive: props.isAnimationActive,
      prevAnimationId: props.animationId,
      sectorToFocus: 0
    };
    return _this;
  }
  _inherits(Pie2, _PureComponent);
  return _createClass(Pie2, [{
    key: "isActiveIndex",
    value: function isActiveIndex(i) {
      var activeIndex = this.props.activeIndex;
      if (Array.isArray(activeIndex)) {
        return activeIndex.indexOf(i) !== -1;
      }
      return i === activeIndex;
    }
  }, {
    key: "hasActiveIndex",
    value: function hasActiveIndex() {
      var activeIndex = this.props.activeIndex;
      return Array.isArray(activeIndex) ? activeIndex.length !== 0 : activeIndex || activeIndex === 0;
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(sectors) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, label = _this$props.label, labelLine = _this$props.labelLine, dataKey = _this$props.dataKey, valueKey = _this$props.valueKey;
      var pieProps = filterProps(this.props, false);
      var customLabelProps = filterProps(label, false);
      var customLabelLineProps = filterProps(labelLine, false);
      var offsetRadius = label && label.offsetRadius || 20;
      var labels = sectors.map(function(entry, i) {
        var midAngle = (entry.startAngle + entry.endAngle) / 2;
        var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
        var labelProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          stroke: "none"
        }, customLabelProps), {}, {
          index: i,
          textAnchor: Pie2.getTextAnchor(endPoint.x, entry.cx)
        }, endPoint);
        var lineProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          fill: "none",
          stroke: entry.fill
        }, customLabelLineProps), {}, {
          index: i,
          points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint]
        });
        var realDataKey = dataKey;
        if (isNil(dataKey) && isNil(valueKey)) {
          realDataKey = "value";
        } else if (isNil(dataKey)) {
          realDataKey = valueKey;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ React.createElement(Layer, {
            key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
          }, labelLine && Pie2.renderLabelLineItem(labelLine, lineProps, "line"), Pie2.renderLabelItem(label, labelProps, getValueByDataKey(entry, realDataKey)))
        );
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-pie-labels"
      }, labels);
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props, activeShape = _this$props2.activeShape, blendStroke = _this$props2.blendStroke, inactiveShapeProp = _this$props2.inactiveShape;
      return sectors.map(function(entry, i) {
        if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
        var isActive = _this2.isActiveIndex(i);
        var inactiveShape = inactiveShapeProp && _this2.hasActiveIndex() ? inactiveShapeProp : null;
        var sectorOptions = isActive ? activeShape : inactiveShape;
        var sectorProps = _objectSpread(_objectSpread({}, entry), {}, {
          stroke: blendStroke ? entry.fill : entry.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends({
          ref: function ref(_ref) {
            if (_ref && !_this2.sectorRefs.includes(_ref)) {
              _this2.sectorRefs.push(_ref);
            }
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, adaptEventsOfChild(_this2.props, entry, i), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
        }), /* @__PURE__ */ React.createElement(Shape, _extends({
          option: sectorOptions,
          isActive,
          shapeType: "sector"
        }, sectorProps)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props, sectors = _this$props3.sectors, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var _this$state = this.state, prevSectors = _this$state.prevSectors, prevIsAnimationActive = _this$state.prevIsAnimationActive;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId, "-").concat(prevIsAnimationActive),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(_ref2) {
        var t = _ref2.t;
        var stepData = [];
        var first = sectors && sectors[0];
        var curAngle = first.startAngle;
        sectors.forEach(function(entry, index) {
          var prev = prevSectors && prevSectors[index];
          var paddingAngle = index > 0 ? get(entry, "paddingAngle", 0) : 0;
          if (prev) {
            var angleIp = interpolateNumber(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);
            var latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + angleIp(t) + paddingAngle
            });
            stepData.push(latest);
            curAngle = latest.endAngle;
          } else {
            var endAngle = entry.endAngle, startAngle = entry.startAngle;
            var interpolatorAngle = interpolateNumber(0, endAngle - startAngle);
            var deltaAngle = interpolatorAngle(t);
            var _latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + deltaAngle + paddingAngle
            });
            stepData.push(_latest);
            curAngle = _latest.endAngle;
          }
        });
        return /* @__PURE__ */ React.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function attachKeyboardHandlers(pieRef) {
      var _this4 = this;
      pieRef.onkeydown = function(e) {
        if (!e.altKey) {
          switch (e.key) {
            case "ArrowLeft": {
              var next = ++_this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[next].focus();
              _this4.setState({
                sectorToFocus: next
              });
              break;
            }
            case "ArrowRight": {
              var _next = --_this4.state.sectorToFocus < 0 ? _this4.sectorRefs.length - 1 : _this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[_next].focus();
              _this4.setState({
                sectorToFocus: _next
              });
              break;
            }
            case "Escape": {
              _this4.sectorRefs[_this4.state.sectorToFocus].blur();
              _this4.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
        }
      };
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props, sectors = _this$props4.sectors, isAnimationActive = _this$props4.isAnimationActive;
      var prevSectors = this.state.prevSectors;
      if (isAnimationActive && sectors && sectors.length && (!prevSectors || !isEqual(prevSectors, sectors))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(sectors);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.pieRef) {
        this.attachKeyboardHandlers(this.pieRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var _this$props5 = this.props, hide = _this$props5.hide, sectors = _this$props5.sectors, className = _this$props5.className, label = _this$props5.label, cx = _this$props5.cx, cy = _this$props5.cy, innerRadius = _this$props5.innerRadius, outerRadius = _this$props5.outerRadius, isAnimationActive = _this$props5.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (hide || !sectors || !sectors.length || !isNumber(cx) || !isNumber(cy) || !isNumber(innerRadius) || !isNumber(outerRadius)) {
        return null;
      }
      var layerClass = clsx("recharts-pie", className);
      return /* @__PURE__ */ React.createElement(Layer, {
        tabIndex: this.props.rootTabIndex,
        className: layerClass,
        ref: function ref(_ref3) {
          _this5.pieRef = _ref3;
        }
      }, this.renderSectors(), label && this.renderLabels(sectors), Label.renderCallByParent(this.props, null, false), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, sectors, false));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevIsAnimationActive !== nextProps.isAnimationActive) {
        return {
          prevIsAnimationActive: nextProps.isAnimationActive,
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: [],
          isAnimationFinished: true
        };
      }
      if (nextProps.isAnimationActive && nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: prevState.curSectors,
          isAnimationFinished: true
        };
      }
      if (nextProps.sectors !== prevState.curSectors) {
        return {
          curSectors: nextProps.sectors,
          isAnimationFinished: true
        };
      }
      return null;
    }
  }, {
    key: "getTextAnchor",
    value: function getTextAnchor(x, cx) {
      if (x > cx) {
        return "start";
      }
      if (x < cx) {
        return "end";
      }
      return "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function renderLabelLineItem(option, props, key) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      if (isFunction(option)) {
        return option(props);
      }
      var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
      return /* @__PURE__ */ React.createElement(Curve, _extends({}, props, {
        key,
        type: "linear",
        className
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function renderLabelItem(option, props, value) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      var label = value;
      if (isFunction(option)) {
        label = option(props);
        if (/* @__PURE__ */ React.isValidElement(label)) {
          return label;
        }
      }
      var className = clsx("recharts-pie-label-text", typeof option !== "boolean" && !isFunction(option) ? option.className : "");
      return /* @__PURE__ */ React.createElement(Text, _extends({}, props, {
        alignmentBaseline: "middle",
        className
      }), label);
    }
  }]);
}(reactExports.PureComponent);
_Pie = Pie;
_defineProperty(Pie, "displayName", "Pie");
_defineProperty(Pie, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: true,
  hide: false,
  minAngle: 0,
  isAnimationActive: !Global.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: false,
  rootTabIndex: 0
});
_defineProperty(Pie, "parseDeltaAngle", function(startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
});
_defineProperty(Pie, "getRealPieData", function(itemProps) {
  var data = itemProps.data, children = itemProps.children;
  var presentationProps = filterProps(itemProps, false);
  var cells = findAllByType(children, Cell);
  if (data && data.length) {
    return data.map(function(entry, index) {
      return _objectSpread(_objectSpread(_objectSpread({
        payload: entry
      }, presentationProps), entry), cells && cells[index] && cells[index].props);
    });
  }
  if (cells && cells.length) {
    return cells.map(function(cell) {
      return _objectSpread(_objectSpread({}, presentationProps), cell.props);
    });
  }
  return [];
});
_defineProperty(Pie, "parseCoordinateOfPie", function(itemProps, offset) {
  var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(itemProps.cx, width, width / 2);
  var cy = top + getPercentValue(itemProps.cy, height, height / 2);
  var innerRadius = getPercentValue(itemProps.innerRadius, maxPieRadius, 0);
  var outerRadius = getPercentValue(itemProps.outerRadius, maxPieRadius, maxPieRadius * 0.8);
  var maxRadius = itemProps.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
});
_defineProperty(Pie, "getComposedData", function(_ref4) {
  var item = _ref4.item, offset = _ref4.offset;
  var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
  var pieData = _Pie.getRealPieData(itemProps);
  if (!pieData || !pieData.length) {
    return null;
  }
  var cornerRadius = itemProps.cornerRadius, startAngle = itemProps.startAngle, endAngle = itemProps.endAngle, paddingAngle = itemProps.paddingAngle, dataKey = itemProps.dataKey, nameKey = itemProps.nameKey, valueKey = itemProps.valueKey, tooltipType = itemProps.tooltipType;
  var minAngle = Math.abs(itemProps.minAngle);
  var coordinate = _Pie.parseCoordinateOfPie(itemProps, offset);
  var deltaAngle = _Pie.parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var realDataKey = dataKey;
  if (isNil(dataKey) && isNil(valueKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = "value";
  } else if (isNil(dataKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = valueKey;
  }
  var notZeroItemCount = pieData.filter(function(entry) {
    return getValueByDataKey(entry, realDataKey, 0) !== 0;
  }).length;
  var totalPadingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * minAngle - totalPadingAngle;
  var sum = pieData.reduce(function(result, entry) {
    var val = getValueByDataKey(entry, realDataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = pieData.map(function(entry, i) {
      var val = getValueByDataKey(entry, realDataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? minAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entry,
        dataKey: realDataKey,
        type: tooltipType
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread(_objectSpread(_objectSpread({
        percent,
        cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entry), coordinate), {}, {
        value: getValueByDataKey(entry, realDataKey),
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entry,
        paddingAngle: mathSign(deltaAngle) * paddingAngle
      });
      return prev;
    });
  }
  return _objectSpread(_objectSpread({}, coordinate), {}, {
    sectors,
    data: pieData
  });
});
var PieChart = generateCategoricalChart({
  chartName: "PieChart",
  GraphicalChild: Pie,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
const RADIATION_DATA = [
  {
    code: "FI",
    name: "Finland",
    total: 7.8,
    cosmic: 0.38,
    terrestrial: 0.55,
    radon: 6.3,
    internal: 0.29,
    population: 5.5,
    notes: "Granite bedrock causes very high radon levels"
  },
  {
    code: "NO",
    name: "Norway",
    total: 7.1,
    cosmic: 0.42,
    terrestrial: 0.52,
    radon: 5.8,
    internal: 0.29,
    population: 5.4,
    notes: "High elevation + granitic geology"
  },
  {
    code: "SE",
    name: "Sweden",
    total: 4.8,
    cosmic: 0.38,
    terrestrial: 0.48,
    radon: 3.65,
    internal: 0.29,
    population: 10.5,
    notes: "Extensive radon mitigation programs"
  },
  {
    code: "IS",
    name: "Iceland",
    total: 5.2,
    cosmic: 0.36,
    terrestrial: 0.85,
    radon: 3.7,
    internal: 0.29,
    population: 0.37,
    notes: "Volcanic geology, high terrestrial radiation"
  },
  {
    code: "CZ",
    name: "Czechia",
    total: 5.2,
    cosmic: 0.35,
    terrestrial: 0.55,
    radon: 4,
    internal: 0.3,
    population: 10.9,
    notes: "High indoor radon from uranium-rich geology"
  },
  {
    code: "AT",
    name: "Austria",
    total: 4.3,
    cosmic: 0.38,
    terrestrial: 0.52,
    radon: 3.1,
    internal: 0.3,
    population: 9,
    notes: "Alpine terrain raises cosmic component"
  },
  {
    code: "CH",
    name: "Switzerland",
    total: 4,
    cosmic: 0.48,
    terrestrial: 0.5,
    radon: 2.72,
    internal: 0.3,
    population: 8.7,
    notes: "Alpine elevation, moderate radon"
  },
  {
    code: "IN",
    name: "India",
    total: 4.2,
    cosmic: 0.35,
    terrestrial: 1.5,
    radon: 2,
    internal: 0.35,
    population: 1400,
    notes: "High terrestrial from monazite sand coasts"
  },
  {
    code: "BR",
    name: "Brazil",
    total: 3.5,
    cosmic: 0.36,
    terrestrial: 0.72,
    radon: 2.1,
    internal: 0.32,
    population: 215,
    notes: "Monazite deposits in Guarapari"
  },
  {
    code: "IR",
    name: "Iran",
    total: 4.7,
    cosmic: 0.37,
    terrestrial: 1.28,
    radon: 2.75,
    internal: 0.3,
    population: 87,
    notes: "Ramsar region — highest natural dose globally"
  },
  {
    code: "DE",
    name: "Germany",
    total: 4,
    cosmic: 0.35,
    terrestrial: 0.5,
    radon: 2.85,
    internal: 0.29,
    population: 84,
    notes: "Strict radon regulations since 2017"
  },
  {
    code: "FR",
    name: "France",
    total: 3.5,
    cosmic: 0.36,
    terrestrial: 0.52,
    radon: 2.33,
    internal: 0.29,
    population: 68,
    notes: "Significant radon in Brittany (granite)"
  },
  {
    code: "GB",
    name: "United Kingdom",
    total: 2.7,
    cosmic: 0.35,
    terrestrial: 0.47,
    radon: 1.59,
    internal: 0.29,
    population: 67,
    notes: "Radon hotspots in Cornwall/Devon"
  },
  {
    code: "IE",
    name: "Ireland",
    total: 3.8,
    cosmic: 0.35,
    terrestrial: 0.48,
    radon: 2.67,
    internal: 0.3,
    population: 5.1,
    notes: "Limestone karst raises radon"
  },
  {
    code: "US",
    name: "United States",
    total: 3.1,
    cosmic: 0.33,
    terrestrial: 0.3,
    radon: 2.28,
    internal: 0.29,
    population: 332,
    notes: "High altitude states (CO, NM) have elevated doses"
  },
  {
    code: "CA",
    name: "Canada",
    total: 2.9,
    cosmic: 0.36,
    terrestrial: 0.33,
    radon: 1.92,
    internal: 0.29,
    population: 38,
    notes: "Northern territories higher due to altitude/geology"
  },
  {
    code: "AU",
    name: "Australia",
    total: 1.8,
    cosmic: 0.3,
    terrestrial: 0.4,
    radon: 0.81,
    internal: 0.29,
    population: 26,
    notes: "Low-lying continent, low cosmic dose"
  },
  {
    code: "NZ",
    name: "New Zealand",
    total: 2.4,
    cosmic: 0.34,
    terrestrial: 0.5,
    radon: 1.27,
    internal: 0.29,
    population: 5.1,
    notes: "Volcanic geology in North Island"
  },
  {
    code: "JP",
    name: "Japan",
    total: 2.1,
    cosmic: 0.3,
    terrestrial: 0.46,
    radon: 1.05,
    internal: 0.29,
    population: 125,
    notes: "National average; mountains higher"
  },
  {
    code: "CN",
    name: "China",
    total: 3.1,
    cosmic: 0.34,
    terrestrial: 0.55,
    radon: 1.92,
    internal: 0.3,
    population: 1400,
    notes: "Tibetan plateau significantly increases cosmic dose"
  },
  {
    code: "RU",
    name: "Russia",
    total: 3.7,
    cosmic: 0.38,
    terrestrial: 0.52,
    radon: 2.51,
    internal: 0.29,
    population: 144,
    notes: "Ural mountains, Siberian geology"
  },
  {
    code: "UA",
    name: "Ukraine",
    total: 3.4,
    cosmic: 0.33,
    terrestrial: 0.54,
    radon: 2.24,
    internal: 0.29,
    population: 44,
    notes: "Granite-rich Chernobyl region"
  },
  {
    code: "IT",
    name: "Italy",
    total: 3.9,
    cosmic: 0.35,
    terrestrial: 0.58,
    radon: 2.67,
    internal: 0.29,
    population: 60,
    notes: "Volcanic Latium region; high tuff radon"
  },
  {
    code: "ES",
    name: "Spain",
    total: 3.6,
    cosmic: 0.36,
    terrestrial: 0.55,
    radon: 2.4,
    internal: 0.29,
    population: 47,
    notes: "Galicia region has high granite radon"
  },
  {
    code: "PT",
    name: "Portugal",
    total: 4.1,
    cosmic: 0.35,
    terrestrial: 0.55,
    radon: 2.91,
    internal: 0.29,
    population: 10.3,
    notes: "Uranium-rich geology in Alentejo"
  },
  {
    code: "PL",
    name: "Poland",
    total: 3.3,
    cosmic: 0.33,
    terrestrial: 0.52,
    radon: 2.15,
    internal: 0.3,
    population: 38,
    notes: "Sudety mountains with high radon"
  },
  {
    code: "GR",
    name: "Greece",
    total: 3.4,
    cosmic: 0.36,
    terrestrial: 0.58,
    radon: 2.17,
    internal: 0.29,
    population: 10.7,
    notes: "Aegean islands, marble geology"
  },
  {
    code: "BE",
    name: "Belgium",
    total: 3.2,
    cosmic: 0.33,
    terrestrial: 0.51,
    radon: 2.07,
    internal: 0.29,
    population: 11.6,
    notes: "Ardennes region has elevated radon"
  },
  {
    code: "NL",
    name: "Netherlands",
    total: 2,
    cosmic: 0.31,
    terrestrial: 0.4,
    radon: 1,
    internal: 0.29,
    population: 17.9,
    notes: "Sea-level, sedimentary geology"
  },
  {
    code: "DK",
    name: "Denmark",
    total: 2.8,
    cosmic: 0.32,
    terrestrial: 0.48,
    radon: 1.71,
    internal: 0.29,
    population: 5.9,
    notes: "Moraine clays increase radon"
  },
  {
    code: "KR",
    name: "South Korea",
    total: 3,
    cosmic: 0.3,
    terrestrial: 0.55,
    radon: 1.86,
    internal: 0.29,
    population: 51,
    notes: "Granite basement rock"
  },
  {
    code: "MX",
    name: "Mexico",
    total: 2.6,
    cosmic: 0.33,
    terrestrial: 0.5,
    radon: 1.48,
    internal: 0.29,
    population: 130,
    notes: "Mexico City elevated by altitude"
  },
  {
    code: "AR",
    name: "Argentina",
    total: 2.5,
    cosmic: 0.34,
    terrestrial: 0.46,
    radon: 1.41,
    internal: 0.29,
    population: 46,
    notes: "Andean regions higher"
  },
  {
    code: "ZA",
    name: "South Africa",
    total: 3.5,
    cosmic: 0.3,
    terrestrial: 0.92,
    radon: 1.99,
    internal: 0.29,
    population: 60,
    notes: "Gold/uranium mine regions"
  },
  {
    code: "NG",
    name: "Nigeria",
    total: 2.3,
    cosmic: 0.28,
    terrestrial: 0.52,
    radon: 1.21,
    internal: 0.29,
    population: 220,
    notes: "Basement complex rocks"
  },
  {
    code: "EG",
    name: "Egypt",
    total: 2.2,
    cosmic: 0.28,
    terrestrial: 0.65,
    radon: 0.98,
    internal: 0.29,
    population: 104,
    notes: "Desert phosphate deposits"
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    total: 2,
    cosmic: 0.27,
    terrestrial: 0.45,
    radon: 0.99,
    internal: 0.29,
    population: 35,
    notes: "Arid flat terrain"
  },
  {
    code: "TR",
    name: "Turkey",
    total: 3.3,
    cosmic: 0.35,
    terrestrial: 0.62,
    radon: 2.04,
    internal: 0.29,
    population: 85,
    notes: "Anatolian plateau"
  },
  {
    code: "PK",
    name: "Pakistan",
    total: 2.8,
    cosmic: 0.33,
    terrestrial: 0.55,
    radon: 1.63,
    internal: 0.29,
    population: 220,
    notes: "Himalayan foothills"
  },
  {
    code: "BD",
    name: "Bangladesh",
    total: 1.7,
    cosmic: 0.27,
    terrestrial: 0.3,
    radon: 0.84,
    internal: 0.29,
    population: 170,
    notes: "River delta, sedimentary soil"
  },
  {
    code: "TH",
    name: "Thailand",
    total: 2.4,
    cosmic: 0.28,
    terrestrial: 0.55,
    radon: 1.28,
    internal: 0.29,
    population: 72,
    notes: "World average"
  },
  {
    code: "ID",
    name: "Indonesia",
    total: 2.1,
    cosmic: 0.27,
    terrestrial: 0.48,
    radon: 1.06,
    internal: 0.29,
    population: 277,
    notes: "Tropical, sea-level majority"
  },
  {
    code: "PH",
    name: "Philippines",
    total: 2,
    cosmic: 0.27,
    terrestrial: 0.45,
    radon: 0.99,
    internal: 0.29,
    population: 112,
    notes: "Archipelago, mostly sea level"
  },
  {
    code: "MY",
    name: "Malaysia",
    total: 2.2,
    cosmic: 0.27,
    terrestrial: 0.52,
    radon: 1.12,
    internal: 0.29,
    population: 33,
    notes: "Tin-bearing granites in peninsula"
  },
  {
    code: "VN",
    name: "Vietnam",
    total: 2.3,
    cosmic: 0.28,
    terrestrial: 0.55,
    radon: 1.18,
    internal: 0.29,
    population: 98,
    notes: "Northern highlands raise average"
  },
  {
    code: "KE",
    name: "Kenya",
    total: 2.8,
    cosmic: 0.3,
    terrestrial: 0.58,
    radon: 1.63,
    internal: 0.29,
    population: 55,
    notes: "East African Rift geology"
  },
  {
    code: "ET",
    name: "Ethiopia",
    total: 3,
    cosmic: 0.32,
    terrestrial: 0.62,
    radon: 1.77,
    internal: 0.29,
    population: 126,
    notes: "High elevation plateau"
  },
  {
    code: "GH",
    name: "Ghana",
    total: 2.4,
    cosmic: 0.28,
    terrestrial: 0.55,
    radon: 1.28,
    internal: 0.29,
    population: 32,
    notes: "Basement complex granite"
  },
  {
    code: "MA",
    name: "Morocco",
    total: 2.6,
    cosmic: 0.3,
    terrestrial: 0.6,
    radon: 1.41,
    internal: 0.29,
    population: 37,
    notes: "Atlas Mountains phosphate"
  },
  {
    code: "UA",
    name: "Ukraine",
    total: 3.4,
    cosmic: 0.33,
    terrestrial: 0.54,
    radon: 2.24,
    internal: 0.29,
    population: 44,
    notes: "Granite-rich geology"
  },
  {
    code: "HU",
    name: "Hungary",
    total: 3.8,
    cosmic: 0.33,
    terrestrial: 0.55,
    radon: 2.63,
    internal: 0.29,
    population: 9.7,
    notes: "Uranium-rich geology in Mecsek hills"
  },
  {
    code: "RO",
    name: "Romania",
    total: 3.6,
    cosmic: 0.34,
    terrestrial: 0.55,
    radon: 2.42,
    internal: 0.29,
    population: 19,
    notes: "Carpathian granite, uranium deposits"
  },
  {
    code: "SK",
    name: "Slovakia",
    total: 4.5,
    cosmic: 0.34,
    terrestrial: 0.56,
    radon: 3.3,
    internal: 0.3,
    population: 5.5,
    notes: "High radon similar to Czechia"
  },
  {
    code: "SG",
    name: "Singapore",
    total: 1.6,
    cosmic: 0.26,
    terrestrial: 0.3,
    radon: 0.75,
    internal: 0.29,
    population: 5.9,
    notes: "Sea-level tropical, sedimentary"
  },
  {
    code: "NP",
    name: "Nepal",
    total: 5.1,
    cosmic: 0.68,
    terrestrial: 0.62,
    radon: 3.51,
    internal: 0.29,
    population: 30,
    notes: "Himalayan altitude, 3500m average"
  },
  {
    code: "BO",
    name: "Bolivia",
    total: 4.8,
    cosmic: 0.72,
    terrestrial: 0.52,
    radon: 3.27,
    internal: 0.29,
    population: 12,
    notes: "Altiplano at 3600m average"
  },
  {
    code: "PE",
    name: "Peru",
    total: 3.8,
    cosmic: 0.55,
    terrestrial: 0.55,
    radon: 2.41,
    internal: 0.29,
    population: 33,
    notes: "Andean highlands"
  },
  {
    code: "CO",
    name: "Colombia",
    total: 3.2,
    cosmic: 0.38,
    terrestrial: 0.52,
    radon: 2.01,
    internal: 0.29,
    population: 51,
    notes: "Andean cordillera"
  },
  {
    code: "CL",
    name: "Chile",
    total: 3.5,
    cosmic: 0.5,
    terrestrial: 0.55,
    radon: 2.16,
    internal: 0.29,
    population: 19,
    notes: "Atacama + Andes combination"
  },
  {
    code: "KZ",
    name: "Kazakhstan",
    total: 3.2,
    cosmic: 0.36,
    terrestrial: 0.66,
    radon: 1.89,
    internal: 0.29,
    population: 19,
    notes: "Uranium-rich steppes"
  }
];
const FILTER_LABELS = {
  total: "Total Background",
  cosmic: "Cosmic Rays",
  terrestrial: "Terrestrial (soil/rock)",
  radon: "Radon Gas",
  internal: "Internal (food/water)"
};
const FILTER_COLORS = {
  total: "#60a5fa",
  cosmic: "#a78bfa",
  terrestrial: "#34d399",
  radon: "#fb923c",
  internal: "#f472b6"
};
const DOSE_CONTEXT = [
  { label: "Dental X-ray", dose: 5e-3, color: "#4ade80" },
  { label: "Chest X-ray", dose: 0.02, color: "#86efac" },
  { label: "Transatlantic flight", dose: 0.08, color: "#a3e635" },
  {
    label: "World avg background (annual)",
    dose: 2.4,
    color: "#60a5fa",
    highlight: true
  },
  { label: "Mammogram", dose: 0.4, color: "#facc15" },
  { label: "CT abdomen", dose: 8, color: "#fb923c" },
  { label: "Annual occupational limit (IAEA)", dose: 20, color: "#f87171" },
  { label: "Acute radiation sickness threshold", dose: 1e3, color: "#ef4444" }
];
function getDoseColor(dose, mode) {
  const val = mode === "total" ? dose : dose;
  const thresholds = mode === "total" ? [
    [2, "#4ade80"],
    [3, "#86efac"],
    [4, "#facc15"],
    [5, "#fb923c"],
    [Number.POSITIVE_INFINITY, "#ef4444"]
  ] : [
    [0.3, "#4ade80"],
    [0.6, "#86efac"],
    [1, "#facc15"],
    [2, "#fb923c"],
    [Number.POSITIVE_INFINITY, "#ef4444"]
  ];
  for (const [thresh, color] of thresholds) {
    if (val < thresh) return color;
  }
  return "#ef4444";
}
const PIE_COLORS = ["#a78bfa", "#34d399", "#fb923c", "#f472b6"];
const COUNTRY_PATHS = [
  ["US", "M 80 130 L 200 130 L 210 180 L 180 200 L 90 195 L 75 160 Z"],
  ["CA", "M 80 60 L 215 60 L 215 130 L 200 130 L 80 130 Z"],
  ["MX", "M 90 195 L 180 200 L 170 235 L 145 240 L 120 230 L 105 215 Z"],
  ["CO", "M 145 280 L 190 275 L 195 310 L 150 315 Z"],
  ["PE", "M 150 315 L 195 310 L 190 350 L 155 355 Z"],
  ["BR", "M 190 275 L 255 265 L 265 330 L 230 365 L 190 350 L 195 310 Z"],
  ["AR", "M 155 355 L 190 350 L 200 395 L 175 430 L 155 415 Z"],
  ["BO", "M 155 315 L 190 310 L 195 355 L 155 355 Z"],
  ["CL", "M 148 355 L 155 355 L 175 430 L 163 435 Z"],
  ["GB", "M 380 95 L 395 95 L 398 118 L 378 120 Z"],
  ["IE", "M 368 100 L 380 95 L 378 120 L 366 115 Z"],
  ["IS", "M 340 68 L 368 65 L 365 82 L 338 82 Z"],
  ["NO", "M 400 65 L 435 60 L 440 95 L 405 100 L 400 78 Z"],
  ["SE", "M 420 68 L 440 65 L 445 100 L 430 105 L 418 90 Z"],
  ["FI", "M 440 65 L 475 60 L 480 90 L 450 100 L 440 95 Z"],
  ["DK", "M 412 100 L 430 98 L 428 112 L 410 112 Z"],
  ["NL", "M 395 118 L 412 115 L 412 128 L 395 128 Z"],
  ["BE", "M 395 128 L 412 128 L 412 140 L 395 140 Z"],
  ["DE", "M 412 108 L 445 105 L 450 140 L 412 140 L 412 108 Z"],
  ["FR", "M 380 130 L 412 128 L 412 165 L 385 168 L 375 150 Z"],
  ["ES", "M 375 160 L 412 165 L 410 185 L 388 190 L 368 180 Z"],
  ["PT", "M 368 160 L 375 160 L 370 190 L 362 185 Z"],
  ["IT", "M 412 155 L 435 152 L 440 185 L 425 200 L 415 195 L 410 175 Z"],
  ["GR", "M 440 185 L 460 183 L 462 200 L 442 202 Z"],
  ["AT", "M 430 138 L 458 136 L 460 150 L 430 152 Z"],
  ["CH", "M 408 148 L 428 146 L 428 158 L 408 160 Z"],
  ["CZ", "M 435 128 L 460 126 L 462 140 L 435 140 Z"],
  ["SK", "M 460 128 L 478 126 L 480 138 L 460 140 Z"],
  ["PL", "M 440 110 L 478 108 L 480 128 L 440 130 Z"],
  ["HU", "M 455 148 L 480 146 L 482 160 L 455 162 Z"],
  ["RO", "M 460 155 L 490 152 L 492 175 L 460 177 Z"],
  ["UA", "M 460 130 L 510 126 L 515 160 L 460 162 L 460 150 Z"],
  ["RU", "M 450 60 L 700 58 L 705 135 L 520 140 L 480 110 L 450 100 Z"],
  ["TR", "M 472 182 L 530 178 L 535 200 L 472 202 Z"],
  ["IR", "M 530 175 L 580 170 L 585 210 L 530 215 Z"],
  ["SA", "M 505 215 L 560 210 L 562 252 L 510 255 Z"],
  ["KZ", "M 530 120 L 600 115 L 605 160 L 535 165 Z"],
  ["PK", "M 580 170 L 620 165 L 625 205 L 585 208 Z"],
  ["IN", "M 590 200 L 640 195 L 648 270 L 610 275 L 600 245 L 590 225 Z"],
  ["NP", "M 622 193 L 648 190 L 648 205 L 622 207 Z"],
  ["BD", "M 648 210 L 665 208 L 665 225 L 648 226 Z"],
  ["CN", "M 600 110 L 720 105 L 730 195 L 665 200 L 625 205 L 600 160 Z"],
  ["JP", "M 730 148 L 748 145 L 752 178 L 735 180 Z"],
  ["KR", "M 715 168 L 730 166 L 730 182 L 715 183 Z"],
  ["TH", "M 658 220 L 680 218 L 678 248 L 658 248 Z"],
  ["VN", "M 678 220 L 695 218 L 698 255 L 678 256 Z"],
  ["MY", "M 660 255 L 705 255 L 705 270 L 660 268 Z"],
  ["ID", "M 660 268 L 760 265 L 760 300 L 660 298 Z"],
  ["PH", "M 700 230 L 730 228 L 730 268 L 700 266 Z"],
  ["SG", "M 670 268 L 678 268 L 678 275 L 670 273 Z"],
  ["AU", "M 660 320 L 790 318 L 792 400 L 660 398 Z"],
  ["NZ", "M 800 358 L 820 355 L 822 400 L 800 402 Z"],
  ["ZA", "M 450 330 L 495 328 L 498 380 L 450 378 Z"],
  ["KE", "M 498 268 L 525 266 L 525 300 L 498 300 Z"],
  ["ET", "M 495 248 L 530 245 L 530 268 L 498 268 Z"],
  ["NG", "M 412 268 L 445 266 L 445 300 L 412 298 Z"],
  ["GH", "M 395 268 L 412 266 L 412 298 L 395 296 Z"],
  ["EG", "M 460 200 L 500 198 L 500 235 L 460 237 Z"],
  ["MA", "M 375 195 L 415 192 L 415 228 L 375 230 Z"]
];
function RadiationMap() {
  const [filterMode, setFilterMode] = reactExports.useState("total");
  const [selectedCountry, setSelectedCountry] = reactExports.useState(
    null
  );
  const [hoveredCode, setHoveredCode] = reactExports.useState(null);
  const [tooltip, setTooltip] = reactExports.useState(null);
  const dataByCode = reactExports.useMemo(() => {
    const map = {};
    for (const d of RADIATION_DATA) map[d.code] = d;
    return map;
  }, []);
  const getValue = (c, mode) => c[mode];
  const WORLD_AVG = 2.4;
  const pieData = selectedCountry ? [
    { name: "Cosmic", value: selectedCountry.cosmic },
    { name: "Terrestrial", value: selectedCountry.terrestrial },
    { name: "Radon", value: selectedCountry.radon },
    { name: "Internal", value: selectedCountry.internal }
  ] : [
    { name: "Cosmic", value: 0.4 },
    { name: "Terrestrial", value: 0.48 },
    { name: "Radon", value: 1.15 },
    { name: "Internal", value: 0.29 }
  ];
  const barData = [...RADIATION_DATA].sort((a, b) => b.total - a.total).slice(0, 20).map((c) => ({
    name: c.code,
    dose: getValue(c, filterMode),
    full: c.total
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageHeader,
        {
          title: "Real-Time Radiation Background Map",
          subtitle: "Global natural background radiation levels by country — UNSCEAR 2008 dataset. Values represent annual effective dose from natural sources only (cosmic, terrestrial, radon, internal). Not live monitoring data.",
          audienceLevel: "intermediate"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3 mr-1" }),
              "Natural Background Only"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "border-blue-500/50 text-blue-400 bg-blue-500/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 mr-1" }),
              "60+ Countries"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "border-green-500/50 text-green-400 bg-green-500/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 mr-1" }),
              "UNSCEAR 2008 Source"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 md:px-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "bg-blue-950/40 border border-blue-700/40 rounded-xl p-4 md:p-5 flex gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-blue-400 mt-0.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-blue-300", children: "About Natural Background Radiation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                "Every person on Earth is exposed to natural ionizing radiation from four sources:",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: " cosmic rays" }),
                " (from space, higher at altitude),",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                  " ",
                  "terrestrial radiation"
                ] }),
                " ",
                "(from soil/rock minerals like uranium and thorium),",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: " radon gas" }),
                " (the dominant source — a radioactive gas that seeps from the ground into buildings), and",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "internal radiation" }),
                " ",
                "(from K-40 and C-14 in food and water). The world average is",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2.4 mSv/year" }),
                " (UNSCEAR 2008). This map shows natural background only — it does NOT show real-time or live radiation monitoring data."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.keys(FILTER_LABELS).map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `radiation.filter.${mode}`,
          onClick: () => setFilterMode(mode),
          className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${filterMode === mode ? "border-transparent text-background shadow-md" : "bg-muted/30 border-border text-muted-foreground hover:border-border hover:text-foreground"}`,
          style: filterMode === mode ? { backgroundColor: FILTER_COLORS[mode] } : {},
          children: FILTER_LABELS[mode]
        },
        mode
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
              "Choropleth — ",
              FILTER_LABELS[filterMode]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Click country for details" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "radiation.map", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                viewBox: "0 0 880 460",
                className: "w-full h-auto",
                style: { background: "oklch(0.14 0.02 240)" },
                "aria-label": "Global radiation dose map",
                role: "img",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Global radiation dose map" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "880", height: "460", fill: "oklch(0.14 0.02 240)" }),
                  [0, 115, 230, 345, 460].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: "0",
                      y1: y,
                      x2: "880",
                      y2: y,
                      stroke: "oklch(0.25 0.01 240)",
                      strokeWidth: "0.5"
                    },
                    y
                  )),
                  [0, 110, 220, 330, 440, 550, 660, 770, 880].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: x,
                      y1: "0",
                      x2: x,
                      y2: "460",
                      stroke: "oklch(0.25 0.01 240)",
                      strokeWidth: "0.5"
                    },
                    x
                  )),
                  COUNTRY_PATHS.map(([code, path]) => {
                    const country = dataByCode[code];
                    if (!country) return null;
                    const val = getValue(country, filterMode);
                    const fill = getDoseColor(val, filterMode);
                    const isHovered = hoveredCode === code;
                    const isSelected = (selectedCountry == null ? void 0 : selectedCountry.code) === code;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: path,
                        fill,
                        fillOpacity: isSelected ? 1 : isHovered ? 0.9 : 0.7,
                        stroke: isSelected ? "white" : isHovered ? "rgba(255,255,255,0.6)" : "oklch(0.30 0.01 240)",
                        strokeWidth: isSelected ? 2 : isHovered ? 1.5 : 0.8,
                        style: {
                          cursor: "pointer",
                          transition: "fill-opacity 0.15s, stroke-width 0.15s"
                        },
                        onMouseEnter: (e) => {
                          setHoveredCode(code);
                          const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                          const svgX = e.clientX - rect.left;
                          const svgY = e.clientY - rect.top;
                          setTooltip({ x: svgX, y: svgY, country });
                        },
                        onMouseLeave: () => {
                          setHoveredCode(null);
                          setTooltip(null);
                        },
                        onClick: () => setSelectedCountry(country),
                        onKeyDown: (e) => e.key === "Enter" && setSelectedCountry(country),
                        tabIndex: 0,
                        "data-ocid": `radiation.country.${code.toLowerCase()}`
                      },
                      code
                    );
                  }),
                  [
                    ["US", 140, 158],
                    ["CA", 145, 100],
                    ["RU", 575, 100],
                    ["CN", 660, 155],
                    ["BR", 220, 315],
                    ["AU", 720, 358],
                    ["IN", 615, 238]
                  ].map(([code, x, y]) => {
                    const country = dataByCode[code];
                    if (!country) return null;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x,
                        y,
                        fontSize: "9",
                        fill: "rgba(255,255,255,0.75)",
                        textAnchor: "middle",
                        pointerEvents: "none",
                        children: code
                      },
                      code
                    );
                  })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: tooltip && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.9 },
                className: "pointer-events-none absolute z-20 bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-xs",
                style: {
                  left: tooltip.x + 12,
                  top: tooltip.y - 40,
                  minWidth: 180
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: tooltip.country.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground mt-0.5", children: [
                    filterMode === "total" ? "Total" : FILTER_LABELS[filterMode],
                    ":",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-bold text-foreground", children: [
                      getValue(tooltip.country, filterMode).toFixed(2),
                      " mSv/y"
                    ] })
                  ] }),
                  filterMode === "total" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
                    "vs world avg:",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `ml-1 font-semibold ${tooltip.country.total > WORLD_AVG ? "text-orange-400" : "text-green-400"}`,
                        children: [
                          tooltip.country.total > WORLD_AVG ? "+" : "",
                          (tooltip.country.total - WORLD_AVG).toFixed(2),
                          " mSv/y"
                        ]
                      }
                    )
                  ] })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Scale (mSv/y):" }),
            [
              { label: "Low (<2)", color: "#4ade80" },
              { label: "Moderate (2–3)", color: "#86efac" },
              { label: "Elevated (3–4)", color: "#facc15" },
              { label: "High (4–5)", color: "#fb923c" },
              { label: "Very High (>5)", color: "#ef4444" }
            ].map(({ label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-3 h-3 rounded-sm",
                  style: { backgroundColor: color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
            ] }, label))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: selectedCountry ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            className: "bg-card border border-border rounded-2xl overflow-hidden",
            "data-ocid": "radiation.detail_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: selectedCountry.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "Population:",
                    " ",
                    selectedCountry.population >= 100 ? `${Math.round(selectedCountry.population)}M` : `${selectedCountry.population.toFixed(1)}M`
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedCountry(null),
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    "data-ocid": "radiation.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total Background Dose" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-lg font-bold",
                      style: {
                        color: getDoseColor(selectedCountry.total, "total")
                      },
                      children: [
                        selectedCountry.total.toFixed(1),
                        " mSv/y"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground leading-relaxed", children: selectedCountry.notes }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["cosmic", "terrestrial", "radon", "internal"].map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground capitalize", children: src }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                      selectedCountry[src].toFixed(2),
                      " mSv/y"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: {
                        width: `${selectedCountry[src] / selectedCountry.total * 100}%`
                      },
                      transition: { duration: 0.5, delay: i * 0.08 },
                      className: "h-full rounded-full",
                      style: { backgroundColor: PIE_COLORS[i] }
                    }
                  ) })
                ] }, src)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Pie,
                    {
                      data: pieData,
                      dataKey: "value",
                      nameKey: "name",
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 40,
                      outerRadius: 68,
                      paddingAngle: 3,
                      label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
                      labelLine: false,
                      children: pieData.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Cell,
                        {
                          fill: PIE_COLORS[idx % PIE_COLORS.length]
                        },
                        entry.name ?? String(idx)
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        background: "oklch(0.18 0.02 240)",
                        border: "1px solid oklch(0.30 0.01 240)",
                        borderRadius: 8,
                        fontSize: 11
                      },
                      formatter: (value) => [
                        `${value.toFixed(2)} mSv/y`
                      ]
                    }
                  )
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `rounded-lg px-3 py-2 text-xs text-center ${selectedCountry.total > WORLD_AVG ? "bg-orange-950/40 border border-orange-700/30 text-orange-300" : "bg-green-950/40 border border-green-700/30 text-green-300"}`,
                    children: selectedCountry.total > WORLD_AVG ? `${((selectedCountry.total / WORLD_AVG - 1) * 100).toFixed(0)}% above world average (${WORLD_AVG} mSv/y)` : `${((1 - selectedCountry.total / WORLD_AVG) * 100).toFixed(0)}% below world average (${WORLD_AVG} mSv/y)`
                  }
                )
              ] })
            ]
          },
          selectedCountry.code
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "bg-card border border-border rounded-2xl p-6 text-center",
            "data-ocid": "radiation.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Select a Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Click any country on the map to see a full radiation source breakdown and comparison to the world average." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "World average breakdown (2.4 mSv/y)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Pie,
                    {
                      data: pieData,
                      dataKey: "value",
                      nameKey: "name",
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 32,
                      outerRadius: 54,
                      paddingAngle: 3,
                      children: pieData.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Cell,
                        {
                          fill: PIE_COLORS[idx % PIE_COLORS.length]
                        },
                        `bar-${entry.name ?? idx}`
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        background: "oklch(0.18 0.02 240)",
                        border: "1px solid oklch(0.30 0.01 240)",
                        borderRadius: 8,
                        fontSize: 11
                      },
                      formatter: (value) => [
                        `${value.toFixed(2)} mSv/y`
                      ]
                    }
                  )
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mt-1", children: ["Cosmic", "Terrestrial", "Radon", "Internal"].map(
                  (s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-2 h-2 rounded-full",
                        style: { backgroundColor: PIE_COLORS[i] }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s })
                  ] }, s)
                ) })
              ] })
            ]
          },
          "empty"
        ) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground", children: [
            "Top 20 Countries by ",
            FILTER_LABELS[filterMode]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sorted descending. World average dashed line." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", style: { height: 280 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: barData,
            margin: { top: 5, right: 20, left: 0, bottom: 5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "oklch(0.25 0.01 240)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "name",
                  tick: { fontSize: 10, fill: "oklch(0.60 0 0)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 10, fill: "oklch(0.60 0 0)" },
                  unit: " mSv"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: "oklch(0.18 0.02 240)",
                    border: "1px solid oklch(0.30 0.01 240)",
                    borderRadius: 8,
                    fontSize: 11
                  },
                  formatter: (value) => [
                    `${value.toFixed(2)} mSv/y`,
                    FILTER_LABELS[filterMode]
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ReferenceLine,
                {
                  y: WORLD_AVG,
                  stroke: "#60a5fa",
                  strokeDasharray: "4 3",
                  label: {
                    value: "World avg",
                    position: "insideTopRight",
                    fontSize: 10,
                    fill: "#60a5fa"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "dose", radius: [3, 3, 0, 0], children: barData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: (selectedCountry == null ? void 0 : selectedCountry.code) === entry.name ? "white" : getDoseColor(entry.dose, filterMode),
                  fillOpacity: (selectedCountry == null ? void 0 : selectedCountry.code) === entry.name ? 1 : 0.85
                },
                entry.name
              )) })
            ]
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Dose Reference Scale (ALARA Framework)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Context for radiation doses. ALARA = As Low As Reasonably Achievable." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: DOSE_CONTEXT.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -10 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              className: `flex items-center gap-3 py-2 px-3 rounded-lg ${item.highlight ? "bg-blue-950/40 border border-blue-700/30" : ""}`,
              "data-ocid": `radiation.dose_ref.${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-3 h-3 rounded-full shrink-0",
                    style: { backgroundColor: item.color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-sm ${item.highlight ? "font-semibold text-foreground" : "text-muted-foreground"} truncate`,
                    children: item.label
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-mono font-medium",
                    style: { color: item.color },
                    children: item.dose >= 1 ? `${item.dose} mSv` : `${(item.dose * 1e3).toFixed(1)} μSv`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-2 bg-muted rounded-full overflow-hidden shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-all duration-500",
                    style: {
                      width: `${Math.min(100, (Math.log10(item.dose + 1e-3) + 3) / 6 * 100)}%`,
                      backgroundColor: item.color
                    }
                  }
                ) })
              ]
            },
            item.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4 leading-relaxed border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "ALARA principle:" }),
            " ",
            "Radiation protection follows the ALARA principle — doses should be kept As Low As Reasonably Achievable. Natural background radiation (world average 2.4 mSv/y) is unavoidable, but occupational and medical exposures are optimized to minimize unnecessary risk. The Linear No-Threshold (LNT) model used in radiation protection conservatively assumes no safe threshold exists, though evidence for harm at low doses (<100 mSv) remains limited."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Full Dataset — All Countries" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Source: UNSCEAR 2008 Report, Annex B. Values in mSv/year." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", "data-ocid": "radiation.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/30 border-b border-border", children: [
            "Country",
            "Total (mSv/y)",
            "Cosmic",
            "Terrestrial",
            "Radon",
            "Internal",
            "Notes"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-2.5 text-left text-muted-foreground font-semibold whitespace-nowrap",
              children: h
            },
            h
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [...RADIATION_DATA].sort((a, b) => b.total - a.total).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-border/50 cursor-pointer transition-colors ${(selectedCountry == null ? void 0 : selectedCountry.code) === c.code ? "bg-primary/10" : "hover:bg-muted/20"}`,
              onClick: () => setSelectedCountry(c),
              onKeyDown: (e) => e.key === "Enter" && setSelectedCountry(c),
              tabIndex: 0,
              "data-ocid": `radiation.table_row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground text-[10px]", children: c.code }),
                  c.name
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-2 text-right font-bold",
                    style: { color: getDoseColor(c.total, "total") },
                    children: c.total.toFixed(1)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: c.cosmic.toFixed(2) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: c.terrestrial.toFixed(2) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-2 text-right",
                    style: { color: "#fb923c" },
                    children: c.radon.toFixed(2)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground", children: c.internal.toFixed(2) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-muted-foreground max-w-xs truncate", children: c.notes })
              ]
            },
            `${c.code}-${i}`
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground border-t border-border pt-6 pb-2 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Data source:" }),
          " UNSCEAR 2008 Report, Volume I, Annex B: Exposures from natural radiation sources. United Nations Scientific Committee on the Effects of Atomic Radiation."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Disclaimer:" }),
          " This tool displays estimated annual average natural background radiation levels. Individual doses vary significantly based on altitude, building type, diet, and local geology. This is NOT a live radiation monitoring system."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "pt-1", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              className: "underline hover:text-foreground transition-colors",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "caffeine.ai"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  RadiationMap as default
};
