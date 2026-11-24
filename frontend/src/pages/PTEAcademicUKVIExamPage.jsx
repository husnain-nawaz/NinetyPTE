import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  ChevronDown, 
  ArrowRight, 
  Check, 
  Globe, 
  ShieldCheck, 
  BookOpen, 
  HelpCircle,
  Volume2,
  Mic,
  Layers,
  Zap,
  Headphones,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export default function PTEAcademicUKVIExamPage() {
  // Navigation & UI States
  const [activeCompareTab, setActiveCompareTab] = useState('ielts-ukvi');
  const [expandPteMore, setExpandPteMore] = useState(false);
  const [expandIeltsMore, setExpandIeltsMore] = useState(false);
  const [activeQuestionTab, setActiveQuestionTab] = useState('situation');
  const [alignmentMode, setAlignmentMode] = useState('ielts'); // 'ielts' | 'cefr'
  const [selectedIeltsBand, setSelectedIeltsBand] = useState('7.5');
  const [openFaq, setOpenFaq] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    instituteName: '',
    email: '',
    country: 'United Kingdom',
    phoneCode: '+92',
    phoneNumber: '',
    message: ''
  });

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Comparison Tabs Data (Page 2)
  const comparisonData = {
    'ielts-ukvi': {
      title: 'IELTS for UKVI Academic',
      tag: 'UK higher education visa requirement',
      ukviAccepted: 'Yes',
      typicalTakers: 'Students; some professionals needing a 4-skill SELT',
      purpose: 'Used where a UKVI SELT is required for Student visa or other routes requiring 4 skills at a specific CEFR level',
      testSession: 'Single booking: Speaking may be same day or nearby date depending on centre',
      contentType: 'Academic, 4 skills',
      accents: 'Multiple native/global English accents',
      deliveryMode: 'Paper-based or computer-based, depending on centre',
      duration: 'About 2 hours 45 minutes total, plus speaking slot',
      sections: 'Listening, Reading, Writing, Speaking',
      difficulty: 'Moderate-High',
      moreInfo: 'Scored by certified human examiners for speaking and writing. Scoring is on a 0-9 band scale. Results typically published in 3 to 14 days depending on paper or computer test.'
    },
    'toefl-ibt': {
      title: 'TOEFL iBT',
      tag: 'US & Global Academic Acceptance',
      ukviAccepted: 'Select direct HEP routes only (Not direct SELT list)',
      typicalTakers: 'International university applicants targeting global undergraduate & graduate degrees',
      purpose: 'Academic English assessment for degree-level studies and scholarships',
      testSession: 'Single session computer delivery',
      contentType: 'Academic lectures, university discussions, 4 skills',
      accents: 'North American, British, Australian accents',
      deliveryMode: 'Computer-based at certified test centers or Home Edition',
      duration: 'Approximately 2 hours',
      sections: 'Reading, Listening, Speaking, Writing',
      difficulty: 'Moderate-High',
      moreInfo: 'Scored from 0 to 120 (30 points per section). Not a UK Home Office SELT for below-degree visas, but widely used for direct degree admissions.'
    },
    'languagecert': {
      title: 'LANGUAGECERT Academic SELT',
      tag: 'UK Home Office Approved Alternative',
      ukviAccepted: 'Yes',
      typicalTakers: 'Students and skilled migrants seeking flexible UKVI testing slots',
      purpose: 'Approved SELT test for UK student, skilled worker, and health visas',
      testSession: 'Separate or combined written & spoken components',
      contentType: 'Task-based everyday and academic communication',
      accents: 'International and British accents',
      deliveryMode: 'Computer-based at approved SELT test centers',
      duration: 'Approx. 2 hours 15 minutes',
      sections: 'Listening, Reading, Writing, Speaking',
      difficulty: 'Moderate',
      moreInfo: 'Delivered at designated SELT centres with distinct booking options for written and spoken exams.'
    },
    'ielts-general': {
      title: 'IELTS for UKVI General Training',
      tag: 'Work, Migration & Below Degree Level',
      ukviAccepted: 'Yes',
      typicalTakers: 'Work visa applicants, trainees, and migrants below degree level',
      purpose: 'Used for UK Skilled Worker, Health and Care Worker, and vocational courses',
      testSession: 'Single booking with face-to-face speaking test',
      contentType: 'Workplace and everyday social English',
      accents: 'Standard native English accents',
      deliveryMode: 'Paper or computer delivery',
      duration: 'About 2 hours 45 minutes total',
      sections: 'Listening, Reading, Writing, Speaking',
      difficulty: 'Moderate',
      moreInfo: 'Features non-academic general reading and letter writing tasks suited for workplace contexts.'
    }
  };

  // Alignment Matrix Data (Page 6)
  const ieltsAlignments = {
    '9': { overall: '86 - 90', l: '89 - 90', r: '88 - 90', s: '88 - 90', w: '90' },
    '8.5': { overall: '83 - 85', l: '84 - 88', r: '83 - 87', s: '83 - 87', w: '86 - 89' },
    '8': { overall: '79 - 82', l: '79 - 83', r: '78 - 82', s: '78 - 82', w: '81 - 85' },
    '7.5': { overall: '73 - 78', l: '74 - 78', r: '73 - 77', s: '73 - 77', w: '74 - 80' },
    '7': { overall: '65 - 72', l: '66 - 73', r: '65 - 72', s: '65 - 72', w: '65 - 73' },
    '6.5': { overall: '58 - 64', l: '58 - 65', r: '58 - 64', s: '58 - 64', w: '58 - 64' },
    '6': { overall: '50 - 57', l: '47 - 57', r: '48 - 57', s: '50 - 57', w: '50 - 57' },
    '5.5': { overall: '42 - 49', l: '35 - 46', r: '36 - 47', s: '42 - 49', w: '39 - 49' },
    '5': { overall: '36 - 41', l: '29 - 34', r: '29 - 35', s: '29 - 41', w: '29 - 38' },
    '4.5': { overall: '24 - 30', l: '26 - 32', r: '29 - 35', s: '14 - 23', w: '17 - 28' }
  };

  const cefrAlignments = {
    'C2': { label: 'Mastery / Near Native', score: '85 - 90', ieltsEquiv: '8.5 - 9.0' },
    'C1': { label: 'Effective Operational Proficiency', score: '76 - 84', ieltsEquiv: '7.0 - 8.0' },
    'B2': { label: 'Vantage / Upper Intermediate', score: '59 - 75', ieltsEquiv: '5.5 - 6.5' },
    'B1': { label: 'Threshold / Intermediate (Skilled Worker)', score: '43 - 58', ieltsEquiv: '4.0 - 5.0' },
    'A2': { label: 'Waystage / Elementary', score: '30 - 42', ieltsEquiv: '3.0 - 3.5' }
  };

  // Exam Weightage Table Data (Page 4)
  const weightageRows = [
    { type: 'Read Aloud', count: '6-7', overall: '4%', s: '9%', l: '-', r: '-', w: '-' },
    { type: 'Repeat Sentence', count: '10-12', overall: '7%', s: '16%', l: '17%', r: '-', w: '-' },
    { type: 'Describe Image', count: '5-6', overall: '15%', s: '31%', l: '-', r: '-', w: '-' },
    { type: 'Retell Lecture', count: '2-3', overall: '6%', s: '13%', l: '13%', r: '-', w: '-' },
    { type: 'Answer Short Question', count: '5-6', overall: '2%', s: '-', l: '4%', r: '-', w: '-' },
    { type: 'Summarize Group Discussion', count: '2-3', overall: '9%', s: '19%', l: '20%', r: '-', w: '-' },
    { type: 'Respond to a Situation', count: '2-3', overall: '6%', s: '13%', l: '-', r: '-', w: '-' },
    { type: 'Summarize Written Text', count: '2', overall: '7%', s: '-', l: '-', r: '23%', w: '28%' },
    { type: 'Write Essay', count: '1', overall: '7%', s: '-', l: '-', r: '-', w: '31%' },
    { type: 'Fill in the Blanks (Dropdown)', count: '5-6', overall: '7%', s: '-', l: '-', r: '25%', w: '-' },
    { type: 'Multiple Choice, Multiple Answers (R)', count: '2-3', overall: '1%', s: '-', l: '-', r: '5%', w: '-' },
    { type: 'Reorder Paragraph', count: '2-3', overall: '3%', s: '-', l: '-', r: '9%', w: '-' },
    { type: 'Fill in the Blanks (Drag and Drop)', count: '4-5', overall: '6%', s: '-', l: '-', r: '20%', w: '-' },
    { type: 'Multiple Choice, Single Answer (R)', count: '2-3', overall: '<1%', s: '-', l: '-', r: '3%', w: '-' },
    { type: 'Summarize Spoken Text', count: '1', overall: '4%', s: '-', l: '10%', r: '-', w: '18%' },
    { type: 'Multiple Choice, Multiple Answers (L)', count: '2-3', overall: '1%', s: '-', l: '3%', r: '-', w: '-' },
    { type: 'Fill in the Blanks (Type In)', count: '2-3', overall: '3%', s: '-', l: '8%', r: '-', w: '-' },
    { type: 'Highlight Correct Summary', count: '2-3', overall: '<1%', s: '-', l: '2%', r: '3%', w: '-' },
    { type: 'Multiple Choice, Single Answer (L)', count: '2-3', overall: '<1%', s: '-', l: '2%', r: '-', w: '-' },
    { type: 'Select Missing Word', count: '1-2', overall: '1%', s: '-', l: '1%', r: '-', w: '-' },
    { type: 'Highlight Incorrect Words', count: '2-3', overall: '4%', s: '-', l: '8%', r: '13%', w: '-' },
    { type: 'Write From Dictation', count: '3-4', overall: '5%', s: '-', l: '13%', r: '-', w: '23%' }
  ];

  // FAQs (Page 6)
  const faqs = [
    {
      q: 'What is the PTE Academic UKVI Exam?',
      a: 'PTE Academic UKVI is a Secure English Language Test (SELT) approved by the UK Home Office for visa applications to work, study, or live in the UK. It is 100% identical to the standard PTE Academic in test structure, scoring, and questions, but includes a SELT Unique Reference Number (URN) required by UK Visas and Immigration (UKVI).'
    },
    {
      q: 'How is the PTE Academic UKVI different from PTE Core?',
      a: 'PTE Academic UKVI is designed specifically for UK study and work visas assessing academic and formal English. In contrast, PTE Core is designed for Canadian immigration (IRCC) assessing non-academic, everyday vocational language skills.'
    },
    {
      q: 'What are the modules in the PTE Academic UKVI Exam?',
      a: 'The exam assesses four core communicative skills structured into three main parts: Part 1: Speaking & Writing (76–84 minutes), Part 2: Reading (23–30 minutes), and Part 3: Listening (29–36 minutes).'
    },
    {
      q: 'What is the total duration of the PTE Academic UKVI Exam?',
      a: 'The total duration of the examination is approximately 2 hours and 15 minutes, administered in a single uninterrupted computer session without mandatory breaks.'
    },
    {
      q: 'How is the PTE Academic UKVI Exam scored?',
      a: 'Scores are generated objectively using Pearson’s patented artificial intelligence scoring engine, calibrated against millions of speech and writing data points. The score ranges on a granular scale of 10 to 90 points.'
    },
    {
      q: 'How soon can I get the PTE Academic UKVI results?',
      a: 'Results are typically published within 48 hours, and guaranteed within 5 business days of completing the test. Candidates can verify and share their digital score report with UKVI directly through their Pearson online portal.'
    },
    {
      q: 'What is the exam format of the PTE Academic UKVI?',
      a: 'It is a 100% computer-based test conducted at approved official Pearson Test Centres with biometric check-in, individual testing carrels, and noise-cancelling microphone headsets.'
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        instituteName: '',
        email: '',
        country: 'United Kingdom',
        phoneCode: '+92',
        phoneNumber: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative selection:bg-cyan-500 selection:text-white">
      
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

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
            <span>What is PTE Academic UKVI</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                All about the <br />
                <span className="text-cyan-500">PTE Academic UKVI Exam</span>
              </h1>

              <p className="text-base sm:text-lg font-semibold text-slate-600">
                The Fast and Trusted English Test for Study & Migration in the UK
              </p>

              {/* Informational Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-l-4 border-cyan-500 pl-3">
                  <span>What is PTE Academic UKVI</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  PTE Academic UKVI is a UK-recognized English language proficiency test developed by Pearson, designed to assess the academic English skills required for below-degree-level education and UK work visas.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The test evaluates real-life academic communication through <strong>Speaking, Writing, Reading</strong>, and <strong>Listening</strong>, and is fully computer-based with <strong>AI-powered scoring with human evaluation, ensuring fast, accurate, and unbiased results</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  PTE Academic UKVI is accepted by colleges and the UK visa department, including for student visas and work visas pathways. Results are typically available within 48 hours, making it one of the fastest English-language tests.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-3 rounded-xl bg-[#14324f] hover:bg-[#0c2338] text-white font-black text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Start Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => scrollToAnchor('format')}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-sm shadow-2xs transition inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                  <span>Watch Intro</span>
                </button>
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700 aspect-4/3 flex items-center justify-center">
                {/* Visual UK Background with Students */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00c2cb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Floating Badge Top Left */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Globe className="w-4 h-4 text-cyan-500" />
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">ACCEPTED BY</span>
                    <span>Colleges & Immigration</span>
                  </div>
                </div>

                {/* Floating Badge Top Right */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-center">
                  <span className="text-xl font-black text-slate-900 block leading-tight">90</span>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">POINTS MAX</span>
                </div>

                {/* Play Graphic Center */}
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-white flex items-center justify-center mx-auto shadow-xl hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <div className="text-white space-y-1">
                    <span className="text-sm font-extrabold block">PTE Academic UKVI Masterclass</span>
                    <span className="text-xs text-slate-300">Format & Strategy Walkthrough</span>
                  </div>
                </div>

                {/* Floating Badge Bottom Right */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <GraduationCap className="w-4 h-4 text-amber-500" />
                  <span>Study Abroad</span>
                </div>
              </div>
            </div>

          </div>

          {/* Anchor Navigation Pills (Page 1) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-12 border-t border-slate-100 mt-12">
            <button
              onClick={() => scrollToAnchor('comparison')}
              className="px-4 py-2 rounded-full border border-cyan-400 text-cyan-700 bg-cyan-50/50 hover:bg-cyan-100 text-xs font-bold transition"
            >
              Comparison
            </button>
            <button
              onClick={() => scrollToAnchor('format')}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-cyan-400 hover:text-cyan-700 text-xs font-bold transition"
            >
              Exam Format
            </button>
            <button
              onClick={() => scrollToAnchor('weightage')}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-cyan-400 hover:text-cyan-700 text-xs font-bold transition"
            >
              Question Weightage
            </button>
            <button
              onClick={() => scrollToAnchor('practice-test')}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-cyan-400 hover:text-cyan-700 text-xs font-bold transition"
            >
              Practice Test
            </button>
            <button
              onClick={() => scrollToAnchor('why-ninety-pte')}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:border-cyan-400 hover:text-cyan-700 text-xs font-bold transition"
            >
              Why NinetyPTE
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SIDE-BY-SIDE: PTE Academic vs PTE Academic UKVI (Page 1)               */}
      {/* ========================================================================= */}
      <section id="comparison" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 2 Numbered Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">PTE Academic</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Designed for students and professionals who plan to study, work, or migrate internationally.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">PTE Academic UKVI</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Suitable for candidates applying for UK visas, including study and work routes that require a Secure English Language Test (SELT). This will be similar to PTE Academic, with just the addition of Unique Reference Number (URN), which is useful for applying UK visa application.
                </p>
              </div>
            </div>

          </div>

          {/* Right: Detailed Comparison Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              PTE Academic <span className="text-slate-400 font-medium">vs</span>{' '}
              <span className="text-cyan-500">PTE Academic UKVI</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              PTE Academic UKVI is accepted by below-graduate level colleges, professional bodies, and the UK government, offering a fast, reliable, and Fully computer-based English language assessment with AI-powered scoring and human analysis.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              PTE Academic is accepted by universities, colleges, professional bodies, and government authorities worldwide, offering a fast, reliable, and Fully computer-based English language test with AI-powered scoring, involving human analysis to reduce bias.
            </p>

            <div className="pt-2">
              <Link
                to="/mock-tests"
                className="px-6 py-3 rounded-xl bg-[#14324f] hover:bg-[#0c2338] text-white font-bold text-xs uppercase tracking-wider transition shadow inline-flex items-center gap-2"
              >
                <span>Practice PTE Academic UKVI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. IMPORTANT THINGS ABOUT FORMAT (3 CARDS) (Page 1)                       */}
      {/* ========================================================================= */}
      <section id="format" className="py-12 bg-slate-100/60 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Important things you need to know about the <br />
              <span className="text-cyan-600">PTE Academic UKVI Exam Format</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">AI-Based Scoring System</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                PTE Academic UKVI uses AI-based scoring, delivering fast, accurate, and unbiased results with human evaluation ensuring fair assessment of real-world English skills.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Fixed Test Duration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                PTE Academic UKVI is a time regulated test with a total duration of approximately two hours fifteen minutes (maximum) covering three main sections: Speaking & Writing, Reading, and Listening.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Official Test Centres</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                PTE Academic UKVI must be taken at approved UKVI Official Pearson Test Centres at an official Pearson Test Centre, ensuring a secure and standardised testing environment.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MID-PAGE FREE MOCK CTA (Page 2)                                        */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#14324f] rounded-3xl p-8 sm:p-10 text-white shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00c2cb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black">
              To learn more about the PTE Academic UKVI Exam format
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100">
              Try a FREE mock of PTE Academic UKVI Test on NinetyPTE
            </p>
            <div className="pt-2">
              <Link
                to="/mock-tests"
                className="px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg inline-flex items-center gap-2"
              >
                <span>Start a Mock Test Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PTE ACADEMIC UKVI vs IELTS vs TOEFL (Page 2)                           */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            PTE Academic UKVI <span className="text-slate-400">vs</span>{' '}
            <span className="text-cyan-600">IELTS</span>{' '}
            <span className="text-slate-400">vs</span>{' '}
            <span className="text-blue-600">TOEFL</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select an exam below to see a detailed breakdown of how it stacks up against the PTE Academic UKVI.
          </p>
        </div>

        {/* Comparison Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCompareTab('ielts-ukvi')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeCompareTab === 'ielts-ukvi'
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            IELTS for UKVI Academic
          </button>
          <button
            onClick={() => setActiveCompareTab('toefl-ibt')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeCompareTab === 'toefl-ibt'
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            TOEFL iBT
          </button>
          <button
            onClick={() => setActiveCompareTab('languagecert')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeCompareTab === 'languagecert'
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            LANGUAGECERT Academic SELT
          </button>
          <button
            onClick={() => setActiveCompareTab('ielts-general')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeCompareTab === 'ielts-general'
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            IELTS for UKVI General Training
          </button>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Card 1: PTE Academic UKVI (Fixed) */}
          <div className="bg-white rounded-3xl border-2 border-cyan-500 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-white text-cyan-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <h3 className="text-xl font-black">PTE Academic UKVI</h3>
              <p className="text-xs text-cyan-100">UK student/work visa approval</p>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-700">
              
              {/* Essentials & Logistics */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  ⓘ ESSENTIALS & LOGISTICS
                </span>
                <div>
                  <span className="text-slate-400 block text-[11px]">UKVI ACCEPTED?</span>
                  <span className="font-bold text-slate-900">Yes</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">TYPICAL TEST TAKERS</span>
                  <span className="font-semibold text-slate-800">Students; skilled workers; professionals needing 4-skill SELT</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">PURPOSE / ACCEPTANCE</span>
                  <span className="font-semibold text-slate-800">Accepted for study and relevant work routes needing a 4-skill SELT</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">TEST SESSION</span>
                  <span className="font-semibold text-slate-800">Single session</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">CONTENT TYPE</span>
                  <span className="font-semibold text-slate-800">Academic, integrated tasks across 4 skills</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">ACCENTS RECOGNISED</span>
                  <span className="font-semibold text-slate-800">International English accents</span>
                </div>
              </div>

              {/* Test Format & Experience */}
              <div className="space-y-3 pb-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  🗎 TEST FORMAT & EXPERIENCE
                </span>
                <div>
                  <span className="text-slate-400 block text-[11px]">DELIVERY MODE</span>
                  <span className="font-semibold text-slate-800">Computer-based only at approved centres</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">TEST DURATION</span>
                  <span className="font-semibold text-slate-800">About 2 hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">SECTIONS</span>
                  <span className="font-semibold text-slate-800">Speaking & Writing, Reading, Listening</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">DIFFICULTY LEVEL</span>
                  <span className="font-bold text-slate-900">Moderate-High</span>
                </div>
              </div>

              {/* Expandable Learn More */}
              {expandPteMore && (
                <div className="pt-2 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed animate-fadeIn">
                  PTE Academic UKVI uses automated AI scoring for speech recognition and essay writing, delivering unbiased results directly to Pearson and UKVI databases within 48 hours.
                </div>
              )}

              <button
                onClick={() => setExpandPteMore(!expandPteMore)}
                className="text-cyan-600 font-bold hover:underline flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>{expandPteMore ? 'Show Less' : 'Learn More'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandPteMore ? 'rotate-180' : ''}`} />
              </button>

            </div>
          </div>

          {/* Card 2: Selected Competitor */}
          <div className="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
            <div className="bg-[#14324f] p-6 text-white text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <h3 className="text-xl font-black">{comparisonData[activeCompareTab].title}</h3>
              <p className="text-xs text-slate-300">{comparisonData[activeCompareTab].tag}</p>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-700">
              
              {/* Essentials & Logistics */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  ⓘ ESSENTIALS & LOGISTICS
                </span>
                <div>
                  <span className="text-slate-400 block text-[11px]">UKVI ACCEPTED?</span>
                  <span className="font-bold text-slate-900">{comparisonData[activeCompareTab].ukviAccepted}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">TYPICAL TEST TAKERS</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].typicalTakers}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">PURPOSE / ACCEPTANCE</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].purpose}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">TEST SESSION</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].testSession}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">CONTENT TYPE</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].contentType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">ACCENTS RECOGNISED</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].accents}</span>
                </div>
              </div>

              {/* Test Format & Experience */}
              <div className="space-y-3 pb-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  🗎 TEST FORMAT & EXPERIENCE
                </span>
                <div>
                  <span className="text-slate-400 block text-[11px]">DELIVERY MODE</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].deliveryMode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">TEST DURATION</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">SECTIONS</span>
                  <span className="font-semibold text-slate-800">{comparisonData[activeCompareTab].sections}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">DIFFICULTY LEVEL</span>
                  <span className="font-bold text-slate-900">{comparisonData[activeCompareTab].difficulty}</span>
                </div>
              </div>

              {/* Expandable Learn More */}
              {expandIeltsMore && (
                <div className="pt-2 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed animate-fadeIn">
                  {comparisonData[activeCompareTab].moreInfo}
                </div>
              )}

              <button
                onClick={() => setExpandIeltsMore(!expandIeltsMore)}
                className="text-slate-900 font-bold hover:underline flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>{expandIeltsMore ? 'Show Less' : 'Learn More'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandIeltsMore ? 'rotate-180' : ''}`} />
              </button>

            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. WHICH ENGLISH TEST SHOULD YOU CHOOSE? (Page 3)                        */}
      {/* ========================================================================= */}
      <section className="py-14 bg-slate-100/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Which English Test Should <span className="text-cyan-600">You Choose?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Different English tests serve different purposes. Whether you are applying for university, a visa, or professional registration, the comparison below will help you choose the most suitable English test based on acceptance, results speed, and test format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
                <GraduationCap className="w-5 h-5" />
                <span>Study Abroad</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">RECOMMENDED</span>
                <span className="font-extrabold text-slate-900 text-xs">PTE Academic / IELTS Academic / TOEFL iBT</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">WHY?</span>
                <p className="text-xs text-slate-600">Accepted by universities and colleges worldwide for higher education admissions.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>UK Visa Applications</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">RECOMMENDED</span>
                <span className="font-extrabold text-slate-900 text-xs">PTE Academic UKVI, PTE Academic, IELTS Academic, IELTS UKVI</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">WHY?</span>
                <p className="text-xs text-slate-600">Approved as a SELT (Secure English Language Test) for UK study and work visa routes.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
                <Layers className="w-5 h-5" />
                <span>Prefer Computer-Based Testing</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">RECOMMENDED</span>
                <span className="font-extrabold text-slate-900 text-xs">PTE Academic / PTE Academic UKVI</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">WHY?</span>
                <p className="text-xs text-slate-600">Fully computer-based test with unbiased AI scoring and no human examiner interaction.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
                <Zap className="w-5 h-5" />
                <span>Fast Results Needed</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">RECOMMENDED</span>
                <span className="font-extrabold text-slate-900 text-xs">PTE Academic / PTE Academic UKVI</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">WHY?</span>
                <p className="text-xs text-slate-600">AI-based scoring with results typically available within 48 hours.</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
                <Headphones className="w-5 h-5" />
                <span>Prefer Human Examiner</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">RECOMMENDED</span>
                <span className="font-extrabold text-slate-900 text-xs">IELTS / CELPIP</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">WHY?</span>
                <p className="text-xs text-slate-600">Speaking test conducted face-to-face with a certified examiner.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EXAM STRUCTURE BREAKDOWN (3 COLUMNS) (Page 3 & 4)                      */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            PTE Academic UKVI <span className="text-cyan-600">Exam Structure Breakdown</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Understanding the PTE Academic UKVI Exam Structure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Part 1: Speaking & Writing */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-cyan-500 p-3.5 text-center text-white font-extrabold text-xs uppercase tracking-wider">
              PART 1
            </div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-cyan-600" />
                <h4 className="font-bold text-slate-900 text-sm">Speaking & Writing</h4>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">76–84 minutes</span>
            </div>

            <div className="p-4 divide-y divide-slate-100 text-xs">
              <div className="py-2 flex justify-between font-bold text-slate-400 uppercase text-[10px]">
                <span>QUESTION</span>
                <span>TASKS</span>
              </div>
              <div className="py-2 flex justify-between text-slate-700"><span>Personal Introduction</span><span className="font-bold">-</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Read Aloud</span><span className="font-bold">6-7</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Repeat Sentence</span><span className="font-bold">10-12</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Describe Image</span><span className="font-bold">5-6</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Re-Tell Lecture</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Answer Short Question</span><span className="font-bold">5-6</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Summarize Group Discussion</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Respond to a Situation</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Summarize Written Text</span><span className="font-bold">2</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Write Essay</span><span className="font-bold">1</span></div>
            </div>
          </div>

          {/* Part 2: Reading */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-cyan-500 p-3.5 text-center text-white font-extrabold text-xs uppercase tracking-wider">
              PART 2
            </div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-600" />
                <h4 className="font-bold text-slate-900 text-sm">Reading</h4>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">23–30 Minutes</span>
            </div>

            <div className="p-4 divide-y divide-slate-100 text-xs">
              <div className="py-2 flex justify-between font-bold text-slate-400 uppercase text-[10px]">
                <span>QUESTION</span>
                <span>TASKS</span>
              </div>
              <div className="py-2 flex justify-between text-slate-700"><span>Fill in the Blanks (Dropdown)</span><span className="font-bold">5-6</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Multiple Choice, Multiple Answers</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Reorder Paragraph</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Fill in the Blanks (Drag and Drop)</span><span className="font-bold">4-5</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Multiple Choice, Single Answer</span><span className="font-bold">2-3</span></div>
            </div>
          </div>

          {/* Part 3: Listening */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-cyan-500 p-3.5 text-center text-white font-extrabold text-xs uppercase tracking-wider">
              PART 3
            </div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-600" />
                <h4 className="font-bold text-slate-900 text-sm">Listening</h4>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">29–36 minutes</span>
            </div>

            <div className="p-4 divide-y divide-slate-100 text-xs">
              <div className="py-2 flex justify-between font-bold text-slate-400 uppercase text-[10px]">
                <span>QUESTION</span>
                <span>TASKS</span>
              </div>
              <div className="py-2 flex justify-between text-slate-700"><span>Summarize Spoken Text</span><span className="font-bold">1</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Multiple Choice, Multiple Answers</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Fill in the Blanks (Type In)</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Multiple Choice, Single Answer</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Highlight Correct Summary</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Select Missing Word</span><span className="font-bold">1-2</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Highlight Incorrect Words</span><span className="font-bold">2-3</span></div>
              <div className="py-2 flex justify-between text-slate-700"><span>Write from Dictation</span><span className="font-bold">3-4</span></div>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. QUESTION WEIGHTAGE TABLE (Page 4)                                      */}
      {/* ========================================================================= */}
      <section id="weightage" className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              PTE Academic: <span className="text-cyan-600">Exam Format and Question Weightage</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Understanding how each question type affects score calculations can help test takers better interpret their scores. The table below shows how much each question type contributes to the overall as well as individual module score on an average test.
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <div className="bg-cyan-500 p-4 text-white text-center">
              <span className="text-sm font-black block">PTE Academic UKVI Exam Structure Marks Distribution</span>
              <span className="text-xs text-cyan-100">Complete overview of all question types and scoring</span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">QUESTION TYPE</th>
                  <th className="py-3 px-4 text-center">QUESTIONS</th>
                  <th className="py-3 px-4 text-center">OVERALL</th>
                  <th className="py-3 px-4 text-center">SPEAKING</th>
                  <th className="py-3 px-4 text-center">LISTENING</th>
                  <th className="py-3 px-4 text-center">READING</th>
                  <th className="py-3 px-4 text-center">WRITING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {weightageRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-4 font-semibold text-slate-900">{row.type}</td>
                    <td className="py-2.5 px-4 text-center font-bold text-slate-700">{row.count}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px] inline-block min-w-8">
                        {row.overall}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {row.s !== '-' ? (
                        <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold text-[10px] inline-block min-w-8">
                          {row.s}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {row.l !== '-' ? (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] inline-block min-w-8">
                          {row.l}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {row.r !== '-' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] inline-block min-w-8">
                          {row.r}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {row.w !== '-' ? (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 font-bold text-[10px] inline-block min-w-8">
                          {row.w}
                        </span>
                      ) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-cyan-500 text-white font-black text-xs">
                <tr>
                  <td className="py-3 px-4 font-black">TOTALS</td>
                  <td className="py-3 px-4 text-center">-</td>
                  <td className="py-3 px-4 text-center">100%</td>
                  <td className="py-3 px-4 text-center">100%</td>
                  <td className="py-3 px-4 text-center">100%</td>
                  <td className="py-3 px-4 text-center">100%</td>
                  <td className="py-3 px-4 text-center">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
            <strong>ⓘ Note:</strong> The distribution shown above is approximate and based on Pearson's official weighting guidelines. Percentages represent the contribution of each question type to the respective skill score. The total possible score is 360 points, which is then scaled to the 90-point PTE Academic score range.
          </div>

          <div className="text-center pt-2">
            <Link
              to="/mock-tests"
              className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-black text-xs uppercase tracking-wider transition shadow inline-flex items-center gap-2"
            >
              <span>Train with Real Exam Logic</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PRACTICE QUESTIONS SIMULATOR (Page 5)                                  */}
      {/* ========================================================================= */}
      <section id="practice-test" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            New Practice Questions for <span className="text-cyan-600">PTE Academic UKVI</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Discover format variations, word count changes, and preparation time differences in the PTE Academic UKVI Exam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Question Types Selector */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">QUESTION TYPES</span>
            
            <button
              onClick={() => setActiveQuestionTab('situation')}
              className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                activeQuestionTab === 'situation'
                  ? 'bg-orange-50 border-orange-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Respond to a Situation</h4>
                <span className="text-xs text-orange-600 font-medium">Speaking • 10s Prep</span>
              </div>
              <Mic className="w-5 h-5 text-orange-500" />
            </button>

            <button
              onClick={() => setActiveQuestionTab('discussion')}
              className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                activeQuestionTab === 'discussion'
                  ? 'bg-blue-50 border-blue-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Summarize Group Discussion (SGD)</h4>
                <span className="text-xs text-blue-600 font-medium">Speaking • 10s Prep</span>
              </div>
              <Headphones className="w-5 h-5 text-blue-500" />
            </button>
          </div>

          {/* Right: Interactive Audio Simulator Box */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-slate-900 font-black text-base">
              <span className="text-orange-500">🗎</span>
              <span>{activeQuestionTab === 'situation' ? 'Respond to a Situation' : 'Summarize Group Discussion'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeQuestionTab === 'situation'
                ? 'This question requires you to listen to and read a scenario. You will have 10 seconds to prepare your answer. After you hear a beep, you will have 40 seconds to respond. Please give a full and clear answer.'
                : 'Listen to three students discussing a campus topic. You will have 10 seconds to prepare, followed by 40 seconds to summarize the divergent viewpoints expressed.'}
            </p>

            {/* Prompt Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">SAMPLE QUESTION 1:</span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                {activeQuestionTab === 'situation'
                  ? 'What do you say to your RA?'
                  : 'Campus Sustainability Initiative Debate'}
              </h4>
              <p className="text-xs text-slate-600 italic">
                {activeQuestionTab === 'situation'
                  ? 'Discuss the process of resolving a conflict with a co-worker or friend in a constructive manner.'
                  : 'Identify each participant’s recommendation on introducing renewable energy to the university dormitory.'}
              </p>

              {/* Fake Audio Player Bar */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-xs hover:bg-cyan-600 transition"
                >
                  <Play className={`w-3.5 h-3.5 fill-white ml-0.5 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
                </button>
                <span className="text-xs font-mono text-slate-500">00:00 / 00:05</span>
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-cyan-500 transition-all ${isPlayingAudio ? 'w-2/3' : 'w-0'}`}></div>
                </div>
                <span className="text-xs font-bold text-slate-600">1.0x</span>
                <Volume2 className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition">
                View More Questions
              </button>
              <Link
                to="/mock-tests"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider transition shadow"
              >
                Start Your Practice Test
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 10. WHY NINETYPTE IS THE SMART CHOICE (Page 5)                            */}
      {/* ========================================================================= */}
      <section id="why-ninety-pte" className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Values */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Why NinetyPTE is the Smart Choice <br />
                for <span className="text-cyan-600">Your PTE Preparation</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600">
                To achieve your target PTE score, you need focused and <strong>strategic PTE practice</strong>.
              </p>

              <div className="space-y-4 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">
                    One of the largest collections of practice questions, covering all PTE modules
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">
                    Full-length and sectional PTE mock tests that closely simulate real exam conditions
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">
                    Fast and accurate AI scoring feedback to identify strengths and improve weak areas quickly
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700">
                    Smart tools including personalized study plans, templates, strategy videos, and more
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/auth?mode=signup"
                  className="px-8 py-3.5 rounded-full bg-[#14324f] hover:bg-[#0c2338] text-white font-black text-xs uppercase tracking-wider transition shadow-md inline-block"
                >
                  Join Now
                </Link>
              </div>
            </div>

            {/* Right Stat Grid in Circular Orbit (Page 5) */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-6">
              
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-cyan-200/80 relative flex items-center justify-center">
                
                {/* Center / Stat 1: 95% AI Accuracy */}
                <div className="absolute -top-4 sm:-top-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-md text-center min-w-36">
                  <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto mb-1 text-xs">✓</span>
                  <span className="text-xl font-black text-slate-900 block">95%</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">AI ACCURACY PERCENTAGE</span>
                </div>

                {/* Left Stat 2: 7M+ Clicks */}
                <div className="absolute -left-6 sm:-left-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-md text-center min-w-36">
                  <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto mb-1 text-xs">⚡</span>
                  <span className="text-xl font-black text-slate-900 block">7M+</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">AI CLICKS</span>
                </div>

                {/* Right Stat 3: 20,000+ Total Questions */}
                <div className="absolute -right-6 sm:-right-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-md text-center min-w-36">
                  <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto mb-1 text-xs">?</span>
                  <span className="text-xl font-black text-slate-900 block">20,000+</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">TOTAL QUESTIONS</span>
                </div>

                {/* Bottom Stat 4: 3.0M+ Users */}
                <div className="absolute -bottom-4 sm:-bottom-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-md text-center min-w-36">
                  <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto mb-1 text-xs">👥</span>
                  <span className="text-xl font-black text-slate-900 block">3.0M+</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">USERS</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. ALIGNMENT WITH IELTS/CEFR SCORING (Page 6)                            */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Alignment between <span className="text-cyan-600">PTE Academic UKVI</span> and IELTS/CEFR Scoring
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Based on research and empirical studies, Pearson has produced an alignment table showing the relationship between the PTE Academic UKVI test scores and the IELTS equivalency and Common European Framework of Reference for Languages (CEFR Levels).
          </p>
        </div>

        {/* Mode Toggle: IELTS Score vs CEFR Level */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-slate-200/80 rounded-full border border-slate-300 text-xs font-bold">
            <button
              onClick={() => setAlignmentMode('ielts')}
              className={`px-6 py-2 rounded-full transition ${
                alignmentMode === 'ielts'
                  ? 'bg-cyan-500 text-white shadow-xs font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              IELTS Score
            </button>
            <button
              onClick={() => setAlignmentMode('cefr')}
              className={`px-6 py-2 rounded-full transition ${
                alignmentMode === 'cefr'
                  ? 'bg-cyan-500 text-white shadow-xs font-black'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              CEFR Level
            </button>
          </div>
        </div>

        {/* IELTS Score Selector Container */}
        {alignmentMode === 'ielts' ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 text-sm">Select Target IELTS Score</h4>
                <p className="text-xs text-slate-500">Click on IELTS Band Score to see required PTE Academic UKVI scores</p>
              </div>

              {/* Band Score Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {Object.keys(ieltsAlignments).map((band) => (
                  <button
                    key={band}
                    onClick={() => setSelectedIeltsBand(band)}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition ${
                      selectedIeltsBand === band
                        ? 'bg-cyan-500 text-white shadow-xs scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>

            {/* Score Display Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Score</span>
                <span className="text-xl sm:text-2xl font-black text-blue-700 block">
                  {ieltsAlignments[selectedIeltsBand].overall}
                </span>
                <span className="text-[10px] text-slate-400">Score Range</span>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Listening</span>
                <span className="text-xl sm:text-2xl font-black text-cyan-700 block">
                  {ieltsAlignments[selectedIeltsBand].l}
                </span>
                <span className="text-[10px] text-slate-400">Score Range</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Reading</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-700 block">
                  {ieltsAlignments[selectedIeltsBand].r}
                </span>
                <span className="text-[10px] text-slate-400">Score Range</span>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/80 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Speaking</span>
                <span className="text-xl sm:text-2xl font-black text-orange-700 block">
                  {ieltsAlignments[selectedIeltsBand].s}
                </span>
                <span className="text-[10px] text-slate-400">Score Range</span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 text-center space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Writing</span>
                <span className="text-xl sm:text-2xl font-black text-purple-700 block">
                  {ieltsAlignments[selectedIeltsBand].w}
                </span>
                <span className="text-[10px] text-slate-400">Score Range</span>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Common European Framework (CEFR) Equivalency</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(cefrAlignments).map(([lvl, data]) => (
                <div key={lvl} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-cyan-600 text-base">{lvl}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">IELTS {data.ieltsEquiv}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">{data.label}</span>
                  <div className="text-xs text-slate-600">
                    PTE Score: <strong className="text-slate-900 font-extrabold">{data.score}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
          <strong>ⓘ Important Information:</strong> Alignment tables will be reviewed periodically and updated if required. Please refer to the official UK immigration or university websites for the most up-to-date information on PTE Academic UKVI score requirements for your visa type.
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 12. FREQUENTLY ASKED QUESTIONS (Page 6)                                  */}
      {/* ========================================================================= */}
      <section className="py-14 bg-slate-100/60 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              PTE Academic UKVI – <span className="text-cyan-600">Frequently Asked Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Get answers to all the frequently asked questions related to the PTE Academic UKVI exam variant.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-cyan-600 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-cyan-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-slate-50/50 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
      {/* 13. READY TO START & ENQUIRY FORM (Page 6 & 7)                            */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Callout */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Ready to start your <br />
              <span className="text-cyan-600">preparation?</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Practice real exam-style questions, take scored mock tests, and track your progress with instant AI feedback designed to help you improve faster and achieve your target score with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyan-500" /> AI Scoring</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyan-500" /> Real Exam Qs</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyan-500" /> 24/7 Support</span>
            </div>

            <div className="pt-2">
              <Link
                to="/mock-tests"
                className="px-8 py-3.5 rounded-full bg-[#14324f] hover:bg-[#0c2338] text-white font-black text-xs uppercase tracking-wider transition shadow-md inline-block"
              >
                Start Now
              </Link>
            </div>
          </div>

          {/* Right Enquiry Form Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <h3 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Enquiry Form
            </h3>

            {formSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-black text-base">Enquiry Received!</h4>
                <p className="text-xs">Our UK admissions and test specialists will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Institute Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="University"
                      value={formData.instituteName}
                      onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Id*</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country*</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 bg-white"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.phoneCode}
                      onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                      className="w-24 px-2.5 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 bg-white"
                    >
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+92">🇵🇰 +92</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+1">🇺🇸 +1</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter Your Phone Number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message*</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#14324f] hover:bg-[#0c2338] text-white font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                >
                  Submit
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
