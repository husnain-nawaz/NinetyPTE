import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Headphones, 
  ChevronDown, 
  Clock, 
  Maximize2, 
  Volume2, 
  ArrowRight
} from 'lucide-react';

export default function PTEListeningPracticePage() {
  const [activeTask, setActiveTask] = useState('summarize-spoken-text');
  const [textInput, setTextInput] = useState('');
  const [faqOpen, setFaqOpen] = useState({ 0: true });

  const wordCount = textInput.trim() ? textInput.trim().split(/\s+/).length : 0;

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
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
        timeToAnswer: '10 minutes',
        questions: '1 - 2'
      },
      instruction: 'You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 50 - 70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the lecture.',
      samplePrompt: 'Academic Lecture: "Renewable energy storage systems and battery cell chemistry advancements in modern power grids."',
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
      instruction: 'Listen to the recording and answer the question by selecting all the correct responses.',
      samplePrompt: 'Audio Clip: "Environmental adaptations of boreal coniferous forest vegetation."',
      tips: [
        'Negative marking applies (+1 for correct, -1 for incorrect). Only select answers you are certain about.'
      ],
      faqs: [
        { q: 'Is there negative marking?', a: 'Yes, negative marking applies to incorrect selections down to 0.' }
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
      samplePrompt: 'Transcript with 4 to 6 omitted words matching audio playback.',
      tips: [
        'Follow along with your mouse cursor as the audio plays; type words or write them on your notepad.',
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
      samplePrompt: 'Audio Clip: "Historical developments in maritime navigation instruments."',
      tips: [
        'Focus on the overall main conclusion rather than minor isolated details.'
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
      samplePrompt: 'Audio Clip: "Principles of psychological behavioral conditioning."',
      tips: [
        'Read the question prompt before the audio starts to know what specific fact to listen for.'
      ],
      faqs: [
        { q: 'How much time should I spend on this item?', a: 'Answer within 30 seconds after the audio finishes to conserve section time.' }
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
      instruction: 'You will hear a recording about an academic subject. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
      samplePrompt: 'Audio Clip: "Trends in urban migration... [BEEP]"',
      tips: [
        'Track the speaker’s argumentative trajectory toward the conclusion to anticipate the final concept.'
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
      samplePrompt: 'Transcript text with subtle lexical alterations from audio track.',
      tips: [
        'Follow the words with your mouse pointer at the speaker’s exact pace.',
        'Negative marking applies (+1 for correct word, -1 for false click). Do not guess randomly.'
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
      samplePrompt: '"The university library will remain open twenty-four hours during final examinations."',
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

  const current = taskData[activeTask] || taskData['summarize-spoken-text'];

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
            PTE <span className="text-[#00c2cb]">Listening</span> Practice
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            Latest PTE Academic & UKVI Listening Questions
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
            <Link to="/pte-speaking-practice" className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition">Speaking</Link>
            <Link to="/pte-writing-practice" className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition">Writing</Link>
            <Link to="/pte-reading-practice" className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition">Reading</Link>
            <Link to="/pte-listening-practice" className="px-6 py-2.5 rounded-full text-xs font-black bg-[#00c2cb] text-white shadow-sm transition">Listening</Link>
          </div>

          <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-left max-w-4xl mx-auto">
            <p>
              The PTE Listening module is the concluding segment of PTE Academic / UKVI, evaluating comprehension across varied native and non-native international English accents. Covering eight distinct task formats, it tests listening memory, spelling precision, and analytical listening under unified section timing. Targeted preparation on NinetyPTE equips students with auditory discrimination and note-taking speed.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {tasks.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTask(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  activeTask === t.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-400'
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
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
              {current.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-indigo-700">
              {current.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {current.desc}
          </p>

          <div className="bg-white rounded-2xl overflow-hidden border border-indigo-200/90 shadow-2xs">
            <div className="grid grid-cols-5 bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-[11px] sm:text-xs font-black p-3 text-center">
              <div>Task</div>
              <div>Skills assessed</div>
              <div>Prompt length</div>
              <div>Time to answer</div>
              <div>Number of questions</div>
            </div>
            <div className="grid grid-cols-5 p-4 text-xs text-slate-700 text-center items-center gap-2 bg-indigo-50/20">
              <div className="text-left font-medium">{current.specs.task}</div>
              <div className="font-semibold">{current.specs.skills}</div>
              <div>{current.specs.promptLength}</div>
              <div>{current.specs.timeToAnswer}</div>
              <div className="font-bold">{current.specs.questions}</div>
            </div>
          </div>

          {/* 3. SIMULATOR */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="font-bold text-rose-500 font-mono">Remaining Time - 09:42</span>
              <span className="font-bold text-slate-800">Mock Test - 1</span>
              <div className="flex items-center gap-4">
                <span className="font-mono">1 of 18</span>
                <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
              </div>
            </div>

            <p className="text-xs sm:text-sm italic font-medium text-slate-700 leading-relaxed">
              {current.instruction}
            </p>

            {/* Audio Player Container */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 max-w-lg mx-auto text-center">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Audio Player</span>
                <span className="text-emerald-600">Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-full h-full bg-[#00c2cb] rounded-full" />
              </div>
              <p className="text-xs text-slate-500 italic">{current.samplePrompt}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between bg-slate-100 px-3 py-1.5 rounded-t-xl border border-slate-300 text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold">
                  <span className="px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer">Cut</span>
                  <span className="px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer">Copy</span>
                  <span className="px-2 py-0.5 rounded hover:bg-slate-200 cursor-pointer">Paste</span>
                </div>
                <div className="font-mono font-bold text-slate-700">{wordCount} words</div>
              </div>

              <textarea
                rows={4}
                placeholder="Type your response summary here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full p-3 rounded-b-xl border border-t-0 border-slate-300 focus:outline-hidden focus:border-[#00c2cb] text-xs font-sans leading-relaxed resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">Save & Exit</button>
              <button className="px-7 py-2 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-extrabold shadow-sm transition">Next &gt;</button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-5 py-2.5 rounded-full bg-[#00c2cb] text-white font-extrabold text-xs shadow-xs hover:bg-[#00a8b5] transition">PTE Listening {current.title}</button>
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
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Ready to boost your listening score?</h3>
          <p className="text-xs text-slate-600">Watch our strategy videos to improve your Listening proficiency</p>
          <div className="pt-2"><Link to="/pte-online-course" className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">View Now</Link></div>
        </div>
      </section>

    </div>
  );
}