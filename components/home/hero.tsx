"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getBackdropUrl } from "@/lib/tmdb-api";
import { useEffect, useMemo, useRef, useState } from "react";
import { SpotlightContainer } from "@/components/animated/spotlight";

interface HeroProps {
  trending: Array<{ id: number; title: string; backdrop_path: string | null }>;
}

export function HomeHero({ trending }: HeroProps) {
  const backdrops = useMemo(
    () => trending.slice(0, 6).map((m) => getBackdropUrl(m.backdrop_path)),
    [trending]
  );
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const fullSub = "Read, write, and share reviews with the world.";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const reduceMotion = useReducedMotion();
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-5%", "5%"]
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.6],
    reduceMotion ? [1, 1] : [0.98, 1.03]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    reduceMotion ? [1, 1] : [0.9, 1]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "-4%"]
  );
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % Math.max(1, backdrops.length)),
      5000
    );
    return () => clearInterval(id);
  }, [backdrops.length]);

  useEffect(() => {
    // typewriter effect for subheading
    let i = 0;
    const id = setInterval(() => {
      setTyped(fullSub.slice(0, i + 1));
      i += 1;
      if (i >= fullSub.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <SpotlightContainer>
      <section
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-cine-surface/50 bg-cine-surface min-h-screen"
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          cursorX.set(e.clientX - rect.left);
          cursorY.set(e.clientY - rect.top);
        }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: parallaxY }}
        >
          {backdrops.map((src, i) => (
            <Image
              key={i}
              src={src || "/placeholder.svg?height=720&width=1280"}
              alt="Backdrop"
              fill
              sizes="100vw"
              className={`object-cover opacity-0 transition-opacity duration-700 ${
                i === index ? "opacity-25" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
          {/* Film grain + animated gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 160 160\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/%3E%3CfeColorMatrix type=\\'saturate\\' values=\\'0\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cine-accent/10 via-transparent to-cine-accent/10 animate-pulse" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* Bokeh dots */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-32 w-32 rounded-full bg-cine-accent/10 blur-3xl"
                style={{
                  top: `${(i * 37) % 100}%`,
                  left: `${(i * 53) % 100}%`,
                  animation: `float-${i % 3} 20s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
          {/* Spotlight cursor effect */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                cursorX && cursorY
                  ? // radial gradient spotlight following cursor
                    `radial-gradient(400px circle at ${cursorX.get()}px ${cursorY.get()}px, rgba(255,255,255,0.06), transparent 60%)`
                  : undefined,
            }}
          />
          <style jsx global>{`
            @keyframes float-0 {
              0% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(10px, -10px);
              }
              100% {
                transform: translate(0, 0);
              }
            }
            @keyframes float-1 {
              0% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(-8px, 8px);
              }
              100% {
                transform: translate(0, 0);
              }
            }
            @keyframes float-2 {
              0% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(12px, 12px);
              }
              100% {
                transform: translate(0, 0);
              }
            }
          `}</style>
        </motion.div>
        <motion.div
          className="relative z-10 px-6 py-16 md:px-10 lg:px-16 lg:py-24 will-change-transform"
          style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Your Hive for Honest Movie Reviews
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-cine-text-secondary text-lg md:text-xl font-medium"
            aria-live="polite"
          >
            {typed}
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-cine-text-secondary align-middle" />
          </motion.p>
          <div className="mt-6 max-w-xl">
            <SearchBar />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full shadow-[0_0_20px_0_rgba(255,255,255,0.06)] hover:shadow-[0_0_30px_0_rgba(255,255,255,0.10)]"
            >
              <Link href="/auth/register">Join CineHive</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-cine-surface/60 hover:border-cine-accent/50 hover:text-cine-accent"
            >
              <Link href="/home">Browse Reviews</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full">
              <Link href="/watchlist">My Watchlist</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </SpotlightContainer>
  );
}
