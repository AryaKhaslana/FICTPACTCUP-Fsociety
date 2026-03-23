"use client";
import React, { useState, useEffect } from 'react';

const PublicProfileForm = ({ userRole = 'UMKM' }) => {
  // 1. Kasih fallback image URL biar gak nembak string kosong pas pertama render
  const defaultAvatar = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=300';
  const defaultBanner = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000';

  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    avatarUrl: defaultAvatar,
    coverUrl: defaultBanner, 
    newPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // 1. TARIK DATA DARI DATABASE 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user'); 
        const data = await res.json();
        
        if (data.success) {
          setFormData({
            username: data.user.username || '',
            bio: data.user.bio || '',
            avatarUrl: data.user.avatarUrl || defaultAvatar,
            coverUrl: data.user.coverUrl || defaultBanner,
            newPassword: ''
          });
        }
      } catch (error) {
        console.error("Gagal ambil data profil broskie!", error);
      }
    };
    fetchProfile();
  }, []);

  // 2. FUNGSI UPDATE KE DATABASE
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/user', { 
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFoto = () => {
    const newUrl = prompt("Masukkan Link (URL) Foto Profil Baru:");
    // Validasi sederhana biar user gak masukin string kosong atau cuma spasi
    if (newUrl && newUrl.trim() !== '') {
      setFormData({ ...formData, avatarUrl: newUrl });
    }
  };

  // 🔥 FUNGSI BARU BUAT EDIT BANNER 🔥
  const handleEditBanner = () => {
    const newUrl = prompt("Masukkan Link (URL) Foto Banner Baru:");
    // Validasi sederhana biar user gak masukin string kosong atau cuma spasi
    if (newUrl && newUrl.trim() !== '') {
      setFormData({ ...formData, coverUrl: newUrl });
    }
  };

  // Fungsi buat riset form kalo kepencet batal (opsional, tapi bagus buat UX)
  const handleCancel = () => {
    // Lu bisa nembak API fetchProfile lagi disini, atau ngosongin form sementara.
    // Di sini gue contohin reload aja atau bisa dibiarin kosongin fungsi ini.
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 w-full max-w-5xl mb-12">
      
      {/* SECTION 1: PROFIL PUBLIK */}
      <div className="bg-[#0A0D1A] rounded-2xl border border-gray-800 p-6 md:p-8">
        
        {/* 🔥 AREA EDIT BANNER 🔥 */}
        <div className="w-full h-40 md:h-56 bg-gray-800 rounded-xl relative overflow-hidden mb-12 group border border-gray-700">
          <img 
            src={formData.coverUrl} 
            alt="Banner Cover" 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
          />
          <button 
            type="button" // 👈 Biasakan pakai type="button" biar gak aneh-aneh
            onClick={handleEditBanner}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f59e0b] hover:bg-[#d97706] text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_4px_0_rgb(180,83,9)] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2 opacity-0 group-hover:opacity-100"
          >
            <span>📷</span> Ubah Banner
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start relative">
          
          {/* AREA EDIT AVATAR */}
          <div className="relative mx-auto md:mx-0 -mt-24 md:-mt-28 z-10">
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#0A0D1A] bg-[#0f172a] shadow-xl">
              <img 
                src={formData.avatarUrl}
                className="w-full h-full object-cover"
                alt="Profil"
              />
            </div>

            <button 
              type="button" // 👈 Tambah type="button"
              onClick={handleEditFoto}
              className="absolute bottom-4 right-0 bg-[#f59e0b] hover:bg-[#d97706] text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-1 z-10"
            >
              <span>✏️</span> EDIT
            </button>
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-white tracking-wide"> 
                {userRole === 'STUDENT' ? 'Nama Pahlawan:' : 'Nama Klien:'} 
              </label>
              <input 
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-[#0f172a]/40 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
                placeholder="Nama Anda..."
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-white tracking-wide"> 
                {userRole === 'STUDENT' ? 'Bio Pahlawan:' : 'Bio Klien:'} 
              </label>
              <textarea 
                placeholder="Ketik yang anda mau ..."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-[#0f172a]/40 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 h-32 resize-none focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
              />
            </div>

            <div className="flex justify-end gap-4 pt-2">
              <button 
                type="button" // 👈 Tambah type="button"
                onClick={handleCancel}
                className="px-8 py-3 rounded-xl border border-[#1e293b] text-sm font-bold text-white hover:bg-[#1e293b]/50 transition-all"
              >
                Batal
              </button>

              <button 
                type="button" // 👈 Tambah type="button" biar gak reload halaman saat update
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