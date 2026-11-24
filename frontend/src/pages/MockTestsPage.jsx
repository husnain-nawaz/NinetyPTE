import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Play, 
  Headphones, 
  Mic, 
  FileText, 
  BookOpen, 
  Cpu, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Rocket, 
  Check, 
  UserCheck, 
  Grid,
  ChevronLeft,
  ChevronRight,
  Info,
  HelpCircle,
  RotateCcw,
  Sliders,
  Zap,
  Globe
} from 'lucide-react';

export default function MockTestsPage() {
  // Navigation Jump Links (Page 1)
  const quickNav = [
    { label: 'Mock Tests', href: '#mock-tests-list' },
    { label: 'Features', href: '#features' },
    { label: 'Steps', href: '#steps' },
    { label: 'AI Scoring', href: '#ai-scoring' },
    { label: 'Success Stories', href: '#success-stories' },
    { label: 'FAQ', href: '#faq' }
  ];

  // Module Filter Tabs (Page 1)
  const [activeModuleFilter, setActiveModuleFilter] = useState('full');

  // Interactive Scorecard Carousel (Page 6)
  const [activeScorecardIdx, setActiveScorecardIdx] = useState(1);

  // FAQ Accordion State (Page 7)
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Custom Test Builder Interactive State (Page 4)
  const [builderFilterType, setBuilderFilterType] = useState('prediction'); // 'all' | 'prediction' | 'new'

  // Mock Test Cards Data (Pages 1 & 2)
  const mockTestList = [
    {
      id: 0,
      title: 'Free Mock Test',
      badge: '✦ FREE ACCESS',
      desc: 'Complete PTE Exam Mock Test',
      duration: 'Approx. 2 Hour Exam',
      sections: 'All 4 PTE Modules',
      btnText: 'Start Free Mock Test',
      isFree: true,
      category: 'full'
    },
    {
      id: 1,
      title: 'Mock Test - 1',
      badge: '★ PREMIUM',
      desc: 'Complete PTE Mock Exam',
      duration: '2 hours duration',
      sections: '4 Main sections',
      btnText: 'Sign Up',
      isFree: false,
      category: 'full'
    },
    {
      id: 2,
      title: 'Mock Test - 2',
      badge: '★ PREMIUM',
      desc: 'Complete PTE Mock Exam',
      duration: '2 hours duration',
      sections: '4 Main sections',
      btnText: 'Sign Up',
      isFree: false,
      category: 'full'
    },
    {
      id: 3,
      title: 'Mock Test - 3',
      badge: '★ PREMIUM',
      desc: 'Complete PTE Mock Exam',
      duration: '2 hours duration',
      sections: '4 Main sections',
      btnText: 'Sign Up',
      isFree: false,
      category: 'full'
    },
    {
      id: 4,
      title: 'Mock Test - 4',
      badge: '★ PREMIUM',
      desc: 'Complete PTE Mock Exam',
      duration: '2 hours duration',
      sections: '4 Main sections',
      btnText: 'Sign Up',
      isFree: false,
      category: 'full'
    },
    {
      id: 5,
      title: 'Mock Test - 5',
      badge: '★ PREMIUM',
      desc: 'Complete PTE Mock Exam',
      duration: '2 hours duration',
      sections: '4 Main sections',
      btnText: 'Sign Up',
      isFree: false,
      category: 'full'
    },
    {
      id: 6,
      title: 'Mock Test - 6',
      badge: '★ PREMIUM',
      desc: 'Complete PTE Mock Exam',
      duration: '2 hours duration',
      sections: '4 Main sections',
      btnText: 'Sign Up',
      isFree: false,
      category: 'full'
    }
  ];

  // 3 Student Scorecards (Page 6)
  const scorecards = [
    {
      name: 'Mansi Patel',
      testId: 'PTE-ACAD-78910',
      overall: 86,
      listening: 77,
      reading: 84,
      speaking: 88,
      writing: 90,
      center: 'Melbourne Center, VIC',
      country: 'Australia'
    },
    {
      name: 'Pooja Bansal',
      testId: 'PTE-ACAD-90412',
      overall: 90,
      listening: 84,
      reading: 90,
      speaking: 88,
      writing: 90,
      center: 'Sydney Test Center, NSW',
      country: 'Australia'
    },
    {
      name: 'Wei Chen',
      testId: 'PTE-ACAD-65123',
      overall: 80,
      listening: 77,
      reading: 84,
      speaking: 88,
      writing: 90,
      center: 'Adelaide Central, SA',
      country: 'Australia'
    }
  ];

  // FAQs Data (Page 7)
  const faqs = [
    {
      q: 'What are full and sectional PTE Exam Mock Tests?',
      a: 'Full Mock Tests replicate the entire PTE exam experience with all four modules (Speaking, Writing, Reading, and Listening) evaluated under official timed conditions. Sectional Mock Tests focus exclusively on one specific module, allowing targeted practice for areas that need score enhancement.',
      icon: <Info className="w-4 h-4 text-cyan-600" />
    },
    {
      q: 'How similar are NinetyPTE Exam Mock Tests to the real PTE exam?',
      a: 'NinetyPTE mock tests strictly match the Pearson PTE Academic & UKVI format, screen layouts, countdown timers, microphone recording triggers, and difficulty distribution to ensure zero surprise on exam day.',
      icon: <BookOpen className="w-4 h-4 text-cyan-600" />
    },
    {
      q: 'Are NinetyPTE Exam Mock Test scores accurate and how close are they to the actual PTE score?',
      a: 'NinetyPTE utilizes proprietary machine learning algorithms trained on millions of official Pearson responses. Scores for Oral Fluency, Pronunciation, Grammar, and Vocabulary closely correlate with actual Pearson test scores within a ±2 to 3 point margin.',
      icon: <BarChart3 className="w-4 h-4 text-cyan-600" />
    },
    {
      q: 'How quickly will I receive my mock test results and score reports?',
      a: 'Score reports are generated instantly by our automated AI scoring engine upon test completion, typically available within 2 to 3 minutes on your student dashboard.',
      icon: <CheckCircle2 className="w-4 h-4 text-cyan-600" />
    },
    {
      q: 'What analytics and feedback do NinetyPTE Exam Mock Tests provide?',
      a: 'You receive granular diagnostic feedback including speech waveforms, pause analysis, oral fluency cadence, grammar and spelling error highlights, content keyword coverage, and tailored study recommendations.',
      icon: <Zap className="w-4 h-4 text-cyan-600" />
    },
    {
      q: 'Can I reattempt mock tests and share my score reports?',
      a: 'Yes! All your attempts are saved in your personal dashboard. You can reattempt tests, compare progression graphs over time, and download or share verified scorecards with your tutor or institution.',
      icon: <Clock className="w-4 h-4 text-cyan-600" />
    },
    {
      q: 'What is the "Create Your Own Mock Test" feature?',
      a: 'This exclusive NinetyPTE capability allows you to build custom sectional or multi-task practice sessions. You can choose specific tasks, select prediction question pools, filter out previously practiced items, and set custom time parameters.',
      icon: <RotateCcw className="w-4 h-4 text-cyan-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white pb-16">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="pt-8 pb-14 bg-gradient-to-b from-cyan-50/40 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          {/* Header Title Box */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold border border-cyan-100">
              <Sparkles className="w-3.5 h-3.5 fill-[#00c2cb]" />
              <span>✦ PTE Mock Test</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
              Free <span className="text-[#00c2cb]">PTE Academic / UKVI</span> Mock Tests <br />
              Real Exam Experience with Instant Results!
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              Take PTE Full & Sectional Mock Tests Online - Start Practicing Now!
            </p>
          </div>

          {/* Hero Visual Mockup Container (Laptop & Mobile & Unique Feature Badge) */}
          <div className="relative max-w-5xl mx-auto mt-6">
            
            {/* Main Desktop Interface Preview */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-4 sm:p-6 relative overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="ml-2 text-xs font-bold text-slate-400">NinetyPTE Mock Test Portal</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-[#00c2cb]">Full Mock Test</span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500">Timed Sectional Mock Test</span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500">Sectional Mock Test</span>
                </div>
              </div>

              {/* Portal Content Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
                
                {/* Scorecard Gauge Preview */}
                <div className="md:col-span-5 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MOCK TEST SCORECARD</div>
                      <div className="text-sm font-extrabold text-slate-900">Amanda Li</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#00c2cb] text-white flex flex-col items-center justify-center font-black shadow-sm">
                      <span className="text-base leading-none">70</span>
                      <span className="text-[8px] uppercase tracking-tighter">Overall</span>
                    </div>
                  </div>

                  {/* 4 Skill Gauges */}
                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[10px] font-bold text-sky-600">68</div>
                      <div className="text-[8px] text-slate-400 font-semibold">Listening</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[10px] font-bold text-emerald-600">69</div>
                      <div className="text-[8px] text-slate-400 font-semibold">Reading</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[10px] font-bold text-orange-600">74</div>
                      <div className="text-[8px] text-slate-400 font-semibold">Speaking</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <div className="text-[10px] font-bold text-cyan-600">69</div>
                      <div className="text-[8px] text-slate-400 font-semibold">Writing</div>
                    </div>
                  </div>
                </div>

                {/* Test Selector Table Preview */}
                <div className="md:col-span-7 space-y-2 text-xs">
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">AVAILABLE TESTS</div>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Mock Test - February Week #2', q: '72 Questions', time: '2h 15m', badge: 'Active' },
                      { name: 'Mock Test - February Week #1', q: '72 Questions', time: '2h 15m', badge: 'Available' },
                      { name: 'Mock Test - January Week #4', q: '72 Questions', time: '2h 15m', badge: 'Available' }
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition">
                        <div>
                          <div className="font-extrabold text-slate-900">{row.name}</div>
                          <div className="text-[10px] text-slate-500">{row.q} • {row.time}</div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-[#00c2cb]">
                          {row.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Floating Callout Card: Create Your Own Mock Test (Unique Feature) */}
            <div className="sm:absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-200/90 max-w-sm mt-4 sm:mt-0 z-20">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-cyan-100 text-[#00c2cb] flex items-center justify-center text-xs">
                  ✨
                </span>
                <span className="font-black text-xs text-slate-900">Create Your Own Mock Test</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-[#00c2cb] text-[9px] font-extrabold uppercase border border-cyan-200">
                  Unique Feature
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Customize your learning experience, select topics, difficulty levels, and time limits to build a test that targets your specific needs.
              </p>
            </div>

          </div>

          {/* Primary CTA Button */}
          <div className="text-center pt-8">
            <a
              href="#mock-tests-list"
              className="inline-block px-8 py-3 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
            >
              Take a PTE Free Mock Test Today
            </a>
          </div>

          {/* Subnav Anchor Bar */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 p-1.5 bg-white rounded-full border border-slate-200 shadow-2xs text-xs font-bold text-slate-600">
              {quickNav.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full transition ${
                    idx === 0 
                      ? 'bg-[#00c2cb] text-white shadow-xs' 
                      : 'hover:text-cyan-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 200+ FREE & PREMIUM MOCK TESTS GRID (Pages 1 & 2)                      */}
      {/* ========================================================================= */}
      <section id="mock-tests-list" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              200+ Free PTE Exam Mock Tests – <span className="text-[#00c2cb]">Full & Sectional Online Practice</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Get accurate AI scoring, detailed feedback, and exam-level practice in one platform.
            </p>
          </div>

          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'full', label: 'Full Mock Test', icon: <Grid className="w-3.5 h-3.5" /> },
              { id: 'speaking', label: 'Speaking', icon: <Mic className="w-3.5 h-3.5" /> },
              { id: 'writing', label: 'Writing', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'reading', label: 'Reading', icon: <BookOpen className="w-3.5 h-3.5" /> },
              { id: 'listening', label: 'Listening', icon: <Headphones className="w-3.5 h-3.5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveModuleFilter(tab.id)}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                  activeModuleFilter === tab.id
                    ? 'bg-[#00c2cb] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Grid of Mock Test Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Free Mock Test Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-[#00c2cb] shadow-sm flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-[#00c2cb] font-extrabold text-[10px] tracking-wider uppercase border border-cyan-200">
                  ✦ FREE ACCESS
                </span>
                <div>
                  <h3 className="font-black text-lg text-slate-900">Free Mock Test</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Complete PTE Exam Mock Test</p>
                </div>
                <div className="space-y-2 pt-2 text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-600" />
                    <span>Approx. 2 Hour Exam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-600" />
                    <span>All 4 PTE Modules</span>
                  </div>
                </div>
              </div>

              <Link
                to="/signup"
                className="w-full py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-center text-xs shadow-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Start Free Mock Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Premium Mock Test Cards 1-6 */}
            {mockTestList.slice(1).map((test) => (
              <div 
                key={test.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-600 font-extrabold text-[10px] tracking-wider uppercase border border-purple-200">
                    ★ PREMIUM
                  </span>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">{test.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{test.desc}</p>
                  </div>
                  <div className="space-y-2 pt-2 text-xs text-slate-600 font-semibold">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span>{test.sections}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/signup"
                  className="w-full py-2.5 rounded-full border border-cyan-300 text-[#00c2cb] hover:bg-cyan-50 font-extrabold text-center text-xs shadow-2xs transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

            {/* 8th Card: 200+ Premium Mock Tests Explore Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                  🚀
                </div>
                <h3 className="font-black text-xl text-white">200+ Premium Mock Tests</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Practice with real exam-style mock tests, accurate AI scoring, and detailed performance feedback.
                </p>
              </div>

              <Link
                to="/pricing"
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-center text-xs shadow-md transition flex items-center justify-center gap-1 relative z-10 cursor-pointer"
              >
                <span>Explore all</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. READY TO TAKE OUR PTE FREE MOCK TEST? BANNER (Page 2)                  */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            <div className="space-y-3 max-w-xl z-10">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                Ready to take our <br />
                <span className="text-[#00c2cb]">PTE Free Mock Test?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Get access to comprehensive study materials, practice tests, and expert guidance to help you succeed in the PTE Academic/UKVI.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-block px-7 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-slate-100 transition active:scale-95 cursor-pointer"
                >
                  Register Now
                </Link>
              </div>
            </div>

            {/* Dark UI Preview Card with Score 90 */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-2xl flex items-center gap-4 z-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-[#00c2cb] flex flex-col items-center justify-center font-black">
                <span className="text-xl leading-none">90</span>
                <span className="text-[8px] uppercase tracking-wider text-slate-400">Score</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-white">
                  <span>PTE Practice & Mock</span>
                  <span>🚀</span>
                </div>
                <div className="text-[10px] text-slate-400">Authentic Scoring Algorithm</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY TAKE NINETYPTE'S MOCK TESTS? (Pages 2, 3, 4)                       */}
      {/* ========================================================================= */}
      <section id="features" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why take NinetyPTE's Mock tests for a <span className="text-[#00c2cb]">higher PTE score?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              NinetyPTE's mock tests are designed to give you a realistic, targeted, and effective preparation experience.
            </p>
          </div>

          {/* Timeline Feature 1: Real PTE Exam Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00c2cb]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb]"></span>
                <span>AUTHENTIC SIMULATION</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Real PTE <span className="text-[#00c2cb]">Exam Experience</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Mock tests at NinetyPTE replicate the exact official PTE exam interface, structure, and timings, allowing you to practice in a real-exam-like environment. This will help you build confidence, enabling you to reduce anxiety and perform better on test day.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-block px-7 py-2.5 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Test UI Mockup */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-bold text-slate-600">
                <span className="text-[#00c2cb]">NinetyPTE - Free Mock Test</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-[#00c2cb] text-[10px]">TIME: 00:43</span>
              </div>

              {/* Countdown circle preview */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 text-center space-y-3">
                <div className="w-16 h-16 rounded-full border-4 border-orange-400 text-orange-600 flex items-center justify-center font-black text-xl mx-auto">
                  33
                </div>
                <div className="text-xs font-bold text-slate-800">Preparing to Record</div>
                <div className="text-[10px] text-slate-400">Recording starts in 33 sec</div>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-cyan-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                  <span>MICROPHONE ACTIVE</span>
                </div>
                <p className="text-[11px] text-slate-600 italic max-w-md mx-auto pt-2">
                  "Pets provide incredible comfort, companionship, and reduce stress, but they are a long-term commitment. To get a pet in this locality, you are legally required to microchip and register all dogs and cats over three months old with the city council office by April 10 each year."
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs cursor-pointer">
                  Save Question
                </button>
                <button className="px-5 py-1.5 rounded-xl bg-[#00c2cb] text-white font-bold text-xs cursor-pointer">
                  Next Question
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Feature 2: Highly Accurate AI Scoring */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            
            {/* Scorecard Preview */}
            <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">NINETYPTE SCORE REPORT</span>
                <span className="text-xs font-black text-[#00c2cb]">Target 79+</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-base text-slate-900">Amanda Li</div>
                  <div className="text-xs text-slate-400">New Pattern Mock Test - #10 • Test Date: 10/11/2023</div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#00c2cb] text-white flex flex-col items-center justify-center font-black shadow-sm">
                  <span className="text-xl leading-none">70</span>
                  <span className="text-[8px] uppercase">Overall</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 pt-2 text-center">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-lg font-black text-sky-600">68</div>
                  <div className="text-[10px] font-bold text-slate-600">Listening</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-lg font-black text-emerald-600">69</div>
                  <div className="text-[10px] font-bold text-slate-600">Reading</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-lg font-black text-orange-600">74</div>
                  <div className="text-[10px] font-bold text-slate-600">Speaking</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="text-lg font-black text-cyan-600">69</div>
                  <div className="text-[10px] font-bold text-slate-600">Writing</div>
                </div>
              </div>
            </div>

            {/* Feature Content */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00c2cb]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb]"></span>
                <span>INSTANT DIAGNOSTICS</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Highly <span className="text-[#00c2cb]">Accurate AI Scoring</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                NinetyPTE's advanced AI scoring system for PTE mirrors Pearson's official algorithm, giving you an instant and reliable result. Every mock test score accurately reflects your performance across all 4 modules – helping you track your progress & improve effectively.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-block px-7 py-2.5 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                >
                  Join Now
                </Link>
              </div>
            </div>

          </div>

          {/* Timeline Feature 3: Master in Time Management */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00c2cb]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb]"></span>
                <span>SECTION PACING</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Master in <span className="text-[#00c2cb]">Time Management</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                With NinetyPTE's mock test mimicking the exact timing structure of the real exam, you will develop your time management skills, ensuring that you complete all questions efficiently within the exam's strict time limits. You will learn to stay calm and focused even under pressure.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-block px-7 py-2.5 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Timed Sectional Preview Card */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                <span className="font-bold text-slate-800">TIMED SECTIONAL MOCK TEST</span>
                <span className="text-[#00c2cb] font-semibold">Amanda Li • Timed Writing - 2</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-700">#24000431 Coffee Shop</span>
                  <span className="text-emerald-600 font-bold">13.00/15.00 • AI Score</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-700">#22000118 Attract Young People to the Local Library</span>
                  <span className="text-emerald-600 font-bold">11.00/15.00 • AI Score</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-700">#23000123 Healthier Lifestyles</span>
                  <span className="text-emerald-600 font-bold">10.00/15.00 • AI Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Feature 4: Identify your Strengths & Weaknesses */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            {/* Feedback Graphic */}
            <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-3">
              <div className="text-xs font-bold text-slate-700 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>AI Score Report Analysis</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-[#00c2cb] text-[10px] font-bold">Proficient</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                    68
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Listening Analysis</div>
                    <div className="text-[11px] text-slate-500">Focus on improving your pronunciation, fluency, and content to achieve higher scores. Avoid repeating words.</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                    69
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Writing Analysis</div>
                    <div className="text-[11px] text-slate-500">Focus on improving spelling, grammar, and content. Avoid simple copy-pasting or keyword templates.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00c2cb]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb]"></span>
                <span>GAP ANALYSIS</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Identify your <span className="text-[#00c2cb]">Strengths & Weaknesses</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Comprehensive score breakdowns and analytics will make it easy for you to understand the areas in which you excelled and the areas where you need more focus. These insights will help you to plan your preparation strategically and improve faster.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-block px-7 py-2.5 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>

          {/* Timeline Feature 5: Create Your Own Mock Test (Page 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-cyan-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-black text-[#00c2cb] uppercase">Create Your Own Mock Test</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#00c2cb] text-[10px] font-bold">Interactive Tool</span>
              </div>

              {/* Tasks Picker Mockup */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-orange-50/50 border border-orange-100">
                  <div className="font-bold text-orange-700">Speaking</div>
                  <div className="text-[10px] text-slate-500 mt-1">Read Aloud (07/07) ✓</div>
                  <div className="text-[10px] text-slate-500">Repeat Sentence ✓</div>
                </div>
                <div className="p-2.5 rounded-xl bg-cyan-50/50 border border-cyan-100">
                  <div className="font-bold text-cyan-700">Writing</div>
                  <div className="text-[10px] text-slate-500 mt-1">Summarize Text ✓</div>
                  <div className="text-[10px] text-slate-500">Write Essay ✓</div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <div className="font-bold text-emerald-700">Reading</div>
                  <div className="text-[10px] text-slate-500 mt-1">R&W Blanks (05/05) ✓</div>
                  <div className="text-[10px] text-slate-500">Re-order Paras ✓</div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
                  <div className="font-bold text-blue-700">Listening</div>
                  <div className="text-[10px] text-slate-500 mt-1">Summarize Spoken ✓</div>
                  <div className="text-[10px] text-slate-500">Write From Dictation ✓</div>
                </div>
              </div>

              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setBuilderFilterType('all')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${builderFilterType === 'all' ? 'bg-[#00c2cb] text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    All Qs
                  </button>
                  <button 
                    onClick={() => setBuilderFilterType('prediction')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${builderFilterType === 'prediction' ? 'bg-[#00c2cb] text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    Prediction Qs
                  </button>
                  <button 
                    onClick={() => setBuilderFilterType('new')}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${builderFilterType === 'new' ? 'bg-[#00c2cb] text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    New Qs
                  </button>
                </div>
                <button className="px-5 py-1.5 rounded-full bg-[#11223b] text-white font-bold text-xs cursor-pointer">
                  Update Test
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00c2cb]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb]"></span>
                <span>CUSTOMIZATION</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Create Your <span className="text-[#00c2cb]">Own Mock Test</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Customize your preparation with NinetyPTE's unique "Create Your Own Mock Test" feature. You can select the questions you want in your mock test, allowing you to have a fully personalized test experience tailored to your preparation goals.
              </p>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-block px-7 py-2.5 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW TO TAKE OUR MOCK TESTS - 5 SIMPLE STEPS (Page 5)                   */}
      {/* ========================================================================= */}
      <section id="steps" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              To Take Our PTE Academic / UKVI Mock Tests, <span className="text-[#00c2cb]">Follow These Simple Steps</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Get started in five simple steps and receive instant performance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: 'Step : 1',
                title: 'Register on our website',
                desc: 'Create your account with NinetyPTE.',
                icon: <UserCheck className="w-5 h-5 text-cyan-600" />
              },
              {
                step: 'Step : 2',
                title: 'Go to the mock test section',
                desc: 'Navigate to full or sectional tests.',
                icon: <Layers className="w-5 h-5 text-cyan-600" />
              },
              {
                step: 'Step : 3',
                title: 'Start any available test',
                desc: 'Free full & sectional mock tests.',
                icon: <Clock className="w-5 h-5 text-cyan-600" />
              },
              {
                step: 'Step : 4',
                title: 'Complete within time',
                desc: 'Answer within specified duration.',
                icon: <Sliders className="w-5 h-5 text-cyan-600" />
              },
              {
                step: 'Step : 5',
                title: 'Receive your score report',
                desc: 'AI-powered scorecard instantly upon completion.',
                icon: <Award className="w-5 h-5 text-cyan-600" />
              }
            ].map((st, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mx-auto text-[#00c2cb]">
                  {st.icon}
                </div>
                <div className="text-xs font-black text-[#00c2cb] uppercase tracking-wider">{st.step}</div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{st.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/signup"
              className="inline-block px-8 py-3 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
            >
              Start Now
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW NINETYPTE AI SCORING WORKS & RADAR GRAPHIC (Page 5)                */}
      {/* ========================================================================= */}
      <section id="ai-scoring" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How NinetyPTE AI Scoring <span className="text-[#00c2cb]">Works in the Mock tests</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Result = All checked PTE Defined Parameters & Logic
            </p>
          </div>

          {/* AI Circular Architecture / Radar View */}
          <div className="max-w-4xl mx-auto bg-slate-50/70 rounded-3xl p-8 border border-slate-200/80 shadow-xs relative">
            
            <div className="text-center max-w-md mx-auto mb-8 space-y-1">
              <h4 className="font-black text-sm text-[#00c2cb] uppercase tracking-wide">
                AI Response Evaluation
              </h4>
              <p className="text-xs text-slate-500">
                Our AI assesses your answers using real PTE exam scoring parameters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              
              {/* Speaking Analysis */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                  <Mic className="w-5 h-5" />
                </div>
                <h5 className="font-extrabold text-xs text-slate-900">Speaking Analysis</h5>
                <div className="flex flex-wrap justify-center gap-1.5 pt-1 text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Pronunciation</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Fluency</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Content</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Accuracy</span>
                </div>
              </div>

              {/* Writing Assessment */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <FileText className="w-5 h-5" />
                </div>
                <h5 className="font-extrabold text-xs text-slate-900">Writing Assessment</h5>
                <div className="flex flex-wrap justify-center gap-1 text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Content</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Grammar</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Spellings</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Vocabulary</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Form</span>
                </div>
              </div>

              {/* Reading & Listening */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Headphones className="w-5 h-5" />
                </div>
                <h5 className="font-extrabold text-xs text-slate-900">Reading & Listening</h5>
                <p className="text-[11px] text-slate-500 pt-1">
                  Auto-scored for <strong className="text-cyan-700">Correctness, Logic</strong>, and Completeness.
                </p>
              </div>

            </div>

          </div>

          {/* New Format Dark Blue Announcement Banner (Page 5) */}
          <div className="rounded-3xl bg-[#091b33] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider">
                ⚡ NEW
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                New PTE Academic / UKVI Format – Mock Tests Now Available
              </h3>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Prepare with full-length mock tests designed as per the latest PTE format, including the 2 newly added question types.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-cyan-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Aligned with the changes effective 7th August 2025</span>
              </div>
            </div>

            <Link
              to="/signup"
              className="px-7 py-3 rounded-full bg-white text-[#091b33] hover:bg-slate-100 font-extrabold text-xs shadow-md shrink-0 transition cursor-pointer"
            >
              Take A New Format Mock Test Today →
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HOW TO PREPARE WITH OUR FREE MOCK TEST (Pages 5 & 6)                   */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How to Prepare with Our <span className="text-[#00c2cb]">PTE Free Mock Test?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              To get the most out of our PTE full mock test with answers, we recommend that you:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Student Photo Card (Page 6) */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Student preparing for PTE Academic"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* 5 Bullet Points with cyan dots (Page 6) */}
            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-600">
              {[
                'Review the test format and instructions carefully before taking the PTE free mock test',
                "Practice with authentic materials and sample questions from NinetyPTE's website & mobile app",
                'Use a variety of resources and strategies to improve your English skills, such as reading newspapers, listening to podcasts, watching videos, writing essays, etc.',
                'Take advantage of our free practice tests and section-wise tests that cover each skill separately',
                'Seek tailored feedback from our AI-based score analytics generator'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb] shrink-0 mt-1"></span>
                  <p className="leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. REMARKABLE SUCCESS OF OUR TEST TAKERS - 3 SCORECARDS (Page 6)          */}
      {/* ========================================================================= */}
      <section id="success-stories" className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Remarkable Success of <span className="text-[#00c2cb]">Our PTE Test Takers</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Master the Pearson's Test of English with the most advanced <strong>PTE practice platform</strong> designed to mirror the actual exam environment. Our platform empowers students with AI-scored PTE Exam mock tests, real exam questions, and instant feedback.
            </p>
          </div>

          {/* 3 Real Pearson-style Scorecards Grid / Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scorecards.map((sc, idx) => (
              <div 
                key={idx}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 shadow-md ${
                  idx === activeScorecardIdx ? 'ring-2 ring-[#00c2cb] scale-102' : 'border-slate-200/90'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-black text-xs flex items-center justify-center">
                      {sc.name[0]}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900">{sc.name}</div>
                      <div className="text-[10px] text-slate-400">{sc.testId}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-[#00c2cb] text-white font-black text-base shadow-xs">
                    {sc.overall}
                  </div>
                </div>

                {/* 4 Skills Table */}
                <div className="grid grid-cols-4 gap-2 py-4 text-center">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-xs font-black text-sky-600">{sc.listening}</div>
                    <div className="text-[9px] text-slate-500 font-semibold">Listening</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-xs font-black text-emerald-600">{sc.reading}</div>
                    <div className="text-[9px] text-slate-500 font-semibold">Reading</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-xs font-black text-orange-600">{sc.speaking}</div>
                    <div className="text-[9px] text-slate-500 font-semibold">Speaking</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <div className="text-xs font-black text-cyan-600">{sc.writing}</div>
                    <div className="text-[9px] text-slate-500 font-semibold">Writing</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                  <span>{sc.center}</span>
                  <span className="font-bold text-slate-700">{sc.country}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center items-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveScorecardIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeScorecardIdx === i ? 'bg-[#00c2cb] w-6' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Orbit Stat Nodes Graphic (Page 6) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#00c2cb]">99%</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-tight">Real Exam Simulation</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#00c2cb]">90%+</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-tight">First Attempt Success</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#00c2cb]">50 Million+</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-tight">Completed Mock Tests</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#00c2cb]">20,000+</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-tight">Real Exam Questions</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (Page 7)                                   */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked <span className="text-[#00c2cb]">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Explore everything you need to know about PTE full mock tests, sectional tests, score reports, and personalized practice tools.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.slice(0, showAllFaqs ? 7 : 5).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4.5 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {faq.icon}
                      <span>{faq.q}</span>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 cursor-pointer flex items-center gap-1 mx-auto"
            >
              <span>{showAllFaqs ? 'Show Less' : 'Learn More'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
