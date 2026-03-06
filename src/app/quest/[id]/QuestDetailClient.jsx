"use client"; // Mantra wajib biar bisa di-klik!

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function QuestDetailClient({ quest }) {
  
const router = useRouter();
  
  // State biar tombolnya loading pas dipencet
  const [isAccepting, setIsAccepting] = useState(false);

  // 2. ROMBAK FUNGSI INI
  const handleTerimaQuest = async () => {
    setIsAccepting(true);
    try {
      // Nembak ke rute API yang baru dibikin
      const response = await fetch('/api/quests/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questId: quest.id })
      });

      const data = await response.json();

      if (data.success) {
        alert(`Siuuu! Misi "${quest.title}" berhasil diambil! Gas kerjain!`);
        
        // Refresh & Paksa pindah ke halaman Dashboard
        router.push('/dashboard-siswa'); 
        router.refresh(); 
      } else {
        alert("Gagal: " + data.message);
      }
    } catch (error) {
      alert("Waduh, koneksi putus broskie!");
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      
      {/* KOTAK MODAL ALA FIGMA */}
      <div className="bg-[#1A233A] border-4 border-[#F59E0B] rounded-3xl p-6 md:p-10 w-full max-w-4xl relative shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        
        {/* Header: Nama UMKM & XP */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-400 shrink-0">
              <img 
                src={quest.image || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=150&q=80'} 
                alt="logo umkm" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-white font-bold text-lg md:text-xl tracking-wide">
              {quest.company || 'UMKM Lokal'}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl drop-shadow-md">🪙</span> 
            <span className="text-2xl md:text-4xl font-pixel text-white drop-shadow-md">
              +{quest.xp || 500} XP
            </span>
          </div>
        </div>

        {/* Judul Misi */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-3xl md:text-5xl font-pixel text-white leading-tight drop-shadow-lg">
            {quest.title}
          </h1>
        </div>

        {/* Deskripsi */}
        <div className="text-center mb-12 px-2 md:px-10">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {quest.description || 'Deskripsi misi belum ditambahkan oleh pembuat misi. Silakan hubungi pihak UMKM untuk detail lebih lanjut.'}
          </p>
        </div>

        {/* Syarat & Tombol */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-gray-700 pt-8">
          
          {/* Teks Syarat */}
          <div className="flex-1 w-full text-sm text-gray-300">
            <h3 className="text-white font-bold text-base mb-3">Syarat & Ketentuan (Requirements) :</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Skill yang Dibutuhkan: Sesuai kategori misi ({quest.category || 'Umum'}).</li>
              <li>Batas Waktu (Deadline): 3 Hari setelah misi diambil.</li>
              <li>Format Pengumpulan: Link Google Drive (Kualitas tinggi).</li>
            </ul>
          </div>

          {/* Tombol KELUAR & TERIMA QUEST */}
          <div className="flex flex-col gap-4 w-full md:w-[220px] shrink-0">
            <Link href="/quest" className="w-full">
              <button className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold font-poppins py-3.5 px-6 rounded-xl transition-all border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0 text-center">
                KELUAR
              </button>
            </Link>
            <button 
      onClick={handleTerimaQuest}
      disabled={isAccepting}
      className={`w-full font-bold font-poppins py-3.5 px-6 rounded-xl transition-all border-b-4 border-r-4 border-black active:translate-y-1 active:translate-x-1 active:border-0 ${
        isAccepting ? 'bg-gray-500 text-gray-300' : 'bg-[#F59E0B] hover:bg-[#D97706] text-black'
      }`}
    >
      {isAccepting ? 'MENGAMBIL...' : 'TERIMA QUEST'}
    </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}