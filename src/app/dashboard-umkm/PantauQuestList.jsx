"use client";

import Image from "next/image";

// 👇 1. Tangkep props 'quests' dari bapaknya (page.jsx)
export default function PantauQuestList({ quests = [] }) {
  
  return (
    <section className="bg-transparent">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Pantau Quest</h1>

      {/* 👇 2. LOGIKA EMPTY STATE: Kalau datanya kosong (0), tampilin ini 👇 */}
      {quests.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl bg-[#111121] border border-dashed border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl opacity-50">📜</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Belum Ada Quest Aktif</h3>
          <p className="text-sm text-white/50 max-w-md mb-6">
            Lu belum bikin misi atau belum ada pahlawan yang ngambil misi lu bos. Buat misi baru sekarang biar UMKM lu makin gacor!
          </p>
        </div>
      ) : (
        
        /* 👇 3. Kalau datanya ADA, baru kita looping pake .map() 👇 */
        <div className="flex flex-col gap-5 ">
          {quests.map((quest) => {
            
            // Jaring pengaman & mapping warna dari DB ke UI lu
            // (Nanti lu sesuaikan sama nama kolom di DB lu ya)
            const judul = quest.title || "Bikin Logo Bakwan mas rusdi";
            const pahlawan = quest.studentName || "Belum ada";
            const progress = quest.progress || 0;
            const statusLabel = quest.status || "Sedang dikerjakan";
            
            // Logika ganti warna badge tergantung status
            let statusColor = "text-[#f79e00]";
            let badgeColor = "bg-[#332414]";
            let buttonVariant = "bg-[#f79e00] hover:bg-[#d98b00] text-black";
            let progressColor = "bg-[#f79e00]";

            if (statusLabel === "Selesai" || statusLabel === "COMPLETED") {
              statusColor = "text-[#3bd47f]";
              badgeColor = "bg-[#193525]";
            } else if (statusLabel === "Revisi" || statusLabel === "REVISION") {
              statusColor = "text-[#ff4d5a]";
              badgeColor = "bg-[#3a1117]";
              buttonVariant = "bg-[#ff4d5a] hover:bg-[#d83847] text-white";
              progressColor = "bg-[#ff4d5a]";
            }

            return (
              <article
                key={quest.id}
                className="relative overflow-hidden rounded-2xl bg-[#111121] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row"
              >
                {/* Konten kiri */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4 bg-[#11131A]">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full ${badgeColor} ${statusColor} font-semibold uppercase tracking-[0.12em] text-[10px]`}>
                      {statusLabel}
                    </span>
                    <span className="text-white/60">
                      – Dikerjakan oleh: <span className="font-medium">{pahlawan}</span>
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-white/70">{judul}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{statusLabel === "Revisi" ? "Progres Revisi" : "Progres"}</span>
                      <span>{progress} %</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full ${progressColor}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="button"
                      className={`px-5 py-2 rounded-xl text-xs md:text-sm font-semibold border-b-4 border-r-4 border-black active:translate-y-0.5 active:translate-x-0.5 active:border-b-0 active:border-r-0 transition-all ${buttonVariant}`}
                    >
                      Review
                    </button>
                  </div>
                </div>

                {/* Gambar kanan */}
                <div className="relative w-full sm:w-60 lg:w-72 h-32 sm:h-auto shrink-0">
                  {/* Pake img biasa aja biar aman dari error src Next.js */}
                  <img
                    src={quest.thumbnailUrl || "/foto-bakso.png"}
                    alt="Quest thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#11131A] via-[#11131A]/80 to-transparent hidden md:block"></div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}