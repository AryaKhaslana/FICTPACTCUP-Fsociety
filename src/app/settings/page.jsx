  "use client";
  import PublicProfileForm from './PublicProfileForm';
  import SecurityForm from './SecurityForm';
  import React, { useState } from 'react';

  const SecurityFormLocal = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [email, setEmail] = useState('ambas.nasgor@gmail.com');

    return (
      <div className="space-y-8 max-w-3xl animate-in fade-in duration-700 delay-200">
        <div className="space-y-3">
          <label className="text-sm font-bold text-white tracking-wide">Alamat Email:</label>
          <div className="relative">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f172a]/50 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-400 focus:border-[#f59e0b] outline-none transition-all"
              placeholder="ambas.nasgor@gmail.com ..."
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="text-[10px] font-black text-green-500/80 bg-green-500/5 px-2 py-1 rounded border border-green-500/10">VERIFIED</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 relative">
            <label className="text-sm font-bold text-white tracking-wide">Password Baru:</label>
            <div className="relative">
              <input 
                type={showPass ? "text" : "password"}
                placeholder="Masukkan password baru ..."
                className="w-full bg-[#0f172a]/50 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 focus:border-[#f59e0b] outline-none transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPass ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24L1 1l22 22"/></svg>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3 relative">
            <label className="text-sm font-bold text-white tracking-wide">Konfirmasi Password:</label>
            <div className="relative">
              <input 
                type={showConfirm ? "text" : "password"}
                placeholder="Masukkan password baru ..."
                className="w-full bg-[#0f172a]/50 border border-[#1e293b] rounded-xl px-5 py-4 text-sm text-gray-300 focus:border-[#f59e0b] outline-none transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showConfirm ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24L1 1l22 22"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button className="px-8 py-3 rounded-xl border border-[#1e293b] text-sm font-bold text-white hover:bg-white/5 shadow-[0_4px_0_rgb(30,41,59)] hover:shadow-[0_2px_0_rgb(30,41,59)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all">
            Batal
          </button>
          <button className="px-8 py-3 rounded-xl bg-[#f59e0b] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_6px_0_rgb(180,83,9)] hover:shadow-[0_3px_0_rgb(180,83,9)] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all">
            Simpan perubahan
          </button>
        </div>
      </div>
    );
  };

  /**
   * KOMPONEN UTAMA: SettingsPage
   */
  export default function SettingsPage() {
    return (
      <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#f59e0b]/30 pb-20">
        {/* Header / Navbar */}
        <header className="w-full border-b border-white/5 bg-[#050810]/90 backdrop-blur-xl px-8 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/10">
              <img src="https://cdn-icons-png.flaticon.com/512/1147/1147805.png" className="w-6 h-6 invert" alt="Logo" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">Pengaturan</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Quest</a>
            <a href="#" className="hover:text-white transition-colors">UMKM</a>
            <a href="#" className="hover:text-white transition-colors">Leaderboard</a>
          </nav>

          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-white">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
            <button className="text-gray-400 hover:text-white relative">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-[#f59e0b] overflow-hidden p-0.5 shadow-lg shadow-orange-500/10 cursor-pointer">
              <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=100" alt="User" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-8 pt-16">
          
          {/* Profile Identity */}
          <div className="flex items-center gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="w-24 h-24 rounded-full border-2 border-[#1e293b] p-1.5 bg-[#0f172a] shadow-2xl shadow-black/50">
              <img 
                src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=200" 
                className="w-full h-full object-cover rounded-full" 
                alt="User Large"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Nasgor mas ambas</h1>
              <p className="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mt-1">Your Personal Account</p>
            </div>
          </div>

          {/* Section: Profil Publik */}
          <section className="mb-24">
            <div className="flex flex-col mb-10 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Profil publik</h2>
              <div className="h-[2px] w-full bg-gradient-to-r from-[#1e293b] to-transparent"></div>
            </div>
            <PublicProfileForm />
          </section>

          {/* Section: Keamanan */}
          <section>
            <div className="flex flex-col mb-10 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Keamanan</h2>
              <div className="h-[2px] w-full bg-gradient-to-r from-[#1e293b] to-transparent"></div>
            </div>
            <SecurityForm />
          </section>

        </main>

        {/* Copyright Footer */}
        <footer className="mt-20 flex justify-center opacity-20 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-black uppercase tracking-[0.8em]">© 2024 FICTPACT-F SOCIETY</p>
        </footer>
      </div>
    );
    
  }