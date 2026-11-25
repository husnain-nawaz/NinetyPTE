import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowRight, FileText, Info, Monitor, X } from 'lucide-react';
import PTEDashboardHeader from './PTEDashboardHeader';
import PTEDashboardTealFooter from './PTEDashboardTealFooter';
import { GRAMMAR_TOPICS } from './pteGrammarData';

const STUDY_TOOL_TABS = [
  { id: 'templates', label: 'Templates' },
  { id: 'predictions', label: 'Predictions' },
  { id: 'grammar', label: 'Grammar' },
];

function downloadStudySheet(topic) {
  const content = [
    `NinetyPTE Study Tool — ${topic.title}`,
    `Focus: ${topic.focus}`,
    '',
    'Key Rule:',
    topic.summary,
    '',
    'Examples:',
    ...topic.examples.map((ex, i) => `${i + 1}. ${ex}`),
    '',
    'Practice more at https://ninetypte.com',
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * NinetyPTE Study Tools — Grammar reference & downloadable rule sheets (`/v1/grammar`, `/grammar`).
 */
export default function PTEGrammarPage() {
  const navigate = useNavigate();
  const [examVariant, setExamVariant] = useState('academic');
  const [activeTab, setActiveTab] = useState('grammar');
  const [showInfoTip, setShowInfoTip] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader
        examVariant={examVariant}
        onChangeExamVariant={setExamVariant}
        onOpenReferModal={() => navigate('/dashboard')}
      />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Study Tools Heading Row */}
        <div className="relative flex items-center gap-3 mb-6">
          <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
            <Monitor className="w-4 h-4" />
          </span>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">
              Study Tools
            </h1>
            <button
              type="button"
              onClick={() => setShowInfoTip((prev) => !prev)}
              aria-label="About Study Tools"
              className="text-[#0c4a7e]/75 hover:text-[#0097a7] cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {showInfoTip && (
            <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 shadow-lg z-30">
              Download concise PTE grammar cheat sheets, collocation lists, and exam frameworks curated by NinetyPTE trainers.
            </div>
          )}
        </div>

        {/* Folder-Style Tabs: Templates | Predictions | Grammar */}
        <div className="flex items-end gap-1 pl-2">
          {STUDY_TOOL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0c4a7e] font-bold border-t border-l border-r border-slate-200/80 shadow-[0_-2px_6px_rgba(15,23,42,0.03)] relative z-10'
                    : 'text-slate-600 hover:text-[#0c4a7e]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Tab Content Card */}
        <section className="bg-white rounded-b-2xl rounded-tr-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs -mt-px">
          {activeTab === 'grammar' && (
            <>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 mb-5">
                Grammar
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GRAMMAR_TOPICS.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedTopic(topic);
                      }
                    }}
                    className="group rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 hover:border-[#00b4c6] hover:shadow-2xs transition flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-[#eff6fd] text-[#0c4a7e] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </span>
                      <span className="text-xs sm:text-[13.5px] font-semibold text-[#0c4a7e] group-hover:text-[#0097a7] truncate transition-colors">
                        {topic.title}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label={`Download ${topic.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadStudySheet(topic);
                      }}
                      className="w-8 h-8 rounded-full bg-[#fdf2f8] hover:bg-[#fce7f3] text-[#ec4899] flex items-center justify-center shrink-0 transition cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'templates' && (
            <div className="py-8 text-center max-w-lg mx-auto space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                PTE Speaking &amp; Writing Templates
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Access flexible high-scoring templates for Describe Image, Retell Lecture, Summarize Written Text, Write Essay, and PTE Core Write Email.
              </p>
              <Link
                to="/best-pte-practice-preparation-material"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white px-5 py-2 text-xs font-bold shadow-xs transition"
              >
                <span>Open PTE Study Material</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {activeTab === 'predictions' && (
            <div className="py-8 text-center max-w-lg mx-auto space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                Weekly Prediction Files
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore high-frequency repeated questions for Speaking, Writing, Reading, and Listening before test day.
              </p>
              <Link
                to="/best-pte-practice-preparation-material"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white px-5 py-2 text-xs font-bold shadow-xs transition"
              >
                <span>View Prediction Resources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </section>
      </main>

      <PTEDashboardTealFooter />

      {/* Grammar Rule Quick-View & Download Modal */}
      {selectedTopic && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0c4a7e]">
                  {selectedTopic.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedTopic.focus}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                aria-label="Close grammar modal"
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                {selectedTopic.summary}
              </p>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Examples
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                  {selectedTopic.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => downloadStudySheet(selectedTopic)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ec4899] hover:bg-[#db2777] text-white px-4 py-2 text-xs font-bold shadow-xs cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Download Study Sheet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
