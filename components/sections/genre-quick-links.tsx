"use client";

import Link from "next/link";
import type { Genre } from "@/lib/tmdb-api";

interface GenreQuickLinksProps {
  genres: Genre[];
}

export function GenreQuickLinks({ genres }: GenreQuickLinksProps) {
  const items = genres?.length
    ? genres
    : [
        { id: 28, name: "Action" },
        { id: 18, name: "Drama" },
        { id: 878, name: "Sci-Fi" },
        { id: 27, name: "Horror" },
        { id: 35, name: "Comedy" },
      ];

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-cine-text-primary">
        Genres
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {items.map((g) => (
          <Link
            key={g.id}
            href={`/discover?genre=${g.id}`}
            className="shrink-0 rounded-full border border-cine-surface/60 bg-cine-background/60 px-3 py-1 text-sm text-cine-text-secondary hover:text-cine-accent"
          >
            {g.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
