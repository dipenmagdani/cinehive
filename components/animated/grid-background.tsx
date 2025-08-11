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
  lineColor = "rgba(255,255,255,0.08)",
  minorStep = 26,
  majorStep = 120,
  shimmerColor = "rgba(255,255,255,0.12)",
}: GridBackgroundProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      style={{ backgroundColor: baseColor }}
    >
      {/* Grid layers with subtle movement */}
      <motion.div
        className="absolute inset-0"
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
          opacity: 0.3,
        }}
        initial={{ backgroundPosition: "0px 0px, 0px 0px" }}
        animate={{ backgroundPosition: [
          "0px 0px, 0px 0px",
          "0px 30px, 30px 0px",
          "0px 0px, 0px 0px",
        ]}}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Major grid accent lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.15),
              rgba(255,255,255,0.15) 2px,
              transparent 2px,
              transparent ${majorStep}px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.15),
              rgba(255,255,255,0.15) 2px,
              transparent 2px,
              transparent ${majorStep}px
            )
          `,
          opacity: 0.2,
        }}
        initial={{ backgroundPosition: "0px 0px, 0px 0px" }}
        animate={{ backgroundPosition: [
          "0px 0px, 0px 0px",
          "0px 50px, 50px 0px",
          "0px 0px, 0px 0px",
        ]}}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dark vignette overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),rgba(0,0,0,0.8)_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_20%,transparent_80%,rgba(0,0,0,0.8))]" />

      {/* Enhanced center-origin radial shimmer pulses */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ 
          scale: [0.1, 1.2, 1.5], 
          opacity: [0, 0.8, 0] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatDelay: 1
        }}
        style={{
          width: "200vmax",
          height: "200vmax",
          background: `radial-gradient(circle, ${shimmerColor} 0%, rgba(255,255,255,0.08) 25%, transparent 60%)`,
          filter: "blur(20px)",
          borderRadius: "9999px",
        }}
      />
      
      {/* Secondary pulse wave */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.05, opacity: 0 }}
        animate={{ 
          scale: [0.05, 1.0, 1.3], 
          opacity: [0, 0.6, 0] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2,
          repeatDelay: 1
        }}
        style={{
          width: "180vmax",
          height: "180vmax",
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 20%, transparent 55%)`,
          filter: "blur(25px)",
          borderRadius: "9999px",
        }}
      />

      {/* Expanding ring shimmer waves */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ 
          scale: [0.3, 1.4], 
          opacity: [0, 0.7, 0] 
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          width: "150vmax",
          height: "150vmax",
          background: "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.3) 48%, rgba(255,255,255,0) 56%, rgba(255,255,255,0) 100%)",
          filter: "blur(8px)",
          borderRadius: "9999px",
          mixBlendMode: "screen",
        }}
      />
      
      {/* Secondary ring wave */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ 
          scale: [0.2, 1.2], 
          opacity: [0, 0.5, 0] 
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.2
        }}
        style={{
          width: "130vmax",
          height: "130vmax",
          background: "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.25) 44%, rgba(255,255,255,0) 52%, rgba(255,255,255,0) 100%)",
          filter: "blur(12px)",
          borderRadius: "9999px",
          mixBlendMode: "screen",
        }}
      />

      {/* Slow rotating highlight */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.06) 20deg, transparent 60deg)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

export const GridBackground = memo(GridBackgroundComponent);