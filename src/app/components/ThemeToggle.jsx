"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // Pake icon dari lucide

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah error hydration di Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {/* Kalo mode dark, munculin matahari. Kalo light, munculin bulan */}
      {theme === "dark" ? (
        <Sun size={24} className="text-yellow-400" />
      ) : (
        <Moon size={24} className="text-gray-800" />
      )}
    </button>
  );
}