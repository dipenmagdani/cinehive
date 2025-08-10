import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MovieCard } from "@/components/movie-card";
import { getTrendingMovies } from "@/lib/tmdb-api";
import Link from "next/link";
import { HomeHero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";

export const metadata = {
  title: "Home - CineHive",
};

export default async function HomePage() {
  const trending = await getTrendingMovies();
  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1">
        <section className="container px-4 pt-10 md:px-6">
          <HomeHero trending={trending.slice(0, 10)} />
        </section>
        <section className="container px-4 py-10 md:px-6">
          <Highlights featuredMovie={trending[0]} />
        </section>
        <section className="container px-4 pb-12 md:px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cine-text-primary">
              Trending Now
            </h2>
            <Link href="/discover" className="text-cine-accent text-sm">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {trending.slice(0, 12).map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
