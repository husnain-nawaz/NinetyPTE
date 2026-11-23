import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Bot, 
  Zap, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ChevronDown, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Award,
  Globe, 
  Check, 
  FileText, 
  HelpCircle,
  Play,
  Briefcase,
  ShieldCheck,
  Stethoscope,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function PTEForUKPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeAiTool, setActiveAiTool] = useState(null);
  const [copied, setCopied] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // AI Summaries content
  const aiSummaries = {
    chatgpt: {
      tool: 'ChatGPT',
      summary: 'UKVI Acceptance: PTE Academic UKVI is a Home Office-approved Secure English Language Test (SELT) accepted by 99% of UK universities (including Russell Group institutions like Oxford, Cambridge, Imperial, and UCL) and UK Visas & Immigration (UKVI) for work visas (Skilled Worker, Health & Care Worker). Test format is 100% identical to PTE Academic, but includes a SELT URN number for visa application lodgement.'
    },
    grok: {
      tool: 'Grok',
      summary: 'UK PTE & SELT Snapshot: 1) Approved for all UK visa routes requiring 4 skills (B1/B2/C1 CEFR levels). 2) Administered across 250+ global test centers. 3) Standard score requirements: Postgrad (57–67), Undergrad (51–60), Foundation (36–50). 4) Fast turnaround delivering official results in 2 to 5 business days with direct UKVI digital verification.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'UK Home Office Standards: UKVI requires SELT-certified scores for Student Route (below degree level) and Work Visas. For degree-level study at Higher Education Providers (HEPs), both standard PTE Academic and PTE Academic UKVI are accepted. Results are valid for 2 years and scored objectively by Pearson’s patented AI system.'
    }
  };

  // Score benchmarks for UK courses and visas
  const ukScoreTiers = [
    {
      course: 'Postgraduate & Master Degrees',
      score: '57 – 67 Overall',
      cefr: 'CEFR B2 / C1',
      details: 'Required for Master of Science, MA, and MBA admissions across top UK universities.',
      badge: 'Level 7'
    },
    {
      course: 'Undergraduate Bachelor Degrees',
      score: '51 – 60 Overall',
      cefr: 'CEFR B2',
      details: 'Standard entry threshold for 3-year bachelor degree courses across UK institutions.',
      badge: 'Level 6'
    },
    {
      course: 'Foundation & Pathway Courses',
      score: '36 – 50 Overall',
      cefr: 'CEFR B1',
      details: 'Preparatory foundation programs, pre-sessional English, and higher national diplomas.',
      badge: 'Level 3 - 5'
    },
    {
      course: 'Skilled Worker & Health Care Visa',
      score: '43+ Overall (min 43 each)',
      cefr: 'CEFR B1 Level',
      details: 'Home Office mandatory minimum for UK Skilled Worker and Health & Care Worker visas.',
      badge: 'Work Route'
    }
  ];

  // Eligible Visas Breakdown
  const visaCategories = {
    study: [
      'Student Visa (formerly Tier 4 General)',
      'Pre-sessional & English Language pathways',
      'Undergraduate degree level courses (Level 6)',
      'Postgraduate, Master’s and PhD programs (Level 7 & 8)'
    ],
    work: [
      'Skilled Worker Visa (Home Office SELT Route)',
      'Health and Care Worker Visa',
      'Scale-up Worker Visa & High Potential Individual (HPI)',
      'Innovator Founder & Global Talent Visa'
    ]
  };

  // FAQs List
  const faqs = [
    {
      q: 'What is the difference between PTE Academic and PTE Academic UKVI?',
      a: 'The test format, question types, scoring criteria, and difficulty are 100% identical. The sole difference is that PTE Academic UKVI is administered at Home Office-approved test centers and generates a Unique Reference Number (URN) on your score report, which is required when submitting UK visa applications to UKVI.'
    },
    {
      q: 'Do all UK universities accept PTE Academic?',
      a: 'Yes, over 99% of UK universities accept PTE Academic, including the prestigious Russell Group institutions (University of Oxford, University of Cambridge, Imperial College London, UCL, University of Edinburgh, and King’s College London).'
    },
    {
      q: 'What score is required for a UK Skilled Worker Visa?',
      a: 'The UK Home Office requires a minimum CEFR B1 level for the Skilled Worker and Health & Care Worker visas, which corresponds to a minimum score of 43 in each of the four communicative skills (Speaking, Writing, Reading, and Listening) on PTE Academic UKVI.'
    },
    {
      q: 'How long are PTE scores valid for UK visa and university applications?',
      a: 'PTE Academic and PTE Academic UKVI scores are valid for 2 years from the date of the examination for both UK university admissions and UK Visas and Immigration (UKVI) applications.'
    },
    {
      q: 'How quickly are PTE UKVI results delivered?',
      a: 'PTE results are typically released within 2 to 5 business days. Once issued, your scores can be verified directly online by UK universities and the UK Home Office through your Pearson online portal.'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative">
      
      {/* Floating Vertical "Start Free Trial" Tab on Right Edge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <Link
          to="/auth?mode=signup"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider py-4 px-2.5 rounded-l-xl shadow-xl hover:shadow-cyan-500/20 transition-all flex flex-col items-center gap-2 group [writing-mode:vertical-rl] rotate-180"
        >
          <span className="flex items-center gap-1.5 font-extrabold tracking-wide">
            Start Free Trial
          </span>
        </Link>
      </div>

      {/* Hero Section Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
            <span>/</span>
            <span className="text-slate-400">PTE Acceptance countries</span>
            <span>/</span>
            <span className="text-cyan-400 font-medium">PTE Exam for UK</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Overview */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>UK Home Office Approved SELT • 99% University Acceptance</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Practice PTE Exam for the UK : <span className="text-cyan-400">Free Online Resources</span> with Artificial Intelligence Scoring
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                The United Kingdom is a premier global destination for higher education and career development, renowned for academic excellence, historic universities, and thriving industries.
              </p>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-2">
                <p>
                  Over 98% of UK universities — including the University of Oxford, University of Cambridge, Imperial, and UCL — accept PTE Academic scores. For work visas and select study categories, the UK Home Office recognizes PTE Academic UKVI as an official Secure English Language Test (SELT).
                </p>
                <p>
                  NinetyPTE provides comprehensive preparation tools, full-length mock exams, and instant AI scoring aligned with Pearson standards to help you achieve your target UK score with confidence.
                </p>
              </div>

              {/* Author & Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-semibold block">NinetyPTE Academic Team</span>
                    <span className="text-[11px] text-slate-400">UKVI & British Admissions Specialists</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 5 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 2026 Home Office Guidelines
                  </span>
                </div>

                <button 
                  onClick={handleShare}
                  className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-medium border border-slate-700"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/mock-tests"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition border border-slate-700 inline-flex items-center gap-2"
                >
                  <span>Take Free Practice Test</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Key UK Visa & SELT Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-2xl relative space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Home Office Approved</span>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    SELT Certified
                  </span>
                </div>

                {/* Score Benchmark Snapshot */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Skilled Worker Visa</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">Work Route</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">CEFR B1 (Minimum 43 each skill)</p>
                    </div>
                    <span className="text-sm font-extrabold text-cyan-400">43+ Each</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>UK Universities (Master's)</span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">Study Route</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Russell Group & Postgraduate Degrees</p>
                    </div>
                    <span className="text-sm font-bold text-purple-400">57 - 67</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Undergraduate Degrees</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Bachelor's</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Standard 3-Year UK Degree Programs</p>
                    </div>
                    <span className="text-sm font-bold text-blue-400">51 - 60</span>
                  </div>
                </div>

                {/* Turnaround & Reporting */}
                <div className="pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">Results Turnaround</span>
                    <span className="text-sm font-bold text-white">2 – 5 Days</span>
                  </div>
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">UK Acceptance</span>
                    <span className="text-sm font-bold text-cyan-400">99% Univs</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ============================================================= */}
          {/* LEFT COLUMN: Main Guide Content (8 cols)                      */}
          {/* ============================================================= */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section 1: Overview of PTE Academic UKVI */}
            <section id="academic-ukvi" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Pearson's Test of English Exam – <span className="text-cyan-600">PTE Academic UKVI</span>
                  </h2>
                  <p className="text-xs text-slate-500">Secure English Language Test (SELT) for UK study, work, and settlement</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  PTE Academic is a comprehensive English proficiency test conducted by Pearson to evaluate candidates seeking admission to international universities or applying for migration visas.
                </p>
                <p>
                  In the United Kingdom, over <strong>98% of higher education institutions</strong> accept PTE scores. Furthermore, the UK Home Office officially designates <strong>PTE Academic UKVI</strong> and <strong>PTE Home</strong> as approved Secure English Language Tests (SELT) for visa issuance.
                </p>
                <p>
                  NinetyPTE provides candidates with authentic simulated mock tests powered by machine-learning AI scoring algorithms, ensuring accurate diagnostics and objective performance evaluations free of human bias.
                </p>
              </div>
            </section>

            {/* Section 2: Unlocks More Opportunities */}
            <section id="opportunities" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Unlocks More Opportunities for <span className="text-cyan-600">PTE Exam for UK</span>
                  </h2>
                  <p className="text-xs text-slate-500">Accepted across professional sectors, healthcare bodies, and UKVI</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  In addition to UK universities, Pearson's PTE exam is officially recognized by UK Visas & Immigration (UKVI) for work visas. Regulatory bodies in healthcare, engineering, and finance accept PTE Academic as verified evidence of professional English proficiency.
                </p>
                <p>
                  Administered across more than <strong>250+ authorized test centers globally</strong>, candidates enjoy convenient local booking options. Because tests are scored by AI algorithms on computers, results avoid handwriting penalties or examiner variance and are typically delivered within <strong>5 working days</strong>.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition shadow inline-flex items-center gap-2"
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* Section 3: PTE for UK Work Visa */}
            <section id="work-visa" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    PTE for <span className="text-cyan-600">UK Work Visa</span>
                  </h2>
                  <p className="text-xs text-slate-500">Home Office-approved SELT options for non-EU and international applicants</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  For individuals relocating to the United Kingdom on work or employment visas, the UK Home Office mandates proof of English proficiency through a certified Secure English Language Test (SELT).
                </p>
                <p>
                  Pearson provides two primary SELT pathways for the UK:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>PTE Academic UKVI:</strong> A comprehensive 4-skill test (Speaking, Writing, Reading, Listening) required for Skilled Worker, Health & Care, and Student visas.</li>
                  <li><strong>PTE Home (A1, A2, B1):</strong> A conversational speaking-and-listening test designed for family, settlement, and British citizenship applications.</li>
                </ul>
              </div>

              {/* Three-Column Visa Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                {/* Column 1: For Study Visas */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-700 font-extrabold text-sm pb-1 border-b border-slate-200">
                    <GraduationCap className="w-4 h-4" />
                    <span>For Study Visas:</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {visaCategories.study.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: For Work Visas */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm pb-1 border-b border-slate-200">
                    <Briefcase className="w-4 h-4" />
                    <span>For Work Visas:</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {visaCategories.work.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Score Requirements by Degree Level */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-purple-700 font-extrabold text-sm pb-1 border-b border-slate-200">
                    <Award className="w-4 h-4" />
                    <span>PTE Score for Programs:</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="p-2 rounded bg-white border border-slate-200">
                      <strong className="block text-slate-900">Postgraduate Degrees:</strong>
                      <span className="text-cyan-600 font-bold">57 – 67 Overall</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-slate-200">
                      <strong className="block text-slate-900">Undergraduate Degrees:</strong>
                      <span className="text-blue-600 font-bold">51 – 60 Overall</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-slate-200">
                      <strong className="block text-slate-900">Foundation Courses:</strong>
                      <span className="text-purple-600 font-bold">36 – 50 Overall</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <Link
                  to="/mock-tests"
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-700 transition inline-flex items-center gap-1.5"
                >
                  <span>Start Your PTE Preparation Today on NinetyPTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* Section 4: Mid-Page Callout Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-black text-white">Need clarity on PTE requirements for UK?</h3>
                <p className="text-slate-300 text-sm">Contact our British visa and admissions advisors for personalized score targets.</p>
              </div>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shrink-0 inline-flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Section 5: Is PTE UKVI Different from PTE Academic? */}
            <section id="ukvi-difference" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Is PTE UKVI Different from <span className="text-cyan-600">PTE Academic?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Test format, question types, and administrative differences explained</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  In terms of content, timing, and scoring, there is <strong>no difference</strong> between PTE Academic and PTE Academic UKVI. Both exams consist of the exact same 2-hour computerized test covering Speaking & Writing, Reading, and Listening.
                </p>
                <p>
                  The distinction lies in the administrative registration and identity verification required by the UK Home Office. PTE Academic UKVI must be booked at a test center approved for UKVI testing, and your final scorecard includes a <strong>Unique Reference Number (URN)</strong> that Home Office visa caseworkers use to verify your credentials online.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 text-xs text-cyan-900 leading-relaxed">
                <strong>University Study Tip:</strong> For degree-level study (Bachelor’s, Master’s, PhD) at UK Higher Education Providers with a track record of compliance, most universities can assess your English ability using standard PTE Academic without requiring a UKVI-specific test. However, for courses below degree level, PTE Academic UKVI is mandatory.
              </div>
            </section>

            {/* Section 6: FAQs Accordion */}
            <section id="faqs" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions (FAQs)</h2>
                  <p className="text-xs text-slate-500">Essential answers regarding PTE Academic and UKVI tests</p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 font-bold text-slate-900 text-sm transition"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-cyan-600' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 7: Why Choose NinetyPTE over others? (Page 3) */}
            <section id="why-ninety-pte" className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 space-y-8">
              <div className="space-y-3 text-center sm:text-left">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Leading AI Practice Ecosystem
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Why Choose NinetyPTE over others?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  NinetyPTE delivers the tools you need to succeed: full-length mock exams, Pearson-matched AI scoring, detailed enabling skills analytics, high-frequency prediction banks, and templates designed for UK university and visa cutoffs.
                </p>
              </div>

              {/* Stat Grid (Matching Page 3) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">2M+</div>
                  <div className="text-xs text-slate-400 font-medium">Active Users</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">6,554</div>
                  <div className="text-xs text-slate-400 font-medium">Total Questions</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">5M</div>
                  <div className="text-xs text-slate-400 font-medium">AI Score Clicks</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">95%</div>
                  <div className="text-xs text-slate-400 font-medium">AI Accuracy Rate</div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Results</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Mock Exams</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> UKVI Aligned Material</span>
                </div>
                <Link
                  to="/auth?mode=signup"
                  className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm transition shadow-lg shadow-cyan-500/20 w-full sm:w-auto text-center"
                >
                  Join Now
                </Link>
              </div>
            </section>

          </div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: Sticky Sidebar with AI Summary & TOC (4 cols)   */}
          {/* ============================================================= */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. Summarise blog with AI */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span>Summarise blog with AI</span>
                </h3>
              </div>

              {/* AI Tool Selector Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveAiTool(activeAiTool === 'chatgpt' ? null : 'chatgpt')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-xs font-semibold ${
                    activeAiTool === 'chatgpt' 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Bot className="w-5 h-5 text-emerald-600" />
                  <span>ChatGPT</span>
                </button>

                <button
                  onClick={() => setActiveAiTool(activeAiTool === 'grok' ? null : 'grok')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-xs font-semibold ${
                    activeAiTool === 'grok' 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>Grok</span>
                </button>

                <button
                  onClick={() => setActiveAiTool(activeAiTool === 'perplexity' ? null : 'perplexity')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition text-xs font-semibold ${
                    activeAiTool === 'perplexity' 
                      ? 'bg-cyan-50 border-cyan-500 text-cyan-800 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-cyan-600" />
                  <span>Perplexity</span>
                </button>
              </div>

              {/* Dynamic AI Summary Content Area */}
              {activeAiTool && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-[11px] pb-1 border-b border-slate-200/60">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-600" />
                      {aiSummaries[activeAiTool].tool} Summary
                    </span>
                    <button 
                      onClick={() => setActiveAiTool(null)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>
                  <p>{aiSummaries[activeAiTool].summary}</p>
                </div>
              )}
            </div>

            {/* 2. Table of Contents */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base">Table of Contents</h3>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button 
                    onClick={() => scrollToSection('academic-ukvi')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>PTE Academic UKVI Overview</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('opportunities')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Opportunities for PTE in the UK</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('work-visa')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>PTE for UK Work & Study Visas</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('ukvi-difference')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Is PTE UKVI Different?</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('faqs')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Frequently Asked Questions (FAQs)</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('why-ninety-pte')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5 font-medium text-cyan-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
                    <span>Why Choose NinetyPTE over others?</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. Free Mock Test CTA Card */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-100">UKVI Simulation</span>
                <h4 className="text-lg font-black text-white">Targeting UK Study or Work?</h4>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  Take a complete 2-hour AI-scored mock exam with instant scorecard analytics matching Pearson VUE.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>SELT format simulation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Enabling Skills Breakdown</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Instant Scoring in 3 minutes</span>
                </div>
              </div>

              <Link
                to="/mock-tests"
                className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider text-center block hover:bg-slate-100 transition shadow"
              >
                Start Free Mock Test
              </Link>
            </div>

            {/* 4. Cross-Links to Other Country Guides */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">Other Destination Guides</h4>
              <div className="space-y-2">
                <Link to="/pte-for-usa" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇺🇸 PTE for USA Guide →
                </Link>
                <Link to="/pte-for-australia" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇦🇺 PTE for Australia Guide →
                </Link>
                <Link to="/pte-for-new-zealand" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇳🇿 PTE for New Zealand Guide →
                </Link>
                <Link to="/pte-for-ireland" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇮🇪 PTE for Ireland Guide →
                </Link>
                <Link to="/pte-for-germany" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇩🇪 PTE for Germany Guide →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
