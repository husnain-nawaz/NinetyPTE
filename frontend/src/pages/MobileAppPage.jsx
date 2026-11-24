import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Search, 
  Share2, 
  Bell, 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  Clock, 
  RotateCw, 
  Check, 
  ChevronRight, 
  Smartphone, 
  BarChart3, 
  FileText, 
  Calendar, 
  Tv, 
  Award, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function MobileAppPage() {
  const [emailInput, setEmailInput] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleGetLink = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setLinkSent(true);
    setTimeout(() => {
      setLinkSent(false);
      setEmailInput('');
    }, 4500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactOpen(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  // 6 Core Features matching Page 2 of Reference PDF exactly
  const features = [
    {
      id: 1,
      title: 'Practice all 20 questions on the go',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00c2cb] shadow-xs group-hover:scale-105 transition-transform duration-200">
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Hand holding smartphone with dots */}
            <rect x="14" y="6" width="20" height="32" rx="4" />
            <line x1="20" y1="11" x2="28" y2="11" strokeWidth="2" />
            <circle cx="24" cy="32" r="1.5" fill="currentColor" />
            <circle cx="8" cy="14" r="2" fill="#00c2cb" />
            <circle cx="40" cy="14" r="2" fill="#00c2cb" />
            <path d="M10 14h4M34 14h4" strokeDasharray="2 2" />
            <circle cx="10" cy="24" r="1.5" />
            <circle cx="38" cy="24" r="1.5" />
          </svg>
        </div>
      )
    },
    {
      id: 2,
      title: 'Assess your performance with the help of AI scoring',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00c2cb] shadow-xs group-hover:scale-105 transition-transform duration-200">
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Magnifier over bar chart */}
            <circle cx="22" cy="20" r="12" />
            <line x1="31" y1="29" x2="41" y2="39" strokeWidth="2.8" />
            <path d="M16 23v-2M20 23v-5M24 23v-8M28 23v-4" strokeWidth="2.4" />
            <path d="M15 15l4-3 4 3 5-5" stroke="#00c2cb" strokeWidth="1.8" />
          </svg>
        </div>
      )
    },
    {
      id: 3,
      title: (
        <span>
          Take{' '}
          <Link to="/mock-tests" className="underline font-bold text-slate-900 hover:text-[#00c2cb] transition-colors">
            full PTE mock tests
          </Link>{' '}
          with instant AI scoring.
        </span>
      ),
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00c2cb] shadow-xs group-hover:scale-105 transition-transform duration-200">
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Phone with test sheet and pencil */}
            <rect x="10" y="8" width="22" height="32" rx="3" />
            <line x1="15" y1="16" x2="27" y2="16" />
            <line x1="15" y1="22" x2="23" y2="22" />
            <circle cx="27" cy="22" r="1.5" fill="#00c2cb" />
            <line x1="15" y1="28" x2="25" y2="28" />
            {/* Pencil */}
            <path d="M34 14l5-5 4 4-5 5-4-4z" fill="#00c2cb" stroke="none" />
            <path d="M32 16l-3 9 9-3 6-6-6-6-6 6z" />
          </svg>
        </div>
      )
    },
    {
      id: 4,
      title: 'Access the study tools like Templates, Grammar, Vocab bank & Score feedback',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00c2cb] shadow-xs group-hover:scale-105 transition-transform duration-200">
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Computer monitor with book/study lists */}
            <rect x="8" y="8" width="32" height="24" rx="3" />
            <line x1="16" y1="38" x2="32" y2="38" />
            <line x1="24" y1="32" x2="24" y2="38" />
            <line x1="14" y1="15" x2="24" y2="15" />
            <line x1="14" y1="20" x2="28" y2="20" />
            <line x1="14" y1="25" x2="22" y2="25" />
            <rect x="28" y="14" width="7" height="6" rx="1" fill="#00c2cb" opacity="0.3" stroke="#00c2cb" />
          </svg>
        </div>
      )
    },
    {
      id: 5,
      title: 'Follow a tailor-made study plan according to your requirements',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00c2cb] shadow-xs group-hover:scale-105 transition-transform duration-200">
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Notepad checklist with checkmarks */}
            <rect x="12" y="8" width="24" height="32" rx="3" />
            <line x1="18" y1="6" x2="18" y2="10" />
            <line x1="30" y1="6" x2="30" y2="10" />
            <path d="M16 18l3 3 6-6" stroke="#00c2cb" strokeWidth="2" />
            <line x1="28" y1="18" x2="32" y2="18" />
            <path d="M16 26l3 3 6-6" stroke="#00c2cb" strokeWidth="2" />
            <line x1="28" y1="26" x2="32" y2="26" />
            <path d="M16 34l3 3 6-6" stroke="#00c2cb" strokeWidth="2" />
            <line x1="28" y1="34" x2="32" y2="34" />
          </svg>
        </div>
      )
    },
    {
      id: 6,
      title: 'Watch our strategy videos for a better understanding of the PTE exam',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00c2cb] shadow-xs group-hover:scale-105 transition-transform duration-200">
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Video player screen with sparkles */}
            <rect x="8" y="10" width="32" height="24" rx="4" />
            <polygon points="21,17 31,22 21,27" fill="#00c2cb" stroke="none" />
            <path d="M38 7l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#00c2cb" stroke="none" />
            <path d="M9 36l0.8 1.5 1.5 0.8-1.5 0.8-0.8 1.5-0.8-1.5-1.5-0.8 1.5-0.8z" fill="#00c2cb" stroke="none" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c2cb] selection:text-white pb-12">
      
      {/* ========================================================================= */}
      {/* Fixed Sticky Right-Edge Pill: "Download Now"                              */}
      {/* ========================================================================= */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <a 
          href="#download-section"
          className="bg-[#00c2cb] hover:bg-[#00a8b5] text-white px-3.5 py-6 rounded-l-2xl font-black text-xs shadow-2xl transition-all flex flex-col items-center gap-2 group cursor-pointer border-y border-l border-cyan-200/50"
          style={{ writingMode: 'vertical-rl' }}
          aria-label="Download NinetyPTE Mobile App"
        >
          <span className="tracking-widest uppercase text-[12px] group-hover:tracking-wider transition-all">
            Download Now
          </span>
          <Download className="w-4 h-4 rotate-90 text-white stroke-[2.5]" />
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION & 3D DEVICE MOCKUPS (Page 1)                              */}
      {/* ========================================================================= */}
      <section className="relative pt-10 sm:pt-14 pb-14 bg-gradient-to-b from-sky-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Title */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              <span className="text-[#00c2cb]">PTE</span> Practice App for{' '}
              <span className="text-[#00c2cb]">Android & iOS</span>
            </h1>
          </div>

          {/* ===================================================================== */}
          {/* 3 Realistic Overlapping Mobile Mockup Screens                          */}
          {/* ===================================================================== */}
          <div className="relative max-w-4xl mx-auto mb-14 flex items-center justify-center py-4 select-none">
            
            {/* Left Phone: AI Score Feedback (Tilted -6deg, behind center) */}
            <div className="hidden md:block absolute left-4 lg:left-12 top-6 w-[250px] lg:w-[270px] bg-slate-900 rounded-[40px] p-2.5 shadow-2xl border-4 border-slate-700/60 -rotate-6 z-10 hover:rotate-0 transition-transform duration-300">
              <div className="w-20 h-3.5 bg-black rounded-full mx-auto mb-1.5" />
              
              <div className="bg-white rounded-[32px] p-3 text-[11px] space-y-2.5 overflow-hidden shadow-inner">
                {/* Header */}
                <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-slate-100">
                  <span className="font-mono">← #000765429</span>
                  <span className="font-semibold text-slate-700">Amanda Li</span>
                </div>

                {/* Score Summary Box */}
                <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-xs">AI SCORE</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-extrabold text-[9px]">
                      Speaking 80%
                    </span>
                  </div>
                  
                  {/* Circle Score Gauges */}
                  <div className="flex items-center justify-around py-1">
                    <div className="w-14 h-14 rounded-full border-4 border-[#00c2cb] flex flex-col items-center justify-center bg-cyan-50/60 shadow-xs">
                      <span className="text-base font-black text-slate-900 leading-none">80</span>
                      <span className="text-[8px] text-slate-500 font-bold">Speaking</span>
                    </div>
                    <div className="w-14 h-14 rounded-full border-4 border-teal-400 flex flex-col items-center justify-center bg-teal-50/60 shadow-xs">
                      <span className="text-base font-black text-slate-900 leading-none">75</span>
                      <span className="text-[8px] text-slate-500 font-bold">Reading</span>
                    </div>
                  </div>

                  {/* Enabling Skills */}
                  <div className="grid grid-cols-3 gap-1 text-center text-[9px] pt-1.5 border-t border-slate-200">
                    <div>
                      <div className="font-black text-slate-800">78</div>
                      <div className="text-slate-400 text-[8px]">Content</div>
                    </div>
                    <div>
                      <div className="font-black text-slate-800">82</div>
                      <div className="text-slate-400 text-[8px]">Fluency</div>
                    </div>
                    <div>
                      <div className="font-black text-slate-800">74</div>
                      <div className="text-slate-400 text-[8px]">Pronun.</div>
                    </div>
                  </div>
                </div>

                {/* Word Stats & Audio Transcript */}
                <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-200/80 text-[9px] space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Total Words: 59</span>
                    <span className="text-emerald-600">Good Words: 56</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-800 pt-0.5">Your Response:</div>
                  <p className="text-slate-600 leading-relaxed text-[8.5px] line-clamp-4">
                    The terms summary and abstract are often used interchangeably, causing considerable confusion. This problem is exacerbated because there are two distinct types of abstract: descriptive and informative. An abstract is sometimes called a synopsis; descriptive is not. The descriptive abstract usually only two or three sentences in length, hence it is not a substitute for the informative.
                  </p>
                </div>
              </div>
            </div>

            {/* Center Phone: Main Dashboard (Elevated Front & Center) */}
            <div className="relative w-[300px] sm:w-[320px] lg:w-[335px] bg-slate-950 rounded-[48px] p-3 shadow-2xl z-20 border-4 border-slate-800">
              {/* Dynamic Island Notch */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto mb-2 flex items-center justify-between px-2">
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00c2cb]/90"></div>
              </div>

              {/* Screen Canvas */}
              <div className="bg-slate-50 rounded-[38px] overflow-hidden p-3.5 text-slate-800 text-xs space-y-3 shadow-inner">
                
                {/* Top User Status Bar */}
                <div className="flex items-center justify-between text-[11px] pb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00c2cb] to-teal-400 text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                      AL
                    </div>
                    <div>
                      <div className="font-black text-slate-900 leading-tight">Amanda Li</div>
                      <div className="text-[9px] text-slate-400 font-mono">#000765429</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Search className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
                    <Share2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
                  </div>
                </div>

                {/* Exam Countdown Card */}
                <div className="bg-gradient-to-r from-sky-600 via-[#00c2cb] to-teal-500 rounded-2xl p-3 text-white text-center shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-100 flex items-center justify-center gap-1">
                    <span>Exam Countdown</span>
                    <span className="text-[11px]">ⓘ</span>
                  </div>
                  <div className="text-sm font-black tracking-tight mt-1 bg-white/20 backdrop-blur-xs py-1 px-2 rounded-xl inline-block">
                    02 <span className="text-[9px] font-normal">Days</span> 15 <span className="text-[9px] font-normal">Hours</span> 15 <span className="text-[9px] font-normal">Min</span> 15 <span className="text-[9px] font-normal">Sec</span>
                  </div>
                </div>

                {/* Prediction Questions Card */}
                <div className="bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 text-center">&lt; Prediction Questions &gt;</div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-lg font-black text-slate-900 font-mono">1517</span>
                    <span className="text-[10px] text-[#00c2cb] font-extrabold">50% Completed</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-gradient-to-r from-[#00c2cb] to-teal-400 rounded-full" />
                  </div>
                </div>

                {/* 4 Practice Modules Grid */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-0.5">
                    <span>Practice</span>
                    <span className="text-[#00c2cb] font-bold normal-case flex items-center gap-0.5 cursor-pointer">
                      Refresh Analytics ↺
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Speaking */}
                    <div className="bg-amber-50 border border-amber-100/90 rounded-xl p-2 text-center hover:bg-amber-100/50 transition">
                      <div className="w-5 h-5 mx-auto mb-0.5 text-amber-600 flex items-center justify-center">
                        <Mic className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="text-xs font-black text-amber-900">Speaking</div>
                      <div className="text-[9px] text-amber-700 font-medium">124/2428 Question</div>
                    </div>
                    {/* Writing */}
                    <div className="bg-sky-50 border border-sky-100/90 rounded-xl p-2 text-center hover:bg-sky-100/50 transition">
                      <div className="w-5 h-5 mx-auto mb-0.5 text-sky-600 flex items-center justify-center">
                        <PenTool className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="text-xs font-black text-sky-900">Writing</div>
                      <div className="text-[9px] text-sky-700 font-medium">123/724 Question</div>
                    </div>
                    {/* Reading */}
                    <div className="bg-emerald-50 border border-emerald-100/90 rounded-xl p-2 text-center hover:bg-emerald-100/50 transition">
                      <div className="w-5 h-5 mx-auto mb-0.5 text-emerald-600 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="text-xs font-black text-emerald-900">Reading</div>
                      <div className="text-[9px] text-emerald-700 font-medium">85/2429 Question</div>
                    </div>
                    {/* Listening */}
                    <div className="bg-indigo-50 border border-indigo-100/90 rounded-xl p-2 text-center hover:bg-indigo-100/50 transition">
                      <div className="w-5 h-5 mx-auto mb-0.5 text-indigo-600 flex items-center justify-center">
                        <Headphones className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="text-xs font-black text-indigo-900">Listening</div>
                      <div className="text-[9px] text-indigo-700 font-medium">180/4786 Question</div>
                    </div>
                  </div>
                </div>

                {/* Mock Tests Row */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-0.5">Mock Tests</div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50 border border-purple-100/80 text-purple-950 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-purple-600">📋</span>
                      <span>Full Mock Tests</span>
                    </span>
                    <span className="text-[10px] text-purple-600 font-mono font-bold">0/101 MTs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-teal-50 border border-teal-100/80 text-teal-950 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#00c2cb]">📑</span>
                      <span>Sectional Mock Tests</span>
                    </span>
                    <span className="text-[10px] text-teal-700 font-mono font-bold">0/184 SMTs</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Phone: Test Scorecard & Analytics (Tilted +6deg, behind center) */}
            <div className="hidden md:block absolute right-4 lg:right-12 top-6 w-[250px] lg:w-[270px] bg-slate-900 rounded-[40px] p-2.5 shadow-2xl border-4 border-slate-700/60 rotate-6 z-10 hover:rotate-0 transition-transform duration-300">
              <div className="w-20 h-3.5 bg-black rounded-full mx-auto mb-1.5" />
              
              <div className="bg-white rounded-[32px] p-3 text-[11px] space-y-2.5 overflow-hidden shadow-inner">
                {/* Header */}
                <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-slate-100">
                  <span className="font-semibold text-slate-800">Amanda Li</span>
                  <span className="font-mono text-[#00c2cb] font-bold">Scorecard</span>
                </div>

                {/* Overall Score Box */}
                <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-200/80 text-center space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Overall Score</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#00c2cb] text-white font-mono font-black text-xs">
                      10
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-1.5 pt-1 text-left text-[9px]">
                    <div className="flex justify-between items-center text-slate-700 font-semibold">
                      <span>Speaking</span>
                      <span className="font-mono text-slate-500">10 / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="w-[10%] h-full bg-[#00c2cb] rounded-full" />
                    </div>

                    <div className="flex justify-between items-center text-slate-700 font-semibold pt-0.5">
                      <span>Writing</span>
                      <span className="font-mono text-slate-500">14 / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="w-[14%] h-full bg-sky-500 rounded-full" />
                    </div>

                    <div className="flex justify-between items-center text-slate-700 font-semibold pt-0.5">
                      <span>Reading</span>
                      <span className="font-mono text-slate-500">10 / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="w-[10%] h-full bg-emerald-500 rounded-full" />
                    </div>

                    <div className="flex justify-between items-center text-slate-700 font-semibold pt-0.5">
                      <span>Listening</span>
                      <span className="font-mono text-slate-500">10 / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="w-[10%] h-full bg-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Score Comparison Bars */}
                <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-200/80 text-[9px] space-y-1.5">
                  <div className="font-bold text-slate-700 text-[10px]">Enabling Diagnostics</div>
                  <div className="flex items-end justify-between h-12 px-2 pt-2 border-b border-slate-200 text-center">
                    <div className="w-4 bg-amber-400 rounded-t h-[40%]" title="Grammar" />
                    <div className="w-4 bg-[#00c2cb] rounded-t h-[70%]" title="Oral Fluency" />
                    <div className="w-4 bg-teal-400 rounded-t h-[50%]" title="Pronunciation" />
                    <div className="w-4 bg-indigo-400 rounded-t h-[65%]" title="Spelling" />
                    <div className="w-4 bg-purple-400 rounded-t h-[80%]" title="Vocabulary" />
                  </div>
                  <div className="text-[8px] text-slate-400 text-center">Speaking · Reading · Listening</div>
                </div>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* Paragraph & 6 Arrow Bullets (Page 1)                                   */}
          {/* ===================================================================== */}
          <div className="max-w-4xl mx-auto space-y-6 pt-4">
            
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              We understand the importance of clearing the PTE exam for users. And to clear the exam, one needs to prepare for the <strong className="text-slate-900 font-semibold">PTE Academic / UKVI / Core</strong>. To give our users the power to prepare at their own pace and convenience, we have brought the smartest{' '}
              <Link to="/pte-practice" className="underline font-bold text-slate-900 decoration-[#00c2cb] hover:text-[#00c2cb] transition-colors">
                PTE practice
              </Link>{' '}
              portal to your smartphones in the form of NinetyPTE's PTE Practice App, where you can access all the NinetyPTE features on your phone from anywhere in the world.
            </p>

            {/* 6 Arrow Bullets with Cyan Arrows matching Page 1 */}
            <div className="space-y-3 pt-2">
              {[
                'One login/subscription will work uniformly on both the website and mobile app.',
                'The application is powered by the same AI scoring algorithm as www.ninetypte.com.',
                'The NinetyPTE mobile app is available in 24 languages to give our users an added advantage.',
                'The dark mode feature allows users to easily use the app even in low-light conditions.',
                'Improve your Listening skills on the go with the MP3 Practice feature.',
                'The application is available on the following platforms - iOS App and PTE Android App.'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <span className="shrink-0 text-[#00c2cb] font-black text-sm group-hover:translate-x-1 transition-transform">
                    ➤
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-normal leading-normal">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Store Download Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* App Store Badge */}
              <a
                href="#download-section"
                className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition active:scale-95"
              >
                <div className="text-2xl leading-none"></div>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-slate-300 font-medium">Download on the</div>
                  <div className="text-sm font-bold leading-tight font-sans">App Store</div>
                </div>
              </a>

              {/* Google Play Badge */}
              <a
                href="#download-section"
                className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition active:scale-95"
              >
                <div className="text-xl leading-none">▶</div>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-slate-300 font-medium">GET IT ON</div>
                  <div className="text-sm font-bold leading-tight font-sans">Google Play</div>
                </div>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "Need further assistance?" CHARACTER CARD (Page 1 Bottom)             */}
      {/* ========================================================================= */}
      <section className="py-10 bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f2f8fc] rounded-3xl p-6 sm:p-10 border border-sky-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
            
            {/* Left Graphic: Learner/Advisor with clipboard and headset */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* Custom SVG Illustration */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
                  {/* Soft Background Circle */}
                  <circle cx="80" cy="80" r="75" fill="#e0f2fe" />
                  
                  {/* Character Body (Torso with hoodie/collar) */}
                  <path d="M40 145c0-22 18-35 40-35s40 13 40 35" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                  
                  {/* Lanyard with Badge */}
                  <path d="M68 110l6 20h12l6-20" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                  <rect x="73" y="125" width="14" height="18" rx="2" fill="#00c2cb" stroke="#0f172a" strokeWidth="2" />
                  <line x1="76" y1="130" x2="84" y2="130" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="76" y1="134" x2="84" y2="134" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Neck */}
                  <rect x="73" y="90" width="14" height="22" rx="4" fill="#ffedd5" stroke="#0f172a" strokeWidth="3" />

                  {/* Head / Face */}
                  <ellipse cx="80" cy="70" rx="22" ry="25" fill="#fed7aa" stroke="#0f172a" strokeWidth="3" />
                  
                  {/* Hair */}
                  <path d="M58 68c0-16 10-28 26-28 15 0 24 10 24 22 0 4-2 6-5 6-3 0-5-3-5-3s-2 3-8 3-10-3-14-3c-8 0-14 6-18 3z" fill="#0f172a" />
                  <path d="M58 50c-10 0-14 8-10 16 3 6 10 8 10 8" fill="#0f172a" />

                  {/* Facial Features */}
                  <ellipse cx="73" cy="68" rx="2" ry="2.5" fill="#0f172a" />
                  <ellipse cx="87" cy="68" rx="2" ry="2.5" fill="#0f172a" />
                  <path d="M78 78q2 2 4 0" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M75 83q5 4 10 0" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

                  {/* Headset */}
                  <path d="M57 68c-2-12 8-26 23-26s25 14 23 26" stroke="#00c2cb" strokeWidth="3" fill="none" />
                  <rect x="55" y="66" width="5" height="12" rx="2" fill="#00c2cb" />
                  <rect x="99" y="66" width="5" height="12" rx="2" fill="#00c2cb" />
                  <path d="M60 74q12 12 20 8" stroke="#00c2cb" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="81" cy="82" r="3" fill="#0f172a" />

                  {/* Clipboard (Pink/Coral Card) */}
                  <g transform="translate(100, 75) rotate(-8)">
                    <rect x="0" y="0" width="44" height="60" rx="5" fill="#f87171" stroke="#0f172a" strokeWidth="2.5" />
                    {/* Metal clip */}
                    <rect x="13" y="-5" width="18" height="8" rx="2" fill="#94a3b8" stroke="#0f172a" strokeWidth="2" />
                    {/* Inner Paper */}
                    <rect x="4" y="6" width="36" height="48" rx="2" fill="#ffffff" />
                    {/* Checklist items */}
                    <rect x="8" y="12" width="6" height="6" rx="1" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
                    <path d="M9.5 15l1.5 1.5 3-3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="17" y1="15" x2="34" y2="15" stroke="#cbd5e1" strokeWidth="2" />

                    <rect x="8" y="24" width="6" height="6" rx="1" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
                    <path d="M9.5 27l1.5 1.5 3-3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="17" y1="27" x2="34" y2="27" stroke="#cbd5e1" strokeWidth="2" />

                    <rect x="8" y="36" width="6" height="6" rx="1" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
                    <path d="M9.5 39l1.5 1.5 3-3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="17" y1="39" x2="34" y2="39" stroke="#cbd5e1" strokeWidth="2" />
                  </g>
                  
                  {/* Pen / Hand */}
                  <g transform="translate(85, 105)">
                    <rect x="0" y="0" width="22" height="4" rx="2" fill="#0f172a" transform="rotate(-35)" />
                    <circle cx="10" cy="10" r="7" fill="#fed7aa" stroke="#0f172a" strokeWidth="2" />
                  </g>
                </svg>
              </div>

              {/* Text Info */}
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Need further assistance?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  Reach out to us with your questions.
                </p>
              </div>
            </div>

            {/* Right Action: Contact Us Pill Button */}
            <div>
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="px-8 py-3 rounded-lg bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition hover:shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
              >
                Contact Us
              </button>
            </div>

          </div>

          {/* Expandable Contact Form Modal/Drawer */}
          {contactOpen && (
            <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cyan-200 animate-in fade-in slide-in-from-top-2 duration-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-extrabold text-slate-900">Reach Out to NinetyPTE Support</h4>
                <button 
                  onClick={() => setContactOpen(false)} 
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {contactSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center border border-emerald-200">
                  ✓ Thank you! Our support team will get back to you within 2 business hours.
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="How can we help you with the NinetyPTE Mobile App?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold shadow-sm transition cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "How will the App help you?" SECTION (Page 2)                         */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Heading & Subtitle */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              How will the <span className="text-[#00c2cb]">App help you?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
              NinetyPTE's mobile app is a free-to-download{' '}
              <Link to="/pte-academic-ukvi-exam" className="underline font-bold text-slate-800 hover:text-[#00c2cb] transition-colors">
                PTE Academic / UKVI / Core
              </Link>{' '}
              practice app with AI scoring and offers the following features to the users:
            </p>
          </div>

          {/* 6 Feature Grid Cards matching Page 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto">
            {features.map((feat) => (
              <div 
                key={feat.id}
                className="bg-white rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center group transition duration-200 hover:-translate-y-1"
              >
                <div className="mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-slate-800 leading-snug max-w-xs">
                  {feat.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Lifetime PTE Downloads" METRICS (Page 2)                             */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#f4f9fd] border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Lifetime PTE <span className="text-[#00c2cb]">Downloads</span>
            </h2>
          </div>

          {/* 2 White Stat Cards matching Page 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto">
            
            {/* Android Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00c2cb] text-white mx-auto flex items-center justify-center shadow-xs">
                {/* Android Robot SVG Icon */}
                <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
                  <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.73 4.29 5.65 6.02 5.52 8h12.96c-.13-1.98-1.21-3.71-2.95-4.84zM9 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  1015799
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Android
                </div>
              </div>
            </div>

            {/* iOS Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00c2cb] text-white mx-auto flex items-center justify-center shadow-xs">
                {/* Apple Logo SVG Icon */}
                <svg viewBox="0 0 170 170" className="w-8 h-8 fill-white">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.98-5.77-8.91-10.26-19.16-13.46-30.74-3.21-11.59-4.81-22.65-4.81-33.19 0-14.89 3.69-27.18 11.07-36.87 7.38-9.69 16.74-14.65 28.09-14.88 4.9 0 10.22 1.37 15.96 4.1 5.74 2.74 9.69 4.18 11.85 4.33 1.74-.27 5.86-1.78 12.35-4.55 6.49-2.76 12.08-3.96 16.78-3.59 13.72.78 24.37 5.78 31.97 15-11.97 7.28-17.84 17.2-17.61 29.74.23 9.9 4.09 18.25 11.57 25.04 7.48 6.8 16.48 10.74 27 11.83-2.39 7.4-5.34 14.76-8.85 22.08zM119.22 31.84c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.97-10.49 20.02-12.3 0 .97.08 2.07.24 3.3.16 1.23.24 2.23.24 3 0 7.28-2.83 14.38-8.49 21.3-5.66 6.92-12.56 11.07-20.7 12.44-.22-1.3-.4-2.43-.54-3.39-.14-.96-.22-1.85-.22-2.68z" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  658963
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  iOS
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. "Download PTE Practice App for free today" (Page 2)                   */}
      {/* ========================================================================= */}
      <section id="download-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Download PTE Practice <span className="text-[#00c2cb]">App for free today</span>
          </h2>

          {/* High-Resolution QR Code */}
          <div className="inline-block p-4 sm:p-5 bg-white rounded-3xl border border-slate-200 shadow-lg">
            <div className="w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-2xl p-2 flex flex-col items-center justify-center">
              {/* Clean Crisp QR Matrix SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                {/* Top-Left Corner Box */}
                <rect x="5" y="5" width="28" height="28" rx="3" fill="#0f172a" />
                <rect x="9" y="9" width="20" height="20" rx="1.5" fill="#ffffff" />
                <rect x="13" y="13" width="12" height="12" rx="1" fill="#0f172a" />

                {/* Top-Right Corner Box */}
                <rect x="67" y="5" width="28" height="28" rx="3" fill="#0f172a" />
                <rect x="71" y="9" width="20" height="20" rx="1.5" fill="#ffffff" />
                <rect x="75" y="13" width="12" height="12" rx="1" fill="#0f172a" />

                {/* Bottom-Left Corner Box */}
                <rect x="5" y="67" width="28" height="28" rx="3" fill="#0f172a" />
                <rect x="9" y="71" width="20" height="20" rx="1.5" fill="#ffffff" />
                <rect x="13" y="75" width="12" height="12" rx="1" fill="#0f172a" />

                {/* Micro QR Pixel Dots */}
                <rect x="38" y="8" width="4" height="4" />
                <rect x="46" y="8" width="4" height="4" />
                <rect x="54" y="8" width="4" height="4" />
                
                <rect x="38" y="16" width="4" height="4" />
                <rect x="50" y="16" width="4" height="4" />
                <rect x="58" y="16" width="4" height="4" />

                <rect x="42" y="24" width="4" height="4" />
                <rect x="50" y="24" width="4" height="4" />
                <rect x="58" y="24" width="4" height="4" />

                <rect x="8" y="38" width="4" height="4" />
                <rect x="16" y="38" width="4" height="4" />
                <rect x="24" y="38" width="4" height="4" />
                <rect x="36" y="38" width="4" height="4" />
                <rect x="44" y="38" width="4" height="4" />
                <rect x="56" y="38" width="4" height="4" />
                <rect x="68" y="38" width="4" height="4" />
                <rect x="76" y="38" width="4" height="4" />
                <rect x="84" y="38" width="4" height="4" />

                <rect x="8" y="46" width="4" height="4" />
                <rect x="20" y="46" width="4" height="4" />
                <rect x="32" y="46" width="4" height="4" />
                {/* Center NinetyPTE Badge Accent */}
                <circle cx="48" cy="48" r="5" fill="#00c2cb" />
                <rect x="64" y="46" width="4" height="4" />
                <rect x="76" y="46" width="4" height="4" />
                <rect x="88" y="46" width="4" height="4" />

                <rect x="12" y="54" width="4" height="4" />
                <rect x="24" y="54" width="4" height="4" />
                <rect x="36" y="54" width="4" height="4" />
                <rect x="56" y="54" width="4" height="4" />
                <rect x="68" y="54" width="4" height="4" />
                <rect x="80" y="54" width="4" height="4" />

                <rect x="38" y="68" width="4" height="4" />
                <rect x="46" y="68" width="4" height="4" />
                <rect x="58" y="68" width="4" height="4" />
                <rect x="70" y="68" width="4" height="4" />
                <rect x="82" y="68" width="4" height="4" />

                <rect x="42" y="76" width="4" height="4" />
                <rect x="54" y="76" width="4" height="4" />
                <rect x="66" y="76" width="4" height="4" />
                <rect x="78" y="76" width="4" height="4" />

                <rect x="38" y="84" width="4" height="4" />
                <rect x="50" y="84" width="4" height="4" />
                <rect x="62" y="84" width="4" height="4" />
                <rect x="74" y="84" width="4" height="4" />
                <rect x="86" y="84" width="4" height="4" />
              </svg>
            </div>
            <div className="text-[10px] font-bold text-slate-400 mt-2">
              Scan to install NinetyPTE App
            </div>
          </div>

          {/* Store Badges matching Page 2 (Google Play on Left, App Store on Right) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Google Play */}
            <a
              href="#google-play-download"
              className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition active:scale-95"
            >
              <div className="text-xl leading-none">▶</div>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-slate-300 font-medium">GET IT ON</div>
                <div className="text-sm font-bold leading-tight font-sans">Google Play</div>
              </div>
            </a>

            {/* App Store */}
            <a
              href="#app-store-download"
              className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition active:scale-95"
            >
              <div className="text-2xl leading-none"></div>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-slate-300 font-medium">Download on the</div>
                <div className="text-sm font-bold leading-tight font-sans">App Store</div>
              </div>
            </a>
          </div>

          {/* Email Link Form */}
          <div className="max-w-md mx-auto pt-2">
            <form onSubmit={handleGetLink} className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter Your Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full sm:flex-1 px-4 py-3 rounded-full border border-slate-300 focus:border-[#00c2cb] focus:outline-hidden text-xs text-slate-800 shadow-xs placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition whitespace-nowrap cursor-pointer"
              >
                Get Link
              </button>
            </form>

            {linkSent && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl animate-in fade-in">
                ✓ Download link has been sent to your email!
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}