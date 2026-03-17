"use client"; // 🔥 Wajib ada karena kita pake router

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} // 👈 Jurus sakti balik ke halaman sebelumnya!
      className="inline-block mb-6 text-[#F59E0B] hover:text-white font-pixel text-sm md:text-base transition-colors"
    >
      {"< KEMBALI"}
    </button>
  );
}