import { useState } from 'react';
import { 
  FileSpreadsheet, 
  Bookmark, 
  Music, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'vocab' | 'mp3'
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const templates = [
    {
      id: 'di-bar',
      title: 'Describe Image — Universal Template (90/90 Fluency)',
      category: 'Speaking',
      text: `The given image shows a comprehensive visual representation regarding [TOPIC / HEADING].
According to the information provided, the highest value can be seen in [KEY ELEMENT A], which accounts for a substantial proportion.
On the other hand, the lowest figure is observed in [KEY ELEMENT B], which represents the minimum data point.
Furthermore, there is a clear trend indicating noticeable variations across [KEY ELEMENT C] and [KEY ELEMENT D].
In conclusion, it is evident from the diagram that the figures undergo significant development over the given period.`
    },
    {
      id: 'rl-lecture',
      title: 'Re-tell Lecture — Academic Lecture Template',
      category: 'Speaking',
      text: `The speaker was mainly discussing the fundamental concepts of [MAIN KEYWORD 1].
Firstly, the speaker mentioned that [KEYWORD 2] plays a pivotal role in [KEYWORD 3].
Secondly, the lecturer highlighted the significance of [KEYWORD 4], along with [KEYWORD 5].
Furthermore, the presentation emphasized the relationship between [KEYWORD 6] and [KEYWORD 7].
In conclusion, the lecture provided valuable academic insights into this crucial subject.`
    },
    {
      id: 'essay-argumentative',
      title: 'Write Essay — Standard 250-Word Argumentative Template',
      category: 'Writing',
      text: `In contemporary society, the debate regarding whether [TOPIC STATEMENT] has garnered considerable attention. While some individuals argue that [PERSPECTIVE A], others contend that [PERSPECTIVE B]. This essay will examine both perspectives before presenting a reasoned conclusion.

On the one hand, proponents of [PERSPECTIVE A] assert that it fosters several tangible benefits. Primarily, [FIRST SUPPORTING ARGUMENT] offers significant efficiency. For instance, recent empirical studies reveal that [EXAMPLE]. Consequently, this reinforces the validity of this stance.

On the other hand, opponents contend that [PERSPECTIVE B] cannot be overlooked. The primary rationale is that [SECOND SUPPORTING ARGUMENT]. A prominent illustration of this is [EXAMPLE 2]. Hence, careful consideration is imperative.

In conclusion, having analyzed both viewpoints, I firmly believe that [YOUR OPINION]. It is anticipated that relevant authorities will take appropriate measures to optimize outcomes.`
    }
  ];

  const vocabList = [
    { word: 'Detrimental', pos: 'adj', meaning: 'Causing harm or damage', collocations: 'detrimental impact, detrimental effect on health' },
    { word: 'Ubiquitous', pos: 'adj', meaning: 'Present, appearing, or found everywhere', collocations: 'ubiquitous technology, ubiquitous presence' },
    { word: 'Imperative', pos: 'adj / noun', meaning: 'Of vital importance; crucial', collocations: 'economic imperative, categorical imperative' },
    { word: 'Mitigate', pos: 'verb', meaning: 'Make less severe, serious, or painful', collocations: 'mitigate climate change, mitigate risks' },
    { word: 'Pivotal', pos: 'adj', meaning: 'Of crucial importance in relation to the development or success of something', collocations: 'pivotal role, pivotal moment' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          PTE Study Accelerators & Tools
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Band 9 templates, high-frequency collocations, and continuous background MP3 audio practice
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'templates' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4" /> Exam Templates
          </span>
        </button>
        <button
          onClick={() => setActiveTab('vocab')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'vocab' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Bookmark className="w-4 h-4" /> Academic Collocation Bank
          </span>
        </button>
        <button
          onClick={() => setActiveTab('mp3')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
            activeTab === 'mp3' 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Music className="w-4 h-4" /> Continuous MP3 Practice
          </span>
        </button>
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md uppercase">
                    {tpl.category}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{tpl.title}</h3>
                </div>

                <button
                  onClick={() => handleCopy(tpl.id, tpl.text)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition flex items-center gap-1.5 self-start"
                >
                  {copiedId === tpl.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed border border-slate-100">
                {tpl.text}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vocab Tab */}
      {activeTab === 'vocab' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3">Word</th>
                  <th className="pb-3">Part of Speech</th>
                  <th className="pb-3">Definition</th>
                  <th className="pb-3">Pearson Collocation Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vocabList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 font-extrabold text-indigo-700">{item.word}</td>
                    <td className="py-3 text-slate-500 font-mono">{item.pos}</td>
                    <td className="py-3 text-slate-800 font-medium">{item.meaning}</td>
                    <td className="py-3 font-mono text-slate-600">{item.collocations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MP3 Continuous Practice Tab */}
      {activeTab === 'mp3' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs max-w-2xl space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Background MP3 Audio Player</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Listen to 200+ Write From Dictation and Repeat Sentence audio recordings in a continuous loop during your daily commute or while doing chores to train auditory muscle memory.
          </p>

          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-indigo-300">Playlist: High-Frequency WFD (Nov 2026)</span>
              <span className="text-slate-400">Track 14 / 120</span>
            </div>

            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">01:12 / 02:40</span>
              <div className="flex items-center gap-3">
                <button className="p-2.5 rounded-full bg-white text-slate-900 hover:bg-indigo-50 transition">
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
              <span className="text-xs text-slate-400">Speed: 1.0x</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
