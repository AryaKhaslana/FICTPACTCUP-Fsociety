"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KanbanBoard({ quests = [] }) {
  const router = useRouter();
  
  // ================= STATE MODAL TERBITKAN (LAMA) =================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', kategori: 'Desain / UI UX', xp: '1000', rank: 'A', deadline: ''
  });

  // 🔥 ================= STATE MODAL REVIEW (BARU) ================= 🔥
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null); 
  const [rejectMessage, setRejectMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // 🔥 LOGIKA DEWA BUAT MISAHIN KOLOM KANBAN BOARD 🔥
  const papanTerbuka = [];
  const medanPerang = [];
  const butuhAcc = [];
  const arsipKemenangan = [];

  quests.forEach((quest) => {
    const sub = quest.submissions && quest.submissions.length > 0 ? quest.submissions[0] : null;

    if (!sub) {
      papanTerbuka.push(quest);
    } else {
      if (sub.status === 'PENDING' && (!sub.fileUrl || sub.fileUrl === '')) {
        medanPerang.push(quest);
      } else if (sub.status === 'PENDING' && sub.fileUrl && sub.fileUrl !== '') {
        butuhAcc.push(quest);
      } else if (sub.status === 'REJECTED') {
        medanPerang.push(quest);
      } else if (sub.status === 'APPROVED' || sub.status === 'COMPLETED') {
        arsipKemenangan.push(quest);
      } else {
        papanTerbuka.push(quest); 
      }
    }
  });

  // ================= FUNGSI SUBMIT TERBITKAN MISI (LAMA) =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/quests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const dataDariServer = await res.json(); 
      if (res.ok) {
        setIsModalOpen(false); setFormData({ title: '', description: '', kategori: 'Desain / UI UX', xp: '1000', rank: 'A', deadline: '' }); router.refresh(); 
      } else { alert("GAGAL BROSKIE: " + dataDariServer.message); }
    } catch (error) { alert("Koneksi putus broskie! Cek terminal VS Code lu."); console.error(error); } finally { setIsLoading(false); }
  };
  
  // 🔥 ================= FUNGSI ACTION REVIEW (BARU) ================= 🔥
  const handleReviewAction = async (submissionId, action, message) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/submissions/${action}`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ submissionId, rejectMessage: message }) 
      });
      if (res.ok) {
        setIsReviewModalOpen(false); setSelectedSubmission(null); setRejectMessage(''); router.refresh();
      } else { alert("Gagal nge-review bos!"); }
    } catch (error) { alert("Koneksi meledak broskie!"); } finally { setIsSubmitting(false); }
  };

  const openReviewModal = (submission) => {
    setSelectedSubmission(submission);
    setIsReviewModalOpen(true);
  };

  // 🔥 ================= KOMPONEN KARTU KANBAN ================= 🔥
  const QuestCard = ({ quest }) => {
    const sub = quest.submissions && quest.submissions.length > 0 ? quest.submissions[0] : null;
    const workerName = sub?.student?.username || null;
    const showReviewButton = sub?.status === 'PENDING' && sub.fileUrl && sub.fileUrl !== '';

    return (
      <div className="bg-[#11131A] border border-gray-700 rounded-xl p-4 mb-3 shadow-lg flex flex-col relative">
        <div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#3A1117] text-[#FF4D5A] border border-[#FF4D5A]/30">Rank - {quest.rank || 'A'}</span>
            <span className="text-[#F59E0B] text-xs font-bold">+{quest.rewardXp || quest.xpReward || 1000} XP</span>
          </div>
          <h4 className="text-white font-bold text-sm mb-1">{quest.title}</h4>
          <p className="text-gray-400 text-[10px] line-clamp-2 mb-2">{quest.description}</p>
          {workerName && (
            <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] text-gray-400 flex items-center gap-1">
              <span>👤</span> Dikerjakan oleh: <span className="font-bold text-[#F59E0B]">{workerName}</span>
            </div>
          )}
        </div>
        
        {/* Tombol Pantau Misi */}
        {showReviewButton && (
          <div className="mt-4 flex justify-end">
            <button onClick={() => openReviewModal(sub)} className="px-4 py-2 border-2 border-[#F59E0B]/30 text-[#F59E0B] rounded-lg text-xs font-bold hover:border-[#F59E0B] hover:bg-[#F59E0B] hover:text-black transition-all transform active:scale-95 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              Pantau
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="w-full relative">
      
      {/* Header & Tombol Tambah */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-64">
          <input type="text" placeholder="Cari misi..." className="w-full bg-[#11131A] border border-gray-700 rounded-full py-2 px-4 pl-10 text-sm text-white focus:outline-none focus:border-[#F59E0B]" />
          <span className="absolute left-4 top-2.5 text-gray-400">🔍</span>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="text-[#F59E0B] font-bold flex items-center gap-2 hover:text-white transition-colors">
          <span className="text-xl">+</span> Terbitkan Misi Baru
        </button>
      </div>

      {/* Grid 4 Kolom Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Kolom Papan Terbuka */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Papan <br/>terbuka</h3>
          <div className="flex-1 overflow-y-auto pr-1"> {papanTerbuka.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : papanTerbuka.map(q => <QuestCard key={q.id} quest={q} />)} </div>
        </div>
        {/* Kolom Medan Perang */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Medan <br/>Perang</h3>
          <div className="flex-1 overflow-y-auto pr-1"> {medanPerang.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : medanPerang.map(q => <QuestCard key={q.id} quest={q} />)} </div>
        </div>
        {/* Kolom Butuh Acc */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Butuh <br/>Acc</h3>
          <div className="flex-1 overflow-y-auto pr-1"> {butuhAcc.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : butuhAcc.map(q => <QuestCard key={q.id} quest={q} />)} </div>
        </div>
        {/* Kolom Arsip Kemenangan */}
        <div className="bg-[#0F1423] rounded-2xl p-4 border border-gray-800 min-h-[500px] flex flex-col">
          <h3 className="text-white font-bold text-center mb-4 text-lg">Arsip <br/>Kemenangan</h3>
          <div className="flex-1 overflow-y-auto pr-1"> {arsipKemenangan.length === 0 ? <div className="text-center text-gray-600 text-xs mt-10">Belum ada misi</div> : arsipKemenangan.map(q => <QuestCard key={q.id} quest={q} />)} </div>
        </div>
      </div>

      {/* ================= MODAL BOUNTY BARU (LAMA) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#0F1423] border border-gray-700 rounded-3xl w-full max-w-3xl p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-red-500 hover:text-red-400 font-bold text-2xl">X</button>
            <h2 className="text-center text-white font-bold text-2xl mb-8 tracking-widest font-pixel">Bounty baru</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* KIRI: Judul, Deskripsi, Kategori */}
              <div className="flex flex-col gap-5">
                <div><label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-red-500">📌</span> Judul quest</label><input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-[#F59E0B] outline-none" placeholder="Masukkan judul..." /></div>
                <div><label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-gray-400">📄</span> Deskripsi detail</label><textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm h-32 focus:border-[#F59E0B] outline-none" placeholder="Jelaskan detail misinya..."></textarea></div>
                <div><label className="text-white text-sm font-bold mb-2 block">Kategori</label><div className="flex gap-2">{['Desain / UI UX', 'Video Editing', 'Web Dev'].map(kat => (<button type="button" key={kat} onClick={() => setFormData({...formData, kategori: kat})} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${formData.kategori === kat ? 'bg-[#F59E0B] text-black' : 'border border-gray-600 text-gray-400 hover:border-[#F59E0B]'}`}>{kat}</button>))}</div></div>
              </div>
              {/* KANAN: Hadiah XP & Deadline */}
              <div className="flex flex-col gap-5">
                <div><label className="text-white text-sm font-bold flex items-center gap-2 mb-4"><span className="text-yellow-500">⚔️</span> Hadiah XP</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div onClick={() => setFormData({...formData, xp: '200', rank: 'C'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'C' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}><div className="bg-[#1A2F25] text-[#3BD47F] font-bold text-sm py-1 rounded mb-2">+ 200 XP</div><div className="text-white text-sm font-bold">Rank - C</div><div className="text-gray-500 text-[10px]">(Mudah)</div></div>
                    <div onClick={() => setFormData({...formData, xp: '500', rank: 'B'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'B' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}><div className="bg-[#1D2A43] text-[#3B82F6] font-bold text-sm py-1 rounded mb-2">+ 500 XP</div><div className="text-white text-sm font-bold">Rank - B</div><div className="text-gray-500 text-[10px]">(Menengah)</div></div>
                    <div onClick={() => setFormData({...formData, xp: '1000', rank: 'A'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'A' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}><div className="bg-[#301636] text-[#D946EF] font-bold text-sm py-1 rounded mb-2">+ 1000 XP</div><div className="text-white text-sm font-bold">Rank - A</div><div className="text-gray-500 text-[10px]">(Sulit)</div></div>
                    <div onClick={() => setFormData({...formData, xp: '2000', rank: 'S'})} className={`cursor-pointer border rounded-xl p-3 text-center transition-all ${formData.rank === 'S' ? 'border-[#F59E0B] bg-[#11131A]' : 'border-gray-700 hover:border-gray-500'}`}><div className="bg-[#332414] text-[#F59E0B] font-bold text-sm py-1 rounded mb-2">+ 2000 XP</div><div className="text-white text-sm font-bold">Rank - S</div><div className="text-gray-500 text-[10px]">(Epic)</div></div>
                  </div>
                </div>
                <div><label className="text-white text-sm font-bold flex items-center gap-2 mb-2"><span className="text-gray-400">📅</span> Batas waktu berakhir</label><input type="date" required value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full bg-[#11131A] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-[#F59E0B] outline-none [color-scheme:dark]" /></div>
              </div>
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center"><button type="submit" disabled={isLoading} className="bg-[#F59E0B] hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Menancapkan...' : 'Tancapkan ke Papan Misi!'}</button></div>
            </form>
          </div>
        </div>
      )}

      {/* 🔥 ================= MODAL BOUNTY REVIEW (BARU) ================= 🔥 */}
      {isReviewModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0A0A1A] border-2 border-[#F59E0B] rounded-3xl w-full max-w-4xl p-8 relative shadow-[0_0_50px_rgba(245,158,11,0.3)]">
             
             <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-6 right-8 text-white hover:text-red-500 font-bold text-2xl">X</button>

             <div className="flex justify-between items-center mb-10 mt-2 pr-10">
               <h1 className="text-4xl font-bold tracking-widest font-pixel uppercase">Bounty review</h1>
               <span className="text-orange-500 font-pixel text-4xl"> Rank - {quests.find(q => q.id === selectedSubmission.questId)?.rank || 'A'}</span>
             </div>

             <div className="flex flex-col md:flex-row gap-8">
               <div className="bg-[#11131A] border border-gray-800 rounded-2xl p-6 flex-1">
                 <h3 className="text-[#F59E0B] font-bold mb-4 flex items-center gap-2">📜 Syarat & Ketentuan (Requirements) :</h3>
                 <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-3"><span>•</span> Skill yang Dibutuhkan: Sesuai kategori misi.</li>
                    <li className="flex gap-3"><span>•</span> Batas Waktu (Deadline): 3 Hari setelah misi diambil.</li>
                    <li className="flex gap-3"><span>•</span> Format Pengumpulan: Link Google Drive (Kualitas tinggi).</li>
                 </ul>
               </div>
               
               <div className="bg-[#11131A] border border-gray-800 rounded-2xl p-6 flex-1">
                 <h3 className="text-[#F59E0B] font-bold mb-4 flex items-center gap-2">⚔️ Misi Pahlawan (Dari {selectedSubmission.student?.username || 'Pahlawan'}) :</h3>
                 <p className="text-xs md:text-sm text-white/80 leading-relaxed italic mb-6">"{selectedSubmission.pesanUMKM || 'Tidak ada pesan dari pahlawan.'}"</p>
                 <a href={selectedSubmission.fileUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1A1D26] border border-gray-700 rounded-xl p-4 flex items-center gap-4 hover:border-[#F59E0B] transition-all transform active:scale-95 shadow-lg w-max">
                   <div className="w-12 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-red-500">📎</div>
                   <div className="flex-1 pr-4">
                     <h4 className="font-bold text-sm text-white">{quests.find(q => q.id === selectedSubmission.questId)?.title || 'File Hasil Pahlawan'}</h4>
                     <p className="text-[10px] text-gray-400">Klik untuk melihat file</p>
                   </div>
                 </a>
               </div>
             </div>

             <div className="mt-10 mb-8 max-w-lg mx-auto">
               <textarea required value={rejectMessage} onChange={e => setRejectMessage(e.target.value)} rows={3} className="w-full bg-[#11131A] border border-gray-700 rounded-xl p-4 text-white text-sm focus:border-[#F59E0B] outline-none" placeholder="Tuliskan alasan revisi bos... (wajib isi jika mau nolak)"></textarea>
             </div>

             <div className="flex flex-col gap-4 max-w-sm mx-auto">
               <button onClick={() => handleReviewAction(selectedSubmission.id, 'reject', rejectMessage)} disabled={isSubmitting || !rejectMessage} className={`w-full py-4 rounded-xl text-white font-bold tracking-widest transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase ${isSubmitting ? 'bg-gray-600' : 'bg-[#E11D48] hover:bg-red-700'}`}>
                {isSubmitting ? 'MEREVISI...' : 'Revisi'}
               </button>
               <button onClick={() => handleReviewAction(selectedSubmission.id, 'approve', '')} disabled={isSubmitting} className={`w-full py-4 rounded-xl text-black font-bold tracking-widest transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_5px_0_rgb(180,120,0)] uppercase ${isSubmitting ? 'bg-gray-600' : 'bg-[#F59E0B] hover:bg-yellow-600'}`}>
                {isSubmitting ? 'MENG-ACC...' : 'Acc'}
               </button>
             </div>

          </div>
        </div>
      )}

    </section>
  );
}