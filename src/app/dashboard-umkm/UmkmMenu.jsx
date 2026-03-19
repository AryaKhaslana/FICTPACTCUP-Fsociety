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
  
  // State buat nampung isian form (XP dihilangkan)
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    kategori: 'Web Dev', 
    rank: 'A', 
    deadline: '' 
  });

  // ================= FUNGSI TUTUP MODAL =================
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Deteksi klik di luar modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Kalau modal kebuka, dan yang diklik BUKAN bagian dalam kotak modal (modalRef)
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Pasang event listener
    document.addEventListener("mousedown", handleOutsideClick);
    
    // Bersihin event listener pas komponen unmount atau modal ketutup
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  // ================= FUNGSI SUBMIT TERBITKAN MISI =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Ambil token dari local storage (sesuai aslinya)
      const token = localStorage.getItem('fictpact_token');
      
      const res = await fetch('/api/quests', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }, 
        body: JSON.stringify(formData) 
      });
      
      const dataDariServer = await res.json(); 
      
      if (res.ok) {
        closeModal(); 
        // Reset form setelah sukses (Kategori balikin ke default)
        setFormData({ 
          title: '', 
          description: '', 
          kategori: 'Web Dev', 
          rank: 'A', 
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

  // Fungsi buat update state saat user ngetik di form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Card: Buat misi baru */}
      <div className="bg-[#11131A] border-1 border-gray-400 rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
          Misi UMKM
        </p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)} // Buka modal saat diklik
          className="w-full py-2 rounded-[7px] border-1 border-gray-400 text-base font-pixellari text-gray-300 transition-all shadow-[0_4px_0_0_#A8A8A8] hover:shadow-[0_2px_0_0_#A8A8A8] hover:translate-y-1 active:translate-y-2 active:shadow-none bg-transparent"
        >
          + Buat Misi Baru
        </button>
      </div>

      {/* ================= MODAL BUAT MISI BARU ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          {/* Tambahin ref di div kotak modal ini biar bisa dideteksi klik luarnya */}
          <div ref={modalRef} className="bg-[#11131A] border border-gray-600 rounded-xl w-full max-w-md p-6 shadow-2xl relative">
            
            {/* Tombol X (Close) di pojok kanan atas */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Tutup modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="text-xl font-bold text-[#F59E0B] mb-4 pr-8">Buat Misi Baru</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Input Judul */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Judul Misi</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required
                  className="w-full bg-[#1A1D26] border border-gray-600 rounded-md p-2 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  placeholder="Contoh: Bikin Logo Nasgor"
                />
              </div>

              {/* Input Deskripsi */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Deskripsi</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  required
                  rows="3"
                  className="w-full bg-[#1A1D26] border border-gray-600 rounded-md p-2 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                  placeholder="Jelaskan detail misinya di sini..."
                />
              </div>

              {/* Input Kategori & Deadline disejajarkan */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Kategori</label>
                  <select 
                    name="kategori" 
                    value={formData.kategori} 
                    onChange={handleChange}
                    className="w-full bg-[#1A1D26] border border-gray-600 rounded-md p-2 text-sm text-white focus:outline-none focus:border-[#F59E0B] appearance-none"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Desain UI/UX">Desain UI/UX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Deadline</label>
                  <input 
                    type="date" 
                    name="deadline" 
                    value={formData.deadline} 
                    onChange={handleChange} 
                    required
                    className="w-full bg-[#1A1D26] border border-gray-600 rounded-md p-2 text-sm text-white color-scheme-dark focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              {/* Tombol Action Modal */}
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md text-sm font-bold text-gray-400 hover:text-white"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-[#FFB800] hover:bg-[#E6A600] text-black text-sm font-bold py-2 px-6 rounded-md transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Terbitkan Misi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}