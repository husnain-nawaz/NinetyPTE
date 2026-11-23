import { useState, useRef } from 'react';
import { ChevronDown, ChevronRight, Headphones, Menu, X } from 'lucide-react';
import ProductsMegaMenu from './ProductsMegaMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 180);
  };

  return (
    <nav className="relative z-50 bg-gradient-to-r from-[#1e40af] via-[#0284c7] to-[#06b6d4] text-white px-4 sm:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo + Nav Links */}
        <div className="flex items-center gap-6 xl:gap-8">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-1.5 group shrink-0">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
              ninety<span className="text-cyan-300 font-extrabold">pte</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-300 mb-2"></span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-white">
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

            <a href="#pricing" className="hover:text-cyan-200 transition font-semibold">Pricing</a>
            <a href="#business" className="hover:text-cyan-200 transition font-semibold">Business</a>
            <a href="#mobile-app" className="hover:text-cyan-200 transition font-semibold">Mobile App</a>
            <a href="#voucher" className="hover:text-cyan-200 transition font-semibold">PTE Voucher</a>
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
          <a href="#pricing" className="block text-white hover:text-cyan-300">Pricing</a>
          <a href="#business" className="block text-white hover:text-cyan-300">Business</a>
          <a href="#mobile-app" className="block text-white hover:text-cyan-300">Mobile App</a>
          <a href="#voucher" className="block text-white hover:text-cyan-300">PTE Voucher</a>
          
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
