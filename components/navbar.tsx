import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  User,
  Home,
  Compass,
  Star,
  ListVideo,
  Settings,
} from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-cine-surface/50 bg-cine-surface/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-cine-text-primary"
        >
          <ListVideo className="h-6 w-6 text-cine-accent" />
          <span>CineHive</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-cine-text-secondary hover:text-cine-accent transition-colors"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/discover"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-cine-text-secondary hover:text-cine-accent transition-colors"
          >
            <Compass className="h-4 w-4" />
            Discover
          </Link>
          <Link
            href="/watchlist"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-cine-text-secondary hover:text-cine-accent transition-colors"
          >
            <Star className="h-4 w-4" />
            Watchlist
          </Link>
          <Link
            href="/search"
            className="rounded-full text-cine-text-secondary hover:bg-cine-surface hover:text-cine-accent p-2"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Link>
          <Link
            href="/user/me"
            className="rounded-full text-cine-text-secondary hover:bg-cine-surface hover:text-cine-accent p-2"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>
          <Link
            href="/settings"
            className="rounded-full text-cine-text-secondary hover:bg-cine-surface hover:text-cine-accent p-2"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
