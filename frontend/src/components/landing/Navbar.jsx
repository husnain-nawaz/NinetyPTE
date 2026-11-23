import { useState } from 'react';
import { ChevronDown, User, Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-transparent text-white px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-1.5 group">
            <span className="text-3xl font-black italic tracking-tighter text-white">
              alfa
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 mb-2"></span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
            <div className="relative">
              <button 
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center gap-1 hover:text-cyan-300 transition"
              >
                <span>Products</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-slate-800 rounded-xl shadow-xl py-2 border border-slate-100 z-50 text-xs">
                  <a href="#pte-academic" className="block px-4 py-2 hover:bg-slate-50 font-semibold text-slate-800">
                    PTE Academic / UKVI
                  </a>
                  <a href="#pte-core" className="block px-4 py-2 hover:bg-slate-50 font-semibold text-slate-800">
                    PTE Core
                  </a>
                  <a href="#mock-tests" className="block px-4 py-2 hover:bg-slate-50 font-semibold text-slate-800">
                    AI Scored Mock Tests
                  </a>
                  <a href="#institutes" className="block px-4 py-2 hover:bg-slate-50 font-semibold text-slate-800">
                    Institute Software (B2B)
                  </a>
                </div>
              )}
            </div>

            <a href="#pricing" className="hover:text-cyan-300 transition">Pricing</a>
            <a href="#business" className="hover:text-cyan-300 transition">Business</a>
            <a href="#mobile-app" className="hover:text-cyan-300 transition">Mobile App</a>
            <a href="#voucher" className="hover:text-cyan-300 transition">PTE Voucher</a>
          </div>
        </div>

        {/* Right Action Icons & Dashboard Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button className="p-2 text-white/80 hover:text-white transition" title="User Account">
            <User className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 text-white/80 hover:text-white text-xs transition" title="Select Language">
            <Globe className="w-4 h-4" />
            <span className="text-[11px] font-bold">文A</span>
          </button>
          <a
            href="#dashboard"
            className="px-5 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
          >
            <span>Dashboard</span>
            <span className="text-xs">&gt;</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
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
          <a href="#pte-academic" className="block text-white/90 hover:text-cyan-400">Products</a>
          <a href="#pricing" className="block text-white/90 hover:text-cyan-400">Pricing</a>
          <a href="#business" className="block text-white/90 hover:text-cyan-400">Business</a>
          <a href="#mobile-app" className="block text-white/90 hover:text-cyan-400">Mobile App</a>
          <a href="#voucher" className="block text-white/90 hover:text-cyan-400">PTE Voucher</a>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <a href="#dashboard" className="w-full py-2.5 rounded-full bg-cyan-400 text-slate-900 font-bold text-center">
              Dashboard &gt;
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
