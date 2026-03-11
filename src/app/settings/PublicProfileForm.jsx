"use client";
import React, { useState } from 'react';

const PublicProfileForm = () => {
  const [formData, setFormData] = useState({
    name: 'Nasgor Mas Ambas ...',
    bio: ''
  });

  return (
    <div className="flex flex-col md:flex-row gap-12 items-start animate-in fade-in duration-700">
      
      {/* Avatar Section */}
      <div className="relative mx-auto md:mx-0">
        <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-[#1e293b] p-1 bg-[#0f172a] shadow-xl">
          <div className="w-full h-full rounded-full overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=300"
              className="w-full h-full object-cover"
              alt="Profil Nasgor"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-bold">TUKAR FOTO</span>
            </div>
          </div>
        </div>

        <button className="absolute bottom-6 right-0 bg-[#f59e0b] hover:bg-[#d97706] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all border border-black/10 flex items-center gap-1">
          <span>✏️</span> Edit
        </button>
      </div>

      {/* Input Fields */}
      <div className="flex-1 w-full space-y-8">

        <div className="space-y-3">
          <label className="text-sm font-bold text-white tracking-wide">Nama Klien:</label>
          <input 
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#0f172a]/50 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
            placeholder="Nasgor Mas Ambas ..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-white tracking-wide">Bio Klien:</label>
          <textarea 
            placeholder="Ketik yang anda mau ..."
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            className="w-full bg-[#0f172a]/50 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 h-40 resize-none focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
          />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button className="px-8 py-3 rounded-xl border border-[#1e293b] text-sm font-bold text-white hover:bg-white/5 shadow-[0_4px_0_rgb(30,41,59)] hover:shadow-[0_2px_0_rgb(30,41,59)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all">
            Batal
          </button>

          <button className="px-8 py-3 rounded-xl bg-[#f59e0b] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_6px_0_rgb(180,83,9)] hover:shadow-[0_3px_0_rgb(180,83,9)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all">
            Perbarui profil
          </button>
        </div>

      </div>
    </div>
  );
};

export default PublicProfileForm;