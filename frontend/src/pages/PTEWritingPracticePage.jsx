import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  ChevronDown, 
  Clock, 
  Maximize2, 
  ArrowRight
} from 'lucide-react';

export default function PTEWritingPracticePage() {
  const [activeTask, setActiveTask] = useState('summarize-written-text');
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
    { id: 'summarize-written-text', label: 'Summarize Written Text', badge: 'SWT' },
    { id: 'write-essay', label: 'Write Essay', badge: 'WE' }
  ];

  const taskData = {
    'summarize-written-text': {
      title: 'Summarize Written Text',
      badge: 'SWT',
      desc: "Summarize Written Text requires candidates to compose a single-sentence summary of an academic passage within a limit of 5 to 75 words. This task evaluates both Reading comprehension and standard academic Writing skills over a 10-minute timer.",
      specs: {
        task: 'Read a passage and write a single-sentence summary',
        skills: 'Reading and Writing',
        promptLength: 'Passage up to 300 words',
        timeToAnswer: '10 minutes',
        questions: '1 - 2'
      },
      instruction: 'Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.',
      passage: `Contemporary urban centers are increasingly transforming their municipal infrastructure to address climatic resilience and sustainable resource allocation. By incorporating vegetative rooftop systems, expanding pedestrian transit corridors, and retrofitting municipal facilities with high-efficiency energy grids, metropolitan administrations aim to mitigate the thermal island effect while curtailing carbon emissions.

Initial implementation phases necessitate substantial fiscal commitments from both public treasury reserves and private development consortia. Although financial outlays can be considerable during formative development periods, longitudinal analyses demonstrate significant reductions in stormwater processing expenditures and public healthcare costs associated with atmospheric particulate pollutants.

Consequently, comprehensive green urban planning is no longer regarded as an optional aesthetic enhancement, but as an essential strategic prerequisite for sustainable economic longevity and ecological equilibrium in global metropolitan areas.`,
      tips: [
        'Your response must strictly be composed as ONE complete sentence beginning with a capital letter and ending with a period.',
        'Target a word count between 35 and 48 words to showcase complex syntax without grammatical ambiguity.',
        'Use subordinating conjunctions such as although, while, because, and since to balance contrasting perspectives.',
        'Carefully review nominal agreements, tense consistency, and punctuation before completing the task.',
        'Scoring is assessed on Content, Form (strictly one sentence), Grammar, and Vocabulary.'
      ],
      faqs: [
        { q: 'What is Summarize Written Text?', a: 'SWT is an integrated test question assessing your ability to identify core themes and synthesize academic text into a single grammatical sentence.' },
        { q: 'What happens if I write two sentences?', a: 'Writing more than one sentence results in a score of zero for Form, which subsequently zeroes out Content marks.' },
        { q: 'What is the recommended word count?', a: 'The mandatory range is 5 to 75 words, with 35 to 50 words serving as the ideal structural target.' },
        { q: 'How many SWT tasks appear in the examination?', a: 'Test-takers typically encounter 1 to 2 tasks in the opening testing module.' }
      ]
    },
    'write-essay': {
      title: 'Write Essay',
      badge: 'WE',
      desc: 'Candidates are given 20 minutes to develop, draft, and refine an academic argumentative essay of 200 to 300 words addressing an assigned societal or philosophical question.',
      specs: {
        task: 'Draft an argumentative academic essay',
        skills: 'Writing',
        promptLength: '2 - 3 sentences',
        timeToAnswer: '20 minutes',
        questions: '1 - 2'
      },
      instruction: 'You have 20 minutes to plan, write, and revise an essay on the topic below. Your response will be evaluated on your ability to substantiate an explicit position, organize discourse coherently, and demonstrate mastery over academic English syntax.',
      passage: `"Technological advancements in automated artificial intelligence continue to reshape modern employment ecosystems. While proponents emphasize enhanced efficiency and economic expansion, critics express concern regarding widespread occupational displacement. Discuss both perspectives and present your supported conclusion."`,
      tips: [
        'Structure your discourse into four paragraphs: Contextual Introduction, First Analytical Argument, Counterbalancing Perspective, and Logical Synthesis.',
        'Maintain word volume strictly within the 220 to 270 word range.',
        'Incorporate academic cohesive transitions such as "Furthermore," "Conversely," and "Consequently."',
        'Avoid casual abbreviations and conversational register.'
      ],
      faqs: [
        { q: 'What is the mandatory length for the essay?', a: 'The essay must contain between 200 and 300 words to obtain full Form marks.' },
        { q: 'Can I follow a standardized essay structure?', a: 'Yes, adhering to proven logical paragraph frameworks ensures coherence and optimal time management.' }
      ]
    }
  };

  const current = taskData[activeTask] || taskData['summarize-written-text'];

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

      {/* 1. HERO TITLE & MODULE SWITCHER */}
      <section className="pt-8 sm:pt-12 pb-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Latest PTE Academic & UKVI Writing Questions
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1">
            <Link to="/pte-speaking-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Speaking</Link>
            <Link to="/pte-writing-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#00c5cd] text-white shadow-xs transition">Writing</Link>
            <Link to="/pte-reading-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Reading</Link>
            <Link to="/pte-listening-practice" className="px-7 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition">Listening</Link>
          </div>

          <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-center max-w-4xl mx-auto">
            <p>
              The Writing module tests analytical synthesis and formal essay composition in academic English. Test-takers produce a single-sentence summary of an academic passage and compose a persuasive 200-300 word essay under strict time limits. Practice on NinetyPTE sharpens syntax, lexical diversity, and time-saving writing structures.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {tasks.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTask(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTask === t.id
                    ? 'bg-[#0284c7] text-white shadow-xs'
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
            <div className="w-10 h-10 rounded-full bg-[#0284c7] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
              {current.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0284c7]">
              {current.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {current.desc}
          </p>

          {/* Specs Table matching PDF */}
          <div className="border border-sky-300/80 rounded-xl overflow-hidden shadow-2xs">
            <div className="grid grid-cols-5 bg-[#0284c7] text-white text-[11px] sm:text-xs font-bold text-center">
              <div className="p-3 border-r border-sky-300/60">Task</div>
              <div className="p-3 border-r border-sky-300/60">Skills assessed</div>
              <div className="p-3 border-r border-sky-300/60">Prompt length</div>
              <div className="p-3 border-r border-sky-300/60">Time to answer</div>
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

          {/* 3. SIMULATOR CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between text-xs text-slate-600 pb-1">
              <span className="font-bold text-slate-800 text-sm">Mock Test - 1</span>
              <div className="flex items-center gap-4 text-xs">
                <span className="font-medium text-slate-600">28 of 29</span>
                <span className="font-medium text-slate-600 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  08:04 / 20:00
                </span>
                <Maximize2 className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-900" />
              </div>
            </div>

            {/* Horizontal Test Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#00c5cd] rounded-full w-4/5" />
            </div>

            {/* Inner Test Item Container */}
            <div className="border border-slate-200 rounded-xl p-5 sm:p-6 bg-white space-y-5">
              
              <p className="text-xs sm:text-sm font-bold italic text-slate-700 leading-relaxed">
                {current.instruction}
              </p>

              {/* Passage Box (for SWT) or Topic Prompt (for Essay) */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2.5 max-h-56 overflow-y-auto font-normal">
                {current.passage.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Response Editor */}
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
                  rows={6}
                  placeholder="Type your response here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full p-3.5 rounded-b-xl border border-t-0 border-slate-300 focus:outline-hidden focus:border-[#00c5cd] text-xs font-sans leading-relaxed resize-none shadow-2xs"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button className="px-5 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-medium transition cursor-pointer">
                  Save & Exit
                </button>
                <button className="px-6 py-1.5 rounded-lg bg-[#00c5cd] hover:bg-[#00b2ba] text-white text-xs font-bold shadow-xs transition cursor-pointer">
                  Next &gt;
                </button>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button className="px-5 py-2 rounded-full bg-[#00c5cd] text-white font-bold text-xs shadow-xs hover:bg-[#00b2ba] transition">
              PTE Writing {current.title}
            </button>
            <button className="px-5 py-2 rounded-full bg-[#00c5cd] text-white font-bold text-xs shadow-xs hover:bg-[#00b2ba] transition">
              {current.title} Sample Questions
            </button>
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
                <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80" alt="Student typing essay" className="w-full h-72 object-cover opacity-85" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-xl border border-sky-200 text-center space-y-1">
                  <div className="text-[10px] uppercase font-mono font-black text-sky-600">{current.title}</div>
                  <div className="text-base font-black text-slate-900 flex items-center justify-center gap-1"><span>TIPS</span><span className="text-sky-500">💡</span></div>
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
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Ready to boost your writing score?</h3>
          <p className="text-xs text-slate-600">Watch our strategy videos to improve your Writing proficiency</p>
          <div className="pt-2"><Link to="/pte-online-course" className="px-8 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-sm transition inline-block">View Now</Link></div>
        </div>
      </section>

    </div>
  );
}