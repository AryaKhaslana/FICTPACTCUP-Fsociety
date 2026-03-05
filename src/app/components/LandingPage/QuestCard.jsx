import React from 'react';

const QuestCard = ({ title, description, company, categories, xp, stars, image }) => {
  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-orange-500 transition-all duration-300 group cursor-pointer">
      {/* Bagian Gambar */}
      <div className="relative h-44 w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        
        {/* Overlay Badge Kiri (Nama Toko) */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-gray-700 px-3 py-1 rounded-full">
          <p className="text-[10px] text-white font-medium leading-tight">
            {company.split(',')[0]},<br />{company.split(',')[1]}
          </p>
        </div>

        {/* Overlay Badge Kanan (Tags) */}
        <div className="absolute top-3 right-3 flex gap-1">
          {categories.map((cat, i) => (
            <span key={i} className="bg-[#0f172a]/90 border border-blue-400 text-blue-100 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Bagian Konten */}
      <div className="p-5 flex flex-col h-full bg-[#111827]">
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`text-sm ${i < stars ? 'text-orange-400' : 'text-gray-600'}`}>
                ★
              </span>
            ))}
          </div>
          <p className="text-white font-bold text-[13px] tracking-wide">
            + {xp} XP
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;