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
  ShieldCheck, 
  FileText, 
  Timer, 
  BookOpen, 
  HelpCircle,
  MapPin,
  Flame,
  CheckCircle,
  Compass
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function PTEForNewZealandPage() {
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
      summary: 'New Zealand Acceptance: PTE Academic is 100% accepted by Immigration New Zealand (INZ) for all visa streams (including Skilled Migrant Category, student visas, and post-study work permits) and all 8 New Zealand universities. The test fee is approximately NZ$410. Score benchmark: Skilled Migrant requires minimum 58 overall, while bachelor programs require 50–58 and master programs require 58–65.'
    },
    grok: {
      tool: 'Grok',
      summary: 'PTE New Zealand Key Insights: 1) Fully approved by NZQA across all Institutes of Technology and Polytechnics (ITPs). 2) Administered across 6 modern test centers nationwide. 3) Computerized AI scoring ensures rapid score reporting within 48 hours to 5 days with zero human bias. 4) Generous cancellation policy offering 100% refund up to 14 days before test day.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'Immigration New Zealand Standards: INZ accepts PTE Academic test scores achieved within 2 years of application date. For Skilled Migrant Category residence visas, candidates must achieve an overall score of 58 or higher. All test centers utilize standard QWERTY keyboards and advanced palm-vein biometrics.'
    }
  };

  // Score benchmarks for NZ visas and higher education
  const scoreBenchmarks = [
    {
      level: 'Skilled Migrant Category (SMC)',
      score: '58+ Overall',
      relevance: 'Mandatory minimum English standard set by Immigration New Zealand for permanent residence.',
      tag: 'Residence Visa'
    },
    {
      level: 'Postgraduate & Master Degrees',
      score: '58 - 65 Overall',
      relevance: 'Standard entry for Level 8 & 9 qualifications across top New Zealand universities.',
      tag: 'Higher Education'
    },
    {
      level: 'Undergraduate Bachelor Degrees',
      score: '50 - 58 Overall',
      relevance: 'Entry requirement for Level 7 university degrees and advanced diplomas.',
      tag: 'Bachelor Entry'
    },
    {
      level: 'Diplomas & Vocational Programs',
      score: '42 - 50 Overall',
      relevance: 'Vocational training courses at ITPs and Private Training Establishments.',
      tag: 'Vocational / Diploma'
    }
  ];

  // Key policy highlights
  const policyPoints = [
    {
      title: 'Year-Round Test Scheduling',
      description: 'Official test centers across New Zealand conduct exams continuously throughout the calendar year, including select weekend and holiday sessions.'
    },
    {
      title: 'Standard NZ$410 Registration Fee',
      description: 'The standard test booking fee is approximately NZ$410 (inclusive of applicable taxes). Booking early avoids last-minute scheduling surcharges.'
    },
    {
      title: 'Clear Cancellation & Refund Timelines',
      description: 'Cancellations 14+ days before test date receive a 100% full refund. Rescheduling between 7 and 13 days prior provides a 50% partial refund. Under 7 days is non-refundable.'
    },
    {
      title: 'Rapid Automated AI Assessment',
      description: 'Results are objectively scored using Pearson’s patented AI engine and typically issued within 12 hours to 5 business days, ready to send directly to INZ or universities.'
    }
  ];

  // Test day requirements
  const testDayChecklist = [
    {
      title: 'Valid Passport ID',
      desc: 'Bring your original, valid physical passport on test day. Digital copies or expired documents are strictly prohibited.'
    },
    {
      title: 'Biometric Verification',
      desc: 'Test center staff will conduct secure palm-vein biometric scanning and capture a digital photograph prior to seating.'
    },
    {
      title: 'Secure Lockers Provided',
      desc: 'Personal belongings including mobile devices, watches, and bags are secured in dedicated lockers outside the computer lab.'
    },
    {
      title: 'Standard QWERTY Layout',
      desc: 'All test stations are equipped with standard English QWERTY keyboards and noise-cancelling microphone headsets.'
    }
  ];

  // Advantages for NZ applicants
  const nzAdvantages = [
    'Fully endorsed by NZQA (New Zealand Qualifications Authority) for international student admissions.',
    'Accepted for all Immigration New Zealand visa categories requiring certified English proficiency.',
    'Convenient two-hour single-session computer test covering Speaking, Writing, Reading, and Listening.',
    'Fast turnaround allowing quick lodgement of student visa or residency expressions of interest (EOI).',
    'Free and unlimited digital score sending directly through the Pearson online portal to New Zealand institutions.',
    'Available across 6 dedicated test centers located throughout the North and South Islands.'
  ];

  // FAQs List
  const faqs = [
    {
      q: 'Is PTE Academic accepted by Immigration New Zealand (INZ)?',
      a: 'Yes, Immigration New Zealand fully accepts PTE Academic as proof of English language ability for all residence, work, and student visa categories, including the Skilled Migrant Category (SMC) and the Post Study Work Visa.'
    },
    {
      q: 'What is the minimum PTE score required for New Zealand immigration?',
      a: 'For the Skilled Migrant Category (SMC) residence visa, Immigration New Zealand requires a minimum overall PTE Academic score of 58. For student visas, requirements depend on the level of study, ranging from 42 for Level 5 diplomas to 58–65 for postgraduate master\'s degrees.'
    },
    {
      q: 'How long are PTE scores valid for New Zealand visa applications?',
      a: 'PTE Academic test scores are valid for 2 years from the date of the test for both Immigration New Zealand visa lodgements and university admissions.'
    },
    {
      q: 'Where can I take the PTE Academic test in New Zealand?',
      a: 'New Zealand hosts 6 official Pearson test centers, with locations in major urban centers including Auckland, Wellington, and Christchurch. Tests can be scheduled throughout the year.'
    },
    {
      q: 'What is the refund policy if I need to cancel or reschedule in New Zealand?',
      a: 'If you cancel at least 14 full calendar days before your scheduled test date, you are eligible for a 100% refund. If you cancel between 7 and 13 days prior, you can receive a 50% partial refund. Cancellations made less than 7 days before the exam date are non-refundable according to Pearson guidelines.'
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
            Start Your Free Trial
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
            <span className="text-cyan-400 font-medium">PTE Exam Accepted in New Zealand</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Overview */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>INZ & NZQA Officially Recognized</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                PTE Exam Accepted in <span className="text-cyan-400">New Zealand</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                PTE Academic (Pearson Test of English) is a computer-based secure English language exam enabling candidates to prove their language proficiency for New Zealand university admissions, vocational training, and immigration visa categories.
              </p>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-2">
                <p>
                  PTE Academic is recognized by all 8 New Zealand universities, institutes of technology and polytechnics (ITPs), private training establishments (PTEs), and professional registration bodies.
                </p>
                <p>
                  Candidates in New Zealand can take the test across 6 modern test centers nationwide, with results typically available in 12 hours to 5 working days. The standard exam fee is approximately NZ$410 including taxes.
                </p>
              </div>

              {/* Author & Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-semibold block">NinetyPTE Academic Editorial</span>
                    <span className="text-[11px] text-slate-400">New Zealand Migration Guide</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 5 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 2026 INZ Policy
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

            {/* Right Column: Key NZ Visa Highlights Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-2xl relative space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Immigration New Zealand</span>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    Visa Pathways
                  </span>
                </div>

                {/* Visa Cards */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Skilled Migrant Category</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">PR Visa</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Permanent Residence Pathway</p>
                    </div>
                    <span className="text-sm font-extrabold text-cyan-400">Min 58</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Student Visas & Degrees</span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">All 8 Universities</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Bachelor, Master & PhD</p>
                    </div>
                    <span className="text-sm font-bold text-purple-400">50 - 65</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>NZQA Vocational Diplomas</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">ITPs & PTEs</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Polytechnic & Training Courses</p>
                    </div>
                    <span className="text-sm font-bold text-blue-400">42 - 50</span>
                  </div>
                </div>

                {/* Practical Snapshot */}
                <div className="pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">Exam Fee (NZD)</span>
                    <span className="text-sm font-bold text-white">~NZ$410</span>
                  </div>
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">NZ Test Centers</span>
                    <span className="text-sm font-bold text-cyan-400">6 Centers</span>
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
            
            {/* Section 1: What is the PTE Exam? */}
            <section id="what-is-pte" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    What is the <span className="text-cyan-600">PTE Exam?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Key testing rules, preparation, and administrative policies in New Zealand</p>
                </div>
              </div>

              {/* Subsection: Test Dates */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-cyan-600 font-extrabold text-lg">›</span>
                  <span>PTE Academic Test Dates</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-5">
                  Approved test centres in New Zealand conduct the PTE Academic exam throughout the calendar year, including select weekend schedules and public holidays, offering extensive booking flexibility.
                </p>
              </div>

              {/* Subsection: Preparation Material */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-cyan-600 font-extrabold text-lg">›</span>
                  <span>PTE Academic Preparation Material</span>
                </h3>
                <div className="text-sm text-slate-600 leading-relaxed pl-5 space-y-2">
                  <p>
                    Numerous study resources are available online. Among the options, <strong>NinetyPTE</strong> stands out as a highly reliable platform delivering updated prediction banks, authentic exam interfaces, and AI-scored mock tests.
                  </p>
                  <p>
                    Taking full-length scored mock exams enables candidates to master sectional pacing, become comfortable with question sequencing, and identify areas needing improvement.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <strong>Keyboard Note:</strong> New Zealand test centers use standard physical QWERTY computer keyboards. Practicing your typing rhythm on desktop keyboards prior to the exam is strongly recommended to ensure smooth performance in the Writing section.
                  </div>
                </div>
              </div>

              {/* Subsection: Cancellations, Transfers and Refunds */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-cyan-600 font-extrabold text-lg">›</span>
                  <span>Cancellations, Transfers and Refunds</span>
                </h3>
                <div className="text-sm text-slate-600 leading-relaxed pl-5 space-y-3">
                  <p>
                    If an emergency or scheduling conflict arises, you can adjust or cancel your PTE Academic appointment through your Pearson online account, online live chat, or via phone support.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                      <span className="text-xs font-bold text-emerald-800 block">14+ Days Before</span>
                      <span className="text-sm font-extrabold text-emerald-600">100% Refund</span>
                      <p className="text-[11px] text-emerald-700">Full refund granted</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                      <span className="text-xs font-bold text-amber-800 block">7 – 13 Days Before</span>
                      <span className="text-sm font-extrabold text-amber-600">50% Partial</span>
                      <p className="text-[11px] text-amber-700">Partial refund policy</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-center space-y-1">
                      <span className="text-xs font-bold text-red-800 block">Under 7 Days</span>
                      <span className="text-sm font-extrabold text-red-600">No Refund</span>
                      <p className="text-[11px] text-red-700">Fees are forfeited</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsection: Results & Test Day Check-in */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-cyan-600 font-extrabold text-lg">›</span>
                  <span>Test Day Check-in & AI Scoring</span>
                </h3>
                <div className="text-sm text-slate-600 leading-relaxed pl-5 space-y-3">
                  <p>
                    Test results are scored completely via Pearson’s automated AI system, ensuring objective evaluation free of subjective examiner variance. Score reports are typically published within 12 hours to 5 working days.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {testDayChecklist.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-900 text-xs">{item.title}</div>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 text-xs text-cyan-900">
                    <strong>Speaking Task Tip:</strong> For tasks such as <em>Describe Image</em>, you are given 25 seconds to review the graphic before a 40-second recording window commences.
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center sm:text-left">
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition shadow inline-flex items-center gap-2"
                >
                  <span>Start Your PTE Preparation Today on NinetyPTE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* Section 2: Callout CTA Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-black text-white">Interested in doing PTE for New Zealand?</h3>
                <p className="text-slate-300 text-sm">Reach out to our specialist advisors for test guidance and preparation material.</p>
              </div>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shrink-0 inline-flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Section 3: How PTE Academic Simplifies Migration and Studies in NZ */}
            <section id="simplifies-migration" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    How PTE Academic Simplifies Migration and Higher Studies in <span className="text-cyan-600">New Zealand?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Fast, streamlined, and dependable language verification</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Whether traveling to New Zealand for higher education, vocational training, or permanent residency, candidates require verified proof of English proficiency. Among recognized testing systems, PTE Academic provides a fast and convenient pathway.
                </p>

                <div className="space-y-2.5 pt-2">
                  {nzAdvantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="text-cyan-600 font-bold text-base shrink-0">›</span>
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 4: Score Requirements Matrix */}
            <section id="score-requirements" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    New Zealand Visa & Admission Score Benchmarks
                  </h2>
                  <p className="text-xs text-slate-500">Immigration New Zealand and university guidelines</p>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 border-b border-slate-200">Pathway</th>
                      <th className="py-3 px-4 border-b border-slate-200">Target Score</th>
                      <th className="py-3 px-4 border-b border-slate-200">Applicability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {scoreBenchmarks.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <span>{row.level}</span>
                          <span className="block text-[10px] text-cyan-600 font-semibold mt-0.5">{row.tag}</span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-cyan-600">
                          {row.score}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 leading-relaxed text-[11px]">
                          {row.relevance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: Why Choose PTE Academic for NZ & Who Accepts */}
            <section id="who-accepts" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Why Choose PTE Academic & Who Accepts <span className="text-cyan-600">PTE?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Universal institutional recognition across New Zealand</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  International students widely utilize Pearson PTE scores when enrolling across New Zealand educational institutions because of flexible test dates, rapid result publication, and predictable computer testing formats.
                </p>
                <p>
                  <strong>NZQA Recognition:</strong> The New Zealand Qualifications Authority (NZQA) officially validates PTE Academic as acceptable English proficiency evidence for international candidates pursuing qualifications at Institutes of Technology and Polytechnics (ITPs) and Private Training Establishments (PTEs).
                </p>
              </div>

              {/* Institution Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-900 block">All 8 Universities</span>
                  <span className="text-[10px] text-slate-500">Auckland, Otago, etc.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-900 block">ITP Polytechnics</span>
                  <span className="text-[10px] text-slate-500">Nationwide ITPs</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-900 block">Immigration NZ</span>
                  <span className="text-[10px] text-slate-500">All Visa Subclasses</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-900 block">NZQA Certified</span>
                  <span className="text-[10px] text-slate-500">Level 4 to 10 NZQF</span>
                </div>
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
                  <p className="text-xs text-slate-500">Clear answers for New Zealand test takers</p>
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

            {/* Section 7: Why Choose NinetyPTE over others? */}
            <section id="why-ninety-pte" className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 space-y-8">
              <div className="space-y-3 text-center sm:text-left">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Leading AI Practice Ecosystem
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Why Choose NinetyPTE over others?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  NinetyPTE provides comprehensive tools to elevate your performance: full-length mock tests, Pearson-matched AI scoring, instant diagnostics, verified question banks, and templates designed for New Zealand visa thresholds.
                </p>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">2M+</div>
                  <div className="text-xs text-slate-400 font-medium">Active Users</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">7,210+</div>
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
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> High-Frequency Material</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mock Exams</span>
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
                    onClick={() => scrollToSection('what-is-pte')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>What is the PTE Exam?</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('simplifies-migration')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>How PTE Simplifies NZ Migration</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('score-requirements')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Score Requirements for NZ Visas</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('who-accepts')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Why Choose PTE & Who Accepts?</span>
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
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-100">Practice Real Exam</span>
                <h4 className="text-lg font-black text-white">Targeting 58+ for New Zealand?</h4>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  Take a complete AI-scored mock exam with instant scorecard analytics matching Pearson VUE.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Timed 2-hour test simulation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Enabling Skills Diagnostics</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Oral Fluency & Pronunciation AI</span>
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
                <Link to="/pte-for-australia" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇦🇺 PTE for Australia Guide →
                </Link>
                <Link to="/pte-for-ireland" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇮🇪 PTE for Ireland Guide →
                </Link>
                <Link to="/pte-for-germany" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇩🇪 PTE for Germany Guide →
                </Link>
                <Link to="/pte-for-singapore" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇸🇬 PTE for Singapore Guide →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
