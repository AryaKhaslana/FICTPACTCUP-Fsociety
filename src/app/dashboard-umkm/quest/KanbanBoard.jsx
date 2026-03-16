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
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false); // <--- State Modal Rating
  
  const [selectedSubmission, setSelectedSubmission] = useState(null); 
  const [rejectMessage, setRejectMessage] = useState(''); 
  const [feedbackText, setFeedbackText] = useState(''); // <--- State Feedback
  const [rating, setRating] = useState(5); // <--- State Rating Bintang
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
      // AMBIL TOKEN DARI LOCAL STORAGE (Sesuai aslinya)
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
        setIsModalOpen(false); setFormData({ title: '', description: '', kategori: 'Desain / UI UX', xp: '1000', rank: 'A', deadline: '' }); router.refresh(); 
      } else { alert("GAGAL BROSKIE: " + dataDariServer.message); }
    } catch (error) { alert("Koneksi putus broskie! Cek terminal VS Code lu."); console.error(error); } finally { setIsLoading(false); }
  };
  
  // 🔥 ================= FUNGSI ACTION REVIEW (BARU) ================= 🔥
  const handleReviewAction = async (submissionId, action, messageParam, ratingValue = null) => {
    setIsSubmitting(true);
    try {
      // Bikin payload dewa (messageParam bisa jadi rejectMessage ATAU feedback)
      const payload = {
        submissionId,
        rejectMessage: action === 'reject' ? messageParam : '',
        feedback: action === 'approve' ? messageParam : '', 
        rating: ratingValue
      };

      const res = await fetch(`/api/submissions/${action}`, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(payload) 
      });

      const responseData = await res.json();

      if (res.ok) {
        setIsReviewModalOpen(false); 
        setIsRatingModalOpen(false); // Tutup modal rating
        setSelectedSubmission(null); 
        setRejectMessage(''); 
        setFeedbackText('');
        setRating(5);
        router.refresh();
        alert(responseData.message || "Berhasil ACC Misi!"); 
      } else { 
        alert(`Gagal nge-review bos! Pesan: ${responseData.message}`); 
      }
    } catch (error) { 
      alert("Koneksi meledak broskie!"); 
      console.error(error);
    } finally { setIsSubmitting(false); }
  };

  const openReviewModal = (submission) => {
    setSelectedSubmission(submission);
    setIsReviewModalOpen(true);
  };

  // 🔥 FUNGSI PINDAH MODAL (DARI REVIEW KE RATING)
  const goToRatingModal = () => {
    setIsReviewModalOpen(false); 
    setIsRatingModalOpen(true);  
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
      
      {/* Header & Tombol Tambah (100% BALIK KE VERSI ASLI LU) */}
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

      {/* ================= MODAL BOUNTY BARU (100% BALIK KE VERSI ASLI LU) ================= */}
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

      {/* 🔥 ================= MODAL BOUNTY REVIEW (UBAH TOMBOL ACC) ================= 🔥 */}
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
               {/* 🔥 TOMBOL ACC SEKARANG BUKA MODAL RATING 🔥 */}
               <button onClick={goToRatingModal} className={`w-full py-4 rounded-xl text-black font-bold tracking-widest transition-all transform active:scale-95 shadow-[0_5px_0_rgb(180,120,0)] uppercase bg-[#F59E0B] hover:bg-yellow-600`}>
                Acc
               </button>
             </div>

          </div>
        </div>
      )}

      {/* 🔥 MODAL 2: BERI PENILAIAN & FEEDBACK (Desain Baru Figma) 🔥 */}
      {isRatingModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#11131A] border border-gray-800 rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl">
            
            <h2 className="text-center text-white font-bold text-xl mb-8 tracking-wide">Beri Penilaian Pahlawan</h2>

            {/* User Info Card Ala Figma */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-800 shrink-0 border-2 border-gray-700">
                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${selectedSubmission.student?.username}&backgroundColor=transparent`} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-white font-bold text-lg leading-tight">{selectedSubmission.student?.username || 'Pahlawan'}</h3>
                <p className="text-gray-400 text-xs">Level {selectedSubmission.student?.studentProgress?.[0]?.level || '??'}</p>
              </div>
              <div className="w-[1px] h-10 bg-gray-700 mx-2"></div>
              <p className="text-[10px] text-gray-400 leading-relaxed flex-1 italic">
                Bagaimana hasil kerja dari pahlawan {selectedSubmission.student?.username}?
              </p>
            </div>

            {/* Bintang Rating Raksasa */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <button 
                  key={s} 
                  onClick={() => setRating(s)} 
                  className={`text-5xl transition-all transform active:scale-75 hover:scale-110 ${rating >= s ? 'grayscale-0 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'grayscale opacity-20'}`}
                >
                  ⭐
                </button>
              ))}
            </div>

            {/* Textarea Cerita Singkat */}
            <div className="mb-8">
              <textarea 
                value={feedbackText} 
                onChange={e => setFeedbackText(e.target.value)} 
                rows={3} 
                className="w-full bg-[#0A0A1A] border border-gray-700 rounded-xl p-4 text-white text-sm focus:border-[#F59E0B] outline-none resize-none" 
                placeholder="Cerita singkat siswa ini..."
              ></textarea>
            </div>

            {/* Tombol Action */}
            <div className="flex gap-4">
              <button 
                onClick={() => setIsRatingModalOpen(false)} 
                disabled={isSubmitting} 
                className="flex-1 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 font-bold rounded-xl transition-all disabled:opacity-50 text-sm"
              >
                Nanti saja
              </button>
              <button 
                onClick={() => handleReviewAction(selectedSubmission.id, 'approve', feedbackText, rating)} 
                disabled={isSubmitting} 
                className="flex-1 py-3 bg-[#F59E0B] hover:bg-yellow-600 text-black font-bold rounded-xl shadow-[0_4px_0_rgb(180,120,0)] transition-all transform active:translate-y-1 active:shadow-none disabled:opacity-50 text-sm"
              >
                {isSubmitting ? 'Memproses...' : 'Kirim & Cairkan XP'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}