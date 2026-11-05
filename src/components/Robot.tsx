import { useState } from "react";

type RobotMotion = "float" | "bob" | "sway";

type RobotProps = {
  src: string;
  alt: string;
  className?: string;
  motion?: RobotMotion;
  interactive?: boolean;
};

export default function Robot({
  src,
  alt,
  className = "",
  motion = "float",
  interactive = false,
}: RobotProps) {
  const [pokes, setPokes] = useState(0);

  function poke() {
    setPokes((value) => value + 1);
  }

  return (
    <img
      key={pokes}
      src={src}
      alt={alt}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${alt}. Klik untuk mengajak bergerak.` : undefined}
      onClick={interactive ? poke : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                poke();
              }
            }
          : undefined
      }
      draggable={false}
      onAnimationEnd={interactive ? () => setPokes(0) : undefined}
      className={`${pokes > 0 ? "robot-hop" : `robot-${motion}`} ${
        interactive ? "robot-hover cursor-pointer select-none" : ""
      } ${className}`}
    />
  );
}
