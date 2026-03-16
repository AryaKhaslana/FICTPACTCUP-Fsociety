import React from 'react';

export default function PortfolioGallery() {
  return (
    <div className="bg-[#11131A] rounded-2xl border border-gray-800 p-6 md:p-8 shadow-xl h-full flex flex-col">
      
      {/* Judul Font Pixel */}
      <h3 className="text-[#F59E0B] font-pixellari text-xl md:text-2xl mb-6 tracking-wider drop-shadow-md shrink-0">
        Galeri Portofolio
      </h3>
      
      {/* 🔥 GRID CONTAINER SAKTI: Kunci di 3 Kolom & 2 Baris 🔥 */}
      <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 flex-grow min-h-[300px] md:min-h-[400px]">
        
        {/* ITEM 1: WEB UMKM (Kiri Atas - 2 Kolom, 1 Baris) */}
        <div className="col-span-2 row-span-1 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer shadow-lg bg-gray-800">
          <img 
            src="/web-umkm.png" 
            alt="Web UMKM" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-pixel text-white text-lg md:text-xl tracking-widest drop-shadow-lg text-center leading-relaxed">WEB KATALOG<br/>UMKM</span>
          </div>
        </div>

        {/* ITEM 2: CINEMATIC NASGOR (Kanan - 1 Kolom, 2 Baris Penuh) */}
        <div className="col-span-1 row-span-2 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer shadow-lg bg-gray-800">
          <img 
            src="/foto-bakso.png" 
            alt="Cinematic Nasgor" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
            <span className="font-pixel text-white text-[10px] md:text-sm tracking-widest text-center leading-relaxed">VIDEO<br/>PROMO<br/>NASGOR</span>
          </div>
        </div>

        {/* ITEM 3: DESIGN LOGO (Kiri Bawah 1 - 1 Kolom, 1 Baris) */}
        <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer shadow-lg bg-gray-800">
          <img 
            src="/logoprof.png" 
            alt="Design Logo" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-pixel text-white text-[8px] md:text-[10px] tracking-widest text-center leading-relaxed px-1">LOGO<br/>MAS AMBAS</span>
          </div>
        </div>

        {/* ITEM 4: BRANDING KOPIUM (Kiri Bawah 2 - 1 Kolom, 1 Baris) */}
        <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer shadow-lg bg-gray-800">
          <img 
            src="/kopiumbg.png" 
            alt="Branding Kopium" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-pixel text-white text-[8px] md:text-[10px] tracking-widest text-center leading-relaxed px-1">BRANDING<br/>KOPIUM</span>
          </div>
        </div>

      </div>
    </div>
  );
}