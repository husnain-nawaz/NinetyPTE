import { useState } from 'react';
import { 
  Check, 
  Smartphone, 
  Sparkles, 
  Download, 
  Headphones, 
  Moon, 
  Globe2, 
  Radio, 
  Award, 
  BarChart3, 
  FileText, 
  Calendar, 
  Play, 
  HelpCircle, 
  Send, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Tv,
  BookOpen
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
    }, 4000);
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

  // 6 Core Features from Page 2
  const appFeatures = [
    {
      title: 'Practice all 20 questions on the go',
      desc: 'Access all 20 PTE Academic, UKVI, and Core question types anytime, anywhere with seamless synchronization.',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform shadow-xs">
          <Smartphone className="w-7 h-7 stroke-[2]" />
        </div>
      )
    },
    {
      title: 'Assess your performance with the help of AI scoring',
      desc: 'Instant, Pearson-aligned AI evaluation for Speaking, Writing, Reading, and Listening with diagnostic analytics.',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform shadow-xs">
          <BarChart3 className="w-7 h-7 stroke-[2]" />
        </div>
      )
    },
    {
      title: 'Take full PTE mock tests with instant AI scoring.',
      desc: 'Simulate real test center conditions with full-length and sectional mock tests right on your smartphone.',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform shadow-xs">
          <Award className="w-7 h-7 stroke-[2]" />
        </div>
      )
    },
    {
      title: 'Access the study tools like Templates, Grammar, Vocab bank & Score feedback',
      desc: 'Master proven templates, academic collocations, high-frequency word lists, and actionable grammatical guidance.',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform shadow-xs">
          <BookOpen className="w-7 h-7 stroke-[2]" />
        </div>
      )
    },
    {
      title: 'Follow a tailor-made study plan according to your requirements',
      desc: 'Customized daily schedules tailored to your target band score (65+, 79+, or 90) and available study timeline.',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform shadow-xs">
          <Calendar className="w-7 h-7 stroke-[2]" />
        </div>
      )
    },
    {
      title: 'Watch our strategy videos for a better understanding of the PTE exam',
      desc: 'Watch in-depth masterclasses, question breakdown walk-throughs, and expert techniques from certified 90-scorers.',
      icon: (
        <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform shadow-xs">
          <Tv className="w-7 h-7 stroke-[2]" />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* Floating Vertical Right-Edge Tab: "Download Now"                         */}
      {/* ========================================================================= */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <a 
          href="#download-section"
          className="bg-[#00c2cb] hover:bg-[#00a8b5] text-white px-3 py-6 rounded-l-2xl font-extrabold text-xs shadow-xl transition-all flex flex-col items-center gap-2 group cursor-pointer"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className="tracking-widest uppercase text-[11px] group-hover:tracking-wider transition-all">
            Download Now
          </span>
          <Download className="w-4 h-4 rotate-90 text-white" />
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION & 3D APP MOCKUPS (Page 1)                                */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-cyan-50/50 via-white to-white">
        
        {/* Background decorative glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-200/30 via-sky-200/25 to-teal-200/30 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          
          {/* Main Hero Title */}
          <div className="text-center space-y-3 mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              <span className="text-cyan-500">PTE</span> Practice App for{' '}
              <span className="text-cyan-500">Android & iOS</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto">
              Prepare anywhere, anytime with Pearson-aligned AI scoring, prediction questions, and full mock tests.
            </p>
          </div>

          {/* ===================================================================== */}
          {/* 3 Realistic Overlapping Mobile Mockup Screens                          */}
          {/* ===================================================================== */}
          <div className="relative max-w-4xl mx-auto mb-16 flex items-center justify-center py-6">
            
            {/* Left Phone: AI Score Feedback (Tilted / Offset) */}
            <div className="hidden sm:block absolute left-4 lg:left-12 top-10 w-[240px] lg:w-[260px] bg-white rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 -rotate-6 z-10 hover:rotate-0 transition-transform duration-300">
              {/* Phone Notch */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
              
              <div className="bg-slate-50 rounded-[28px] p-3 text-[11px] space-y-2.5">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>9:41</span>
                  <span>Amanda Li</span>
                </div>

                {/* Score Card Header */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 text-xs">AI SCORE</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-black text-[10px]">Passed</span>
                  </div>
                  
                  <div className="flex items-center justify-center my-2">
                    <div className="w-16 h-16 rounded-full border-4 border-cyan-500 flex flex-col items-center justify-center bg-cyan-50/50">
                      <span className="text-xl font-black text-slate-900 leading-none">75</span>
                      <span className="text-[9px] text-slate-400 font-bold">Speaking 80</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-center text-[9px] pt-1 border-t border-slate-100">
                    <div>
                      <div className="font-bold text-slate-700">78</div>
                      <div className="text-slate-400 text-[8px]">Content</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-700">82</div>
                      <div className="text-slate-400 text-[8px]">Fluency</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-700">74</div>
                      <div className="text-slate-400 text-[8px]">Pronun.</div>
                    </div>
                  </div>
                </div>

                {/* Response Transcription */}
                <div className="bg-white p-2 rounded-xl border border-slate-100 text-[9px] space-y-1">
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>Total Words: 59</span>
                    <span className="text-emerald-600">Good Words: 56</span>
                  </div>
                  <p className="text-slate-500 leading-snug line-clamp-3">
                    The terms summary and abstract are often used interchangeably, causing considerable confusion. This problem is exacerbated because there are two distinct types of abstract...
                  </p>
                </div>
              </div>
            </div>

            {/* Center Phone: Main Dashboard (Elevated Front) */}
            <div className="relative w-[280px] sm:w-[300px] lg:w-[320px] bg-slate-900 rounded-[44px] p-3.5 shadow-2xl z-20 border-4 border-slate-800">
              
              {/* Dynamic Island / Speaker */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto mb-2 flex items-center justify-end px-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500/80"></div>
              </div>

              {/* Screen Content */}
              <div className="bg-slate-50 rounded-[34px] overflow-hidden p-3.5 text-slate-800 text-xs space-y-3">
                
                {/* Top User Status Bar */}
                <div className="flex items-center justify-between text-[11px] pb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center text-xs">
                      AL
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 leading-tight">Amanda Li</div>
                      <div className="text-[9px] text-slate-400">amanda@example.com</div>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-600 text-[10px]">
                    🔔
                  </div>
                </div>

                {/* Exam Countdown Card */}
                <div className="bg-gradient-to-r from-cyan-600 to-teal-500 rounded-2xl p-3 text-white text-center shadow-sm">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-100">Exam Countdown</div>
                  <div className="text-base font-black tracking-tight mt-0.5">
                    02 <span className="text-[9px] font-normal">Days</span> 15 <span className="text-[9px] font-normal">Hours</span> 15 <span className="text-[9px] font-normal">Min</span> 15 <span className="text-[9px] font-normal">Sec</span>
                  </div>
                </div>

                {/* Prediction Questions Card */}
                <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">1517</span>
                    <span className="text-[10px] text-cyan-600 font-bold">50% Completed</span>
                  </div>
                  <div className="text-[10px] text-slate-400">&lt; Prediction Questions &gt;</div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div className="w-1/2 h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full" />
                  </div>
                </div>

                {/* 4 Practice Modules Grid */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Practice</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-2 text-center">
                      <div className="text-xs font-black text-amber-800">Speaking</div>
                      <div className="text-[9px] text-amber-600">120/508 Quest.</div>
                    </div>
                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-2 text-center">
                      <div className="text-xs font-black text-sky-800">Writing</div>
                      <div className="text-[9px] text-sky-600">95/150 Quest.</div>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2 text-center">
                      <div className="text-xs font-black text-emerald-800">Reading</div>
                      <div className="text-[9px] text-emerald-600">182/340 Quest.</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-2 text-center">
                      <div className="text-xs font-black text-purple-800">Listening</div>
                      <div className="text-[9px] text-purple-600">190/470 Quest.</div>
                    </div>
                  </div>
                </div>

                {/* Mock Tests Row */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mock Tests</div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-purple-100/70 text-purple-950 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span>📋</span>
                      <span>Full Mock Tests</span>
                    </span>
                    <span className="text-[10px] text-purple-600 font-mono">0/101 Mocks</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-teal-100/70 text-teal-950 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span>📑</span>
                      <span>Sectional Mock Tests</span>
                    </span>
                    <span className="text-[10px] text-teal-600 font-mono">0/184 Mocks</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Phone: Test Report History (Tilted / Offset) */}
            <div className="hidden sm:block absolute right-4 lg:right-12 top-10 w-[240px] lg:w-[260px] bg-white rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 rotate-6 z-10 hover:rotate-0 transition-transform duration-300">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
              
              <div className="bg-slate-50 rounded-[28px] p-3 text-[11px] space-y-2.5">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>Mock Scorecard</span>
                  <span className="font-mono text-cyan-600 font-bold">10/10</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Overall Score</div>
                  <div className="text-3xl font-black text-cyan-600 leading-none">84</div>
                  <div className="text-[9px] text-emerald-600 font-bold">Target 79+ Achieved</div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-left text-[9px]">
                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>Speaking</span>
                        <span>86 / 90</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="w-[95%] h-full bg-amber-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>Writing</span>
                        <span>82 / 90</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="w-[91%] h-full bg-sky-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>Reading</span>
                        <span>81 / 90</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="w-[90%] h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>Listening</span>
                        <span>87 / 90</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="w-[96%] h-full bg-purple-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-800 text-center text-[10px] font-bold">
                  Pearson-Standard Scoring Matrix
                </div>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* Value Proposition & 6 Key Feature Points                              */}
          {/* ===================================================================== */}
          <div className="max-w-4xl mx-auto space-y-6 pt-6">
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              We understand the importance of clearing the PTE exam for users. And to clear the exam, one needs to prepare for the <strong className="text-slate-900 font-semibold">PTE Academic / UKVI / Core</strong>. To give our users the power to prepare at their own pace and convenience, we have brought the smartest <strong className="text-slate-900 font-semibold underline decoration-cyan-400">PTE practice</strong> portal to your smartphones in the form of NinetyPTE's Practice App, where you can access all the NinetyPTE features on your phone from anywhere in the world.
            </p>

            {/* Stylized Cyan Arrow Bullets matching Page 1 */}
            <div className="space-y-3.5 pt-2">
              {[
                'One login/subscription will work uniformly on both the website and mobile app.',
                'The application is powered by the same AI scoring algorithm as www.ninetypte.com',
                'The NinetyPTE mobile app is available in 24 languages to give our users an added advantage.',
                'The dark mode feature allows users to easily use the app even in low-light conditions.',
                'Improve your Listening skills on the go with the MP3 Practice feature.',
                'The application is available on the following platforms – iOS App and PTE Android App.'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <span className="shrink-0 text-cyan-500 font-black text-sm group-hover:translate-x-0.5 transition-transform">
                    ➤
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-normal">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Store Download Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* App Store Badge */}
              <a
                href="#app-store"
                className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition"
              >
                <div className="text-2xl leading-none"></div>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-slate-300 font-medium">Download on the</div>
                  <div className="text-sm font-bold leading-tight font-sans">App Store</div>
                </div>
              </a>

              {/* Google Play Badge */}
              <a
                href="#google-play"
                className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition"
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
      {/* 2. "Need further assistance?" SUPPORT BANNER (Bottom of Page 1)          */}
      {/* ========================================================================= */}
      <section className="py-10 bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Graphic: Support Agent with Checklist */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cyan-50 border-2 border-cyan-200 flex items-center justify-center shrink-0 shadow-inner">
                {/* Modern Vector Representation */}
                <div className="relative text-cyan-600 text-center">
                  <Headphones className="w-12 h-12 mx-auto stroke-[2]" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold shadow-sm">
                    ✓
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Need further assistance?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Reach out to us with your questions.
                </p>
              </div>
            </div>

            {/* Right Action: Contact Us Pill Button */}
            <div>
              <button
                onClick={() => setContactOpen(!contactOpen)}
                className="px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg active:scale-95 whitespace-nowrap"
              >
                Contact Us
              </button>
            </div>

          </div>

          {/* Expandable Contact Form Modal/Drawer */}
          {contactOpen && (
            <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cyan-200/80 animate-in fade-in slide-in-from-top-2 duration-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-extrabold text-slate-900">Send us a direct query</h4>
                <button onClick={() => setContactOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
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
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="How can we help you with the NinetyPTE Mobile App?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-cyan-600 text-white font-extrabold shadow-sm transition"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              How will the <span className="text-cyan-500">App</span> help you?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              NinetyPTE's mobile app is a free-to-download <strong className="text-slate-900 font-semibold">PTE Academic / UKVI / Core</strong> practice app with AI scoring and offers the following features to the users:
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appFeatures.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-xl transition-all duration-200 text-center flex flex-col items-center group"
              >
                <div className="mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-cyan-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Lifetime PTE Downloads" METRICS (Page 2)                             */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-cyan-50/30 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Lifetime PTE <span className="text-cyan-500">Downloads</span>
            </h2>
          </div>

          {/* 2 Large Sleek Stat Cards matching Page 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            
            {/* Android Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                {/* Android Robot Icon */}
                🤖
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  1015799
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Android
                </div>
              </div>
            </div>

            {/* iOS Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                {/* Apple Icon */}
                
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  658963
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-8">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Download PTE Practice <span className="text-cyan-500">App for free today</span>
          </h2>

          {/* QR Code Card */}
          <div className="inline-block p-4 sm:p-6 bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl">
            <div className="w-44 h-44 sm:w-52 sm:h-52 bg-slate-900 rounded-2xl p-3 flex flex-col items-center justify-center text-white space-y-2">
              {/* Scalable SVG QR Code */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                {/* Outer finder patterns */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="white" />
                <rect x="9" y="9" width="20" height="20" rx="2" fill="black" />
                <rect x="13" y="13" width="12" height="12" fill="white" />

                <rect x="67" y="5" width="28" height="28" rx="4" fill="white" />
                <rect x="71" y="9" width="20" height="20" rx="2" fill="black" />
                <rect x="75" y="13" width="12" height="12" fill="white" />

                <rect x="5" y="67" width="28" height="28" rx="4" fill="white" />
                <rect x="9" y="71" width="20" height="20" rx="2" fill="black" />
                <rect x="13" y="75" width="12" height="12" fill="white" />

                {/* Dense QR data matrix dots */}
                <circle cx="42" cy="12" r="3" fill="white" />
                <circle cx="54" cy="12" r="3" fill="white" />
                <circle cx="48" cy="24" r="3" fill="white" />
                <circle cx="42" cy="36" r="3" fill="white" />
                <circle cx="58" cy="36" r="3" fill="white" />
                <circle cx="12" cy="48" r="3" fill="white" />
                <circle cx="24" cy="48" r="3" fill="white" />
                <circle cx="36" cy="48" r="3" fill="white" />
                <circle cx="48" cy="48" r="4" fill="#06b6d4" />
                <circle cx="60" cy="48" r="3" fill="white" />
                <circle cx="76" cy="48" r="3" fill="white" />
                <circle cx="88" cy="48" r="3" fill="white" />
                <circle cx="42" cy="62" r="3" fill="white" />
                <circle cx="54" cy="62" r="3" fill="white" />
                <circle cx="42" cy="76" r="3" fill="white" />
                <circle cx="54" cy="76" r="3" fill="white" />
                <circle cx="70" cy="76" r="3" fill="white" />
                <circle cx="82" cy="76" r="3" fill="white" />
                <circle cx="76" cy="88" r="3" fill="white" />
              </svg>
            </div>
            <div className="text-[11px] font-bold text-slate-500 mt-3">
              Scan with phone camera to install
            </div>
          </div>

          {/* Store Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#google-play"
              className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition"
            >
              <div className="text-xl leading-none">▶</div>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-slate-300 font-medium">GET IT ON</div>
                <div className="text-sm font-bold leading-tight font-sans">Google Play</div>
              </div>
            </a>

            <a
              href="#app-store"
              className="flex items-center gap-3 px-5 py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl shadow-md transition"
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
                className="w-full sm:flex-1 px-4 py-3 rounded-full border border-slate-300 focus:border-cyan-500 focus:outline-hidden text-xs text-slate-800 shadow-xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition whitespace-nowrap"
              >
                Get Link
              </button>
            </form>

            {linkSent && (
              <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl animate-in fade-in">
                ✓ Download link has been sent to your email!
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
