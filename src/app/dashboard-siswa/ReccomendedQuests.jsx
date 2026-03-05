import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function RecommendedQuests() {
  // State buat filter kategori yang lagi aktif (Default: Semua/Kosong)
  const [activeCategory, setActiveCategory] = useState('Editing');

  // DATA DUMMY (Biar lu ga capek ngetik 6 kartu manual)
  // Nanti ini bakal diganti pakai data hasil fetch dari database Prisma lu broskie
  const dummyQuests = Array(6).fill({
    title: 'Script Video Promo 30 Detik',
    desc: 'Tulis script video pendek untuk promosi UMKM Bakso dengan hook yang menarik agar...',
    xp: '+ 500 XP',
    slot: '15/X', // Sisa slot yang ada di desain lu
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=500', // Gambar ayam geprek dummy
  });

  const categories = ['Editing', 'Design UI/UX', 'Web Dev'];

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* HEADER: Judul, Search, dan Filter Kategori */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white tracking-wide shrink-0">Quest buat kamu</h2>
        
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
          
          {/* Search Bar */}
          <div className="relative shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border border-gray-700 text-sm text-white rounded-full py-1.5 pl-9 pr-4 w-36 focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          
          <div className="w-px h-6 bg-gray-700 shrink-0"></div>

          {/* Tombol Kategori */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                  activeCategory === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID KARTU QUEST (3 Kolom di PC, 2 di Tablet, 1 di HP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dummyQuests.map((quest, index) => (
          // KARTU INDIVIDUAL
          <div 
            key={index} 
            className="bg-[#11131A] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col shadow-lg"
          >
            {/* Bagian Gambar */}
            <div className="h-32 relative overflow-hidden">
              <img 
                src={quest.image} 
                alt={quest.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay gradien tipis */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] to-transparent opacity-80"></div>
              
              {/* Badge Slot (Pojok Kanan Atas) */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white border border-gray-700">
                {quest.slot}
              </div>

              {/* Logo UMKM (Pojok Kiri Bawah Gambar) */}
              <div className="absolute -bottom-3 left-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-[#11131A] z-10">
                <span className="text-white font-bold text-[10px]">UM</span>
              </div>
            </div>

            {/* Bagian Teks & XP */}
            <div className="p-4 pt-6 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1 group-hover:text-[#FFB800] transition-colors">{quest.title}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                  {quest.desc}
                </p>
              </div>
              
              {/* Footer Kartu (Garis batas & XP) */}
              <div className="pt-3 border-t border-gray-800 flex justify-end">
                <span className="text-xs font-bold text-[#FFB800]">{quest.xp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}