/* eslint-disable @typescript-eslint/no-explicit-any */

import { Ayah, Surah } from "@/types/quran";


const API_BASE = 'https://api.alquran.cloud/v1';

export async function getSurahs(): Promise<Surah[]> {
    const res = await fetch(`${API_BASE}/surah`);
    const data = await res.json();

    return data.data.map((surah: any) => ({
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        arabicName: surah.arabicName,
        revelationType: surah.revelationType,
        numberOfAyahs: surah.numberOfAyahs,
    }));
}

export async function getAyahsBySurah(surahNumber: number): Promise<Ayah[]> {
    // Fetch Arabic text
    const arabicRes = await fetch(`${API_BASE}/surah/${surahNumber}/editions/ar.alafasy`);
    const arabicData = await arabicRes.json();

    // Fetch English translation
    const translationRes = await fetch(`${API_BASE}/surah/${surahNumber}/editions/en.sahih`);
    const translationData = await translationRes.json();

    if (arabicData.data && translationData.data) {
        const arabicAyahs = arabicData.data[0].ayahs;
        const translationAyahs = translationData.data[0].ayahs;

        return arabicAyahs.map((ayah: any, index: number) => ({
            number: ayah.number,
            numberInSurah: ayah.numberInSurah,
            arabic: ayah.text,
            translation: translationAyahs[index]?.text || '',
        }));
    }

    return [];
}