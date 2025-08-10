import { NextResponse } from "next/server";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get("imdbId");
  if (!OMDB_API_KEY || !imdbId) return NextResponse.json({});
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${encodeURIComponent(
        imdbId
      )}&apikey=${OMDB_API_KEY}`,
      {
        next: { revalidate: 86400 },
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({});
  }
}
