import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Gauge, Share2 } from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';
import { usePortal } from '../../shared/portalContext';
import { MockActionToast } from '../MockReportIssueModal';
import { ScoreEmptyState } from '../MockTestSharedUI';
import { buildMockAttemptScore } from '../exam-runner';
import { getMockTestsDataset, readMockAttemptById } from '../mockTestsData';
import {
  AnalyticsOverviewSection,
  AnalyticsTaskBreakdownSection,
  AnalyticsTimeTakenSection,
} from './AnalyticsCharts';
import {
  buildAnalyticsTimeData,
  buildContributorTaskSummaries,
  SKILL_SECTIONS,
} from './analyticsConfig';

/**
 * Full-page Mock Test, Sectional Mock Test & Timed Mock Test Analytics view
 * (/v1/mock-test/mock-test-result-list/full-test-analytics/:attemptId).
 */
export default function PortalMockAnalyticsPage({ syncCoreMode = false }) {
  const { attemptId } = useParams();
  const { portalMode, setPortalMode, portalDarkMode: darkMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) setPortalMode('core');
  }, [syncCoreMode, setPortalMode]);

  const dataset = useMemo(() => getMockTestsDataset(activeTrack), [activeTrack]);
  const rawAttempt = useMemo(
    () => readMockAttemptById(activeTrack, attemptId),
    [activeTrack, attemptId]
  );

  const attempt = useMemo(() => {
    if (!rawAttempt) return null;
    if (Array.isArray(rawAttempt.questionResults) && rawAttempt.questionResults.length > 0) {
      return rawAttempt;
    }
    const synth = buildMockAttemptScore(
      {
        id: rawAttempt.testId || 'mock',
        title: rawAttempt.title || 'Mock Test',
        mode: rawAttempt.mode || 'full',
        skill: rawAttempt.skill || 'All',
        questions: rawAttempt.mode === 'full' ? 68 : 16,
      },
      { answersByIndex: {} },
      rawAttempt.trackLabel || dataset.trackLabel,
      isCoreMode
    );
    return { ...rawAttempt, questionResults: synth.questionResults };
  }, [rawAttempt, dataset.trackLabel, isCoreMode]);

  const [toastMsg, setToastMsg] = useState('');
  const toastTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    },
    []
  );

  const handleShare = useCallback(() => {
    try {
      navigator.clipboard?.writeText(window.location.href);
    } catch {
      // Ignore clipboard failures
    }
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMsg('Copied URL Successfully');
    toastTimerRef.current = setTimeout(() => setToastMsg(''), 3000);
  }, []);

  if (!attempt) {
    return (
      <div
        className={`min-h-screen flex flex-col font-sans ${
          darkMode ? 'bg-[#0a0c0e] text-zinc-200' : 'bg-[#f8fbfd] text-slate-800'
        }`}
      >
        <PTEDashboardHeader />
        <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className={`text-lg sm:text-xl font-extrabold ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
              Mock Test Analytics
            </h1>
            <Link to={dataset.routes.scores} className="text-xs font-semibold text-[#0b4a7b] hover:underline">
              &larr; Back to Scores
            </Link>
          </div>
          <div className={`rounded-2xl border p-6 ${darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200 bg-white'}`}>
            <ScoreEmptyState message="Complete a mock test to view full Analytics." darkMode={darkMode} />
          </div>
        </main>
        <PTEDashboardTealFooter />
      </div>
    );
  }

  const results = attempt.questionResults || [];
  const isTimed = attempt.mode === 'timed';
  const isSectional = attempt.mode === 'sectional';
  const isSingleSectionAnalytics = isTimed || isSectional;
  const targetSkill = attempt.skill || 'Speaking';
  const targetSec = SKILL_SECTIONS.find((s) => s.key === targetSkill) || SKILL_SECTIONS[0];

  const visibleSkillSections = SKILL_SECTIONS.filter((sec) =>
    results.some((r) => r.skillGroup === sec.key)
  );
  const contributorTaskSummaries = buildContributorTaskSummaries(results);
  const timeData = buildAnalyticsTimeData(results, visibleSkillSections);

  const totalSec = attempt.totalAllowedSeconds || (isSingleSectionAnalytics ? 1800 : 7800);
  const takenSec = attempt.elapsedSeconds || Math.max(60, timeData.summedBarSec);
  const attemptedTotal = results.filter((r) => r.isAttempted).length;
  const targetVal = typeof attempt[targetSec.field] === 'number' ? attempt[targetSec.field] : attempt.overall;

  const actionBar = (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share analytics URL"
        className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition ${
          darkMode
            ? 'border-zinc-700 text-zinc-300 hover:border-[#3dc8c1]'
            : 'border-slate-200 text-slate-600 hover:border-[#0b4a7b]'
        }`}
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>
      <Link
        to={`${dataset.routes.viewScore}/${attempt.id}`}
        className={`rounded-full border px-4 py-1 text-xs font-bold transition ${
          darkMode
            ? 'border-zinc-700 text-zinc-200 hover:border-[#3dc8c1]'
            : 'border-slate-200 text-[#0b4a7b] hover:border-[#0b4a7b]'
        }`}
      >
        Score
      </Link>
    </div>
  );

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        darkMode ? 'bg-[#0a0c0e] text-zinc-200' : 'bg-[#f8fbfd] text-slate-800'
      }`}
    >
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-[#1a2433] text-[#4ea5f5]' : 'bg-[#e6eef6] text-[#0b4a7b]'
              }`}
            >
              <Gauge className="w-5 h-5" />
            </span>
            <h1 className={`text-lg sm:text-xl font-extrabold ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
              {isTimed
                ? 'Timed Mock Test Analytics'
                : isSectional
                  ? 'Sectional Mock Test Analytics'
                  : 'Mock Test Analytics'}
            </h1>
          </div>

          <Link
            to={dataset.routes.scores}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              darkMode ? 'text-zinc-300 hover:text-[#3dc8c1]' : 'text-[#0b4a7b] hover:text-[#1ea7a1]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Scores</span>
          </Link>
        </div>

        <AnalyticsOverviewSection
          attempt={attempt}
          results={results}
          targetSec={targetSec}
          targetVal={targetVal}
          attemptedTotal={attemptedTotal}
          isTimed={isTimed}
          isSingleSectionAnalytics={isSingleSectionAnalytics}
          actionBar={actionBar}
          darkMode={darkMode}
        />

        <AnalyticsTaskBreakdownSection
          results={results}
          targetSec={targetSec}
          visibleSkillSections={visibleSkillSections}
          contributorTaskSummaries={contributorTaskSummaries}
          isSingleSectionAnalytics={isSingleSectionAnalytics}
          darkMode={darkMode}
        />

        <AnalyticsTimeTakenSection
          takenSec={takenSec}
          totalSec={totalSec}
          visibleSkillSections={visibleSkillSections}
          timeData={timeData}
          isTimed={isTimed}
          isSingleSectionAnalytics={isSingleSectionAnalytics}
          darkMode={darkMode}
        />
      </main>

      <PTEDashboardTealFooter />
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
