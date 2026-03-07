import React from 'react';

export default function PortfolioGallery() {
  return (
    <div className="bg-[#11131A] rounded-2xl border border-gray-800 p-6 md:p-8 shadow-xl h-full flex flex-col">
      
      {/* Judul Font Pixel */}
      <h3 className="text-[#F59E0B] font-pixellari text-xl md:text-2xl mb-6 tracking-wider drop-shadow-md">
        Galeri Portofolio
      </h3>
      
      {/* GRID CONTAINER SAKTI (3 Kolom) */}
      <div className="grid grid-cols-3 gap-3 md:gap-5 flex-grow">
        
        {/* ITEM 1: KOPIUM (Kiri Atas - Lebar 2 Kolom) */}
        <div className="col-span-2 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer h-32 md:h-48 shadow-lg bg-gray-800">
          <img 
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" 
            alt="Kopium" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          {/* Overlay Hitam Pas Di-hover */}
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-pixel text-white text-lg md:text-xl tracking-widest drop-shadow-lg">KOPIUM</span>
          </div>
        </div>

        {/* ITEM 2: SO MATCHA (Kanan - Tinggi 2 Baris) */}
        {/* Rahasianya ada di row-span-2 biar dia manjang ke bawah */}
        <div className="col-span-1 row-span-2 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer shadow-lg bg-gray-800">
          <img 
            src="https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=400&h=800&fit=crop" 
            alt="So Matcha" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-pixel text-white text-sm md:text-lg tracking-widest text-center leading-relaxed">SO<br/>MATCHA</span>
          </div>
        </div>

        {/* ITEM 3: MIDNIGHT RAVEN (Kiri Bawah 1 - Kotak) */}
        <div className="col-span-1 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer aspect-square shadow-lg bg-gray-800">
          <img 
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop" 
            alt="Midnight Raven" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-pixel text-white text-[10px] md:text-sm tracking-widest text-center leading-relaxed px-1">MIDNIGHT<br/>RAVEN</span>
          </div>
        </div>

        {/* ITEM 4: KAMPUS KONNECT (Kiri Bawah 2 - Kotak) */}
        <div className="col-span-1 relative rounded-xl overflow-hidden border border-gray-700 group cursor-pointer aspect-square shadow-lg bg-gray-800">
          <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?w=500&h=500&fit=crop" 
            alt="Kampus Konnect" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-pixel text-white text-[10px] md:text-sm tracking-widest text-center leading-relaxed px-1">KAMPUS<br/>KONNECT</span>
          </div>
        </div>

      </div>
    </div>
  );
}