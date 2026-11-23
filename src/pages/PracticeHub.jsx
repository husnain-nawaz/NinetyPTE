import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Layers, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { PTE_MODULES } from '../config/pteModules';

export default function PracticeHub() {
  const [selectedModule, setSelectedModule] = useState('all');

  const filteredModules = selectedModule === 'all' 
    ? PTE_MODULES 
    : PTE_MODULES.filter(m => m.id === selectedModule);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            PTE Question Bank & Practice Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete collection of all 20+ PTE Academic & Core question types with instant AI scoring
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'speaking', label: 'Speaking (6)' },
            { id: 'writing', label: 'Writing (3)' },
            { id: 'reading', label: 'Reading (5)' },
            { id: 'listening', label: 'Listening (8)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedModule(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedModule === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task Type Grid */}
      <div className="space-y-10">
        {filteredModules.map((module) => (
          <div key={module.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1.5 rounded-full bg-indigo-600"></div>
              <h2 className="text-xl font-black text-slate-900">{module.name} Module</h2>
              <span className="text-xs text-slate-500 font-medium">({module.description})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {module.tasks.map((task) => (
                <div 
                  key={task.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-mono font-bold text-xs rounded-md">
                          {task.code}
                        </span>
                        {task.badge && (
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md">
                            {task.badge}
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        task.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700' :
                        task.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition">
                      {task.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                      {task.desc}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {task.skillsTested?.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Total Available:</span>
                        <span className="font-bold text-slate-900">{task.totalQuestions} Questions</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span className="flex items-center gap-1 text-amber-700">
                          <Flame className="w-3 h-3 text-amber-500" /> Exam Predicted:
                        </span>
                        <span className="font-bold text-amber-700">{task.predictedCount}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200/50">
                        <span>Hostinger Shard:</span>
                        <span className="font-mono text-indigo-600 font-medium">{task.shardedDb}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/practice/${task.id}`}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-indigo-600 transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Practice Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
