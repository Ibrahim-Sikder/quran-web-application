// context/SettingsContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";

export interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  isLoaded: boolean;
}

const defaultSettings: Settings = {
  arabicFont: "Traditional Arabic",
  arabicFontSize: 28,
  translationFontSize: 16,
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Load settings from localStorage on mount
    const saved = localStorage.getItem("quran-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Failed to parse settings:", error);
      }
    }
    setIsLoaded(true);
  }, []); // Empty dependency array - only runs once on mount

  useEffect(() => {
    // Skip the initial mount to prevent unnecessary writes
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Save to localStorage whenever settings change (after initial load)
    if (isLoaded) {
      localStorage.setItem("quran-settings", JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
