import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    // relative & min-h-screen bikin ukurannya pas 1 layar laptop
    <section className="relative w-full h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
      
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pixel-hero.png" // Pastikan nama file ini sesuai di folder public lu
          alt="XPact Hero Background"
          fill
          className="object-cover object-center"
          priority // Bikin gambar ini di-load duluan
        />
        {/* Overlay hitam transparan biar teks kuningnya makin kebaca */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. Content Layer (Teks & Tombol) */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto mt-10">
        
        {/* Judul dengan warna kuning dan shadow ala game */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#FFB800] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-wide leading-tight">
          Mulai Petualangan <br /> Nyatamu!
        </h1>
        
        {/* Sub-judul putih */}
        <p className="text-sm md:text-lg text-white font-medium drop-shadow-md max-w-lg">
          Ambil misi, asah skill, dan ciptakan dampak untuk bisnis lokal
        </p>

        {/* Tombol Mulai */}
        <button className="mt-4 px-10 py-3 bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1">
          Mulai
        </button>

      </div>
    </section>
  );
}