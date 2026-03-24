"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ActiveMissionsModal from './ActiveMissionsModal'; 

// 🔥 1. KASIH DEFAULT ARRAY KOSONG BIAR GAK ERROR 🔥
export default function ActiveQuest({ activeData = [] }) {
  const router = useRouter(); 
  
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false); 
  const [isListModalOpen, setIsListModalOpen] = useState(false);     

  const [linkQuest, setLinkQuest] = useState('');
  const [pesanUMKM, setPesanUMKM] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);

  // 🔥 2. KITA AMBIL MISI PALING ATAS (INDEX 0) BUAT DITAMPILIN DI BANNER 🔥
  // Pastiin activeData beneran array, kalo bukan jadiin array kosong
  const safeActiveData = Array.isArray(activeData) ? activeData : [];
  const latestMission = safeActiveData.length > 0 ? safeActiveData[0] : null;

  const handleSubmit = async () => {
    if (!linkQuest) return alert("Link quest-nya diisi dulu dong, Master!");
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: latestMission?.id, // 👈 Pake latestMission!
          fileUrl: linkQuest,
          pesanUMKM: pesanUMKM
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitModalOpen(false); 
        setShowSuccessNotif(true); 

        setTimeout(() => {
          setShowSuccessNotif(false);
          router.refresh(); 
        }, 3000);

      } else {
        alert("Gagal: " + data.message);
      }
    } catch (error) {
      alert("Waduh, koneksi ke server putus");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative flex flex-col h-full">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-end mb-4 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide font-poppins">Quest Aktif</h2>
        
        {/* 🔥 3. TOMBOL LIHAT LAINNYA CUMA MUNCUL KALO MISI LEBIH DARI 1 🔥 */}
        {safeActiveData.length > 1 && (
          <button 
            onClick={() => setIsListModalOpen(true)}
            className="text-xs md:text-sm text-gray-400 cursor-pointer hover:text-[#F59E0B] transition-colors border-b border-transparent hover:border-[#F59E0B]"
          >
            Lihat lainnya ({safeActiveData.length})
          </button>
        )}
      </div>

      {/* 2. KONTEN (PENGECEKAN KOSONG ATAU ADA ISI) */}
      {!latestMission ? (
        
        // --- TAMPILAN KALAU KOSONG ---
        <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-[#11131A]/50 border-2 border-dashed border-gray-700 rounded-2xl p-8">
          <p className="text-gray-500 text-sm font-bold text-center">Belum ada quest yang sedang kamu kerjakan, Master!</p>
        </div>

      ) : (

        // --- TAMPILAN KALAU ADA MISI ---
        <div className="bg-[#11131A] rounded-2xl overflow-hidden border-2 border-white-800 flex flex-col md:flex-row relative shadow-[0_0_20px_rgba(0,0,0,0.5)] min-h-[220px]">
          
          {/* Bagian Teks (Kiri) */}
          <div className="p-6 md:w-[55%] flex flex-col justify-center z-10 relative bg-[#11131A]">
            
            {/* Logo Inisial UMKM */}
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B00] to-[#D97706] rounded-full flex items-center justify-center mb-4 border-2 border-[#11131A] shadow-md">
              <span className="text-white font-black text-xs">
                {latestMission.quest?.title?.substring(0, 2).toUpperCase() || 'UM'}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 pr-4 drop-shadow-md">
              {latestMission.quest?.title || 'Judul Misi Kosong'}
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-2 pr-4">
              {latestMission.quest?.description || 'Deskripsi misi sedang dimuat...'}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              <span className="text-blue-400 text-xs font-bold tracking-wider">SEDANG DIKERJAKAN</span>
            </div>

            <button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold py-2.5 px-6 rounded-lg w-max transition-all text-sm shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none uppercase tracking-wide"
            >
              Kumpulkan
            </button>
          </div>

          {/* Bagian Gambar GIF Pixel Art (Kanan) */}
          <div className="h-48 md:h-auto md:w-[45%] relative overflow-hidden bg-black">
            <img 
              src="/makan.gif" 
              alt="Cyberpunk Quest" 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11131A] via-[#11131A]/30 to-transparent hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-[#11131A]/10 to-transparent md:hidden"></div>
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Scanlines.png/320px-Scanlines.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* AREA KUMPULAN MODAL & NOTIFIKASI DI BAWAH SINI             */}
      {/* ========================================================= */}

      {/* 🔥 4. OPER ARRAY DATA KE MODAL 🔥 */}
      <ActiveMissionsModal 
        isOpen={isListModalOpen} 
        onClose={() => setIsListModalOpen(false)} 
        semuaMisi={safeActiveData} // 👈 Modal sekarang nerima data lu!
      />

      {/* MODAL 2: POPUP FORM KUMPULKAN MISI */}
      {isSubmitModalOpen && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div 
            className="bg-[#0F1423] w-full max-w-[500px] rounded-2xl border border-[#F59E0B] shadow-[0_0_40px_rgba(245,158,11,0.2)] relative overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="p-6 pb-2 relative flex items-center justify-center">
              <button 
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute left-6 top-6 text-[#F59E0B] hover:text-white transition-colors"
              >
                <X size={28} strokeWidth={3} />
              </button>
              <h2 className="text-xl md:text-2xl font-pixel text-white tracking-wider mt-2 uppercase">Kumpulkan misi</h2>
            </div>

            <div className="p-6 md:px-10 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-bold flex items-center gap-2">
                  <span className="text-[#F59E0B]">📌</span> Link quest
                </label>
                <input 
                  type="url"
                  placeholder="Link Google Drive / Github / Figma..."
                  value={linkQuest}
                  onChange={(e) => setLinkQuest(e.target.value)}
                  className="w-full bg-[#1A1F30] border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors shadow-inner"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-bold flex items-center gap-2">
                  <span className="text-white">💬</span> Pesan untuk Klien
                </label>
                <textarea 
                  placeholder="Ketik pesan untuk UMKM (opsional)..."
                  rows={4}
                  value={pesanUMKM}
                  onChange={(e) => setPesanUMKM(e.target.value)}
                  className="w-full bg-[#1A1F30] border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors resize-none shadow-inner"
                ></textarea>
              </div>

              <div className="flex justify-center mt-4 mb-4">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`font-pixel text-xs py-3 px-8 rounded-lg transition-all border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0 uppercase tracking-widest ${
                    isSubmitting ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-[#F59E0B] hover:bg-[#D97706] text-black shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'MENGIRIM Laporan...' : 'KUMPULKAN MISI'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFIKASI 3: GULUNGAN SURAT ESTETIK */}
      {showSuccessNotif && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] w-[90%] md:w-[600px] animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-[#111424]/95 backdrop-blur-md border-2 border-[#F59E0B] rounded-2xl p-5 md:p-6 shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center gap-4 md:gap-6 relative overflow-hidden">
            <div className="text-4xl md:text-5xl drop-shadow-md shrink-0 relative z-10 animate-bounce">
              📜
            </div>
            <div className="flex flex-col gap-1 relative z-10">
              <p className="text-white text-sm md:text-base font-bold leading-relaxed tracking-wide">
                Laporan misi telah terbang menuju markas UMKM! <br className="hidden md:block" />
                Bersiaplah menunggu hasilnya, Pahlawan.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 to-transparent"></div>
          </div>
        </div>
      )}

    </div>
  );
}