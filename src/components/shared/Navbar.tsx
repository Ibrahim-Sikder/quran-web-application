"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

const SettingsPanel = dynamic(
  () =>
    import("@/components/home/SettingPanels").then((mod) => mod.SettingsPanel),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <div className="animate-pulse">Loading settings...</div>
        </div>
      </div>
    ),
  },
);

export function Navbar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <BookOpen className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-lg hidden sm:inline">
                Al-Quran
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:bg-white/20 ${
                    pathname === "/" ? "bg-white/20" : ""
                  }`}
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSettingsOpen(true)}
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isSettingsOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
                Loading...
              </div>
            </div>
          }
        >
          <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
