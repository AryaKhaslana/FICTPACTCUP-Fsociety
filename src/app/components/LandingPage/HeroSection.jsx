import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    // 🔥 Ganti mt-19 jadi mt-16 atau mt-20 (karena mt-19 gak ada di default tailwind)
    // h-[90vh] diubah jadi h-[85vh] md:h-[90vh] biar di HP gak nabrak bawah banget
    <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden mt-16 md:mt-20">
      
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pixel-hero.gif" 
          alt="XPact Hero Background"
          fill
          className="object-cover object-center"
          priority 
          unoptimized 
        />
        {/* Gelapin dikit lagi bg-nya biar teks pop up */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
      </div>

      {/* 2. Content Layer (Teks & Tombol) */}
      {/* 🔥 Hapus mt-10 di sini biar dia bener-bener di TENGAH (center) layar 🔥 */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-w-3xl mx-auto w-full">
        
        {/* 🔥 ANIMASI 1: JUDUL MELAYANG SANTUY 🔥 */}
        <div className="animate-bounce w-full max-w-[280px] md:max-w-xl mx-auto" style={{ animationDuration: '3s' }}>
          <Image
            src="/text-hero.png"
            alt="Mulai Petualangan Nyatamu!"
            width={600}
            height={200}
            className="w-full h-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            priority
          />
        </div>
        
        {/* 🔥 ANIMASI 2: SUB-JUDUL 🔥 */}
        <p className="text-sm md:text-lg text-gray-200 font-poppins font-medium drop-shadow-lg max-w-sm md:max-w-lg animate-in slide-in-from-bottom-5 fade-in duration-[2000ms] fill-mode-both px-2">
          Ambil misi, asah skill, dan ciptakan dampak untuk bisnis lokal.
        </p>

        {/* 🔥 ANIMASI 3: TOMBOL 🔥 */}
        <button 
          className="mt-2 md:mt-4 px-10 py-3 md:py-4 bg-[#FFB800] hover:bg-[#E6A600] text-black font-pixel text-base md:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-[0_4px_0_0_#996E00,0_0_20px_rgba(255,184,0,0.5)] hover:shadow-[0_2px_0_0_#996E00,0_0_30px_rgba(255,184,0,0.8)] hover:translate-y-1 active:translate-y-2 active:shadow-none uppercase tracking-wider"
        >
          Mulai
        </button>

      </div>
    </section>
  );
}