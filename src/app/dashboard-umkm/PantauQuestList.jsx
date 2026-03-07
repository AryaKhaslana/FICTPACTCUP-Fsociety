"use client";

import Image from "next/image";

const dummyQuests = [
  {
    id: 1,
    statusLabel: "Selesai",
    statusColor: "text-[#3bd47f]",
    badgeColor: "bg-[#193525]",
    buttonVariant: "bg-[#f79e00] hover:bg-[#d98b00] text-black",
    progress: 100,
  },
  {
    id: 2,
    statusLabel: "Revisi",
    statusColor: "text-[#ff4d5a]",
    badgeColor: "bg-[#3a1117]",
    buttonVariant: "bg-[#ff4d5a] hover:bg-[#d83847] text-white",
    progress: 50,
  },
  {
    id: 3,
    statusLabel: "Sedang dikerjakan",
    statusColor: "text-[#f79e00]",
    badgeColor: "bg-[#332414]",
    buttonVariant: "bg-[#f79e00] hover:bg-[#d98b00] text-black",
    progress: 40,
  },
];

export default function PantauQuestList() {
  return (
    <section className="bg-transparent">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Pantau Quest</h1>

      <div className="flex flex-col gap-5">
        {dummyQuests.map((quest) => (
          <article
            key={quest.id}
            className="relative overflow-hidden rounded-2xl bg-[#111121] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row"
          >
            {/* Konten kiri */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full ${quest.badgeColor} ${quest.statusColor} font-semibold uppercase tracking-[0.12em] text-[10px]`}
                >
                  {quest.statusLabel}
                </span>
                <span className="text-white/60">
                  – Dikerjakan oleh: <span className="font-medium">Adrian</span>
                </span>
              </div>

              <div>
                <p className="text-sm text-white/70">Bikin Logo Bakwan mas rusdi</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{quest.statusLabel === "Revisi" ? "Progres Revisi" : "Progres"}</span>
                  <span>{quest.progress} %</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full ${
                      quest.statusLabel === "Revisi"
                        ? "bg-[#ff4d5a]"
                        : "bg-[#f79e00]"
                    }`}
                    style={{ width: `${quest.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  className={`px-5 py-2 rounded-xl text-xs md:text-sm font-semibold border-b-4 border-r-4 border-black active:translate-y-0.5 active:translate-x-0.5 active:border-b-0 active:border-r-0 transition-all ${quest.buttonVariant}`}
                >
                  Review
                </button>
              </div>
            </div>

            {/* Gambar kanan dummy */}
            <div className="relative w-full sm:w-60 lg:w-72 h-32 sm:h-auto shrink-0">
              <Image
                src="/quest-food-placeholder.png"
                alt="Foto quest UMKM"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}