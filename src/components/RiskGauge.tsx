import { useEffect, useId, useRef, useState } from "react";

export type RiskGaugeProps = {
  value: number;
  size?: number;
  thickness?: number;
  duration?: number;
  colors?: [string, string];
};

const clamp = (value: number) =>
  Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

const withAlpha = (hex: string, alpha: number) => {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;

  const value = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hex}${value}`;
};

export default function RiskGauge({
  value,
  size = 260,
  thickness = 22,
  duration = 1600,
  colors = ["#A5C6FF", "#3385FF"],
}: RiskGaugeProps) {
  const target = clamp(value);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const gradientId = `risk-gauge-${useId().replace(/:/g, "")}`;

  const outerPadding = 18;
  const radius = size / 2 - thickness / 2 - outerPadding;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  const [colorFrom, colorTo] = colors;

  useEffect(() => {
    const from = progressRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      progressRef.current = target;
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;

      const elapsed = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = from + (target - from) * eased;

      progressRef.current = current;
      setProgress(current);

      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return (
    <div
      className="relative mx-auto aspect-square w-full"
      style={{ maxWidth: size }}
      role="img"
      aria-label={`Skor risiko ${Math.round(target)} persen`}
    >
      <div
        className="absolute -inset-5 rounded-full opacity-40 blur-2xl"
        style={{ backgroundColor: colorTo }}
      />

      <div className="absolute inset-0 rounded-full bg-white shadow-[0_18px_45px_rgba(143,169,196,0.35)]" />

      <div
        className="absolute inset-[6%] rounded-full"
        style={{
          background: `radial-gradient(circle, #FFFFFF 50%, ${withAlpha(
            colorFrom,
            0.45
          )} 100%)`,
        }}
      />

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + thickness / 2 + outerPadding / 2}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.7}
          strokeWidth={2}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E7EFF9"
          strokeWidth={thickness}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: `drop-shadow(0 4px 12px ${colorTo}55)`,
          }}
        />
      </svg>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1">
        <p className="text-[52px] font-bold leading-none tracking-tight text-[#26384A] tabular-nums">
          {Math.round(progress)}
          <span className="text-[30px]">%</span>
        </p>
        <p className="text-[15px] text-[#667085]">Skor Anda</p>
      </div>
    </div>
  );
}
