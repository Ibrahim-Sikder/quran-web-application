import { BookOpen, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Surah } from "@/types/quran";

interface SurahCardProps {
  surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.id}`}>
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
              <CardDescription>{surah.englishNameTranslation}</CardDescription>
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
  );
}
