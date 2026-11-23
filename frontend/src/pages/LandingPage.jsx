import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import GlobalStatsSection from '../components/landing/GlobalStatsSection';
import ProductTabsSection from '../components/landing/ProductTabsSection';
import PTEInfoSections from '../components/landing/PTEInfoSections';
import SuccessStoriesSection from '../components/landing/SuccessStoriesSection';
import InstituteSoftwareSection from '../components/landing/InstituteSoftwareSection';
import GlobalPresenceSection from '../components/landing/GlobalPresenceSection';
import FAQSection from '../components/landing/FAQSection';

export default function LandingPage() {
  return (
    <>
      {/* Hero Section with Diagonal Gradient Mesh and Multi-Device Mockup */}
      <HeroSection />

      {/* Main Feature Highlights (AI Scoring, Mock Tests, Analytics, Mobile App) */}
      <FeaturesSection />

      {/* Global PTE Network Space Background with Wireframe Globe */}
      <GlobalStatsSection />

      {/* Product Category Tabs (PTE Academic/UKVI, Core, IELTS, LanguageCert) */}
      <ProductTabsSection />

      {/* Educational Guides (What is PTE, Why Choose PTE, Test Types, Destination Countries) */}
      <PTEInfoSections />

      {/* Student Success Stories & Testimonials Carousel */}
      <SuccessStoriesSection />

      {/* Institute / B2B Software Platform */}
      <InstituteSoftwareSection />

      {/* Global Regional Support Centers */}
      <GlobalPresenceSection />

      {/* Frequently Asked Questions Accordion */}
      <FAQSection />
    </>
  );
}
