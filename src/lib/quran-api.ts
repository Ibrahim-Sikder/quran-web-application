/* eslint-disable @typescript-eslint/no-explicit-any */
import { Surah, Ayah } from "@/types/quran";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllSurahs(): Promise<Surah[]> {
    const response = await fetch(`${API_URL}/quran/surahs?limit=114`, {
        next: { revalidate: false },
    });
    const data = await response.json();
    return data?.data || [];
}

export async function getSurahById(id: string): Promise<Surah | null> {
    const surahs = await getAllSurahs();
    return surahs.find((s) => s.id === parseInt(id)) || null;
}

export async function getAllSurahIds(): Promise<{ id: string }[]> {
    const surahs = await getAllSurahs();
    return surahs.map((surah) => ({
        id: surah.id.toString(),
    }));
}


export async function getSurahInfoById(id: string): Promise<any> {
    const response = await fetch(`${API_URL}/quran/surah/${id}`, {
        next: { revalidate: false },
    });
    const data = await response.json();
    return data.data;
}

export async function getSurahAyahsById(id: string): Promise<Ayah[]> {
    const response = await fetch(`${API_URL}/quran/surah/${id}/ayahs`, {
        next: { revalidate: false },
    });
    const data = await response.json();
    return data.data;
}

export async function getCompleteSurahData(id: string): Promise<{
    surahInfo: any;
    ayahs: Ayah[];
}> {
    const [surahInfo, ayahs] = await Promise.all([
        getSurahInfoById(id),
        getSurahAyahsById(id),
    ]);

    return { surahInfo, ayahs };
}
