"use client";

import { useEffect, useRef } from "react";

export function CommunityHighlights() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-cine-surface/50 bg-cine-surface p-6">
        <h3 className="text-lg font-semibold text-cine-text-primary">
          Latest Reviews
        </h3>
        <VerticalTicker items={tickerItems} />
      </div>
      <div className="rounded-2xl border border-cine-surface/50 bg-cine-surface p-6">
        <h3 className="text-lg font-semibold text-cine-text-primary">
          Top Reviewers
        </h3>
        <ol className="mt-3 grid grid-cols-2 gap-3">
          {leaderboard.map((u) => (
            <li
              key={u.username}
              className="flex items-center gap-3 rounded-xl bg-cine-background/60 p-3 ring-1 ring-cine-surface/50 hover:ring-cine-accent/30 transition"
            >
              <img
                src="/placeholder-user.jpg"
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="font-medium text-cine-text-primary">
                  {u.username}
                </div>
                <div className="text-sm text-cine-text-secondary">
                  {u.reviews} reviews
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl border border-cine-surface/50 bg-cine-surface p-6">
        <h3 className="text-lg font-semibold text-cine-text-primary">
          Community Stats
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <AnimatedCounter key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VerticalTicker({ items }: { items: string[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let y = 0;
    let raf = 0;
    const step = () => {
      y += 0.4; // speed
      if (y >= el.scrollHeight / 2) y = 0; // loop at midpoint (duplicated list)
      el.style.transform = `translateY(-${y}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative h-40 overflow-hidden">
      <div ref={listRef} className="space-y-2 will-change-transform">
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="rounded-full bg-cine-background/60 px-4 py-2 text-sm text-cine-text-secondary"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedCounter({ label, value }: { label: string; value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) return;
    let start = 0;
    const duration = 1200;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const current = Math.floor(start + p * (num - start));
      el.textContent = value.includes("/") ? value : current.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return (
    <div className="rounded-xl bg-cine-background/60 p-4">
      <div className="text-sm text-cine-text-secondary">{label}</div>
      <div ref={ref} className="text-2xl font-semibold text-cine-text-primary">
        0
      </div>
    </div>
  );
}

const tickerItems = [
  "Ava reviewed Civil War — ★★★★☆",
  "Liam reviewed Dune: Part Two — ★★★★★",
  "Noah reviewed Poor Things — ★★★★☆",
  "Mia reviewed The Zone of Interest — ★★★★☆",
];

const leaderboard = [
  { username: "Ava", reviews: 128 },
  { username: "Liam", reviews: 102 },
  { username: "Noah", reviews: 97 },
  { username: "Mia", reviews: 84 },
];

const stats = [
  { label: "Reviews Written", value: "12,480" },
  { label: "Active Members", value: "3,211" },
  { label: "Movies Covered", value: "8,902" },
  { label: "Avg. Rating", value: "4.1/5" },
];
