import { S as Selection, r as root } from "./transform-HVroAnEf.js";
function select(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}
export {
  select as s
};
