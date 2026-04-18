export interface Surah {
    id: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export interface Ayah {
    chapter: number;
    verse: number;
    arabic: string;
    translation: string;
    transliteration: string;
}

export interface SearchResult {
    chapter: number;
    verse: number;
    arabic: string;
    translation: string;
    transliteration: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}