import React from 'react';
import Image from 'next/image';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#070714] flex flex-col">
      <section className="flex flex-col items-center py-20 px-4 w-full">
        <h1 className="text-2xl md:text-4xl text-white mb-12 tracking-wide text-center">
          How it Works?
        </h1>

        <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] flex items-stretch p-10 md:p-16">
          <Image
            src="/buku-pixel.png"
            alt="Background buku"
            fill
            className="object-contain -z-10"
            priority
          />

          <div className="flex w-full text-[#1c2331] z-10">
            <div className="flex-1 flex flex-col px-4 md:px-10">
              <h2 className="text-center text-lg md:text-xl mb-10 mt-4 text-[#111827] font-bold">
                UMKM
              </h2>
              <ul className="space-y-8 flex-1 flex flex-col text-xs md:text-sm font-bold text-gray-700">
                <li className="flex items-start gap-4">
                  <Image
                    src="/quest-simbol.png"
                    alt="Ikon quest UMKM"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                  <p>Langkah 1: UMKM mengirim Quest / masalah bisnisnya.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image
                    src="/sword.png"
                    alt="Ikon solusi UMKM"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                  <p>Langkah 2: UMKM menerima solusi dari Siswa.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image
                    src="/star.png"
                    alt="Ikon UMKM berkembang"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                  <p>Langkah 3: Solusi diterapkan, UMKM berkembang!</p>
                </li>
              </ul>
            </div>

            <div className="flex-1 flex flex-col px-4 md:px-10">
              <h2 className="text-center text-lg md:text-xl mb-10 mt-4 text-[#111827] font-bold">
                SISWA
              </h2>
              <ul className="space-y-8 flex-1 flex flex-col text-xs md:text-sm font-bold text-gray-700">
                <li className="flex items-start gap-4">
                  <Image
                    src="/quest-simbol.png"
                    alt="Ikon quest siswa"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                  <p>Langkah 1: Siswa mencari dan Accept Quest.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image
                    src="/sword.png"
                    alt="Ikon pengerjaan "
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                  <p>Langkah 2: Siswa meracik dan mengerjakan solusi.</p>
                </li>
                <li className="flex items-start gap-4">
                  <Image
                    src="/star.png"
                    alt="Ikon reward siswa"
                    width={40}
                    height={40}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                  <p>Langkah 3: Misi selesai, Siswa dapet XP & Reward!</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center">
          <Image
            src="/readybg.png"
            alt="Background ready"
            fill
            className="object-cover -z-10"
            priority
          />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#070714] to-transparent -z-10" />

        <div className="relative z-10 flex flex-col items-center mt-24">
          <h1 className="text-2xl md:text-4xl text-white mb-8 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            Ready To Grow?
          </h1>
          <button
            type="button"
            className="text-[10px] md:text-xs font-bold text-black bg-[#f79e00] hover:bg-[#d98b00] px-8 py-4 border-b-4 border-r-4 border-black rounded-sm active:translate-y-1 active:translate-x-1 active:border-b-0 active:border-r-0 transition-all cursor-pointer"
          >
            Start Adventure for Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;