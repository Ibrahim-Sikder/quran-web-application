import { HomeClient } from "@/components/home/HomeClient";
import { getAllSurahs } from "@/lib/quran-api";

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return <HomeClient initialSurahs={surahs} />;
}
