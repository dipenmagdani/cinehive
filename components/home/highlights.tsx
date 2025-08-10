"use client";

import { motion } from "framer-motion";
import { ReviewCard } from "@/components/review/review-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TiltCard } from "@/components/animated/tilt-card";

interface HighlightProps {
  featuredMovie?: { id: number; title: string; overview: string };
}

const mockReviews = [
  {
    author: "Ava",
    rating: 4.5,
    content: "A masterclass in tension and character arcs.",
    createdAt: "2h ago",
  },
  {
    author: "Liam",
    rating: 4.0,
    content: "Gorgeous cinematography and a haunting score.",
    createdAt: "5h ago",
  },
  {
    author: "Noah",
    rating: 5.0,
    content: "Best movie this year. A must-watch in theaters.",
    createdAt: "1d ago",
  },
  {
    author: "Mia",
    rating: 3.5,
    content: "Great first half, slightly uneven finale but worth it.",
    createdAt: "2d ago",
  },
];

export function Highlights({ featuredMovie }: HighlightProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-cine-text-primary">
            Trending Reviews
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {mockReviews.slice(0, 4).map((r, idx) => (
              <TiltCard key={idx}>
                <ReviewCard {...r} />
              </TiltCard>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-cine-surface p-6 border border-cine-surface/50">
          <h3 className="text-lg font-semibold text-cine-text-primary">
            Quick Genres
          </h3>
          <GenreChips />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MiniStat label="Reviews Written" value="12,480" />
          <MiniStat label="Active Members" value="3,211" />
          <MiniStat label="Movies Covered" value="8,902" />
          <MiniStat label="Avg. Rating" value="4.1/5" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl bg-cine-surface p-6 border border-cine-surface/50">
          <h2 className="text-xl font-semibold text-cine-text-primary">
            Featured Movie of the Week
          </h2>
          <p className="mt-2 text-cine-text-secondary line-clamp-4">
            {featuredMovie?.overview ||
              "Hand-picked by our editors for its storytelling and craft. Explore reviews from the community."}
          </p>
          {featuredMovie && (
            <Button asChild className="mt-4 rounded-full">
              <Link href={`/movie/${featuredMovie.id}`}>Read Reviews</Link>
            </Button>
          )}
        </div>

        <div className="rounded-2xl bg-cine-surface p-6 border border-cine-surface/50">
          <h3 className="text-lg font-semibold text-cine-text-primary">
            Community Activity
          </h3>
          <div className="mt-3 space-y-2 text-sm text-cine-text-secondary">
            <TickerItem text="John reviewed Oppenheimer — ★★★★☆" />
            <TickerItem text="Sara reviewed Dune: Part Two — ★★★★★" />
            <TickerItem text="Ken added Poor Things to Watchlist" />
            <TickerItem text="Maya reviewed The Zone of Interest — ★★★★☆" />
          </div>
        </div>

        <div className="rounded-2xl bg-cine-surface p-6 border border-cine-surface/50">
          <h3 className="text-lg font-semibold text-cine-text-primary">
            Top Reviewers (This Month)
          </h3>
          <div className="mt-3 space-y-2 text-sm text-cine-text-secondary">
            <div>• Ava — 128 upvotes</div>
            <div>• Liam — 102 upvotes</div>
            <div>• Noah — 97 upvotes</div>
            <div>• Mia — 84 upvotes</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-cine-surface p-5 border border-cine-surface/50">
      <div className="text-sm text-cine-text-secondary">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-cine-text-primary">
        {value}
      </div>
    </div>
  );
}

function TickerItem({ text }: { text: string }) {
  return (
    <div className="rounded-full bg-cine-background/60 px-4 py-2">{text}</div>
  );
}

function GenreChips() {
  const [genres, setGenres] = useState<Array<{ id: number; name: string }>>([]);
  useEffect(() => {
    fetch("/api/tmdb/genres")
      .then((r) => r.json())
      .then((d) => setGenres(d.genres || []))
      .catch(() => setGenres([]));
  }, []);
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
      {genres.length === 0 ? (
        <div className="py-1 px-3">
          <span className="text-cine-text-secondary">Loading genres…</span>
        </div>
      ) : (
        (genres.length ? genres : defaultGenres).map((g) => (
          <Link
            key={g.id}
            href={`/discover?genre=${g.id}`}
            className="shrink-0 rounded-full border border-cine-surface/60 bg-cine-background/60 px-3 py-1 text-sm text-cine-text-secondary hover:text-cine-accent"
          >
            {g.name}
          </Link>
        ))
      )}
    </div>
  );
}

const defaultGenres = [
  { id: 28, name: "Action" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
  { id: 27, name: "Horror" },
  { id: 35, name: "Comedy" },
];
