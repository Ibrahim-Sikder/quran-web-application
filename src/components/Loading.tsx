import { BookOpen } from "lucide-react";
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
          <BookOpen className="h-10 w-10 text-emerald-600" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Loading settings...
        </p>
      </div>
    </div>
  );
}
