import React from 'react';
import Link from 'next/link'; // 🔥 1. WAJIB IMPORT INI BROSKIE!

export default function LeaderboardList({ topUsers = [], currentUser = null }) {
  return (
    // 🔥 BUNGKUSAN DEWA (FRAGMENT) BIAR BAR KUNING BEBAS DARI PENJARA Z-INDEX 🔥
    <>
      {/* BAGIAN ATAS (LIST & HEADER) TETEP RELATIVE */}
      <div className="w-full flex flex-col items-center pt-24 mt-12 pb-32 relative z-10">
        
        {/* 2. HEADER LEADERBOARD HERO */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-4xl md:text-5xl font-pixel font-black text-white uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-4">
            LEADERBOARD <span className="text-green-500 text-shadow-sm">HERO</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto italic leading-relaxed">
            "Bukan sekadar kode dan desain, ini tentang menyelamatkan roda ekonomi dari ambang kehancuran. Angkat senjatamu, Pahlawan!"
            <br/><span className="font-bold text-gray-500">- Guild Master Fsociety.</span>
          </p>
        </div>

        {/* 3. KOTAK LIST TOP PLAYER */}
        <div className="w-full max-w-4xl bg-[#11131A]/80 backdrop-blur-md border-[2px] border-[#F59E0B]/50 rounded-3xl p-4 md:p-8 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-50"></div>

          <div className="flex flex-col gap-2">
            {topUsers.map((user, index) => {
              // KARENA PODIUM UDAH 1-3, LIST INI MULAI DARI 4 BROSKIE!
              const rank = index + 4; 
              return (
                // 🔥 2. SULAP <div> JADI <Link> BIAR BISA PINDAH HALAMAN! 🔥
                <Link 
                  href={`/profile/${user.id}`} // 👈 Ngarah ke profil musuh
                  key={user.id || index} 
                  className="group flex items-center justify-between p-3 md:p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border-b border-gray-800/50 last:border-0 hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-10 flex justify-center">
                      <span className="font-black text-xl text-gray-500 group-hover:text-white transition-colors">#{rank}</span>
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-800 overflow-hidden border-2 border-gray-600 group-hover:border-[#F59E0B] transition-colors">
                      <img 
                        src={user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`} 
                        alt={user.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-bold text-white text-base md:text-lg tracking-wide line-clamp-1 group-hover:text-[#F59E0B] transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider line-clamp-1 mt-0.5">
                        {user.role || 'Pahlawan Baru'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="text-xs md:text-sm text-gray-400 hidden md:block font-medium">
                      {user.questsDone || 0} Quest Selesai
                    </span>
                    <div className="bg-[#1E293B] border border-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 group-hover:border-[#F59E0B]/50 transition-colors">
                      <span className="text-[#F59E0B] font-black text-xs md:text-sm whitespace-nowrap drop-shadow-sm">
                        + {user.xp || 0} XP
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🔥 4. STICKY BAR CURRENT USER (DI LUAR PENJARA!) 🔥 */}
      {currentUser && (
        <div className="fixed bottom-0 left-0 w-full z-[9999] flex justify-center pb-6 px-4 pointer-events-none">
          
          {/* 🔥 3. STICKY BAR JUGA DIBIKIN BISA DIKLIK NGARAH KE PROFIL SENDIRI 🔥 */}
          <Link href="/profile" className="w-full max-w-4xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-2xl p-4 flex items-center justify-between shadow-[0_-15px_40px_rgba(245,158,11,0.25)] pointer-events-auto border-t border-yellow-300/30 transform transition-transform hover:-translate-y-1 cursor-pointer">
            
            <div className="flex items-center gap-4 md:gap-6">
              <span className="font-black text-3xl text-black/80 drop-shadow-md w-12 text-center">
                #{currentUser.rank}
              </span>
              
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white overflow-hidden border-2 border-black/80 shadow-inner">
                <img 
                  src={currentUser.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser.name}`} 
                  alt="You" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex flex-col">
                <p className="font-black text-black text-base md:text-lg tracking-wide">
                  {currentUser.name}
                </p>
                <p className="text-[10px] md:text-xs text-black/70 font-bold uppercase tracking-widest hidden md:block">
                  Itu Kamu Broskie! 🚀
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 pr-2">
              <span className="text-xs md:text-sm text-black/80 font-bold hidden sm:block">
                {currentUser.questsDone || 0} Quest Selesai
              </span>
              
              <div className="bg-black/90 px-5 md:px-6 py-2 md:py-2.5 rounded-xl border border-white/10 shadow-inner">
                <span className="text-[#F59E0B] font-black text-xs md:text-sm whitespace-nowrap tracking-wider">
                  + {currentUser.xp || 0} XP
                </span>
              </div>
            </div>

          </Link>
        </div>
      )}
    </>
  );
}