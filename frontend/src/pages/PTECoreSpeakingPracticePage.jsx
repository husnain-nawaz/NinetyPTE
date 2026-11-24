import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  PenTool,
  BookOpen,
  Headphones,
  ArrowRight,
  Clock,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Zap,
  Scale,
  Globe,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  Target,
  Sparkles,
  FileText,
  Info,
  HelpCircle,
  MessageSquare,
  BarChart2
} from 'lucide-react';

export default function PTECoreSpeakingPracticePage() {
  const [activeTask, setActiveTask] = useState('read-aloud');
  const [activeSubNav, setActiveSubNav] = useState('practice');
  const [expandedType, setExpandedType] = useState(0);
  const [faqOpen, setFaqOpen] = useState({ 0: false });
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Interactive Practice Simulator States
  const [simState, setSimState] = useState('idle'); // 'idle' | 'prep' | 'audio' | 'recording' | 'completed'
  const [timerSec, setTimerSec] = useState(35);
  const [recordSec, setRecordSec] = useState(0);
  const [showAiScore, setShowAiScore] = useState(false);
  const [modelAudioPlaying, setModelAudioPlaying] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const toggleFaq = (idx) => {
    setFaqOpen((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const taskConfigs = {
    'read-aloud': {
      id: 'read-aloud',
      title: 'Read Aloud',
      shortDesc: 'Read the text aloud clearly and naturally when prompted.',
      impact: 'High Score Impact',
      impactColor: 'bg-sky-50 text-sky-600 border-sky-200',
      countBadge: '1/1552',
      prepShort: '30-40s',
      answerShort: '30-40s',
      questionRange: '6-7 questions',
      skillsShort: 'Speaking & Reading',
      icon: BookOpen,
      tableSpecs: {
        task: 'You will see some text. Read the text aloud.',
        skills: 'Reading & Speaking',
        promptLength: 'Up to 60 words',
        prepTime: '30-40 seconds',
        answerTime: '30-40 seconds',
        questions: '6 - 7 Questions'
      },
      steps: ['Read Passage', 'Record Voice', 'AI Score'],
      practiceTitle: 'Read Aloud Practice',
      practiceSubtitle: 'Read the passage aloud clearly into your microphone after preparation time ends.',
      step1Title: 'STEP 1 — PREPARATION',
      step1Sub: '(Read silently & formulate pace)',
      defaultPrep: 35,
      maxRecord: 35,
      hasAudioPrompt: false,
      promptText:
        'Urban development has transformed the way people live, work, and interact with one another. As cities continue to grow, governments must invest in efficient transportation systems, affordable housing, and sustainable infrastructure. Careful planning is essential to ensure that economic development does not come at the expense of the environment.',
      proTip: 'Maintain natural rhythm and pause slightly at commas and full stops.'
    },
    'repeat-sentence': {
      id: 'repeat-sentence',
      title: 'Repeat Sentence',
      shortDesc: 'Listen once and repeat the exact spoken sentence smoothly.',
      impact: 'High Score Impact',
      impactColor: 'bg-sky-50 text-sky-600 border-sky-200',
      countBadge: '1/3168',
      prepShort: 'None',
      answerShort: '15s',
      questionRange: '10-12 questions',
      skillsShort: 'Listening & Speaking',
      icon: RotateCcw,
      tableSpecs: {
        task: 'Listen to a recording and repeat the sentence exactly.',
        skills: 'Listening & Speaking',
        promptLength: '3 - 9 seconds audio',
        prepTime: 'None (Immediate)',
        answerTime: '15 seconds',
        questions: '10 - 12 Questions'
      },
      steps: ['Listen Audio', 'Record Voice', 'AI Score'],
      practiceTitle: 'Repeat Sentence Practice',
      practiceSubtitle: 'You will hear a sentence once. Speak immediately after the audio finishes.',
      step1Title: 'STEP 1 — AUDIO PLAYBACK',
      step1Sub: '(Listen attentively — plays once only)',
      defaultPrep: 3,
      maxRecord: 15,
      hasAudioPrompt: true,
      audioTranscript: 'All municipal parking permits must be renewed online prior to the first day of November.',
      proTip: 'Focus on meaningful word chunks rather than memorizing single isolated words.'
    },
    'describe-image': {
      id: 'describe-image',
      title: 'Describe Image',
      shortDesc: 'Analyze the visual data and describe key trends fluently.',
      impact: 'Moderate Score Impact',
      impactColor: 'bg-amber-50 text-amber-600 border-amber-200',
      countBadge: '1/1189',
      prepShort: '25s',
      answerShort: '40s',
      questionRange: '3-4 questions',
      skillsShort: 'Speaking',
      icon: BarChart2,
      tableSpecs: {
        task: 'An image or chart appears on screen. Describe it in detail.',
        skills: 'Speaking',
        promptLength: 'Chart / Visual diagram',
        prepTime: '25 seconds',
        answerTime: '40 seconds',
        questions: '3 - 4 Questions'
      },
      steps: ['Analyze Visual', 'Record Voice', 'AI Score'],
      practiceTitle: 'Describe Image Practice',
      practiceSubtitle: 'Study the chart below during the 25-second prep timer, then describe main features.',
      step1Title: 'STEP 1 — PREPARATION',
      step1Sub: '(Identify highest, lowest & key trend)',
      defaultPrep: 25,
      maxRecord: 40,
      hasAudioPrompt: false,
      promptText: 'Bar Chart: Municipal Renewable Energy Capacity Growth (2018 - 2024)',
      proTip: 'Speak for 30 to 35 seconds smoothly using a consistent overview-highlights-conclusion pattern.'
    },
    'respond-to-a-situation': {
      id: 'respond-to-a-situation',
      title: 'Respond to Situation',
      shortDesc: 'Listen to and read an everyday scenario and give a fitting spoken response.',
      impact: 'Moderate Score Impact',
      impactColor: 'bg-amber-50 text-amber-600 border-amber-200',
      countBadge: '1/335',
      prepShort: '20s',
      answerShort: '40s',
      questionRange: '2-4 questions',
      skillsShort: 'Listening & Speaking',
      icon: MessageSquare,
      tableSpecs: {
        task: 'Listen and read a situation, then respond appropriately.',
        skills: 'Listening & Speaking',
        promptLength: 'Up to 60 words',
        prepTime: '20 seconds',
        answerTime: '40 seconds',
        questions: '2 - 4 Questions'
      },
      steps: ['Understand Scenario', 'Record Voice', 'AI Score'],
      practiceTitle: 'Respond to a Situation Practice',
      practiceSubtitle: 'Adopt a clear, polite conversational tone appropriate for the described person.',
      step1Title: 'STEP 1 — PREPARATION',
      step1Sub: '(Formulate greeting, explanation & request)',
      defaultPrep: 20,
      maxRecord: 40,
      hasAudioPrompt: true,
      promptText:
        'You recently purchased a home appliance online, and when it arrived today, the outer glass door was cracked. Phone the customer service representative to explain the damage and request a replacement delivery.',
      proTip: 'Address the recipient directly using natural everyday English ("Hi there, I am calling about...")'
    },
    'answer-short-question': {
      id: 'answer-short-question',
      title: 'Answer Short Question',
      shortDesc: 'Reply to brief general knowledge audio prompts in one or few words.',
      impact: 'Low Score Impact',
      impactColor: 'bg-slate-100 text-slate-600 border-slate-200',
      countBadge: '1/1933',
      prepShort: 'None',
      answerShort: '10s',
      questionRange: '5-6 questions',
      skillsShort: 'Listening & Speaking',
      icon: HelpCircle,
      tableSpecs: {
        task: 'Listen to a short question and give a concise verbal answer.',
        skills: 'Listening & Speaking',
        promptLength: '3 - 9 seconds audio',
        prepTime: 'None',
        answerTime: '10 seconds',
        questions: '5 - 6 Questions'
      },
      steps: ['Listen Question', 'Speak Answer', 'AI Score'],
      practiceTitle: 'Answer Short Question Practice',
      practiceSubtitle: 'Provide a clear single-word or brief noun-phrase answer immediately.',
      step1Title: 'STEP 1 — AUDIO PROMPT',
      step1Sub: '(Answer clearly in one or two words)',
      defaultPrep: 2,
      maxRecord: 10,
      hasAudioPrompt: true,
      audioTranscript: 'What is the name of the official document required when travelling internationally by air?',
      proTip: 'Avoid full sentences if a simple noun ("Passport") directly answers the prompt.'
    }
  };

  const taskOrder = [
    'read-aloud',
    'repeat-sentence',
    'describe-image',
    'respond-to-a-situation',
    'answer-short-question'
  ];

  const current = taskConfigs[activeTask] || taskConfigs['read-aloud'];

  const handleTaskSwitch = (taskId) => {
    setActiveTask(taskId);
    setSimState('idle');
    setTimerSec(taskConfigs[taskId].defaultPrep);
    setRecordSec(0);
    setShowAiScore(false);
    setModelAudioPlaying(false);
  };

  // Interactive timer loop for preparation & recording states
  useEffect(() => {
    if (simState !== 'prep' && simState !== 'audio' && simState !== 'recording') return;

    const interval = setInterval(() => {
      if (simState === 'prep' || simState === 'audio') {
        setTimerSec((prev) => {
          if (prev <= 1) {
            setSimState('recording');
            setRecordSec(0);
            return 0;
          }
          return prev - 1;
        });
      } else if (simState === 'recording') {
        setRecordSec((prev) => {
          if (prev >= current.maxRecord) {
            setSimState('completed');
            return current.maxRecord;
          }
          return prev + 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [simState, current.maxRecord]);

  const startPracticeFlow = () => {
    setShowAiScore(false);
    if (current.hasAudioPrompt) {
      setTimerSec(current.defaultPrep);
      setSimState('audio');
    } else {
      setTimerSec(current.defaultPrep);
      setSimState('prep');
    }
  };

  const resetSimulator = () => {
    setSimState('idle');
    setTimerSec(current.defaultPrep);
    setRecordSec(0);
    setShowAiScore(false);
    setModelAudioPlaying(false);
  };

  const formatTimer = (secs) => {
    const s = Math.max(0, secs);
    return s < 10 ? `0${s}` : `${s}`;
  };

  // Detailed Module Guide Accordion Data (All 5 tasks)
  const moduleGuideItems = [
    {
      id: 'read-aloud',
      num: 1,
      title: 'Read Aloud',
      meta: 'Highest Priority · Prep: 30-40 seconds · Response: 30-40 seconds',
      badge: 'Highest Priority',
      badgeColor: 'text-teal-600 bg-teal-50 border-teal-200',
      description:
        'The PTE Core Speaking Read Aloud task evaluates your capacity to deliver an unseen short passage fluently and naturally. You receive 30–40 seconds to review punctuation, phrasing, and unfamiliar vocabulary before the recording beep triggers.',
      note: 'Do not start speaking before the microphone opens, as your opening words will be clipped and unrecorded.',
      scoringFocus: 'Pronunciation, Oral Fluency, Content Accuracy',
      skills: ['Speaking ability', 'Reading accuracy'],
      mistakes: [
        'Starting before the microphone opens',
        'Missing, skipping, or substituting words while reading',
        'Speaking rapidly and losing articulation clarity',
        'Ignoring comma and period intonation pauses',
        'Stumbling or self-correcting mid-sentence'
      ],
      proTip:
        'Read meaningful clauses rather than monotone isolated words. Keeping steady speech velocity preserves Oral Fluency.'
    },
    {
      id: 'repeat-sentence',
      num: 2,
      title: 'Repeat Sentence',
      meta: 'Highest Priority · Prep: None · Response: 15 seconds',
      badge: 'Highest Priority',
      badgeColor: 'text-teal-600 bg-teal-50 border-teal-200',
      description:
        'You will hear a brief everyday statement lasting between 3 and 9 seconds. The audio cannot be replayed. Once it finishes, repeat every word aloud using matching intonation and stress patterns within 15 seconds.',
      note: 'This task contributes major marks to both your Listening and Speaking CLB bands.',
      scoringFocus: 'Content Recall, Oral Fluency, Pronunciation',
      skills: ['Short-term auditory memory', 'Spoken fluency'],
      mistakes: [
        'Waiting too long (3+ seconds) after the audio ends before speaking',
        'Inserting filler sounds like "uh" or "um" while thinking',
        'Whispering or speaking too quietly near the microphone'
      ],
      proTip:
        'Close your eyes while listening to focus 100% on the phrase meaning rather than spelling each word mentally.'
    },
    {
      id: 'describe-image',
      num: 3,
      title: 'Describe Image',
      meta: 'Moderate Priority · Prep: 25 seconds · Response: 40 seconds',
      badge: 'Moderate Priority',
      badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      description:
        'A chart, graph, process diagram, map, or everyday workplace graphic displays on screen. After 25 seconds of analysis time, speak smoothly for up to 40 seconds explaining its topic, key values, and summary trend.',
      note: 'In PTE Core, images often represent real-life charts, schedules, floor plans, or infographics.',
      scoringFocus: 'Oral Fluency, Pronunciation, Visual Data Coverage',
      skills: ['Visual interpretation', 'Structured spontaneous speech'],
      mistakes: [
        'Trying to read every single data point or percentage on screen',
        'Long silent pauses while searching for adjectives',
        'Stopping after just 10–12 seconds instead of filling 30+ seconds'
      ],
      proTip:
        'Follow a simple three-sentence scaffold: 1) Title and topic, 2) Largest & smallest figures, 3) Overall conclusion.'
    },
    {
      id: 'respond-to-a-situation',
      num: 4,
      title: 'Respond to a Situation',
      meta: 'Moderate Priority · Prep: 20 seconds · Response: 40 seconds',
      badge: 'Moderate Priority',
      badgeColor: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      description:
        'Exclusive to PTE Core: You listen to and read a practical everyday scenario (such as speaking to a supervisor, neighbor, or bank clerk). You have 20 seconds to organize your response and 40 seconds to speak naturally.',
      note: 'Appropriacy and pragmatic tone (polite vs casual depending on who you speak with) are directly assessed.',
      scoringFocus: 'Task Appropriacy, Oral Fluency, Pronunciation',
      skills: ['Pragmatic situational awareness', 'Functional communication'],
      mistakes: [
        'Describing the problem in the third person instead of speaking directly to the person',
        'Failing to include a polite opening and clear resolution request',
        'Repeating identical phrases awkwardly to fill time'
      ],
      proTip:
        'Always open with a direct realistic greeting ("Good morning...", "Hi Alex..."), explain your situation briefly, and clearly state what outcome you need.'
    },
    {
      id: 'answer-short-question',
      num: 5,
      title: 'Answer Short Question',
      meta: 'Low Priority · Prep: None · Response: 10 seconds',
      badge: 'Least Priority',
      badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description:
        'You will hear a short practical or general-knowledge question (3–9 seconds). Respond immediately with a single word or brief phrase. No preparation time is provided between listening and speaking.',
      note: 'Click Next promptly once you have spoken your response cleanly.',
      scoringFocus: 'Lexical Comprehension, Vocabulary Precision',
      skills: ['Rapid auditory comprehension', 'Vocabulary recall'],
      mistakes: [
        'Overthinking and remaining silent beyond 3 seconds (microphone auto-closes)',
        'Giving long rambling explanations instead of the target noun/verb'
      ],
      proTip:
        'Speak the first logical word clearly. You do not need to add introductory filler words like "The answer is...".'
    }
  ];

  // 6 Video Lesson Cards (Branded cleanly for NinetyPTE)
  const videoLessons = [
    {
      num: '01',
      tag: 'PTE CORE',
      tagColor: 'bg-[#00c5cd]',
      bannerTitle: 'PTE CORE vs ACADEMIC',
      bannerSub: 'Honest Difficulty Comparison',
      title: 'PTE Core vs PTE Academic: Honest Difficulty Comparison',
      duration: '08:42'
    },
    {
      num: '02',
      tag: 'WRITING & READING',
      tagColor: 'bg-[#f0854d]',
      bannerTitle: 'SUMMARIZE WRITTEN TEXT',
      bannerSub: '25-50 Word Core Rules',
      title: 'PTE Core: Summarize Written Text Made Easy | Expert Tips & Examples',
      duration: '11:15'
    },
    {
      num: '03',
      tag: 'SPEAKING',
      tagColor: 'bg-emerald-500',
      bannerTitle: 'STOP LOSING MARKS',
      bannerSub: 'Read Aloud Techniques',
      title: 'Stop Losing Marks in PTE Read Alouds - Easy Techniques for Core',
      duration: '09:30'
    },
    {
      num: '04',
      tag: 'CORE UNIQUE',
      tagColor: 'bg-sky-500',
      bannerTitle: 'WRITE EMAIL TEMPLATE',
      bannerSub: 'Formal & Informal Guide',
      title: 'How to Write an Informal Email in PTE Core | Step-by-Step Guide',
      duration: '12:20'
    },
    {
      num: '05',
      tag: 'CORE UNIQUE',
      tagColor: 'bg-amber-500',
      bannerTitle: 'RESPOND TO SITUATION',
      bannerSub: 'CLB 9 Sample Answers',
      title: 'Respond to the Situation - PTE Core | Full Guide + Tips to Score High!',
      duration: '10:05'
    },
    {
      num: '06',
      tag: 'LISTENING',
      tagColor: 'bg-indigo-500',
      bannerTitle: 'WRITE FROM DICTATION',
      bannerSub: 'Maximize Accuracy',
      title: 'Master Write From Dictation (WFD) to Boost Your PTE Core Score',
      duration: '07:50'
    }
  ];

  const faqs = [
    {
      q: 'What is the speaking section in PTE Core?',
      a: 'The Speaking section is combined with Writing in Part 1 of the PTE Core test (lasting 50–65 minutes). It measures everyday English speaking proficiency across 5 scored tasks: Read Aloud, Repeat Sentence, Describe Image, Respond to a Situation, and Answer Short Question.'
    },
    {
      q: 'How many speaking tasks are there in PTE Core?',
      a: 'There are 5 scored speaking task types (plus 1 unscored Personal Introduction at the very beginning). In a full exam, you will answer roughly 26 to 33 individual speaking prompts.'
    },
    {
      q: 'How can I improve my PTE Core speaking score?',
      a: 'Prioritize continuous Oral Fluency and crisp Pronunciation over fast speaking speed. Practice Read Aloud and Repeat Sentence daily under strict timed countdowns using NinetyPTE AI scoring feedback.'
    },
    {
      q: 'What is the hardest speaking task in PTE Core?',
      a: 'Many candidates find Repeat Sentence challenging due to the absence of preparation time and 10–12 consecutive items, while Respond to a Situation requires switching naturally between formal and informal workplace registers.'
    },
    {
      q: 'Can I practice PTE Core speaking online for free?',
      a: 'Yes! NinetyPTE provides complimentary access to sample PTE Core questions, real exam-mode countdown timers, and scored Speaking Mock Tests so you can assess readiness before booking.'
    },
    {
      q: 'How much time should I spend preparing for speaking?',
      a: 'Most learners aiming for CLB 7 to CLB 9 benefit from 2 to 4 weeks of focused daily drills (30–45 minutes per day) targeting pronunciation clarity and natural chunking.'
    },
    {
      q: 'Can I use templates for PTE Core Speaking tasks?',
      a: 'Flexible structural frameworks are effective for Describe Image and Respond to a Situation to prevent awkward hesitation. However, remember to fill those frameworks meaningfully with relevant content from the visual or scenario.'
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
      {/* 1. HERO HEADER & 4 MODULE SWITCHER                                        */}
      {/* ========================================================================= */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Speaking Practice</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Practice all 5 speaking task types with AI scoring, instant feedback, and real exam-format questions. Click any task to explore.
            </p>
          </div>

          {/* 4 Module Pills Switcher */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 border border-slate-200/80">
            <Link
              to="/pte-core-speaking-practice"
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#00c5cd] text-white shadow-xs flex items-center gap-1.5 transition"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Speaking</span>
            </Link>
            <Link
              to="/pte-core-writing-practice"
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-full flex items-center gap-1.5 transition"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Writing</span>
            </Link>
            <Link
              to="/pte-core-reading-practice"
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-full flex items-center gap-1.5 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading</span>
            </Link>
            <Link
              to="/pte-core-listening-practice"
              className="px-5 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-full flex items-center gap-1.5 transition"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Listening</span>
            </Link>
          </div>

          {/* 5 Speaking Task Selector Cards Grid */}
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
                  {/* Top Row: Icon + Radio Circle */}
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

                  {/* Title & Impact Badges */}
                  <div className="space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {t.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${t.impactColor}`}>
                        {t.impact}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-50 text-orange-600 border border-orange-200">
                        ⚡ AI Scoring
                      </span>
                    </div>
                  </div>

                  {/* Bottom Count & Arrow */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    <span>{t.countBadge}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00c5cd]' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Task Horizontal Summary Bar (Cyan Accent) */}
          <div className="bg-cyan-50/40 border border-cyan-200/90 rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00c5cd] text-white flex items-center justify-center shrink-0 shadow-xs">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{current.title}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500">{current.shortDesc}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00c5cd]" /> Prep: <strong className="text-slate-800">{current.prepShort}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00c5cd]" /> Answer: <strong className="text-slate-800">{current.answerShort}</strong>
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span>{current.questionRange}</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="font-medium text-slate-700">{current.skillsShort}</span>
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
      {/* 2. SECTION ANCHOR PILLS BAR                                               */}
      {/* ========================================================================= */}
      <div className="border-y border-slate-100 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
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
      {/* 3. KNOW ALL ABOUT PTE CORE SPEAKING QUESTIONS + PRACTICE SIMULATOR        */}
      {/* ========================================================================= */}
      <section id="practice-workspace" className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Know All About PTE Core <span className="text-[#00c5cd]">Speaking Practice Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              Familiarize yourself with each speaking task style. Explore official exam questions one by one with complete instruction summaries below.
            </p>
          </div>

          {/* 5 Sub-Task Pills (Orange active pill like PDF Page 1) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'read-aloud', label: 'Read Aloud' },
              { id: 'repeat-sentence', label: 'Repeat Sentence' },
              { id: 'describe-image', label: 'Describe Image' },
              { id: 'respond-to-a-situation', label: 'Respond to a Situation' },
              { id: 'answer-short-question', label: 'Answer Short Question' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => handleTaskSwitch(pill.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  activeTask === pill.id
                    ? 'bg-[#f0854d] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Warm Peach Specs Summary Bar */}
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 sm:p-5 grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Task</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.task}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Skills Assessed</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.skills}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Prompt Length</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.promptLength}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Prep Time</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.prepTime}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Time to Answer</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.answerTime}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Questions</div>
              <div className="text-[11px] font-bold text-slate-800">{current.tableSpecs.questions}</div>
            </div>
          </div>

          {/* 3-Step Flow Indicator */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 py-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-50 text-[#f0854d] font-bold text-[11px] flex items-center justify-center border border-orange-200">
                1
              </span>
              <span className="font-semibold text-slate-700">{current.steps[0]}</span>
            </div>
            <span className="w-8 sm:w-12 h-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-50 text-[#f0854d] font-bold text-[11px] flex items-center justify-center border border-orange-200">
                2
              </span>
              <span className="font-semibold text-slate-700">{current.steps[1]}</span>
            </div>
            <span className="w-8 sm:w-12 h-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-orange-50 text-[#f0854d] font-bold text-[11px] flex items-center justify-center border border-orange-200">
                3
              </span>
              <span className="font-semibold text-slate-700">{current.steps[2]}</span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* INTERACTIVE PRACTICE WORKSPACE CARD (Matching PDF Page 1 & 2)         */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
            
            {/* Header Row */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-[#f0854d] flex items-center justify-center shrink-0">
                <current.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{current.practiceTitle}</h3>
                <p className="text-xs text-slate-500">{current.practiceSubtitle}</p>
              </div>
            </div>

            {/* STEP 1 — PREPARATION / AUDIO */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                    {current.step1Title}
                  </span>
                  <span className="text-[11px] text-slate-400 ml-2">{current.step1Sub}</span>
                </div>

                <button
                  onClick={simState === 'idle' || simState === 'completed' ? startPracticeFlow : resetSimulator}
                  className="px-4 py-1.5 rounded-lg bg-[#f0854d] hover:bg-[#df743c] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                >
                  {simState === 'idle' || simState === 'completed' ? (
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

              {/* Status Label matching PDF Page 1 */}
              <div className="text-[11px] font-bold uppercase tracking-wider">
                {simState === 'idle' && (
                  <span className="text-[#f0854d]">RECORDING IN {current.defaultPrep} SEC</span>
                )}
                {simState === 'prep' && (
                  <span className="text-[#f0854d]">PREPARING — RECORDING BEGINS IN {timerSec} SEC</span>
                )}
                {simState === 'audio' && (
                  <span className="text-[#00c5cd]">AUDIO PLAYING — RECORDING IN {timerSec} SEC</span>
                )}
                {simState === 'recording' && (
                  <span className="text-rose-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                    RECORDING LIVE ({current.maxRecord - recordSec} SEC REMAINING)
                  </span>
                )}
                {simState === 'completed' && (
                  <span className="text-emerald-600">RECORDING COMPLETED — READY FOR AI SCORING</span>
                )}
              </div>

              {/* Prompt Content Area per Task */}
              {activeTask === 'read-aloud' && (
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                    {current.promptText}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setModelAudioPlaying(!modelAudioPlaying)}
                      className="text-xs font-semibold text-[#f0854d] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{modelAudioPlaying ? 'Model Audio Playing...' : 'Listen to Model Audio'}</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTask === 'describe-image' && (
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="text-xs font-bold text-slate-800 text-center">
                    Municipal Renewable Energy Capacity Growth (Gigawatts, 2018 - 2024)
                  </div>
                  <div className="h-40 w-full max-w-md mx-auto flex items-end justify-around gap-3 px-4 pt-3 border-b border-l border-slate-300 bg-white rounded-tr-xl">
                    <div className="flex flex-col items-center gap-1 w-12">
                      <span className="text-[10px] font-bold text-slate-600">180 GW</span>
                      <div className="w-full bg-[#f0854d]/70 rounded-t h-14" />
                      <span className="text-[10px] text-slate-500 pb-1">2018</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-12">
                      <span className="text-[10px] font-bold text-slate-600">240 GW</span>
                      <div className="w-full bg-[#f0854d]/85 rounded-t h-20" />
                      <span className="text-[10px] text-slate-500 pb-1">2020</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-12">
                      <span className="text-[10px] font-bold text-slate-600">310 GW</span>
                      <div className="w-full bg-[#f0854d] rounded-t h-28" />
                      <span className="text-[10px] text-slate-500 pb-1">2022</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-12">
                      <span className="text-[10px] font-bold text-slate-800">420 GW</span>
                      <div className="w-full bg-[#00c5cd] rounded-t h-34" />
                      <span className="text-[10px] font-bold text-slate-800 pb-1">2024</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTask === 'respond-to-a-situation' && (
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                    {current.promptText}
                  </p>
                  <div className="border border-slate-200/90 rounded-lg p-3.5 bg-white shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Audio Player</span>
                      <span className="text-[#00c5cd] font-semibold">
                        {simState === 'audio' ? 'Playing' : simState === 'idle' ? 'Ready' : 'Completed'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-[#00c5cd] rounded-full transition-all duration-300"
                        style={{ width: simState === 'audio' ? '60%' : simState === 'recording' || simState === 'completed' ? '100%' : '25%' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {(activeTask === 'repeat-sentence' || activeTask === 'answer-short-question') && (
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="border border-slate-200/90 rounded-lg p-3.5 bg-white shadow-2xs">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Audio Player</span>
                      <span className="text-[#00c5cd] font-semibold">
                        {simState === 'audio' ? 'Playing' : simState === 'idle' ? 'Playing' : 'Completed'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-[#00c5cd] rounded-full transition-all duration-300"
                        style={{ width: simState === 'audio' ? '55%' : simState === 'recording' || simState === 'completed' ? '100%' : '45%' }}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic text-center">
                    Sample Audio Script Hint: &ldquo;{current.audioTranscript}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* STEP 2 — RECORD YOUR RESPONSE (Tick Ruler Waveform matching Page 1) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-slate-700">STEP 2 — RECORD YOUR RESPONSE</span>
                  <span className="text-[#f0854d] font-semibold ml-2 cursor-pointer" onClick={() => setSimState(simState === 'recording' ? 'completed' : 'recording')}>
                    {simState === 'recording' ? 'Recording Active (Click to Finish)' : 'Click mic to record'}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-500">
                  {formatTimer(recordSec)} / {formatTimer(current.maxRecord)}
                </span>
              </div>

              {/* Microphone + Horizontal Tick Ruler Box */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex items-center gap-4">
                <button
                  onClick={() => setSimState(simState === 'recording' ? 'completed' : 'recording')}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition cursor-pointer ${
                    simState === 'recording'
                      ? 'bg-rose-500 text-white animate-pulse shadow-sm'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                  aria-label="Toggle microphone recording"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Waveform / Tick Bars */}
                <div className="flex-1 flex items-center justify-between gap-1 h-6 px-1 relative overflow-hidden">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const progressRatio = current.maxRecord > 0 ? recordSec / current.maxRecord : 0;
                    const activeTick = i / 24 <= progressRatio && simState !== 'idle';
                    const isMajor = i % 3 === 0;
                    return (
                      <div
                        key={i}
                        className={`w-0.5 rounded-full transition-colors duration-200 ${
                          isMajor ? 'h-4' : 'h-2'
                        } ${activeTick ? 'bg-[#00c5cd]' : 'bg-slate-300'}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Instant AI Score Feedback Panel (When Submitted) */}
            {showAiScore && (
              <div className="bg-cyan-50/50 border border-cyan-200 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#00c5cd]" />
                    Instant NinetyPTE AI Evaluation Result
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00c5cd] text-white text-xs font-extrabold">
                    81 / 90 (CLB 9 Ready)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500">Content</div>
                    <div className="font-black text-slate-800">84 / 90</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500">Oral Fluency</div>
                    <div className="font-black text-[#00c5cd]">82 / 90</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-500">Pronunciation</div>
                    <div className="font-black text-slate-800">79 / 90</div>
                  </div>
                </div>
              </div>
            )}

            {/* Practice Card Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  <strong className="text-slate-700">Pro Tip:</strong> {current.proTip}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={resetSimulator}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  title="Reset practice question"
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
                  onClick={() => setShowAiScore(true)}
                  className="px-5 py-2 rounded-lg bg-[#00c5cd] hover:bg-[#00b2ba] text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <span>Submit for AI Score</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dark Navy Banner: Improve Your PTE Core Speaking Score */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg p-8 sm:p-10 text-center space-y-4 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Improve Your PTE Core Speaking Score
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
              Practice more speaking questions with AI-powered scoring and instant feedback on NinetyPTE.
            </p>
            <div>
              <Link
                to="/dashboard"
                className="px-7 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00b2ba] text-white font-extrabold text-xs shadow-md transition inline-block"
              >
                Start PTE Core Speaking Practice
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT IS THE PTE CORE SPEAKING SECTION?                                 */}
      {/* ========================================================================= */}
      <section id="overview" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Is the <span className="text-[#00c5cd]">PTE Core Speaking Section</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Everything you need to know about the PTE Core Speaking section — exam format, expert tips, and proven strategies.
            </p>
          </div>

          {/* Teal-Bordered Info Box matching PDF Page 2 */}
          <div className="bg-white border-2 border-[#00c5cd]/60 rounded-2xl p-6 shadow-2xs space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              The PTE Core Speaking practice belongs to Part 1 (Speaking &amp; Writing), which is the first and longest continuous module of the exam, lasting roughly 50–65 minutes in total.
            </p>
            <p>
              Across Part 1, you complete 7 distinct question types, of which 5 tasks directly measure spoken fluency and communicative accuracy. Conducted 100% by computer using a calibrated headset, the test captures spoken answers automatically under strict countdown timers.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <a
                href="#task-types"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00c5cd] hover:underline"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Explore the 5 PTE Core Speaking Tasks &gt;</span>
              </a>
            </div>
          </div>

          {/* Performance Assessment Criteria */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 bg-[#00c5cd] rounded-full inline-block" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Not only this, but your performance is assessed on:
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                  <Zap className="w-4 h-4 text-[#00c5cd]" />
                  <span>Content Relevance</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Your answer must be accurate, complete, and relevant to the prompt stimulus.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                  <Scale className="w-4 h-4 text-sky-500" />
                  <span>Oral Fluency</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Your spoken delivery should flow naturally without choppy hesitations or long gaps.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  <span>Pronunciation</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Vowel tones, consonants, and syllable stress patterns must remain clear to listeners.
                </p>
              </div>
            </div>

            <div className="bg-slate-100/80 border border-slate-200/80 rounded-xl px-4 py-3 text-xs font-semibold text-slate-700">
              A strong score depends on how clearly and naturally you speak without unnecessary pauses.
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. IN-DEPTH MODULE GUIDE: SPEAKING TASK TYPES (EXPANDABLE ACCORDION)       */}
      {/* ========================================================================= */}
      <section id="task-types" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00c5cd] text-[10px] font-extrabold uppercase tracking-wider">
              In-Depth Module Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PTE Core <span className="text-[#00c5cd]">Speaking Task Types</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Explore exam rules, response strategy, scoring criteria, and common mistakes for each speaking task.
            </p>
          </div>

          <div className="space-y-3">
            {moduleGuideItems.map((item, idx) => {
              const isOpen = expandedType === idx;
              return (
                <div key={item.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                  
                  {/* Accordion Header */}
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
                        <p className="text-[11px] text-[#00c5cd] font-medium">{item.meta}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                        • {item.badge}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#00c5cd]' : ''}`} />
                    </div>
                  </button>

                  {/* Accordion Expanded Body (Matching Page 2 & 3 Two-Column Design) */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/30 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left Column */}
                      <div className="lg:col-span-7 space-y-4">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                        <p className="text-xs font-medium text-slate-700 leading-relaxed">
                          {item.note}
                        </p>

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

                      {/* Right Column: Common Mistakes & Pro Tip */}
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
      {/* 6. HOW PTE CORE SPEAKING IS SCORED? (Visual Diagram Page 3 & 4)           */}
      {/* ========================================================================= */}
      <section id="scoring" className="py-12 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How PTE Core <span className="text-[#00c5cd]">Speaking Is Scored</span>?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
              The PTE Core speaking section is scored automatically based on clarity, fluency, and accurate coverage across three pillars: Content, Oral Fluency, and Pronunciation.
            </p>
          </div>

          {/* Hub & Spoke Visual Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Left Node: Pronunciation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Pronunciation</h3>
              <p className="text-xs text-slate-500 font-normal">
                Evaluates how clearly your speech can be understood by speakers worldwide.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Clear vowel &amp; consonant sounds</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Natural word &amp; syllable stress</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Easy to understand delivery</li>
              </ul>
            </div>

            {/* Center Circle: Overall Speaking Score */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-44 h-44 rounded-full border-4 border-[#00c5cd]/30 bg-white shadow-lg flex flex-col items-center justify-center p-6 text-center relative">
                <div className="w-36 h-36 rounded-full border-2 border-[#00c5cd] flex flex-col items-center justify-center p-4">
                  <span className="text-sm font-black text-slate-900 leading-tight">Overall Speaking Score</span>
                </div>
              </div>
            </div>

            {/* Right Node: Content */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Content</h3>
              <p className="text-xs text-slate-500 font-normal">
                Evaluates how accurately and completely you fulfill each task prompt.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Relevant verbal response</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Covers essential key info</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Follows exact task constraints</li>
              </ul>
            </div>

          </div>

          {/* Bottom Centered Node: Oral Fluency */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Oral fluency</h3>
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                <Mic className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Evaluates how smoothly, effortlessly, and naturally you deliver your words.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Natural conversational pace</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> No long hesitant pauses</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Smooth continuous rhythm</li>
            </ul>
          </div>

          {/* Score Impact Dark Strip */}
          <div className="bg-[#0f172a] rounded-2xl p-5 text-white flex items-start gap-3.5 shadow-md">
            <div className="w-9 h-9 rounded-lg bg-white/10 text-[#00c5cd] flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs">
              <h4 className="font-bold text-white">Score impact</h4>
              <p className="text-slate-300 leading-relaxed font-normal">
                All three traits combine to calculate your overall communicative Speaking score. Consistent smooth rhythm alongside clear delivery yields top CLB performance across every prompt.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. EXPERT TIPS + VIDEO LESSONS (Page 4 Layout)                            */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Expert Tips Checklist */}
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Expert Tips to Improve Your <span className="text-[#00c5cd]">PTE Core Speaking Score</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Proven strategies from coaches to help you speak clearly and confidently.
              </p>
            </div>

            <div className="bg-cyan-50/20 border-2 border-[#00c5cd]/40 rounded-2xl p-6 text-left max-w-4xl mx-auto space-y-3">
              {[
                'Use timed mock practice regularly to adapt to strict exam countdown pressure and quicken response starts.',
                'Focus on crisp articulation of word endings so computer voice recognition logs every syllable cleanly.',
                'Record and play back your practice attempts to catch repetitive filler words or nervous hesitations.',
                'Prioritize smooth oral rhythm before attempting rapid delivery; steady pacing wins higher fluency scores.',
                'Apply clean structural templates in Describe Image and Respond to a Situation to avoid unplanned silences.'
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal">
                  <CheckCircle2 className="w-4 h-4 text-[#00c5cd] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            <Link
              to="/pte-core-mock-test"
              className="inline-block px-7 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition"
            >
              Take a Full PTE Core Speaking Practice Test
            </Link>
          </div>

          {/* Video Lessons & Expert Strategies */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                PTE Core Speaking <span className="text-[#00c5cd]">Video Lessons &amp; Expert Strategies</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Learn practical PTE Core strategies with concise step-by-step video lessons.
              </p>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 pt-1">
                TASK-WISE TUTORIALS • EXPERT GUIDANCE • EXAM-FOCUSED PRACTICE
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videoLessons.map((vid) => (
                <div
                  key={vid.num}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition group"
                >
                  {/* Clean Branded Dark CSS Thumbnail */}
                  <div className="h-44 bg-gradient-to-br from-[#0f172a] via-slate-800 to-slate-900 p-5 flex flex-col justify-between relative text-white">
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

                  {/* Caption Bar */}
                  <div className="p-3.5 flex items-center justify-between gap-2 bg-white">
                    <div className="flex items-start gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-cyan-50 text-[#00c5cd] font-bold text-[10px] shrink-0">
                        {vid.num}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                        {vid.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                to="/pte-online-course"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition"
              >
                <span>Explore More Videos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Dark Navy Banner: Ready to take our PTE Core Free Mock Test? (Page 5) */}
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready to take our <span className="text-[#00c5cd]">PTE Core Free Mock Test</span>?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Get immediate access to realistic study materials, scored practice tests, and structured guidance to succeed in your PTE Core exam.
              </p>
              <div className="pt-1">
                <Link
                  to="/signup"
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
              PTE Core Speaking – <span className="text-[#00c5cd]">Frequently Asked Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Get answers to the most common questions about PTE Core Speaking and preparation strategies.
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
                      <FileText className="w-4 h-4 text-[#00c5cd] shrink-0" />
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

      {/* ========================================================================= */}
      {/* 9. BOTTOM CTA + ENQUIRY FORM (Page 5 Bottom Layout)                       */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Ready to Start Your <span className="text-[#00c5cd]">PTE Core Speaking Practice</span> Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              On NinetyPTE, start your PTE Core speaking preparation with authentic exam-style questions engineered to help you understand test mechanics and build fluency effortlessly.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Practice real exam questions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Get instant feedback on your responses</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Track your progress over time</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00c5cd]" /> Build confidence before your test day</li>
            </ul>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-xs transition">
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
                <p className="text-xs text-slate-600">Our NinetyPTE preparation team will reach out shortly.</p>
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
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Institute Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="University"
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden"
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
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Country*</label>
                    <select
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#00c5cd] focus:outline-hidden"
                    >
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
                  <input
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message*</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Your Message"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#00c5cd] focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#1e3a8a] hover:bg-[#00c5cd] text-white font-bold text-xs shadow-sm transition cursor-pointer"
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
