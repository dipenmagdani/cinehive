import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getTrendingMovies, getGenres } from "@/lib/tmdb-api";
import type { Genre, Movie } from "@/lib/tmdb-api";
import { HomeHero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

type TrendingScrollerProps = { movies: Movie[] };
type FeaturedOfWeekProps = { movie?: Movie; genreNames?: string[] };
type CommunityHighlightsProps = Record<string, never>;
type GenreQuickLinksProps = { genres: Genre[] };

const TrendingScroller = dynamic<TrendingScrollerProps>(() =>
  import("@/components/sections/trending-scroller").then(
    (m) => m.TrendingScroller
  )
);
const FeaturedOfWeek = dynamic<FeaturedOfWeekProps>(() =>
  import("@/components/sections/featured-of-week").then((m) => m.FeaturedOfWeek)
);
const CommunityHighlights = dynamic<CommunityHighlightsProps>(() =>
  import("@/components/sections/community-highlights").then(
    (m) => m.CommunityHighlights
  )
);
const GenreQuickLinks = dynamic<GenreQuickLinksProps>(() =>
  import("@/components/sections/genre-quick-links").then(
    (m) => m.GenreQuickLinks
  )
);

export const metadata: Metadata = {
  title: "CineHive – Your Hive for Honest Movie Reviews",
  description:
    "Read, write, and share film opinions with the world. Discover trending movies, featured picks, and community highlights.",
  openGraph: {
    title: "CineHive – Your Hive for Honest Movie Reviews",
    description:
      "Read, write, and share film opinions with the world. Discover trending movies, featured picks, and community highlights.",
    type: "website",
  },
};

export default async function LandingPage() {
  const [trendingMovies, genres] = await Promise.all([
    getTrendingMovies(),
    getGenres(),
  ]);

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
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1">
        <section className="container px-4 pt-10 md:px-6">
          <HomeHero trending={trendingMovies.slice(0, 10)} />
        </section>

        <section className="container px-4 py-10 md:px-6">
          <TrendingScroller movies={trendingMovies.slice(0, 6)} />
        </section>

        <section className="container px-4 py-10 md:px-6">
          <FeaturedOfWeek
            movie={trendingMovies[0]}
            genreNames={genres
              .filter((g) =>
                (trendingMovies[0]?.genre_ids || []).includes(g.id)
              )
              .map((g) => g.name)}
          />
        </section>

        <section className="container px-4 py-10 md:px-6">
          <CommunityHighlights />
        </section>

        <section className="container px-4 py-10 md:px-6">
          <GenreQuickLinks genres={genres} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
