import {
  BarChart3,
  Hourglass,
  Info,
  Share2,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatMMSS } from '../exam-runner';
import { REPORT_SKILLS } from './viewScoreConfig';

function CommSkillRing({ value, label, color, darkMode = false }) {
  const numericVal = typeof value === 'number' ? value : 0;
  const pct = Math.max(0, Math.min(100, Math.round((numericVal / 90) * 100)));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 84 84" aria-hidden="true">
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke={darkMode ? '#272c35' : '#e8eef5'}
            strokeWidth="10"
          />
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span className={`absolute text-lg font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
          {typeof value === 'number' ? value : 'N/A'}
        </span>
      </div>
      <span className="text-xs font-bold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export function ShareConfirmModal({ onClose, onConfirmYes }) {
  return (
    <div
      className="fixed inset-0 z-[80] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-report-heading"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white px-7 py-8 shadow-2xl text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close share confirmation"
          className="absolute right-4 top-4 w-7 h-7 rounded-full border border-[#0b4a7b]/50 text-[#0b4a7b] hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="mx-auto w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
          <span className="w-8 h-8 rounded-full bg-amber-400 text-white font-serif font-bold text-base flex items-center justify-center">
            i
          </span>
        </div>

        <div className="space-y-2">
          <h3 id="share-report-heading" className="text-lg font-extrabold text-[#0b4a7b]">
            Are you sure ?
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-xs mx-auto">
            By sharing this, you are allowing others to access this score report along with all your
            recorded responses.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[112px] rounded-full border border-[#0b4a7b] bg-white hover:bg-slate-50 px-6 py-2 text-xs font-bold text-[#0b4a7b] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirmYes}
            className="min-w-[112px] rounded-full bg-[#0b4a7b] hover:bg-[#08385f] px-6 py-2 text-xs font-bold text-white shadow-2xs transition cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreDisclaimerBox({ darkMode }) {
  return (
    <div
      className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
        darkMode
          ? 'border-zinc-800 bg-[#1a1f28] text-zinc-400'
          : 'border-slate-200/80 bg-[#f8fafc] text-slate-500'
      }`}
    >
      <Info className="w-4 h-4 opacity-70 shrink-0 mt-0.5" />
      <p>
        This scorecard has been generated solely on the basis of your performance in the
        above-mentioned mock test provided by NinetyPTE. Please note that this score report cannot
        be used for applying to any university or for migration purposes.
      </p>
    </div>
  );
}

/**
 * Top Summary Card for Full, Sectional, and Timed Sectional Score Reports.
 */
