import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  GraduationCap,
  Plane,
  Award,
  Briefcase,
  Target,
  Network,
  TrendingUp,
  XCircle,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck,
  FileText,
  Lightbulb,
  Check,
  Star
} from 'lucide-react';

export default function PTECoreScoreCalculatorPage() {
  // Interactive Calculator State
  const [testType, setTestType] = useState('core'); // 'core' | 'academic'
  const [targetClb, setTargetClb] = useState(7); // 5 | 6 | 7 | 8 | 9
  const [scores, setScores] = useState({
    speaking: '',
    writing: '',
    reading: '',
    listening: '',
    overall: ''
  });
  const [result, setResult] = useState(null);
  const [activeSubNav, setActiveSubNav] = useState('how-it-works');
  const [activeIntegratedTab, setActiveIntegratedTab] = useState('read-aloud');
  const [faqOpen, setFaqOpen] = useState({ 0: false });
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const toggleFaq = (idx) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Official Pearson PTE Core -> CLB Per-Skill Minimums & Lookup
  const clbRequirements = {
    10: { speaking: 89, writing: 90, reading: 88, listening: 89 },
    9: { speaking: 84, writing: 88, reading: 78, listening: 82 },
    8: { speaking: 76, writing: 79, reading: 69, listening: 71 },
    7: { speaking: 68, writing: 69, reading: 60, listening: 60 },
    6: { speaking: 59, writing: 60, reading: 51, listening: 50 },
    5: { speaking: 51, writing: 51, reading: 42, listening: 39 },
    4: { speaking: 42, writing: 41, reading: 33, listening: 28 },
    3: { speaking: 34, writing: 32, reading: 24, listening: 18 }
  };

  const getSkillClb = (skill, val) => {
    const n = Number(val);
    if (!n || n < 10) return 0;
    for (let lvl = 10; lvl >= 3; lvl--) {
      if (n >= clbRequirements[lvl][skill]) return lvl;
    }
    return 2; // Below CLB 3
  };

  const clbToIeltsApprox = {
    10: '9.0',
    9: '8.0',
    8: '7.0',
    7: '6.0 - 6.5',
    6: '5.5 - 6.0',
    5: '5.0 - 5.5',
    4: '4.0 - 5.0',
    3: '3.5 - 4.5',
    2: 'Below 4.0'
  };

  const clbToCefr = {
    10: 'C1 - C2',
    9: 'C1 - C2',
    8: 'B2 - C2',
    7: 'B2 - C1',
    6: 'B1 - B2',
    5: 'A2 - B2',
    4: 'A1 - B1',
    3: 'A2',
    2: 'A1'
  };

  const handleTargetClick = (lvl) => {
    setTargetClb(lvl);
  };

  const handleScoreChange = (field, raw) => {
    if (raw === '') {
      setScores((prev) => ({ ...prev, [field]: '' }));
      return;
    }
    const clean = Math.max(0, Math.min(90, Number(raw)));
    setScores((prev) => ({ ...prev, [field]: String(clean) }));
  };

  const handleConvert = () => {
    const s = Number(scores.speaking) || clbRequirements[targetClb].speaking;
    const w = Number(scores.writing) || clbRequirements[targetClb].writing;
    const r = Number(scores.reading) || clbRequirements[targetClb].reading;
    const l = Number(scores.listening) || clbRequirements[targetClb].listening;
    const computedOverall = scores.overall
      ? Number(scores.overall)
      : Math.round((s + w + r + l) / 4);

    // Populate inputs if they were left empty so users immediately see an example calculation
    if (!scores.speaking && !scores.writing && !scores.reading && !scores.listening) {
      setScores({
        speaking: String(s),
        writing: String(w),
        reading: String(r),
        listening: String(l),
        overall: String(computedOverall)
      });
    }

    const clbS = getSkillClb('speaking', s);
    const clbW = getSkillClb('writing', w);
    const clbR = getSkillClb('reading', r);
    const clbL = getSkillClb('listening', l);
    const effectiveClb = Math.min(clbS, clbW, clbR, clbL);

    setResult({
      skills: {
        speaking: { score: s, clb: clbS, needed: clbRequirements[targetClb].speaking },
        writing: { score: w, clb: clbW, needed: clbRequirements[targetClb].writing },
        reading: { score: r, clb: clbR, needed: clbRequirements[targetClb].reading },
        listening: { score: l, clb: clbL, needed: clbRequirements[targetClb].listening }
      },
      overall: computedOverall,
      effectiveClb,
      meetsTarget: effectiveClb >= targetClb,
      ieltsBand: clbToIeltsApprox[effectiveClb] || 'Below 4.0',
      cefr: clbToCefr[effectiveClb] || 'A1'
    });
  };

  // Integrated Scoring Interactive Widget Data (Page 4)
  const integratedTasks = {
    'read-aloud': {
      title: 'Read Aloud',
      icon: Headphones,
      contributions: [
        { skill: 'Reading', detail: 'Evaluates accurate recognition and comprehension of written words.', badgeColor: 'bg-blue-700', icon: Headphones },
        { skill: 'Speaking', detail: 'Scores oral pronunciation clarity and steady natural fluency.', badgeColor: 'bg-[#f0854d]', icon: Mic }
      ]
    },
    'summarize-written-text': {
      title: 'Summarize Written Text',
      icon: FileText,
      contributions: [
        { skill: 'Reading', detail: 'Assesses grasp of core passage ideas and textual vocabulary.', badgeColor: 'bg-emerald-600', icon: BookOpen },
        { skill: 'Writing', detail: 'Measures grammatical accuracy and 25–50 word Core summary precision.', badgeColor: 'bg-sky-600', icon: PenTool }
      ]
    },
    'repeat-sentence': {
      title: 'Repeat Sentence',
      icon: Mic,
      contributions: [
        { skill: 'Speaking', detail: 'Scores fluent spoken repetition, cadence, and vowel pronunciation.', badgeColor: 'bg-[#f0854d]', icon: Mic },
        { skill: 'Listening', detail: 'Evaluates exact auditory recall and content accuracy from one playback.', badgeColor: 'bg-blue-700', icon: Headphones }
      ]
    },
    'write-from-dictation': {
      title: 'Write From Dictation',
      icon: PenTool,
      contributions: [
        { skill: 'Listening', detail: 'Measures verbatim recognition of every spoken word in audio sequence.', badgeColor: 'bg-blue-700', icon: Headphones },
        { skill: 'Writing', detail: 'Grades exact spelling and punctuation accuracy of transcribed text.', badgeColor: 'bg-sky-600', icon: PenTool }
      ]
    }
  };

  const activeIntegrated = integratedTasks[activeIntegratedTab] || integratedTasks['read-aloud'];

  // Full PTE Core Question Distribution Table (Page 2 & 3)
  const distributionSections = [
    {
      section: 'Speaking & Writing',
      rows: [
        { type: 'Read Aloud', count: '6-7' },
        { type: 'Repeat Sentence', count: '10-12' },
        { type: 'Describe Image', count: '3-4' },
        { type: 'Respond to a Situation', count: '2-4' },
        { type: 'Answer Short Question', count: '5-6' },
        { type: 'Summarize Written Text', count: '1-2' },
        { type: 'Write Email', count: '2-3' }
      ]
    },
    {
      section: 'Reading',
      rows: [
        { type: 'Fill in the Blanks (Reading & Writing Drop-down)', count: '5-6' },
        { type: 'MCQ - Multiple', count: '1-2' },
        { type: 'Re-order Paragraph', count: '2-3' },
        { type: 'Fill in the Blanks (Drag & Drop)', count: '4-5' },
        { type: 'MCQ - Single', count: '1-2' }
      ]
    },
    {
      section: 'Listening',
      rows: [
        { type: 'Summarize Spoken Text', count: '1-2' },
        { type: 'MCQ - Multiple', count: '1-2' },
        { type: 'Fill in the Blanks', count: '2-3' },
        { type: 'MCQ - Single', count: '1-2' },
        { type: 'Select Missing Word', count: '1-2' },
        { type: 'Highlight Incorrect Words', count: '1-2' },
        { type: 'Write from Dictation', count: '3-4' }
      ]
    }
  ];

  // Official CLB Scale Cards Data (Page 4 & 5)
  const scoreScaleCards = [
    { clb: 'CLB 10', label: 'Expert', desc: 'Near-native proficiency', pte: '88-90', cefr: 'C1-C2', ielts: '9.0', icon: Award },
    { clb: 'CLB 9', label: 'Advanced', desc: 'Highly effective proficiency', pte: '78-89', cefr: 'C1-C2', ielts: '8.0', icon: TrendingUp },
    { clb: 'CLB 8', label: 'Competent', desc: 'Effective operational proficiency', pte: '69-87', cefr: 'B2-C2', ielts: '7.0', icon: FileText },
    { clb: 'CLB 7', label: 'Adequate', desc: 'Independent user', pte: '60-78', cefr: 'B2-C1', ielts: '6.0-6.5', icon: GraduationCap },
    { clb: 'CLB 6', label: 'Developing', desc: 'Upper basic user', pte: '50-68', cefr: 'B1-B2', ielts: '5.5-6.0', icon: GraduationCap },
    { clb: 'CLB 5', label: 'Intermediate', desc: 'Threshold competence', pte: '39-59', cefr: 'A2-B2', ielts: '5.0-5.5', icon: BookOpen },
    { clb: 'CLB 4', label: 'Basic', desc: 'Basic User', pte: '28-50', cefr: 'A1-B1', ielts: '4.0-5.0', icon: BookOpen }
  ];

  // Skill-by-Skill Concordance Matrix Data (Page 5 & 6)
  const fullConcordanceRows = [
    {
      clb: 'CLB 10',
      celpip: '10',
      cefr: 'C1-C2',
      skills: [
        { name: 'Listening', pte: '89-90', ielts: '8.5', ring: 'border-sky-300' },
        { name: 'Reading', pte: '88-90', ielts: '8.0', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '90', ielts: '7.5', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '89-90', ielts: '7.5', ring: 'border-orange-300' }
      ]
    },
    {
      clb: 'CLB 9',
      celpip: '9',
      cefr: 'C1',
      skills: [
        { name: 'Listening', pte: '82-88', ielts: '8.0', ring: 'border-sky-300' },
        { name: 'Reading', pte: '78-87', ielts: '7.0', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '88-89', ielts: '7.0', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '84-88', ielts: '7.0', ring: 'border-orange-300' }
      ]
    },
    {
      clb: 'CLB 8',
      celpip: '8',
      cefr: 'B2-C1',
      skills: [
        { name: 'Listening', pte: '71-81', ielts: '7.5', ring: 'border-sky-300' },
        { name: 'Reading', pte: '69-77', ielts: '6.5', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '79-87', ielts: '6.5', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '76-83', ielts: '6.5', ring: 'border-orange-300' }
      ]
    },
    {
      clb: 'CLB 7',
      celpip: '7',
      cefr: 'B2',
      skills: [
        { name: 'Listening', pte: '60-70', ielts: '6.0', ring: 'border-sky-300' },
        { name: 'Reading', pte: '60-68', ielts: '6.0', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '69-78', ielts: '6.0', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '68-75', ielts: '6.0', ring: 'border-orange-300' }
      ]
    },
    {
      clb: 'CLB 6',
      celpip: '6',
      cefr: 'B1-B2',
      skills: [
        { name: 'Listening', pte: '50-59', ielts: '5.5', ring: 'border-sky-300' },
        { name: 'Reading', pte: '51-59', ielts: '5.0', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '60-68', ielts: '5.5', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '59-67', ielts: '5.5', ring: 'border-orange-300' }
      ]
    },
    {
      clb: 'CLB 5',
      celpip: '5',
      cefr: 'B1',
      skills: [
        { name: 'Listening', pte: '39-49', ielts: '5.0', ring: 'border-sky-300' },
        { name: 'Reading', pte: '42-50', ielts: '4.0', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '51-59', ielts: '5.0', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '51-58', ielts: '5.0', ring: 'border-orange-300' }
      ]
    },
    {
      clb: 'CLB 4',
      celpip: '4',
      cefr: 'A2-B1',
      skills: [
        { name: 'Listening', pte: '28-38', ielts: '4.5', ring: 'border-sky-300' },
        { name: 'Reading', pte: '33-41', ielts: '3.5', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '41-50', ielts: '4.0', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '42-50', ielts: '4.0', ring: 'border-orange-300' }
      ]
    },
    {
      clb: 'CLB 3',
      celpip: '3',
      cefr: 'A2',
      skills: [
        { name: 'Listening', pte: '18-27', ielts: '4.0', ring: 'border-sky-300' },
        { name: 'Reading', pte: '24-32', ielts: '3.0', ring: 'border-emerald-300' },
        { name: 'Writing', pte: '32-40', ielts: '3.5', ring: 'border-purple-300' },
        { name: 'Speaking', pte: '34-41', ielts: '3.5', ring: 'border-orange-300' }
      ]
    }
  ];

  const faqs = [
    {
      q: 'How is the PTE Core test scored?',
      a: 'PTE Core uses a fully automated AI scoring engine on a 10 to 90 Global Scale of English. Each question type evaluates either single or integrated language skills (Speaking, Writing, Reading, and Listening).'
    },
    {
      q: 'Are human examiners involved in PTE Core scoring?',
      a: 'No human interviewers grade PTE Core speaking or writing responses directly. Automated algorithmic models score all 19 task types consistently without human fatigue or subjective bias.'
    },
    {
      q: 'How are different PTE Core question types scored?',
      a: 'Items like Read Aloud, Repeat Sentence, Summarize Written Text, and Write from Dictation use integrated partial-credit scoring that assigns points simultaneously to two different skills.'
    },
    {
      q: 'How can I understand the scoring criteria for each question type?',
      a: 'Pearson evaluates responses across traits such as Content Relevance, Oral Fluency, Pronunciation, Form, Grammar, and Vocabulary. Speaking fluency and clear articulation weigh heavily on final communicative scores.'
    },
    {
      q: 'When will I receive my PTE Core results?',
      a: 'Most candidates receive their official digital score report within 48 hours (two business days) of completing the examination.'
    },
    {
      q: 'What information is included in the PTE Core Score Report?',
      a: 'Your score report lists an Overall Score alongside four distinct Communicative Skill scores (Listening, Reading, Speaking, Writing) that IRCC maps directly against Canadian Language Benchmark (CLB) bands.'
    },
    {
      q: 'What is the Skills Profile, and does it provide personalized feedback?',
      a: 'The Skills Profile breaks down eight enabling and functional dimensions—like Open Response Speaking and Receptive Vocabulary—guiding learners toward specific focus drills before any retake.'
    }
  ];

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 7);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c5cd] selection:text-white pb-16">
      
      {/* Sticky Right-Edge Tab: "Practice Now" */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <Link
          to="/dashboard"
          className="bg-[#00c5cd] hover:bg-[#00b2ba] text-white px-3 py-6 rounded-l-xl font-bold text-xs shadow-xl transition-all flex flex-col items-center gap-1 group cursor-pointer"
          style={{ writingMode: 'vertical-rl' }}
          aria-label="Practice Now"
        >
          <span className="tracking-widest uppercase text-[11px] group-hover:tracking-wider transition-all">
            Practice Now
          </span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO & INTERACTIVE SCORE CALCULATOR WIDGET (Page 1 Layout)             */}
      {/* ========================================================================= */}
      <section className="pt-10 pb-10 bg-gradient-to-b from-slate-50/70 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Score Calculator</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              PTE Core Score Calculator. Enter your section scores to instantly see your CLB level and check your readiness for Canadian immigration.
            </p>
          </div>

          {/* Interactive Score Calculator Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
            
            {/* Step 1: Choose Your Test Type */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800 block">Step 1: Choose Your Test Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTestType('core')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 relative transition cursor-pointer ${
                    testType === 'core'
                      ? 'border-2 border-blue-500 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-white" />
                  </div>
                  <div className="pr-5">
                    <div className="text-xs font-bold text-slate-900">PTE Core</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      For select immigration streams (e.g., Canada PR/Work).
                    </p>
                  </div>
                  {testType === 'core' && (
                    <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setTestType('academic')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 relative transition cursor-pointer ${
                    testType === 'academic'
                      ? 'border-2 border-blue-500 bg-blue-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="pr-5">
                    <div className="text-xs font-bold text-slate-900">PTE Academic</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      For university admissions &amp; standard visa applications.
                    </p>
                  </div>
                  {testType === 'academic' && (
                    <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Step 2: Select Your Target Score (CLB 5 - CLB 9) */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800 block">
                {testType === 'core' ? 'Step 2: Select Your Target Score' : 'Step 2: Select Benchmark Target'}
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[5, 6, 7, 8, 9].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleTargetClick(lvl)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      targetClb === lvl
                        ? 'border-[#00c5cd] bg-cyan-50/60 text-[#00c5cd] shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    CLB {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Enter Your Section Scores (10 - 90) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 block">Step 3: Enter Your Section Scores (10 - 90)</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                {[
                  { key: 'speaking', letter: 'S', label: 'Speaking', bg: 'bg-[#f0854d]' },
                  { key: 'writing', letter: 'W', label: 'Writing', bg: 'bg-sky-400' },
                  { key: 'reading', letter: 'R', label: 'Reading', bg: 'bg-emerald-500' },
                  { key: 'listening', letter: 'L', label: 'Listening', bg: 'bg-[#1e3a8a]' },
                  { key: 'overall', letter: 'O', label: 'Overall Score', bg: 'bg-purple-400' }
                ].map((s) => (
                  <div key={s.key} className="space-y-1.5 flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-md ${s.bg} text-white font-black text-xs flex items-center justify-center shadow-2xs`}>
                      {s.letter}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">{s.label}</span>
                    <input
                      type="number"
                      min={10}
                      max={90}
                      placeholder="Enter Score"
                      value={scores[s.key]}
                      onChange={(e) => handleScoreChange(s.key, e.target.value)}
                      className="w-full py-2 px-2 rounded-lg bg-slate-100/80 border border-slate-200 text-center text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00c5cd] focus:bg-white transition"
                    />
                    <span className="text-[9px] text-slate-400">Valid range: 10 to 90</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleConvert}
                className="px-8 py-2.5 rounded-xl bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                Convert My Score
              </button>
            </div>

            {/* Dynamic Conversion Result Panel */}
            {result && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Calculated IRCC Express Entry Outcome
                    </div>
                    <div className="text-lg sm:text-xl font-black text-slate-900">
                      Effective CLB Level:{' '}
                      <span className="text-[#00c5cd]">
                        {result.effectiveClb >= 3 ? `CLB ${result.effectiveClb}` : 'Below CLB 3'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 font-bold text-slate-700">
                      IELTS Approx: {result.ieltsBand}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 font-bold text-slate-700">
                      CEFR: {result.cefr}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-bold ${
                        result.meetsTarget
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {result.meetsTarget ? `Meets Target CLB ${targetClb}` : `Below Target CLB ${targetClb}`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {Object.entries(result.skills).map(([name, info]) => {
                    const diff = info.score - info.needed;
                    return (
                      <div key={name} className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                        <div className="capitalize font-bold text-slate-800 flex items-center justify-between">
                          <span>{name}</span>
                          <span className="text-[#00c5cd] font-mono">
                            {info.clb >= 3 ? `CLB ${info.clb}` : '<3'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Score: <strong className="text-slate-800">{info.score}</strong> / Req: {info.needed}
                        </div>
                        <div className={`text-[10px] font-bold ${diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {diff >= 0 ? `+${diff} pts above target` : `${Math.abs(diff)} pts needed`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ANCHOR SUB-NAV BAR                                                     */}
      {/* ========================================================================= */}
      <div className="border-y border-slate-100 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          {[
            { id: 'how-it-works', label: 'How It Works', href: '#how-it-works' },
            { id: 'question-distribution', label: 'Question Distribution', href: '#question-distribution' },
            { id: 'exam-structure', label: 'Exam Structure', href: '#exam-structure' },
            { id: 'score-scale', label: 'PTE Score Scale', href: '#score-scale' },
            { id: 'score-comparison', label: 'Score Comparison', href: '#score-comparison' },
            { id: 'faqs', label: 'FAQs', href: '#faqs' }
          ].map((nav) => (
            <a
              key={nav.id}
              href={nav.href}
              onClick={() => setActiveSubNav(nav.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeSubNav === nav.id
                  ? 'border border-[#00c5cd] text-[#00c5cd] bg-cyan-50/40'
                  : 'text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              {nav.label}
            </a>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BENEFITS + DARK CTA BANNER (Page 1 Bottom Layout)                      */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Benefits of the <span className="text-[#00c5cd]">PTE Core Score Calculator</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
              Understand your strengths, focus on high-scoring tasks, and improve your PTE preparation with smarter strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Target,
                title: 'Estimate your overall PTE Core Score',
                desc: 'Get an accurate CLB prediction calibrated directly to your PTE Core practice performance.'
              },
              {
                icon: Network,
                title: 'See how one skill influences another',
                desc: 'Understand the integrated dual-skill scoring system powering PTE Core evaluations.'
              },
              {
                icon: TrendingUp,
                title: 'Identify high-impact question types',
                desc: 'Channel study time directly into question formats yielding major cross-skill points.'
              },
              {
                icon: XCircle,
                title: 'Avoid over-practicing low-return areas',
                desc: 'Save valuable days by concentrating strictly on tasks lifting your lowest CLB tier.'
              }
            ].map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 text-[#00c5cd] flex items-center justify-center shrink-0">
                  <b.icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-500 font-normal">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dark Navy Banner */}
          <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 sm:p-10 text-center space-y-4 text-white shadow-lg">
            <h3 className="text-xl sm:text-2xl font-black">
              Know Your Real PTE Core Score Before Test Day
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Practice with AI-scored mock tests that replicate the official <strong className="text-white">PTE Core exam</strong> and identify areas to strengthen.
            </p>
            <div>
              <Link
                to="/mock-tests"
                className="inline-block px-7 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-bold text-xs shadow-md transition"
              >
                Start PTE Core Mock Test
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS + WHY SCORING MATTERS (Page 2 Layout)                     */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How the <span className="text-[#00c5cd]">PTE Core Score Calculator Works</span>
              </h2>
              <p className="text-xs text-slate-500 font-normal">Four simple steps to understand your PTE Core score potential</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: 1, title: 'Enter recent practice or mock scores', sub: 'Input your latest performance data' },
                { num: 2, title: 'Instantly view an estimated score range', sub: 'Get immediate predictions' },
                { num: 3, title: 'Identify weak and strong areas', sub: 'See where you stand' },
                { num: 4, title: 'Adjust your preparation strategy', sub: 'Optimize your study plan' }
              ].map((step) => (
                <div key={step.num} className="space-y-2.5 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#00c5cd] text-white font-black text-sm flex items-center justify-center shadow-sm">
                    {step.num}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 max-w-[180px]">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 font-normal">{step.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Understanding Scoring Matters (Left Info + Right Dark Quote Box) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Why Understanding the <span className="text-[#00c5cd]">PTE Core Scoring Matters</span>
              </h3>
              <p className="text-xs font-bold text-slate-700">Your PTE Core directly affects:</p>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2.5"><GraduationCap className="w-4 h-4 text-[#00c5cd]" /> Express Entry and Provincial Nominee Program eligibility</li>
                <li className="flex items-center gap-2.5"><Plane className="w-4 h-4 text-[#00c5cd]" /> Canadian permanent residency and work permits</li>
                <li className="flex items-center gap-2.5"><Award className="w-4 h-4 text-[#00c5cd]" /> Canadian citizenship applications</li>
                <li className="flex items-center gap-2.5"><Briefcase className="w-4 h-4 text-[#00c5cd]" /> Your journey to working and building a future in Canada</li>
              </ul>

              <div className="bg-white border-l-4 border-[#00c5cd] p-4 rounded-r-xl shadow-2xs text-xs text-slate-600 leading-relaxed font-normal">
                Yet many students prepare hard without understanding how PTE Core scores map to Express Entry CRS benchmarks. That leads to wasted effort.
              </div>
              <p className="text-xs font-semibold text-slate-700">NinetyPTE changes that by explaining every rule clearly.</p>
            </div>

            <div className="lg:col-span-6 bg-[#1e3a8a] text-white p-7 sm:p-8 rounded-3xl shadow-lg space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Clarity, Logic, Transparency</span>
              </div>

              <div className="bg-white/10 border border-white/15 p-4 rounded-2xl text-sm font-semibold leading-relaxed">
                PTE Core is an IRCC trusted test that helps you prove your English Proficiency with Confidence.
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-slate-200 font-normal">If you&apos;re preparing for PTE, one question always comes first:</p>
                <div className="flex items-center gap-2 font-bold italic text-sm text-white">
                  <span className="w-1 h-4 bg-[#00c5cd] rounded-full" />
                  <span>&ldquo;What score will I get?&rdquo;</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                That&apos;s exactly where NinetyPTE&apos;s PTE Core Score Calculator helps — clearly, accurately, and without guesswork.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. QUESTIONS DISTRIBUTION TABLE (Page 2 & 3 Layout)                       */}
      {/* ========================================================================= */}
      <section id="question-distribution" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Questions Distribution</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              The chart below presents average item counts per question category in a standard PTE Core exam.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
            <div className="bg-[#00c5cd] text-white p-5">
              <h3 className="text-base font-bold">Exam Pattern for PTE Core</h3>
              <p className="text-[11px] opacity-90">Detailed section-wise questions distribution chart for PTE Core.</p>
            </div>

            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 py-3 px-4">
              <div className="col-span-3">Section</div>
              <div className="col-span-7">Question Type</div>
              <div className="col-span-2 text-right">Avg Qs</div>
            </div>

            <div className="divide-y divide-slate-200">
              {distributionSections.map((group) => (
                <div key={group.section} className="grid grid-cols-12 items-stretch">
                  <div className="col-span-3 bg-cyan-50/30 border-r border-slate-100 flex items-center justify-center p-3 font-bold text-xs text-slate-800 text-center">
                    {group.section}
                  </div>
                  <div className="col-span-9 divide-y divide-slate-100">
                    {group.rows.map((row) => (
                      <div key={row.type} className="grid grid-cols-9 items-center py-2.5 px-4 text-xs">
                        <div className="col-span-7 font-medium text-slate-800">{row.type}</div>
                        <div className="col-span-2 text-right">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[11px] font-bold">
                            {row.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-3 bg-[#00c5cd]" />
          </div>

          <div className="text-center pt-2">
            <Link
              to="/mock-tests"
              className="inline-block px-7 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-bold text-xs shadow-sm transition"
            >
              Start PTE Core Mock Test
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. EXAM STRUCTURE BREAKDOWN + INTEGRATED SCORING (Page 3 & 4 Layout)       */}
      {/* ========================================================================= */}
      <section id="exam-structure" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* 3-Column Exam Structure Breakdown */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                PTE Core <span className="text-[#00c5cd]">Exam Structure Breakdown</span>
              </h2>
              <p className="text-xs text-slate-500 font-normal">Understanding the PTE Core Exam Structure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Part 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="bg-[#00c5cd] text-white p-3.5 text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Part 1</span>
                </div>
                <div className="p-4 border-b border-slate-100 flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-[#00c5cd]" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Speaking &amp; Writing</div>
                    <div className="text-[10px] text-[#00c5cd]">• Time: 50-65 minutes</div>
                  </div>
                </div>
                <div className="p-4 divide-y divide-slate-100 text-xs">
                  {[
                    ['Personal Introduction', '-'],
                    ['Read Aloud', '6-7'],
                    ['Repeat Sentence', '10-12'],
                    ['Describe Image', '3-4'],
                    ['Respond to a Situation', '2-4'],
                    ['Answer Short Question', '5-6'],
                    ['Summarize Written Text', '1-2'],
                    ['Write Email', '2-3']
                  ].map(([q, c]) => (
                    <div key={q} className="py-2 flex items-center justify-between text-slate-700">
                      <span className="font-medium">{q}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="bg-[#00c5cd] text-white p-3.5 text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Part 2</span>
                </div>
                <div className="p-4 border-b border-slate-100 flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#00c5cd]" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Reading</div>
                    <div className="text-[10px] text-[#00c5cd]">• Time: 22-37 minutes</div>
                  </div>
                </div>
                <div className="p-4 divide-y divide-slate-100 text-xs">
                  {[
                    ['Reading & Writing: Fill in the Blanks', '5-6'],
                    ['Multiple Choice, Multiple Answers', '1-2'],
                    ['Reorder Paragraph', '2-3'],
                    ['Fill in the Blanks', '4-5'],
                    ['Multiple Choice, Single Answer', '1-2']
                  ].map(([q, c]) => (
                    <div key={q} className="py-2 flex items-center justify-between text-slate-700">
                      <span className="font-medium">{q}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="bg-[#00c5cd] text-white p-3.5 text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Part 3</span>
                </div>
                <div className="p-4 border-b border-slate-100 flex items-center gap-2.5">
                  <Headphones className="w-4 h-4 text-[#00c5cd]" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Listening</div>
                    <div className="text-[10px] text-[#00c5cd]">• Time: 22-37 minutes</div>
                  </div>
                </div>
                <div className="p-4 divide-y divide-slate-100 text-xs">
                  {[
                    ['Summarize Spoken Text', '1-2'],
                    ['Multiple Choice, Multiple Answers', '1-2'],
                    ['Fill in the Blanks', '2-3'],
                    ['Multiple Choice, Single Answer', '1-2'],
                    ['Select Missing Word', '1-2'],
                    ['Highlight Incorrect Words', '1-2'],
                    ['Write from Dictation', '3-4']
                  ].map(([q, c]) => (
                    <div key={q} className="py-2 flex items-center justify-between text-slate-700">
                      <span className="font-medium">{q}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What Is PTE Core Scoring? */}
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <h3 className="text-2xl font-black text-slate-900">
              What Is <span className="text-[#00c5cd]">PTE Core Scoring</span>?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              PTE Core uses computer-based AI evaluation assessing accuracy, fluency, pronunciation, and comprehension across all four domains.
            </p>
            <div className="bg-cyan-50/40 border border-cyan-200 rounded-2xl p-5 text-left space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00c5cd]" />
                <span>Key Facts You Should Know</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00c5cd]" /> Score range: 10–90</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00c5cd]" /> Automated scoring with AI precision</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00c5cd]" /> Separate calculation per skill</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00c5cd]" /> Accepted by IRCC for Canadian PR &amp; citizenship</div>
              </div>
            </div>
          </div>

          {/* Interactive Integrated Tasks Scoring Widget (Page 3 bottom & Page 4 top) */}
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">
                How <span className="text-[#00c5cd]">PTE Core Scores Are Calculated</span><br />(Simple Explanation)?
              </h3>
              <p className="text-xs text-slate-500 font-normal">PTE does not average marks; it uses integrated multi-skill scoring.</p>
            </div>

            {/* 4 Interactive Task Tabs */}
            <div className="flex items-center justify-center gap-4 border-b border-slate-200 flex-wrap">
              {[
                { id: 'read-aloud', label: 'Read Aloud' },
                { id: 'summarize-written-text', label: 'Summarize Written Text' },
                { id: 'repeat-sentence', label: 'Repeat Sentence' },
                { id: 'write-from-dictation', label: 'Write From Dictation' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIntegratedTab(t.id)}
                  className={`pb-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                    activeIntegratedTab === t.id
                      ? 'border-[#00c5cd] text-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Interactive Skill Output Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
              <div className="md:col-span-5 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 text-[#f0854d] flex items-center justify-center">
                  <activeIntegrated.icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-bold text-slate-900">{activeIntegrated.title}</span>
              </div>
              <div className="md:col-span-7 space-y-3">
                {activeIntegrated.contributions.map((c, ci) => (
                  <div key={ci} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${c.badgeColor} text-white flex items-center justify-center shrink-0`}>
                      <c.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{c.skill}</div>
                      <p className="text-[11px] text-slate-600">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left shadow-2xs">
              <div className="md:col-span-7 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Integrated-tasks Scoring</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Each integrated task feeds points into multiple communicative competencies simultaneously.
                </p>
                <div className="text-[11px] font-bold text-slate-800 pt-1">Why This Matters:</div>
                <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4">
                  <li>Weak performance in one domain can lower another</li>
                  <li>Strong Repeat Sentence lifting boosts both Speaking and Listening</li>
                  <li>Balanced training yields consistent CLB levels</li>
                </ul>
              </div>
              <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-3 text-center">
                <span className="px-4 py-1.5 rounded-lg bg-[#00c5cd] text-white font-bold text-xs">
                  Repeat Sentence
                </span>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#f0854d] text-white font-bold text-[11px]">Speaking</span>
                  <span className="px-3 py-1 rounded-lg bg-[#1e3a8a] text-white font-bold text-[11px]">Listening</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-600 border border-[#00c5cd]/40 px-3 py-1 rounded-full bg-white">
                  One task &rarr; Multiple skill contributions
                </div>
              </div>
            </div>

          </div>

          {/* Ready Banner */}
          <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 text-center space-y-4 text-white shadow-lg max-w-5xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black">Ready to Improve Your PTE Core Score?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Practice with full-length AI-scored mock tests and build skills to reach your target CLB.
            </p>
            <div>
              <Link
                to="/pte-core-speaking-practice"
                className="inline-block px-7 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition"
              >
                Start Free PTE Core Practice
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OFFICIAL PTE CORE SCORE SCALE & CONVERSION TABLES (Page 4, 5 & 6)      */}
      {/* ========================================================================= */}
      <section id="score-scale" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* 7 Score Scale Cards */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What is the Official PTE Core Score Scale &amp; Interpretation{' '}
                <span className="text-[#00c5cd]">compared with IELTS and CEFR Levels</span>?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                PTE Core scores map cleanly onto CEFR and IRCC Canadian immigration CLB bands.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {scoreScaleCards.map((c) => (
                <div key={c.clb} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <c.icon className="w-5 h-5 text-[#00c5cd]" />
                  <div>
                    <div className="text-sm font-black text-[#00c5cd]">{c.clb}</div>
                    <div className="text-xs font-bold text-slate-900">{c.label}</div>
                    <p className="text-[11px] text-slate-500">{c.desc}</p>
                  </div>
                  <div className="grid grid-cols-3 pt-2 border-t border-slate-100 text-[10px]">
                    <div>
                      <div className="text-slate-400">PTE Core</div>
                      <div className="font-bold text-slate-800">{c.pte}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">CEFR</div>
                      <div className="font-bold text-slate-800">{c.cefr}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">IELTS</div>
                      <div className="font-bold text-slate-800">{c.ielts}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#1e3a8a] text-white p-4 rounded-2xl flex items-center gap-3 text-xs shadow-sm">
              <Award className="w-5 h-5 text-[#00c5cd] shrink-0" />
              <div>
                <strong className="text-white">Aim for CLB 10 to maximize your Canadian PR chances:</strong>{' '}
                <span className="text-slate-200 font-normal">
                  Scores in the CLB 9–10 bracket unlock maximum Express Entry language CRS points for IRCC applications.
                </span>
              </div>
            </div>
          </div>

          {/* PTE Core to IELTS / CLB Conversion Summary Table */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black text-slate-900">
                PTE Core to <span className="text-[#00c5cd]">IELTS / CLB Conversion Table</span>
              </h3>
              <p className="text-xs text-slate-500 font-normal">Professional reference table for PTE Core to IELTS GT equivalency</p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
              <div className="grid grid-cols-3 bg-[#00c5cd] text-white text-xs font-bold p-3.5 uppercase tracking-wider">
                <div>CLB Level</div>
                <div className="text-center">PTE Core Score</div>
                <div className="text-right">Approx. IELTS Band (GT)</div>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {[
                  ['10', 'CLB 10', '89-90', '9.0'],
                  ['9', 'CLB 9', '78-88', '8.0'],
                  ['8', 'CLB 8', '69-77', '7.0'],
                  ['7', 'CLB 7', '60-68', '6.0–6.5'],
                  ['6', 'CLB 6', '51-59', '5.5–6.0'],
                  ['5', 'CLB 5', '42-50', '5.0–5.5'],
                  ['4', 'CLB 4', '33-41', '4.0–5.0'],
                  ['3', 'CLB 3', '24-32', '3.5–4.5'],
                  ['?', 'Below CLB 3', '10-23', 'Below 4.0']
                ].map(([badge, label, pteRange, ielts]) => (
                  <div key={label} className="grid grid-cols-3 p-3.5 items-center text-slate-700 hover:bg-slate-50/60">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">
                        {badge}
                      </span>
                      <span>{label}</span>
                    </div>
                    <div className="text-center font-mono font-bold">{pteRange}</div>
                    <div className="text-right font-mono font-bold text-slate-800">{ielts}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Skill-by-Skill Matrix Comparison (Page 5 & 6) */}
          <div id="score-comparison" className="space-y-6 pt-4">
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
              <div className="bg-[#00c5cd] text-white p-5">
                <h3 className="text-base font-bold">PTE Core &amp; Other English Test Score Comparison</h3>
                <p className="text-[11px] opacity-90">
                  Skill-by-skill concordance across IELTS General Training, CELPIP General, and CEFR bands.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3 border-r border-slate-100">CLB Level</th>
                      <th className="p-3 border-r border-slate-100">Skill</th>
                      <th className="p-3 border-r border-slate-100">PTE Core</th>
                      <th className="p-3 border-r border-slate-100">IELTS General Training</th>
                      <th className="p-3 border-r border-slate-100">CELPIP General</th>
                      <th className="p-3">CEFR level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {fullConcordanceRows.map((row) =>
                      row.skills.map((sk, idx) => (
                        <tr key={`${row.clb}-${sk.name}`} className="hover:bg-slate-50/40">
                          {idx === 0 && (
                            <td
                              rowSpan={4}
                              className="p-3 font-extrabold text-slate-800 border-r border-slate-100 bg-slate-50/30"
                            >
                              {row.clb}
                            </td>
                          )}
                          <td className="p-2.5 font-medium text-slate-700 border-r border-slate-100">{sk.name}</td>
                          <td className="p-2.5 border-r border-slate-100">
                            <span className={`px-3 py-0.5 rounded-full border ${sk.ring} font-mono font-bold text-slate-800 bg-white inline-block`}>
                              {sk.pte}
                            </span>
                          </td>
                          <td className="p-2.5 border-r border-slate-100">
                            <span className={`px-3 py-0.5 rounded-full border ${sk.ring} font-mono font-bold text-slate-800 bg-white inline-block`}>
                              {sk.ielts}
                            </span>
                          </td>
                          {idx === 0 && (
                            <>
                              <td rowSpan={4} className="p-3 font-extrabold text-slate-800 border-r border-slate-100">
                                {row.celpip}
                              </td>
                              <td rowSpan={4} className="p-3 font-extrabold text-slate-800">
                                {row.cefr}
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 p-3 flex items-center justify-center gap-6 text-[11px] font-semibold text-slate-600 border-t border-slate-100">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500" /> Listening</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Reading</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Writing</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f0854d]" /> Speaking</span>
              </div>
            </div>
          </div>

          {/* Why is PTE Core Scoring Trusted by IRCC? */}
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Why is PTE Core Scoring <span className="text-[#00c5cd]">Trusted by IRCC</span>?
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Trusted for accuracy, fairness, consistency, and practical workplace proficiency.
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-[#00c5cd] text-[10px] font-bold">
                Global Acceptance
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, title: 'IRCC approved' },
                { icon: Plane, title: 'Express Entry and PNP' },
                { icon: Award, title: 'Canadian citizenship applications' },
                { icon: Briefcase, title: 'Work permits' }
              ].map((t, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 text-[#00c5cd] flex items-center justify-center">
                    <t.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{t.title}</span>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="text-xs font-bold text-slate-900">How Pearson Ensures Accuracy</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0" />
                  <span>AI trained on millions of real responses</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0" />
                  <span>Continuous human quality checks</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0" />
                  <span>Same scoring standards worldwide</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0" />
                  <span>No examiner bias or fatigue</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">This is why PTE results release quickly without compromising reliability.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQS + FINAL WORDS + ENQUIRY FORM (Page 7 & 8 Layout)                  */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              <span className="text-[#00c5cd]">PTE Core</span> – Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 font-normal">Everything you need to know about PTE Core scoring</p>
          </div>

          <div className="space-y-3">
            {visibleFaqs.map((faq, idx) => {
              const isOpen = faqOpen[idx];
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c5cd] transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Info className="w-4 h-4 text-[#00c5cd] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#00c5cd]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-normal pl-10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="text-xs font-bold text-slate-600 hover:text-[#00c5cd] flex items-center gap-1 mx-auto cursor-pointer"
              >
                <span>{showAllFaqs ? 'Show Less' : 'Learn More'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Final Words & Enquiry Form */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Final Words Card Grid (Page 7 bottom) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Final Words from <span className="text-[#00c5cd]">NinetyPTE</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Understanding your PTE Core score reveals your exact strengths and opportunities—making your preparation targeted and effective.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#00c5cd] flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Direction &amp; Focus</div>
                    <p className="text-[11px] text-slate-500">Know precisely which tasks and sub-skills need improvement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#00c5cd] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Build Confidence</div>
                    <p className="text-[11px] text-slate-500">Track improvement consistently using AI-powered score analytics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#00c5cd] flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Smart Preparation</div>
                    <p className="text-[11px] text-slate-500">Train effectively rather than guessing with outdated materials</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
                <p>Ready to reach your Canadian immigration CLB threshold?</p>
                <p className="font-bold text-slate-800">Try NinetyPTE&apos;s AI-scored practice platform today.</p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0f172a] rounded-3xl p-8 text-white text-center space-y-5 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[#00c5cd] flex items-center justify-center mx-auto">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white leading-tight">
                  Your target score is<br /><span className="text-[#00c5cd]">closer than you think</span>
                </h3>
                <p className="text-xs text-slate-300 font-normal">Start your journey with NinetyPTE AI scoring today.</p>
              </div>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-7 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition"
              >
                <span>Start Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="text-[10px] text-slate-400">7-day free trial included • No credit card required</div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div className="bg-white/5 p-3 rounded-xl">
                  <div className="text-base font-black text-white">6K+</div>
                  <div className="text-[10px] text-slate-400">Active Students</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <div className="text-base font-black text-amber-400">4.9★</div>
                  <div className="text-[10px] text-slate-400">Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form Row (Page 8 Top) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 border-t border-slate-100">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Ready to start your <span className="text-[#00c5cd]">preparation</span>?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Practice real exam-style questions, take scored mock tests, and track your CLB targets with instant feedback designed for fast achievement.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 font-semibold">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> AI Scoring</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Real Exam Qs</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> 24/7 Support</span>
              </div>
              <div>
                <Link to="/dashboard" className="inline-block px-6 py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-xs transition">
                  Start Now
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
              <h3 className="text-base font-black text-slate-900">Enquiry Form</h3>
              {enquirySubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">Enquiry Sent!</h4>
                  <p className="text-xs text-slate-600">Our NinetyPTE advisor will respond shortly.</p>
                  <button
                    onClick={() => setEnquirySubmitted(false)}
                    className="text-xs font-bold text-[#00c5cd] hover:underline cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEnquirySubmitted(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name*</label>
                      <input type="text" required placeholder="John Doe" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Institute Name*</label>
                      <input type="text" required placeholder="University" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Id*</label>
                      <input type="email" required placeholder="email@example.com" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Country*</label>
                      <select required className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#00c5cd] focus:outline-hidden">
                        <option value="">Select Country</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="India">India</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input type="tel" placeholder="Enter Your Phone Number" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Message*</label>
                    <textarea rows={2} required placeholder="Your Message" className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden resize-none" />
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition cursor-pointer">
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
