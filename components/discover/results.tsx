"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

export function DiscoverResults() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const genre = searchParams?.get("genre") ?? null;
        const url = new URL(`/api/tmdb/discover`, window.location.origin);
        url.searchParams.set("page", String(page));
        if (genre) url.searchParams.set("genre", genre);
        const res = await fetch(url.toString());
        const data = await res.json();
        setMovies((prev) => [...prev, ...(data?.results || [])]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, searchParams]);

  useEffect(() => {
    // reset when genre changes
    setMovies([]);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("genre")]);

  return (
    <div>
      {loading && movies.length === 0 ? (
        <div className="flex justify-center py-12">
          <Loader label="Loading movies" size={28} />
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((m) => (
          <MovieCard key={`${m.id}-${m.release_date}-${m.title}`} movie={m} />
        ))}
      </div>
      <div className="flex justify-center py-10">
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="rounded-full"
        >
          {loading ? <Loader label="Loading" /> : "Load more"}
        </Button>
      </div>
    </div>
  );
}
