import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, 
  FileText, 
  FileCheck, 
  Award, 
  Calculator, 
  Ticket, 
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function ProductsMegaMenu() {
  const [activeCategory, setActiveCategory] = useState('academic');

  const categories = [
    {
      id: 'academic',
      title: 'PTE Academic / UKVI',
      desc: 'Used for global university applications, Australian & New Zealand visas (immigration, work), and UK work or student visa applications.',
      activeColor: 'text-cyan-500',
      links: [
        { title: 'About the Academic Exam', href: '/about-pte', isRoute: true, icon: <div className="w-5 h-5 rounded-md bg-sky-500 text-white flex items-center justify-center text-[11px] font-serif font-black italic">i</div> },
        { title: 'About the Academic UKVI Exam', href: '#about-ukvi', icon: <div className="w-5 h-5 rounded-md bg-sky-500 text-white flex items-center justify-center text-[11px] font-serif font-black italic">i</div> },
        { title: 'Mock Tests', href: '/pricing?tab=mock-test', isRoute: true, icon: <div className="w-5 h-5 rounded-md bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">📋</div> },
        { title: 'Exam Pattern', href: '#exam-pattern', icon: <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">📝</div> },
        { title: 'Strategies', href: '#strategies', icon: <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">♞</div> },
        { title: 'Score Calculator', href: '#score-calculator', icon: <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[9px] font-mono font-bold">+-<br/>x÷</div> },
        { title: 'PTE Voucher', href: '/book-exam', isRoute: true, icon: <div className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">🎟️</div> },
      ]
    },
    {
      id: 'core',
      title: 'PTE Core',
      desc: 'Used for Canadian immigration or work visa applications',
      activeColor: 'text-cyan-500',
      links: [
        { title: 'About the PTE Core Exam', href: '#about-core', icon: <div className="w-5 h-5 rounded-md bg-sky-500 text-white flex items-center justify-center text-[11px] font-serif font-black italic">i</div> },
        { title: 'CLB Score Calculator', href: '#clb-calculator', icon: <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[9px] font-mono font-bold">+-<br/>x÷</div> },
        { title: 'PTE Core Mock Tests', href: '/pricing?tab=mock-test', isRoute: true, icon: <div className="w-5 h-5 rounded-md bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">📋</div> },
        { title: 'PTE Core Exam Pattern', href: '#core-pattern', icon: <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">📝</div> },
        { title: 'Write Email Strategies', href: '#email-strategies', icon: <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">♞</div> },
        { title: 'PTE Core Voucher', href: '/book-exam', isRoute: true, icon: <div className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">🎟️</div> },
      ]
    },
    {
      id: 'ielts',
      title: 'IELTS',
      desc: 'Used for global university applications, professional registration, migration to Australia, New Zealand, Canada, and the UK, and for work or student visa applications.',
      activeColor: 'text-cyan-500',
      links: [
        { title: 'About the IELTS Exam', href: '#about-ielts', icon: <div className="w-5 h-5 rounded-md bg-sky-500 text-white flex items-center justify-center text-[11px] font-serif font-black italic">i</div> },
        { title: 'IELTS Band Score Calculator', href: '#ielts-calculator', icon: <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[9px] font-mono font-bold">+-<br/>x÷</div> },
        { title: 'IELTS Scored Mock Tests', href: '/pricing?tab=mock-test', isRoute: true, icon: <div className="w-5 h-5 rounded-md bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">📋</div> },
        { title: 'IELTS Academic vs General', href: '#ielts-pattern', icon: <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">📝</div> },
        { title: 'Task 1 & Task 2 Templates', href: '#ielts-strategies', icon: <div className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">♞</div> },
      ]
    },
    {
      id: 'languagecert',
      title: 'LANGUAGECERT',
      badge: 'New',
      desc: 'Used for Academic, SELT (UK), and General English exams, for university admissions and immigration across CEFR levels (A1–C2). Recognized globally by universities, employers, and government bodies.',
      activeColor: 'text-cyan-500',
      links: [
        { title: 'About LanguageCert Exam', href: '#about-languagecert', icon: <div className="w-5 h-5 rounded-md bg-sky-500 text-white flex items-center justify-center text-[11px] font-serif font-black italic">i</div> },
        { title: 'CEFR Level Equivalency', href: '#cefr-guide', icon: <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[9px] font-mono font-bold">+-<br/>x÷</div> },
        { title: 'LanguageCert Practice Tests', href: '/pricing?tab=mock-test', isRoute: true, icon: <div className="w-5 h-5 rounded-md bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">📋</div> },
        { title: 'Exam Pattern & Format', href: '#languagecert-pattern', icon: <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">📝</div> },
      ]
    }
  ];

  const current = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <div className="absolute top-full -left-12 sm:left-0 pt-3 z-50 w-[780px] max-w-[95vw] animate-in fade-in slide-in-from-top-1 duration-150">
      
      {/* Upward caret arrow pointer */}
      <div className="absolute top-1.5 left-24 sm:left-28 w-3.5 h-3.5 bg-[#f0f4f9] rotate-45 border-t border-l border-slate-200/90 shadow-xs z-10" />

      {/* Main Dropdown Container matching reference */}
      <div className="bg-[#f0f4f9] border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-2xl relative text-slate-800">
        
        <div className="grid grid-cols-12 gap-4 items-stretch">
          
          {/* Left Column (Selectable Products List) */}
          <div className="col-span-5 space-y-1.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white shadow-xs border border-slate-200/60' 
                      : 'hover:bg-white/50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className={`text-xs sm:text-sm font-extrabold tracking-tight ${
                      isActive ? 'text-cyan-500' : 'text-slate-800'
                    }`}>
                      {cat.title}
                    </h4>
                    {cat.badge && (
                      <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[9px] font-black rounded-full uppercase leading-tight">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column (Sub-features Panel for Active Product) */}
          <div className="col-span-7">
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/60 h-full flex flex-col justify-between">
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {current.links.map((link, idx) => {
                  const content = (
                    <>
                      <div className="shrink-0 group-hover/item:scale-105 transition-transform">
                        {link.icon}
                      </div>
                      <span className="text-xs font-bold leading-tight group-hover/item:text-cyan-600 transition-colors">
                        {link.title}
                      </span>
                    </>
                  );

                  return link.isRoute ? (
                    <Link
                      key={idx}
                      to={link.href}
                      className="flex items-center gap-2.5 group/item text-slate-700 hover:text-cyan-600 transition"
                    >
                      {content}
                    </Link>
                  ) : (
                    <a
                      key={idx}
                      href={link.href}
                      className="flex items-center gap-2.5 group/item text-slate-700 hover:text-cyan-600 transition"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>

              {/* Bottom Subtle Note */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-500">NinetyPTE Global Testing Ecosystem</span>
                <a href="#all-features" className="text-cyan-600 font-bold hover:underline flex items-center gap-0.5">
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
