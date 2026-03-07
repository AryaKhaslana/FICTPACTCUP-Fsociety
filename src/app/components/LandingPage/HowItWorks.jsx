"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HowItWorks = () => {
  // 1. Kumpulan kata-kata (Tanda tanya gue masukin ke sini biar ikut diketik)
  const words = ["Grow?", "Hack?", "Develop?", "Skill?"];
  
  // 2. State buat efek mesin tik
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // 3. Logika Ngetik & Hapus
  useEffect(() => {
    const word = words[currentWordIndex];
    // Kecepatan: Pas ngetik 150ms per huruf, pas nghapus lebih ngebut (100ms)
    const typingSpeed = isDeleting ? 100 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        // Kalau udah beres ngetik full 1 kata, tahan 2 detik sebelum mulai nghapus
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        // Kalau udah beres nghapus sampai kosong, lanjut ke kata berikutnya
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        // Proses nambahin/ngurangin huruf satu per satu
        setCurrentText(word.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]); // Bakal jalan terus tiap huruf berubah

  return (
    <div className="min-h-screen bg-[#070714] flex flex-col">
      <section className="flex flex-col items-center pt-20 px-4 w-full">
        <h1 className="text-2xl md:text-[48px] text-white pb-8 md:pb-[50px] tracking-wide text-center font-pixel">
          How it Works?
        </h1>

        <div className="relative w-full max-w-[981px] aspect-[981/653] md:w-[981px] flex items-stretch p-10 md:p-16">
          <Image
            src="/buku-pixel.png"
            alt="Background buku"
            fill
            className="object-contain z-0"
            priority
          />

          <div className="flex flex-col md:flex-row w-full text-[#1c2331] z-10 gap-10 md:gap-[75px]">
            {/* BAGIAN UMKM */}
            <div className="flex-1 flex flex-col px-4 md:px-[15px]">
              <h2 className="text-center text-lg md:text-xl mb-10 mt-4 text-[#111827] font-pixel">
                UMKM
              </h2>
              <ul className="space-y-6 flex-1 flex flex-col text-[17px] font-poppins font-semibold text-gray-700">
                <li className="flex items-start gap-4">
                  <Image src="/quest-simbol.png" alt="Ikon quest UMKM" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 shrink-0" />
                  <p>Langkah 1: UMKM mengirim Quest / masalah bisnisnya.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image src="/sword.png" alt="Ikon solusi UMKM" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 shrink-0" />
                  <p>Langkah 2: UMKM menerima solusi dari Siswa.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image src="/star.png" alt="Ikon UMKM berkembang" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 shrink-0" />
                  <p>Langkah 3: Solusi selesai, UMKM berkembang!</p>
                </li>
              </ul>
            </div>

            {/* BAGIAN SISWA */}
            <div className="flex-1 flex flex-col px-4 md:px-10">
              <h2 className="text-center text-lg md:text-xl mb-10 mt-4 text-[#111827] font-pixel">
                SISWA
              </h2>
              <ul className="space-y-8 flex-1 flex flex-col text-[17px] font-semibold text-gray-700 font-poppins">
                <li className="flex items-start gap-4">
                  <Image src="/quest-simbol.png" alt="Ikon quest siswa" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 shrink-0" />
                  <p>Langkah 1: Siswa mencari dan Accept Quest.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image src="/sword.png" alt="Ikon pengerjaan" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 shrink-0" />
                  <p>Langkah 2: Siswa meracik dan mengerjakan solusi.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image src="/star.png" alt="Ikon reward siswa" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 shrink-0" />
                  <p>Langkah 3: Misi selesai, Siswa dapet XP & Reward!</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION BAWAH */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full h-[500px] md:h-[700px]">
          <Image
            src="/readybg.png"
            alt="Background ready"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#070714] to-transparent z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full">
          
          {/* IMPLEMENTASI EFEK MESIN TIK (TYPEWRITER) */}
          <h1 className="text-2xl md:text-[60px] text-white mb-8 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] font-pixellari flex items-center justify-center gap-x-3 min-h-[50px]">
            Ready To
            <span className="text-[#f79e00] pl-8 flex items-center">
              {currentText}
              {/* Kursor kotak ala terminal game yang kedap-kedip */}
              <span className="animate-pulse ml-1 text-white opacity-80">_</span>
            </span>
          </h1>

          <button
            type="button"
            className="mt-4 px-10 py-3 bg-[#FFB800] hover:bg-[#E6A600] text-black font-pixellari text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1"
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