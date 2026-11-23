import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import GlobalStatsSection from './components/landing/GlobalStatsSection';
import ProductTabsSection from './components/landing/ProductTabsSection';
import PTEInfoSections from './components/landing/PTEInfoSections';
import SuccessStoriesSection from './components/landing/SuccessStoriesSection';
import InstituteSoftwareSection from './components/landing/InstituteSoftwareSection';
import GlobalPresenceSection from './components/landing/GlobalPresenceSection';
import FAQSection from './components/landing/FAQSection';
import Footer from './components/landing/Footer';
import FloatingWidgets from './components/landing/FloatingWidgets';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-cyan-500 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar />

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

      {/* Comprehensive Site Footer */}
      <Footer />

      {/* Floating WhatsApp and Scroll-to-Top Widgets */}
      <FloatingWidgets />
    </div>
  );
}
