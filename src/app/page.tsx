/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
"use client";

import { BookOpen, ChevronRight, Clock, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSettings } from "@/context/SettingsContext";
import { Input } from "@/components/ui/input";

interface Surah {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function Home() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [revelationFilter, setRevelationFilter] = useState<
    "all" | "Meccan" | "Medinan"
  >("all");
  const { isLoaded } = useSettings();

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    let filtered = surahs;

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
  }, [searchTerm, surahs, revelationFilter]);

  const fetchSurahs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quran/surahs?limit=114`,
      );
      const data = await response.json();
      setSurahs(data?.data || []);
      setFilteredSurahs(data?.data || []);
    } catch (error) {
      console.error("Error fetching surahs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
            <BookOpen className="h-10 w-10 text-emerald-600" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading the Holy Quran...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-arabic mb-2">
              القرآن الكريم
            </h1>
            <p className="text-xl font-heading">The Holy Quran</p>
            <p className="text-emerald-100 mt-1">
              Complete Guidance for Mankind
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by Surah name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>
            <div>
              <select
                value={revelationFilter}
                onChange={(e) => setRevelationFilter(e.target.value as any)}
                className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">All Surahs</option>
                <option value="Meccan">Meccan Surahs</option>
                <option value="Medinan">Medinan Surahs</option>
              </select>
            </div>
          </div>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSurahs.map((surah) => (
            <Link href={`/surah/${surah.id}`} key={surah.id}>
              <Card className="cursor-pointer group hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-4xl font-bold text-emerald-600 opacity-20 group-hover:opacity-100 transition-opacity">
                        {surah.id}
                      </div>
                      <CardTitle className="text-xl mt-2">
                        {surah.englishName}
                      </CardTitle>
                      <CardDescription>
                        {surah.englishNameTranslation}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-arabic text-gray-700 dark:text-gray-300">
                        {surah.name}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{surah.numberOfAyahs} verses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{surah.revelationType}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No surahs found matching your search.
            </p>
          </div>
        )}
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
