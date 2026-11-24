import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  HelpCircle, 
  Globe, 
  Award, 
  ChevronDown, 
  Play, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Headphones, 
  BookOpen, 
  Zap,
  Plane,
  Scale,
  DollarSign,
  Check,
  X
} from 'lucide-react';

export default function PTECoreExamPage() {
  const [selectedExam, setSelectedExam] = useState('ielts-general');
  const [selectedClb, setSelectedClb] = useState(7);
  const [activeQuestionTab, setActiveQuestionTab] = useState('situation');
  const [faqOpen, setFaqOpen] = useState({ 0: true });

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Official Pearson PTE Core to CLB Concordance
  const clbScores = {
    10: { listening: '89 - 90', reading: '88 - 90', speaking: '89 - 90', writing: '90', minScore: 88 },
    9: { listening: '82 - 88', reading: '78 - 87', speaking: '84 - 88', writing: '88 - 89', minScore: 78 },
    8: { listening: '71 - 81', reading: '69 - 77', speaking: '76 - 83', writing: '79 - 87', minScore: 69 },
    7: { listening: '60 - 70', reading: '60 - 68', speaking: '68 - 75', writing: '69 - 78', minScore: 60 },
    6: { listening: '50 - 59', reading: '51 - 59', speaking: '59 - 67', writing: '60 - 68', minScore: 50 },
    5: { listening: '39 - 49', reading: '42 - 50', speaking: '51 - 58', writing: '51 - 59', minScore: 39 },
    4: { listening: '28 - 38', reading: '33 - 41', speaking: '42 - 50', writing: '41 - 50', minScore: 28 },
    3: { listening: '18 - 27', reading: '24 - 32', speaking: '34 - 41', writing: '32 - 40', minScore: 18 }
  };

  // Comparison data against other exams
  const comparisonData = {
    'ielts-general': {
      title: 'IELTS General',
      subtitle: 'For migration & work',
      purpose: 'PR, work & study (IRCC + global use)',
      testTakers: 'Migration & work applicants',
      testLocations: '4000+ Test Centres in 140 countries',
      availability: '48 fixed paper dates; 7 days for CB test',
      deliveryMode: 'Paper or computer-based',
      duration: '~2 hr 45 min',
      sitting: 'Two sessions (Speaking separate)',
      contentType: 'Everyday + academic contexts',
      accents: 'Varied accents (examiner assessed)',
      difficulty: 'Moderate; human interaction',
      skills: 'Listening, Reading, Writing, Speaking'
    },
    'celpip-general': {
      title: 'CELPIP General',
      subtitle: 'Canadian PR specific',
      purpose: 'Canadian PR & citizenship only (IRCC)',
      testTakers: 'Canada PR candidates only',
      testLocations: 'Over 100 test centres globally',
      availability: 'Limited weekly slots',
      deliveryMode: 'Computer-based only',
      duration: '~3 hours',
      sitting: 'Single sitting without break',
      contentType: 'Strict Canadian everyday situations',
      accents: 'Canadian English focused',
      difficulty: 'Moderate; long screen time',
      skills: 'Listening, Reading, Writing, Speaking'
    },
    'pte-academic': {
      title: 'PTE Academic',
      subtitle: 'For university study & UKVI',
      purpose: 'University admissions & study visas globally',
      testTakers: 'Undergraduate & postgraduate students',
      testLocations: '500+ Pearson centres globally',
      availability: '365 days a year',
      deliveryMode: 'Computer-based only',
      duration: '~2 hours',
      sitting: 'One continuous session',
      contentType: 'Academic lectures, university research',
      accents: 'Global international English accents',
      difficulty: 'High academic vocabulary focus',
      skills: 'Listening, Reading, Writing, Speaking'
    },
    'pte-academic-ukvi': {
      title: 'PTE Academic UKVI',
      subtitle: 'Approved for UK Visas',
      purpose: 'UK Home Office approved study & work visas',
      testTakers: 'UK immigration & university applicants',
      testLocations: 'SELT-approved Pearson centres',
      availability: 'Year-round scheduling',
      deliveryMode: 'Computer-based only',
      duration: '~2 hours',
      sitting: 'One continuous session',
      contentType: 'Academic contexts with SELT security',
      accents: 'International academic English',
      difficulty: 'Rigorous identity verification',
      skills: 'Listening, Reading, Writing, Speaking'
    },
    'toefl-ibt': {
      title: 'TOEFL iBT',
      subtitle: 'North American University Focus',
      purpose: 'University admissions & academic entry',
      testTakers: 'College & university applicants',
      testLocations: 'Global ETS test centres & Home Edition',
      availability: 'Specific testing dates',
      deliveryMode: 'Computer-based',
      duration: '~2 hours',
      sitting: 'One continuous session',
      contentType: 'Strict North American academic campus',
      accents: 'Predominantly North American',
      difficulty: 'Heavy university lecture comprehension',
      skills: 'Listening, Reading, Writing, Speaking'
    }
  };

  const currentComp = comparisonData[selectedExam] || comparisonData['ielts-general'];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c5cd] selection:text-white pb-16">
      
      {/* Sticky Right-Edge Tab: "Practice Now" */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <Link 
          to="/dashboard"
          className="bg-[#00c5cd] hover:bg-[#00b2ba] text-white px-3 py-6 rounded-l-xl font-bold text-xs shadow-xl transition-all flex flex-col items-center gap-1 group cursor-pointer"
          style={{ writingMode: 'vertical-rl' }}
          aria-label="Practice Now"
        >
          <span className="tracking-widest uppercase text-[11px] group-hover:tracking-wider transition-all">
            Practice Now
          </span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="pt-10 pb-8 bg-gradient-to-b from-slate-50/60 to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00c5cd] font-bold text-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Preparation Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              PTE Core
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              The New and Easy Way to Immigrate to Canada
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Left Box: What is PTE Core? */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#00c5cd] rounded-full inline-block" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  What is PTE Core?
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                PTE Core is a modern English language proficiency test developed by Pearson, the world&apos;s leading education company, officially implemented for Canadian immigration. It assesses general English skills for everyday living and professional workplace situations rather than academic academia.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                It is approved by <strong className="text-slate-800">Immigration, Refugees and Citizenship Canada (IRCC)</strong> for all Canadian economic visa categories including Express Entry, Provincial Nominee Programs (PNP), and Canadian Citizenship, and is calibrated to the Canadian Language Benchmark (CLB). Scored 100% digitally by AI across Speaking, Writing, Reading, and Listening.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link 
                  to="/pte-speaking-practice"
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#00c5cd] text-white font-bold text-xs shadow-xs transition"
                >
                  Start Practice
                </Link>
                <a 
                  href="#exam-format"
                  className="px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-700" />
                  <span>Watch Intro</span>
                </a>
              </div>
            </div>

            {/* Right Box: Visual Canada PR Badge Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white min-h-[320px] flex flex-col justify-between">
                
                {/* Floating Badge Top Left */}
                <div className="self-start inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md text-slate-800 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#00c5cd]" />
                  <span>ACCEPTED BY Canadian Immigration</span>
                </div>

                {/* Floating Badge Top Right */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md text-slate-900 text-center">
                  <div className="text-lg font-black text-[#00c5cd] leading-tight">90</div>
                  <div className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">Points Max</div>
                </div>

                {/* Center Content / Flag Visual */}
                <div className="py-6 flex items-center justify-center gap-4">
                  <div className="w-16 h-12 bg-white rounded-lg p-1.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">
                      🍁 Canada
                    </div>
                  </div>
                  <Plane className="w-8 h-8 text-[#00c5cd] -rotate-45" />
                  <div className="w-14 h-14 rounded-full bg-[#00c5cd] text-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Floating Badge Bottom Right */}
                <div className="self-end inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md text-slate-800 text-xs font-bold">
                  <Award className="w-4 h-4 text-[#00c5cd]" />
                  <span>ACCEPTED BY IRCC for Canadian Citizenship</span>
                </div>
              </div>
            </div>

          </div>

          {/* Section Anchors Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <a href="#exam-format" className="px-5 py-2 rounded-full text-xs font-bold bg-[#00c5cd] text-white shadow-xs hover:bg-[#00b2ba] transition">Exam Format</a>
            <a href="#comparison" className="px-5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Comparison</a>
            <a href="#practice-test" className="px-5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Practice Test</a>
            <a href="#why-ninetypte" className="px-5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Why NinetyPTE</a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHO NEEDS TO GIVE PTE CORE?                                             */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Who needs to give <span className="text-[#00c5cd]">PTE Core</span>?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            PTE Core is tailored specifically for individuals seeking Canadian permanent residency (PR) through economic immigration programs, Canadian citizenship, or Post-Graduation Work Permits (PGWP). If your primary goal is Canadian university or college academic admission, you should opt for PTE Academic instead. PTE Core is accepted by Immigration, Refugees and Citizenship Canada (IRCC) across all economic visa categories.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link to="/pte-speaking-practice" className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#00c5cd] text-white font-bold text-xs shadow-xs transition">
              Practice PTE Core
            </Link>
            <Link to="/mock-tests" className="px-6 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition">
              Take PTE Core Tests
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHICH CANADIAN IMMIGRATION PROGRAMS ACCEPT PTE CORE?                    */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Which Canadian Immigration <span className="text-[#00c5cd]">Programs Accept PTE Core</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              PTE Core is an official language test approved by IRCC. It can be used to prove communicative English capability across multiple Canadian immigration streams:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Federal Skilled Worker Program (FSWP)',
                desc: 'For highly skilled foreign professionals seeking permanent residence through Canada Express Entry.'
              },
              {
                title: 'Federal Skilled Trades Program (FSTP)',
                desc: 'For qualified international workers with specialized experience in certified skilled trades.'
              },
              {
                title: 'Canadian Experience Class (CEC)',
                desc: 'For eligible applicants with valid Canadian skilled in-country work experience seeking PR transition.'
              },
              {
                title: 'Provincial Nominee Programs (PNP)',
                desc: 'Accepted for provincial immigration pathways across Canadian provinces that recognize IRCC-approved tests.'
              },
              {
                title: 'Post-Graduation Work Permit (PGWP)',
                desc: 'Eligible international college and university graduates can utilize PTE Core for language qualification.'
              },
              {
                title: 'Canadian Citizenship',
                desc: 'Satisfies the official language proficiency proof requirement when applying for Canadian citizenship.'
              }
            ].map((prog, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{prog.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6 font-normal">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl border border-cyan-200/80 text-xs text-slate-700 flex items-start gap-3 shadow-2xs max-w-4xl mx-auto">
            <HelpCircle className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-800">Important Advisory:</strong> Different immigration programs mandate specific minimum language benchmarks. Before scheduling your exam, verify the minimum required CLB level for your chosen stream on the official IRCC portal.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE PTE CORE FOR CANADA PR?                                      */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why choose <span className="text-[#00c5cd]">PTE Core for Canada PR</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              PTE Core offers concrete advantages for Canadian economic immigration applicants:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Zap,
                title: 'Fast and convenient:',
                desc: 'Book your exam online with rapid slot availability across test centers and receive official scored results within 2 to 5 business days.'
              },
              {
                icon: Scale,
                title: 'Fair and accurate:',
                desc: 'Evaluated by advanced Pearson AI scoring models trained on millions of accents, eliminating human examiner bias.'
              },
              {
                icon: Globe,
                title: 'Flexible and adaptable:',
                desc: 'Your score certificate is valid for two full calendar years and can be submitted across multiple Canadian economic visa streams.'
              },
              {
                icon: DollarSign,
                title: 'Affordable and accessible:',
                desc: 'Competitive registration fee with a compact 2-hour single-session computer-based testing timeframe.'
              }
            ].map((f, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-[#00c5cd] flex items-center justify-center">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MINIMUM CLB REQUIREMENTS TABLE                                         */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What PTE Core Score Is <span className="text-[#00c5cd]">Required for Canada PR</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The minimum PTE Core score required depends on your specific immigration pathway. IRCC measures language capability using the Canadian Language Benchmarks (CLB). Your scores in Listening, Reading, Speaking, and Writing convert into distinct CLB scores:
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
            <div className="grid grid-cols-2 bg-[#1e3a8a] text-white text-xs font-bold p-3.5 tracking-wider uppercase">
              <div>Immigration Program</div>
              <div>Minimum CLB Level</div>
            </div>
            <div className="divide-y divide-slate-100 text-xs text-slate-700">
              <div className="grid grid-cols-2 p-3.5 items-center">
                <span className="font-semibold text-slate-900">Federal Skilled Worker Program (FSWP)</span>
                <span className="text-slate-600">CLB 7 in all four skills</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 items-center bg-slate-50/50">
                <span className="font-semibold text-slate-900">Canadian Experience Class (CEC) — TEER 0 or 1</span>
                <span className="text-slate-600">CLB 7 in all four skills</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 items-center">
                <span className="font-semibold text-slate-900">Canadian Experience Class (CEC) — TEER 2 or 3</span>
                <span className="text-slate-600">CLB 5 in all four skills</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 items-center bg-slate-50/50">
                <span className="font-semibold text-slate-900">Federal Skilled Trades Program (FSTP)</span>
                <span className="text-slate-600">CLB 5 Listening & Speaking; CLB 4 Reading & Writing</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EXAM FORMAT HIGHLIGHTS                                                  */}
      {/* ========================================================================= */}
      <section id="exam-format" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Important things you need to know about the <span className="text-[#00c5cd]">PTE Core exam format</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Essential fundamentals regarding how the computer-based assessment is structured:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'AI-Based Scoring System',
                desc: 'Delivers rapid, unbiased evaluation based on empirical algorithmic scoring trained against hundreds of thousands of native and non-native international speakers.'
              },
              {
                title: 'Computer-Based Test Setup',
                desc: 'Conducted entirely in a high-security Pearson workstation equipped with a dedicated PC, keyboard, and calibrated headset microphone.'
              },
              {
                title: 'Variety of Question Types',
                desc: 'Covers everyday functional English tasks including email composition, short everyday conversations, workplace dialogues, and sentence repetition.'
              },
              {
                title: 'Fixed Test Duration',
                desc: 'Completed in approximately two hours across three continuous sections: Speaking & Writing, Reading, and Listening.'
              },
              {
                title: 'Official Test Centre',
                desc: 'Administered strictly at certified Pearson test centers worldwide with biometric verification; online home testing is not accepted by IRCC.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-[#00c5cd]">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ===================================================================== */}
          {/* DARK NAVY SCORING CARD (Page 3 layout)                                */}
          {/* ===================================================================== */}
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 text-white space-y-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-[#00c5cd] text-[10px] font-extrabold uppercase tracking-wider">
                  PTE Core Scoring
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  How Does PTE Core Scoring Work for <span className="text-[#00c5cd]">Canadian Immigration</span>?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  PTE Core grades candidates on a granular 10–90 scale. Your official Pearson score card details an Overall Score and four discrete Communicative Skill scores: Listening, Reading, Speaking, and Writing.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  <strong className="text-white">Crucial Rule:</strong> IRCC evaluates each of the four language skills independently. A high overall score cannot compensate for an individual sub-score falling below the mandatory threshold for your visa category.
                </p>
              </div>

              {/* Interactive Visual Score Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl p-5 text-slate-800 shadow-lg space-y-4 relative">
                  
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-900">PTE Core</span>
                      <span className="text-[11px] text-slate-500 font-mono">Scale: 10 - 90</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-[#00c5cd] font-bold text-[10px]">
                      Canada PR
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50/60 border border-orange-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-orange-500 text-white font-bold text-[10px] flex items-center justify-center">S</span>
                        <span className="font-semibold text-slate-700">Speaking</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">68</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50/60 border border-sky-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center">W</span>
                        <span className="font-semibold text-slate-700">Writing</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">69</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">R</span>
                        <span className="font-semibold text-slate-700">Reading</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">60</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-indigo-500 text-white font-bold text-[10px] flex items-center justify-center">L</span>
                        <span className="font-semibold text-slate-700">Listening</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">60</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] bg-slate-900 text-white px-3 py-2 rounded-xl">
                    <span>IRCC evaluates each skill separately (10–90)</span>
                    <span className="px-2 py-0.5 rounded bg-[#00c5cd] text-white font-bold">CLB 7</span>
                  </div>

                  <div className="absolute -bottom-3 -right-3 bg-purple-600 text-white px-3 py-1.5 rounded-xl shadow-md text-right">
                    <div className="text-[9px] uppercase tracking-wider font-extrabold text-purple-200">Overall</div>
                    <div className="text-sm font-black leading-tight">64 / 90</div>
                  </div>

                </div>
              </div>

            </div>

            {/* Why does this matter? */}
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Why does this matter?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                  <span className="px-2 py-1 rounded bg-[#00c5cd] text-slate-900 font-bold text-xs">01</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Each language skill contributes directly to your Comprehensive Ranking System (CRS) score for Express Entry draws.
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                  <span className="px-2 py-1 rounded bg-[#00c5cd] text-slate-900 font-bold text-xs">02</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Before sitting the exam, verify your program threshold and aim to secure the targeted CLB across all four sub-skills.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. UNDERSTANDING THE PTE CORE EXAM STRUCTURE (3 Columns)                   */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Understanding the <span className="text-[#00c5cd]">PTE Core Exam Structure</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The PTE Core Exam is divided into three main parts and includes 19 scored question types plus an unscored Personal Introduction. A full test contains 52–67 total tasks across approximately two hours:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* PART 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-[#00c5cd] text-white p-4 text-center">
                <span className="text-[10px] uppercase tracking-widest font-extrabold opacity-80">Part 1</span>
                <h3 className="text-sm sm:text-base font-bold">Speaking & Writing</h3>
                <p className="text-[11px] opacity-90 mt-0.5">Time: 50 - 65 minutes</p>
              </div>
              <div className="p-4 divide-y divide-slate-100 text-xs text-slate-700 flex-1">
                {[
                  { name: 'Personal Introduction (unscored)', count: '1' },
                  { name: 'Read Aloud', count: '6 - 7' },
                  { name: 'Repeat Sentence', count: '10 - 12' },
                  { name: 'Describe Image', count: '3 - 4' },
                  { name: 'Respond to a Situation (Core Unique)', count: '2 - 4' },
                  { name: 'Answer Short Question', count: '5 - 6' },
                  { name: 'Summarize Written Text', count: '1 - 2' },
                  { name: 'Write Email (Core Unique)', count: '2 - 3' }
                ].map((q, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{q.name}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px] font-bold">{q.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-[#00c5cd] text-white p-4 text-center">
                <span className="text-[10px] uppercase tracking-widest font-extrabold opacity-80">Part 2</span>
                <h3 className="text-sm sm:text-base font-bold">Reading</h3>
                <p className="text-[11px] opacity-90 mt-0.5">Time: 27 - 37 minutes</p>
              </div>
              <div className="p-4 divide-y divide-slate-100 text-xs text-slate-700 flex-1">
                {[
                  { name: 'Reading & Writing: Fill in the Blanks', count: '5 - 6' },
                  { name: 'Multiple Choice, Multiple Answers', count: '1 - 2' },
                  { name: 'Reorder Paragraph', count: '2 - 3' },
                  { name: 'Fill in the Blanks', count: '4 - 5' },
                  { name: 'Multiple Choice, Single Answer', count: '1 - 2' }
                ].map((q, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{q.name}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px] font-bold">{q.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-[#00c5cd] text-white p-4 text-center">
                <span className="text-[10px] uppercase tracking-widest font-extrabold opacity-80">Part 3</span>
                <h3 className="text-sm sm:text-base font-bold">Listening</h3>
                <p className="text-[11px] opacity-90 mt-0.5">Time: 22 - 37 minutes</p>
              </div>
              <div className="p-4 divide-y divide-slate-100 text-xs text-slate-700 flex-1">
                {[
                  { name: 'Summarize Spoken Text', count: '1 - 2' },
                  { name: 'Multiple Choice, Multiple Answers', count: '1 - 2' },
                  { name: 'Fill in the Blanks', count: '2 - 3' },
                  { name: 'Multiple Choice, Single Answer', count: '1 - 2' },
                  { name: 'Select Missing Word', count: '1 - 2' },
                  { name: 'Highlight Incorrect Words', count: '1 - 2' },
                  { name: 'Write from Dictation', count: '3 - 4' }
                ].map((q, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{q.name}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px] font-bold">{q.count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CTA Banner */}
          <div id="practice-test" className="relative rounded-3xl overflow-hidden shadow-lg p-8 sm:p-10 text-center space-y-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Take a Free PTE Core Practice Test Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Experience genuine exam-level questions, instant AI scoring analysis, and granular performance feedback.
            </p>
            <div>
              <Link 
                to="/mock-tests"
                className="px-8 py-3 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-extrabold text-xs shadow-md transition inline-block cursor-pointer"
              >
                Start Free Practice Test
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. COMPARISON: PTE CORE VS OTHER EXAMS                                     */}
      {/* ========================================================================= */}
      <section id="comparison" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">vs IELTS vs CELPIP vs TOEFL</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Select an exam below to see a detailed side-by-side comparison against the PTE Core:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'ielts-general', label: 'IELTS General' },
              { id: 'celpip-general', label: 'CELPIP General' },
              { id: 'pte-academic', label: 'PTE Academic' },
              { id: 'pte-academic-ukvi', label: 'PTE Academic UKVI' },
              { id: 'toefl-ibt', label: 'TOEFL iBT' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedExam(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedExam === tab.id
                    ? 'bg-[#00c5cd] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Side by Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PTE Core Card */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
              <div className="bg-[#00c5cd] text-white p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold">PTE Core</h3>
                <p className="text-[11px] opacity-90">Recommended for Canada PR</p>
              </div>
              <div className="p-5 space-y-4 text-xs text-slate-700">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00c5cd]">Essentials & Logistics</span>
                  <div className="space-y-1.5 pt-1">
                    <p><strong className="text-slate-800">Purpose:</strong> Canada PR & work visa (IRCC-approved)</p>
                    <p><strong className="text-slate-800">Typical test takers:</strong> Canada PR / migration candidates</p>
                    <p><strong className="text-slate-800">Test locations:</strong> 500+ test centers in 115+ countries</p>
                    <p><strong className="text-slate-800">Availability:</strong> 365 days a year</p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00c5cd]">Test Format & Experience</span>
                  <div className="space-y-1.5 pt-1">
                    <p><strong className="text-slate-800">Delivery mode:</strong> Computer-based only</p>
                    <p><strong className="text-slate-800">Duration:</strong> ~2 hours</p>
                    <p><strong className="text-slate-800">Sitting:</strong> One continuous session</p>
                    <p><strong className="text-slate-800">Content type:</strong> Everyday life & workplace situations</p>
                    <p><strong className="text-slate-800">Accents:</strong> Recognizes 120+ global accents via AI</p>
                    <p><strong className="text-slate-800">Scoring:</strong> 10–90 scale (results in 2 business days)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitor Card */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
              <div className="bg-[#1e3a8a] text-white p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold">{currentComp.title}</h3>
                <p className="text-[11px] opacity-90">{currentComp.subtitle}</p>
              </div>
              <div className="p-5 space-y-4 text-xs text-slate-700">
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1e3a8a]">Essentials & Logistics</span>
                  <div className="space-y-1.5 pt-1">
                    <p><strong className="text-slate-800">Purpose:</strong> {currentComp.purpose}</p>
                    <p><strong className="text-slate-800">Typical test takers:</strong> {currentComp.testTakers}</p>
                    <p><strong className="text-slate-800">Test locations:</strong> {currentComp.testLocations}</p>
                    <p><strong className="text-slate-800">Availability:</strong> {currentComp.availability}</p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1e3a8a]">Test Format & Experience</span>
                  <div className="space-y-1.5 pt-1">
                    <p><strong className="text-slate-800">Delivery mode:</strong> {currentComp.deliveryMode}</p>
                    <p><strong className="text-slate-800">Duration:</strong> {currentComp.duration}</p>
                    <p><strong className="text-slate-800">Sitting:</strong> {currentComp.sitting}</p>
                    <p><strong className="text-slate-800">Content type:</strong> {currentComp.contentType}</p>
                    <p><strong className="text-slate-800">Accents:</strong> {currentComp.accents}</p>
                    <p><strong className="text-slate-800">Difficulty:</strong> {currentComp.difficulty}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CLB 9 Importance for Express Entry */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-center">
              Why Is <span className="text-[#00c5cd]">CLB 9 Important</span> for Express Entry?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto font-normal">
              CLB 9 is the decisive benchmark for candidates aiming to maximize their Comprehensive Ranking System (CRS) score:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal space-y-1.5">
                <Award className="w-5 h-5 text-[#00c5cd]" />
                <p>Achieving CLB 9 triggers substantial CRS point gains, drastically improving chances of an Invitation to Apply (ITA).</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal space-y-1.5">
                <Globe className="w-5 h-5 text-[#00c5cd]" />
                <p>Point gains apply across all 4 communicative domains whether applying single or with a spouse/common-law partner.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal space-y-1.5">
                <Sparkles className="w-5 h-5 text-[#00c5cd]" />
                <p>An applicant without a spouse improving from CLB 8 to CLB 9 gains +32 CRS points from language proficiency alone.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DIFFERENCE BETWEEN PTE CORE & PTE ACADEMIC                              */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Difference between <span className="text-[#00c5cd]">PTE Core & PTE Academic</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Key syllabus and question type differences introduced in the PTE Core examination:
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
            <div className="grid grid-cols-3 bg-[#00c5cd] text-white text-xs font-bold p-3.5 tracking-wider uppercase">
              <div>Changes</div>
              <div className="text-center">PTE Core</div>
              <div className="text-center">PTE Academic</div>
            </div>
            <div className="divide-y divide-slate-100 text-xs text-slate-700">
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">Respond to a Situation</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-4 h-4" /></span>
                <span className="text-center text-rose-500 font-bold flex justify-center"><X className="w-4 h-4" /></span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center bg-slate-50/50">
                <span className="font-semibold text-slate-900">Write Email</span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-4 h-4" /></span>
                <span className="text-center text-rose-500 font-bold flex justify-center"><X className="w-4 h-4" /></span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">Write Essay</span>
                <span className="text-center text-rose-500 font-bold flex justify-center"><X className="w-4 h-4" /></span>
                <span className="text-center text-emerald-600 font-bold flex justify-center"><Check className="w-4 h-4" /></span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center bg-slate-50/50">
                <span className="font-semibold text-slate-900">Summarize Written Text</span>
                <span className="text-center font-medium">25 - 50 words (PTE Core)</span>
                <span className="text-center font-medium">5 - 75 words (Academic)</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="font-semibold text-slate-900">Summarize Spoken Text</span>
                <span className="text-center font-medium">20 - 30 words, 8 mins</span>
                <span className="text-center font-medium">50 - 70 words, 10 mins</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. NEW PTE CORE PRACTICE QUESTIONS EXPLORER                               */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              New <span className="text-[#00c5cd]">PTE Core Practice Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Discover format variations, word count changes, and preparation timing unique to PTE Core:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {[
                { id: 'situation', title: 'Respond to a Situation', tag: 'Speaking · 20s Prep' },
                { id: 'email', title: 'Write Email', tag: 'Writing · 9 Mins' },
                { id: 'swt', title: 'Summarize Written Text', tag: 'Reading 25-50 Words' },
                { id: 'sst', title: 'Summarize Spoken Text', tag: 'Listening 20-30 Words' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveQuestionTab(item.id)}
                  className={`w-full p-4 rounded-xl text-left border transition cursor-pointer flex flex-col gap-1 ${
                    activeQuestionTab === item.id
                      ? 'border-[#00c5cd] bg-cyan-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-bold ${activeQuestionTab === item.id ? 'text-[#00c5cd]' : 'text-slate-800'}`}>
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-500">{item.tag}</span>
                </button>
              ))}
            </div>

            {/* Right Question Card */}
            <div className="lg:col-span-8 bg-slate-50/70 p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              
              {activeQuestionTab === 'situation' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#f0854d]">Respond to a Situation</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      This question requires you to listen to and read a real-life situation. You will have 20 seconds to prepare your response, followed by 40 seconds to speak your answer clearly into the microphone.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sample Question 1:</span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">What do you say to your RA?</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      &ldquo;As a university student sharing an apartment with an inconsiderate roommate, you have attempted discussions without success. Frustrated and unsure of what to do, phone your resident advisor explaining the situation.&rdquo;
                    </p>
                    
                    {/* Authentic Pearson Audio Player Bar */}
                    <div className="border border-slate-200/90 rounded-lg p-3 bg-slate-50">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Audio Player</span>
                        <span className="text-[#00c5cd] font-semibold">Playing</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-[#00c5cd] rounded-full w-2/5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeQuestionTab === 'email' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#00c5cd]">Write Email</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      You will read a prompt describing a workplace or social scenario. You have 9 minutes to draft an email of approximately 100 words adhering to the provided bulleted instructions.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sample Question 1:</span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">Inquire about community library workshop</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      &ldquo;Write an email to the community center manager inquiring about upcoming digital literacy classes. Ask about the schedule, required prerequisites, and course registration fees.&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {activeQuestionTab === 'swt' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#00c5cd]">Summarize Written Text</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Read an academic or workplace passage and compose a single full sentence summary between 25 and 50 words within 10 minutes.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Passage Length: ~200 Words</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      &ldquo;Modern urban planning increasingly balances density with green infrastructure. By investing in shaded pedestrian walkways and urban tree canopies, cities reduce heat island effects while improving citizen wellness.&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {activeQuestionTab === 'sst' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#00c5cd]">Summarize Spoken Text</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Listen to a short audio prompt and write a concise summary of 20 to 30 words within 8 minutes.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Audio Length: 60 - 90 Seconds</span>
                    <div className="border border-slate-200/90 rounded-lg p-3 bg-slate-50">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Audio Player</span>
                        <span className="text-[#00c5cd] font-semibold">Playing</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-[#00c5cd] rounded-full w-3/5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <Link to="/pte-speaking-practice" className="px-5 py-2 rounded-full bg-[#f0854d] hover:bg-[#e0753d] text-white font-bold text-xs shadow-xs transition">
                  View More Questions
                </Link>
                <Link to="/mock-tests" className="px-5 py-2 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-bold text-xs shadow-xs transition">
                  Start Your Practice Test
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. HOW TO BOOK THE PTE CORE EXAM STEP-BY-STEP                             */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How to Book the <span className="text-[#00c5cd]">PTE Core Exam Step-by-Step Guide</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Booking your official PTE Core exam is simple and completed online via Pearson:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'Visit the official Pearson PTE website',
                desc: 'Navigate to the Pearson PTE portal and select PTE Core as your intended test format.'
              },
              {
                step: '02',
                title: 'Create your myPTE account',
                desc: 'Register using your full legal name, date of birth, and identity details exactly matching your valid passport.'
              },
              {
                step: '03',
                title: 'Choose your test location',
                desc: 'Search for an authorized Pearson Professional Test Centre in your preferred country or city.'
              },
              {
                step: '04',
                title: 'Select your exam date and time',
                desc: 'Review open calendar appointments and book a date allowing ample preparation time.'
              },
              {
                step: '05',
                title: 'Pay the exam fee',
                desc: 'Review local country test fees and complete payment through secure credit card or debit card.'
              },
              {
                step: '06',
                title: 'Confirm your booking',
                desc: 'Receive your booking confirmation email with reporting instructions and test center guidelines.'
              }
            ].map((s, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-200 text-[#00c5cd] font-bold text-xs flex items-center justify-center">
                  {s.step}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 text-center max-w-2xl mx-auto shadow-2xs">
            PTE Core must be taken at an authorized test centre. Official tests cannot be taken from home.
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FEES, CANCELLATION & REFUND POLICIES                                   */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core Exam <span className="text-[#00c5cd]">Fees and Cancellation Policy</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Official Pearson pricing and cancellation refund tiers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">More than 14 calendar days</span>
              <div className="text-lg font-black text-emerald-600">Full Refund</div>
              <p className="text-xs text-slate-500 font-normal">Reschedule for free or cancel for full refund.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Between 14 and 7 days</span>
              <div className="text-lg font-black text-amber-600">50% Refund</div>
              <p className="text-xs text-slate-500 font-normal">Receive a 50% partial refund on cancellation.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">7 calendar days or less</span>
              <div className="text-lg font-black text-rose-600">No Refund</div>
              <p className="text-xs text-slate-500 font-normal">No refund provided for late cancellations or no-shows.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. ALIGNMENT BETWEEN PTE CORE AND CLB (INTERACTIVE)                       */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Alignment between <span className="text-[#00c5cd]">PTE Core and CLB</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Based on empirical research, Pearson established the official concordance between PTE Core scores and Canadian Language Benchmarks (CLB):
            </p>
          </div>

          {/* Interactive CLB Selector */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00c5cd]" />
                <span className="text-xs sm:text-sm font-bold text-slate-900">Select Target CLB Level:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {[10, 9, 8, 7, 6, 5, 4, 3].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedClb(lvl)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedClb === lvl
                        ? 'bg-[#00c5cd] text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Score Indicators for Selected CLB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                    Listening
                  </span>
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {clbScores[selectedClb].listening} <span className="text-[10px] text-slate-400 font-sans">SCORE</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(clbScores[selectedClb].minScore / 90) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Reading
                  </span>
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {clbScores[selectedClb].reading} <span className="text-[10px] text-slate-400 font-sans">SCORE</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(clbScores[selectedClb].minScore / 90) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-orange-600" />
                    Speaking
                  </span>
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {clbScores[selectedClb].speaking} <span className="text-[10px] text-slate-400 font-sans">SCORE</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 rounded-full" style={{ width: `${(clbScores[selectedClb].minScore / 90) * 100}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-sky-600" />
                    Writing
                  </span>
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {clbScores[selectedClb].writing} <span className="text-[10px] text-slate-400 font-sans">SCORE</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: `${(clbScores[selectedClb].minScore / 90) * 100}%` }} />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. WHY NINETYPTE IS THE SMART CHOICE                                      */}
      {/* ========================================================================= */}
      <section id="why-ninetypte" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why <span className="text-[#00c5cd]">NinetyPTE is the Smart Choice</span> for Your PTE Preparation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              To achieve your target PTE Core band for Canadian immigration, NinetyPTE combines authentic question banks, instant AI scoring, and full-length exam simulations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Complete Solution',
                desc: 'Comprehensive practice material, templates, strategy walkthroughs, and mobile app support tailored for Canadian immigration candidates.'
              },
              {
                title: 'Comprehensive Lessons',
                desc: 'In-depth video tutorials covering speaking pronunciation, email writing structures, and listening note-taking techniques.'
              },
              {
                title: 'Real Exam Questions',
                desc: 'Massive question banks reflecting 100% genuine Pearson PTE Core task formats and updated IRCC patterns.'
              },
              {
                title: 'AI Evaluation',
                desc: 'Instant, unbiased automated scoring identifying pronunciation gaps, grammar slips, and lexical fluency.'
              },
              {
                title: 'User-Friendly Interface',
                desc: 'Intuitive modern desktop and mobile study experience accessible anytime, anywhere.'
              },
              {
                title: 'Performance Analytics',
                desc: 'Track accuracy metrics, time management trends, and predicted CLB score progression over time.'
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-[#00c5cd]">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{card.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Platform Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 text-center">
              <div className="text-2xl font-black text-[#00c5cd]">95%</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">AI Accuracy</div>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 text-center">
              <div className="text-2xl font-black text-[#00c5cd]">7M+</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">AI Practice Clicks</div>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 text-center">
              <div className="text-2xl font-black text-[#00c5cd]">20,000+</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">Questions Bank</div>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 text-center">
              <div className="text-2xl font-black text-[#00c5cd]">3.0M+</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mt-1">Global Users</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. FREQUENTLY ASKED QUESTIONS (ACCORDION)                                 */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core – <span className="text-[#00c5cd]">Frequently Asked Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Get clear answers to all questions regarding the PTE Core exam variant:
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How is the PTE Core different from PTE Academic?',
                a: 'PTE Core tests general, practical English in everyday workplace and social settings for Canadian immigration and citizenship. PTE Academic focuses strictly on academic English for university and college admissions.'
              },
              {
                q: 'What are the modules in the PTE Core exam?',
                a: 'The test comprises three parts: Part 1 Speaking & Writing (50–65 mins), Part 2 Reading (27–37 mins), and Part 3 Listening (22–37 mins).'
              },
              {
                q: 'What is the total duration of the PTE Core exam?',
                a: 'The total duration is approximately 2 hours, completed in a single continuous testing session at an authorized Pearson Test Centre.'
              },
              {
                q: 'How is the PTE Core test scored?',
                a: 'PTE Core is scored 100% digitally by Pearson AI algorithms on a 10–90 scale for Overall score and for each of the four communicative skills (Speaking, Writing, Reading, Listening).'
              },
              {
                q: 'How fast are results released for the PTE Core Exam?',
                a: 'Most test takers receive their verified score report within 2 business days (typically under 48 hours).'
              },
              {
                q: 'Where can I take the PTE Core test?',
                a: 'PTE Core is delivered at over 500 certified Pearson Professional Test Centres across more than 115 countries worldwide.'
              }
            ].map((faq, idx) => {
              const isOpen = faqOpen[idx];
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c5cd] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#00c5cd]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 16. ENQUIRY / CONSULTATION FORM                                            */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-6 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ready to start your <span className="text-[#00c5cd]">preparation</span>?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Practice real exam-style questions, take scored mock tests, and track your progress with instant AI feedback designed to help you achieve your target CLB with confidence.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> AI Scoring</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Real Exam Qs</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> 24/7 Support</span>
              </div>
            </div>

            <div className="md:col-span-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-white">Enquiry Form</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input type="text" placeholder="Full Name*" className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00c5cd]" />
                <input type="text" placeholder="Institute / City*" className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00c5cd]" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input type="email" placeholder="Email Id*" className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00c5cd]" />
                <input type="tel" placeholder="Phone Number*" className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-hidden focus:border-[#00c5cd]" />
              </div>
              <textarea rows={2} placeholder="Your Message..." className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-hidden focus:border-[#00c5cd] resize-none" />
              <button 
                type="button"
                className="w-full py-2.5 rounded-xl bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Submit Enquiry
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
