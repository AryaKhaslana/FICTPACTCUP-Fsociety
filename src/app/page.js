import HeroSection from '@/components/LandingPage/HeroSection';
import FeatureSection from '@/components/LandingPage/FeatureSection';
import SuccessStory from '@/components/LandingPage/SuccessStory';
import HowItWorks from '@/components/LandingPage/HowItWorks';
import CtaSection from '@/components/LandingPage/CtaSection';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1E1E1E]">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <SuccessStory />
      <HowItWorks />
      <CtaSection />
    </main>
  );
}