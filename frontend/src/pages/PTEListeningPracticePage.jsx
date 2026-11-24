import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Clock, 
  Maximize2, 
  RotateCcw
} from 'lucide-react';

export default function PTEListeningPracticePage() {
  const [activeTask, setActiveTask] = useState('summarize-spoken-text');
  const [sstInput, setSstInput] = useState('');
  const [dictationInput, setDictationInput] = useState('');
  const [fibAnswers, setFibAnswers] = useState({ 0: '', 1: '', 2: '' });
  const [mcMultiple, setMcMultiple] = useState({ 0: true, 2: false });
  const [mcSingle, setMcSingle] = useState('0');
  const [summaryChoice, setSummaryChoice] = useState('1');
  const [missingWordChoice, setMissingWordChoice] = useState('2');
  const [highlightedIndices, setHighlightedIndices] = useState({ 4: true, 12: true });
  const [faqOpen, setFaqOpen] = useState({ 0: true });

  const sstWordCount = sstInput.trim() ? sstInput.trim().split(/\s+/).length : 0;
  const wfdWordCount = dictationInput.trim() ? dictationInput.trim().split(/\s+/).length : 0;

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleWordHighlight = (index) => {
    setHighlightedIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const tasks = [
    { id: 'summarize-spoken-text', label: 'Summarize Spoken Text', badge: 'SST' },
    { id: 'mc-multiple', label: 'Multiple Choice, Multiple Answers', badge: 'MCMA' },
    { id: 'listening-fib', label: 'Listening Fill in the Blanks', badge: 'LFIB' },
    { id: 'highlight-correct-summary', label: 'Highlight Correct Summary', badge: 'HCS' },
    { id: 'mc-single', label: 'Multiple Choice, Single Answer', badge: 'MCSA' },
    { id: 'select-missing-words', label: 'Select Missing Words', badge: 'SMW' },
    { id: 'highlight-incorrect-words', label: 'Highlight Incorrect Words', badge: 'HIW' },
    { id: 'write-from-dictation', label: 'Write From Dictation', badge: 'WFD' }
  ];

  const taskData = {
    'summarize-spoken-text': {
      title: 'Summarize Spoken Text',
      badge: 'SST',
      desc: "A candidate listens to an academic lecture and drafts a summary of 50 to 70 words. This task evaluates auditory comprehension and academic writing skills with an independent 10-minute timer for each question.",
      specs: {
        task: 'Listen to a recording and compose a 50 - 70 word summary',
        skills: 'Listening and Writing',
        promptLength: '60 - 90 seconds',
        timeToAnswer: '10 minutes per question',
        questions: '1 - 2'
      },
      instruction: 'You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 50 - 70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the lecture.',
      lectureTitle: 'Academic Lecture: "Oceanic Thermohaline Circulation & Climate Stability"',
      tips: [
        'Take concise notes on your erasable notepad while listening, capturing nouns and factual concepts.',
        'Keep your word count strictly between 50 and 70 words. Falling outside this boundary reduces Form marks.',
        'Organize your summary logically: opening theme + key supporting mechanisms + broader implication.',
        'Proofread diligently for academic spelling accuracy and verb agreement before submitting.'
      ],
      faqs: [
        { q: 'Does SST time deduct from the overall Listening test timer?', a: 'No, each Summarize Spoken Text question has its own dedicated 10-minute timer.' },
        { q: 'What is the required word length?', a: 'You must write strictly between 50 and 70 words for full Form scoring.' }
      ]
    },
    'mc-multiple': {
      title: 'Multiple Choice, Multiple Answers',
      badge: 'MCMA',
      desc: 'Listen to a recording and select all correct response options based on the auditory content.',
      specs: {
        task: 'Listen to audio and select all correct options',
        skills: 'Listening',
        promptLength: '40 - 90 seconds',
        timeToAnswer: 'Collective timer',
        questions: '1 - 2'
      },
      instruction: 'Listen to the recording and answer the question by selecting all the correct responses. More than one response is correct.',
      lectureTitle: 'Audio Clip: "Adaptations of Alpine Plant Communities Under Climate Shifts"',
      tips: [
        'Negative marking applies (+1 for correct, -1 for incorrect). Only select answers you are certain about.',
        'If only confident about one option, select just that one to preserve marks.'
      ],
      faqs: [
        { q: 'Is there negative marking?', a: 'Yes, negative marking applies to incorrect selections down to a minimum score of 0.' }
      ]
    },
    'listening-fib': {
      title: 'Listening Fill in the Blanks',
      badge: 'LFIB',
      desc: 'A written transcript with gaps appears on screen while an audio recording plays. Type the missing words you hear into each blank.',
      specs: {
        task: 'Type the missing words heard in the audio recording',
        skills: 'Listening and Writing',
        promptLength: '30 - 60 seconds',
        timeToAnswer: 'Collective timer',
        questions: '2 - 3'
      },
      instruction: 'You will hear a recording. Type the missing words into each blank.',
      lectureTitle: 'Recording: "Urban Acoustic Ecology and Avian Vocalization"',
      tips: [
        'Follow along with your mouse cursor as the audio plays; type words directly or note them on paper.',
        'Check plural forms (-s, -ed) and spelling immediately after the audio concludes.'
      ],
      faqs: [
        { q: 'Does spelling count in Listening FIB?', a: 'Yes, accurate spelling is mandatory to earn credit for each filled blank.' }
      ]
    },
    'highlight-correct-summary': {
      title: 'Highlight Correct Summary',
      badge: 'HCS',
      desc: 'Listen to a recording and select the single paragraph option that best summarizes the auditory lecture.',
      specs: {
        task: 'Select the paragraph that best summarizes the audio',
        skills: 'Listening and Reading',
        promptLength: '30 - 90 seconds',
        timeToAnswer: 'Collective timer',
        questions: '1 - 2'
      },
      instruction: 'You will hear a recording. Click on the paragraph that best relates to the recording.',
      lectureTitle: 'Lecture: "Historical Origins of Planetary Orbital Mechanics"',
      tips: [
        'Focus on the overall main conclusion rather than minor isolated details.',
        'Eliminate options that present factual details not discussed in the audio.'
      ],
      faqs: [
        { q: 'Is there negative marking in Highlight Correct Summary?', a: 'No, this task has no penalty marking.' }
      ]
    },
    'mc-single': {
      title: 'Multiple Choice, Single Answer',
      badge: 'MCSA',
      desc: 'Listen to a recording and answer a multiple-choice question by choosing one correct response.',
      specs: {
        task: 'Listen and select the single correct option',
        skills: 'Listening',
        promptLength: '30 - 60 seconds',
        timeToAnswer: 'Collective timer',
        questions: '1 - 2'
      },
      instruction: 'Listen to the recording and answer the multiple-choice question by selecting the correct response.',
      lectureTitle: 'Audio Clip: "Psychological Principles of Cognitive Framing"',
      tips: [
        'Read the question prompt before the audio starts to know what specific fact to listen for.',
        'Select the response promptly once audio finishes to conserve section time.'
      ],
      faqs: [
        { q: 'How much time should I spend on this item?', a: 'Answer within 20 to 30 seconds after the audio finishes to conserve section time.' }
      ]
    },
    'select-missing-words': {
      title: 'Select Missing Words',
      badge: 'SMW',
      desc: 'Listen to a short recording where the concluding word or phrase is replaced with an audio beep. Select the logically appropriate ending.',
      specs: {
        task: 'Select the concluding word or phrase replaced by a beep',
        skills: 'Listening',
        promptLength: '20 - 70 seconds',
        timeToAnswer: 'Collective timer',
        questions: '1 - 2'
      },
      instruction: 'You will hear a recording about wildlife conservation corridors. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
      lectureTitle: 'Audio Track: "Habitat Fragmentation in Temperate Forest Reserves... [BEEP 🔔]"',
      tips: [
        'Track the speaker’s argumentative trajectory toward the conclusion to anticipate the final concept.',
        'Focus on grammatical conjunctions (such as "therefore", "however") leading into the beep.'
      ],
      faqs: [
        { q: 'Can the audio be replayed?', a: 'No, audio clips play only once across all PTE listening tasks.' }
      ]
    },
    'highlight-incorrect-words': {
      title: 'Highlight Incorrect Words',
      badge: 'HIW',
      desc: 'Follow an on-screen transcript while listening to an audio track. Click any words in the text that differ from what the speaker says.',
      specs: {
        task: 'Click transcript words that differ from the audio speech',
        skills: 'Listening and Reading',
        promptLength: '15 - 50 seconds',
        timeToAnswer: 'Collective timer',
        questions: '2 - 3'
      },
      instruction: 'Below is a transcription of an audio recording. As you listen, click on the words that differ from what the speaker said.',
      lectureTitle: 'Audio Recording: "Paleontological Analysis of Fossilized Amber Deposits"',
      tips: [
        'Follow the words with your mouse pointer at the speaker’s exact pace.',
        'Negative marking applies (+1 for correct word, -1 for false click). Do not click unless certain.'
      ],
      faqs: [
        { q: 'Is there negative marking in HIW?', a: 'Yes, clicking a word that was actually spoken correctly deducts 1 mark.' }
      ]
    },
    'write-from-dictation': {
      title: 'Write From Dictation',
      badge: 'WFD',
      desc: 'Listen to a short sentence spoken once and type it exactly into the input box. One of the highest scoring tasks in the PTE exam.',
      specs: {
        task: 'Listen to a spoken sentence and type it with exact spelling',
        skills: 'Listening and Writing',
        promptLength: '3 - 5 seconds',
        timeToAnswer: 'Collective timer',
        questions: '3 - 4'
      },
      instruction: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.',
      lectureTitle: 'Spoken Audio: "The university library will remain open twenty-four hours during final examinations."',
      tips: [
        'Memorize the initial clause and note initial letters of remaining words on your notepad.',
        'Every correctly spelled word awards 1 point to both Listening and Writing scores.',
        'Always check capitalization of the first word and punctuation at the end.'
      ],
      faqs: [
        { q: 'Why is Write From Dictation so important?', a: 'WFD contributes substantial points to both Listening and Writing total scores.' },
        { q: 'Does spelling accuracy matter in WFD?', a: 'Yes, each correctly spelled word awards 1 point; misspelled words award 0.' }
      ]
    }
  };

  const hiwWords = [
    'Recent', 'scientific', 'surveys', 'indicate', 'substantial', 'alterations',
    'in', 'subterranean', 'aquifer', 'levels', 'across', 'semi-arid',
    'agricultural', 'territories.', 'Hydrogeologists', 'emphasize', 'the', 'critical',
    'necessity', 'for', 'coordinated', 'management', 'to', 'prevent',
    'systemic', 'resource', 'exhaustion.'
  ];

  const current = taskData[activeTask] || taskData['summarize-spoken-text'];

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

      {/* 1. HERO TITLE & MODULE SWITCHER */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Latest PTE Academic & UKVI Listening Questions
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1">
            <Link to="/pte-speaking-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Speaking</Link>
            <Link to="/pte-writing-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Writing</Link>
            <Link to="/pte-reading-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Reading</Link>
            <Link to="/pte-listening-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#00c5cd] text-white shadow-xs transition">Listening</Link>
          </div>

          <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-center max-w-4xl mx-auto">
            <p>
              The Listening module is the final segment of the test, evaluating auditory comprehension, note-taking capability, and vocabulary across native and non-native international English accents. Covering eight unique question varieties, it tests short-term recall, academic transcription, and targeted analysis under unified section timings. Targeted preparation on NinetyPTE equips students with auditory discrimination and note-taking speed.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {tasks.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTask(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTask === t.id
                    ? 'bg-[#4f46e5] text-white shadow-xs'
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
            <div className="w-10 h-10 rounded-full bg-[#4f46e5] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
              {current.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#4f46e5]">
              {current.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {current.desc}
          </p>

          {/* Specs Table matching PDF */}
          <div className="border border-indigo-300/80 rounded-xl overflow-hidden shadow-2xs">
            <div className="grid grid-cols-5 bg-[#4f46e5] text-white text-[11px] sm:text-xs font-bold text-center">
              <div className="p-3 border-r border-indigo-300/60">Task</div>
              <div className="p-3 border-r border-indigo-300/60">Skills assessed</div>
              <div className="p-3 border-r border-indigo-300/60">Prompt length</div>
              <div className="p-3 border-r border-indigo-300/60">Time to answer</div>
              <div className="p-3">Number of questions</div>
            </div>
            <div className="grid grid-cols-5 bg-white text-xs text-slate-700 text-center items-center">
              <div className="p-3 text-left font-normal border-r border-slate-200">{current.specs.task}</div>
              <div className="p-3 font-medium border-r border-slate-200">{current.specs.skills}</div>
              <div className="p-3 border-r border-slate-200">{current.specs.promptLength}</div>
              <div className="p-3 border-r border-slate-200">{current.specs.timeToAnswer}</div>
              <div className="p-3 font-medium">{current.specs.questions}</div>
            </div>
          </div>

          {/* 3. PEARSON UI SIMULATOR */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
              <span className="font-bold text-slate-800 text-sm">Mock Test - 1</span>
              <div className="flex items-center gap-4 text-xs">
                <span className="font-medium text-slate-600">1 of 18</span>
                <span className="font-medium text-slate-600 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  09:42 / 45:00
                </span>
                <Maximize2 className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-900" />
              </div>
            </div>

            {/* Horizontal Test Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#00c5cd] rounded-full w-1/6" />
            </div>

            {/* Inner Test Item Container */}
            <div className="border border-slate-200 rounded-xl p-5 sm:p-6 bg-white space-y-5">
              
              <p className="text-xs sm:text-sm font-bold italic text-slate-700 leading-relaxed">
                {current.instruction}
              </p>

              {/* SHARED AUDIO PLAYER BOX (Authentic Pearson & AlfaPTE layout) */}
              <div className="border border-slate-200/90 rounded-lg p-3.5 bg-white shadow-2xs max-w-lg mx-auto">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Audio Player</span>
                  <span className="text-[#00c5cd] font-semibold">Playing</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2.5">
                  <div className="h-full bg-[#00c5cd] rounded-full w-3/5" />
                </div>
                {current.lectureTitle && (
                  <p className="text-[11px] text-slate-400 italic text-center mt-2">{current.lectureTitle}</p>
                )}
              </div>

            {/* TASK INTERFACE 1: Summarize Spoken Text */}
            {activeTask === 'summarize-spoken-text' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-slate-100 px-3 py-1.5 rounded-t-xl border border-slate-300 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 font-semibold">
                    <span className="px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer">Cut</span>
                    <span className="px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer">Copy</span>
                    <span className="px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer">Paste</span>
                  </div>
                  <div className="font-mono font-bold text-slate-700">{sstWordCount} words (Target: 50 - 70)</div>
                </div>

                <textarea
                  rows={5}
                  placeholder="Draft your lecture summary here in 50 to 70 words..."
                  value={sstInput}
                  onChange={(e) => setSstInput(e.target.value)}
                  className="w-full p-3 rounded-b-xl border border-t-0 border-slate-300 focus:outline-hidden focus:border-[#00c5cd] text-xs font-sans leading-relaxed resize-none"
                />
              </div>
            )}

            {/* TASK INTERFACE 2: Multiple Choice, Multiple Answers */}
            {activeTask === 'mc-multiple' && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="text-xs font-bold text-slate-800">
                  Which two of the following ecological factors were mentioned as primary causes of altitudinal vegetation migration?
                </div>
                <div className="space-y-2.5">
                  {[
                    'Gradual increases in mean annual temperatures at higher elevations.',
                    'Reduction in total atmospheric nitrogen precipitation rates.',
                    'Prolonged seasonal drought periods disrupting seed germination.',
                    'Sudden surges in local herbivore predation populations.'
                  ].map((opt, i) => (
                    <label key={i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={!!mcMultiple[i]}
                        onChange={() => setMcMultiple({ ...mcMultiple, [i]: !mcMultiple[i] })}
                        className="rounded text-indigo-600 focus:ring-indigo-600 w-4 h-4 mt-0.5"
                      />
                      <span className="text-slate-700 leading-snug">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TASK INTERFACE 3: Listening Fill in the Blanks */}
            {activeTask === 'listening-fib' && (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-loose max-w-2xl mx-auto">
                <span>Ecologists investigating vocal adjustments in songbirds noted that ambient traffic rumble compels urban species to increase their vocal </span>
                <input 
                  type="text" 
                  value={fibAnswers[0]}
                  onChange={(e) => setFibAnswers({ ...fibAnswers, 0: e.target.value })}
                  placeholder="type word 1"
                  className="w-28 mx-1 px-2 py-0.5 border-b-2 border-slate-400 focus:border-[#00c5cd] bg-white rounded font-medium text-xs text-center focus:outline-hidden"
                />
                <span>. This acoustic adaptation ensures that critical mating calls remain </span>
                <input 
                  type="text" 
                  value={fibAnswers[1]}
                  onChange={(e) => setFibAnswers({ ...fibAnswers, 1: e.target.value })}
                  placeholder="type word 2"
                  className="w-28 mx-1 px-2 py-0.5 border-b-2 border-slate-400 focus:border-[#00c5cd] bg-white rounded font-medium text-xs text-center focus:outline-hidden"
                />
                <span> despite substantial background interference. Over multiple generations, such environmental pressures foster distinct acoustic </span>
                <input 
                  type="text" 
                  value={fibAnswers[2]}
                  onChange={(e) => setFibAnswers({ ...fibAnswers, 2: e.target.value })}
                  placeholder="type word 3"
                  className="w-28 mx-1 px-2 py-0.5 border-b-2 border-slate-400 focus:border-[#00c5cd] bg-white rounded font-medium text-xs text-center focus:outline-hidden"
                />
                <span> within isolated metropolitan populations.</span>
              </div>
            )}

            {/* TASK INTERFACE 4: Highlight Correct Summary */}
            {activeTask === 'highlight-correct-summary' && (
              <div className="space-y-3 max-w-2xl mx-auto">
                {[
                  'Early astronomers developed mathematical models that mistakenly placed mechanical gear mechanisms at the center of orbital trajectories before empirical telescope observations disproved them.',
                  'Johannes Kepler revolutionized celestial navigation by demonstrating that planetary orbits follow elliptical paths rather than circular geometry, laying foundations for Newton’s universal gravitation laws.',
                  'Historical maritime navigation relied solely on lunar observations until nineteenth-century clockmakers designed marine chronometers capable of measuring precise longitude at sea.',
                  'Galileo’s telescopic observations established that planetary velocities remain constant throughout their entire orbital circuits around the sun.'
                ].map((summary, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                      summaryChoice === String(idx)
                        ? 'border-indigo-500 bg-indigo-50/40 text-slate-900 shadow-2xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="hcs-option"
                      value={String(idx)}
                      checked={summaryChoice === String(idx)}
                      onChange={(e) => setSummaryChoice(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-600 w-4 h-4 mt-0.5"
                    />
                    <span className="leading-relaxed">{summary}</span>
                  </label>
                ))}
              </div>
            )}

            {/* TASK INTERFACE 5: Multiple Choice, Single Answer */}
            {activeTask === 'mc-single' && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="text-xs font-bold text-slate-800">
                  What primary conclusion does the speaker convey regarding cognitive framing in decision-making?
                </div>
                <div className="space-y-2.5">
                  {[
                    'Human choices are substantially influenced by how risks and gains are verbally characterized.',
                    'Analytical individuals make completely objective judgments irrespective of contextual wording.',
                    'Framing effects are entirely confined to financial and commercial consumer environments.',
                    'Visual charts eliminate cognitive biases far more effectively than descriptive statements.'
                  ].map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs cursor-pointer">
                      <input 
                        type="radio"
                        name="mcsa-option"
                        value={String(i)}
                        checked={mcSingle === String(i)}
                        onChange={(e) => setMcSingle(e.target.value)}
                        className="text-indigo-600 focus:ring-indigo-600 w-4 h-4"
                      />
                      <span className="text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TASK INTERFACE 6: Select Missing Words */}
            {activeTask === 'select-missing-words' && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-900 font-semibold">
                  <span>Audio waveform completed with concluding sound effect:</span>
                  <span className="bg-amber-200 text-amber-950 font-black px-2 py-0.5 rounded animate-pulse">[ 🔔 BEEP ]</span>
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Select the option that best completes the audio recording:
                </div>
                <div className="space-y-2">
                  {[
                    'isolated geographic enclaves with no ecological connectivity',
                    'interconnected green corridors to maintain gene flow',
                    'artificial concrete barriers along major highway borders',
                    'unmonitored industrial extraction zones across the valley'
                  ].map((phrase, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs cursor-pointer">
                      <input 
                        type="radio"
                        name="smw-option"
                        value={String(i)}
                        checked={missingWordChoice === String(i)}
                        onChange={(e) => setMissingWordChoice(e.target.value)}
                        className="text-indigo-600 focus:ring-indigo-600 w-4 h-4"
                      />
                      <span className="text-slate-700">{phrase}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TASK INTERFACE 7: Highlight Incorrect Words */}
            {activeTask === 'highlight-incorrect-words' && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="text-xs text-slate-500 font-medium">
                  Click on words in the passage below that differ from the auditory lecture (highlighted in yellow):
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm leading-loose">
                  {hiwWords.map((word, idx) => {
                    const isHighlighted = !!highlightedIndices[idx];
                    return (
                      <span
                        key={idx}
                        onClick={() => toggleWordHighlight(idx)}
                        className={`inline-block mr-1.5 px-1 py-0.5 rounded cursor-pointer transition select-none ${
                          isHighlighted
                            ? 'bg-yellow-200 text-amber-950 font-bold ring-1 ring-yellow-400 shadow-2xs'
                            : 'hover:bg-slate-200/70 text-slate-800'
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Highlighted words: {Object.values(highlightedIndices).filter(Boolean).length}</span>
                  <button 
                    onClick={() => setHighlightedIndices({})}
                    className="flex items-center gap-1 text-slate-600 hover:text-rose-500 text-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear Highlights
                  </button>
                </div>
              </div>
            )}

            {/* TASK INTERFACE 8: Write From Dictation */}
            {activeTask === 'write-from-dictation' && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
                    <span>Type exact sentence:</span>
                    <span className="font-mono text-slate-700 font-bold">{wfdWordCount} words</span>
                  </div>
                  <input
                    type="text"
                    value={dictationInput}
                    onChange={(e) => setDictationInput(e.target.value)}
                    placeholder="Type the sentence you heard here..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#00c5cd] text-xs font-sans shadow-2xs"
                  />
                  <div className="text-[11px] text-slate-500 italic">
                    Tip: Ensure capitalization of the first letter and full stop at the end. Spelling accuracy is vital.
                  </div>
                </div>
              </div>
            )}

              {/* Mock Test Card Navigation Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button className="px-5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-medium transition cursor-pointer">
                  Save & Exit
                </button>
                <button className="px-6 py-1.5 rounded-lg bg-[#00c5cd] hover:bg-[#00b2ba] text-white text-xs font-bold shadow-xs transition cursor-pointer">
                  Next &gt;
                </button>
              </div>

            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-5 py-2.5 rounded-full bg-[#00c5cd] text-white font-extrabold text-xs shadow-xs hover:bg-[#00a8b5] transition">PTE Listening {current.title}</button>
            <button className="px-5 py-2.5 rounded-full bg-[#00c5cd] text-white font-extrabold text-xs shadow-xs hover:bg-[#00a8b5] transition">{current.title} Sample Questions</button>
          </div>
        </div>
      </section>

      {/* 4. TIPS */}
      <section className="py-12 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                How to <span className="text-[#00c5cd]">Respond to</span> This Task?
              </h2>

              <div className="space-y-3 pt-1">
                {current.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="text-[#00c5cd] font-bold mt-0.5">✦</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link to="/pte-online-course" className="px-6 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition">Detailed Question-wise Page</Link>
                <Link to="/pte-exam-pattern" className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#00c5cd] text-white font-extrabold text-xs shadow-sm transition">Sample Questions</Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-sm w-full bg-slate-900">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80" alt="Student listening with headphones" className="w-full h-72 object-cover opacity-85" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-xl border border-indigo-200 text-center space-y-1">
                  <div className="text-[10px] uppercase font-mono font-black text-indigo-600">{current.title}</div>
                  <div className="text-base font-black text-slate-900 flex items-center justify-center gap-1"><span>TIPS</span><span className="text-indigo-500">💡</span></div>
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
                  <button onClick={() => toggleFaq(idx)} className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c5cd] transition-colors cursor-pointer">
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#00c5cd]' : ''}`} />
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
          <div><Link to="/mock-tests" className="px-8 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">Join Now</Link></div>
        </div>

        <div className="rounded-3xl p-6 sm:p-8 text-center space-y-4 border border-slate-200 bg-white shadow-2xs">
          <h3 className="text-sm sm:text-base font-black text-slate-900 max-w-2xl mx-auto leading-relaxed">Want to understand how PTE score calculation works? Check our PTE score calculator guide & understand the academic integrated scoring system.</h3>
          <div><Link to="/pte-score-calculator" className="px-8 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">Learn More</Link></div>
        </div>

        <div className="rounded-3xl p-8 text-center space-y-3 bg-[#f0f9fa] border border-cyan-100">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Ready to boost your listening score?</h3>
          <p className="text-xs text-slate-600">Watch our strategy videos to improve your Listening proficiency</p>
          <div className="pt-2"><Link to="/pte-online-course" className="px-8 py-2.5 rounded-full bg-[#00c5cd] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">View Now</Link></div>
        </div>
      </section>

    </div>
  );
}
