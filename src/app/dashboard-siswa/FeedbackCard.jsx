import React from 'react';
import { Star, MessageSquareDashed } from 'lucide-react';

export default function FeedbackCard({ isEmpty = false, feedbackData = [] }) {
  // Kalau props isEmpty true, atau data dari database kosong, anggap kosong.
  const isCardEmpty = isEmpty || !feedbackData || feedbackData.length === 0;

  return (
    <div className="bg-[#060916] rounded-3xl w-full flex flex-col gap-4 shadow-lg h-full">
      <h3 className="text-lg font-bold text-white mb-2">Feedback terbaru</h3>

      {isCardEmpty ? (
        // TAMPILAN KOSONG
        <div className="flex flex-col items-center justify-center h-full text-center gap-2 py-8">
          <MessageSquareDashed size={40} className="text-gray-600" />
          <p className="text-sm text-gray-500 font-medium">Belum ada feedback dari UMKM.<br/>Selesaikan quest pertamamu!</p>
        </div>
      ) : (
        // TAMPILAN ADA ISINYA (Data Dinamis dari Database)
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          
          {feedbackData.map((item, index) => (
            <div key={item.id || index} className="p-4 rounded-xl border border-gray-800 bg-[#1A1D24] flex flex-col gap-2 hover:border-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <span className="text-orange-500 font-bold text-xs">UM</span>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  Quest: <span className="text-white font-semibold">{item.quest?.title || 'Misi UMKM'}</span>
                </p>
              </div>
              
              <p className="text-[11px] text-gray-300 italic line-clamp-2">
                "{item.umkmReview || 'Kerja bagus, pahlawan!'}"
              </p>
              
              <div className="flex items-center gap-2 mt-1">
                <Star size={12} fill="#F59E0B" className="text-yellow-500" />
                <span className="text-xs text-yellow-500 font-bold">
                  {item.rating ? item.rating.toFixed(1) : '5.0'}
                </span>
                <span className="text-[10px] text-gray-500">• Baru saja</span>
              </div>
            </div>
          ))}

          {/* Tombol Lihat Lainnya (Desain Asli Lu) */}
          {feedbackData.length > 0 && (
            <button className="w-full py-2.5 mt-2 rounded-xl border-1 border-gray-400 text-xs font-bold text-gray-300 transition-all shadow-[0_4px_0_0_#A8A8A8] hover:shadow-[0_2px_0_0_#A8A8A8] hover:translate-y-1 active:translate-y-2 active:shadow-none">
              Lihat lainnya
            </button>
          )}

        </div>
      )}
    </div>
  );
}