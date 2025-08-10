"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { PropsWithChildren } from "react";

export function TiltCard({ children }: PropsWithChildren) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" as any }}
      className="[perspective:1000px] will-change-transform"
    >
      {children}
    </motion.div>
  );
}
