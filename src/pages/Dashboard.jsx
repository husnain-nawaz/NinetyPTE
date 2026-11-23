import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Target, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  Laptop, 
  Database,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { PTE_MODULES } from '../config/pteModules';

export default function Dashboard() {
  const stats = [
    { label: 'Target Score', value: '79+', sub: 'Superior English', icon: <Target className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50' },
    { label: 'Practice Streak', value: '12 Days', sub: 'Top 5% consistency', icon: <Flame className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50' },
    { label: 'Questions Solved', value: '428', sub: '+32 this week', icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Predicted Score', value: '74 / 90', sub: 'Proficient level', icon: <TrendingUp className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50' },
  ];

  const recentPractices = [
    { code: 'RA', task: 'Read Aloud #1001', module: 'Speaking', score: '84/90', time: '2 hours ago', status: 'Excellent' },
    { code: 'WFD', task: 'Write from Dictation #7001', module: 'Listening', score: '90/90', time: 'Yesterday', status: 'Perfect' },
    { code: 'FIB-RW', task: 'Reading FIB #6001', module: 'Reading', score: '78/90', time: 'Yesterday', status: 'Good' },
    { code: 'WE', task: 'Write Essay #5001', module: 'Writing', score: '76/90', time: '2 days ago', status: 'Good' },
  ];

  const getModuleIcon = (id) => {
    switch (id) {
      case 'speaking': return <Mic className="w-6 h-6 text-amber-500" />;
      case 'writing': return <PenTool className="w-6 h-6 text-blue-500" />;
      case 'reading': return <BookOpen className="w-6 h-6 text-emerald-500" />;
      case 'listening': return <Headphones className="w-6 h-6 text-purple-500" />;
      default: return <BookOpen className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 shadow-lg shadow-indigo-100">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold mb-3 backdrop-blur-xs">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome back, teglobehistory (VIP Pro)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Ace Your PTE Exam with Precision AI Scoring
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed mb-6">
            Calibrated against the real Pearson algorithm. Your target is 79+ for immigration & university admissions. You are only 5 points away!
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/practice/read-aloud"
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow hover:bg-indigo-50 transition inline-flex items-center gap-2"
            >
              <Mic className="w-4 h-4" /> Start Daily Practice
            </Link>
            <Link
              to="/mock-tests"
              className="px-5 py-2.5 rounded-xl bg-indigo-900/60 text-white font-bold text-sm border border-white/20 hover:bg-indigo-900 transition inline-flex items-center gap-2"
            >
              <Laptop className="w-4 h-4 text-rose-300" /> Take Scored Mock Test
            </Link>
            <Link
              to="/db-shards"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-200 font-bold text-sm border border-emerald-400/30 hover:bg-emerald-500/30 transition inline-flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-emerald-400" /> 10x Hostinger Shards
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
              <div className={`p-2 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            </div>
            <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 font-medium mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* 4 Core PTE Modules Overview Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">PTE Module Practice</h2>
            <p className="text-xs text-slate-500">Pick any section to practice real exam questions with AI scoring</p>
          </div>
          <Link to="/practice" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View All 20+ Tasks <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PTE_MODULES.map((module) => {
            const totalTasks = module.tasks.length;
            const totalQuestions = module.tasks.reduce((sum, t) => sum + t.totalQuestions, 0);

            return (
              <div 
                key={module.id} 
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                      {getModuleIcon(module.id)}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">
                      {totalTasks} Task Types
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-1">{module.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{module.description}</p>

                  <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Total Questions:</span>
                      <span className="text-slate-800">{totalQuestions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Predicted (Hot):</span>
                      <span className="text-amber-600 font-bold">~450</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/practice/${module.tasks[0].id}`}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-indigo-600 transition flex items-center justify-center gap-1.5"
                >
                  <span>Practice {module.tasks[0].name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Recent Practice Attempts & High Priority Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Attempts Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Recent AI Practice Attempts</h3>
              <p className="text-xs text-slate-500">Live evaluation records stored across Hostinger user shard</p>
            </div>
            <Link to="/practice/read-aloud" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              Practice More
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3">Task</th>
                  <th className="pb-3">Module</th>
                  <th className="pb-3">AI Score</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPractices.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-800 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600">
                        {row.code}
                      </span>
                      <span>{row.task}</span>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">{row.module}</td>
                    <td className="py-3 font-extrabold text-indigo-600">{row.score}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{row.time}</td>
                    <td className="py-3 text-right">
                      <Link to="/practice/read-aloud" className="font-bold text-indigo-600 hover:text-indigo-800">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Launch Prediction File */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl text-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold mb-3 backdrop-blur-xs">
              <Flame className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
              <span>Weekly Exam Prediction</span>
            </div>
            <h3 className="text-xl font-black mb-2">High Frequency Pearson Bank</h3>
            <p className="text-xs text-amber-100 leading-relaxed mb-4">
              92% of recent test takers in Sydney, Melbourne, Dubai & London encountered these exact Write from Dictation & Repeat Sentences in the past 7 days.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-semibold">
                <span>Write From Dictation (WFD)</span>
                <span className="px-1.5 py-0.5 bg-yellow-300 text-amber-900 rounded font-black text-[10px]">65 Predicted</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-semibold">
                <span>Repeat Sentence (RS)</span>
                <span className="px-1.5 py-0.5 bg-yellow-300 text-amber-900 rounded font-black text-[10px]">80 Predicted</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs font-semibold">
                <span>Read Aloud (RA)</span>
                <span className="px-1.5 py-0.5 bg-yellow-300 text-amber-900 rounded font-black text-[10px]">55 Predicted</span>
              </div>
            </div>
          </div>

          <Link
            to="/predictions"
            className="w-full py-2.5 bg-white text-orange-600 font-extrabold text-xs text-center rounded-xl shadow hover:bg-orange-50 transition"
          >
            Open Prediction Bank
          </Link>
        </div>
      </div>
    </div>
  );
}
