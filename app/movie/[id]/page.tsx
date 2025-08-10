import Link from "next/link";
import { getMovieDetails, getBackdropUrl, getPosterUrl } from "@/lib/tmdb-api";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Star, Clock, CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

type MovieDetailPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = Number.parseInt(id);
  const movie = await getMovieDetails(movieId);

  if (!movie) {
    return {
      title: "Movie Not Found - CineHive",
      description: "The movie you are looking for could not be found.",
    };
  }

  return {
    title: `${movie.title} (${new Date(
      movie.release_date
    ).getFullYear()}) - CineHive`,
    description: movie.overview || `Details about the movie ${movie.title}.`,
    keywords: [
      movie.title,
      "movie review",
      "film",
      "cinehive",
      ...movie.genres.map((g) => g.name),
      ...(movie.credits?.cast || []).slice(0, 5).map((c) => c.name),
    ],
    openGraph: {
      title: `${movie.title} (${new Date(
        movie.release_date
      ).getFullYear()}) - CineHive`,
      description: movie.overview || `Details about the movie ${movie.title}.`,
      url: `https://cinehive.vercel.app/movie/${movie.id}`, // Placeholder URL
      siteName: "CineHive",
      images: [
        {
          url: getBackdropUrl(movie.backdrop_path, "w1280"),
          width: 1280,
          height: 720,
          alt: movie.title,
        },
        {
          url: getPosterUrl(movie.poster_path, "w500"),
          width: 500,
          height: 750,
          alt: movie.title,
        },
      ],
      locale: "en_US",
      type: "video.movie",
    },
    twitter: {
      card: "summary_large_image",
      title: `${movie.title} (${new Date(
        movie.release_date
      ).getFullYear()}) - CineHive`,
      description: movie.overview || `Details about the movie ${movie.title}.`,
      images: [getBackdropUrl(movie.backdrop_path, "w1280")],
    },
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;
  const movieId = Number.parseInt(id);
  const movie = await getMovieDetails(movieId);

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col bg-cine-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8 text-cine-text-primary">
          <h1 className="text-3xl font-bold">Movie Not Found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    image: getPosterUrl(movie.poster_path, "w500"),
    description: movie.overview,
    datePublished: movie.release_date,
    director:
      movie.credits?.crew?.find((c: any) => c.job === "Director")?.name ||
      undefined,
    actor: movie.credits?.cast?.slice(0, 5).map((actor) => ({
      "@type": "Person",
      name: actor.name,
    })),
    genre: movie.genres.map((g) => g.name),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: movie.vote_average.toFixed(1),
      reviewCount: movie.vote_count,
    },
    trailer: movie.videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    )?.key
      ? {
          "@type": "VideoObject",
          name: `${movie.title} Trailer`,
          description: `${movie.title} Official Trailer`,
          thumbnailUrl: `https://img.youtube.com/vi/${
            movie.videos.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            )?.key
          }/hqdefault.jpg`,
          uploadDate: movie.release_date,
          embedUrl: `https://www.youtube.com/embed/${
            movie.videos.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            )?.key
          }`,
        }
      : undefined,
  };

  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1">
        <Script
          id="movie-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="relative h-[50vh] w-full overflow-hidden md:h-[60vh] lg:h-[70vh]">
          <Image
            src={getBackdropUrl(movie.backdrop_path) || "/placeholder.svg"}
            alt={`${movie.title} backdrop`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cine-background to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-cine-text-primary md:p-12">
            <div className="container">
              <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">
                {movie.title}
              </h1>
              <p className="mt-2 text-lg text-cine-text-secondary md:text-xl">
                {movie.tagline}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)} / 10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-cine-text-secondary" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-5 w-5 text-cine-text-secondary" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container grid gap-8 px-4 py-12 md:grid-cols-[1fr_300px] md:px-6 lg:py-24">
          <div className="grid gap-8">
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold text-cine-text-primary">
                Overview
              </h2>
              <p className="text-cine-text-secondary">{movie.overview}</p>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-cine-surface px-3 py-1 text-sm text-cine-text-secondary"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Cast Section */}
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold text-cine-text-primary">
                Top Cast
              </h2>
              <div className="flex flex-wrap gap-4">
                {movie.credits?.cast?.slice(0, 10).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center text-center"
                  >
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/placeholder.svg?height=100&width=100"
                      }
                      alt={actor.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover aspect-square border border-cine-surface"
                    />
                    <p className="mt-2 text-sm font-medium text-cine-text-primary">
                      {actor.name}
                    </p>
                    <p className="text-xs text-cine-text-secondary line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trailers Section */}
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold text-cine-text-primary">
                Trailers
              </h2>
              <Suspense
                fallback={
                  <p className="text-cine-text-secondary">
                    Loading trailers...
                  </p>
                }
              >
                {movie.videos?.results?.filter(
                  (v) => v.type === "Trailer" && v.site === "YouTube"
                ).length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {movie.videos.results
                      .filter(
                        (v) => v.type === "Trailer" && v.site === "YouTube"
                      )
                      .slice(0, 2)
                      .map((video) => (
                        <div
                          key={video.key}
                          className="aspect-video w-full overflow-hidden rounded-2xl bg-cine-surface"
                        >
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            title={`${movie.title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-cine-text-secondary">
                    No trailers available.
                  </p>
                )}
              </Suspense>
            </div>

            {/* Review Feed (Mock) */}
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold text-cine-text-primary">
                User Reviews
              </h2>
              <div className="rounded-2xl bg-cine-surface p-6 text-center text-cine-text-secondary">
                <p>No reviews yet. Be the first to review this movie!</p>
                <Link
                  href={`/review/new?movieId=${
                    movie.id
                  }&movieTitle=${encodeURIComponent(movie.title)}`}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-cine-accent px-6 py-2 text-sm font-medium text-cine-text-primary hover:bg-cine-accent/90 transition-colors"
                >
                  Write a Review
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar for Critic Score / Audience Score (Placeholder) */}
          <aside className="grid gap-8">
            <div className="rounded-2xl bg-cine-surface p-6">
              <h3 className="mb-4 text-xl font-bold text-cine-text-primary">
                Scores
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg text-cine-text-secondary">
                  Critic Score:
                </span>
                <span className="text-2xl font-bold text-cine-accent">N/A</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg text-cine-text-secondary">
                  Audience Score:
                </span>
                <span className="text-2xl font-bold text-cine-accent">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
            {/* More sidebar content like related movies, etc. */}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
