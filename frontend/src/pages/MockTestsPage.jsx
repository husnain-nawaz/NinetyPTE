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
  Smartphone,
  Sliders,
  Calendar,
  Grid
} from 'lucide-react';

export default function MockTestsPage() {
  // Navigation Jump Links
  const quickNav = [
    { label: 'Mock Tests', href: '#mock-tests-list' },
    { label: 'Features', href: '#why-mock-tests' },
    { label: 'Steps', href: '#how-to-steps' },
    { label: 'AI Scoring', href: '#ai-scoring' },
    { label: 'Success Stories', href: '#success-stories' },
    { label: 'FAQ', href: '#faq' }
  ];

  // Module Filter Tabs (Page 1)
  const [activeModuleFilter, setActiveModuleFilter] = useState('full');

  // FAQ Accordion State (Page 7)
  const [openFaq, setOpenFaq] = useState(0);

  // Custom Test Builder Interactive State (Page 4)
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [selectedSection, setSelectedSection] = useState('All Sections');

  // Mock Test Cards Data (Pages 1 & 2)
  const mockTestList = [
    {
      id: 0,
      title: 'Free Mock Test',
      badge: 'FREE ACCESS',
      badgeColor: 'bg-cyan-50 text-[#00c2cb] border border-cyan-200',
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
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
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
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
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
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
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
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
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
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
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
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
      desc: 'Complete PTE Mock Exam',
      duration: '2 hours duration',
      sections: '4 Main sections',
      btnText: 'Sign Up',
      isFree: false,
      category: 'full'
    }
  ];

  // FAQs Data (Page 7)
  const faqs = [
    {
      q: 'What are Full and Sectional Exam Mock Tests?',
      a: 'Full Mock Tests replicate the entire PTE exam experience with all four modules (Speaking, Writing, Reading, and Listening) evaluated under official timed conditions. Sectional Mock Tests focus exclusively on one specific module, allowing targeted practice for areas that need score enhancement.'
    },
    {
      q: 'Are NinetyPTE Exam Mock Tests accurate and how are they scored?',
      a: 'Yes, NinetyPTE utilizes machine learning models calibrated against hundreds of thousands of official Pearson scorecards. Our algorithms evaluate acoustic pronunciation, oral fluency, grammatical accuracy, lexical resources, and content coverage in strict alignment with official grading rubrics.'
    },
    {
      q: 'How quickly do I receive my mock test results and reports?',
      a: 'Mock test score reports are delivered instantly upon test submission, typically in under 3 minutes. You receive a diagnostic scorecard detailing your overall score (10–90) and individual communicative skill breakdowns.'
    },
    {
      q: 'Can I re-take mock tests and review my previous attempts?',
      a: 'Yes! All your attempts are saved in your personal NinetyPTE dashboard. You can review past performance reports, listen to your audio recordings, read transcript analyses, and track your score progression over time.'
    },
    {
      q: 'What is the "Create Your Own Mock Test" feature?',
      a: 'This exclusive NinetyPTE feature enables you to generate custom mock tests tailored to your unique study needs. You can choose specific question categories, adjust time limits, and select question difficulty levels (Easy, Medium, Hard).'
    },
    {
      q: 'Can I share my score reports with my tutor or institute?',
      a: 'Yes, each completed mock test provides a downloadable PDF score report and a unique shareable verification link that can be reviewed by your teacher, institute, or study group.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="pt-8 pb-14 bg-gradient-to-b from-cyan-50/40 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          {/* Header Title Box */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold border border-cyan-100">
              <Sparkles className="w-3.5 h-3.5 fill-[#00c2cb]" />
              <span>PTE Mock Test</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
              Free PTE Academic / UKVI Mock Tests <br />
              <span className="text-[#00c2cb]">Real Exam Experience with Instant Results!</span>
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
                  <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500">Timed Sectional</span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500">Sectional</span>
                </div>
              </div>

              {/* Portal Content Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
                
                {/* Scorecard Gauge Preview */}
                <div className="md:col-span-5 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MOCK TEST SCORECARD</div>
                      <div className="text-sm font-extrabold text-slate-900">Amanda L.</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#00c2cb] text-white flex flex-col items-center justify-center font-black shadow-sm">
                      <span className="text-base leading-none">70</span>
                      <span className="text-[8px] uppercase tracking-tighter">Score</span>
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
                Customize your learning experience: select specific topics, difficulty levels, and time limits to build a test targeting your exact weak spots.
              </p>
            </div>

          </div>

          {/* Primary CTA Button */}
          <div className="text-center pt-8">
            <a
              href="#mock-tests-list"
              className="inline-block px-8 py-3 rounded-full bg-[#1e293b] hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95"
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
                className="w-full py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-center text-xs shadow-xs transition flex items-center justify-center gap-1"
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
                  className="w-full py-2.5 rounded-full border border-cyan-300 text-[#00c2cb] hover:bg-cyan-50 font-extrabold text-center text-xs shadow-2xs transition flex items-center justify-center gap-1"
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
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-center text-xs shadow-md transition flex items-center justify-center gap-1 relative z-10"
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
                  className="inline-block px-7 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-slate-100 transition active:scale-95"
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
      {/* 4. WHY TAKE NINETYPTE'S MOCK TESTS? (Pages 2 & 3)                         */}
      {/* ========================================================================= */}
      <section id="why-mock-tests" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why take NinetyPTE's Mock tests for a <span className="text-[#00c2cb]">higher PTE score?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              NinetyPTE's mock tests are designed to give you a realistic, targeted, and effective preparation experience.
            </p>
          </div>

          {/* Feature 1: Real PTE Exam Experience */}
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
                  className="inline-block px-7 py-2.5 rounded-full bg-[#1e293b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-sm transition active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Test UI Mockup */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-bold text-slate-600">
                <span className="text-[#00c2cb]">NinetyPTE - Free Mock Test</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-[#00c2cb] text-[10px]">TIME: 00:45</span>
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
                  "Pets provide incredible comfort, companionship, and reduce stress, but they are a long-term commitment..."
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs">
                  Save Question
                </button>
                <button className="px-5 py-1.5 rounded-xl bg-[#00c2cb] text-white font-bold text-xs">
                  Next Question
                </button>
              </div>
            </div>
          </div>

          {/* Feature 2: Highly Accurate AI Scoring */}
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
                  <div className="text-xs text-slate-400">PTE Mock Test - #10</div>
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
                Highly Accurate <span className="text-[#00c2cb]">AI Scoring</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                NinetyPTE's advanced AI scoring system mirrors official scoring algorithms, giving you instant and reliable feedback. Every score report breaks down your sub-skill performance so you know exactly where to focus.
              </p>
            </div>

          </div>

          {/* Features 3, 4, 5 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Feature 3: Master Time Management */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Master Time Management</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Mimic the strict timing structure of the real exam to build pacing intuition, ensuring you finish all questions within test constraints.
              </p>
            </div>

            {/* Feature 4: Identify Strengths & Weaknesses */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Identify Strengths & Weaknesses</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Granular task-level diagnostic reports highlight hesitation pauses, pronunciation errors, and grammatical slips for targeted study.
              </p>
            </div>

            {/* Feature 5: Detailed Analytics & Feedback */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Detailed Analytics & Feedback</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Receive personalized AI recommendations based on performance history to accelerate your score journey towards 79+ or 90.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CREATE YOUR OWN MOCK TEST & TYPES OF TESTS (Page 4)                    */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Card 1: Pre-defined Mock Tests */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-black text-[#00c2cb] uppercase tracking-wider">STANDARD CURATED TESTS</div>
                <h3 className="text-2xl font-black text-slate-900">Our Pre-defined Mock Tests</h3>
                <div className="text-3xl font-black text-slate-900">300+ Full Pre-made Mock Tests</div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Carefully calibrated full-length and sectional exams following the official exam order, question counts, and difficulty grading.
                </p>
              </div>
              <Link
                to="/signup"
                className="inline-block px-7 py-3 rounded-full bg-[#1e293b] text-white font-extrabold text-xs text-center shadow-md hover:bg-slate-900 transition"
              >
                Access Pre-defined Tests
              </Link>
            </div>

            {/* Card 2: Create Your Own Mock Test (Customizer) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-cyan-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-[#00c2cb] uppercase tracking-wider">INNOVATIVE FEATURE</div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-[#00c2cb] text-[10px] font-bold">Customizable</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Create Your Own Mock Test</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Customize your preparation with NinetyPTE's unique 'Create Own Test' feature. Select sections, difficulty levels, and time limits to match your study schedule.
                </p>

                {/* Interactive Controls */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Target Section:</label>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['All Sections', 'Speaking', 'Writing', 'Reading', 'Listening'].map((sec) => (
                        <button
                          key={sec}
                          onClick={() => setSelectedSection(sec)}
                          className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                            selectedSection === sec
                              ? 'bg-[#00c2cb] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {sec}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Difficulty Tier:</label>
                    <div className="flex gap-2 text-xs">
                      {['Easy', 'Medium', 'Hard'].map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDifficulty(diff)}
                          className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                            selectedDifficulty === diff
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/signup"
                className="inline-block px-7 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs text-center shadow-xs transition"
              >
                Build Custom Test Now
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW TO TAKE OUR MOCK TESTS - 4 SIMPLE STEPS (Pages 4 & 5)              */}
      {/* ========================================================================= */}
      <section id="how-to-steps" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              To Take Our PTE Academic / UKVI Mock Tests, <span className="text-[#00c2cb]">Follow These Simple Steps</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Get started in four seamless steps and receive instant performance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Step 1',
                title: 'Sign Up or Log In',
                desc: 'Create your free NinetyPTE account or sign in to access your student dashboard.',
                icon: <UserCheck className="w-5 h-5 text-cyan-600" />
              },
              {
                step: 'Step 2',
                title: 'Select Mock Test',
                desc: 'Choose between full-length exams, sectional modules, or customized test practice.',
                icon: <Layers className="w-5 h-5 text-cyan-600" />
              },
              {
                step: 'Step 3',
                title: 'Start Test Environment',
                desc: 'Check your audio equipment, calibrate your microphone, and begin under timed exam conditions.',
                icon: <Clock className="w-5 h-5 text-cyan-600" />
              },
              {
                step: 'Step 4',
                title: 'Get Instant AI Scorecard',
                desc: 'Submit your test and receive an immediate in-depth diagnostic scorecard and error analysis.',
                icon: <Award className="w-5 h-5 text-cyan-600" />
              }
            ].map((st, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#00c2cb] uppercase tracking-wider">{st.step}</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">
                    {st.icon}
                  </div>
                </div>
                <h4 className="font-extrabold text-base text-slate-900">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HOW NINETYPTE AI SCORING WORKS (Page 5)                                */}
      {/* ========================================================================= */}
      <section id="ai-scoring" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How NinetyPTE AI Scoring Works <span className="text-[#00c2cb]">in the Mock tests</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              State-of-the-art AI assessment evaluating answers using official PTE scoring rubrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1: Exam Scoring Logic */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#00c2cb] flex items-center justify-center shadow-xs">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Exam Scoring Logic</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Our AI assesses your answers using official exam parameters, ensuring scores correlate precisely with actual test day expectations.
              </p>
            </div>

            {/* Pillar 2: Speaking Analysis */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-orange-600 flex items-center justify-center shadow-xs">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Speaking Analysis</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Advanced acoustic algorithms analyze speech fluency, pause patterns, vowel clarity, rhythm, and phoneme pronunciation.
              </p>
            </div>

            {/* Pillar 3: Writing Assessment */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-purple-600 flex items-center justify-center shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Writing Assessment</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Natural Language Processing verifies grammar correctness, sentence complexity, lexical diversity, and task adherence.
              </p>
            </div>

            {/* Pillar 4: Reading & Listening Accuracy */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-sky-600 flex items-center justify-center shadow-xs">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Reading & Listening</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Instant verification of objective multiple-choice, fill in the blanks, dictation words, and correct summary selections.
              </p>
            </div>

          </div>

          {/* New Format Banner */}
          <div className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-[#00c2cb] text-xs font-bold">
                <span>Aligned to Latest Official Guidelines</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                New PTE Academic / UKVI Format – Mock Tests Now Available
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                Includes all updated question types such as Respond to a Situation and Summarize Group Discussion.
              </p>
            </div>
            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm shrink-0 transition"
            >
              Practice New Format
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. HOW TO PREPARE WITH OUR FREE MOCK TEST (Pages 5 & 6)                   */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How to Prepare with Our <span className="text-[#00c2cb]">PTE Free Mock Test?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              To get the most out of your mock test with answers, follow these proven preparation guidelines:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Review Test Format', desc: 'Familiarize yourself with task instructions and countdown constraints before starting.' },
              { title: 'Simulate Quiet Exam Conditions', desc: 'Wear a headset, sit in a distraction-free space, and complete the test in one sitting.' },
              { title: 'Analyze AI Diagnostics', desc: 'Carefully examine the score report, reviewing pronunciation errors and missed keywords.' },
              { title: 'Re-test Periodically', desc: 'Take a sectional or full mock test every week to benchmark score increases.' }
            ].map((tip, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-2">
                <div className="text-base font-black text-[#00c2cb]">0{idx + 1}</div>
                <h4 className="font-extrabold text-sm text-slate-900">{tip.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{tip.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. REMARKABLE SUCCESS OF OUR TEST TAKERS (Page 6)                         */}
      {/* ========================================================================= */}
      <section id="success-stories" className="py-14 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Remarkable Success of Our <span className="text-[#00c2cb]">PTE Test Takers</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Trusted by PTE aspirants worldwide to build test confidence and achieve dream scores.
            </p>
          </div>

          {/* 4 Big Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#00c2cb]">50M+</div>
              <div className="text-xs font-bold text-slate-300">Tests Attempted</div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#00c2cb]">1.2M+</div>
              <div className="text-xs font-bold text-slate-300">Global Aspirants</div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#00c2cb]">98%</div>
              <div className="text-xs font-bold text-slate-300">Score Improvement</div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#00c2cb]">90 Max</div>
              <div className="text-xs font-bold text-slate-300">Achieved by Thousands</div>
            </div>
          </div>

          {/* Callout Card */}
          <div className="rounded-3xl bg-slate-900 border border-white/10 p-8 sm:p-10 text-center space-y-4 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Built for Serious PTE Candidates
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
              Our mock platform delivers real simulation, detailed error breakdown, and score-focused practice to ensure you get your desired result on the first attempt.
            </p>
            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-block px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95"
              >
                Start Practicing Free Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (Page 7)                                  */}
      {/* ========================================================================= */}
      <section id="faq" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked <span className="text-[#00c2cb]">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Explore everything you need to know about PTE full tests, sectional practice, and AI scoring.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4.5 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
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
            <span className="text-xs font-bold text-cyan-600 hover:text-cyan-700 cursor-pointer">
              Learn More ⌄
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
