import { Link } from 'react-router-dom';
import { 
  Globe, 
  MapPin, 
  Phone, 
  Apple, 
  Share2, 
  Navigation, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* ===================================================================== */}
        {/* Main 4-Column Footer Grid matching PDF Screenshots                    */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* ------------------------------------------------------------------- */}
          {/* Column 1: Brand Logo, Language, Global Addresses, Socials, Stores    */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 group shrink-0">
              <span className="text-3xl font-black tracking-tighter text-slate-900">
                ninety<span className="text-cyan-500 font-extrabold">pte</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-500 mb-2"></span>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold cursor-pointer hover:text-cyan-600 transition">
              <Navigation className="w-3.5 h-3.5 text-cyan-500 rotate-45" />
              <span>English (English)</span>
            </div>

            {/* Addresses (Melbourne, Adelaide, India) */}
            <div className="space-y-3 text-[11px] text-slate-500 leading-relaxed pt-1">
              <div>
                <span className="font-extrabold text-slate-800 block">Melbourne:</span>
                <span>Level 19, 263 William Street, Melbourne VIC 3000, Australia</span>
              </div>
              
              <div>
                <span className="font-extrabold text-slate-800 block">Adelaide:</span>
                <span>Level 30, Westpac House, 91 King William Street, Adelaide SA - 5000</span>
              </div>

              <div>
                <span className="font-extrabold text-slate-800 block">India:</span>
                <span>Suite 514, Unit No 203, SBR CV Towers, Madhapur, Hyderabad, India</span>
              </div>
            </div>

            {/* Social Icons matching Reference: YouTube, Facebook, Instagram, LinkedIn, X, Pinterest */}
            <div className="flex items-center gap-2.5 pt-2">
              {/* YouTube */}
              <a 
                href="#youtube" 
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-rose-600 text-white flex items-center justify-center transition shadow-2xs" 
                title="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="#facebook" 
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition shadow-2xs" 
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="#instagram" 
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-pink-600 text-white flex items-center justify-center transition shadow-2xs" 
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="#linkedin" 
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-sky-700 text-white flex items-center justify-center transition shadow-2xs" 
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a 
                href="#x" 
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-slate-700 text-white flex items-center justify-center transition shadow-2xs" 
                title="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a 
                href="#pinterest" 
                className="w-7 h-7 rounded-full bg-slate-900 hover:bg-rose-700 text-white flex items-center justify-center transition shadow-2xs" 
                title="Pinterest"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.95-.14-2.42.03-3.46.15-.94.99-4.21.99-4.21s-.25-.51-.25-1.26c0-1.18.69-2.06 1.54-2.06.73 0 1.08.55 1.08 1.2 0 .73-.47 1.83-.71 2.85-.2.85.43 1.54 1.27 1.54 1.52 0 2.69-1.6 2.69-3.92 0-2.05-1.47-3.48-3.58-3.48-2.44 0-3.87 1.83-3.87 3.72 0 .74.28 1.53.64 1.96.07.08.08.16.06.24-.07.28-.22.88-.25.99-.04.17-.14.21-.32.13-1.2-.56-1.95-2.31-1.95-3.72 0-3.03 2.2-5.81 6.35-5.81 3.33 0 5.92 2.38 5.92 5.56 0 3.32-2.09 5.99-5 5.99-.98 0-1.9-.51-2.21-1.11l-.6 2.3c-.22.84-.81 1.9-1.21 2.54A12 12 0 1 0 12 0z"/>
                </svg>
              </a>
            </div>

            {/* Mobile App Download Buttons matching Reference */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Link 
                to="/mobile-app"
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition text-[11px] shadow-xs"
              >
                <Apple className="w-4 h-4 fill-current shrink-0" />
                <div className="text-left leading-tight">
                  <div className="text-[8px] uppercase tracking-wider text-slate-300">Download on the</div>
                  <div className="text-[10px] font-bold">App Store</div>
                </div>
              </Link>
              <Link 
                to="/mobile-app"
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition text-[11px] shadow-xs"
              >
                <span className="text-emerald-400 font-bold text-xs shrink-0">▶</span>
                <div className="text-left leading-tight">
                  <div className="text-[8px] uppercase tracking-wider text-slate-300">GET IT ON</div>
                  <div className="text-[10px] font-bold">Google Play</div>
                </div>
              </Link>
            </div>

          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Column 2: PTE Academic / UKVI + PTE Acceptance Countries            */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Sub-section: PTE Academic / UKVI */}
            <div className="space-y-2.5">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">PTE Academic / UKVI</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE Academic Exam</Link></li>
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE Academic UKVI Exam</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">PTE Academic / UKVI Exam Pattern</Link></li>
                <li><Link to="/about-pte#weightage" className="hover:text-cyan-600 transition">PTE Academic / UKVI Score Calculator</Link></li>
                <li><Link to="/pricing?tab=mock-test" className="hover:text-cyan-600 transition">PTE Academic / UKVI Mock Test</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Speaking Practice</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Writing Practice</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Reading Practice</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Listening Practice</Link></li>
              </ul>
            </div>

            {/* Bottom Sub-section: PTE Acceptance Countries */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">PTE Acceptance countries</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE for Canada</Link></li>
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE for UK</Link></li>
                <li><Link to="/pte-for-usa" className="hover:text-cyan-600 transition">PTE for USA</Link></li>
                <li><Link to="/pte-for-new-zealand" className="hover:text-cyan-600 transition">PTE for New Zealand</Link></li>
                <li><Link to="/pte-for-australia" className="hover:text-cyan-600 transition">PTE for Australia</Link></li>
                <li><Link to="/pte-for-ireland" className="hover:text-cyan-600 transition">PTE for Ireland</Link></li>
                <li><Link to="/pte-for-germany" className="hover:text-cyan-600 transition">PTE for Germany</Link></li>
                <li><Link to="/pte-for-singapore" className="hover:text-cyan-600 transition">PTE for Singapore</Link></li>
              </ul>
            </div>

          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Column 3: PTE Core + Resources                                      */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Sub-section: PTE Core */}
            <div className="space-y-2.5">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">PTE Core</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE Core Exam</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">PTE Core Exam Pattern</Link></li>
                <li><Link to="/about-pte#weightage" className="hover:text-cyan-600 transition">PTE Core Score Calculator</Link></li>
                <li><Link to="/pricing?tab=mock-test" className="hover:text-cyan-600 transition">PTE Core Mock Test</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Speaking Practice</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Writing Practice</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Reading Practice</Link></li>
                <li><Link to="/about-pte#exam-format" className="hover:text-cyan-600 transition">Listening Practice</Link></li>
              </ul>
            </div>

            {/* Bottom Sub-section: Resources */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">Resources</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><Link to="/pricing" className="hover:text-cyan-600 transition">PTE Online Course</Link></li>
                <li><Link to="/mobile-app" className="hover:text-cyan-600 transition">PTE Practice Mobile App</Link></li>
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE Material</Link></li>
                <li><Link to="/book-exam" className="hover:text-cyan-600 transition">How to Book PTE Exam</Link></li>
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">Who Accepts PTE</Link></li>
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">On Test Day</Link></li>
                <li><Link to="/about-pte#comparison" className="hover:text-cyan-600 transition">PTE Academic vs PTE Core</Link></li>
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE Video Tips</Link></li>
                <li><Link to="/about-pte" className="hover:text-cyan-600 transition">PTE Core Video Tips</Link></li>
              </ul>
            </div>

          </div>

          {/* ------------------------------------------------------------------- */}
          {/* Column 4: NinetyPTE + Pricing + Other + For Institute               */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* NinetyPTE Sub-section */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">NinetyPTE</h4>
              <ul className="space-y-1 text-xs text-slate-500">
                <li><Link to="/about-us" className="hover:text-cyan-600 transition">About us</Link></li>
                <li><Link to="/events" className="hover:text-cyan-600 transition">Events</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-600 transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* Pricing Sub-section */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">Pricing</h4>
              <ul className="space-y-1 text-xs text-slate-500">
                <li><Link to="/pricing?tab=subscription" className="hover:text-cyan-600 transition">Subscription Pricing</Link></li>
                <li><Link to="/pricing?tab=mock-test" className="hover:text-cyan-600 transition">Mock Test Pricing</Link></li>
              </ul>
            </div>

            {/* Other Sub-section */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">Other</h4>
              <ul className="space-y-1 text-xs text-slate-500">
                <li><Link to="/book-exam" className="hover:text-cyan-600 transition">PTE Voucher</Link></li>
                <li><Link to="/pte-jobs" className="hover:text-cyan-600 transition">PTE Jobs</Link></li>
                <li><a href="#blog" className="hover:text-cyan-600 transition">Blog</a></li>
                <li><Link to="/mobile-app" className="hover:text-cyan-600 transition">Android App</Link></li>
                <li><Link to="/mobile-app" className="hover:text-cyan-600 transition">iOS App</Link></li>
              </ul>
            </div>

            {/* For Institute Sub-section */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">For Institute</h4>
              <ul className="space-y-1 text-xs text-slate-500">
                <li><Link to="/business" className="hover:text-cyan-600 transition">PTE Institute Software</Link></li>
                <li><Link to="/business" className="hover:text-cyan-600 transition">IELTS Institute Software</Link></li>
                <li><Link to="/business" className="hover:text-cyan-600 transition">LANGUAGECERT Institute Software</Link></li>
                <li><Link to="/train-the-trainer" className="hover:text-cyan-600 transition">Train The Trainer</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* ===================================================================== */}
        {/* Bottom Bar: Copyright, Legal Links & Independent Disclaimer          */}
        {/* ===================================================================== */}
        <div className="border-t border-slate-200/80 pt-8 space-y-3.5 text-[11px] text-slate-400">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-medium text-slate-500">
              All rights reserved © NinetyPTE Education, 2026
            </p>
            
            <div className="flex flex-wrap gap-4 font-semibold text-slate-500">
              <Link to="/disclaimer" className="hover:text-cyan-600 transition">Disclaimer</Link>
              <Link to="/terms-conditions" className="hover:text-cyan-600 transition">Terms & Conditions</Link>
              <Link to="/privacy-policy" className="hover:text-cyan-600 transition">Privacy Policy</Link>
              <Link to="/refund-policy" className="hover:text-cyan-600 transition">Refund / Cancellation Policy</Link>
            </div>
          </div>

          <p className="text-center sm:text-left text-[10px] text-slate-400 leading-relaxed font-normal">
            NinetyPTE is an independent test preparation platform and is not affiliated with, endorsed by, or connected to Pearson Education Ltd or Pearson VUE.
          </p>
        </div>

      </div>
    </footer>
  );
}
