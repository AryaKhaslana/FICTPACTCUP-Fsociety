import React from 'react';
import { Search } from 'lucide-react';
import prisma from '../../../lib/prisma'; // 👈 SESUAIKAN PATH KE PRISMA LU! // 👈 Tambahin Navbar UMKM biar estetiknya full! (Kalo ada)
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const metadata = {
  title: 'Eksplor Pahlawan | XPact',
};

export default async function EksplorSiswaPage() {
  
  // 1. CARI TAU SIAPA UMKM YANG LAGI LOGIN BUAT NAVBAR (Opsional, biar makin elit)
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 
  let loggedInUser = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      loggedInUser = await prisma.user.findUnique({
        where: { id: Number(payload.id) },
        select: { username: true, avatarUrl: true }
      });
    } catch (error) {
      console.log("Token error broskie!");
    }
  }

  // 🔥 2. TARIK SEMUA DATA SISWA DARI DATABASE 🔥
  const studentsData = await prisma.user.findMany({
    where: { role: 'STUDENT' }, 
    include: {
      studentProgress: true, // Biar tau XP-nya
    },
  });

  // 🔥 3. RAPIHIN DATA & SORTING BERDASARKAN XP TERTINGGI 🔥
  const sortedStudents = studentsData
    .map(student => ({
      id: student.id,
      name: student.username || "Pahlawan Tanpa Nama",
      role: "Web Developer", // 💡 Nanti lu bisa ganti ini ambil dari relasi Skill kalo DB lu udah lengkap
      xp: student.studentProgress?.[0]?.currentXp || 0,
      avatarUrl: student.avatarUrl, // Ini kuncinya broskie!
    }))
    .sort((a, b) => b.xp - a.xp);

  // 🔥 4. PISAHIN TOP 3 (Buat Highlight) & SISANYA (Buat List) 🔥
  // Karena desain lu bentuknya Podium: Index 1 (Juara 1) di tengah, Index 0 (Juara 2) di kiri, Index 2 (Juara 3) di kanan.
  // Jadi Bang Sepuh susun manual array top3-nya biar sesuai desain UI lu: [Juara 2, Juara 1, Juara 3]
  const top3Raw = sortedStudents.slice(0, 3);
  
  // Amanin datanya kalo DB lu masih sepi (kurang dari 3 siswa)
  const topStudents = [
    top3Raw[1] || null, // Juara 2 (Index array 0 di desain lu)
    top3Raw[0] || null, // Juara 1 (Index array 1 di desain lu)
    top3Raw[2] || null, // Juara 3 (Index array 2 di desain lu)
  ];

  // Sisanya (Rank 4 ke bawah) masuk ke otherStudents
  const otherStudents = sortedStudents.slice(3);


  return (
    // 1. BACKGROUND BERNYAWA
    <main className="min-h-screen font-poppins text-white pb-20 bg-[#05050A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A1F35] via-[#05050A] to-[#000000]">

      {/* Search & Header Section */}
      <div className="max-w-6xl mx-auto px-4 pt-4 mb-12">
        <h1 className="text-3xl md:text-5xl font-pixel text-center mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          EKSPLOR PAHLAWAN
        </h1>
        <p className="text-center text-gray-400 mb-8">Temukan talenta terbaik untuk menyelesaikan misi bisnismu.</p>
        
        <div className="relative max-w-2xl mx-auto">
          {/* 💡 Karena ini Server Component, fungsi Search benerannya (Ngetik trus filter) harus dipisah ke Client Component nanti kalo lu mau fungsional. Sekarang UI dulu. */}
          <input 
            type="text" 
            placeholder="Cari skill atau nama pahlawan..." 
            className="w-full bg-[#11131A]/80 backdrop-blur-md border border-gray-700/50 rounded-full py-4 px-6 pl-14 text-white focus:outline-none focus:border-[#F59E0B] transition-colors shadow-xl"
          />
          <Search className="absolute left-5 top-4 text-gray-400" size={24} />
        </div>
      </div>

      {/* 2. KONTAINER UTAMA */}
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="bg-[#0A0D14]/60 backdrop-blur-xl border border-gray-800 rounded-[2rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* --- BAGIAN HIGHLIGHT TOP 3 --- */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 mt-8">
            
            {/* Juara 2 (Kiri) */}
            <div className="flex flex-col items-center bg-gradient-to-t from-[#11131A] to-transparent p-6 rounded-2xl border-b-4 border-gray-400 w-full md:w-64 opacity-90 transform transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gray-800 rounded-full mb-4 border-2 border-gray-400 overflow-hidden shadow-[0_0_15px_rgba(156,163,175,0.4)]">
                <img 
                  src={topStudents[0]?.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${topStudents[0]?.name || 'Kosong'}`} 
                  alt="Juara 2" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-bold text-lg line-clamp-1">{topStudents[0]?.name || "Belum Ada"}</h3>
              <p className="text-xs text-gray-400 mb-2">{topStudents[0]?.role || "-"}</p>
              <span className="text-gray-300 font-pixel text-sm">{topStudents[0]?.xp || 0} XP</span>
            </div>

            {/* Juara 1 (Tengah - Paling Gede) */}
            <div className="flex flex-col items-center bg-gradient-to-t from-[#1A1105] to-transparent p-8 rounded-2xl border-b-4 border-[#F59E0B] w-full md:w-72 relative z-10 transform transition-transform hover:-translate-y-2 shadow-[0_-10px_40px_rgba(245,158,11,0.15)]">
              <div className="absolute -top-6 bg-[#F59E0B] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Top Talent</div>
              <div className="w-28 h-28 bg-gray-900 rounded-full mb-4 border-4 border-[#F59E0B] overflow-hidden shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                <img 
                  src={topStudents[1]?.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${topStudents[1]?.name || 'Kosong'}`} 
                  alt="Juara 1" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-bold text-2xl text-[#F59E0B] line-clamp-1">{topStudents[1]?.name || "Belum Ada"}</h3>
              <p className="text-sm text-gray-400 mb-2">{topStudents[1]?.role || "-"}</p>
              <span className="text-yellow-500 font-pixel text-lg">{topStudents[1]?.xp || 0} XP</span>
            </div>

            {/* Juara 3 (Kanan) */}
            <div className="flex flex-col items-center bg-gradient-to-t from-[#1A1311] to-transparent p-6 rounded-2xl border-b-4 border-[#D97706] w-full md:w-64 opacity-90 transform transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gray-800 rounded-full mb-4 border-2 border-[#D97706] overflow-hidden shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                <img 
                  src={topStudents[2]?.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${topStudents[2]?.name || 'Kosong'}`} 
                  alt="Juara 3" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-bold text-lg line-clamp-1">{topStudents[2]?.name || "Belum Ada"}</h3>
              <p className="text-xs text-gray-400 mb-2">{topStudents[2]?.role || "-"}</p>
              <span className="text-orange-400 font-pixel text-sm">{topStudents[2]?.xp || 0} XP</span>
            </div>

          </div>

          {/* Garis Pemisah */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10"></div>

          {/* --- BAGIAN LIST SISWA LAINNYA --- */}
          <div className="flex flex-col gap-4">
            <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2 pl-2">Pahlawan Lainnya</h4>
            
            {otherStudents.length === 0 ? (
               <p className="text-center text-gray-500 text-sm py-8">Belum ada pahlawan lain yang terdaftar.</p>
            ) : (
              otherStudents.map((student, index) => (
                <div key={student.id} className="group bg-[#11131A]/50 border border-gray-800 hover:border-[#F59E0B]/50 rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer hover:scale-[1.01]">
                  
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-gray-600 font-pixel text-lg md:text-xl w-6 md:w-8 text-center">#{index + 4}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 group-hover:border-[#F59E0B] transition-colors">
                        <img 
                          src={student.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${student.name}`} 
                          alt={student.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-white group-hover:text-[#F59E0B] transition-colors text-sm md:text-base line-clamp-1">{student.name}</h4>
                        <p className="text-[10px] md:text-xs text-gray-500">{student.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="text-gray-400 font-pixel text-xs md:text-sm whitespace-nowrap">{student.xp} XP</span>
                    <button className="bg-[#1A1D26] hover:bg-[#F59E0B] hover:text-black text-gray-300 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-colors shadow-md whitespace-nowrap">
                      Lihat Profil
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </main>
  );
}