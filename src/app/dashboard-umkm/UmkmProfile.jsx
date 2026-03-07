"use client";

import Image from "next/image";

export default function UmkmProfile() {
  return (
    <section className="bg-[#111121] border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col gap-6">
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
          <span className="inline-flex items-center rounded-full bg-[#1b1b30] px-3 py-1 text-[10px] uppercase tracking-wide text-[#f79e00] border border-[#f79e00]/60">
            Klien elite
          </span>
        </div>
      </div>

      <div className="space-y-3 text-xs md:text-sm text-white/80">
        <div className="flex items-center gap-1 text-[#f79e00]">
          <span>★★★★★</span>
          <span className="ml-1 text-[11px] text-white/60">(4.8/5.0)</span>
        </div>
        <p>
          Menyediakan racikan nasi goreng penambah HP terbaik se-Sidoarjo. Sedang
          mencari pahlawan visual!
        </p>
      </div>

      <div className="flex items-center justify-between text-[11px] md:text-xs text-white/70 border-y border-white/10 py-4">
        <div className="flex flex-col">
          <span className="text-white font-semibold">20</span>
          <span>Total Quest Dibuat</span>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex flex-col text-right">
          <span className="text-white font-semibold">10.000 XP</span>
          <span>Pahlawan Dibayar</span>
        </div>
      </div>

      <div className="flex items-center justify-center text-[11px] md:text-xs text-white/70">
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[10px]">
              +
            </span>
            <span className="text-[10px] max-w-20 text-center">Join UMKM</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[10px]">
              ✔
            </span>
            <span className="text-[10px] max-w-20 text-center" >UMKM Terpercaya</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[10px]">
              ★
            </span>
            <span className="text-[10px] max-w-20 text-center">20x Memberi misi</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-1 w-full rounded-xl bg-transparent border border-white/40 text-xs md:text-sm py-3 font-semibold hover:bg-white hover:text-black border-b-4 border-r-4 border-white active:translate-y-0.5 active:translate-x-0.5 active:border-b-0 active:border-r-0 transition-all"
      >
        Lihat Profil
      </button>
    </section>
  );
}