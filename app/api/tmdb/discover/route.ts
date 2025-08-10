import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const genre = searchParams.get("genre");
  if (!TMDB_API_KEY) return NextResponse.json({ results: [] });
  try {
    const withGenres = genre ? `&with_genres=${encodeURIComponent(genre)}` : "";
    const res = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&page=${page}${withGenres}`,
      { next: { revalidate: 600 } }
    );
    const data = await res.json();
    return NextResponse.json({ results: data.results || [] });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
