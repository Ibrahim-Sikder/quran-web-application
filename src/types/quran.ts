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
    id?: string;
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
export interface Settings {
    arabicFont: string;
    arabicFontSize: number;
    translationFontSize: number;
    theme: "light" | "dark";
}

export interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
    isLoaded: boolean;
}

export const defaultSettings: Settings = {
    arabicFont: "Noto Naskh Arabic",
    arabicFontSize: 24,
    translationFontSize: 16,
    theme: "light",
};
export interface SettingsPanelProps {
    onClose: () => void;
}
export interface Surah {
    id: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}