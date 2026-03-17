import React from 'react';
import { Award, Lock } from 'lucide-react';

export default function AchievementBox() {
  return (
    // Tambahin flex & flex-col h-full biar isinya bisa didorong ke bawah
    <div className="bg-[#11131A] rounded-3xl border border-gray-800 p-8 shadow-lg flex flex-col h-full">
      
      {/* HEADER */}
      <h3 className="text-[#F59E0B] font-bold font-pixellari text-lg mb-6 flex items-center gap-2">
        <Award size={20} /> Achievement
      </h3>
      
      {/* BADGE UNLOCKED (Kodingan Asli Lu - Bagian Atas) */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Badge 1 */}
        <div className="flex flex-col items-center text-center gap-3">
          <h4 className="font-bold text-white text-sm">Web Wizard</h4>
          <div className="w-20 h-20 rounded-full bg-[#0F172A] border-4 border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <img src="/gir.png" alt="Gir" className="w-12 h-12 object-contain" />
          </div>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Arsitek mahakarya digital. Tidak ada bug tampilan yang tidak bisa kamu basmi!
          </p>
        </div>

        {/* Badge 2 */}
        <div className="flex flex-col items-center text-center gap-3">
          <h4 className="font-bold text-white text-sm">Sepuh Design</h4>
          <div className="w-20 h-20 rounded-full bg-[#0F172A] border-4 border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <img src="/desain.png" alt="Desain" className="w-12 h-12 object-contain" />
          </div>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Sudah sepuh, tidak ada design yang tidak bisa lu taklukan!
          </p>
        </div>
      </div>

      {/* 🔥 JURUS MENGISI RUANG KOSONG: LOCKED ACHIEVEMENTS 🔥 */}
      {/* mt-auto bakal ngedorong elemen ini mentok ke bawah kalo kotaknya melar */}
      <div className="mt-auto border-t border-gray-800 pt-6">
        
        <h4 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
          <Lock size={14} /> Target Selanjutnya (Terkunci)
        </h4>

        <div className="flex flex-col gap-3">
          
          {/* Target 1: Raja Kanban */}
          <div className="flex items-center justify-between bg-[#0A0C14] border border-gray-800/60 p-3 rounded-xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center group-hover:border-yellow-500/50 transition-colors">
                <span className="text-lg opacity-50 group-hover:opacity-100">👑</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-bold">Raja Kanban</p>
                <p className="text-[10px] text-gray-400">Selesaikan 10 Misi UMKM</p>
              </div>
            </div>
            {/* Progress Bar Mini */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-yellow-500 font-bold">1 / 10</span>
              <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[10%]"></div>
              </div>
            </div>
          </div>

          {/* Target 2: Si Paling Aktif */}
          <div className="flex items-center justify-between bg-[#0A0C14] border border-gray-800/60 p-3 rounded-xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
                <span className="text-lg opacity-50 group-hover:opacity-100">🔥</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-bold">Pahlawan Rajin</p>
                <p className="text-[10px] text-gray-400">Login 7 Hari Berturut-turut</p>
              </div>
            </div>
            {/* Progress Bar Mini */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-red-500 font-bold">3 / 7</span>
              <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[42%]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}