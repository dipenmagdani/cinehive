"use client";

import { useEffect, useState } from "react";

export function CelebrationOverlay() {
  const [active, setActive] = useState<null | { title?: string }>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { title?: string };
      setActive(detail || {});
      const id = setTimeout(() => setActive(null), 1200);
      return () => clearTimeout(id);
    };
    window.addEventListener("cinehive:celebrate", handler as EventListener);
    return () =>
      window.removeEventListener(
        "cinehive:celebrate",
        handler as EventListener
      );
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-fade-in" />
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-2 w-2 rounded-full bg-cine-accent opacity-80 animate-pop"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 60}ms`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-2xl bg-cine-surface/90 px-6 py-4 text-center ring-1 ring-cine-surface/50">
          <div className="text-sm text-cine-text-secondary">
            Added to Watchlist
          </div>
          {active?.title && (
            <div className="mt-1 text-cine-text-primary font-semibold">
              {active.title}
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes pop {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 0.9;
          }
        }
        .animate-pop {
          animation: pop 300ms ease-out forwards;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 150ms ease-out forwards;
        }
      `}</style>
    </div>
  );
}
