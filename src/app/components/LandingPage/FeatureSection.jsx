"use client";

import React from 'react';
import QuestCard from './QuestCard';

// Kamu bisa menambahkan font Pixel di index.html atau via CDN di CSS
// @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

export default function FeatureSection() {
  const data = [
    {
      title: "Bikin Logo Warkop Makmur",
      description: "Bantu kami membuat logo dengan nuansa vintage dan modern.",
      company: "Haji makmur, bakso solo",
      categories: ["UI/UX", "Design"],
      xp: "500",
      stars: 3,
      image: "/ayam-geprek.jpg"
    },
    {
      title: "Bikin Web design Ayam geprek",
      description: "Bantu kami membuat design website dengan nuansa vintage dan modern.",
      company: "Pak Budi, ayam geprek",
      categories: ["Web", "Design"],
      xp: "1500",
      stars: 4,
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Duplikasi data agar menjadi 6 item seperti di foto
  const allQuests = [...data, ...data, ...data].slice(0, 6);

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-normal mb-6 tracking-widest text-white uppercase" 
              style={{ fontFamily: "'Press Start 2P', cursive, system-ui" }}>
            Quest UMKM
          </h1>
          <p className="text-gray-300 font-poppins text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
            Pilih misimu, pahlawan! Bantu selesaikan masalah UMKM lokal dan kumpulkan XP sebanyak-banyaknya
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-14 font-poppins">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#F59E0B]">
              🔍
            </span>
            <input 
              type="text" 
              placeholder="Search..." 
              // Border diganti jadi solid #F59E0B
              className="bg-transparent border border-[#F59E0B] rounded-full pl-11 pr-6 py-2.5 text-sm w-64 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
            />
          </div>
          
          <div className="hidden md:block w-[1.5px] h-8 bg-gray-700 mx-2"></div>

          {["Popular", "Design UI/UX", "Web Dev"].map((filter) => (
            <button key={filter} 
              // Border diganti jadi solid #F59E0B
              className="px-7 py-2.5 rounded-full border border-[#F59E0B] text-sm font-medium hover:bg-[#F59E0B] hover:text-[#020617] transition-all duration-300"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allQuests.map((quest, idx) => (
            <QuestCard key={idx} {...quest} />
          ))}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center">
          <button className="bg-[#F59E0B] hover:bg-[#D97706] text-[#020617] font-bold py-3.5 px-10 rounded-xl flex items-center gap-3 transition-transform active:scale-95 shadow-lg shadow-[#F59E0B]/20">
            Jelajahi selengkapnya 
            <span className="text-xl">›</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};
