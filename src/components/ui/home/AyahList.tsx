// components/AyahList.tsx
"use client";

import { useSettings } from "@/context/SettingsContext";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Ayah } from "@/types/quran";

interface AyahListProps {
  ayahs: Ayah[];
  surahName: string;
}

export default function AyahList({ ayahs, surahName }: AyahListProps) {
  const { settings, isLoaded } = useSettings();
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredAyahs = ayahs.filter((ayah) =>
    ayah.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !isLoaded) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search in ${surahName}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredAyahs.map((ayah) => (
          <div
            key={ayah.number}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Verse {ayah.numberInSurah}
              </span>
            </div>
            <p
              className="text-right leading-loose mb-4 font-arabic"
              style={{
                fontSize: `${settings.arabicFontSize}px`,
                fontFamily: settings.arabicFont,
              }}
            >
              {ayah.arabic}
            </p>
            <p
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              {ayah.translation}
            </p>
          </div>
        ))}
        {filteredAyahs.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No verses found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
