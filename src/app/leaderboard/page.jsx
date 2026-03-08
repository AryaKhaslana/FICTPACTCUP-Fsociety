import React from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '../../lib/prisma'; 
import AuthNav from '../components/Navbar/AuthNav'; 
import LeaderboardList from './LeaderboardList'; 
import { Crown } from 'lucide-react';

export const metadata = {
  title: 'Leaderboard | XPact',
};

export default async function LeaderboardPage() {
  
  // 1. CEK KTP (SIAPA YANG LAGI LOGIN?)
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value; 
  let loggedInUserId = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      loggedInUserId = payload.id;
    } catch (error) {
      console.log("Token error di Leaderboard:", error.message);
    }
  }

  // 2. TARIK DATA DARI DATABASE
  const topUsersData = await prisma.user.findMany({
    where: { role: 'STUDENT' }, 
    include: {
      studentProgress: true, 
    },
  });

  // 3. SORTING MANUAL BERDASARKAN XP TERTINGGI
  const sortedUsers = topUsersData
    .map(user => ({
      id: user.id,
      name: user.username || user.name || "Anonim",
      role: "Hacking, web developer", // Nanti bisa dinamis ngambil dari skill tree
      questsDone: 12, 
      xp: user.studentProgress?.[0]?.currentXp || 0
    }))
    .sort((a, b) => b.xp - a.xp);

  // 4. PISAHIN DATA PODIUM (Rank 1-3) & LIST (Rank 4-15)
  const podiumUsers = sortedUsers.slice(0, 3);
  const listUsers = sortedUsers.slice(3, 15); // 👈 Dimulai dari index 3 (alias Rank #4) biar ga ngulang!

  // 5. CARI RANKING USER YANG LAGI LOGIN
  let currentUserData = null;
  if (loggedInUserId) {
    const userIndex = sortedUsers.findIndex(u => u.id === loggedInUserId);
    if (userIndex !== -1) {
      currentUserData = {
        ...sortedUsers[userIndex],
        rank: userIndex + 1 
      };
    }
  }

  // 👇 6. BIKIN VARIABEL NAMA BUAT DILEMPAR KE NAVBAR 👇
  const namaSiswa = currentUserData?.name || "Kim Booyah";

  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins">
      
      {/* 👇 7. SAKLAR AJAIBNYA DINYALAIN DI SINI! 👇 */}
      <AuthNav userName={namaSiswa} />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-12 flex flex-col items-center">
        
        {/* JUDUL HALL OF FAME */}
        <h1 className="text-4xl md:text-5xl font-pixel font-black text-white mb-10 tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Hall of fame
        </h1>

        {/* TOMBOL FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 md:mb-28">
          <button className="border-2 border-[#F59E0B] text-[#F59E0B] px-6 py-2 rounded-xl font-bold hover:bg-[#F59E0B]/10 transition-colors">
            Minggu ini
          </button>
          <button className="border-2 border-[#F59E0B] text-[#F59E0B] px-6 py-2 rounded-xl font-bold hover:bg-[#F59E0B]/10 transition-colors">
            Bulan ini
          </button>
          <button className="bg-[#F59E0B] text-[#000010] px-6 py-2 rounded-xl font-black hover:bg-[#D97706] shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-transform hover:scale-105">
            Sepanjang masa
          </button>
        </div>

        {/* PODIUM JUARA MENGGUNAKAN DATA DINAMIS DARI DATABASE */}
        <div className="flex justify-center items-end gap-2 md:gap-6 w-full max-w-3xl px-2">
          
          {/* ================= JUARA 2 (KIRI) ================= */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative z-10 -mb-10 md:-mb-14 transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#B45309] bg-gray-800 shadow-[0_0_20px_rgba(217,119,6,0.4)]">
                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${podiumUsers[1]?.name || 'Kosong'}`} alt="Juara 2" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full bg-gradient-to-t from-[#B45309] to-[#D97706] h-48 md:h-60 rounded-t-2xl pt-12 md:pt-16 pb-4 px-1 flex flex-col items-center justify-start text-center shadow-2xl relative overflow-hidden border-t-2 border-[#F59E0B]">
              <h2 className="text-2xl font-pixel md:text-3xl font-bold text-[#FFFFFF] drop-shadow-sm mb-1">#2</h2>
              <p className="font-bold text-xs md:text-sm text-white line-clamp-1">{podiumUsers[1]?.name || "Belum Ada"}</p>
              <p className="text-[10px] md:text-xs text-orange-200 font-semibold mb-3">{podiumUsers[1]?.role || "-"}</p>
              <p className="font-bold text-xs md:text-sm text-white drop-shadow-md">+ {podiumUsers[1]?.xp || 0} XP</p>
            </div>
          </div>

          {/* ================= JUARA 1 (TENGAH) ================= */}
          <div className="flex flex-col items-center w-1/3 z-20">
            <div className="relative z-10 -mb-12 md:-mb-16 flex flex-col items-center transition-transform hover:-translate-y-2">
              <img 
                src="/crown.png" 
                alt="Mahkota Juara 1" 
                // md:w-30 gue ganti jadi md:w-32 karena w-30 ga ada di Tailwind mpruy!
                className="w-16 md:w-32 absolute -top-10 md:-top-16 z-20 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" 
              />
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-[6px] border-yellow-400 bg-gray-800 shadow-[0_0_30px_rgba(250,204,21,0.6)]">
                <img src="/gojo.png" alt="Juara 1" className="w-full h-full object-cover scale-170 md:scale-[2.3]" />
              </div>
            </div>
            <div className="w-full bg-gradient-to-t from-[#D97706] to-[#F59E0B] h-64 md:h-80 rounded-t-2xl pt-16 md:pt-20 pb-4 px-1 flex flex-col items-center justify-start text-center shadow-[0_0_40px_rgba(245,158,11,0.3)] relative overflow-hidden border-t-4 border-yellow-400">
              <h2 className="text-3xl font-pixel md:text-4xl font-bold text-[#FFFFFF]  drop-shadow-sm mb-1">#1</h2>
              <p className="font-black text-sm md:text-base text-[#FFFFFF] line-clamp-1">{podiumUsers[0]?.name || "Belum Ada"}</p>
              <p className="text-[10px] md:text-xs text-[#FFFFFF]/80 font-bold mb-3">{podiumUsers[0]?.role || "-"}</p>
              <p className="font-black text-sm md:text-base text-white drop-shadow-md">+ {podiumUsers[0]?.xp || 0} XP</p>
            </div>
          </div>

          {/* ================= JUARA 3 (KANAN) ================= */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative z-10 -mb-10 md:-mb-14 transition-transform hover:-translate-y-2">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#92400E] bg-gray-800 shadow-[0_0_20px_rgba(146,64,14,0.5)]">
                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${podiumUsers[2]?.name || 'Kosong'}`} alt="Juara 3" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full bg-gradient-to-t from-[#78350F] to-[#92400E] h-40 md:h-52 rounded-t-2xl pt-12 md:pt-16 pb-4 px-1 flex flex-col items-center justify-start text-center shadow-xl relative overflow-hidden border-t-2 border-[#D97706]">
              <h2 className="text-2xl font-pixel md:text-3xl font-bold text-[#FFFFFF]  drop-shadow-md mb-1">#3</h2>
              <p className="font-bold text-xs md:text-sm text-white line-clamp-1">{podiumUsers[2]?.name || "Belum Ada"}</p>
              <p className="text-[10px] md:text-xs text-orange-200 font-semibold mb-3">{podiumUsers[2]?.role || "-"}</p>
              <p className="font-bold text-xs md:text-sm text-yellow-500 drop-shadow-md">+ {podiumUsers[2]?.xp || 0} XP</p>
            </div>
          </div>

        </div>

        {/* PANGGIL KOMPONEN ANAK BARU DI BAWAH PODIUM! */}
        <LeaderboardList topUsers={listUsers} currentUser={currentUserData} />

      </main>
    </div>
  );
}