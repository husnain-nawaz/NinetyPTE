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
  Euro, 
  Briefcase, 
  FileCheck, 
  ChevronRight, 
  Info, 
  X, 
  Check, 
  Award,
  Globe,
  ExternalLink
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function PTEForIrelandPage() {
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
      summary: 'Ireland is Europe’s primary English-speaking tech hub and fully accepts PTE Academic across all top universities (Trinity College Dublin, UCD, UCC, DCU). Required scores: Diploma (50–58), Bachelor’s (58–63), Master’s (63–65+). Ireland offers the attractive Third Level Graduate Scheme (Stamp 1G) providing a 2-year post-study work visa for Master’s graduates and a 1-year stay back for Bachelor’s graduates.'
    },
    grok: {
      tool: 'Grok',
      summary: 'Ireland Study & PTE Snapshot: 1) PTE Academic is accepted for both university admissions and Irish Department of Justice study visas. 2) Known as the "Silicon Docks," Dublin hosts European HQs for Google, Apple, Meta, and Pfizer. 3) Average tuition is €10k–€25k/yr with living expenses of €7k–€12k. 4) Direct pathway to Critical Skills Employment Permits and permanent residency.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'Key Facts for Ireland PTE Applicants: Official test results delivered in under 48 hours. Minimum score benchmarks: Trinity College Dublin requires 63 overall with no section under 59. Scores are valid for 2 years. International graduates enjoy up to 24 months post-study work rights under the Stamp 1G graduate visa.'
    }
  };

  // Top Universities Data (Page 1 & 2)
  const topUniversities = [
    { name: 'Trinity College Dublin (TCD)', rank: '#1 in Ireland (QS)', minScore: '63+ (min 59 each)', location: 'Dublin', popular: 'Computer Science, Immunology, Law' },
    { name: 'University College Dublin (UCD)', rank: 'Top 1% Worldwide', minScore: '63+', location: 'Dublin', popular: 'Data Analytics, Engineering, MBA' },
    { name: 'University College Cork (UCC)', rank: 'Top Research Hub', minScore: '63+ (min 59 each)', location: 'Cork', popular: 'Pharma Sciences, Food Business' },
    { name: 'Dublin City University (DCU)', rank: 'Top Young University', minScore: '58 - 63', location: 'Dublin', popular: 'Biotechnology, Fintech, Media' },
    { name: 'University of Galway', rank: 'Excellence in MedTech', minScore: '58 - 63', location: 'Galway', popular: 'Biomedical Engineering, Data Science' },
    { name: 'University of Limerick (UL)', rank: 'Industry Placement Leader', minScore: '58 - 63', location: 'Limerick', popular: 'Aeronautical Eng, Software Dev' },
    { name: 'Maynooth University', rank: 'Top Research & Humanities', minScore: '58 - 63', location: 'Maynooth', popular: 'Artificial Intelligence, Finance' },
    { name: 'Technological University Dublin (TU Dublin)', rank: 'Career & Tech Focused', minScore: '56 - 62', location: 'Dublin', popular: 'Hospitality, Construction, IT' },
    { name: 'National College of Ireland (NCI)', rank: 'Fintech & Cloud Hub', minScore: '50 - 58', location: 'Dublin', popular: 'Cloud Computing, Cybersecurity' }
  ];

  // FAQs List (Matching Page 3 & 4 of PDF & User Screenshot 1:1)
  const faqs = [
    {
      q: 'Is PTE accepted in Ireland?',
      a: 'Yes, PTE Academic is widely recognized by Irish universities, Institutes of Technology, and the Irish Naturalisation and Immigration Service (INIS / Department of Justice) for university admissions and student visa issuance.'
    },
    {
      q: 'What PTE score is required for Ireland?',
      a: 'Requirements depend on your study level: Diploma/Foundation programs require 50–58, Bachelor\'s degrees typically require 58–63, and Master\'s or Postgraduate programs generally require 63–65. Leading universities like Trinity College Dublin and UCC specify an overall score of 63 with no sub-skill below 59.'
    },
    {
      q: 'Is PTE easier than IELTS for Ireland?',
      a: 'Many test takers find PTE Academic more predictable and less stressful than IELTS because it is 100% computer-based and scored by unbiased AI algorithms. Speaking is recorded on a headset without an in-person examiner, and results are delivered rapidly within 48 hours.'
    },
    {
      q: 'How long is a PTE score valid for Ireland?',
      a: 'PTE Academic scores are valid for 2 years from the date of your exam. You can send your official score report to Irish universities directly through your Pearson online profile free of charge.'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & METADATA BAR                                          */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 border-b border-slate-100 py-3 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-1.5 font-medium">
            <Link to="/" className="hover:text-cyan-600 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/about-pte" className="hover:text-cyan-600 transition">PTE Acceptance Countries</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">PTE for Ireland</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-cyan-600 transition cursor-pointer font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN TWO-COLUMN ARTICLE CONTAINER                                      */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* --------------------------------------------------------------------- */}
          {/* LEFT / MAIN ARTICLE BODY (8 Columns)                                  */}
          {/* --------------------------------------------------------------------- */}
          <main className="lg:col-span-8 space-y-10">
            
            {/* Article Heading & Author Info */}
            <header className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold border border-cyan-100">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>PTE Academic • Study Abroad Guide • Ireland</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                PTE for Ireland: Complete Guide for Students
              </h1>

              {/* Author, Date, Reading time row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Fatima Khan</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00c2cb]" />
                </div>
                <span>•</span>
                <div>Reviewed by <strong className="text-slate-800">Zuhair Rizvi</strong></div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>5 min read</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last updated on 27 Jun 2026</span>
                </div>
              </div>
            </header>

            {/* Hero Graphic Card (1:1 with reference PDF) */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#072d24] to-[#004d40] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-4 max-w-xl">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 uppercase tracking-wider">
                  Ireland European Tech &amp; Pharma Capital
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  PTE FOR IRELAND: <br />
                  <span className="text-[#00c2cb]">Complete Guide for Students</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Unlock access to Ireland&apos;s world-class research universities, leading multinational tech hubs, and up to 2 years of post-study graduate work rights.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95"
                  >
                    Start Free Trial &gt;
                  </Link>
                  <Link
                    to="/mobile-app"
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
                  >
                    Download App
                  </Link>
                </div>
              </div>
            </div>

            {/* Intro Prose */}
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal space-y-4">
              <p>
                Many universities and colleges in Ireland accept the <strong>PTE Academic</strong> exam, making it a flexible, accurate, and reliable English proficiency test for students worldwide seeking admission to higher education institutions across Ireland.
              </p>
            </div>

            {/* Section 1: Why Study in Ireland? */}
            <section id="why-study-ireland" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Study in Ireland?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Ireland has quickly become a preferred destination for international students due to its strong academic reputation, English-speaking culture, and career-focused education system.
              </p>

              <div className="space-y-2.5 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="font-bold text-slate-900 pb-1">Key reasons why students prefer Ireland include:</div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Globally ranked universities:</strong> Irish universities rank in the top 1% of research institutions worldwide with internationally accredited qualifications.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Industry-focused courses:</strong> Curriculums closely combine academic theory with practical projects, paid co-op internships, and business partnerships.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Strong job market:</strong> Renowned as the &ldquo;Silicon Docks of Europe,&rdquo; hosting European headquarters of Apple, Google, Meta, Pfizer, and Stripe.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>High graduate employability:</strong> Fast-growing European economy with increasing high-salary career opportunities for skilled graduates.</span>
                </div>
              </div>
            </section>

            {/* Section 2: Top PTE Accepted Universities in Ireland */}
            <section id="accepted-universities" className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Top PTE Accepted Universities in Ireland
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Several top universities in Ireland accept PTE Academic scores for admission into undergraduate and postgraduate programs:
                </p>
              </div>

              {/* Universities Table */}
              <div className="rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      <th className="p-3.5">University</th>
                      <th className="p-3.5 hidden sm:table-cell">City</th>
                      <th className="p-3.5">Min PTE Score</th>
                      <th className="p-3.5 hidden md:table-cell">Popular Disciplines</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topUniversities.map((u, idx) => (
                      <tr key={idx} className="hover:bg-cyan-50/40 transition">
                        <td className="p-3.5 font-bold text-slate-900">{u.name}</td>
                        <td className="p-3.5 text-slate-500 hidden sm:table-cell">{u.location}</td>
                        <td className="p-3.5 font-black text-[#00c2cb]">{u.minScore}</td>
                        <td className="p-3.5 text-slate-500 hidden md:table-cell">{u.popular}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-500 italic">
                Each university has its own entry requirements, so students should always check program-specific criteria before applying.
              </div>
            </section>

            {/* Section 3: Minimum PTE Score Requirements for Ireland */}
            <section id="score-requirements" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Minimum PTE Score Requirements for Ireland
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                The PTE score required for Ireland depends mainly on the level of study and course requirements:
              </p>

              {/* Score Matrix Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-cyan-200 bg-white shadow-2xs space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Diploma Programs</div>
                  <div className="text-2xl font-black text-slate-900">50 - 58</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Students generally need a score of 50–58 for foundation diplomas and pathway certificates.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-cyan-200 bg-white shadow-2xs space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Bachelor&apos;s Degrees</div>
                  <div className="text-2xl font-black text-slate-900">58 - 63</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Most universities expect around 58–63 overall with balanced communicative skills.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-cyan-200 bg-white shadow-2xs space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Master&apos;s Programs</div>
                  <div className="text-2xl font-black text-slate-900">63 - 65+</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The requirement is usually higher, typically 63–65 or above for M.Sc., M.Eng., and MBA degrees.
                  </p>
                </div>
              </div>

              {/* Concrete Examples Callout Box */}
              <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900">Official Score Benchmark Examples:</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
                  <span><strong>Trinity College Dublin:</strong> PTE 63 overall, with no section below 59</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
                  <span><strong>University College Cork:</strong> PTE 63 overall, with no section below 59</span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 italic">
                  Disclaimer: Score requirements vary by university and course, and students should always check the official admission guidelines before applying.
                </div>
              </div>
            </section>

            {/* Section 4: Benefits of Taking PTE for Ireland */}
            <section id="benefits" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Benefits of Taking PTE for Ireland
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Choosing the PTE exam for Ireland offers several advantages for international students planning their studies abroad:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Rapid score turnaround:</strong> PTE results are typically available within 48 hours.</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <Bot className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Objective AI scoring:</strong> The test is fully computer-scored using advanced AI technology without human bias.</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Flexible test bookings:</strong> Students can book PTE exams multiple times during the year.</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Extensive Irish recognition:</strong> Recognized across public universities and colleges for both undergraduate and postgraduate levels.</span>
                </div>
              </div>
            </section>

            {/* Section 5: Ireland Student Visa Requirements */}
            <section id="visa-requirements" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Ireland Student Visa Requirements
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To study in Ireland, international students from outside the EEA must obtain an Irish Student Visa. Key requirements include:
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Letter of Acceptance:</strong> Official unconditional offer from a recognized Irish university on the Interim List of Eligible Programmes (ILEP).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Financial proof:</strong> Evidence of sufficient funds to cover tuition and a minimum of €10,000 for living costs.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Valid health insurance:</strong> Private medical insurance coverage for the entire duration of study.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Valid passport:</strong> Valid for at least 12 months beyond the expected course completion date.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>English language proof:</strong> Official Pearson PTE Academic score meeting university and immigration minimums.</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic">
                Meeting these requirements along with a good PTE score for Ireland increases the chances of a successful visa application and smooth admission process.
              </div>
            </section>

            {/* Section 6: Popular Courses in Ireland */}
            <section id="popular-courses" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Popular Courses in Ireland
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Ireland offers a wide range of career-focused programs that attract students from around the world. Popular fields include:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold text-slate-800">
                {[
                  'Data Science',
                  'Artificial Intelligence',
                  'Business Analytics',
                  'Computer Science',
                  'Cyber Security',
                  'Finance & Fintech',
                  'Nursing & Healthcare',
                  'Pharmaceutical Sciences'
                ].map((course, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Cost of Studying in Ireland */}
            <section id="cost-of-studying" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Cost of Studying in Ireland
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                The cost of studying in Ireland depends on the university and program level:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl border border-cyan-200 bg-white space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Tuition Fees</div>
                  <p className="text-slate-600 leading-relaxed">
                    Undergraduate tuition fees range from <strong>€10,000 to €25,000 per year</strong>, while postgraduate Master&apos;s degrees typically range between <strong>€12,000 and €35,000 per year</strong> depending on the institution.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-cyan-200 bg-white space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Living Expenses</div>
                  <p className="text-slate-600 leading-relaxed">
                    Living expenses (accommodation, groceries, utilities, and transport) generally range from <strong>€7,000 to €12,000 per year</strong> (approx. €800–€1,200/month).
                  </p>
                </div>
              </div>

              {/* Need More Guidance Callout */}
              <div className="p-6 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-black">
                    Need More Guidance for Ireland Admissions?
                  </h4>
                  <p className="text-xs text-slate-300">
                    Connect with NinetyPTE advisors for personalized study timelines and PTE exam voucher discounts.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95 shrink-0"
                >
                  Contact us
                </Link>
              </div>
            </section>

            {/* Section 8: Post-Study Work Opportunities in Ireland */}
            <section id="work-opportunities" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Post-Study Work Opportunities in Ireland
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Ireland offers strong post-study work opportunities for international graduates:
              </p>

              <div className="space-y-3">
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#00c2cb]" />
                    <span>Stay Back Option (Third Level Graduate Programme)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Allows international graduates to stay in Ireland for up to <strong>1–2 years</strong> (1 year for Bachelor&apos;s Honours, 2 years for Master&apos;s and PhD) to seek employment without requiring immediate work permit sponsorship.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#00c2cb]" />
                    <span>Graduate Employment Pathways</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Graduates secure professional roles across IT, finance, engineering, and biotechnology with competitive European compensation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#00c2cb]" />
                    <span>European Tech &amp; Pharma Headquarters</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Home to European headquarters of global titans including Google, Meta, Microsoft, Apple, Pfizer, and Johnson &amp; Johnson.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Why Choose NinetyPTE for Ireland Preparation? */}
            <section id="why-ninetypte" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Choose <span className="text-[#00c2cb]">NinetyPTE</span> for Ireland Preparation?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                NinetyPTE is designed to help learners achieve the strong PTE score required for Ireland by offering focused practice tools and structured preparation:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">AI-Scored PTE Mock Tests</div>
                  <p className="text-slate-500">Provide real exam-like scoring and highlight weak skill areas for quick improvement.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">Section-Wise Practice</div>
                  <p className="text-slate-500">Master Speaking, Writing, Reading, and Listening modules with real question items.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">Simulated Test Environment</div>
                  <p className="text-slate-500">Exact replica of Pearson testing engine with countdown timers and speech prompts.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">Prediction Files</div>
                  <p className="text-slate-500">Curated high-frequency question sets updated for the 2026 exam cycle.</p>
                </div>
              </div>

              {/* Cross-Link Card */}
              <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Read Also: <Link to="/pte-for-germany" className="text-[#00c2cb] font-bold hover:underline">PTE for Germany: Requirements, Accepted Universities, and Score Guide</Link>
                </span>
                <ChevronRight className="w-4 h-4 text-[#00c2cb] shrink-0" />
              </div>
            </section>

            {/* Section 10: FAQs Accordion (1:1 with user screenshot & PDF) */}
            <section id="faqs" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;

                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs transition"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {faq.q}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#00c2cb]' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Start PTE Journey Callout matching Page 4 */}
              <div className="p-6 rounded-2xl bg-cyan-50/50 border border-cyan-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  Studying in Ireland can open doors to global opportunities, and achieving a good PTE score for Ireland is the first step toward that journey.
                </p>
                <p>
                  With the right preparation strategy, students can secure admission in top Irish universities and build a successful international career. Start practicing today and move closer to your dream of studying in Ireland.
                </p>
              </div>
            </section>

            {/* Author Profile Card (Page 4) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 shadow-sm shrink-0">
                <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl">
                  FK
                </div>
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base font-black text-slate-900">Fatima Khan</h3>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <LinkedInIcon className="w-4 h-4 fill-blue-600" />
                  </a>
                </div>
                <div className="text-xs font-bold text-[#00c2cb]">
                  English Language Expert &amp; Head of Training at NinetyPTE
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  As an English Language Expert, I am passionate about empowering the global aspirants community to achieve their dream scores through smarter learning and strategic preparation. I understand proficiency exams like PTE and IELTS inside out.
                </p>
              </div>
            </div>

            {/* Free Mock Test Card */}
            <div className="p-6 rounded-2xl border border-cyan-200 bg-white shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-500">Experienced the real PTE exam.</div>
                <div className="text-base font-black text-slate-900">TAKE A FREE MOCK TEST NOW!</div>
              </div>
              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs transition"
              >
                Sign up
              </Link>
            </div>

            {/* Previous & Next Article Navigation */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
              <Link 
                to="/pte-for-singapore" 
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#00c2cb] transition"
              >
                <span>&larr; PTE for Singapore Guide</span>
              </Link>
              <Link 
                to="/pte-for-germany" 
                className="flex items-center gap-1.5 text-[#00c2cb] hover:underline"
              >
                <span>PTE for Germany Guide &rarr;</span>
              </Link>
            </div>

          </main>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT STICKY SIDEBAR (4 Columns)                                      */}
          {/* --------------------------------------------------------------------- */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Card 1: Summarise Blog with AI */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
              <div className="space-y-1 pb-2 border-b-2 border-[#00c2cb]">
                <h3 className="text-sm font-black text-slate-900">
                  Summarise blog with AI
                </h3>
              </div>

              {/* 3 AI Tool Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveAiTool('chatgpt')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    activeAiTool === 'chatgpt'
                      ? 'border-[#00c2cb] bg-cyan-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">
                    GPT
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">ChatGPT</span>
                </button>

                <button
                  onClick={() => setActiveAiTool('grok')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    activeAiTool === 'grok'
                      ? 'border-[#00c2cb] bg-cyan-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                    /
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Grok</span>
                </button>

                <button
                  onClick={() => setActiveAiTool('perplexity')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                    activeAiTool === 'perplexity'
                      ? 'border-[#00c2cb] bg-cyan-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center font-black text-xs">
                    ✳
                  </div>
                  <span className="text-[11px] font-bold text-slate-800">Perplexity</span>
                </button>
              </div>

              {/* AI Summary Output Preview Box */}
              {activeAiTool && (
                <div className="p-3.5 rounded-xl bg-cyan-50/60 border border-cyan-200 text-xs text-slate-700 leading-relaxed space-y-1.5 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center gap-1 text-[#00c2cb]">
                      <Sparkles className="w-3.5 h-3.5" />
                      {aiSummaries[activeAiTool].tool} Summary
                    </span>
                    <button 
                      onClick={() => setActiveAiTool(null)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px]">
                    {aiSummaries[activeAiTool].summary}
                  </p>
                </div>
              )}
            </div>

            {/* Card 2: Table of Contents (1:1 with user uploaded screenshot) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
              <div className="space-y-1 pb-2 border-b-2 border-[#00c2cb]">
                <h3 className="text-sm font-black text-slate-900">
                  Table of Contents
                </h3>
              </div>

              <nav className="space-y-2 text-xs font-medium text-slate-600">
                <button
                  onClick={() => scrollToSection('why-study-ireland')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Why Study in Ireland?</span>
                </button>

                <button
                  onClick={() => scrollToSection('accepted-universities')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Top PTE Accepted Universities in Ireland</span>
                </button>

                <button
                  onClick={() => scrollToSection('score-requirements')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Minimum PTE Score Requirements for Ireland</span>
                </button>

                <button
                  onClick={() => scrollToSection('benefits')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Benefits of Taking PTE for Ireland</span>
                </button>

                <button
                  onClick={() => scrollToSection('visa-requirements')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Ireland Student Visa Requirements</span>
                </button>

                <button
                  onClick={() => scrollToSection('popular-courses')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Popular Courses in Ireland</span>
                </button>

                <button
                  onClick={() => scrollToSection('cost-of-studying')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Cost of Studying in Ireland</span>
                </button>

                <button
                  onClick={() => scrollToSection('work-opportunities')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Post-Study Work Opportunities in Ireland</span>
                </button>

                <button
                  onClick={() => scrollToSection('why-ninetypte')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Why Choose NinetyPTE for Ireland Preparation?</span>
                </button>

                <div className="space-y-1.5">
                  <button
                    onClick={() => scrollToSection('faqs')}
                    className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer font-bold text-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
                    <span>FAQs</span>
                  </button>

                  <div className="pl-4 space-y-1 text-[11px] text-slate-500">
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ Is PTE accepted in Ireland?
                    </button>
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ What PTE score is required for Ireland?
                    </button>
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ Is PTE easier than IELTS for Ireland?
                    </button>
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left text-[#00c2cb] font-semibold hover:underline cursor-pointer"
                    >
                      ○ How long is a PTE score valid for Ireland?
                    </button>
                  </div>
                </div>
              </nav>
            </div>

            {/* Card 3: Free Scored Test Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-6 shadow-md space-y-3">
              <h4 className="text-base font-black">
                Study in Ireland
              </h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Planning to apply to Trinity College Dublin or UCD? Benchmark your speaking and writing skills with our free AI test.
              </p>
              <Link
                to="/signup"
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-50 text-teal-800 font-extrabold text-xs shadow-sm transition block text-center"
              >
                Start Free Mock Test
              </Link>
            </div>

          </aside>

        </div>
      </div>

    </div>
  );
}
