"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

type HoneycombBackgroundProps = {
  rows?: number;
  cols?: number;
  cellSize?: number; // pixel size of each hex cell width
  baseColor?: string; // background base, default #0F1315
  accentColor?: string; // pulse color, default #06B6D4
};

/**
 * Full-screen animated honeycomb background with a subtle pulsing wave.
 * Uses CSS clip-path for hexagons and Framer Motion for staggered animations.
 */
function HoneycombBackgroundComponent({
  rows = 24,
  cols = 30,
  cellSize = 64,
  baseColor = "#0F1315",
  accentColor = "#06B6D4",
}: HoneycombBackgroundProps) {
  const cells = useMemo(() => {
    const result: Array<{ row: number; col: number; key: string; delay: number }> = [];
    const periodBuckets = 12; // controls how many distinct phases across the grid
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const idx = r * cols + c;
        const phase = idx % periodBuckets;
        const delay = phase * 0.12; // stagger between phases
        result.push({ row: r, col: c, key: `${r}-${c}`, delay });
      }
    }
    return result;
  }, [rows, cols]);

  const cellHeight = useMemo(() => Math.round(cellSize * 0.866), [cellSize]); // height of hex given width

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      style={{ backgroundColor: baseColor }}
    >
      {/* Subtle vignette overlay for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_20%,transparent_80%,rgba(0,0,0,0.5))]" />

      {/* Honeycomb grid */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: cols * cellSize + cellSize,
          height: rows * cellHeight + cellHeight,
        }}
      >
        {cells.map(({ row, col, key, delay }) => {
          const isOddRow = row % 2 === 1;
          const x = col * cellSize + (isOddRow ? cellSize / 2 : 0);
          const y = row * cellHeight;
          return (
            <motion.div
              key={key}
              className="absolute"
              style={{ left: x, top: y, width: cellSize, height: cellHeight }}
            >
              <motion.div
                initial={{
                  opacity: 0.35,
                  scale: 1,
                  backgroundColor: baseColor,
                  boxShadow: "0 0 0px rgba(6,182,212,0)",
                }}
                animate={{
                  opacity: [0.35, 0.85, 0.35],
                  scale: [1, 1.06, 1],
                  backgroundColor: [baseColor, "#0E171B", baseColor],
                  boxShadow: [
                    "0 0 0px rgba(6,182,212,0)",
                    "0 0 24px rgba(6,182,212,0.40)",
                    "0 0 0px rgba(6,182,212,0)",
                  ],
                }}
                transition={{
                  duration: 3.2,
                  delay,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  clipPath:
                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                  border: `1px solid ${accentColor}33`,
                  backgroundImage: `radial-gradient(circle at 50% 45%, ${accentColor}24, transparent 60%)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export const HoneycombBackground = memo(HoneycombBackgroundComponent);


