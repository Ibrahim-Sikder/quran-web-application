import { Surah } from "@/types/quran";
import { SurahCard } from "./SurahCard";

interface SurahGridProps {
  surahs: Surah[];
}

export function SurahGrid({ surahs }: SurahGridProps) {
  if (surahs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No surahs found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {surahs.map((surah) => (
        <SurahCard key={surah.id} surah={surah} />
      ))}
    </div>
  );
}
