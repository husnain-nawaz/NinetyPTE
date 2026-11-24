import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Volume2, 
  Play, 
  Square, 
  RotateCcw, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Maximize2, 
  Award, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function PTESpeakingPracticePage() {
  const [activeTask, setActiveTask] = useState('repeat-sentence');
  const [recordingState, setRecordingState] = useState('idle'); // idle, playing, recording, completed
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [faqOpen, setFaqOpen] = useState({ 0: true });

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
      samplePrompt: 'Domestication is a sustained multi-generational relationship in which one group of organisms assumes a significant degree of influence over the reproduction and care of another group to secure a more predictable supply of resources.',
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
        { q: 'What happens if I make a mistake while reading?', a: 'Do not restart or correct yourself. Self-correction severely penalizes oral fluency. Continue reading smoothly.' },
        { q: 'Can I finish reading before the timer ends?', a: 'Yes. Once you finish reading the last word, click Next immediately so background noise is not recorded.' },
        { q: 'What is the best daily practice strategy?', a: 'Practice 20-30 Read Aloud prompts daily, focusing on rhythm, sentence stress, and phrasing chunks.' }
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
      samplePrompt: '"The cafeteria will be open for breakfast and dinner during the orientation week."',
      tips: [
        'You need to repeat the words exactly as you heard them in the audio.',
        'The recording will start playing on its own. The microphone will start recording right away (you may find a BEEP tone).',
        "Don't rush, and speak slowly at a steady, natural conversational pace.",
        'Focus on meaning and sentence chunks rather than memorizing isolated words.',
        "You can't repeat the recording, and you can only record your answer once.",
        'Task grading is based on: Content (number of words matched), oral fluency, and pronunciation.'
      ],
      faqs: [
        { q: 'What is the Repeat Sentence task?', a: "Repeat Sentence tests your short-term auditory memory and spoken English by asking you to repeat an audio sentence of 3-9 seconds immediately after hearing it." },
        { q: 'How much time do I have to respond?', a: 'You have 15 seconds to repeat the sentence once the audio finishes and the recording status displays "Recording".' },
        { q: 'How is this task scored?', a: 'Scoring is divided into Content (3 points for 100% words, 2 points for 50%+, 1 point for <50%), Oral Fluency (5 points), and Pronunciation (5 points).' },
        { q: 'How can I practice Repeat Sentence effectively?', a: 'Listen to short podcast snippets, repeat in grammatical chunks (Subject + Verb + Object), and practice shadow speaking daily.' },
        { q: 'What are common mistakes to avoid?', a: 'Pausing or hesitating after hearing the audio, speaking before the microphone opens, and changing the word sequence.' }
      ]
    },
    'describe-image': {
      title: 'Describe Image',
      badge: 'DI',
      desc: 'An image (bar chart, line graph, pie chart, map, or process diagram) appears on screen. You have 25 seconds to study it and 40 seconds to describe the key trends and conclusion.',
      specs: {
        task: 'An image appears on screen. Describe the image in detail',
        skills: 'Speaking',
        promptLength: 'Visual prompt',
        prepTime: '25 seconds',
        answerTime: '40 seconds',
        questions: '3 - 4'
      },
      instruction: 'Look at the chart below. In 25 seconds, please speak into the microphone and describe in detail what the chart is showing. You will have 40 seconds to give your response.',
      samplePrompt: 'Bar Chart: Annual Renewable Energy Consumption by Country (2015 - 2025)',
      tips: [
        'Follow a structured template: Introduction (title/type) + Key High/Low trends + Conclusion/Summary.',
        'Do not try to read every single number; highlight only the maximum, minimum, and significant changes.',
        'Speak continuously for at least 30-35 seconds without hesitation or long silences.',
        'Fluency is paramount: speak smoothly even if you use simple descriptive vocabulary.',
        'Always provide a concluding remark before clicking Next.',
        'Task grading is based on: Content, oral fluency, and pronunciation.'
      ],
      faqs: [
        { q: 'What types of images appear in Describe Image?', a: 'Bar charts, line graphs, pie charts, tables, maps, process flowcharts, and Venn diagrams.' },
        { q: 'Should I use a template for Describe Image?', a: 'Yes! High-scoring candidates use proven templates to maintain flawless 90-band fluency without pausing.' },
        { q: 'How long should I speak?', a: 'Aim for 32 to 36 seconds. Speaking for less than 25 seconds can lower your content score.' }
      ]
    },
    'retell-lecture': {
      title: 'Re-Tell Lecture',
      badge: 'RL',
      desc: 'You will listen to or watch an academic lecture of up to 90 seconds. You have 10 seconds to prepare and 40 seconds to retell the lecture in your own words.',
      specs: {
        task: 'After listening to a lecture, retell the lecture in your own words',
        skills: 'Listening and Speaking',
        promptLength: 'Up to 90 seconds',
        prepTime: '10 seconds',
        answerTime: '40 seconds',
        questions: '1 - 2'
      },
      instruction: 'You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words.',
      samplePrompt: 'Academic Lecture: "The Socio-Economic Impact of Urban Architecture in Medieval Europe"',
      tips: [
        'Take concise notes on your notepad: write down 4-6 key phrases and academic keywords.',
        'Use a reliable template to connect your noted phrases into coherent sentences.',
        'Start speaking immediately after the tone sounds; do not pause to compose thoughts.',
        'Maintain natural pace and clear rhythm for 32-35 seconds.',
        'Task grading is based on: Content, oral fluency, and pronunciation.'
      ],
      faqs: [
        { q: 'Does Re-Tell Lecture affect my Listening score?', a: 'Yes! Re-Tell Lecture is an integrated task that heavily contributes to both Speaking and Listening.' },
        { q: 'How many keywords should I note down?', a: 'Aim for 6-8 meaningful keywords or short phrases during the lecture.' }
      ]
    },
    'answer-short-question': {
      title: 'Answer Short Question',
      badge: 'ASQ',
      desc: 'You will hear a brief factual question. Answer immediately with a single word or a few words.',
      specs: {
        task: 'After listening to a question, answer with a single word or few words',
        skills: 'Listening and Speaking',
        promptLength: '3 - 9 seconds',
        prepTime: 'N/A',
        answerTime: '10 seconds',
        questions: '5 - 6'
      },
      instruction: 'You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.',
      samplePrompt: 'Question: "What do we call the legal document that allows a person to drive a car?" → Answer: "Driving license"',
      tips: [
        'Answer immediately when the microphone status turns to Recording.',
        'Provide a concise answer: single words or short noun phrases are ideal.',
        'If unsure, make an educated guess based on common vocabulary.',
        'Click Next immediately after speaking your answer.'
      ],
      faqs: [
        { q: 'Can I say "a driver license" instead of "driver license"?', a: 'Yes, articles (a, an, the) do not affect correctness.' }
      ]
    },
    'summarize-group-discussion': {
      title: 'Summarize Group Discussion',
      badge: 'SGD',
      desc: 'Listen to three people discussing an academic or workplace topic, then speak a summary of their main arguments and consensus.',
      specs: {
        task: 'Listen to a group discussion, then speak a concise summary',
        skills: 'Listening and Speaking',
        promptLength: 'Up to 2 minutes',
        prepTime: '10 seconds',
        answerTime: '2 minutes',
        questions: '1 - 2'
      },
      instruction: 'You will listen to a group discussion. After the discussion ends, you will have 10 seconds to prepare and up to 2 minutes to summarize the main viewpoints.',
      samplePrompt: 'Group Discussion: "Balancing Hybrid Work Productivity and Corporate Culture"',
      tips: [
        'Track each speaker’s perspective (Speaker A, B, and C) on your erasable notepad.',
        'Identify points of agreement and disagreement among the participants.',
        'Synthesize their viewpoints into a structured oral summary.'
      ],
      faqs: [
        { q: 'Is Summarize Group Discussion in PTE Academic?', a: 'Yes, it has been introduced in recent Pearson exam updates for select test formats.' }
      ]
    },
    'respond-to-a-situation': {
      title: 'Respond to a Situation',
      badge: 'RTS',
      desc: 'Read and listen to a real-life situation, then provide an appropriate spoken response (e.g. requesting an extension or apologizing to a colleague).',
      specs: {
        task: 'Listen and read about a situation, then speak an appropriate response',
        skills: 'Listening and Speaking',
        promptLength: 'Up to 60 words',
        prepTime: '20 seconds',
        answerTime: '40 seconds',
        questions: '1 - 2'
      },
      instruction: 'Listen to and read the situation. You will have 20 seconds to think about what you want to say, and 40 seconds to speak your response.',
      samplePrompt: 'Situation: "You missed a group project meeting due to a doctor appointment. Leave a voice message for your team lead apologizing and offering to complete your share of work."',
      tips: [
        'Adopt the appropriate tone (formal, professional, or polite).',
        'State your reason clearly and offer a constructive solution.',
        'Speak clearly and maintain continuous oral fluency.'
      ],
      faqs: [
        { q: 'What is tested in Respond to a Situation?', a: 'Pragmatic communicative ability, situational appropriateness, fluency, and pronunciation.' }
      ]
    }
  };

  const current = taskData[activeTask] || taskData['repeat-sentence'];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c2cb] selection:text-white pb-16">
      
      {/* ========================================================================= */}
      {/* Fixed Sticky Right-Edge Pill: "Practice Now"                              */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* 1. HERO TITLE & 4 MODULE SWITCHER (Page 1)                                */}
      {/* ========================================================================= */}
      <section className="pt-10 sm:pt-14 pb-8 bg-gradient-to-b from-sky-50/50 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            PTE <span className="text-[#00c2cb]">Speaking</span> Practice
          </h1>

          <p className="text-xs sm:text-sm font-bold text-slate-800">
            Latest PTE Academic & UKVI Speaking Questions
          </p>

          {/* 4 Main Module Navigation Tabs matching Screenshot */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
            <Link
              to="/pte-speaking-practice"
              className="px-6 py-2.5 rounded-full text-xs font-black bg-[#00c2cb] text-white shadow-sm transition"
            >
              Speaking
            </Link>
            <Link
              to="/pte-writing-practice"
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition"
            >
              Writing
            </Link>
            <Link
              to="/pte-reading-practice"
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition"
            >
              Reading
            </Link>
            <Link
              to="/pte-listening-practice"
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition"
            >
              Listening
            </Link>
          </div>

          {/* Introductory Paragraph matching Screenshot */}
          <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-left max-w-4xl mx-auto">
            <p>
              The PTE Speaking module of PTE Academic / UKVI is the first module in the{' '}
              <strong className="text-slate-900 font-bold underline decoration-[#00c2cb]">PTE exam format</strong>, which contains seven different types of questions. It assesses the test takers' ability to speak English clearly and fluently in academic contexts. The test takers have to record their responses using a microphone and a headset. The responses are scored by an automated system based on various criteria such as pronunciation, fluency, content, and vocabulary & basic communicative abilities like oral fluency and pronunciation. PTE Speaking practice is an important aspect of PTE preparation & PTE Speaking mock test can be taken on NinetyPTE to gauge one's performance.
            </p>
          </div>

          {/* Speaking Tasks Sub-Pills matching Screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {tasks.map(t => {
              const active = activeTask === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTask(t.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                    active
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TASK HEADER & SPECS TABLE (Page 1)                                     */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Badge & Task Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-sm shadow-sm">
              {current.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-600">
              {current.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {current.desc}
          </p>

          {/* Specification Table in Orange Header matching Page 1 */}
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
          {/* 3. INTERACTIVE SIMULATOR MOCKUP CARD (Page 1)                         */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xl space-y-5">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-800">Mock Test - 1</span>
              <div className="flex items-center gap-4">
                <span className="font-mono">6 of 29</span>
                <span className="font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  04:53 / 45:36
                </span>
                <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-900" />
              </div>
            </div>

            {/* Instruction */}
            <p className="text-xs sm:text-sm italic font-medium text-slate-700">
              {current.instruction}
            </p>

            {/* Simulated Audio/Mic Player Box matching Screenshot */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2">
                <span>Audio Player</span>
                <span className="text-rose-500 animate-pulse">Beginning in 2 sec</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#00c2cb] rounded-full animate-pulse" />
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-mono">
                {current.samplePrompt}
              </div>

              {/* Recording Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button 
                  onClick={() => setRecordingState(recordingState === 'recording' ? 'completed' : 'recording')}
                  className={`px-6 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition ${
                    recordingState === 'recording'
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-900 text-white hover:bg-[#00c2cb]'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{recordingState === 'recording' ? 'Recording...' : 'Start Recording'}</span>
                </button>
              </div>
            </div>

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

      {/* ========================================================================= */}
      {/* 4. "How to Respond to This Task?" (Page 1 & 2)                            */}
      {/* ========================================================================= */}
      <section className="py-12 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Tips List */}
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
                <Link
                  to="/pte-online-course"
                  className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition"
                >
                  Detailed Question-wise Page
                </Link>
                <Link
                  to="/pte-exam-pattern"
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#00c2cb] text-white font-extrabold text-xs shadow-sm transition"
                >
                  Sample Questions
                </Link>
              </div>
            </div>

            {/* Right Column: Tips Illustration Card matching Screenshot */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-sm w-full bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" 
                  alt="Student with microphone taking speaking test" 
                  className="w-full h-72 object-cover opacity-85"
                />
                
                {/* Floating "Tips" badge overlay */}
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

      {/* ========================================================================= */}
      {/* 5. FAQs ACCORDION (Page 2)                                                */}
      {/* ========================================================================= */}
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
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c2cb] transition-colors cursor-pointer"
                  >
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

      {/* ========================================================================= */}
      {/* 6. 3 BOTTOM BANNERS MATCHING Page 2 & 3                                   */}
      {/* ========================================================================= */}
      <section className="py-8 space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner 1: Free Mock Test */}
        <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 p-8 text-center space-y-4 bg-gradient-to-r from-sky-50 via-white to-sky-50">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Prepare for PTE & give a free mock test today.
          </h3>
          <div>
            <Link
              to="/mock-tests"
              className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Banner 2: Score Calculator Guide */}
        <div className="rounded-3xl p-6 sm:p-8 text-center space-y-4 border border-slate-200 bg-white shadow-2xs">
          <h3 className="text-sm sm:text-base font-black text-slate-900 max-w-2xl mx-auto leading-relaxed">
            Want to understand how PTE score calculation works? Check our PTE score calculator guide & understand the academic integrated scoring system.
          </h3>
          <div>
            <Link
              to="/pte-score-calculator"
              className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Banner 3: Ready to boost speaking score */}
        <div className="rounded-3xl p-8 text-center space-y-3 bg-[#f0f9fa] border border-cyan-100">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Ready to boost your speaking score?
          </h3>
          <p className="text-xs text-slate-600">
            Watch our strategy videos to improve your Speaking proficiency
          </p>
          <div className="pt-2">
            <Link
              to="/pte-online-course"
              className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block"
            >
              View Now
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}