import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Headphones, Menu, X } from 'lucide-react';
import ProductsMegaMenu from './ProductsMegaMenu';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Check if current route is for business / institutes matching alfapte.com/pte-for-businesses
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
  // 1. BUSINESS NAVBAR VARIANT (White Background matching uploaded screenshot)
  // =========================================================================
  if (isBusiness) {
    return (
      <nav className="relative z-50 bg-white text-slate-800 px-4 sm:px-8 py-3.5 border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Side: Brand Logo + Nav Links */}
          <div className="flex items-center gap-8 xl:gap-12">
            {/* Brand Logo (Slate text with Cyan highlight) */}
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
                    <ProductsMegaMenu />
                  </div>
                )}
              </div>

              <Link to="/about-pte" className="hover:text-cyan-600 transition font-semibold">About PTE</Link>
              <Link to="/pricing?tab=mock-test" className="hover:text-cyan-600 transition font-semibold">Mock Tests</Link>
            </div>
          </div>

          {/* Right Action Items matching business screenshot: Headset Icon, 文A, "Get Free Trial" */}
          <div className="hidden sm:flex items-center gap-4 xl:gap-5">
            {/* Headset Support Button (Cyan Outline with Cyan Headset Icon) */}
            <button 
              className="w-8 h-8 rounded-full border border-cyan-400 hover:bg-cyan-50 text-cyan-500 flex items-center justify-center transition shadow-2xs" 
              title="Customer Support & Guidance"
            >
              <Headphones className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Language / Translation Icon in Cyan */}
            <button 
              className="flex items-center gap-1 text-cyan-500 hover:text-cyan-600 text-xs font-bold transition" 
              title="Select Language"
            >
              <span className="text-base tracking-tighter font-serif">文A</span>
            </button>

            {/* Get Free Trial Pill Button (Cyan Background, White Text) */}
            <button
              onClick={() => window.scrollTo({ top: 150, behavior: 'smooth' })}
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
            <Link to="/pricing?tab=mock-test" onClick={() => setMobileMenuOpen(false)} className="block hover:text-cyan-600">Mock Tests</Link>
            
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <div className="flex items-center justify-between text-slate-700">
                <button className="flex items-center gap-1.5 text-cyan-600 text-xs font-bold">
                  <Headphones className="w-4 h-4" />
                  <span>Support</span>
                </button>
                <button className="flex items-center gap-1 text-cyan-600 text-xs font-bold">
                  <span className="font-serif">文A</span>
                  <span>Language</span>
                </button>
              </div>
              
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 150, behavior: 'smooth' });
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
  // 2. STANDARD / CONSUMER NAVBAR (Blue Gradient Background)
  // =========================================================================
  return (
    <nav className="relative z-50 bg-gradient-to-r from-[#1e40af] via-[#0284c7] to-[#06b6d4] text-white px-4 sm:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo + Nav Links */}
        <div className="flex items-center gap-6 xl:gap-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-1.5 group shrink-0">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
              ninety<span className="text-cyan-300 font-extrabold">pte</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-300 mb-2"></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-white">
            <Link to="/" className="hover:text-cyan-200 transition font-semibold">Home</Link>

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
                  <ProductsMegaMenu />
                </div>
              )}
            </div>

            <Link to="/pricing" className="hover:text-cyan-200 transition font-semibold">Pricing</Link>
            <Link to="/business" className="hover:text-cyan-200 transition font-semibold">Business</Link>
            <Link to="/mobile-app" className="hover:text-cyan-200 transition font-semibold">Mobile App</Link>
            <Link to="/book-exam" className="hover:text-cyan-200 transition font-semibold">PTE Voucher</Link>
          </div>
        </div>

        {/* Right Action Items matching reference: Headset Icon, Translate, Log in >, Start Free Trial > */}
        <div className="hidden sm:flex items-center gap-4 xl:gap-5">
          {/* Headset Support Button (White Circle with Cyan Headset Icon) */}
          <button 
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 text-cyan-600 flex items-center justify-center shadow-xs transition" 
            title="Customer Support & Guidance"
          >
            <Headphones className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Language / Translation Icon */}
          <button 
            className="flex items-center gap-1 text-white hover:text-cyan-200 text-xs font-semibold transition" 
            title="Select Language"
          >
            <span className="text-base tracking-tighter font-serif">文A</span>
          </button>

          {/* Log in > Link */}
          <a
            href="#login"
            className="flex items-center gap-1 text-white hover:text-cyan-200 text-sm font-semibold transition"
          >
            <span>Log in</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>

          {/* Start Free Trial > Pill Button (White Background, Cyan Text) */}
          <a
            href="#trial"
            className="px-5 py-2 rounded-full bg-white hover:bg-cyan-50 text-[#00a8b5] font-extrabold text-xs sm:text-sm shadow-sm transition flex items-center gap-1 group"
          >
            <span>Start Free Trial</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
          </a>
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10 p-6 space-y-4 text-sm font-semibold">
          <a href="#pte-academic" className="block text-white hover:text-cyan-300">Products</a>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-cyan-300">Pricing</Link>
          <Link to="/business" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-cyan-300">Business</Link>
          <Link to="/mobile-app" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-cyan-300">Mobile App</Link>
          <Link to="/book-exam" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-cyan-300">PTE Voucher</Link>
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-white">
              <a href="#login" className="flex items-center gap-1 text-white hover:text-cyan-300 font-bold text-sm">
                <span>Log in</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <button className="flex items-center gap-1 text-white text-xs font-semibold">
                <span className="font-serif">文A</span>
                <span>Language</span>
              </button>
            </div>
            
            <a 
              href="#trial" 
              className="w-full py-2.5 rounded-full bg-white text-[#00a8b5] font-extrabold text-center text-sm shadow-md"
            >
              Start Free Trial &gt;
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
