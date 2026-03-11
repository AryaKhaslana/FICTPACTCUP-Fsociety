import React from 'react';

export default function ProfilClient() {
  return (
    <div className="bg-[#1A1F32] rounded-2xl overflow-hidden border border-gray-700 text-white shadow-lg">
      {/* Cover Image */}
      <div className="relative h-40 md:h-48 w-full bg-gray-600">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000" 
          alt="Restoran Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Profil</h1>
        </div>
      </div>

      {/* Profil Info */}
      <div className="p-6 pt-0 flex flex-col md:flex-row items-center md:items-start gap-6 relative">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full border-4 border-[#1A1F32] bg-[#0A0D1A] -mt-12 z-10 overflow-hidden flex-shrink-0">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Logo Nasgor" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Text */}
        <div className="flex-1 text-center md:text-left md:mt-4">
          <h2 className="text-2xl font-bold">Nasgor Mas Ambas</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <span>👑</span>
            <span className="text-yellow-400 font-semibold text-sm">Klien Elite</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mt-3">
            <span className="text-sm">Rating:</span>
            <span className="text-yellow-400 text-sm tracking-widest">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-300 text-sm ml-1">(5.0)</span>
          </div>
        </div>

        {/* Badges/Stats */}
        <div className="flex gap-8 md:mt-4 bg-[#111424] md:bg-transparent p-4 md:p-0 rounded-xl">
          {/* EXP Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative flex items-center justify-center">
              {/* Simple Hexagon shape using SVG */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <polygon points="50 5, 95 25, 95 75, 50 95, 5 75, 5 25" fill="#1D4ED8" stroke="#EAB308" strokeWidth="6" />
              </svg>
              <span className="relative z-10 text-white font-bold text-[10px]">EXP</span>
            </div>
            <div>
              <div className="font-bold text-sm">1990</div>
              <div className="text-[10px] text-gray-400">XP Diberikan</div>
            </div>
          </div>

          {/* Bronze Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative flex items-center justify-center">
               {/* Simple Shield shape using SVG */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <path d="M10,10 L90,10 L90,40 C90,80 50,95 50,95 C50,95 10,80 10,40 Z" fill="#92400E" stroke="#78350F" strokeWidth="6" />
              </svg>
              <span className="relative z-10 text-white font-bold text-[10px]">+</span>
            </div>
            <div>
              <div className="font-bold text-sm text-gray-200">Bronze</div>
              <div className="text-[10px] text-gray-400">Total Quest</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}