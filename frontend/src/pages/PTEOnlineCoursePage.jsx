import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  BarChart3, 
  FileText, 
  Lightbulb, 
  Award, 
  Check, 
  Play, 
  Smartphone, 
  Star, 
  ChevronDown, 
  Globe2, 
  Layers, 
  Zap, 
  ShieldCheck,
  Send,
  HelpCircle,
  Clock,
  Info
} from 'lucide-react';

export default function PTEOnlineCoursePage() {
  const [activeTab, setActiveTab] = useState('benefits');
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Demo Booking Form State
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    countryCode: '+92',
    whatsapp: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoForm.fullName || !demoForm.whatsapp || !demoForm.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Nav tabs data
  const navTabs = [
    { id: 'benefits', label: 'Benefits' },
    { id: 'countries', label: 'Countries' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'why-ninetypte', label: 'Why NinetyPTE' },
    { id: 'free-demo', label: 'Free Demo' },
    { id: 'faqs', label: 'FAQs' }
  ];

  // Instructors list
  const instructors = [
    {
      name: 'Ambika Sharma',
      role: 'PTE & English Language Trainer',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      highlights: [
        '10+ years of teaching experience',
        'Expert in Writing & Reading modules',
        'Proven strategic frameworks for 79+ scores'
      ]
    },
    {
      name: 'Sarah Jenkins',
      role: 'Senior PTE Master Coach',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
      highlights: [
        'Pearson Certified Master Trainer',
        'Specialist in Speaking Pronunciation & Fluency',
        'Mentored 4,500+ students to target scores'
      ]
    },
    {
      name: 'David Thornton',
      role: 'Lead Linguistics Instructor',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      highlights: [
        'Cambridge CELTA Certified',
        'Expert in Academic Collocations & Grammar',
        'Former IELTS & PTE Examiner'
      ]
    }
  ];

  // International coaching destinations
  const coachingCountries = [
    {
      country: 'Australia',
      flag: '🇦🇺',
      timezone: 'Timezones matched to AEST & ACST',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=700&q=80',
      desc: 'PTE online coaching for students and PR applicants across Sydney, Melbourne, Brisbane, and Perth.',
      link: '/pte-for-australia'
    },
    {
      country: 'Turkey',
      flag: '🇹🇷',
      timezone: 'Timezones matched to GMT+3',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=80',
      desc: 'PTE online coaching for higher education admissions and international professional certification.',
      link: '/contact'
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      timezone: 'Timezones matched to GMT / BST',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=80',
      desc: 'Dedicated preparation for PTE Academic UKVI university matriculation and skilled worker visa routes.',
      link: '/pte-for-uk'
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      timezone: 'Timezones matched to EST & PST',
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=700&q=80',
      desc: 'Specialized coaching for Canadian study permits and Express Entry economic immigration pathways.',
      link: '/pte-for-canada'
    }
  ];

  // 5 Step Journey
  const workflowSteps = [
    {
      number: '1',
      title: 'Get in Touch',
      desc: 'Tell us about your target PTE scores, current preparation level, and scheduled test date.'
    },
    {
      number: '2',
      title: 'Discuss Your Goals',
      desc: 'Connect with our academic counseling team to evaluate your diagnostic strengths and requirements.'
    },
    {
      number: '3',
      title: 'Get Your Study Plan',
      desc: 'Receive a personalized preparation curriculum tailored to your daily schedule and target band.'
    },
    {
      number: '4',
      title: 'Start Learning & Practising',
      desc: 'Attend live interactive masterclasses, review video modules, and practice on AI-scored portals.'
    },
    {
      number: '5',
      title: 'Track Progress & Prepare',
      desc: 'Analyze sectional mock test scorecards, refine weak areas with your mentor, and take the real test.'
    }
  ];

  // Student reviews
  const studentTestimonials = [
    {
      name: 'Aakash',
      country: 'Nepal',
      score: '84 Overall (L: 85, R: 82, S: 88, W: 82)',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Tasmin',
      country: 'Bangladesh',
      score: '86 Overall (Speaking 90/90)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Mahendra',
      country: 'Nepal',
      score: '79+ Band (Australian PR Achieved)',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Rohit',
      country: 'India',
      score: '88 Overall (First Attempt)',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80'
    }
  ];

  // FAQs
  const allFaqs = [
    {
      icon: <Info className="w-4 h-4 text-cyan-600" />,
      q: "What is included in NinetyPTE's online coaching course?",
      a: "NinetyPTE's comprehensive online coaching course includes live daily interactive webinars led by certified senior trainers, unlimited access to our proprietary AI evaluation portal with 20,000+ real exam questions, full-length scored mock tests matching official Pearson test cards, structured video masterclasses for all 20 question types, dedicated 1-on-1 private mentoring sessions, and full preparation material packages."
    },
    {
      icon: <BookOpen className="w-4 h-4 text-cyan-600" />,
      q: "Are live expert classes included in the PTE course?",
      a: "Yes! Students receive access to daily live interactive masterclasses conducted across multiple morning and evening time zones. Classes cover question-wise answering templates, high-scoring speaking intonation strategies, essay writing structures, and live student response reviews with trainer feedback."
    },
    {
      icon: <Users className="w-4 h-4 text-cyan-600" />,
      q: "Does NinetyPTE offer one-on-one coaching sessions?",
      a: "Yes. Our premium enrollment packages feature personal one-on-one mentoring appointments. In these sessions, a dedicated master coach reviews your mock test diagnostic analytics, pinpoints pronunciation pitch errors or grammar flaws, and customizes a focused study roadmap."
    },
    {
      icon: <Clock className="w-4 h-4 text-cyan-600" />,
      q: "Can I access PTE video lessons at my own pace?",
      a: "Absolutely. All live classes are recorded in high definition and archived in your student dashboard. Furthermore, you gain instant on-demand access to our library of module-by-module video masterclasses, allowing you to study whenever and wherever suits your schedule best."
    },
    {
      icon: <BarChart3 className="w-4 h-4 text-cyan-600" />,
      q: "Does the course include PTE practice questions and mock tests?",
      a: "Yes. You receive full access to our bank of over 20,000+ updated PTE practice questions, weekly prediction files, and full-length simulated mock tests equipped with real-time AI scorecards reflecting official Pearson test metrics."
    },
    {
      icon: <Zap className="w-4 h-4 text-cyan-600" />,
      q: "How does AI-powered feedback help improve my PTE performance?",
      a: "NinetyPTE's automated scoring portal evaluates speech recordings and written essays in seconds using speech recognition algorithms aligned with Pearson standards. You receive instant feedback on oral fluency, pronunciation acoustics, sentence structure, spelling, and vocabulary."
    },
    {
      icon: <FileText className="w-4 h-4 text-cyan-600" />,
      q: "Which PTE exam formats can I prepare for with NinetyPTE?",
      a: "You can prepare for PTE Academic, PTE Academic UKVI, and PTE Core. Our training modules, question sets, and practice interfaces are fully updated to reflect the latest Pearson guidelines and test time formats."
    }
  ];

  const visibleFaqs = showAllFaqs ? allFaqs : allFaqs.slice(0, 7);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800 antialiased selection:bg-cyan-500 selection:text-white">
      
      {/* ===================================================================== */}
      {/* 1. HERO SECTION (Page 1)                                              */}
      {/* ===================================================================== */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        
        {/* Subtle geometric background accents */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-100/30 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400 bg-cyan-50/80 text-cyan-800 text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
            <span>Prepare for PTE with a Complete Online Course</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-5xl mx-auto">
            PTE Online Coaching for{' '}
            <span className="relative inline-block px-3 py-1 bg-cyan-100/90 text-slate-900 rounded-xl border border-cyan-200">
              Complete Exam Preparation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Prepare for your PTE exam with NinetyPTE's comprehensive online course featuring live expert classes, structured video lessons, unlimited PTE practice, AI-powered feedback, and personalized guidance.
          </p>

          {/* 3 Top Feature Highlight Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-start gap-3 hover:border-cyan-300 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">PTE Online Coaching</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Get expert guidance and proven strategies to prepare confidently for your PTE exam.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-start gap-3 hover:border-cyan-300 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">Complete PTE Online Course</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Learn at your own pace with structured video lessons, exam strategies and PTE practice materials.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-start gap-3 hover:border-cyan-300 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900">PTE Practice & AI Feedback</h3>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Improve all four English skills with AI-powered feedback, mock tests and performance tracking.
                </p>
              </div>
            </div>

          </div>

          {/* Central Hero Image */}
          <div className="mt-10 relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" 
              alt="NinetyPTE Student Online Coaching"
              className="w-full h-72 sm:h-96 lg:h-[460px] object-cover object-center filter brightness-[0.98] group-hover:scale-102 transition duration-700"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between w-full text-white text-left gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/30 backdrop-blur-md border border-cyan-400/40 text-cyan-200 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    Interactive Live Webinars + AI Grading
                  </div>
                  <p className="mt-2 text-sm sm:text-base font-bold text-white drop-shadow-sm">
                    Target 79+ & 65+ Guaranteed Strategy Modules
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Pearson Aligned Curriculum</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('free-demo')}
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Online Coaching</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Get Started Today</span>
            </Link>
          </div>

          {/* WhatsApp Helper */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <span>Have questions?</span>
            <a 
              href="https://wa.me/?text=Hello%20NinetyPTE%2C%20I%20am%20interested%20in%20the%20PTE%20Online%20Course" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Chat with us on WhatsApp</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </a>
          </div>

        </div>

        {/* Feature Ticker Strip */}
        <div className="mt-12 bg-gradient-to-r from-[#00c2cb] to-[#009ca6] text-white py-3.5 shadow-md">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-between text-xs sm:text-sm font-bold tracking-wide gap-8">
            <span className="flex items-center gap-2">01 Live PTE Classes ✦</span>
            <span className="flex items-center gap-2">02 Personal One-on-One Sessions ✦</span>
            <span className="flex items-center gap-2">03 AI-Scored Practice ✦</span>
            <span className="flex items-center gap-2">04 Realistic PTE Mock Tests ✦</span>
            <span className="flex items-center gap-2">05 Personalised Learning Path ✦</span>
            <span className="flex items-center gap-2">06 PTE Academic & UKVI</span>
          </div>
        </div>

      </section>

      {/* ===================================================================== */}
      {/* 2. IN-PAGE SUB-NAVIGATION BAR                                         */}
      {/* ===================================================================== */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-cyan-50 border border-cyan-400 text-cyan-700 shadow-xs'
                  : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. SECTION: WHY CHOOSE ONLINE PTE COACHING (Benefits, Page 1 & 2)     */}
      {/* ===================================================================== */}
      <section id="benefits" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            YOUR FLEXIBLE LEARNING SOLUTION
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Choose Online <span className="text-[#00c2cb]">PTE Coaching?</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Prepare for your PTE exam with a learning experience designed around your goals. Combine expert instruction, flexible study resources, and AI-powered practice to build your skills and prepare at your own pace.
          </p>
        </div>

        {/* Benefits Grid Flanking Visual Center */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Feature Bullets */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-cyan-400 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Recorded lessons for revision</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Revisit important lecture concepts and template breakdowns whenever you need.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-cyan-400 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Practice with AI-powered feedback</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Understand mistakes instantly across oral pronunciation and essay syntax.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-cyan-400 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Prepare at your own pace</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Build your skills with a structured learning roadmap customized to your test deadline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Visual Photos */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80" 
                alt="NinetyPTE Coaching Session"
                className="w-full h-44 sm:h-52 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80" 
                alt="NinetyPTE Collaborative Learning"
                className="w-full h-44 sm:h-52 object-cover"
              />
            </div>
          </div>

          {/* Right Feature Bullets */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-cyan-400 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Learn from anywhere</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Access your PTE learning resources wherever you study best via web or mobile apps.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-cyan-400 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Flexible learning schedule</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Fit your exam preparation seamlessly around work, university, or family life.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-cyan-400 transition">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Personalised expert guidance</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Focus on individual learning needs with dedicated mentor troubleshooting sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. SECTION: PREPARE WITH THE RIGHT LEARNING SUPPORT (Page 2)          */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 bg-white px-3 py-1 rounded-full border border-cyan-200 shadow-2xs">
              YOUR COMPLETE PTE PREPARATION EXPERIENCE
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Prepare for PTE with the Right <span className="text-[#00c2cb]">Learning Support</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Get ready for your PTE exam with a structured learning experience that combines expert teaching, flexible study resources, regular practice, and intelligent feedback to help you prepare with confidence.
            </p>
          </div>

          {/* 6 Feature Support Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Live Expert Classes</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Join interactive online sessions with PTE experts to understand exam requirements, learn effective answering techniques, and strengthen your approach to different question types.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">One-on-One Guidance</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Get individual attention to address learning challenges, resolve doubts, and receive focused support based on your preparation goals and areas for improvement.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Structured Video Lessons</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Follow step-by-step video lessons covering PTE question types, exam strategies, and essential skills. Learn at your own pace and revisit key concepts whenever you need.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">AI-Powered Performance Insights</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Review AI-generated feedback on supported responses to recognise mistakes, understand your strengths, and identify practical ways to improve your performance.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Extensive PTE Practice</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Build familiarity with exam-style questions across Speaking, Writing, Reading, and Listening through regular practice and PTE mock tests.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Progress Tracking and Improvement</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Monitor your practice performance, identify skill gaps, and focus your study time on the areas that need more attention.
              </p>
            </div>

          </div>

          {/* Banner: Ready to Feel More Confident About Your PTE Exam? */}
          <div className="mt-14 bg-gradient-to-r from-[#172e66] via-[#1a367c] to-[#1e3a8a] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
            <h3 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Ready to Feel More Confident About Your PTE Exam?
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Not sure where to start with your PTE preparation? Let's find the right learning path for you. Explore NinetyPTE's online course, get your questions answered, and discover how expert guidance and AI-powered practice can support your preparation.
            </p>
            <div className="mt-6">
              <button
                onClick={() => scrollToSection('free-demo')}
                className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-cyan-50 transition shadow-md cursor-pointer"
              >
                Let's Plan Your PTE Preparation →
              </button>
            </div>
            <p className="mt-3 text-[11px] text-slate-300">
              Already ready to start? Explore our subscription plans and enrol online.
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. SECTION: LEARN FROM PTE EXPERTS (Page 2)                           */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Learn from <span className="text-[#00c2cb]">PTE Experts</span> and Prepare with Confidence
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Get expert support to understand the PTE exam format, develop effective answering techniques, and improve your preparation with structured learning and practical guidance.
          </p>
        </div>

        {/* Instructor Profiles Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {instructors.map((trainer, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center hover:shadow-lg hover:border-cyan-400 transition"
            >
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-cyan-400 shadow-md">
                <img 
                  src={trainer.photo} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 font-black text-lg text-slate-900">{trainer.name}</h3>
              <p className="text-xs font-semibold text-cyan-700 mt-0.5">{trainer.role}</p>

              <div className="mt-4 pt-4 border-t border-slate-100 text-left space-y-2 text-xs text-slate-600">
                {trainer.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. SECTION: COUNTRIES WHERE WE OFFER COACHING (Page 3)                */}
      {/* ===================================================================== */}
      <section id="countries" className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Countries Where <span className="text-[#00c2cb]">We Offer Online Coaching</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              We provide PTE online coaching for students from different countries. Currently, we are offering coaching for:
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coachingCountries.map((c, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={c.image} 
                      alt={c.country} 
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-semibold text-white">
                      {c.timezone}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{c.flag}</span>
                      <h3 className="font-bold text-base text-slate-900">{c.country}</h3>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={c.link}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Explore {c.country} PTE Coaching</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Banner: Start Learning with NinetyPTE Today */}
          <div className="mt-14 bg-gradient-to-r from-[#172e66] via-[#1a367c] to-[#1e3a8a] text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Start Learning with NinetyPTE Today
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-200">
              Take a practical step towards your exam with a structured online preparation course.
            </p>
            <div className="mt-5">
              <Link
                to="/signup"
                className="inline-block px-7 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs transition hover:bg-cyan-50 shadow-sm"
              >
                Enroll Now →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. SECTION: HOW DOES ONLINE COACHING WORK (Page 3)                     */}
      {/* ===================================================================== */}
      <section id="how-it-works" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Does NinetyPTE <span className="text-[#00c2cb]">Online Coaching Work?</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow a clear preparation pathway with expert guidance, structured learning, and practical resources designed to help you prepare for your PTE exam.
          </p>
        </div>

        {/* 5 Steps Timeline */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="text-center relative group">
              <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500 text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-cyan-600 transition">
                {step.number}
              </div>
              <h3 className="mt-4 font-bold text-sm text-slate-900">{step.title}</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed px-1">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToSection('free-demo')}
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition shadow-lg cursor-pointer inline-flex items-center gap-2"
          >
            <span>Start Your PTE Preparation</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8. SECTION: DOWNLOAD OUR MOBILE APP (Page 3)                          */}
      {/* ===================================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-teal-200/80 p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600 text-white text-[11px] font-bold">
              ● Learn Anytime, Anywhere
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Download Our <span className="text-[#00c2cb]">Mobile App</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Access live classes, study material, practice questions, and real-time AI speech scoring on the go with the NinetyPTE mobile app.
            </p>

            {/* App Store Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a 
                href="https://play.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs"
              >
                <span>GET IT ON Google Play</span>
              </a>
              <a 
                href="https://apple.com" 
                target="_blank" 
                rel="noreferrer" 
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs"
              >
                <span>Download on the App Store</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-slate-700">
              <div className="flex text-amber-400">
                {'★★★★★'}
              </div>
              <span>4.9 / 5 Rating</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500">5,000+ Reviews</span>
            </div>
          </div>

          {/* Mobile App Phone Mockup */}
          <div className="relative">
            <div className="w-64 sm:w-72 rounded-[36px] p-3 bg-slate-900 shadow-2xl border-4 border-slate-700">
              <div className="rounded-[28px] overflow-hidden bg-white p-3 text-slate-900 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Mock Test Score</span>
                  <span className="text-emerald-600">Overall: 79/90</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Practice Today</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">Read Aloud & Dictation</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                    <div className="bg-cyan-500 h-full w-4/5 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-center">
                  <div className="p-2 bg-cyan-50 text-cyan-800 rounded-lg">Speaking 82</div>
                  <div className="p-2 bg-indigo-50 text-indigo-800 rounded-lg">Writing 80</div>
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">Reading 78</div>
                  <div className="p-2 bg-amber-50 text-amber-800 rounded-lg">Listening 79</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 9. SECTION: WHY CHOOSE NINETYPTE (Stats, Page 4)                      */}
      {/* ===================================================================== */}
      <section id="why-ninetypte" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            YOUR PTE PREPARATION PARTNER
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why <span className="text-[#00c2cb]">Choose NinetyPTE?</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            More than just practice questions, NinetyPTE brings together structured PTE preparation, expert-led classes, personalised guidance, and AI-powered practice to help you prepare for your target score.
          </p>

          {/* Key Numerical Counters */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
              <Users className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-3xl sm:text-4xl font-black text-slate-900">3M+</div>
              <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Learners Worldwide</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
              <Globe2 className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-3xl sm:text-4xl font-black text-slate-900">180+</div>
              <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">Countries Reached</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
              <BookOpen className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-3xl sm:text-4xl font-black text-slate-900">20,000+</div>
              <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">PTE Practice Questions</div>
            </div>
          </div>

          {/* Feature Badge Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 bg-white">
              <Video className="w-3.5 h-3.5 text-cyan-600" />
              <span>Live Expert Classes</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 bg-white">
              <Users className="w-3.5 h-3.5 text-cyan-600" />
              <span>One-on-One Guidance</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 bg-white">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>AI-Powered Practice</span>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 10. SECTION: FREE DEMO BOOKING FORM (Page 4)                          */}
      {/* ===================================================================== */}
      <section id="free-demo" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 bg-white px-3 py-1 rounded-full border border-cyan-200 shadow-2xs">
                START YOUR PTE JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                Experience <span className="text-[#00c2cb]">NinetyPTE Before You</span> Enroll
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore our online PTE preparation course and discover how expert-led classes, structured video lessons, personalised guidance, and AI-powered practice can support your exam preparation.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p>Explore live PTE classes and structured learning resources.</p>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p>Discover how one-on-one guidance supports your preparation.</p>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p>See how AI-powered feedback helps identify areas for improvement.</p>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p>Find a course option that aligns with your specific PTE score goals.</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Booking Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative">
                
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Book Your Free PTE Course Demo
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Fill in the form and our team will contact you to arrange your demo.
                </p>

                {formSubmitted ? (
                  <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-900 text-base">Demo Request Received!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Thank you, <strong className="text-emerald-900">{demoForm.fullName}</strong>. Our senior counselor will contact you via WhatsApp shortly to schedule your personalized live demo session.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-3 text-xs font-bold text-emerald-800 underline cursor-pointer"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        FULL NAME *
                      </label>
                      <input 
                        type="text"
                        required
                        value={demoForm.fullName}
                        onChange={(e) => setDemoForm({ ...demoForm, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        WHATSAPP NUMBER *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={demoForm.countryCode}
                          onChange={(e) => setDemoForm({ ...demoForm, countryCode: e.target.value })}
                          className="px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="+92">+92 🇵🇰</option>
                          <option value="+61">+61 🇦🇺</option>
                          <option value="+1">+1 🇨🇦/🇺🇸</option>
                          <option value="+44">+44 🇬🇧</option>
                          <option value="+91">+91 🇮🇳</option>
                          <option value="+977">+977 🇳🇵</option>
                          <option value="+880">+880 🇧🇩</option>
                          <option value="+90">+90 🇹🇷</option>
                        </select>
                        <input 
                          type="tel"
                          required
                          value={demoForm.whatsapp}
                          onChange={(e) => setDemoForm({ ...demoForm, whatsapp: e.target.value })}
                          placeholder="Enter WhatsApp number"
                          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input 
                        type="email"
                        required
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        placeholder="yourname@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3.5 rounded-xl bg-[#172e66] hover:bg-[#12234f] text-white font-extrabold text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Processing request...</span>
                      ) : (
                        <>
                          <span>Request My Free Demo</span>
                          <ArrowRight className="w-4 h-4 text-cyan-400" />
                        </>
                      )}
                    </button>

                    <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Your information will be handled according to our Privacy Policy.</span>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 11. SECTION: REAL STUDENTS. REAL EXPERIENCES. (Page 4)                */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Real Students. <span className="text-[#00c2cb]">Real Experiences. Real Progress.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Hear from students who have experienced their PTE preparation journey with NinetyPTE. Discover how our practice resources, expert strategies and AI-powered feedback helped them work towards their target scores.
          </p>
        </div>

        {/* 4 Testimonial Video Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentTestimonials.map((student, idx) => (
            <div 
              key={idx}
              className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md group bg-slate-900"
            >
              <img 
                src={student.photo} 
                alt={student.name}
                className="w-full h-80 object-cover filter brightness-[0.85] group-hover:scale-105 transition duration-500"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/60 shadow-lg group-hover:bg-cyan-500 group-hover:scale-110 transition">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent text-white">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-sm font-extrabold">{student.name}</span>
                  <span className="text-slate-300 font-medium">{student.country}</span>
                </div>
                <p className="text-[11px] text-cyan-300 mt-0.5 font-semibold">
                  {student.score}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => scrollToSection('free-demo')}
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm transition shadow-lg cursor-pointer inline-flex items-center gap-2"
          >
            <span>Schedule a Free Demo</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 12. SECTION: LET'S FIND THE RIGHT WAY TO PREPARE (Page 5)             */}
      {/* ===================================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#172e66] via-[#1a367c] to-[#1e3a8a] text-white rounded-3xl p-8 sm:p-14 text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Let's Find the Right Way to Prepare for PTE
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Whether you're starting from scratch or working towards a higher score, NinetyPTE brings together expert guidance, structured lessons, and AI-powered practice to support your preparation.
          </p>
          <div className="mt-7">
            <button
              onClick={() => scrollToSection('free-demo')}
              className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-cyan-50 transition shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Get Personalised PTE Guidance</span>
              <ArrowRight className="w-4 h-4 text-cyan-600" />
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-300">
            Have questions? <button onClick={() => scrollToSection('free-demo')} className="text-cyan-300 underline font-bold cursor-pointer">Book a Free Demo.</button>
          </p>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 13. SECTION: FREQUENTLY ASKED QUESTIONS (Page 5)                      */}
      {/* ===================================================================== */}
      <section id="faqs" className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Find answers to common questions about NinetyPTE's online course, learning features, and exam preparation.
          </p>
        </div>

        {/* Collapsible Accordions with Icons */}
        <div className="mt-10 space-y-3.5">
          {visibleFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-cyan-600 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                    {faq.icon}
                  </div>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-cyan-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-17">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllFaqs(!showAllFaqs)}
            className="text-xs font-bold text-slate-600 hover:text-cyan-600 inline-flex items-center gap-1 transition cursor-pointer"
          >
            <span>{showAllFaqs ? 'Show Less' : 'Learn More'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </section>

    </div>
  );
}
