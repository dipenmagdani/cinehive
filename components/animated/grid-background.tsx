"use client";

import { memo } from "react";
import { motion } from "framer-motion";

type GridBackgroundProps = {
  baseColor?: string;
  lineColor?: string;
  minorStep?: number;
  majorStep?: number;
  shimmerColor?: string;
};

function GridBackgroundComponent({
  baseColor = "#0B0B0B",
  lineColor = "rgba(212,175,55,0.18)",
  minorStep = 26,
  majorStep = 120,
  shimmerColor = "rgba(212,175,55,0.14)",
}: GridBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      style={{ backgroundColor: baseColor }}
    >
      {/* Grid layers with CSS animation (more reliable than Framer Motion for background-position) */}
      <div
        className="absolute inset-0 animate-grid-drift"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              ${lineColor},
              ${lineColor} 1px,
              transparent 1px,
              transparent ${minorStep}px
            ),
            repeating-linear-gradient(
              90deg,
              ${lineColor},
              ${lineColor} 1px,
              transparent 1px,
              transparent ${minorStep}px
            )
          `,
          opacity: 0.25,
        }}
      />

      {/* Major grid accent lines */}
      <div
        className="absolute inset-0 animate-grid-drift-slow"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(212,175,55,0.42),
              rgba(212,175,55,0.42) 2px,
              transparent 2px,
              transparent ${majorStep}px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(212,175,55,0.42),
              rgba(212,175,55,0.42) 2px,
              transparent 2px,
              transparent ${majorStep}px
            )
          `,
          opacity: 0.18,
        }}
      />

      {/* Vignette overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),transparent_20%,transparent_80%,rgba(0,0,0,0.55))]" />

      {/* Center-origin radial shimmer pulses */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.15, opacity: 0 }}
        animate={{ scale: [0.15, 1.0, 1.35], opacity: [0.0, 0.75, 0.0] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "160vmax",
          height: "160vmax",
          background: `radial-gradient(circle, ${shimmerColor} 0%, rgba(212,175,55,0.35) 30%, transparent 65%)`,
          filter: "blur(16px)",
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: [0.1, 0.9, 1.25], opacity: [0.0, 0.55, 0.0] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
        style={{
          width: "160vmax",
          height: "160vmax",
          background: `radial-gradient(circle, ${shimmerColor} 0%, rgba(212,175,55,0.25) 28%, transparent 62%)`,
          filter: "blur(24px)",
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
      />

      {/* Pulsating ring shimmer waves */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.6, opacity: 0.0 }}
        animate={{ scale: [0.6, 1.15], opacity: [0.0, 0.55, 0.0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "130vmax",
          height: "130vmax",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.0) 0%, rgba(212,175,55,0.0) 45%, rgba(212,175,55,0.35) 52%, rgba(212,175,55,0.0) 60%, rgba(212,175,55,0.0) 100%)",
          filter: "blur(10px)",
          borderRadius: "9999px",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.5, opacity: 0.0 }}
        animate={{ scale: [0.5, 1.05], opacity: [0.0, 0.45, 0.0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        style={{
          width: "120vmax",
          height: "120vmax",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.0) 0%, rgba(212,175,55,0.0) 40%, rgba(212,175,55,0.3) 48%, rgba(212,175,55,0.0) 58%, rgba(212,175,55,0.0) 100%)",
          filter: "blur(12px)",
          borderRadius: "9999px",
          mixBlendMode: "screen",
        }}
      />

      {/* Slow rotating highlight for continuous motion */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(212,175,55,0.12) 30deg, transparent 90deg)",
          mixBlendMode: "screen",
        }}
      />
      
      {/* CSS keyframes for grid animation */}
      <style jsx>{`
        @keyframes grid-drift {
          0%, 100% { background-position: 0px 0px, 0px 0px; }
          50% { background-position: 0px 40px, 40px 0px; }
        }
        @keyframes grid-drift-slow {
          0%, 100% { background-position: 0px 0px, 0px 0px; }
          50% { background-position: 0px 60px, 60px 0px; }
        }
        .animate-grid-drift {
          animation: grid-drift 16s ease-in-out infinite;
        }
        .animate-grid-drift-slow {
          animation: grid-drift-slow 28s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export const GridBackground = memo(GridBackgroundComponent);