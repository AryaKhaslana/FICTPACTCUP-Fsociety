import React from 'react';
import { Award } from 'lucide-react';

export default function AchievementBox() {
  return (
    <div className="bg-[#11131A] rounded-3xl border border-gray-800 p-8 shadow-lg">
      <h3 className="text-[#F59E0B] font-bold text-lg mb-6 flex items-center gap-2">
        <Award size={20} /> Achievement
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Badge 1 */}
        <div className="flex flex-col items-center text-center gap-3">
          <h4 className="font-bold text-white text-sm">Web Wizard</h4>
          <div className="w-20 h-20 rounded-full bg-[#0F172A] border-4 border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <img src="https://api.dicebear.com/7.x/shapes/svg?seed=wizard&backgroundColor=transparent" alt="badge" className="w-12 h-12" />
          </div>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Arsitek mahakarya digital. Tidak ada bug tampilan yang tidak bisa kamu basmi!
          </p>
        </div>

        {/* Badge 2 */}
        <div className="flex flex-col items-center text-center gap-3">
          <h4 className="font-bold text-white text-sm">Sepuh design</h4>
          <div className="w-20 h-20 rounded-full bg-[#0F172A] border-4 border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <img src="https://api.dicebear.com/7.x/shapes/svg?seed=design&backgroundColor=transparent" alt="badge" className="w-12 h-12" />
          </div>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Sudah sepuh, tidak ada design yang tidak bisa!
          </p>
        </div>
      </div>
    </div>
  );
}