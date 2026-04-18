import { SurahClient } from "@/components/SurahClient";
import { getAllSurahIds, getCompleteSurahData } from "@/lib/quran-api";

export async function generateStaticParams() {
  const paths = await getAllSurahIds();
  return paths;
}
async function getSurahData(id: string) {
  try {
    const { surahInfo, ayahs } = await getCompleteSurahData(id);
    return { surahInfo, ayahs };
  } catch (error) {
    console.error(`Error fetching surah data for ID ${id}:`, error);
    return { surahInfo: null, ayahs: [] };
  }
}

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const { surahInfo, ayahs } = await getSurahData(id);

  return (
    <SurahClient
      initialSurahInfo={surahInfo}
      initialAyahs={ayahs}
      surahId={id}
    />
  );
}
