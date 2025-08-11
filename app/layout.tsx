import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { PageTransition } from "@/components/page-transition";
import { CelebrationOverlay } from "@/components/ui/celebration";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineHive - Your Modern Movie Review Platform",
  description:
    "Discover, review, and discuss your favorite movies on CineHive. Minimal, cinematic, and user-friendly.",
  keywords: [
    "movie reviews",
    "film platform",
    "cinehive",
    "movies",
    "reviews",
    "critics",
  ],
  icons: {
    icon: "/app/assets/cinehive-logo.png",
  },
  openGraph: {
    title: "CineHive - Your Modern Movie Review Platform",
    description:
      "Discover, review, and discuss your favorite movies on CineHive. Minimal, cinematic, and user-friendly.",
    url: "https://cinehive.dipen.live", // Placeholder URL
    siteName: "CineHive",

    images: [
      {
        url: "/app/assets/cinehive-logo.png", // Placeholder image for Open Graph
        width: 1200,
        height: 630,
        alt: "CineHive Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineHive - Your Modern Movie Review Platform",
    description:
      "Discover, review, and discuss your favorite movies on CineHive. Minimal, cinematic, and user-friendly.",
    images: ["/app/assets/cinehive-logo.png"],
  }};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <PageTransition>{children}</PageTransition>
          <CelebrationOverlay />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
