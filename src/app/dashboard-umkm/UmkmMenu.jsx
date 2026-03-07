"use client";

export default function UmkmMenu() {
  return (
    <section className="flex flex-col gap-4">
      {/* Card: Buat misi baru */}
      <div className="bg-[#111121] border border-dashed border-white/25 rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
          Misi UMKM
        </p>
        <button
          type="button"
          className="bg-[#FFB800] hover:bg-[#e6a500] text-black text-center block font-bold py-2 rounded-xl w-full border-b-4 border-r-4 border-black active:translate-y-0.5 active:translate-x-0.5 active:border-b-0 active:border-r-0 transition-all"
        >
          + Buat Misi Baru
        </button>
      </div>

      {/* Card: Riwayat misi */}
      <div className="bg-[#111121] border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between text-sm shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3">
          <span className="text-lg">📜</span>
          <span className="font-medium">Riwayat Misi</span>
        </div>
        <span className="text-xs text-white/60 underline underline-offset-4 cursor-pointer">
          Lihat semua
        </span>
      </div>
    </section>
  );
}