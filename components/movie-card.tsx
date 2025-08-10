"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Check } from "lucide-react";
import { getPosterUrl } from "@/lib/tmdb-api";
import { useEffect, useState } from "react";
import {
  addToWatchlist,
  isInWatchlist,
  type WatchlistItem,
} from "@/lib/watchlist";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  };
}

export function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const voteAverage = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(isInWatchlist(movie.id));
    const onChange = () => setAdded(isInWatchlist(movie.id));
    window.addEventListener("watchlist:changed", onChange as any);
    return () =>
      window.removeEventListener("watchlist:changed", onChange as any);
  }, [movie.id]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (added) return;
    const item: WatchlistItem = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      media_type: "movie",
    };
    addToWatchlist(item);
    setAdded(true);
    // trigger full-screen celebration
    const evt = new CustomEvent("cinehive:celebrate", {
      detail: { title: movie.title },
    });
    window.dispatchEvent(evt);
  };

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block overflow-hidden rounded-2xl transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg bg-cine-surface"
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={getPosterUrl(movie.poster_path) || "/placeholder.svg"}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
          priority // For trending movies on landing page
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-semibold text-cine-text-primary line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-sm text-cine-text-secondary">{releaseYear}</p>
          <div className="flex items-center gap-1 text-sm text-cine-text-primary">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{voteAverage}</span>
          </div>
          <button
            onClick={handleAdd}
            className={`mt-3 inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-sm transition ${
              added
                ? "bg-emerald-600/90 text-white"
                : "bg-cine-accent/90 text-cine-text-primary hover:bg-cine-accent"
            }`}
          >
            {added ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {added ? "Added" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </Link>
  );
}
