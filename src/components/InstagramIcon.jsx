import { useId } from "react";
import { SiInstagram } from "react-icons/si";

// Official Instagram glyph filled with the brand's radial gradient.
export default function InstagramIcon({ size = 18, className }) {
  const gradientId = `ig-${useId().replace(/[^\w-]/g, "")}`;

  return (
    <span className={`relative inline-flex ${className ?? ""}`} aria-hidden="true">
      <svg width="0" height="0" className="absolute">
        <defs>
          <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285aeb" />
          </radialGradient>
        </defs>
      </svg>
      <SiInstagram size={size} fill={`url(#${gradientId})`} />
    </span>
  );
}
