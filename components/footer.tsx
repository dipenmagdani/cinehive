import Link from "next/link";
import { ListVideo } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-cine-surface/50 bg-cine-surface py-8 text-cine-text-secondary">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-cine-text-primary">
          <ListVideo className="h-6 w-6 text-cine-accent" />
          <span>CineHive</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="#" className="hover:text-cine-accent transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-cine-accent transition-colors">
            Contact
          </Link>
          <Link href="#" className="hover:text-cine-accent transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-cine-accent transition-colors">
            Terms of Service
          </Link>
          <span className="text-cine-text-secondary">Powered by TMDB</span>
        </nav>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CineHive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
