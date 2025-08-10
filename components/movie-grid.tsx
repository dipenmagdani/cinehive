"use client";

import { MovieCard } from "@/components/movie-card";
import { motion } from "framer-motion";

export function MovieGrid({ movies }: { movies: any[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.06 } },
      }}
      className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      {movies.map((m) => (
        <motion.div
          key={m.id}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <MovieCard movie={m} />
        </motion.div>
      ))}
    </motion.div>
  );
}
