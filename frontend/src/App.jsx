import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/navbar/Navbar';
import Footer from './components/landing/Footer';
import FloatingWidgets from './components/landing/FloatingWidgets';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import BookExamPage from './pages/BookExamPage';
import MobileAppPage from './pages/MobileAppPage';
import InstituteSoftwarePage from './pages/InstituteSoftwarePage';
import AboutPTEPage from './pages/AboutPTEPage';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import PTEJobsPage from './pages/PTEJobsPage';
import TrainTheTrainerPage from './pages/TrainTheTrainerPage';
import PTEForGermanyPage from './pages/PTEForGermanyPage';
import PTEForSingaporePage from './pages/PTEForSingaporePage';
import PTEForIrelandPage from './pages/PTEForIrelandPage';
import PTEForAustraliaPage from './pages/PTEForAustraliaPage';
import PTEForNewZealandPage from './pages/PTEForNewZealandPage';
import PTEForUSAPage from './pages/PTEForUSAPage';
import PTEForUKPage from './pages/PTEForUKPage';
import PTEForCanadaPage from './pages/PTEForCanadaPage';
import PTEAcademicUKVIExamPage from './pages/PTEAcademicUKVIExamPage';
import PTECoreExamPage from './pages/PTECoreExamPage';
import PTECoreScoreCalculatorPage from './pages/PTECoreScoreCalculatorPage';
import PTECoreSpeakingPracticePage from './pages/PTECoreSpeakingPracticePage';
import PTECoreWritingPracticePage from './pages/PTECoreWritingPracticePage';
import PTECoreReadingPracticePage from './pages/PTECoreReadingPracticePage';
import PTECoreListeningPracticePage from './pages/PTECoreListeningPracticePage';
import PTESpeakingPracticePage from './pages/PTESpeakingPracticePage';
import BlogPage from './blog/BlogPage';
import BlogDetailPage from './blog/BlogDetailPage';
import PTEWritingPracticePage from './pages/PTEWritingPracticePage';
import PTEReadingPracticePage from './pages/PTEReadingPracticePage';
import PTEListeningPracticePage from './pages/PTEListeningPracticePage';
import PTEScoreCalculatorPage from './pages/PTEScoreCalculatorPage';
import MockTestsPage from './pages/MockTestsPage';
import PTEOnlineCoursePage from './pages/PTEOnlineCoursePage';
import PTEMaterialPage from './pages/PTEMaterialPage';
import PTEAcceptancePage from './pages/PTEAcceptancePage';
import OnTestDayPage from './pages/OnTestDayPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import DisclaimerPage from './pages/DisclaimerPage';
import {
  PTEDashboard,
  PTEAnalyticsPage,
  PTEQuestionWeightagePage,
  ProtectedRoute,
} from '../../PTEDashboard';
import { SuperDashboard, SuperAdminRoute } from '../../SuperDashboard';

