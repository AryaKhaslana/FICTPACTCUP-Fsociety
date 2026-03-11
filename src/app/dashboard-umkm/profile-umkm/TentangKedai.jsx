import React from 'react';

export default function TentangKedai() {
  return (
    <div className="bg-[#1A1F32] rounded-2xl p-6 border border-gray-700 text-white h-full flex flex-col">
      <h3 className="text-orange-400 font-bold text-lg mb-4">Tentang kedai</h3>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-6">
        Menyediakan ransum nasi goreng penambah HP terbaik se-Sidoarjo. Sedang mencari pahlawan visual untuk memperbarui logo kami
      </p>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-8 bg-red-600 rounded-full rounded-b-none rounded-t-full flex items-center justify-center relative">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <div className="absolute -bottom-1 border-[6px] border-transparent border-t-red-600 w-0 h-0"></div>
        </div>
        <span className="font-semibold text-sm">Sidoarjo, Jawa Timur</span>
      </div>

      {/* Map Placeholder */}
      <div className="rounded-xl overflow-hidden mt-auto border border-gray-600">
        <img 
          src="https://via.placeholder.com/600x300/e5e7eb/a3a3a3?text=Map+Sidoarjo" 
          alt="Peta Lokasi" 
          className="w-full h-32 object-cover"
        />
      </div>
    </div>
  );
}