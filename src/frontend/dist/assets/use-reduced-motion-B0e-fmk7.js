import { aP as hasReducedMotionListener, aQ as initPrefersReducedMotion, r as reactExports, aR as prefersReducedMotion } from "./index-DWzjlv-D.js";
function useReducedMotion() {
  !hasReducedMotionListener.current && initPrefersReducedMotion();
  const [shouldReduceMotion] = reactExports.useState(prefersReducedMotion.current);
  return shouldReduceMotion;
}
export {
  useReducedMotion as u
};
