import React from 'react';

export default function QuestCard({ title, description, company, categories, xp, stars, image }) {
  return (
    // 🔥 1. BACKGROUND CARD: Putih (Siang), Gelap (Malam)
    <div className="bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-[#F59E0B] dark:hover:border-[#F59E0B] shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 group cursor-pointer flex flex-col h-full">
      
      {/* Bagian Gambar */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        {/* Badge Company (Kiri Atas) - 2 ALAM */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 transition-colors">
          <span className="text-[10px] font-bold text-gray-900 dark:text-white transition-colors">{company}</span>
        </div>

        {/* Badge Kategori (Kanan Atas) - 2 ALAM */}
        <div className="absolute top-3 right-3 flex gap-2">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 transition-colors">
              <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase transition-colors">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Konten */}
      <div className="p-5 flex flex-col grow justify-between gap-4">
        <div>
          {/* 🔥 2. TEKS JUDUL: Hitam (Siang), Putih (Malam) */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-[#F59E0B] dark:group-hover:text-[#F59E0B] transition-colors">{title}</h3>
          
          {/* 🔥 3. TEKS DESKRIPSI: Abu Gelap (Siang), Abu Terang (Malam) */}
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed transition-colors">{description}</p>
        </div>

        {/* Footer: Bintang & XP */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              // Bintang kosong ikutan ganti warna biar keliatan pas siang
              <span key={i} className={`text-lg transition-colors ${i < stars ? 'text-[#F59E0B]' : 'text-gray-300 dark:text-gray-600'}`}>
                ★
              </span>
            ))}
          </div>
          {/* 🔥 4. TEKS XP: Hitam (Siang), Putih (Malam) */}
          <span className="text-sm font-bold text-gray-900 dark:text-white transition-colors">+ {xp} XP</span>
        </div>
      </div>

    </div>
  );
}