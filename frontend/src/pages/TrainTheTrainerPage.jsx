import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Video, 
  Settings, 
  Smartphone, 
  TrendingUp, 
  Zap, 
  Scale, 
  Globe, 
  TrendingDown,
  Check, 
  ChevronDown, 
  ChevronRight, 
  X, 
  Send, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  Info,
  ArrowRight
} from 'lucide-react';

function LinkedInIcon(props) {
  return (
    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function TrainTheTrainerPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeLevel, setActiveLevel] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // Application form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    institute: '',
    role: 'PTE Trainer',
    sessionDate: '03 Dec 2026'
  });

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  // Why it matters 6 pillars (Page 1)
  const whyMatters = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#00c2cb]" />,
      title: 'Proven strategies to improve student scores faster'
    },
    {
      icon: <Target className="w-5 h-5 text-[#00c2cb]" />,
      title: 'High-impact teaching techniques'
    },
    {
      icon: <Video className="w-5 h-5 text-[#00c2cb]" />,
      title: 'Practical ways to improve student performance'
    },
    {
      icon: <Settings className="w-5 h-5 text-[#00c2cb]" />,
      title: 'PTE exam structure and scoring logic'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#00c2cb]" />,
      title: 'Smarter classroom and student practice strategies'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#00c2cb]" />,
      title: 'The latest exam trends and preparation insights'
    }
  ];

  // What you'll learn 4 cards (Page 2)
  const whatLearn = [
    {
      icon: <Zap className="w-6 h-6 text-[#00c2cb]" />,
      title: 'PTE Techniques',
      desc: 'Learn the right strategies, methods, and task-wise approaches required to guide students effectively across key PTE sections.'
    },
    {
      icon: <Scale className="w-6 h-6 text-[#00c2cb]" />,
      title: 'Teaching Methodology',
      desc: 'Understand how to deliver concepts clearly, structure training sessions better, and improve the overall learning experience for students.'
    },
    {
      icon: <Globe className="w-6 h-6 text-[#00c2cb]" />,
      title: 'Student Score Improvement',
      desc: 'Discover practical ways to identify student weaknesses, build improvement plans, and help learners achieve better results faster.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#00c2cb]" />,
      title: 'Latest Exam Insights',
      desc: 'Stay updated with current exam patterns, evolving preparation trends, and what trainers need to focus on in today\'s competitive environment.'
    }
  ];

  // 4 Levels of Program Structure (Page 2)
  const programLevels = [
    {
      levelNumber: 0,
      title: 'Understanding & Introducing PTE',
      desc: 'Understand the PTE exam, its global relevance, and why students prefer it.',
      points: [
        'PTE overview, AI scoring & global demand',
        'Student types (study, migration, work)',
        'Test structure & comparison with IELTS/TOEFL'
      ]
    },
    {
      levelNumber: 1,
      title: 'Test Format & Question Types',
      desc: 'Gain a clear understanding of all tasks, formats, and scoring logic.',
      points: [
        'Section-wise breakdown & question types',
        'AI scoring criteria (fluency, content, grammar)',
        'High-weight tasks & score impact areas'
      ]
    },
    {
      levelNumber: 2,
      title: 'Teaching Strategies & Techniques',
      desc: 'Learn structured methods to teach effectively and improve student performance.',
      points: [
        'Speaking and writing strategies (templates, fluency)',
        'Reading and listening techniques (keywords, prediction)',
        'Common mistakes & correction methods'
      ]
    },
    {
      levelNumber: 3,
      title: 'Practice, Assessment & Feedback',
      desc: 'Manage student progress through structured PTE practice and effective feedback.',
      points: [
        'PTE Mock test usage and performance analysis',
        'Student evaluation & feedback techniques',
        'Study planning & progress tracking'
      ]
    }
  ];

  // Trainers Data (Page 3)
  const trainers = [
    {
      name: 'Fatima Khan',
      role: 'Head Of Training at NinetyPTE',
      bio: 'As an English Language Expert, I am passionate about empowering the global aspirants community to achieve their dream scores through smarter learning frameworks and automated diagnostic accuracy.',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Zuhair Rizvi',
      role: 'Co-Founder & COO of NinetyPTE',
      bio: 'As a Co-Founder of NinetyPTE & Ninety IELTS, a platform built to make English language proficiency (PTE & IELTS) preparation smarter, faster, and deeply result-oriented across 2,500+ partner academies.',
      linkedin: 'https://linkedin.com'
    }
  ];

  // Who should join 4 cards (Page 3)
  const whoShouldJoin = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#00c2cb]" />,
      role: 'PTE Trainers',
      desc: 'Improve student scores with proven strategies and AI scoring insights'
    },
    {
      icon: <Target className="w-5 h-5 text-[#00c2cb]" />,
      role: 'Language Trainers',
      desc: 'ESL and IELTS teachers transitioning smoothly to PTE training'
    },
    {
      icon: <Video className="w-5 h-5 text-[#00c2cb]" />,
      role: 'Institute Owners',
      desc: 'Aiming to scale student results, trainer quality, and pass rates'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#00c2cb]" />,
      role: 'Coordinators',
      desc: 'Academic coordinators overseeing curriculum and mock testing'
    }
  ];

  // FAQ Items (Page 4)
  const faqs = [
    {
      q: 'Who can join this train the trainer program?',
      a: 'The program is open to active PTE trainers, language instructors transitioning into PTE coaching, academic coordinators, and institute owners aiming to elevate their teaching standards and student score achievements.'
    },
    {
      q: 'Is the train the trainer program suitable for beginners?',
      a: 'Yes! The program starts at Level 0 (Understanding & Introducing PTE), establishing fundamentals before advancing through task breakdown, AI scoring logic, classroom delivery templates, and diagnostic feedback systems.'
    },
    {
      q: 'How are train the trainer sessions conducted?',
      a: 'Sessions are hosted live online via interactive video conferencing. They include live score demonstrations, speech recognition analysis, Q&A masterclasses, and downloadable coaching templates.'
    },
    {
      q: 'Is certification included?',
      a: 'Yes, upon successful completion and verification of program milestones, all attendees receive an Official Train-the-Trainer Certificate from NinetyPTE Education, verifiable online.'
    },
    {
      q: 'Can institutes enroll multiple trainers?',
      a: 'Institutes can register their entire coaching team. For groups larger than 5 trainers, NinetyPTE also offers tailored dedicated institutional Train-the-Trainer cohorts.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (1:1 with user reference Page 1)                          */}
      {/* ========================================================================= */}
      <section className="pt-10 pb-16 bg-gradient-to-b from-cyan-50/30 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Free Industry Initiative Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold border border-cyan-100 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
                <span>Free Industry Initiative</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                PTE Train the Trainer <br />
                <span className="text-slate-900">Program</span>
              </h1>

              {/* Subtitle Banner */}
              <div className="text-base sm:text-lg font-bold text-slate-700">
                Upgrade Trainers <span className="text-[#00c2cb]">Elevate Outcomes</span>
              </div>

              {/* Lead Paragraph */}
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                A structured certification program for PTE trainers to master scoring, improve student outcomes, and build high-impact training systems.
              </p>

              {/* Explanatory Body Copy */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                <p>
                  A professional development program by NinetyPTE designed to help trainers strengthen their <strong className="text-slate-800">PTE exam</strong> knowledge, teaching methodology, and student score outcomes.
                </p>
                <p>
                  Whether you are an experienced trainer, an institute owner, or someone looking to build stronger academic delivery, this program equips you with the right strategies, structure, and insights to train students with greater confidence and clarity.
                </p>
              </div>

              {/* Highlight Note Card matching screenshot */}
              <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#00c2cb] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Exclusively for Trainers &amp; Institutes</strong> Free Initiative by NinetyPTE Education
                </div>
              </div>

              {/* Social Proof */}
              <div className="text-xs sm:text-sm text-slate-600 font-semibold pt-1">
                Trusted by <strong className="text-[#00c2cb] font-extrabold">2500+</strong> Institutes Across <strong className="text-[#00c2cb] font-extrabold">180+</strong> Countries
              </div>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Apply for the Program</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Visual Image Mockup matching screenshot */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 rounded-3xl border-2 border-dashed border-cyan-300 pointer-events-none"></div>
                
                {/* Image Container */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80" 
                    alt="PTE Train the Trainer Masterclass" 
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. UPCOMING SESSIONS BANNER (1:1 with user reference Page 1)              */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-4">
          
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 tracking-tight">
            Upcoming <span className="text-[#00c2cb]">PTE Trainer Training Sessions</span>
          </h2>

          {/* Dark Navy Interactive Session Card */}
          <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Title & Tags */}
              <div className="md:col-span-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
                    Test Format
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
                    Question Types
                  </span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Train the Trainer - Level 1
                </h3>
              </div>

              {/* Center Column: Date */}
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date</div>
                  <div className="text-sm font-black text-white">03 Dec 2026</div>
                </div>
              </div>

              {/* Center Right Column: Time */}
              <div className="md:col-span-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time</div>
                    <div className="text-xs font-black text-white leading-tight">
                      11:00 AM IST <br />
                      <span className="text-slate-400 font-medium text-[11px]">5:30 AM UTC</span>
                    </div>
                  </div>
                </div>

                {/* Register Now CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95 cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Bottom Caution Alert Note */}
            <div className="pt-3 border-t border-white/10 text-center text-xs text-amber-300 font-medium flex items-center justify-center gap-1.5">
              <span>⚠️</span>
              <span>Limited Executive Seats. Reserve yours before they run out.</span>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY THE PROGRAM MATTERS (1:1 with user reference Page 1)               */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Why the <span className="text-[#00c2cb]">PTE Train the Trainer Program</span> Matters
            </h2>
            <div className="text-sm font-bold text-slate-700">
              Strong student results begin with strong trainers
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The Train the Trainer Program has been created to help educators go beyond basic teaching and develop a deeper understanding of
            </p>
          </div>

          {/* 6 Feature Grid Cards matching Page 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyMatters.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          {/* Callout Quote Box */}
          <div className="max-w-3xl mx-auto p-4 rounded-xl bg-cyan-50/50 border-l-4 border-[#00c2cb] text-center text-xs sm:text-sm font-semibold text-slate-800 italic">
            &ldquo;This is not just about teaching more. It is about teaching better, smarter, and with outcomes in mind.&rdquo;
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT YOU'LL LEARN (1:1 with user reference Page 2)                     */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              What You&apos;ll Learn in the <span className="text-[#00c2cb]">PTE Train the Trainer Program</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Master the skills, strategies, and insights needed to become a high-impact PTE trainer.
            </p>
          </div>

          {/* 4 Feature Column Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatLearn.map((card, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-black text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
            >
              Start Your Trainer Certification Journey
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROGRAM STRUCTURE: STEP-BY-STEP PATH (1:1 with user reference Page 2) */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              PTE Train the Trainer <span className="text-[#00c2cb]">Program Structure</span>
            </h2>
            <div className="text-sm font-bold text-slate-700">
              A Step-by-Step Path to Trainer Excellence
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The Train the Trainer Program is structured into three progressive levels, ensuring that trainers build a strong foundation before moving on to advanced, high-impact strategies. Each level builds towards one goal — predictable student results.
            </p>
          </div>

          {/* 4 Progressive Level Cards Pipeline matching Page 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programLevels.map((lvl) => (
              <div 
                key={lvl.levelNumber}
                className="bg-white rounded-3xl p-6 border-2 border-cyan-200 shadow-2xs hover:border-[#00c2cb] hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Level Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-black border border-cyan-200">
                    <span className="w-5 h-5 rounded-full bg-[#00c2cb] text-white flex items-center justify-center text-[10px]">
                      {lvl.levelNumber}
                    </span>
                    <span>Level</span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {lvl.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {lvl.desc}
                  </p>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {lvl.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00c2cb] shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EARN YOUR CERTIFICATION (1:1 with user reference Page 2)               */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Certificate Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-white p-8 border-4 border-slate-200 shadow-xl space-y-6 text-center relative overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-[#00c2cb] text-white flex items-center justify-center mx-auto shadow-md">
                  <Award className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="text-xs tracking-wider uppercase font-black text-slate-400">
                    Official Credential
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Certificate of Completion
                  </h3>
                  <p className="text-xs text-slate-500">
                    This certifies that
                  </p>
                  <div className="font-serif text-lg font-bold text-[#00c2cb] italic border-b border-slate-200 pb-2">
                    John Doe
                  </div>
                  <p className="text-xs text-slate-600 pt-1">
                    has successfully completed the
                  </p>
                  <div className="text-xs font-bold text-slate-800">
                    Train the Trainer Program
                  </div>
                  <div className="text-[11px] font-extrabold text-[#00c2cb] pt-2">
                    NinetyPTE Education • 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text & Value Checklist */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Earn Your <span className="text-[#00c2cb]">PTE Trainer Certification</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Upon successful completion, trainers will receive an Official Train-the-Trainer Certificate from NinetyPTE Education. This certification reflects your commitment to professional growth and your readiness to deliver more effective, result-oriented PTE training.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-900">
                  What You Will Gain:
                </h4>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                    <span>Stronger command over PTE preparation techniques</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                    <span>Better understanding of score-focused training</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                    <span>Improved confidence in handling students at different levels</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                    <span>More effective teaching and correction methods</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                    <span>A professional certification that adds credibility to your profile</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRAINING PROGRAM OVERVIEW (1:1 with user reference Page 3)              */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800 space-y-8 text-center">
            
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Training Program <span className="text-[#00c2cb]">Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                An engaging and thought-provoking discussion covering:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#00c2cb] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Availability</div>
                  <div className="text-xs text-slate-400">Conducted Throughout the Year</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Format</div>
                  <div className="text-xs text-slate-400">Online Training Sessions</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Certification</div>
                  <div className="text-xs text-slate-400">Official Train the Trainer Certificate from NinetyPTE</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Access</div>
                  <div className="text-xs text-slate-400">Designed for individual trainers and institute teams</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. MEET YOUR EXPERT TRAINERS (1:1 with user reference Page 3)             */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Meet Your Expert <span className="text-[#00c2cb]">Trainers</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              It is especially valuable for professionals who want to improve training quality, build stronger academic systems, and deliver better student outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {trainers.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4 text-center flex flex-col items-center justify-between"
              >
                <div className="space-y-4 flex flex-col items-center">
                  {/* Avatar with NinetyPTE badge */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 shadow-md">
                      <div className="w-full h-full rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-2xl">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white p-0.5 shadow-xs flex items-center justify-center">
                      <span className="text-[9px] font-black text-[#00c2cb]">90</span>
                    </div>
                  </div>

                  {/* Name with LinkedIn */}
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <h3 className="text-lg font-black text-slate-900">{t.name}</h3>
                      <a href={t.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700">
                        <LinkedInIcon className="w-4 h-4 fill-blue-600" />
                      </a>
                    </div>
                    <div className="text-xs font-bold text-[#00c2cb]">
                      {t.role}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal max-w-sm">
                    {t.bio}
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-bold text-slate-900 hover:text-[#00c2cb] transition underline underline-offset-4 cursor-pointer pt-2"
                >
                  Join Training with {t.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WHO SHOULD JOIN (1:1 with user reference Page 3)                       */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Who <span className="text-[#00c2cb]">Should Join</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Designed for professionals committed to mastering modern teaching strategies and driving measurable student outcomes at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoShouldJoin.map((w, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition space-y-3 text-center flex flex-col items-center justify-between"
              >
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                    {w.icon}
                  </div>
                  <h3 className="text-sm font-black text-slate-900">
                    {w.role}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CALLOUT BANNER (1:1 with user reference Page 3 & 4)                   */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Build Better Trainers, <br />
                <span className="text-[#00c2cb]">Build Better Results</span>
              </h3>
              <div className="text-xs text-slate-400 font-medium">
                No fees | No hidden costs | Limited seats per session.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                At NinetyPTE, we believe that better trainer development leads to better student performance, a stronger institute reputation, and long-term growth. The Train the Trainer Program is designed to help educators stay relevant, capable, and outcome-focused in a fast-evolving test preparation landscape.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Be part of a growing community of high-performing trainers with NinetyPTE&apos;s Train the Trainer Program.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
                >
                  Reserve Your Spot
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FAQS ACCORDION (1:1 with user reference Page 4)                       */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              <span className="text-[#00c2cb]">Train the Trainer</span> – Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Find answers to the most common questions about the program, including eligibility, structure, certification, and how it helps improve teaching outcomes
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center shrink-0">
                        <Info className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {faq.q}
                      </span>
                    </div>

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

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. APPLICATION & SEAT RESERVATION MODAL                                  */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-5">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00c2cb]">
                    Free Industry Initiative
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Register for Train the Trainer
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upcoming Cohort: 03 Dec 2026 • 11:00 AM IST (Online)
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 / +61..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Institute / Academy</label>
                      <input
                        type="text"
                        placeholder="e.g. Melbourne English Hub"
                        value={form.institute}
                        onChange={(e) => setForm({ ...form, institute: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Your Current Role</label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="PTE Trainer">PTE Trainer</option>
                        <option value="Language Teacher">Language Teacher</option>
                        <option value="Institute Owner">Institute Owner</option>
                        <option value="Academic Coordinator">Academic Coordinator</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-sm shadow-md transition active:scale-95 cursor-pointer"
                >
                  Confirm Free Seat Reservation
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Seat Confirmed!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{form.name || 'Trainer'}</strong>. Your seat for the NinetyPTE Train the Trainer Level 1 program has been confirmed for <strong>03 Dec 2026</strong>.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
                  Meeting credentials and preparatory study materials have been sent to your email.
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsSuccess(false);
                  }}
                  className="px-6 py-2 rounded-full bg-slate-900 text-white font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
