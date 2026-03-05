import React from 'react';

export default function QuestCard({ title, description, company, categories, xp, stars, image }) {
  return (
    // hover:border-[#F59E0B] biar pas disentuh mouse warnanya pas!
    <div className="bg-[#0F172A] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#F59E0B] transition-all duration-300 group cursor-pointer flex flex-col h-full">
      
      {/* Bagian Gambar */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        {/* Badge Company (Kiri Atas) */}
        <div className="absolute top-3 left-3 bg-[#0F172A] backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-400">
          <span className="text-[10px] font-bold text-white">{company}</span>
        </div>

        {/* Badge Kategori (Kanan Atas) - OUTLINE BIRU UDAH DIHAPUS */}
        <div className="absolute top-3 right-3 flex gap-2">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-[#0F172A] backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-400">
              <span className="text-[10px] font-bold text-white uppercase">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bagian Konten */}
      <div className="p-5 flex flex-col grow justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#F59E0B] transition-colors">{title}</h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* Footer: Bintang & XP */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < stars ? 'text-[#F59E0B]' : 'text-gray-600'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm font-bold text-white">+ {xp} XP</span>
        </div>
      </div>

    </div>
  );
}