import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Static starfield: tiled dots in the contrast color, no extra elements, no animation cost.
const star = (x, y, a) =>
  `radial-gradient(1.5px 1.5px at ${x} ${y}, color-mix(in srgb, var(--color-contrast) ${a}%, transparent) 50%, transparent 51%)`;
const STARFIELD = {
  backgroundImage: [
    star("12%", "18%", 90), star("47%", "64%", 70), star("83%", "31%", 85), star("29%", "86%", 60),
    star("64%", "9%", 75), star("6%", "57%", 55), star("91%", "78%", 65), star("38%", "40%", 45),
  ].join(","),
  backgroundSize: "220px 160px, 220px 160px, 220px 160px, 220px 160px, 310px 230px, 310px 230px, 310px 230px, 310px 230px",
};

// Small seeded PRNG so the starting layout is the same on every load.
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Technology icons drifting through space and bouncing off the frame's walls.
// Positions live in refs and are written straight to style.transform, so React never re-renders per frame.
export default function TechSpace({ items, className = "" }) {
  const boxRef = useRef(null);
  const iconRefs = useRef([]);
  const still = useReducedMotion();

  useEffect(() => {
    const box = boxRef.current;
    const els = iconRefs.current.slice(0, items.length);
    const rand = seeded(7);
    let W = 0, H = 0, S = 0;
    let bodies = null;
    let frame = 0, last = 0, visible = false;

    const place = () => els.forEach((el, i) => (el.style.transform = `translate3d(${bodies[i].x}px, ${bodies[i].y}px, 0)`));

    const measure = () => {
      W = box.clientWidth;
      H = box.clientHeight;
      S = Math.round(Math.min(44, Math.max(22, W * 0.045)));
      box.style.setProperty("--icon", `${S}px`);
      if (!bodies) {
        // spread over a jittered grid so nothing starts stacked
        const cols = Math.ceil(Math.sqrt((items.length * W) / Math.max(H, 1)));
        const rows = Math.ceil(items.length / cols);
        bodies = items.map((_, i) => {
          const angle = rand() * Math.PI * 2;
          const speed = 30 + rand() * 40; // px per second
          return {
            x: ((i % cols) + 0.2 + rand() * 0.6) * (W / cols) - S / 2,
            y: (Math.floor(i / cols) + 0.2 + rand() * 0.6) * (H / rows) - S / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
          };
        });
      }
      for (const b of bodies) {
        b.x = Math.min(Math.max(b.x, 0), W - S);
        b.y = Math.min(Math.max(b.y, 0), H - S);
      }
      place();
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const b of bodies) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x <= 0 || b.x >= W - S) {
          b.vx = -b.vx;
          b.x = Math.min(Math.max(b.x, 0), W - S);
        }
        if (b.y <= 0 || b.y >= H - S) {
          b.vy = -b.vy;
          b.y = Math.min(Math.max(b.y, 0), H - S);
        }
      }
      place();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (still || frame || !visible) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = new ResizeObserver(measure);
    resize.observe(box);
    measure();

    // only animate while the frame is on screen
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    view.observe(box);

    return () => {
      stop();
      resize.disconnect();
      view.disconnect();
    };
  }, [items, still]);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className={`relative overflow-hidden bg-ink text-contrast ${className}`}
      style={STARFIELD}
    >
      {items.map((item, i) => (
        <span
          key={item.name}
          ref={(el) => (iconRefs.current[i] = el)}
          className="absolute top-0 left-0 flex size-(--icon) items-center justify-center text-(length:--icon) will-change-transform"
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}
