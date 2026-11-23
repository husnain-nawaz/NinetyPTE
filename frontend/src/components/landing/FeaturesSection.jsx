import { 
  ChevronRight, 
  Sparkles, 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  Award, 
  BarChart2, 
  Layers, 
  Smartphone,
  CheckCircle2,
  Apple
} from 'lucide-react';

export default function FeaturesSection() {
  const taskPills = [
    { name: 'Write Essay', code: 'WE', icon: <PenTool className="w-4 h-4 text-blue-600" /> },
    { name: 'Read Aloud', code: 'RA', icon: <Mic className="w-4 h-4 text-amber-600" /> },
    { name: 'Repeat Sentence', code: 'RS', icon: <Headphones className="w-4 h-4 text-indigo-600" /> },
    { name: 'Describe Image', code: 'DI', icon: <BarChart2 className="w-4 h-4 text-emerald-600" /> },
    { name: 'Summarize Spoken Text', code: 'SST', icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
    { name: 'Write from Dictation', code: 'WFD', icon: <PenTool className="w-4 h-4 text-rose-600" /> },
    { name: 'Re-tell Lecture', code: 'RL', icon: <Mic className="w-4 h-4 text-teal-600" /> },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-24">
        
        {/* Main Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Alfa PTE is the Best PTE <span className="text-cyan-500">Practice Platform</span> for Exam Success
          </h2>
        </div>

        {/* Feature 1: Instant AI Scoring */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
              Advanced Features of Our PTE Practice Test Online Platform
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Instant AI Scoring for Every PTE Practice Test
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Alfa PTE's cutting-edge AI-powered scoring is similar to the PTE along with instant score feedback empowering the users to efficiently identify their strengths and areas for improvement, thereby streamlining their study process and enhancing their preparation for the PTE exam.
            </p>
            <div className="pt-2">
              <a
                href="#ai-scoring"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition"
              >
                <span>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Floating task bubbles visual */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md h-72 bg-gradient-to-tr from-cyan-50/50 via-indigo-50/30 to-purple-50/50 rounded-3xl border border-slate-100 p-6 flex flex-wrap items-center justify-center gap-3">
              {/* Central AI Scoring Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-3 rounded-2xl bg-white shadow-xl border border-cyan-100 flex items-center gap-2.5 z-10">
                <div className="p-2 rounded-xl bg-cyan-500 text-white">
                  <Sparkles className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">AI Scoring Engine</div>
                  <div className="text-[10px] text-cyan-600 font-bold">Pearson Calibrated</div>
                </div>
              </div>

              {/* Surrounding Floating Task Nodes */}
              {taskPills.map((task, i) => (
                <div 
                  key={i} 
                  className="bg-white/95 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <div className="p-1 rounded-lg bg-slate-50">{task.icon}</div>
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-slate-800 block leading-tight">{task.name}</span>
                    <span className="text-[9px] font-mono text-slate-400">{task.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 2: Full-Length, Sectional & Custom Mock Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <div className="w-full max-w-md bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-800">Exam Test Varieties</span>
                <span className="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded-full">
                  Real Pearson VUE UI
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Full Scored Mock Tests</span>
                  <span className="text-slate-500 font-mono text-[11px]">2 Hours (73 Qs)</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Sectional Tests (Speaking/Writing)</span>
                  <span className="text-slate-500 font-mono text-[11px]">30-50 Mins</span>
                </div>
                <div className="p-3 bg-cyan-50/80 rounded-xl border border-cyan-200 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-cyan-900">Custom Mock Test Builder</span>
                  <span className="text-cyan-700 font-bold text-[10px] bg-white px-2 py-0.5 rounded">Exclusive</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
              Free PTE Practice Tests & Custom Mock Tests
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Take Full-Length, Sectional, Timed & Custom PTE Mock Tests
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Alfa PTE provides an extensive range of PTE mock tests with in-depth score analytics for the users to prepare. These include full mock tests, sectional mock tests, and a one-of-its-kind 'Create Your Own Mock Test' feature that enables you to create a mock test with your choice of questions helping you to prepare effectively for the PTE exam.
            </p>
            <div className="pt-2">
              <a
                href="#mock-tests"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition"
              >
                <span>Take a Mock</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Feature 3: Detailed PTE Practice & Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
              Track Your PTE Practice Progress with AI Analytics
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Detailed PTE Practice & Performance Analytics
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Alfa PTE enriches your study experience with detailed practice tools and advanced analytics, giving you an accurate picture of your performance and meticulously tracking your performance to fine-tune your preparation strategy for the PTE exam, ensuring a comprehensive understanding of the test components.
            </p>
            <div className="pt-2">
              <a
                href="#signup"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition"
              >
                <span>Join now for free</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Enabling Skills Breakdown</span>
                <span className="text-emerald-600 font-extrabold">Overall 84 / 90</span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Oral Fluency</span>
                    <span className="font-bold text-slate-900">86</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Pronunciation</span>
                    <span className="font-bold text-slate-900">82</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Written Discourse & Grammar</span>
                    <span className="font-bold text-slate-900">88</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4 & 5: Mobile App & Additional Study Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mobile App */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
                Practice PTE Online with the Alfa PTE Mobile App
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                Smart PTE Practice App for PTE Academic, UKVI & PTE Core
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Practice on the go with Alfa PTE's comprehensive PTE practice mobile application that offers a complete solution for PTE preparation like AI-powered practice tests, mock tests, detailed score analysis, multi-lingual support & many more amazing features.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="#google-play"
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition text-xs font-semibold"
              >
                <div className="w-5 h-5 flex items-center justify-center font-bold text-emerald-400">▶</div>
                <div className="text-left">
                  <div className="text-[9px] uppercase text-slate-400 leading-none">GET IT ON</div>
                  <div className="font-bold leading-tight">Google Play</div>
                </div>
              </a>
              <a 
                href="#app-store"
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition text-xs font-semibold"
              >
                <Apple className="w-5 h-5 fill-current" />
                <div className="text-left">
                  <div className="text-[9px] uppercase text-slate-400 leading-none">Download on the</div>
                  <div className="font-bold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Additional Tools */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
                Additional Tools for Better PTE Practice
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                Explore More Features to Support Your PTE Preparation
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Alfa PTE offers a lot of other innovative tools designed to enhance your PTE exam preparation, ensuring a well-rounded and effective study experience — including Band 9 essay templates, collocation banks, continuous MP3 audio player, and weekly prediction files.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#tools"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition"
              >
                <span>Try them now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
