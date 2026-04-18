/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Settings {
  arabicFont: string;
  arabicFontSize: number;
  translationFontSize: number;
  theme: "light" | "dark";
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  isLoaded: boolean;
}

const defaultSettings: Settings = {
  arabicFont: "Noto Naskh Arabic",
  arabicFontSize: 24,
  translationFontSize: 16,
  theme: "light",
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quran-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        if (parsed.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        // Apply font to root element
        applyFontToRoot(parsed.arabicFont);
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const applyFontToRoot = (font: string) => {
    // Apply font to root element for global usage
    document.documentElement.style.setProperty("--arabic-font-family", font);
    // Also apply to body for arabic-text class
    document.body.style.setProperty("--arabic-font-family", font);
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("quran-settings", JSON.stringify(updated));

    if (updated.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply font globally when changed
    if (updated.arabicFont) {
      applyFontToRoot(updated.arabicFont);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};
