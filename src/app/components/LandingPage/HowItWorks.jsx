"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HowItWorks = () => {
  const words = ["Grow?", "Hack?", "Develop?", "Skill?"];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const typingSpeed = isDeleting ? 100 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(word.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]); 

  return (
    // 🔥 Tambahin overflow-x-hidden di bungkusan paling luar biar aman dari scroll bocor
    <div className="min-h-screen bg-[#070714] flex flex-col overflow-x-hidden font-pixellari">
      
      <section className="flex flex-col items-center pt-20 w-full">
        <h1 className="text-3xl md:text-[48px] text-white pb-6 md:pb-[50px] tracking-wide text-center" 
            style={{ fontFamily: "'Press Start 2P', cursive", lineHeight: "1.4" }}>
          How it Works?
        </h1>

        {/* 🔥 BUNGKUSAN SCROLL HORIZONTAL (JURUS SWIPE SAKTI) 🔥 */}
        <div className="w-full overflow-x-auto pb-10 px-4 md:px-0 snap-x snap-mandatory">
          
          {/* Sembunyiin scrollbar jelek */}
          <style jsx>{`
            div::-webkit-scrollbar { display: none; }
            div { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {/* 🔥 BUKU DIKASIH min-w-[800px] BIAR GAK GEPENG DI HP 🔥 */}
          <div className="relative w-full min-w-[800px] md:min-w-0 max-w-[981px] aspect-[981/653] mx-auto flex items-stretch p-12 md:p-16 snap-center">
            
            <Image
              src="/buku-pixel.png"
              alt="Background buku"
              fill
              className="object-contain z-0 pointer-events-none"
              priority
            />

            {/* KONTEN DALAM BUKU */}
            <div className="flex w-full text-[#1c2331] z-10 gap-16 md:gap-[75px] mt-4 md:mt-0">
              
              {/* BAGIAN UMKM (HALAMAN KIRI) */}
              <div className="flex-1 flex flex-col px-6 md:px-[15px]">
                <h2 className="text-center text-xl md:text-2xl font-bold mb-6 md:mb-10 mt-4 text-[#111827]">
                  UMKM
                </h2>
                <ul className="space-y-6 flex-1 flex flex-col text-sm md:text-[17px] font-poppins font-semibold text-gray-800">
                  <li className="flex items-start gap-4">
                    <Image src="/quest-simbol.png" alt="Ikon quest UMKM" width={48} height={48} className="w-10 h-10 md:w-16 md:h-16 shrink-0" />
                    <p className="leading-relaxed">Langkah 1: UMKM mengirim Quest / masalah bisnisnya.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src="/sword.png" alt="Ikon solusi UMKM" width={48} height={48} className="w-10 h-10 md:w-16 md:h-16 shrink-0" />
                    <p className="leading-relaxed">Langkah 2: UMKM menerima solusi dari Siswa.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src="/star.png" alt="Ikon UMKM berkembang" width={48} height={48} className="w-10 h-10 md:w-16 md:h-16 shrink-0" />
                    <p className="leading-relaxed">Langkah 3: Solusi selesai, UMKM berkembang!</p>
                  </li>
                </ul>
              </div>

              {/* BAGIAN SISWA (HALAMAN KANAN) */}
              <div className="flex-1 flex flex-col px-6 md:px-10">
                <h2 className="text-center text-xl md:text-2xl font-bold mb-6 md:mb-10 mt-4 text-[#111827]">
                  SISWA
                </h2>
                <ul className="space-y-6 flex-1 flex flex-col text-sm md:text-[17px] font-semibold text-gray-800 font-poppins">
                  <li className="flex items-start gap-4">
                    <Image src="/quest-simbol.png" alt="Ikon quest siswa" width={48} height={48} className="w-10 h-10 md:w-16 md:h-16 shrink-0" />
                    <p className="leading-relaxed">Langkah 1: Siswa mencari dan Accept Quest.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src="/sword.png" alt="Ikon pengerjaan" width={48} height={48} className="w-10 h-10 md:w-16 md:h-16 shrink-0" />
                    <p className="leading-relaxed">Langkah 2: Siswa meracik dan mengerjakan solusi.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src="/star.png" alt="Ikon reward siswa" width={48} height={48} className="w-10 h-10 md:w-16 md:h-16 shrink-0" />
                    <p className="leading-relaxed">Langkah 3: Misi selesai, Siswa dapet XP & Reward!</p>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION BAWAH (CTA) */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full h-[400px] md:h-[700px]">
          <Image
            src="/readybg.png"
            alt="Background ready"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#070714] to-transparent z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
          
          {/* 🔥 TYPEWRITER DIPERBAIKI 🔥 
              Di HP: Jadi atas-bawah (flex-col) biar kursornya gak kepotong layar! 
              Di Laptop: Sejajar (md:flex-row) */}
          <h1 className="text-4xl md:text-[60px] text-white mb-8 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-center gap-y-3 md:gap-x-4 min-h-[90px] md:min-h-[50px]">
            <span>Ready To</span>
            <span className="text-[#f79e00] flex items-center">
              {currentText}
              <span className="animate-pulse ml-1 text-white opacity-80">_</span>
            </span>
          </h1>

          <button
            type="button"
            className="mt-2 md:mt-4 px-8 md:px-10 py-4 md:py-3 bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold text-base md:text-lg rounded-xl transition-all shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1 active:translate-y-2 active:shadow-none uppercase tracking-wide"
          >
            Start Adventure for Free
          </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;