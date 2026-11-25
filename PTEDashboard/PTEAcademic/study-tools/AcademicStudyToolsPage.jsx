import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDown,
  BarChart2,
  FileText,
  Info,
  Monitor,
  X,
} from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';
import { GRAMMAR_TOPICS } from './grammarData';
import { PREDICTION_FILES_ACADEMIC } from './predictionsData';
import { TEMPLATE_FILES_ACADEMIC } from './templatesData';

const STUDY_TOOL_TABS = [
  { id: 'templates', label: 'Templates', path: '/v1/templates' },
  { id: 'predictions', label: 'Predictions', path: '/v1/prediction' },
  { id: 'grammar', label: 'Grammar', path: '/v1/grammar' },
];

function downloadStudyResource(item) {
  const bullets = item.examples || item.highlights || [];
  const sectionLabel = item.examples ? 'Examples:' : 'Included Structure / Highlights:';
  const content = [
    `NinetyPTE Study Tool — ${item.title}`,
    `Focus: ${item.focus}`,
    '',
    'Overview:',
    item.summary,
    '',
    sectionLabel,
    ...bullets.map((entry, idx) => `${idx + 1}. ${entry}`),
    '',
    'Practice interactively at https://ninetypte.com',
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function ResourceCardGrid({
  items,
  Icon,
  iconRadiusClass = 'rounded-full',
  onSelect,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(item);
            }
          }}
          className="group rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 hover:border-[#00b4c6] hover:shadow-2xs transition flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`w-8 h-8 ${iconRadiusClass} bg-[#eff6fd] text-[#0c4a7e] flex items-center justify-center shrink-0`}
            >
              <Icon className="w-4 h-4" />
            </span>
            <span className="text-xs sm:text-[13.5px] font-semibold text-[#0c4a7e] group-hover:text-[#0097a7] truncate transition-colors">
              {item.title}
            </span>
          </div>

          <button
            type="button"
            aria-label={`Download ${item.title}`}
            onClick={(e) => {
              e.stopPropagation();
              downloadStudyResource(item);
            }}
            className="w-8 h-8 rounded-full bg-[#fdf2f8] hover:bg-[#fce7f3] text-[#ec4899] flex items-center justify-center shrink-0 transition cursor-pointer"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 * PTE Academic Study Tools tabbed workspace (/v1/templates, /v1/prediction, /v1/grammar).
 */
export default function AcademicStudyToolsPage({ initialTab = 'grammar' }) {
  const navigate = useNavigate();
  const [showInfoTip, setShowInfoTip] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const activeTab = initialTab;
  const modalBullets = selectedResource
    ? selectedResource.examples || selectedResource.highlights || []
    : [];

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative flex items-center gap-3 mb-6">
          <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
            <Monitor className="w-4 h-4" />
          </span>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">Study Tools</h1>
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
              Access PTE Academic Speaking &amp; Writing templates, weekly prediction files, and downloadable grammar rule sheets inside Study Tools.
            </div>
          )}
        </div>

        <div className="inline-flex items-end rounded-t-xl bg-[#ebf1f7] p-1 pb-0">
          {STUDY_TOOL_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => navigate(tab.path)}
                className={`px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0c4a7e] font-bold shadow-[0_-2px_6px_rgba(15,23,42,0.04)] relative z-10'
                    : 'text-slate-600 hover:text-[#0c4a7e]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <section className="bg-white rounded-2xl rounded-tl-none border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          {activeTab === 'templates' && (
            <>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 mb-5">Templates</h2>
              <ResourceCardGrid
                items={TEMPLATE_FILES_ACADEMIC}
                Icon={FileText}
                iconRadiusClass="rounded-full"
                onSelect={setSelectedResource}
              />
            </>
          )}

          {activeTab === 'predictions' && (
            <>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 mb-5">Predictions</h2>
              <ResourceCardGrid
                items={PREDICTION_FILES_ACADEMIC}
                Icon={BarChart2}
                iconRadiusClass="rounded-full"
                onSelect={setSelectedResource}
              />
            </>
          )}

          {activeTab === 'grammar' && (
            <>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 mb-5">Grammar</h2>
              <ResourceCardGrid
                items={GRAMMAR_TOPICS}
                Icon={FileText}
                iconRadiusClass="rounded-lg"
                onSelect={setSelectedResource}
              />
            </>
          )}
        </section>
      </main>

      <PTEDashboardTealFooter />

      {selectedResource && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedResource(null)}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0c4a7e]">{selectedResource.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedResource.focus}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                aria-label="Close resource modal"
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">{selectedResource.summary}</p>

              {modalBullets.length > 0 && (
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {selectedResource.examples ? 'Examples' : 'Key Lines & Structure'}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4">
                    {modalBullets.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedResource(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => downloadStudyResource(selectedResource)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#ec4899] hover:bg-[#db2777] text-white px-4 py-2 text-xs font-bold shadow-xs cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
