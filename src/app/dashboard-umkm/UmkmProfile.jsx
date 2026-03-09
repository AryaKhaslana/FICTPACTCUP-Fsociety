"use client";

import Image from "next/image";

export default function UmkmProfile() {
  return (
    <section className="bg-[#11131A] border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#f79e00] to-[#ff4d00] border border-white/20">
          {/* Dummy foto UMKM */}
          <Image
            src="/umkm-placeholder.png"
            alt="Foto UMKM"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg md:text-xl font-semibold">Nasgor mas ambas</h2>
          <span className=" items-center font-medium py-1 text-[15px] uppercase tracking-wide text-[#f79e00]">
            F&B
          </span>
        </div>
      </div>

      <div className="space-y-3 text-xs md:text-sm text-white/80">
        <div className="flex items-center gap-1 text-[#f79e00] text-[20px]">
          <span>★★★★★</span>
          <span className="ml-1 text-[11px] text-white/60">(4.8/5.0)</span>
        </div>
        <p>
          Menyediakan racikan nasi goreng penambah HP terbaik se-Sidoarjo. Sedang
          mencari pahlawan visual!
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] md:text-xs text-white/70 border-y border-white/10 py-4">
        <div className="flex flex-col pl-5 text-[16px]">
          <span className="text-white font-semibold text-center">5</span>
          <span>Misi aktif</span>
        </div>
        <div className="h-8 w-px bg-white/50" />
        <div className="flex flex-col text-center pr-5 text-[16px]">
          <span className="text-white font-semibold">1</span>
          <span>Misi selesai</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-1 w-full rounded-xl bg-transparent border border-white/40 text-xs md:text-sm py-3 font-semibold border-b-4 border-r-4 border-white active:translate-y-0.5 active:translate-x-0.5 active:border-b-0 active:border-r-0 transition-all"
      >
        Lihat Profil
      </button>
    </section>
  );
}