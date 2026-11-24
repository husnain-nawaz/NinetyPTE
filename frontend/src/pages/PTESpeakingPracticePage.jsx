import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Volume2, 
  Play, 
  Clock, 
  Maximize2, 
  Users, 
  GraduationCap, 
  ChevronDown, 
  ArrowRight,
  Sparkles,
  BarChart2,
  Headphones
} from 'lucide-react';

export default function PTESpeakingPracticePage() {
  const [activeTask, setActiveTask] = useState('repeat-sentence');
  const [faqOpen, setFaqOpen] = useState({ 0: true });
  const [isRecording, setIsRecording] = useState(false);

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const tasks = [
    { id: 'read-aloud', label: 'Read Aloud', badge: 'RA' },
    { id: 'repeat-sentence', label: 'Repeat Sentence', badge: 'RS' },
    { id: 'describe-image', label: 'Describe Image', badge: 'DI' },
    { id: 'retell-lecture', label: 'Re-Tell Lecture', badge: 'RL' },
    { id: 'answer-short-question', label: 'Answer Short Question', badge: 'ASQ' },
    { id: 'summarize-group-discussion', label: 'Summarize Group Discussion', badge: 'SGD' },
    { id: 'respond-to-a-situation', label: 'Respond to a Situation', badge: 'RTS' }
  ];

  const taskData = {
    'read-aloud': {
      title: 'Read Aloud',
      badge: 'RA',
      desc: 'A text appears on screen. You have 35-40 seconds to prepare and read the text aloud as naturally and clearly as possible. This task tests your reading and speaking skills simultaneously.',
      specs: {
        task: 'A text appears on screen. Read the text aloud',
        skills: 'Reading and Speaking',
        promptLength: 'Up to 60 words',
        prepTime: '35 - 40 seconds',
        answerTime: '35 - 40 seconds',
        questions: '6 - 7'
      },
      instruction: 'Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.',
      promptText: 'Domestication is a sustained multi-generational relationship in which one group of organisms assumes a significant degree of influence over the reproduction and care of another group to secure a more predictable supply of resources.',
      tips: [
        'Use the 35-40 seconds preparation time to read the text silently and identify difficult words.',
        'Speak in a calm, confident, and natural tone without shouting into the microphone.',
        'Maintain consistent oral fluency. Do not stop or pause awkwardly for more than 2 seconds.',
        'Pronounce plural endings (-s, -es) and past tense endings (-ed) with precision.',
        'Never go back to correct a mistake; continuing smoothly preserves your fluency score.',
        'Task grading is based on: Content, oral fluency, and pronunciation.'
      ],
      faqs: [
        { q: 'What is the Read Aloud task?', a: 'Read Aloud is the first speaking task where you read a short academic passage of up to 60 words aloud after 35-40 seconds of preparation.' },
        { q: 'How is Read Aloud scored?', a: 'Read Aloud contributes equally to both your Speaking and Reading scores based on Content, Oral Fluency, and Pronunciation.' },
        { q: 'What happens if I make a mistake while reading?', a: 'Do not restart or correct yourself. Self-correction severely penalizes oral fluency. Continue reading smoothly.' }
      ]
    },
    'repeat-sentence': {
      title: 'Repeat Sentence',
      badge: 'RS',
      desc: "Repeat Sentence is a key task of the test that evaluates a student's Listening & Speaking ability. This question carries partial marking as well. On the PTE repeat sentence section, you must demonstrate your ability to comprehend, understand, and recall or repeat any given statement. Try and repeat the sentence you have heard as clearly as possible without any pauses. The audio cannot be played back, so pay close attention. Repeat Sentence PTE practice is an important aspect of PTE preparation.",
      specs: {
        task: 'After listening to a recording of a sentence, repeat the sentence',
        skills: 'Listening and Speaking',
        promptLength: '3 - 9 seconds',
        prepTime: '1-2 seconds',
        answerTime: '15 seconds',
        questions: '10 - 12'
      },
      instruction: 'You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once.',
      promptText: '"The cafeteria will be open for breakfast and dinner during the orientation week."',
      tips: [
        'You need to repeat the words exactly as you heard them in the audio.',
        'The recording will start playing on its own. The microphone will start recording, and the recording status box will say "Recording." Start talking right away (you may find a BEEP tone), and repeat exactly what you heard.',
        "Don't rush, and speak slowly at a steady, natural conversational pace.",
        'Read the paragraph properly before the progress bar runs out. Once "Recording" time completes, it will show as "Complete".',
        "You can't repeat the recording, and you can only record your answer once.",
        'Task grading is based on: Content, fluency, and pronunciation.'
      ],
      faqs: [
        { q: 'What is the Repeat Sentence task?', a: "Repeat Sentence tests your short-term auditory memory and spoken English by asking you to repeat an audio sentence of 3-9 seconds immediately after hearing it." },
        { q: 'How much time do I have to respond?', a: 'You have 15 seconds to repeat the sentence once the audio finishes and the recording status displays "Recording".' },
        { q: 'How is this task scored?', a: 'Scoring is divided into Content (number of words matched), Oral Fluency, and Pronunciation.' },
        { q: 'How can I practice Repeat Sentence effectively?', a: 'Listen to short audio sentences, practice in grammatical chunks, and repeat without hesitation.' },
        { q: 'What are common mistakes to avoid?', a: 'Pausing awkwardly or trying to correct minor slips. Always prioritize continuous fluency.' }
      ]
    },
    'describe-image': {
      title: 'Describe Image',
      badge: 'DI',
      desc: 'An authentic chart, graph, map, or process diagram appears on screen. You have 25 seconds to study the visual data and 40 seconds to describe the primary trends, highest and lowest values, and a logical conclusion.',
      specs: {
        task: 'An image appears on screen. Describe the image in detail',
        skills: 'Speaking',
        promptLength: 'Visual graph or diagram',
        prepTime: '25 seconds',
        answerTime: '40 seconds',
        questions: '3 - 4'
      },
      instruction: 'Look at the chart below. In 25 seconds, please speak into the microphone and describe in detail what the chart is showing. You will have 40 seconds to give your response.',
      promptText: 'Bar Chart: Renewable Energy Investment by Source (2018 - 2024)',
      tips: [
        'Follow a clear structure: Overview (title and axes) + Key High/Low features + Concluding inference.',
        'Do not try to describe every single number. Focus on the greatest value, the lowest value, and significant variations.',
        'Speak continuously and smoothly for approximately 32 to 36 seconds without hesitating.',
        'Maintain natural pronunciation and avoid long silences exceeding 2 seconds.'
      ],
      faqs: [
        { q: 'What types of images appear in Describe Image?', a: 'Bar charts, line graphs, pie charts, tables, maps, and process diagrams.' },
        { q: 'Should I follow a standard template?', a: 'Yes, using a proven structural template helps maintain uninterrupted 90-band oral fluency.' }
      ]
    },
    'retell-lecture': {
      title: 'Re-Tell Lecture',
      badge: 'RL',
      desc: 'You will listen to an academic lecture accompanied by an illustrative slide. You have 10 seconds to prepare and 40 seconds to retell the key lecture points in your own words.',
      specs: {
        task: 'After listening to a lecture, retell the lecture in your own words',
        skills: 'Listening and Speaking',
        promptLength: 'Up to 90 seconds',
        prepTime: '10 seconds',
        answerTime: '40 seconds',
        questions: '1 - 2'
      },
      instruction: 'You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words.',
      promptText: 'Lecture Topic: "The Atmospheric Impact of Ocean Thermal Expansion and Glacier Dynamics"',
      tips: [
        'Write down 6-8 core noun phrases and conceptual keywords on your erasable notebook while listening.',
        'Connect your notes smoothly using a structured oral template.',
        'Maintain steady, natural fluency throughout your 35-second spoken summary.'
      ],
      faqs: [
        { q: 'Does Re-Tell Lecture contribute to Listening?', a: 'Yes, Re-Tell Lecture is an integrated task awarding marks to both Speaking and Listening.' }
      ]
    },
    'answer-short-question': {
      title: 'Answer Short Question',
      badge: 'ASQ',
      desc: 'You will hear a short question. Answer immediately with a single word or a few words when the microphone turns on.',
      specs: {
        task: 'After listening to a question, answer with a single word or few words',
        skills: 'Listening and Speaking',
        promptLength: '3 - 9 seconds',
        prepTime: 'N/A',
        answerTime: '10 seconds',
        questions: '5 - 6'
      },
      instruction: 'You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.',
      promptText: 'Audio: "What instrument do astronomers use to observe distant stars and planets?"',
      tips: [
        'Answer clearly as soon as the status box displays "Recording".',
        'State a single concise word or short noun phrase (e.g. "Telescope").',
        'Click Next immediately after speaking to conclude recording.'
      ],
      faqs: [
        { q: 'Are synonyms accepted in Answer Short Question?', a: 'Yes, standard synonyms recognized by Pearson scoring models are awarded full marks.' }
      ]
    },
    'summarize-group-discussion': {
      title: 'Summarize Group Discussion',
      badge: 'SGD',
      desc: "In this question type, you'll hear a group of three people discussing a topic or issue. Your job is to listen carefully, and once the beep sounds, summarize the entire discussion in your own words. You'll get 10 seconds to prepare and then 2 minutes to speak, so it's important to take quick mental notes while listening. Focus on the main ideas shared by each speaker, how their opinions differ or agree, and the overall theme of the conversation.",
      specs: {
        task: 'Listen to a group discussion and summarize what each speaker says',
        skills: 'Listening and Speaking',
        promptLength: 'Up to 3 minutes',
        prepTime: '10 seconds',
        answerTime: '2 minutes',
        questions: '2 - 3'
      },
      instruction: 'You will hear three people having a discussion. When you hear the beep, summarize the whole discussion. You will have 10 seconds to prepare and 2 minutes to give your response.',
      promptText: 'Group Discussion: "Three university researchers discussing renewable energy storage versus traditional nuclear grid reliance."',
      tips: [
        'In this task, you need to recap what you picked up from the recording.',
        'The recording will play on its own, and then you have 10 seconds to get ready and 2 minutes to speak. After a beep sound, when the microphone activates, speak clearly.',
        'Structure your summary: introduce the core debate, summarize Speaker 1, Speaker 2, and Speaker 3, then state the consensus.',
        'Speak fluently without unnecessary repetitions or hesitations.'
      ],
      faqs: [
        { q: 'What is Summarize Group Discussion?', a: 'An integrated task where you listen to three participants discussing an issue and summarize their viewpoints within 2 minutes.' },
        { q: 'How is it scored?', a: 'Scoring evaluates Comprehension Content, Oral Fluency, and Pronunciation.' }
      ]
    },
    'respond-to-a-situation': {
      title: 'Respond to a Situation',
      badge: 'RTS',
      desc: 'Listen to and read about a situation, then provide an appropriate spoken response (e.g. speaking to an employer, professor, or peer).',
      specs: {
        task: 'Listen and read about a situation, then provide an appropriate spoken response',
        skills: 'Listening and Speaking',
        promptLength: 'Up to 60 words',
        prepTime: '20 seconds',
        answerTime: '40 seconds',
        questions: '1 - 2'
      },
      instruction: 'Listen to and read the situation. You will have 20 seconds to think about what you want to say, and 40 seconds to speak your response.',
      promptText: 'Scenario: "You are a university student whose lab experiment requires an additional day to complete. Phone your laboratory supervisor explaining the technical delay and requesting an extension."',
      tips: [
        'Adopt an appropriate polite and professional register suited to the situation.',
        'Directly address the requested outcome (explanation + proposed solution).',
        'Maintain natural pronunciation and steady oral rhythm.'
      ],
      faqs: [
        { q: 'What is the preparation time for Respond to a Situation?', a: 'You are provided 20 seconds of thinking time followed by 40 seconds of recording time.' }
      ]
    }
  };

  const current = taskData[activeTask] || taskData['repeat-sentence'];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c2cb] selection:text-white pb-16">
      
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

      {/* 1. HERO TITLE & 4 MODULE SWITCHER */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Latest PTE Academic & UKVI Speaking Questions
          </h1>

          {/* 4 Main Module Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1">
            <Link to="/pte-speaking-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#00c5cd] text-white shadow-xs transition">Speaking</Link>
            <Link to="/pte-writing-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Writing</Link>
            <Link to="/pte-reading-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Reading</Link>
            <Link to="/pte-listening-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Listening</Link>
          </div>

          {/* Introductory Paragraph */}
          <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-center max-w-4xl mx-auto">
            <p>
              The Speaking section assesses oral fluency, pronunciation, and spoken coherence across seven academic question types. Candidates speak into an approved headset microphone, with responses evaluated through automated scoring algorithms. Regular targeted practice on NinetyPTE helps build vocal clarity and confident delivery under real examination timing.
            </p>
          </div>

          {/* Speaking Tasks Sub-Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {tasks.map(t => {
              const active = activeTask === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTask(t.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#f0854d] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. TASK HEADER & SPECS TABLE */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-sm shadow-sm">
              {current.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-600">
              {current.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {current.desc}
          </p>

          <div className="bg-white rounded-2xl overflow-hidden border border-amber-200/90 shadow-2xs">
            <div className="grid grid-cols-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] sm:text-xs font-black p-3 text-center">
              <div>Task</div>
              <div>Skills assessed</div>
              <div>Prompt length</div>
              <div>Preparation time</div>
              <div>Time to answer</div>
              <div>Number of questions</div>
            </div>
            <div className="grid grid-cols-6 p-4 text-xs text-slate-700 text-center items-center gap-2 bg-amber-50/20">
              <div className="text-left font-medium">{current.specs.task}</div>
              <div className="font-semibold">{current.specs.skills}</div>
              <div>{current.specs.promptLength}</div>
              <div>{current.specs.prepTime}</div>
              <div>{current.specs.answerTime}</div>
              <div className="font-bold">{current.specs.questions}</div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 3. TASK-SPECIFIC SIMULATOR MOCKUP CARD (Page 1)                       */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl space-y-5">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-800">
                {activeTask === 'summarize-group-discussion' ? 'Mock Test - 116' : 'Mock Test - 1'}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-mono">
                  {activeTask === 'summarize-group-discussion' ? '30 of 37' : '6 of 29'}
                </span>
                <span className="font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeTask === 'summarize-group-discussion' ? '17:55 / 82:09' : '04:53 / 45:36'}
                </span>
                <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
              </div>
            </div>

            {/* Instruction */}
            <p className="text-xs sm:text-sm italic font-medium text-slate-700">
              {current.instruction}
            </p>

            {/* TASK-SPECIFIC UI DISPLAY */}
            
            {/* 1. DESCRIBE IMAGE: SHOW AUTHENTIC CHART IMAGE! */}
            {activeTask === 'describe-image' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 max-w-xl mx-auto">
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                  <div className="text-xs font-black text-slate-800 mb-2">
                    Global Renewable Energy Capacity Growth (Gigawatts, 2018 - 2024)
                  </div>
                  
                  {/* Clean Vector Bar Chart */}
                  <div className="h-44 w-full flex items-end justify-around gap-2 px-4 pt-4 border-b border-l border-slate-300">
                    <div className="flex flex-col items-center gap-1 w-12">
                      <div className="text-[10px] font-bold text-slate-600">180 GW</div>
                      <div className="w-full bg-amber-400 rounded-t h-20" />
                      <span className="text-[10px] text-slate-500">2018</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-12">
                      <div className="text-[10px] font-bold text-slate-600">240 GW</div>
                      <div className="w-full bg-amber-500 rounded-t h-28" />
                      <span className="text-[10px] text-slate-500">2020</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-12">
                      <div className="text-[10px] font-bold text-slate-600">310 GW</div>
                      <div className="w-full bg-orange-500 rounded-t h-36" />
                      <span className="text-[10px] text-slate-500">2022</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-12">
                      <div className="text-[10px] font-bold text-slate-700">420 GW</div>
                      <div className="w-full bg-[#00c2cb] rounded-t h-42" />
                      <span className="text-[10px] font-bold text-slate-800">2024</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-400 mt-2">Source: International Renewable Energy Agency (IRENA)</div>
                </div>

                {/* Status Box */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Recorded Answer</span>
                  <span className="text-rose-500 font-bold animate-pulse">Beginning in 25 sec</span>
                </div>
              </div>
            )}

            {/* 2. SUMMARIZE GROUP DISCUSSION: SHOW DISCUSSION AVATARS & AUDIO */}
            {activeTask === 'summarize-group-discussion' && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
                <div className="flex items-center justify-around py-2">
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm border-2 border-sky-300">
                      Dr. A
                    </div>
                    <div className="text-[10px] font-bold text-slate-600">Speaker 1</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm border-2 border-emerald-300">
                      Prof. B
                    </div>
                    <div className="text-[10px] font-bold text-slate-600">Speaker 2</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm border-2 border-purple-300">
                      Eng. C
                    </div>
                    <div className="text-[10px] font-bold text-slate-600">Speaker 3</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
                    <span>Audio Player</span>
                    <span className="text-[#00c2cb] font-black">Playing</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-[#00c2cb] rounded-full" />
                  </div>
                </div>
              </div>
            )}

            {/* 3. RE-TELL LECTURE: SHOW LECTURE SLIDE */}
            {activeTask === 'retell-lecture' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 max-w-xl mx-auto">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-xs">
                  <div className="w-28 h-24 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-2 text-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-[#00c2cb] mb-1" />
                    <span className="text-[9px] font-bold text-slate-300">Lecture Slide</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-900">Atmospheric Chemistry & Thermal Inversion</div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Key topics: Stratospheric temperature gradients, ozone layer absorption, and solar UV radiation buffering.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
                    <span>Audio Player</span>
                    <span className="text-[#00c2cb] font-black">Playing</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-[#00c2cb] rounded-full" />
                  </div>
                </div>
              </div>
            )}

            {/* 4. READ ALOUD: PASSAGE CARD */}
            {activeTask === 'read-aloud' && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 max-w-xl mx-auto">
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed shadow-xs">
                  {current.promptText}
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Recorded Answer</span>
                  <span className="text-rose-500 font-bold animate-pulse">Beginning in 35 sec</span>
                </div>
              </div>
            )}

            {/* 5. REPEAT SENTENCE / OTHER AUDIO TASKS: AUDIO PLAYER BOX */}
            {['repeat-sentence', 'answer-short-question', 'respond-to-a-situation'].includes(activeTask) && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2">
                  <span>Audio Player</span>
                  <span className="text-rose-500 animate-pulse">Beginning in 2 sec</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#00c2cb] rounded-full animate-pulse" />
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-mono">
                  {current.promptText}
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-2">
              <button className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">
                Save & Exit
              </button>
              <button className="px-7 py-2 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white text-xs font-extrabold shadow-sm transition">
                Next &gt;
              </button>
            </div>

          </div>

          {/* Action Pills below simulator */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-5 py-2.5 rounded-full bg-[#00c2cb] text-white font-extrabold text-xs shadow-xs hover:bg-[#00a8b5] transition">
              PTE Speaking {current.title}
            </button>
            <button className="px-5 py-2.5 rounded-full bg-[#00c2cb] text-white font-extrabold text-xs shadow-xs hover:bg-[#00a8b5] transition">
              {current.title} Sample Questions
            </button>
          </div>

        </div>
      </section>

      {/* 4. "How to Respond to This Task?" */}
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
                <Link to="/pte-online-course" className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition">
                  Detailed Question-wise Page
                </Link>
                <Link to="/pte-exam-pattern" className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs shadow-sm transition">
                  Sample Questions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-sm w-full bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" 
                  alt="Student with microphone taking speaking test" 
                  className="w-full h-72 object-cover opacity-85"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-xl border border-amber-200 text-center space-y-1">
                  <div className="text-[10px] uppercase font-mono font-black text-amber-600">
                    {current.title}
                  </div>
                  <div className="text-base font-black text-slate-900 flex items-center justify-center gap-1">
                    <span>TIPS</span>
                    <span className="text-amber-500">💡</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQs ACCORDION */}
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
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50">
                      {faq.a}
                    </div>
                  )}
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
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Ready to boost your speaking score?</h3>
          <p className="text-xs text-slate-600">Watch our strategy videos to improve your Speaking proficiency</p>
          <div className="pt-2"><Link to="/pte-online-course" className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">View Now</Link></div>
        </div>
      </section>

    </div>
  );
}