import { Link } from 'react-router-dom';
import { ModuleTabsBar, ScoreEmptyState, SkillIconGlyph } from '../MockTestSharedUI';
import { SCORE_SECTION_TABS, SKILL_THEME_TOKENS } from '../mockTestsData';
import {
  OverallScoreProgressChart,
  PerformanceDeltaCell,
  ScoreRing,
} from './ScoreHistoryCharts';
import { buildPerformanceRows, FULL_SCORE_SKILLS } from './scoreHistoryUtils';

/**
 * Full Mock Test Score History section: 5 skill ring cards, Overall Score Progress chart,
 * Performance Summary metrics, and Full Mock Test History table.
 */
export function FullMockHistorySection({
  fullAttempts,
  summary,
  viewScoreRoute,
  cardSurface,
  darkMode,
}) {
  const performanceRows = buildPerformanceRows(summary);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {FULL_SCORE_SKILLS.map((skill) => {
          const token = SKILL_THEME_TOKENS[skill] || SKILL_THEME_TOKENS.Overall;
          const val = summary.skills[skill] || 0;
          return (
            <div
              key={skill}
              className={`rounded-2xl border px-4 py-3.5 shadow-2xs flex items-center justify-between gap-3 ${
                darkMode
                  ? 'border-zinc-800 bg-[#14171c]'
                  : skill === 'Overall'
                    ? 'border-[#dfd6f7] bg-white'
                    : 'border-slate-200/80 bg-white'
              }`}
            >
              <div>
                <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${token.cardAccentClass}`}>
                  <SkillIconGlyph skill={skill} className="w-3.5 h-3.5" />
                  <span>{skill}</span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-slate-400">
                  <span className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {val}
                  </span>{' '}
                  / 90
                </p>
              </div>
              <ScoreRing value={val} color={token.ringColor} darkMode={darkMode} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className={`lg:col-span-7 rounded-2xl border p-5 shadow-2xs ${cardSurface}`}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className={`text-sm sm:text-base font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
              Overall Score Progress
            </h2>
            <p className="text-xs font-semibold text-slate-400">
              {summary.improved < 0 ? 'DECLINED:' : 'IMPROVED:'}{' '}
              <span
                className={`font-extrabold ${
                  summary.improved < 0
                    ? 'text-rose-500'
                    : darkMode
                      ? 'text-[#4ea5f5]'
                      : 'text-[#0b4a7b]'
                }`}
              >
                {summary.improved} Points
              </span>
            </p>
          </div>

          <OverallScoreProgressChart attempts={fullAttempts} darkMode={darkMode} />
        </div>

        <div className={`lg:col-span-5 rounded-2xl border p-5 shadow-2xs ${cardSurface}`}>
          <h2 className={`text-sm sm:text-base font-extrabold mb-3 ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
            Performance Summary
          </h2>
          <div className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
            {performanceRows.map((row) => {
              const RowIcon = row.Icon;
              return (
                <div key={row.label} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <span className={`inline-flex items-center gap-2.5 font-medium ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${darkMode ? 'bg-[#1c2028]' : 'bg-slate-50'}`}>
                      <RowIcon className={`w-3.5 h-3.5 ${row.color}`} />
                    </span>
                    <span>{row.label}</span>
                  </span>
                  <span className={`font-extrabold ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
                    {row.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className={`rounded-2xl border p-5 shadow-2xs ${cardSurface}`}>
        <h2 className={`text-sm sm:text-base font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
          Mock Test History
        </h2>
        <div className={`rounded-xl border overflow-x-auto ${darkMode ? 'border-zinc-800' : 'border-slate-200/80'}`}>
          {fullAttempts.length === 0 ? (
            <ScoreEmptyState darkMode={darkMode} />
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={`border-b font-bold ${
                    darkMode
                      ? 'border-zinc-800 bg-[#1a1f28] text-zinc-300'
                      : 'border-slate-100 bg-slate-50/70 text-[#0b4a7b]'
                  }`}
                >
                  <th className="py-3 px-4">Test Name</th>
                  <th className="py-3 px-2 text-center">S</th>
                  <th className="py-3 px-2 text-center">W</th>
                  <th className="py-3 px-2 text-center">R</th>
                  <th className="py-3 px-2 text-center">L</th>
                  <th className="py-3 px-2 text-center">O</th>
                  <th className="py-3 px-3">Performance</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                {fullAttempts.map((entry, idx) => (
                  <tr key={entry.id} className={darkMode ? 'hover:bg-[#1a1f28]/60' : 'hover:bg-slate-50/60'}>
                    <td className="py-3 px-4">
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>{entry.title}</p>
                      <p className="text-[11px] text-slate-400">
                        Date: {new Date(entry.completedAt).toLocaleDateString('en-GB')}
                      </p>
                    </td>
                    {[
                      { v: entry.speaking, cls: 'bg-orange-50 text-[#eb8c44]' },
                      { v: entry.writing, cls: 'bg-sky-50 text-[#4ea5f5]' },
                      { v: entry.reading, cls: 'bg-emerald-50 text-[#22c55e]' },
                      { v: entry.listening, cls: 'bg-blue-50 text-[#0b4a7b]' },
                      { v: entry.overall, cls: 'bg-purple-50 text-[#7c3aed]' },
                    ].map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-2 text-center">
                        <span
                          className={`inline-block min-w-[28px] rounded-md px-1.5 py-0.5 font-extrabold ${
                            darkMode ? 'bg-[#202632] text-zinc-100' : cell.cls
                          }`}
                        >
                          {cell.v ?? '-'}
                        </span>
                      </td>
                    ))}
                    <td className="py-3 px-3">
                      <PerformanceDeltaCell
                        currentScore={entry.overall}
                        previousScore={fullAttempts[idx + 1]?.overall}
                      />
                    </td>
                    <td className="py-3 px-3 font-extrabold text-[#1ea7a1]">{entry.overall}/90</td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`${viewScoreRoute}/${entry.id}`}
                        className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                          darkMode
                            ? 'border-zinc-700 text-zinc-200 hover:border-[#3dc8c1]'
                            : 'border-slate-200 text-[#0b4a7b] hover:bg-[#0b4a7b] hover:text-white'
                        }`}
                      >
                        View Score
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

/**
 * Sectional Mock Test Score History section with skill selector, average gauge, and attempt table.
 */
export function SectionalMockHistorySection({
  activeSkill,
  onSelectSkill,
  activeSkillScore,
  sectionalAttempts,
  viewScoreRoute,
  cardSurface,
  darkMode,
}) {
  const activeSkillToken = SKILL_THEME_TOKENS[activeSkill] || SKILL_THEME_TOKENS.Speaking;

  return (
    <section className={`rounded-2xl border p-5 shadow-2xs space-y-4 ${cardSurface}`}>
      <ModuleTabsBar
        tabs={SCORE_SECTION_TABS}
        activeTab={activeSkill}
        onSelect={onSelectSkill}
        darkMode={darkMode}
        rightSlot={
          <div
            className={`rounded-lg border px-3 py-2 flex items-center gap-2.5 mb-1 shrink-0 ${
              darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80 bg-white'
            }`}
          >
            <SkillIconGlyph skill={activeSkill} className={`w-3.5 h-3.5 ${activeSkillToken.cardAccentClass}`} />
            <span className={`text-xs font-bold ${activeSkillToken.cardAccentClass}`}>
              {String(activeSkillScore).padStart(2, '0')}/90
            </span>
            <div className={`w-24 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-slate-200/60'}`}>
              <div
                className={`h-full rounded-full ${activeSkillToken.barColor}`}
                style={{ width: `${Math.round((activeSkillScore / 90) * 100)}%` }}
              />
            </div>
          </div>
        }
      />

      <div className={`rounded-xl border min-h-[300px] overflow-x-auto ${darkMode ? 'border-zinc-800' : 'border-slate-200/80'}`}>
        {sectionalAttempts.length === 0 ? (
          <ScoreEmptyState darkMode={darkMode} />
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b font-bold ${
                  darkMode
                    ? 'border-zinc-800 bg-[#1a1f28] text-zinc-300'
                    : 'border-slate-100 bg-slate-50/70 text-[#0b4a7b]'
                }`}
              >
                <th className="py-3 px-4">Test Name</th>
                <th className="py-3 px-3 text-center">{activeSkill.charAt(0)}</th>
                <th className="py-3 px-3">Performance</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
              {sectionalAttempts.map((entry, idx) => (
                <tr key={entry.id} className={darkMode ? 'hover:bg-[#1a1f28]/60' : 'hover:bg-slate-50/60'}>
                  <td className="py-3 px-4">
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>{entry.title}</p>
                    <p className="text-[11px] text-slate-400">
                      Date: {new Date(entry.completedAt).toLocaleDateString('en-GB')}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-center font-extrabold">{entry.overall}</td>
                  <td className="py-3 px-3">
                    <PerformanceDeltaCell
                      currentScore={entry.overall}
                      previousScore={sectionalAttempts[idx + 1]?.overall}
                    />
                  </td>
                  <td className="py-3 px-3 font-extrabold text-[#1ea7a1]">{entry.overall}/90</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`${viewScoreRoute}/${entry.id}`}
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                        darkMode
                          ? 'border-zinc-700 text-zinc-200 hover:border-[#3dc8c1]'
                          : 'border-slate-200 text-[#0b4a7b] hover:bg-[#0b4a7b] hover:text-white'
                      }`}
                    >
                      View Score
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
