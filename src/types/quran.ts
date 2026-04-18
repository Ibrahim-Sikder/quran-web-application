// types/quran.ts
export interface Surah {
    number: number;
    name: string;
    englishName: string;
    arabicName: string;
    revelationType: string;
    numberOfAyahs: number;
}

export interface Ayah {
    number: number;
    numberInSurah: number;
    arabic: string;
    translation: string;
}