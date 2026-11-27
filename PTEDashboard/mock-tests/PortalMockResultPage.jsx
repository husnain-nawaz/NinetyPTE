import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUp,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Headphones,
  Info,
  Mic,
  Pencil,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { getStoredUser } from '../../frontend/src/utils/auth';
import PTEDashboardHeader from '../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../shared/PTEDashboardTealFooter';
import { usePortal } from '../shared/portalContext';
import MockQuestionAiScoreModal from './MockQuestionAiScoreModal';
import MockReportIssueModal, { MockActionToast } from './MockReportIssueModal';
import { ScoreEmptyState } from './MockTestSharedUI';
import { buildMockAttemptScore } from './exam-runner';
import { getMockTestsDataset, readMockAttemptById } from './mockTestsData';

const REPORT_SKILLS = [
  { key: 'Speaking', field: 'speaking', color: '#eb8c44', activeBg: 'bg-[#c96b27] text-white', badgeBg: 'bg-[#fdf1e6] text-[#c96b27]', Icon: Mic },
  { key: 'Writing', field: 'writing', color: '#4ea5f5', activeBg: 'bg-[#2563eb] text-white', badgeBg: 'bg-[#eaf2ff] text-[#2563eb]', Icon: Pencil },
  { key: 'Reading', field: 'reading', color: '#22c55e', activeBg: 'bg-[#16a34a] text-white', badgeBg: 'bg-[#e8f8ed] text-[#16a34a]', Icon: BookOpen },
  { key: 'Listening', field: 'listening', color: '#0b4a7b', activeBg: 'bg-[#0b4a7b] text-white', badgeBg: 'bg-[#e6eff8] text-[#0b4a7b]', Icon: Headphones },
];

const SKILL_PILL_COLOR = {
  S: 'bg-[#f49d56] text-white',
  W: 'bg-[#4ea5f5] text-white',
  R: 'bg-[#22c55e] text-white',
  L: 'bg-[#0b4a7b] text-white',
};

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
        <span
          className={`absolute text-lg font-extrabold ${
            darkMode ? 'text-white' : 'text-[#0b4a7b]'
          }`}
        >
          {typeof value === 'number' ? value : 'N/A'}
        </span>
      </div>
      <span className="text-xs font-bold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function ShareConfirmModal({ onClose, onConfirmYes }) {
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

/**
 * Full-featured Mock Test Score Report & Detailed Question Analysis view
 * (/v1/mock-test/mock-test-result-list/view-score/:attemptId).
 */
