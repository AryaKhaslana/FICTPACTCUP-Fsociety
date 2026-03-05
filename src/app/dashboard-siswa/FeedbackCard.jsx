import React from 'react';
import { Star, MessageSquareDashed } from 'lucide-react';

export default function FeedbackCard({ isEmpty = false }) {
  return (
    <div className="bg-[#060916] rounded-3xl p-6 border border-gray-800 w-full flex flex-col gap-4 shadow-lg h-full">
      <h3 className="text-lg font-bold text-white mb-2">Feedback terbaru</h3>

      {isEmpty ? (
        // TAMPILAN KOSONG
        <div className="flex flex-col items-center justify-center h-full text-center gap-2 py-8">
          <MessageSquareDashed size={40} className="text-gray-600" />
          <p className="text-sm text-gray-500 font-medium">Belum ada feedback.<br/>Selesaikan quest pertamamu!</p>
        </div>
      ) : (
        // TAMPILAN ADA ISINYA (SESUAI FIGMA)
        <div className="flex flex-col gap-4">
          
          {/* Item Feedback 1 */}
          <div className="p-4 rounded-xl border border-gray-800 bg-[#1A1D24] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-orange-500 font-bold text-xs">UM</span>
              </div>
              <p className="text-xs text-gray-400">Quest: <span className="text-white font-semibold">Design Logo</span></p>
            </div>
            <p className="text-[11px] text-gray-300 italic">
              "Konsepnya kuat, hanya perlu perbaikan di tipografi."
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Star size={12} fill="#F59E0B" className="text-yellow-500" />
              <span className="text-xs text-yellow-500 font-bold">4.4</span>
              <span className="text-[10px] text-gray-500">• 2 hari lalu</span>
            </div>
          </div>

          {/* Item Feedback 2 */}
          <div className="p-4 rounded-xl border border-gray-800 bg-[#1A1D24] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-orange-500 font-bold text-xs">UM</span>
              </div>
              <p className="text-xs text-gray-400">Quest: <span className="text-white font-semibold">Design Logo</span></p>
            </div>
            <p className="text-[11px] text-gray-300 italic">
              "Perlu ditingkatkan untuk maskotnya, tidak ada konsep"
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Star size={12} fill="#F59E0B" className="text-yellow-500" />
              <span className="text-xs text-yellow-500 font-bold">2.7</span>
              <span className="text-[10px] text-gray-500">• 5 hari lalu</span>
            </div>
          </div>

          {/* Tombol Lihat Lainnya */}
          <button className="w-full py-2.5 mt-2 rounded-xl border border-gray-700 text-xs font-bold text-gray-300 hover:bg-gray-800 transition-all">
            Lihat lainnya
          </button>
        </div>
      )}
    </div>
  );
}