"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/review/rating-stars";

export default function NewReviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1 container px-4 py-10 md:px-6">
        <Suspense
          fallback={
            <div className="h-40 rounded-2xl bg-cine-surface animate-pulse" />
          }
        >
          <ReviewEditor />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function ReviewEditor() {
  const params = useSearchParams();
  const movieTitle = params?.get("movieTitle") ?? null;
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-cine-text-primary">
        Write a Review
      </h1>
      {movieTitle && (
        <p className="text-cine-text-secondary mt-1">for {movieTitle}</p>
      )}
      <div className="mt-6 rounded-2xl bg-cine-surface p-6">
        <div className="mb-4">
          <RatingStars value={rating} onChange={setRating} />
        </div>
        <Textarea
          placeholder="Share your thoughts... Markdown supported"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[180px]"
        />
        <div className="mt-4 flex justify-end">
          <Button className="rounded-full">Publish</Button>
        </div>
      </div>
    </div>
  );
}
