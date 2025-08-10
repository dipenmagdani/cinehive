"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getPosterUrl } from "@/lib/tmdb-api";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { Loader } from "@/components/ui/loader";

interface MovieSearchResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length > 2) {
        setIsLoading(true);
        try {
          const res = await fetch(
            `/api/tmdb/search?query=${encodeURIComponent(debouncedQuery)}`
          );
          const data = await res.json();
          setResults((data?.results || []).slice(0, 5));
          setIsOpen(true);
        } catch (e) {
          setResults([]);
          setIsOpen(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cine-text-secondary" />
      <Input
        type="text"
        placeholder="Search for movies..."
        className="w-full rounded-full bg-cine-surface pl-10 pr-4 py-2 text-cine-text-primary border border-cine-surface/50 focus:border-cine-accent focus:ring-1 focus:ring-cine-accent transition-all duration-200"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() =>
          query.length > 2 && results.length > 0 && setIsOpen(true)
        }
      />
      {isOpen && (results.length > 0 || isLoading || query.length > 2) && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-cine-surface shadow-lg border border-cine-surface/50 overflow-hidden z-10">
          {isLoading ? (
            <div className="p-4 flex justify-center">
              <Loader label="Searching" />
            </div>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-cine-background transition-colors duration-200"
              >
                <Image
                  src={
                    getPosterUrl(movie.poster_path, "w92") || "/placeholder.svg"
                  }
                  alt={movie.title}
                  width={40}
                  height={60}
                  className="rounded-md object-cover aspect-[2/3]"
                />
                <div>
                  <div className="font-medium text-cine-text-primary line-clamp-1">
                    {movie.title}
                  </div>
                  <div className="text-sm text-cine-text-secondary">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-cine-text-secondary">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
