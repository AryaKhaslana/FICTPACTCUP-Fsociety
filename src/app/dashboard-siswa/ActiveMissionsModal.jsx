import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link'; // 🔥 Bang Sepuh tambahin Link biar tombol Kumpulkan bisa dipencet

// 🔥 TAMBAHIN PROPS `activeMissionsData` di sini
export default function ActiveMissionsModal({ isOpen, onClose, activeMissionsData = [] }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0B0E14] border-2 border-[#F59E0B] rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] animate-in fade-in zoom-in duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        
        <button 
          onClick={onClose}
          className="absolute top-5 left-5 md:top-6 md:left-6 text-[#F59E0B] hover:text-white transition-colors z-50 p-2"
        >
          <X size={28} strokeWidth={3} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Misi Berjalan
        </h2>

        <div className="flex flex-col gap-6 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-[#F59E0B] scrollbar-track-transparent">
          
          {/* 🔥 LOGIKA KOSONG: Kalau misal siswanya lagi ga ambil misi apa-apa */}
          {activeMissionsData.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>Belum ada misi yang sedang kamu kerjakan broskie.</p>
              <p className="text-sm mt-2">Buruan ambil misi di papan utama!</p>
            </div>
          ) : (
            /* 🔥 MAPPING DATA ASLI DARI DATABASE */
            activeMissionsData.map((mission, index) => (
              <div key={mission.id || index} className="w-full bg-[#111522] rounded-2xl border border-gray-700 overflow-hidden flex flex-col md:flex-row relative">
                
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex flex-col items-start mb-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mb-3">
                         <span className="text-xl">🔥</span> {/* Icon dinamis nyusul ntar aja wkwk */}
                      </div>
                      {/* Narik judul dari tabel Quest */}
                      <h3 className="text-xl font-bold text-white line-clamp-1">{mission.quest?.title || "Misi Rahasia"}</h3>
                    </div>
                    
                    {/* Narik deskripsi dari tabel Quest */}
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed max-w-sm line-clamp-3">
                      {mission.quest?.description || "Deskripsi tidak tersedia."}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-xs font-bold text-gray-300">
                        {mission.status === 'REJECTED' ? 'Butuh Revisi Bos!' : 'Sedang Dikerjakan'}
                      </span>
                    </div>
                    {/* Tombol Kumpulkan - Nanti arahin ke halaman upload file lu */}
                    <Link href={`/dashboard-siswa/submit/${mission.questId}`} onClick={onClose}>
                      <button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#000010] font-bold text-sm px-6 py-2 rounded-xl transition-transform hover:scale-105 w-max">
                        Kumpulkan
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="w-full md:w-2/5 h-48 md:h-auto relative opacity-80 md:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111522] via-[#111522]/50 to-transparent z-10"></div>
                  {/* Foto default atau foto dari DB kalau ada */}
                  <img 
                    src={mission.quest?.imageUrl || "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800"} 
                    alt="Thumbnail Misi" 
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}