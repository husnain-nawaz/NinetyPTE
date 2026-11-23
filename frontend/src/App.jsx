import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/navbar/Navbar';
import Footer from './components/landing/Footer';
import FloatingWidgets from './components/landing/FloatingWidgets';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import BookExamPage from './pages/BookExamPage';
import MobileAppPage from './pages/MobileAppPage';
import InstituteSoftwarePage from './pages/InstituteSoftwarePage';
import AboutPTEPage from './pages/AboutPTEPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';

function AppContent() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signin', '/signup', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-cyan-500 selection:text-white relative flex flex-col justify-between">
      
      {/* Top Navbar (hidden on dedicated auth pages) */}
      {!isAuthPage && <Navbar />}

      {/* Dynamic Route View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/book-exam" element={<BookExamPage />} />
          <Route path="/pte-voucher" element={<BookExamPage />} />
          <Route path="/mobile-app" element={<MobileAppPage />} />
          <Route path="/business" element={<InstituteSoftwarePage />} />
          <Route path="/institute-software" element={<InstituteSoftwarePage />} />
          <Route path="/pte-for-businesses" element={<InstituteSoftwarePage />} />
          <Route path="/about-pte" element={<AboutPTEPage />} />
          <Route path="/pte-academic" element={<AboutPTEPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/login" element={<AuthPage initialMode="signin" />} />
          <Route path="/signin" element={<AuthPage initialMode="signin" />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/register" element={<AuthPage initialMode="signup" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Comprehensive Site Footer (hidden on dedicated auth pages) */}
      {!isAuthPage && <Footer />}

      {/* Floating WhatsApp and Scroll-to-Top Widgets (hidden on dedicated auth pages) */}
      {!isAuthPage && <FloatingWidgets />}

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Scroll smoothly to top on every route navigation */}
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
