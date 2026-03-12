import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
      
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
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. Content Layer (Teks & Tombol) */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto mt-10">
        
        {/* 🔥 ANIMASI 1: JUDUL MELAYANG SANTUY (Durasi 3 Detik) 🔥 */}
        <div className="animate-bounce" style={{ animationDuration: '3s' }}>
          <Image
            src="/text-hero.png"
            alt="Mulai Petualangan Nyatamu!"
            width={600}
            height={200}
            className="w-full max-w-xl md:max-w-2xl h-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            priority
          />
        </div>
        
        {/* 🔥 ANIMASI 2: SUB-JUDUL MUNCUL LEBIH LAMBAT (Durasi 2 Detik / 2000ms) 🔥 */}
        <p className="text-sm md:text-lg text-white font-poppins font-medium drop-shadow-md max-w-lg animate-in slide-in-from-bottom-5 fade-in duration-[2000ms] fill-mode-both">
          Ambil misi, asah skill, dan ciptakan dampak untuk bisnis lokal
        </p>

        {/* 🔥 ANIMASI 3: TOMBOL NAFAS LEBIH PELAN (Durasi 2.5 Detik) 🔥 */}
        <button 
          className="mt-4 px-10 py-3 bg-[#FFB800] hover:bg-[#E6A600] text-black font-pixel text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_4px_0_0_#996E00,0_0_20px_rgba(255,184,0,0.5)] hover:shadow-[0_2px_0_0_#996E00,0_0_30px_rgba(255,184,0,0.8)] hover:translate-y-1   "
        >
          Mulai
        </button>

      </div>
    </section>
  );
}