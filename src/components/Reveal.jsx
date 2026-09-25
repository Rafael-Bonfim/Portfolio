import { motion, useReducedMotion } from "motion/react";

const MotionDiv = motion.div;

// Fades content in and up once it scrolls into view.
export default function Reveal({ children, delay = 0, className }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionDiv
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionDiv>
  );
}
