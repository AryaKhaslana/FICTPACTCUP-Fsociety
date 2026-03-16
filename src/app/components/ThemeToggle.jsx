"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// Import Sun doang karena Moon-nya mau pake gambar lu sendiri
import { Sun } from "lucide-react"; 

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
      {/* Kalo mode dark, munculin matahari Lucide. Kalo light, munculin gambar bulan lu! */}
      {theme === "dark" ? (
        <Sun size={24} className="text-yellow-400" />
      ) : (
        // 🔥 INI DIA GAMBAR BULAN LU KAPTEN! 🔥
        <img src="/moon.png" alt="Bulan" className="w-7 h-7 object-contain brightness-0" />
      )}
    </button>
  );
}