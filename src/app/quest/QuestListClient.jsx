"use client"; // Wajib biar bisa dipencet-pencet!

import React, { useState } from 'react';
import Link from 'next/link';

export default function QuestListClient({ initialQuests }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Daftar kategori (Sesuaikan sama data di database lu)
  const categories = ['All', 'Web Dev', 'Design UI/UX', 'Editing'];

  // Logika Filter: Nyaring data berdasarkan Search dan Kategori
  const filteredQuests = initialQuests.filter((quest) => {
    const matchSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (quest.company && quest.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCategory = selectedCategory === 'All' || quest.category === selectedCategory;
    
    return matchSearch && matchCategory;
  });

  return (
    <div className="w-full">
      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16 relative z-20">
        
        {/* Input Search */}
        <div className="relative w-full md:w-[500px]">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Cari Nama UMKM atau Quest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#11131A] border border-gray-700 rounded-full py-3.5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all shadow-lg"
          />
        </div>
        
        {/* Dropdown Category Container */}
        <div className="relative w-full md:w-auto">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full md:w-auto px-8 py-3.5 rounded-full border border-gray-700 bg-[#11131A] text-sm font-bold hover:border-[#F59E0B] transition-all flex items-center justify-between md:justify-center gap-3 shadow-lg"
          >
            {selectedCategory === 'All' ? 'Category' : selectedCategory} 
            <span className={`text-[10px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* Isi Dropdown yang muncul pas dipencet */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full min-w-[160px] bg-[#11131A] border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsDropdownOpen(false); // Tutup dropdown abis milih
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-semibold transition-colors ${
                    selectedCategory === cat ? 'bg-[#F59E0B] text-black' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GRID KARTU MISI */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredQuests.length > 0 ? (
          filteredQuests.map((quest) => (
            
            // 👇 BUNGKUS KARTUNYA DI SINI BROJAK! 👇
            <Link href={`/quest/${quest.id}`} key={quest.id}>
              
              <div className="bg-[#0F172A] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#F59E0B] transition-all duration-300 group cursor-pointer flex flex-col h-full shadow-lg">
                
                {/* Bagian Gambar */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={quest.image || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80'} alt={quest.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-500">
                    <span className="text-[10px] font-bold text-white">{quest.company || 'UMKM Lokal'}</span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-500">
                      <span className="text-[10px] font-bold text-white uppercase">{quest.name || 'WEB'}</span>
                    </div>
                  </div>
                </div>

                {/* Bagian Konten */}
                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#F59E0B] transition-colors">{quest.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{quest.description || 'Deskripsi misi belum tersedia.'}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-800">
                    <div className="flex gap-1">
                      <span className="text-lg text-[#F59E0B]">★</span>
                      <span className="text-lg text-[#F59E0B]">★</span>
                      <span className="text-lg text-[#F59E0B]">★</span>
                      <span className="text-lg text-gray-600">★</span>
                      <span className="text-lg text-gray-600">★</span>
                    </div>
                    <span className="text-sm font-bold text-white">+ {quest.xp || quest.rewardXp || 500} XP</span>
                  </div>
                </div>

              </div>

            {/* 👇 TUTUP LINK-NYA DI SINI 👇 */}
            </Link>

          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 font-pixel">
            Quest tidak ditemukan, Master!
          </div>
        )}
      </div>
    </div>
  );
}