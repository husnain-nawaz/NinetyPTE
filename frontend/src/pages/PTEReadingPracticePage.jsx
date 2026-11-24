import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ChevronDown, 
  Clock, 
  Maximize2, 
  ArrowRight
} from 'lucide-react';

export default function PTEReadingPracticePage() {
  const [activeTask, setActiveTask] = useState('fib-dropdown');
  const [selectedChoices, setSelectedChoices] = useState({ 0: '', 1: '', 2: '', 3: '' });
  const [faqOpen, setFaqOpen] = useState({ 0: true });

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
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
      desc: "There is an academic passage with several omitted words. Beside each gap, a drop-down menu displays multiple plausible candidates. Candidates select the contextually, grammatically, and collocationally accurate word to complete each sentence.",
      specs: {
        task: 'Select contextual words from drop-down menus to fill passage gaps',
        skills: 'Reading and Writing',
        promptLength: 'Passage up to 350 words',
        suggestedTime: '2 - 2.5 minutes per question',
        questions: '5 - 6'
      },
      instruction: 'Below is a text with blanks. Click on each blank and select the appropriate word choice from the drop-down menu.',
      passageParts: [
        'Economic analysts observe that modern market dynamics are significantly influenced by continuous technological ',
        '. When novel production frameworks are introduced, commercial enterprises must ',
        ' their operational models or face market obsolescence. Consumers frequently benefit from enhanced ',
        ' in service delivery, although regulatory institutions must continually ',
        ' oversight standards to safeguard consumer equity.'
      ],
      blanks: [
        { options: ['innovation', 'hesitation', 'regression', 'stagnation'], correct: 'innovation' },
        { options: ['adapt', 'abandon', 'overlook', 'prohibit'], correct: 'adapt' },
        { options: ['efficiency', 'reluctance', 'ambiguity', 'friction'], correct: 'efficiency' },
        { options: ['calibrate', 'disregard', 'substitute', 'diminish'], correct: 'calibrate' }
      ],
      tips: [
        'Skim the overall passage first to comprehend thematic intent and grammatical tense structure.',
        'Examine adjacent prepositions and adjectives to identify academic collocations.',
        'Use grammatical category deduction (noun, verb, adjective, adverb) to eliminate improbable options.',
        'There is no negative marking; ensure every blank has a selected entry before submitting.',
        'Pace your progress strictly, spending no more than 2 to 2.5 minutes per item.'
      ],
      faqs: [
        { q: 'Does Reading FIB Drop-down affect Writing scores?', a: 'Yes! This task is dual-scored and contributes heavily to both Reading and Writing band performance.' },
        { q: 'Is there penalty scoring for incorrect selections?', a: 'No, Fill in the Blanks (Drop-down) uses partial positive scoring with zero negative deductions.' },
        { q: 'How can I master academic collocations?', a: 'Review Pearson Academic Collocation Lists and high-frequency university word lists regularly on NinetyPTE.' }
      ]
    },
    'mc-multiple': {
      title: 'Multiple Choice, Multiple Answers',
      badge: 'MCMA',
      desc: 'Read an academic passage and identify multiple correct answers from a series of options based on explicit details and logical inferences.',
      specs: {
        task: 'Read passage and select all correct response choices',
        skills: 'Reading',
        promptLength: 'Text up to 300 words',
        suggestedTime: '1.5 - 2 minutes',
        questions: '1 - 2'
      },
      instruction: 'Read the text and answer the question by selecting all the correct responses. More than one response is correct.',
      passageParts: ['Marine biomes demonstrate remarkable adaptability to changing ambient conditions; however, ocean acidification imposes profound physiological stress on calcifying organisms including mollusks and coral polyps. Experimental studies demonstrate that sustained reductions in oceanic pH weaken structural skeletal integrity, while simultaneously altering acoustic communication patterns across pelagic species.'],
      blanks: [],
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
      desc: 'Sentences from a coherent academic paragraph are presented in scrambled order. Candidates arrange the text boxes into the correct narrative and chronological sequence.',
      specs: {
        task: 'Restore scrambled text segments to proper logical sequence',
        skills: 'Reading',
        promptLength: 'Up to 150 words',
        suggestedTime: '2 minutes per question',
        questions: '2 - 3'
      },
      instruction: 'The text boxes in the left panel have been arranged in random order. Restore the original sequence by dragging them into the right panel.',
      passageParts: ['Locate the independent topic sentence that introduces the main subject without referencing external antecedents.'],
      blanks: [],
      tips: [
        'Identify the independent topic sentence that can stand alone without referential pronouns (he, it, they, these).',
        'Group sentences into contiguous thematic pairs; marks are awarded for each correct adjacent pair.'
      ],
      faqs: [
        { q: 'How are marks awarded in Re-order Paragraphs?', a: 'Scoring is calculated per correct adjacent pair (e.g. 4 sentences yields up to 3 pair marks).' }
      ]
    },
    'fib-drag': {
      title: 'Fill in the Blanks (Drag & Drop)',
      badge: 'RDB',
      desc: 'A written passage contains blank spaces. Drag words from a pool below into the correct gaps. Tests contextual reading vocabulary.',
      specs: {
        task: 'Drag words from the pool to complete passage blanks',
        skills: 'Reading',
        promptLength: 'Text up to 80 words',
        suggestedTime: '1.5 - 2 minutes',
        questions: '4 - 5'
      },
      instruction: 'In the text below some words are missing. Drag words from the box below to the appropriate place in the text.',
      passageParts: ['Solar irradiance generates vast quantities of atmospheric kinetic energy that drives terrestrial weather patterns.'],
      blanks: [],
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
      passageParts: ['Linguistic shifts across centuries reflect technological innovations and intercultural exchanges.'],
      blanks: [],
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
          className="bg-[#00c2cb] hover:bg-[#00a8b5] text-white px-3.5 py-6 rounded-l-2xl font-black text-xs shadow-2xl transition-all flex flex-col items-center gap-2 group cursor-pointer border-y border-l border-cyan-200/50"
          style={{ writingMode: 'vertical-rl' }}
          aria-label="Practice Now"
        >
          <span className="tracking-widest uppercase text-[12px] group-hover:tracking-wider transition-all">
            Practice Now
          </span>
          <ArrowRight className="w-4 h-4 rotate-90 text-white stroke-[2.5]" />
        </Link>
      </div>

      {/* 1. HERO TITLE & MODULE SWITCHER */}
      <section className="pt-10 sm:pt-14 pb-8 bg-gradient-to-b from-sky-50/50 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            PTE <span className="text-[#00c2cb]">Reading</span> Practice
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            Latest PTE Academic & UKVI Reading Questions
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
            <Link to="/pte-speaking-practice" className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition">Speaking</Link>
            <Link to="/pte-writing-practice" className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition">Writing</Link>
            <Link to="/pte-reading-practice" className="px-6 py-2.5 rounded-full text-xs font-black bg-[#00c2cb] text-white shadow-sm transition">Reading</Link>
            <Link to="/pte-listening-practice" className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition">Listening</Link>
          </div>

          <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-left max-w-4xl mx-auto">
            <p>
              The Reading module of PTE Academic / UKVI assesses candidates' ability to analyze authentic academic texts under unified section timing. Questions challenge analytical comprehension, collocation awareness, and paragraph coherence across five distinct item formats. Timed practice on NinetyPTE reinforces reading speed, lexical precision, and strategic time allocation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {tasks.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTask(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  activeTask === t.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400'
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

          {/* 3. SIMULATOR */}
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

            {/* Interactive Reading Text Area with Dropdowns */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-loose">
              {current.passageParts.map((part, index) => (
                <span key={index}>
                  {part}
                  {current.blanks && current.blanks[index] && (
                    <select
                      value={selectedChoices[index] || ''}
                      onChange={(e) => setSelectedChoices({ ...selectedChoices, [index]: e.target.value })}
                      className="inline-block mx-1.5 px-2 py-0.5 rounded-md border border-slate-300 bg-white font-bold text-slate-800 text-xs focus:border-[#00c2cb] focus:outline-hidden cursor-pointer"
                    >
                      <option value="">select ▾</option>
                      {current.blanks[index].options.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </span>
              ))}
            </div>

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