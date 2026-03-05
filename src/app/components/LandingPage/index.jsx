import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import SuccessStory from './SuccessStory';
import HowItWorks from './HowItWorks';
import CtaSection from './CtaSection';
import Footer from '../Navbar/footer';

export default function LandingPage() {
  return (
    <main className="bg-[#1E1E1E] min-h-screen">
      <HeroSection />
      <CtaSection />
      <FeatureSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}