const CHARS = " .:-=+*#%@";
const COLS = 360;
const ROWS = 9;

// Deterministic wave pattern rendered as characters, computed once at import.
const art = Array.from({ length: ROWS }, (_, y) =>
  Array.from({ length: COLS }, (_, x) => {
    const v =
      Math.sin(x * 0.07 + y * 0.6) +
      Math.sin(x * 0.023 - y * 0.35) +
      Math.cos(Math.hypot(x - 180, y * 6) * 0.06);
    return CHARS[Math.min(CHARS.length - 1, Math.floor(((v + 3) / 6) * CHARS.length))];
  }).join("")
).join("\n");

export default function AsciiBand() {
  return (
    <pre
      aria-hidden="true"
      className="relative z-10 overflow-hidden py-6 font-mono text-[11px] leading-[1.15] text-zinc-600 select-none"
    >
      {art}
    </pre>
  );
}
