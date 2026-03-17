import React from 'react';

export default function FeatureShowcase() {
  return (
    <section className="w-full py-20 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* JUDUL UTAMA */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-pixel tracking-widest uppercase mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
            Bukan Magang Biasa: <br/> Ini Petualangan RPG-mu!
          </h2>
          <div className="h-1 w-40 bg-yellow-500 mx-auto rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"></div>
        </div>

        {/* FEATURE 1: SISI SISWA */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-32">
          {/* Screenshot (Kiri) */}
          <div className="flex-1 relative group">
            <div className="absolute -inset-2 bg-blue-600/20 blur-xl rounded-3xl group-hover:bg-blue-600/30 transition-all"></div>
            <div className="relative border-4 border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              <img src="/ss-dashboard-siswa.png" alt="Dashboard Siswa" className="w-full h-auto" />
            </div>
          </div>
          {/* Teks (Kanan) */}
          <div className="flex-1 text-left">
            <h3 className="text-3xl font-bold text-white mb-4 font-pixel tracking-wider">BANGUN KARAKTER & PORTOFOLIO</h3>
            <p className="text-gray-400 leading-relaxed mb-6">Selesaikan misi dari UMKM nyata dan saksikan karakter digitalmu berevolusi! Level dan XP yang kamu kumpulkan adalah bukti nyata kompetensimu.</p>
            <ul className="space-y-3">
              {['Sistem Leveling & XP Otomatis', 'Profil Pahlawan dengan Badge Custom', 'Pantau Quest Aktif Real-time'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-yellow-500 font-bold">
                  <span className="p-1 bg-yellow-500/10 border border-yellow-500/50 rounded">✅</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FEATURE 2: SISI UMKM */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          {/* Screenshot (Kanan) */}
          <div className="flex-1 relative group">
            <div className="absolute -inset-2 bg-purple-600/20 blur-xl rounded-3xl group-hover:bg-purple-600/30 transition-all"></div>
            <div className="relative border-4 border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              <img src="/ss-kanban-umkm.png" alt="Kanban UMKM" className="w-full h-auto" />
            </div>
          </div>
          {/* Teks (Kiri) */}
          <div className="flex-1 text-left">
            <h3 className="text-3xl font-bold text-white mb-4 font-pixel tracking-wider">KELOLA MISI DENGAN KANBAN</h3>
            <p className="text-gray-400 leading-relaxed mb-6">Pantau submission siswa secara intuitif. Cukup satu klik untuk memberikan reward XP dan Level secara otomatis tanpa ribet!</p>
            <ul className="space-y-3">
              {['Kanban Board Multi-Status', 'Otomatisasi Reward XP & Level', 'Review & Rating Pahlawan'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-blue-400 font-bold"> 
                  <span className="p-1 bg-blue-500/10 border border-blue-500/50 rounded">✅</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}