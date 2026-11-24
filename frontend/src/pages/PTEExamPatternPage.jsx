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
  Lightbulb, 
  Award,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  GripVertical,
  ArrowRight,
  ArrowLeft
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

  // Audio Simulator state (Speaking / Listening)
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
  
  // Re-Order Paragraphs state
  const [reorderSource, setReorderSource] = useState([]);
  const [reorderTarget, setReorderTarget] = useState([]);
  const [reorderSelected, setReorderSelected] = useState(null);

  // Drag & Drop Blanks state
  const [dragSlots, setDragSlots] = useState({});

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

    if (activeTaskId === 'write-essay') {
      setWritingTimeLeft(1196); // 19:56 matching Pearson mock screenshot
    } else if (activeTaskId === 'summarize-written-text') {
      setWritingTimeLeft(484);  // 08:04 matching Pearson mock screenshot
    } else if (activeTaskId === 'rw-fill-in-blanks') {
      setReadingSeconds(63); // 01:03
    } else if (activeTaskId === 'mcq-multiple') {
      setReadingSeconds(89); // 01:29
    } else if (activeTaskId === 'reorder-paragraphs') {
      setReadingSeconds(117); // 01:57
      setReorderSource([
        { id: '1', text: "Nehru's idea of secularism was equally indifferent to all religions and bothering about none of them." },
        { id: '2', text: "Instead of doing any good, such secularism can do harm." },
        { id: '3', text: "There is a difference between Gandhiji's concept of secularism and that of Nehru's." },
        { id: '4', text: "Such secularism which means the rejection of all religions is contrary to our culture and tradition." },
        { id: '5', text: "In Gandhiji's view, secularism stands for equal respect for all religions." }
      ]);
      setReorderTarget([]);
      setReorderSelected(null);
    } else if (activeTaskId === 'reading-fill-in-blanks') {
      setReadingSeconds(137); // 02:17
    } else if (activeTaskId === 'mcq-single') {
      setReadingSeconds(283); // 04:43
    }
  }, [activeTaskId, activeModule]);

  // Writing countdown timer effect
  useEffect(() => {
    if (activeModule !== 'writing') return;
    const timer = setInterval(() => {
      setWritingTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeModule, activeTaskId]);

  // Reading forward timer effect
  useEffect(() => {
    if (activeModule !== 'reading') return;
    const timer = setInterval(() => {
      setReadingSeconds(prev => (prev < 1740 ? prev + 1 : 1740)); // up to 29:00
    }, 1000);
    return () => clearInterval(timer);
  }, [activeModule, activeTaskId]);

  // Speaking countdown timer effect
  useEffect(() => {
    if (activeModule === 'writing' || activeModule === 'reading') return;
    let timer;
    if (simCountdown > 0 && !isRecording && !isCompleted) {
      timer = setInterval(() => {
        setSimCountdown(prev => {
          if (prev <= 1) {
            setIsRecording(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isRecording && !isCompleted) {
      timer = setTimeout(() => {
        setIsRecording(false);
        setIsCompleted(true);
      }, 8000);
    }
    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [simCountdown, isRecording, isCompleted, activeModule]);

  // Helper to format seconds as MM:SS
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

  // Cut handler for writing editor
  const handleCut = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start !== end) {
      const selected = writingText.substring(start, end);
      try {
        navigator.clipboard?.writeText(selected);
      } catch {}
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

  // Copy handler for writing editor
  const handleCopy = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start !== end) {
      const selected = writingText.substring(start, end);
      try {
        navigator.clipboard?.writeText(selected);
      } catch {}
    }
  };

  // Paste handler for writing editor
  const handlePaste = async () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let textToInsert = '';
    try {
      textToInsert = await navigator.clipboard.readText();
    } catch {
      textToInsert = '';
    }
    const newText = writingText.substring(0, start) + textToInsert + writingText.substring(end);
    setWritingText(newText);
    const words = newText.trim() ? newText.trim().split(/\s+/).filter(Boolean).length : 0;
    setWritingWordCount(words);
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + textToInsert.length;
      textarea.focus();
    }, 0);
  };

  // Re-order paragraphs move item to Target
  const handleMoveToTarget = (item) => {
    setReorderSource(prev => prev.filter(i => i.id !== item.id));
    setReorderTarget(prev => [...prev, item]);
    setReorderSelected(null);
  };

  // Re-order paragraphs move item back to Source
  const handleMoveToSource = (item) => {
    setReorderTarget(prev => prev.filter(i => i.id !== item.id));
    setReorderSource(prev => [...prev, item]);
    setReorderSelected(null);
  };

  // Drag & drop blanks: toggle placing word
  const handleBankWordClick = (word) => {
    // Find first empty slot among 4 slots (0, 1, 2, 3)
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
        "The PTE Speaking module of PTE Academic / UKVI is the first module in the PTE exam format, which contains seven different types of questions. It assesses the test takers' ability to speak English clearly and fluently in academic contexts. The test takers have to record their responses using a microphone and a headset. The responses are scored by an automated system based on various criteria such as pronunciation, fluency, content, and vocabulary & basic communicative abilities like oral fluency and pronunciation. PTE Speaking practice is an important aspect of PTE preparation & PTE Speaking mock test can be taken on NinetyPTE to gauge one's performance.",
      tasks: [
        {
          id: 'read-aloud',
          code: 'RA',
          title: 'Read Aloud',
          tagline:
            'Read Aloud tests your speaking abilities to ensure that you can read the material aloud with the proper intonation and pronunciation. It requires good practice to keep your speaking scores up.',
          table: {
            taskDesc: 'A text appears on the screen. Read the text aloud',
            skills: 'Speaking & Reading',
            promptLength: 'Text up to 60 words',
            prepTime: '35-40 seconds (depending on the length of the text)',
            answerTime: '35-40 seconds (depending on the length of the text)',
            questionCount: '6 - 7',
            prepSeconds: 35
          },
          mockQuestions: [
            {
              instruction: 'Look at the text below. In 35 seconds, you must read this text aloud as naturally and clearly as possible. You have 35 seconds to read aloud.',
              prompt: "Whether you're climbing your way up the corporate ladder or overwhelmed with the organizational tasks of home and kids, a luxurious vacation to an exotic paradise may seem like an impossible dream. You can only fantasize about an outdoor massage among fragrant island flowers or a nap after enjoying a brunch ripe with fruits fresh from the vine.",
              tips: 'Maintain steady pace, articulate syllables clearly, and pause naturally at commas and periods.',
              modelScore: '90/90 - Full oral fluency & native pronunciation cadence'
            }
          ],
          howToRespond: {
            bullets: [
              'You have to read a paragraph out loud.',
              '"Recording Status" will count down until the microphone opens. It will give you 30-40 seconds to read and get ready. When you hear a beep tone, you should speak right away. If you talk before the mic goes on, your voice won\'t be caught.',
              'Don\'t rush, and speak slowly.',
              'Read the paragraph properly before the progress bar runs out. Once "Recording" time completes, it will show as "Complete"',
              'You can only record once.'
            ],
            note: 'The recording will end after three seconds of silence.',
            grading: 'Content, fluency, and pronunciation. Use these useful PTE Read Aloud techniques and tips to improve your score.',
            tipsBadge: 'Read Aloud TIPS'
          },
          faqs: [
            {
              q: 'What is the Read Aloud task in PTE Academic?',
              a: 'Read Aloud presents a short written text (up to 60 words) on your monitor. You are given 35-40 seconds to read and prepare, followed by 35-40 seconds to record your speech through your headset microphone. It evaluates both oral reading fluency and pronunciation.'
            },
            {
              q: 'How much time do I have to prepare and read?',
              a: 'Preparation time varies between 30 and 40 seconds depending on the exact character and word count of the given passage. The recording timer begins immediately after the short beep tone.'
            },
            {
              q: 'How is the Read Aloud task scored?',
              a: 'Scoring uses three dimensions: Content (number of words read correctly), Oral Fluency (smooth rhythm, phrasing, lack of hesitations or false starts), and Pronunciation (phonemic accuracy understandable to regular speakers of the language).'
            },
            {
              q: 'How can I practice Read Aloud effectively on NinetyPTE?',
              a: 'Practice with NinetyPTE\'s AI speech recognizer daily. Read through the text during preparation time silently, identifying challenging syllables and natural pause points. Speak with steady volume without shouting.'
            },
            {
              q: 'What are common mistakes to avoid in Read Aloud?',
              a: 'Speaking before the microphone opens, pausing for longer than 3 seconds (which shuts off the recorder), rushing too quickly, repeating words to self-correct, and using an unnatural robotic cadence.'
            }
          ]
        },
        {
          id: 'repeat-sentence',
          code: 'RS',
          title: 'Repeat Sentence',
          tagline:
            'Repeat Sentence measures your instantaneous audio comprehension and short-term oral retention. It is one of the highest-scoring tasks for both Speaking and Listening.',
          table: {
            taskDesc: 'After listening to a recording of a sentence, repeat the sentence exactly as spoken',
            skills: 'Speaking & Listening',
            promptLength: '3 - 9 seconds audio (8 - 15 words)',
            prepTime: 'None (microphone opens immediately after audio)',
            answerTime: '15 seconds',
            questionCount: '10 - 12',
            prepSeconds: 3
          },
          mockQuestions: [
            {
              instruction: 'You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once.',
              prompt: 'Audio Prompt: "The university library will remain open twenty-four hours during final examination week."',
              tips: 'Focus on meaningful chunks: [The university library] [will remain open 24 hours] [during final examination week].',
              modelScore: '90/90 - 100% word sequence fidelity and natural stress cadence'
            }
          ],
          howToRespond: {
            bullets: [
              'Listen carefully to the audio sentence. You will hear it only once.',
              'Do not attempt to write down all words; instead, visualize the meaning and capture initial letters.',
              'When the audio finishes, the microphone will open immediately without a countdown.',
              'Speak clearly with the same inflection and intonation as the original speaker.',
              'Even if you miss a word, keep your fluency intact—never hesitate or pause abruptly.'
            ],
            note: 'Microphone opens within 1 second of audio completion. A 3-second silence will close the recording.',
            grading: 'Content (words in exact sequence), Oral Fluency, and Pronunciation.',
            tipsBadge: 'Repeat Sentence TIPS'
          },
          faqs: [
            {
              q: 'How many sentences do I repeat in the real test?',
              a: 'You will encounter 10 to 12 repeat sentence questions. Because this task contributes substantial marks to both Speaking and Listening, it is one of the most critical question types in the entire exam.'
            },
            {
              q: 'What if I forget part of the sentence?',
              a: 'Prioritize fluency! If you remember 50% to 75% of the sentence, deliver what you know confidently without long pauses or "um/uh". Pauses harm your fluency score far more than missing one filler word.'
            },
            {
              q: 'Does accent matter in Repeat Sentence?',
              a: 'No. Pearson’s automated scoring engine recognizes diverse native and non-native international accents. What matters is clear vowel/consonant articulation and natural rhythm.'
            }
          ]
        },
        {
          id: 'describe-image',
          code: 'DI',
          title: 'Describe Image',
          tagline:
            'Describe Image assesses your ability to interpret graphical information (bar charts, line graphs, pie charts, flowcharts, maps) and speak coherently without notes.',
          table: {
            taskDesc: 'An image or diagram appears on screen. Describe the visual information in detail',
            skills: 'Speaking',
            promptLength: 'Visual graph, chart, table, map or process',
            prepTime: '25 seconds',
            answerTime: '40 seconds',
            questionCount: '3 - 4',
            prepSeconds: 25
          },
          mockQuestions: [
            {
              instruction: 'Look at the chart below. In 25 seconds, please speak into the microphone and describe in detail what the chart is showing. You will have 40 seconds to give your response.',
              prompt: 'Graph: "Annual Investment in Renewable Energy Sources (2015 - 2025)". Shows steady increase in solar power from $120B to $380B, wind fluctuating around $180B, and hydro maintaining steady baseline at $85B.',
              tips: 'Use NinetyPTE\'s structured format: Title Overview -> Highest Point -> Lowest Point -> Key Trend -> Conclusion.',
              modelScore: '90/90 - Structured description with rich academic vocabulary'
            }
          ],
          howToRespond: {
            bullets: [
              'You have 25 seconds to analyze the visual information before recording starts.',
              'Identify the image type and main title immediately.',
              'Spot the most notable trends: maximum value, minimum value, rapid increases or decreases.',
              'Speak continuously for 30 to 35 seconds with smooth transitions.',
              'Conclude with a high-level summary observation before time expires.'
            ],
            note: 'Keep speaking fluently; do not worry about stating every minor figure.',
            grading: 'Content, Oral Fluency, and Pronunciation.',
            tipsBadge: 'Describe Image TIPS'
          },
          faqs: [
            {
              q: 'Do I need to mention all numbers in the chart?',
              a: 'No. You only need to highlight key elements such as the overall topic, highest and lowest values, and notable trends or patterns.'
            },
            {
              q: 'How long should I speak for Describe Image?',
              a: 'Aim for 32 to 36 seconds. This provides sufficient content depth while avoiding the risk of being cut off mid-sentence when the 40-second timer elapses.'
            }
          ]
        }
      ]
    },

    writing: {
      title: 'PTE Writing Practice',
      subtitle: 'Latest PTE Academic & UKVI Writing Questions',
      overview:
        "The PTE Writing module of PTE Academic / UKVI is in the same section as Speaking (Section 1) but is the second part or module of the test. It tests the candidate's ability to write and express their opinion in accurate English and effectively in academic contexts. It has two types of questions and the test takers have to type their responses using a keyboard and a computer screen. The responses are scored by an automated system based on various criteria such as grammar, spelling, punctuation, coherence, and vocabulary. PTE Writing practice is an important aspect of PTE preparation & helps improve performance through consistent PTE practice on NinetyPTE.",
      tasks: [
        {
          id: 'summarize-written-text',
          code: 'SWT',
          title: 'Summarize Written Text',
          tagline:
            "Summarize Written Text PTE is a question type where a student is required to write a one-sentence summary of a provided passage within a maximum limit of 75 words. This question will check the student's Reading & Writing Skills. You have 10 minutes to write your summary. Make sure to include the main points of the reading passage in a full, single sentence of no more than 75 and no less than 5 words.",
          table: {
            taskDesc: 'After reading a text, write a one-sentence summary of the passage',
            skills: 'Reading and Writing',
            promptLength: 'Text up to 300 words',
            prepTime: null,
            answerTime: '10 minutes',
            questionCount: '2'
          },
          mockQuestions: [
            {
              instruction: 'Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage',
              mockNumber: 'Mock Test - 1',
              questionProgress: '28 of 29',
              defaultRemainingTime: '08:04',
              passage: 
                "The product life cycle has 4 very clearly defined stages, each with its characteristics that mean different things for businesses that are trying to manage the life cycle of their particular products.\n\nIntroduction Stage – This stage of the cycle could be the most expensive for a company launching a new product. The size of the market for the product is small, which means sales are low, although they will be increasing. On the other hand, the cost of things like research and development, consumer testing, and the marketing needed to launch the product can be very high, especially if it's a competitive sector.\n\nGrowth Stage – The growth stage is typically characterized by strong growth in sales and profits, and because the company can start to benefit from economies of scale in production, the profit margins, as well as the overall amount of profit, will increase. This makes it possible for businesses to invest more money in promotional activity to maximize the potential of this growth stage.\n\nMaturity Stage – During the maturity stage, the product is established and the aim for the manufacturer is now to maintain the market share they have built up. This is probably the most competitive time for most products and businesses need to invest wisely in any marketing they undertake. They also need to consider any product modifications or improvements to the production process which might give them a competitive advantage.\n\nDecline Stage – Eventually, the market for a product will start to shrink, and this is what's known as the decline stage. This shrinkage could be due to the market becoming saturated (i.e. all the customers who will buy the product have already purchased it), or because the consumers are switching to a different type of product. While this decline may be inevitable, it may still be possible for companies to make some profit by switching to less expensive production methods and cheaper markets.",
              tips: 'Formulate a compound-complex sentence: [Although products progress through four distinct lifecycle stages from costly introduction to eventual decline], [businesses can maximize commercial success and profitability by strategically adapting their marketing investments and production methodologies according to each phase].',
              modelScore: '90/90 - Exactly 1 sentence (42 words), perfect syntax and comprehensive coverage of all 4 stages.'
            }
          ],
          howToRespond: {
            bullets: [
              'For this type of question, you need to sum up the text in one line.',
              'The summary should be no longer than 75 words and should cover the key points of the passage. You can see the number of words you have written at the bottom of the screen. The cut, copy, and paste buttons can help you make changes to your answer quickly.'
            ],
            editingInstructions: {
              cut: 'Pick out the words you want to get rid of, then press "Cut."',
              copy: 'Pick out the words you want to copy, then press "Copy."',
              paste: 'Place the cursor where you want to put the text, then press "Paste."'
            },
            grading: 'Content, form, grammar, and vocabulary.',
            guideText: 'Read this guide on PTE Summarize Written Text for more ways to do well:',
            tipsBadge: 'Summarize Written Text TIPS'
          },
          faqs: [
            {
              q: 'What is the Summarize Written Text task?',
              a: 'Summarize Written Text PTE is a question type where a student is required to write a one-sentence summary of a provided passage within a maximum limit of 75 words. This question evaluates both Reading and Writing skills.'
            },
            {
              q: 'How much time do I have to think and answer?',
              a: 'You have exactly 10 minutes to read the passage, plan your sentence, write it into the text box, and proofread. The timer does not carry over to subsequent questions.'
            },
            {
              q: 'How is this task scored?',
              a: 'Scoring evaluates Content (retaining core ideas), Form (strictly 1 sentence between 5 and 75 words), Grammar (syntactic correctness), and Vocabulary (academic lexical range and spelling).'
            },
            {
              q: 'How can I practice Summarize Written Text effectively?',
              a: 'Practice on NinetyPTE with instantaneous AI feedback. Focus on finding key topic points and connecting them with subordinating conjunctions such as "although", "whereas", or "while". Aim for 35 to 45 words.'
            },
            {
              q: 'What are common mistakes to avoid?',
              a: 'Writing more than one sentence (e.g., using a full stop prematurely), exceeding 75 words or writing fewer than 5 words, failing to capitalize the first letter, and copying long word strings without synthesis.'
            }
          ]
        },
        {
          id: 'write-essay',
          code: 'WE',
          title: 'Essay',
          tagline:
            "PTE Writing Essay is a question type where a student will have to construct an essay on a given topic in about 200 - 300 words & would be assessed on Writing skills. You have 20 minutes to write your essay. PTE essay samples can be found on NinetyPTE's website for a better understanding of how to attempt this question.",
          table: {
            taskDesc: 'Write a 200 - 300 word essay on a given topic',
            skills: 'Writing',
            promptLength: '2 - 3 sentences',
            prepTime: null,
            answerTime: '20 minutes',
            questionCount: '1'
          },
          mockQuestions: [
            {
              instruction: 'You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200-300 words.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '29 of 29',
              defaultRemainingTime: '19:56',
              prompt: 'Do you agree that globalization is important? Give reasons.',
              tips: 'Structure: Paragraph 1 (Introduction & Stance), Paragraph 2 (Primary benefits - trade & cultural exchange), Paragraph 3 (Challenges - local industry displacement), Paragraph 4 (Conclusion & Balanced Outlook).',
              modelScore: '90/90 - 256 words: Coherent 4-paragraph structure, varied academic lexical items, clean discourse flow, zero spelling errors.'
            }
          ],
          howToRespond: {
            bullets: [
              'Write an argumentative essay of 200 to 300 words based on the topic given. You have 20 minutes to do this.',
              'Your word count is shown at the bottom. Your essay should have at least 200 words and no more than 300 words.',
              'To make changes to your writing, use the cut, copy, and paste buttons:'
            ],
            editingInstructions: {
              cut: 'To delete incorrect things, select them and click "Cut."',
              copy: 'To copy text, select it and click "Copy."',
              paste: 'Click where you want to put the words you copied or cut, then click "Paste."'
            },
            grading: 'Content, development, structure and consistency, form, general language range, grammar, vocabulary range, and spelling.',
            guideText: 'Find out more about PTE essay writing to get even better at writing essays:',
            tipsBadge: 'Write Essay TIPS'
          },
          faqs: [
            {
              q: 'What is the Write Essay task?',
              a: 'PTE Essay writing requires you to write a 200 to 300 word academic essay responding to a given prompt within 20 minutes.'
            },
            {
              q: 'How much time do I have to think and answer?',
              a: 'You have 20 minutes in total. We recommend 2 minutes for planning your ideas, 14 minutes for typing, and 4 minutes for checking punctuation, spelling, and word count.'
            },
            {
              q: 'How is this task scored?',
              a: 'Automated scoring assesses Content, Development, Structure and Coherence, Form (200-300 words), General Linguistic Range, Grammar, Vocabulary Range, and Spelling.'
            },
            {
              q: 'How can I practice Write Essay effectively?',
              a: 'Practice using NinetyPTE\'s tested academic essay frameworks. Familiarize yourself with typing under timed pressure while tracking your live word count in our realistic Pearson test simulator.'
            },
            {
              q: 'What are common mistakes to avoid?',
              a: 'Writing fewer than 200 or more than 300 words, straying from the topic prompt, mixing UK and US spelling inconsistently, using informal abbreviations, and not reserving time for final proofreading.'
            }
          ]
        }
      ]
    },

    reading: {
      title: 'PTE Reading Practice',
      subtitle: 'Latest PTE Academic & UKVI Reading Questions',
      overview:
        "The Reading module of PTE Academic / UKVI is the third part of the test which assesses the test takers' ability to read and understand English texts in academic context. The PTE Reading test module consists of five item types and the test takers have to select, drag and drop, or type their responses using a mouse and a keyboard. There is a collective timer for all questions, so time management is extremely important. The responses are scored by an automated system based on various criteria such as comprehension, analysis, and vocabulary. PTE Reading practice is an important aspect of PTE preparation, and regular PTE Practice helps test takers improve accuracy, speed, and overall exam performance on NinetyPTE.",
      tasks: [
        {
          id: 'rw-fill-in-blanks',
          code: 'RWB',
          title: 'Fill in the Blanks (Drop-down)',
          tagline:
            'There is a passage with some missing words. Beside each gap, there is a button with a drop-down list. Left-click on this button to reveal the drop-down list of options for that gap. Select the option you think best fills the gap. Use your knowledge of grammar and vocabulary to solve this question.',
          table: {
            taskDesc: 'A text appears on the screen with several gaps. Select the correct option from drop-down menus within the passage',
            skills: 'Reading and Writing',
            promptLength: 'Text up to 350 words',
            suggestedTime: '2-2.5 minutes per question',
            questionCount: '5 - 6'
          },
          mockQuestions: [
            {
              instruction: 'Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '1 of 14',
              timerDisplay: '01:03 / 29:00',
              blanksData: [
                { id: 0, options: ['select', 'attractive', 'raised', 'adjusted'], answer: 'raised' },
                { id: 1, options: ['select', 'or', 'similarly', 'consequently'], answer: 'or' },
                { id: 2, options: ['select', 'lower', 'modify', 'elevate'], answer: 'lower' },
                { id: 3, options: ['select', 'usually', 'hardly', 'rarely'], answer: 'usually' }
              ],
              tips: 'Examine preceding and succeeding prepositions and syntactic collocations. In economics, prices are "raised" or "lowered", not "adjusted" or "elevated" in this context.',
              modelScore: '90/90 - Full accuracy in all 4 drop-down blanks'
            }
          ],
          howToRespond: {
            bullets: [
              'For this type of question, you need to pick the right words from a list to finish the sentence.',
              'The text is missing some words. Each blank has a button with a list of choices. Click the button to see the choices and pick the one that fits the gap the best.',
              'Just click on a different choice if you change your mind.'
            ],
            grading: 'Whether the answer is right or incorrect (1 mark per correct blank).',
            tipsBadge: 'PTE Reading & Writing: Fill in the Blanks Practice Task'
          },
          faqs: [
            {
              q: 'What is this task?',
              a: 'Reading & Writing: Fill in the Blanks displays an academic text with 4-5 missing words. Each blank contains a drop-down menu with 4 word choices. It evaluates both reading comprehension and contextual lexical selection.'
            },
            {
              q: 'How is it scored?',
              a: 'Each correctly selected blank earns 1 point toward both your Reading and Writing module scores. There is no negative marking.'
            },
            {
              q: 'How can I practice this task?',
              a: 'Practice identifying grammatical word categories (verbs, nouns, adjectives) and mastering Academic Collocations on NinetyPTE.'
            },
            {
              q: 'How much time do I have?',
              a: 'The Reading section shares a single pooled timer of 29-30 minutes. We recommend spending 2 to 2.5 minutes per drop-down question.'
            },
            {
              q: 'What are common mistakes to avoid?',
              a: 'Choosing words solely based on translation rather than English preposition collocations, and spending more than 3 minutes on a single passage.'
            }
          ]
        },
        {
          id: 'mcq-multiple',
          code: 'MCM',
          title: 'Multiple Choice, Multiple Answers',
          tagline:
            'After reading a text, answer a multiple-choice question on the content or tone of the text by selecting more than one response. This question carries a negative marking & hence, a student will get penalized if chosen a wrong answer.',
          table: {
            taskDesc: 'After reading a text, answer a multiple-choice question on the content or tone of the text by selecting more than one response',
            skills: 'Reading',
            promptLength: 'Text up to 300 words',
            suggestedTime: '2-2.5 minutes per question',
            questionCount: '2 - 3'
          },
          mockQuestions: [
            {
              instruction: 'Read the text and answer the question by selecting all the correct responses. You will need to select more than one response.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '6 of 14',
              timerDisplay: '01:29 / 29:00',
              passage:
                "During Jackson's second term, his opponents had gradually come together to form the Whig party. Whigs and Democrats held different attitudes toward the changes brought about by the market, banks, and commerce. The Democrats tended to view society as a continuing conflict between \"the people\"—farmers, planters, and workers—and a set of greedy aristocrats. This \"paper money aristocracy\" of bankers and investors manipulated the banking system for their own profit, Democrats claimed, and sapped the nation's virtue by encouraging speculation and the desire for sudden, unearned wealth. The Democrats wanted the rewards of the market without sacrificing the features of a simple agrarian republic. They wanted the wealth that the market offered without the competitive, changing society; the complex dealing; the dominance of urban centers; and the loss of independence that came with it.",
              question: 'The author mentions bankers and investors in the passage as an example of which of the following?',
              options: [
                "The Democratic Party's main source of support",
                "The people that Democrats claimed were unfairly becoming rich",
                "The people most interested in a return to a simple agrarian republic",
                "One of the groups might be not in favor of Whig party and Democrats"
              ],
              tips: 'Only check options that are explicitly substantiated by passage text. When in doubt, do not guess since negative marking applies.',
              modelScore: '90/90 - Selected exact verified options (2nd and 4th)'
            }
          ],
          howToRespond: {
            bullets: [
              'Read the question and identify the specific target concept before reading the whole passage.',
              'Read the passage carefully to analyze the author’s stance and supporting examples.',
              'Check multiple answers that are unequivocally true according to the text.',
              'Remember: incorrect options subtract 1 mark (negative marking). If you are only confident in 1 answer, tick only that 1 answer!'
            ],
            grading: 'Partial credit with negative marking (+1 for correct, -1 for incorrect, minimum score 0).',
            tipsBadge: 'Multiple Choice, Multiple Answers Practice Task'
          },
          faqs: [
            {
              q: 'What is this task?',
              a: 'Multiple Choice, Multiple Answers presents an academic passage and a question where two or more options are correct. You must select all accurate options.'
            },
            {
              q: 'How is it scored?',
              a: 'Scoring uses partial credit with negative marking: +1 mark for each correct checkbox, -1 mark for each incorrect checkbox. The minimum score for the question is 0.'
            },
            {
              q: 'How can I practice this task?',
              a: 'Practice verifying each option against direct passage sentences. If uncertain about a second option, leave it unselected to safeguard your positive point.'
            },
            {
              q: 'How much time do I have?',
              a: 'Aim for 2 to 2.5 minutes per question within your overall 29-minute Reading section budget.'
            },
            {
              q: 'What are common mistakes to avoid?',
              a: 'Selecting too many options and wiping out points due to negative marking penalty.'
            }
          ]
        },
        {
          id: 'reorder-paragraphs',
          code: 'RO',
          title: 'Re-Order Paragraphs',
          tagline:
            'For this item type in Reorder Paragraph PTE, several text boxes appear on the screen in random order. Put the text boxes in the correct order. A Student is judged on the ability to understand the organization and cohesion of an academic text. It tests a candidate\'s ability to evaluate logical relationships between paragraphs, as well as examine grammatical relationships within the text. The sentences must be arranged logically in the correct order.',
          table: {
            taskDesc: 'Several text boxes appear on the screen in random order. Put the text boxes in the correct order',
            skills: 'Reading',
            promptLength: 'Text up to 150 words',
            suggestedTime: '1-1.5 minutes per question',
            questionCount: '2 - 3'
          },
          mockQuestions: [
            {
              instruction: 'The text boxes in the left panel have been placed in random order. Restore the original order by dragging the text boxes from the left panel to the right panel.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '8 of 14',
              timerDisplay: '01:57 / 29:00',
              correctOrder: ['3', '5', '1', '4', '2'],
              tips: 'Find the independent topic sentence that introduces both concepts (Gandhiji and Nehru). Then group each philosophy before presenting consequences.',
              modelScore: '90/90 - Full marks on all adjacent pairs: 3-5, 5-1, 1-4, 4-2'
            }
          ],
          howToRespond: {
            bullets: [
              'You need to drag and drop the sentences to get the text back in the right order.',
              'There are two ways to change the text: Left-click on a sentence to drag it to the right target panel, or use the arrow buttons to move and order sentences.',
              'To deselect a box, just click somewhere else on the screen.'
            ],
            grading: '"Correct" or "incorrect" and "partial credit" system (1 mark per correct contiguous pair).',
            tipsBadge: 'Re-order Paragraphs Practice Task'
          },
          faqs: [
            {
              q: 'What is this task?',
              a: 'Re-Order Paragraphs displays 4 to 5 jumbled sentences in the Source column. You must arrange them into their original logical progression in the Target column.'
            },
            {
              q: 'How is it scored?',
              a: 'Scoring is awarded per correct contiguous pair (e.g. Pair 1-2, Pair 2-3). If the correct order is A-B-C-D, there are 3 possible pair points.'
            },
            {
              q: 'How can I practice this task?',
              a: 'Look for referring pronouns (e.g., "such secularism", "these findings"), definite articles ("the concept"), and transition signposts.'
            },
            {
              q: 'How much time do I have?',
              a: 'Spend approximately 1.5 to 2 minutes per Re-Order task.'
            },
            {
              q: 'What are common mistakes to avoid?',
              a: 'Failing to identify the standalone topic sentence first, or leaving items in the Source box.'
            }
          ]
        },
        {
          id: 'reading-fill-in-blanks',
          code: 'RB',
          title: 'Fill in the Blanks (Drag & Drop)',
          tagline:
            'For this item type PTE Reading Fill in the blanks, you need to drag and drop words across the screen to correctly fill in the gaps in the text. You have to select the correct words and drag and drop them into the gaps using your knowledge of grammar, collocations, and vocabulary.',
          table: {
            taskDesc: 'A text appears on the screen with several gaps. Drag words from the box below to fill the gaps',
            skills: 'Reading',
            promptLength: 'Text up to 80 words',
            suggestedTime: '2 minutes per question',
            questionCount: '4 - 5'
          },
          mockQuestions: [
            {
              instruction: 'In the text below some words are missing. Drag words from the box below to the appropriate place in the text. To undo an answer choice, drag the word back to the box below the text.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '11 of 14',
              timerDisplay: '02:17 / 29:00',
              passageParts: [
                "What is a country, and how is a country defined? When people ask how many countries there are in the world, they expect a simple answer. After ",
                ", we've explored the whole planet, we have international travel, satellite navigation, and plenty of global organizations like the United Nations, so we ",
                " really know how many countries there are! However, the answer to the question varies according to whom you ask. Most people say there are 192 countries, but others point out that there could be more like 260 of them. So why isn't there a straightforward answer? The problem ",
                " because there isn't a universally agreed definition of 'country' and because, for political reasons, some countries ",
                " it convenient to recognize or not recognize other countries."
              ],
              bankWords: ['a', 'all', 'should', 'find', 'arises', 'have'],
              correctSlots: { 0: 'all', 1: 'should', 2: 'arises', 3: 'find' },
              tips: 'Examine common idioms: "After all" is a set phrase. "Problem arises" matches singular agreement. "Countries find it convenient" matches active transitive structure.',
              modelScore: '90/90 - All 4 gaps correctly placed: all, should, arises, find'
            }
          ],
          howToRespond: {
            bullets: [
              'In this task, you drag words from the bottom pool into the dashed gaps within the passage.',
              'There are more words in the pool than gaps, so several words will not be used.',
              'To replace or return a word, click or drag the word back to the bottom word bank.'
            ],
            grading: '1 point for each correctly placed word in a gap; 0 for empty or incorrect gaps.',
            tipsBadge: 'Reading : Fill in the Blanks Practice Task'
          },
          faqs: [
            {
              q: 'What is this task?',
              a: 'Reading Fill in the Blanks (Drag & Drop) presents a short academic text with 3 to 5 blank gaps. Beneath the text is a word bank with extra distractor words.'
            },
            {
              q: 'How is it scored?',
              a: 'Each correctly filled gap awards 1 mark toward Reading. Unfilled or incorrect gaps score 0.'
            },
            {
              q: 'How can I practice this task?',
              a: 'Focus on grammatical word categories (e.g. auxiliary verb needed before main verb, singular verb for singular subjects).'
            },
            {
              q: 'How much time do I have?',
              a: 'Aim for 1.5 to 2 minutes per drag-and-drop question.'
            },
            {
              q: 'What are common mistakes to avoid?',
              a: 'Leaving any blank empty. There is no negative marking, so ensure all gaps are filled before proceeding.'
            }
          ]
        },
        {
          id: 'mcq-single',
          code: 'MCS',
          title: 'Multiple Choice, Single Answer',
          tagline:
            'After reading the text, students will have to answer a multiple-choice question on the content or tone of the text by selecting one response.',
          table: {
            taskDesc: 'After reading a text, answer a multiple-choice question on the content or tone of the text by selecting one response',
            skills: 'Reading',
            promptLength: 'Text up to 300 words',
            suggestedTime: '1 minutes per question',
            questionCount: '2 - 3'
          },
          mockQuestions: [
            {
              instruction: 'Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct.',
              mockNumber: 'Mock Test - 1',
              questionProgress: '14 of 14',
              timerDisplay: '04:43 / 29:00',
              passage:
                "The name \"United Nations\", originally suggested by the North American president Franklin D. Roosevelt, was first used on January 1, 1942, when the representatives of 26 countries fighting against Italy, Germany, and Japan began cooperating in winning the Second World War. The signatories of the Declaration by United Nations also subscribed to a common program of purposes and principles embodied in an official document which visualized providing peace to all peoples, security from aggression, freedom to choose their own government, access on equal terms to the trade and raw materials of the world, improved labor standards, freedom from fear and want, and freedom of the seas.",
              question: 'Which of the following most accurately summarizes the opinion of the author in the text?',
              options: [
                'The United Nations was founded by Franklin D. Roosevelt.',
                'The origin of the United Nations came about as a response to Italy, Germany, and Japan.',
                'The Declaration by the United Nations was difficult to follow at first because it was unwritten.',
                'The Declaration by United Nations included visualizing making sure that all peoples were free from fearing the seas.'
              ],
              correctIdx: 1,
              tips: 'Focus on the explicit historical context: the text describes representatives cooperating in winning the war as the origin.',
              modelScore: '90/90 - Correct option chosen (Option 2)'
            }
          ],
          howToRespond: {
            bullets: [
              'Read the question prompt first to understand the objective.',
              'Scan the text for keywords and supporting evidence.',
              'Select the single radio button that best answers the question. There is no penalty for an incorrect guess.'
            ],
            grading: '1 point for the correct answer; 0 for an incorrect answer (no negative marking).',
            tipsBadge: 'Multiple Choice, Single Answer Practice Task'
          },
          faqs: [
            {
              q: 'What is this task?',
              a: 'Multiple Choice, Single Answer presents a text passage followed by a single-select question with 4 options.'
            },
            {
              q: 'How is it scored?',
              a: '1 point is awarded for the correct option; 0 points for incorrect answers. There is no negative marking.'
            },
            {
              q: 'How can I practice this task?',
              a: 'Read the question prompt and choices first to guide your scanning, then locate the specific sentence that answers it.'
            },
            {
              q: 'How much time do I have?',
              a: 'Spend approximately 1 to 1.5 minutes on this task.'
            },
            {
              q: 'What are common mistakes to avoid?',
              a: 'Over-allocating time. Because this question is worth only 1 mark, do not spend more than 1.5 minutes on it.'
            }
          ]
        }
      ]
    },

    listening: {
      title: 'PTE Listening Practice',
      subtitle: 'Latest PTE Academic & UKVI Listening Questions',
      overview:
        "The PTE Listening module tests your ability to comprehend academic lectures, conversational dialogues, and scholarly presentations delivered in various English accents. Featuring tasks such as Summarize Spoken Text, Write From Dictation, and Highlight Incorrect Words, it assesses auditory acuity and integrated writing proficiency.",
      tasks: [
        {
          id: 'summarize-spoken-text',
          code: 'SST',
          title: 'Summarize Spoken Text',
          tagline:
            'Summarize Spoken Text requires listening to an audio recording and writing a 50–70 word summary capturing all primary arguments.',
          table: {
            taskDesc: 'Listen to a short audio lecture and write a 50-70 word summary',
            skills: 'Listening & Writing',
            promptLength: '60 - 90 seconds audio',
            prepTime: 'Integrated (10 minutes total per task)',
            answerTime: '10 minutes',
            questionCount: '1 - 2',
            prepSeconds: 5
          },
          mockQuestions: [
            {
              instruction: 'You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 50-70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the lecture.',
              prompt: 'Lecture audio on: "Glaciology and Alpine Ice Coring". The researcher outlines how isotopic gas measurements trapped in deep Antarctic ice sheets provide incontrovertible baseline data regarding atmospheric CO2 concentrations over eight hundred thousand years.',
              tips: 'Strictly maintain word count between 50 and 70 words. Summarize key facts with correct spelling.',
              modelScore: '90/90 - 64 words, full content coverage, perfect spelling and grammar'
            }
          ],
          howToRespond: {
            bullets: [
              'Write down essential nouns, verbs, and research conclusions while listening.',
              'Aim for 55 to 65 words in length.',
              'Unlike SWT, you can use multiple sentences for your summary.',
              'Ensure correct spelling of technical terms used by the lecturer.'
            ],
            note: 'Writing fewer than 40 words or more than 100 words yields 0 for Form.',
            grading: 'Content, Form (50-70 words), Grammar, Vocabulary, and Spelling.',
            tipsBadge: 'Summarize Spoken TIPS'
          },
          faqs: [
            {
              q: 'Can I write more than one sentence in Summarize Spoken Text?',
              a: 'Yes! Unlike Summarize Written Text, SST allows 2 to 4 sentences as long as the total word count is strictly between 50 and 70 words.'
            }
          ]
        },
        {
          id: 'write-from-dictation',
          code: 'WFD',
          title: 'Write From Dictation',
          tagline:
            'Write From Dictation is the most heavily weighted question type in the entire PTE exam, contributing massive scores to both Listening and Writing.',
          table: {
            taskDesc: 'Listen to a short sentence and type it exactly into the text box',
            skills: 'Listening & Writing',
            promptLength: '3 - 5 seconds audio (7 - 14 words)',
            prepTime: '7 seconds countdown before audio',
            answerTime: 'Shared section timer',
            questionCount: '3 - 4',
            prepSeconds: 7
          },
          mockQuestions: [
            {
              instruction: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
              prompt: 'Audio sentence: "The chemistry department will publish its research findings in an international scientific journal."',
              tips: 'Type initials during audio or type immediately. Capitalize the first letter and include a period.',
              modelScore: '90/90 - 100% spelling and word order accuracy'
            }
          ],
          howToRespond: {
            bullets: [
              'Listen attentively with total concentration—the sentence plays only once.',
              'Type immediately while auditory memory is fresh.',
              'Check capitalization of initial letter and proper nouns, and append a full stop.',
              'Double check for singular vs. plural endings (-s, -ed).',
              'Manage your overall section timer so you have at least 4-5 minutes for all WFD items.'
            ],
            note: 'Each correct word spelled accurately awards 1 point to both Listening and Writing.',
            grading: '1 point per correct word in correct form.',
            tipsBadge: 'Dictation TIPS'
          },
          faqs: [
            {
              q: 'Why is Write From Dictation so crucial?',
              a: 'WFD delivers up to 25-30% of your total Writing score and a huge percentage of your Listening score. Preparing for WFD on NinetyPTE is essential for achieving an 8+ band or 79+ score.'
            }
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
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* --------------------------------------------------------------------- */}
      {/* Sticky Right "Practice Now" Action Pill                               */}
      {/* --------------------------------------------------------------------- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <Link
          to="/mock-tests"
          className="bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs tracking-wider uppercase px-2.5 py-4 rounded-l-xl shadow-lg transition flex items-center gap-1.5 [writing-mode:vertical-rl] rotate-180"
        >
          Practice Now
        </Link>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* Top Header & Breadcrumb                                               */}
      {/* --------------------------------------------------------------------- */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            PTE <span className="text-[#00c2cb]">
              {isWriting ? 'Writing' : isReading ? 'Reading' : activeModule === 'listening' ? 'Listening' : 'Speaking'}
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

      {/* --------------------------------------------------------------------- */}
      {/* Active Task Detail & Specification Table                              */}
      {/* --------------------------------------------------------------------- */}
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
                {isReading ? (
                  <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Suggested time</th>
                ) : !isWriting && currentTask.table.prepTime ? (
                  <th className={`py-3 px-4 text-xs font-semibold border-r ${tableBorderColor}`}>Preparation time</th>
                ) : null}
                {!isReading && (
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
                {isReading ? (
                  <td className="py-4 px-4 text-xs border-r border-slate-100 max-w-[150px]">
                    {currentTask.table.suggestedTime}
                  </td>
                ) : !isWriting && currentTask.table.prepTime ? (
                  <td className="py-4 px-4 text-xs border-r border-slate-100 max-w-[150px]">
                    {currentTask.table.prepTime}
                  </td>
                ) : null}
                {!isReading && (
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

      {/* --------------------------------------------------------------------- */}
      {/* Interactive Mock Test Simulator (Pearson Style)                       */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden">
          
          {/* Top Simulator Header Bar */}
          <div className="border-t-4 border-[#0284c7] bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between text-xs font-semibold text-slate-700">
            <div className="text-slate-800 font-bold">
              {isWriting ? (
                `Remaining Time - ${formatTime(writingTimeLeft)}`
              ) : isReading ? (
                <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#0284c7] h-full w-1/3" />
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

            {/* CONDITIONAL RENDER: Reading Simulators vs Writing Simulator vs Audio Recorder */}
            {isReading ? (
              <div className="space-y-6">
                
                {/* 1. Fill in the Blanks (Drop-down) */}
                {currentTask.id === 'rw-fill-in-blanks' && (
                  <div className="border border-slate-200 rounded-lg p-6 bg-white text-xs sm:text-sm text-slate-800 leading-loose font-sans shadow-2xs space-y-4">
                    <p>
                      The supply of a thing, in the phrase "supply and demand," is the amount that will be offered for sale at each of a series of prices; the demand is the amount that will be bought at each of a series of prices. The principle that value depends on supply and demand means that in the case of nearly every commodity, more will be bought if the price is lowered, less will be bought if the price is{' '}
                      <select
                        value={readingDropdowns[0] || 'select'}
                        onChange={(e) => setReadingDropdowns({ ...readingDropdowns, 0: e.target.value })}
                        className="inline-block mx-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                      >
                        <option value="select">select ▼</option>
                        <option value="attractive">attractive</option>
                        <option value="raised">raised</option>
                        <option value="adjusted">adjusted</option>
                      </select>
                      . Therefore sellers, if they wish to induce buyers to take more of a commodity than they are already doing,{' '}
                      <select
                        value={readingDropdowns[1] || 'select'}
                        onChange={(e) => setReadingDropdowns({ ...readingDropdowns, 1: e.target.value })}
                        className="inline-block mx-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                      >
                        <option value="select">select ▼</option>
                        <option value="or">or</option>
                        <option value="similarly">similarly</option>
                        <option value="consequently">consequently</option>
                      </select>{' '}
                      if they raise its price, they will sell less. If there is a general falling off in demand due, say, to trade depression, sellers must either have to{' '}
                      <select
                        value={readingDropdowns[2] || 'select'}
                        onChange={(e) => setReadingDropdowns({ ...readingDropdowns, 2: e.target.value })}
                        className="inline-block mx-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                      >
                        <option value="select">select ▼</option>
                        <option value="lower">lower</option>
                        <option value="modify">modify</option>
                        <option value="elevate">elevate</option>
                      </select>{' '}
                      prices or put less on the market; they will not be able to sell the same quantity as before at the same price. Similarly with supply. At a certain price, a certain amount will be offered for sale, at a higher price more will be offered, at a lower priceless. If consumers want more, they must offer a higher price; if they want less, they will{' '}
                      <select
                        value={readingDropdowns[3] || 'select'}
                        onChange={(e) => setReadingDropdowns({ ...readingDropdowns, 3: e.target.value })}
                        className="inline-block mx-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-slate-50 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                      >
                        <option value="select">select ▼</option>
                        <option value="usually">usually</option>
                        <option value="hardly">hardly</option>
                        <option value="rarely">rarely</option>
                      </select>{' '}
                      be able to force prices down. That is the first result of a change in demand or supply.
                    </p>
                  </div>
                )}

                {/* 2. Multiple Choice, Multiple Answers */}
                {currentTask.id === 'mcq-multiple' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Passage */}
                    <div className="md:col-span-7 border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed font-sans shadow-2xs max-h-96 overflow-y-auto">
                      <p>{currentMock.passage}</p>
                    </div>

                    {/* Right Column: Question & Multi-Select Checkboxes */}
                    <div className="md:col-span-5 space-y-4">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {currentMock.question}
                      </h4>
                      <div className="space-y-2.5 pt-1">
                        {currentMock.options?.map((option, idx) => {
                          const isChecked = readingCheckboxes.includes(idx);
                          return (
                            <label
                              key={idx}
                              onClick={() => {
                                if (isChecked) {
                                  setReadingCheckboxes(readingCheckboxes.filter(i => i !== idx));
                                } else {
                                  setReadingCheckboxes([...readingCheckboxes, idx]);
                                }
                              }}
                              className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm transition cursor-pointer ${
                                isChecked 
                                  ? 'border-cyan-500 bg-cyan-50/50 text-slate-900' 
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
                  </div>
                )}

                {/* 3. Re-Order Paragraphs */}
                {currentTask.id === 'reorder-paragraphs' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      
                      {/* Left: Source Panel */}
                      <div className="md:col-span-5 border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                        <div className="bg-[#00c2cb] px-4 py-2 font-bold text-white text-xs text-center tracking-wide">
                          Source
                        </div>
                        <div className="p-3 min-h-[260px] bg-white space-y-2.5">
                          {reorderSource.length === 0 ? (
                            <p className="text-xs text-slate-400 italic text-center py-10">All items placed in Target</p>
                          ) : (
                            reorderSource.map(item => (
                              <div
                                key={item.id}
                                onClick={() => handleMoveToTarget(item)}
                                className="p-2.5 rounded border border-slate-200 bg-slate-50 hover:border-cyan-500 hover:bg-cyan-50/40 text-xs text-slate-800 transition cursor-pointer flex items-center justify-between gap-2"
                              >
                                <span className="leading-relaxed">{item.text}</span>
                                <span className="text-cyan-600 text-xs font-bold shrink-0">→</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Middle: Move buttons */}
                      <div className="md:col-span-2 flex flex-row md:flex-col items-center justify-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                          Click to move
                        </span>
                      </div>

                      {/* Right: Target Panel */}
                      <div className="md:col-span-5 border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                        <div className="bg-[#00c2cb] px-4 py-2 font-bold text-white text-xs text-center tracking-wide">
                          Target
                        </div>
                        <div className="p-3 min-h-[260px] bg-slate-50/50 space-y-2.5 border-2 border-dashed border-slate-200">
                          {reorderTarget.length === 0 ? (
                            <p className="text-xs text-slate-400 italic text-center py-10">Click items from Source to place them here</p>
                          ) : (
                            reorderTarget.map((item, idx) => (
                              <div
                                key={item.id}
                                onClick={() => handleMoveToSource(item)}
                                className="p-2.5 rounded border border-cyan-400 bg-white text-xs text-slate-800 transition cursor-pointer flex items-center justify-between gap-2 shadow-2xs"
                              >
                                <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed flex-1">{item.text}</span>
                                <span className="text-rose-500 text-xs font-bold shrink-0 hover:text-rose-700">✕</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. Fill in the Blanks (Drag & Drop) */}
                {currentTask.id === 'reading-fill-in-blanks' && (
                  <div className="space-y-6">
                    {/* Passage with dashed drop slots */}
                    <div className="border border-slate-200 rounded-lg p-6 bg-white text-xs sm:text-sm text-slate-800 leading-loose font-sans shadow-2xs">
                      <p>
                        {currentMock.passageParts?.[0]}
                        <span
                          onClick={() => handleSlotWordClick(0)}
                          className="inline-flex items-center justify-center min-w-[70px] h-7 mx-1 px-3 rounded border-2 border-dashed border-slate-400 bg-slate-50 font-bold text-xs text-cyan-700 cursor-pointer hover:border-cyan-500"
                        >
                          {dragSlots[0] || ''}
                        </span>
                        {currentMock.passageParts?.[1]}
                        <span
                          onClick={() => handleSlotWordClick(1)}
                          className="inline-flex items-center justify-center min-w-[70px] h-7 mx-1 px-3 rounded border-2 border-dashed border-slate-400 bg-slate-50 font-bold text-xs text-cyan-700 cursor-pointer hover:border-cyan-500"
                        >
                          {dragSlots[1] || ''}
                        </span>
                        {currentMock.passageParts?.[2]}
                        <span
                          onClick={() => handleSlotWordClick(2)}
                          className="inline-flex items-center justify-center min-w-[70px] h-7 mx-1 px-3 rounded border-2 border-dashed border-slate-400 bg-slate-50 font-bold text-xs text-cyan-700 cursor-pointer hover:border-cyan-500"
                        >
                          {dragSlots[2] || ''}
                        </span>
                        {currentMock.passageParts?.[3]}
                        <span
                          onClick={() => handleSlotWordClick(3)}
                          className="inline-flex items-center justify-center min-w-[70px] h-7 mx-1 px-3 rounded border-2 border-dashed border-slate-400 bg-slate-50 font-bold text-xs text-cyan-700 cursor-pointer hover:border-cyan-500"
                        >
                          {dragSlots[3] || ''}
                        </span>
                        {currentMock.passageParts?.[4]}
                      </p>
                    </div>

                    {/* Word Bank Pool */}
                    <div className="border border-slate-200 rounded-lg p-4 bg-slate-100 flex flex-wrap justify-center items-center gap-2.5">
                      {currentMock.bankWords?.map((word, idx) => {
                        const isUsed = Object.values(dragSlots).includes(word);
                        return (
                          <button
                            key={idx}
                            disabled={isUsed}
                            onClick={() => handleBankWordClick(word)}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold border transition ${
                              isUsed 
                                ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed' 
                                : 'bg-white text-slate-800 border-slate-300 hover:border-cyan-500 hover:text-cyan-600 shadow-2xs cursor-pointer'
                            }`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. Multiple Choice, Single Answer */}
                {currentTask.id === 'mcq-single' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Passage */}
                    <div className="md:col-span-7 border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed font-sans shadow-2xs max-h-96 overflow-y-auto">
                      <p>{currentMock.passage}</p>
                    </div>

                    {/* Right Column: Question & Radio Options */}
                    <div className="md:col-span-5 space-y-4">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {currentMock.question}
                      </h4>
                      <div className="space-y-2.5 pt-1">
                        {currentMock.options?.map((option, idx) => {
                          const isSelected = readingRadio === idx;
                          return (
                            <label
                              key={idx}
                              onClick={() => setReadingRadio(idx)}
                              className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm transition cursor-pointer ${
                                isSelected 
                                  ? 'border-cyan-500 bg-cyan-50/50 text-slate-900' 
                                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="mcq-single-option"
                                checked={isSelected}
                                onChange={() => {}}
                                className="mt-0.5 text-cyan-600 focus:ring-cyan-500"
                              />
                              <span className="leading-snug">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ) : isWriting ? (
              /* Writing Simulator */
              <div className="space-y-5">
                {currentMock.passage ? (
                  <div className="border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-h-72 overflow-y-auto space-y-3 shadow-2xs">
                    {currentMock.passage.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-800 leading-relaxed font-sans shadow-2xs">
                    <p className="font-medium">{currentMock.prompt}</p>
                  </div>
                )}

                <div className="border border-slate-300 rounded-lg overflow-hidden shadow-xs">
                  <div className="bg-[#00c2cb] px-4 py-2 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleCut}
                        className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition cursor-pointer"
                      >
                        Cut
                      </button>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition cursor-pointer"
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={handlePaste}
                        className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition cursor-pointer"
                      >
                        Paste
                      </button>
                    </div>
                    <div className="font-semibold text-white/95 text-xs">
                      {writingWordCount} word
                    </div>
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
              /* Speaking / Listening Audio Simulator */
              <div className="space-y-5">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 max-w-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Audio Recorder</span>
                    <span className={`font-bold ${isRecording ? 'text-emerald-600 animate-pulse' : isCompleted ? 'text-cyan-600' : 'text-[#f1784b]'}`}>
                      {isRecording 
                        ? 'Recording in progress...' 
                        : isCompleted 
                        ? 'Recording Complete' 
                        : `Recording starts in ${simCountdown} sec`}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isRecording ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600'}`}>
                      <Mic className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${isRecording ? 'bg-emerald-500 w-3/4' : isCompleted ? 'bg-cyan-500 w-full' : 'bg-[#f1784b] w-1/4'}`}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsRecording(!isRecording);
                          setIsCompleted(false);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition cursor-pointer"
                      >
                        {isRecording ? 'Stop Mic' : 'Simulate Mic'}
                      </button>
                      <button
                        onClick={() => {
                          setSimCountdown(35);
                          setIsRecording(false);
                          setIsCompleted(false);
                        }}
                        className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400">Microphone: Headset Ready</span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-800 leading-relaxed font-serif shadow-2xs">
                  <p>{currentMock.prompt}</p>
                </div>
              </div>
            )}

            {/* Bottom Controls inside test card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setWritingText('');
                  setWritingWordCount(0);
                  setSimCountdown(35);
                  setIsRecording(false);
                  setIsCompleted(false);
                  setReadingDropdowns({});
                  setReadingCheckboxes([]);
                  setReadingRadio(null);
                  setDragSlots({});
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
                  setWritingText('');
                  setWritingWordCount(0);
                  setSimCountdown(35);
                  setIsRecording(false);
                  setIsCompleted(false);
                  setReadingDropdowns({});
                  setReadingCheckboxes([]);
                  setReadingRadio(null);
                  setDragSlots({});
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
            PTE {isWriting ? 'Writing' : isReading ? 'Reading' : currentModule.title.split(' ')[1]} {currentTask.title}
          </button>
          <button
            onClick={() => setSampleModalOpen(true)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
              isWriting || isReading 
                ? 'bg-[#00c2cb] hover:bg-[#00a8b5] text-white shadow-xs' 
                : 'bg-white border border-[#00c2cb] text-[#00c2cb] hover:bg-cyan-50'
            }`}
          >
            {currentTask.title} Sample Questions
          </button>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* How to Respond to This Task Section                                   */}
      {/* --------------------------------------------------------------------- */}
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

            {/* Cut, Copy, Paste instructions for writing tasks */}
            {currentTask.howToRespond?.editingInstructions && (
              <div className="space-y-1.5 pt-2 text-xs sm:text-sm text-slate-700">
                <p>
                  <strong className="text-slate-900 font-bold">Cut:</strong> {currentTask.howToRespond.editingInstructions.cut}
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Copy:</strong> {currentTask.howToRespond.editingInstructions.copy}
                </p>
                <p>
                  <strong className="text-slate-900 font-bold">Paste:</strong> {currentTask.howToRespond.editingInstructions.paste}
                </p>
              </div>
            )}

            {/* Note & Grading highlight */}
            <div className="pt-2 text-xs sm:text-sm text-slate-700 space-y-2">
              {currentTask.howToRespond?.note && (
                <p>
                  <strong className="text-slate-900">Note:</strong> {currentTask.howToRespond?.note}
                </p>
              )}
              {currentTask.howToRespond?.grading && (
                <p>
                  <strong className="text-slate-900 font-bold">Task grading is based on:</strong> {currentTask.howToRespond?.grading}
                </p>
              )}
              {currentTask.howToRespond?.guideText && (
                <p className="text-xs text-slate-600 pt-1">
                  {currentTask.howToRespond?.guideText}
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

      {/* --------------------------------------------------------------------- */}
      {/* FAQs Section                                                          */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-left">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            FAQs
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Here are answers to some of the frequently asked questions.
          </p>
        </div>

        {/* Collapsible FAQ list */}
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

      {/* --------------------------------------------------------------------- */}
      {/* Banner 1: Free Mock Test Callout                                      */}
      {/* --------------------------------------------------------------------- */}
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

      {/* --------------------------------------------------------------------- */}
      {/* Banner 2: Score Calculator Guide Callout                              */}
      {/* --------------------------------------------------------------------- */}
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

      {/* --------------------------------------------------------------------- */}
      {/* Banner 3: Ready to boost score Video Callout                          */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-[#f0f9fa] rounded-2xl p-6 sm:p-8 border border-cyan-100 text-center space-y-2">
          <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {isReading ? (
              'Got any queries about PTE reading?'
            ) : isWriting ? (
              'Struggling with PTE Writing?'
            ) : (
              `Ready to boost your ${activeModule} score?`
            )}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500">
            Watch our strategy videos to improve your {isWriting ? 'Writing' : isReading ? 'Reading' : activeModule} proficiency
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

      {/* --------------------------------------------------------------------- */}
      {/* Sample Question Modal Preview                                         */}
      {/* --------------------------------------------------------------------- */}
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
                {currentMock.passage ? (
                  <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                    <p>{currentMock.passage}</p>
                  </div>
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
