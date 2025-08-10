import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function GET() {
  if (!TMDB_API_KEY) return NextResponse.json({ genres: [] });
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`,
      {
        next: { revalidate: 86400 },
      }
    );
    const data = await res.json();
    return NextResponse.json({ genres: data.genres || [] });
  } catch {
    return NextResponse.json({ genres: [] });
  }
}
