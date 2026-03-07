import React from 'react';
// Pastikan path ke AuthNav ini bener ya broskie!
import AuthNav from '../components/Navbar/AuthNav'; 

import ProfileHeader from './ProfileHeader';
import AchievementBox from './AchievementBox';
import PortfolioGallery from './PortfolioGallery';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#000010] text-white font-poppins pb-24">
      <AuthNav />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-8 relative z-10">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <AchievementBox />
          <PortfolioGallery />
        </div>
      </main>
    </div>
  );
}