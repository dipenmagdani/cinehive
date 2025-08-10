"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";
import {
  getWatchlist,
  removeFromWatchlist,
  type WatchlistItem,
} from "@/lib/watchlist";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setItems(getWatchlist());
    const onChange = () => setItems(getWatchlist());
    window.addEventListener("watchlist:changed", onChange as any);
    return () =>
      window.removeEventListener("watchlist:changed", onChange as any);
  }, []);

  const handleRemove = (id: number) => {
    removeFromWatchlist(id);
    setItems(getWatchlist());
  };

  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1 container px-4 py-10 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cine-text-primary">
          Watchlist
        </h1>

        {items.length === 0 ? (
          <div className="mt-4 rounded-2xl bg-cine-surface p-6 text-cine-text-secondary">
            No items yet.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {items.map((m) => (
              <div
                key={m.id}
                className="group relative overflow-hidden rounded-2xl bg-cine-surface"
              >
                <Link href={`/movie/${m.id}`}>
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={
                        m.poster_path
                          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                          : "/placeholder.svg"
                      }
                      alt={m.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <div className="line-clamp-1 text-cine-text-primary font-medium">
                    {m.title}
                  </div>
                  <Button
                    onClick={() => handleRemove(m.id)}
                    size="sm"
                    variant="outline"
                    className="mt-2 rounded-full"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
