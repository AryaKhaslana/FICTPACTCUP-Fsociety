import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import SuccessStory from './SuccessStory';
import HowItWorks from './HowItWorks';
import CtaSection from './CtaSection';
import Footer from '../Navbar/footer';
import FeatureShowcase from './FeatureShowcase';

export default function LandingPage() {
  return (
    <main className="bg-[#1E1E1E] min-h-screen">
      
      {/* 1. HERO SECTION (Paling Atas) */}
      {/* Gak perlu scroll-mt karena ini udah paling atas */}
      <div id="home">
        <HeroSection />
      </div>

      {/* 2. FITUR SECTION */}
      {/* Kasih id="quest" atau id="fitur" sesuaikan sama href navbar lu */}
      <div id="quest" className="scroll-mt-24">
        <FeatureSection />
      </div>

      <div id="fitur" className="scroll-mt-24">
        <FeatureShowcase/>
      </div>

      {/* 3. SUCCESS STORY (Cerita Sukses) */}
      <div id="umkm" className="scroll-mt-24">
        <SuccessStory />
      </div>

      {/* 4. CALL TO ACTION */}
      <div id="cta" className="scroll-mt-24">
        <CtaSection />
      </div>

      {/* 5. CARA KERJA */}
      <div id="cara-kerja" className="scroll-mt-24">
        <HowItWorks />
      </div>

      {/* FOOTER */}
      <Footer />
      
    </main>
  );
}