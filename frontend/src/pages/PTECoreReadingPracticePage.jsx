import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  PenTool,
  BookOpen,
  Headphones,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle2,
  RotateCcw,
  FileText,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  Target,
  Sparkles,
  Info,
  Play,
  ListChecks,
  Columns
} from 'lucide-react';

export default function PTECoreReadingPracticePage() {
  const [activeTask, setActiveTask] = useState('rw-fib');
  const [activeSubNav, setActiveSubNav] = useState('practice');
  const [expandedType, setExpandedType] = useState(0);
  const [scoringTabIdx, setScoringTabIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState({ 0: false });
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const toggleFaq = (idx) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Interactive Practice Workspace States
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Task 1: Reading & Writing FIB (Dropdowns)
  const rwFibData = {
    topic: 'URBAN INFRASTRUCTURE • SUSTAINABLE TRANSIT PLANNING',
    answers: ['congestion', 'affordable', 'expand', 'incentives', 'emissions'],
    options: [
      ['congestion', 'elevation', 'solitude', 'friction'],
      ['affordable', 'redundant', 'distant', 'fragile'],
      ['expand', 'suspend', 'reverse', 'hesitate'],
      ['incentives', 'barriers', 'penalties', 'omissions'],
      ['emissions', 'profits', 'salaries', 'structures']
    ]
  };
  const [rwSelections, setRwSelections] = useState(['', '', '', '', '']);

  // Task 2: Reading FIB (Click / Word Bank Blanks)
  const rFibData = {
    topic: 'WORKPLACE ERGONOMICS • MODERN OFFICE LIGHTING',
    answers: ['fatigue', 'natural', 'productivity', 'adjustable'],
    wordBank: ['natural', 'productivity', 'fatigue', 'adjustable', 'manual', 'isolation']
  };
  const [rFibSlots, setRFibSlots] = useState(['', '', '', '']);
  const [activeRFibSlot, setActiveRFibSlot] = useState(0);

  // Task 3: MCQ Multiple Answers
  const mcqMultiData = {
    passage:
      'Municipal composting programs have gained steady adoption across North American cities during the past decade. By diverting organic kitchen scraps and yard waste from traditional landfills, local governments significantly reduce methane output. Moreover, processed compost returns vital nitrogen to public parks and community gardens, decreasing municipal dependency on synthetic fertilizers. Critics occasionally highlight collection vehicle fuel costs and resident sorting errors, yet long-term landfill lifespan savings typically outweigh initial logistical expenses.',
    question: 'Which of the following benefits of municipal composting programs are stated in the passage?',
    options: [
      { id: 'a', text: 'Lower generation of methane gas from landfill disposal' },
      { id: 'b', text: 'Reduced reliance on manufactured chemical fertilizers in public green spaces' },
      { id: 'c', text: 'Complete elimination of municipal collection truck operating expenses' },
      { id: 'd', text: 'Extended usable operating lifespan for existing city landfills' }
    ],
    correct: ['a', 'b', 'd']
  };
  const [multiSelected, setMultiSelected] = useState([]);

  // Task 4: MCQ Single Answer
  const mcqSingleData = {
    passage:
      'Community libraries have evolved far beyond traditional quiet book repositories over the last twenty years. While lending printed novels remains central, modern branches increasingly operate as neighborhood technology hubs providing high-speed workstation access, resume-writing workshops, and beginner language conversation circles for newcomers settling into the workforce.',
    question: 'What is the main idea emphasized in the paragraph?',
    options: [
      { id: 'a', text: 'Public libraries now refuse to lend printed fiction books to visitors.' },
      { id: 'b', text: 'Modern library branches serve expanded practical community and career functions.' },
      { id: 'c', text: 'Residents primarily visit libraries exclusively for quiet private reading rooms.' },
      { id: 'd', text: 'Newcomers must pay annual tuition to attend neighborhood workshops.' }
    ],
    correct: 'b'
  };
  const [singleSelected, setSingleSelected] = useState('');

  // Task 5: Reorder Paragraphs
  const initialParagraphs = [
    { id: 'B', text: 'Once residents approved the trail budget, engineers installed solar pathway lights and permeable paving.' },
    { id: 'D', text: 'Consequently, weekday bicycle commuting along the corridor doubled within a single summer season.' },
    { id: 'A', text: 'For years, an abandoned freight rail corridor divided two residential districts in the town.' },
    { id: 'C', text: 'Local council planners eventually proposed converting the overgrown strip into a continuous pedestrian greenway.' }
  ];
  const correctOrder = ['A', 'C', 'B', 'D'];
  const [paraItems, setParaItems] = useState(initialParagraphs);

  const taskConfigs = {
    'rw-fib': {
      id: 'rw-fib',
      title: 'Reading & Writing FIB',
      pillLabel: 'Reading and Writing FIB',
      shortDesc: 'Read a text with several gaps, then choose the correct word for each gap from drop-down options.',
      impact: 'High Score Impact',
      impactColor: 'bg-sky-50 text-sky-600 border-sky-200',
      countBadge: '1/996',
      questionsMeta: '5-6 questions',
      skillsMeta: 'Reading & Writing',
      icon: FileText,
      tableSpecs: {
        task: 'A passage appears with blanks. Select the accurate word from each drop-down list.',
        skills: 'Reading & Writing',
        promptLength: 'Text up to 200 words',
        questions: '5 - 6'
      },
      proTip: 'Use grammar agreement and sentence context clues to confirm the exact part of speech for each blank.'
    },
    'r-fib': {
      id: 'r-fib',
      title: 'Reading FIB',
      pillLabel: 'Reading FIB',
      shortDesc: 'Place words from the bank into missing gaps within a short everyday passage.',
      impact: 'Moderate Score Impact',
      impactColor: 'bg-amber-50 text-amber-600 border-amber-200',
      countBadge: '1/1067',
      questionsMeta: '4-5 questions',
      skillsMeta: 'Reading',
      icon: BookOpen,
      tableSpecs: {
        task: 'Read the passage and fill in the missing blanks using words provided below.',
        skills: 'Reading',
        promptLength: 'Text up to 80 words',
        questions: '4 - 5'
      },
      proTip: 'Check adjacent prepositions and collocations (e.g., "reduce ___", "adjust to") to eliminate distractors rapidly.'
    },
    'mcq-multiple': {
      id: 'mcq-multiple',
      title: 'Multiple Choice, Multiple Answers',
      pillLabel: 'Multiple Choice, Multiple Answers',
      shortDesc: 'Read the passage and select all statements that accurately reflect the text.',
      impact: 'Low Score Impact',
      impactColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      countBadge: '1/188',
      questionsMeta: '1-2 questions',
      skillsMeta: 'Reading',
      icon: ListChecks,
      tableSpecs: {
        task: 'Read the passage and select more than one valid response option.',
        skills: 'Reading',
        promptLength: 'Text up to 200 words',
        questions: '1 - 2'
      },
      proTip: 'Beware of negative marking: only select options explicitly verified by the passage.'
    },
    'mcq-single': {
      id: 'mcq-single',
      title: 'Multiple Choice, Single Answer',
      pillLabel: 'Multiple Choice, Single Answer',
      shortDesc: 'Identify the single correct statement or main point after reading a brief text.',
      impact: 'Low Score Impact',
      impactColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      countBadge: '1/263',
      questionsMeta: '1-2 questions',
      skillsMeta: 'Reading',
      icon: HelpCircle,
      tableSpecs: {
        task: 'Read the passage carefully and choose the single best answer.',
        skills: 'Reading',
        promptLength: 'Text up to 150 words',
        questions: '1 - 2'
      },
      proTip: 'Read the question prompt first so you know what specific detail or inference to scan for.'
    },
    'reorder-paragraph': {
      id: 'reorder-paragraph',
      title: 'Reorder Paragraph',
      pillLabel: 'Reorder Paragraphs',
      shortDesc: 'Arrange disconnected text boxes into one coherent, logical paragraph sequence.',
      impact: 'Moderate Score Impact',
      impactColor: 'bg-amber-50 text-amber-600 border-amber-200',
      countBadge: '1/818',
      questionsMeta: '2-3 questions',
      skillsMeta: 'Reading',
      icon: Columns,
      tableSpecs: {
        task: 'Reorder the text boxes into their original chronological and logical structure.',
        skills: 'Reading',
        promptLength: 'Text up to 150 words',
        questions: '2 - 3'
      },
      proTip: 'Points are awarded for each correctly adjacent pair—link pronouns ("these", "it") to their preceding nouns.'
    }
  };

  const taskOrder = ['rw-fib', 'r-fib', 'mcq-multiple', 'mcq-single', 'reorder-paragraph'];
  const current = taskConfigs[activeTask] || taskConfigs['rw-fib'];

  const handleTaskSwitch = (id) => {
    setActiveTask(id);
    setTimerRunning(false);
    setSecondsLeft(600);
    setShowAnswerKey(false);
    setScoreResult(null);
  };

  // Timer tick
  useEffect(() => {
    if (!timerRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  const formatMMSS = (total) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const handleResetCurrent = () => {
    setTimerRunning(false);
    setSecondsLeft(600);
    setShowAnswerKey(false);
    setScoreResult(null);
    if (activeTask === 'rw-fib') setRwSelections(['', '', '', '', '']);
    if (activeTask === 'r-fib') {
      setRFibSlots(['', '', '', '']);
      setActiveRFibSlot(0);
    }
    if (activeTask === 'mcq-multiple') setMultiSelected([]);
    if (activeTask === 'mcq-single') setSingleSelected('');
    if (activeTask === 'reorder-paragraph') setParaItems(initialParagraphs);
  };

  const handleWordBankPick = (word) => {
    const nextSlots = [...rFibSlots];
    nextSlots[activeRFibSlot] = word;
    setRFibSlots(nextSlots);
    const nextEmpty = nextSlots.findIndex((s) => s === '');
    if (nextEmpty !== -1) setActiveRFibSlot(nextEmpty);
  };

  const movePara = (index, dir) => {
    const next = [...paraItems];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    setParaItems(next);
  };

  const evaluateReadingScore = () => {
    let earned = 0;
    let total = 1;

    if (activeTask === 'rw-fib') {
      total = rwFibData.answers.length;
      earned = rwSelections.filter((v, idx) => v === rwFibData.answers[idx]).length;
    } else if (activeTask === 'r-fib') {
      total = rFibData.answers.length;
      earned = rFibSlots.filter((v, idx) => v === rFibData.answers[idx]).length;
    } else if (activeTask === 'mcq-multiple') {
      total = mcqMultiData.correct.length;
      let raw = 0;
      multiSelected.forEach((opt) => {
        if (mcqMultiData.correct.includes(opt)) raw += 1;
        else raw -= 1;
      });
      earned = Math.max(0, raw);
    } else if (activeTask === 'mcq-single') {
      total = 1;
      earned = singleSelected === mcqSingleData.correct ? 1 : 0;
    } else if (activeTask === 'reorder-paragraph') {
      total = correctOrder.length - 1; // Adjacent pairs
      const ids = paraItems.map((p) => p.id);
      for (let i = 0; i < ids.length - 1; i++) {
        const cIdx = correctOrder.indexOf(ids[i]);
        if (cIdx !== -1 && correctOrder[cIdx + 1] === ids[i + 1]) {
          earned += 1;
        }
      }
    }

    const scaled = Math.round(10 + (earned / total) * 80);
    setScoreResult({ earned, total, scaled });
  };

  const completedCount =
    activeTask === 'rw-fib'
      ? rwSelections.filter(Boolean).length
      : activeTask === 'r-fib'
      ? rFibSlots.filter(Boolean).length
      : activeTask === 'mcq-multiple'
      ? multiSelected.length
      : activeTask === 'mcq-single'
      ? singleSelected
        ? 1
        : 0
      : paraItems.length;

  const totalSlotsCount =
    activeTask === 'rw-fib' ? 5 : activeTask === 'r-fib' ? 4 : activeTask === 'reorder-paragraph' ? 4 : 1;

  // In-Depth Module Guide Accordion Data (All 5 Reading Tasks)
  const guideItems = [
    {
      id: 'rw-fib',
      num: 1,
      title: 'Reading and Writing Fill in the Blanks',
      meta: 'Highest Priority',
      badge: 'Highest Priority',
      description:
        'In this task, you see a workplace or everyday informative passage (up to 200 words) with missing blanks. Select the most grammatically sound and contextually exact word from each drop-down list.',
      note: 'Read surrounding clauses carefully before choosing—each correct blank boosts both Reading and Writing scores simultaneously.',
      scoringFocus: 'Partial credit (for each correctly completed blank)',
      skills: ['Reading & Writing'],
      mistakes: [
        'Choosing words purely on familiarity rather than contextual fit',
        'Overlooking tense, subject-verb agreement, or preposition clues',
        'Skipping ahead without reading full sentences before and after blanks',
        'Rushing without understanding the overall paragraph meaning'
      ],
      proTip:
        'Read the full sentence holding the blank and verify both grammatical role (noun/verb/adjective) and semantic logic before confirming.'
    },
    {
      id: 'mcq-multiple',
      num: 2,
      title: 'Multiple Choice, Multiple Answers',
      meta: 'Low Priority',
      badge: 'Low Priority',
      description:
        'Read an informative passage and select every option statement that accurately reflects facts expressed in the text. Typically two to three options are valid.',
      note: 'Negative marking applies: selecting incorrect statements subtracts points earned from right selections.',
      scoringFocus: 'Partial credit with negative marking (+1 correct, -1 incorrect)',
      skills: ['Reading comprehension', 'Detail verification'],
      mistakes: [
        'Guessing uncertain options despite negative marking penalties',
        'Spending over 2.5 minutes per low-weight multiple-choice prompt'
      ],
      proTip:
        'Only tick choices you can directly underline inside the text. Leaving out a doubtful option avoids losing earned points.'
    },
    {
      id: 'reorder-paragraph',
      num: 3,
      title: 'Reorder Paragraph',
      meta: 'Moderate Priority',
      badge: 'Moderate Priority',
      description:
        'Several disconnected text boxes appear in scrambled sequence. Arrange them cleanly from top to bottom so they read as a cohesive paragraph.',
      note: 'Scoring checks valid adjacent pairs rather than strictly all-or-nothing sequences.',
      scoringFocus: '1 point per correctly adjacent pair',
      skills: ['Discourse structure', 'Logical coherence'],
      mistakes: [
        'Starting with a box opening with unresolved pronouns ("However, he...", "This issue...")',
        'Failing to link chronological dates or cause-effect connectors'
      ],
      proTip:
        'Find the standalone topic sentence first (no backward pronoun references), then pair subsequent sentences via noun-to-pronoun links.'
    },
    {
      id: 'r-fib',
      num: 4,
      title: 'Reading Fill in the Blanks',
      meta: 'Moderate Priority',
      badge: 'Moderate Priority',
      description:
        'You read a short passage (~80 words) with empty blanks alongside a pool of extra words below. Place the right word into each gap.',
      note: 'More words appear in the bank than empty blanks, so unused distractors remain.',
      scoringFocus: 'Partial credit (+1 per accurate blank)',
      skills: ['Vocabulary collocation', 'Contextual reading'],
      mistakes: [
        'Ignoring singular vs plural noun cues or verb tense consistency',
        'Leaving blanks empty instead of applying process of elimination'
      ],
      proTip:
        'Solve the easiest unmistakable grammar gaps first to shrink the remaining word pool for trickier blanks.'
    },
    {
      id: 'mcq-single',
      num: 5,
      title: 'Multiple Choice, Single Answer',
      meta: 'Low Priority',
      badge: 'Low Priority',
      description:
        'Read a concise text and identify the one option that best matches the writer’s purpose, tone, or explicit detail.',
      note: 'No negative marking applies here—never leave it unanswered before clicking Next.',
      scoringFocus: '1 mark for accurate option',
      skills: ['Main-idea scanning', 'Inference'],
      mistakes: [
        'Selecting an option using exact passage buzzwords twisted into false claims',
        'Over-budgeting valuable test time needed later for Fill in the Blanks'
      ],
      proTip:
        'Keep strict pacing under 90 seconds per item; eliminate clearly extreme ("always", "never") options quickly.'
    }
  ];

  // Scoring Matrix Right Panel Data ("How PTE Core Reading Is Scored?" Page 3)
  const scoringDetails = [
    {
      taskTitle: 'Reading and Writing Fill in the Blanks',
      badge: 'TASK 1 OF 5',
      subLabel: 'Reading & Writing',
      skills: 'Reading & Writing',
      partialCredit: 'Yes',
      body: [
        'Your score depends on choosing exact contextually and grammatically accurate options from drop-down menus across the passage. Each accurate blank earns partial credit.',
        'Because each item simultaneously feeds both Reading and Writing scores, strong performance here provides major gains across multiple CLB thresholds.'
      ]
    },
    {
      taskTitle: 'Multiple Choice, Multiple Answers',
      badge: 'TASK 2 OF 5',
      subLabel: 'Reading',
      skills: 'Reading',
      partialCredit: 'Yes (Negative Marking Applies)',
      body: [
        'Each valid response earns +1 point while each incorrect choice deducts 1 point, floored at zero for the item.',
        'Prioritize precision over volume—only choose statements clearly verified in the source text.'
      ]
    },
    {
      taskTitle: 'Reorder Paragraph',
      badge: 'TASK 3 OF 5',
      subLabel: 'Reading',
      skills: 'Reading',
      partialCredit: 'Yes (Adjacent Pairs)',
      body: [
        'Scores award +1 mark for every pair of text boxes placed in valid consecutive adjacent order, meaning partially accurate sequences still gain valuable points.',
        'Look closely at cohesive transition words and timeline continuity.'
      ]
    },
    {
      taskTitle: 'Reading Fill in the Blanks',
      badge: 'TASK 4 OF 5',
      subLabel: 'Reading',
      skills: 'Reading',
      partialCredit: 'Yes',
      body: [
        'Each correctly placed word receives 1 point with zero negative deductions for wrong selections.',
        'Mastery of natural English phrasing and grammatical word types ensures high accuracy here.'
      ]
    },
    {
      taskTitle: 'Multiple Choice, Single Answer',
      badge: 'TASK 5 OF 5',
      subLabel: 'Reading',
      skills: 'Reading',
      partialCredit: 'No (1 or 0)',
      body: [
        'Select one valid answer; +1 mark is credited if accurate and 0 if incorrect.',
        'Use elimination to narrow to two choices quickly before confirming against the passage.'
      ]
    }
  ];

  const activeScoring = scoringDetails[scoringTabIdx] || scoringDetails[0];

  // 6 Reading Strategy Lesson Cards (Page 4 Layout)
  const videoLessons = [
    {
      num: '01',
      tag: 'READING SECTION',
      tagColor: 'bg-[#00c5cd]',
      bannerTitle: 'PTE READING STRATEGY',
      bannerSub: 'Time Management & Weightage',
      title: 'PTE Reading Section Updates & Strategy | How to Score High',
      duration: '10:12'
    },
    {
      num: '02',
      tag: 'R&W FIB',
      tagColor: 'bg-[#22c55e]',
      bannerTitle: 'SOLVE DROPDOWN BLANKS',
      bannerSub: 'Grammar & Collocation Rules',
      title: 'How to Solve PTE Fill in the Blanks (Dropdown) | Proven Strategy',
      duration: '11:45'
    },
    {
      num: '03',
      tag: 'MCQ MULTIPLE',
      tagColor: 'bg-sky-600',
      bannerTitle: 'MCQ MULTIPLE ANSWERS',
      bannerSub: 'Avoid Negative Marking Traps',
      title: 'PTE Reading MCQ Multiple Answers Made Easy | Live Examples',
      duration: '08:20'
    },
    {
      num: '04',
      tag: 'MCQ SINGLE',
      tagColor: 'bg-indigo-600',
      bannerTitle: 'MCQ SINGLE ANSWER',
      bannerSub: '90-Second Scanning Method',
      title: 'PTE Reading MCQ Single Answer | Fast Elimination Techniques',
      duration: '07:55'
    },
    {
      num: '05',
      tag: 'REORDER',
      tagColor: 'bg-[#f0854d]',
      bannerTitle: 'REORDER PARAGRAPHS',
      bannerSub: 'Stop Guessing Adjacent Pairs',
      title: 'Master PTE Reorder Paragraphs | Find Topic Sentences Fast',
      duration: '12:08'
    },
    {
      num: '06',
      tag: 'READING FIB',
      tagColor: 'bg-purple-600',
      bannerTitle: 'FILL IN BLANKS (DRAG)',
      bannerSub: 'Contextual Word Bank Clues',
      title: 'PTE Fill in the Blanks (Drag & Drop) | Step-by-Step Guide',
      duration: '09:40'
    }
  ];

  const faqs = [
    {
      q: 'What skills are tested in the PTE Core Reading section?',
      a: 'PTE Core Reading assesses comprehension of practical everyday and workplace passages, vocabulary precision in context, grammatical awareness, and logical discourse organization.'
    },
    {
      q: 'How long does the PTE Core Reading section take?',
      a: 'Part 2 (Reading) runs on a unified 27 to 37 minute overall section timer. Candidates pace themselves across roughly 13 to 18 reading items before the section submits.'
    },
    {
      q: 'How many question types are included in PTE Core Reading?',
      a: 'There are 5 distinct question formats: Reading & Writing Fill in the Blanks, Reading Fill in the Blanks, Reorder Paragraphs, Multiple Choice Single Answer, and Multiple Choice Multiple Answers.'
    },
    {
      q: 'Does PTE Core Reading affect writing scores as well?',
      a: 'Yes! Reading & Writing Fill in the Blanks contributes heavily to both your Reading CLB score and your Writing CLB score.'
    },
    {
      q: 'Is there negative marking in PTE Core Reading?',
      a: 'Negative marking applies exclusively to Multiple Choice, Multiple Answers (+1 per right selection, -1 per incorrect selection). All Fill in the Blanks, Reorder Paragraphs, and Single Answer questions have zero negative penalty.'
    },
    {
      q: 'Does the PTE Core Reading module test listening or speaking skills?',
      a: 'No audio or microphone prompts appear in Part 2. Wait until Listening (Part 3) for auditory questions.'
    },
    {
      q: 'How can I practice PTE Core Reading online?',
      a: 'Use the interactive live simulators right above or take a timed sectional mock test on NinetyPTE to build scanning speed and pinpoint recurring grammar gaps.'
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
      {/* 1. HERO HEADER, MODULE SWITCHER & 5 INTERACTIVE CARDS (Page 1)            */}
      {/* ========================================================================= */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Reading Practice</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Practice all PTE Core Reading question types with AI-powered scoring, instant feedback, and exam-style questions.
            </p>
          </div>

          {/* 4 Module Pills Switcher */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 border border-slate-200/80">
            <Link
              to="/pte-core-speaking-practice"
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white flex items-center gap-1.5 transition"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Speaking</span>
            </Link>
            <Link
              to="/pte-core-writing-practice"
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white flex items-center gap-1.5 transition"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Writing</span>
            </Link>
            <Link
              to="/pte-core-reading-practice"
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#00c5cd] text-white shadow-xs flex items-center gap-1.5 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading</span>
            </Link>
            <Link
              to="/pte-core-listening-practice"
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white flex items-center gap-1.5 transition"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Listening</span>
            </Link>
          </div>

          {/* 5 Reading Task Selector Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 text-left">
            {taskOrder.map((taskId) => {
              const t = taskConfigs[taskId];
              const isSelected = activeTask === taskId;
              const IconComp = t.icon;
              return (
                <button
                  key={taskId}
                  onClick={() => handleTaskSwitch(taskId)}
                  className={`p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-4 relative text-left ${
                    isSelected
                      ? 'bg-white border-2 border-[#00c5cd] shadow-md ring-2 ring-[#00c5cd]/10'
                      : 'bg-white border border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-cyan-50 text-[#00c5cd] border border-cyan-200'
                          : 'bg-slate-50 text-slate-500 border border-slate-200'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#00c5cd]' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#00c5cd]" />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{t.title}</h3>
                    <div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${t.impactColor}`}>
                        {t.impact}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    <span>{t.countBadge}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00c5cd]' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Task Horizontal Summary Banner */}
          <div className="bg-cyan-50/40 border border-cyan-200/90 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00c5cd] text-white flex items-center justify-center shrink-0 shadow-xs">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{current.title}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 max-w-lg">{current.shortDesc}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                <span>• {current.questionsMeta}</span>
                <span>• {current.skillsMeta}</span>
              </div>

              <a
                href="#practice-workspace"
                className="px-5 py-2 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 shrink-0"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ANCHOR PILLS BAR                                                       */}
      {/* ========================================================================= */}
      <div className="border-y border-slate-100 bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {[
            { id: 'practice', label: 'Practice', href: '#practice-workspace' },
            { id: 'overview', label: 'Overview', href: '#overview' },
            { id: 'task-types', label: 'Task Types', href: '#task-types' },
            { id: 'scoring', label: 'Scoring', href: '#scoring' },
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
      {/* 3. KNOW ALL ABOUT PTE CORE READING QUESTIONS + LIVE WORKSPACE             */}
      {/* ========================================================================= */}
      <section id="practice-workspace" className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Know All About PTE Core <span className="text-[#00c5cd]">Reading Practice Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Familiarize yourself with each PTE Core reading task style. Explore practice questions one by one with complete instruction summaries and helpful strategies below.
            </p>
          </div>

          {/* 5 Green-Active Sub-Task Pills matching PDF Page 1 Bottom */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {taskOrder.map((tid) => {
              const t = taskConfigs[tid];
              return (
                <button
                  key={tid}
                  onClick={() => handleTaskSwitch(tid)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                    activeTask === tid
                      ? 'bg-[#22c55e] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t.pillLabel}
                </button>
              );
            })}
          </div>

          {/* Soft Green Specs Bar (Matching Screenshot) */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Task</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.task}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Skills Assessed</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.skills}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Prompt Length</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.promptLength}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Questions</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.questions}</div>
            </div>
          </div>

          {/* 3-Step Flow Indicator */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 py-1">
            {['Read Passage', 'Select Appropriate Answers', 'Submit Response for Score'].map((st, idx) => (
              <div key={st} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center border ${
                      idx === 0
                        ? 'bg-[#22c55e] text-white border-[#22c55e]'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className={`font-semibold ${idx === 0 ? 'text-emerald-700' : 'text-slate-600'}`}>{st}</span>
                </div>
                {idx < 2 && <span className="w-8 sm:w-12 h-px bg-slate-200" />}
              </div>
            ))}
          </div>

          {/* ===================================================================== */}
          {/* INTERACTIVE READING SIMULATOR WORKSPACE CARD                          */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
            
            {/* Header Row */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-emerald-600">{current.pillLabel}</h3>
                <p className="text-xs text-slate-500">{current.shortDesc}</p>
              </div>
            </div>

            {/* Timer & Action Top Bar (Green matching PDF Page 1 Bottom) */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-700">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{formatMMSS(secondsLeft)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="px-4 py-1.5 rounded-lg bg-[#22c55e] hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timerRunning ? 'Pause' : 'Click to Start'}</span>
                </button>
                <button
                  onClick={() => setShowAnswerKey(!showAnswerKey)}
                  className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                    showAnswerKey
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Answer
                </button>
              </div>
            </div>

            {/* INNER QUESTION INTERFACE PER TASK */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/40 space-y-4">
              
              {/* Subheader strip inside card */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/80 text-[11px]">
                <span className="font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {activeTask === 'rw-fib'
                      ? rwFibData.topic
                      : activeTask === 'r-fib'
                      ? rFibData.topic
                      : 'EVERYDAY WORKPLACE & MUNICIPAL PASSAGE'}
                  </span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 font-semibold text-slate-600">
                  {completedCount} / {totalSlotsCount} Completed
                </span>
              </div>

              {/* 1. READING & WRITING FIB (DROPDOWN) */}
              {activeTask === 'rw-fib' && (
                <div className="text-xs sm:text-sm text-slate-800 leading-loose font-normal space-y-3">
                  <p>
                    Rapid metropolitan growth across major commuter belts has intensified daily highway{' '}
                    <select
                      value={rwSelections[0]}
                      onChange={(e) => {
                        const n = [...rwSelections];
                        n[0] = e.target.value;
                        setRwSelections(n);
                      }}
                      className="mx-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-xs text-slate-800 focus:border-[#22c55e] focus:outline-hidden"
                    >
                      <option value="">Select Answer ▾</option>
                      {rwFibData.options[0].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>{' '}
                    during peak business hours. Urban councils increasingly emphasize that clean,{' '}
                    <select
                      value={rwSelections[1]}
                      onChange={(e) => {
                        const n = [...rwSelections];
                        n[1] = e.target.value;
                        setRwSelections(n);
                      }}
                      className="mx-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-xs text-slate-800 focus:border-[#22c55e] focus:outline-hidden"
                    >
                      <option value="">Select Answer ▾</option>
                      {rwFibData.options[1].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>{' '}
                    public transit networks remain essential for connecting suburban neighborhoods with central employment districts.
                  </p>
                  <p>
                    Rather than continually pouring funds into wider asphalt freeways, planners propose upgrading light-rail corridors so trains can{' '}
                    <select
                      value={rwSelections[2]}
                      onChange={(e) => {
                        const n = [...rwSelections];
                        n[2] = e.target.value;
                        setRwSelections(n);
                      }}
                      className="mx-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-xs text-slate-800 focus:border-[#22c55e] focus:outline-hidden"
                    >
                      <option value="">Select Answer ▾</option>
                      {rwFibData.options[2].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>{' '}
                    service frequency cleanly. Coupled with employer commuter{' '}
                    <select
                      value={rwSelections[3]}
                      onChange={(e) => {
                        const n = [...rwSelections];
                        n[3] = e.target.value;
                        setRwSelections(n);
                      }}
                      className="mx-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-xs text-slate-800 focus:border-[#22c55e] focus:outline-hidden"
                    >
                      <option value="">Select Answer ▾</option>
                      {rwFibData.options[3].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    , balanced transit infrastructure measurably lowers regional vehicle{' '}
                    <select
                      value={rwSelections[4]}
                      onChange={(e) => {
                        const n = [...rwSelections];
                        n[4] = e.target.value;
                        setRwSelections(n);
                      }}
                      className="mx-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold text-xs text-slate-800 focus:border-[#22c55e] focus:outline-hidden"
                    >
                      <option value="">Select Answer ▾</option>
                      {rwFibData.options[4].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>{' '}
                    throughout every season.
                  </p>

                  {showAnswerKey && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                      Correct Keys: {rwFibData.answers.join(' • ')}
                    </div>
                  )}
                </div>
              )}

              {/* 2. READING FIB (WORD BANK CLICK TO PLACE) */}
              {activeTask === 'r-fib' && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-800 leading-loose font-normal">
                    Workplace lighting studies show that poor overhead glare contributes rapidly to afternoon eye{' '}
                    <button
                      type="button"
                      onClick={() => setActiveRFibSlot(0)}
                      className={`inline-flex items-center px-3 py-0.5 mx-1 rounded-lg border font-bold text-xs cursor-pointer ${
                        activeRFibSlot === 0
                          ? 'border-[#22c55e] bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {rFibSlots[0] || '[ Blank 1 ]'}
                    </button>
                    . Modern architectural offices increasingly channel indirect{' '}
                    <button
                      type="button"
                      onClick={() => setActiveRFibSlot(1)}
                      className={`inline-flex items-center px-3 py-0.5 mx-1 rounded-lg border font-bold text-xs cursor-pointer ${
                        activeRFibSlot === 1
                          ? 'border-[#22c55e] bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {rFibSlots[1] || '[ Blank 2 ]'}
                    </button>{' '}
                    daylight across floor plans to lift staff mood and steady{' '}
                    <button
                      type="button"
                      onClick={() => setActiveRFibSlot(2)}
                      className={`inline-flex items-center px-3 py-0.5 mx-1 rounded-lg border font-bold text-xs cursor-pointer ${
                        activeRFibSlot === 2
                          ? 'border-[#22c55e] bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {rFibSlots[2] || '[ Blank 3 ]'}
                    </button>
                    , complemented by individually{' '}
                    <button
                      type="button"
                      onClick={() => setActiveRFibSlot(3)}
                      className={`inline-flex items-center px-3 py-0.5 mx-1 rounded-lg border font-bold text-xs cursor-pointer ${
                        activeRFibSlot === 3
                          ? 'border-[#22c55e] bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {rFibSlots[3] || '[ Blank 4 ]'}
                    </button>{' '}
                    desk task lamps.
                  </p>

                  {/* Interactive Word Bank */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Word Bank (Click a blank above, then select a word below)
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {rFibData.wordBank.map((w) => {
                        const used = rFibSlots.includes(w);
                        return (
                          <button
                            key={w}
                            type="button"
                            onClick={() => handleWordBankPick(w)}
                            className={`px-3 py-1 rounded-lg border text-xs font-bold transition cursor-pointer ${
                              used
                                ? 'bg-slate-100 border-slate-200 text-slate-400'
                                : 'bg-emerald-50/50 border-emerald-200 text-slate-800 hover:bg-emerald-100'
                            }`}
                          >
                            {w}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {showAnswerKey && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                      Correct Keys: {rFibData.answers.join(' • ')}
                    </div>
                  )}
                </div>
              )}

              {/* 3. MCQ MULTIPLE ANSWERS */}
              {activeTask === 'mcq-multiple' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                  <div className="md:col-span-6 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed text-slate-700">
                    {mcqMultiData.passage}
                  </div>
                  <div className="md:col-span-6 space-y-2.5">
                    <div className="font-bold text-slate-900">{mcqMultiData.question}</div>
                    {mcqMultiData.options.map((opt) => {
                      const checked = multiSelected.includes(opt.id);
                      const isCorrect = mcqMultiData.correct.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition ${
                            checked ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setMultiSelected((prev) =>
                                prev.includes(opt.id) ? prev.filter((x) => x !== opt.id) : [...prev, opt.id]
                              )
                            }
                            className="mt-0.5 accent-[#22c55e]"
                          />
                          <span className="text-slate-800 font-medium">{opt.text}</span>
                          {showAnswerKey && isCorrect && (
                            <span className="ml-auto text-[10px] font-bold text-emerald-700">✓ Correct</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. MCQ SINGLE ANSWER */}
              {activeTask === 'mcq-single' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                  <div className="md:col-span-6 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed text-slate-700">
                    {mcqSingleData.passage}
                  </div>
                  <div className="md:col-span-6 space-y-2.5">
                    <div className="font-bold text-slate-900">{mcqSingleData.question}</div>
                    {mcqSingleData.options.map((opt) => {
                      const selected = singleSelected === opt.id;
                      const isCorrect = opt.id === mcqSingleData.correct;
                      return (
                        <label
                          key={opt.id}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition ${
                            selected ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mcq-single"
                            checked={selected}
                            onChange={() => setSingleSelected(opt.id)}
                            className="mt-0.5 accent-[#22c55e]"
                          />
                          <span className="text-slate-800 font-medium">{opt.text}</span>
                          {showAnswerKey && isCorrect && (
                            <span className="ml-auto text-[10px] font-bold text-emerald-700">✓ Correct</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. REORDER PARAGRAPHS */}
              {activeTask === 'reorder-paragraph' && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 font-medium">Use the arrows to arrange these four sentences in logical chronological order:</p>
                  <div className="space-y-2">
                    {paraItems.map((p, idx) => (
                      <div key={p.id} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                            {p.id}
                          </span>
                          <span className="text-slate-800 leading-relaxed">{p.text}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => movePara(idx, -1)}
                            disabled={idx === 0}
                            className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => movePara(idx, 1)}
                            disabled={idx === paraItems.length - 1}
                            className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {showAnswerKey && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                      Correct Order: A → C → B → D
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Instant AI Score Feedback Panel */}
            {scoreResult && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Sparkles className="w-4 h-4 text-[#22c55e]" />
                  <span>
                    Score: {scoreResult.earned} / {scoreResult.total} Correct Items
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#22c55e] text-white text-xs font-extrabold">
                  Estimated Section Scale: {scoreResult.scaled} / 90
                </span>
              </div>
            )}

            {/* Footer Controls matching PDF Page 2 Top */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  <strong className="text-slate-700">Pro Tip:</strong> {current.proTip}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleResetCurrent}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  title="Reset question"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
                >
                  View More Questions
                </Link>
                <button
                  onClick={evaluateReadingScore}
                  className="px-5 py-2 rounded-lg bg-[#00c5cd] hover:bg-[#00b2ba] text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <span>Submit for AI Score</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dark Banner: Boost Your PTE Core Reading Performance */}
          <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 sm:p-10 text-center space-y-4 text-white shadow-lg">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Boost Your PTE Core Reading Performance
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Practice more reading questions with instant feedback and effective strategies to lift your score on NinetyPTE.
            </p>
            <div>
              <Link
                to="/dashboard"
                className="inline-block px-7 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-extrabold text-xs shadow-md transition"
              >
                Start PTE Core Reading Practice
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT IS THE PTE CORE READING SECTION?                                  */}
      {/* ========================================================================= */}
      <section id="overview" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Is the <span className="text-[#00c5cd]">PTE Core Reading Section</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              A complete guide to the PTE Core Reading section, covering test format, question types, smart techniques, and practical tips.
            </p>
          </div>

          <div className="bg-white border-2 border-[#00c5cd]/60 rounded-2xl p-6 shadow-2xs space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              The Reading module forms Part 2 of the PTE Core test and measures how reliably candidates comprehend written workplace communications, civic notices, and general factual articles.
            </p>
            <p>
              It comprises five distinct question formats timed under a collective section window lasting approximately 27–37 minutes in total. Strong pacing discipline enables consistent completion before section expiration.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <a
                href="#task-types"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00c5cd] hover:underline"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Explore the 5 PTE Core Reading Tasks &gt;</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IN-DEPTH MODULE GUIDE: PTE CORE READING TASK TYPES                     */}
      {/* ========================================================================= */}
      <section id="task-types" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00c5cd] text-[10px] font-extrabold uppercase tracking-wider">
              In-Depth Module Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Reading Task Types</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Explore formats, scoring rules, strategy scaffolds, and avoidable errors across all five reading tasks.
            </p>
          </div>

          <div className="space-y-3">
            {guideItems.map((item, idx) => {
              const isOpen = expandedType === idx;
              return (
                <div key={item.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => setExpandedType(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/60 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#00c5cd] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h3>
                        <p className="text-[11px] text-[#00c5cd] font-semibold">{item.meta}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-[#00c5cd] text-white">
                        • {item.badge}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#00c5cd]' : ''}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/30 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      <div className="lg:col-span-7 space-y-4">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.description}</p>
                        <p className="text-xs font-medium text-slate-700 leading-relaxed">{item.note}</p>

                        <div className="bg-cyan-50/50 border border-cyan-100 rounded-xl p-3.5 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                            <Target className="w-3.5 h-3.5 text-[#00c5cd]" />
                            <span>Scoring Focus</span>
                          </div>
                          <div className="text-xs font-bold text-slate-800">{item.scoringFocus}</div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-700 block">Skills assessed</span>
                          <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
                            {item.skills.map((s, si) => (
                              <span key={si} className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00c5cd]" />
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <button
                            onClick={() => handleTaskSwitch(item.id)}
                            className="px-5 py-2 rounded-full bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                          >
                            {item.title} Guide
                          </button>
                          <a
                            href="#practice-workspace"
                            onClick={() => handleTaskSwitch(item.id)}
                            className="px-5 py-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                          >
                            Sample questions
                          </a>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-4">
                        <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 space-y-2.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-rose-700">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Common Mistakes to Avoid</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                            {item.mistakes.map((m, mi) => (
                              <li key={mi}>{m}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-cyan-50/60 border border-cyan-200/80 rounded-2xl p-4 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#00c5cd]">
                            <Lightbulb className="w-3.5 h-3.5" />
                            <span>Pro Tip</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.proTip}</p>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW PTE CORE READING IS SCORED? (2-Pane Interactive Matrix Page 3)      */}
      {/* ========================================================================= */}
      <section id="scoring" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How PTE Core <span className="text-[#00c5cd]">Reading Is Scored</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Scoring evaluates contextual comprehension, grammatical precision, and task-specific partial credit rules across each format:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left Task List Tabs */}
            <div className="lg:col-span-5 space-y-2">
              {scoringDetails.map((sd, idx) => (
                <button
                  key={sd.taskTitle}
                  onClick={() => setScoringTabIdx(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition cursor-pointer flex items-center gap-3 ${
                    scoringTabIdx === idx
                      ? 'border-[#00c5cd] bg-white shadow-xs ring-2 ring-[#00c5cd]/10'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#00c5cd] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${scoringTabIdx === idx ? 'text-[#00c5cd]' : 'text-slate-900'}`}>
                      {sd.taskTitle}
                    </div>
                    <div className="text-[10px] text-slate-500">{sd.subLabel}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Scoring Breakdown Detail Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-[#00c5cd] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00c5cd]">{activeScoring.badge}</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">{activeScoring.taskTitle}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Skills</div>
                  <div className="font-extrabold text-[#00c5cd] mt-0.5">{activeScoring.skills}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Partial Credit</div>
                  <div className="font-extrabold text-[#00c5cd] mt-0.5">{activeScoring.partialCredit}</div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {activeScoring.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EXPERT TIPS + VIDEO LESSONS + WHY ONLINE + FAQS + FORM                 */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Expert Tips Checklist */}
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Expert Tips to Improve Your <span className="text-[#00c5cd]">PTE Core Reading Score</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Practical habits to read faster, analyze vocabulary clues, and improve score accuracy.
              </p>
            </div>

            <div className="bg-cyan-50/20 border-2 border-[#00c5cd]/40 rounded-2xl p-6 text-left max-w-4xl mx-auto space-y-3">
              {[
                { label: 'Practice with Exam-Focused Materials :', text: 'Use realistic PTE Core Reading practice sets to internalize genuine exam formats.' },
                { label: 'Focus on Understanding Meaning :', text: 'Scan full paragraph meaning first instead of guessing answers word-by-word.' },
                { label: 'Build Strong Vocabulary Skills :', text: 'Study everyday collocations and academic idioms in contextual reading passages.' },
                { label: 'Improve Time Management Skills :', text: 'Allocate ~2 minutes max to Fill in the Blanks and ~90 seconds to single MCQs.' },
                { label: 'Review Answers Before Submitting :', text: 'Double-check negative-marked Multiple Choice selections to eliminate risky guesses.' }
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">{tip.label}</strong> {tip.text}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/pte-core-mock-test"
              className="inline-block px-7 py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition"
            >
              Take a Full PTE Core Reading Practice Test
            </Link>
          </div>

          {/* Video Lessons Grid */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                PTE Core Reading Video <span className="text-[#00c5cd]">Lessons &amp; Expert Strategies</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-2xl mx-auto">
                Build speed and comprehension with structured step-by-step video walkthroughs covering each task type.
              </p>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 pt-1">
                QUESTION-WISE TUTORIALS • EXPERT READING STRATEGIES • EXAM-FOCUSED PRACTICE
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videoLessons.map((vid) => (
                <div
                  key={vid.num}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition group"
                >
                  <div className="h-44 bg-gradient-to-br from-[#0f172a] via-slate-800 to-slate-900 p-5 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider text-white ${vid.tagColor}`}>
                        {vid.tag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300">{vid.duration}</span>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="text-sm sm:text-base font-black tracking-tight text-amber-400">
                        {vid.bannerTitle}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-200">{vid.bannerSub}</div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-[#00c5cd] text-slate-900 group-hover:text-white flex items-center justify-center shadow-lg transition">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-start gap-2 bg-white">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-50 text-[#00c5cd] font-bold text-[10px] shrink-0">
                      {vid.num}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">{vid.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                to="/pte-online-course"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition"
              >
                <span>Explore More Videos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Dark Mock Banner */}
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready to take our <span className="text-[#00c5cd]">PTE Core Free Mock Test</span>?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Get full access to interactive materials, scored reading tests, and personalized CLB analytics.
              </p>
              <div className="pt-1">
                <Link
                  to="/pte-core-mock-test"
                  className="inline-block px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow-md transition"
                >
                  Register Now
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span>NinetyPTE AI Mock</span>
                </div>
                <div className="h-2.5 bg-slate-700 rounded w-3/4" />
                <div className="h-2.5 bg-slate-700 rounded w-1/2" />
                <div className="flex items-center gap-2 pt-1">
                  <div className="px-3 py-1.5 rounded-lg bg-[#00c5cd] text-white text-xs font-black">90</div>
                  <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold">Score Ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Practice PTE Core Reading Online with NinetyPTE? */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Practice <span className="text-[#00c5cd]">PTE Core Reading Online with NinetyPTE</span>?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Practicing PTE Core Reading online adapts you to computer-based comprehension tests while tracking speed and accuracy cleanly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              {[
                'Helps you become comfortable with the digital exam format and drop-down controls',
                'Improves your ability to budget section timing across differing reading tasks',
                'Strengthens recognition of grammatical markers and context clues',
                'Provides continuous access without relying on paper textbooks',
                'Builds consistent accuracy under timed computer-based conditions',
                'Supports independent self-paced improvement directly from home'
              ].map((benefit, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQS + ENQUIRY FORM (Page 5 Layout)                                    */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core Reading – <span className="text-[#00c5cd]">Frequently Asked Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Find answers to common questions regarding PTE Core Reading task mechanics, scoring, and strategies.
            </p>
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
                      <HelpCircle className="w-4 h-4 text-[#00c5cd] shrink-0" />
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

      {/* Bottom CTA + Enquiry Form */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Start Your <span className="text-[#00c5cd]">PTE Core Reading Practice Test on NinetyPTE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Our online reading practice tests provide a realistic exam preparation environment featuring:
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Full section simulation based on the real exam format</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Real exam timing to improve speed and accuracy</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> AI-based scoring to evaluate your performance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Detailed feedback to pinpoint and fix weak patterns</li>
            </ul>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-xs transition">
                Start Free Practice
              </Link>
              <Link to="/pte-core-mock-test" className="px-6 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition">
                Take a Full Mock Test
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
            <h3 className="text-base font-black text-slate-900">Enquiry Form</h3>
            {enquirySubmitted ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">Enquiry Submitted!</h4>
                <p className="text-xs text-slate-600">Our NinetyPTE preparation advisor will get in touch soon.</p>
                <button
                  onClick={() => setEnquirySubmitted(false)}
                  className="text-xs font-bold text-[#00c5cd] hover:underline cursor-pointer"
                >
                  Send Another Enquiry
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
      </section>

    </div>
  );
}
