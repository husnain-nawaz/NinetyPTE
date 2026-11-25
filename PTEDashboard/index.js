export { default as PTEDashboard } from './PTEDashboardRouter';
export { default as PortalProvider } from './shared/PortalProvider';
export { default as ProtectedRoute } from './shared/ProtectedRoute';

// Dedicated PTE Academic feature exports
export {
  AcademicDashboardPage,
  AcademicAnalyticsPage as PTEAnalyticsPage,
  AcademicQuestionWeightagePage as PTEQuestionWeightagePage,
  AcademicPracticeHistoryPage as PTEPracticeHistoryPage,
  AcademicStrategyVideosPage as PTEStrategyVideosPage,
  AcademicVocabBankPage as PTEVocabBankPage,
  AcademicStudyToolsPage as PTEStudyToolsPage,
} from './PTEAcademic';

// Dedicated PTE Core blank scaffold exports
export { CoreDashboardPage as PTECoreDashboardPage } from './PTECore';

export { default } from './PTEDashboardRouter';
