"use client";

export type WatchlistItem = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  media_type?: "movie" | "tv";
};

const STORAGE_KEY = "cinehive_watchlist";

export function getWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WatchlistItem[]) : [];
  } catch {
    return [];
  }
}

export function setWatchlist(items: WatchlistItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("watchlist:changed"));
}

export function addToWatchlist(item: WatchlistItem) {
  const items = getWatchlist();
  if (!items.find((i) => i.id === item.id)) {
    setWatchlist([item, ...items]);
  }
}

export function removeFromWatchlist(id: number) {
  const items = getWatchlist().filter((i) => i.id !== id);
  setWatchlist(items);
}

export function isInWatchlist(id: number): boolean {
  return getWatchlist().some((i) => i.id === id);
}
