import React from 'react';
import { X } from 'lucide-react';

export default function ActiveMissionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // 💡 Ini data dummy sementara biar UI lu mirip Figma (2 kartu bertumpuk).
  // Nanti kalau API lu udah narik banyak data misi berjalan, tinggal di-map dari props!
  const dummyMissions = [1, 2];

  return (
    // LAYER GELAP BELAKANG (Bisa diklik buat nutup)
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* KOTAK POP-UP UTAMA */}
      <div 
        className="relative w-full max-w-3xl bg-[#0B0E14] border-2 border-[#F59E0B] rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] animate-in fade-in zoom-in duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()} // Biar pas klik dalem kotak, ga ikut ketutup
      >
        
        {/* TOMBOL X (Kiri Atas, Warna Orange) */}
        <button 
          onClick={onClose}
          className="absolute top-5 left-5 md:top-6 md:left-6 text-[#F59E0B] hover:text-white transition-colors z-50 p-2"
        >
          <X size={28} strokeWidth={3} />
        </button>

        {/* JUDUL */}
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Misi Berjalan
        </h2>

        {/* BUNGKUSAN LIST KARTU (Biar bisa di-scroll kalau misinya banyak) */}
        {/* custom-scrollbar nanti bisa ditambahin di globals.css biar styling scrollnya orange */}
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-[#F59E0B] scrollbar-track-transparent">
          
          {dummyMissions.map((item, index) => (
            // DESAIN KARTU MISI (Persis kayak Figma)
            <div key={index} className="w-full bg-[#111522] rounded-2xl border border-gray-700 overflow-hidden flex flex-col md:flex-row relative">
              
              {/* Bagian Kiri (Teks & Tombol) */}
              <div className="flex-1 p-5 md:p-6 flex flex-col justify-between z-10">
                <div>
                  {/* Icon Bulat & Judul */}
                  <div className="flex flex-col items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mb-3">
                      <img src="https://api.dicebear.com/7.x/icons/svg?seed=ayam" alt="icon" className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Design Logo</h3>
                  </div>
                  
                  {/* Deskripsi */}
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed max-w-sm">
                    Desain logo minimalis untuk UMKM Bakso lokal dengan konsep modern, warna earthy, dan tipografi clean agar mudah diaplikasikan ke kemasan dan media sosial.
                  </p>
                </div>

                {/* Status & Tombol Kumpulkan */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-bold text-gray-300">Sedang Dikerjakan</span>
                  </div>
                  <button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#000010] font-bold text-sm px-6 py-2 rounded-xl transition-transform hover:scale-105 w-max">
                    Kumpulkan
                  </button>
                </div>
              </div>

              {/* Bagian Kanan (Gambar Makanan / UMKM) */}
              <div className="w-full md:w-2/5 h-48 md:h-auto relative opacity-80 md:opacity-100">
                {/* Efek Gradasi Hitam Biar Nyatu Sama Gambar */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111522] via-[#111522]/50 to-transparent z-10"></div>
                
                {/* ⚠️ Ganti src ini pake gambar bakso/mie dari public folder lu kalau ada! */}
                <img 
                  src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800" 
                  alt="Thumbnail Misi" 
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}