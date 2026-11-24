import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ChevronDown, 
  Clock, 
  Maximize2, 
  ArrowRight,
  MoveRight,
  MoveLeft
} from 'lucide-react';

export default function PTEReadingPracticePage() {
  const [activeTask, setActiveTask] = useState('fib-dropdown');
  const [faqOpen, setFaqOpen] = useState({ 0: true });
  
  // Re-order state
  const [sourceList, setSourceList] = useState([
    'Consequently, technological infrastructure must continually adapt to these evolving demands.',
    'Modern urban ecosystems require sophisticated logistics to sustain their expanding populations.',
    'Recent studies reveal that digital management networks optimize municipal operations significantly.',
    'Without these automated systems, essential public services would experience systemic delays.'
  ]);
  const [targetList, setTargetList] = useState([]);

  // Drag & drop state
  const [dragBank, setDragBank] = useState(['resilient', 'allocate', 'sustainable', 'mitigate', 'disrupt', 'conserve']);
  const [dragFilled, setDragFilled] = useState({ 0: '', 1: '' });

  // Multiple choice state
  const [checkedOptions, setCheckedOptions] = useState({});
  const [selectedRadio, setSelectedRadio] = useState('');

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const moveToTarget = (item, index) => {
    setTargetList(prev => [...prev, item]);
    setSourceList(prev => prev.filter((_, i) => i !== index));
  };

  const moveToSource = (item, index) => {
    setSourceList(prev => [...prev, item]);
    setTargetList(prev => prev.filter((_, i) => i !== index));
  };

  const handleFillDrag = (word, slot) => {
    setDragFilled(prev => ({ ...prev, [slot]: word }));
  };

  const tasks = [
    { id: 'fib-dropdown', label: 'Fill in the Blanks (Drop-down)', badge: 'RWB' },
    { id: 'mc-multiple', label: 'Multiple Choice, Multiple Answers', badge: 'MCMA' },
    { id: 'reorder', label: 'Re-Order Paragraphs', badge: 'ROP' },
    { id: 'fib-drag', label: 'Fill in the Blanks (Drag & Drop)', badge: 'RDB' },
    { id: 'mc-single', label: 'Multiple Choice, Single Answer', badge: 'MCSA' }
  ];

  const taskData = {
    'fib-dropdown': {
      title: 'Fill in the Blanks (Drop-Down)',
      badge: 'RWB',
      desc: 'An academic text appears with missing words. For each gap, choose the correct candidate word from the drop-down list.',
      specs: {
        task: 'Select contextual words from drop-down menus to fill passage gaps',
        skills: 'Reading and Writing',
        promptLength: 'Passage up to 350 words',
        suggestedTime: '2 - 2.5 minutes per question',
        questions: '5 - 6'
      },
      instruction: 'Below is a text with blanks. Click on each blank and select the appropriate word choice from the drop-down menu.',
      tips: [
        'Skim the overall passage first to comprehend thematic intent and grammatical tense structure.',
        'Examine adjacent prepositions and adjectives to identify academic collocations.',
        'Use grammatical category deduction (noun, verb, adjective, adverb) to eliminate improbable options.',
        'There is no negative marking; ensure every blank has a selected entry before submitting.'
      ],
      faqs: [
        { q: 'Does Reading FIB Drop-down affect Writing scores?', a: 'Yes! This task is dual-scored and contributes to both Reading and Writing band performance.' },
        { q: 'Is there penalty scoring for incorrect selections?', a: 'No, Fill in the Blanks (Drop-down) uses partial positive scoring with zero negative deductions.' }
      ]
    },
    'mc-multiple': {
      title: 'Multiple Choice, Multiple Answers',
      badge: 'MCMA',
      desc: 'Read an academic passage and select all matching correct options from a list of possibilities.',
      specs: {
        task: 'Read passage and select all correct response choices',
        skills: 'Reading',
        promptLength: 'Text up to 300 words',
        suggestedTime: '1.5 - 2 minutes',
        questions: '1 - 2'
      },
      instruction: 'Read the text and answer the question by selecting all the correct responses. More than one response is correct.',
      tips: [
        'Notice that negative marking applies (+1 for correct, -1 for incorrect). Only select options you are completely confident about.',
        'If you are confident in only one correct answer, select just that one rather than risking negative points.'
      ],
      faqs: [
        { q: 'Is there negative marking in Multiple Answers?', a: 'Yes, selecting an incorrect option subtracts 1 mark, down to a minimum score of 0.' }
      ]
    },
    'reorder': {
      title: 'Re-Order Paragraphs',
      badge: 'ROP',
      desc: 'Sentences from a coherent academic paragraph are presented in scrambled order. Arrange the text boxes into the correct narrative sequence.',
      specs: {
        task: 'Restore scrambled text segments to proper logical sequence',
        skills: 'Reading',
        promptLength: 'Up to 150 words',
        suggestedTime: '2 minutes per question',
        questions: '2 - 3'
      },
      instruction: 'The text boxes in the left panel have been arranged in random order. Restore the original sequence by moving them into the right panel.',
      tips: [
        'Identify the independent topic sentence that can stand alone without referential pronouns (he, it, they, these).',
        'Group sentences into contiguous thematic pairs; marks are awarded for each correct adjacent pair.'
      ],
      faqs: [
        { q: 'How are marks awarded in Re-order Paragraphs?', a: 'Scoring is calculated per correct adjacent pair.' }
      ]
    },
    'fib-drag': {
      title: 'Fill in the Blanks (Drag & Drop)',
      badge: 'RDB',
      desc: 'A written passage contains blank spaces. Drag words from a pool below into the correct gaps.',
      specs: {
        task: 'Drag words from the pool to complete passage blanks',
        skills: 'Reading',
        promptLength: 'Text up to 80 words',
        suggestedTime: '1.5 - 2 minutes',
        questions: '4 - 5'
      },
      instruction: 'In the text below some words are missing. Drag words from the box below to the appropriate place in the text.',
      tips: [
        'Identify the necessary grammatical role for each gap before selecting from the word pool.',
        'There are more words in the pool than blanks; distractors often share similar prefixes or roots.'
      ],
      faqs: [
        { q: 'Does Drag and Drop FIB contribute to Writing?', a: 'No, Drag and Drop contributes exclusively to the Reading communicative score.' }
      ]
    },
    'mc-single': {
      title: 'Multiple Choice, Single Answer',
      badge: 'MCSA',
      desc: 'Read a short academic passage and select the single most accurate response option from four choices.',
      specs: {
        task: 'Read passage and select the single correct option',
        skills: 'Reading',
        promptLength: 'Text up to 300 words',
        suggestedTime: '1.5 minutes',
        questions: '1 - 2'
      },
      instruction: 'Read the text and answer the multiple-choice question by selecting the correct response.',
      tips: [
        'Read the question prompt before the passage to focus your reading strategy on specific supporting evidence.',
        'Eliminate options containing extreme assertions (always, never, exclusively) unless explicitly confirmed by the text.'
      ],
      faqs: [
        { q: 'Is there negative marking in Single Answer?', a: 'No, selecting an incorrect answer gives 0 with no penalty deductions.' }
      ]
    }
  };

  const current = taskData[activeTask] || taskData['fib-dropdown'];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c2cb] selection:text-white pb-16">
      
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

      {/* 1. HERO TITLE & MODULE SWITCHER */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Latest PTE Academic & UKVI Reading Questions
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1">
            <Link to="/pte-speaking-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Speaking</Link>
            <Link to="/pte-writing-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Writing</Link>
            <Link to="/pte-reading-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#00c5cd] text-white shadow-xs transition">Reading</Link>
            <Link to="/pte-listening-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Listening</Link>
          </div>

          <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-center max-w-4xl mx-auto">
            <p>
              The Reading module evaluates academic text comprehension, vocabulary in context, and discourse organization across five core question formats. Candidates encounter multiple choice items, re-order sequences, and fill-in-the-blank questions under a single overall section countdown timer. Targeted mock testing on NinetyPTE helps learners build quick scanning strategies and precise time management.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {tasks.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTask(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTask === t.id
                    ? 'bg-[#22c55e] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TASK SPECS */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-sm shadow-sm">
              {current.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-600">
              {current.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {current.desc}
          </p>

          <div className="bg-white rounded-2xl overflow-hidden border border-emerald-200/90 shadow-2xs">
            <div className="grid grid-cols-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] sm:text-xs font-black p-3 text-center">
              <div>Task</div>
              <div>Skills assessed</div>
              <div>Prompt length</div>
              <div>Suggested time</div>
              <div>Number of questions</div>
            </div>
            <div className="grid grid-cols-5 p-4 text-xs text-slate-700 text-center items-center gap-2 bg-emerald-50/20">
              <div className="text-left font-medium">{current.specs.task}</div>
              <div className="font-semibold">{current.specs.skills}</div>
              <div>{current.specs.promptLength}</div>
              <div>{current.specs.suggestedTime}</div>
              <div className="font-bold">{current.specs.questions}</div>
            </div>
          </div>

          {/* 3. TASK-SPECIFIC SIMULATOR */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-800">Mock Test - 1</span>
              <div className="flex items-center gap-4">
                <span className="font-mono">1 of 14</span>
                <span className="font-mono flex items-center gap-1 text-slate-700">
                  <Clock className="w-3.5 h-3.5" />
                  01:03 / 29:00
                </span>
                <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
              </div>
            </div>

            <p className="text-xs sm:text-sm italic font-medium text-slate-700 leading-relaxed">
              {current.instruction}
            </p>

            {/* TASK INTERFACE 1: Fill in the Blanks (Drop-down) */}
            {activeTask === 'fib-dropdown' && (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-loose">
                <span>The economic evolution of modern transport networks is driven by technological </span>
                <select className="mx-1 px-2 py-0.5 rounded border border-slate-300 bg-white font-bold text-xs focus:border-[#00c2cb] focus:outline-hidden">
                  <option value="">select ▾</option>
                  <option value="innovation">innovation</option>
                  <option value="regression">regression</option>
                  <option value="stagnation">stagnation</option>
                </select>
                <span>. When novel transit modalities emerge, municipalities must </span>
                <select className="mx-1 px-2 py-0.5 rounded border border-slate-300 bg-white font-bold text-xs focus:border-[#00c2cb] focus:outline-hidden">
                  <option value="">select ▾</option>
                  <option value="adapt">adapt</option>
                  <option value="prohibit">prohibit</option>
                  <option value="overlook">overlook</option>
                </select>
                <span> their regulatory structures to optimize operational </span>
                <select className="mx-1 px-2 py-0.5 rounded border border-slate-300 bg-white font-bold text-xs focus:border-[#00c2cb] focus:outline-hidden">
                  <option value="">select ▾</option>
                  <option value="efficiency">efficiency</option>
                  <option value="friction">friction</option>
                  <option value="reluctance">reluctance</option>
                </select>
                <span> and environmental equity.</span>
              </div>
            )}

            {/* TASK INTERFACE 2: Multiple Choice, Multiple Answers */}
            {activeTask === 'mc-multiple' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  Marine scientists studying tidal estuary biomes have documented that coastal wetlands serve as substantial carbon sequestration reservoirs. Additionally, these brackish buffer zones shield terrestrial infrastructure from hurricane storm surges and provide nursery ecosystems for juvenile aquatic species.
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Which two of the following benefits of tidal estuary biomes are supported by the passage?
                </div>
                <div className="space-y-2">
                  {[
                    'They sequester atmospheric carbon compounds efficiently.',
                    'They completely prevent all forms of coastal soil erosion.',
                    'They provide protective nurseries for young aquatic organisms.',
                    'They generate commercial mineral resources for heavy industry.'
                  ].map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={!!checkedOptions[i]}
                        onChange={() => setCheckedOptions({ ...checkedOptions, [i]: !checkedOptions[i] })}
                        className="rounded text-[#00c2cb] focus:ring-[#00c2cb] w-4 h-4"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TASK INTERFACE 3: Re-Order Paragraphs (2-Panel Layout) */}
            {activeTask === 'reorder' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Source Column */}
                <div className="border border-slate-300 rounded-2xl p-4 bg-slate-50 space-y-2.5">
                  <div className="text-xs font-black text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200">
                    Source Panel
                  </div>
                  {sourceList.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => moveToTarget(item, idx)}
                      className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs hover:border-[#00c2cb] cursor-pointer flex items-center justify-between group"
                    >
                      <span className="leading-snug">{item}</span>
                      <MoveRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00c2cb] shrink-0 ml-2" />
                    </div>
                  ))}
                  {sourceList.length === 0 && (
                    <div className="text-xs text-slate-400 italic text-center py-4">All boxes moved to Target</div>
                  )}
                </div>

                {/* Target Column */}
                <div className="border border-[#00c2cb]/50 rounded-2xl p-4 bg-cyan-50/20 space-y-2.5">
                  <div className="text-xs font-black text-[#00c2cb] uppercase tracking-wider pb-1 border-b border-cyan-200">
                    Target Order
                  </div>
                  {targetList.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => moveToSource(item, idx)}
                      className="p-3 bg-white rounded-xl border border-cyan-200 text-xs text-slate-800 shadow-xs hover:border-rose-400 cursor-pointer flex items-center justify-between group"
                    >
                      <span className="font-bold text-[#00c2cb] mr-2">{idx + 1}.</span>
                      <span className="leading-snug flex-1">{item}</span>
                      <MoveLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 shrink-0 ml-2" />
                    </div>
                  ))}
                  {targetList.length === 0 && (
                    <div className="text-xs text-slate-400 italic text-center py-4">Click boxes on the left to move them here</div>
                  )}
                </div>
              </div>
            )}

            {/* TASK INTERFACE 4: Fill in the Blanks (Drag & Drop) */}
            {activeTask === 'fib-drag' && (
              <div className="space-y-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-loose">
                  <span>To ensure sustainable agricultural yields, modern agronomists must </span>
                  <span className="inline-block min-w-28 px-3 py-1 bg-white border-2 border-dashed border-slate-300 rounded font-bold text-center text-xs text-[#00c2cb] mx-1">
                    {dragFilled[0] || '[ Blank 1 ]'}
                  </span>
                  <span> water resources efficiently and engineer crops that are </span>
                  <span className="inline-block min-w-28 px-3 py-1 bg-white border-2 border-dashed border-slate-300 rounded font-bold text-center text-xs text-[#00c2cb] mx-1">
                    {dragFilled[1] || '[ Blank 2 ]'}
                  </span>
                  <span> to thermal climate fluctuations.</span>
                </div>

                {/* Word Pool Bank */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Word Bank:</div>
                  <div className="flex flex-wrap gap-2">
                    {dragBank.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        onClick={() => handleFillDrag(word, !dragFilled[0] ? 0 : 1)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#00c2cb] hover:text-white text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TASK INTERFACE 5: Multiple Choice, Single Answer */}
            {activeTask === 'mc-single' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  Linguistic analyses of ancient scripts demonstrate that commercial trade routes accelerated syntactic borrowing between non-contiguous civilizations, promoting regional standardized measuring terminology.
                </div>
                <div className="text-xs font-bold text-slate-800">
                  What was the primary linguistic outcome of historical trade routes described in the text?
                </div>
                <div className="space-y-2">
                  {[
                    'The complete abandonment of indigenous writing systems.',
                    'The diffusion and standardization of regional commercial vocabulary.',
                    'A universal cessation of grammatical innovations.',
                    'The isolation of specialized mercantile dialects.'
                  ].map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs cursor-pointer">
                      <input 
                        type="radio" 
                        name="mc-single-option"
                        value={opt}
                        checked={selectedRadio === opt}
                        onChange={() => setSelectedRadio(opt)}
                        className="text-[#00c2cb] focus:ring-[#00c2cb] w-4 h-4"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-2">
              <button className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">Save & Exit</button>
              <button className="px-7 py-2 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-extrabold shadow-sm transition">Next &gt;</button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-5 py-2.5 rounded-full bg-[#00c2cb] text-white font-extrabold text-xs shadow-xs hover:bg-[#00a8b5] transition">PTE Reading {current.title}</button>
            <button className="px-5 py-2.5 rounded-full bg-[#00c2cb] text-white font-extrabold text-xs shadow-xs hover:bg-[#00a8b5] transition">{current.title} Sample Questions</button>
          </div>
        </div>
      </section>

      {/* 4. TIPS */}
      <section className="py-12 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                How to <span className="text-[#00c2cb]">Respond to</span> This Task?
              </h2>

              <div className="space-y-3 pt-1">
                {current.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="text-[#00c2cb] font-bold mt-0.5">✦</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link to="/pte-online-course" className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition">Detailed Question-wise Page</Link>
                <Link to="/pte-exam-pattern" className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs shadow-sm transition">Sample Questions</Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-sm w-full bg-slate-900">
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80" alt="Student reading academic texts" className="w-full h-72 object-cover opacity-85" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-xl border border-emerald-200 text-center space-y-1">
                  <div className="text-[10px] uppercase font-mono font-black text-emerald-600">{current.title}</div>
                  <div className="text-base font-black text-slate-900 flex items-center justify-center gap-1"><span>TIPS</span><span className="text-emerald-500">💡</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">FAQs</h2>
            <p className="text-xs text-slate-500">Here are answers to some of the frequently asked questions.</p>
          </div>

          <div className="space-y-3">
            {current.faqs.map((faq, idx) => {
              const isOpen = faqOpen[idx];
              return (
                <div key={idx} className="bg-[#f8fafc] rounded-2xl border border-slate-200/80 overflow-hidden">
                  <button onClick={() => toggleFaq(idx)} className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c2cb] transition-colors cursor-pointer">
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#00c2cb]' : ''}`} />
                  </button>
                  {isOpen && <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM BANNERS */}
      <section className="py-8 space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 p-8 text-center space-y-4 bg-gradient-to-r from-sky-50 via-white to-sky-50">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">Prepare for PTE & give a free mock test today.</h3>
          <div><Link to="/mock-tests" className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">Join Now</Link></div>
        </div>

        <div className="rounded-3xl p-6 sm:p-8 text-center space-y-4 border border-slate-200 bg-white shadow-2xs">
          <h3 className="text-sm sm:text-base font-black text-slate-900 max-w-2xl mx-auto leading-relaxed">Want to understand how PTE score calculation works? Check our PTE score calculator guide & understand the academic integrated scoring system.</h3>
          <div><Link to="/pte-score-calculator" className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">Learn More</Link></div>
        </div>

        <div className="rounded-3xl p-8 text-center space-y-3 bg-[#f0f9fa] border border-cyan-100">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Ready to boost your reading score?</h3>
          <p className="text-xs text-slate-600">Watch our strategy videos to improve your Reading proficiency</p>
          <div className="pt-2"><Link to="/pte-online-course" className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">View Now</Link></div>
        </div>
      </section>

    </div>
  );
}