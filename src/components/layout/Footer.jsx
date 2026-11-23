import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Database } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-3">PTE Speaking</h4>
            <ul className="space-y-1.5">
              <li><Link to="/practice/read-aloud" className="hover:text-indigo-600">Read Aloud (RA)</Link></li>
              <li><Link to="/practice/repeat-sentence" className="hover:text-indigo-600">Repeat Sentence (RS)</Link></li>
              <li><Link to="/practice/describe-image" className="hover:text-indigo-600">Describe Image (DI)</Link></li>
              <li><Link to="/practice/retell-lecture" className="hover:text-indigo-600">Re-tell Lecture (RL)</Link></li>
              <li><Link to="/practice/answer-short-question" className="hover:text-indigo-600">Answer Short Question</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-3">PTE Writing & Reading</h4>
            <ul className="space-y-1.5">
              <li><Link to="/practice/summarize-written-text" className="hover:text-indigo-600">Summarize Written Text</Link></li>
              <li><Link to="/practice/write-essay" className="hover:text-indigo-600">Write Essay (WE)</Link></li>
              <li><Link to="/practice/fill-in-blanks-rw" className="hover:text-indigo-600">FIB Reading & Writing</Link></li>
              <li><Link to="/practice/reorder-paragraphs" className="hover:text-indigo-600">Re-order Paragraphs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-3">PTE Listening</h4>
            <ul className="space-y-1.5">
              <li><Link to="/practice/summarize-spoken-text" className="hover:text-indigo-600">Summarize Spoken Text</Link></li>
              <li><Link to="/practice/fill-in-blanks-l" className="hover:text-indigo-600">Listening FIB</Link></li>
              <li><Link to="/practice/write-from-dictation" className="hover:text-indigo-600">Write from Dictation (WFD)</Link></li>
              <li><Link to="/practice/highlight-incorrect-words" className="hover:text-indigo-600">Highlight Incorrect Words</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-3">Platform & Hostinger</h4>
            <ul className="space-y-1.5">
              <li><Link to="/db-shards" className="hover:text-indigo-600 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-emerald-600" /> Hostinger 10x DB Shards
              </Link></li>
              <li><Link to="/mock-tests" className="hover:text-indigo-600">Pearson Full Mock Tests</Link></li>
              <li><Link to="/tools/templates" className="hover:text-indigo-600">Proven Band 9 Templates</Link></li>
              <li><Link to="/pricing" className="hover:text-indigo-600">VIP Pro Membership</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">NinetyPTE</span>
            <span>—</span>
            <span>Alfa PTE Clone with Distributed Hostinger Database Architecture.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Pearson VUE® is a registered trademark not affiliated with this practice software.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
