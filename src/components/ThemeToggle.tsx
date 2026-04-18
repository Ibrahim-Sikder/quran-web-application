// components/ThemeToggle.tsx
"use client";

import { Sun, Moon } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export function ThemeToggle() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-2 sm:space-y-3">
      <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
        <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> Theme Preference
      </label>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
  );
}
