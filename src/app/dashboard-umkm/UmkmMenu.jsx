"use client";

export default function UmkmMenu() {
  return (
    <section className="flex flex-col gap-4">
      {/* Card: Buat misi baru */}
      <div className="bg-[#11131A] border-1 border-gray-400 rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
          Misi UMKM
        </p>
        <button
          type="button"
          className="w-full py-2 rounded-[7px] border-1 border-gray-400 text-base font-pixellari text-gray-300 transition-all shadow-[0_4px_0_0_#A8A8A8] hover:shadow-[0_2px_0_0_#A8A8A8] hover:translate-y-1 active:translate-y-2 active:shadow-none"
        >
          + Buat Misi Baru
        </button>
      </div>

    </section>
  );
}