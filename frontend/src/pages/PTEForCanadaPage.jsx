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
  Headphones,
  Mic,
  PenTool,
  BookOpen,
  Smartphone,
  MapPin,
  CheckCircle
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function PTEForCanadaPage() {
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
      summary: 'Canada Acceptance Overview: IRCC (Immigration, Refugees and Citizenship Canada) officially accepts Pearson tests: 1) PTE Core is designated for Canadian Permanent Residence (PR), Express Entry (FSWP, CEC, FSTP), and Provincial Nominee Programs (PNP). 2) PTE Academic is accepted by almost all Canadian universities and colleges (DLIs) and for Student Direct Stream (SDS) study permits. Scores map directly to Canadian Language Benchmarks (CLB 4 to CLB 10).'
    },
    grok: {
      tool: 'Grok',
      summary: 'Canada PTE Snapshot: 1) Approved alongside CELPIP and IELTS for all economic migration programs. 2) CLB 7 is the primary eligibility threshold for Federal Skilled Workers (Reading 60–68, Writing 69–78, Listening 60–70, Speaking 68–75). 3) 100% computer-based test delivered in 2 hours with fast AI scoring in 2 to 5 days. 4) Valid for 2 full years for IRCC immigration profiles.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'IRCC Policy Guidelines: For Express Entry maximum CRS points, candidates target CLB 9 or higher. PTE Core evaluates real-world communicative vocational skills in 2 hours. Over 290 test centers globally administer Pearson tests with results transmitted securely and verified directly through the IRCC portal.'
    }
  };

  // CLB to PTE Core Score Matrix
  const clbMatrix = [
    {
      clb: 'CLB 10',
      listening: '89 - 90',
      reading: '88 - 90',
      writing: '90',
      speaking: '89 - 90',
      target: 'Maximum CRS Points'
    },
    {
      clb: 'CLB 9',
      listening: '82 - 88',
      reading: '78 - 87',
      writing: '88 - 89',
      speaking: '84 - 88',
      target: 'Competitive Express Entry'
    },
    {
      clb: 'CLB 8',
      listening: '71 - 81',
      reading: '69 - 77',
      writing: '79 - 87',
      speaking: '76 - 83',
      target: 'Strong Express Entry'
    },
    {
      clb: 'CLB 7',
      listening: '60 - 70',
      reading: '60 - 68',
      writing: '69 - 78',
      speaking: '68 - 75',
      target: 'FSW Minimum Threshold'
    },
    {
      clb: 'CLB 5',
      listening: '39 - 49',
      reading: '42 - 50',
      writing: '51 - 60',
      speaking: '51 - 58',
      target: 'Federal Skilled Trades'
    }
  ];

  // 5 Tips to Score Well (Matching Page 2)
  const tipsToScoreWell = [
    {
      title: 'Have A Clear Understanding Of The Format',
      description: 'Preparing for PTE Canada requires knowing the basic structure of the test, syllabus, question format, and sectional allotted times to manage pacing efficiently.',
      icon: BookOpen
    },
    {
      title: 'Focus On Listening Skills',
      description: 'Listening assesses overall comprehension across international native accents. Enhance your auditory perception by practicing with diverse podcasts, academic lectures, and news broadcasts.',
      icon: Headphones
    },
    {
      title: 'Concentrate On Fluency and Pronunciation',
      description: 'Having a comprehensive command of natural oral flow is essential for Canadian study and immigration visas. Maintain steady speaking pacing without hesitation or microphone clipping.',
      icon: Mic
    },
    {
      title: 'Brush Up Your Writing Skills',
      description: 'Writing tasks evaluate grammatical range, lexical accuracy, coherence, and structure. Practice timed essay drafting and single-sentence summaries using NinetyPTE’s AI scoring portal.',
      icon: PenTool
    },
    {
      title: 'Involve Regular Reading Sessions',
      description: 'Reading comprehension requires quick skimming and scanning across varied academic and contemporary topics. Dedicated reading sessions build speed for fill-in-the-blanks and re-order tasks.',
      icon: FileText
    }
  ];

  // 8 FAQs (Matching PDF Page 3 1:1)
  const faqs = [
    {
      q: 'What PTE score is required for Canada immigration?',
      a: 'For Canadian economic immigration via Express Entry (Federal Skilled Worker Program), the minimum threshold is Canadian Language Benchmark (CLB) 7, which requires PTE Core scores of Listening 60–70, Reading 60–68, Writing 69–78, and Speaking 68–75. To maximize your Comprehensive Ranking System (CRS) score, targeting CLB 9 or higher is strongly recommended.'
    },
    {
      q: 'How do I register for the PTE Exam in Canada?',
      a: 'You can easily register online through the official Pearson PTE website (pearsonpte.com) or by purchasing a discounted voucher through NinetyPTE. You can choose either PTE Core (for immigration/PR) or PTE Academic (for study/university admissions), select your preferred test center across Canada or worldwide, and pick an available date.'
    },
    {
      q: 'Which sections are included in the PTE Exam for Canada?',
      a: 'The PTE exam for Canada includes four major communicative skills: Speaking, Writing, Reading, and Listening. The entire examination is conducted in a single 2-hour computerized session with no mandatory breaks.'
    },
    {
      q: 'How can I achieve good PTE scores for Canada?',
      a: 'Achieving a high score requires consistent practice with full-length AI-scored mock tests, mastering standard test templates, utilizing high-frequency exam prediction questions, and analyzing detailed scorecard diagnostics to address enabling skill weaknesses.'
    },
    {
      q: 'How long is the PTE score valid for Canada immigration?',
      a: 'PTE test scores are valid for 2 years from the date of the exam for both Immigration, Refugees and Citizenship Canada (IRCC) visa applications and Canadian designated learning institution (DLI) university admissions.'
    },
    {
      q: 'What are the benefits of taking the PTE Exam for Canada?',
      a: 'PTE offers fast turnaround times (results usually in 48 hours to 5 days), 100% objective computer scoring by AI algorithms free from human examiner bias, single 2-hour test duration, convenient year-round dates, and unlimited free electronic score sharing.'
    },
    {
      q: 'Can I use PTE scores for Canadian university admissions?',
      a: 'Yes! PTE Academic is accepted by almost all Canadian universities, colleges, and Designated Learning Institutions (DLIs) — including the University of Toronto, McGill, UBC, and University of Waterloo — as well as for Student Direct Stream (SDS) study permit applications.'
    },
    {
      q: 'When will I receive my PTE results for Canada?',
      a: 'PTE results are typically released within 48 hours, and guaranteed within 5 business days of completing your test. You will receive an email notification as soon as your official score report is available in your Pearson account.'
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
            <span className="text-cyan-400 font-medium">PTE for Canada</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Overview */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>IRCC Approved for Express Entry, PR & Study Permits</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                IRCC Accepts PTE for <span className="text-cyan-400">Canada Immigration</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Canada is a premier destination for immigrants, skilled professionals, and international students seeking world-class living standards, exceptional career growth, and clear permanent residence pathways.
              </p>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-2">
                <p>
                  Immigration, Refugees and Citizenship Canada (IRCC) officially recognizes <strong>PTE Core</strong> for all economic immigration programs (Express Entry, FSWP, CEC, FSTP, and PNPs), while <strong>PTE Academic</strong> is accepted by virtually all Canadian Designated Learning Institutions (DLIs) and for Student Direct Stream (SDS) study permits.
                </p>
                <p>
                  NinetyPTE provides comprehensive preparation tools, verified question prediction banks, and AI scoring calibrated to Canadian Language Benchmarks (CLB) to help you maximize your immigration score.
                </p>
              </div>

              {/* Author & Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-semibold block">NinetyPTE Immigration Team</span>
                    <span className="text-[11px] text-slate-400">IRCC & Canadian Admissions Specialists</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 6 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 2026 IRCC Guidelines
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

            {/* Right Column: IRCC Approved Highlights Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-2xl relative space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">IRCC Designated</span>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    Express Entry
                  </span>
                </div>

                {/* Score Benchmark Snapshot */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>PTE Core for Express Entry</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">PR Visa</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">FSWP, CEC, FSTP & Provincial Nominees</p>
                    </div>
                    <span className="text-sm font-extrabold text-cyan-400">CLB 7 – 9+</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>PTE Academic for Study</span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">DLI Colleges</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Student Direct Stream (SDS) & Universities</p>
                    </div>
                    <span className="text-sm font-bold text-purple-400">60+ Overall</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Official Test Validity</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">IRCC Rules</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Valid for all Canadian visa applications</p>
                    </div>
                    <span className="text-sm font-bold text-blue-400">2 Years</span>
                  </div>
                </div>

                {/* Turnaround & Reporting */}
                <div className="pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">Fast Results</span>
                    <span className="text-sm font-bold text-white">48h – 5 Days</span>
                  </div>
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">Global Centers</span>
                    <span className="text-sm font-bold text-cyan-400">290+ Centers</span>
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
            
            {/* Section 1: How Is IRCC Helpful for PTE in Canada? */}
            <section id="ircc-overview" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    How Is IRCC Helpful for <span className="text-cyan-600">PTE in Canada?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Official recognition by Immigration, Refugees and Citizenship Canada</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Canada is a supreme choice for individuals seeking to work, learn, and assemble their lives with their families. Welcoming thousands of newcomers annually strengthens Canada’s economy and adds vibrancy to communities nationwide.
                </p>
                <p>
                  Immigration, Refugees and Citizenship Canada (IRCC) oversees immigration, refugee protection, and citizenship programs. With the designation of <strong>PTE Core</strong>, IRCC provides an advanced, computer-delivered testing option alongside CELPIP and IELTS for all economic class applicants.
                </p>
                <p>
                  With Canada welcoming hundreds of thousands of international students annually, the acceptance of PTE Academic for study permits and student visas positions Canada as one of the world's most accessible higher education destinations.
                </p>
              </div>
            </section>

            {/* Section 2: Why PTE Canada? */}
            <section id="why-pte-canada" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Why <span className="text-cyan-600">PTE Canada?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Tailored testing for vocational English and academic success</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  PTE is a computer-based English exam assessing language proficiency across non-native English speakers. The exam is structured into two distinct versions depending on your Canadian goals:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-cyan-600" />
                      <span>PTE Core (Immigration & PR)</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Specifically designed to assess everyday, vocational English skills for Canadian Permanent Residence, Express Entry, and Provincial Nominee Programs.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <span>PTE Academic (Study & SDS)</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Assesses higher-education academic English for admissions across Canadian universities, colleges, and for Student Direct Stream (SDS) study permits.
                    </p>
                  </div>
                </div>
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

            {/* Section 3: Mid-Page Callout Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-black text-white">Need clarity on PTE requirements for Canada?</h3>
                <p className="text-slate-300 text-sm">Contact our Canadian immigration advisors for personalized CLB score targets.</p>
              </div>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shrink-0 inline-flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Section 4: CLB to PTE Core Score Matrix */}
            <section id="clb-score-matrix" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Canadian Language Benchmark (CLB) Score Matrix
                  </h2>
                  <p className="text-xs text-slate-500">Official IRCC equivalency table for PTE Core</p>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 border-b border-slate-200">CLB Level</th>
                      <th className="py-3 px-4 border-b border-slate-200">Listening</th>
                      <th className="py-3 px-4 border-b border-slate-200">Reading</th>
                      <th className="py-3 px-4 border-b border-slate-200">Writing</th>
                      <th className="py-3 px-4 border-b border-slate-200">Speaking</th>
                      <th className="py-3 px-4 border-b border-slate-200">Express Entry Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {clbMatrix.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {row.clb}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{row.listening}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{row.reading}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{row.writing}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{row.speaking}</td>
                        <td className="py-3.5 px-4 font-bold text-cyan-600 text-[11px]">{row.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: How Can You Score Well & 5 Tips (Page 2) */}
            <section id="tips-to-score-well" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Tips To Follow for Scoring Well in the <span className="text-cyan-600">PTE Exam for Canada</span>
                  </h2>
                  <p className="text-xs text-slate-500">Core strategies to reach CLB 7 to CLB 9+ on your test</p>
                </div>
              </div>

              <div className="space-y-4">
                {tipsToScoreWell.map((tip, idx) => {
                  const Icon = tip.icon;
                  return (
                    <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 hover:border-cyan-300 transition">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{tip.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9.5">
                        {tip.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/mobile-app"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition shadow inline-flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Download Our Mobile App</span>
                </Link>
                <Link
                  to="/mock-tests"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider transition border border-slate-700 inline-flex items-center gap-2"
                >
                  <span>Start Practice on NinetyPTE</span>
                </Link>
              </div>
            </section>

            {/* Section 6: FAQs Accordion (Page 3 - 8 FAQs) */}
            <section id="faqs" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions (FAQs)</h2>
                  <p className="text-xs text-slate-500">Comprehensive answers to common Canadian immigration & study questions</p>
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
                  Canada's Leading Practice Ecosystem
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Why Choose NinetyPTE over others?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  NinetyPTE delivers premier preparation capabilities calibrated to IRCC CLB benchmarks: scored mock exams, Pearson-aligned AI scoring engine, instant enabling skills diagnostics, question prediction files, and proven templates.
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
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> CLB Mapped AI Scoring</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full Mock Tests</span>
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
                    onClick={() => scrollToSection('ircc-overview')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>How Is IRCC Helpful for PTE?</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('why-pte-canada')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Why PTE Canada?</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('clb-score-matrix')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>CLB Score Equivalency Matrix</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('tips-to-score-well')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Tips to Score Well for Canada</span>
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
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-100">CLB Simulation</span>
                <h4 className="text-lg font-black text-white">Targeting CLB 7 to CLB 9+?</h4>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  Take a complete 2-hour AI-scored mock exam with instant scorecard analytics matching Pearson VUE & IRCC.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>PTE Core & Academic formats</span>
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
                <Link to="/pte-for-uk" className="block p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 transition text-xs font-semibold text-slate-700">
                  🇬🇧 PTE for UK & UKVI Guide →
                </Link>
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
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
