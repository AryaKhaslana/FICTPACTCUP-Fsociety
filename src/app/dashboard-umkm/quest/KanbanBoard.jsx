"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KanbanBoard({ quests = [] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State buat nyimpen isian form
  const [formData, setFormData] = useState({
    title: '', description: '', kategori: 'Desain / UI UX',
    xp: '1000', rank: 'A', deadline: ''
  });

  // Pisahin Quest ke 4 Kolom berdasarkan statusnya (Sesuaiin sama isi DB lu)
  const papanTerbuka = quests.filter(q => q.status === 'OPEN' || !q.status);
  const medanPerang = quests.filter(q => q.status === 'IN_PROGRESS');
  const butuhAcc = quests.filter(q => q.status === 'REVIEW' || q.status === 'REVISI');
  const arsipKemenangan = quests.filter(q => q.status === 'COMPLETED' || q.status === 'DONE');

  // Fungsi Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      // 👇 Manggil jawaban dari server dan disimpen di variabel ini
      const dataDariServer = await res.json(); 

      if (res.ok) {
        setIsModalOpen(false); 
        setFormData({ title: '', description: '', kategori: 'Desain / UI UX', xp: '1000', rank: 'A', deadline: '' });
        router.refresh(); 
      } else {
        // 👇 Kalau gagal, tampilin pesan error dari servernya ke Pop-up Alert
        alert("GAGAL BROSKIE: " + dataDariServer.message);
      }
    } catch (error) {
      alert("Koneksi putus broskie! Cek terminal VS Code lu.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Komponen Kecil buat Kartu Quest di dalem Kanban
  const QuestCard = ({ quest }) => (
    <div className="bg-[#11131A] border border-gray-700 rounded-xl p-4 mb-3 shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#3A1117] text-[#FF4D5A] border border-[#FF4D5A]/30">
          Rank - {quest.rank || 'A'}
        </span>
        <span className="text-[#F59E0B] text-xs font-bold">+{quest.xpReward || 1000} XP</span>
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{quest.title}</h4>
      <p className="text-gray-400 text-[10px] line-clamp-2">{quest.description}</p>
    </div>
  );

  return (
    <section className="w-full relative">
      {/* Header & Tombol Tambah */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-64">
          <input type="text" placeholder="Cari misi..." className="w-full bg-[#11131A] border border-gray-700 rounded-full py-2 px-4 pl-10 text-sm text-white focus:outline-none focus:border-[#F59E0B]" />
          <span className="absolute left-4 top-2.5 text-gray-400">🔍</span>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-[#F59E0B] font-bold flex items-center gap-2 hover:text-white transition-colors"
        >
          <span className="text-xl">+</span> Terbitkan Misi Baru
        </button>
      </div>

      {/* Grid 4 Kolom Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Kolom 1: Papan Terbuka */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Papan <br/>terbuka</h3>
          <div className="flex-1 overflow-y-auto pr-1">
            {papanTerbuka.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : papanTerbuka.map(q => <QuestCard key={q.id} quest={q} />)}
          </div>
        </div>

        {/* Kolom 2: Medan Perang */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Medan <br/>Perang</h3>
          <div className="flex-1 overflow-y-auto pr-1">
            {medanPerang.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : medanPerang.map(q => <QuestCard key={q.id} quest={q} />)}
          </div>
        </div>

        {/* Kolom 3: Butuh Acc */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Butuh <br/>Acc</h3>
          <div className="flex-1 overflow-y-auto pr-1">
            {butuhAcc.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : butuhAcc.map(q => <QuestCard key={q.id} quest={q} />)}
          </div>
        </div>

        {/* Kolom 4: Arsip Kemenangan */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Arsip <br/>Kemenangan</h3>
          <div className="flex-1 overflow-y-auto pr-1">
            {arsipKemenangan.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : arsipKemenangan.map(q => <QuestCard key={q.id} quest={q} />)}
          </div>
        </div>
      </div>

      {/* ================= MODAL BOUNTY BARU ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0F1423] border border-gray-700 rounded-3xl w-full max-w-3xl p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Tombol Close */}
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-red-500 hover:text-red-400 font-bold text-2xl">
              X
            </button>
            
            <h2 className="text-center text-white font-bold text-2xl mb-8 tracking-widest font-pixel">Bounty baru</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* KIRI: Judul, Deskripsi, Kategori */}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-red-500">📌</span> Judul quest</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-[#F59E0B] outline-none" placeholder="Masukkan judul..." />
                </div>
                
                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-gray-400">📄</span> Deskripsi detail</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm h-32 focus:border-[#F59E0B] outline-none" placeholder="Jelaskan detail misinya..."></textarea>
                </div>

                <div>
                  <label className="text-white text-sm font-bold mb-2 block">Kategori</label>
                  <div className="flex gap-2">
                    {['Desain / UI UX', 'Video Editing', 'Web Dev'].map(kat => (
                      <button type="button" key={kat} onClick={() => setFormData({...formData, kategori: kat})} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${formData.kategori === kat ? 'bg-[#F59E0B] text-black' : 'border border-gray-600 text-gray-400 hover:border-[#F59E0B]'}`}>
                        {kat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* KANAN: Hadiah XP & Deadline */}
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-4"><span className="text-yellow-500">⚔️</span> Hadiah XP</label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Kartu Rank C */}
                    <div onClick={() => setFormData({...formData, xp: '200', rank: 'C'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'C' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}>
                      <div className="bg-[#1A2F25] text-[#3BD47F] font-bold text-sm py-1 rounded mb-2">+ 200 XP</div>
                      <div className="text-white text-sm font-bold">Rank - C</div><div className="text-gray-500 text-[10px]">(Mudah)</div>
                    </div>
                    {/* Kartu Rank B */}
                    <div onClick={() => setFormData({...formData, xp: '500', rank: 'B'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'B' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}>
                      <div className="bg-[#1D2A43] text-[#3B82F6] font-bold text-sm py-1 rounded mb-2">+ 500 XP</div>
                      <div className="text-white text-sm font-bold">Rank - B</div><div className="text-gray-500 text-[10px]">(Menengah)</div>
                    </div>
                    {/* Kartu Rank A */}
                    <div onClick={() => setFormData({...formData, xp: '1000', rank: 'A'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'A' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}>
                      <div className="bg-[#301636] text-[#D946EF] font-bold text-sm py-1 rounded mb-2">+ 1000 XP</div>
                      <div className="text-white text-sm font-bold">Rank - A</div><div className="text-gray-500 text-[10px]">(Sulit)</div>
                    </div>
                    {/* Kartu Rank S */}
                    <div onClick={() => setFormData({...formData, xp: '2000', rank: 'S'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'S' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}>
                      <div className="bg-[#332414] text-[#F59E0B] font-bold text-sm py-1 rounded mb-2">+ 2000 XP</div>
                      <div className="text-white text-sm font-bold">Rank - S</div><div className="text-gray-500 text-[10px]">(Epic)</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-gray-400">📅</span> Batas waktu berakhir</label>
                  <input type="date" required value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-[#F59E0B] outline-none [color-scheme:dark]" />
                </div>
              </div>

              {/* Tombol Submit Full Width */}
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