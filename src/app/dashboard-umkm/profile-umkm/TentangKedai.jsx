// 🔥 TentangKedai.jsx (REPLACEMENT DESIGN DEWA) 🔥
import React from 'react';

export default function TentangKedai({ bio, lokasi }) {
  return (
    <div className="bg-[#1A1F32] rounded-2xl p-6 border-2 border-dashed border-gray-700 text-white h-full flex flex-col group relative overflow-hidden hover:shadow-[0_0_20px_rgba(251,146,60,0.15)]">
      
      {/* 🎮 1. DEKORASI PIXEL DI SUDUT (BIAR LEBIH RPG!) */}
      <div className="absolute top-0 right-0 w-4 h-4  "></div>
      
      {/* 🌟 2. JUDUL DENGAN AKSEN ICON RPG */}
      <h3 className="text-orange-400 font-bold text-xl mb-4 flex items-center gap-2 font-mono">
        {/* Ikon Pixel Shop (Pura-puranya ini icon map toko RPG) */}
        <span className="tracking-wider font-pixellari">Tentang Kedai</span>
      </h3>
      
      {/* ✍️ 3. DESKRIPSI (BIO) DENGAN GAYA "LORE INFO" */}
      <div className="bg-[#0A0D1A]/50 rounded-lg p-4 mb-6 border border-gray-700/50 shadow-inner group-hover:border-gray-600 transition-colors">
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          {bio || "Belum ada deskripsi/bio toko nih. Tambahin bio biar para Hero makin tertarik ambil Quest lu!"}
        </p>
      </div>

      {/* 📍 4. LOKASI DENGAN IKON PIXEL MAP */}
      <div className="flex items-center gap-3 mb-5 border-t border-gray-700/50 pt-5">
        {/* Ganti Ikon Pin Modern jadi Ikon Pixel Map */}
        <div className="w-10 h-10 bg-red-950/50 rounded-lg border border-red-700/50 flex items-center justify-center relative shadow-md group-hover:scale-110 transition-transform">
          {/* Ikon Kompas Pixel */}
          <span className="text-2xl text-red-500">🧭</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs font-mono uppercase tracking-wider font-pixellari">Lokasi UMKM:</span>
          <span className="font-semibold text-sm capitalize font-poppins">
            {lokasi || "Lokasi belum diatur"}
          </span>
        </div>
      </div>

      {/* 🗺️ 5. MAP PLACEHOLDER (DI-UPDATE BIAR LEBIH COOL!) */}
      <div className="rounded-xl overflow-hidden mt-auto border-2 border-gray-700/50">
        {/* Markas sarankan lu ganti gambar 'bekasi.jpg' sama gambar 'pixel-map-sda.jpg' yang ala game biar makin dewa! */}
        <img 
          src="/bekasi.jpg" 
          alt="Peta Lokasi Kedai HP" 
          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}