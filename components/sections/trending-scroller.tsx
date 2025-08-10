"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getPosterUrl } from "@/lib/tmdb-api";
import { Loader } from "@/components/ui/loader";

interface TrendingScrollerProps {
  movies: Array<{
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
  }>;
}

export function TrendingScroller({ movies }: TrendingScrollerProps) {
  const items = useMemo(() => movies.slice(0, 6), [movies]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const step = () => {
      el.scrollLeft =
        (el.scrollLeft + 0.3) % (el.scrollWidth - el.clientWidth || 1);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-cine-text-primary">
        Trending Reviews
      </h2>
      {items.length === 0 ? (
        <div className="flex justify-center py-8">
          <Loader label="Fetching trending" />
        </div>
      ) : null}
      <div
        ref={trackRef}
        className="group flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar cursor-grab active:cursor-grabbing"
      >
        {items.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ scale: 1.03 }}
            className="snap-center shrink-0 w-64 rounded-2xl bg-cine-surface/60 backdrop-blur border border-cine-surface/50 overflow-hidden shadow-sm transition-all hover:shadow-xl"
          >
            <Link href={`/movie/${m.id}`} className="block">
              <div className="relative aspect-[2/3]">
                <Image
                  src={getPosterUrl(m.poster_path) || "/placeholder.svg"}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="256px"
                />
              </div>
              <div className="p-4 space-y-1">
                <div className="line-clamp-1 font-medium text-cine-text-primary">
                  {m.title}
                </div>
                <div className="flex items-center gap-1 text-sm text-cine-text-secondary">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {m.vote_average?.toFixed(1) ?? "N/A"}
                </div>
                <p className="text-sm text-cine-text-secondary line-clamp-2">
                  {/* Placeholder for a short review snippet */}A standout among
                  audiences this week with compelling performances.
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
