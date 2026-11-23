import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/landing/Footer';
import FloatingWidgets from './components/landing/FloatingWidgets';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import BookExamPage from './pages/BookExamPage';
import MobileAppPage from './pages/MobileAppPage';
import InstituteSoftwarePage from './pages/InstituteSoftwarePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-cyan-500 selection:text-white relative flex flex-col justify-between">
        
        {/* Top Navbar */}
        <Navbar />

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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Comprehensive Site Footer */}
        <Footer />

        {/* Floating WhatsApp and Scroll-to-Top Widgets */}
        <FloatingWidgets />

      </div>
    </BrowserRouter>
  );
}
