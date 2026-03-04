import HeroSection from '@/components/LandingPage/HeroSection';
import FeatureSection from '@/components/LandingPage/FeatureSection';
import SuccessStory from '@/components/LandingPage/SuccessStory';
import HowItWorks from '@/components/LandingPage/HowItWorks';
import CtaSection from '@/components/LandingPage/CtaSection';
import Footer from '@/components/Layout/Footer';

export default function Home() {
  return (
    <main className="bg-[#1E1E1E] min-h-screen">
      <HeroSection />
      <FeatureSection />
      <SuccessStory />
      <HowItWorks />
      <CtaSection />
      <Footer />
    </main>
  );
}