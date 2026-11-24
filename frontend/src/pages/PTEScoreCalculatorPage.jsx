import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  GraduationCap, 
  Star, 
  CheckCircle, 
  CheckCircle2, 
  Target, 
  Network, 
  TrendingUp, 
  XCircle, 
  FileText, 
  BarChart3, 
  Lightbulb, 
  Plane, 
  Building2, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  Headphones, 
  ChevronDown, 
  Send, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  Info, 
  BookOpen, 
  Check, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export default function PTEScoreCalculatorPage() {
  // Calculator State
  const [testType, setTestType] = useState('academic'); // 'academic' | 'core'
  const [targetLevel, setTargetLevel] = useState('proficient'); // 'vocational' | 'competent' | 'proficient' | 'superior'
  
  const [scores, setScores] = useState({
    speaking: 68,
    writing: 72,
    reading: 65,
    listening: 70,
    overall: 69
  });

  const [calculationResult, setCalculationResult] = useState(null);

  // Tab State for "How PTE Academic Scores Are Calculated"
  const [activeIntegratedTab, setActiveIntegratedTab] = useState('sgd');

  // FAQ State
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Lead Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    instituteName: '',
    email: '',
    country: 'Pakistan',
    phone: '',
    message: ''
  });

  // Handle Score Input
  const handleScoreChange = (field, val) => {
    const num = parseInt(val, 10);
    const validNum = isNaN(num) ? '' : Math.min(90, Math.max(10, num));
    
    const updated = { ...scores, [field]: validNum };
    
    // Auto-calculate approximate overall if individual skills are entered
    if (field !== 'overall') {
      const s = field === 'speaking' ? validNum : scores.speaking;
      const w = field === 'writing' ? validNum : scores.writing;
      const r = field === 'reading' ? validNum : scores.reading;
      const l = field === 'listening' ? validNum : scores.listening;
      
      if (s && w && r && l) {
        // Weighted PTE overall estimation
        const avg = Math.round((s + w + r + l) / 4);
        updated.overall = avg;
      }
    }
    setScores(updated);
  };

  // Preset Target Score
  const selectTarget = (level) => {
    setTargetLevel(level);
    let baseScore = 65;
    if (level === 'vocational') baseScore = 36;
    else if (level === 'competent') baseScore = 50;
    else if (level === 'proficient') baseScore = 65;
    else if (level === 'superior') baseScore = 79;

    setScores({
      speaking: baseScore,
      writing: baseScore,
      reading: baseScore,
      listening: baseScore,
      overall: baseScore
    });
  };

  // Run Calculation
  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    const ov = parseInt(scores.overall || 65, 10);
    
    // Determine CEFR
    let cefr = 'B2';
    let cefrDesc = 'Upper Intermediate';
    if (ov >= 85) { cefr = 'C2'; cefrDesc = 'Mastery / Expert'; }
    else if (ov >= 76) { cefr = 'C1'; cefrDesc = 'Advanced Operational'; }
    else if (ov >= 59) { cefr = 'B2'; cefrDesc = 'Upper Intermediate'; }
    else if (ov >= 43) { cefr = 'B1'; cefrDesc = 'Intermediate Threshold'; }
    else { cefr = 'A2'; cefrDesc = 'Elementary User'; }

    // Determine IELTS Band Concordance
    let ielts = '7.0';
    if (ov >= 86) ielts = '8.5 - 9.0';
    else if (ov >= 83) ielts = '8.0';
    else if (ov >= 79) ielts = '7.5 - 8.0';
    else if (ov >= 73) ielts = '7.5';
    else if (ov >= 65) ielts = '7.0';
    else if (ov >= 58) ielts = '6.5';
    else if (ov >= 50) ielts = '6.0';
    else if (ov >= 42) ielts = '5.5';
    else if (ov >= 36) ielts = '5.0';
    else ielts = '4.5';

    // Determine CLB for Canada PR
    let clb = 8;
    if (ov >= 84) clb = 10;
    else if (ov >= 78) clb = 9;
    else if (ov >= 69) clb = 8;
    else if (ov >= 60) clb = 7;
    else if (ov >= 51) clb = 6;
    else if (ov >= 42) clb = 5;
    else clb = 4;

    // Australia PR Points
    let prPoints = '0 Points';
    if (ov >= 79) prPoints = '20 Points (Superior English)';
    else if (ov >= 65) prPoints = '10 Points (Proficient English)';
    else if (ov >= 50) prPoints = '0 Points (Competent English - Threshold)';
    else prPoints = 'Ineligible for General Skilled Migration';

    setCalculationResult({
      overall: ov,
      cefr,
      cefrDesc,
      ielts,
      clb,
      prPoints,
      testType: testType === 'academic' ? 'PTE Academic / UKVI' : 'PTE Core'
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-cyan-500 selection:text-white pb-24">
      
      {/* --------------------------------------------------------------------- */}
      {/* Top Hero Section: Title & Subtitle                                    */}
      {/* --------------------------------------------------------------------- */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            PTE <span className="text-[#00c2cb]">Score Calculator</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Enter your section scores to instantly get your proficiency level, IELTS band, and CLB equivalent.
          </p>

          {/* ----------------------------------------------------------------- */}
          {/* Main Calculator Card (Page 1)                                     */}
          {/* ----------------------------------------------------------------- */}
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 text-left max-w-4xl mx-auto">
            
            {/* Step 1: Choose Your Test Type */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-3">
                Step 1: Choose Your Test Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* PTE Academic Option */}
                <button
                  type="button"
                  onClick={() => setTestType('academic')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition cursor-pointer ${
                    testType === 'academic'
                      ? 'border-[#00c2cb] ring-2 ring-[#00c2cb]/20 bg-cyan-50/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    testType === 'academic' ? 'bg-[#00c2cb] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900">PTE Academic</span>
                      {testType === 'academic' && (
                        <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      For university admissions & standard visa applications.
                    </p>
                  </div>
                </button>

                {/* PTE Core Option */}
                <button
                  type="button"
                  onClick={() => setTestType('core')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition cursor-pointer ${
                    testType === 'core'
                      ? 'border-[#00c2cb] ring-2 ring-[#00c2cb]/20 bg-cyan-50/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    testType === 'core' ? 'bg-[#00c2cb] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-900">PTE Core</span>
                      {testType === 'core' && (
                        <CheckCircle2 className="w-4 h-4 text-[#00c2cb]" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      For select immigration streams (e.g., Canada PR/Work).
                    </p>
                  </div>
                </button>

              </div>
            </div>

            {/* Step 2: Select Your Target Score */}
            <div className="mt-8">
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-3">
                Step 2: Select Your Target Score
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'vocational', label: 'Vocational', band: '36' },
                  { id: 'competent', label: 'Competent', band: '50' },
                  { id: 'proficient', label: 'Proficient', band: '65' },
                  { id: 'superior', label: 'Superior', band: '79+' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectTarget(item.id)}
                    className={`py-3 px-3 rounded-xl text-center text-xs font-bold border transition cursor-pointer ${
                      targetLevel === item.id
                        ? 'border-[#00c2cb] bg-[#00c2cb]/10 text-cyan-800 shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">PTE {item.band}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Enter Your Section Scores (10 - 90) */}
            <div className="mt-8">
              <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-4">
                Step 3: Enter Your Section Scores (10 - 90)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                
                {/* Speaking Input */}
                <div className="space-y-1.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#f1784b] text-white text-xs font-black mx-auto flex items-center justify-center shadow-xs">
                    S
                  </div>
                  <div className="text-xs font-bold text-slate-800">Speaking</div>
                  <input
                    type="number"
                    min="10"
                    max="90"
                    value={scores.speaking}
                    onChange={(e) => handleScoreChange('speaking', e.target.value)}
                    placeholder="Enter Score"
                    className="w-full text-center py-2 px-1 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#00c2cb] font-bold text-slate-900 bg-slate-50/50"
                  />
                  <div className="text-[9px] text-slate-400">Valid range: 10 to 90</div>
                </div>

                {/* Writing Input */}
                <div className="space-y-1.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#38bdf8] text-white text-xs font-black mx-auto flex items-center justify-center shadow-xs">
                    W
                  </div>
                  <div className="text-xs font-bold text-slate-800">Writing</div>
                  <input
                    type="number"
                    min="10"
                    max="90"
                    value={scores.writing}
                    onChange={(e) => handleScoreChange('writing', e.target.value)}
                    placeholder="Enter Score"
                    className="w-full text-center py-2 px-1 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#00c2cb] font-bold text-slate-900 bg-slate-50/50"
                  />
                  <div className="text-[9px] text-slate-400">Valid range: 10 to 90</div>
                </div>

                {/* Reading Input */}
                <div className="space-y-1.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#10b981] text-white text-xs font-black mx-auto flex items-center justify-center shadow-xs">
                    R
                  </div>
                  <div className="text-xs font-bold text-slate-800">Reading</div>
                  <input
                    type="number"
                    min="10"
                    max="90"
                    value={scores.reading}
                    onChange={(e) => handleScoreChange('reading', e.target.value)}
                    placeholder="Enter Score"
                    className="w-full text-center py-2 px-1 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#00c2cb] font-bold text-slate-900 bg-slate-50/50"
                  />
                  <div className="text-[9px] text-slate-400">Valid range: 10 to 90</div>
                </div>

                {/* Listening Input */}
                <div className="space-y-1.5 text-center">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6] text-white text-xs font-black mx-auto flex items-center justify-center shadow-xs">
                    L
                  </div>
                  <div className="text-xs font-bold text-slate-800">Listening</div>
                  <input
                    type="number"
                    min="10"
                    max="90"
                    value={scores.listening}
                    onChange={(e) => handleScoreChange('listening', e.target.value)}
                    placeholder="Enter Score"
                    className="w-full text-center py-2 px-1 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#00c2cb] font-bold text-slate-900 bg-slate-50/50"
                  />
                  <div className="text-[9px] text-slate-400">Valid range: 10 to 90</div>
                </div>

                {/* Overall Score */}
                <div className="space-y-1.5 text-center col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-full bg-[#a855f7] text-white text-xs font-black mx-auto flex items-center justify-center shadow-xs">
                    O
                  </div>
                  <div className="text-xs font-bold text-slate-800">Overall Score</div>
                  <input
                    type="number"
                    min="10"
                    max="90"
                    value={scores.overall}
                    onChange={(e) => handleScoreChange('overall', e.target.value)}
                    placeholder="Enter Score"
                    className="w-full text-center py-2 px-1 text-xs border border-[#00c2cb] rounded-lg focus:outline-hidden ring-1 ring-[#00c2cb]/30 font-extrabold text-[#008f99] bg-cyan-50/40"
                  />
                  <div className="text-[9px] text-slate-400">Valid range: 10 to 90</div>
                </div>

              </div>
            </div>

            {/* Convert Button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleCalculate}
                className="px-8 py-3.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase transition shadow-md hover:shadow-lg cursor-pointer"
              >
                Convert My Score
              </button>
            </div>

            {/* Interactive Calculated Output Card */}
            {calculationResult && (
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-50/60 to-white border-2 border-cyan-300/80 shadow-md animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between border-b border-cyan-100 pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                    <span className="font-bold text-sm text-slate-900">
                      Calculated Results ({calculationResult.testType})
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500 text-white font-extrabold text-xs">
                    Overall PTE: {calculationResult.overall}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">CEFR Level</div>
                    <div className="text-lg font-black text-cyan-700 mt-0.5">{calculationResult.cefr}</div>
                    <div className="text-[10px] text-slate-500">{calculationResult.cefrDesc}</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">IELTS Equivalent</div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">Band {calculationResult.ielts}</div>
                    <div className="text-[10px] text-slate-500">Official Concordance</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Canada CLB</div>
                    <div className="text-lg font-black text-emerald-600 mt-0.5">CLB {calculationResult.clb}</div>
                    <div className="text-[10px] text-slate-500">Express Entry Stream</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">Australia PR</div>
                    <div className="text-base font-extrabold text-amber-600 mt-1">{calculationResult.prPoints}</div>
                    <div className="text-[10px] text-slate-500">GSM Points</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-cyan-100 text-xs text-slate-600 flex items-center justify-between">
                  <span>Target achieved? Level is <strong>{targetLevel.toUpperCase()}</strong></span>
                  <Link to="/mock-tests" className="text-cyan-700 font-bold hover:underline flex items-center gap-1">
                    <span>Validate in Scored Mock Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* Anchor Navigation Pills (Page 1) */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {[
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'question-weightage', label: 'Question Weightage' },
              { id: 'score-scale', label: 'PTE Score Scale' },
              { id: 'score-comparison', label: 'Score Comparison' },
              { id: 'faqs', label: 'FAQs' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollToSection(nav.id)}
                className="px-5 py-2 rounded-full border border-[#00c2cb] text-[#00c2cb] hover:bg-cyan-50 font-bold text-xs transition cursor-pointer shadow-2xs"
              >
                {nav.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Benefits of the PTE Score Calculator (Page 1)                         */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Benefits of the <span className="text-[#00c2cb]">PTE Score Calculator</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Understand your strengths, focus on high-scoring tasks, and improve your PTE preparation with smarter strategies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Estimate your overall PTE score</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Get an accurate prediction based on your <strong>PTE practice</strong> performance
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">See how one skill influences another</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Understand the integrated scoring system of PTE Academic
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Identify high-impact question types</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Focus on areas that contribute most to your overall score
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Avoid over-practicing low-return areas</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Save time by prioritizing what matters most
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Ready to Practice Under Real Exam Conditions Banner (Page 1)          */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-[#091b33] p-8 sm:p-10 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-3">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Ready to Practice Under Real Exam Conditions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Try NinetyPTE's AI-scored practice tests to get an accurate score prediction.
            </p>
            <div className="pt-2">
              <Link
                to="/mock-tests"
                className="inline-block px-7 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md"
              >
                Start Practicing Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* How the PTE Score Calculator Works: 4 Steps (Pages 1 & 2)             */}
      {/* --------------------------------------------------------------------- */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How the <span className="text-[#00c2cb]">PTE Score Calculator</span> Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Four simple steps to understand your PTE score potential
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-center">
          
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#00c2cb] text-white flex items-center justify-center mx-auto shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Enter recent practice or mock scores
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Input your latest performance data
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#00c2cb] text-white flex items-center justify-center mx-auto shadow-md">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Instantly view an estimated score range
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Get immediate predictions
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#00c2cb] text-white flex items-center justify-center mx-auto shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Identify weak and strong areas
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              See where you stand
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#00c2cb] text-white flex items-center justify-center mx-auto shadow-md">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">
              Adjust your preparation strategy
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Optimize your study plan
            </p>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Why Understanding PTE Scoring Matters (Page 2)                        */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Understanding the PTE Academic <span className="text-[#00c2cb]">Scoring Matters?</span>
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Your PTE score directly affects:
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-cyan-600" />
                <span>University admission</span>
              </li>
              <li className="flex items-center gap-3">
                <Plane className="w-4 h-4 text-cyan-600" />
                <span>Visa eligibility (<strong>Australia, UK, Canada, New Zealand</strong>)</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-4 h-4 text-cyan-600" />
                <span>Professional registration</span>
              </li>
              <li className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-cyan-600" />
                <span>Your next academic or career move</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-100 text-xs text-slate-600 leading-relaxed">
              Yet many students prepare without fully understanding how PTE scores actually work. That leads to wrong strategies and wasted effort.
            </div>
            <p className="text-xs text-slate-500 font-medium">
              NinetyPTE manages that by explaining the whole process.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="bg-[#11223b] text-white p-7 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" />
                <span>Clarity, Logic, Transparency</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                PTE Academic is a globally trusted test that helps you prove your English proficiency with confidence.
              </div>
              <p className="text-xs text-slate-300">
                If you're preparing for PTE, one question always comes first:
              </p>
              <div className="border-l-2 border-[#00c2cb] pl-3 py-1 font-bold text-sm text-white">
                "What score will I get?"
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                That's exactly where NinetyPTE's PTE Score Calculator helps — clearly, accurately, and without confusion.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Exam Format and Question Weightage Table (Pages 2 & 3)                 */}
      {/* --------------------------------------------------------------------- */}
      <section id="question-weightage" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            PTE Academic: <span className="text-[#00c2cb]">Exam Format and Question Weightage</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Understanding how each question type affects score calculations can help test takers better interpret their scores. The table below shows how much each question type contributes to the overall as well as individual module score on an average test.
          </p>
        </div>

        {/* Table Container */}
        <div className="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          
          {/* Header Bar */}
          <div className="bg-[#00c2cb] px-6 py-4 text-white text-left">
            <h3 className="font-extrabold text-sm sm:text-base">PTE Academic Marks Distribution</h3>
            <p className="text-xs text-cyan-50">Complete overview of all question types and scoring</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <th className="py-3 px-3 text-left">SECTION</th>
                  <th className="py-3 px-3 text-left">QUESTION TYPE</th>
                  <th className="py-3 px-2">QUESTIONS</th>
                  <th className="py-3 px-2">OVERALL</th>
                  <th className="py-3 px-2 text-[#f1784b]">SPEAKING</th>
                  <th className="py-3 px-2 text-[#3b82f6]">LISTENING</th>
                  <th className="py-3 px-2 text-[#10b981]">READING</th>
                  <th className="py-3 px-2 text-[#38bdf8]">WRITING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                
                {/* Speaking & Writing */}
                <tr className="hover:bg-slate-50/70">
                  <td rowSpan={9} className="py-3 px-3 text-left font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40 align-middle">
                    Speaking & Writing
                  </td>
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Read Aloud</td>
                  <td className="py-2.5 px-2">6-7</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">4%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#f1784b]/20 text-[#ea6b3c] font-bold text-[10px]">9%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Repeat Sentence</td>
                  <td className="py-2.5 px-2">10-12</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">7%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#f1784b]/20 text-[#ea6b3c] font-bold text-[10px]">16%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">17%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Describe Image</td>
                  <td className="py-2.5 px-2">5-6</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">15%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#f1784b]/20 text-[#ea6b3c] font-bold text-[10px]">31%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Re-Tell Lecture</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">6%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#f1784b]/20 text-[#ea6b3c] font-bold text-[10px]">13%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">13%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Answer Short Question</td>
                  <td className="py-2.5 px-2">5-6</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">2%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">4%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Summarize Group Discussion</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">9%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#f1784b]/20 text-[#ea6b3c] font-bold text-[10px]">19%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">20%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Respond to a Situation</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">6%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#f1784b]/20 text-[#ea6b3c] font-bold text-[10px]">13%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Summarize Written Text</td>
                  <td className="py-2.5 px-2">2</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">7%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">23%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#0284c7] font-bold text-[10px]">28%</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Write Essay</td>
                  <td className="py-2.5 px-2">1</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">7%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#0284c7] font-bold text-[10px]">31%</span></td>
                </tr>

                {/* Reading */}
                <tr className="hover:bg-slate-50/70">
                  <td rowSpan={5} className="py-3 px-3 text-left font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40 align-middle">
                    Reading
                  </td>
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Fill in the Blanks (Dropdown)</td>
                  <td className="py-2.5 px-2">5-6</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">7%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">25%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">MCQ - Multiple</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">1%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">5%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Re-order Paragraph</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">3%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">9%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Fill in the Blanks (Drag & Drop)</td>
                  <td className="py-2.5 px-2">4-5</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">6%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">20%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">MCQ - Single</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">&lt;1%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">3%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>

                {/* Listening */}
                <tr className="hover:bg-slate-50/70">
                  <td rowSpan={8} className="py-3 px-3 text-left font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40 align-middle">
                    Listening
                  </td>
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Summarize Spoken Text</td>
                  <td className="py-2.5 px-2">1</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">4%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">10%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#0284c7] font-bold text-[10px]">18%</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">MCQ - Multiple</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">1%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">3%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Fill in the Blanks</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">3%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">8%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Highlight Correct Summary</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">&lt;1%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">2%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">3%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">MCQ - Single</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">&lt;1%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">2%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Select Missing Word</td>
                  <td className="py-2.5 px-2">1-2</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">1%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">1%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Highlight Incorrect Words</td>
                  <td className="py-2.5 px-2">2-3</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">4%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">8%</span></td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#059669] font-bold text-[10px]">13%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 text-left font-semibold text-slate-900">Write from Dictation</td>
                  <td className="py-2.5 px-2">3-4</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold text-[10px]">5%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#2563eb] font-bold text-[10px]">13%</span></td>
                  <td className="py-2.5 px-2 text-slate-300">-</td>
                  <td className="py-2.5 px-2"><span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#0284c7] font-bold text-[10px]">23%</span></td>
                </tr>

                {/* Totals Row */}
                <tr className="bg-[#00c2cb] text-white font-black">
                  <td colSpan={2} className="py-3 px-3 text-left">TOTALS</td>
                  <td className="py-3 px-2">-</td>
                  <td className="py-3 px-2">100%</td>
                  <td className="py-3 px-2">100%</td>
                  <td className="py-3 px-2">100%</td>
                  <td className="py-3 px-2">100%</td>
                  <td className="py-3 px-2">100%</td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Color legend footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f1784b]"></span> Speaking</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></span> Listening</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> Reading</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span> Writing</span>
            </div>
            <div className="text-slate-400">
              Official Pearson Exam Concordance Model
            </div>
          </div>

        </div>

        {/* Note Callout */}
        <div className="mt-4 p-4 rounded-xl bg-cyan-50/60 border border-cyan-100 text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
          <Info className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> The distribution shown above is approximate and based on Pearson's official weighting guidelines. Percentages represent the contribution of each question type to the respective skill score. The total possible score is 360 points, which is then scaled to the 90-point PTE Academic score range.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/mock-tests"
            className="inline-block px-7 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-xs"
          >
            Train with Real Exam Logic
          </Link>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* What Is PTE Academic Scoring & Key Facts (Page 3)                     */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          What Is <span className="text-[#00c2cb]">PTE Academic Scoring?</span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
          <strong>PTE Academic</strong> uses a computer-based scoring system powered by AI and human validation. It evaluates language accuracy, fluency, pronunciation, and comprehension across all four skills.
        </p>

        <div className="mt-6 p-6 rounded-3xl bg-cyan-50/40 border border-cyan-100 text-left max-w-3xl mx-auto shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 mb-4">
            <Sparkles className="w-4 h-4 text-[#00c2cb]" />
            <span>Key Facts You Should Know</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
              <span>Score range: 10–90</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
              <span>Automated scoring with AI precision</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
              <span>Overall score ≠ simple average</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
              <span>Accepted by 3,900+ institutions worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* How PTE Academic Scores Are Calculated (Simple Explanation) (Page 3)  */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          How <span className="text-[#00c2cb]">PTE Academic Scores</span> Are Calculated <br className="hidden sm:inline" />
          (Simple Explanation)?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          PTE does not average your marks like traditional exams. Instead, it uses integrated skills scoring.
        </p>

        {/* Pill callout */}
        <div className="mt-5 inline-block p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 text-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">What This Means</div>
          <div className="font-extrabold text-slate-900 mt-0.5">Each question can affect multiple skills at the same time</div>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            { id: 'sgd', label: 'Summarize group discussion' },
            { id: 'swt', label: 'Summarize Written Text' },
            { id: 'rs', label: 'Repeat Sentence' },
            { id: 'wfd', label: 'Write From Dictation' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveIntegratedTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full font-bold text-xs transition cursor-pointer ${
                activeIntegratedTab === tab.id
                  ? 'border-b-2 border-[#f1784b] text-[#f1784b] bg-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Card Preview */}
        <div className="mt-6 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
          {activeIntegratedTab === 'sgd' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
              <div className="text-center sm:text-left shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#f1784b]/15 text-[#f1784b] flex items-center justify-center mx-auto shadow-xs">
                  <Headphones className="w-8 h-8" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-2">Summarize group discussion</div>
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-blue-500 text-white flex items-center justify-center shrink-0 text-xs">
                    🎧
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Listening</div>
                    <div className="text-[11px] text-slate-500">Recognizes content as per the audio</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-orange-100 bg-orange-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#f1784b] text-white flex items-center justify-center shrink-0 text-xs">
                    🎙️
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Speaking</div>
                    <div className="text-[11px] text-slate-500">Recognizes pronunciation and fluency</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIntegratedTab === 'swt' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
              <div className="text-center sm:text-left shrink-0">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-2">Summarize Written Text</div>
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs">
                    📖
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Reading</div>
                    <div className="text-[11px] text-slate-500">Scores text comprehension and core concept identification</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-sky-500 text-white flex items-center justify-center shrink-0 text-xs">
                    ✍️
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Writing</div>
                    <div className="text-[11px] text-slate-500">Scores grammar, vocabulary, and 1-sentence form</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIntegratedTab === 'rs' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
              <div className="text-center sm:text-left shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#3b82f6]/15 text-[#3b82f6] flex items-center justify-center mx-auto shadow-xs">
                  <Headphones className="w-8 h-8" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-2">Repeat Sentence</div>
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-blue-500 text-white flex items-center justify-center shrink-0 text-xs">
                    🎧
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Listening</div>
                    <div className="text-[11px] text-slate-500">Captures exact memory retention of auditory sequence</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-orange-100 bg-orange-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#f1784b] text-white flex items-center justify-center shrink-0 text-xs">
                    🎙️
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Speaking</div>
                    <div className="text-[11px] text-slate-500">Evaluates oral fluency, pitch, and pronunciation</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIntegratedTab === 'wfd' && (
            <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
              <div className="text-center sm:text-left shrink-0">
                <div className="w-16 h-16 rounded-full bg-purple-500/15 text-purple-600 flex items-center justify-center mx-auto shadow-xs">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-2">Write From Dictation</div>
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-blue-500 text-white flex items-center justify-center shrink-0 text-xs">
                    🎧
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Listening</div>
                    <div className="text-[11px] text-slate-500">Rewards every correctly heard word</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/30 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-sky-500 text-white flex items-center justify-center shrink-0 text-xs">
                    ✍️
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Writing</div>
                    <div className="text-[11px] text-slate-500">Rewards 1 mark per correctly spelled word directly into Writing score</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          Switch tabs to see how different question types impact various skills.
        </p>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Integrated Tasks Callout Banner (Page 4)                              */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="rounded-3xl bg-[#091b33] p-8 sm:p-10 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Practice for Contribution-Based Scoring – Not Just Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Full-length AI-scored mocks designed around real PTE scoring logic.
            </p>
            <div className="pt-2">
              <Link
                to="/mock-tests"
                className="inline-block px-7 py-3 rounded-full bg-white text-[#091b33] hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider transition shadow-md"
              >
                Master Integrated PTE Practice
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Official PTE Score Scale & CEFR / IELTS Interpretation (Page 4)        */}
      {/* --------------------------------------------------------------------- */}
      <section id="score-scale" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            What is the Official PTE Academic Score Scale & <br className="hidden sm:inline" />
            Interpretation compared with <span className="text-[#00c2cb]">IELTS and CEFR Levels?</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            PTE scores align with CEFR levels and are officially recognized by governments and universities.
          </p>
        </div>

        {/* 5 CEFR Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          
          {/* C2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
            <div className="text-cyan-600 font-bold text-sm">🏅</div>
            <div className="text-lg font-black text-cyan-700 mt-1">C2</div>
            <div className="font-bold text-xs text-slate-900">Mastery</div>
            <div className="text-[11px] text-slate-400">Near-native proficiency</div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] space-y-1">
              <div className="flex justify-between"><span>PTE Academic:</span> <strong className="text-slate-900">85-90</strong></div>
              <div className="flex justify-between"><span>CEFR:</span> <strong className="text-slate-900">C2</strong></div>
              <div className="flex justify-between"><span>IELTS:</span> <strong className="text-slate-900">8.0-9.0</strong></div>
            </div>
          </div>

          {/* C1 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
            <div className="text-cyan-600 font-bold text-sm">📈</div>
            <div className="text-lg font-black text-cyan-700 mt-1">C1</div>
            <div className="font-bold text-xs text-slate-900">Advanced</div>
            <div className="text-[11px] text-slate-400">Effective operational</div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] space-y-1">
              <div className="flex justify-between"><span>PTE Academic:</span> <strong className="text-slate-900">76-84</strong></div>
              <div className="flex justify-between"><span>CEFR:</span> <strong className="text-slate-900">C1</strong></div>
              <div className="flex justify-between"><span>IELTS:</span> <strong className="text-slate-900">7.5-8.0</strong></div>
            </div>
          </div>

          {/* B2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
            <div className="text-cyan-600 font-bold text-sm">💻</div>
            <div className="text-lg font-black text-cyan-700 mt-1">B2</div>
            <div className="font-bold text-xs text-slate-900">Upper Intermediate</div>
            <div className="text-[11px] text-slate-400">Independent user</div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] space-y-1">
              <div className="flex justify-between"><span>PTE Academic:</span> <strong className="text-slate-900">59-75</strong></div>
              <div className="flex justify-between"><span>CEFR:</span> <strong className="text-slate-900">B2</strong></div>
              <div className="flex justify-between"><span>IELTS:</span> <strong className="text-slate-900">6.5-7.5</strong></div>
            </div>
          </div>

          {/* B1 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
            <div className="text-cyan-600 font-bold text-sm">🎓</div>
            <div className="text-lg font-black text-cyan-700 mt-1">B1</div>
            <div className="font-bold text-xs text-slate-900">Intermediate</div>
            <div className="text-[11px] text-slate-400">Threshold competence</div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] space-y-1">
              <div className="flex justify-between"><span>PTE Academic:</span> <strong className="text-slate-900">43-58</strong></div>
              <div className="flex justify-between"><span>CEFR:</span> <strong className="text-slate-900">B1</strong></div>
              <div className="flex justify-between"><span>IELTS:</span> <strong className="text-slate-900">6.0-6.5</strong></div>
            </div>
          </div>

          {/* A2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-left">
            <div className="text-cyan-600 font-bold text-sm">📖</div>
            <div className="text-lg font-black text-cyan-700 mt-1">A2</div>
            <div className="font-bold text-xs text-slate-900">Elementary</div>
            <div className="text-[11px] text-slate-400">Basic user</div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] space-y-1">
              <div className="flex justify-between"><span>PTE Academic:</span> <strong className="text-slate-900">30-42</strong></div>
              <div className="flex justify-between"><span>CEFR:</span> <strong className="text-slate-900">A2</strong></div>
              <div className="flex justify-between"><span>IELTS:</span> <strong className="text-slate-900">5.0-5.5</strong></div>
            </div>
          </div>

        </div>

        <p className="mt-4 text-[10px] text-slate-400 text-center">
          * IELTS equivalents are approximate score comparisons based on Pearson's latest concordance research. Individual universities, institutions and visa programs may set their own score requirements.
        </p>

        {/* Dark Callout Bar */}
        <div className="mt-8 rounded-2xl bg-[#091b33] p-5 text-white flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm">Aim for 76+ for Best Opportunities</h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              Scores in the 76-90 range open doors to top universities, competitive visa categories, and professional registration. Focus your preparation on reaching these high-achievement levels.
            </p>
          </div>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Score Comparison Full Grid (Page 5)                                   */}
      {/* --------------------------------------------------------------------- */}
      <section id="score-comparison" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            PTE Academic & <span className="text-[#00c2cb]">English Test Score Comparison</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            A comprehensive comparison of PTE Academic scores with globally recognized English proficiency examinations.
          </p>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          
          <div className="bg-[#00c2cb] px-6 py-4 text-white text-left">
            <h3 className="font-extrabold text-sm sm:text-base">PTE Academic & English Test Score Comparison</h3>
            <p className="text-xs text-cyan-50">Equivalencies across IELTS, TOEFL iBT, LanguageCert, MET, OET, CELPIP, and Cambridge C1</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <th className="py-3 px-3 text-left">Proficiency Level</th>
                  <th className="py-3 px-2 text-left">Skill</th>
                  <th className="py-3 px-2 font-black text-[#008f99]">PTE Academic</th>
                  <th className="py-3 px-2">IELTS</th>
                  <th className="py-3 px-2">LanguageCert</th>
                  <th className="py-3 px-2">MET</th>
                  <th className="py-3 px-2">OET</th>
                  <th className="py-3 px-2">CELPIP</th>
                  <th className="py-3 px-2">TOEFL iBT</th>
                  <th className="py-3 px-2">C1 Advanced</th>
                  <th className="py-3 px-2">CEFR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                
                {/* Vocational */}
                <tr className="hover:bg-slate-50/70">
                  <td rowSpan={4} className="py-3 px-3 text-left font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40 align-middle">
                    Vocational
                  </td>
                  <td className="py-2 px-2 text-left text-slate-600">Speaking</td>
                  <td className="py-2 px-2 font-bold text-slate-900">24</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">54</td>
                  <td className="py-2 px-2">38</td>
                  <td className="py-2 px-2">270</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">14</td>
                  <td rowSpan={4} className="py-2 px-2 text-slate-400 bg-slate-50/30 align-middle">Excluded</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">A1</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Listening</td>
                  <td className="py-2 px-2 font-bold text-slate-900">33</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">41</td>
                  <td className="py-2 px-2">49</td>
                  <td className="py-2 px-2">220</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">A2</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Reading</td>
                  <td className="py-2 px-2 font-bold text-slate-900">36</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">44</td>
                  <td className="py-2 px-2">47</td>
                  <td className="py-2 px-2">240</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">A2</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Writing</td>
                  <td className="py-2 px-2 font-bold text-slate-900">29</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">45</td>
                  <td className="py-2 px-2">45</td>
                  <td className="py-2 px-2">200</td>
                  <td className="py-2 px-2">5</td>
                  <td className="py-2 px-2">9</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">A1</span></td>
                </tr>

                {/* Competent */}
                <tr className="hover:bg-slate-50/70">
                  <td rowSpan={4} className="py-3 px-3 text-left font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40 align-middle">
                    Competent
                  </td>
                  <td className="py-2 px-2 text-left text-slate-600">Speaking</td>
                  <td className="py-2 px-2 font-bold text-slate-900">54</td>
                  <td className="py-2 px-2">6</td>
                  <td className="py-2 px-2">70</td>
                  <td className="py-2 px-2">48</td>
                  <td className="py-2 px-2">330</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">19</td>
                  <td className="py-2 px-2 font-semibold">179</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B1</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Listening</td>
                  <td className="py-2 px-2 font-bold text-slate-900">47</td>
                  <td className="py-2 px-2">6</td>
                  <td className="py-2 px-2">57</td>
                  <td className="py-2 px-2">56</td>
                  <td className="py-2 px-2">290</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">16</td>
                  <td className="py-2 px-2 font-semibold">163</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B1</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Reading</td>
                  <td className="py-2 px-2 font-bold text-slate-900">48</td>
                  <td className="py-2 px-2">6</td>
                  <td className="py-2 px-2">60</td>
                  <td className="py-2 px-2">55</td>
                  <td className="py-2 px-2">310</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">16</td>
                  <td className="py-2 px-2 font-semibold">163</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B1</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Writing</td>
                  <td className="py-2 px-2 font-bold text-slate-900">51</td>
                  <td className="py-2 px-2">6</td>
                  <td className="py-2 px-2">64</td>
                  <td className="py-2 px-2">57</td>
                  <td className="py-2 px-2">290</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">16</td>
                  <td className="py-2 px-2 font-semibold">170</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B1</span></td>
                </tr>

                {/* Proficient */}
                <tr className="hover:bg-slate-50/70">
                  <td rowSpan={4} className="py-3 px-3 text-left font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40 align-middle">
                    Proficient
                  </td>
                  <td className="py-2 px-2 text-left text-slate-600">Speaking</td>
                  <td className="py-2 px-2 font-bold text-slate-900">76</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">82</td>
                  <td className="py-2 px-2">59</td>
                  <td className="py-2 px-2">360</td>
                  <td className="py-2 px-2">9</td>
                  <td className="py-2 px-2">24</td>
                  <td className="py-2 px-2 font-semibold">194</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">C1</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Listening</td>
                  <td className="py-2 px-2 font-bold text-slate-900">58</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">67</td>
                  <td className="py-2 px-2">61</td>
                  <td className="py-2 px-2">350</td>
                  <td className="py-2 px-2">9</td>
                  <td className="py-2 px-2">22</td>
                  <td className="py-2 px-2 font-semibold">175</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B1</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Reading</td>
                  <td className="py-2 px-2 font-bold text-slate-900">59</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">71</td>
                  <td className="py-2 px-2">63</td>
                  <td className="py-2 px-2">360</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2">22</td>
                  <td className="py-2 px-2 font-semibold">179</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B2</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Writing</td>
                  <td className="py-2 px-2 font-bold text-slate-900">69</td>
                  <td className="py-2 px-2">7</td>
                  <td className="py-2 px-2">78</td>
                  <td className="py-2 px-2">74</td>
                  <td className="py-2 px-2">380</td>
                  <td className="py-2 px-2">10</td>
                  <td className="py-2 px-2">26</td>
                  <td className="py-2 px-2 font-semibold">193</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B2</span></td>
                </tr>

                {/* Superior */}
                <tr className="hover:bg-slate-50/70">
                  <td rowSpan={4} className="py-3 px-3 text-left font-bold text-slate-900 border-r border-slate-100 bg-slate-50/40 align-middle">
                    Superior
                  </td>
                  <td className="py-2 px-2 text-left text-slate-600">Speaking</td>
                  <td className="py-2 px-2 font-bold text-slate-900">88</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2">89</td>
                  <td rowSpan={4} className="py-2 px-2 text-slate-400 bg-slate-50/30 align-middle">Excluded</td>
                  <td className="py-2 px-2">400</td>
                  <td className="py-2 px-2">10</td>
                  <td className="py-2 px-2">28</td>
                  <td className="py-2 px-2 font-semibold">208</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">C2</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Listening</td>
                  <td className="py-2 px-2 font-bold text-slate-900">69</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2">80</td>
                  <td className="py-2 px-2">390</td>
                  <td className="py-2 px-2">10</td>
                  <td className="py-2 px-2">26</td>
                  <td className="py-2 px-2 font-semibold">186</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B2</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Reading</td>
                  <td className="py-2 px-2 font-bold text-slate-900">70</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2">83</td>
                  <td className="py-2 px-2">400</td>
                  <td className="py-2 px-2">10</td>
                  <td className="py-2 px-2">27</td>
                  <td className="py-2 px-2 font-semibold">190</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">B2</span></td>
                </tr>
                <tr className="hover:bg-slate-50/70">
                  <td className="py-2 px-2 text-left text-slate-600">Writing</td>
                  <td className="py-2 px-2 font-bold text-slate-900">85</td>
                  <td className="py-2 px-2">8</td>
                  <td className="py-2 px-2">89</td>
                  <td className="py-2 px-2">420</td>
                  <td className="py-2 px-2">12</td>
                  <td className="py-2 px-2">30</td>
                  <td className="py-2 px-2 font-semibold">210</td>
                  <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-700 font-bold text-[10px]">C2</span></td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Why PTE Academic Scoring Is Trusted Worldwide (Page 5)                */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Why PTE Academic Scoring Is <span className="text-[#00c2cb]">Trusted Worldwide?</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          PTE is trusted because its scoring system focuses on fairness, consistency, and real-world English usage.
        </p>

        <div className="mt-4">
          <span className="px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 font-bold text-xs">
            Global Acceptance
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-2">
            <Building2 className="w-6 h-6 text-[#00c2cb] mx-auto" />
            <h4 className="font-bold text-xs text-slate-900 leading-tight">
              Australian Department of Home Affairs
            </h4>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#00c2cb] mx-auto" />
            <h4 className="font-bold text-xs text-slate-900 leading-tight">
              UK Visas and Immigration (UKVI)
            </h4>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-2">
            <GraduationCap className="w-6 h-6 text-[#00c2cb] mx-auto" />
            <h4 className="font-bold text-xs text-slate-900 leading-tight">
              Canadian Institutions
            </h4>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-2">
            <Globe className="w-6 h-6 text-[#00c2cb] mx-auto" />
            <h4 className="font-bold text-xs text-slate-900 leading-tight">
              3,900+ Institutions Worldwide
            </h4>
          </div>
        </div>

        {/* How Pearson Ensures Accuracy Sub-card */}
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-[#00c2cb]" />
            <h4 className="font-bold text-sm text-slate-900">How Pearson Ensures Accuracy</h4>
          </div>
          <p className="text-xs text-slate-500 mb-5">
            Advanced technology combined with human oversight
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
              <span>AI trained on millions of real responses</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
              <span>Continuous human quality checks</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
              <span>Same scoring standards worldwide</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00c2cb]"></span>
              <span>No examiner bias or fatigue</span>
            </div>
          </div>

          <p className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
            This is why PTE results are released faster without compromising reliability.
          </p>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Frequently Asked Questions (Page 6)                                   */}
      {/* --------------------------------------------------------------------- */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            PTE Academic – <span className="text-[#00c2cb]">Frequently Asked Questions</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Everything you need to know about PTE Academic scoring
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {[
            {
              q: 'What is the maximum PTE Academic score?',
              a: 'The maximum score in PTE Academic is 90 points for each communicative skill (Speaking, Writing, Reading, Listening) and 90 points for the Overall score.'
            },
            {
              q: 'Which skill is most important in the PTE Academic?',
              a: 'Speaking and Listening carry significant integrated weighting across the entire test. Tasks like Repeat Sentence, Write From Dictation, and Read Aloud contribute massive marks to multiple sections simultaneously.'
            },
            {
              q: 'How long does a PTE Academic score last?',
              a: 'PTE Academic scores are typically valid for 2 years for university admissions, and up to 3 years for Australian general skilled migration visas.'
            },
            {
              q: 'Does accent matter a lot in the PTE Academic test?',
              a: 'No. Pearson’s automated speech engine was trained on native and non-native accents from over 158 countries. Clear pronunciation, steady pace, and lack of unnatural hesitations matter far more than having a native English accent.'
            },
            {
              q: 'Is accent important in the PTE Academic?',
              a: 'No single national accent is favored. What matters is intelligible phoneme pronunciation and regular English rhythm.'
            },
            {
              q: 'Can listening boost my PTE Academic score?',
              a: 'Yes! Tasks like Repeat Sentence, Re-Tell Lecture, Summarize Spoken Text, and Write From Dictation contribute substantial scores to both Listening and other skills (Writing & Speaking).'
            },
            {
              q: 'Is PTE Academic accepted worldwide?',
              a: 'Yes, PTE Academic is accepted by 100% of Australian and New Zealand universities, 99% of UK universities, thousands of US and Canadian institutions, and for Australian, UK, and New Zealand visa applications.'
            }
          ].slice(0, showAllFaqs ? 7 : 5).map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 hover:text-cyan-600 transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-cyan-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 mx-auto cursor-pointer"
            >
              <span>{showAllFaqs ? 'Show Less' : 'Learn More'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Final Words from NinetyPTE (Page 6)                                   */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Final Words from <span className="text-[#00c2cb]">NinetyPTE</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Understanding your PTE Academic score is not just about numbers — it's about direction, confidence, and smart preparation.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When you know how scoring works, your preparation becomes smarter, faster, and more focused.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-[#00c2cb] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">Direction & Focus</div>
                  <div className="text-xs text-slate-500">Know exactly what to study and where to improve</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-[#00c2cb] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">Build Confidence</div>
                  <div className="text-xs text-slate-500">Track your progress with AI-powered insights</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#00c2cb] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">Smart Preparation</div>
                  <div className="text-xs text-slate-500">Study right, not just more — proven strategies that work</div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 leading-relaxed">
              Thousands of students improve not by studying more — but by studying right.
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex -space-x-1.5">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">A</span>
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">P</span>
                <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">T</span>
              </div>
              <span>Join 10,000+ successful students Already preparing with NinetyPTE</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="bg-[#11223b] text-white p-7 rounded-3xl shadow-xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black tracking-tight leading-tight">
                Your target score is <br /><span className="text-[#00c2cb]">closer than you think</span>
              </h4>
              <p className="text-xs text-slate-300">
                Start your journey with our AI-powered platform today
              </p>
              <div>
                <Link
                  to="/signup"
                  className="inline-block px-7 py-3 rounded-xl bg-white text-[#11223b] hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider transition shadow-md"
                >
                  Start Now →
                </Link>
              </div>
              <div className="text-[10px] text-slate-400">
                7-day free trial included • No credit card required
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-around text-xs">
                <div>
                  <div className="font-extrabold text-sm text-white">10K+</div>
                  <div className="text-[10px] text-slate-400">Active Students</div>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-amber-400">4.9★</div>
                  <div className="text-[10px] text-slate-400">Average Rating</div>
                </div>
              </div>

              <div className="text-[10px] text-cyan-400 font-semibold">
                ⚡ AI-Powered Score Prediction • Instant Feedback
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Ready to Start Your Preparation & Enquiry Form (Pages 6 & 7)          */}
      {/* --------------------------------------------------------------------- */}
      <section id="enquiry-form" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Ready to start your <br /><span className="text-[#00c2cb]">preparation?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Practice real exam-style questions, take scored mock tests, and track your progress with instant AI feedback designed to help you improve faster and achieve your target score with confidence.
            </p>

            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00c2cb]" />
                <span>AI Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00c2cb]" />
                <span>Real Exam Qs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00c2cb]" />
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-block px-7 py-3 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md"
              >
                Start Now
              </Link>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
            <h4 className="font-extrabold text-base text-slate-900 mb-1">Enquiry Form</h4>
            <p className="text-xs text-slate-400 mb-6">Connect with NinetyPTE score consultants</p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-cyan-50 border border-cyan-200 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-[#00c2cb] mx-auto" />
                <h5 className="font-bold text-sm text-slate-900">Thank You!</h5>
                <p className="text-xs text-slate-600">
                  Your enquiry has been received. A NinetyPTE academic counselor will reach out shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Institute Name*</label>
                    <input
                      type="text"
                      required
                      value={formData.instituteName}
                      onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                      placeholder="University or College"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Id*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country*</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb] bg-white"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                      +92
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter Your Phone Number"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message*</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your Message"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                  />
                </div>

                <div className="text-right pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-[#11223b] hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
