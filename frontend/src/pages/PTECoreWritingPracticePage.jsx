import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  PenTool,
  BookOpen,
  Headphones,
  Mail,
  FileText,
  ArrowRight,
  Clock,
  CheckCircle2,
  RotateCcw,
  Scissors,
  Copy,
  Clipboard,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  Target,
  Sparkles,
  Info,
  Play,
  HelpCircle
} from 'lucide-react';

export default function PTECoreWritingPracticePage() {
  const [activeTask, setActiveTask] = useState('summarize-written-text');
  const [activeSubNav, setActiveSubNav] = useState('practice');
  const [expandedType, setExpandedType] = useState(0);
  const [faqOpen, setFaqOpen] = useState({ 0: false });
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Interactive Editor & Timer States
  const [textInput, setTextInput] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [clipboardNotice, setClipboardNotice] = useState('');
  const textareaRef = useRef(null);

  const toggleFaq = (idx) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const taskConfigs = {
    'summarize-written-text': {
      id: 'summarize-written-text',
      title: 'Summarize Written Text',
      shortDesc: 'Summarize the paragraph in 25–50 words using complete sentences and appropriate connectors.',
      badgeLabel: 'New',
      badgeStyle: 'bg-sky-50 text-sky-600 border-sky-200',
      countBadge: '1/434',
      answerMeta: '10 mins',
      questionRange: '1-2 questions',
      icon: FileText,
      defaultSeconds: 600,
      targetMin: 25,
      targetMax: 50,
      tableSpecs: {
        task: 'Read the text. Then write a short 25-50 word summary.',
        skills: 'Reading and Writing',
        promptLength: 'Text up to 200 words',
        timeToAnswer: '10 minutes',
        questions: '1 - 2 Questions'
      },
      steps: ['Read Passage', 'Write Summary', 'AI Score'],
      promptTitle: 'Summarize Written Text',
      promptInstruction: 'Read the text. Then write a short 25–50 word summary.',
      passage: [
        'Many companies now allow employees to work from home for at least part of the week. Supporters of remote work argue that it saves commuting time, reduces travel costs, and allows staff to arrange daily routines more efficiently. It can also help employers curb office overhead expenses and recruit specialists residing outside urban centers. However, distributed arrangements introduce practical hurdles.',
        'Some staff experience professional isolation or struggle to coordinate smoothly with team members across digital tools. Others find maintaining clear boundaries between domestic life and career responsibilities demanding. Consequently, numerous organizations are adopting hybrid policies where personnel divide hours between remote setups and shared workplaces to preserve both flexibility and collaborative cohesion.'
      ],
      placeholder: 'Write your 25-50 word summary here...',
      proTip:
        'Focus on the main idea and key supporting points. Summarize them clearly in your own words and keep your response within the 25–50 word limit.'
    },
    'write-email': {
      id: 'write-email',
      title: 'Write Email',
      shortDesc: 'Read a workplace or daily scenario and write a structured 80–120 word email covering every prompt.',
      badgeLabel: 'High Score Impact',
      badgeStyle: 'bg-sky-50 text-sky-600 border-sky-200',
      countBadge: '1/177',
      answerMeta: '9 mins',
      questionRange: '2-3 questions',
      icon: Mail,
      defaultSeconds: 540,
      targetMin: 50,
      targetMax: 120,
      tableSpecs: {
        task: 'Read the prompt and write a 80-120 word email.',
        skills: 'Writing',
        promptLength: 'Scenario up to 120 words',
        timeToAnswer: '9 minutes',
        questions: '2 - 3 Questions'
      },
      steps: ['Read Scenario', 'Draft Email', 'AI Score'],
      promptTitle: 'Write Email',
      promptInstruction: 'You have 9 minutes to compose a formal or semi-formal email addressing all three points.',
      passage: [
        'Scenario: Your neighborhood community recreation center recently reduced evening hours at the public lap pool on weekdays, affecting working residents. Write an email to Ms. Sandra Carter, the Facility Coordinator, regarding the timetable revision.',
        'Include all three points below:\n• Explain why the extended evening swimming hours benefit local full-time workers.\n• Ask whether two weekday evenings can retain later closing hours until 9:30 PM.\n• Offer suggestions on how residents could verify demand (such as an online sign-up poll).'
      ],
      placeholder: 'Dear Ms. Carter,\n\nI am writing to share feedback regarding the revised evening lap pool schedule...',
      proTip:
        'Include an explicit greeting and sign-off, separate each prompt point into a clear paragraph, and aim cleanly for 80–120 words.'
    }
  };

  const taskOrder = ['summarize-written-text', 'write-email'];
  const current = taskConfigs[activeTask] || taskConfigs['summarize-written-text'];

  const wordCount = textInput.trim() ? textInput.trim().split(/\s+/).length : 0;

  const handleTaskSwitch = (taskId) => {
    setActiveTask(taskId);
    setTextInput('');
    setTimerRunning(false);
    setSecondsLeft(taskConfigs[taskId].defaultSeconds);
    setAiFeedback(null);
    setClipboardNotice('');
  };

  // Timer countdown effect
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

  const formatMMSS = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  // Cut / Copy / Paste helpers matching exam editor bar
  const handleClipboardAction = async (action) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = textInput.slice(start, end);

    if (action === 'cut' && selected) {
      try {
        await navigator.clipboard.writeText(selected);
      } catch {
        /* ignore permission denial */
      }
      setTextInput(textInput.slice(0, start) + textInput.slice(end));
      setClipboardNotice('Selection cut to clipboard');
    } else if (action === 'copy' && selected) {
      try {
        await navigator.clipboard.writeText(selected);
      } catch {
        /* ignore permission denial */
      }
      setClipboardNotice('Selection copied');
    } else if (action === 'paste') {
      try {
        const clip = await navigator.clipboard.readText();
        if (clip) {
          setTextInput(textInput.slice(0, start) + clip + textInput.slice(end));
          setClipboardNotice('Pasted from clipboard');
        }
      } catch {
        setClipboardNotice('Use Ctrl+V to paste directly');
      }
    }
    setTimeout(() => setClipboardNotice(''), 2000);
  };

  const evaluateResponse = () => {
    const inRange = wordCount >= current.targetMin && wordCount <= current.targetMax;
    const hasGreetingAndClosing =
      activeTask === 'write-email'
        ? /(dear|hi|hello)/i.test(textInput) && /(regards|sincerely|thank|best)/i.test(textInput)
        : true;

    const formScore = wordCount === 0 ? 0 : inRange ? 90 : wordCount >= 15 ? 65 : 25;
    const grammarScore = wordCount >= 20 ? 84 : wordCount > 0 ? 58 : 0;
    const contentScore = wordCount >= current.targetMin ? 86 : wordCount > 0 ? 54 : 0;
    const overall = Math.round((formScore + grammarScore + contentScore) / 3);

    setAiFeedback({
      overall,
      formScore,
      grammarScore,
      contentScore,
      inRange,
      hasGreetingAndClosing
    });
  };

  // Module Guide Accordion Data (Both PTE Core Writing Tasks)
  const guideItems = [
    {
      id: 'summarize-written-text',
      num: 1,
      title: 'Summarize Written Text',
      meta: 'Highest Priority · Time to answer: 10 minutes',
      badge: 'Highest Priority',
      description:
        'In this PTE Core writing task, you read an everyday or workplace passage of up to 200 words and compose a clear summary between 25 and 50 words within 10 minutes. It tests how accurately you extract essential claims and condense them into clean grammar.',
      note: 'Always ensure your summary uses complete punctuated sentences, stays strictly within 25–50 words, and uses appropriate connecting clauses.',
      scoringFocus: 'Content, Form, Grammar, Vocabulary',
      skills: ['Reading', 'Writing'],
      mistakes: [
        'Writing fewer than 25 words or more than 50 words results in zero Form score',
        'Missing the central theme or dwelling on isolated minor examples',
        'Incomplete sentence fragments or omitted ending punctuation',
        'Copying whole verbatim strings instead of paraphrasing naturally',
        'Running out of time before reviewing spelling and verb agreement'
      ],
      proTip:
        'Identify the core subject in paragraph 1 and the conclusion or contrast in paragraph 2, then combine them smoothly within 30–42 words.'
    },
    {
      id: 'write-email',
      num: 2,
      title: 'Write Email',
      meta: 'Highest Priority · Time to answer: 9 minutes',
      badge: 'Highest Priority',
      description:
        'Exclusive to PTE Core: You read a short everyday social or workplace prompt accompanied by three bulleted requirements. In 9 minutes, compose a well-structured email ideally ranging from 80 to 120 words addressing every required point in the proper tone.',
      note: 'Register matters: write formally when contacting managers, officials, or service providers, and semi-formally for friends or colleagues.',
      scoringFocus: 'Content, Email Conventions, Form, Organization, Grammar, Vocabulary Range, Spelling',
      skills: ['Writing', 'Pragmatic Communication'],
      mistakes: [
        'Forgetting an appropriate salutation ("Dear...") or closing signature ("Best regards...")',
        'Skipping one of the three mandatory bullet requirements listed in the prompt',
        'Writing under 50 words (heavily penalized on Form) or rambling past 140 words',
        'Mixing informal slang into a formal business complaint or workplace request'
      ],
      proTip:
        'Spend the first 60 seconds outlining 3 short body paragraphs—one per bullet prompt—leaving 90 seconds at the end for spelling checks.'
    }
  ];

  // 6 Video Strategy Lessons (Page 3 & 4)
  const videoLessons = [
    {
      num: '01',
      tag: 'PTE CORE WRITING',
      tagColor: 'bg-[#00c5cd]',
      bannerTitle: 'SUMMARIZE WRITTEN TEXT',
      bannerSub: '25-50 Word Core Mastery',
      title: 'Highest Priority · Summarize Written Text Time Management (10 Minutes)',
      duration: '09:15'
    },
    {
      num: '02',
      tag: 'STRATEGY GUIDE',
      tagColor: 'bg-sky-600',
      bannerTitle: 'WRITE CONCISE SUMMARIES',
      bannerSub: 'Real Examples & Connectors',
      title: 'PTE Core: Summarize Written Text Made Easy | Expert Tips & Real Examples',
      duration: '11:40'
    },
    {
      num: '03',
      tag: 'CORE UNIQUE',
      tagColor: 'bg-[#f0854d]',
      bannerTitle: 'INFORMAL & FORMAL EMAIL',
      bannerSub: 'Step-by-Step Format',
      title: 'How to Write an Informal Email in PTE Core | Step-by-Step Guide with Example',
      duration: '12:25'
    },
    {
      num: '04',
      tag: 'MARKS BREAKDOWN',
      tagColor: 'bg-emerald-600',
      bannerTitle: 'SCORE 90 IN WRITING',
      bannerSub: 'Integrated Score Strategy',
      title: 'How to Score 90 in PTE Writing | Marks Distribution Explained',
      duration: '10:10'
    },
    {
      num: '05',
      tag: 'UPDATED FORMAT',
      tagColor: 'bg-purple-600',
      bannerTitle: 'LATEST CORE STRATEGY',
      bannerSub: 'High-Scoring Formulas',
      title: 'Summarize Written Text | Latest PTE Core Sentence Connector Strategy',
      duration: '08:55'
    },
    {
      num: '06',
      tag: 'ERROR CHECK',
      tagColor: 'bg-rose-600',
      bannerTitle: 'WRITING SECRETS',
      bannerSub: 'Avoid Common Traps',
      title: 'PTE Writing Mistakes — Common Grammar & Form Errors to Avoid',
      duration: '09:48'
    }
  ];

  const faqs = [
    {
      q: 'What does the PTE Core Writing section test?',
      a: 'The PTE Core Writing section measures your practical everyday and workplace written English ability: condensing texts clearly (Summarize Written Text) and drafting structured situational correspondence (Write Email) using accurate grammar, spelling, and register.'
    },
    {
      q: 'How is the PTE Core Writing section scored?',
      a: 'Automated AI scoring evaluates Summarize Written Text on 4 criteria (Content, Form, Grammar, Vocabulary) and Write Email on 7 criteria (Content, Email Conventions, Form, Organization, Grammar Usage & Mechanics, Vocabulary Range, and Spelling).'
    },
    {
      q: 'How many tasks are in the PTE Core Writing section?',
      a: 'You will complete 1 to 2 Summarize Written Text tasks and 2 to 3 Write Email tasks alongside the Speaking items inside Part 1 (Speaking & Writing).'
    },
    {
      q: 'How much time do I get for each writing task?',
      a: 'You receive an individual timed block of 10 minutes per Summarize Written Text question and 9 minutes per Write Email question.'
    },
    {
      q: 'Why should I practice PTE Core Writing online?',
      a: 'Online timed practice builds typing speed, trains you to track exact word counts live (25–50 words / 80–120 words), and reveals spelling and email convention deductions instantaneously before test day.'
    },
    {
      q: 'Is online PTE Core Writing practice useful for beginners?',
      a: 'Yes! Step-by-step outlines, Cut/Copy/Paste editor controls, and immediate AI feedback allow beginners to master sentence connectors and email greetings within days.'
    },
    {
      q: 'How often should I practice PTE Core Writing?',
      a: 'Practicing 2 to 3 Write Email prompts and 2 Summarize Written Text prompts daily over 2–3 weeks consistently pushes candidates to CLB 7–9 writing proficiency.'
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
      {/* 1. HERO HEADER, MODULE SWITCHER & 2 INTERACTIVE TASK CARDS (Page 1)        */}
      {/* ========================================================================= */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Writing Practice</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Prepare for PTE Core Writing with AI-scored practice questions, detailed performance analysis, and exam-like tasks. Explore each task type below.
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
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#00c5cd] text-white shadow-xs flex items-center gap-1.5 transition"
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
              to="/pte-listening-practice"
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white flex items-center gap-1.5 transition"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Listening</span>
            </Link>
          </div>

          {/* 2 Centered Writing Task Cards Grid */}
          <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-left">
            {taskOrder.map((taskId) => {
              const t = taskConfigs[taskId];
              const isSelected = activeTask === taskId;
              const IconComp = t.icon;
              return (
                <button
                  key={taskId}
                  onClick={() => handleTaskSwitch(taskId)}
                  className={`p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-4 relative text-left ${
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
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${t.badgeStyle}`}>
                        {t.badgeLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-50 text-purple-600 border border-purple-200">
                        ⚡ AI Scoring
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

          {/* Active Task Horizontal Summary Banner (Cyan Accent) */}
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
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00c5cd]" /> Answer: <strong className="text-slate-800">{current.answerMeta}</strong>
                </span>
                <span>• {current.questionRange}</span>
                <span>• Writing</span>
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
      {/* 3. KNOW ALL ABOUT PTE CORE WRITING + INTERACTIVE PRACTICE EDITOR          */}
      {/* ========================================================================= */}
      <section id="practice-workspace" className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Know All About PTE Core <span className="text-[#00c5cd]">Writing Practice Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Familiarize yourself with each Writing task style. Explore official exam questions one by one with complete instruction summaries below.
            </p>
          </div>

          {/* 2 Sub-Task Pills (Soft Blue Active Pill like Screenshot) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'summarize-written-text', label: 'Summarize Written Text' },
              { id: 'write-email', label: 'Write Email' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => handleTaskSwitch(pill.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeTask === pill.id
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Soft Blue Specs Bar (Matching Screenshot) */}
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

          {/* 3-Step Flow Indicator */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 py-1">
            {current.steps.map((st, idx) => (
              <div key={st} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center border ${
                      idx === 0
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-700">{st}</span>
                </div>
                {idx < 2 && <span className="w-8 sm:w-12 h-px bg-slate-200" />}
              </div>
            ))}
          </div>

          {/* ===================================================================== */}
          {/* INTERACTIVE WRITING PRACTICE WORKSPACE CARD (Matching PDF Page 1 & 2) */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
            
            {/* Card Title */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-500 flex items-center justify-center shrink-0">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-sky-600">{current.promptTitle}</h3>
                <p className="text-xs text-slate-500">{current.promptInstruction}</p>
              </div>
            </div>

            {/* Timer Row */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="font-bold tracking-wider uppercase text-slate-600">
                TEST TIME REMAINING:{' '}
                <span className="text-sky-600 font-mono text-sm ml-1">{formatMMSS(secondsLeft)}</span>
              </div>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timerRunning ? 'Pause Timer' : 'Click to Start'}</span>
              </button>
            </div>

            {/* Reading Passage / Scenario Box */}
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 whitespace-pre-line font-normal">
              {current.passage.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Interactive Cut / Copy / Paste Editor Box */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs">
                <div className="flex items-center gap-3 text-slate-600 font-semibold">
                  <button
                    type="button"
                    onClick={() => handleClipboardAction('cut')}
                    className="flex items-center gap-1 hover:text-sky-600 transition cursor-pointer"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Cut</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClipboardAction('copy')}
                    className="flex items-center gap-1 hover:text-sky-600 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClipboardAction('paste')}
                    className="flex items-center gap-1 hover:text-sky-600 transition cursor-pointer"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Paste</span>
                  </button>
                  {clipboardNotice && (
                    <span className="text-[10px] text-[#00c5cd] font-bold ml-2">{clipboardNotice}</span>
                  )}
                </div>

                <div
                  className={`px-3 py-0.5 rounded-full font-mono font-bold text-[11px] border ${
                    wordCount === 0
                      ? 'bg-sky-50 text-sky-600 border-sky-200'
                      : wordCount >= current.targetMin && wordCount <= current.targetMax
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  Word Count: {wordCount < 10 ? `0${wordCount}` : wordCount} (Target: {current.targetMin}–{current.targetMax})
                </div>
              </div>

              <textarea
                ref={textareaRef}
                rows={7}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={current.placeholder}
                className="w-full p-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden resize-none leading-relaxed"
              />
            </div>

            {/* Simulated AI Writing Feedback Panel */}
            {aiFeedback && (
              <div className="bg-cyan-50/50 border border-cyan-200 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#00c5cd]" />
                    Instant NinetyPTE AI Writing Diagnostics
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#00c5cd] text-white font-extrabold text-xs">
                    Estimated Score: {aiFeedback.overall} / 90
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500">Form ({wordCount} words)</div>
                    <div className="font-black text-slate-800">{aiFeedback.formScore} / 90</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500">Content &amp; Organization</div>
                    <div className="font-black text-[#00c5cd]">{aiFeedback.contentScore} / 90</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500">Grammar &amp; Mechanics</div>
                    <div className="font-black text-slate-800">{aiFeedback.grammarScore} / 90</div>
                  </div>
                </div>
                {activeTask === 'write-email' && !aiFeedback.hasGreetingAndClosing && (
                  <p className="text-[11px] text-amber-700 font-semibold">
                    Email Convention Tip: Ensure your draft opens with a clear greeting (e.g., &ldquo;Dear Ms. Carter,&rdquo;) and closes formally (&ldquo;Sincerely,&rdquo;).
                  </p>
                )}
              </div>
            )}

            {/* Footer Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-start gap-1.5 text-xs text-slate-500 max-w-lg">
                <Lightbulb className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-700">Pro Tip:</strong> {current.proTip}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => handleTaskSwitch(activeTask)}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  title="Reset editor"
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
                  onClick={evaluateResponse}
                  className="px-5 py-2 rounded-lg bg-[#00c5cd] hover:bg-[#00b2ba] text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <span>Submit for AI Score</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dark Banner: Ready to Improve Your Writing Skills? */}
          <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 sm:p-10 text-center space-y-4 text-white shadow-lg">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to Improve Your Writing Skills?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Practice PTE Core Writing questions anytime and receive instant feedback to track your progress.
            </p>
            <div>
              <Link
                to="/dashboard"
                className="inline-block px-7 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-extrabold text-xs shadow-md transition"
              >
                Start PTE Core Writing Practice
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT IS THE PTE CORE WRITING SECTION?                                  */}
      {/* ========================================================================= */}
      <section id="overview" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Is the <span className="text-[#00c5cd]">PTE Core Writing Section</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Understand the format, task types, timing, and skills assessed in the PTE Core Writing section.
            </p>
          </div>

          <div className="bg-white border-2 border-[#00c5cd]/60 rounded-2xl p-6 shadow-2xs space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              Since the PTE Core Writing module is part of Part 1 (Speaking &amp; Writing), both communicative domains are conducted inside a combined section lasting approximately 50–65 minutes total.
            </p>
            <p>
              This writing segment features two distinct question tasks engineered to measure your capability to condense factual English text clearly and draft structured everyday correspondence using accurate grammar, vocabulary, and consistent spelling.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <a
                href="#task-types"
                onClick={() => setExpandedType(1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00c5cd] hover:underline"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Explore Write Email PTE Core Writing Task &gt;</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IN-DEPTH MODULE GUIDE: PTE CORE WRITING TASK TYPES                     */}
      {/* ========================================================================= */}
      <section id="task-types" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00c5cd] text-[10px] font-extrabold uppercase tracking-wider">
              In-Depth Module Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Writing Task Types</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Explore exam rules, response strategies, scoring criteria, and common mistakes for each writing task.
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
                        <p className="text-[11px] text-sky-600 font-semibold">{item.meta}</p>
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
      {/* 6. HOW PTE CORE WRITING IS SCORED? (2 Comparison Cards Page 3)            */}
      {/* ========================================================================= */}
      <section id="scoring" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How PTE Core <span className="text-[#00c5cd]">Writing Is Scored</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              PTE Core Writing evaluates each task against explicit structural, vocabulary, grammatical, and format conventions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Task 01: Summarize Written Text */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#00c5cd] text-white p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#00c5cd] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">Task 01</div>
                    <h3 className="text-base font-bold">Summarize Written Text</h3>
                    <div className="text-[11px] opacity-90">Score based on 4 areas</div>
                  </div>
                </div>

                <div className="p-6 space-y-4 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    Your score evaluates how cleanly you condense key passage arguments into a 25–50 word response using complete punctuated sentences:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Content:</strong> Main ideas from the passage are accurately represented</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Form:</strong> Response strictly respects the 25–50 word boundary</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Grammar:</strong> Proper complex/compound clause structure</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Vocabulary:</strong> Appropriate everyday and academic word selection</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-50/70 border-t border-cyan-100 p-4 text-[11px] text-slate-600">
                Evaluates information synthesis while sustaining clarity and grammar in a strict word window.
              </div>
            </div>

            {/* Task 02: Write Email */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-[#1e3a8a] text-white p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">Task 02</div>
                    <h3 className="text-base font-bold">Write Email</h3>
                    <div className="text-[11px] opacity-90">Score based on 7 factors</div>
                  </div>
                </div>

                <div className="p-6 space-y-3.5 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    Your draft is evaluated on how thoroughly you satisfy all three prompt requirements inside a structured email:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Content:</strong> All three prompt points fully answered</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Email Conventions:</strong> Clear salutation greeting and appropriate closing</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Form:</strong> Word count ideally within 80–120 words (minimum 50)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Organization:</strong> Logical paragraph sequencing</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Grammar Usage &amp; Mechanics:</strong> Punctuation and capitalization accuracy</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Vocabulary Range:</strong> Natural lexical variety suited to tone</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" /> <span><strong className="text-slate-900">Spelling:</strong> Consistent national spelling convention</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-100/80 border-t border-slate-200 p-4 text-[11px] text-slate-600">
                Assesses real-life correspondence efficiency combining structure, precision, and communicative tone.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EXPERT TIPS + VIDEO LESSONS + MOCK BANNER (Page 4)                     */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Expert Tips */}
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Expert Tips to Improve Your <span className="text-[#00c5cd]">PTE Core Writing Score</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Strong performance relies on precision, structured organization, and consistent timed practice.
              </p>
            </div>

            <div className="bg-cyan-50/20 border-2 border-[#00c5cd]/40 rounded-2xl p-6 text-left max-w-4xl mx-auto space-y-3">
              {[
                'Always verify and control your live word count indicator before submitting.',
                'Focus exclusively on main ideas and critical supporting details in summaries.',
                'Write complete sentences with consistent capitalization and end punctuation.',
                'Practice joining compound and complex clauses smoothly for high grammar scores.',
                'In email prompts, lock in the purpose, recipient register, and all three bullets before drafting.',
                'Use clear transitional phrases to connect paragraphs seamlessly.'
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            <Link
              to="/pte-core-mock-test"
              className="inline-block px-7 py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition"
            >
              Take a Full PTE Core Writing Practice Test
            </Link>
          </div>

          {/* Video Lessons Grid */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                PTE Core Writing Video <span className="text-[#00c5cd]">Lessons &amp; Expert Strategies</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-2xl mx-auto">
                Watch concise video walkthroughs breaking down every writing rubric and real-exam scoring technique.
              </p>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 pt-1">
                TASK-WISE TUTORIALS • EXPERT WRITING STRATEGIES • REAL EXAM PRACTICE
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

          {/* Dark Navy Banner: Ready to take our PTE Core Free Mock Test? */}
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready to take our <span className="text-[#00c5cd]">PTE Core Free Mock Test</span>?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Get immediate access to comprehensive study materials, practice tests, and expert guidance to succeed in the PTE Core exam.
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

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (Page 5 Layout)                             */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core Writing – <span className="text-[#00c5cd]">Frequently Asked Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Find clear answers to the most common questions about PTE Core Writing, format, scoring, and practice strategies.
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

    </div>
  );
}
