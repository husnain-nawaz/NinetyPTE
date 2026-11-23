import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Headphones, Menu, X } from 'lucide-react';
import ProductsMegaMenu from './ProductsMegaMenu';
import LanguageDropdown from './LanguageDropdown';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Check route types
  const isBusiness = 
    location.pathname === '/business' || 
    location.pathname === '/institute-software' || 
    location.pathname === '/pte-for-businesses';

  const isLanding = location.pathname === '/';

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
  // 1. BUSINESS NAVBAR (White Background matching uploaded screenshot)
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

          {/* Right Action Items: Headset Icon, 文A, "Get Free Trial" */}
          <div className="hidden sm:flex items-center gap-4 xl:gap-5">
            <Link 
              to="/contact"
              className="w-8 h-8 rounded-full border border-cyan-400 hover:bg-cyan-50 text-cyan-500 flex items-center justify-center transition shadow-2xs" 
              title="Contact Us & Guidance"
            >
              <Headphones className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <LanguageDropdown variant="business" />

            <button
              onClick={() => {
                const el = document.getElementById('enquiry-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 300, behavior: 'smooth' });
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

        {/* Mobile Drawer */}
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
                  else window.scrollTo({ top: 300, behavior: 'smooth' });
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
  // 2. INNER PAGES NAVBAR (White Background matching About PTE & Portal Pages)
  // =========================================================================
  // When not on the gradient Landing Page, all inner pages have clean white navbar
  const isWhiteNavbar = !isLanding;

  return (
    <nav className={`relative z-50 px-4 sm:px-8 py-3.5 transition-colors ${
      isWhiteNavbar 
        ? 'bg-white text-slate-800 border-b border-slate-100 shadow-xs' 
        : 'bg-gradient-to-r from-[#1e40af] via-[#0284c7] to-[#06b6d4] text-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo + Nav Links */}
        <div className="flex items-center gap-6 xl:gap-8">
          <Link to="/" className="flex items-center gap-1.5 group shrink-0">
            <span className={`text-2xl sm:text-3xl font-black tracking-tighter ${
              isWhiteNavbar ? 'text-slate-900' : 'text-white'
            }`}>
              ninety<span className={isWhiteNavbar ? 'text-cyan-500 font-extrabold' : 'text-cyan-300 font-extrabold'}>pte</span>
            </span>
            <span className={`w-2 h-2 rounded-full mb-2 ${
              isWhiteNavbar ? 'bg-cyan-500' : 'bg-cyan-300'
            }`}></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className={`hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold ${
            isWhiteNavbar ? 'text-slate-800' : 'text-white'
          }`}>
            <Link to="/" className={`transition font-semibold ${
              isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
            }`}>
              Home
            </Link>

            {/* Products Mega-Menu Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => setProductsOpen(!productsOpen)}
                className={`flex items-center gap-1 transition font-semibold ${
                  isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 ${
                  productsOpen ? 'rotate-180 text-cyan-500' : ''
                }`} />
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

            {/* About PTE Link: Highlighted if on /about-pte */}
            <Link 
              to="/about-pte" 
              className={`transition font-semibold ${
                location.pathname === '/about-pte' || location.pathname === '/pte-academic'
                  ? 'text-[#00c2cb] font-extrabold'
                  : isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
              }`}
            >
              About PTE
            </Link>

            {/* Mock Tests Link */}
            <Link 
              to="/mock-tests" 
              className={`transition font-semibold ${
                location.pathname === '/mock-tests' || location.pathname === '/pte-mock-test'
                  ? 'text-[#00c2cb] font-extrabold'
                  : isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
              }`}
            >
              Mock Tests
            </Link>

            <Link 
              to="/pricing" 
              className={`transition font-semibold ${
                location.pathname === '/pricing'
                  ? 'text-[#00c2cb] font-extrabold'
                  : isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
              }`}
            >
              Pricing
            </Link>

            <Link 
              to="/business" 
              className={`transition font-semibold ${
                isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
              }`}
            >
              Business
            </Link>

            <Link 
              to="/mobile-app" 
              className={`transition font-semibold ${
                location.pathname === '/mobile-app'
                  ? 'text-[#00c2cb] font-extrabold'
                  : isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
              }`}
            >
              Mobile App
            </Link>

            <Link 
              to="/book-exam" 
              className={`transition font-semibold ${
                location.pathname === '/book-exam' || location.pathname === '/pte-voucher'
                  ? 'text-[#00c2cb] font-extrabold'
                  : isWhiteNavbar ? 'hover:text-cyan-600' : 'hover:text-cyan-200'
              }`}
            >
              PTE Voucher
            </Link>
          </div>
        </div>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-4 xl:gap-5">
          {/* Headset Support Button */}
          <Link 
            to="/contact"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition shadow-2xs ${
              isWhiteNavbar
                ? 'border border-cyan-400 hover:bg-cyan-50 text-cyan-500'
                : 'bg-white hover:bg-slate-50 text-cyan-600 shadow-xs'
            }`} 
            title="Contact Us & Guidance"
          >
            <Headphones className="w-4 h-4 stroke-[2.5]" />
          </Link>

          {/* Language / Translation Dropdown */}
          <LanguageDropdown variant={isWhiteNavbar ? 'business' : 'consumer'} />

          {/* Log in > Link */}
          <Link
            to="/login"
            className={`flex items-center gap-1 text-sm font-semibold transition ${
              isWhiteNavbar ? 'text-cyan-600 hover:text-cyan-700 font-bold' : 'text-white hover:text-cyan-200'
            }`}
          >
            <span>Log in</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>

          {/* Start Free Trial > Pill Button */}
          <Link
            to="/signup"
            className={`px-5 py-2 rounded-full font-extrabold text-xs sm:text-sm shadow-sm transition flex items-center gap-1 group ${
              isWhiteNavbar
                ? 'bg-[#00c2cb] hover:bg-[#00a8b5] text-white'
                : 'bg-white hover:bg-cyan-50 text-[#00a8b5]'
            }`}
          >
            <span>Start Free Trial</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 ${isWhiteNavbar ? 'text-slate-800 hover:text-cyan-600' : 'text-white'}`}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 w-full p-6 space-y-4 text-sm font-semibold shadow-xl border-b backdrop-blur-md ${
          isWhiteNavbar ? 'bg-white/95 text-slate-800 border-slate-200' : 'bg-slate-900/95 text-white border-white/10'
        }`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-500">Home</Link>
          <Link to="/about-pte" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-500">About PTE</Link>
          <Link to="/mock-tests" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-500">Mock Tests</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-500">Pricing</Link>
          <Link to="/business" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-500">Business</Link>
          <Link to="/mobile-app" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-500">Mobile App</Link>
          <Link to="/book-exam" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-500">PTE Voucher</Link>
          
          <div className={`pt-4 border-t flex flex-col gap-3 ${isWhiteNavbar ? 'border-slate-200' : 'border-white/10'}`}>
            <div className="flex items-center justify-between">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1 text-cyan-600 font-bold text-sm"
              >
                <span>Log in</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <LanguageDropdown variant={isWhiteNavbar ? 'business' : 'consumer'} />
            </div>
            
            <Link 
              to="/signup" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-[#00c2cb] text-white font-extrabold text-center text-sm shadow-md block"
            >
              Start Free Trial &gt;
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
