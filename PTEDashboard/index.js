export { default as PTEDashboard } from './PTEDashboardRouter';
export { default as PTEAnalyticsPage } from './PTEAnalyticsRouter';
export { default as PTEStrategyVideosPage } from './PTEStrategyVideosRouter';
export { default as PortalProvider } from './shared/PortalProvider';
export { default as ProtectedRoute } from './shared/ProtectedRoute';

// Dedicated PTE Academic feature exports
export {
  AcademicDashboardPage,
  AcademicAnalyticsPage,
  AcademicQuestionWeightagePage as PTEQuestionWeightagePage,
  AcademicPracticeHistoryPage as PTEPracticeHistoryPage,
  AcademicVocabBankPage as PTEVocabBankPage,
  AcademicStudyToolsPage as PTEStudyToolsPage,
} from './PTEAcademic';

// Dedicated PTE Core feature exports
export {
  CoreDashboardPage as PTECoreDashboardPage,
  CoreAnalyticsPage as PTECoreAnalyticsPage,
  CoreExamPatternPage as PTECoreExamPatternPage,
  CoreStrategyVideosPage as PTECoreStrategyVideosPage,
} from './PTECore';

export { default } from './PTEDashboardRouter';
