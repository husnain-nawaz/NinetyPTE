import PortalPracticeHistoryPage from '../../shared/history/PortalPracticeHistoryPage';

/**
 * Portal Practice History page (/v1/practice-history, /v1/core/practice-history).
 */
export default function AcademicPracticeHistoryPage({ syncCoreMode = false }) {
  return <PortalPracticeHistoryPage syncCoreMode={syncCoreMode} />;
}
