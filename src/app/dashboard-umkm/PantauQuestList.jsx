"use client";
import Image from "next/image";

// 🔥 Tangkep props namanya 'submissions' sekarang
export default function PantauQuestList({ submissions = [] }) {
  
  return (
    <section className="bg-transparent">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Pantau Quest</h1>

      {submissions.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl bg-[#111121] border border-dashed border-white/20 flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
          <h3 className="text-xl font-bold text-white mb-2">Belum Ada Pahlawan</h3>
          <p className="text-sm text-white/50">Belum ada siswa yang ngambil misi lu bos.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 ">
          {submissions.map((sub) => {
            
            // Ekstrak data dari relasi (Quest & Student)
            const judul = sub.quest?.title || "Misi Tanpa Judul";
            const pahlawan = sub.student?.username || "Pahlawan misterius";
            const thumbnail = sub.quest?.image || "/foto-bakso.png";

            // 💡 LOGIKA TRANSLASI STATUS DB KE UI 💡
            let statusLabel = "Sedang dikerjakan";
            let statusColor = "text-[#f79e00]";
            let badgeColor = "bg-[#332414]";
            let buttonVariant = "bg-[#f79e00] hover:bg-[#d98b00] text-black";
            let progressColor = "bg-[#f79e00]";
            let progress = 40;
            let buttonText = "Pantau";

            if (sub.status === "PENDING") {
              if (sub.fileUrl && sub.fileUrl !== "") {
                statusLabel = "Butuh Review";
                progress = 90;
                buttonText = "Review Tugas";
              } else {
                statusLabel = "Sedang dikerjakan";
                progress = 40;
                buttonText = "Pantau Progres";
              }
            } else if (sub.status === "APPROVED" || sub.status === "COMPLETED") {
              statusLabel = "Selesai";
              statusColor = "text-[#3bd47f]";
              badgeColor = "bg-[#193525]";
              progressColor = "bg-[#3bd47f]";
              progress = 100;
              buttonText = "Lihat Hasil";
            } else if (sub.status === "REJECTED") {
              statusLabel = "Revisi";
              statusColor = "text-[#ff4d5a]";
              badgeColor = "bg-[#3a1117]";
              buttonVariant = "bg-[#ff4d5a] hover:bg-[#d83847] text-white";
              progressColor = "bg-[#ff4d5a]";
              progress = 50;
              buttonText = "Pantau Revisi";
            }

            return (
              <article
                key={sub.id}
                className="relative overflow-hidden rounded-2xl bg-[#111121] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row"
              >
                <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4 bg-[#11131A]">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full ${badgeColor} ${statusColor} font-semibold uppercase tracking-[0.12em] text-[10px]`}>
                      {statusLabel}
                    </span>
                    <span className="text-white/60">
                      – Dikerjakan oleh: <span className="font-medium text-white">{pahlawan}</span>
                    </span>
                  </div>

                  <div>
                    <p className="text-sm md:text-base font-bold text-white/90">{judul}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{statusLabel === "Revisi" ? "Progres Revisi" : "Progres"}</span>
                      <span>{progress} %</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full ${progressColor}`} style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="mt-2">
                    <button type="button" className={`px-5 py-2 rounded-xl text-xs md:text-sm font-semibold border-b-4 border-r-4 border-black active:translate-y-0.5 active:translate-x-0.5 active:border-b-0 active:border-r-0 transition-all ${buttonVariant}`}>
                      {buttonText}
                    </button>
                  </div>
                </div>

                <div className="relative w-full sm:w-60 lg:w-72 h-32 sm:h-auto shrink-0">
                  <img src={thumbnail} alt="Quest thumbnail" className="w-full h-full object-cover" />
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