/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useSettings } from "@/context/SettingsContext";
import { Surah } from "@/types/quran";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { SearchBar } from "./SearchBar";
import { SurahGrid } from "./SurahGrid";
import HeroSection from "./HeroSection";

interface HomeClientProps {
  initialSurahs: Surah[];
}

export function HomeClient({ initialSurahs }: HomeClientProps) {
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(initialSurahs);
  const [searchTerm, setSearchTerm] = useState("");
  const [revelationFilter, setRevelationFilter] = useState<
    "all" | "Meccan" | "Medinan"
  >("all");
  const { isLoaded } = useSettings();

  useEffect(() => {
    let filtered = initialSurahs;

    if (searchTerm) {
      filtered = filtered.filter(
        (surah) =>
          surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          surah.englishNameTranslation
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          surah.name.includes(searchTerm),
      );
    }

    if (revelationFilter !== "all") {
      filtered = filtered.filter(
        (surah) => surah.revelationType === revelationFilter,
      );
    }

    setFilteredSurahs(filtered);
  }, [searchTerm, initialSurahs, revelationFilter]);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <HeroSection />

      <div className="container mx-auto px-4 -mt-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          revelationFilter={revelationFilter}
          onFilterChange={setRevelationFilter}
        />
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <p className="text-2xl font-bold text-emerald-600">
              {filteredSurahs.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Surahs Available
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <p className="text-2xl font-bold text-emerald-600">
              {filteredSurahs
                .reduce((acc, s) => acc + s.numberOfAyahs, 0)
                .toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Verses
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <p className="text-2xl font-bold text-emerald-600">
              {
                filteredSurahs.filter((s) => s.revelationType === "Meccan")
                  .length
              }
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Meccan Surahs
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
            <p className="text-2xl font-bold text-emerald-600">
              {
                filteredSurahs.filter((s) => s.revelationType === "Medinan")
                  .length
              }
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Medinan Surahs
            </p>
          </div>
        </div>
      </div>

      {/* Surah Grid */}
      <div className="container mx-auto px-4 py-12">
        <SurahGrid surahs={filteredSurahs} />
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 Al-Quran. All rights reserved.</p>
            <p className="text-sm mt-2">
              May Allah bless you with knowledge and wisdom
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
