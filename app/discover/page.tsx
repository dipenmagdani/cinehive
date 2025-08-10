import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DiscoverResults } from "@/components/discover/results";

export default function DiscoverPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1 container px-4 py-10 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cine-text-primary mb-6">
          Discover
        </h1>
        <Suspense
          fallback={<div className="text-cine-text-secondary">Loading…</div>}
        >
          <DiscoverResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
