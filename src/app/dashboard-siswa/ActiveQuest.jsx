import React from 'react';
import { Circle, Compass } from 'lucide-react';

export default function ActiveQuest({ isEmpty = false }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-wide">Quest Aktif</h2>
        {!isEmpty && (
          <button className="text-xs text-gray-400 hover:text-white transition-colors">
            Lihat lainnya
          </button>
        )}
      </div>

      {isEmpty ? (
        // TAMPILAN KOSONG (Kalo Siswa Belum Ngambil Quest)
        <div className="bg-transparent border-2 border-dashed border-gray-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 h-[250px]">
          <div className="p-4 bg-gray-800/50 rounded-full">
            <Compass size={32} className="text-gray-400" />
          </div>
          <div>
            <p className="text-white font-bold">Belum ada Quest yang dikerjakan</p>
            <p className="text-sm text-gray-500 mt-1">Ambil quest di bawah untuk mulai mendapatkan XP!</p>
          </div>
        </div>
      ) : (
        // TAMPILAN ADA ISINYA (Sesuai Figma Mangkok Ayam)
        <div className="bg-[#11131A] border border-gray-800 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-lg">
          
          {/* Kolom Kiri: Teks & Info */}
          <div className="p-6 flex-1 flex flex-col justify-between gap-4">
            <div>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                {/* Logo UMKM Bulat */}
                <span className="text-white font-bold text-sm">UM</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Design Logo</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                Desain logo minimalis untuk UMKM Bakso lokal dengan konsep modern, warna earthy, dan tipografi clean agar mudah diaplikasikan ke kemasan dan media sosial.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Circle size={10} fill="#3B82F6" className="text-blue-500" />
                <span className="text-xs font-bold text-blue-500">Sedang Dikerjakan</span>
              </div>
              <button className="bg-[#FFB800] hover:bg-[#E6A600] text-black font-bold text-sm py-2 px-6 rounded-lg w-max transition-transform active:scale-95 shadow-md">
                Kumpulkan
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="md:w-2/5 h-48 md:h-auto relative">
            {/* Ganti src ini pakai gambar mangkok ayam lu nanti */}
            <img 
              src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800" 
              alt="Quest Thumbnail" 
              className="w-full h-full object-cover"
            />
            {/* Gradient hitam transparan biar nyambung ke gambar kayak di Figma */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#11131A] via-transparent to-transparent hidden md:block"></div>
          </div>

        </div>
      )}
    </div>
  );
}