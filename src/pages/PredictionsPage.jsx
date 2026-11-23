import { Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PredictionsPage() {
  const predictions = [
    { code: 'WFD', task: 'Write From Dictation', title: 'The economic theory suggests consumer confidence...', freq: '18 times this week', difficulty: 'Hard', id: 'WFD-7001' },
    { code: 'RA', task: 'Read Aloud', title: 'Global Climate & Renewable Transition', freq: '14 times this week', difficulty: 'Hard', id: 'RA-1001' },
    { code: 'RS', task: 'Repeat Sentence', title: 'Students are requested to submit all completed assignments...', freq: '22 times this week', difficulty: 'Medium', id: 'RS-2001' },
    { code: 'SWT', task: 'Summarize Written Text', title: 'Biodiversity Loss and Agricultural Monoculture', freq: '9 times this week', difficulty: 'Hard', id: 'SWT-4001' },
    { code: 'FIB-RW', task: 'Reading & Writing FIB', title: 'Marine Ecosystems and Coral Bleaching', freq: '11 times this week', difficulty: 'Hard', id: 'FIB-RW-6001' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-3 backdrop-blur-xs">
          <Flame className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
          <span>Real Exam Memory Weekly Prediction</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Most Frequently Repeated Questions (Week of Nov 2026)
        </h1>
        <p className="text-amber-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          Aggregated from 1,200+ actual exam takers across Pearson test centers worldwide. Prioritize these questions for immediate score gains.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="space-y-3">
          {predictions.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition gap-4">
              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-amber-50 text-amber-700 font-mono font-bold text-xs rounded-lg mt-0.5">
                  {item.code}
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="text-amber-700 font-semibold">{item.freq}</span>
                    <span>•</span>
                    <span>{item.task}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-700">{item.difficulty}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/practice/read-aloud"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-indigo-600 transition flex items-center gap-1 self-start sm:self-center"
              >
                <span>Practice Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
