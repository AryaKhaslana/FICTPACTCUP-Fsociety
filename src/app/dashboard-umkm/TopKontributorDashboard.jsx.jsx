import React from 'react';

export default function TopKontributorDashboard() {
  // Data dummy para pahlawan yang udah nyelesaiin misi buat UMKM ini.
  const kontributor = [
    { id: 1, name: 'Seyraa', role: 'Web Developer', xp: 2000, totalMisi: 2, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Seyraa' },
    { id: 2, name: 'Master', role: 'UI/UX Designer', xp: 1500, totalMisi: 1, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Master' },
    { id: 3, name: 'Gojouuuuu', role: 'Copywriter', xp: 500, totalMisi: 1, avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Gojo' },
  ];

  return (
    // Wrapper luar buat nampung Header dan Box List
    <div className="w-full flex flex-col gap-4 mt-6 md:mt-8">
      
      {/* 1 & 2: Header Section (Dikeluarin dari box & Title diganti) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-pixellari font-bold text-white flex items-center gap-3">
            Rekomendasi Siswa Untuk Mu
          </h2>
        </div>
        
        {/* 3: Button Lihat Semua dengan styling baru dari lu Bos */}
        <button className="bg-[#FFB800] hover:bg-[#E6A600] text-black text-sm font-bold py-1 px-4 rounded-md transition-all shadow-[0_4px_0_0_#996E00] hover:shadow-[0_2px_0_0_#996E00] hover:translate-y-1 active:translate-y-2 active:shadow-none">
          Lihat Semua
        </button>
      </div>

      {/* Box Grid List Kontributor (Sisa border dan kontennya aja) */}
      <div className="w-full bg-[#11131A] rounded-2xl border border-white-800 p-6 md:p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {kontributor.map((siswa, index) => (
            <div 
              key={siswa.id} 
              className="group bg-[#1A1D26] border border-white-700 hover:border-[#F59E0B]/50 rounded-xl p-4 flex items-center justify-between transition-all duration-300 cursor-pointer hover:shadow-lg"
            >
              {/* Bagian Kiri: Rank, Foto, Nama */}
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-gray-500 font-pixel text-lg md:text-xl w-4 md:w-6 text-center group-hover:text-[#F59E0B] transition-colors">
                  #{index + 1}
                </span>
                
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-[#F59E0B] transition-colors bg-gray-800">
                  <img src={siswa.avatar} alt={siswa.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col">
                  <h3 className="font-bold text-white text-sm md:text-base line-clamp-1">{siswa.name}</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 line-clamp-1">{siswa.role}</p>
                </div>
              </div>
              
              {/* Bagian Kanan: Stats XP */}
              <div className="text-right flex flex-col items-end">
                <span className="bg-black/50 px-3 py-1 rounded-lg font-black text-[#F59E0B] text-xs md:text-sm shadow-inner border border-gray-800">
                  +{siswa.xp} XP
                </span>
                <span className="text-[10px] text-gray-400 mt-1 font-medium">{siswa.totalMisi} Misi Selesai</span>
              </div>

            </div>
          ))}
          
        </div>
      </div>
      
    </div>
  );
}