function AppContent() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signin', '/signup', '/register'].includes(location.pathname);
  const isLegalPage = [
    '/disclaimer', 
    '/v1/disclaimer', 
    '/terms-conditions', 
    '/terms', 
    '/privacy-policy', 
    '/privacy', 
    '/refund-policy', 
    '/refund-cancellation'
  ].includes(location.pathname);
  const isDashboard =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/v1/dashboard') ||
    location.pathname.startsWith('/v1/analytics') ||
    location.pathname.startsWith('/analytics') ||
    location.pathname.startsWith('/v1/question-weightage') ||
    location.pathname.startsWith('/question-weightage') ||
    location.pathname.startsWith('/pte-dashboard') ||
    location.pathname.startsWith('/super-dashboard') ||
    location.pathname.startsWith('/superadmin');
  const hideChrome = isAuthPage || isLegalPage || isDashboard;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-cyan-500 selection:text-white relative flex flex-col justify-between">
      
      {/* Top Navbar (hidden on dedicated auth and minimal legal pages) */}
      {!hideChrome && <Navbar />}

      {/* Dynamic Route View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/book-exam" element={<BookExamPage />} />
          <Route path="/pte-voucher" element={<BookExamPage />} />
          <Route path="/mobile-app" element={<MobileAppPage />} />
          <Route path="/pte-practice-app" element={<MobileAppPage />} />
          <Route path="/pte-mobile-app" element={<MobileAppPage />} />
          <Route path="/business" element={<InstituteSoftwarePage />} />
          <Route path="/institute-software" element={<InstituteSoftwarePage />} />
          <Route path="/pte-for-businesses" element={<InstituteSoftwarePage />} />
          <Route path="/about-pte" element={<AboutPTEPage />} />
          <Route path="/pte-academic" element={<AboutPTEPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/webinars" element={<EventsPage />} />
          <Route path="/pte-jobs" element={<PTEJobsPage />} />
          <Route path="/jobs" element={<PTEJobsPage />} />
          <Route path="/train-the-trainer" element={<TrainTheTrainerPage />} />
          <Route path="/train-trainer" element={<TrainTheTrainerPage />} />
          <Route path="/pte-for-germany" element={<PTEForGermanyPage />} />
          <Route path="/pte-germany" element={<PTEForGermanyPage />} />
          <Route path="/pte-for-singapore" element={<PTEForSingaporePage />} />
          <Route path="/pte-singapore" element={<PTEForSingaporePage />} />
          <Route path="/pte-for-ireland" element={<PTEForIrelandPage />} />
          <Route path="/pte-ireland" element={<PTEForIrelandPage />} />
          <Route path="/pte-for-australia" element={<PTEForAustraliaPage />} />
          <Route path="/pte-australia" element={<PTEForAustraliaPage />} />
          <Route path="/pte-for-new-zealand" element={<PTEForNewZealandPage />} />
          <Route path="/pte-new-zealand" element={<PTEForNewZealandPage />} />
          <Route path="/pte-for-usa" element={<PTEForUSAPage />} />
          <Route path="/pte-usa" element={<PTEForUSAPage />} />
          <Route path="/pte-for-uk" element={<PTEForUKPage />} />
          <Route path="/pte-uk" element={<PTEForUKPage />} />
          <Route path="/pte-for-canada" element={<PTEForCanadaPage />} />
          <Route path="/pte-canada" element={<PTEForCanadaPage />} />
          <Route path="/pte-academic-ukvi-exam" element={<PTEAcademicUKVIExamPage />} />
          <Route path="/pte-academic-ukvi" element={<PTEAcademicUKVIExamPage />} />
          <Route path="/pte-ukvi-exam" element={<PTEAcademicUKVIExamPage />} />
          <Route path="/pte-ukvi" element={<PTEAcademicUKVIExamPage />} />
          <Route path="/pte-academic-ukvi-exam-pattern" element={<Navigate to="/pte-speaking-practice" replace />} />
          <Route path="/pte-academic-exam-pattern" element={<Navigate to="/pte-speaking-practice" replace />} />
          <Route path="/pte-exam-pattern" element={<Navigate to="/pte-speaking-practice" replace />} />
          <Route path="/pte-speaking-practice" element={<PTESpeakingPracticePage />} />
          <Route path="/pte-writing-practice" element={<PTEWritingPracticePage />} />
          <Route path="/pte-reading-practice" element={<PTEReadingPracticePage />} />
          <Route path="/pte-listening-practice" element={<PTEListeningPracticePage />} />
          <Route path="/pte-practice" element={<PTESpeakingPracticePage />} />
          <Route path="/pte-online-course" element={<PTEOnlineCoursePage />} />
          <Route path="/pte-online-coaching" element={<PTEOnlineCoursePage />} />
          <Route path="/online-course" element={<PTEOnlineCoursePage />} />
          <Route path="/online-coaching" element={<PTEOnlineCoursePage />} />
          <Route path="/pte-material" element={<PTEMaterialPage />} />
          <Route path="/pte-core" element={<PTECoreExamPage />} />
          <Route path="/pte-core-exam" element={<PTECoreExamPage />} />
          <Route path="/pte-core-mock-test" element={<MockTestsPage variant="core" />} />
          <Route path="/pte-core-mock-tests" element={<MockTestsPage variant="core" />} />
          <Route path="/pte-core-score-calculator" element={<PTECoreScoreCalculatorPage />} />
          <Route path="/clb-score-calculator" element={<PTECoreScoreCalculatorPage />} />
          <Route path="/pte-core-exam-pattern" element={<Navigate to="/pte-core-speaking-practice" replace />} />
          <Route path="/pte-core-speaking-practice" element={<PTECoreSpeakingPracticePage />} />
          <Route path="/pte-core-writing-practice" element={<PTECoreWritingPracticePage />} />
          <Route path="/pte-core-reading-practice" element={<PTECoreReadingPracticePage />} />
          <Route path="/pte-core-listening-practice" element={<PTECoreListeningPracticePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/pte-core-listening-practice" element={<PTECoreListeningPracticePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/best-pte-practice-preparation-material" element={<PTEMaterialPage />} />
          <Route path="/pte-preparation-material" element={<PTEMaterialPage />} />
          <Route path="/pte-practice-material" element={<PTEMaterialPage />} />
          <Route path="/pte-acceptance" element={<PTEAcceptancePage />} />
          <Route path="/who-accepts-pte" element={<PTEAcceptancePage />} />
          <Route path="/pte-test-centres" element={<PTEAcceptancePage />} />
          <Route path="/pte-acceptance-countries" element={<PTEAcceptancePage />} />
          <Route path="/on-test-day" element={<OnTestDayPage />} />
          <Route path="/pte-on-test-day" element={<OnTestDayPage />} />
          <Route path="/test-day-guide" element={<OnTestDayPage />} />
          <Route path="/pte-score-calculator" element={<PTEScoreCalculatorPage />} />
          <Route path="/pte-academic-ukvi-score-calculator" element={<PTEScoreCalculatorPage />} />
          <Route path="/pte-academic-score-calculator" element={<PTEScoreCalculatorPage />} />
          <Route path="/score-calculator" element={<PTEScoreCalculatorPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <PTEDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pte-dashboard" 
            element={
              <ProtectedRoute>
                <PTEDashboard />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/v1/dashboard"
            element={
              <ProtectedRoute>
                <PTEDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/v1/analytics"
            element={
              <ProtectedRoute>
                <PTEAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <PTEAnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/v1/question-weightage"
            element={
              <ProtectedRoute>
                <PTEQuestionWeightagePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question-weightage"
            element={
              <ProtectedRoute>
                <PTEQuestionWeightagePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-dashboard"
            element={
              <SuperAdminRoute>
                <SuperDashboard />
              </SuperAdminRoute>
            }
          />
          <Route
            path="/superadmin"
            element={
              <SuperAdminRoute>
                <SuperDashboard />
              </SuperAdminRoute>
            }
          />
          <Route path="/mock-tests" element={<MockTestsPage />} />
          <Route path="/pte-mock-test" element={<MockTestsPage />} />
          <Route path="/free-mock-test" element={<MockTestsPage />} />
          <Route path="/pte-academic-ukvi-mock-test" element={<MockTestsPage />} />
          <Route path="/pte-academic-mock-test" element={<MockTestsPage />} />
          <Route path="/pte-ukvi-mock-test" element={<MockTestsPage />} />
          <Route path="/pte-full-mock-test" element={<MockTestsPage />} />
          <Route path="/pte-sectional-mock-test" element={<MockTestsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage pageType="disclaimer" />} />
          <Route path="/v1/disclaimer" element={<DisclaimerPage pageType="disclaimer" />} />
          <Route path="/terms-conditions" element={<DisclaimerPage pageType="terms" />} />
          <Route path="/terms" element={<DisclaimerPage pageType="terms" />} />
          <Route path="/privacy-policy" element={<DisclaimerPage pageType="privacy" />} />
          <Route path="/privacy" element={<DisclaimerPage pageType="privacy" />} />
          <Route path="/refund-policy" element={<DisclaimerPage pageType="refund" />} />
          <Route path="/refund-cancellation" element={<DisclaimerPage pageType="refund" />} />
          <Route path="/login" element={<AuthPage initialMode="signin" />} />
          <Route path="/signin" element={<AuthPage initialMode="signin" />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/register" element={<AuthPage initialMode="signup" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Comprehensive Site Footer (hidden on dedicated auth and minimal legal pages) */}
      {!hideChrome && <Footer />}

      {/* Floating WhatsApp and Scroll-to-Top Widgets (hidden on dedicated auth and minimal legal pages) */}
      {!hideChrome && <FloatingWidgets />}

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Scroll smoothly to top on every route navigation */}
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
