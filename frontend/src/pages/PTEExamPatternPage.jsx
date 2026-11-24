import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Clock, 
  RotateCcw, 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  Maximize2, 
  Mic, 
  Volume2,
  Lightbulb, 
  Award,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Play,
  Pause
} from 'lucide-react';

export default function PTEExamPatternPage() {
  const location = useLocation();

  // Detect module from URL if visited via specific route
  const getInitialModule = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('writing')) return 'writing';
    if (path.includes('reading')) return 'reading';
    if (path.includes('listening')) return 'listening';
    return 'speaking';
  };

  const [activeModule, setActiveModule] = useState(getInitialModule);
  const [activeTaskId, setActiveTaskId] = useState('read-aloud');
  const [openFaq, setOpenFaq] = useState(0);

  // Audio Simulator state (Speaking)
  const [simQuestionIdx, setSimQuestionIdx] = useState(0);
  const [simCountdown, setSimCountdown] = useState(35);
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  // Writing Text Editor Simulator state
  const textareaRef = useRef(null);
  const [writingText, setWritingText] = useState('');
  const [writingWordCount, setWritingWordCount] = useState(0);
  const [writingTimeLeft, setWritingTimeLeft] = useState(484); // 08:04 for SWT initial

  // Reading Simulators state
  const [readingSeconds, setReadingSeconds] = useState(63); // 01:03 initial
  const [readingDropdowns, setReadingDropdowns] = useState({});
  const [readingCheckboxes, setReadingCheckboxes] = useState([]);
  const [readingRadio, setReadingRadio] = useState(null);
  const [reorderSource, setReorderSource] = useState([]);
  const [reorderTarget, setReorderTarget] = useState([]);
  const [dragSlots, setDragSlots] = useState({});

  // Listening Simulators state
  const [listeningAudioStatus, setListeningAudioStatus] = useState('completed'); // 'playing' | 'completed' | 'beginning'
  const [listeningAudioProgress, setListeningAudioProgress] = useState(100);
  const [listeningSeconds, setListeningSeconds] = useState(1373); // 22:53 / 43:12
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [dictationText, setDictationText] = useState('');
  const [listeningBlanks, setListeningBlanks] = useState({});
  const [listeningRadio, setListeningRadio] = useState(null);
  const [listeningCheckboxes, setListeningCheckboxes] = useState([]);
  const [sstText, setSstText] = useState('');
  const [sstWordCount, setSstWordCount] = useState(0);

  // Update active module when route changes
  useEffect(() => {
    const mod = getInitialModule();
    setActiveModule(mod);
    if (mod === 'speaking') setActiveTaskId('read-aloud');
    else if (mod === 'writing') setActiveTaskId('summarize-written-text');
    else if (mod === 'reading') setActiveTaskId('rw-fill-in-blanks');
    else if (mod === 'listening') setActiveTaskId('summarize-spoken-text');
  }, [location.pathname]);

  // Reset simulator when switching task
  useEffect(() => {
    setSimQuestionIdx(0);
    setSimCountdown(35);
    setIsRecording(false);
    setIsCompleted(false);
    setWritingText('');
    setWritingWordCount(0);
    setReadingDropdowns({});
    setReadingCheckboxes([]);
    setReadingRadio(null);
    setDragSlots({});
    setHighlightedWords([]);
    setDictationText('');
    setListeningBlanks({});
    setListeningRadio(null);
    setListeningCheckboxes([]);
    setSstText('');
    setSstWordCount(0);
    setListeningAudioStatus('completed');
    setListeningAudioProgress(100);

    if (activeTaskId === 'write-essay') {
      setWritingTimeLeft(1196); // 19:56
    } else if (activeTaskId === 'summarize-written-text') {
      setWritingTimeLeft(484);  // 08:04
    } else if (activeTaskId === 'rw-fill-in-blanks') {
      setReadingSeconds(63); // 01:03
    } else if (activeTaskId === 'mcq-multiple') {
      setReadingSeconds(89); // 01:29
    } else if (activeTaskId === 'reorder-paragraphs') {
      setReadingSeconds(117); // 01:57
      setReorderSource([
        { id: '1', text: "Scholars noted that civic institutions require widespread public participation to remain effective." },
        { id: '2', text: "Without this engagement, policy formulation becomes isolated from societal needs." },
        { id: '3', text: "Democratic theorists have long distinguished between formal voting and continuous community dialogue." },
        { id: '4', text: "Consequently, grassroots assemblies were established to bridge the communicative divide." },
        { id: '5', text: "In this framework, ongoing civic deliberation is considered essential for democratic resilience." }
      ]);
      setReorderTarget([]);
    } else if (activeTaskId === 'reading-fill-in-blanks') {
      setReadingSeconds(137); // 02:17
    } else if (activeTaskId === 'mcq-single') {
      setReadingSeconds(283); // 04:43
    } else if (activeTaskId === 'highlight-incorrect-words') {
      setListeningSeconds(1373); // 22:53
    } else if (activeTaskId === 'write-from-dictation') {
      setListeningSeconds(1404); // 23:24
    } else if (activeTaskId === 'listening-fill-in-blanks') {
      setListeningSeconds(1221); // 20:21
    } else if (activeTaskId === 'highlight-correct-summary') {
      setListeningSeconds(1332); // 22:12
    } else if (activeTaskId === 'listening-mcq-single') {
      setListeningSeconds(1258); // 20:58
    } else if (activeTaskId === 'select-missing-words') {
      setListeningSeconds(1207); // 20:07
    } else if (activeTaskId === 'listening-mcq-multiple') {
      setListeningSeconds(1140); // 19:00
    } else if (activeTaskId === 'summarize-spoken-text') {
      setListeningSeconds(600);  // 10:00
    }
  }, [activeTaskId, activeModule]);

  // Timers
  useEffect(() => {
    if (activeModule === 'writing') {
      const timer = setInterval(() => {
        setWritingTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    } else if (activeModule === 'reading') {
      const timer = setInterval(() => {
        setReadingSeconds(prev => (prev < 1740 ? prev + 1 : 1740));
      }, 1000);
      return () => clearInterval(timer);
    } else if (activeModule === 'listening') {
      const timer = setInterval(() => {
        setListeningSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeModule, activeTaskId]);

  // Format time MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Textarea input handler with word counting
  const handleWritingTextChange = (e) => {
    const text = e.target.value;
    setWritingText(text);
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    setWritingWordCount(words);
  };

  const handleSstChange = (e) => {
    const text = e.target.value;
    setSstText(text);
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    setSstWordCount(words);
  };

  // Word highlight toggle for HIW
  const toggleWordHighlight = (wordIndex) => {
    if (highlightedWords.includes(wordIndex)) {
      setHighlightedWords(highlightedWords.filter(i => i !== wordIndex));
    } else {
      setHighlightedWords([...highlightedWords, wordIndex]);
    }
  };

  // Clipboard operations
  const handleCut = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start !== end) {
      const selected = writingText.substring(start, end);
      try { navigator.clipboard?.writeText(selected); } catch {}
      const newText = writingText.substring(0, start) + writingText.substring(end);
      setWritingText(newText);
      const words = newText.trim() ? newText.trim().split(/\s+/).filter(Boolean).length : 0;
      setWritingWordCount(words);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start;
        textarea.focus();
      }, 0);
    }
  };

  const handleCopy = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start !== end) {
      const selected = writingText.substring(start, end);
      try { navigator.clipboard?.writeText(selected); } catch {}
    }
  };

  const handlePaste = async () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let textToInsert = '';
    try { textToInsert = await navigator.clipboard.readText(); } catch { textToInsert = ''; }
    const newText = writingText.substring(0, start) + textToInsert + writingText.substring(end);
    setWritingText(newText);
    const words = newText.trim() ? newText.trim().split(/\s+/).filter(Boolean).length : 0;
    setWritingWordCount(words);
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + textToInsert.length;
      textarea.focus();
    }, 0);
  };

  // Re-order handlers
  const handleMoveToTarget = (item) => {
    setReorderSource(prev => prev.filter(i => i.id !== item.id));
    setReorderTarget(prev => [...prev, item]);
  };

  const handleMoveToSource = (item) => {
    setReorderTarget(prev => prev.filter(i => i.id !== item.id));
    setReorderSource(prev => [...prev, item]);
  };

  // Drag & drop blank slot handler
  const handleBankWordClick = (word) => {
    for (let i = 0; i < 4; i++) {
      if (!dragSlots[i]) {
        setDragSlots(prev => ({ ...prev, [i]: word }));
        break;
      }
    }
  };

  const handleSlotWordClick = (slotIdx) => {
    setDragSlots(prev => {
      const next = { ...prev };
      delete next[slotIdx];
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // DATA STRUCTURE FOR ALL MODULES AND TASKS
  // ---------------------------------------------------------------------------
  const modulesData = {
    speaking: {
      title: 'PTE Speaking Practice',
      subtitle: 'Latest PTE Academic & UKVI Speaking Questions',
      overview:
        "The PTE Speaking module assesses oral fluency, pronunciation, and communicative competence in academic scenarios. Candidates record responses using a headset microphone and receive real-time AI scoring on NinetyPTE.",
      tasks: [
        {
          id: 'read-aloud',
          code: 'RA',
          title: 'Read Aloud',
          tagline: 'Read Aloud tests your speaking abilities by reading academic texts with natural intonation, phrasing, and pronunciation.',
          table: {
            taskDesc: 'A text appears on the screen. Read the text aloud',
            skills: 'Speaking & Reading',
            promptLength: 'Text up to 60 words',
            prepTime: '35-40 seconds',
            answerTime: '35-40 seconds',
            questionCount: '6 - 7'
          },
          mockQuestions: [
            {
              instruction: 'Look at the text below. In 35 seconds, read this text aloud as naturally and clearly as possible.',
              prompt: "Sustainable architecture integrates ecological engineering principles into urban dwellings. Modern structures capture solar irradiance and recycle greywater to minimize municipal utility strain while preserving natural biodiversity.",
              tips: 'Maintain steady pace, articulate syllables clearly, and pause naturally at punctuation marks.',
              modelScore: '90/90 - Full oral fluency and native cadence'
            }
          ],
          howToRespond: {
            bullets: [
              'You have 35-40 seconds to read the text silently and prepare before the microphone opens.',
              'Speak immediately after the tone. Avoid hesitations or self-corrections.',
              'Maintain a natural, consistent conversational pace without rushing.'
            ],
            note: 'The microphone closes automatically after three seconds of silence.',
            grading: 'Content, Oral Fluency, and Pronunciation.',
            tipsBadge: 'Read Aloud TIPS'
          },
          faqs: [
            { q: 'How is Read Aloud scored?', a: 'Scoring evaluates Content (words spoken accurately), Oral Fluency (smooth rhythm), and Pronunciation (phonemic clarity).' },
            { q: 'What happens if I pause?', a: 'Pausing for longer than 3 seconds turns off the recorder and stops recording your response.' }
          ]
        }
      ]
    },

    writing: {
      title: 'PTE Writing Practice',
      subtitle: 'Latest PTE Academic & UKVI Writing Questions',
      overview:
        "The PTE Writing module evaluates your ability to produce accurate, academically coherent written English. Practice on NinetyPTE gives you instantaneous automated evaluation across grammar, vocabulary, spelling, and discourse.",
      tasks: [
        {
          id: 'summarize-written-text',
          code: 'SWT',
          title: 'Summarize Written Text',
          tagline: 'Summarize Written Text challenges you to condense an academic passage of up to 300 words into a single sentence of 5 to 75 words.',
          table: {
            taskDesc: 'After reading a text, write a one-sentence summary of the passage',
            skills: 'Reading and Writing',
            promptLength: 'Text up to 300 words',
            prepTime: null,
            answerTime: '10 minutes',
            questionCount: '1 - 2'
          },
          mockQuestions: [
            {
              instruction: 'Read the passage below and summarize it using one sentence. You have 10 minutes to finish this task.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '28 of 29',
              passage: "Technological advancements in agricultural automation have exponentially elevated crop productivity over recent decades. However, unchecked irrigation runoff has compromised local river basins, prompting agronomists to develop closed-loop hydroponic systems.",
              tips: 'Formulate a single compound-complex sentence uniting primary findings with subordinating conjunctions.',
              modelScore: '90/90 - Exactly 1 sentence, 38 words, complete grammatical accuracy.'
            }
          ],
          howToRespond: {
            bullets: [
              'Your summary must be strictly ONE sentence ending with a single period.',
              'Maintain your word count between 35 and 45 words for optimal safety.',
              'Utilize the Cut, Copy, and Paste buttons to edit your draft efficiently.'
            ],
            editingInstructions: {
              cut: 'Highlight words to remove and click "Cut."',
              copy: 'Select desired text and click "Copy."',
              paste: 'Position your cursor and click "Paste."'
            },
            grading: 'Content, form, grammar, and vocabulary.',
            tipsBadge: 'Summarize Written Text TIPS'
          },
          faqs: [
            { q: 'What is the word limit?', a: 'Between 5 and 75 words. Writing fewer than 5 or more than 75 words receives 0 for Form.' }
          ]
        },
        {
          id: 'write-essay',
          code: 'WE',
          title: 'Essay',
          tagline: 'Write a persuasive academic essay of 200–300 words on an assigned topic within 20 minutes.',
          table: {
            taskDesc: 'Write a 200 - 300 word essay on a given topic',
            skills: 'Writing',
            promptLength: '2 - 3 sentences',
            prepTime: null,
            answerTime: '20 minutes',
            questionCount: '1 - 2'
          },
          mockQuestions: [
            {
              instruction: 'You have 20 minutes to plan, write and revise an essay on the topic below. Write 200-300 words.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '29 of 29',
              prompt: 'Do you agree that globalization is important? Give reasons.',
              tips: 'Structure: Introduction with thesis, Body paragraph 1 (economic advantages), Body paragraph 2 (cultural impacts), Conclusion.',
              modelScore: '90/90 - 256 words: Clean 4-paragraph essay with academic discourse markers.'
            }
          ],
          howToRespond: {
            bullets: [
              'Write between 200 and 300 words based on the given topic prompt.',
              'Allocate 2 minutes for planning, 14 minutes for writing, and 4 minutes for proofreading.'
            ],
            editingInstructions: {
              cut: 'Select text to delete and press "Cut."',
              copy: 'Select text and press "Copy."',
              paste: 'Place cursor and press "Paste."'
            },
            grading: 'Content, development, structure, form, grammar, vocabulary, and spelling.',
            tipsBadge: 'Write Essay TIPS'
          },
          faqs: [
            { q: 'What essay structure should I follow?', a: 'A standard 4-paragraph structure (Introduction, 2 Body paragraphs, Conclusion) works best.' }
          ]
        }
      ]
    },

    reading: {
      title: 'PTE Reading Practice',
      subtitle: 'Latest PTE Academic & UKVI Reading Questions',
      overview:
        "The PTE Reading section tests your ability to comprehend written academic texts, recognize collocations, and evaluate discourse cohesion.",
      tasks: [
        {
          id: 'rw-fill-in-blanks',
          code: 'RWB',
          title: 'Fill in the Blanks (Drop-down)',
          tagline: 'Select the most appropriate academic word from drop-down menus within the passage.',
          table: {
            taskDesc: 'A text appears on the screen with several gaps. Select the correct option from drop-down menus',
            skills: 'Reading and Writing',
            promptLength: 'Text up to 350 words',
            suggestedTime: '2-2.5 minutes per question',
            questionCount: '5 - 6'
          },
          mockQuestions: [
            {
              instruction: 'Below is a text with blanks. Click on each blank and choose the best word from the drop-down list.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '1 of 14',
              tips: 'Check the immediate prepositions before and after the gap to determine the correct collocation.',
              modelScore: '90/90 - Full accuracy in all blanks'
            }
          ],
          howToRespond: {
            bullets: [
              'Click each blank button to reveal choices and select the best fit.',
              'Examine syntax and parts of speech (nouns, verbs, adjectives).'
            ],
            grading: '1 mark for each correctly selected blank.',
            tipsBadge: 'Fill in the Blanks TIPS'
          },
          faqs: [
            { q: 'Does this task affect Writing?', a: 'Yes, this task contributes points to both Reading and Writing modules.' }
          ]
        }
      ]
    },

    listening: {
      title: 'PTE Listening Practice',
      subtitle: 'Latest PTE Academic & UKVI Listening Questions',
      overview:
        "The PTE Listening module is the final section of the PTE Academic / UKVI test. It tests candidates' ability to understand international English accents across lectures, dialogues, and discussions. Questions play automatically once, and a shared section timer requires effective time allocation.",
      tasks: [
        {
          id: 'summarize-spoken-text',
          code: 'SST',
          title: 'Summarize Spoken Text',
          tagline: 'Listen to a short academic lecture and compose a concise written summary of 50 to 70 words within 10 minutes.',
          table: {
            taskDesc: 'Listen to a short audio lecture and write a 50-70 word summary',
            skills: 'Listening and Writing',
            promptLength: '60 - 90 seconds audio',
            suggestedTime: '10 minutes per question',
            questionCount: '1 - 2'
          },
          mockQuestions: [
            {
              instruction: 'You will hear a short lecture. Write a summary of 50-70 words. You have 10 minutes to finish this task.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '1 of 18',
              timerDisplay: '10:00 / 10:00',
              audioTitle: 'Academic Lecture: Marine Biology & Coral Bleaching',
              tips: 'Write down key topic nouns and verbs while the audio plays. Ensure word count remains strictly between 50 and 70 words.',
              modelScore: '90/90 - 64 words: Complete capture of primary arguments, correct syntax, zero spelling errors.'
            }
          ],
          howToRespond: {
            bullets: [
              'Listen attentively and capture main ideas and keywords on your erasable notepad.',
              'Your written summary must be between 50 and 70 words.',
              'Unlike Summarize Written Text, you may use multiple sentences for your summary.'
            ],
            note: 'Writing fewer than 40 or more than 100 words scores 0 for Form.',
            grading: 'Content, Form (50-70 words), Grammar, Vocabulary, and Spelling.',
            tipsBadge: 'Summarize Spoken Text TIPS'
          },
          faqs: [
            { q: 'Can I write more than one sentence in SST?', a: 'Yes! You can use 2 to 4 sentences as long as your total word count is between 50 and 70 words.' },
            { q: 'How is the timer managed?', a: 'Each SST question has its own dedicated 10-minute timer that does not affect other listening questions.' }
          ]
        },
        {
          id: 'listening-mcq-multiple',
          code: 'MCMA',
          title: 'Multiple Choice, Multiple Answers',
          tagline: 'Listen to a recording and answer a multiple-choice question by selecting all applicable correct options.',
          table: {
            taskDesc: 'After listening to a recording, answer a multiple-choice question by selecting more than one response',
            skills: 'Listening',
            promptLength: '40 - 90 seconds',
            suggestedTime: 'Complete selection as soon as audio ends',
            questionCount: '1 - 2'
          },
          mockQuestions: [
            {
              instruction: 'Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '4 of 18',
              timerDisplay: '19:00 / 43:12',
              question: 'Which of the following points did the lecturer make regarding renewable energy deployment?',
              options: [
                'Solar photovoltaic cells have achieved notable efficiency gains over the past decade.',
                'Wind turbine maintenance costs have exceeded traditional hydroelectric budgets.',
                'Subsidies and policy incentives accelerated commercial market adoption.',
                'Geothermal resources are uniformly distributed across all geographic regions.'
              ],
              tips: 'Negative marking applies (+1 for correct, -1 for incorrect). Only select options you are confident about.',
              modelScore: '90/90 - Selected verified options 1 and 3'
            }
          ],
          howToRespond: {
            bullets: [
              'Read the question and scan the options during the 7-second audio countdown.',
              'Take concise notes on specific findings while the audio plays.',
              'Negative marking applies: if uncertain about a choice, do not select it.'
            ],
            grading: 'Partial credit with negative marking (+1 for correct, -1 for incorrect, minimum score 0).',
            tipsBadge: 'MCQ Multiple Answers TIPS'
          },
          faqs: [
            { q: 'What happens if I pick a wrong option?', a: 'Incorrect selections deduct 1 mark, but the total score for the question cannot drop below 0.' }
          ]
        },
        {
          id: 'listening-fill-in-blanks',
          code: 'FIB',
          title: 'Listening Fill in the Blanks',
          tagline: 'Listen to an audio recording and type the missing words directly into the text transcript gaps.',
          table: {
            taskDesc: 'A transcript of a recording appears on the screen with several gaps. After listening, type the missing word in each gap',
            skills: 'Listening and Writing',
            promptLength: '30 - 60 seconds',
            suggestedTime: 'Complete the answers with the audio',
            questionCount: '2 - 3'
          },
          mockQuestions: [
            {
              instruction: 'You will hear a recording. Type the missing words in each blank.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '3 of 18',
              timerDisplay: '20:21 / 43:12',
              parts: [
                "Researchers studying animal behavior observed that bats utilize echolocation to identify ",
                " in mid-air. To study these dynamics, scientists positioned high-speed infrared ",
                " inside a colony roost. The captured footage revealed that the mammals depend on precise acoustic ",
                " to intercept their prey in total darkness."
              ],
              correctAnswers: ['insects', 'cameras', 'frequencies'],
              tips: 'Type words immediately as spoken. Double check for plural -s and past tense -ed endings.',
              modelScore: '90/90 - 100% spelling accuracy in all blanks'
            }
          ],
          howToRespond: {
            bullets: [
              'Keep your cursor ready in the first gap before the audio begins.',
              'Type the exact word you hear without altering verb tenses or noun forms.',
              'Press the "Tab" key to move quickly to the next blank.'
            ],
            grading: '1 point for each correctly spelled word.',
            tipsBadge: 'Listening Blanks TIPS'
          },
          faqs: [
            { q: 'Does spelling count?', a: 'Yes, incorrect spelling receives 0 points for that specific blank.' }
          ]
        },
        {
          id: 'highlight-correct-summary',
          code: 'HCS',
          title: 'Highlight Correct Summary',
          tagline: 'Listen to a spoken academic presentation and choose the summary paragraph that best encapsulates the key ideas.',
          table: {
            taskDesc: 'After listening to a recording, select the paragraph that best summarizes the audio',
            skills: 'Listening and Reading',
            promptLength: '30 - 90 seconds',
            suggestedTime: 'Select the answer before the audio ends',
            questionCount: '1 - 2'
          },
          mockQuestions: [
            {
              instruction: 'You will hear a recording. Click on the paragraph that best relates to the recording.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '10 of 18',
              timerDisplay: '22:12 / 43:12',
              options: [
                'Atmospheric tropical storms derive energy from warm ocean surfaces and generally dissipate over land masses.',
                'Cyclones and typhoons represent distinct meteorological phenomena with conflicting thermodynamic properties.',
                'The categorization of hurricanes depends entirely on precipitation volume rather than sustained barometric pressure.',
                'Recent satellite sensors demonstrate that tropical storm tracks cannot be anticipated by meteorologists.'
              ],
              correctIdx: 0,
              tips: 'Eliminate options that include minor details or contradictory assertions not supported by the lecture.',
              modelScore: '90/90 - Correct option chosen (Option 1)'
            }
          ],
          howToRespond: {
            bullets: [
              'Take notes on the central argument rather than secondary examples.',
              'Scan options to locate the paragraph that captures the overall conclusion.'
            ],
            grading: '1 mark for the correct summary, 0 for incorrect.',
            tipsBadge: 'Highlight Correct Summary TIPS'
          },
          faqs: [
            { q: 'Is there negative marking in HCS?', a: 'No, HCS has no negative marking.' }
          ]
        },
        {
          id: 'listening-mcq-single',
          code: 'MCSA',
          title: 'Multiple Choice, Single Answer',
          tagline: 'Listen to a spoken excerpt and select the single best response to the multiple-choice question.',
          table: {
            taskDesc: 'After listening to a recording, answer a multiple-choice question by selecting one response',
            skills: 'Listening',
            promptLength: '30 - 60 seconds',
            suggestedTime: 'Try to answer as soon as possible till the audio ends',
            questionCount: '1 - 2'
          },
          mockQuestions: [
            {
              instruction: 'Listen to the recording and answer the multiple-choice question by selecting the correct response. Only one response is correct.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '6 of 18',
              timerDisplay: '20:58 / 43:12',
              question: 'According to the speaker, what was the primary diplomatic achievement of the early peace accord?',
              options: [
                'It established shared trade boundaries and reduced bilateral tariffs.',
                'It mandated immediate disarmament across all coastal provinces.',
                'It established a permanent international tribunal in Geneva.',
                'It dissolved the existing colonial administrative council.'
              ],
              correctIdx: 0,
              tips: 'Listen specifically for the focal question keywords in the speaker\'s concluding remarks.',
              modelScore: '90/90 - Correct response selected'
            }
          ],
          howToRespond: {
            bullets: [
              'Read the question prompt before the audio starts playing.',
              'Listen attentively for synonymous phrases that match the correct option.'
            ],
            grading: '1 mark for correct response, 0 for incorrect.',
            tipsBadge: 'MCQ Single Answer TIPS'
          },
          faqs: [
            { q: 'How long do I have to answer?', a: 'Aim to click your chosen radio option within 10-15 seconds of the audio ending.' }
          ]
        },
        {
          id: 'select-missing-words',
          code: 'SMW',
          title: 'Select Missing Words',
          tagline: 'Listen to a recording where the final phrase is replaced by a beep tone, then select the option that logically completes it.',
          table: {
            taskDesc: 'After listening to a recording, select the missing word that completes the recording from options',
            skills: 'Listening',
            promptLength: '20 - 70 seconds',
            suggestedTime: 'Try to answer as soon as the audio ends',
            questionCount: '1 - 2'
          },
          mockQuestions: [
            {
              instruction: 'You will hear a recording. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '7 of 18',
              timerDisplay: '20:07 / 43:12',
              options: [
                'natural habitats.',
                'circus arenas.',
                'urban dwellings.',
                'enclosed research cages.'
              ],
              correctIdx: 0,
              tips: 'Follow the logical trajectory and sentiment of the speaker to predict the final phrase before the beep sounds.',
              modelScore: '90/90 - Correct option chosen (Option 1)'
            }
          ],
          howToRespond: {
            bullets: [
              'Follow the speaker\'s argument from start to finish.',
              'Anticipate whether the missing conclusion should be positive, negative, or neutral.'
            ],
            grading: '1 mark for correct completion, 0 for incorrect.',
            tipsBadge: 'Select Missing Words TIPS'
          },
          faqs: [
            { q: 'Does the beep always occur at the very end?', a: 'Yes, the beep tone always replaces the final 1 to 4 words of the audio track.' }
          ]
        },
        {
          id: 'highlight-incorrect-words',
          code: 'HIW',
          title: 'Highlight Incorrect Words',
          tagline: 'Follow along with the written transcript as the recording plays and click any words that differ from what the speaker says.',
          table: {
            taskDesc: 'The transcript appears on screen. While listening, click words in the transcript that differ from what is said',
            skills: 'Listening and Reading',
            promptLength: '15 - 50 seconds',
            suggestedTime: 'Complete selection by the time the audio ends',
            questionCount: '2 - 3'
          },
          mockQuestions: [
            {
              instruction: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker(s) said. Please click on the words that are different.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '12 of 18',
              timerDisplay: '22:53 / 43:12',
              words: [
                "During", "the", "nineteenth", "century,", "pioneering", "reforms", "in", "public", "education",
                "began", "to", "expand", "across", "several", "industrialized", "nations.", "Advocates", "argued",
                "that", "universal", "literacy", "was", "fundamental", "for", "civic", "engagement", "and", "economic",
                "stability.", "Special", "committees", "were", "formed", "to", "establish", "standardized", "curricula",
                "and", "certify", "instructors,", "ensuring", "that", "younger", "generations", "received", "rigorous",
                "instruction", "in", "mathematics,", "history,", "and", "scientific", "reasoning."
              ],
              incorrectIndices: [4, 16, 29, 42], // words that differ from audio
              tips: 'Move your cursor word-by-word with the audio stream. Negative marking applies (-1 per incorrect click), so do not guess.',
              modelScore: '90/90 - Identified all 4 transcription discrepancies accurately'
            }
          ],
          howToRespond: {
            bullets: [
              'Follow the transcript smoothly with your cursor as the audio plays.',
              'Click once on any word that does not match what you hear. It will turn bright yellow.',
              'To deselect a highlighted word, simply click it again.',
              'Negative marking applies: only click words you distinctly hear differing.'
            ],
            grading: 'Partial credit with negative marking (+1 for correct word, -1 for incorrect word, minimum score 0).',
            tipsBadge: 'Highlight Incorrect Words TIPS'
          },
          faqs: [
            { q: 'Is there negative marking in HIW?', a: 'Yes! Selecting a word that actually matched the audio subtracts 1 mark.' }
          ]
        },
        {
          id: 'write-from-dictation',
          code: 'WFD',
          title: 'Write From Dictation',
          tagline: 'Listen to a short sentence spoken once and type it exactly into the response box with correct spelling and punctuation.',
          table: {
            taskDesc: 'After listening to a recording of a sentence, type the sentence accurately in the box provided',
            skills: 'Listening and Writing',
            promptLength: '3 - 5 seconds',
            suggestedTime: 'Maximum 1 min per question',
            questionCount: '3 - 4'
          },
          mockQuestions: [
            {
              instruction: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '15 of 18',
              timerDisplay: '23:24 / 43:12',
              audioPrompt: 'The university library will remain open twenty-four hours during final examination week.',
              tips: 'Capitalize the first letter, check singular/plural forms, and end with a full stop.',
              modelScore: '90/90 - 100% word sequence and spelling fidelity'
            }
          ],
          howToRespond: {
            bullets: [
              'Listen attentively with total concentration—the sentence plays only once.',
              'Type immediately while your auditory memory is fresh.',
              'Check capitalization of initial letter and end with a full stop.',
              'Double check for singular vs. plural endings (-s, -ed).'
            ],
            note: 'You can write on the erasable notepad while the recording is playing.',
            grading: '1 point per correct word spelled accurately.',
            tipsBadge: 'Write From Dictation TIPS'
          },
          faqs: [
            { q: 'Why is Write From Dictation so important?', a: 'WFD contributes substantial marks to both Listening and Writing sections.' }
          ]
        }
      ]
    }
  };

  const currentModule = modulesData[activeModule] || modulesData.speaking;
  const currentTask = currentModule.tasks.find(t => t.id === activeTaskId) || currentModule.tasks[0];
  const currentMock = currentTask.mockQuestions?.[simQuestionIdx] || currentTask.mockQuestions?.[0];

  const isWriting = activeModule === 'writing';
  const isReading = activeModule === 'reading';
  const isListening = activeModule === 'listening';

  // Theme colors per module
  let themeColorBg = 'bg-[#f1784b]';
  let themeColorText = 'text-[#f1784b]';
  let tableHeaderBg = 'bg-[#f1784b]';
  let tableBorderColor = 'border-[#ea6b3c]/50';

  if (isWriting) {
    themeColorBg = 'bg-[#58b4f8]';
    themeColorText = 'text-[#58b4f8]';
    tableHeaderBg = 'bg-[#58b4f8]';
    tableBorderColor = 'border-sky-400/50';
  } else if (isReading) {
    themeColorBg = 'bg-[#22c55e]';
    themeColorText = 'text-[#22c55e]';
    tableHeaderBg = 'bg-[#22c55e]';
    tableBorderColor = 'border-emerald-400/50';
  } else if (isListening) {
    themeColorBg = 'bg-[#0e4877]';
    themeColorText = 'text-[#0e4877]';
    tableHeaderBg = 'bg-[#0e4877]';
    tableBorderColor = 'border-[#073f6b]/50';
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Sticky Right "Practice Now" Action Pill */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <Link
          to="/mock-tests"
          className="bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs tracking-wider uppercase px-2.5 py-4 rounded-l-xl shadow-lg transition flex items-center gap-1.5 [writing-mode:vertical-rl] rotate-180"
        >
          Practice Now
        </Link>
      </div>

      {/* Top Header & Breadcrumb */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            PTE <span className="text-[#00c2cb]">
              {isWriting ? 'Writing' : isReading ? 'Reading' : isListening ? 'Listening' : 'Speaking'}
            </span> Practice
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold text-slate-500">
            {currentModule.subtitle}
          </p>

          {/* Module Switcher Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {[
              { id: 'speaking', label: 'Speaking' },
              { id: 'writing', label: 'Writing' },
              { id: 'reading', label: 'Reading' },
              { id: 'listening', label: 'Listening' }
            ].map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModule(mod.id);
                  const firstTaskId = modulesData[mod.id].tasks[0].id;
                  setActiveTaskId(firstTaskId);
                }}
                className={`px-6 sm:px-8 py-2 rounded-full font-bold text-xs sm:text-sm tracking-wide transition cursor-pointer shadow-xs ${
                  activeModule === mod.id
                    ? 'bg-[#00c2cb] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-400 hover:text-cyan-600'
                }`}
              >
                {mod.label}
              </button>
            ))}
          </div>

          {/* Module Explanatory Paragraph */}
          <div className="mt-6 max-w-4xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed text-center px-2">
            <p>{currentModule.overview}</p>
          </div>

          {/* Sub-Task Horizontal Pills Switcher */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto">
            {currentModule.tasks.map((task) => {
              const isTaskActive = activeTaskId === task.id;
              let pillClasses = '';
              if (isTaskActive) {
                if (isWriting) {
                  pillClasses = 'bg-[#58b4f8] text-white shadow-xs font-bold';
                } else if (isReading) {
                  pillClasses = 'bg-[#22c55e] text-white shadow-xs font-bold';
                } else if (isListening) {
                  pillClasses = 'bg-[#0e4877] text-white shadow-xs font-bold';
                } else {
                  pillClasses = 'bg-white border-2 border-[#e77342] text-[#e77342] shadow-xs font-bold';
                }
              } else {
                pillClasses = 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400 font-medium';
              }

              return (
                <button
                  key={task.id}
                  onClick={() => setActiveTaskId(task.id)}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs transition cursor-pointer ${pillClasses}`}
                >
                  {task.title}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Active Task Detail & Specification Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Task Title Header with circular badge */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${themeColorBg} text-white font-black text-sm flex items-center justify-center shadow-xs`}>
            {currentTask.code}
          </div>
          <div>
            <h2 className={`text-xl sm:text-2xl font-bold ${themeColorText}`}>
              {currentTask.title}
            </h2>
          </div>
        </div>

        {/* Task Tagline Description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-5xl">
          {currentTask.tagline}
        </p>

        {/* Task Specification Table */}
        <div className="mt-6 overflow-x-auto rounded-2xl shadow-sm border border-slate-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`${tableHeaderBg} text-white font-bold text-center`}>
                <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Task</th>
                <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Skills assessed</th>
                <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Prompt length</th>
                {isReading || isListening ? (
                  <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Suggested time</th>
                ) : !isWriting && currentTask.table.prepTime ? (
                  <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Preparation time</th>
                ) : null}
                {isWriting && (
                  <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Time to answer</th>
                )}
                <th className="py-3 px-4 text-xs font-semibold">Number of questions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-center font-medium">
              <tr className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-4 text-xs text-slate-800 font-semibold border-r border-slate-100 max-w-[220px]">
                  {currentTask.table.taskDesc}
                </td>
                <td className="py-4 px-4 text-xs border-r border-slate-100 whitespace-nowrap">
                  {currentTask.table.skills}
                </td>
                <td className="py-4 px-4 text-xs border-r border-slate-100 whitespace-nowrap">
                  {currentTask.table.promptLength}
                </td>
                {isReading || isListening ? (
                  <td className="py-4 px-4 text-xs border-r border-slate-100 max-w-[150px]">
                    {currentTask.table.suggestedTime}
                  </td>
                ) : !isWriting && currentTask.table.prepTime ? (
                  <td className="py-4 px-4 text-xs border-r border-slate-100 max-w-[150px]">
                    {currentTask.table.prepTime}
                  </td>
                ) : null}
                {isWriting && (
                  <td className="py-4 px-4 text-xs border-r border-slate-100 max-w-[150px]">
                    {currentTask.table.answerTime}
                  </td>
                )}
                <td className="py-4 px-4 text-xs font-bold text-slate-900 whitespace-nowrap">
                  {currentTask.table.questionCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

      {/* Interactive Mock Test Simulator (Pearson Style) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden">
          
          {/* Top Simulator Header Bar */}
          <div className="border-t-4 border-[#0284c7] bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between text-xs font-semibold text-slate-700">
            <div className="text-slate-800 font-bold">
              {isWriting ? (
                `Remaining Time - ${formatTime(writingTimeLeft)}`
              ) : isReading || isListening ? (
                <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#0284c7] h-full w-2/5" />
                </div>
              ) : (
                'Mock Test - 1'
              )}
            </div>
            <div className="text-slate-800 font-bold">
              Mock Test - 1
            </div>
            <div className="flex items-center gap-3">
              {isWriting ? (
                <span className="text-slate-600 font-bold">
                  {currentTask.id === 'write-essay' ? '29 of 29' : '28 of 29'}
                </span>
              ) : isReading ? (
                <div className="flex items-center gap-3 font-semibold text-slate-700">
                  <span>{currentMock.questionProgress}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {formatTime(readingSeconds)} / 29:00
                  </span>
                </div>
              ) : isListening ? (
                <div className="flex items-center gap-3 font-semibold text-slate-700">
                  <span>{currentMock.questionProgress}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {formatTime(listeningSeconds)} / 43:12
                  </span>
                </div>
              ) : (
                <span className="flex items-center gap-1 font-mono text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  00:{simCountdown < 10 ? `0${simCountdown}` : simCountdown} / 45:36
                </span>
              )}
              <button 
                onClick={() => setSampleModalOpen(!sampleModalOpen)} 
                title="Toggle Expanded View" 
                className="text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Simulator Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Bold Pearson Instruction line */}
            <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed">
              {currentMock.instruction}
            </p>

            {/* CONDITIONAL RENDER PER MODULE */}
            {isListening ? (
              <div className="space-y-6">
                
                {/* Standard Pearson Audio Player Widget */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 max-w-md mx-auto sm:mx-0 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">Audio Player</span>
                    <span className={listeningAudioStatus === 'playing' ? 'text-emerald-600 animate-pulse' : 'text-slate-500'}>
                      {listeningAudioStatus === 'playing' ? 'Playing audio...' : 'Completed'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setListeningAudioStatus(listeningAudioStatus === 'playing' ? 'completed' : 'playing')}
                      className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition cursor-pointer"
                    >
                      {listeningAudioStatus === 'playing' ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </button>
                    <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-slate-500 h-full w-full" />
                    </div>
                  </div>
                </div>

                {/* Task 1: Highlight Incorrect Words (HIW) */}
                {currentTask.id === 'highlight-incorrect-words' && (
                  <div className="border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-800 leading-loose font-sans shadow-2xs select-none">
                    <p>
                      {currentMock.words?.map((word, idx) => {
                        const isSelected = highlightedWords.includes(idx);
                        return (
                          <span
                            key={idx}
                            onClick={() => toggleWordHighlight(idx)}
                            className={`inline-block mx-0.5 px-1 py-0.5 rounded cursor-pointer transition ${
                              isSelected 
                                ? 'bg-yellow-300 text-slate-900 font-bold shadow-2xs' 
                                : 'hover:bg-slate-100 text-slate-800'
                            }`}
                          >
                            {word}{' '}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                )}

                {/* Task 2: Write From Dictation (WFD) */}
                {currentTask.id === 'write-from-dictation' && (
                  <div className="space-y-3">
                    <textarea
                      value={dictationText}
                      onChange={(e) => setDictationText(e.target.value)}
                      placeholder="Write here"
                      rows={5}
                      className="w-full p-4 bg-white text-slate-800 text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-cyan-500 border border-slate-300 rounded-lg shadow-2xs resize-y"
                    />
                  </div>
                )}

                {/* Task 3: Listening Fill in the Blanks (FIB) */}
                {currentTask.id === 'listening-fill-in-blanks' && (
                  <div className="border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-800 leading-loose font-sans shadow-2xs">
                    <p>
                      {currentMock.parts?.[0]}
                      <input
                        type="text"
                        value={listeningBlanks[0] || ''}
                        onChange={(e) => setListeningBlanks({ ...listeningBlanks, 0: e.target.value })}
                        className="inline-block w-28 mx-1 px-2 py-0.5 text-xs border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 font-medium"
                      />
                      {currentMock.parts?.[1]}
                      <input
                        type="text"
                        value={listeningBlanks[1] || ''}
                        onChange={(e) => setListeningBlanks({ ...listeningBlanks, 1: e.target.value })}
                        className="inline-block w-28 mx-1 px-2 py-0.5 text-xs border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 font-medium"
                      />
                      {currentMock.parts?.[2]}
                      <input
                        type="text"
                        value={listeningBlanks[2] || ''}
                        onChange={(e) => setListeningBlanks({ ...listeningBlanks, 2: e.target.value })}
                        className="inline-block w-28 mx-1 px-2 py-0.5 text-xs border border-slate-300 rounded bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-900 font-medium"
                      />
                      {currentMock.parts?.[3]}
                    </p>
                  </div>
                )}

                {/* Task 4: Highlight Correct Summary (HCS) / Single Answer (MCS) / Select Missing Words (SMW) */}
                {(currentTask.id === 'highlight-correct-summary' || 
                  currentTask.id === 'listening-mcq-single' || 
                  currentTask.id === 'select-missing-words') && (
                  <div className="space-y-4">
                    {currentMock.question && (
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {currentMock.question}
                      </h4>
                    )}
                    <div className="space-y-2.5">
                      {currentMock.options?.map((option, idx) => {
                        const isSelected = listeningRadio === idx;
                        return (
                          <label
                            key={idx}
                            onClick={() => setListeningRadio(idx)}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border text-xs sm:text-sm transition cursor-pointer ${
                              isSelected 
                                ? 'border-cyan-500 bg-cyan-50/50 text-slate-900 shadow-2xs' 
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="listening-radio"
                              checked={isSelected}
                              onChange={() => {}}
                              className="mt-0.5 text-cyan-600 focus:ring-cyan-500"
                            />
                            <span className="leading-relaxed">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Task 5: Multiple Choice, Multiple Answers (MCMA) */}
                {currentTask.id === 'listening-mcq-multiple' && (
                  <div className="space-y-4">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {currentMock.question}
                    </h4>
                    <div className="space-y-2.5">
                      {currentMock.options?.map((option, idx) => {
                        const isChecked = listeningCheckboxes.includes(idx);
                        return (
                          <label
                            key={idx}
                            onClick={() => {
                              if (isChecked) {
                                setListeningCheckboxes(listeningCheckboxes.filter(i => i !== idx));
                              } else {
                                setListeningCheckboxes([...listeningCheckboxes, idx]);
                              }
                            }}
                            className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm transition cursor-pointer ${
                              isChecked 
                                ? 'border-cyan-500 bg-cyan-50/50 text-slate-900 shadow-2xs' 
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500"
                            />
                            <span className="leading-snug">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Task 6: Summarize Spoken Text (SST) */}
                {currentTask.id === 'summarize-spoken-text' && (
                  <div className="space-y-4">
                    <div className="border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                      <div className="bg-[#00c2cb] px-4 py-2 flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-1.5">
                          <button type="button" onClick={handleCut} className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition cursor-pointer">Cut</button>
                          <button type="button" onClick={handleCopy} className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition cursor-pointer">Copy</button>
                          <button type="button" onClick={handlePaste} className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition cursor-pointer">Paste</button>
                        </div>
                        <div className="font-semibold text-white/95 text-xs">
                          {sstWordCount} word{sstWordCount === 1 ? '' : 's'} (Target: 50-70)
                        </div>
                      </div>
                      <textarea
                        value={sstText}
                        onChange={handleSstChange}
                        placeholder="Type summary here..."
                        rows={7}
                        className="w-full p-4 bg-white text-slate-800 text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-cyan-500 border-t border-slate-200 resize-y"
                      />
                    </div>
                  </div>
                )}

              </div>
            ) : isReading ? (
              /* Reading Simulator Fallback */
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed font-sans shadow-2xs">
                  <p>{currentMock.prompt || currentMock.passage || currentMock.instruction}</p>
                </div>
              </div>
            ) : isWriting ? (
              /* Writing Simulator Fallback */
              <div className="space-y-4">
                <div className="border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                  <div className="bg-[#00c2cb] px-4 py-2 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1.5">
                      <button type="button" onClick={handleCut} className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs cursor-pointer">Cut</button>
                      <button type="button" onClick={handleCopy} className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs cursor-pointer">Copy</button>
                      <button type="button" onClick={handlePaste} className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs cursor-pointer">Paste</button>
                    </div>
                    <div className="font-semibold text-white/95 text-xs">{writingWordCount} word</div>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={writingText}
                    onChange={handleWritingTextChange}
                    placeholder="Write here"
                    rows={8}
                    className="w-full p-4 bg-white text-slate-800 text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-cyan-500 border-t border-slate-200 resize-y"
                  />
                </div>
              </div>
            ) : (
              /* Speaking Audio Simulator */
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 max-w-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Audio Recorder</span>
                    <span className="font-bold text-[#f1784b]">Recording Ready</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Controls inside test card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setHighlightedWords([]);
                  setDictationText('');
                  setListeningBlanks({});
                  setListeningRadio(null);
                  setListeningCheckboxes([]);
                  setSstText('');
                  setSstWordCount(0);
                }}
                className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                Save & Exit
              </button>

              <button
                onClick={() => {
                  if (currentTask.mockQuestions?.length > 1) {
                    setSimQuestionIdx((simQuestionIdx + 1) % currentTask.mockQuestions.length);
                  }
                  setHighlightedWords([]);
                  setDictationText('');
                  setListeningBlanks({});
                  setListeningRadio(null);
                  setListeningCheckboxes([]);
                }}
                className="px-6 py-2 rounded-md bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <span>&gt;</span>
              </button>
            </div>

          </div>
        </div>

        {/* Action pills below simulator */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSampleModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            PTE {isListening ? 'Listening' : isWriting ? 'Writing' : isReading ? 'Reading' : currentModule.title.split(' ')[1]} {currentTask.title}
          </button>
          <button
            onClick={() => setSampleModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            {currentTask.title} Sample Questions
          </button>
        </div>

      </section>

      {/* How to Respond to This Task Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Instructions Column */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to <span className="text-[#00c2cb]">Respond to</span> This Task?
            </h3>

            {/* Bullets with cyan 4-pointed stars */}
            <div className="space-y-3 pt-2">
              {currentTask.howToRespond?.bullets?.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <span className="text-[#00c2cb] font-bold text-sm shrink-0 mt-0.5">✦</span>
                  <p>{bullet}</p>
                </div>
              ))}
            </div>

            {/* Note & Grading highlight */}
            <div className="pt-2 text-xs sm:text-sm text-slate-700 space-y-2">
              {currentTask.howToRespond?.note && (
                <p>
                  <strong className="text-slate-900">Note:</strong> {currentTask.howToRespond?.note}
                </p>
              )}
              {currentTask.howToRespond?.grading && (
                <p>
                  <strong className="text-slate-900 font-bold">Task is graded based on:</strong> {currentTask.howToRespond?.grading}
                </p>
              )}
            </div>

            {/* CTA action buttons */}
            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                to="/mock-tests"
                className="px-5 py-2.5 rounded-lg bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                Detailed Question-wise Page
              </Link>
              <button
                onClick={() => setSampleModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-[#075985] hover:bg-[#034466] text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                Sample Questions
              </button>
            </div>
          </div>

          {/* Right Visual Graphic with Tips Lightbulb Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group">
              
              {/* Floating "TIPS" Speech Card with Lightbulb */}
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-3">
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-700 tracking-tight max-w-[160px] line-clamp-1">
                    {currentTask.howToRespond?.tipsBadge || currentTask.title}
                  </div>
                  <div className="text-base font-black text-slate-900 tracking-tight">
                    TIPS
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs">
                    <Lightbulb className="w-5 h-5 fill-amber-300 stroke-[2.5] text-amber-900" />
                  </div>
                </div>
              </div>

              {/* Professional Coach Photo */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="NinetyPTE Academic Instructor"
                className="w-full h-80 sm:h-96 object-cover object-top filter brightness-[1.02]"
              />

              {/* Bottom Subtle Overlay */}
              <div className="p-4 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent absolute inset-x-0 bottom-0 text-white">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>NinetyPTE Verified Practice Strategy</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-left">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            FAQs
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Here are answers to some of the frequently asked questions.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {currentTask.faqs?.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition"
            >
              <button
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
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Banner 1: Free Mock Test Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-gradient-to-r from-rose-50 via-white to-amber-50 p-8 sm:p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h4 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Prepare for PTE & give a free mock test today.
            </h4>
            <div>
              <Link
                to="/signup"
                className="inline-block px-8 py-3 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm transition shadow-md cursor-pointer"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner 2: Score Calculator Guide Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-slate-800 max-w-2xl mx-auto leading-relaxed">
            Want to understand how PTE score calculation works? Check our PTE score calculator guide & understand the academic integrated scoring system.
          </h4>
          <div>
            <Link
              to="/pte-score-calculator"
              className="inline-block px-7 py-2.5 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Banner 3: Strategy Video Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-[#f0f9fa] rounded-2xl p-6 sm:p-8 border border-cyan-100 text-center space-y-2">
          <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {isListening ? (
              'Looking for personalized guidance in PTE listening?'
            ) : isReading ? (
              'Got any queries about PTE reading?'
            ) : isWriting ? (
              'Struggling with PTE Writing?'
            ) : (
              `Ready to boost your ${activeModule} score?`
            )}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500">
            Watch our strategy videos to improve your {isWriting ? 'Writing' : isReading ? 'Reading' : isListening ? 'Listening' : activeModule} proficiency
          </p>
          <div className="pt-2">
            <Link
              to="/events"
              className="inline-block px-7 py-2.5 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              View Now
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Question Modal Preview */}
      {sampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${themeColorBg} text-white font-bold text-xs flex items-center justify-center`}>
                  {currentTask.code}
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {currentTask.title} Sample Solution & 90-Score Tips
                </h4>
              </div>
              <button
                onClick={() => setSampleModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans leading-relaxed">
                <p className="font-sans text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Practice Prompt / Question:
                </p>
                {currentMock.audioPrompt ? (
                  <p className="font-semibold italic">{currentMock.audioPrompt}</p>
                ) : (
                  <p>{currentMock.instruction || currentMock.prompt}</p>
                )}
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>NinetyPTE 90/90 Model Response</span>
                </div>
                <p className="font-sans text-xs italic">{currentMock.modelScore}</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-700">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Strategic Advice</span>
                </div>
                <p className="text-xs leading-relaxed">{currentMock.tips}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSampleModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
