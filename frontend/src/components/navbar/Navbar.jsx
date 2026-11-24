import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Headphones, Menu, ShieldCheck, X } from 'lucide-react';
import ProductsMegaMenu from './ProductsMegaMenu';
import LanguageDropdown from './LanguageDropdown';
import { getStoredUser, isSuperAdmin } from '../../utils/auth';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const currentUser = getStoredUser();
  const showSuperDashboard = isSuperAdmin(currentUser);

  // Check if on Business / Institute routes
  const isBusiness = 
    location.pathname === '/business' || 
    location.pathname === '/institute-software' || 
    location.pathname === '/pte-for-businesses';

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 180);
  };

  // =========================================================================
  // 1. BUSINESS NAVBAR (White Background - 1:1 match with user screenshot 2)
  // Links: Home | Products ⌄ | About PTE | Mock Tests
  // Right: Cyan Headphone | Cyan 文A | "Get Free Trial" (Solid Cyan Pill)
  // =========================================================================
  if (isBusiness) {
    return (
      <nav className="relative z-50 bg-white text-slate-800 px-4 sm:px-8 py-3.5 border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Side: Brand Logo + Business Nav Links */}
          <div className="flex items-center gap-8 xl:gap-12">
            <Link to="/" className="flex items-center gap-1.5 group shrink-0">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900">
                ninety<span className="text-cyan-500 font-extrabold">pte</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-500 mb-2"></span>
            </Link>

            {/* Desktop Nav Links: Home, Products ⌄, About PTE, Mock Tests */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-800">
              <Link to="/" className="hover:text-cyan-600 transition font-semibold">Home</Link>

              {/* Products Mega-Menu Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center gap-1 text-slate-800 hover:text-cyan-600 transition font-semibold"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 ${productsOpen ? 'rotate-180 text-cyan-600' : ''}`} />
                </button>

                {productsOpen && (
                  <div 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ProductsMegaMenu onClose={() => setProductsOpen(false)} />
                  </div>
                )}
              </div>

              <Link to="/about-pte" className="hover:text-cyan-600 transition font-semibold">About PTE</Link>
              <Link to="/mock-tests" className="hover:text-cyan-600 transition font-semibold">Mock Tests</Link>
            </div>
          </div>

          {/* Right Action Items: Cyan Headset, Cyan 文A, "Get Free Trial" Cyan Pill */}
          <div className="hidden sm:flex items-center gap-4 xl:gap-5">
            <Link 
              to="/contact"
              className="text-cyan-500 hover:text-cyan-600 transition flex items-center justify-center" 
              title="Support & Contact"
            >
              <Headphones className="w-5 h-5 stroke-[2.2]" />
            </Link>

            <LanguageDropdown variant="business" />

            <button
              onClick={() => {
                const el = document.getElementById('enquiry-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="px-5 py-2 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
            >
              Get Free Trial
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 hover:text-cyan-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer for Business */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 p-6 space-y-4 text-sm font-semibold text-slate-800 shadow-xl">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-600">Home</Link>
            <Link to="/about-pte" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-600">About PTE</Link>
            <Link to="/mock-tests" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-600">Mock Tests</Link>
            
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <div className="flex items-center justify-between text-slate-700">
                <Link 
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 text-cyan-600 text-xs font-bold"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Support</span>
                </Link>
                <LanguageDropdown variant="business" />
              </div>
              
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('enquiry-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-full bg-[#00c2cb] text-white font-extrabold text-center text-sm shadow-md"
              >
                Get Free Trial
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  }

  // =========================================================================
  // 2. CONSUMER NAVBAR (Blue Gradient - 1:1 match with user screenshot 1)
  // Links: Products ⌄ | Pricing | Business | Mobile App | PTE Voucher
  // Right: Headset in White Circle | White 文A | Log in > | Start Free Trial >
  // =========================================================================
  return (
    <nav className="relative z-50 bg-gradient-to-r from-[#1e40af] via-[#0284c7] to-[#06b6d4] text-white px-4 sm:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo + Nav Links */}
        <div className="flex items-center gap-6 xl:gap-8">
          <Link to="/" className="flex items-center gap-1.5 group shrink-0">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
              ninety<span className="text-cyan-300 font-extrabold">pte</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-300 mb-2"></span>
          </Link>

          {/* Desktop Nav Links: Strictly Products ⌄, Pricing, Business, Mobile App, PTE Voucher */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-white">
            
            {/* Products Mega-Menu Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center gap-1 hover:text-cyan-200 transition font-semibold"
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 ${productsOpen ? 'rotate-180 text-cyan-200' : ''}`} />
              </button>

              {productsOpen && (
                <div 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ProductsMegaMenu onClose={() => setProductsOpen(false)} />
                </div>
              )}
            </div>

            <Link to="/pricing" className="hover:text-cyan-200 transition font-semibold">Pricing</Link>
            <Link to="/business" className="hover:text-cyan-200 transition font-semibold">Business</Link>
            <Link to="/mobile-app" className="hover:text-cyan-200 transition font-semibold">Mobile App</Link>
            <Link to="/book-exam" className="hover:text-cyan-200 transition font-semibold">PTE Voucher</Link>
          </div>
        </div>

        {/* Right Action Items: White Circle Headset, White 文A, Log in >, Start Free Trial > */}
        <div className="hidden sm:flex items-center gap-4 xl:gap-5">
          {/* Headset in White Circle */}
          <Link 
            to="/contact"
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 text-cyan-600 flex items-center justify-center shadow-xs transition" 
            title="Contact Us & Guidance"
          >
            <Headphones className="w-4 h-4 stroke-[2.5]" />
          </Link>

          {/* Language / Translation Dropdown */}
          <LanguageDropdown variant="consumer" />

          {/* User Auth / Dashboard Button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {showSuperDashboard && (
                <Link
                  to="/super-dashboard"
                  className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-400/40 font-extrabold text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Super Dashboard</span>
                </Link>
              )}
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-full bg-white hover:bg-cyan-50 text-[#00a8b5] font-extrabold text-xs sm:text-sm shadow-sm transition flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            </div>
          ) : (
            <>
              {/* Log in > */}
              <Link
                to="/login"
                className="flex items-center gap-1 text-white hover:text-cyan-200 text-sm font-semibold transition"
              >
                <span>Log in</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>

              {/* Start Free Trial > Pill Button (White Background, Cyan Text) */}
              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-white hover:bg-cyan-50 text-[#00a8b5] font-extrabold text-xs sm:text-sm shadow-sm transition flex items-center gap-1 group"
              >
                <span>Start Free Trial</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10 p-6 space-y-4 text-sm font-semibold text-white shadow-xl">
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-300">Pricing</Link>
          <Link to="/business" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-300">Business</Link>
          <Link to="/mobile-app" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-300">Mobile App</Link>
          <Link to="/book-exam" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-300">PTE Voucher</Link>
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-white">
              {!currentUser ? (
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1 text-white hover:text-cyan-300 font-bold text-sm"
                >
                  <span>Log in</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="text-xs text-cyan-300 font-semibold truncate pr-2">
                  {currentUser.email}
                </span>
              )}
              <LanguageDropdown variant="consumer" />
            </div>

            {currentUser ? (
              <div className="flex flex-col gap-2">
                {showSuperDashboard && (
                  <Link
                    to="/super-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-full bg-slate-800 border border-cyan-400/50 text-cyan-300 font-extrabold text-center text-sm shadow-md flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Super Dashboard</span>
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-full bg-white text-[#00a8b5] font-extrabold text-center text-sm shadow-md block"
                >
                  Dashboard &gt;
                </Link>
              </div>
            ) : (
              <Link 
                to="/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-white text-[#00a8b5] font-extrabold text-center text-sm shadow-md block"
              >
                Start Free Trial &gt;
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
