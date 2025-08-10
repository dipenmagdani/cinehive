import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  if (!TMDB_API_KEY || !query) {
    return NextResponse.json({ results: [] }, { status: 200 });
  }
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    return NextResponse.json({ results: data.results || [] });
  } catch (e) {
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}
