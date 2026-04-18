"use client";

import { X, Moon, Sun, Type, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../button";
import { useSettings } from "@/context/SettingsContext";
import { useEffect, useState } from "react";

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useSettings();
  const [previewText, setPreviewText] = useState("");

  const fontOptions = [
    {
      value: "Noto Naskh Arabic",
      label: "Noto Naskh Arabic",
      className: "font-arabic-noto",
    },
    { value: "Amiri", label: "Amiri", className: "font-arabic-amiri" },
    {
      value: "Scheherazade New",
      label: "Scheherazade New",
      className: "font-arabic-scheherazade",
    },
  ];

  const handleFontChange = (font: string) => {
    updateSettings({ arabicFont: font });
    // Force immediate update on body
    document.body.style.setProperty("--arabic-font-family", font);
    // Trigger re-render of preview
    setPreviewText(font);
  };

  const handleArabicSizeChange = (size: number) => {
    updateSettings({ arabicFontSize: size });
  };

  const handleTranslationSizeChange = (size: number) => {
    updateSettings({ translationFontSize: size });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-premium-lg overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-bold font-heading gradient-text">
            Settings
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Toggle */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Sun className="h-4 w-4" /> Theme Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateSettings({ theme: "light" })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  settings.theme === "light"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <Sun className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => updateSettings({ theme: "dark" })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  settings.theme === "dark"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <Moon className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Dark</span>
              </button>
            </div>
          </div>

          {/* Arabic Font Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Type className="h-4 w-4" /> Arabic Font Style
            </label>
            <select
              value={settings.arabicFont}
              onChange={(e) => handleFontChange(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-emerald-500 focus:outline-none"
            >
              {fontOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Live Preview with selected font */}
            <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Preview:
              </p>
              <p
                className="arabic-text text-right text-xl"
                style={{
                  fontFamily: settings.arabicFont,
                  fontSize: "24px",
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p
                className="text-gray-600 dark:text-gray-400 mt-2 text-sm"
                style={{ fontSize: "14px" }}
              >
                Bismillahir Rahmanir Rahim
              </p>
            </div>
          </div>

          {/* Arabic Font Size */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ZoomIn className="h-4 w-4" /> Arabic Text Size:{" "}
              {settings.arabicFontSize}px
            </label>
            <input
              type="range"
              min="16"
              max="40"
              step="1"
              value={settings.arabicFontSize}
              onChange={(e) => handleArabicSizeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>16px</span>
              <span>24px</span>
              <span>32px</span>
              <span>40px</span>
            </div>
            {/* Live Preview for size */}
            <p
              className="arabic-text text-right mt-2 text-emerald-600 dark:text-emerald-400"
              style={{
                fontSize: `${settings.arabicFontSize}px`,
                fontFamily: settings.arabicFont,
              }}
            >
              Preview: الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
            </p>
          </div>

          {/* Translation Font Size */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ZoomOut className="h-4 w-4" /> Translation Size:{" "}
              {settings.translationFontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="24"
              step="1"
              value={settings.translationFontSize}
              onChange={(e) =>
                handleTranslationSizeChange(parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>12px</span>
              <span>16px</span>
              <span>20px</span>
              <span>24px</span>
            </div>
            {/* Live Preview for translation size */}
            <p
              className="text-gray-600 dark:text-gray-400 mt-2"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              Preview: All praise is due to Allah, Lord of the worlds
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}
