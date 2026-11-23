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
  Volume2, 
  BookOpen, 
  HelpCircle,
  PhoneCall,
  ExternalLink,
  MapPin,
  Flame,
  Star,
  Users
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function PTEForAustraliaPage() {
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
      summary: 'Australia Accepted: PTE Academic is 100% recognized by the Department of Home Affairs (DHA) for all Australian immigration and PR visa subclasses (189, 190, 491, 485, etc.) and all Australian universities. Minimum English levels: Competent (50+ each skill = 0 pts), Proficient (65+ each skill = 10 migration pts), Superior (79+ each skill = 20 migration pts). Results delivered in 48 hours and valid for 3 years for migration.'
    },
    grok: {
      tool: 'Grok',
      summary: 'Australia PR & PTE Quick Snapshot: 1) Superior English (79+ in each module) awards the maximum 20 points on the Australian General Skilled Migration points grid. 2) Valid for 3 years for DHA visa applications. 3) Scored objectively by automated AI with zero human bias. 4) All Australian Group of Eight (Go8) universities accept PTE Academic for direct bachelor and master admissions.'
    },
    perplexity: {
      tool: 'Perplexity',
      summary: 'Department of Home Affairs Benchmark: DHA requires minimum Competent English (50 in each band) as baseline eligibility. For competitive PR invitations, candidates target Proficient (65+) or Superior (79+). Unlimited re-test attempts with scores valid for 3 full years for General Skilled Migration.'
    }
  };

  // Australian Immigration Points System Table
  const pointsMatrix = [
    {
      level: 'Competent English',
      minScore: '50 in each skill',
      points: '0 Points',
      visaRelevance: 'Baseline requirement for General Skilled Migration (Subclass 189, 190, 491) and Temporary Graduate (485).',
      badge: 'Minimum Threshold'
    },
    {
      level: 'Proficient English',
      minScore: '65 in each skill',
      points: '10 Points',
      visaRelevance: 'Awards 10 PR points; highly advantageous for state nomination (Subclass 190 & 491).',
      badge: 'Popular Benchmark'
    },
    {
      level: 'Superior English',
      minScore: '79 in each skill',
      points: '20 Points',
      visaRelevance: 'Grants the maximum 20 PR points; crucial for competitive Invitation to Apply (ITA) rounds.',
      badge: 'Maximum Points Boost'
    }
  ];

  // 5 Tips for Success (Matching PDF Page 1 & 2)
  const tipsForSuccess = [
    {
      number: '01',
      title: 'Focus on your weaknesses',
      description: 'Recognize your weak spots and concentrate on enhancing them. For example, if you struggle with the Listening section, practice well by listening to English-language podcasts or watching English-language movies with subtitles.'
    },
    {
      number: '02',
      title: 'Manage your time effectively',
      description: 'Reading & Listening sections of the exam have a strict time limit, so it\'s essential to manage your time effectively. Make sure that you are aware of the exam\'s allowed time before test day, and you must practice using time-management strategies.'
    },
    {
      number: '03',
      title: 'Speak clearly and confidently',
      description: 'In the Speaking section, speak clearly and fluently. Practice speaking in English regularly to build your confidence and improve your pronunciation with consistent oral flow and clear articulation.'
    },
    {
      number: '04',
      title: 'Pay attention to grammar and vocabulary',
      description: 'The exam assesses your grammar and vocabulary skills, so it is important to focus on improving these areas. Use flashcards, vocabulary lists, and grammar exercises to strengthen your skills.'
    },
    {
      number: '05',
      title: 'Stay calm and focused',
      description: 'Test days can be stressful, but staying calm and focused is important. Take deep breaths, read each question carefully, and trust your preparation and mock test diagnostics.'
    }
  ];

  // Eligibility Criteria (Matching PDF Page 2)
  const eligibilityCriteria = [
    {
      title: 'Identification',
      desc: 'You must have a valid passport to register for the exam or various other official identification accepted by Pearson VUE.',
      icon: ShieldCheck
    },
    {
      title: 'English proficiency',
      desc: 'The PTE Academic is designed to assess your English language proficiency, so you should have a basic understanding of English before taking the exam. However, there are no specific prerequisite language degrees or minimum scores required to register.',
      icon: BookOpen
    },
    {
      title: 'Test history',
      desc: 'If you have taken a PTE Academic before, you must wait for the result of the previous exam before scheduling or taking the exam again.',
      icon: Timer
    },
    {
      title: 'Test center requirements',
      desc: 'You must follow the rules and regulations of the test center where you take the exam. This includes arriving on time, bringing the required identification, and following Pearson VUE test center procedures.',
      icon: Building2
    }
  ];

  // 4 Things to Remember (Matching PDF Page 2)
  const thingsToRemember = [
    {
      step: '1',
      title: 'Widely Accepted Across Australia',
      content: 'Firstly, it\'s important to note that the PTE Academic is one of Australia\'s most widely accepted English language proficiency tests. All universities and colleges in Australia (including the prestigious Group of Eight) and the Australian Department of Home Affairs for visa applications accept it 100%.'
    },
    {
      step: '2',
      title: 'Register & Book Well in Advance',
      content: 'Secondly, it\'s important to register & book the PTE Academic exam for Australia well before your intended test date. Registration can be done online, and you can choose your preferred test center and date. However, test centers can fill up quickly, so register early to secure your preferred slot.'
    },
    {
      step: '3',
      title: 'Understand the Complete Exam Format',
      content: 'Thirdly, it\'s important to understand the format of the PTE Academic exam before the test day. The exam consists of three main parts: Speaking and Writing, Reading, and Listening. Each part assesses different aspects of English proficiency with various question types.'
    },
    {
      step: '4',
      title: 'PTE is One Crucial Part of Your Application',
      content: 'Lastly, remember that the PTE Academic exam is only one aspect of your application for Australian universities or immigration. It\'s important to also focus on other aspects, such as your academic achievements, work experience, and financial statements, to present a well-rounded application.'
    }
  ];

  // FAQs (Matching PDF Page 2 & 3)
  const faqs = [
    {
      q: 'Why is the PTE Exam Required in Australia?',
      a: 'The Australian Department of Home Affairs (DHA) and educational institutions require objective proof of English proficiency to ensure international applicants can study, work, and integrate successfully into Australian society. PTE Academic is fully recognized for all Australian visa categories, including General Skilled Migration (Subclasses 189, 190, 491), student visas (Subclass 500), and temporary graduate visas (Subclass 485).'
    },
    {
      q: 'What is the minimum PTE score required for Australian PR?',
      a: 'For Australian Permanent Residency (PR) via General Skilled Migration, the minimum threshold is Competent English (a minimum score of 50 in each of the four test components: Listening, Reading, Writing, and Speaking), which gives 0 points. To be competitive in invitation rounds, applicants typically aim for Proficient English (65+ in each component for 10 PR points) or Superior English (79+ in each component for the maximum 20 PR points).'
    },
    {
      q: 'How long is the PTE score valid for Australian immigration?',
      a: 'For Australian immigration and visa applications processed by the Department of Home Affairs, PTE Academic scores are valid for up to 3 years from the date of the test. For university and higher education admissions in Australia, test scores are typically valid for 2 years.'
    },
    {
      q: 'How can I book a PTE Academic test for Australia?',
      a: 'You can easily book your PTE Academic test online through the official Pearson PTE website (pearsonpte.com) or by purchasing a discounted voucher through NinetyPTE. You can select your preferred test center across Australian cities (Sydney, Melbourne, Brisbane, Perth, Adelaide) or any of the hundreds of Pearson test centers worldwide.'
    },
    {
      q: 'How often can I take the PTE test for Australia?',
      a: 'There is no limit to the number of times you can take the PTE Academic test. However, Pearson guidelines require that you receive your official score report from your previous test before you can book a subsequent test appointment. Scores are usually available within 48 hours.'
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
      
      {/* Floating Vertical "Start Free Trial" Tab on Right Edge (Matching PDF Page 1) */}
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
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
            <span>/</span>
            <span className="text-slate-400">PTE Acceptance countries</span>
            <span>/</span>
            <span className="text-cyan-400 font-medium">PTE Exam Australia</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Immigration Snapshot */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>Australian Immigration & University Admissions Guide</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                PTE Exam Australia
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
                A Comprehensive Guide to PTE Academic for Australian Immigration
              </p>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                If you are planning to immigrate to Australia, you will need to demonstrate your proficiency in the English language. One way to do this is by taking the PTE Academic (Pearson's Test of English Academic) exam. The PTE Academic for Australia or anywhere else is a computer-based test that assesses your reading, writing, speaking and listening skills in English. Here, we will walk you through everything you need to know about the PTE Academic for Australian immigration or higher studies.
              </p>

              {/* Author Info Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-semibold block">NinetyPTE Academic Team</span>
                    <span className="text-[11px] text-slate-400">Verified Australian Migration Specialists</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 5 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Updated for 2026 DHA Rules
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

              {/* Quick Action CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/mock-tests"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition border border-slate-700 inline-flex items-center gap-2"
                >
                  <span>Take Free Mock Test</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Key Australian Visa Badges & Graphic Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-2xl relative">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">DHA 100% Recognized</span>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    Visa Subclasses
                  </span>
                </div>

                {/* Subclass Points Snapshot */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Subclass 189 / 190 / 491</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">PR Visas</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">General Skilled Migration</p>
                    </div>
                    <span className="text-sm font-extrabold text-cyan-400">Up to 20 Pts</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Subclass 485</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Graduate</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Post-Study Work Visa</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">Min 50 Each</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Subclass 500</span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">Study</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">All Australian Universities</p>
                    </div>
                    <span className="text-sm font-bold text-purple-400">100% Accepted</span>
                  </div>
                </div>

                {/* Score Validity & Highlights */}
                <div className="mt-5 pt-4 border-t border-slate-700/60 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">DHA Validity</span>
                    <span className="text-sm font-bold text-white">3 Years</span>
                  </div>
                  <div className="bg-slate-900/40 rounded-xl p-2.5 border border-slate-700/40">
                    <span className="text-[11px] text-slate-400 block">Score Delivery</span>
                    <span className="text-sm font-bold text-cyan-400">&lt; 48 Hours</span>
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
            
            {/* Section 1: PTE Academic Overview for Australia */}
            <section id="overview" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">PTE Academic Overview for Australia</h2>
                  <p className="text-xs text-slate-500">Test format and computer-based evaluation structure</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  The PTE Academic exam measures your ability to communicate effectively in English. It consists of four major components — <strong>Speaking, Writing, Reading and Listening</strong>. Each section has a specific time allotment, and the entire exam takes about two hours to complete.
                </p>
                <p>
                  The <strong>Speaking and Writing</strong> section consists of tasks that measure your ability to produce spoken and written English. You will be asked to respond to prompts by either speaking into a microphone or typing on your computer.
                </p>
                <p>
                  The <strong>Reading</strong> section calculates your capacity to comprehend written academic English, while the <strong>Listening</strong> division measures your ability to apprehend spoken English across international native accents.
                </p>
              </div>

              {/* 4 Skill Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-cyan-50/50 border border-cyan-100 text-center">
                  <span className="block font-bold text-slate-900 text-sm">Speaking</span>
                  <span className="text-[11px] text-slate-500">Microphone Audio</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-50/50 border border-cyan-100 text-center">
                  <span className="block font-bold text-slate-900 text-sm">Writing</span>
                  <span className="text-[11px] text-slate-500">Keyboard Input</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-50/50 border border-cyan-100 text-center">
                  <span className="block font-bold text-slate-900 text-sm">Reading</span>
                  <span className="text-[11px] text-slate-500">Text Comprehension</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-50/50 border border-cyan-100 text-center">
                  <span className="block font-bold text-slate-900 text-sm">Listening</span>
                  <span className="text-[11px] text-slate-500">Audio Perception</span>
                </div>
              </div>
            </section>

            {/* Section 2: PTE Academic Scoring for Australia Immigration */}
            <section id="scoring" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">PTE Academic Scoring for Australia Immigration</h2>
                  <p className="text-xs text-slate-500">Global scale of 10 to 90 & AI scoring objectivity</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  The PTE Academic for Australia is scored on a scale from <strong>10 to 90</strong>, with 90 being the highest possible score. Each exam section also has an individual score, and your overall score is an approximate average of your section-wise scores.
                </p>
                <p>
                  The PTE Academic uses a sophisticated computerized scoring system, which means your exam is scored objectively by an AI system without any human prejudices or regional accent biases.
                </p>
              </div>

              {/* Department of Home Affairs (DHA) Points Matrix Table */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  <span>Australian Department of Home Affairs (DHA) Points Matrix</span>
                </h3>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4 border-b border-slate-200">English Level</th>
                        <th className="py-3 px-4 border-b border-slate-200">PTE Score Requirement</th>
                        <th className="py-3 px-4 border-b border-slate-200">Australian PR Points</th>
                        <th className="py-3 px-4 border-b border-slate-200">Visa Applicability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-normal">
                      {pointsMatrix.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <span>{item.level}</span>
                            <span className="block text-[10px] text-cyan-600 font-semibold mt-0.5">{item.badge}</span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {item.minScore}
                          </td>
                          <td className="py-3.5 px-4 font-black text-cyan-600">
                            {item.points}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 leading-relaxed text-[11px]">
                            {item.visaRelevance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 3: Preparing for the PTE Academic */}
            <section id="preparation" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Preparing for the PTE Academic</h2>
                  <p className="text-xs text-slate-500">Methodology, mock tests, and smart strategy</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Preparing well for the PTE Academic is essential to achieve a higher score. There are several ways to prepare for the exam, including taking practice tests, enrolling in a preparation course, or working with an expert tutor.
                </p>
                <p>
                  Sample free practice tests can be found both on the official website of PTE & on the internet. Practice tests will help you become more comfortable with the exam's structure and develop effective time-management strategies before the actual exam day.
                </p>
              </div>
            </section>

            {/* Section 4: Tips for Success on the PTE Academic (5 Cards) */}
            <section id="tips" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Tips for Success on the PTE Academic</h2>
                  <p className="text-xs text-slate-500">Key strategies to achieve 79+ for maximum immigration points</p>
                </div>
              </div>

              <div className="space-y-4">
                {tipsForSuccess.map((tip, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-cyan-300 transition flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                      {tip.number}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{tip.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Eligibility Criteria for the PTE Exam in Australia */}
            <section id="eligibility" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">What are the Eligibility Criteria for the PTE Exam in Australia?</h2>
                  <p className="text-xs text-slate-500">Requirements to register and sit the exam</p>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                To be eligible to take the PTE exam for Australia, you must meet the following criteria:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eligibilityCriteria.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-cyan-600" />
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                <strong>Important Note:</strong> The PTE Academic's eligibility for Australia may vary depending on the country or institution where you plan to use your test scores. Before registering for the exam, it's best to check with your institution or immigration authority to confirm specific score cutoffs.
              </div>
            </section>

            {/* Section 6: Mid-Page Callout Banner (Matching PDF Page 2) */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl font-black text-white">Ready to take the next step?</h3>
                <p className="text-cyan-100 text-sm font-medium">Our team is here to help with your Australia preparation. Contact us now!</p>
              </div>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm transition shadow-lg shrink-0 inline-flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Section 7: Things to Remember When Taking a PTE Exam for Australia */}
            <section id="things-to-remember" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Things to Remember When Taking a PTE Exam for Australia</h2>
                  <p className="text-xs text-slate-500">Crucial tips for visa lodgement and booking</p>
                </div>
              </div>

              <div className="space-y-4">
                {thingsToRemember.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 font-bold text-xs flex items-center justify-center">
                        {item.step}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                <p>
                  Overall, meeting the eligibility criteria for the PTE Academic exam is just the first step towards achieving your immigration or academic goals in Australia. But you can surely increase your chances of success by providing a well-rounded application that includes a better score in the PTE Academic for Australian migration.
                </p>
                <p>
                  The PTE Academic is an essential requirement for Australian immigration, and it's important to prepare effectively to achieve a high score. With proper preparation and these tips for success, you will be well on your way to demonstrating your proficiency in the English language and achieving your immigration goals. Good luck!
                </p>
              </div>
            </section>

            {/* Section 8: FAQs Accordion (Matching PDF Page 2 & 3) */}
            <section id="faqs" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions (FAQs)</h2>
                  <p className="text-xs text-slate-500">Here are answers to some of the frequently asked questions</p>
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

            {/* Section 9: Why Choose NinetyPTE over others? (Matching PDF Page 3) */}
            <section id="why-ninety-pte" className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 space-y-8">
              <div className="space-y-3 text-center sm:text-left">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Australia's Leading PTE Platform
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Why Choose NinetyPTE over others?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  NinetyPTE offers a variety of features and tools that will help you with PTE practice test online and improve your PTE skills, such as full mock tests, AI scoring, instant feedback, templates, high-frequency questions, and more.
                </p>
              </div>

              {/* Stat Grid (3M+, 20,000, 7M, 95%) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">3M+</div>
                  <div className="text-xs text-slate-400 font-medium">Active Users</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">20,000</div>
                  <div className="text-xs text-slate-400 font-medium">Total Questions</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">7M</div>
                  <div className="text-xs text-slate-400 font-medium">AI Score Clicks</div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-700/60 text-center space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">95%</div>
                  <div className="text-xs text-slate-400 font-medium">AI Accuracy Percentage</div>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Result</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2026 Question Bank</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pearson Matching AI</span>
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
            
            {/* 1. Summarise blog with AI (Matching Screenshots) */}
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

            {/* 2. Table of Contents (Matching Screenshots) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base">Table of Contents</h3>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <button 
                    onClick={() => scrollToSection('overview')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>PTE Academic Overview for Australia</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('scoring')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>PTE Academic Scoring for Australia Immigration</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('preparation')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Preparing for the PTE Academic</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('tips')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Tips for Success on the PTE Academic</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('eligibility')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Eligibility Criteria for PTE in Australia</span>
                  </button>
                </li>

                <li>
                  <button 
                    onClick={() => scrollToSection('things-to-remember')}
                    className="hover:text-cyan-600 transition text-left flex items-center gap-2 w-full py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                    <span>Things to Remember When Taking PTE</span>
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
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-100">Simulate Real Exam</span>
                <h4 className="text-lg font-black text-white">Targeting 79+ for Australia PR?</h4>
                <p className="text-xs text-cyan-100 leading-relaxed">
                  Take a complete AI-scored mock test with instant scorecard analytics matching Pearson VUE.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-cyan-100">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Full 2-hour simulated timer</span>
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
