import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Clock, 
  Play, 
  Pause,
  RotateCcw, 
  ChevronDown, 
  Maximize2, 
  Mic, 
  Volume2, 
  Sparkles, 
  CheckCircle, 
  BookOpen, 
  Lightbulb, 
  ArrowRight, 
  ExternalLink,
  HelpCircle,
  Award,
  Layers,
  FileText
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

  // Simulator state
  const [simQuestionIdx, setSimQuestionIdx] = useState(0);
  const [simCountdown, setSimCountdown] = useState(35);
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

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
    setSimCountdown(currentTask?.table?.prepSeconds || 35);
    setIsRecording(false);
    setIsCompleted(false);
    setAudioPlaying(false);
  }, [activeTaskId]);

  // Countdown timer effect
  useEffect(() => {
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
      // Simulate 10-second recording period
      timer = setTimeout(() => {
        setIsRecording(false);
        setIsCompleted(true);
      }, 8000);
    }
    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [simCountdown, isRecording, isCompleted]);

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
          badgeColor: 'bg-[#e77342]',
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
            },
            {
              instruction: 'Look at the text below. In 35 seconds, you must read this text aloud as naturally and clearly as possible. You have 35 seconds to read aloud.',
              prompt: "Marine biology encompasses the study of organisms residing in salt water bodies, including oceans, coastal marshes, and estuarine habitats. Researchers investigate behavioral adaptations, metabolic physiology, and interspecies symbiotic relationships under shifting climatic conditions.",
              tips: 'Stress polysyllabic academic terminology like metabolic and physiological accurately.',
              modelScore: '90/90 - Exemplary content preservation and vocal projection'
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
          badgeColor: 'bg-[#e77342]',
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
          badgeColor: 'bg-[#e77342]',
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
        },
        {
          id: 'retell-lecture',
          code: 'RL',
          title: 'Re-Tell Lecture',
          badgeColor: 'bg-[#e77342]',
          tagline:
            'Re-Tell Lecture tests your ability to synthesize information from a spoken academic lecture and deliver an organized spoken summary.',
          table: {
            taskDesc: 'Listen to an audio lecture and verbally summarize the key arguments and conclusions',
            skills: 'Speaking & Listening',
            promptLength: 'Up to 90 seconds audio / video',
            prepTime: '10 seconds',
            answerTime: '40 seconds',
            questionCount: '1 - 2',
            prepSeconds: 10
          },
          mockQuestions: [
            {
              instruction: 'You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words. You will have 40 seconds to give your response.',
              prompt: 'Audio Lecture Excerpt: "Urban planning in the twenty-first century increasingly revolves around sustainable transit systems. By transitioning metropolitan centers from private automobile dependency to high-capacity electric light rails and active cycling corridors, municipalities achieve measurable reductions in greenhouse gas emissions while simultaneously enhancing community public health metrics."',
              tips: 'Write down 4-5 key content phrases during listening, then deliver them within a smooth lecture template.',
              modelScore: '90/90 - Full coverage of core lecture arguments with smooth academic cadence'
            }
          ],
          howToRespond: {
            bullets: [
              'Note down core themes and keywords (nouns, verbs, specific findings) while the lecture plays.',
              'Use your 10-second prep window to organize your notes into a coherent flow.',
              'Begin with a strong topic statement: "The speaker discussed..."',
              'Link points with transitions: "Furthermore, the lecture highlighted..."',
              'Conclude smoothly: "In conclusion, the presentation demonstrated that..."'
            ],
            note: 'Microphone opens after a short tone following the 10-second preparation countdown.',
            grading: 'Content, Oral Fluency, and Pronunciation.',
            tipsBadge: 'Re-Tell Lecture TIPS'
          },
          faqs: [
            {
              q: 'How many questions of Re-Tell Lecture appear in the exam?',
              a: 'Typically 1 to 2 questions appear in the current 2-hour PTE Academic / UKVI test format.'
            },
            {
              q: 'Can I use a template for Re-Tell Lecture?',
              a: 'Yes, a standard structural template helps maintain high oral fluency and confidence while inserting the specific lecture keywords.'
            }
          ]
        },
        {
          id: 'answer-short-question',
          code: 'ASQ',
          title: 'Answer Short Question',
          badgeColor: 'bg-[#e77342]',
          tagline:
            'Answer Short Question evaluates your vocabulary knowledge and immediate audio comprehension with single-word or short-phrase spoken responses.',
          table: {
            taskDesc: 'Listen to a question and reply with a single word or brief phrase',
            skills: 'Speaking & Listening',
            promptLength: '3 - 9 seconds audio',
            prepTime: 'None',
            answerTime: '10 seconds',
            questionCount: '5 - 6',
            prepSeconds: 2
          },
          mockQuestions: [
            {
              instruction: 'You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.',
              prompt: 'Audio Question: "What instrument is used by astronomers to view distant stars and galaxies?"',
              tips: 'Speak immediately when microphone turns on. Acceptable answers: "Telescope" or "A telescope".',
              modelScore: '90/90 - Precise vocabulary response'
            }
          ],
          howToRespond: {
            bullets: [
              'Listen attentively to the short audio question.',
              'Speak a concise answer (usually 1 to 3 words) as soon as the mic opens.',
              'Do not speak in full sentences; e.g., say "Thermometer", not "The instrument used is a thermometer".',
              'If uncertain, guess an educated synonym related to the academic domain.'
            ],
            note: 'There is no prep time; answer immediately upon audio completion.',
            grading: 'Vocabulary accuracy (1 point for correct term, 0 for incorrect).',
            tipsBadge: 'Short Question TIPS'
          },
          faqs: [
            {
              q: 'Do I need to answer in a complete sentence?',
              a: 'No. Single word or short phrase answers are ideal and preferred.'
            },
            {
              q: 'Are articles like "a" or "the" required?',
              a: 'Either is acceptable. Saying "telescope" or "a telescope" receives full marks.'
            }
          ]
        },
        {
          id: 'summarize-group-discussion',
          code: 'SGD',
          title: 'Summarize Group Discussion',
          badgeColor: 'bg-[#e77342]',
          tagline:
            'A modern PTE task where you listen to a multi-speaker academic dialogue and synthesize distinct perspectives, agreements, and outcomes.',
          table: {
            taskDesc: 'Listen to an audio conversation between 2-3 speakers and provide a spoken summary of the consensus',
            skills: 'Speaking & Listening',
            promptLength: '90 - 120 seconds audio',
            prepTime: '10 seconds',
            answerTime: '120 seconds (2 minutes)',
            questionCount: '1 - 2',
            prepSeconds: 10
          },
          mockQuestions: [
            {
              instruction: 'You will hear three university researchers discussing budget allocation for a collaborative robotics laboratory. After the audio, summarize the main points of disagreement and final agreement reached.',
              prompt: 'Audio Dialogue: "Dr. Chen emphasized prioritizing sensory micro-controllers, whereas Prof. Davis argued that funding should first expand clean-room safety protocols. Following deliberation, they agreed to partition the initial grant 60-40 toward sensors while seeking supplementary institutional backing."',
              tips: 'Distinguish speaker stances and articulate the final resolution clearly.',
              modelScore: '90/90 - Coherent synthesis of multi-party positions'
            }
          ],
          howToRespond: {
            bullets: [
              'Note speaker initials and their distinct priorities or recommendations.',
              'Identify the central point of friction or debate.',
              'Record the final resolution or agreed next steps.',
              'Deliver a structured summary: Context -> Divergent views -> Final consensus.'
            ],
            note: 'Ensure you address all major viewpoints raised in the dialogue.',
            grading: 'Content synthesis, discourse structure, oral fluency, and pronunciation.',
            tipsBadge: 'Group Discussion TIPS'
          },
          faqs: [
            {
              q: 'Is Summarize Group Discussion included in both PTE Academic and UKVI?',
              a: 'Yes, it is incorporated across updated PTE testing versions alongside real-world communicative evaluations.'
            }
          ]
        },
        {
          id: 'respond-to-situation',
          code: 'RTS',
          title: 'Respond to a Situation',
          badgeColor: 'bg-[#e77342]',
          tagline:
            'Tests your practical communicative competence by presenting an everyday university or workplace scenario that requires a polite, spoken resolution.',
          table: {
            taskDesc: 'Read and listen to a scenario prompt, then record an appropriate oral response',
            skills: 'Speaking',
            promptLength: 'Brief text & audio prompt',
            prepTime: '20 seconds',
            answerTime: '40 seconds',
            questionCount: '1 - 2',
            prepSeconds: 20
          },
          mockQuestions: [
            {
              instruction: 'Listen to and read the situation below. You will have 20 seconds to prepare and 40 seconds to speak your response.',
              prompt: 'Scenario: "You scheduled an appointment with your academic advisor for tomorrow at 2 PM, but you have an urgent medical emergency. Call or speak to your advisor to apologize, explain the reason, and request to reschedule for later this week."',
              tips: 'Use polite, formal register: "Good afternoon Professor, I am calling to sincerely apologize, but unfortunately..."',
              modelScore: '90/90 - Highly appropriate tone, clear explanation and courteous reschedule proposal'
            }
          ],
          howToRespond: {
            bullets: [
              'Read the context, role, and objective carefully.',
              'Determine the appropriate register: formal (professor/manager) vs. semi-formal (peer).',
              'State your purpose immediately, provide the concise reason, and propose a practical solution.',
              'Close with courteous gratitude.'
            ],
            note: 'Maintain natural conversational intonation and professional courtesy.',
            grading: 'Appropriateness of language, fluency, pronunciation, and grammatical control.',
            tipsBadge: 'Respond to Situation TIPS'
          },
          faqs: [
            {
              q: 'What register should I adopt for Respond to a Situation?',
              a: 'Adopt the tone required by the prompt. Academic and professional scenarios require formal, respectful vocabulary and polite phrasing.'
            }
          ]
        }
      ]
    },

    writing: {
      title: 'PTE Writing Practice',
      subtitle: 'Latest PTE Academic & UKVI Writing Questions',
      overview:
        "The PTE Writing module evaluates your capacity to compose clear, grammatically sound, and academically coherent written English. Spanning Summarize Written Text and Write Essay, this section tests concise synthesis, sentence boundary control, logical argument progression, and academic lexical range. Practice on NinetyPTE gives you instantaneous AI grading across grammar, vocabulary, spelling, and discourse structure.",
      tasks: [
        {
          id: 'summarize-written-text',
          code: 'SWT',
          title: 'Summarize Written Text',
          badgeColor: 'bg-indigo-600',
          tagline:
            'Summarize Written Text challenges you to condense an academic passage of up to 300 words into a single, comprehensive sentence of between 5 and 75 words.',
          table: {
            taskDesc: 'Read a passage and write a one-sentence summary containing the key ideas',
            skills: 'Reading & Writing',
            promptLength: 'Passage up to 300 words',
            prepTime: 'Integrated (10 minutes total per task)',
            answerTime: '10 minutes',
            questionCount: '1 - 2',
            prepSeconds: 10
          },
          mockQuestions: [
            {
              instruction: 'Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.',
              prompt: 'Passage: "Over the last century, advances in agricultural engineering and synthetic fertilizer deployment triggered exponential increases in global crop yields. However, persistent chemical runoff has precipitated widespread eutrophication in freshwater ecosystems, severely degrading aquatic biodiversity. Environmental scientists now advocate for precision regenerative farming practices that optimize nutrient distribution while safeguarding subterranean water tables."',
              tips: 'Formulate a compound-complex sentence: [Although agricultural advances increased yields], [chemical runoff caused ecological degradation], [prompting scientists to advocate for precision regenerative practices].',
              modelScore: '90/90 - Exactly 1 sentence, 38 words, perfect punctuation and core concept coverage'
            }
          ],
          howToRespond: {
            bullets: [
              'Your summary must be strictly ONE sentence (ending with exactly one full stop).',
              'Keep word count within 35 to 50 words for optimal grammatical safety.',
              'Use appropriate coordinating and subordinating conjunctions (e.g., although, whereas, thereby).',
              'Ensure all primary topic sentences from the passage are synthesized.',
              'Proofread for subject-verb agreement and punctuation before the 10-minute timer finishes.'
            ],
            note: 'Writing more than one sentence or exceeding 75 words yields a score of 0 for Form.',
            grading: 'Content, Form (1 sentence, 5-75 words), Grammar, and Vocabulary.',
            tipsBadge: 'Summarize Text TIPS'
          },
          faqs: [
            {
              q: 'Can I use semicolons in Summarize Written Text?',
              a: 'Yes, semicolons are permissible as long as the entire response constitutes a single grammatical sentence ending with one period.'
            },
            {
              q: 'What is the ideal word count for SWT?',
              a: 'The sweet spot is 35 to 45 words. This allows complete coverage of key points while minimizing grammar and punctuation risks.'
            }
          ]
        },
        {
          id: 'write-essay',
          code: 'WE',
          title: 'Write Essay',
          badgeColor: 'bg-indigo-600',
          tagline:
            'Write Essay requires you to write a 200–300 word argumentative or analytical essay on an academic or societal issue within 20 minutes.',
          table: {
            taskDesc: 'Write a persuasive essay of 200-300 words on the assigned prompt',
            skills: 'Writing',
            promptLength: '2 - 3 sentences prompt',
            prepTime: 'Integrated (20 minutes total)',
            answerTime: '20 minutes',
            questionCount: '1 - 2',
            prepSeconds: 10
          },
          mockQuestions: [
            {
              instruction: 'You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200-300 words.',
              prompt: 'Essay Topic: "Some individuals believe that automated artificial intelligence will soon replace human educators in schools and universities. Others argue that emotional intelligence and mentorship make human teachers irreplaceable. Discuss both views and give your own opinion."',
              tips: 'Structure: Paragraph 1 (Introduction & Thesis), Paragraph 2 (Arguments for AI benefits), Paragraph 3 (Arguments for human mentorship), Paragraph 4 (Conclusion & Personal Stance).',
              modelScore: '90/90 - 265 words, rich vocabulary, cohesive transitions, zero spelling errors'
            }
          ],
          howToRespond: {
            bullets: [
              'Target 220 to 270 words to comfortably meet requirements without rushing.',
              'Allocate 2 minutes for planning, 14 minutes for writing, and 4 minutes for rigorous proofreading.',
              'Maintain a 4-paragraph academic essay architecture.',
              'Use academic linking words: "Consequently", "On the other hand", "Furthermore".',
              'Avoid colloquial language, abbreviations, and informal slang.'
            ],
            note: 'Writing fewer than 120 words or more than 380 words receives 0 marks for Form.',
            grading: 'Content, Development, Structure, Form, General Linguistic Range, Grammar, Spelling, and Vocabulary.',
            tipsBadge: 'Write Essay TIPS'
          },
          faqs: [
            {
              q: 'Can I use NinetyPTE essay templates?',
              a: 'Yes! Using NinetyPTE\'s tested academic essay frameworks guarantees proper paragraph progression, cohesive discourse markers, and time management.'
            },
            {
              q: 'Does British vs. American spelling matter?',
              a: 'You may use either British or American English, but you must remain consistent throughout the entire essay.'
            }
          ]
        }
      ]
    },

    reading: {
      title: 'PTE Reading Practice',
      subtitle: 'Latest PTE Academic & UKVI Reading Questions',
      overview:
        "The PTE Reading section tests your ability to comprehend written academic texts, determine syntactic collocations, analyze logical discourse relationships, and interpret scholarly arguments. It features five question types that evaluate both reading comprehension and integrated writing skills.",
      tasks: [
        {
          id: 'rw-fill-in-blanks',
          code: 'R&W FIB',
          title: 'Reading & Writing: Fill in the Blanks',
          badgeColor: 'bg-emerald-600',
          tagline:
            'The highest-scoring reading task where you select the appropriate word from drop-down menus within an academic passage.',
          table: {
            taskDesc: 'A passage with missing words is displayed. Select the correct option from drop-downs',
            skills: 'Reading & Writing',
            promptLength: 'Up to 300 words with 4 - 5 blanks',
            prepTime: 'Integrated module timing (~2 mins per question)',
            answerTime: 'Timer shared across Reading section',
            questionCount: '5 - 6',
            prepSeconds: 5
          },
          mockQuestions: [
            {
              instruction: 'Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank.',
              prompt: 'Text: "Behavioral economists have long recognized that human financial choices frequently deviate from classical rationality. When evaluated under conditions of acute uncertainty, consumers consistently exhibit risk [aversion / hostility / prevention / resistance] rather than calculating objective probability matrices."',
              tips: 'Look at preposition collocations: "risk aversion" is the standard economic collocation.',
              modelScore: '90/90 - Complete accuracy in academic collocations'
            }
          ],
          howToRespond: {
            bullets: [
              'Read the sentence surrounding the blank to determine parts of speech needed (verb, noun, adjective).',
              'Check immediate prepositions before and after the gap.',
              'Eliminate options that conflict with grammatical tense or number agreement.',
              'Ensure the selected word fits the overall semantic tone of the scholarly passage.'
            ],
            note: 'This task contributes significant marks to your Writing score as well as Reading.',
            grading: '1 mark for each correctly selected blank.',
            tipsBadge: 'R&W Blanks TIPS'
          },
          faqs: [
            {
              q: 'How many marks is each blank worth?',
              a: 'Each correctly identified drop-down choice awards 1 point toward both Reading and Writing modules.'
            }
          ]
        },
        {
          id: 'reorder-paragraphs',
          code: 'RO',
          title: 'Re-order Paragraphs',
          badgeColor: 'bg-emerald-600',
          tagline:
            'Test your understanding of academic text cohesion by organizing jumbled sentences into their original logical sequence.',
          table: {
            taskDesc: 'Drag and drop jumbled text boxes into their correct chronological or logical order',
            skills: 'Reading',
            promptLength: '4 - 5 text boxes (up to 150 words)',
            prepTime: 'Integrated section timing (~2 mins)',
            answerTime: 'Shared section timer',
            questionCount: '2 - 3',
            prepSeconds: 5
          },
          mockQuestions: [
            {
              instruction: 'The text boxes in the left panel have been deliberately jumbled. Order them by dragging the text boxes into the right panel.',
              prompt: 'Items: [A: These sensors transmit telemetric data to ground monitors.] [B: Modern satellites rely on sophisticated atmospheric sensors.] [C: The ground systems then process the incoming metrics.] [D: Consequently, meteorologists can anticipate severe weather anomalies.]',
              tips: 'Identify the standalone topic sentence first (B), then follow referential pronouns (These sensors -> A), consequence (C), and conclusion (D).',
              modelScore: '90/90 - Perfect pair linking: B-A, A-C, C-D'
            }
          ],
          howToRespond: {
            bullets: [
              'Identify the independent topic sentence that introduces the subject without pronouns or transition words.',
              'Locate anaphoric references (e.g., "these instruments", "this method").',
              'Score is awarded for contiguous correct pairs (e.g., Pair 1-2, Pair 2-3).',
              'Read the reconstructed passage from beginning to end to check logical flow.'
            ],
            note: 'Marks are given per correct adjacent pair, not individual placement.',
            grading: '1 point per correct contiguous adjacent pair.',
            tipsBadge: 'Re-order TIPS'
          },
          faqs: [
            {
              q: 'How does pair scoring work in Re-order Paragraphs?',
              a: 'If the correct order is A-B-C-D, there are 3 possible pairs: (A-B), (B-C), (C-D). Each correct adjacent pair earns 1 mark.'
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
          badgeColor: 'bg-amber-600',
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
          badgeColor: 'bg-amber-600',
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

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* --------------------------------------------------------------------- */}
      {/* Sticky Right "Practice Now" Action Pill (Matching Page 1 screenshot)   */}
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
            PTE <span className="text-[#00c2cb]">Speaking</span> Practice
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
            {currentModule.tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => setActiveTaskId(task.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeTaskId === task.id
                    ? 'bg-white border-2 border-[#e77342] text-[#e77342] shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {task.title}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Active Task Detail & Specification Table (Page 1)                     */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Task Title Header with circular badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f1784b] text-white font-black text-sm flex items-center justify-center shadow-xs">
            {currentTask.code}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#f1784b]">
              {currentTask.title}
            </h2>
          </div>
        </div>

        {/* Task Tagline Description */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-5xl">
          {currentTask.tagline}
        </p>

        {/* Task Specification Table (Peach/Orange rounded header bar) */}
        <div className="mt-6 overflow-x-auto rounded-2xl shadow-sm border border-slate-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f1784b] text-white font-bold text-center">
                <th className="py-3 px-4 text-xs font-semibold border-r border-[#ea6b3c]/50">Task</th>
                <th className="py-3 px-4 text-xs font-semibold border-r border-[#ea6b3c]/50">Skills assessed</th>
                <th className="py-3 px-4 text-xs font-semibold border-r border-[#ea6b3c]/50">Prompt length</th>
                <th className="py-3 px-4 text-xs font-semibold border-r border-[#ea6b3c]/50">Preparation time</th>
                <th className="py-3 px-4 text-xs font-semibold border-r border-[#ea6b3c]/50">Time to answer</th>
                <th className="py-3 px-4 text-xs font-semibold">Number of questions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-center font-medium">
              <tr className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-4 text-xs text-slate-800 font-semibold border-r border-slate-100 max-w-[200px]">
                  {currentTask.table.taskDesc}
                </td>
                <td className="py-4 px-4 text-xs border-r border-slate-100 whitespace-nowrap">
                  {currentTask.table.skills}
                </td>
                <td className="py-4 px-4 text-xs border-r border-slate-100 whitespace-nowrap">
                  {currentTask.table.promptLength}
                </td>
                <td className="py-4 px-4 text-xs border-r border-slate-100 max-w-[150px]">
                  {currentTask.table.prepTime}
                </td>
                <td className="py-4 px-4 text-xs border-r border-slate-100 max-w-[150px]">
                  {currentTask.table.answerTime}
                </td>
                <td className="py-4 px-4 text-xs font-bold text-slate-900 whitespace-nowrap">
                  {currentTask.table.questionCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Interactive Mock Test Simulator (Page 1)                              */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-xl shadow-md border border-slate-300 overflow-hidden">
          
          {/* Top Simulator Header Bar */}
          <div className="border-t-4 border-cyan-500 bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between text-xs font-semibold text-slate-600">
            <div className="font-bold text-slate-800">
              Mock Test - 1
            </div>
            <div className="text-slate-500">
              {simQuestionIdx + 1} of {currentTask.mockQuestions?.length || 29}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                00:{simCountdown < 10 ? `0${simCountdown}` : simCountdown} / 45:36
              </span>
              <button 
                onClick={() => setSampleModalOpen(!sampleModalOpen)} 
                title="Toggle Expanded View" 
                className="text-slate-400 hover:text-slate-700 transition"
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

            {/* Audio Recorder / Status Box */}
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

              {/* Progress visualizer */}
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

              {/* Interactive buttons */}
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

            {/* Prompt Content Card */}
            <div className="border border-slate-200 rounded-lg p-5 bg-white text-xs sm:text-sm text-slate-800 leading-relaxed font-serif shadow-2xs">
              <p>{currentMock.prompt}</p>
            </div>

            {/* Bottom Controls inside test card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSimCountdown(35);
                  setIsRecording(false);
                  setIsCompleted(false);
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
                  setSimCountdown(35);
                  setIsRecording(false);
                  setIsCompleted(false);
                }}
                className="px-6 py-2 rounded-md bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <span>&gt;</span>
              </button>
            </div>

          </div>
        </div>

        {/* Action pills below simulator (Page 1) */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSampleModalOpen(true)}
            className="px-5 py-2 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            PTE {currentModule.title.split(' ')[1]} {currentTask.title}
          </button>
          <button
            onClick={() => setSampleModalOpen(true)}
            className="px-5 py-2 rounded-full bg-white border border-[#00c2cb] text-[#00c2cb] hover:bg-cyan-50 text-xs font-bold transition cursor-pointer"
          >
            {currentTask.title} Sample Questions
          </button>
        </div>

      </section>

      {/* --------------------------------------------------------------------- */}
      {/* How to Respond to This Task Section (Page 1 & 2)                      */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Instructions Column */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to <span className="text-[#00c2cb]">Respond to</span> This Task?
            </h3>

            {/* Bullets with cyan diamond icons */}
            <div className="space-y-3 pt-2">
              {currentTask.howToRespond?.bullets?.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <span className="text-[#00c2cb] font-bold text-sm shrink-0 mt-0.5">✦</span>
                  <p>{bullet}</p>
                </div>
              ))}
            </div>

            {/* Note & Grading highlight */}
            <div className="pt-2 text-xs text-slate-700 space-y-2">
              <p>
                <strong className="text-slate-900">Note:</strong> {currentTask.howToRespond?.note}
              </p>
              <p>
                Task grading is based on: <strong className="text-slate-900">{currentTask.howToRespond?.grading}</strong>
              </p>
            </div>

            {/* CTA action buttons */}
            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                to="/mock-tests"
                className="px-5 py-2.5 rounded-lg bg-[#008f99] hover:bg-[#007b85] text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                Detailed Question-wise Page
              </Link>
              <button
                onClick={() => setSampleModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-[#008f99] hover:bg-[#007b85] text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                Sample Questions
              </button>
            </div>
          </div>

          {/* Right Visual Graphic with Tips Lightbulb Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group">
              
              {/* Floating Yellow "TIPS" Badge (Page 1) */}
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2">
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {currentTask.title}
                  </div>
                  <div className="text-sm font-black text-slate-900 tracking-tight">
                    TIPS
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs">
                  <Lightbulb className="w-4 h-4 fill-current stroke-[2.5]" />
                </div>
              </div>

              {/* Representative Instructor Photo */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="PTE Speaking Coach"
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
      {/* FAQs Section (Page 2)                                                 */}
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
      {/* Banner 1: Free Mock Test Callout (Page 2)                             */}
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
      {/* Banner 2: Score Calculator Guide Callout (Page 2)                     */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-slate-800 max-w-2xl mx-auto leading-relaxed">
            Want to understand how PTE score calculation works? Check our PTE score calculator guide & understand the academic integrated scoring system.
          </h4>
          <div>
            <Link
              to="/about-pte#weightage"
              className="inline-block px-7 py-2.5 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-bold text-xs transition shadow-xs cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* Banner 3: Ready to boost score Video Callout (Page 2)                 */}
      {/* --------------------------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-[#f0f9fa] rounded-2xl p-6 sm:p-8 border border-cyan-100 text-center space-y-2">
          <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Ready to boost your {activeModule} score?
          </h4>
          <p className="text-xs sm:text-sm text-slate-500">
            Watch our strategy videos to improve your {activeModule} proficiency
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
                <div className="w-8 h-8 rounded-full bg-[#f1784b] text-white font-bold text-xs flex items-center justify-center">
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
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-serif leading-relaxed">
                <p className="font-sans text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Sample Practice Prompt:
                </p>
                {currentMock.prompt}
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>Model AI Benchmark Response:</span>
                </div>
                <p className="font-semibold text-xs text-emerald-800">
                  {currentMock.modelScore}
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-700">
                  <Lightbulb className="w-4 h-4" />
                  <span>Expert Scoring Advice:</span>
                </div>
                <p className="text-xs text-amber-800">
                  {currentMock.tips}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSampleModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
              <Link
                to="/mock-tests"
                className="px-5 py-2 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-bold transition cursor-pointer"
              >
                Take Full Mock Test
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
