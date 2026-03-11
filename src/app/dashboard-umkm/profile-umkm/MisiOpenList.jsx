import React from 'react';

export default function MisiOpenList() {
  const missions = [1, 2, 3]; // Mock data untuk 3 list

  return (
    <div className="bg-[#1A1F32] rounded-2xl p-6 border border-gray-700 text-white h-full">
      <h3 className="text-orange-400 font-bold text-lg mb-4">Misi yang open</h3>
      
      <div className="flex flex-col gap-3">
        {missions.map((item) => (
          <div key={item} className="bg-[#101423] border border-gray-700 rounded-xl flex overflow-hidden h-24">
            
            {/* Info Misi */}
            <div className="p-4 flex-1 flex flex-col justify-center">
              <h4 className="font-semibold text-xs md:text-sm mb-3">Bikin Logo Nasi Goreng Mas Rusdi</h4>
              
              <div className="flex items-center gap-6 text-[11px] md:text-xs">
                <span className="text-gray-300 font-medium">+ 1000 XP</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span>
                  <span className="text-gray-300">Open</span>
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="w-32 h-full flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=300" 
                alt="Thumbnail Misi" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}