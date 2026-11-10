import { motion, useReducedMotion } from "motion/react";

const MotionSpan = motion.span;

const heads = {
  x: "left-full top-1/2 -translate-y-1/2 border-y-[6px] border-l-[9px] border-y-transparent border-l-current",
  y: "top-full left-1/2 -translate-x-1/2 border-x-[6px] border-t-[9px] border-x-transparent border-t-current",
};

// Decorative connector line in the current text color. It draws itself once from its
// origin (on load, or when scrolled into view), then stays put. Position it with className.
export default function Wire({ axis = "y", delay = 0, onLoad = false, head = false, className = "" }) {
  const still = useReducedMotion();
  const scale = axis === "x" ? "scaleX" : "scaleY";
  const done = { [scale]: 1 };

  return (
    <MotionSpan
      aria-hidden="true"
      className={`pointer-events-none absolute block bg-current ${axis === "x" ? "h-0.5" : "w-0.5"} ${className}`}
      style={{ transformOrigin: axis === "x" ? "left center" : "center top" }}
      initial={still ? false : { [scale]: 0 }}
      {...(onLoad ? { animate: done } : { whileInView: done, viewport: { once: true, margin: "0px 0px -40px 0px" } })}
      transition={{ duration: 0.55, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {head && <span className={`absolute block h-0 w-0 ${heads[axis]}`} />}
    </MotionSpan>
  );
}
