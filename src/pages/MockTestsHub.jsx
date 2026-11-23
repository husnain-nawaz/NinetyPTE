import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  Clock, 
  Award, 
  CheckCircle2, 
  Play, 
  PlusCircle, 
  FileCheck, 
  BarChart2, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function MockTestsHub() {
  const [activeTab, setActiveTab] = useState('full'); // 'full' | 'sectional' | 'custom'

  const fullMockTests = [
    {
      id: 'mock-01',
      title: 'Pearson Full Mock Test A (Official Calibration)',
      type: 'Full Exam Simulation',
      duration: '2 Hours (120 mins)',
      questions: 73,
      attempts: 14200,
      difficulty: 'Official Exam Standard',
      status: 'Available',
      badge: 'Recommended'
    },
    {
      id: 'mock-02',
      title: 'Pearson Full Mock Test B (High Frequency 2026)',
      type: 'Full Exam Simulation',
      duration: '2 Hours (120 mins)',
      questions: 73,
      attempts: 9800,
      difficulty: 'Hard (Strict Fluency)',
      status: 'Available'
    },
    {
      id: 'mock-03',
      title: 'Pearson Full Mock Test C (Recent Real Exam Memory)',
      type: 'Full Exam Simulation',
      duration: '2 Hours (120 mins)',
      questions: 73,
      attempts: 7100,
      difficulty: 'Official Exam Standard',
      status: 'Available'
    }
  ];

  const sectionalTests = [
    { module: 'Speaking Mock', duration: '30 mins', tasks: 'RA, RS, DI, RL, ASQ', questions: 28 },
    { module: 'Writing Mock', duration: '50 mins', tasks: 'SWT (x2), Write Essay', questions: 3 },
    { module: 'Reading Mock', duration: '32 mins', tasks: 'FIB-RW, RO, FIB-R, MCSA, MCMA', questions: 18 },
    { module: 'Listening Mock', duration: '40 mins', tasks: 'SST, FIB-L, HIW, WFD (x4)', questions: 22 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pearson VUE Mock Test Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Replicates the authentic exam screen layout, countdown timers, microphone checks, and instant scored reports
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('full')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'full' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Full Mock Tests (3)
          </button>
          <button
            onClick={() => setActiveTab('sectional')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'sectional' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Sectional Mocks (4)
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'custom' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Create Custom Mock
          </button>
        </div>
      </div>

      {/* Mock Exam Environment Notice */}
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-950 leading-relaxed">
          <strong>Exam Condition Warning:</strong> Full mock tests use fullscreen lockdown mode and strict uninterrupted countdown timers matching Pearson VUE centers. Ensure your headset microphone is tested and plugged in before starting.
        </div>
      </div>

      {/* Full Mock Tests List */}
      {activeTab === 'full' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fullMockTests.map((test) => (
            <div 
              key={test.id} 
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-bold rounded-lg">
                    {test.id.toUpperCase()}
                  </span>
                  {test.badge && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                      ★ {test.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-2">{test.title}</h3>

                <div className="space-y-2 bg-slate-50 rounded-xl p-3 mb-6 text-xs text-slate-600 font-medium">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-bold text-slate-900">{test.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-bold text-slate-900">{test.questions} Items</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scoring:</span>
                    <span className="font-bold text-emerald-600">Instant AI Scorecard</span>
                  </div>
                </div>
              </div>

              <Link
                to="/practice/read-aloud"
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-indigo-600 transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Mock Exam</span>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Sectional Tests */}
      {activeTab === 'sectional' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sectionalTests.map((sec, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">{sec.module}</h3>
                <span className="text-xs text-indigo-600 font-bold block mb-4">{sec.duration}</span>

                <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs space-y-1.5 text-slate-600">
                  <p><strong>Tasks Covered:</strong> {sec.tasks}</p>
                  <p><strong>Questions:</strong> {sec.questions} items</p>
                </div>
              </div>

              <Link
                to="/practice/read-aloud"
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-indigo-600 transition"
              >
                Start Sectional Test
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Custom Mock Test Builder */}
      {activeTab === 'custom' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs max-w-2xl">
          <h3 className="text-lg font-extrabold text-slate-900 mb-2">Create Your Own Custom Mock Test</h3>
          <p className="text-xs text-slate-500 mb-6">
            Like Alfa PTE's signature feature, hand-pick task types, set your custom question counts, and simulate targeted timed practice.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Test Name</label>
              <input 
                type="text" 
                defaultValue="My Speaking & Dictation Blitz" 
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Select Target Task Types</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {['Read Aloud', 'Repeat Sentence', 'Write Essay', 'FIB Reading', 'Write from Dictation', 'Summarize Spoken Text'].map((item) => (
                  <label key={item} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={() => alert('Custom mock test generated and saved to Hostinger db_mock_tests!')}
              className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow hover:bg-indigo-700 transition"
            >
              Generate Custom Mock Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
