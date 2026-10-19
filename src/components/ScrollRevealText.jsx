import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const MotionSpan = motion.span;

function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <MotionSpan style={{ opacity: still ? 1 : opacity }}>{children} </MotionSpan>;
}

// Paragraph whose words light up one by one as it scrolls through the viewport.
export default function ScrollRevealText({ text, className }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={still}>
          {word}
        </Word>
      ))}
    </p>
  );
}
