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
  Layers,
  Mic,
  PenTool,
  BookOpen,
  Volume2
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function PTEForUSAPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeAiTool, setActiveAiTool] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeModuleTab, setActiveModuleTab] = useState('all');

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
      summary: 'USA Acceptance Overview: Over 1,200 US universities and colleges accept PTE Academic for international admissions, including top institutions like Harvard Business School, Yale, Columbia, and NYU. The test features a streamlined 2-hour format covering 20 question types across Speaking & Writing, Reading, and Listening. Scores range from 10 to 90 with most competitive universities expecting 65 to 75+.'
    },
    grok: {
      tool: 'Grok',
      summary: 'PTE USA Key Highlights: 1) Recognized by thousands of US academic programs for undergraduate and graduate applications. 2) 100% computerized, automated AI scoring ensures zero human subjectivity. 3) Fast official turnaround delivers scores in 2 to 5 business days, facilitating rapid university deadline submissions. 4) Uncapped free electronic score reports sent straight to US institutions.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'US Admissions Benchmark: Competitive target scores: Ivy League & Tier-1 (68–75+), Large State Universities (58–65), Community Colleges & Pathways (48–53). The 2-hour exam eliminates optional pauses, testing all 20 question categories seamlessly. PTE scores remain valid for 2 full years for US university admissions.'
    }
  };

  // USA Score benchmarks by institution tier
  const usaBenchmarks = [
    {
      tier: 'Ivy League & Top 30 Universities',
      score: '68 – 75+ Overall',
      institutions: 'Harvard, Yale, Columbia, Stanford (programs), NYU, Cornell',
      notes: 'Competitive programs typically require 68+ overall with strong writing and speaking subscores.',
      badge: 'Tier 1'
    },
    {
      tier: 'Major State & National Universities',
      score: '58 – 65 Overall',
      institutions: 'Arizona State, Penn State, Univ of Illinois, SUNY campuses',
      notes: 'Standard undergraduate and graduate threshold for major public research universities.',
      badge: 'Tier 2'
    },
    {
      tier: 'Regional Universities & Colleges',
      score: '53 – 58 Overall',
      institutions: 'State colleges, regional campuses, specialized technology institutes',
      notes: 'Direct entry into regular undergraduate degree programs without foundational ESL.',
      badge: 'Tier 3'
    },
    {
      tier: 'Community Colleges & Pathway Programs',
      score: '45 – 50 Overall',
      institutions: 'Associate degree colleges, 2+2 transfer university pathway programs',
      notes: 'Entry into associate transfer programs with concurrent academic English support.',
      badge: 'Pathways'
    }
  ];

  // Part 1: Speaking & Writing (54 to 67 minutes)
  const speakingWritingTasks = [
    {
      name: 'Read Aloud',
      time: '35 seconds response',
      description: 'A text passage appears on screen. After brief preparation, you must read the text aloud clearly and naturally into the microphone within 35 seconds.',
      skills: 'Speaking & Reading'
    },
    {
      name: 'Repeat Sentence',
      time: '15 seconds response',
      description: 'You will hear a spoken sentence. As soon as audio finishes, repeat the sentence back into the microphone verbatim maintaining natural flow.',
      skills: 'Listening & Speaking'
    },
    {
      name: 'Describe Image',
      time: '25s prep, 40s response',
      description: 'A visual chart, graph, map, or diagram appears. You have 25 seconds to review the graphic, then 40 seconds to describe its key trends and data points.',
      skills: 'Speaking'
    },
    {
      name: 'Re-tell Lecture',
      time: '10s prep, 40s response',
      description: 'An academic lecture audio or video plays. Take notes on central ideas and supporting evidence, then summarize the lecture within 40 seconds.',
      skills: 'Listening & Speaking'
    },
    {
      name: 'Answer Short Question',
      time: '10 seconds response',
      description: 'A brief factual prompt is played. Respond promptly into the microphone with a concise one- or few-word answer.',
      skills: 'Listening & Speaking'
    },
    {
      name: 'Summarize Written Text',
      time: '10 minutes per task',
      description: 'Read an academic passage and write a concise single-sentence summary between 5 and 75 words. On-screen cut, copy, and paste tools are enabled.',
      skills: 'Reading & Writing'
    },
    {
      name: 'Write Essay',
      time: '20 minutes per task',
      description: 'Compose a structured persuasive or expository essay of 200 to 300 words based on a given prompt, demonstrating coherent reasoning and rich vocabulary.',
      skills: 'Writing'
    }
  ];

  // Part 2: Reading (29 to 30 minutes)
  const readingTasks = [
    {
      name: 'Reading & Writing: Fill in the Blanks',
      time: 'Integrated timer',
      description: 'A passage contains several gaps. Select the most grammatically and contextually appropriate option from each drop-down menu.',
      skills: 'Reading & Writing'
    },
    {
      name: 'Multiple Choice, Multiple Answers',
      time: 'Integrated timer',
      description: 'Read a passage and select all correct answer options that satisfy the question prompt (negative marking applies for incorrect options).',
      skills: 'Reading'
    },
    {
      name: 'Re-order Paragraphs',
      time: 'Integrated timer',
      description: 'Text blocks are presented in jumbled order. Drag and arrange the paragraphs into their original logical and chronological sequence.',
      skills: 'Reading'
    },
    {
      name: 'Reading: Fill in the Blanks',
      time: 'Integrated timer',
      description: 'A passage contains missing words. Drag suitable words from a bottom pool into their corresponding blank positions.',
      skills: 'Reading'
    },
    {
      name: 'Multiple Choice, Single Answer',
      time: 'Integrated timer',
      description: 'Read a concise text and identify the single best option matching the prompt or identifying the author’s main thesis.',
      skills: 'Reading'
    }
  ];

  // Part 3: Listening (30 to 43 minutes)
  const listeningTasks = [
    {
      name: 'Summarize Spoken Text',
      time: '10 minutes per task',
      description: 'Listen to an academic audio recording. Write a 50 to 70-word summary highlighting the primary arguments and key supporting details.',
      skills: 'Listening & Writing'
    },
    {
      name: 'Multiple Choice, Multiple Answers',
      time: 'Integrated timer',
      description: 'Listen to a short recording and choose all applicable options that accurately reflect the lecture details.',
      skills: 'Listening'
    },
    {
      name: 'Fill in the Blanks',
      time: 'Integrated timer',
      description: 'Follow an on-screen transcript while audio plays and type the exact missing words heard directly into the transcript blanks.',
      skills: 'Listening & Writing'
    },
    {
      name: 'Highlight Correct Summary',
      time: 'Integrated timer',
      description: 'Listen to a short audio clip and select the single written paragraph that best captures the essence of the speaker’s message.',
      skills: 'Listening & Reading'
    },
    {
      name: 'Multiple Choice, Single Answer',
      time: 'Integrated timer',
      description: 'Listen to a spoken excerpt and choose the single most accurate response regarding tone, purpose, or factual detail.',
      skills: 'Listening'
    },
    {
      name: 'Select Missing Word',
      time: 'Integrated timer',
      description: 'Listen to a short talk where the final word or phrase is replaced with an audio beep. Select the word that correctly finishes the thought.',
      skills: 'Listening'
    },
    {
      name: 'Highlight Incorrect Words',
      time: 'Integrated timer',
      description: 'Listen to a recording while reading the transcript. Click on any words in the text that differ from what the speaker actually articulated.',
      skills: 'Listening & Reading'
    },
    {
      name: 'Write From Dictation',
      time: 'Integrated timer',
      description: 'Listen to a single spoken sentence. Type the exact sentence into the text box with correct spelling and punctuation.',
      skills: 'Listening & Writing'
    }
  ];

  // FAQs List
  const faqs = [
    {
      q: 'Do US universities and colleges accept PTE Academic?',
      a: 'Yes, over 1,200 colleges and universities throughout the United States accept PTE Academic for undergraduate, graduate, and professional degree admissions. This includes Ivy League institutions like Harvard Business School, Columbia University, Yale University, and major state university systems.'
    },
    {
      q: 'What is a good PTE score for US university admissions?',
      a: 'Score requirements vary by institution tier. Top-tier and Ivy League institutions generally seek scores between 68 and 75+. Large national universities (such as Penn State or Arizona State) typically require 58 to 65, while community colleges and pathway programs usually accept 45 to 53.'
    },
    {
      q: 'Can I use PTE Academic for a US F-1 Student Visa?',
      a: 'Yes. Once an SEVP-certified US university accepts your PTE Academic score and issues your official Form I-20 (Certificate of Eligibility), you can submit your visa application and attend your F-1 student visa interview with your university acceptance credentials.'
    },
    {
      q: 'How long is the PTE Academic test, and are there breaks?',
      a: 'The PTE Academic exam is a single 2-hour computer-based test consisting of 20 distinct question types across Speaking & Writing, Reading, and Listening. The previously optional 10-minute break between sections has been removed to streamline the testing experience.'
    },
    {
      q: 'How quickly are PTE scores delivered to US universities?',
      a: 'PTE Academic scores are scored automatically by Pearson’s patented AI engine and are typically delivered within 2 to 5 business days. Once published, you can send your score reports to an unlimited number of US universities free of charge through your online Pearson account.'
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
            <span className="text-cyan-400 font-medium">PTE Exam for USA</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Overview */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>Accepted by 1,200+ US Colleges & Universities</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Know Everything about <span className="text-cyan-400">PTE Exam for USA</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                The Pearson Test of English (PTE Academic) is one of the premier English proficiency examinations for international students aiming to pursue undergraduate, graduate, and professional studies across the United States.
              </p>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-2">
                <p>
                  Achieving a competitive PTE score fulfills language prerequisites for top US academic programs. Preparing systematically with authentic exam patterns and timed mock tests ensures you meet university cutoffs with confidence.
                </p>
                <p>
                  NinetyPTE provides comprehensive preparation tools, verified question prediction banks, and AI scoring calibrated to official Pearson standards to help you secure admission into leading American universities.
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
                    <span className="text-[11px] text-slate-400">US Admissions & Testing Specialists</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 6 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 2026 US Admissions Guide
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

            {/* Right Column: Key US Admissions Highlights Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-2xl relative space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">USA Higher Education</span>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    F-1 Visa Eligible
                  </span>
                </div>

                {/* Score Benchmark Snapshot */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Ivy League & Top 30</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">Tier 1</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Harvard, Yale, Columbia, NYU</p>
                    </div>
                    <span className="text-sm font-extrabold text-cyan-400">68 - 75+</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Major State Universities</span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">Tier 2</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Penn State, Arizona State, SUNY</p>
                    </div>
                    <span className="text-sm font-bold text-purple-400">58 - 65</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Community & Pathway Colleges</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Transfer</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Associate Degrees & 2+2 Programs</p>
                    </div>
                    <span className="text-sm font-bold text-blue-400">45 - 53</span>
                  </div>
                </div>

                {/* Turnaround & Reporting */}
                <div className="pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">Score Reporting</span>
                    <span className="text-sm font-bold text-white">2 – 5 Days</span>
                  </div>
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">US Recognition</span>
                    <span className="text-sm font-bold text-cyan-400">1,200+ Univs</span>
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
                  <p className="text-xs text-slate-500">Computerized language assessment designed for global academic mobility</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <span className="text-cyan-600 font-extrabold text-base shrink-0">›</span>
                    <p>
                      PTE Academic is a computer-based English examination evaluating speaking, writing, reading, and listening proficiency among non-native English speakers.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-cyan-600 font-extrabold text-base shrink-0">›</span>
                    <p>
                      Administered in a single 2-hour session, the test utilizes patented automated scoring algorithms, ensuring unbiased and objective evaluation.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-cyan-600 font-extrabold text-base shrink-0">›</span>
                    <p>
                      More than 1,200 US colleges and universities accept PTE scores, providing international students with broad application options across all academic disciplines.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-cyan-600 font-extrabold text-base shrink-0">›</span>
                    <p>
                      Applicants should verify institutional cutoffs and score requirements in advance to target optimal performance on their practice exams.
                    </p>
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
                </div>

                {/* Video / Visual Graphic Card */}
                <div className="md:col-span-5">
                  <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md relative group aspect-video sm:aspect-square flex items-center justify-center p-6 text-center text-white">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950 opacity-90"></div>
                    <div className="relative z-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <span className="block font-bold text-xs uppercase tracking-wider text-cyan-300">USA Admissions Video</span>
                      <p className="text-xs text-slate-300 leading-snug">
                        Discover how PTE scores open doors to American universities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Is PTE Accepted in the USA? */}
            <section id="is-pte-accepted" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Is PTE Accepted in <span className="text-cyan-600">the USA?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Institutional validation across Ivy League, state flagships, and colleges</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  A common question among prospective international scholars is whether US universities recognize PTE Academic. In fact, <strong>over 1,200 institutions</strong> across all 50 states officially accept PTE Academic for admissions.
                </p>
                <p>
                  Prestigious institutions including <strong>Harvard Business School, Yale University, Columbia University, New York University (NYU), and the University of Pennsylvania</strong> accept PTE scores for undergraduate, graduate, or professional degree programs.
                </p>
                <p>
                  Because score expectations vary widely between departments and programs, applicants should review their specific target course criteria to achieve scores that position them favorably during holistic admissions review.
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

            {/* Section 3: Mid-Page Callout Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-black text-white">Confused about PTE for the USA?</h3>
                <p className="text-slate-300 text-sm">Contact our academic advisors for tailored university guidance and score targets.</p>
              </div>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shrink-0 inline-flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Section 4: The PTE Exam Pattern in the USA (All 20 Question Types) */}
            <section id="exam-pattern" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    The PTE Exam Pattern in <span className="text-cyan-600">the USA</span>
                  </h2>
                  <p className="text-xs text-slate-500">Comprehensive breakdown of all 20 question types across 3 distinct test parts</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  The PTE Academic examination is a streamlined <strong>2-hour computer test</strong> encompassing Speaking, Writing, Reading, and Listening. The previously optional 10-minute intermission between Reading and Listening has been removed, providing an uninterrupted testing experience.
                </p>
                <p>
                  Throughout the test, candidates encounter <strong>20 unique question types</strong> designed to evaluate communicative ability and enabling skills (oral fluency, grammar, vocabulary, pronunciation, and spelling).
                </p>
              </div>

              {/* Part 1: Speaking & Writing */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-cyan-600" />
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Part 1: Speaking & Writing – 54 to 67 minutes
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                    7 Question Types
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  You receive allocated preparation time before the microphone opens. You get only one opportunity to record your spoken responses.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {speakingWritingTasks.map((task, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-cyan-300 transition">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{task.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-500">{task.time}</span>
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">{task.skills}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2: Reading */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Part 2: Reading – 29 to 30 minutes
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    5 Question Types
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Reading uses an overall sectional timer. Candidates must manage pacing across fill-in-the-blanks, re-order paragraphs, and multiple choice questions.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {readingTasks.map((task, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-blue-300 transition">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{task.name}</h4>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">{task.skills}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 3: Listening */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-purple-600" />
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Part 3: Listening – 30 to 43 minutes
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    8 Question Types
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Audio prompts play only once. Responses range from written summaries to rapid dictation and auditory discrimination.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {listeningTasks.map((task, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-purple-300 transition">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{task.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-500">{task.time}</span>
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">{task.skills}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{task.description}</p>
                    </div>
                  ))}
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

            {/* Section 5: Minimum PTE Score for USA? */}
            <section id="minimum-scores" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Minimum PTE Score <span className="text-cyan-600">for USA?</span>
                  </h2>
                  <p className="text-xs text-slate-500">Score cutoffs and reporting standards for US colleges and universities</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  PTE Academic test scores are published within approximately <strong>five business days</strong> of exam completion. Scores are reported on a granular scale of <strong>10 to 90</strong> across the 4 core communicative modules, alongside an overall composite score.
                </p>
                <p>
                  Similar to other recognized standardized testing formats, PTE scores remain officially valid for <strong>two years</strong> for US academic admissions. Achieving higher scores frequently enhances eligibility for merit-based scholarships and competitive departmental fellowships.
                </p>
              </div>

              {/* Benchmarks Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl mt-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 border-b border-slate-200">Category</th>
                      <th className="py-3 px-4 border-b border-slate-200">Target Score</th>
                      <th className="py-3 px-4 border-b border-slate-200">Representative Universities</th>
                      <th className="py-3 px-4 border-b border-slate-200">Admissions Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {usaBenchmarks.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <span>{row.tier}</span>
                          <span className="block text-[10px] text-cyan-600 font-semibold mt-0.5">{row.badge}</span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-cyan-600">
                          {row.score}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800 text-[11px]">
                          {row.institutions}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 leading-relaxed text-[11px]">
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

            {/* Section 6: FAQs Accordion */}
            <section id="faqs" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions (FAQs)</h2>
                  <p className="text-xs text-slate-500">Common questions regarding PTE Academic for US universities</p>
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
                  Trusted by Over 2 Million Test Takers
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Why Choose NinetyPTE over others?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  NinetyPTE delivers premier preparation capabilities tailored for US admissions: scored mock exams, Pearson-aligned AI scoring engine, instant enabling skills diagnostics, question prediction files, and proven templates.
                </p>
              </div>

              {/* Stat Grid (Matching Page 3) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">2M+</div>
                  <div className="text-xs text-slate-400 font-medium">Active Users</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">7,206</div>
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
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Complete 20 Question Types</span>
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
                    onClick={() => scrollToSection('what-is-pte')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>What is the PTE Exam?</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('is-pte-accepted')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Is PTE Accepted in the USA?</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('exam-pattern')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>The PTE Exam Pattern in the USA</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('minimum-scores')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Minimum PTE Score for USA?</span>
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
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-100">Real Exam Simulation</span>
                <h4 className="text-lg font-black text-white">Targeting US Universities?</h4>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  Take a complete 2-hour AI-scored mock exam with instant scorecard diagnostics matching Pearson VUE.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>All 20 question types included</span>
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
