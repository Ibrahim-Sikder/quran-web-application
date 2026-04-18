/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  revelationFilter: "all" | "Meccan" | "Medinan";
  onFilterChange: (value: "all" | "Meccan" | "Medinan") => void;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  revelationFilter,
  onFilterChange,
}: SearchBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by Surah name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>
        <div>
          <select
            value={revelationFilter}
            onChange={(e) => onFilterChange(e.target.value as any)}
            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Surahs</option>
            <option value="Meccan">Meccan Surahs</option>
            <option value="Medinan">Medinan Surahs</option>
          </select>
        </div>
      </div>
    </div>
  );
}
