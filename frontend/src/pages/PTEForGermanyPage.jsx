import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Bot, 
  Zap, 
  HelpCircle, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark, 
  ChevronDown, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Euro, 
  Briefcase, 
  FileCheck, 
  ExternalLink,
  ChevronRight,
  Info,
  X,
  Check
} from 'lucide-react';

export default function PTEForGermanyPage() {
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
      summary: 'Germany warmly accepts PTE Academic for English-taught Bachelor’s and Master’s degrees across prestigious universities including TUM, LMU Munich, RWTH Aachen, and KIT. Recommended scores range from 55–60 for Bachelor’s to 65–70 for Master’s/MBA. Public universities offer free or ultra-low tuition, paired with an 18-month post-study work visa for international graduates.'
    },
    grok: {
      tool: 'Grok',
      summary: 'Key Takeaways for Germany PTE Aspirants: 1) PTE Academic is valid for university admission and student visa processing. 2) Germany’s public tuition is essentially €0, requiring only a €150-€350 semester fee. 3) You need a blocked account (~€11,208/yr) for living costs. 4) Top STEM, Automotive, and IT careers await graduates with direct EU Blue Card pathways.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'Verified Facts: Over 70+ German higher education institutions recognize Pearson PTE Academic. Fast score reporting (typically under 48 hours) makes it ideal for tight uni-assist deadlines. Minimum score benchmark is 58-65 for general postgraduate courses. Post-graduation grants an 18-month jobseeker residence permit.'
    }
  };

  // Top Universities Table Data
  const topUniversities = [
    { name: 'Technical University of Munich (TUM)', rank: '#1 in Germany (QS)', minScore: '65+', location: 'Munich', popular: 'Mechanical Engineering, CS, AI' },
    { name: 'Ludwig Maximilian University of Munich (LMU)', rank: '#2 in Germany', minScore: '65+', location: 'Munich', popular: 'Physics, Data Science, Business' },
    { name: 'RWTH Aachen University', rank: 'Top German Tech', minScore: '60+', location: 'Aachen', popular: 'Automotive, Electrical, Robotics' },
    { name: 'Karlsruhe Institute of Technology (KIT)', rank: 'Excellence Uni', minScore: '65+', location: 'Karlsruhe', popular: 'Software Engineering, Clean Tech' },
    { name: 'University of Stuttgart', rank: 'TU9 Member', minScore: '60+', location: 'Stuttgart', popular: 'Automotive, Aerospace, Manufacturing' },
    { name: 'University of Freiburg', rank: 'Top Research', minScore: '60+', location: 'Freiburg', popular: 'Renewable Energy, Biotechnology' },
    { name: 'University of Mannheim', rank: 'Top Business School', minScore: '65 - 70', location: 'Mannheim', popular: 'Finance, International Management' },
    { name: 'SRH Berlin University of Applied Sciences', rank: 'Applied Excellence', minScore: '54+', location: 'Berlin', popular: 'Design, Computer Science, MBA' },
    { name: 'International University of Applied Sciences (IU)', rank: 'Flexible & Hybrid', minScore: '50 - 55', location: 'Bad Honnef/Berlin', popular: 'Data Analytics, IT Management' }
  ];

  // FAQs List (Matching Page 4 of PDF & User Screenshots 1:1)
  const faqs = [
    {
      q: 'Is PTE accepted in Germany?',
      a: 'Yes, PTE Academic is widely recognized by German universities and higher education institutions for English-taught undergraduate, postgraduate, and doctoral degree programs, as well as for student visa applications.'
    },
    {
      q: 'What is the minimum PTE score required for Germany?',
      a: 'Requirements vary by academic level: Foundation courses typically require 45–50, Bachelor\'s degrees require 55–60, while Master\'s and MBA programs generally seek 60–70. Highly competitive programs at universities like TUM or LMU Munich recommend 65+.'
    },
    {
      q: 'Which universities in Germany accept PTE Academic?',
      a: 'Leading institutions include Technical University of Munich (TUM), LMU Munich, RWTH Aachen University, Karlsruhe Institute of Technology (KIT), University of Stuttgart, University of Freiburg, University of Mannheim, and many universities of applied sciences (Fachhochschulen).'
    },
    {
      q: 'Can I study in Germany without IELTS using PTE?',
      a: 'Absolutely. PTE Academic serves as a direct, full equivalent to IELTS for English-medium courses across German universities. In fact, many students prefer PTE due to its fast 48-hour score delivery and fair AI scoring.'
    },
    {
      q: 'Is PTE accepted for Master\'s programs in Germany?',
      a: 'Yes, Master of Science (M.Sc.), Master of Engineering (M.Eng.), and MBA programs taught in English regularly accept PTE Academic scores. Most Master\'s programs require an overall score between 60 and 68.'
    },
    {
      q: 'How can I prepare for the PTE exam for Germany?',
      a: 'Using NinetyPTE\'s full-length scored mock tests, section-wise practice questions, and AI scoring feedback is the most effective approach. Our platform mirrors the exact Pearson exam interface, providing diagnostic accuracy before test day.'
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
            <span className="text-slate-900 font-bold">PTE for Germany</span>
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
                <span>Study Abroad Destination Guide • Germany</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                PTE for Germany: Requirements, Accepted Universities, and Score Guide
              </h1>

              {/* Author, Date, Reading time row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Zuhair Rizvi</span>
                </div>
                <span>•</span>
                <div>Reviewed by <strong className="text-slate-800">Fatima Khan</strong></div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>5 min read</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last updated on 31 Jan 2026</span>
                </div>
              </div>
            </header>

            {/* Hero Graphic Card (1:1 with reference PDF) */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a2540] to-[#003c4a] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-4 max-w-xl">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold border border-cyan-400/30 uppercase tracking-wider">
                  German Study &amp; Visa Protocol
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                  IS PTE ACCEPTED IN GERMANY? <br />
                  <span className="text-[#00c2cb]">Universities &amp; Visa Rules Explained</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Each year, thousands of international students choose Germany for higher education in fields like mechanical engineering, computer science, automotive design, biotechnology, and international business.
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

            {/* Intro Prose */}
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal space-y-4">
              <p>
                Each year, thousands of students choose Germany for higher studies in fields like engineering, business, IT, and science. For English-taught programs, many universities accept the <strong>PTE exam for Germany</strong>, making it a flexible, modern, and computer-scored option for proving English proficiency.
              </p>
            </div>

            {/* Section 1: Why Study in Germany? */}
            <section id="why-study-germany" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Study in Germany?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Germany offers exceptional academic quality and excellent career opportunities, making it a top study destination in Europe.
              </p>

              <div className="space-y-2.5 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="font-bold text-slate-900 pb-1">Key benefits of studying in Germany include:</div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Globally recognized universities:</strong> German institutions consistently rank among the world&apos;s best for engineering and scientific research.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Affordable or free education:</strong> Most public universities charge zero tuition fees for both EU and non-EU international students.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Strong career opportunities:</strong> Europe&apos;s largest economy with high demand for STEM and business professionals.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Safe and student-friendly environment:</strong> High quality of life, affordable healthcare, and multicultural campuses.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Easy access to Schengen Area:</strong> Travel freely across 29 European countries for research, internships, and tourism.</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Germany is not only focused on classroom theory but also on preparing students for real-world careers through practical industrial internships (Werkstudent), dual-studies, and direct corporate partnerships.
              </p>
            </section>

            {/* Section 2: Is PTE Accepted in Germany? */}
            <section id="is-pte-accepted" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Is PTE Accepted in Germany?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Yes, many universities in Germany accept <strong>PTE Academic</strong> for admissions, especially for English-taught programs at undergraduate and postgraduate levels.
              </p>

              <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                The required <strong>PTE score for Germany</strong> depends on the university and course you choose. Highly competitive programs may require higher scores, especially in fields like business administration, quantitative finance, mechanical engineering, and computer science.
              </div>
            </section>

            {/* Section 3: Top PTE Accepted Universities in Germany */}
            <section id="accepted-universities" className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Top PTE Accepted Universities in Germany
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Several of Germany&apos;s top-ranked universities accept PTE Academic as verified proof of English language proficiency:
                </p>
              </div>

              {/* Universities Table */}
              <div className="rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      <th className="p-3.5">University Name</th>
                      <th className="p-3.5 hidden sm:table-cell">City</th>
                      <th className="p-3.5">Min PTE Score</th>
                      <th className="p-3.5 hidden md:table-cell">Key Programs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {topUniversities.map((u, idx) => (
                      <tr key={idx} className="hover:bg-cyan-50/40 transition">
                        <td className="p-3.5 font-bold text-slate-900">
                          {u.name}
                          <div className="text-[10px] text-cyan-600 font-semibold sm:hidden">{u.location}</div>
                        </td>
                        <td className="p-3.5 text-slate-600 hidden sm:table-cell">{u.location}</td>
                        <td className="p-3.5 font-black text-[#00c2cb]">{u.minScore}</td>
                        <td className="p-3.5 text-slate-500 hidden md:table-cell">{u.popular}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-500 italic">
                * Note: Universities may have program-specific criteria (e.g. minimum sectional scores in Writing or Speaking). Always confirm on the faculty website or via uni-assist before submitting your application.
              </div>
            </section>

            {/* Section 4: Minimum PTE Score Requirements for Germany */}
            <section id="score-requirements" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Minimum PTE Score Requirements for Germany
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The required PTE score for Germany depends on the academic level, degree difficulty, and competition:
              </p>

              {/* Score Matrix Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500">Foundation</div>
                  <div className="text-2xl font-black text-[#00c2cb]">45 - 50</div>
                  <div className="text-[10px] text-slate-400">Preparatory Studienkolleg</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500">Bachelor&apos;s</div>
                  <div className="text-2xl font-black text-[#00c2cb]">55 - 60</div>
                  <div className="text-[10px] text-slate-400">Undergraduate Degrees</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500">Master&apos;s</div>
                  <div className="text-2xl font-black text-[#00c2cb]">60 - 65</div>
                  <div className="text-[10px] text-slate-400">M.Sc., M.Eng., M.A.</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500">MBA / Top STEM</div>
                  <div className="text-2xl font-black text-[#00c2cb]">65 - 70+</div>
                  <div className="text-[10px] text-slate-400">Competitive Business</div>
                </div>
              </div>
            </section>

            {/* Section 5: Benefits of Taking PTE for Germany */}
            <section id="benefits" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Benefits of Taking PTE for Germany
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choosing the PTE exam for Germany is a smart decision for international students because it is fast, unbiased, and widely accepted:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#00c2cb]" />
                    <span>Fast Results (Within 48 Hours)</span>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Receive your official score report quickly, ensuring you never miss tight German university admission and uni-assist intake windows.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#00c2cb]" />
                    <span>Flexible Year-Round Booking</span>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Choose from multiple test centers and test dates worldwide up to 24 hours in advance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-[#00c2cb]" />
                    <span>100% Fair AI Scoring</span>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Automated scoring eliminates examiner subjectivity, offering objective assessment of Speaking, Writing, Reading, and Listening.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#00c2cb]" />
                    <span>Broad Institutional Recognition</span>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Accepted across public and private German universities, as well as by foreign missions processing National Student Visas.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Germany Student Visa Requirements */}
            <section id="visa-requirements" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Germany Student Visa Requirements
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To obtain a German National Student Visa (Visum zu Studienzwecken), applicants must prepare the following essential documentation:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">University Admission Letter:</strong> Official unconditional acceptance or Zulassungsbescheid.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Blocked Bank Account (Sperrkonto):</strong> Proof of financial sustenance (~€11,208/year or €934/month).
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Valid Health Insurance:</strong> Statutory German health insurance (TK, Barmer, or AOK).
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">English Language Proof:</strong> Official Pearson PTE Academic score card meeting course criteria.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Valid Passport:</strong> Minimum 6 months validity beyond intended duration of study.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Academic Certificates &amp; APS:</strong> Certified degree transcripts and APS verification certificate.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Popular Courses in Germany */}
            <section id="popular-courses" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Popular Courses in Germany
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Germany offers world-class degree programs with strong links to global industry leaders (Siemens, BMW, Bosch, SAP, and Mercedes-Benz). Most sought-after courses include:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-800">
                {[
                  'Mechanical & Mechatronics Engineering',
                  'Automotive & Electric Mobility',
                  'Computer Science & Software Systems',
                  'Artificial Intelligence & Data Science',
                  'Business Analytics & Supply Chain',
                  'International Management & MBA',
                  'Renewable Energy Technologies',
                  'Biotechnology & Biomedical Engineering',
                  'Quantitative Finance & Economics'
                ].map((course, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8: Cost of Studying in Germany */}
            <section id="cost-of-studying" className="space-y-6 pt-4 border-t border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Cost of Studying in Germany
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Studying in Germany is exceptionally affordable compared to the UK, USA, or Australia, particularly at public institutions.
                </p>
              </div>

              {/* Sub-section: Tuition Fees */}
              <div id="tuition-fees" className="space-y-3">
                <h3 className="text-lg font-black text-slate-900">
                  Tuition Fees
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-2">
                    <div className="text-xs font-black uppercase text-emerald-800">Public Universities</div>
                    <div className="text-2xl font-black text-slate-900">€0 / Free Tuition</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Most public universities do not charge tuition fees. Students only pay a nominal semester contribution of <strong>€150 – €350 per semester</strong>, which often includes free regional public transit.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="text-xs font-black uppercase text-slate-600">Private Universities</div>
                    <div className="text-2xl font-black text-slate-900">€5,000 – €20,000 / yr</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Private universities charge market tuition rates with smaller cohort sizes, direct industry placement pipelines, and rolling admissions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-section: Living Expenses */}
              <div id="living-expenses" className="space-y-3 pt-2">
                <h3 className="text-lg font-black text-slate-900">
                  Living Expenses
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  International students should budget approximately <strong>€934 per month (~€11,208/year)</strong> for living costs, covering:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">Accommodation</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">€350 – €550 / mo</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">Food &amp; Groceries</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">€180 – €250 / mo</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">Health Insurance</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">€110 – €130 / mo</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">Public Transport</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">Included in Semester Ticket</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">Telephone &amp; Internet</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">€30 – €40 / mo</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">Leisure &amp; Books</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">€60 – €100 / mo</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: Post-Study Work Opportunities in Germany */}
            <section id="work-opportunities" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Post-Study Work Opportunities in Germany
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Germany provides one of the most generous post-study work visa regimes in the world for international graduates:
              </p>

              <div className="space-y-2.5 bg-cyan-50/50 p-6 rounded-2xl border border-cyan-100 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>18-Month Post-Study Work Visa:</strong> Graduates can extend their residence permit for 18 months to seek qualified full-time employment.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>EU Blue Card Pathway:</strong> Securing a job in your degree field with the required salary threshold qualifies you for a fast-tracked EU Blue Card.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                  <span><strong>Permanent Residency (PR) in 21–27 Months:</strong> Blue Card holders can obtain permanent German settlement permit in as little as 21 months with German B1 language skills.</span>
                </div>
              </div>
            </section>

            {/* Section 10: Why Choose NinetyPTE for Germany Preparation? */}
            <section id="why-ninetypte" className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Choose <span className="text-[#00c2cb]">NinetyPTE</span> for Germany Preparation?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To achieve a competitive PTE score for German universities, targeted preparation with exact test simulation is essential. NinetyPTE provides comprehensive preparation tools:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">AI-Scored Full Mock Tests</div>
                  <p className="text-slate-500">Real exam interface with instant Pearson-aligned diagnostic score breakdown.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">Section-Wise Question Bank</div>
                  <p className="text-slate-500">Master Read Aloud, Repeat Sentence, Summarize Written Text, and Essay Writing.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">Acoustic Speech Recognition</div>
                  <p className="text-slate-500">Proprietary AI engine corrects oral fluency, articulation, and phonetic pacing.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900">Performance Analytics Dashboard</div>
                  <p className="text-slate-500">Track task accuracy, identify vocabulary blind spots, and monitor progress.</p>
                </div>
              </div>

              {/* Start Germany Journey banner */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
                <h3 className="text-lg font-black tracking-tight">
                  Start Your Germany Journey with NinetyPTE
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Germany offers world-class education, global exposure, and strong career opportunities. By achieving a target PTE score of 65+, students can secure admissions in top German universities and build a successful future in Europe.
                </p>
                <div className="pt-1">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition"
                  >
                    <span>Start Free Mock Test Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 11: FAQs Accordion (1:1 with user screenshots & PDF) */}
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
            </section>

            {/* Author Card Box (Page 5) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 shadow-sm shrink-0">
                <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl">
                  ZR
                </div>
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="text-xs font-black uppercase text-[#00c2cb]">Author</div>
                <h3 className="text-base font-black text-slate-900">Zuhair Rizvi</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  As a Co-Founder of NinetyPTE &amp; Ninety IELTS, I help international test aspirants achieve their target scores through algorithmic understanding of computer-based testing, automated evaluation, and structured score strategies.
                </p>
              </div>
            </div>

            {/* Bottom Related Navigation Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
              <Link 
                to="/about-pte" 
                className="flex items-center gap-1.5 text-slate-600 hover:text-[#00c2cb] transition"
              >
                <span>&larr; PTE Exam Scoring Rubrics</span>
              </Link>
              <Link 
                to="/mock-tests" 
                className="flex items-center gap-1.5 text-[#00c2cb] hover:underline"
              >
                <span>Take Full PTE Mock Test &rarr;</span>
              </Link>
            </div>

          </main>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT STICKY SIDEBAR (4 Columns)                                      */}
          {/* --------------------------------------------------------------------- */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Card 1: Summarise Blog with AI (1:1 with user screenshot 1) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
              <div className="space-y-1 pb-2 border-b-2 border-[#00c2cb]">
                <h3 className="text-sm font-black text-slate-900">
                  Summarise blog with AI
                </h3>
              </div>

              {/* 3 AI Tool Buttons matching user screenshot 1 */}
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
                      {aiSummaries[activeAiTool].tool} AI Digest
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

            {/* Card 2: Table of Contents (1:1 with user screenshots 1 & 2) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
              <div className="space-y-1 pb-2 border-b-2 border-[#00c2cb]">
                <h3 className="text-sm font-black text-slate-900">
                  Table of Contents
                </h3>
              </div>

              <nav className="space-y-2 text-xs font-medium text-slate-600">
                <button
                  onClick={() => scrollToSection('why-study-germany')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Why Study in Germany?</span>
                </button>

                <button
                  onClick={() => scrollToSection('is-pte-accepted')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Is PTE Accepted in Germany?</span>
                </button>

                <button
                  onClick={() => scrollToSection('accepted-universities')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Top PTE Accepted Universities in Germany</span>
                </button>

                <button
                  onClick={() => scrollToSection('score-requirements')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Minimum PTE Score Requirements for Germany</span>
                </button>

                <button
                  onClick={() => scrollToSection('benefits')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Benefits of Taking PTE for Germany</span>
                </button>

                <button
                  onClick={() => scrollToSection('visa-requirements')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Germany Student Visa Requirements</span>
                </button>

                <button
                  onClick={() => scrollToSection('popular-courses')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Popular Courses in Germany</span>
                </button>

                <div className="space-y-1.5">
                  <button
                    onClick={() => scrollToSection('cost-of-studying')}
                    className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer font-bold text-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
                    <span>Cost of Studying in Germany</span>
                  </button>

                  <div className="pl-4 space-y-1 text-slate-500">
                    <button
                      onClick={() => scrollToSection('tuition-fees')}
                      className="block hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ Tuition Fees
                    </button>
                    <button
                      onClick={() => scrollToSection('living-expenses')}
                      className="block hover:text-[#00c2cb] transition cursor-pointer"
                    >
                      ○ Living Expenses
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection('work-opportunities')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Post-Study Work Opportunities in Germany</span>
                </button>

                <button
                  onClick={() => scrollToSection('why-ninetypte')}
                  className="w-full text-left hover:text-[#00c2cb] transition flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Why Choose NinetyPTE for Germany Preparation?</span>
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
                      ○ Is PTE accepted in Germany?
                    </button>
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
                      ○ Which universities in Germany accept PTE?
                    </button>
                  </div>
                </div>
              </nav>
            </div>

            {/* Card 3: Free Mock Test CTA Banner */}
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 shadow-md space-y-3">
              <h4 className="text-base font-black">
                Ready for Germany?
              </h4>
              <p className="text-xs text-white/90 leading-relaxed">
                Practice with real exam questions and get instant AI scoring before booking your exam date.
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
