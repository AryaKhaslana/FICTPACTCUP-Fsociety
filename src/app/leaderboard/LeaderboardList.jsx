import React from 'react';

export default function LeaderboardList({ topUsers = [], currentUser = null }) {
  return (
    <div className="w-full flex flex-col items-center mt-12 pb-24 relative">
      
      {/* 1. HEADER LEADERBOARD HERO */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-3xl md:text-4xl font-pixel font-black text-white uppercase tracking-widest drop-shadow-md mb-2">
          Leaderboard <span className="text-green-500">hero</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto italic">
          "Bukan sekadar kode dan desain, ini tentang menyelamatkan roda ekonomi dari ambang kehancuran. Angkat senjatamu, Pahlawan!"
          <br/>- Guild Master Fsociety.
        </p>
        
        {/* Mahkota Pixel (Ganti src-nya kalau lu punya gambarnya) */}
        <div className="flex justify-center mt-6">
          <img src="/crown.png" alt="Crown" className="w-40 md:w-45 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
        </div>
      </div>

      {/* 2. KOTAK LIST TOP PLAYER */}
      <div className="w-full max-w-3xl bg-[#11131A] border-[4px] border-[#F59E0B] rounded-3xl p-4 md:p-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        
        <div className="flex flex-col gap-3">
          {topUsers.map((user, index) => {
            const rank = index + 1;
            // Nentuin dia dapet medali apa ngga
            const isTop3 = rank <= 3;
            const medalColors = ['bg-yellow-400', 'bg-gray-300', 'bg-amber-700'];

            return (
              <div key={user.id} className="flex items-center justify-between p-3 md:p-4 rounded-xl hover:bg-white/5 transition-colors border-b border-gray-800 last:border-0">
                
                {/* Bagian Kiri: Rank & Profil */}
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Rank / Medali */}
                  <div className="w-8 flex justify-center">
                    {isTop3 ? (
                      <div className={`w-6 h-8 rounded-full ${medalColors[rank-1]} shadow-lg flex items-center justify-center border-2 border-[#11131A]`}>
                        <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                      </div>
                    ) : (
                      <span className="font-black text-xl text-white">#{rank}</span>
                    )}
                  </div>
                  
                  {/* Avatar */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700 overflow-hidden border-2 border-gray-500">
                    <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`} alt={user.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Nama & Role */}
                  <div>
                    <p className="font-bold text-white text-sm md:text-base line-clamp-1">{user.name}</p>
                    <p className="text-[10px] md:text-xs text-gray-400 line-clamp-1">{user.role}</p>
                  </div>
                </div>

                {/* Bagian Kanan: Stats */}
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-xs md:text-sm text-gray-300 hidden md:block">{user.questsDone} Quest selesai</span>
                  <span className="bg-[#F59E0B] text-[#000010] font-black px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs whitespace-nowrap shadow-md">
                    + {user.xp} XP
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 3. STICKY BAR CURRENT USER (Paling Bawah) */}
      {currentUser && (
        <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center pb-4 md:pb-6 px-4 pointer-events-none">
          {/* Kotak bar-nya (pointer-events-auto biar tombolnya tetep bisa diklik kalau ada) */}
          <div className="w-full max-w-4xl bg-[#F59E0B] rounded-2xl p-3 md:p-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(245,158,11,0.3)] pointer-events-auto border-2 border-[#D97706]">
            
            <div className="flex items-center gap-4 md:gap-6">
              <span className="font-black text-2xl text-[#000010] drop-shadow-sm">#{currentUser.rank}</span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white overflow-hidden border-2 border-[#000010]">
                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.name}`} alt="You" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black text-[#000010] text-sm md:text-base">{currentUser.name}</p>
                <p className="text-[10px] md:text-xs text-[#000010]/70 font-bold hidden md:block">Itu kamu broskie!</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 pr-2">
              <span className="text-xs md:text-sm text-[#000010] font-bold hidden sm:block">{currentUser.questsDone} Quest selesai</span>
              <span className="bg-white text-[#000010] font-black px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm shadow-inner border border-gray-200">
                + {currentUser.xp} XP
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}