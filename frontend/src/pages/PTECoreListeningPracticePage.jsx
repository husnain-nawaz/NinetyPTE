import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  PenTool,
  BookOpen,
  Headphones,
  ArrowRight,
  ArrowLeft,
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
  Pause,
  Volume2,
  ListChecks,
  Edit3,
  Highlighter
} from 'lucide-react';

export default function PTECoreListeningPracticePage() {
  const [activeTask, setActiveTask] = useState('summarize-spoken-text');
  const [cardPageIdx, setCardPageIdx] = useState(0); // Carousel slice (0 = tasks 0..4, 1 = tasks 2..6)
  const [activeSubNav, setActiveSubNav] = useState('practice');
  const [expandedType, setExpandedType] = useState(0);
  const [faqOpen, setFaqOpen] = useState({ 0: false });
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Practice Workspace Simulator States
  const [audioPhase, setAudioPhase] = useState('idle'); // 'idle' | 'prep' | 'playing' | 'done'
  const [prepLeft, setPrepLeft] = useState(5);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showScriptHint, setShowScriptHint] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Task-specific Answer States
  const [sstInput, setSstInput] = useState('');
  const [mcmaSelected, setMcmaSelected] = useState([]);
  const [lfibInputs, setLfibInputs] = useState(['', '', '', '']);
  const [mcsaSelected, setMcsaSelected] = useState('');
  const [smwSelected, setSmwSelected] = useState('');
  const [hiwSelected, setHiwSelected] = useState([]);
  const [wfdInput, setWfdInput] = useState('');

  const toggleFaq = (idx) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Sample Task Data (100% Original Workplace & Daily Living Prompts)
  const taskConfigs = {
    'summarize-spoken-text': {
      id: 'summarize-spoken-text',
      title: 'Summarize Spoken Text',
      pillLabel: 'Summarize Spoken Text',
      shortDesc: 'Listen to the audio and write a concise 20–30 word summary of the main points.',
      impact: 'Moderate Score Impact',
      impactColor: 'bg-amber-50 text-amber-600 border-amber-200',
      hasAiBadge: true,
      countBadge: '1/233',
      questionsMeta: '1-2 questions',
      skillsMeta: 'Listening & Writing',
      icon: FileText,
      durationLabel: '02:15',
      prepSec: 5,
      tableSpecs: {
        task: 'Listen to a recording. Then write a 20-30 word summary.',
        skills: 'Listening and Writing',
        promptLength: '45-75 seconds',
        timeToAnswer: '8 minutes',
        questions: '1 - 2'
      },
      practiceDesc:
        'Compose a summary of the audio recording in 20–30 words. Listening and Writing are jointly assessed within an 8-minute timer.',
      scriptText:
        'Audio Recording: "Cities expanding green rooftops see cooler summer building temperatures, slower stormwater runoff after heavy rainstorms, and slightly longer roof membrane lifespans—making grants for commercial rooftop gardens increasingly cost-effective."',
      proTip: 'Focus on the main idea and key details. Keep your summary strictly within 20–30 words using accurate grammar and spelling.'
    },
    'mcq-multiple': {
      id: 'mcq-multiple',
      title: 'Multiple Choice, Multiple Answers',
      pillLabel: 'Multiple Choice Multiple Answer',
      shortDesc: 'Listen to the audio recording and select all accurate statements.',
      impact: 'Low Score Impact',
      impactColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      hasAiBadge: false,
      countBadge: '1/193',
      questionsMeta: '1-2 questions',
      skillsMeta: 'Listening',
      icon: ListChecks,
      durationLabel: '01:20',
      prepSec: 5,
      tableSpecs: {
        task: 'Listen to the audio and choose multiple matching options.',
        skills: 'Listening',
        promptLength: '40-70 seconds',
        timeToAnswer: 'Self-paced section',
        questions: '1 - 2'
      },
      practiceDesc: 'Select every response option verified by the speaker. Wrong choices incur a negative deduction.',
      scriptText:
        'Audio Recording: "Starting next Monday, library patrons may renew digital loans twice online, borrow portable Wi-Fi hotspots for two-week periods, and attend evening resume clinics every Thursday without advance registration."',
      options: [
        { id: 'a', text: 'Digital library loans can be extended twice through online self-service.' },
        { id: 'b', text: 'Portable Wi-Fi hotspot units are loaned out for four full weeks.' },
        { id: 'c', text: 'Weekly resume workshops run on Thursday evenings without prior signup.' }
      ],
      correct: ['a', 'c'],
      proTip: 'Select only statements directly confirmed by the recording; never guess blindly under negative marking.'
    },
    'listening-fib': {
      id: 'listening-fib',
      title: 'Listening Fill in Blanks',
      pillLabel: 'Listening Fill in Blanks',
      shortDesc: 'Listen carefully and type each missing word directly into the passage gaps.',
      impact: 'Moderate Score Impact',
      impactColor: 'bg-amber-50 text-amber-600 border-amber-200',
      hasAiBadge: false,
      countBadge: '1/419',
      questionsMeta: '2-3 questions',
      skillsMeta: 'Listening & Writing',
      icon: Headphones,
      durationLabel: '00:55',
      prepSec: 5,
      tableSpecs: {
        task: 'Type missing exact words heard in the audio transcript.',
        skills: 'Listening and Writing',
        promptLength: '30-60 seconds',
        timeToAnswer: 'Self-paced section',
        questions: '2 - 3'
      },
      practiceDesc: 'Follow along line-by-line while listening and type exact spelled words into each blank box.',
      scriptText:
        'Neighborhood clinics now schedule routine checkups during evening shifts to ease daytime parking pressure and help commuters maintain consistent preventative healthcare records.',
      answers: ['routine', 'evening', 'parking', 'preventative'],
      proTip: 'Preview surrounding sentence words during the 5-second countdown so you anticipate upcoming blank locations.'
    },
    'mcq-single': {
      id: 'mcq-single',
      title: 'Multiple Choice, Single Answer',
      pillLabel: 'Multiple Choice, Single Answer',
      shortDesc: 'Listen once and identify the single most accurate option matching the audio.',
      impact: 'Low Score Impact',
      impactColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      hasAiBadge: false,
      countBadge: '1/204',
      questionsMeta: '1-2 questions',
      skillsMeta: 'Listening',
      icon: HelpCircle,
      durationLabel: '01:05',
      prepSec: 5,
      tableSpecs: {
        task: 'Listen to a spoken segment and select one best answer.',
        skills: 'Listening',
        promptLength: '30-60 seconds',
        timeToAnswer: 'Self-paced section',
        questions: '1 - 2'
      },
      practiceDesc: 'Determine the main purpose or primary attitude expressed by the speaker.',
      scriptText:
        'Audio Recording: "Although installing automated parcel lockers in apartment lobbies required modest upfront cabinet hardware costs, building managers eliminated lost deliveries and freed front-desk concierge staff for resident maintenance requests."',
      question: 'Why did property managers appreciate adding lobby parcel lockers?',
      options: [
        { id: 'a', text: 'They eliminated monthly building water utility billing completely.' },
        { id: 'b', text: 'They stopped misplaced packages and allowed staff to focus on maintenance support.' },
        { id: 'c', text: 'They replaced all postal carriers across the city district.' }
      ],
      correct: 'b',
      proTip: 'Read the question prompt quickly during prep seconds so you listen selectively for the core reason or attitude.'
    },
    'select-missing-word': {
      id: 'select-missing-word',
      title: 'Select Missing Word',
      pillLabel: 'Select Missing Word',
      shortDesc: 'Predict the final word or short phrase replaced by a beep at the end of the recording.',
      impact: 'Low Score Impact',
      impactColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      hasAiBadge: false,
      countBadge: '1/203',
      questionsMeta: '1-2 questions',
      skillsMeta: 'Listening',
      icon: Volume2,
      durationLabel: '00:45',
      prepSec: 5,
      tableSpecs: {
        task: 'Choose the word or phrase muted by the final beep.',
        skills: 'Listening',
        promptLength: '20-50 seconds',
        timeToAnswer: 'Self-paced section',
        questions: '1 - 2'
      },
      practiceDesc: 'Follow the speaker’s final sentence closely to select the natural semantic completion when the beep plays.',
      scriptText:
        'Audio Recording: "Before departing for an extended winter trip, homeowners should shut off outdoor garden taps and insulate exposed basement water pipes to avoid expensive [BEEP]."',
      options: [
        { id: 'a', text: 'plumbing repairs' },
        { id: 'b', text: 'commuter delays' },
        { id: 'c', text: 'garden picnics' }
      ],
      correct: 'a',
      proTip: 'Monitor the audio progress slider closely during the last 5 seconds so you catch the grammatical clue right before the beep.'
    },
    'highlight-incorrect-words': {
      id: 'highlight-incorrect-words',
      title: 'Highlight Incorrect Words',
      pillLabel: 'Highlight Incorrect Words',
      shortDesc: 'Click every word in the onscreen transcript that differs from the spoken recording.',
      impact: 'Moderate Score Impact',
      impactColor: 'bg-amber-50 text-amber-600 border-amber-200',
      hasAiBadge: false,
      countBadge: '1/265',
      questionsMeta: '1-2 questions',
      skillsMeta: 'Listening & Reading',
      icon: Highlighter,
      durationLabel: '00:50',
      prepSec: 5,
      tableSpecs: {
        task: 'Click words in the transcript that do not match what the speaker says.',
        skills: 'Listening and Reading',
        promptLength: '15-50 seconds',
        timeToAnswer: 'Self-paced section',
        questions: '1 - 2'
      },
      practiceDesc: 'Negative marking applies (+1 correct mismatch, -1 false click). Track the narrator word for word.',
      scriptText:
        'Spoken Audio Differs on Italicized Words: "Local volunteers planted eighty native oak saplings along the quiet riverbank trail early Saturday morning despite light spring drizzle."',
      transcriptWords: [
        { text: 'Local', wrong: false },
        { text: 'engineers', wrong: true, spoken: 'volunteers' },
        { text: 'planted', wrong: false },
        { text: 'eighty', wrong: false },
        { text: 'native', wrong: false },
        { text: 'pine', wrong: true, spoken: 'oak' },
        { text: 'saplings', wrong: false },
        { text: 'along', wrong: false },
        { text: 'the', wrong: false },
        { text: 'quiet', wrong: false },
        { text: 'riverbank', wrong: false },
        { text: 'trail', wrong: false },
        { text: 'early', wrong: false },
        { text: 'Sunday', wrong: true, spoken: 'Saturday' },
        { text: 'morning.', wrong: false }
      ],
      proTip: 'Move your mouse pointer steadily underneath each word as it is spoken so you click mismatches smoothly without guessing.'
    },
    'write-from-dictation': {
      id: 'write-from-dictation',
      title: 'Write From Dictation',
      pillLabel: 'Write From Dictation',
      shortDesc: 'Listen to a brief everyday sentence and transcribe every word accurately.',
      impact: 'High Score Impact',
      impactColor: 'bg-sky-50 text-sky-600 border-sky-200',
      hasAiBadge: false,
      countBadge: '1/912',
      questionsMeta: '3-4 questions',
      skillsMeta: 'Listening & Writing',
      icon: Edit3,
      durationLabel: '00:08',
      prepSec: 5,
      tableSpecs: {
        task: 'Type the exact spoken sentence with accurate spelling.',
        skills: 'Listening and Writing',
        promptLength: '3-5 seconds',
        timeToAnswer: 'Self-paced section',
        questions: '3 - 4'
      },
      practiceDesc: 'Highest-impact task in Listening! Points are earned for every exact correctly spelled word.',
      scriptText: 'Neighborhood recycling bins should reach the street curb prior to seven.',
      proTip: 'Proofread plural endings (-s/-es), articles ("a/the"), and verb tense endings before advancing.'
    }
  };

  const taskOrder = [
    'summarize-spoken-text',
    'mcq-multiple',
    'listening-fib',
    'mcq-single',
    'select-missing-word',
    'highlight-incorrect-words',
    'write-from-dictation'
  ];

  const visibleCarouselTasks = cardPageIdx === 0 ? taskOrder.slice(0, 5) : taskOrder.slice(2, 7);
  const current = taskConfigs[activeTask] || taskConfigs['summarize-spoken-text'];

  const handleTaskSwitch = (tid) => {
    setActiveTask(tid);
    setAudioPhase('idle');
    setPrepLeft(5);
    setAudioProgress(0);
    setShowScriptHint(false);
    setScoreResult(null);
  };

  // Simulated audio countdown + progress loop
  useEffect(() => {
    if (audioPhase !== 'prep' && audioPhase !== 'playing') return;
    const interval = setInterval(() => {
      if (audioPhase === 'prep') {
        setPrepLeft((p) => {
          if (p <= 1) {
            setAudioPhase('playing');
            return 0;
          }
          return p - 1;
        });
      } else if (audioPhase === 'playing') {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setAudioPhase('done');
            return 100;
          }
          return prev + 10;
        });
      }
    }, 800);
    return () => clearInterval(interval);
  }, [audioPhase]);

  const startAudioSimulation = () => {
    setScoreResult(null);
    setPrepLeft(3);
    setAudioProgress(0);
    setAudioPhase('prep');
  };

  const resetCurrentTask = () => {
    setAudioPhase('idle');
    setPrepLeft(5);
    setAudioProgress(0);
    setShowScriptHint(false);
    setScoreResult(null);
    if (activeTask === 'summarize-spoken-text') setSstInput('');
    if (activeTask === 'mcq-multiple') setMcmaSelected([]);
    if (activeTask === 'listening-fib') setLfibInputs(['', '', '', '']);
    if (activeTask === 'mcq-single') setMcsaSelected('');
    if (activeTask === 'select-missing-word') setSmwSelected('');
    if (activeTask === 'highlight-incorrect-words') setHiwSelected([]);
    if (activeTask === 'write-from-dictation') setWfdInput('');
  };

  const evaluateListeningScore = () => {
    let earned = 0;
    let total = 1;
    let note = '';

    if (activeTask === 'summarize-spoken-text') {
      const wc = sstInput.trim() ? sstInput.trim().split(/\s+/).length : 0;
      total = 10;
      earned = wc >= 20 && wc <= 30 ? 9 : wc >= 12 ? 6 : wc > 0 ? 3 : 0;
      note = `Word count: ${wc} words (Core target: 20–30 words).`;
    } else if (activeTask === 'mcq-multiple') {
      total = current.correct.length;
      let raw = 0;
      mcmaSelected.forEach((v) => (current.correct.includes(v) ? (raw += 1) : (raw -= 1)));
      earned = Math.max(0, raw);
      note = `Negative marking rule evaluated (${mcmaSelected.length} selected).`;
    } else if (activeTask === 'listening-fib') {
      total = current.answers.length;
      earned = lfibInputs.filter((v, idx) => v.trim().toLowerCase() === current.answers[idx]).length;
      note = `Exact word spelling matches counted.`;
    } else if (activeTask === 'mcq-single') {
      total = 1;
      earned = mcsaSelected === current.correct ? 1 : 0;
      note = mcsaSelected === current.correct ? 'Accurate main-point match.' : 'Review spoken recording statement.';
    } else if (activeTask === 'select-missing-word') {
      total = 1;
      earned = smwSelected === current.correct ? 1 : 0;
      note = smwSelected === current.correct ? 'Contextual ending prediction matched!' : 'Hint: cold taps + pipes lead to plumbing issues.';
    } else if (activeTask === 'highlight-incorrect-words') {
      const targetIdxs = current.transcriptWords.map((w, i) => (w.wrong ? i : -1)).filter((i) => i !== -1);
      total = targetIdxs.length;
      let raw = 0;
      hiwSelected.forEach((idx) => (targetIdxs.includes(idx) ? (raw += 1) : (raw -= 1)));
      earned = Math.max(0, raw);
      note = `Matched mismatches minus false highlights.`;
    } else if (activeTask === 'write-from-dictation') {
      const refWords = current.scriptText.replace('.', '').toLowerCase().split(/\s+/);
      const userWords = wfdInput.trim().toLowerCase().replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
      total = refWords.length;
      earned = refWords.filter((rw) => userWords.includes(rw)).length;
      note = `Matched ${earned} of ${total} dictated words.`;
    }

    const scaled = Math.round(10 + (earned / Math.max(1, total)) * 80);
    setScoreResult({ earned, total, scaled, note });
  };

  const sstWordCount = sstInput.trim() ? sstInput.trim().split(/\s+/).length : 0;

  // All 7 Module Guide Accordion Entries (matching Page 2 bottom & Page 3 top)
  const guideItems = [
    {
      id: 'summarize-spoken-text',
      num: 1,
      title: 'Summarize Spoken Text',
      meta: 'Moderate Priority',
      badge: 'Moderate Priority',
      description:
        'Candidates listen to a concise recording and compose a clear 20–30 word summary capturing its core theme and primary supporting arguments.',
      note: 'Each prompt allows one playback and grants an independent 8-minute window covering both Listening and Writing.',
      scoringFocus: 'Content, Form, Grammar, Vocabulary & Spelling',
      skills: ['Listening', 'Writing'],
      mistakes: [
        'Writing fewer than 20 words or exceeding 30 words',
        'Omitting the speaker’s main conclusion in favor of minor numbers',
        'Spelling errors or unpunctuated fragmented clauses',
        'Skipping final proofreading within the last 90 seconds'
      ],
      proTip:
        'Jot down 4–5 clean nouns and verbs while listening, weave them into two crisp sentences totaling 22–28 words, and inspect spelling thoroughly.'
    },
    {
      id: 'mcq-multiple',
      num: 2,
      title: 'Multiple Choice, Multiple Answers',
      meta: 'Low Priority',
      badge: 'Low Priority',
      description:
        'Listen to a short spoken clip and tick every option accurately reflecting facts confirmed in the audio.',
      note: 'Negative marking applies (+1 right option, -1 wrong option).',
      scoringFocus: 'Exact detail identification with penalty risk',
      skills: ['Listening'],
      mistakes: ['Selecting ambiguous options rather than verified statements', 'Overspending time needed for Write From Dictation'],
      proTip: 'Pick clearly certain matches only—avoid risky guessing.'
    },
    {
      id: 'listening-fib',
      num: 3,
      title: 'Fill in the Blanks',
      meta: 'Moderate Priority',
      badge: 'Moderate Priority',
      description:
        'Follow an onscreen passage transcript with blank boxes while listening, typing every missing word cleanly into the gaps.',
      note: 'Contributes heavily to both Listening accuracy and Writing spelling.',
      scoringFocus: 'Exact spelling match (+1 per accurate blank)',
      skills: ['Listening', 'Writing'],
      mistakes: ['Missing plural "-s" or past-tense "-ed" word endings', 'Falling behind the audio line while fixing spelling mid-stream'],
      proTip: 'Keep hands poised to type short approximations into notes or directly into gaps, then fix spelling right after audio ends.'
    },
    {
      id: 'mcq-single',
      num: 4,
      title: 'Multiple Choice, Single Answer',
      meta: 'Low Priority',
      badge: 'Low Priority',
      description:
        'Select one accurate answer capturing the main intent or specific supporting point after hearing one brief clip.',
      note: 'No negative deductions apply here.',
      scoringFocus: '1 point per correct single choice',
      skills: ['Listening'],
      mistakes: ['Focusing on repeated decoy nouns while missing speaker negation ("however", "instead")'],
      proTip: 'Understand the question during prep seconds before the speaker begins.'
    },
    {
      id: 'select-missing-word',
      num: 5,
      title: 'Select Missing Word',
      meta: 'Low Priority',
      badge: 'Low Priority',
      description:
        'The final word or phrase of an everyday audio recording is replaced by a tone. Choose the option completing the speaker’s sentence smoothly.',
      note: 'Contextual coherence matters heavily.',
      scoringFocus: '1 point per accurate completion',
      skills: ['Listening'],
      mistakes: ['Ignoring grammar fit between preceding adjective/preposition and option choices'],
      proTip: 'Watch the audio bar reach 85% so you concentrate intensely on the closing sentence.'
    },
    {
      id: 'highlight-incorrect-words',
      num: 6,
      title: 'Highlight Incorrect Words',
      meta: 'Moderate Priority',
      badge: 'Moderate Priority',
      description:
        'Read along while listening and click words onscreen that differ from what the speaker actually says.',
      note: 'Negative marking deducts 1 point per misclick on unchanged words.',
      scoringFocus: 'Partial credit (+1 correct mismatch, -1 wrong highlight)',
      skills: ['Listening', 'Reading'],
      mistakes: ['Clicking hastily when losing line position', 'Double-clicking an already highlighted mismatch and deselecting it'],
      proTip: 'Glide the mouse cursor slowly across each sentence right in sync with the narrator’s cadence.'
    },
    {
      id: 'write-from-dictation',
      num: 7,
      title: 'Write From Dictation',
      meta: 'Highest Priority',
      badge: 'Highest Priority',
      description:
        'Listen to a single brief everyday sentence (3–5 seconds) and transcribe the exact sequence of words.',
      note: 'Crucial final task awarding major marks to both Listening and Writing CLB thresholds.',
      scoringFocus: '1 point per correctly spelled matching word',
      skills: ['Listening', 'Writing'],
      mistakes: ['Spending too much earlier time leaving fewer than 3 minutes for WFD items', 'Omitting small articles or mis-spelling suffixes'],
      proTip: 'Keep at least 3–4 minutes reserved at the end of Listening so you transcribe every WFD word calmly and double-check spelling.'
    }
  ];

  // 6 Video Strategy Lessons (Branded Cleanly for NinetyPTE, matching Page 4 topics)
  const videoLessons = [
    {
      num: '01',
      tag: 'LISTENING FIB',
      tagColor: 'bg-[#00c5cd]',
      bannerTitle: 'LISTENING FILL IN BLANKS',
      bannerSub: 'High-Score Tricks & Spelling Rules',
      title: 'PTE Listening Fill in the Blanks: High-Score Tricks & Common Mistakes',
      duration: '09:30'
    },
    {
      num: '02',
      tag: 'HIGHEST PRIORITY',
      tagColor: 'bg-emerald-600',
      bannerTitle: 'WRITE FROM DICTATION',
      bannerSub: 'Maximize Listening & Writing Marks',
      title: 'Master Write From Dictation (WFD) to Boost Your PTE Core Score',
      duration: '11:20'
    },
    {
      num: '03',
      tag: 'MISSING WORD',
      tagColor: 'bg-sky-600',
      bannerTitle: 'SELECT MISSING WORD',
      bannerSub: 'Audio Ending Cue Strategy',
      title: 'PTE Core Listening: Select Missing Word Explained with Examples',
      duration: '07:45'
    },
    {
      num: '04',
      tag: 'HIGHLIGHT WORDS',
      tagColor: 'bg-[#f0854d]',
      bannerTitle: 'HIGHLIGHT INCORRECT WORDS',
      bannerSub: 'Cursor-Tracking Technique',
      title: 'Learn the Strategy — Highlight Incorrect Words | NinetyPTE Method',
      duration: '08:50'
    },
    {
      num: '05',
      tag: 'CORE SUMMARY',
      tagColor: 'bg-purple-600',
      bannerTitle: 'SUMMARIZE SPOKEN TEXT',
      bannerSub: '20-30 Word Core Structure',
      title: 'PTE Core Summarize Spoken Text | Tips & Clean 20-30 Word Structure',
      duration: '10:35'
    },
    {
      num: '06',
      tag: 'MCQ SINGLE',
      tagColor: 'bg-indigo-600',
      bannerTitle: 'MCQ SINGLE ANSWER',
      bannerSub: 'Rapid Option Filtering',
      title: 'PTE Listening Multiple Choice Single Answer | Quick Solving Tips',
      duration: '08:15'
    }
  ];

  const faqs = [
    {
      q: 'What does the PTE Core Listening module test?',
      a: 'It measures how effectively you process everyday spoken English across international accents—evaluating note-taking synthesis (20–30 words), detail discrimination, exact spelling capture, and spoken error spotting.'
    },
    {
      q: 'How is the PTE Core Listening test scored?',
      a: 'Scored purely via AI evaluation checking Content accuracy, Form word count limits, Spelling, Grammar, and exact word matching across seven listening formats calibrated to CLB levels.'
    },
    {
      q: 'How many question types are in the Listening section?',
      a: 'PTE Core Listening consists of 7 distinct question types: Summarize Spoken Text, Multiple Choice Multiple Answers, Listening Fill in the Blanks, Multiple Choice Single Answer, Select Missing Word, Highlight Incorrect Words, and Write From Dictation.'
    },
    {
      q: 'Do I get to listen to the audio more than once?',
      a: 'No. Every audio clip inside the PTE Core Listening test plays once automatically to mirror real communication situations.'
    },
    {
      q: 'What are common mistakes in PTE Core Listening?',
      a: 'Writing over 30 words in Summarize Spoken Text, clicking uncertain options on Highlight Incorrect Words (losing points via negative marking), and leaving inadequate timer minutes for Write From Dictation.'
    },
    {
      q: 'How can I improve my Listening score?',
      a: 'Reserve 3–4 minutes at the section’s close for Write From Dictation, check word endings strictly on Fill in the Blanks, and drill diverse speaker accents daily.'
    },
    {
      q: 'Why should I practice PTE Core Listening online?',
      a: 'Online audio timers replicate single-playback test tension, verify spelling accuracy instantaneously, and prepare your typing ergonomics before exam day.'
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
      {/* 1. HERO HEADER, MODULE SWITCHER & 7-TASK INTERACTIVE CAROUSEL (Page 1)    */}
      {/* ========================================================================= */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Listening Practice</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Practice all 7 PTE Core Listening question types with AI-powered scoring, instant feedback, and exam-style audio questions to boost your test accuracy.
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
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white flex items-center gap-1.5 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading</span>
            </Link>
            <Link
              to="/pte-core-listening-practice"
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#00c5cd] text-white shadow-xs flex items-center gap-1.5 transition"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Listening</span>
            </Link>
          </div>

          {/* Carousel Task Cards Grid matching PDF Page 1 */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left">
              {visibleCarouselTasks.map((tid) => {
                const t = taskConfigs[tid];
                const isSelected = activeTask === tid;
                const IconComp = t.icon;
                return (
                  <button
                    key={tid}
                    onClick={() => handleTaskSwitch(tid)}
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
                      <div className="flex flex-wrap gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${t.impactColor}`}>
                          {t.impact}
                        </span>
                        {t.hasAiBadge && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-50 text-purple-600 border border-purple-200">
                            ⚡ AI Scoring
                          </span>
                        )}
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

            {/* Carousel Controls Row matching PDF */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setCardPageIdx(0)}
                disabled={cardPageIdx === 0}
                className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                aria-label="Previous listening tasks"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {[0, 1].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCardPageIdx(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      cardPageIdx === idx ? 'w-5 bg-[#00c5cd]' : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCardPageIdx(1)}
                disabled={cardPageIdx === 1}
                className="p-1.5 rounded-full text-[#00c5cd] hover:bg-cyan-50 disabled:opacity-30 cursor-pointer"
                aria-label="Next listening tasks"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
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
      {/* 3. KNOW ALL ABOUT PTE CORE LISTENING + LIVE WORKSPACE                     */}
      {/* ========================================================================= */}
      <section id="practice-workspace" className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Know All About PTE Core <span className="text-[#00c5cd]">Listening Practice Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Get familiar with every listening task type. Explore official-style PTE Core Listening questions one by one with clear instructions and practice exercises below.
            </p>
          </div>

          {/* All 7 Sub-Task Pills (Dark Blue Active matching PDF Page 1 Bottom) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {taskOrder.map((tid) => {
              const t = taskConfigs[tid];
              return (
                <button
                  key={tid}
                  onClick={() => handleTaskSwitch(tid)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                    activeTask === tid
                      ? 'bg-[#005a9c] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t.pillLabel}
                </button>
              );
            })}
          </div>

          {/* Light Ocean-Blue Specs Bar (Matching PDF Page 1 Bottom) */}
          <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 sm:p-5 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
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
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Time to Answer</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.timeToAnswer}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Questions</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.questions}</div>
            </div>
          </div>

          {/* 3-Step Horizontal Flow Indicator */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 py-1">
            {['Listen audio', 'Write / Select Answer', 'AI Score'].map((st, idx) => (
              <div key={st} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center border ${
                      idx === 0
                        ? 'bg-[#005a9c] text-white border-[#005a9c]'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className={`font-semibold ${idx === 0 ? 'text-[#005a9c]' : 'text-slate-600'}`}>{st}</span>
                </div>
                {idx < 2 && <span className="w-8 sm:w-12 h-px bg-slate-200" />}
              </div>
            ))}
          </div>

          {/* ===================================================================== */}
          {/* INTERACTIVE LISTENING WORKSPACE CARD (Matching PDF Page 1 & 2)         */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
            
            {/* Card Title */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-[#005a9c] flex items-center justify-center shrink-0">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{current.title}</h3>
                <p className="text-xs text-slate-500">{current.practiceDesc}</p>
              </div>
            </div>

            {/* Countdown Status + Click to Start */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="font-extrabold tracking-wider uppercase text-[#005a9c]">
                {audioPhase === 'idle' && `BEGINNING IN ${current.prepSec} SEC`}
                {audioPhase === 'prep' && `PREPARING — PLAYING IN ${prepLeft} SEC`}
                {audioPhase === 'playing' && 'AUDIO PLAYING — LISTEN ATTENTIVELY'}
                {audioPhase === 'done' && 'AUDIO COMPLETED — FINALIZE YOUR ANSWER'}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowScriptHint(!showScriptHint)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer"
                >
                  {showScriptHint ? 'Hide Transcript' : 'View Audio Script'}
                </button>
                <button
                  onClick={audioPhase === 'idle' || audioPhase === 'done' ? startAudioSimulation : resetCurrentTask}
                  className="px-4 py-1.5 rounded-lg bg-[#005a9c] hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                >
                  {audioPhase === 'idle' || audioPhase === 'done' ? (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>Click to Start</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span>Stop / Reset</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Official Audio Player Bar Widget */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Audio Player</span>
                <span className="text-[#00c5cd] font-semibold">
                  {audioPhase === 'playing' ? 'Playing' : audioPhase === 'done' ? 'Completed' : 'Ready'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-slate-500">
                  {audioPhase === 'done' ? current.durationLabel : '00:00'}
                </span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#005a9c] rounded-full transition-all duration-300"
                    style={{ width: `${audioPhase === 'idle' ? 15 : audioProgress}%` }}
                  />
                </div>
                <span className="font-mono text-[11px] text-slate-500">{current.durationLabel}</span>
                <Volume2 className="w-4 h-4 text-slate-500 shrink-0" />
              </div>

              {showScriptHint && (
                <div className="mt-2 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 italic leading-relaxed">
                  {current.scriptText}
                </div>
              )}
            </div>

            {/* 7 DISTINCT INTERACTIVE ANSWER INTERFACES */}
            <div className="pt-1 space-y-3">
              
              {/* 1. SUMMARIZE SPOKEN TEXT (20-30 words Core) */}
              {activeTask === 'summarize-spoken-text' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Your Summary Response</span>
                    <span
                      className={`px-3 py-0.5 rounded-full font-mono font-bold text-[11px] border ${
                        sstWordCount === 0
                          ? 'bg-slate-50 text-slate-500 border-slate-200'
                          : sstWordCount >= 20 && sstWordCount <= 30
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      Word Count: {sstWordCount} (Core Target: 20–30 words)
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={sstInput}
                    onChange={(e) => setSstInput(e.target.value)}
                    placeholder="Type your summary here..."
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:border-[#005a9c] focus:outline-hidden text-xs sm:text-sm leading-relaxed resize-none"
                  />
                </div>
              )}

              {/* 2. MCQ MULTIPLE ANSWERS */}
              {activeTask === 'mcq-multiple' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-800">Select all true statements based on the recording:</div>
                  {current.options.map((opt) => {
                    const checked = mcmaSelected.includes(opt.id);
                    return (
                      <label
                        key={opt.id}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                          checked ? 'bg-sky-50 border-sky-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setMcmaSelected((prev) =>
                              prev.includes(opt.id) ? prev.filter((x) => x !== opt.id) : [...prev, opt.id]
                            )
                          }
                          className="accent-[#005a9c]"
                        />
                        <span className="text-slate-800 font-medium">{opt.text}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* 3. LISTENING FILL IN BLANKS */}
              {activeTask === 'listening-fib' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm leading-loose text-slate-800">
                  <span>Neighborhood clinics now schedule </span>
                  <input
                    type="text"
                    value={lfibInputs[0]}
                    onChange={(e) => {
                      const n = [...lfibInputs];
                      n[0] = e.target.value;
                      setLfibInputs(n);
                    }}
                    placeholder="word 1"
                    className="mx-1 px-2.5 py-0.5 w-28 rounded border border-slate-300 bg-white font-bold text-xs text-[#005a9c] focus:border-[#005a9c] focus:outline-hidden"
                  />
                  <span> checkups during </span>
                  <input
                    type="text"
                    value={lfibInputs[1]}
                    onChange={(e) => {
                      const n = [...lfibInputs];
                      n[1] = e.target.value;
                      setLfibInputs(n);
                    }}
                    placeholder="word 2"
                    className="mx-1 px-2.5 py-0.5 w-28 rounded border border-slate-300 bg-white font-bold text-xs text-[#005a9c] focus:border-[#005a9c] focus:outline-hidden"
                  />
                  <span> shifts to ease daytime </span>
                  <input
                    type="text"
                    value={lfibInputs[2]}
                    onChange={(e) => {
                      const n = [...lfibInputs];
                      n[2] = e.target.value;
                      setLfibInputs(n);
                    }}
                    placeholder="word 3"
                    className="mx-1 px-2.5 py-0.5 w-28 rounded border border-slate-300 bg-white font-bold text-xs text-[#005a9c] focus:border-[#005a9c] focus:outline-hidden"
                  />
                  <span> pressure and help commuters maintain consistent </span>
                  <input
                    type="text"
                    value={lfibInputs[3]}
                    onChange={(e) => {
                      const n = [...lfibInputs];
                      n[3] = e.target.value;
                      setLfibInputs(n);
                    }}
                    placeholder="word 4"
                    className="mx-1 px-2.5 py-0.5 w-32 rounded border border-slate-300 bg-white font-bold text-xs text-[#005a9c] focus:border-[#005a9c] focus:outline-hidden"
                  />
                  <span> healthcare records.</span>
                </div>
              )}

              {/* 4. MCQ SINGLE ANSWER */}
              {activeTask === 'mcq-single' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-900">{current.question}</div>
                  {current.options.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                        mcsaSelected === opt.id ? 'bg-sky-50 border-sky-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="listening-mcsa"
                        checked={mcsaSelected === opt.id}
                        onChange={() => setMcsaSelected(opt.id)}
                        className="accent-[#005a9c]"
                      />
                      <span className="text-slate-800 font-medium">{opt.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* 5. SELECT MISSING WORD */}
              {activeTask === 'select-missing-word' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-900">Select the concluding phrase replaced by the final beep:</div>
                  {current.options.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                        smwSelected === opt.id ? 'bg-sky-50 border-sky-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="listening-smw"
                        checked={smwSelected === opt.id}
                        onChange={() => setSmwSelected(opt.id)}
                        className="accent-[#005a9c]"
                      />
                      <span className="text-slate-800 font-medium">{opt.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* 6. HIGHLIGHT INCORRECT WORDS */}
              {activeTask === 'highlight-incorrect-words' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                  <div className="text-[11px] font-bold text-slate-500">Click words below that differ from the spoken recording:</div>
                  <div className="flex flex-wrap gap-1.5 leading-relaxed">
                    {current.transcriptWords.map((w, idx) => {
                      const highlighted = hiwSelected.includes(idx);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setHiwSelected((prev) =>
                              prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]
                            )
                          }
                          className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                            highlighted
                              ? 'bg-amber-200 border border-amber-400 text-slate-900 font-bold'
                              : 'hover:bg-white text-slate-800'
                          }`}
                        >
                          {w.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 7. WRITE FROM DICTATION */}
              {activeTask === 'write-from-dictation' && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-800">Type the exact spoken sentence below:</div>
                  <textarea
                    rows={3}
                    value={wfdInput}
                    onChange={(e) => setWfdInput(e.target.value)}
                    placeholder="Type every word you heard..."
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:border-[#005a9c] focus:outline-hidden text-xs sm:text-sm leading-relaxed resize-none"
                  />
                </div>
              )}

            </div>

            {/* Instant Score Result Panel */}
            {scoreResult && (
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-[#00c5cd]" />
                    <span>Score: {scoreResult.earned} / {scoreResult.total} Marks Earned</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{scoreResult.note}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#005a9c] text-white text-xs font-extrabold">
                  Estimated Section Score: {scoreResult.scaled} / 90
                </span>
              </div>
            )}

            {/* Footer Controls matching PDF Page 2 Top */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Lightbulb className="w-3.5 h-3.5 text-[#005a9c] shrink-0" />
                <span>
                  <strong className="text-slate-700">Pro Tip:</strong> {current.proTip}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={resetCurrentTask}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  title="Reset task"
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
                  onClick={evaluateListeningScore}
                  className="px-5 py-2 rounded-lg bg-[#005a9c] hover:bg-blue-900 text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <span>Submit for AI Score</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dark Navy Banner: Improve Your PTE Core Listening Score */}
          <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 sm:p-10 text-center space-y-4 text-white shadow-lg">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Improve Your PTE Core Listening Score
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Practice exam-style listening questions, sharpen comprehension, and receive instant performance insights on NinetyPTE.
            </p>
            <div>
              <Link
                to="/dashboard"
                className="inline-block px-7 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-extrabold text-xs shadow-md transition"
              >
                Start PTE Core Listening Practice
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT IS THE PTE CORE LISTENING SECTION?                                */}
      {/* ========================================================================= */}
      <section id="overview" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Is the <span className="text-[#00c5cd]">PTE Core Listening Section</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Get familiar with the Listening format, question types, scoring, and effective note-taking strategies.
            </p>
          </div>

          <div className="bg-white border-2 border-[#00c5cd]/60 rounded-2xl p-6 shadow-2xs space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              The PTE Core Listening section evaluates your ability to interpret everyday spoken conversations, announcements, and short informative recordings accurately on a single playback.
            </p>
            <p>
              Completed strictly on computer across approximately 22–37 minutes total, this module spans seven distinct question formats designed to test contextual deduction, note synthesis, spelling, and spoken detail recognition.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <a
                href="#task-types"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00c5cd] hover:underline"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Explore the 7 PTE Core Listening Tasks &gt;</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IN-DEPTH MODULE GUIDE: ALL 7 LISTENING TASK TYPES                      */}
      {/* ========================================================================= */}
      <section id="task-types" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00c5cd] text-[10px] font-extrabold uppercase tracking-wider">
              In-Depth Module Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Listening Task Types</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Explore all 7 PTE Core Listening task types, rules, scoring focus, and common mistakes to avoid.
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
      {/* 6. HOW PTE CORE LISTENING IS SCORED? (4 Cards Grid matching Page 3)       */}
      {/* ========================================================================= */}
      <section id="scoring" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How PTE Core <span className="text-[#00c5cd]">Listening Is Scored</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Scoring evaluates listening comprehension, written spelling accuracy, and content capture across integrated tasks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                num: '01',
                title: 'AI-Powered Scoring Engine',
                desc: 'Pearson automated models analyze every typed and selected answer against uniform linguistic parameters without human inconsistency.'
              },
              {
                num: '02',
                title: 'Task & Skill Contribution',
                desc: 'Integrated tasks like Summarize Spoken Text, Listening FIB, and Write From Dictation lift both Listening and Writing scores.'
              },
              {
                num: '03',
                title: 'CLB Standards Alignment',
                desc: 'Raw communicative points translate smoothly into Canadian Language Benchmark (CLB) bands approved by IRCC.'
              },
              {
                num: '04',
                title: 'Detailed Performance Evaluation',
                desc: 'Instant analytics isolate spelling deductions, partial credits, and pace bottlenecks across all seven question formats.'
              }
            ].map((card) => (
              <div key={card.num} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-cyan-50 text-[#00c5cd] font-bold text-xs">
                  {card.num}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EXPERT TIPS + VIDEO LESSONS + WHY ONLINE + FAQS + FORM                 */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Expert Tips */}
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Expert Tips to Improve Your <span className="text-[#00c5cd]">PTE Core Listening Score</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Strategies from exam trainers to help you capture key spoken details accurately.
              </p>
            </div>

            <div className="bg-cyan-50/20 border-2 border-[#00c5cd]/40 rounded-2xl p-6 text-left max-w-4xl mx-auto space-y-3">
              {[
                { label: 'Practice Active Listening Daily :', text: 'Train with varied international accents and conversational speaking speeds.' },
                { label: 'Focus on Meaning, Not Just Words :', text: 'Capture core relationships rather than fixating on isolated nouns.' },
                { label: 'Improve Note-Taking Technique :', text: 'Develop concise shorthand notes during 45–75 second recordings.' },
                { label: 'Follow Time Strategy :', text: 'Keep 3–4 minutes at section close specifically for Write From Dictation items.' },
                { label: 'Review Spelling and Grammar Skills :', text: 'Accurate spelling and inflections preserve valuable marks in typed responses.' }
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
              Take a Full PTE Core Listening Practice Test
            </Link>
          </div>

          {/* Video Lessons Grid */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                PTE Core Listening Video <span className="text-[#00c5cd]">Lessons &amp; Expert Strategies</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-2xl mx-auto">
                Build speed and comprehension with structured step-by-step video lessons covering all Core Listening formats.
              </p>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 pt-1">
                TASK-SPECIFIC STRATEGIES • EXPERT-LED LESSONS • REALISTIC EXAM PRACTICE
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
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition"
              >
                <span>Start Free PTE Practice Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Dark Navy Banner */}
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready to take our <span className="text-[#00c5cd]">PTE Core Free Mock Test</span>?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Get immediate access to interactive practice materials, scored listening mocks, and CLB progression guidance.
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

          {/* Why Practice PTE Core Listening with NinetyPTE Online? */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Why Practice <span className="text-[#00c5cd]">PTE Core Listening with NinetyPTE Online</span>?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Get exam-ready with realistic single-playback simulations, instant scoring diagnostics, and targeted feedback in one platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              {[
                { label: 'Real Exam Experience :', desc: 'Online drills mirror the exact layout, timer pressure, and audio cadence of the real test.' },
                { label: 'Better Time Management :', desc: 'Timed section practice sharpens pacing for Fill in the Blanks and Write From Dictation.' },
                { label: 'Skill-Based Improvement :', desc: 'Consistent practice strengthens auditory recall across international speakers.' },
                { label: 'Instant Performance Feedback :', desc: 'Spot misspelled or missed tokens immediately to boost exam readiness.' }
              ].map((b, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">{b.label}</strong> {b.desc}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center gap-3 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0" />
              <span>
                <strong className="text-slate-900">Flexible Learning :</strong> Candidates can practice anytime on desktop or mobile, building lasting confidence for test day.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQS + ENQUIRY FORM (Page 5 & 6 Layout)                                */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core Listening – <span className="text-[#00c5cd]">Frequently Asked Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Find clear answers regarding PTE Core Listening question types, scoring, and preparation strategies.
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
              Start Your <span className="text-[#00c5cd]">PTE Core Listening Practice Today</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Prepare effectively with targeted PTE Core Listening sets designed to mirror official examination mechanics:
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Practice real exam questions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Get instant feedback on your performance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Track your progress over time</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Improve confidence before test day</li>
            </ul>
            <p className="text-xs font-semibold text-slate-700">
              Strengthen preparation with structured practice across all seven listening tasks.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
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
                <h4 className="text-sm font-bold text-slate-900">Enquiry Received!</h4>
                <p className="text-xs text-slate-600">Our NinetyPTE preparation advisor will connect shortly.</p>
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
