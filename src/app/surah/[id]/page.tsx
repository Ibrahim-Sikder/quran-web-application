/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SurahInfo } from "@/app/types/quran";
import { Ayah } from "@/types/quran";

export default function SurahPage() {
  const params = useParams();
  const router = useRouter();
  const { settings, isLoaded } = useSettings();
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [surahInfo, setSurahInfo] = useState<SurahInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSurahInfo();
    fetchAyahs();
  }, [params.id]);

  const fetchSurahInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quran/surah/${params.id}`,
      );
      const data = await response.json();
      setSurahInfo(data.data);
    } catch (error) {
      console.error("Error fetching surah info:", error);
    }
  };

  const fetchAyahs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quran/surah/${params.id}/ayahs`,
      );
      const data = await response.json();
      setAyahs(data.data);
    } catch (error) {
      console.error("Error fetching ayahs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAyahs = ayahs.filter((ayah) =>
    ayah.translation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
            <BookOpen className="h-10 w-10 text-emerald-600" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading Surah...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{surahInfo?.englishName}</h1>
              <p className="text-sm text-emerald-100">
                {surahInfo?.englishNameTranslation}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-arabic">{surahInfo?.name}</div>
              <p className="text-xs text-emerald-100">
                {surahInfo?.numberOfAyahs} verses
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search verses in this surah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12"
          />
        </div>
      </div>

      {/* Verses */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {filteredAyahs.map((ayah) => (
            <Card key={ayah.verse} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">
                      {ayah.verse}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent"></div>
                </div>

                <div className="space-y-4">
                  <p
                    className="arabic-text text-right leading-loose"
                    style={{
                      fontSize: `${settings.arabicFontSize}px`,
                      fontFamily: settings.arabicFont,
                    }}
                  >
                    {ayah.arabic}
                  </p>

                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <p
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      style={{ fontSize: `${settings.translationFontSize}px` }}
                    >
                      {ayah.translation}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
                      {ayah.transliteration}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAyahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No verses found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
