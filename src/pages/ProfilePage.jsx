import { useState } from 'react';
import { User, Award, Target, Calendar, Database, ShieldCheck, Mail, Save } from 'lucide-react';

export default function ProfilePage() {
  const [targetScore, setTargetScore] = useState('79');
  const [examDate, setExamDate] = useState('2026-12-15');
  const [examType, setExamType] = useState('PTE Academic');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Candidate Profile & Exam Objectives
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal study goals, target score calibrations, and Hostinger cloud sync settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black mb-3 shadow-md">
            TG
          </div>
          <h2 className="text-lg font-black text-slate-900">teglobehistory</h2>
          <span className="text-xs text-slate-500">teglobehistory@gmail.com</span>

          <div className="mt-3 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>VIP Pro Member</span>
          </div>

          <div className="w-full border-t border-slate-100 mt-6 pt-4 space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-slate-400">Account ID:</span>
              <span className="font-mono text-slate-700 font-bold">#TG-90284</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Auth Shard:</span>
              <span className="font-mono text-indigo-600 font-bold">db_core_auth</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Attempt Shard:</span>
              <span className="font-mono text-indigo-600 font-bold">db_attempts_shard_1</span>
            </div>
          </div>
        </div>

        {/* Form Settings */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-base font-extrabold text-slate-900 mb-4">Target Score & Exam Schedule</h3>

          <form onSubmit={handleSave} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Target PTE Score</label>
              <div className="grid grid-cols-3 gap-3">
                {['65 (Competent)', '79 (Superior)', '85+ (Elite)'].map((score) => {
                  const val = score.split(' ')[0];
                  return (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setTargetScore(val)}
                      className={`p-3 rounded-xl border text-center font-bold transition ${
                        targetScore === val
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {score}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Target Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              >
                <option value="PTE Academic">PTE Academic (Australia / UK / Canada / NZ study & visa)</option>
                <option value="PTE Core">PTE Core (Canada Express Entry & CLB 9)</option>
                <option value="PTE UKVI">PTE Academic UKVI</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{saved ? 'Saved to Hostinger DB!' : 'Save Objectives'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
