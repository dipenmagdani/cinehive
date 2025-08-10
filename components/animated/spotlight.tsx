"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export function SpotlightContainer({ children }: PropsWithChildren) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cine-accent/10 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cine-accent/10 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </div>
  );
}
