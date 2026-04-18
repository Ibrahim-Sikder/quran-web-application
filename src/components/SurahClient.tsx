/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/SettingsContext";
import { Ayah } from "@/types/quran";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./Loading";
import NotFound from "./NotFound";

interface SurahClientProps {
  initialSurahInfo: any;
  initialAyahs: Ayah[];
  surahId: string;
}

export function SurahClient({
  initialSurahInfo,
  initialAyahs,
}: SurahClientProps) {
  const router = useRouter();
  const { settings, isLoaded } = useSettings();
  const [ayahs] = useState<Ayah[]>(initialAyahs);
  const [surahInfo] = useState(initialSurahInfo);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading] = useState(false);

  const filteredAyahs = ayahs.filter(
    (ayah) =>
      ayah.translation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ayah.arabic?.includes(searchTerm),
  );

  if (!isLoaded || loading) {
    return <Loading />;
  }

  if (!surahInfo) {
    return <NotFound />;
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
              <h1 className="text-2xl font-bold">{surahInfo.englishName}</h1>
              <p className="text-sm text-emerald-100">
                {surahInfo.englishNameTranslation}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-arabic">{surahInfo.name}</div>
              <p className="text-xs text-emerald-100">
                {surahInfo.numberOfAyahs} verses
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
            <Card
              key={ayah.verse}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
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
                    className="text-right leading-loose"
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
                    {ayah.transliteration && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
                        {ayah.transliteration}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAyahs.length === 0 && searchTerm && (
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
