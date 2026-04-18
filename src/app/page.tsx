import { getSurahs } from "@/lib/quran";
import Link from "next/link";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Al-Quran
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Select a Surah to read its verses
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {surahs.map((surah) => (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className="group block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  {surah.number}. {surah.englishName}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {surah.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {surah.revelationType} • {surah.numberOfAyahs} verses
                </div>
              </div>
              <div className="text-2xl font-arabic text-gray-700 dark:text-gray-300">
                {surah.arabicName}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
