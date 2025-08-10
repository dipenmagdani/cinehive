const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const OMDB_API_KEY = process.env.OMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

if (!TMDB_API_KEY) {
  console.error("TMDB_API_KEY is not set in environment variables.");
}
if (!OMDB_API_KEY) {
  // Optional, only log once to avoid noise
  console.warn("OMDB_API_KEY is not set; OMDb features will be limited.");
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string | null;
  videos: { results: { key: string; type: string; site: string }[] };
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }[];
  };
}

export async function getTrendingMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) return [];
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour [^2]
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch trending movies: ${res.statusText}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

export async function getGenres(): Promise<Genre[]> {
  if (!TMDB_API_KEY) return [];
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error("Failed to fetch genres");
    const data = await res.json();
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!TMDB_API_KEY || !query) return [];
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`,
      {
        next: { revalidate: 600 }, // Revalidate every 10 minutes for search results [^2]
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to search movies: ${res.statusText}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

export async function getMovieDetails(
  id: number
): Promise<MovieDetails | null> {
  if (!TMDB_API_KEY) return null;
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`,
      {
        next: { revalidate: 86400 }, // Revalidate daily for movie details [^2]
      }
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch movie details for ID ${id}: ${res.statusText}`
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
}

export async function getOmdbDetailsByImdbId(imdbId: string) {
  if (!OMDB_API_KEY || !imdbId) return null;
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${encodeURIComponent(
        imdbId
      )}&apikey=${OMDB_API_KEY}`,
      {
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch OMDb data");
    return await res.json();
  } catch (e) {
    console.error("OMDb request failed", e);
    return null;
  }
}

export function getPosterUrl(path: string | null, size = "w500"): string {
  if (!path) return "/placeholder.svg?height=750&width=500";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size = "w1280"): string {
  if (!path) return "/placeholder.svg?height=720&width=1280";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
