import React from 'react';

// Sekarang komponen ini nerima props "quests" dari halaman utamanya
export default function MisiOpenList({ quests = [] }) {
  return (
    <div className="bg-[#1A1F32] rounded-2xl p-6 border border-gray-700 text-white h-full flex flex-col">
      <h3 className="text-orange-400 font-bold text-lg mb-4">Misi yang open</h3>
      
      <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {/* Kalau belum bikin misi sama sekali */}
        {quests.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[150px] text-gray-400 text-sm italic">
            Belum ada Quest yang diposting nih.
          </div>
        ) : (
          /* Kalau misinya udah ada, kita looping (map) datanya */
          quests.map((quest) => (
            <div key={quest.id} className="bg-[#101423] border border-gray-700 rounded-xl flex overflow-hidden h-24 group hover:border-orange-500/50 transition-colors cursor-pointer">
              
              {/* Info Misi */}
              <div className="p-4 flex-1 flex flex-col justify-center">
                {/* Judul Misi ngambil dari DB */}
                <h4 className="font-semibold text-xs md:text-sm mb-3 group-hover:text-orange-400 transition-colors line-clamp-1">
                  {quest.title || "Quest Tanpa Judul"}
                </h4>
                
                <div className="flex items-center gap-6 text-[11px] md:text-xs">
                  {/* XP ngambil dari DB */}
                  <span className="text-gray-300 font-medium">+ {quest.xpReward || 0} XP</span>
                  
                  {/* Status (Anggep aja kalau nampil di sini berarti statusnya "Open") */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span>
                    <span className="text-gray-300 capitalize">{quest.status || "Open"}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail (Gambar Quest dari DB, kalau kosong pake gambar default) */}
              <div className="w-32 h-full flex-shrink-0">
                <img 
                  src={quest.thumbnailUrl || "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=300"} 
                  alt="Thumbnail Quest" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}