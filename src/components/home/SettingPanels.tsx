"use client";

import { X, Moon, Sun, Type, ZoomIn, ZoomOut, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useSettings } from "@/context/SettingsContext";
import { useState, useRef, useEffect } from "react";
import { SettingsPanelProps } from "@/types/quran";

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useSettings();
  const [, setPreviewText] = useState("");
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFontDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFontChange = (font: string) => {
    updateSettings({ arabicFont: font });
    document.body.style.setProperty("--arabic-font-family", font);
    setPreviewText(font);
    setIsFontDropdownOpen(false);
  };

  const handleArabicSizeChange = (size: number) => {
    updateSettings({ arabicFontSize: size });
  };

  const handleTranslationSizeChange = (size: number) => {
    updateSettings({ translationFontSize: size });
  };

  const selectedFontLabel =
    fontOptions.find((f) => f.value === settings.arabicFont)?.label ||
    settings.arabicFont;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-premium-lg overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h2 className="text-xl sm:text-2xl font-bold font-heading gradient-text">
            Settings
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Theme Toggle */}
          <div className="space-y-2 sm:space-y-3">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> Theme Preference
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 ">
              <button
                onClick={() => updateSettings({ theme: "light" })}
                className={`cursor-pointer p-2 sm:p-3 rounded-xl border-2 transition-all ${
                  settings.theme === "light"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-emerald-300"
                }`}
              >
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1" />
                <span className="text-xs sm:text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => updateSettings({ theme: "dark" })}
                className={`cursor-pointer p-2 sm:p-3 rounded-xl border-2 transition-all ${
                  settings.theme === "dark"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-emerald-300"
                }`}
              >
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1" />
                <span className="text-xs sm:text-sm font-medium">Dark</span>
              </button>
            </div>
          </div>

          {/* Arabic Font Style - Custom Dropdown for better mobile experience */}
          <div className="space-y-2 sm:space-y-3">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Type className="h-3 w-3 sm:h-4 sm:w-4" /> Arabic Font Style
            </label>

            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-emerald-500 focus:outline-none flex items-center justify-between text-left"
              >
                <span className="text-sm sm:text-base truncate">
                  {selectedFontLabel}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isFontDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isFontDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                  {fontOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleFontChange(opt.value)}
                      className={`w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        settings.arabicFont === opt.value
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                          : ""
                      }`}
                    >
                      <span className={`text-sm sm:text-base ${opt.className}`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="mt-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Preview:
              </p>
              <p
                className="text-right text-lg sm:text-xl"
                style={{
                  fontFamily: settings.arabicFont,
                  fontSize: "clamp(18px, 5vw, 24px)",
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p
                className="text-gray-600 dark:text-gray-400 mt-2 text-xs sm:text-sm"
                style={{ fontSize: "clamp(12px, 3vw, 14px)" }}
              >
                Bismillahir Rahmanir Rahim
              </p>
            </div>
          </div>

          {/* Arabic Font Size */}
          <div className="space-y-2 sm:space-y-3">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" /> Arabic Text Size:{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {settings.arabicFontSize}px
              </span>
            </label>
            <input
              type="range"
              min="16"
              max="40"
              step="1"
              value={settings.arabicFontSize}
              onChange={(e) => handleArabicSizeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((settings.arabicFontSize - 16) / 24) * 100}%, #e5e7eb ${((settings.arabicFontSize - 16) / 24) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>16px</span>
              <span>24px</span>
              <span>32px</span>
              <span>40px</span>
            </div>
            {/* Live Preview for size */}
            <p
              className="text-right mt-2 text-emerald-600 dark:text-emerald-400 break-words"
              style={{
                fontSize: `${settings.arabicFontSize}px`,
                fontFamily: settings.arabicFont,
              }}
            >
              Preview: الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
            </p>
          </div>

          {/* Translation Font Size */}
          <div className="space-y-2 sm:space-y-3">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" /> Translation Size:{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {settings.translationFontSize}px
              </span>
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
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((settings.translationFontSize - 12) / 12) * 100}%, #e5e7eb ${((settings.translationFontSize - 12) / 12) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>12px</span>
              <span>16px</span>
              <span>20px</span>
              <span>24px</span>
            </div>
            {/* Live Preview for translation size */}
            <p
              className="text-gray-600 dark:text-gray-400 mt-2 break-words"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              Preview: All praise is due to Allah, Lord of the worlds
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
