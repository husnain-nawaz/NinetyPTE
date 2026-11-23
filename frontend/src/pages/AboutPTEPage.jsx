import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Globe, 
  User, 
  GraduationCap, 
  Clock, 
  Building, 
  Cpu, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Pause, 
  Volume2, 
  Flag, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Monitor, 
  Layers, 
  BarChart, 
  Smartphone, 
  BookOpen, 
  MessageSquare, 
  Send,
  HelpCircle,
  Award
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

  // Alignment Score Converter
  const [selectedBand, setSelectedBand] = useState('7');
  const [scoreScaleType, setScoreScaleType] = useState('ielts');

  const bandToScoreMap = {
    '9': { overall: '86-90', listening: '86-90', reading: '86-90', speaking: '86-90', writing: '86-90' },
    '8.5': { overall: '83-85', listening: '81-85', reading: '81-85', speaking: '84-88', writing: '82-85' },
    '8': { overall: '79-82', listening: '76-80', reading: '77-80', speaking: '80-83', writing: '78-81' },
    '7.5': { overall: '73-78', listening: '68-75', reading: '69-76', speaking: '77-81', writing: '74-77' },
    '7': { overall: '63-70', listening: '58-63', reading: '59-64', speaking: '76-82', writing: '69-76' },
    '6.5': { overall: '58-62', listening: '52-57', reading: '53-58', speaking: '68-75', writing: '62-68' },
    '6': { overall: '50-57', listening: '45-51', reading: '46-52', speaking: '58-67', writing: '54-61' },
    '5.5': { overall: '42-49', listening: '38-44', reading: '39-45', speaking: '48-57', writing: '45-53' },
    '5': { overall: '36-41', listening: '32-37', reading: '33-38', speaking: '39-47', writing: '37-44' },
    '4.5': { overall: '30-35', listening: '28-31', reading: '28-32', speaking: '30-38', writing: '30-36' }
  };

  const activeScores = bandToScoreMap[selectedBand] || bandToScoreMap['7'];

  // Interactive Question Sample Tabs
  const [activeQuestionTab, setActiveQuestionTab] = useState('situation');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      let p = 0;
      const timer = setInterval(() => {
        p += 20;
        setAudioProgress(p);
        if (p >= 100) {
          clearInterval(timer);
          setIsPlayingAudio(false);
          setAudioProgress(0);
        }
      }, 1000);
    }
  };

  // Comparison Selector
  const [comparisonTab, setComparisonTab] = useState('ielts');

  // FAQ Accordions
  const [openFaq, setOpenFaq] = useState(0);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    fullName: '',
    instituteName: '',
    emailId: '',
    country: 'Pakistan',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ fullName: '', instituteName: '', emailId: '', country: 'Pakistan', phone: '', message: '' });
    }, 4000);
  };

  // Question Weightage Matrix Data
  const weightageRows = [
    { name: 'Read Aloud', count: '6-7', overall: '4%', speaking: '9%', listening: '-', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { name: 'Repeat Sentence', count: '10-12', overall: '7%', speaking: '16%', listening: '17%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { name: 'Describe Image', count: '5-6', overall: '15%', speaking: '31%', listening: '-', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { name: 'Retell Lecture', count: '2-3', overall: '6%', speaking: '13%', listening: '13%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { name: 'Answer Short Question', count: '5-6', overall: '2%', speaking: '-', listening: '4%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { name: 'Summarize Group Discussion', count: '2-3', overall: '9%', speaking: '19%', listening: '20%', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { name: 'Respond to a Situation', count: '2-3', overall: '6%', speaking: '13%', listening: '-', reading: '-', writing: '-', section: 'Speaking & Writing' },
    { name: 'Summarize Written Text', count: '2', overall: '7%', speaking: '-', listening: '-', reading: '23%', writing: '28%', section: 'Speaking & Writing' },
    { name: 'Write Essay', count: '1', overall: '7%', speaking: '-', listening: '-', reading: '-', writing: '31%', section: 'Speaking & Writing' },
    { name: 'Fill in the Blanks (Dropdown)', count: '5-6', overall: '7%', speaking: '-', listening: '-', reading: '25%', writing: '-', section: 'Reading' },
    { name: 'Multiple Choice, Multiple Answers', count: '2-3', overall: '1%', speaking: '-', listening: '-', reading: '5%', writing: '-', section: 'Reading' },
    { name: 'Reorder Paragraph', count: '2-3', overall: '3%', speaking: '-', listening: '-', reading: '9%', writing: '-', section: 'Reading' },
    { name: 'Fill in the Blanks (Drag and Drop)', count: '4-5', overall: '6%', speaking: '-', listening: '-', reading: '20%', writing: '-', section: 'Reading' },
    { name: 'Multiple Choice, Single Answer', count: '2-3', overall: '<1%', speaking: '-', listening: '-', reading: '3%', writing: '-', section: 'Reading' },
    { name: 'Summarize Spoken Text', count: '1', overall: '4%', speaking: '-', listening: '10%', reading: '-', writing: '18%', section: 'Listening' },
    { name: 'Multiple Choice, Multiple Answers', count: '2-3', overall: '1%', speaking: '-', listening: '3%', reading: '-', writing: '-', section: 'Listening' },
    { name: 'Fill in the Blanks (Type In)', count: '2-3', overall: '3%', speaking: '-', listening: '8%', reading: '-', writing: '-', section: 'Listening' },
    { name: 'Highlight Correct Summary', count: '2-3', overall: '<1%', speaking: '-', listening: '2%', reading: '3%', writing: '-', section: 'Listening' },
    { name: 'Multiple Choice, Single Answer', count: '2-3', overall: '<1%', speaking: '-', listening: '2%', reading: '-', writing: '-', section: 'Listening' },
    { name: 'Select Missing Word', count: '1-2', overall: '1%', speaking: '-', listening: '1%', reading: '-', writing: '-', section: 'Listening' },
    { name: 'Highlight Incorrect Words', count: '2-3', overall: '4%', speaking: '-', listening: '8%', reading: '13%', writing: '-', section: 'Listening' },
    { name: 'Write From Dictation', count: '3-4', overall: '5%', speaking: '-', listening: '13%', reading: '-', writing: '23%', section: 'Listening' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="pt-8 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Top Badge Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold border border-cyan-100">
                <Sparkles className="w-3.5 h-3.5 fill-[#00c2cb]" />
                <span>Preparation Guide</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
                PTE Academic Exam: <br />
                <span className="text-[#00c2cb]">Prove your English skills</span>
              </h1>

              <p className="text-sm font-semibold text-slate-600">
                Globally recognized English test for non-native speakers
              </p>

              {/* White Callout Box with Cyan Vertical Bar */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3 relative">
                <div className="flex items-center gap-2.5">
                  <div className="w-1 h-5 bg-[#00c2cb] rounded-full"></div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    What is PTE Academic?
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  PTE Academic is a computer-based English test for study, work, and migration. It measures real-life English across speaking, writing, reading, and listening.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The test uses AI scoring and human evaluation for fast and consistent results. You take the test at a secure test center with a headset and computer. Most results are available within 48 hours.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  PTE Academic includes integrated tasks. You might listen, then speak. Or read, then write. This mirrors how you use English in the real world.
                </p>
              </div>

              {/* Prepare Now Button */}
              <div className="pt-2">
                <a
                  href="#practice-test"
                  className="inline-block px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-sm shadow-xs transition active:scale-95 cursor-pointer"
                >
                  Prepare Now
                </a>
              </div>

            </div>

            {/* Right Desk Mockup Composition */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-50 p-6 flex flex-col justify-between">
                
                {/* Visual desk elements */}
                <div className="space-y-4">
                  {/* Mock Visa Application Form */}
                  <div className="bg-white/95 rounded-xl p-4 shadow-sm border border-slate-200 max-w-[85%] relative">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      VISA APPLICATION FORM
                    </div>
                    <div className="space-y-1.5 text-[9px] text-slate-500">
                      <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                      <div className="w-1/2 h-2 bg-slate-200 rounded"></div>
                      <div className="w-2/3 h-2 bg-slate-200 rounded"></div>
                    </div>
                    
                    {/* Red Approved Stamp */}
                    <div className="absolute right-3 top-3 border-2 border-red-500 text-red-600 font-black text-xs px-2.5 py-0.5 rounded rotate-[-12deg] tracking-widest uppercase opacity-90 shadow-2xs">
                      APPROVED
                    </div>
                  </div>

                  {/* Passport Preview */}
                  <div className="w-36 h-24 bg-blue-950 text-amber-200 rounded-lg p-2.5 shadow-md border border-blue-900 flex flex-col justify-between rotate-[-6deg]">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-center">PASSPORT</div>
                    <div className="w-8 h-8 mx-auto rounded-full border border-amber-300 flex items-center justify-center text-[10px]">★</div>
                    <div className="text-[6px] tracking-wider text-center text-amber-200/80">GLOBAL ADMISSIONS</div>
                  </div>
                </div>

                {/* 3 Floating Badges Matching User Reference */}
                {/* Badge 1: 48h Fast Results (Top Right) */}
                <div className="absolute top-4 right-4 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2">
                  <div className="text-xl font-black text-slate-900 leading-none">48h</div>
                  <div className="text-[9px] font-black uppercase text-slate-500 leading-tight">
                    FAST<br />RESULTS
                  </div>
                </div>

                {/* Badge 2: Accepted By 3900+ (Center Left) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 bg-white rounded-xl px-3.5 py-2 shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">ACCEPTED BY</div>
                    <div className="text-xs font-black text-slate-800">3900+ Global Institutions</div>
                  </div>
                </div>

                {/* Badge 3: Study Abroad (Bottom Right) */}
                <div className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-slate-100 flex items-center gap-2">
                  <span className="text-amber-500 text-sm">🎓</span>
                  <span className="text-xs font-black text-slate-800">Study Abroad</span>
                </div>

              </div>
            </div>

          </div>

          {/* Anchor Navigation Bar */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 p-1.5 bg-white rounded-full border border-slate-200 shadow-2xs text-xs font-bold text-slate-600">
              <a href="#comparison" className="px-5 py-1.5 rounded-full bg-[#00c2cb] text-white">
                Comparison
              </a>
              <a href="#practice-test" className="px-4 py-1.5 rounded-full hover:text-cyan-600 hover:bg-slate-50 transition">
                Practice Test
              </a>
              <a href="#exam-format" className="px-4 py-1.5 rounded-full hover:text-cyan-600 hover:bg-slate-50 transition">
                Exam Format
              </a>
              <a href="#weightage" className="px-4 py-1.5 rounded-full hover:text-cyan-600 hover:bg-slate-50 transition">
                Question Weightage
              </a>
              <a href="#why-us" className="px-4 py-1.5 rounded-full hover:text-cyan-600 hover:bg-slate-50 transition">
                Why NinetyPTE
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHO SHOULD TAKE THE PTE ACADEMIC TEST? (Page 1 Bottom)                */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Who Should Take the <span className="text-[#00c2cb]">PTE Academic Test?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              It is taken for various purposes such as study, immigration, employment opportunities for various countries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: General Purpose */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">General Purpose</h3>
                <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                PTE Academic is for anyone who needs to show English ability for:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>University and college admissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Professional registration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Skilled migration and visas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Employment applications</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Preferences */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">Preferences</h3>
                <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                It suits test takers who:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Prefer a computer-based test</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Want quick results</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Value consistent, AI + Human-driven scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Need a modern test</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Typical Takers */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">Typical Takers</h3>
                <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Typical test takers:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>International students</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Professionals seeking licensing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Visa applicants</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00c2cb] font-bold">›</span>
                  <span>Job seekers</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT SKILLS ARE TESTED IN THE PTE ACADEMIC EXAM? (Page 1 & 2)         */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Skills Are Tested in the <span className="text-[#00c2cb]">PTE Academic Exam?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Understand the core skills assessed in the PTE exam, including speaking, writing, reading, and listening abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Skill 1: Speaking and Writing */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] font-black text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Speaking and Writing</h3>
              <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                <li>• Pronunciation</li>
                <li>• Fluency</li>
                <li>• Grammar</li>
                <li>• Vocabulary</li>
                <li>• Written structure</li>
                <li>• Task response</li>
                <li>• Capitalize words</li>
                <li>• Content grasping</li>
                <li>• Form</li>
                <li>• Timings</li>
              </ul>
            </div>

            {/* Skill 2: Reading */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] font-black text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Reading</h3>
              <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                <li>• Understanding of academic texts</li>
                <li>• Contextual understanding</li>
                <li>• Grammar</li>
                <li>• Vocabulary</li>
                <li>• Skimming</li>
                <li>• Scanning</li>
                <li>• Vocabulary context</li>
              </ul>
            </div>

            {/* Skill 3: Listening */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] font-black text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Listening</h3>
              <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                <li>• Comprehension of lectures and talks</li>
                <li>• Note-taking</li>
                <li>• Summaries</li>
                <li>• Attention to detail</li>
                <li>• Summarizing skills</li>
                <li>• Spellings</li>
                <li>• Alertness</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE PTE ACADEMIC? (Page 2)                                      */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose <span className="text-[#00c2cb]">PTE Academic?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Discover why millions of students choose PTE Academic for fast results, global acceptance, and accurate scoring.
            </p>
          </div>

          {/* 5 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Metric 1: 70+ Countries */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">70+</div>
              <h4 className="font-extrabold text-sm text-slate-900">Countries Worldwide</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepted in over 70 countries and recognized by 3,900+ institutions globally for immigration, study abroad, and professional registration.
              </p>
            </div>

            {/* Metric 2: 1-2 Days Fast Results */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">1-2 Days</div>
              <h4 className="font-extrabold text-sm text-slate-900">Fast Results</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get your test results quickly, typically within 1-2 days, so you can move forward with your plans without delay.
              </p>
            </div>

            {/* Metric 3: 475+ Global Centers */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-slate-900">475+</div>
              <h4 className="font-extrabold text-sm text-slate-900">Global Test Centers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flexible test dates and locations with 475+ test centers worldwide, making it convenient to take the test when and where you need.
              </p>
            </div>

            {/* Metric 4: Immigration & University Recognition */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 pt-2">Immigration & University Recognition</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recognized by immigration authorities and top-ranked universities globally, opening doors to your future education and career.
              </p>
            </div>

            {/* Metric 5: AI + Human Scoring */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 pt-2">AI + Human Scoring</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully computer-based test with AI and human scoring, reducing bias and ensuring fair, accurate results for every test taker.
              </p>
            </div>

          </div>

          {/* Navy Mock Test Banner */}
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-3 max-w-lg z-10">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Take PTE Academic <br />
                <span className="text-[#00c2cb]">Preparation Mock Test</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Prove your English skills with PTE Academic Fast, fair, and computer-based. Accepted by universities, governments, and employers worldwide.
              </p>
              <div className="pt-2">
                <a
                  href="#practice-test"
                  className="inline-block px-7 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-slate-100 transition active:scale-95"
                >
                  Prepare Now
                </a>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-[#00c2cb] flex items-center justify-center font-black text-xl">
                90
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Score Target</span>
                  <span>🚀</span>
                </div>
                <div className="text-[10px] text-slate-400">Full Simulated Analytics</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. COMPARISON MATRIX (Page 2 & 3)                                         */}
      {/* ========================================================================= */}
      <section id="comparison" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              <span className="text-[#00c2cb]">PTE Academic</span> vs IELTS vs <span className="text-[#00c2cb]">CELPIP</span> vs TOEFL
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Compare PTE Academic with IELTS, CELPIP, and TOEFL to find your best fit.
            </p>
          </div>

          {/* Switcher Pills */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setComparisonTab('ielts')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
                comparisonTab === 'ielts'
                  ? 'bg-[#00c2cb] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              IELTS General
            </button>
            <button
              onClick={() => setComparisonTab('celpip')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
                comparisonTab === 'celpip'
                  ? 'bg-[#00c2cb] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              CELPIP General
            </button>
            <button
              onClick={() => setComparisonTab('toefl')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
                comparisonTab === 'toefl'
                  ? 'bg-[#00c2cb] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              TOEFL iBT
            </button>
          </div>

          {/* Two Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* Left Card: PTE Academic (Cyan Header) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#00c2cb] text-white p-5 text-center relative">
                  <div className="w-8 h-8 rounded-full bg-white text-[#00c2cb] flex items-center justify-center mx-auto mb-2 shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-black">PTE Academic</h3>
                  <p className="text-xs text-white/90">AI-scored English test for study, work, and migration</p>
                </div>

                <div className="p-6 space-y-6 text-xs text-slate-700">
                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      ⓘ ESSENTIALS & LOGISTICS
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">CONDUCTED BY</span>
                      <span className="font-extrabold text-slate-900">Pearson PLC</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">PRIMARY PURPOSE</span>
                      <span className="font-semibold text-slate-800">Study, Work, Migration</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">TEST FREQUENCY</span>
                      <span className="font-semibold text-slate-800">Multiple dates weekly</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">ACCEPTED IN</span>
                      <span className="font-semibold text-slate-800">AU, NZ, UK, USA, CA, Ireland</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      🗂 TEST FORMAT & EXPERIENCE
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">TEST TYPE</span>
                      <span className="font-extrabold text-slate-900">Computer-based</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">TEST DURATION</span>
                      <span className="font-semibold text-slate-800">~2 hours and 15 minutes</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">SPEAKING MODE</span>
                      <span className="font-semibold text-slate-800">Recorded via computer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 text-center">
                <span className="text-xs font-bold text-cyan-600 hover:text-cyan-700 cursor-pointer">
                  Learn More ⌄
                </span>
              </div>
            </div>

            {/* Right Card: Alternative Exam (Navy Header) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#203a7a] text-white p-5 text-center relative">
                  <div className="w-8 h-8 rounded-full bg-white text-[#203a7a] flex items-center justify-center mx-auto mb-2 shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-black">
                    {comparisonTab === 'ielts' ? 'IELTS (Academic / General)' : comparisonTab === 'celpip' ? 'CELPIP General' : 'TOEFL iBT'}
                  </h3>
                  <p className="text-xs text-white/90">Widely accepted English proficiency test worldwide</p>
                </div>

                <div className="p-6 space-y-6 text-xs text-slate-700">
                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      ⓘ ESSENTIALS & LOGISTICS
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">CONDUCTED BY</span>
                      <span className="font-extrabold text-slate-900">
                        {comparisonTab === 'ielts' ? 'IDP / British Council' : comparisonTab === 'celpip' ? 'Paragon Testing' : 'ETS'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">PRIMARY PURPOSE</span>
                      <span className="font-semibold text-slate-800">Study, Work, Migration</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">TEST FREQUENCY</span>
                      <span className="font-semibold text-slate-800">Fixed dates / monthly</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">ACCEPTED IN</span>
                      <span className="font-semibold text-slate-800">140+ countries</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                      🗂 TEST FORMAT & EXPERIENCE
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">TEST TYPE</span>
                      <span className="font-extrabold text-slate-900">Paper or Computer</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">TEST DURATION</span>
                      <span className="font-semibold text-slate-800">2 hrs 45 mins</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-bold text-slate-500">SPEAKING MODE</span>
                      <span className="font-semibold text-slate-800">Human examiner or video</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 text-center">
                <span className="text-xs font-bold text-blue-800 hover:text-blue-900 cursor-pointer">
                  Learn More ⌄
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW TO PREPARE FOR PTE ACADEMIC? (Page 3)                              */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How to prepare for <span className="text-[#00c2cb]">PTE Academic?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              PTE Academic is designed to be easy and user-friendly, but you still need to prepare well to achieve your desired score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tip 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Flag className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Practice with sample questions and tests</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access free sample questions and practice tests online to familiarize yourself with the question types and difficulty.
              </p>
            </div>

            {/* Tip 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Understand the test format and scoring</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow structured formats for Speaking, Writing, Reading & Listening to optimize your time allocation.
              </p>
            </div>

            {/* Tip 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Improve your English skills and strategies</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practice regularly, master AI scoring benchmarks, and learn how to formulate clear, accurate responses.
              </p>
            </div>

            {/* Tip 4 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Register and book your test</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Once confident, schedule your test date online across local authorized exam centers.
              </p>
            </div>

          </div>

          <div className="text-center pt-2">
            <button className="px-8 py-3 rounded-full bg-[#1e293b] hover:bg-slate-900 text-white font-bold text-xs shadow-md transition">
              PTE Academic Test
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. QUESTION SIMULATOR (Page 4)                                            */}
      {/* ========================================================================= */}
      <section id="practice-test" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              New Practice Questions for <span className="text-[#00c2cb]">PTE Academic</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Discover format variations, word count changes, and preparation time differences in the PTE Academic exam.
            </p>
          </div>

          {/* Interactive Question Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Selector List */}
              <div className="md:col-span-4 space-y-2 border-r border-slate-100 pr-4">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                  QUESTION TYPES
                </div>
                
                <div
                  onClick={() => setActiveQuestionTab('situation')}
                  className={`p-3 rounded-2xl cursor-pointer border transition ${
                    activeQuestionTab === 'situation'
                      ? 'bg-orange-50/70 border-orange-200 text-orange-900'
                      : 'border-transparent text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-extrabold text-xs">Respond to a Situation</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Speaking • 10s Prep</div>
                </div>

                <div
                  onClick={() => setActiveQuestionTab('discussion')}
                  className={`p-3 rounded-2xl cursor-pointer border transition ${
                    activeQuestionTab === 'discussion'
                      ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                      : 'border-transparent text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-extrabold text-xs">Summarize Group Discussion</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Writing • 9 Mins</div>
                </div>
              </div>

              {/* Right Interactive Player */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-orange-600 font-black text-sm">
                  <span>💬</span>
                  <span>Respond to a Situation</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  This task requires you to listen to a brief audio scenario and provide an appropriate verbal response. You will have 20 seconds to prepare and 40 seconds to record your answer.
                </p>

                {/* Sample Prompt Box */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SAMPLE QUESTION 1
                  </div>
                  <div className="font-extrabold text-xs text-slate-900">
                    What would you say to resolve the dorm room schedule?
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    You and your roommate have conflicting study routines during final exam week. To ensure both of you succeed without disturbance, you decide to discuss quiet study hours.
                  </p>

                  {/* Audio Player Controls */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center gap-3">
                    <button
                      onClick={toggleAudio}
                      className="w-8 h-8 rounded-full bg-[#f97316] text-white flex items-center justify-center hover:bg-[#ea580c] transition cursor-pointer"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>

                    <div className="flex-1">
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#f97316] transition-all duration-300"
                          style={{ width: `${audioProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-slate-500">00:05</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">1.0x</span>
                    <Volume2 className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button className="px-5 py-2 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs shadow-xs transition">
                    View More Questions
                  </button>
                  <button className="px-5 py-2 rounded-full bg-[#fb923c] hover:bg-[#f97316] text-white font-bold text-xs shadow-xs transition">
                    Start Your Practice Test
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. EXAM STRUCTURE BREAKDOWN (Page 4)                                      */}
      {/* ========================================================================= */}
      <section id="exam-format" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Academic <span className="text-[#00c2cb]">Exam Structure Breakdown</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Understanding the complete breakdown of test parts and timings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* PART 1 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="bg-[#00c2cb] text-white p-4 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/80">PART 1</div>
                <h4 className="font-extrabold text-sm">Speaking & Writing</h4>
                <div className="text-[10px] text-white/90">• 76-84 minutes</div>
              </div>
              <div className="p-4 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-400 text-[10px] border-b pb-1">
                  <span>QUESTION</span>
                  <span>TASKS</span>
                </div>
                {[
                  ['Personal Introduction', '-'],
                  ['Read Aloud', '6-7'],
                  ['Repeat Sentence', '10-12'],
                  ['Describe Image', '5-6'],
                  ['Retell Lecture', '2-3'],
                  ['Answer Short Question', '5-6'],
                  ['Summarize Group Discussion', '2-3'],
                  ['Respond to a Situation', '2-3'],
                  ['Summarize Written Text', '2'],
                  ['Write Essay', '1']
                ].map(([name, tasks], idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-50 text-slate-700">
                    <span className="font-medium">{name}</span>
                    <span className="font-bold text-slate-900">{tasks}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="bg-[#00c2cb] text-white p-4 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/80">PART 2</div>
                <h4 className="font-extrabold text-sm">Reading</h4>
                <div className="text-[10px] text-white/90">• 23-30 Minutes</div>
              </div>
              <div className="p-4 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-400 text-[10px] border-b pb-1">
                  <span>QUESTION</span>
                  <span>TASKS</span>
                </div>
                {[
                  ['Fill in the Blanks (Dropdown)', '5-6'],
                  ['Multiple Choice, Multiple Answers', '2-3'],
                  ['Reorder Paragraph', '2-3'],
                  ['Fill in the Blanks (Drag & Drop)', '4-5'],
                  ['Multiple Choice, Single Answer', '2-3']
                ].map(([name, tasks], idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-50 text-slate-700">
                    <span className="font-medium">{name}</span>
                    <span className="font-bold text-slate-900">{tasks}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 3 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="bg-[#00c2cb] text-white p-4 text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/80">PART 3</div>
                <h4 className="font-extrabold text-sm">Listening</h4>
                <div className="text-[10px] text-white/90">• 29-36 minutes</div>
              </div>
              <div className="p-4 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-400 text-[10px] border-b pb-1">
                  <span>QUESTION</span>
                  <span>TASKS</span>
                </div>
                {[
                  ['Summarize Spoken Text', '1'],
                  ['Multiple Choice, Multiple Answers', '2-3'],
                  ['Fill in the Blanks (Type In)', '2-3'],
                  ['Multiple Choice, Single Answer', '2-3'],
                  ['Highlight Correct Summary', '2-3'],
                  ['Select Missing Word', '1-2'],
                  ['Highlight Incorrect Words', '2-3'],
                  ['Write from Dictation', '3-4']
                ].map(([name, tasks], idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-50 text-slate-700">
                    <span className="font-medium">{name}</span>
                    <span className="font-bold text-slate-900">{tasks}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. QUESTION WEIGHTAGE TABLE (Page 5)                                      */}
      {/* ========================================================================= */}
      <section id="weightage" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Academic Test Format <span className="text-[#00c2cb]">& Question Weightage</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Understanding how each question type affects score calculations helps test takers target practice on high-yield tasks.
            </p>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden max-w-5xl mx-auto">
            
            {/* Top Table Banner */}
            <div className="bg-[#00c2cb] text-white p-4 sm:p-5">
              <h3 className="font-black text-base sm:text-lg">PTE Academic Marks Distribution</h3>
              <p className="text-xs text-white/90">Complete overview of all question types and scoring contributions</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-black uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">QUESTION TYPE</th>
                    <th className="py-3 px-3 text-center">QUESTIONS</th>
                    <th className="py-3 px-3 text-center">OVERALL</th>
                    <th className="py-3 px-3 text-center">SPEAKING</th>
                    <th className="py-3 px-3 text-center">LISTENING</th>
                    <th className="py-3 px-3 text-center">READING</th>
                    <th className="py-3 px-3 text-center">WRITING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {weightageRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-2.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <span>{row.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-600">{row.count}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1e293b] text-white font-extrabold text-[10px]">
                          {row.overall}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {row.speaking !== '-' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-200 text-orange-900 font-bold text-[10px]">
                            {row.speaking}
                          </span>
                        ) : <span className="text-slate-300">-</span>}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {row.listening !== '-' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-200 text-sky-900 font-bold text-[10px]">
                            {row.listening}
                          </span>
                        ) : <span className="text-slate-300">-</span>}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {row.reading !== '-' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                            {row.reading}
                          </span>
                        ) : <span className="text-slate-300">-</span>}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {row.writing !== '-' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-200 text-cyan-900 font-bold text-[10px]">
                            {row.writing}
                          </span>
                        ) : <span className="text-slate-300">-</span>}
                      </td>
                    </tr>
                  ))}

                  {/* Totals Row */}
                  <tr className="bg-slate-50 font-black text-slate-900">
                    <td className="py-3 px-4 uppercase text-[10px] tracking-wider">TOTALS</td>
                    <td className="py-3 px-3 text-center">-</td>
                    <td className="py-3 px-3 text-center">100%</td>
                    <td className="py-3 px-3 text-center">100%</td>
                    <td className="py-3 px-3 text-center">100%</td>
                    <td className="py-3 px-3 text-center">100%</td>
                    <td className="py-3 px-3 text-center">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note & CTA Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] leading-relaxed flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <strong>ⓘ Note:</strong> Percentages indicate proportional contribution towards respective skill scores based on standard scoring guidelines.
              </div>
              <a
                href="#practice-test"
                className="px-6 py-2 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-xs shrink-0 cursor-pointer"
              >
                Train with Real Exam Logic
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. WHICH ENGLISH TEST SHOULD YOU CHOOSE? (Page 5 & 6)                   */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Which English Test Should <span className="text-[#00c2cb]">You Choose?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Choosing the right test depends on your study plans, visa criteria, and test format preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: 'Australia PR / Work', rec: 'PTE Academic / IELTS General', why: 'DOHA-approved, practical English focus', icon: '🇦🇺' },
              { title: 'Study Abroad', rec: 'PTE Academic / IELTS General', why: 'Recognized by universities worldwide', icon: '🎓' },
              { title: 'Australian Citizenship', rec: 'PTE Academic / IELTS General', why: 'Designed for everyday communication', icon: '🏛️' },
              { title: 'Fast Results Needed', rec: 'PTE Academic / IELTS General', why: 'AI-based scoring delivered in 48 hours', icon: '⚡' },
              { title: 'Prefer Human Examiner', rec: 'PTE Academic / IELTS General', why: 'Speaking done face-to-face with examiner', icon: '🗣️' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                <div className="text-xl">{item.icon}</div>
                <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                <div className="text-[10px] text-slate-400 font-bold uppercase">RECOMMENDED</div>
                <div className="text-xs font-black text-[#00c2cb]">{item.rec}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase pt-1">WHY?</div>
                <p className="text-xs text-slate-600">{item.why}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. ALIGNMENT WITH IELTS & CEFR (Page 6)                                  */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Alignment between <span className="text-[#00c2cb]">PTE Academic and IELTS/CEFR Scoring</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Official score concordance between PTE Academic score scale and IELTS Band scores.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
            
            {/* Toggle Pills */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setScoreScaleType('ielts')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
                  scoreScaleType === 'ielts' ? 'bg-[#00c2cb] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                IELTS Score
              </button>
              <button
                onClick={() => setScoreScaleType('cefr')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition ${
                  scoreScaleType === 'cefr' ? 'bg-[#00c2cb] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                CEFR Score
              </button>
            </div>

            {/* Band Selector */}
            <div className="text-center space-y-2">
              <div className="text-xs font-extrabold text-slate-800">Select Target IELTS Score</div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {['9', '8.5', '8', '7.5', '7', '6.5', '6', '5.5', '5', '4.5'].map((band) => (
                  <button
                    key={band}
                    onClick={() => setSelectedBand(band)}
                    className={`w-9 h-9 rounded-full text-xs font-black transition ${
                      selectedBand === band
                        ? 'bg-[#00c2cb] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>

            {/* Score Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { title: 'Overall Score', val: activeScores.overall, color: 'bg-blue-600' },
                { title: 'Listening', val: activeScores.listening, color: 'bg-sky-500' },
                { title: 'Reading', val: activeScores.reading, color: 'bg-emerald-500' },
                { title: 'Speaking', val: activeScores.speaking, color: 'bg-orange-500' },
                { title: 'Writing', val: activeScores.writing, color: 'bg-cyan-500' }
              ].map((card, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 text-center space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">{card.title}</div>
                  <div className="text-xl font-black text-slate-900">{card.val}</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className={`h-full ${card.color} w-3/4 rounded-full`}></div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. COUNTRIES RECOGNIZING PTE SCORES (Page 6 & 7)                         */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Top 8 Countries Recognizing <span className="text-[#00c2cb]">PTE Scores</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-normal">
              Accepted worldwide by universities, professional licensing bodies, and immigration authorities.
            </p>
          </div>

          {/* 9 Country Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                code: 'AU',
                name: 'Australia',
                tags: 'Study | Work | PR | Professional Registration',
                points: [
                  'DHA accepts PTE Academic for all visa classes including permanent residency.',
                  'All major Australian universities recognize PTE scores.',
                  'Professional boards like AHPRA, CPA, and Engineers Australia accept PTE.'
                ]
              },
              {
                code: 'NZ',
                name: 'New Zealand',
                tags: 'Study | Work | Immigration',
                points: [
                  'Accepted by Immigration New Zealand (INZ) for all visa categories.',
                  'Recognized by all state universities including Auckland and Victoria.',
                  'Typical score requirements range between 58-65.'
                ]
              },
              {
                code: 'CA',
                name: 'Canada',
                tags: 'Study | SDS Direct Stream',
                points: [
                  'Approved by IRCC for SDS accelerated student permits.',
                  'Recognized by 90%+ Canadian universities including UBC and Toronto.',
                  'For permanent residency applications, PTE Core is utilized.'
                ]
              },
              {
                code: 'GB',
                name: 'United Kingdom',
                tags: 'Study | Work | UKVI',
                points: [
                  'Approved by the UK Home Office for Student and Skilled Worker visas.',
                  'Recognized by leading institutions including Oxford, UCL, and Manchester.',
                  'Both PTE Academic and UKVI variants are valid.'
                ]
              },
              {
                code: 'US',
                name: 'United States',
                tags: 'Study | University Admissions',
                points: [
                  'Accepted by 1,200+ American universities including Harvard, Yale, and NYU.',
                  'Accepted as a versatile alternative to TOEFL and IELTS.'
                ]
              },
              {
                code: 'IE',
                name: 'Ireland',
                tags: 'Study | Work | Immigration',
                points: [
                  'Recognized across all Irish universities like Trinity College Dublin.',
                  'Fully valid for Irish employment and student visa pathways.'
                ]
              },
              {
                code: 'DE',
                name: 'Germany',
                tags: 'Study | International Degrees',
                points: [
                  'Accepted by German technical universities for English-taught master and bachelor degrees.'
                ]
              },
              {
                code: 'SG',
                name: 'Singapore',
                tags: 'Study | Professional Licensing',
                points: [
                  'Recognized by NUS, NTU, and corporate licensing bodies across Singapore.'
                ]
              },
              {
                code: '🌐',
                name: 'Other Countries',
                tags: 'UAE, Malaysia, South Africa & More',
                points: [
                  'Accepted by higher education institutions in UAE, Malaysia, Hong Kong, and South Africa.'
                ]
              }
            ].map((c, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-black text-base text-slate-900">{c.code}</span>
                  <h4 className="font-extrabold text-base text-slate-900">{c.name}</h4>
                </div>
                <div className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full inline-block">
                  {c.tags}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 pt-2">
                  {c.points.map((pt, pIdx) => (
                    <li key={pIdx}>• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Dream Country Banner */}
          <div className="rounded-3xl bg-slate-900 text-white p-8 text-center space-y-3">
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to Apply to <span className="text-[#00c2cb]">Your Dream Country?</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto font-normal">
              Whether you are aiming for student visas, PR points, or career mobility, start practicing with NinetyPTE today.
            </p>
            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-block px-7 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-slate-100 transition active:scale-95"
              >
                Create Free Account
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. WHY NINETYPTE IS THE BEST CHOICE & TESTIMONIALS (Page 7 & 8)         */}
      {/* ========================================================================= */}
      <section id="why-us" className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why NinetyPTE is the Best Choice for your <span className="text-[#00c2cb]">PTE Academic Preparation</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Train on authentic exam-style tasks, monitor your progress with diagnostic AI insights, and achieve your goal faster.
            </p>
          </div>

          {/* 9 Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Full mock tests with Pearson-like interface', desc: 'Practice speaking, writing, reading, and listening under authentic exam timing.' },
              { title: 'Smart question bank', desc: '20,000+ updated practice questions classified by module and difficulty.' },
              { title: 'AI scoring and instant feedback', desc: 'Detailed diagnostics for pronunciation, fluency, grammar, vocabulary, and content.' },
              { title: 'Section-wise drills', desc: 'Focused drills for high-yield questions like Repeat Sentence and Read Aloud.' },
              { title: 'AI feedback', desc: 'Receive real-time automated scoring and actionable tips for score improvement.' },
              { title: 'Error analytics', desc: 'Detect hesitation patterns, spelling errors, and keyword omissions instantly.' },
              { title: 'Personalised study paths', desc: 'Tailored daily recommendations calibrated to your target score (65+, 79+, or 90).' },
              { title: 'Progress dashboard', desc: 'Track your performance milestones and exam readiness across all modules.' },
              { title: 'Mobile and desktop access', desc: 'Practice anywhere with cloud synchronization between web and mobile devices.' }
            ].map((f, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900">{f.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonial Cards */}
          <div className="space-y-6 pt-4">
            <div className="text-center">
              <h3 className="text-xl font-black text-slate-900">Testimonial</h3>
              <p className="text-xs text-slate-500">Stories from Our Users Worldwide</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Natalie García', location: 'Canada', text: 'I wanted to express my heartfelt gratitude for the tremendous support this platform provided in my PTE preparation. Thanks to NinetyPTE, I achieved a 90 in all modules!' },
                { name: 'John Toby', location: 'Nigeria', text: 'This app is incredible for PTE preparation. The AI scoring and mock test simulations gave me the exact confidence needed for test day.' },
                { name: 'Khushboo Chowdhury', location: 'India', text: 'NinetyPTE practice questions and mock tests are exceptional. The automated scoring helped me refine my pronunciation and oral fluency.' }
              ].map((rev, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-full h-36 bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl flex items-center justify-center text-white relative">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed pt-2">"{rev.text}"</p>
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900">{rev.name}</div>
                    <div className="text-[10px] text-slate-400">{rev.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closer Than You Think Banner */}
          <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50/50 p-8 text-center space-y-4 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Your Target Score Is <span className="text-[#00c2cb]">Closer Than You Think</span>
            </h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              With 20,000+ practice questions, AI-powered diagnostic insights, and real exam simulations — success is just consistent practice away.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
              <span>✔ 20,000+ Questions</span>
              <span>✔ AI + Human Scoring</span>
              <span>✔ Real Exam Sims</span>
            </div>
            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-block px-7 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95"
              >
                Create Free Account & Begin Practice
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. FAQS & ENQUIRY FORM (Page 9)                                          */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* FAQ Accordions */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900 text-center">
              <span className="text-[#00c2cb]">PTE Academic</span> – Frequently Asked Questions
            </h3>

            {[
              {
                q: 'How is PTE Academic different from PTE Core or PTE Academic UKVI?',
                a: 'PTE Academic is designed primarily for international study and global skilled immigration. PTE Academic UKVI contains an official UK Home Office reference code for UK visa processing. PTE Core is tailored specifically for Canadian immigration and citizenship.'
              },
              {
                q: 'What is the exam format of the PTE Academic?',
                a: 'The examination is 100% computer-based, taking approximately 2 hours and 15 minutes. It evaluates Speaking, Writing, Reading, and Listening using integrated tasks.'
              },
              {
                q: 'How much does the PTE Academic exam cost?',
                a: 'Pricing varies by country. Through NinetyPTE, you can book discounted exam voucher packages that offer significant savings over standard test fees.'
              },
              {
                q: 'Can I reschedule or cancel my PTE Academic exam?',
                a: 'Yes, Pearson allows test appointments to be rescheduled or cancelled via the Pearson candidate portal according to their standard policy timelines.'
              },
              {
                q: 'What ID do I need on PTE test day?',
                a: 'A valid, undamaged passport is the universal identification requirement for taking the test at an authorized test center.'
              },
              {
                q: 'Is there a minimum score requirement for the PTE Academic exam?',
                a: 'Score requirements depend on your intended university or visa category. Typical university bachelor degrees require 58-65, while skilled migration points often target 79+.'
              },
              {
                q: 'Can I simulate real PTE test conditions on NinetyPTE?',
                a: 'Yes! NinetyPTE provides full-length scored mock tests with exact countdown timers, authentic question interfaces, and automated diagnostic scorecards.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4.5 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Split: Ready to Start + Enquiry Form */}
          <div id="enquiry-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto pt-6">
            
            {/* Left Prompt Column */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-3xl font-black text-slate-900 leading-tight">
                Ready to start your <br />
                <span className="text-[#00c2cb]">preparation?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Practice real exam-style questions, take scored mock tests, and track your progress with instant AI feedback designed to help you improve faster and achieve your target score with confidence.
              </p>
              <div className="space-y-2 text-xs font-bold text-slate-700 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#00c2cb]">✔</span>
                  <span>AI Scoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00c2cb]">✔</span>
                  <span>Real Exam Qs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00c2cb]">✔</span>
                  <span>24/7 Support</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-block px-7 py-2.5 rounded-full bg-[#1e293b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-md transition"
                >
                  Start Now
                </Link>
              </div>
            </div>

            {/* Right Enquiry Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              <h4 className="font-extrabold text-base text-slate-900 mb-4">Enquiry Form</h4>
              
              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-cyan-50 border border-cyan-200 text-center space-y-2">
                  <div className="text-2xl">🎉</div>
                  <h5 className="font-black text-slate-900 text-sm">Enquiry Received!</h5>
                  <p className="text-xs text-slate-600">
                    Thank you for reaching out. A NinetyPTE academic consultant will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name*</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Institute Name*</label>
                      <input
                        type="text"
                        required
                        placeholder="University / Organization"
                        value={formData.instituteName}
                        onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Id*</label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={formData.emailId}
                        onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Country*</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 bg-white"
                      >
                        <option value="Pakistan">Pakistan (PK)</option>
                        <option value="Australia">Australia (AU)</option>
                        <option value="India">India (IN)</option>
                        <option value="United Kingdom">United Kingdom (UK)</option>
                        <option value="Canada">Canada (CA)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-600 flex items-center">
                        🇵🇰 +92
                      </span>
                      <input
                        type="tel"
                        placeholder="300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Message*</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Your questions or target score..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500"
                    ></textarea>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-[#1e293b] hover:bg-slate-900 text-white font-extrabold text-xs shadow-md transition active:scale-95 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
