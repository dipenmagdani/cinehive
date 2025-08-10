"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getBackdropUrl } from "@/lib/tmdb-api";

interface FeaturedProps {
  movie?: {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string | null;
    genre_ids?: number[];
  };
  genreNames?: string[];
}

export function FeaturedOfWeek({ movie, genreNames = [] }: FeaturedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  if (!movie) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-cine-surface/50 bg-cine-surface"
      aria-labelledby="featured-heading"
    >
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src={getBackdropUrl(movie.backdrop_path) || "/placeholder.svg"}
          alt="Featured background"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-cine-accent/10 via-transparent to-cine-accent/10" />
      <div className="relative z-10 p-6 md:p-10">
        <h2
          id="featured-heading"
          className="text-2xl md:text-3xl font-semibold text-cine-text-primary"
        >
          Featured Movie of the Week
        </h2>
        <p className="mt-2 text-lg md:text-xl text-cine-text-primary">
          {movie.title}
        </p>
        {genreNames.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {genreNames.slice(0, 5).map((g) => (
              <span
                key={g}
                className="rounded-full border border-cine-surface/60 bg-cine-background/60 px-2.5 py-0.5 text-xs text-cine-text-secondary"
              >
                {g}
              </span>
            ))}
          </div>
        )}
        <p className="mt-2 max-w-2xl text-cine-text-secondary line-clamp-3">
          {movie.overview}
        </p>
        <Link
          href={`/movie/${movie.id}`}
          className="mt-4 inline-block rounded-full bg-cine-accent px-5 py-2 font-medium text-cine-text-primary hover:bg-cine-accent/90"
        >
          Read Reviews
        </Link>
      </div>
    </motion.section>
  );
}
