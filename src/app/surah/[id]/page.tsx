import { notFound } from "next/navigation";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAyahsBySurah, getSurahs } from "@/lib/quran";
import AyahList from "@/components/ui/home/AyahList";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((surah) => ({
    id: surah.number.toString(),
  }));
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  const surahs = await getSurahs();
  const surah = surahs.find((s) => s.number === parseInt(id));
  const ayahs = await getAyahsBySurah(parseInt(id));

  if (!surah) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Surahs
      </Link>

      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {surah.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {surah.englishName} • {surah.revelationType} •{" "}
              {surah.numberOfAyahs} verses
            </p>
          </div>
          <div className="text-4xl font-arabic text-emerald-700 dark:text-emerald-400">
            {surah.arabicName}
          </div>
        </div>
      </div>

      <AyahList ayahs={ayahs} surahName={surah.name} />
    </div>
  );
}
