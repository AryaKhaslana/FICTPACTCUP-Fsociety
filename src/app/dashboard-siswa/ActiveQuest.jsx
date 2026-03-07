"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
// INI DIA IMPORT SAKTINYA BROSKIE 👇
import { useRouter } from 'next/navigation';

export default function ActiveQuest({ activeData }) {
  const router = useRouter(); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkQuest, setLinkQuest] = useState('');
  const [pesanUMKM, setPesanUMKM] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);

  // JARING PENGAMAN: Kalau datanya kosong (misi udah dikerjain semua)
  if (!activeData) {
    return (
      <div className="w-full min-h-[250px] flex flex-col items-center justify-center bg-[#11131A] rounded-2xl border border-gray-800 p-8 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-2">Quest Aktif</h2>
        <p className="text-gray-500 text-sm">Belum ada quest yang sedang kamu kerjakan, Master!</p>
      </div>
    );
  }

  // Tarik detail quest-nya dari database
  const quest = activeData.quest;

  // FUNGSI BUAT NGIRIM DATA KE BACKEND
  const handleSubmit = async () => {
    if (!linkQuest) return alert("Link quest-nya diisi dulu dong, Master!");
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: activeData.id,
          fileUrl: linkQuest,
          pesanUMKM: pesanUMKM
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsModalOpen(false); // Tutup modal form
        setShowSuccessNotif(true); // Munculin notif gulungan surat estetik

        // Tunggu 3 detik, baru refresh halamannya biar datanya ganti
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
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white tracking-wide">Quest Aktif</h2>
        <span className="text-xs text-gray-400 cursor-pointer hover:text-white transition-colors">Lihat lainnya</span>
      </div>

      {/* KARTU QUEST AKTIF DARI DATABASE */}
      <div className="bg-[#11131A] rounded-2xl overflow-hidden border border-gray-800 flex flex-col md:flex-row relative shadow-lg">
        <div className="p-6 md:w-1/2 flex flex-col justify-center z-10 relative">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center mb-4 border-2 border-[#11131A]">
            <span className="text-white font-bold text-xs">{quest.company?.substring(0, 2).toUpperCase() || 'UM'}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">{quest.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
            {quest.description || 'Deskripsi misi sedang dimuat...'}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-blue-500 text-xs font-bold">Sedang Dikerjakan</span>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold py-2.5 px-6 rounded-lg w-max transition-colors text-sm"
          >
            Kumpulkan
          </button>
        </div>

        <div className="h-48 md:h-auto md:w-1/2 relative overflow-hidden">
          <img 
            src={quest.image || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=500'} 
            alt="Quest Thumbnail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11131A] via-[#11131A]/80 to-transparent hidden md:block"></div>
        </div>
      </div>

      {/* MODAL POPUP FORM (Muncul kalau isModalOpen == true) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0F1423] w-full max-w-[500px] rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 pb-2 relative flex items-center justify-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute left-6 top-6 text-[#F59E0B] hover:text-white transition-colors"
              >
                <X size={28} strokeWidth={3} />
              </button>
              <h2 className="text-2xl font-pixel text-white tracking-wider mt-2">Kumpulkan misi</h2>
            </div>

            <div className="p-6 md:px-10 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-bold flex items-center gap-2">
                  <span className="text-[#F59E0B]">📌</span> Link quest
                </label>
                <input 
                  type="url"
                  placeholder="Link quest"
                  value={linkQuest}
                  onChange={(e) => setLinkQuest(e.target.value)}
                  className="w-full bg-[#1A1F30] border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-bold flex items-center gap-2">
                  <span className="text-white">💬</span> Pesan untuk UMKM
                </label>
                <textarea 
                  placeholder="Ketik pesan untuk klien..."
                  rows={4}
                  value={pesanUMKM}
                  onChange={(e) => setPesanUMKM(e.target.value)}
                  className="w-full bg-[#1A1F30] border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F59E0B] transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex justify-center mt-2 mb-4">
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`font-pixel text-xs py-3 px-8 rounded-lg transition-colors border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0 ${
                    isSubmitting ? 'bg-gray-500 text-gray-300' : 'bg-[#F59E0B] hover:bg-[#D97706] text-black'
                  }`}
                >
                  {isSubmitting ? 'MENGIRIM...' : 'KUMPULKAN MISI'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFIKASI GULUNGAN SURAT ESTETIK (Muncul 3 detik) */}
      {showSuccessNotif && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-[600px] animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-[#111424] border-2 border-[#F59E0B] rounded-2xl p-5 md:p-6 shadow-[0_0_40px_rgba(245,158,11,0.2)] flex items-center gap-4 md:gap-6">
            <div className="text-4xl md:text-5xl drop-shadow-md shrink-0">
              📜
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-white text-sm md:text-base font-bold leading-relaxed tracking-wide">
                Laporan misi telah terbang menuju markas UMKM! <br className="hidden md:block" />
                Bersiaplah menunggu hasilnya, Pahlawan.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}