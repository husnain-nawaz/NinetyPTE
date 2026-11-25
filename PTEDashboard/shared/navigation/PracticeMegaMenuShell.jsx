import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Search, Sparkles } from 'lucide-react';
import { ANALYTICS_SKILL_COLORS } from '../analytics/analyticsConstants';

const SKILL_COLOR_CLASSES = {
  Speaking: 'text-[#eb8c44]',
  Writing: 'text-[#5ba4f5]',
  Reading: 'text-[#36c959]',
  Listening: 'text-[#12487a]',
};

/**
 * Reusable full-width mega-menu layout shared by AcademicPracticeMegaMenu and
 * CorePracticeMegaMenu, parameterized by skill columns, Study Tools links, and optional legend.
 */
export default function PracticeMegaMenuShell({
  columns,
  studyToolLinks,
  showLegend = false,
  onClose,
}) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();

  return (
    <div className="absolute left-0 right-0 top-full bg-[#f8fafc] border-b border-slate-200 shadow-2xl z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        {/* Top Row: Search + Optional Skill Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search practice tasks"
              className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00b4c6]"
            />
          </div>

          {showLegend && (
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-[13px] font-medium text-slate-600">
              {Object.entries(ANALYTICS_SKILL_COLORS).map(([skill, hex]) => (
                <span key={skill} className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hex }} />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 4-Column Task Matrix Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {columns.map(({ title, Icon, items }) => {
              const filteredItems = normalized
                ? items.filter((item) => item.name.toLowerCase().includes(normalized))
                : items;

              return (
                <div key={title} className="space-y-3">
                  <div className="flex items-center gap-2 text-[#0c4a7e] font-bold text-sm pb-1">
                    <Icon className="w-4 h-4" />
                    <span>{title}</span>
                  </div>

                  {filteredItems.length > 0 ? (
                    <ul className="space-y-2.5">
                      {filteredItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.to}
                            onClick={onClose}
                            className="group flex items-start justify-between gap-2 text-xs sm:text-[13px] text-slate-600 hover:text-[#0c4a7e] transition"
                          >
                            <span className="inline-flex items-center gap-1.5 leading-snug group-hover:font-medium">
                              <span>{item.name}</span>
                              {item.ai && (
                                <Sparkles
                                  className="w-3.5 h-3.5 shrink-0 text-[#9333ea] fill-[#9333ea]"
                                  aria-label="AI Scored"
                                />
                              )}
                            </span>

                            {Array.isArray(item.weights) && item.weights.length > 0 && (
                              <span className="inline-flex items-center gap-1.5 shrink-0 font-bold text-[11.5px] tabular-nums pt-0.5">
                                {item.weights.map((w, idx) => (
                                  <span
                                    key={`${item.name}-${idx}`}
                                    className={SKILL_COLOR_CLASSES[w.color] || 'text-slate-700'}
                                  >
                                    {w.pct}
                                  </span>
                                ))}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400">No matching tasks</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Study Tools Strip */}
        <div className="rounded-2xl border border-slate-200/80 bg-white px-5 sm:px-6 py-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#0c4a7e] font-bold text-sm">
            <Monitor className="w-4 h-4" />
            <span>Study Tools</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs sm:text-[13px] font-medium text-slate-600">
            {studyToolLinks.map((tool) => (
              <Link
                key={tool.label}
                to={tool.to}
                onClick={onClose}
                className="hover:text-[#00b4c6] transition"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
