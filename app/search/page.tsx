"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { MovieCard } from "@/components/movie-card";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (query.length > 2) {
        const res = await fetch(
          `/api/tmdb/search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data?.results || []);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1 container px-4 py-10 md:px-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cine-text-secondary" />
          <Input
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-full bg-cine-surface border-cine-surface/50"
          />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
