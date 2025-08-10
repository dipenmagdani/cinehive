"use client";

import { ListVideo } from "lucide-react";

interface LoaderProps {
  label?: string;
  size?: number;
}

export function Loader({ label = "Loading...", size = 24 }: LoaderProps) {
  const ringSize = `${size}px`;
  const iconSize = Math.max(12, Math.floor(size * 0.6));
  return (
    <div className="flex items-center justify-center gap-3 text-cine-text-secondary">
      <div className="relative" style={{ width: ringSize, height: ringSize }}>
        <div className="absolute inset-0 rounded-full border-2 border-cine-surface/60 border-t-cine-accent animate-spin" />
        <ListVideo
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cine-accent"
          style={{ width: iconSize, height: iconSize }}
        />
      </div>
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