export default function PortalMockResultPage({ syncCoreMode = false }) {
  const { attemptId } = useParams();
  const { portalMode, setPortalMode, portalDarkMode: darkMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [syncCoreMode, setPortalMode]);

  const dataset = useMemo(() => getMockTestsDataset(activeTrack), [activeTrack]);
  const storedUser = getStoredUser() || {};
  const candidateName = storedUser.name || 'NinetyPTE Student';

  const rawAttempt = useMemo(
    () => readMockAttemptById(activeTrack, attemptId),
    [activeTrack, attemptId]
  );

  const attempt = useMemo(() => {
    if (!rawAttempt) return null;
    if (Array.isArray(rawAttempt.questionResults) && rawAttempt.questionResults.length > 0) {
      return rawAttempt;
    }
    const synthesized = buildMockAttemptScore(
      {
        id: rawAttempt.testId || 'mock-fallback',
        title: rawAttempt.title || 'Mock Test',
        mode: rawAttempt.mode || 'full',
        skill: rawAttempt.skill || 'All',
        questions: rawAttempt.mode === 'full' ? 68 : 16,
      },
      { answersByIndex: {} },
      rawAttempt.trackLabel || dataset.trackLabel,
      isCoreMode
    );
    return {
      ...rawAttempt,
      questionResults: synthesized.questionResults,
    };
  }, [rawAttempt, dataset.trackLabel, isCoreMode]);

  const availableTabs = useMemo(() => {
    if (!attempt?.questionResults) return REPORT_SKILLS;
    if (attempt.mode === 'sectional' || attempt.mode === 'timed') {
      return REPORT_SKILLS.filter((s) => s.key === attempt.skill);
    }
    return REPORT_SKILLS;
  }, [attempt]);

  const [activeSkillTab, setActiveSkillTab] = useState('Speaking');
  const [reportOpen, setReportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedAiItem, setSelectedAiItem] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const resolvedSkillTab = availableTabs.some((s) => s.key === activeSkillTab)
    ? activeSkillTab
    : availableTabs[0]?.key || 'Speaking';

  const isSectionalAttempt = attempt?.mode === 'sectional' || attempt?.mode === 'timed';
  const activeQuestions = useMemo(() => {
    const all = attempt?.questionResults || [];
    if (isSectionalAttempt) return all;
    return all.filter((item) => item.skillGroup === resolvedSkillTab);
  }, [attempt, isSectionalAttempt, resolvedSkillTab]);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const handleConfirmShare = () => {
    setShareOpen(false);
    try {
      navigator.clipboard?.writeText(window.location.href);
    } catch {
      // Ignore clipboard failures
    }
    triggerToast('Copied URL Successfully');
  };

  if (!attempt) {
    return (
      <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans">
        <PTEDashboardHeader />
        <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]">Mock Test Result</h1>
            <Link
              to={dataset.routes.scores}
              className="text-xs font-semibold text-[#0b4a7b] hover:underline"
            >
              &larr; Back to Scores
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
            <ScoreEmptyState message="Complete a mock test first to inspect its full AI Score Report and question breakdown." />
          </div>
        </main>
        <PTEDashboardTealFooter />
      </div>
    );
  }

  const formattedDate = new Date(attempt.completedAt).toLocaleDateString('en-GB');
  const isSectionalReport = attempt.mode === 'sectional' || attempt.mode === 'timed';
  const displayedSkills = isSectionalReport ? availableTabs : REPORT_SKILLS;
  const overallLinePct = Math.max(8, Math.min(96, Math.round((attempt.overall / 90) * 100)));
  const initials = candidateName
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        darkMode ? 'bg-[#0a0c0e] text-zinc-200' : 'bg-[#f8fbfd] text-slate-800'
      }`}
    >
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Top Heading */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-[#1a2433] text-[#4ea5f5]' : 'bg-[#e6eef6] text-[#0b4a7b]'
              }`}
            >
              <ClipboardCheck className="w-5 h-5" />
            </span>
            <h1
              className={`text-lg sm:text-xl font-extrabold ${
                darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'
              }`}
            >
              Mock Test Result
            </h1>
          </div>

          <Link
            to={dataset.routes.scores}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold transition ${
              darkMode
                ? 'text-zinc-300 hover:text-[#3dc8c1]'
                : 'text-[#0b4a7b] hover:text-[#1ea7a1]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Scores</span>
          </Link>
        </div>

        {/* Score Report Summary Card */}
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
              {isSectionalReport ? 'SECTIONAL MOCK TEST | SCORE REPORT' : 'MOCK TEST | SCORE REPORT'}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setReportOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/40 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Report an issue</span>
              </button>
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/40 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
              <Link
                to={`${dataset.routes.analytics}/${attempt.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/40 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold transition"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </Link>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-8">
            {/* Candidate Info + Overall Shield Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-[#0b4a7b] to-[#1ea7a1] text-white font-extrabold text-xl flex items-center justify-center shadow-sm shrink-0">
                  {initials || 'NP'}
                </div>
                <div className="space-y-0.5">
                  <h2
                    className={`text-base sm:text-lg font-extrabold ${
                      darkMode ? 'text-white' : 'text-[#0b4a7b]'
                    }`}
                  >
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

              {!isSectionalReport && (
                <div className="w-24 rounded-t-xl rounded-b-full bg-[#4ecdc4] text-white text-center shadow-sm overflow-hidden shrink-0">
                  <div className="bg-[#dff7f5] text-[#0b4a7b] text-[11px] font-bold py-1.5">
                    Overall Score
                  </div>
                  <div className="py-3 text-2xl sm:text-3xl font-extrabold leading-none">
                    {attempt.overall}
                  </div>
                </div>
              )}
            </div>

            {/* Communication Skills Rings */}
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

            {/* Skills Breakdown */}
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

                  <div
                    className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
                      darkMode
                        ? 'border-zinc-800 bg-[#1a1f28] text-zinc-400'
                        : 'border-slate-200/80 bg-[#f8fafc] text-slate-500'
                    }`}
                  >
                    <Info className="w-4 h-4 opacity-70 shrink-0 mt-0.5" />
                    <p>
                      This scorecard has been generated solely on the basis of your performance in
                      the above-mentioned mock test provided by NinetyPTE. Please note that this
                      score report cannot be used for applying to any university or for migration
                      purposes.
                    </p>
                  </div>
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
                    <div
                      className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
                        darkMode
                          ? 'border-zinc-800 bg-[#1a1f28] text-zinc-400'
                          : 'border-slate-200/80 bg-[#f8fafc] text-slate-500'
                      }`}
                    >
                      <Info className="w-4 h-4 opacity-70 shrink-0 mt-0.5" />
                      <p>
                        This scorecard has been generated solely on the basis of your performance in
                        the above-mentioned mock test provided by NinetyPTE. Please note that this
                        score report cannot be used for applying to any university or for migration
                        purposes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Detailed Question Analysis */}
        <section className="space-y-4">
          <h2
            className={`text-sm sm:text-base font-extrabold ${
              darkMode ? 'text-white' : 'text-[#0b4a7b]'
            }`}
          >
            Detailed Question Analysis
          </h2>

          {!isSectionalReport && (
            <div className="flex flex-wrap items-center gap-2.5">
              {availableTabs.map((skill) => {
                const isActive = skill.key === resolvedSkillTab;
                const TabIcon = skill.Icon;
                return (
                  <button
                    key={skill.key}
                    type="button"
                    onClick={() => setActiveSkillTab(skill.key)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? skill.activeBg
                        : darkMode
                          ? 'bg-[#16191e] border border-zinc-800 text-zinc-300 hover:border-zinc-600'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{skill.key}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div
            className={`rounded-2xl border shadow-2xs overflow-hidden ${
              darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
            }`}
          >
            {activeQuestions.length === 0 ? (
              <ScoreEmptyState message={`No ${resolvedSkillTab} questions recorded in this mock test.`} />
            ) : (
              <div className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                {activeQuestions.map((item, idx) => {
                  const tabMeta =
                    REPORT_SKILLS.find((s) => s.key === item.skillGroup) || REPORT_SKILLS[0];
                  return (
                    <div
                      key={`${item.id}-${idx}`}
                      className={`px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 transition ${
                        darkMode ? 'hover:bg-[#1a1f28]' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-9 h-9 rounded-lg ${tabMeta.badgeBg} text-[11px] font-extrabold flex items-center justify-center shrink-0`}
                        >
                          {item.code}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-xs sm:text-sm font-bold truncate ${
                              darkMode ? 'text-white' : 'text-[#0b4a7b]'
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-400">#{item.id}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 ml-auto shrink-0">
                        {(item.skillPills || []).map((pill) => (
                          <span
                            key={pill.key}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                              darkMode
                                ? 'border-zinc-700 bg-[#1a1f28] text-zinc-100'
                                : 'border-slate-200 bg-white text-[#0b4a7b]'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center ${
                                SKILL_PILL_COLOR[pill.key] || 'bg-[#0b4a7b] text-white'
                              }`}
                            >
                              {pill.key}
                            </span>
                            <span>
                              {(item.skillGroup === 'Reading' || item.skillGroup === 'Listening') &&
                              pill.max < 10
                                ? `${pill.score}/${pill.max}`
                                : `${String(pill.score).padStart(2, '0')}/${String(pill.max).padStart(2, '0')}`}
                            </span>
                          </span>
                        ))}

                        <button
                          type="button"
                          onClick={() => setSelectedAiItem(item)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-white hover:bg-purple-50 px-3.5 py-1.5 text-xs font-bold text-purple-600 transition cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Score</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-[#eef8fe] border-t border-slate-100 py-2.5 px-4 text-center text-[11px] font-semibold text-[#0b4a7b]">
              This detailed score analysis will disappear in 6 months.
            </div>
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />

      {reportOpen && (
        <MockReportIssueModal
          contextTitle={attempt.title}
          onClose={() => setReportOpen(false)}
          onSubmitted={() => triggerToast('Issue reported successfully!')}
        />
      )}

      {shareOpen && (
        <ShareConfirmModal onClose={() => setShareOpen(false)} onConfirmYes={handleConfirmShare} />
      )}

      {selectedAiItem && (
        <MockQuestionAiScoreModal
          questionResult={selectedAiItem}
          isCore={isCoreMode}
          onClose={() => setSelectedAiItem(null)}
        />
      )}

      <MockActionToast message={toastMsg} />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-30 w-9 h-9 rounded-full border border-[#3dc8c1] bg-white text-[#1ea7a1] hover:bg-[#e5f8f6] shadow-md flex items-center justify-center transition cursor-pointer"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
