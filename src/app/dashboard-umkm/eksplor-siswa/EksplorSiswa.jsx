import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function EksplorSiswaPage() {
  // Data dummy buat contoh
  const topStudents = [
    { id: 2, name: 'Gojouuuuu', xp: 2200, role: 'UI/UX', rank: 'A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gojo' },
    { id: 1, name: 'Master', xp: 4100, role: 'Fullstack', rank: 'S', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Master' },
    { id: 3, name: 'Arya pemula', xp: 1100, role: 'Frontend', rank: 'B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arya' },
  ];

  const otherStudents = [
    { id: 4, name: 'Ghafur', xp: 1750, role: 'Backend', rank: 'A' },
    { id: 5, name: 'Sutejooo', xp: 1750, role: 'Desain Grafis', rank: 'A' },
    { id: 6, name: 'Naruto', xp: 900, role: 'Video Editor', rank: 'C' },
  ];

  return (
    // 1. BACKGROUND BERNYAWA (Gak hitam mati, ada glow di tengah atas)
    <main className="min-h-screen font-poppins text-white pb-20 bg-[#05050A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1F35] via-[#05050A] to-[#000000]">
      
      {/* Search & Header Section */}
      <div className="max-w-6xl mx-auto px-4 pt-12 mb-12">
        <h1 className="text-3xl md:text-5xl font-pixel text-center mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          EKSPLOR PAHLAWAN
        </h1>
        <p className="text-center text-gray-400 mb-8">Temukan talenta terbaik untuk menyelesaikan misi bisnismu.</p>
        
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Cari skill atau nama pahlawan..." 
            className="w-full bg-[#11131A]/80 backdrop-blur-md border border-gray-700/50 rounded-full py-4 px-6 pl-14 text-white focus:outline-none focus:border-[#F59E0B] transition-colors shadow-xl"
          />
          <Search className="absolute left-5 top-4 text-gray-400" size={24} />
        </div>
      </div>

      {/* 2. KONTAINER UTAMA (Biar Top 3 dan Bawah Nyambung!) */}
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="bg-[#0A0D14]/60 backdrop-blur-xl border border-gray-800 rounded-[2rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* --- BAGIAN HIGHLIGHT (Pengganti Podium) --- */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 mt-8">
            
            {/* Juara 2 (Kiri) */}
            <div className="flex flex-col items-center bg-gradient-to-t from-[#11131A] to-transparent p-6 rounded-2xl border-b-4 border-gray-400 w-full md:w-64 opacity-90 transform transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gray-700 rounded-full mb-4 border-2 border-gray-400 overflow-hidden shadow-[0_0_15px_rgba(156,163,175,0.4)]">
                <img src={topStudents[0].avatar} alt={topStudents[0].name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg">{topStudents[0].name}</h3>
              <p className="text-xs text-gray-400 mb-2">{topStudents[0].role}</p>
              <span className="text-gray-300 font-pixel text-sm">{topStudents[0].xp} XP</span>
            </div>

            {/* Juara 1 (Tengah - Paling Gede) */}
            <div className="flex flex-col items-center bg-gradient-to-t from-[#1A1105] to-transparent p-8 rounded-2xl border-b-4 border-[#F59E0B] w-full md:w-72 relative z-10 transform transition-transform hover:-translate-y-2 shadow-[0_-10px_40px_rgba(245,158,11,0.15)]">
              <div className="absolute -top-6 bg-[#F59E0B] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Top Talent</div>
              <div className="w-28 h-28 bg-yellow-900 rounded-full mb-4 border-4 border-[#F59E0B] overflow-hidden shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                <img src={topStudents[1].avatar} alt={topStudents[1].name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-2xl text-[#F59E0B]">{topStudents[1].name}</h3>
              <p className="text-sm text-gray-400 mb-2">{topStudents[1].role}</p>
              <span className="text-yellow-500 font-pixel text-lg">{topStudents[1].xp} XP</span>
            </div>

            {/* Juara 3 (Kanan) */}
            <div className="flex flex-col items-center bg-gradient-to-t from-[#1A1311] to-transparent p-6 rounded-2xl border-b-4 border-[#D97706] w-full md:w-64 opacity-90 transform transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-orange-900 rounded-full mb-4 border-2 border-[#D97706] overflow-hidden shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                <img src={topStudents[2].avatar} alt={topStudents[2].name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg">{topStudents[2].name}</h3>
              <p className="text-xs text-gray-400 mb-2">{topStudents[2].role}</p>
              <span className="text-orange-400 font-pixel text-sm">{topStudents[2].xp} XP</span>
            </div>

          </div>

          {/* Garis Pemisah Estetik */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10"></div>

          {/* --- BAGIAN LIST SISWA LAINNYA --- */}
          <div className="flex flex-col gap-4">
            <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2 pl-2">Pahlawan Lainnya</h4>
            
            {otherStudents.map((student, index) => (
              <div key={student.id} className="group bg-[#11131A]/50 border border-gray-800 hover:border-[#F59E0B]/50 rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer">
                
                <div className="flex items-center gap-6">
                  <span className="text-gray-600 font-pixel text-xl w-8 text-center">#{index + 4}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-lg">👤</div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-[#F59E0B] transition-colors">{student.name}</h4>
                      <p className="text-xs text-gray-500">{student.role}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-gray-400 font-pixel text-sm">{student.xp} XP</span>
                  <button className="bg-[#1A1D26] hover:bg-[#F59E0B] hover:text-black text-gray-300 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                    Lihat Profil
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}