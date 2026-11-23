import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Sparkles, 
  Globe2, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Award, 
  BarChart3, 
  FileText, 
  Headphones, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Compass, 
  HelpCircle,
  Volume2,
  Calendar,
  Send,
  Layers,
  Smartphone,
  Monitor
} from 'lucide-react';

export default function AboutPTEPage() {
  // Navigation Jump Links
  const quickLinks = [
    { label: 'Comparison', href: '#comparison' },
    { label: 'Practice Test', href: '#practice-test' },
    { label: 'Exam Format', href: '#exam-format' },
    { label: 'Question Weightage', href: '#weightage' },
    { label: 'Why NinetyPTE', href: '#why-us' }
  ];

  // Interactive Alignment Score Converter (Page 6)
  const [selectedIeltsBand, setSelectedIeltsBand] = useState('7.0');
  
  const ieltsToPteMapping = {
    '9.0': { overall: '86-90', listening: '86-90', reading: '86-90', speaking: '86-90', writing: '86-90', desc: 'Expert user with full functional fluency.' },
    '8.5': { overall: '83-85', listening: '81-85', reading: '81-85', speaking: '84-88', writing: '82-85', desc: 'Very good user with occasional non-systematic inaccuracies.' },
    '8.0': { overall: '79-82', listening: '76-80', reading: '77-80', speaking: '80-83', writing: '78-81', desc: 'Superior English score tier for maximum migration points.' },
    '7.5': { overall: '73-78', listening: '68-75', reading: '69-76', speaking: '77-81', writing: '74-77', desc: 'Proficient level accepted by premier tier-1 global universities.' },
    '7.0': { overall: '65-72', listening: '58-67', reading: '59-68', speaking: '71-76', writing: '69-73', desc: 'Meets general skilled migration and postgraduate criteria.' },
    '6.5': { overall: '58-64', listening: '51-57', reading: '51-58', speaking: '58-70', writing: '59-68', desc: 'Competent score satisfying direct bachelor degree admissions.' },
    '6.0': { overall: '50-57', listening: '45-50', reading: '46-50', speaking: '50-57', writing: '50-58', desc: 'Foundation level for vocational pathways and standard visas.' },
    '5.5': { overall: '42-49', listening: '38-44', reading: '38-45', speaking: '42-49', writing: '41-49', desc: 'Modest user category for pathway diplomas and pre-sessional English.' },
    '5.0': { overall: '36-41', listening: '32-37', reading: '33-37', speaking: '36-41', writing: '35-40', desc: 'Initial vocational English threshold.' },
    '4.5': { overall: '30-35', listening: '28-31', reading: '28-32', speaking: '30-35', writing: '29-34', desc: 'Elementary functional English benchmark.' }
  };

  const activePteScores = ieltsToPteMapping[selectedIeltsBand] || ieltsToPteMapping['7.0'];

  // Interactive Question Sample Tabs (Page 4)
  const [activeQuestionTab, setActiveQuestionTab] = useState('situation');
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Comparison Tab (Page 3)
  const [activeComparisonEngine, setActiveComparisonEngine] = useState('ielts-general');

  // FAQ Accordion (Page 9)
  const [openFaq, setOpenFaq] = useState(0);

  // Lead Generation Form State (Page 9)
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    instituteName: '',
    emailId: '',
    country: 'Pakistan',
    phone: '',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setEnquiryForm({ fullName: '', instituteName: '', emailId: '', country: 'Pakistan', phone: '', message: '' });
    }, 3500);
  };

  // Question Weightage Matrix Data (Page 5)
  const weightageMatrix = [
    { type: 'Read Aloud', count: '6-7', overall: '4%', speaking: '9%', listening: '-', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { type: 'Repeat Sentence', count: '10-12', overall: '7%', speaking: '16%', listening: '17%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { type: 'Describe Image', count: '5-6', overall: '15%', speaking: '31%', listening: '-', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { type: 'Re-tell Lecture', count: '2-3', overall: '6%', speaking: '13%', listening: '13%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { type: 'Answer Short Question', count: '5-6', overall: '2%', speaking: '-', listening: '4%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { type: 'Summarize Group Discussion', count: '2-3', overall: '9%', speaking: '19%', listening: '20%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { type: 'Respond to a Situation', count: '2-3', overall: '6%', speaking: '13%', listening: '-', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { type: 'Summarize Written Text', count: '1-2', overall: '7%', speaking: '-', listening: '-', reading: '23%', writing: '28%', section: 'Speaking & Writing' },
    { type: 'Write Essay', count: '1-2', overall: '7%', speaking: '-', listening: '-', reading: '-', writing: '31%', section: 'Speaking & Writing' },
    { type: 'Fill in the Blanks (Dropdown)', count: '5-6', overall: '7%', speaking: '-', listening: '-', reading: '25%', writing: '-', section: 'Reading' },
    { type: 'Multiple Choice, Multiple Answers', count: '2-3', overall: '1%', speaking: '-', listening: '-', reading: '5%', writing: '-', section: 'Reading' },
    { type: 'Reorder Paragraphs', count: '2-3', overall: '3%', speaking: '-', listening: '-', reading: '9%', writing: '-', section: 'Reading' },
    { type: 'Fill in the Blanks (Drag & Drop)', count: '4-5', overall: '6%', speaking: '-', listening: '-', reading: '20%', writing: '-', section: 'Reading' },
    { type: 'Multiple Choice, Single Answer', count: '2-3', overall: '<1%', speaking: '-', listening: '-', reading: '3%', writing: '-', section: 'Reading' },
    { type: 'Summarize Spoken Text', count: '1-2', overall: '4%', speaking: '-', listening: '10%', reading: '-', writing: '18%', section: 'Listening' },
    { type: 'Highlight Correct Summary', count: '2-3', overall: '<1%', speaking: '-', listening: '2%', reading: '3%', writing: '-', section: 'Listening' },
    { type: 'Highlight Incorrect Words', count: '2-3', overall: '4%', speaking: '-', listening: '8%', reading: '13%', writing: '-', section: 'Listening' },
    { type: 'Write From Dictation', count: '3-4', overall: '5%', speaking: '-', listening: '13%', reading: '-', writing: '23%', section: 'Listening' }
  ];

  // Global Destinations Acceptance (Pages 6 & 7)
  const targetCountries = [
    {
      code: 'AU',
      name: 'Australia',
      badge: 'Study | Work | Permanent Residency',
      highlights: 'Accepted by Department of Home Affairs (DHA) for all visa categories, including sub-class 189, 190, and 491. Endorsed by 100% of Australian universities.'
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      badge: 'Study | Skilled Work | UKVI',
      highlights: 'Approved by the UK Home Office for Student and Worker visas. Recognized by 99% of British universities including Oxford, Cambridge, UCL, and Imperial.'
    },
    {
      code: 'CA',
      name: 'Canada',
      badge: 'Study (SDS) | Work | Core PR',
      highlights: 'Accepted by Immigration, Refugees and Citizenship Canada (IRCC) for fast-track Student Direct Stream (SDS) applications and university enrollments.'
    },
    {
      code: 'NZ',
      name: 'New Zealand',
      badge: 'Study | Skilled Migration',
      highlights: '100% accepted by Immigration New Zealand (INZ) for all work and resident visa pathways and all 8 state universities.'
    },
    {
      code: 'US',
      name: 'United States',
      badge: 'Undergraduate & Graduate Study',
      highlights: 'Endorsed by thousands of leading US institutions including Harvard, Yale, Stanford, NYU, Columbia, and UC Berkeley.'
    },
    {
      code: 'IE',
      name: 'Ireland',
      badge: 'Study & Work Permits',
      highlights: 'Recognized for all Irish student visa applications and institutions such as Trinity College Dublin and University College Dublin.'
    },
    {
      code: 'DE',
      name: 'Germany',
      badge: 'English-Taught Degree Admissions',
      highlights: 'Accepted by leading technical and public universities including TUM, LMU Munich, and RWTH Aachen for international degree tracks.'
    },
    {
      code: 'SG',
      name: 'Singapore',
      badge: 'Academic Admissions & Employment',
      highlights: 'Recognized across Singapore’s top global institutions such as NUS, NTU, and international corporate employers.'
    }
  ];

  // 9 Core Platform Strengths (Page 8)
  const platformHighlights = [
    {
      title: 'Full mock tests with Pearson-like interface',
      desc: 'Simulate real test center conditions with authentic timing, screen layout, and countdown pressure.',
      icon: <Monitor className="w-5 h-5 text-cyan-600" />
    },
    {
      title: 'Smart question bank (20,000+ items)',
      desc: 'Practice with updated questions classified by module, difficulty level, and recent exam repetition frequency.',
      icon: <Layers className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'AI scoring and instant feedback',
      desc: 'Receive immediate diagnostic scores for pronunciation, oral fluency, vocabulary range, and grammar.',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />
    },
    {
      title: 'Section-wise drills',
      desc: 'Target challenging question types including Repeat Sentence, Describe Image, and Fill in the Blanks.',
      icon: <FileText className="w-5 h-5 text-amber-600" />
    },
    {
      title: 'Detailed Error Analytics',
      desc: 'Pinpoint acoustic hesitation patterns, speech rate pauses, spelling mistakes, and keyword oversights.',
      icon: <BarChart3 className="w-5 h-5 text-rose-600" />
    },
    {
      title: 'Personalised Study Paths',
      desc: 'Follow an automated daily preparation schedule calibrated precisely to your target score (65+, 79+, or 90).',
      icon: <Calendar className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Comprehensive Progress Dashboard',
      desc: 'Visualize performance trends over time, monitor skill evolution, and calculate current exam readiness.',
      icon: <Award className="w-5 h-5 text-teal-600" />
    },
    {
      title: 'Mobile and Desktop Synchronization',
      desc: 'Seamlessly switch practice sessions between your smartphone and PC with real-time cloud sync.',
      icon: <Smartphone className="w-5 h-5 text-sky-600" />
    },
    {
      title: 'Proven High-Scoring Templates',
      desc: 'Gain access to tested template frameworks for essays, speech prompts, and summary paragraphs.',
      icon: <BookOpen className="w-5 h-5 text-cyan-600" />
    }
  ];

  // FAQs (Page 9)
  const faqs = [
    {
      q: 'How is PTE Academic different from PTE Core or PTE Academic UKVI?',
      a: 'PTE Academic is designed primarily for international study and global immigration (e.g., Australia and New Zealand). PTE Academic UKVI is identical in format and scoring but includes a UK Home Office reference code required for specific British visa categories. PTE Core is tailored for Canadian permanent residency and economic migration.'
    },
    {
      q: 'What is the format and duration of the PTE Academic exam?',
      a: 'The test is completely computer-delivered and takes approximately 2 hours and 15 minutes. It is divided into three parts: Speaking & Writing (54-67 minutes), Reading (29-30 minutes), and Listening (30-43 minutes).'
    },
    {
      q: 'How quickly are PTE Academic scores delivered?',
      a: 'PTE Academic scores are typically available within 48 hours of completing the test, making it one of the fastest international English language certifications worldwide.'
    },
    {
      q: 'How does NinetyPTE evaluate speaking and writing answers?',
      a: 'NinetyPTE employs advanced AI speech analysis and natural language processing calibrated against official Pearson guidelines to evaluate oral fluency, acoustic pronunciation, syntax, content coverage, and vocabulary.'
    },
    {
      q: 'What ID documents are required on test day?',
      a: 'A valid, unexpired passport is the standard identification requirement for almost all test takers globally. Always verify with your local test center for any country-specific exceptions.'
    },
    {
      q: 'Can I reschedule or cancel my test booking?',
      a: 'Yes, Pearson allows candidates to reschedule or cancel exam appointments through their myPTE portal, subject to policy timelines and fees.'
    },
    {
      q: 'Can I practice with authentic timed test conditions on NinetyPTE?',
      a: 'Yes! NinetyPTE provides full-length scored mock tests and sectional mock tests that replicate Pearson exam timings, sound test setup, countdown sequences, and automated scoring reports.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-cyan-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Intro Box */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span>Preparation Guide</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                PTE Academic Exam: <br />
                <span className="text-cyan-600">Prove your English skills</span>
              </h1>

              <p className="text-sm font-semibold text-slate-500">
                Globally recognized English test for study, migration, and professional registration.
              </p>

              {/* Informational Callout Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-3 relative">
                <div className="w-1.5 h-10 bg-cyan-500 absolute left-0 top-6 rounded-r-md"></div>
                <h3 className="text-base font-extrabold text-slate-900 pl-2">
                  What is PTE Academic?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-2">
                  PTE Academic is a computer-based English test for study, work, and migration. It measures real-life English ability across Speaking, Writing, Reading, and Listening. The exam utilizes unbiased AI scoring for fast, consistent results—with score reports typically available within 48 hours.
                </p>
                <p className="text-xs text-slate-500 leading-relaxed pl-2">
                  PTE Academic includes integrated tasks reflecting how English is naturally used in academic classrooms and professional environments worldwide.
                </p>
              </div>

              {/* CTA Action */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/pricing?tab=mock-test"
                  className="px-7 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-black text-xs sm:text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
                >
                  Prepare Now
                </Link>
                <Link
                  to="/book-exam"
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-cyan-700 text-white font-extrabold text-xs shadow-sm transition"
                >
                  Book Exam Voucher
                </Link>
              </div>

            </div>

            {/* Right Column: Visual Stamp Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80" 
                  alt="Student preparation and study abroad passport"
                  className="w-full h-[360px] object-cover"
                />
                
                {/* 48h Fast Results Pill */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg text-center border border-slate-100">
                  <div className="text-lg font-black text-slate-900 leading-none">48h</div>
                  <div className="text-[9px] uppercase tracking-wider font-extrabold text-cyan-600 mt-0.5">Fast Results</div>
                </div>

                {/* Accepted By Pill */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2.5 border border-slate-100">
                  <Globe2 className="w-5 h-5 text-cyan-600" />
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Accepted By</div>
                    <div className="text-xs font-black text-slate-900">3,900+ Global Institutions</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Navigation Anchor Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-3 bg-white rounded-full border border-slate-200/90 shadow-xs max-w-3xl mx-auto text-xs font-bold text-slate-600">
            {quickLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="px-4 py-1.5 rounded-full hover:bg-cyan-50 hover:text-cyan-600 transition"
              >
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHO SHOULD TAKE THE PTE ACADEMIC TEST? (Page 1 Bottom)                */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Who Should Take the <span className="text-cyan-600">PTE Academic Test?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Chosen by test takers worldwide for academic admissions, professional migration, and employment pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: General Purpose */}
            <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">General Purpose</h3>
                <Globe2 className="w-5 h-5 text-cyan-600" />
              </div>
              <p className="text-xs text-slate-500">
                PTE Academic serves individuals demonstrating English capability for:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>University & college degree admissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Professional registration & licensing boards</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Skilled migration & permanent residence visas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>International multinational employment</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Preferences */}
            <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">Preferences</h3>
                <Compass className="w-5 h-5 text-cyan-600" />
              </div>
              <p className="text-xs text-slate-500">
                Particularly suited for candidates who:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Prefer fully computer-delivered assessment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Need rapid turnaround times for applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Value objective, automated AI evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Want single-session test completion</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Typical Takers */}
            <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">Typical Takers</h3>
                <GraduationCap className="w-5 h-5 text-cyan-600" />
              </div>
              <p className="text-xs text-slate-500">
                Primary candidate demographics:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>International university students</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Medical, engineering, and nursing professionals</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Australian & New Zealand visa applicants</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-500 font-bold">›</span>
                  <span>Corporate and skilled job seekers</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT SKILLS ARE TESTED? (Page 1 Bottom / Page 2 Top)                  */}
      {/* ========================================================================= */}
      <section className="py-14 bg-slate-50/60 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Skills Are Tested in the <span className="text-cyan-600">PTE Academic Exam?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Assessing communicative competencies through real-world academic tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Speaking and Writing */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 font-black text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Speaking & Writing</h3>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li>• Acoustic Pronunciation clarity</li>
                <li>• Oral Fluency & rhythm</li>
                <li>• Grammatical structure & range</li>
                <li>• Academic Vocabulary precision</li>
                <li>• Written discourse & essay structure</li>
                <li>• Content task response</li>
              </ul>
            </div>

            {/* 2. Reading */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 font-black text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Reading</h3>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li>• Comprehension of academic texts</li>
                <li>• Contextual analysis</li>
                <li>• Collocation matching</li>
                <li>• Skimming & scanning techniques</li>
                <li>• Inference & paragraph reordering</li>
                <li>• Vocabulary in context</li>
              </ul>
            </div>

            {/* 3. Listening */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 font-black text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Listening</h3>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li>• Comprehension of lectures and discussions</li>
                <li>• Real-time note-taking</li>
                <li>• Audio summary generation</li>
                <li>• Identifying spoken mistakes</li>
                <li>• Transcription accuracy (Write from Dictation)</li>
                <li>• International accent recognition</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE PTE ACADEMIC? (Page 2)                                      */}
      {/* ========================================================================= */}
      <section id="why-us" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose <span className="text-cyan-600">PTE Academic?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Trusted by millions of test candidates for prompt results, global validity, and transparent scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">70+ Countries</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepted by immigration authorities and over 3,900 universities globally for study and work visas.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">1-2 Days</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fast score delivery typically delivered within 48 hours, eliminating application deadline stress.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">475+ Test Centers</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flexible scheduling 365 days a year across secure test center facilities around the world.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-lg font-black text-slate-900">Immigration & University Recognition</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Endorsed by Australia DHA, UK Home Office, New Zealand INZ, and Canadian SDS programs.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-3 sm:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-lg font-black text-slate-900">AI + Objective Scoring Matrix</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated evaluation removes human bias and subjective examiner variation, providing consistent, reliable scoring on every exam sitting.
              </p>
            </div>

          </div>

          {/* Preparation Mock Test Dark Banner */}
          <div id="practice-test" className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Take PTE Academic Preparation Mock Test
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                Prove your English skills with fast, fair, AI-scored simulations on NinetyPTE.
              </p>
            </div>
            <Link
              to="/pricing?tab=mock-test"
              className="px-8 py-3.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-black text-xs sm:text-sm shadow-md transition whitespace-nowrap active:scale-95"
            >
              Prepare Now
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. COMPARISON MATRIX: PTE vs IELTS (Pages 2 & 3)                         */}
      {/* ========================================================================= */}
      <section id="comparison" className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Academic <span className="text-slate-400 font-normal">vs</span> IELTS <span className="text-slate-400 font-normal">vs</span> CELPIP <span className="text-slate-400 font-normal">vs</span> TOEFL
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Compare test logistics, delivery format, and scoring criteria to pick the best exam for your goals.
            </p>

            <div className="pt-3">
              <div className="inline-flex p-1 bg-white rounded-full border border-slate-200 text-xs font-bold shadow-xs">
                {['IELTS General', 'CELPIP General', 'TOEFL iBT'].map((engine, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveComparisonEngine(engine.toLowerCase().replace(' ', '-'))}
                    className={`px-5 py-2 rounded-full transition ${
                      activeComparisonEngine === engine.toLowerCase().replace(' ', '-')
                        ? 'bg-cyan-500 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {engine}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dual Comparison Cards matching Page 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Left Card: PTE Academic */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-400 shadow-xl space-y-6">
              <div className="bg-cyan-500 text-white p-4 rounded-2xl text-center">
                <h3 className="text-lg font-black tracking-tight">PTE Academic</h3>
                <p className="text-xs text-cyan-100 font-medium">AI-scored English test for study, work & migration</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Essentials & Logistics</div>
                
                <div className="space-y-2.5 divide-y divide-slate-100">
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Conducted By</span>
                    <span className="font-extrabold text-slate-900">Pearson PLC</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Primary Purpose</span>
                    <span className="font-extrabold text-slate-900">Study, Work, Migration</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Test Delivery</span>
                    <span className="font-extrabold text-cyan-600">100% Computer-Based</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Duration</span>
                    <span className="font-extrabold text-slate-900">~2 hours 15 minutes</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Speaking Mode</span>
                    <span className="font-extrabold text-slate-900">Recorded via Headset Microphone</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Result Turnaround</span>
                    <span className="font-extrabold text-emerald-600">Within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: IELTS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="bg-slate-900 text-white p-4 rounded-2xl text-center">
                <h3 className="text-lg font-black tracking-tight">IELTS (Academic / General)</h3>
                <p className="text-xs text-slate-300 font-medium">Widely accepted global English proficiency exam</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Essentials & Logistics</div>
                
                <div className="space-y-2.5 divide-y divide-slate-100">
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Conducted By</span>
                    <span className="font-extrabold text-slate-900">IDP / British Council</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Primary Purpose</span>
                    <span className="font-extrabold text-slate-900">Study, Work, Migration</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Test Delivery</span>
                    <span className="font-extrabold text-slate-700">Paper or Computer-delivered</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Duration</span>
                    <span className="font-extrabold text-slate-900">~2 hours 45 minutes</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Speaking Mode</span>
                    <span className="font-extrabold text-slate-900">Face-to-face with examiner</span>
                  </div>
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Result Turnaround</span>
                    <span className="font-extrabold text-slate-700">3 to 13 days</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EXAM STRUCTURE BREAKDOWN (Page 4)                                     */}
      {/* ========================================================================= */}
      <section id="exam-format" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Academic <span className="text-cyan-600">Exam Structure Breakdown</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Understanding the 3 core exam sections, question tasks, and timing limits.
            </p>
          </div>

          {/* 3 Section Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Part 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-cyan-500 text-white p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-100">Part 1</div>
                <div className="text-base font-extrabold">Speaking & Writing</div>
                <div className="text-xs text-cyan-100 font-mono mt-0.5">54 - 67 Minutes</div>
              </div>

              <div className="p-5 text-xs divide-y divide-slate-100">
                <div className="py-2 flex justify-between font-medium"><span>Personal Introduction</span><span className="text-slate-400">1</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Read Aloud</span><span className="font-bold text-cyan-600">6 - 7</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Repeat Sentence</span><span className="font-bold text-cyan-600">10 - 12</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Describe Image</span><span className="font-bold text-cyan-600">3 - 4</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Re-tell Lecture</span><span className="font-bold text-cyan-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Answer Short Question</span><span className="font-bold text-cyan-600">5 - 6</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Summarize Written Text</span><span className="font-bold text-cyan-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Write Essay</span><span className="font-bold text-cyan-600">1 - 2</span></div>
              </div>
            </div>

            {/* Part 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-cyan-600 text-white p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-100">Part 2</div>
                <div className="text-base font-extrabold">Reading</div>
                <div className="text-xs text-cyan-100 font-mono mt-0.5">29 - 30 Minutes</div>
              </div>

              <div className="p-5 text-xs divide-y divide-slate-100">
                <div className="py-2 flex justify-between font-medium"><span>Reading & Writing: Fill in the Blanks</span><span className="font-bold text-cyan-600">5 - 6</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Multiple Choice, Multiple Answers</span><span className="font-bold text-cyan-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Reorder Paragraphs</span><span className="font-bold text-cyan-600">2 - 3</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Reading: Fill in the Blanks</span><span className="font-bold text-cyan-600">4 - 5</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Multiple Choice, Single Answer</span><span className="font-bold text-cyan-600">1 - 2</span></div>
              </div>
            </div>

            {/* Part 3 */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-teal-600 text-white p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-teal-100">Part 3</div>
                <div className="text-base font-extrabold">Listening</div>
                <div className="text-xs text-teal-100 font-mono mt-0.5">30 - 43 Minutes</div>
              </div>

              <div className="p-5 text-xs divide-y divide-slate-100">
                <div className="py-2 flex justify-between font-medium"><span>Summarize Spoken Text</span><span className="font-bold text-teal-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Multiple Choice, Multiple Answers</span><span className="font-bold text-teal-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Fill in the Blanks</span><span className="font-bold text-teal-600">2 - 3</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Highlight Correct Summary</span><span className="font-bold text-teal-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Multiple Choice, Single Answer</span><span className="font-bold text-teal-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Select Missing Word</span><span className="font-bold text-teal-600">1 - 2</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Highlight Incorrect Words</span><span className="font-bold text-teal-600">2 - 3</span></div>
                <div className="py-2 flex justify-between font-medium"><span>Write from Dictation</span><span className="font-bold text-teal-600">3 - 4</span></div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. QUESTION WEIGHTAGE MATRIX TABLE (Page 5)                              */}
      {/* ========================================================================= */}
      <section id="weightage" className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Academic Test Format & <span className="text-cyan-600">Question Weightage</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Understanding how marks distribute across modules helps test takers optimize preparation strategy and prioritize high-yield questions.
            </p>
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Question Type</th>
                  <th className="px-3">Tasks</th>
                  <th className="px-3">Overall Impact</th>
                  <th className="px-3">Speaking</th>
                  <th className="px-3">Listening</th>
                  <th className="px-3">Reading</th>
                  <th className="px-3">Writing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {weightageMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.type}</td>
                    <td className="px-3 font-mono text-slate-500">{row.count}</td>
                    <td className="px-3 font-bold text-cyan-700">{row.overall}</td>
                    <td className="px-3 font-semibold text-amber-700">{row.speaking}</td>
                    <td className="px-3 font-semibold text-purple-700">{row.listening}</td>
                    <td className="px-3 font-semibold text-emerald-700">{row.reading}</td>
                    <td className="px-3 font-semibold text-sky-700">{row.writing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ALIGNMENT BETWEEN PTE AND IELTS / CEFR (Page 6)                        */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Alignment between <span className="text-cyan-600">PTE Academic and IELTS / CEFR</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Official score concordance table demonstrating required PTE scores for target IELTS band scores.
            </p>
          </div>

          {/* Interactive Band Selector Pills */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Target IELTS Band:</span>
                <div className="text-base font-extrabold text-slate-900">Band {selectedIeltsBand} Equivalent</div>
              </div>

              {/* Band Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['9.0', '8.5', '8.0', '7.5', '7.0', '6.5', '6.0', '5.5', '5.0', '4.5'].map((band) => (
                  <button
                    key={band}
                    onClick={() => setSelectedIeltsBand(band)}
                    className={`w-9 h-9 rounded-xl font-black text-xs transition ${
                      selectedIeltsBand === band
                        ? 'bg-cyan-500 text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-cyan-400'
                    }`}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Score Target Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center">
              
              <div className="bg-white p-3.5 rounded-2xl border border-cyan-200 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Overall Score</div>
                <div className="text-xl font-black text-cyan-600 my-0.5">{activePteScores.overall}</div>
                <div className="text-[9px] text-slate-400">Scale 10-90</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Listening</div>
                <div className="text-xl font-black text-purple-600 my-0.5">{activePteScores.listening}</div>
                <div className="text-[9px] text-slate-400">Target</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Reading</div>
                <div className="text-xl font-black text-emerald-600 my-0.5">{activePteScores.reading}</div>
                <div className="text-[9px] text-slate-400">Target</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Speaking</div>
                <div className="text-xl font-black text-amber-600 my-0.5">{activePteScores.speaking}</div>
                <div className="text-[9px] text-slate-400">Target</div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">Writing</div>
                <div className="text-xl font-black text-sky-600 my-0.5">{activePteScores.writing}</div>
                <div className="text-[9px] text-slate-400">Target</div>
              </div>

            </div>

            <p className="text-xs text-slate-500 italic text-center">
              {activePteScores.desc}
            </p>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TOP COUNTRIES ACCEPTING PTE ACADEMIC (Pages 6 & 7)                     */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Top Countries Recognizing <span className="text-cyan-600">PTE Scores</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Major migration and education hubs accepting PTE Academic worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetCountries.map((country, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-cyan-600">{country.code}</span>
                  <span className="text-xs font-black text-slate-900">{country.name}</span>
                </div>
                <div className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md inline-block">
                  {country.badge}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {country.highlights}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. WHY NINETYPTE IS THE BEST CHOICE (Page 8)                            */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why NinetyPTE is the Best Choice for your <span className="text-cyan-600">PTE Academic Preparation</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Comprehensive exam simulations, instant speech feedback, and targeted error analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platformHighlights.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/80 hover:border-cyan-300 shadow-xs hover:shadow-md transition space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-2xs">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{feat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FAQS (Page 9)                                                        */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Academic – Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers regarding test registration, preparation strategy, and score delivery.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-cyan-600 transition"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
      {/* 12. ENQUIRY / GET STARTED (Page 9 Bottom)                                */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="md:col-span-5 space-y-4 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Ready to start your <span className="text-cyan-600">preparation?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Practice real exam-style questions, take scored mock tests, and track your progress with instant AI feedback designed to help you achieve your target score faster.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> AI Scoring</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> Real Exam Qs</span>
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> 24/7 Access</span>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="md:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <h4 className="font-extrabold text-sm text-slate-900 mb-4">Quick Enquiry Form</h4>
              
              {formSent ? (
                <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                  ✓ Thank you! Your query has been received. Our counselor will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name*"
                      value={enquiryForm.fullName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Target Score (e.g. 79+)"
                      value={enquiryForm.instituteName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, instituteName: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Email Address*"
                      value={enquiryForm.emailId}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, emailId: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Your Message..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Submit Enquiry
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
