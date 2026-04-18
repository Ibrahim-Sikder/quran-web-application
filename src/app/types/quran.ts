
export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
    id: number;
}

export interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
}

export interface Translation {
    text: string;
}

export interface CompleteAyah {
    ayah: Ayah;
    translation: Translation;
}
export interface Ayah {
    chapter: number;
    verse: number;
    arabic: string;
    translation: string;
    transliteration: string;
}

export interface SurahInfo {
    id: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}