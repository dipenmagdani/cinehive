"use client";

import { SearchBar } from "@/components/search-bar";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface LandingContentProps {
  trendingMovies: Array<{
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  }>;
}

export function LandingContent({ trendingMovies }: LandingContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="flex-1">
      <section className="relative flex h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-12 text-center md:px-6 lg:py-24">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] animate-pulse-slow rounded-full bg-cine-accent/5 blur-3xl" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[150%] w-[150%] animate-pulse-slow-reverse rounded-full bg-cine-accent/5 blur-3xl" />
        </div>
        <style jsx global>{`
          @keyframes pulse-slow {
            0% {
              transform: scale(1) translate(0, 0);
              opacity: 0.05;
            }
            50% {
              transform: scale(1.1) translate(5%, 5%);
              opacity: 0.08;
            }
            100% {
              transform: scale(1) translate(0, 0);
              opacity: 0.05;
            }
          }
          @keyframes pulse-slow-reverse {
            0% {
              transform: scale(1) translate(0, 0);
              opacity: 0.05;
            }
            50% {
              transform: scale(1.1) translate(-5%, -5%);
              opacity: 0.08;
            }
            100% {
              transform: scale(1) translate(0, 0);
              opacity: 0.05;
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 20s infinite ease-in-out;
          }
          .animate-pulse-slow-reverse {
            animation: pulse-slow-reverse 20s infinite ease-in-out;
          }
        `}</style>

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold tracking-tighter text-cine-text-primary sm:text-5xl md:text-6xl lg:text-7xl/none"
          >
            CineHive
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-lg text-cine-text-secondary md:text-xl"
          >
            Your modern hub for movie reviews and cinematic discussions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-md"
          >
            <SearchBar />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              asChild
              className="mt-4 rounded-full bg-cine-accent hover:bg-cine-accent/90 text-cine-text-primary px-8 py-3 text-lg"
            >
              <Link href="/discover">Explore Movies</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-6 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-3xl font-bold text-cine-text-primary md:text-4xl"
        >
          Trending Movies
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {trendingMovies.map((movie) => (
            <motion.div key={movie.id} variants={itemVariants}>
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
