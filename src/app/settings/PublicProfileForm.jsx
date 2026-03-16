"use client";
import React, { useState, useEffect } from 'react';

const PublicProfileForm = ({ userRole = 'UMKM' }) => {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    avatarUrl: '',
    newPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // 1. TARIK DATA DARI DATABASE (ALAMAT UDAH DIBENERIN)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user'); // 👈 UDAH DIGANTI
        const data = await res.json();
        
        if (data.success) {
          setFormData({
            username: data.user.username || '',
            bio: data.user.bio || '',
            avatarUrl: data.user.avatarUrl || 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=300',
            newPassword: ''
          });
        }
      } catch (error) {
        console.error("Gagal ambil data profil broskie!", error);
      }
    };
    fetchProfile();
  }, []);

  // 2. FUNGSI UPDATE KE DATABASE (ALAMAT UDAH DIBENERIN)
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/user', { // 👈 UDAH DIGANTI
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Siuuu! Data berhasil diperbarui bosku! 🔥");
        setFormData({ ...formData, newPassword: '' }); 
      } else {
        alert("Gagal update: " + data.message);
      }
    } catch (error) {
      alert("Waduh, server lagi ngambek nih broskie.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFoto = () => {
    const newUrl = prompt("Masukkan Link (URL) Foto Profil Baru:");
    if (newUrl) {
      setFormData({ ...formData, avatarUrl: newUrl });
    }
  };

  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-700 w-full max-w-5xl">
      
      {/* SECTION 1: PROFIL PUBLIK */}
      <div>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          <div className="relative mx-auto md:mx-0">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#1e293b] p-1 bg-[#0f172a] shadow-xl">
              <img 
                src={formData.avatarUrl || "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=300"}
                className="w-full h-full rounded-full object-cover"
                alt="Profil"
              />
            </div>

            <button 
              onClick={handleEditFoto}
              className="absolute bottom-4 right-0 bg-[#f59e0b] hover:bg-[#d97706] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-1 z-10"
            >
              <span>✏️</span> EDIT
            </button>
          </div>

          <div className="flex-1 w-full space-y-6">

            <div className="space-y-3">
              <label className="text-sm font-bold text-white tracking-wide"> {userRole === 'STUDENT' ? 'Nama Pahlawan:' : 'Nama Klien:'} </label>
              <input 
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-[#0f172a]/40 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
                placeholder="Nasgor Mas Ambas ..."
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-white tracking-wide"> {userRole === 'STUDENT' ? 'Bio Pahlawan:' : 'Bio Klien:'} </label>
              <textarea 
                placeholder="Ketik yang anda mau ..."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-[#0f172a]/40 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 h-32 resize-none focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
              />
            </div>

            <div className="flex justify-end gap-4 pt-2">
              <button className="px-8 py-3 rounded-xl border border-[#1e293b] text-sm font-bold text-white hover:bg-[#1e293b]/50 transition-all">
                Batal
              </button>

              <button 
                onClick={handleUpdate}
                disabled={isLoading}
                className="px-8 py-3 rounded-xl bg-[#f59e0b] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                {isLoading ? 'Menyimpan...' : 'Perbarui profil'}
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default PublicProfileForm;