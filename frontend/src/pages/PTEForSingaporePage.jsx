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
  DollarSign, 
  Briefcase, 
  FileCheck, 
  ChevronRight, 
  Info, 
  X, 
  Check, 
  ExternalLink, 
  BookOpen, 
  Award,
  Globe
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function PTEForSingaporePage() {
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
      summary: 'Singapore is a premier global education destination accepting PTE Academic across top universities including NUS, NTU, SMU, and SUTD, as well as leading private academies like SIM and Kaplan. Recommended scores: Diploma (45–50), Bachelor’s (50–60), Master’s (58–67), MBA (65–72+). PTE offers fast 48-hour computer scoring, seamless score sending, and validity for Student Pass processing.'
    },
    grok: {
      tool: 'Grok',
      summary: 'Singapore Study Guide in brief: 1) PTE Academic is widely recognized by universities and the Immigration & Checkpoints Authority (ICA). 2) Tuition ranges from SGD 18,000–45,000/yr, with monthly living costs of SGD 1,200–2,200. 3) Post-graduation offers robust Employment Pass (EP) and S Pass career pathways across banking, tech, and multinational Asian regional headquarters.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'Verified Insights: Pearson PTE Academic scores are valid for 2 years for Singapore higher education. Fast score delivery eliminates intake delays. Student Pass processing requires an official Singapore SOLAR admission letter, proof of funding, and PTE scorecard. High graduate employability in Finance, AI, Engineering, and Cyber Security.'
    }
  };

  // Top Universities Data
  const topUniversities = [
    { name: 'National University of Singapore (NUS)', rank: '#1 in Asia (QS)', minScore: '65+', popular: 'Computer Science, Business, Engineering' },
    { name: 'Nanyang Technological University (NTU)', rank: 'Top 15 Global', minScore: '65+', popular: 'AI, Electrical Engineering, Materials' },
    { name: 'Singapore Management University (SMU)', rank: 'Premier Business', minScore: '62+', popular: 'Finance, Law, Business Analytics' },
    { name: 'Singapore University of Technology and Design (SUTD)', rank: 'MIT Collaboration', minScore: '60+', popular: 'Architecture, Systems Design, Robotics' },
    { name: 'Singapore Institute of Management (SIM Global)', rank: 'Global Degree Hub', minScore: '50 - 58', popular: 'International Management, Media, Accounting' },
    { name: 'James Cook University Singapore (JCU)', rank: 'Australian Branch', minScore: '52 - 58', popular: 'Psychology, IT, Hospitality' },
    { name: 'PSB Academy', rank: 'The Future Academy', minScore: '45 - 54', popular: 'Life Sciences, Cybersecurity, Digital Media' },
    { name: 'Kaplan Singapore', rank: 'Global Partner Campus', minScore: '45 - 54', popular: 'Commerce, Marketing, Logistics' }
  ];

  // FAQs List (Matching Page 3 & 4 of PDF & User Screenshot 1:1)
  const faqs = [
    {
      q: 'What is the minimum PTE score required for Singapore universities?',
      a: 'The minimum PTE score varies by study level: Diploma programs generally require 45–50, Bachelor\'s degrees require 50–60, Master\'s degrees require 58–67, and competitive MBA programs typically ask for 65–72+. Top public institutions like NUS and NTU generally require 65+ with no communicative skill below 58.'
    },
    {
      q: 'Can I study in Singapore without IELTS using PTE?',
      a: 'Yes, absolutely. PTE Academic is recognized by major Singapore universities and private education institutions (CPE registered) as an official alternative to IELTS. Many students choose PTE because scores are delivered within 48 hours and scoring is 100% objective through AI.'
    },
    {
      q: 'Is PTE required for a Singapore Student Pass?',
      a: 'While the Singapore Immigration & Checkpoints Authority (ICA) primarily requires an official acceptance from an approved Institute of Higher Learning (IHL), your university requires PTE Academic scores to issue the SOLAR enrollment registration used to grant your Student Pass.'
    },
    {
      q: 'How long is a PTE score valid for Singapore admissions?',
      a: 'PTE Academic scores are valid for 2 years from the date of the test. You can send your official scores to multiple Singaporean universities for free through your Pearson web account.'
    },
    {
      q: 'How can I prepare for PTE for Singapore effectively?',
      a: 'The most effective method is preparing with NinetyPTE\'s AI-scored full mock tests, section-wise question banks, and pronunciation analytics. Practicing under real timed conditions ensures you hit the 65+ score band with confidence.'
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
            <span className="text-slate-900 font-bold">PTE for Singapore</span>
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
                <span>PTE Academic / UKVI • Singapore Education Hub</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                PTE for Singapore: Study Visa Guide, Universities &amp; Exam Fee
              </h1>

              {/* Author, Date, Reading time row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Irfan Zaidi</span>
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
                  <span>Last updated on 01 Jul 2026</span>
                </div>
              </div>
            </header>

            {/* Hero Graphic Banner (1:1 with reference PDF) */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#002f3d] to-[#005260] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 space-y-4 max-w-xl">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold border border-cyan-400/30 uppercase tracking-wider">
                  Singapore Study Visa &amp; English Standards
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  PTE FOR <br />
                  <span className="text-[#00c2cb]">SINGAPORE:</span> <br />
                  <span className="text-xl sm:text-2xl font-bold text-slate-200">Study Visa Guide, Universities &amp; Exam Fee</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Unlock admissions into Asia&apos;s most prestigious global universities and English-speaking education campuses with Pearson PTE Academic.
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
                    Download Mobile App
                  </Link>
                </div>
              </div>
            </div>

            {/* Lead Introduction Box (1:1 with reference Page 1) */}
            <div className="rounded-2xl bg-cyan-50/70 border border-cyan-200/80 p-6 sm:p-7 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <p>
                Singapore is one of Asia&apos;s leading education hubs, known for its world-class universities, modern infrastructure, and strong career opportunities. The country attracts thousands of international students every year due to its safe environment, global exposure, and high-quality education system.
              </p>
              <p>
                Many universities and institutions in Singapore accept <strong>PTE Academic</strong>, making it easier for students to apply for undergraduate and postgraduate programs without IELTS.
              </p>
              <p className="font-semibold text-slate-900">
                If you are planning to study abroad, the PTE for Singapore can be a smart and flexible approach.
              </p>
            </div>

            {/* Section 1: Why Study in Singapore? */}
            <section id="why-study-singapore" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Study in Singapore?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Singapore offers several benefits for international students:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>World-class universities:</strong> Global top-15 institutions (NUS and NTU) leading in research and academic prestige.</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Recognized degrees:</strong> Qualifications accredited globally by employers, universities, and migration authorities.</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Multicultural &amp; diverse:</strong> Safe, clean, and cosmopolitan city with English as the primary administrative language.</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Strong economy:</strong> Asia&apos;s financial and technological capital offering high graduate employment rates.</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Safe &amp; modern lifestyle:</strong> One of the lowest crime rates globally with state-of-the-art healthcare and transit.</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Strategic location:</strong> Central Asian gateway with direct flight connections to over 100 countries.</span>
                </div>
              </div>

              {/* Quick Fact Banner */}
              <div className="p-4 rounded-xl bg-cyan-50 border-l-4 border-[#00c2cb] text-xs sm:text-sm text-slate-800 font-medium">
                <strong className="text-[#00a8b5]">Quick Fact:</strong> Singapore is an English-speaking education hub with high graduate employability and strong international student demand.
              </div>
            </section>

            {/* Section 2: Is PTE Accepted in Singapore? */}
            <section id="is-pte-accepted" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Is PTE Accepted in Singapore?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Yes, <strong>PTE Singapore</strong> is widely accepted by many universities and colleges. Students can use their PTE exam score for diploma, undergraduate, postgraduate, and pathway programs.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                However, each institution has different requirements. Some top universities may require higher scores depending on the course and competition level.
              </p>
            </section>

            {/* Section 3: Top PTE Accepted Universities in Singapore */}
            <section id="accepted-universities" className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Top PTE Accepted Universities in Singapore
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Many reputed institutions accept PTE for study visa and admissions:
                </p>
              </div>

              {/* Universities Table */}
              <div className="rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      <th className="p-3.5">University / Institution</th>
                      <th className="p-3.5 hidden sm:table-cell">Reputation / Global Profile</th>
                      <th className="p-3.5">Min PTE Score</th>
                      <th className="p-3.5 hidden md:table-cell">Popular Courses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topUniversities.map((u, idx) => (
                      <tr key={idx} className="hover:bg-cyan-50/40 transition">
                        <td className="p-3.5 font-bold text-slate-900">{u.name}</td>
                        <td className="p-3.5 text-slate-500 hidden sm:table-cell">{u.rank}</td>
                        <td className="p-3.5 font-black text-[#00c2cb]">{u.minScore}</td>
                        <td className="p-3.5 text-slate-500 hidden md:table-cell">{u.popular}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-500 italic">
                These universities offer globally recognized degrees and strong career support.
              </div>
            </section>

            {/* Section 4: Minimum PTE Score Requirements for Singapore */}
            <section id="score-requirements" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Minimum PTE Score Requirements for Singapore
              </h2>

              <div className="rounded-2xl border border-cyan-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-cyan-500 text-white font-extrabold">
                    <tr>
                      <th className="p-4">Study Level</th>
                      <th className="p-4">Required PTE Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-100 bg-white">
                    <tr className="hover:bg-cyan-50/30 transition">
                      <td className="p-4 font-bold text-slate-900">Diploma Programs</td>
                      <td className="p-4 font-black text-[#00c2cb]">45 - 50</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/30 transition">
                      <td className="p-4 font-bold text-slate-900">Bachelor&apos;s Degree</td>
                      <td className="p-4 font-black text-[#00c2cb]">50 - 60</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/30 transition">
                      <td className="p-4 font-bold text-slate-900">Master&apos;s Degree</td>
                      <td className="p-4 font-black text-[#00c2cb]">58 - 67</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/30 transition">
                      <td className="p-4 font-bold text-slate-900">MBA Programs</td>
                      <td className="p-4 font-black text-[#00c2cb]">65 - 72+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed italic">
                However, it is important to note that top universities like NUS or NTU may require around 55–65+ depending on the program. Also, the requirements may vary depending on the university and program.
              </p>
            </section>

            {/* Section 5: Benefits of Taking PTE for Singapore */}
            <section id="benefits" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Benefits of Taking PTE for Singapore
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Choosing the PTE exam in Singapore offers several advantages:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb] shrink-0"></span>
                  <span className="font-bold text-slate-800">Fast results within a few days (typically 48 hrs)</span>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb] shrink-0"></span>
                  <span className="font-bold text-slate-800">AI-based scoring ensures objective fairness</span>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb] shrink-0"></span>
                  <span className="font-bold text-slate-800">Flexible test dates throughout the year</span>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb] shrink-0"></span>
                  <span className="font-bold text-slate-800">Globally recognized English language test</span>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center gap-3 sm:col-span-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb] shrink-0"></span>
                  <span className="font-bold text-slate-800">Free and instant score sharing with universities worldwide</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic">
                These benefits make the PTE for Singapore study visa a convenient choice for students.
              </div>
            </section>

            {/* Section 6: Singapore Student Pass Requirements */}
            <section id="visa-requirements" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Singapore Student Pass Requirements
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To study in Singapore, students need a Student Pass issued by the Immigration &amp; Checkpoints Authority (ICA). Key requirements include:
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Admission offer letter:</strong> Confirmed acceptance letter from an EduTrust-certified Singapore institution.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Valid passport:</strong> Must be valid for at least 6 months beyond intended program duration.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Financial support documents:</strong> Proof of funds (bank statements) demonstrating tuition and living ability.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>English language proof:</strong> Official Pearson PTE Academic score meeting university thresholds.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Completed Student Pass form:</strong> Application submitted through ICA&apos;s SOLAR system (eForm 16 &amp; Form V36).</span>
                </div>
              </div>
            </section>

            {/* Section 7: Popular Courses in Singapore */}
            <section id="popular-courses" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Popular Courses in Singapore
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Singapore offers a wide range of academic programs aligned with global industry demands:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold text-slate-800">
                {[
                  'Business & Management',
                  'Finance & Banking',
                  'Computer Science',
                  'Artificial Intelligence',
                  'Data Science & Analytics',
                  'Mechanical Engineering',
                  'Cyber Security',
                  'Hospitality & Tourism'
                ].map((course, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500 italic">
                These courses provide strong global career opportunities across the Asia-Pacific region.
              </div>

              {/* Mid-page Contact Callout Banner matching Page 2 */}
              <div className="p-6 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-black">
                    Need Help Planning Your PTE Journey for Singapore?
                  </h4>
                  <p className="text-xs text-slate-300">
                    Get in touch with NinetyPTE mentors for customized study schedules and exam voucher discounts.
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

            {/* Section 8: Cost of Studying in Singapore */}
            <section id="cost-of-studying" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Cost of Studying in Singapore
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Planning your budget is an important part of the PTE for Singapore study visa process. The overall cost depends on your course, university, and lifestyle choices.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl border border-cyan-200 bg-white space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Tuition Fees</div>
                  <p className="text-slate-600 leading-relaxed">
                    Tuition fees vary by program and university. Diploma and bachelor&apos;s courses are more affordable, while master&apos;s and MBA programs cost higher (approx. <strong>SGD 18,000 – SGD 45,000 per year</strong>).
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-cyan-200 bg-white space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Living Expenses</div>
                  <p className="text-slate-600 leading-relaxed">
                    Living expenses include accommodation (HDB or private condo), food, transport (EZ-Link/MRT), and daily essentials (approx. <strong>SGD 1,200 – SGD 2,200 per month</strong>).
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-cyan-200 bg-white space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Health Insurance</div>
                  <p className="text-slate-600 leading-relaxed">
                    Health insurance is mandatory for all international students to ensure complete access to clinic and emergency hospital care during your studies.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-cyan-200 bg-white space-y-2">
                  <div className="text-xs font-black uppercase text-[#00c2cb]">Personal Expenses</div>
                  <p className="text-slate-600 leading-relaxed">
                    Personal expenses cover mobile telecom plans, clothing, study materials, entertainment, and weekend recreation across Singapore.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic">
                Overall, Singapore is moderately expensive, but it offers world-class education quality, unmatched personal safety, and high graduate salaries.
              </div>
            </section>

            {/* Section 9: Post-Study Work Opportunities in Singapore */}
            <section id="work-opportunities" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Post-Study Work Opportunities in Singapore
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                After completing studies, international students can explore dynamic professional pathways:
              </p>

              <div className="space-y-2.5 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Employment Pass (EP) &amp; S Pass opportunities:</strong> Direct work sponsorship for qualifying professional and executive roles.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Booming sectors:</strong> High recruitment demand in financial technology, artificial intelligence, biomedical science, and logistics.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Global enterprise exposure:</strong> Over 4,200 regional headquarters of Fortune 500 multinationals are based in Singapore.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Competitive remuneration:</strong> Attractive tax rates, career acceleration, and transparent permanent residence (PR) frameworks.</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic">
                Please note that Singapore&apos;s economy actively supports skilled international graduates in high-growth STEM and financial disciplines.
              </div>
            </section>

            {/* Section 10: Why Choose NinetyPTE for Singapore Preparation? */}
            <section id="why-ninetypte" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Choose <span className="text-[#00c2cb]">NinetyPTE</span> for Singapore Preparation?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                NinetyPTE helps students prepare effectively for PTE Singapore with:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                  <span>AI-scored PTE Mock Tests</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                  <span>Real exam simulation</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                  <span>Updated question bank</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                  <span>Section-wise PTE practice tests</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                  <span>PTE prediction materials</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                  <span>Performance tracking and feedback</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                This makes exam preparation more focused and result-oriented. Once you&apos;re ready to take the exam, you can also check <Link to="/book-exam" className="text-[#00c2cb] font-bold hover:underline">PTE voucher</Link> options before planning your booking.
              </p>

              {/* Callout Action Banner matching Page 3 */}
              <div className="p-6 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-black tracking-tight">
                    Ready to Achieve Your Target PTE Score?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Get started with our free scored diagnostic mock test today.
                  </p>
                </div>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95 shrink-0"
                >
                  Boost Your PTE Score
                </Link>
              </div>

              {/* Read Also Card linking to PTE for Germany */}
              <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Read Also: <Link to="/pte-for-germany" className="text-[#00c2cb] font-bold hover:underline">PTE for Germany: Requirements, Accepted Universities, and Score Guide</Link>
                </span>
                <ChevronRight className="w-4 h-4 text-[#00c2cb] shrink-0" />
              </div>
            </section>

            {/* Section 11: Frequently Asked Questions (1:1 with user screenshots & PDF) */}
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

              {/* Summary note box matching Page 3 & 4 */}
              <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  If you are planning to study abroad, achieving a good PTE exam score for Singapore can open doors to top universities and better career opportunities.
                </p>
                <p>
                  With proper preparation and guidance, you can easily meet admission requirements. Start your journey today and prepare smartly for PTE for Singapore study visa with confidence.
                </p>
              </div>

              {/* Sign Up Banner */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-base font-black">
                  Ready to Achieve your target PTE Score for Singapore
                </h3>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95 shrink-0"
                >
                  Sign Up
                </Link>
              </div>
            </section>

            {/* Author Profile Card (Page 4) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 shadow-sm shrink-0">
                <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl">
                  IZ
                </div>
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base font-black text-slate-900">Irfan Zaidi</h3>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <LinkedInIcon className="w-4 h-4 fill-blue-600" />
                  </a>
                </div>
                <div className="text-xs font-bold text-[#00c2cb]">
                  Co-founder and Head of Sales at NinetyPTE &amp; NinetyIELTS
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  I work at the intersection of vision, product thinking, and customer understanding. My role is to ensure that everything we create – from our platform features to our premium solutions – stays connected to real learner needs and delivers measurable, exam-focused outcomes.
                </p>
              </div>
            </div>

            {/* Free Mock Test Card with Illustration representation */}
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
                to="/about-pte" 
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#00c2cb] transition"
              >
                <span>&larr; NinetyPTE vs Pearson Platform</span>
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
            
            {/* Card 1: Summarise Blog with AI (1:1 with user reference) */}
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

            {/* Card 2: Table of Contents (1:1 with user screenshots) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
              <div className="space-y-1 pb-2 border-b-2 border-[#00c2cb]">
                <h3 className="text-sm font-black text-slate-900">
                  Table of Contents
                </h3>
              </div>

              <nav className="space-y-2 text-xs font-medium text-slate-600">
                <button
                  onClick={() => scrollToSection('why-study-singapore')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Why Study in Singapore?</span>
                </button>

                <button
                  onClick={() => scrollToSection('is-pte-accepted')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Is PTE Accepted in Singapore?</span>
                </button>

                <button
                  onClick={() => scrollToSection('accepted-universities')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Top PTE Accepted Universities in Singapore</span>
                </button>

                <button
                  onClick={() => scrollToSection('score-requirements')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Minimum PTE Score Requirements for Singapore</span>
                </button>

                <button
                  onClick={() => scrollToSection('benefits')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Benefits of Taking PTE for Singapore</span>
                </button>

                <button
                  onClick={() => scrollToSection('visa-requirements')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Singapore Student Pass Requirements</span>
                </button>

                <button
                  onClick={() => scrollToSection('popular-courses')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Popular Courses in Singapore</span>
                </button>

                <button
                  onClick={() => scrollToSection('cost-of-studying')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Cost of Studying in Singapore</span>
                </button>

                <button
                  onClick={() => scrollToSection('work-opportunities')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Post-Study Work Opportunities in Singapore</span>
                </button>

                <button
                  onClick={() => scrollToSection('why-ninetypte')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Why Choose NinetyPTE for Singapore Preparation?</span>
                </button>

                <div className="space-y-1.5">
                  <button
                    onClick={() => scrollToSection('faqs')}
                    className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer font-bold text-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
                    <span>Frequently Asked Questions</span>
                  </button>

                  <div className="pl-4 space-y-1 text-[11px] text-slate-500">
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ What is the minimum PTE score required?
                    </button>
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ Can I study in Singapore without IELTS?
                    </button>
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ Is PTE required for Student Pass?
                    </button>
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ How long is a PTE score valid?
                    </button>
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className="block text-left text-[#00c2cb] font-semibold hover:underline cursor-pointer"
                    >
                      ○ How can I prepare for PTE for Singapore effectively?
                    </button>
                  </div>
                </div>
              </nav>
            </div>

            {/* Card 3: Free Scored Test Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 shadow-md space-y-3">
              <h4 className="text-base font-black">
                Study in Singapore
              </h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Aiming for NUS, NTU, or SIM? Check your baseline score with our free full-length mock test.
              </p>
              <Link
                to="/signup"
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-50 text-cyan-700 font-extrabold text-xs shadow-sm transition block text-center"
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
