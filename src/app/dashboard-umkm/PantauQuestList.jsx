"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PantauQuestList({ submissions = [] }) {
  const router = useRouter();
  
  // State buat Modal Pop-up Hasil Siswa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi buat eksekusi ACC atau REVISI
  const handleAction = async (submissionId, action) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/submissions/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          submissionId, 
          rejectMessage: action === 'reject' ? "Tolong perbaiki lagi ya pahlawan!" : '' // Pesan default kalo revisi
        })
      });
      if (res.ok) {
        setIsModalOpen(false);
        setSelectedSub(null);
        router.refresh(); // Otomatis ngilangin/merahin kartu!
      } else {
        alert("Gagal proses bos!");
      }
    } catch (error) {
      alert("Koneksi meledak broskie!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi pas tombol "Pantau / Review" di kartu dipencet
  const handleButtonClick = (sub) => {
    if (sub.status === "PENDING" && sub.fileUrl && sub.fileUrl !== "") {
      setSelectedSub(sub);
      setIsModalOpen(true); // 🔥 BUKA POP-UP FIGMA LU!
    } else if (sub.status === "PENDING") {
      alert("Sabar bos, pahlawan masih masak tugasnya! Belum dikumpulin.");
    } else if (sub.status === "REJECTED") {
      alert("Pahlawan lagi ngerjain revisian dari lu bos.");
    }
  };

  // 🔥 FILTER: Ilangin kartu dari daftar Pantau kalo udah di-ACC (APPROVED/COMPLETED)
  const activeSubmissions = submissions.filter(
    (sub) => sub.status !== "APPROVED" && sub.status !== "COMPLETED"
  );

  return (
    <section className="bg-transparent relative">
      <h1 className="text-1xl md:text-2xl font-semibold mb-6 font-pixel">Pantau Quest</h1>

      {activeSubmissions.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl bg-[#111121] border border-dashed border-white/20 flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
          <h3 className="text-xl font-bold text-white mb-2">Belum Ada Tugas Masuk</h3>
          <p className="text-sm text-white/50">Santai dulu bos, belum ada pahlawan yang butuh di-review.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {activeSubmissions.map((sub) => {
            const judul = sub.quest?.title || "Misi Tanpa Judul";
            const pahlawan = sub.student?.username || "Pahlawan";
            const thumbnail = sub.quest?.image || "/foto-bakso.png";

            let statusLabel = "Sedang dikerjakan";
            let statusColor = "text-[#f79e00]";
            let badgeColor = "bg-[#332414]";
            let buttonVariant = "bg-[#f79e00] hover:bg-[#d98b00] text-black";
            let progressColor = "bg-[#f79e00]";
            let progress = 40;
            let buttonText = "Pantau Progres";

            if (sub.status === "PENDING" && sub.fileUrl && sub.fileUrl !== "") {
              statusLabel = "Butuh Review";
              progress = 90;
              buttonText = "Review Tugas";
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
              <article key={sub.id} className="relative overflow-hidden rounded-2xl bg-[#111121] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row">
                <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4 bg-[#11131A]">
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full ${badgeColor} ${statusColor} font-semibold uppercase tracking-[0.12em] text-[10px]`}>{statusLabel}</span>
                    <span className="text-white/60">– Dikerjakan oleh: <span className="font-medium text-white">{pahlawan}</span></span>
                  </div>
                  <div><p className="text-sm md:text-base font-bold text-white/90">{judul}</p></div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-white/60"><span>{statusLabel === "Revisi" ? "Progres Revisi" : "Progres"}</span><span>{progress} %</span></div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden"><div className={`h-full ${progressColor}`} style={{ width: `${progress}%` }} /></div>
                  </div>
                  <div className="mt-2">
                    <button onClick={() => handleButtonClick(sub)} className={`px-5 py-2 rounded-xl text-xs md:text-sm font-semibold border-b-4 border-r-4 border-black active:translate-y-0.5 active:translate-x-0.5 active:border-b-0 active:border-r-0 transition-all ${buttonVariant}`}>
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

      {/* 🔥 ================= MODAL POP-UP HASIL SISWA (PERSIS FIGMA) ================= 🔥 */}
      {isModalOpen && selectedSub && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0A0A1A] border-2 border-[#F59E0B] rounded-3xl w-full max-w-4xl p-8 relative shadow-[0_0_50px_rgba(245,158,11,0.3)] animate-in zoom-in-95 duration-200">
             
             {/* Tombol X Merah */}
             <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-8 text-red-500 hover:text-red-400 font-bold text-2xl">X</button>
             
             {/* Judul Modal */}
             <h2 className="text-center text-white font-bold text-2xl mb-8 font-poppins">Hasil siswa</h2>
             
             {/* Kontainer Kiri Kanan */}
             <div className="flex flex-col md:flex-row gap-6 mb-10">
                
                {/* Kolom Kiri: Nama & Link */}
                <div className="flex-1 bg-[#11131A] border border-gray-800 rounded-2xl p-8 shadow-inner">
                   <h4 className="font-bold text-white mb-4 text-sm md:text-base">Nama siswa yang mengerjakan :</h4>
                   <p className="font-pixel text-2xl md:text-3xl text-white mb-10 tracking-widest uppercase">
                      {selectedSub.student?.username || 'Arya pemula'}
                   </p>
                   
                   <h4 className="font-bold text-white mb-3 text-sm md:text-base">Link Hasil Kerjaan :</h4>
                   <a href={selectedSub.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline hover:text-blue-400 break-all transition-colors block p-4 bg-[#0A0A1A] rounded-xl border border-gray-800">
                      {selectedSub.fileUrl}
                   </a>
                </div>
                
                {/* Kolom Kanan: Pesan Siswa */}
                <div className="flex-1 bg-[#11131A] border border-gray-800 rounded-2xl p-8 shadow-inner flex flex-col">
                   <h4 className="font-bold text-white mb-4 text-sm md:text-base">Pesan Dari Siswa :</h4>
                   <div className="flex-1 bg-[#0A0A1A] rounded-xl p-4 border border-gray-800">
                      <p className="text-gray-300 text-sm leading-relaxed italic">
                         "{selectedSub.pesanUMKM || 'Tidak ada pesan tertulis dari pahlawan.'}"
                      </p>
                   </div>
                </div>

             </div>

             {/* Tombol Action Bawah */}
             <div className="flex justify-center gap-6">
                <button 
                  onClick={() => handleAction(selectedSub.id, 'reject')} 
                  disabled={isSubmitting} 
                  className="bg-[#E11D48] hover:bg-red-700 disabled:bg-gray-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_5px_0_rgb(159,18,57)] active:shadow-none active:translate-y-1"
                >
                   {isSubmitting ? 'Loading...' : 'Minta revisi'}
                </button>
                <button 
                  onClick={() => handleAction(selectedSub.id, 'approve')} 
                  disabled={isSubmitting} 
                  className="bg-[#F59E0B] hover:bg-yellow-600 disabled:bg-gray-700 text-black font-bold py-3 px-8 rounded-xl transition-all shadow-[0_5px_0_rgb(180,120,0)] active:shadow-none active:translate-y-1"
                >
                   {isSubmitting ? 'Loading...' : 'Setujui & Beri XP'}
                </button>
             </div>

          </div>
        </div>
      )}

    </section>
  );
}