"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme !== "light";
  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1 container px-4 py-10 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-cine-text-primary">
          Settings
        </h1>
        <div className="mt-6 rounded-2xl bg-cine-surface p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-cine-text-primary">Dark theme</p>
              <p className="text-sm text-cine-text-secondary">
                Toggle appearance
              </p>
            </div>
            <Switch
              checked={isDark}
              onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
