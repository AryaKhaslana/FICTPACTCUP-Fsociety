"use client";
import React, { useState, useEffect } from 'react';

const SecurityForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. TARIK DATA EMAIL DARI DATABASE PAS HALAMAN DIBUKA
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        
        if (data.success) {
          setEmail(data.user.email || ''); // 👈 Asumsi di route GET lu nambahin email
        }
      } catch (error) {
        console.error("Gagal ambil email broskie!", error);
      }
    };
    fetchProfile();
  }, []);

  // 2. FUNGSI UPDATE PASSWORD KE DATABASE
  const handleUpdateSecurity = async () => {
    // Validasi dasar
    if (!newPassword) {
      return alert("Password baru belum diisi broskie!");
    }
    if (newPassword !== confirmPassword) {
      return alert("Waduh, konfirmasi password lu nggak sama nih!");
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: newPassword }),
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        alert("Siuuu! Password berhasil diganti bosku! 🔥");
        // Kosongin kolom password lagi abis sukses
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert("Gagal update password: " + data.message);
      }
    } catch (error) {
      alert("Waduh, server lagi ngambek nih broskie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 🔥 WRAPPER LUAR: Lebar dibikin max-w-5xl biar sejajar sama PublicProfileForm
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 w-full max-w-5xl">
      
      {/* 🔥 KOTAK CARD UTAMA 🔥 */}
      <div className="bg-[#0A0D1A] rounded-2xl border border-gray-800 p-6 md:p-8 space-y-8">
        
        {/* Email Section */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-white tracking-wide">
            Alamat Email:
          </label>

          <div className="relative">
            <input
              type="email"
              value={email}
              disabled // 👈 Sengaja di-disabled biar user gak iseng ganti email sembarangan
              className="w-full bg-[#0f172a]/50 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-500 cursor-not-allowed outline-none transition-all shadow-inner"
              placeholder="Loading email..."
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="text-[10px] font-black text-green-500/80 bg-green-500/5 px-2 py-1 rounded border border-green-500/10">
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Password Section (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Password Baru */}
          <div className="space-y-3 relative">
            <label className="text-sm font-bold text-white tracking-wide">
              Password Baru:
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan password baru ..."
                className="w-full bg-[#0f172a]/40 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPass ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div className="space-y-3 relative">
            <label className="text-sm font-bold text-white tracking-wide">
              Konfirmasi Password:
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang password ..."
                className="w-full bg-[#0f172a]/40 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 focus:border-[#f59e0b] outline-none transition-all placeholder:text-gray-600 shadow-inner"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showConfirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/></svg>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
          <button 
            onClick={() => { setNewPassword(""); setConfirmPassword(""); }}
            className="px-8 py-3 rounded-xl border border-[#1e293b] text-sm font-bold text-white hover:bg-[#1e293b]/50 transition-all"
          >
            Batal
          </button>

          <button 
            onClick={handleUpdateSecurity}
            disabled={isLoading}
            className={`px-8 py-3 rounded-xl text-black font-extrabold text-sm uppercase tracking-wider transition-all ${
              isLoading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-[#f59e0b] shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none'
            }`}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan perubahan'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default SecurityForm;