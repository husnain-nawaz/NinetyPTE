export { default as PTEDashboard } from './PTEDashboardRouter';
export { default as PTEAnalyticsPage } from './PTEAnalyticsRouter';
export { default as PTEStrategyVideosPage } from './PTEStrategyVideosRouter';
export { default as PTEVocabBankPage } from './PTEVocabBankRouter';
export { default as PTEStudyToolsPage } from './PTEStudyToolsRouter';
export { default as PTEPracticePage } from './PTEPracticeWorkspaceRouter';
export { PracticeArenaShell } from './practice-arena';
export { default as PortalProfilePage } from './shared/profile/PortalProfilePage';
export { default as PortalBuySubscriptionPage } from './shared/subscription/PortalBuySubscriptionPage';
export { default as PortalHelpDeskPage } from './shared/contact/PortalHelpDeskPage';
export { SectionPracticeHistoryPage as PortalSectionPracticeHistoryPage } from './shared/history';
export { PortalMockResultPage, PortalMockTestsPage, PortalScoreHistoryPage } from './mock-tests';
export { default as CyanBarsLoader, PortalLoadGate } from './shared/CyanBarsLoader';
export { default as PortalProvider } from './shared/PortalProvider';
export { default as ProtectedRoute } from './shared/ProtectedRoute';

// Dedicated PTE Academic feature exports
export {
  AcademicDashboardPage,
  AcademicAnalyticsPage,
  AcademicQuestionWeightagePage as PTEQuestionWeightagePage,
  AcademicPracticeHistoryPage as PTEPracticeHistoryPage,
} from './PTEAcademic';

// Dedicated PTE Core feature exports
export {
  CoreDashboardPage as PTECoreDashboardPage,
  CoreAnalyticsPage as PTECoreAnalyticsPage,
  CoreExamPatternPage as PTECoreExamPatternPage,
  CoreStrategyVideosPage as PTECoreStrategyVideosPage,
  CoreVocabBankPage as PTECoreVocabBankPage,
  CoreStudyToolsPage as PTECoreStudyToolsPage,
} from './PTECore';

export { default } from './PTEDashboardRouter';
