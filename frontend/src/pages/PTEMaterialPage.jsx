import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  Download, 
  Play, 
  Sparkles, 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  FileText, 
  BarChart3, 
  Award, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Smartphone, 
  Clock, 
  Tv, 
  Send, 
  TrendingUp, 
  Monitor, 
  Target, 
  Compass, 
  Zap, 
  Users, 
  GraduationCap
} from 'lucide-react';

export default function PTEMaterialPage() {
  const [activeTab, setActiveTab] = useState('speaking');
  const [faqOpen, setFaqOpen] = useState({ 0: true });
  const [downloadModal, setDownloadModal] = useState({ open: false, title: '' });
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    instituteName: '',
    email: '',
    country: '',
    phone: '',
    message: ''
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleDownload = (title) => {
    setDownloadModal({ open: true, title });
    setTimeout(() => {
      setDownloadModal({ open: false, title: '' });
    }, 3500);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
    setTimeout(() => {
      setEnquirySubmitted(false);
      setEnquiryForm({
        fullName: '',
        instituteName: '',
        email: '',
        country: '',
        phone: '',
        message: ''
      });
    }, 4000);
  };

  // Module Details for Section 2 (Smart Practice for Every PTE Module)
  const moduleData = {
    speaking: {
      title: 'PTE Speaking Practice Material',
      icon: <Mic className="w-5 h-5 text-amber-500" />,
      color: 'amber',
      paragraphs: [
        'The Speaking section of the PTE exam is one of the most important sections. Many students struggle with speaking clearly, pronouncing words correctly, and maintaining confidence, which can affect their score.',
        "NinetyPTE gives you practice for all speaking tasks, such as Read Aloud, Repeat Sentence, Describe Image, Retell Lecture, Answer Short Question, Summarize Group Discussion, and Respond to a Situation. You can record your responses and receive instant AI feedback using NinetyPTE. This feedback helps you improve your fluency, pronunciation, content, and overall response quality.",
        'By reviewing your performance after each attempt, you can identify mistakes and improve faster. Practicing speaking with proper feedback helps you build confidence and maintain a stable pace during the real PTE exam.'
      ],
      tipsLink: '/pte-speaking-practice',
      tasksCount: '8 Tasks Covered',
      pdfName: 'Speaking Question Bank & Templates'
    },
    writing: {
      title: 'PTE Writing Practice Material',
      icon: <PenTool className="w-5 h-5 text-sky-500" />,
      color: 'sky',
      paragraphs: [
        'The Writing section assesses your ability to produce standard academic English in written form. Students frequently lose marks due to weak essay structures, grammar errors, and poor vocabulary range.',
        "NinetyPTE delivers comprehensive practice for Summarize Written Text, Write Essay, and Write Email (PTE Core). Our AI engine provides line-by-line grammar corrections, vocabulary richness analysis, spelling validation, and structural scoring aligned with Pearson standards.",
        'With proven high-scoring templates and hundreds of real exam topics, you can systematically master 90-band essay frameworks and precise single-sentence summaries.'
      ],
      tipsLink: '/pte-writing-practice',
      tasksCount: '3 Tasks Covered',
      pdfName: 'Writing Templates & 90-Band Essays'
    },
    reading: {
      title: 'PTE Reading Practice Material',
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      color: 'emerald',
      paragraphs: [
        'The Reading section demands strong collocation knowledge, academic vocabulary, and rapid comprehension skills under strict time limits.',
        "NinetyPTE provides intensive practice for Fill in the Blanks (Drop Down), Multiple Choice (Multiple Answers), Re-order Paragraphs, Fill in the Blanks (Drag & Drop), and Multiple Choice (Single Answer). Each question includes detailed grammatical explanations and vocabulary collocation hints.",
        'Master common academic word lists and logical cohesion strategies to solve tricky re-order paragraphs and fill-in-the-blanks with absolute accuracy.'
      ],
      tipsLink: '/pte-reading-practice',
      tasksCount: '5 Tasks Covered',
      pdfName: 'Reading Collocations & Question Bank'
    },
    listening: {
      title: 'PTE Listening Practice Material',
      icon: <Headphones className="w-5 h-5 text-indigo-500" />,
      color: 'indigo',
      paragraphs: [
        'The Listening section measures your comprehension of international spoken English across diverse native and non-native accents at varying speeds.',
        "NinetyPTE offers authentic practice for Summarize Spoken Text, Write From Dictation, Fill in the Blanks, Highlight Incorrect Words, Select Missing Word, and Multiple Choice questions using real exam-paced recordings.",
        'Train your ear with variable playback speeds, transcript sync, and high-frequency Write From Dictation prediction banks that directly contribute to both Listening and Writing scores.'
      ],
      tipsLink: '/pte-listening-practice',
      tasksCount: '8 Tasks Covered',
      pdfName: 'Listening Audio Scripts & Prediction Bank'
    }
  };

  // 5 Free Downloadable PDFs (Page 2)
  const freePdfs = [
    {
      title: 'PTE Strategies',
      desc: 'Proven strategies and expert tips for every question type in all four modules.',
      icon: <BarChart3 className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'PTE Templates',
      desc: 'High-scoring templates for Speaking, Writing (Essay & SWT), and more.',
      icon: <FileText className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'High-Scoring Tasks',
      desc: 'Curated practice tasks and sample answers to help you score 65+ and 79+.',
      icon: <Award className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Read Aloud Sample Questions',
      desc: 'Practice real exam-style Read Aloud questions with sample answers, pronunciation tips, and scoring strategies.',
      icon: <BookOpen className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Full PTE Question Bank',
      desc: 'Get a comprehensive collection of PTE practice questions covering Speaking, Writing, Reading, and Listening.',
      icon: <Layers className="w-6 h-6 text-[#00c2cb]" />
    }
  ];

  // 6 Video Playlists (Page 2)
  const videoPlaylists = [
    {
      id: '01',
      title: 'PTE Academic',
      count: '200+ Videos',
      color: 'from-blue-900 to-indigo-900',
      labelColor: 'bg-blue-600',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '02',
      title: 'PTE Core',
      count: '100+ Videos',
      color: 'from-amber-800 to-orange-900',
      labelColor: 'bg-amber-600',
      img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '03',
      title: 'PTE Academic Speaking & Writing',
      count: '50+ Videos',
      color: 'from-cyan-900 to-blue-950',
      labelColor: 'bg-[#00c2cb]',
      img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '04',
      title: 'PTE Academic Reading',
      count: '50+ Videos',
      color: 'from-emerald-900 to-teal-950',
      labelColor: 'bg-emerald-600',
      img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '05',
      title: 'PTE Academic Listening',
      count: '50+ Videos',
      color: 'from-fuchsia-950 to-purple-950',
      labelColor: 'bg-fuchsia-600',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: '06',
      title: 'PTE Learn the Strategy',
      count: '100+ Videos',
      color: 'from-rose-950 to-orange-950',
      labelColor: 'bg-rose-600',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80'
    }
  ];

  // 6 Quality Benefits (Page 3)
  const qualityBenefits = [
    {
      title: 'Practice with Real Exam Standards',
      desc: 'Quality preparation material is designed to reflect the latest PTE exam pattern, question types, and difficulty level. This helps you become familiar with the test structure and reduces surprises on exam day.',
      icon: <Monitor className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Improve All Four Language Skills',
      desc: 'A comprehensive study resource covers Speaking, Writing, Reading, and Listening in one place. By practicing each skill regularly, you can identify weaknesses and focus on the areas that need improvement.',
      icon: <Globe className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Build Accuracy and Confidence',
      desc: 'Regular practice with well-structured questions helps improve accuracy, time management, and overall confidence. As you become familiar with common question formats, you can respond more effectively during the actual test.',
      icon: <Target className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Receive Meaningful Performance Insights',
      desc: 'The best PTE preparation materials provide detailed feedback and performance analysis. Understanding your strengths and weaknesses allows you to create a focused study plan and make faster progress toward your target score.',
      icon: <TrendingUp className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Prepare Smarter, Not Harder',
      desc: 'Instead of spending hours on random resources, quality preparation material offers a structured learning path. With targeted practice, mock tests, and skill-based exercises, you can study more efficiently & maximize your score potential.',
      icon: <Zap className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Get Exam-Ready with the Right Resources',
      desc: 'Using trusted PTE preparation material can make a significant difference in your performance. From understanding question types to tracking your progress with mock tests, the right resources help you prepare with confidence.',
      icon: <ShieldCheck className="w-6 h-6 text-[#00c2cb]" />
    }
  ];

  // 8 Platform Advantage Cards (Page 4)
  const platformAdvantages = [
    {
      title: 'Updated Material',
      desc: 'Access regularly updated practice questions and study resources based on the latest PTE exam patterns and trends.',
      icon: <Zap className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'AI Scoring',
      desc: 'Receive instant AI-powered scoring and detailed feedback to understand your performance and improve faster.',
      icon: <Sparkles className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Full Mock Tests',
      desc: 'Practice with full-length mock tests designed to simulate the real PTE exam experience and timing.',
      icon: <Monitor className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'All Four Modules',
      desc: 'Prepare for Speaking, Writing, Reading, and Listening in one complete and structured platform.',
      icon: <Layers className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Performance Tracking',
      desc: 'Track your scores, monitor progress, and analyze performance with detailed reports and insights.',
      icon: <BarChart3 className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Weak Area Identification',
      desc: 'Identify and focus on the question types and areas that need the most improvement.',
      icon: <TrendingUp className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Structured Support',
      desc: 'Follow a guided preparation approach with organized materials, study plan, strategies, and practice tools.',
      icon: <ShieldCheck className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: 'Real Exam Interface',
      desc: 'Practice on an exam-like interface that helps you build confidence and familiarity before test day.',
      icon: <GraduationCap className="w-6 h-6 text-[#00c2cb]" />
    }
  ];

  // 4 Practice Question Columns (Page 5)
  const sampleQuestionModules = {
    speaking: [
      'Read Aloud',
      'Repeat Sentence',
      'Describe Image',
      'Re-Tell Lecture (Academic / UKVI)',
      'Answer Short Question',
      'Respond to a Situation (Academic / UKVI)',
      'Summarize Group Discussion (Academic / UKVI)',
      'Respond to a Situation (Core)'
    ],
    writing: [
      'Summarize Written Text',
      'Write Essay',
      'Write Email (Core)'
    ],
    reading: [
      'Fill in the Blanks (Drop Down)',
      'Multiple Choice, Multiple Answers',
      'Re-order Paragraphs',
      'Fill in the Blanks (Drag & Drop)',
      'Multiple Choice, Single Answer'
    ],
    listening: [
      'Summarize Spoken Text',
      'Multiple Choice, Multiple Answers',
      'Fill in the Blanks',
      'Highlight Correct Summary',
      'Multiple Choice, Single Answer',
      'Select Missing Word',
      'Highlight Incorrect Words',
      'Write from Dictation'
    ]
  };

  // 7 FAQs (Page 6)
  const faqs = [
    {
      q: 'What is PTE practice material?',
      a: 'PTE practice material consists of curated study resources, sample questions, official mock tests, high-scoring templates, strategy guides, and Pearson-aligned AI scoring tools designed to help test-takers prepare for PTE Academic, UKVI, and Core.'
    },
    {
      q: "What is included in NinetyPTE's PTE study material?",
      a: "NinetyPTE's study material includes over 10,000+ real exam-style practice questions with instant AI scoring, full-length & sectional mock tests, 90-band essay & speaking templates, academic collocation lists, video masterclasses, and weekly updated prediction files."
    },
    {
      q: 'Is NinetyPTE suitable for complete PTE exam preparation?',
      a: 'Yes, absolutely. NinetyPTE provides an all-in-one preparation ecosystem covering all 20 question types across Speaking, Writing, Reading, and Listening with real test interface simulation, instant diagnostics, and personalized study planning.'
    },
    {
      q: 'Is NinetyPTE practice material updated for the exam?',
      a: 'Yes. Our academic research team continuously updates questions, prediction banks, and scoring models to reflect the latest Pearson PTE exam changes, including recent additions like Summarize Group Discussion and Respond to a Situation.'
    },
    {
      q: 'Can I prepare for PTE at home using the material?',
      a: 'Yes. Thousands of candidates achieve 79+ and 90 scores studying entirely from home using NinetyPTE’s guided study plans, video lessons, on-demand AI speech/writing evaluation, and realistic scored mock exams.'
    },
    {
      q: 'Does NinetyPTE provide PTE Academic practice material?',
      a: 'Yes. NinetyPTE fully supports PTE Academic, PTE Academic UKVI, and PTE Core with dedicated question pools, targeted templates, and accurate score calculations tailored to each exam variant.'
    },
    {
      q: 'Is practicing on NinetyPTE free, or should I pay for a premium?',
      a: 'NinetyPTE offers free access to thousands of practice questions, downloadable PDF materials, video lessons, and diagnostic sample tests upon signup. Advanced features such as unlimited full-length AI-scored mock tests and VIP prediction files are available under affordable premium passes.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c2cb] selection:text-white pb-16">
      
      {/* Toast Notification when Download triggers */}
      {downloadModal.open && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-8 h-8 rounded-full bg-[#00c2cb] text-white flex items-center justify-center font-bold">✓</div>
          <div>
            <div className="text-xs font-black">Download Initialized</div>
            <div className="text-[11px] text-slate-300">{downloadModal.title} PDF is saving...</div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="pt-10 sm:pt-14 pb-12 bg-gradient-to-b from-sky-50/50 via-white to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Trust Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-50 text-[#00c2cb] border border-cyan-100">
              <span className="w-2 h-2 rounded-full bg-[#00c2cb] animate-pulse"></span>
              Trusted by 3 Million+ learners worldwide
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2 mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              PTE <span className="text-[#00c2cb]">Practice Material</span>
            </h1>
            <p className="text-sm sm:text-base font-bold text-slate-700">
              Everything You Need to Score Higher in PTE
            </p>
          </div>

          {/* Two-Column Hero Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative pl-8 border-l-4 border-l-[#00c2cb]">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4">
                  Comprehensive PTE Exam Practice Material
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  <p>
                    To prepare for the PTE Academic, PTE Academic UKVI, and PTE Core exams, you need to use NinetyPTE's updated practice material. This has everything you need to prepare for the PTE exam in one place. You do not have to rely on PDFs or resources that are all over the place. NinetyPTE gives you a focused way to prepare for the PTE exam. This helps to improve your performance step by step.
                  </p>
                  <p>
                    This platform is for people who're serious about taking the PTE exam. They want to be accurate, consistent, and confident before the exam. Every section feels like the PTE exam, so you can practice smartly and get good results. But remember that just going through PDFs or other resources is not always helpful unless you use a proper AI-scored platform to analyse your performance and improve your time management skills.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/pte-practice"
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95"
                >
                  Start Practice
                </Link>
                <a
                  href="#video-tutorials"
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-200/90 shadow-xs transition flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-800" />
                  Watch Intro
                </a>
              </div>
            </div>

            {/* Right Visual Setup with Laptop & Badges */}
            <div className="lg:col-span-5 relative flex justify-center py-4">
              
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-cyan-200/20 blur-3xl rounded-full pointer-events-none" />

              {/* Top Right Circular Badge: 24/7 Practice Access */}
              <div className="absolute -top-3 -right-2 sm:right-4 z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white border-2 border-[#00c2cb] shadow-lg flex flex-col items-center justify-center text-center p-2">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-tight">24/7</span>
                <span className="text-[9px] uppercase font-bold text-[#00c2cb] tracking-tighter">Practice Access</span>
              </div>

              {/* Main Laptop / Study Station Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 max-w-[420px] w-full">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" 
                  alt="NinetyPTE Preparation Desk" 
                  className="w-full h-64 sm:h-72 object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                
                {/* Simulated Laptop Screen Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs rounded-xl p-2.5 text-[10px] text-slate-800 border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100 font-bold text-slate-900">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      NinetyPTE Portal Active
                    </span>
                    <span className="text-[#00c2cb]">Real Exam Mock Test</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-mono text-[9px]">
                    <span>Speaking: 84</span>
                    <span>Writing: 82</span>
                    <span>Reading: 80</span>
                    <span>Listening: 86</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge Top Left: Latest Exam Trends */}
              <div className="absolute top-8 -left-4 sm:left-0 z-20 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 max-w-[210px]">
                <div className="w-7 h-7 rounded-xl bg-cyan-50 border border-cyan-100 text-[#00c2cb] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Latest Exam Trends</div>
                  <div className="text-[11px] font-extrabold text-slate-900 leading-tight">Updated Frequent Qs</div>
                </div>
              </div>

              {/* Floating Badge Bottom Right: Structured Preparation */}
              <div className="absolute -bottom-4 right-0 sm:right-6 z-20 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 max-w-[220px]">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Structured Prep</div>
                  <div className="text-[11px] font-extrabold text-slate-900 leading-tight">Templates & Strategies</div>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Sub-Navigation Pills (Page 1) */}
          <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-600">
            <a href="#practice-materials" className="px-5 py-2 rounded-full border border-slate-200 hover:border-[#00c2cb] hover:text-[#00c2cb] bg-white transition shadow-2xs">
              Practice Materials
            </a>
            <a href="#video-tutorials" className="px-5 py-2 rounded-full border border-slate-200 hover:border-[#00c2cb] hover:text-[#00c2cb] bg-white transition shadow-2xs">
              Video Tutorials
            </a>
            <a href="#why-ninetypte" className="px-5 py-2 rounded-full border border-slate-200 hover:border-[#00c2cb] hover:text-[#00c2cb] bg-white transition shadow-2xs">
              Why NinetyPTE
            </a>
            <a href="#sample-questions" className="px-5 py-2 rounded-full border border-slate-200 hover:border-[#00c2cb] hover:text-[#00c2cb] bg-white transition shadow-2xs">
              Sample Questions
            </a>
            <a href="#faqs" className="px-5 py-2 rounded-full border border-slate-200 hover:border-[#00c2cb] hover:text-[#00c2cb] bg-white transition shadow-2xs">
              FAQs
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "Smart Practice for Every PTE Module" (Page 1)                         */}
      {/* ========================================================================= */}
      <section id="practice-materials" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-[#00c2cb] border border-cyan-100">
              ⇄ Practice. Analyze. Improve
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Smart Practice for <span className="text-[#00c2cb]">Every PTE Module</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Train with structured resources, exam-focused materials, and AI-powered evaluation across all question types
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-lg mx-auto bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
            {[
              { id: 'speaking', label: 'Speaking', icon: <Mic className="w-3.5 h-3.5" /> },
              { id: 'writing', label: 'Writing', icon: <PenTool className="w-3.5 h-3.5" /> },
              { id: 'reading', label: 'Reading', icon: <BookOpen className="w-3.5 h-3.5" /> },
              { id: 'listening', label: 'Listening', icon: <Headphones className="w-3.5 h-3.5" /> }
            ].map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#00c2cb] text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Card */}
          {(() => {
            const data = moduleData[activeTab];
            return (
              <div className="bg-[#fcfdfd] rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Descriptions & CTAs */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                        {data.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900">
                        {data.title}
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {data.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* 3 Horizontal Action Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                      
                      {/* Free Signup */}
                      <Link
                        to="/auth"
                        className="bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-800">FREE SIGNUP</div>
                          <div className="text-[9px] text-slate-500">Start practicing instantly</div>
                        </div>
                        <span className="text-slate-400 group-hover:text-[#00c2cb] transition-colors font-bold text-xs">→</span>
                      </Link>

                      {/* Speaking Tips */}
                      <Link
                        to={data.tipsLink}
                        className="bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                            {activeTab.toUpperCase()} TIPS
                          </div>
                          <div className="text-[9px] text-slate-500">Expert advice to score</div>
                        </div>
                        <span className="text-slate-400 group-hover:text-[#00c2cb] transition-colors font-bold text-xs">→</span>
                      </Link>

                      {/* Video Playlist */}
                      <a
                        href="#video-tutorials"
                        className="bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                            {activeTab.toUpperCase()} PLAYLIST
                          </div>
                          <div className="text-[9px] text-slate-500">Step-by-step strategies</div>
                        </div>
                        <span className="text-slate-400 group-hover:text-[#00c2cb] transition-colors font-bold text-xs">→</span>
                      </a>

                    </div>
                  </div>

                  {/* Right Column: PDF Download Illustration Graphic */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-orange-100 to-amber-50 border-4 border-white shadow-xl flex flex-col items-center justify-center relative p-4 mb-4">
                      {/* Floating Star */}
                      <div className="absolute top-4 right-6 text-amber-400 text-lg">★</div>
                      
                      {/* Paper Document Icon */}
                      <div className="w-20 h-26 bg-white rounded-xl shadow-md border border-slate-100 p-2 flex flex-col justify-between">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                          <span className="px-1 py-0.5 rounded-sm bg-rose-500 text-white font-mono text-[8px] font-black">PDF</span>
                          <span className="text-[8px] text-slate-400">90 Band</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-1 bg-slate-200 rounded-full" />
                          <div className="w-3/4 h-1 bg-slate-200 rounded-full" />
                          <div className="w-5/6 h-1 bg-[#00c2cb] rounded-full" />
                        </div>
                        <div className="text-[7.5px] font-bold text-slate-500 text-center uppercase tracking-tighter">
                          Official Q-Bank
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(data.pdfName)}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Sample Question Bank PDF</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "Everything You Need to Prepare" & 5 Free PDFs (Page 2)                 */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#f8fafc] border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Intro Description matching Page 2 */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Everything You Need to <span className="text-[#00c2cb]">Prepare for PTE</span>
            </h2>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>
                Preparing for the PTE exam is about understanding patterns, improving your areas, and developing a good strategy. NinetyPTE offers free practice materials that cover all four modules of the PTE exam: Speaking, Writing, Reading and Listening.
              </p>
              <p>
                Each module has practice questions that target areas, repeated patterns, and tools to track your performance. This helps you find your mistakes early and improve faster. Your goal is to practice the way and get the score you want efficiently.
              </p>
            </div>
          </div>

          {/* Heading for 5 PDFs */}
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Download All Free PDFs
            </h3>
          </div>

          {/* 5 PDF Cards Grid matching Page 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {freePdfs.map((pdf, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4 text-center group"
              >
                <div className="space-y-3 flex flex-col items-center">
                  {/* Badge */}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-50 text-[#00c2cb] border border-cyan-100">
                    Updated PDF Material
                  </span>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50/70 border border-cyan-100 flex items-center justify-center">
                    {pdf.icon}
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-[#00c2cb] transition-colors leading-tight">
                    {pdf.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {pdf.desc}
                  </p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(pdf.title)}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            ))}
          </div>

          {/* Action CTAs below cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/pte-practice"
              className="px-7 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition"
            >
              Start Practicing
            </Link>
            <Link
              to="/pte-exam-pattern"
              className="px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-300 shadow-xs transition"
            >
              Access Question Bank
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Master PTE with Expert Video Lessons" (Page 2)                        */}
      {/* ========================================================================= */}
      <section id="video-tutorials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Master PTE with Expert <span className="text-[#00c2cb]">Video Lessons</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Step-by-step video tutorials, expert strategies and proven tips to help you score 79+ in PTE.
            </p>
            <div className="pt-2">
              <span className="inline-block px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                6 EXPERT PLAYLISTS • 500+ VIDEOS • SCORE HIGHER
              </span>
            </div>
          </div>

          {/* 6 Video Playlist Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoPlaylists.map(playlist => (
              <div 
                key={playlist.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition group flex flex-col justify-between"
              >
                {/* Video Thumbnail with Play Button */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img 
                    src={playlist.img} 
                    alt={playlist.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${playlist.color} opacity-80`} />
                  
                  {/* Playlist Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/40 backdrop-blur-xs text-white">
                      PLAYLIST {playlist.id}
                    </span>
                  </div>

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-[#00c2cb] text-slate-900 group-hover:text-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Title & Count Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-base font-black leading-tight drop-shadow-sm">
                      {playlist.title}
                    </h4>
                    <span className="text-[11px] font-bold text-cyan-200 drop-shadow-xs">
                      ▶ {playlist.count}
                    </span>
                  </div>
                </div>

                {/* Bottom Bar matching Page 2 */}
                <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-slate-400">{playlist.id}</span>
                    <span className="font-bold text-slate-800">{playlist.title}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500">{playlist.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Ribbon Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-100 text-center">
            <div className="p-3">
              <div className="text-xs font-black text-slate-900">Expert Video Lessons</div>
              <div className="text-[11px] text-slate-500">Learn from 90-scorers</div>
            </div>
            <div className="p-3">
              <div className="text-xs font-black text-slate-900">Step-by-Step Guidance</div>
              <div className="text-[11px] text-slate-500">All 20 question types</div>
            </div>
            <div className="p-3">
              <div className="text-xs font-black text-slate-900">Score Higher</div>
              <div className="text-[11px] text-slate-500">Proven 79+ templates</div>
            </div>
            <div className="p-3">
              <div className="text-xs font-black text-slate-900">Learn Anytime</div>
              <div className="text-[11px] text-slate-500">24/7 web & mobile access</div>
            </div>
            <div className="p-3 col-span-2 sm:col-span-1">
              <div className="text-xs font-black text-slate-900">Trusted by Thousands</div>
              <div className="text-[11px] text-slate-500">Join 3M+ successful students</div>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center pt-2">
            <Link
              to="/pte-practice"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              <span>Start Free PTE Practice Now</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. "Why Use Quality PTE Preparation Material?" (Page 2 & 3)               */}
      {/* ========================================================================= */}
      <section id="why-ninetypte" className="py-16 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Why Use Quality <span className="text-[#00c2cb]">PTE Preparation Material?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              The right study resources help you understand the exam format, improve your English skills, and maximize your PTE score through structured practice.
            </p>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {qualityBenefits.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-md transition relative overflow-hidden flex flex-col justify-between"
              >
                {/* Top Colored Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00c2cb]" />

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. AI SCORING & MOCK TESTS SHOWCASE (Page 3 & 4)                          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              PTE Practice Material with <span className="text-[#00c2cb]">AI Scoring and Mock Tests</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Prepare with confidence using AI scoring, real exam simulation, and detailed performance insights.
            </p>
          </div>

          {/* Block 1: AI Scoring and Instant Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-50 text-[#00c2cb] border border-cyan-100">
                <Sparkles className="w-3.5 h-3.5" />
                Powered By Advanced AI
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                AI Scoring and Instant Feedback
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                One of the features of NinetyPTE is its AI scoring system. After each practice attempt, students receive instant feedback based on real-exam scoring criteria.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                The system provides detailed insights into performance, including fluency, pronunciation, content, grammar, and vocabulary. This allows students to clearly understand their strengths and weaknesses. Instead of guessing what went wrong, you get clear direction on what to improve. This makes your preparation more efficient and focused.
              </p>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Fluency', 'Pronunciation', 'Content', 'Grammar', 'Vocabulary'].map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/pte-practice"
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition inline-block"
                >
                  Start Free Practice
                </Link>
              </div>
            </div>

            {/* Right Mockup Graphic: Realistic Scorecard Card */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-2xl border-4 border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <span className="font-bold text-[#00c2cb]">NinetyPTE AI Score Diagnostics</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Passed (79+)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700">
                    <div className="text-3xl font-black text-[#00c2cb]">79</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Speaking</div>
                  </div>
                  <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700">
                    <div className="text-3xl font-black text-teal-400">80</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">Reading</div>
                  </div>
                </div>

                {/* Audio Waveform Simulation */}
                <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Enabling Skills</span>
                    <span>05/90 Diagnostic</span>
                  </div>
                  <div className="flex items-center gap-1.5 h-6 px-1">
                    {[40, 70, 95, 60, 85, 90, 50, 75, 80, 100, 65, 85, 90, 45, 70, 95, 80, 60].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-[#00c2cb] to-teal-400 rounded-full" 
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono pt-1">
                    <span>Content: 85</span>
                    <span>Fluency: 80</span>
                    <span>Pronunciation: 78</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Block 2: Real Exam Simulation Mock Tests */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto pt-6">
            
            {/* Left Mock Test Visual Card */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-900">PTE Full Mock Test Series</span>
                  <span className="text-[10px] font-bold text-[#00c2cb] font-mono">Exam Simulation</span>
                </div>

                {/* Sample Mock Test Question Item */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>Reading (Part 1): Fill in the Blanks</span>
                    <span className="text-rose-500 font-mono">01:45 remaining</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Sleepwalking is a disorder that occurs during deep, slow-wave sleep. A person may get up and walk around. It usually occurs at <span className="bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded font-bold">Select Answer ▾</span> times of night, especially during the earliest hours of sleep.
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[9px] text-slate-400">Timed 2-Hour Experience</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-bold text-[10px]">Submit Response</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 font-bold border border-purple-100">
                    Full Mock Tests
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-900 font-bold border border-teal-100">
                    Sectional Mock Tests
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Real Exam Simulation Mock Tests
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Mock tests are very important for PTE preparation. NinetyPTE offers Full Mock tests, sectional mock tests, and timed sectional mock tests that are like the real PTE exam.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                These PTE mock tests help candidates understand how to handle pressure and question flow. Practicing under real exam conditions builds confidence and improves time management. Regular PTE Practice with mock tests & sectional mock tests allow students to track their progress and adjust their strategy.
              </p>

              {/* Checkpoints */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-cyan-100 text-[#00c2cb] flex items-center justify-center shrink-0 text-xs">✓</div>
                  <span>Full Mock Tests – The complete 2-hour experience</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-cyan-100 text-[#00c2cb] flex items-center justify-center shrink-0 text-xs">✓</div>
                  <span>Sectional Mock Tests – Focus on specific weak areas</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-cyan-100 text-[#00c2cb] flex items-center justify-center shrink-0 text-xs">✓</div>
                  <span>Timed Practice – Master your time management</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/mock-tests"
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition inline-block"
                >
                  Take a PTE Free Mock Test Today
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. "Who Should Use This PTE Practice Material?" & Dark Goal Banner (Page 4) */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Who Should Use This <span className="text-[#00c2cb]">PTE Practice Material?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Build confidence with targeted practice, expert resources, and realistic exam preparation designed for success.
            </p>
          </div>

          {/* Target Audience Pills Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {[
              'Students targeting 50+',
              'Students targeting 65+',
              'Students targeting 79+',
              'Nurses & Healthcare',
              'PR Applicants',
              'Student Visa Applicants',
              'Students targeting 90'
            ].map((audience, idx) => (
              <span 
                key={idx} 
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs hover:border-[#00c2cb] transition-colors"
              >
                {audience}
              </span>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Designed for students, migrants, and professionals, our PTE practice materials help you build skills, improve accuracy, and achieve your target score with confidence.
          </p>

          {/* Dark Navy Goal Card matching Page 4 */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-[#00c2cb]/20 border border-[#00c2cb]/50 text-[#00c2cb] mx-auto flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Achieve Your Target <span className="text-[#00c2cb]">PTE Score?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Practice with exam-focused PTE preparation material designed for every score goal.
            </p>
            <div className="pt-2">
              <Link
                to="/pte-practice"
                className="px-8 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm shadow-md transition active:scale-95 inline-block"
              >
                Start Free Practice
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. "Why Is NinetyPTE the Best PTE Practice Material Platform?" (Page 4)   */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Why Is NinetyPTE the Best <span className="text-[#00c2cb]">PTE Practice Material Platform?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              NinetyPTE is designed for students who want a reliable and modern PTE preparation platform. It combines updated material, smart tools, and performance tracking in one place.
            </p>
          </div>

          {/* 8 Advantage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformAdvantages.map((adv, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                    {adv.icon}
                  </div>
                  <h3 className="text-sm font-black text-slate-900">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight Callout Box */}
          <div className="max-w-3xl mx-auto bg-cyan-50/70 border-l-4 border-l-[#00c2cb] p-4 rounded-r-2xl text-xs sm:text-sm font-bold text-slate-800">
            This approach ensures students not just practice more, but practice in the right way.
          </div>

          <div className="text-center pt-2">
            <Link
              to="/pte-practice"
              className="px-8 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition inline-block"
            >
              Start PTE Practice
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. Comparison: "Why Online PTE Practice Material Is Better Than PDFs" (Page 5) */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Online <span className="text-[#00c2cb]">PTE Practice Material</span> Is Better Than PDFs
            </h2>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="grid grid-cols-3 bg-gradient-to-r from-[#00c2cb] to-teal-500 text-white font-black text-xs sm:text-sm p-4 text-center">
              <div className="text-left font-extrabold">Feature</div>
              <div>PDFs</div>
              <div>NinetyPTE</div>
            </div>

            {[
              { feat: 'AI Scoring', pdf: false, ninetypte: true },
              { feat: 'Mock Tests', pdf: false, ninetypte: true },
              { feat: 'Analytics', pdf: false, ninetypte: true },
              { feat: 'Updated Questions', pdf: false, ninetypte: true },
              { feat: 'Performance Tracking', pdf: false, ninetypte: true }
            ].map((row, idx) => (
              <div 
                key={idx} 
                className={`grid grid-cols-3 p-4 text-xs sm:text-sm items-center text-center border-t border-slate-100 ${
                  idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'
                }`}
              >
                <div className="text-left font-bold text-slate-800">{row.feat}</div>
                <div className="text-rose-500 font-black text-base">✕</div>
                <div className="text-emerald-600 font-black text-base flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</div>
                </div>
              </div>
            ))}
          </div>

          {/* Callout Box */}
          <div className="bg-cyan-50/70 border-l-4 border-l-[#00c2cb] p-4 rounded-r-2xl text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Static PDFs leave you guessing. Switch to NinetyPTE's interactive platform built for modern PTE exam success with real-time scoring and adaptive AI feedback.
          </div>

          <div className="text-center pt-2">
            <Link
              to="/pte-practice"
              className="px-8 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition inline-block"
            >
              Try Our Online Practice
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. "Practice Real PTE Sample Questions with AI Scoring" (Page 5)         */}
      {/* ========================================================================= */}
      <section id="sample-questions" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Practice Real <span className="text-[#00c2cb]">PTE Sample Questions</span> with AI Scoring
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Choose a question type, practice in a real exam environment, and receive instant AI-powered feedback to improve your PTE score faster.
            </p>
          </div>

          {/* 4 Module Columns matching Page 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* Speaking Column */}
            <div className="bg-amber-50/40 rounded-3xl p-5 border border-amber-200/70 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-200/80">
                <Mic className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black text-amber-950 uppercase tracking-wider">Speaking</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {sampleQuestionModules.speaking.map((task, idx) => (
                  <li key={idx}>
                    <Link to="/pte-speaking-practice" className="hover:text-[#00c2cb] hover:underline transition-colors block py-0.5 font-medium">
                      {task}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Writing Column */}
            <div className="bg-sky-50/40 rounded-3xl p-5 border border-sky-200/70 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-sky-200/80">
                <PenTool className="w-5 h-5 text-sky-600" />
                <h3 className="text-sm font-black text-sky-950 uppercase tracking-wider">Writing</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {sampleQuestionModules.writing.map((task, idx) => (
                  <li key={idx}>
                    <Link to="/pte-writing-practice" className="hover:text-[#00c2cb] hover:underline transition-colors block py-0.5 font-medium">
                      {task}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reading Column */}
            <div className="bg-emerald-50/40 rounded-3xl p-5 border border-emerald-200/70 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-200/80">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wider">Reading</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {sampleQuestionModules.reading.map((task, idx) => (
                  <li key={idx}>
                    <Link to="/pte-reading-practice" className="hover:text-[#00c2cb] hover:underline transition-colors block py-0.5 font-medium">
                      {task}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Listening Column */}
            <div className="bg-indigo-50/40 rounded-3xl p-5 border border-indigo-200/70 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-indigo-200/80">
                <Headphones className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wider">Listening</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {sampleQuestionModules.listening.map((task, idx) => (
                  <li key={idx}>
                    <Link to="/pte-listening-practice" className="hover:text-[#00c2cb] hover:underline transition-colors block py-0.5 font-medium">
                      {task}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* PTE Score Calculator Sub-Section (Page 5) */}
          <div className="max-w-4xl mx-auto pt-10 border-t border-slate-100 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                PTE Score Calculator
              </h3>
              <p className="text-xs text-slate-500 max-w-2xl mx-auto">
                You can also use the score calculator to check your scores for understanding your skills requirements and how much you have scored, and also how you can further improve your practice plan to get your target scores faster.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: PTE Academic */}
              <Link 
                to="/pte-score-calculator" 
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#00c2cb] shadow-2xs hover:shadow-md transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00c2cb]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 group-hover:text-[#00c2cb] transition-colors">PTE Academic</div>
                    <div className="text-[11px] text-slate-500">For Study Abroad & General Visa</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c2cb] transition-colors" />
              </Link>

              {/* Card 2: PTE Core */}
              <Link 
                to="/pte-score-calculator" 
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#00c2cb] shadow-2xs hover:shadow-md transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00c2cb]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 group-hover:text-[#00c2cb] transition-colors">PTE Core</div>
                    <div className="text-[11px] text-slate-500">For Canadian Permanent Residency & Work</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00c2cb] transition-colors" />
              </Link>
            </div>
          </div>

          {/* Deep Navy Banner: Practice Smarter (Page 5/6) */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 rounded-3xl p-6 sm:p-10 text-white max-w-5xl mx-auto shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Practice Smarter with <span className="text-[#00c2cb]">PTE Sample Questions</span>
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                Access real exam-style questions, strengthen your skills, and prepare with confidence.
              </p>
            </div>
            <Link
              to="/pte-practice"
              className="px-7 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95 whitespace-nowrap"
            >
              Start Free Practice →
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. Frequently Asked Questions (FAQs) (Page 6)                            */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-16 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Find answers to the most commonly asked questions.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen[idx];
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c2cb] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#00c2cb] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#00c2cb]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
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
      {/* 12. "Join the NinetyPTE Community" (Page 6)                               */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-center text-white space-y-6 shadow-2xl border border-slate-800">
            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Join the <span className="text-[#00c2cb]">NinetyPTE Community</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Join us on NinetyPTE channels for more useful discussions, tips, tricks, and updated information to excel in your PTE journey.
              </p>
            </div>

            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              FOLLOW OUR CHANNELS
            </div>

            {/* Social Channel Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <span>▶ YouTube</span>
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <span>✈ Telegram</span>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <span>f Facebook</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <span>📷 Instagram</span>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-black hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <span>♪ TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. "Ready to start your preparation?" & Enquiry Form (Page 6 & 7)        */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#f8fafc] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Value Prop */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Ready to start your <span className="text-[#00c2cb]">preparation?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Practice real exam-style questions, take scored mock tests, and track your progress with instant AI feedback designed to help you improve faster and achieve your target score with confidence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> AI Scoring
                </span>
                <span className="flex items-center gap-1.5 text-cyan-600">
                  <CheckCircle2 className="w-4 h-4" /> Real Exam Qs
                </span>
                <span className="flex items-center gap-1.5 text-indigo-600">
                  <CheckCircle2 className="w-4 h-4" /> 24/7 Support
                </span>
              </div>

              <div className="pt-3">
                <Link
                  to="/auth"
                  className="px-8 py-3 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm shadow-md transition inline-block active:scale-95"
                >
                  Start Now
                </Link>
              </div>
            </div>

            {/* Right Enquiry Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
              <h3 className="text-base font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Enquiry Form
              </h3>

              {enquirySubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-2">
                  <div className="text-2xl">✓</div>
                  <div className="text-sm font-black">Thank you for your enquiry!</div>
                  <div className="text-xs text-emerald-700">Our academic advisor will get in touch with you within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Full Name*</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        value={enquiryForm.fullName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Institute Name*</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="University / Institute"
                        value={enquiryForm.instituteName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, instituteName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Email Id*</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="email@example.com"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Country*</label>
                      <select 
                        required
                        value={enquiryForm.country}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, country: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden bg-white"
                      >
                        <option value="">Select Country</option>
                        <option value="Australia">Australia</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="India">India</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+92 Enter Your Phone Number"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Message*</label>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder="Your Message..."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c2cb] focus:outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs shadow-md transition active:scale-95 cursor-pointer"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}