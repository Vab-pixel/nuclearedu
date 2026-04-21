import { g as generateCategoricalChart, B as Bar, f as formatAxisMap } from "./generateCategoricalChart-BCXr-Xg0.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DOCRXNFP.js";
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
export {
  BarChart as B
};