export function ScoreReportSummaryCard({
  attempt,
  candidateName,
  formattedDate,
  displayedSkills,
  analyticsRoute,
  onOpenReport,
  onOpenShare,
  darkMode,
}) {
  const isTimedReport = attempt.mode === 'timed';
  const isSectionalReport = attempt.mode === 'sectional';
  const overallLinePct = Math.max(8, Math.min(96, Math.round((attempt.overall / 90) * 100)));
  const totalSec = attempt.totalAllowedSeconds || 1800;
  const takenSec =
    attempt.elapsedSeconds ||
    (attempt.questionResults || []).reduce((acc, q) => acc + (Number(q.timeSpentSeconds) || 48), 0);

  const initials = candidateName
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <section
      className={`rounded-2xl border shadow-2xs overflow-hidden ${
        darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
      }`}
    >
      <div
        className={`px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white ${
          darkMode ? 'bg-[#2c5274]' : 'bg-[#0b4a7b]'
        }`}
      >
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
          {isTimedReport
            ? 'TIMED MOCK TEST | SCORE REPORT'
            : isSectionalReport
              ? 'SECTIONAL MOCK TEST | SCORE REPORT'
              : 'MOCK TEST | SCORE REPORT'}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenReport}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/40 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Report an issue</span>
          </button>
          <button
            type="button"
            onClick={onOpenShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/40 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <Link
            to={`${analyticsRoute}/${attempt.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/40 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold transition"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </Link>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-[#0b4a7b] to-[#1ea7a1] text-white font-extrabold text-xl flex items-center justify-center shadow-sm shrink-0">
              {initials || 'NP'}
            </div>
            <div className="space-y-0.5">
              <h2 className={`text-base sm:text-lg font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
                {candidateName}
              </h2>
              <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                {attempt.title}
              </p>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Test Date: {formattedDate}
              </p>
            </div>
          </div>

          {isTimedReport ? (
            <div
              className={`rounded-xl border px-5 py-3.5 space-y-1.5 shrink-0 ${
                darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-100 bg-slate-50/70'
              }`}
            >
              <p className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#eb8c44]">
                <Hourglass className="w-3.5 h-3.5" />
                <span>Total Taken Time</span>
              </p>
              <p className="text-sm font-extrabold">
                <span className={darkMode ? 'text-white' : 'text-[#0b4a7b]'}>{formatMMSS(takenSec)}</span>{' '}
                <span className="text-xs font-semibold text-slate-400">/ {formatMMSS(totalSec)}</span>
              </p>
            </div>
          ) : (
            !isSectionalReport && (
              <div className="w-24 rounded-t-xl rounded-b-full bg-[#4ecdc4] text-white text-center shadow-sm overflow-hidden shrink-0">
                <div className="bg-[#dff7f5] text-[#0b4a7b] text-[11px] font-bold py-1.5">
                  Overall Score
                </div>
                <div className="py-3 text-2xl sm:text-3xl font-extrabold leading-none">
                  {attempt.overall}
                </div>
              </div>
            )
          )}
        </div>

        {!isTimedReport && (
          <>
            <div className="space-y-4">
              <h3
                className={`text-xs sm:text-sm font-extrabold border-b pb-2 ${
                  darkMode ? 'text-white border-zinc-800' : 'text-[#0b4a7b] border-slate-100'
                }`}
              >
                Communication Skills
              </h3>

              <div className="relative py-4">
                <div
                  aria-hidden="true"
                  className={`pointer-events-none select-none absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl font-black tracking-tight ${
                    darkMode ? 'text-zinc-800/40' : 'text-slate-100/80'
                  }`}
                >
                  NinetyPTE
                </div>

                <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
                  {displayedSkills.map((skill) => (
                    <CommSkillRing
                      key={skill.key}
                      label={skill.key}
                      value={attempt[skill.field]}
                      color={skill.color}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3
                className={`text-xs sm:text-sm font-extrabold border-b pb-2 ${
                  darkMode ? 'text-white border-zinc-800' : 'text-[#0b4a7b] border-slate-100'
                }`}
              >
                Skills Breakdown
              </h3>

              {isSectionalReport ? (
                <div className="space-y-5">
                  {displayedSkills.map((skill) => {
                    const val = typeof attempt[skill.field] === 'number' ? attempt[skill.field] : 0;
                    const widthPct = Math.max(6, Math.min(100, Math.round((val / 90) * 100)));
                    return (
                      <div key={skill.key} className="flex items-center gap-3 text-xs">
                        <span
                          className={`w-28 font-medium text-right shrink-0 ${
                            darkMode ? 'text-zinc-300' : 'text-slate-600'
                          }`}
                        >
                          {skill.key} ({val})
                        </span>
                        <div className="flex-1">
                          <div
                            className="h-3.5 rounded-r-full transition-all"
                            style={{ width: `${widthPct}%`, backgroundColor: skill.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <ScoreDisclaimerBox darkMode={darkMode} />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <span className="w-28 shrink-0" />
                      <div className="flex-1 relative h-6">
                        <span
                          style={{ left: `${overallLinePct}%` }}
                          className={`-translate-x-1/2 absolute top-0 whitespace-nowrap rounded-md border px-2.5 py-0.5 text-[11px] font-bold shadow-2xs ${
                            darkMode
                              ? 'border-zinc-700 bg-[#1c2028] text-[#4ea5f5]'
                              : 'border-slate-200 bg-white text-[#0b4a7b]'
                          }`}
                        >
                          Overall Score: {attempt.overall}
                        </span>
                      </div>
                    </div>

                    <div className="relative space-y-2.5">
                      <div className="flex items-stretch">
                        <span className="w-28 shrink-0" />
                        <div className="flex-1 relative">
                          <span
                            style={{ left: `${overallLinePct}%` }}
                            className={`pointer-events-none absolute top-0 bottom-0 w-0.5 z-10 ${
                              darkMode ? 'bg-white/80' : 'bg-[#0b4a7b]/70'
                            }`}
                          />
                        </div>
                      </div>

                      {REPORT_SKILLS.map((skill) => {
                        const val = typeof attempt[skill.field] === 'number' ? attempt[skill.field] : 0;
                        const widthPct = Math.max(6, Math.min(100, Math.round((val / 90) * 100)));
                        return (
                          <div key={skill.key} className="flex items-center gap-3 text-xs relative">
                            <span
                              className={`w-28 font-medium text-right shrink-0 ${
                                darkMode ? 'text-zinc-300' : 'text-slate-600'
                              }`}
                            >
                              {skill.key} ({val})
                            </span>
                            <div className="flex-1 relative">
                              <div
                                className="h-3.5 rounded-r-full transition-all"
                                style={{ width: `${widthPct}%`, backgroundColor: skill.color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <ScoreDisclaimerBox darkMode={darkMode} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
