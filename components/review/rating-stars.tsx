"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface RatingStarsProps {
  value?: number;
  onChange?: (val: number) => void;
}

export function RatingStars({ value = 0, onChange }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= value;
        return (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onChange?.(i)}
            className="p-1 rounded-full"
          >
            <Star
              className={
                active
                  ? "h-6 w-6 text-yellow-400 fill-yellow-400"
                  : "h-6 w-6 text-cine-text-secondary"
              }
            />
          </motion.button>
        );
      })}
    </div>
  );
}
