import { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ProductTabsSection() {
  const [activeTab, setActiveTab] = useState('academic');

  const tabs = [
    { id: 'academic', label: 'PTE Academic / UKVI' },
    { id: 'core', label: 'PTE Core' },
    { id: 'ielts', label: 'IELTS Academic' },
    { id: 'languagecert', label: 'LanguageCert' },
  ];

  const content = {
    academic: {
      title: 'PTE Academic / UKVI Preparation',
      description: 'PTE Academic is a trusted, computer-based English language test designed for international students and professionals seeking study, work, or migration visas in Australia, the UK, the USA, Canada, and New Zealand. Our AI-driven platform delivers calibrated scoring across all 20 question types with detailed acoustic and linguistic diagnostics within minutes.',
      features: [
        'Latest Exam Question Predictions & Recall Banks',
        'Pearson-Calibrated AI Scored Full Mock Exams',
        'Task Strategy Guides & Band 9 Audio Examples',
        'Targeted Daily Study Plans & Weakness Analyzers',
        'Custom Mock Test Builder tailored to your needs'
      ],
      primaryBtn: 'Practice Academic Questions',
      secondaryBtn: 'Launch Academic Mock'
    },
    core: {
      title: 'PTE Core (Canada Express Entry)',
      description: 'PTE Core is approved by Immigration, Refugees and Citizenship Canada (IRCC) for economic visa pathways, Provincial Nominee Programs (PNP), and Canadian citizenship. Master practical, real-world English communication tasks including email drafting and workplace situational dialogues with instant CLB level alignment.',
      features: [
        'Complete Canadian Language Benchmark (CLB 7, 8, 9, 10) Alignment',
        'Dedicated Write Email (WEM) & Situational Dialogue Arenas',
        'High-Frequency Canada Real Exam Recalls',
        'Timed Sectional Practice with Instant Score Feedback',
        'Express Entry Points Calculator & Score Diagnostic'
      ],
      primaryBtn: 'Practice PTE Core Tasks',
      secondaryBtn: 'Launch Core Mock Test'
    },
    ielts: {
      title: 'IELTS Academic & General Training',
      description: 'Comprehensive preparation for both IELTS computer-delivered and paper-based formats. Practice with authentic task 1 visual descriptors, task 2 argumentative essays, and native-speaker listening audio clips with automated lexical resource and grammatical range evaluation.',
      features: [
        'Automated IELTS Band 7+ Essay Grading',
        'Full 4-Skill Band Calculators (1.0 to 9.0 Scale)',
        'Extensive Academic Reading Passages with Explanations',
        'Native-Speaker Audio Recordings for Listening Sections',
        'Speaking Interview Simulation Prompts'
      ],
      primaryBtn: 'Explore IELTS Arena',
      secondaryBtn: 'Practice IELTS Writing'
    },
    languagecert: {
      title: 'LanguageCert International ESOL',
      description: 'Prepare for LanguageCert computer-delivered exams mapped to CEFR levels (B1, B2, C1, C2). Access interactive practice modules designed to build listening, reading, writing, and spoken English communication for international academic accreditation.',
      features: [
        'Full CEFR Level Mapping (B1 through C2 Mastery)',
        'Modular Practice Tests for Written and Spoken Exams',
        'Comprehensive Answer Keys with In-Depth Explanations',
        'Grammar Accuracy & Syntax Assessment Tools',
        'Official-Style Exam Interface Simulation'
      ],
      primaryBtn: 'Explore LanguageCert',
      secondaryBtn: 'Take Diagnostic Test'
    }
  };

  const active = content[activeTab] || content.academic;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
            Comprehensive English Exam Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore All Test Preparation Programs
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex flex-wrap gap-2 sm:gap-8 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Panel */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {active.title}
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {active.description}
              </p>

              {/* Feature Checkmarks */}
              <div className="space-y-2.5 pt-2">
                {active.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="font-semibold">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="#practice"
                  className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
                >
                  <span>{active.primaryBtn}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#mock-tests"
                  className="px-5 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs bg-slate-50 hover:bg-slate-100 transition"
                >
                  {active.secondaryBtn}
                </a>
              </div>
            </div>

            {/* Right Illustration Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Student practicing online"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">Target Score 79+</span>
                  <p className="text-sm font-bold mt-1">Real Exam Simulation with Live Microphone & Text Analytics</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
