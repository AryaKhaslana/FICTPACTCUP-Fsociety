"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function UmkmMenu() {
  const router = useRouter();
  
  // State buat buka-tutup modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref buat deteksi klik di luar modal
  const modalRef = useRef(null);
  
  // 🔥 THE ULTIMATE ANTI-KIKIR SYSTEM: Tarif Mutlak XPACT! 🔥
  const SYSTEM_RATES = {
    'Copywriting': { rank: 'C', xp: 200, label: 'Mudah', color: 'text-[#3BD47F]', bg: 'bg-[#1A2F25]' },
    'Desain / UI UX': { rank: 'B', xp: 500, label: 'Menengah', color: 'text-[#3B82F6]', bg: 'bg-[#1D2A43]' },
    'Video Editing': { rank: 'A', xp: 1000, label: 'Sulit', color: 'text-[#D946EF]', bg: 'bg-[#301636]' },
    'Web Dev': { rank: 'S', xp: 2000, label: 'Epic', color: 'text-[#F59E0B]', bg: 'bg-[#332414]' },
  };

  // State buat nampung isian form (Udah di-upgrade pake XP)
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    kategori: 'Desain / UI UX', 
    rank: 'B', 
    xp: '500',
    deadline: '' 
  });

  // 🔥 SISTEM OTOMATIS: Kunci Rank & XP sesuai Kategori 🔥
  useEffect(() => {
    const rate = SYSTEM_RATES[formData.kategori] || SYSTEM_RATES['Desain / UI UX'];
    setFormData(prev => ({ 
      ...prev, 
      xp: rate.xp.toString(), 
      rank: rate.rank 
    }));
  }, [formData.kategori]);

  // ================= FUNGSI TUTUP MODAL =================
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Deteksi klik di luar modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  // ================= FUNGSI SUBMIT TERBITKAN MISI =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('fictpact_token');
      // XP di-parse jadi angka biar database gak ngambek
      const dataToSubmit = { ...formData, xp: parseInt(formData.xp) };
      
      const res = await fetch('/api/quests', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }, 
        body: JSON.stringify(dataToSubmit) 
      });
      
      const dataDariServer = await res.json(); 
      
      if (res.ok) {
        closeModal(); 
        // Reset form setelah sukses
        setFormData({ 
          title: '', 
          description: '', 
          kategori: 'Desain / UI UX', 
          rank: 'B', 
          xp: '500',
          deadline: '' 
        }); 
        router.refresh(); 
      } else { 
        alert("GAGAL BROSKIE: " + dataDariServer.message); 
      }
    } catch (error) { 
      alert("Koneksi putus broskie! Cek terminal VS Code lu."); 
      console.error(error); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Card: Buat misi baru */}
      <div className="bg-[#11131A] border-1 border-gray-400 rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)} 
          className="w-full py-2 rounded-[7px] border-1 border-gray-400 text-base font-pixellari text-gray-300 transition-all shadow-[0_4px_0_0_#A8A8A8] hover:shadow-[0_2px_0_0_#A8A8A8] hover:translate-y-1 active:translate-y-2 active:shadow-none bg-transparent">
          + Buat Misi Baru
        </button>
      </div>

      {/* ================= MODAL BOUNTY BARU (UI EPIC) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          
          {/* Modal Container dengan Ref buat deteksi klik luar */}
          <div ref={modalRef} className="bg-[#0F1423] border border-gray-700 rounded-3xl w-full max-w-3xl p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-200">
            
            <button onClick={closeModal} className="absolute top-6 right-6 text-red-500 hover:text-red-400 font-bold text-2xl">X</button>
            <h2 className="text-center text-white font-bold text-2xl mb-8 tracking-widest font-pixel">Bounty baru</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* KIRI: Judul, Deskripsi, Kategori */}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-red-500">📌</span> Judul quest</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-[#F59E0B] outline-none transition-colors" placeholder="Masukkan judul..." />
                </div>
                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-gray-400">📄</span> Deskripsi detail</label>
                  <textarea name="description" required value={formData.description} onChange={handleChange} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm h-32 focus:border-[#F59E0B] outline-none transition-colors resize-none" placeholder="Jelaskan detail misinya..."></textarea>
                </div>
                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Pilih Kategori Pekerjaan</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(SYSTEM_RATES).map(kat => (
                      <button 
                        type="button" 
                        key={kat} 
                        onClick={() => setFormData({...formData, kategori: kat})} 
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${formData.kategori === kat ? 'bg-[#F59E0B] text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'border border-gray-600 text-gray-400 hover:border-[#F59E0B]'}`}
                      >
                        {kat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* KANAN: TAMPILAN LOCK SISTEM */}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-yellow-500">⚖️</span> Tarif & Peringkat (Diatur Sistem)</label>
                  <div className="bg-[#11131A] border border-gray-700 rounded-2xl p-6 relative overflow-hidden">
                    {/* Efek Garis Polisi biar kesannya di-lock */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#F59E0B]"></div>
                    
                    <p className="text-xs text-gray-400 mb-4 text-center">Berdasarkan kategori <strong className="text-white">{formData.kategori}</strong>, misi ini dikunci pada:</p>
                    
                    <div className="flex items-center justify-between bg-[#0A0A1A] rounded-xl p-4 border border-gray-800">
                      <div>
                        <div className="text-gray-500 text-[10px] mb-1 uppercase tracking-widest">Peringkat Misi</div>
                        <div className={`text-xl font-bold font-pixel ${SYSTEM_RATES[formData.kategori]?.color || 'text-white'}`}>
                          Rank - {formData.rank}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded text-xs font-bold ${SYSTEM_RATES[formData.kategori]?.bg || 'bg-gray-800'} ${SYSTEM_RATES[formData.kategori]?.color || 'text-white'}`}>
                        {SYSTEM_RATES[formData.kategori]?.label || 'Menengah'}
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                       <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Total Hadiah Siswa</p>
                       <h3 className="text-[#F59E0B] text-4xl font-bold tracking-wider font-pixel drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                         +{formData.xp} XP
                       </h3>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-gray-400">📅</span> Batas waktu berakhir</label>
                  <input type="date" name="deadline" required value={formData.deadline} onChange={handleChange} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-[#F59E0B] outline-none [color-scheme:dark]" />
                </div>
              </div>

              {/* TOMBOL SUBMIT */}
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                <button type="submit" disabled={isLoading} className="bg-[#F59E0B] hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Menancapkan...' : 'Tancapkan ke Papan Misi!'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </section>
  );
}