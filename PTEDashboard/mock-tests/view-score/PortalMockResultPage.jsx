import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, ClipboardCheck } from 'lucide-react';
import { getStoredUser } from '../../../frontend/src/utils/auth';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';
import { usePortal } from '../../shared/portalContext';
import MockReportIssueModal, { MockActionToast } from '../MockReportIssueModal';
import { ScoreEmptyState } from '../MockTestSharedUI';
import { buildMockAttemptScore } from '../exam-runner';
import { getMockTestsDataset, readMockAttemptById } from '../mockTestsData';
import MockQuestionAiScoreModal from './MockQuestionAiScoreModal';
import { QuestionAnalysisSection } from './QuestionAnalysisList';
import {
  ScoreReportSummaryCard,
  ShareConfirmModal,
} from './ScoreReportSummary';
import { REPORT_SKILLS } from './viewScoreConfig';

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
  const toastTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    },
    []
  );

  const resolvedSkillTab = availableTabs.some((s) => s.key === activeSkillTab)
    ? activeSkillTab
    : availableTabs[0]?.key || 'Speaking';

  const isTimedReport = attempt?.mode === 'timed';
  const isSectionalReport = attempt?.mode === 'sectional';
  const isSingleModuleReport = isTimedReport || isSectionalReport;

  const activeQuestions = useMemo(() => {
    const all = attempt?.questionResults || [];
    if (isSingleModuleReport) return all;
    return all.filter((item) => item.skillGroup === resolvedSkillTab);
  }, [attempt, isSingleModuleReport, resolvedSkillTab]);

  const triggerToast = useCallback((msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMsg(msg);
    toastTimerRef.current = setTimeout(() => setToastMsg(''), 3200);
  }, []);

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
      <div
        className={`min-h-screen flex flex-col font-sans ${
          darkMode ? 'bg-[#0a0c0e] text-zinc-200' : 'bg-[#f8fbfd] text-slate-800'
        }`}
      >
        <PTEDashboardHeader />
        <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className={`text-lg sm:text-xl font-extrabold ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
              Mock Test Result
            </h1>
            <Link to={dataset.routes.scores} className="text-xs font-semibold text-[#0b4a7b] hover:underline">
              &larr; Back to Scores
            </Link>
          </div>
          <div
            className={`rounded-2xl border p-6 shadow-2xs ${
              darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200 bg-white'
            }`}
          >
            <ScoreEmptyState
              message="Complete a mock test first to inspect its full AI Score Report and question breakdown."
              darkMode={darkMode}
            />
          </div>
        </main>
        <PTEDashboardTealFooter />
      </div>
    );
  }

  const formattedDate = new Date(attempt.completedAt).toLocaleDateString('en-GB');
  const displayedSkills = isSingleModuleReport ? availableTabs : REPORT_SKILLS;

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
              <ClipboardCheck className="w-5 h-5" />
            </span>
            <h1 className={`text-lg sm:text-xl font-extrabold ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
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

        <ScoreReportSummaryCard
          attempt={attempt}
          candidateName={candidateName}
          formattedDate={formattedDate}
          displayedSkills={displayedSkills}
          analyticsRoute={dataset.routes.analytics}
          onOpenReport={() => setReportOpen(true)}
          onOpenShare={() => setShareOpen(true)}
          darkMode={darkMode}
        />

        <QuestionAnalysisSection
          availableTabs={availableTabs}
          resolvedSkillTab={resolvedSkillTab}
          onSelectSkillTab={setActiveSkillTab}
          activeQuestions={activeQuestions}
          isSingleModuleReport={isSingleModuleReport}
          isTimedReport={isTimedReport}
          onOpenAiScore={setSelectedAiItem}
          darkMode={darkMode}
        />
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
