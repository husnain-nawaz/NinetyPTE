import { Link } from 'react-router-dom';
import { 
  Globe, 
  MapPin, 
  Phone, 
  Apple, 
  Share2 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Top Section: Brand + Addresses + Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-1.5 group">
              <span className="text-3xl font-black tracking-tighter text-slate-900">
                ninety<span className="text-cyan-500 font-extrabold">pte</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-500 mb-2"></span>
            </a>

            <div className="space-y-3 text-[11px] text-slate-500 leading-relaxed">
              <div>
                <strong className="text-slate-800 block">Melbourne Campus:</strong>
                <span>Level 19, 263 William Street, Melbourne VIC 3000, Australia</span>
              </div>
              <div>
                <strong className="text-slate-800 block">Adelaide Center:</strong>
                <span>Level 30, Westpac House, 91 King William Street, Adelaide SA 5000</span>
              </div>
              <div>
                <strong className="text-slate-800 block">Technology Center (India):</strong>
                <span>Suite 514, Unit No 203, SBR CV Towers, Madhapur, Hyderabad</span>
              </div>
            </div>

            {/* Social Icons (SVGs) */}
            <div className="flex items-center gap-2 pt-2">
              <a href="#youtube" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 transition flex items-center justify-center font-bold text-xs" title="YouTube">
                YT
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 transition flex items-center justify-center font-bold text-xs" title="Facebook">
                FB
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 transition flex items-center justify-center font-bold text-xs" title="Instagram">
                IG
              </a>
              <a href="#linkedin" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 transition flex items-center justify-center font-bold text-xs" title="LinkedIn">
                IN
              </a>
              <a href="#x" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 transition flex items-center justify-center font-bold text-xs" title="X (Twitter)">
                X
              </a>
            </div>

            {/* Mobile App Download Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Link 
                to="/mobile-app"
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition text-[11px]"
              >
                <Apple className="w-4 h-4 fill-current" />
                <span>App Store</span>
              </Link>
              <Link 
                to="/mobile-app"
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition text-[11px]"
              >
                <span className="text-emerald-400 font-bold">▶</span>
                <span>Google Play</span>
              </Link>
            </div>
          </div>

          {/* Column 2: PTE Academic / UKVI */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">PTE Academic / UKVI</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><a href="#pte-academic-exam" className="hover:text-cyan-600">PTE Academic Exam</a></li>
              <li><a href="#pte-ukvi" className="hover:text-cyan-600">PTE Academic UKVI Exam</a></li>
              <li><a href="#pattern" className="hover:text-cyan-600">Exam Pattern & Format</a></li>
              <li><a href="#score-calculator" className="hover:text-cyan-600">PTE Score Calculator</a></li>
              <li><a href="#speaking" className="hover:text-cyan-600">Speaking Practice</a></li>
              <li><a href="#writing" className="hover:text-cyan-600">Writing Practice</a></li>
              <li><a href="#reading" className="hover:text-cyan-600">Reading Practice</a></li>
              <li><a href="#listening" className="hover:text-cyan-600">Listening Practice</a></li>
            </ul>
          </div>

          {/* Column 3: Destination Countries */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Acceptance Countries</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><a href="#australia" className="hover:text-cyan-600">PTE for Australia</a></li>
              <li><a href="#canada" className="hover:text-cyan-600">PTE for Canada</a></li>
              <li><a href="#uk" className="hover:text-cyan-600">PTE for UK</a></li>
              <li><a href="#usa" className="hover:text-cyan-600">PTE for USA</a></li>
              <li><a href="#nz" className="hover:text-cyan-600">PTE for New Zealand</a></li>
              <li><a href="#ireland" className="hover:text-cyan-600">PTE for Ireland</a></li>
              <li><a href="#germany" className="hover:text-cyan-600">PTE for Germany</a></li>
              <li><a href="#singapore" className="hover:text-cyan-600">PTE for Singapore</a></li>
            </ul>
          </div>

          {/* Column 4: PTE Core & Resources */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">PTE Core & Study</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><a href="#core-exam" className="hover:text-cyan-600">PTE Core Exam</a></li>
              <li><a href="#clb-mapping" className="hover:text-cyan-600">PTE Core CLB Calculator</a></li>
              <li><a href="#core-mocks" className="hover:text-cyan-600">PTE Core Mock Tests</a></li>
              <li><a href="#online-course" className="hover:text-cyan-600">PTE Online Video Masterclass</a></li>
              <li><a href="#booking-guide" className="hover:text-cyan-600">How to Book Pearson PTE</a></li>
              <li><a href="#templates" className="hover:text-cyan-600">Band 9 Essay Templates</a></li>
              <li><a href="#vocab" className="hover:text-cyan-600">Collocation Word Bank</a></li>
            </ul>
          </div>

          {/* Column 5: Platform & Institute */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Platform & Pricing</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li><a href="#pricing" className="hover:text-cyan-600">VIP Subscription Pricing</a></li>
              <li><a href="#mock-pricing" className="hover:text-cyan-600">Scored Mock Test Packs</a></li>
              <li><a href="#vouchers" className="hover:text-cyan-600">Discounted PTE Vouchers</a></li>
              <li><a href="#institute-software" className="hover:text-cyan-600 font-bold text-cyan-700">For Coaching Institutes</a></li>
              <li><a href="#train-the-trainer" className="hover:text-cyan-600">Train The Trainer Program</a></li>
              <li><a href="#blog" className="hover:text-cyan-600">PTE Strategy Blog</a></li>
              <li><a href="#contact" className="hover:text-cyan-600">Contact Us & Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal Disclaimer */}
        <div className="border-t border-slate-200/80 pt-8 space-y-4 text-[11px] text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>All rights reserved © NinetyPTE, 2026</p>
            <div className="flex flex-wrap gap-4 font-semibold text-slate-500">
              <a href="#disclaimer" className="hover:text-cyan-600">Disclaimer</a>
              <a href="#terms" className="hover:text-cyan-600">Terms & Conditions</a>
              <a href="#privacy" className="hover:text-cyan-600">Privacy Policy</a>
              <a href="#refund" className="hover:text-cyan-600">Refund / Cancellation Policy</a>
            </div>
          </div>

          <p className="text-center sm:text-left text-[10px] text-slate-400 leading-relaxed">
            NinetyPTE is an independent test preparation platform and is not affiliated with, endorsed by, or connected to Pearson Education Ltd or Pearson VUE®.
          </p>
        </div>

      </div>
    </footer>
  );
}
