import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Clock, Maximize2, Minimize2, Moon, Sun } from 'lucide-react';
import {
  HeadphoneCheckScreen,
  ImportantExamModal,
  MicrophoneCheckScreen,
  PartsOverviewScreen,
  SpeakingTipsScreen,
  TestIntroductionScreen,
  WritingInstructionsScreen,
} from './MockExamOnboardingScreens';
import { MockExamCompletedScreen, MockExamQuestionStage } from './MockExamQuestionStage';
import {
  buildMockAttemptScore,
  buildMockExamQueue,
  formatCountdownHMS,
  getMockTestPartBreakdown,
} from './mockTestSessionStore';

/**
 * Full-screen Pearson-style single mock test runner shared across all Full, Sectional,
 * Timed Sectional, and Custom mock tests, supporting light/dark theme, variable question
 * counts, and seamless Save & Resume state.
 */
export default function MockTestExamShell({
  initialSession,
  isCore,
  trackLabel,
  scoreHistoryRoute,
  onPersistSession,
  onFinishAttempt,
  onSaveAndExit,
}) {
  const [session, setSession] = useState(initialSession);
  const [completedScore, setCompletedScore] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  const testItem = session.testItem;
  const darkMode = Boolean(session.darkMode);

  const breakdown = useMemo(() => getMockTestPartBreakdown(testItem, isCore), [testItem, isCore]);
  const questionQueue = useMemo(() => buildMockExamQueue(testItem, isCore), [testItem, isCore]);

  useEffect(() => {
    if (session.stage === 'completed' || completedScore) return;
    onPersistSession(session);
  }, [session, completedScore, onPersistSession]);

  // Countdown tick only while actively answering exam questions after onboarding modals are dismissed
  useEffect(() => {
    if (session.stage !== 'questions' || session.modalStep < 2) return undefined;
    const timer = setInterval(() => {
      setSession((prev) => ({
        ...prev,
        remainingSeconds: Math.max(0, (prev.remainingSeconds || 0) - 1),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [session.stage, session.modalStep]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };

  const handleToggleDarkMode = () => {
    setSession((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleAcknowledgeModal = () => {
    setSession((prev) => ({
      ...prev,
      modalStep: Math.min(2, (prev.modalStep || 0) + 1),
    }));
  };

  const activeQuestionItem =
    questionQueue[Math.min(session.currentQuestionIndex || 0, Math.max(0, questionQueue.length - 1))];

  const handleNextStep = () => {
    if (session.stage === 'onboarding') {
      if (session.onboardingStep < 5) {
        setSession((prev) => ({ ...prev, onboardingStep: prev.onboardingStep + 1 }));
        return;
      }
      setSession((prev) => ({
        ...prev,
        stage: 'questions',
        currentQuestionIndex: 0,
      }));
      return;
    }

    if (session.stage === 'questions') {
      if (session.currentQuestionIndex < questionQueue.length - 1) {
        setSession((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
        return;
      }

      const finalPayload = buildMockAttemptScore(testItem, session, trackLabel);
      setCompletedScore(finalPayload);
      setSession((prev) => ({ ...prev, stage: 'completed' }));
      onFinishAttempt(finalPayload);
    }
  };

  const chromeBarClass = darkMode
    ? 'bg-[#2b2b2b] text-zinc-100 border-zinc-700'
    : 'bg-[#bdbdbd] text-slate-900 border-white/70';

  const bodySurfaceClass = darkMode ? 'bg-[#333333] text-zinc-100' : 'bg-white text-slate-800';

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-sans select-none">
      {/* Pre-Exam Important Alert Popups */}
      {session.modalStep < 2 && (
        <ImportantExamModal modalStep={session.modalStep} onAcknowledge={handleAcknowledgeModal} />
      )}

      {/* Top Title Bar */}
      <header className={`h-11 px-4 sm:px-6 flex items-center justify-between border-b shrink-0 ${chromeBarClass}`}>
        <span className="text-sm sm:text-base font-medium truncate">
          NinetyPTE - {testItem.title}
        </span>

        {!completedScore && (
          <button
            type="button"
            onClick={() => onSaveAndExit(session)}
            className={`rounded-md border px-3 py-1 text-[11px] font-semibold transition cursor-pointer ${
              darkMode
                ? 'border-zinc-500 bg-zinc-700 text-zinc-100 hover:bg-zinc-600'
                : 'border-slate-400/70 bg-white/80 text-slate-800 hover:bg-white'
            }`}
          >
            Save &amp; Exit
          </button>
        )}
      </header>

      {/* Teal Exam Sub-Header Bar with Timer / Question Counter / Fullscreen / Dark Mode */}
      <div className="h-9 bg-[#00738e] text-white px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
        <span className="text-[11px] font-medium opacity-95 truncate">
          {session.stage === 'questions' && activeQuestionItem
            ? `${activeQuestionItem.partLabel}`
            : session.stage === 'completed'
              ? 'Score Summary'
              : ''}
        </span>

        <div className="flex items-center gap-4">
          {session.stage === 'questions' && activeQuestionItem && (
            <div className="flex items-center gap-4 text-[11px] font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Time Remaining: {formatCountdownHMS(session.remainingSeconds)}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {session.currentQuestionIndex + 1} of {questionQueue.length}
                </span>
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              className="text-white hover:opacity-80 transition cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleToggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`hover:opacity-85 transition cursor-pointer ${
                darkMode ? 'text-[#facc15]' : 'text-white'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 ${bodySurfaceClass}`}>
        {completedScore ? (
          <MockExamCompletedScreen
            scorePayload={completedScore}
            scoreHistoryRoute={scoreHistoryRoute}
            onExit={() => onSaveAndExit(null)}
            darkMode={darkMode}
          />
        ) : session.stage === 'onboarding' ? (
          <>
            {session.onboardingStep === 0 && (
              <PartsOverviewScreen breakdown={breakdown} darkMode={darkMode} />
            )}
            {session.onboardingStep === 1 && (
              <TestIntroductionScreen
                isCore={isCore}
                totalQuestions={questionQueue.length}
                darkMode={darkMode}
              />
            )}
            {session.onboardingStep === 2 && <HeadphoneCheckScreen darkMode={darkMode} />}
            {session.onboardingStep === 3 && <MicrophoneCheckScreen darkMode={darkMode} />}
            {session.onboardingStep === 4 && <SpeakingTipsScreen darkMode={darkMode} />}
            {session.onboardingStep === 5 && (
              <WritingInstructionsScreen
                writingStyle={session.writingStyle}
                onSelectWritingStyle={(style) => setSession((prev) => ({ ...prev, writingStyle: style }))}
                darkMode={darkMode}
              />
            )}
          </>
        ) : (
          activeQuestionItem && (
            <MockExamQuestionStage
              key={activeQuestionItem.index}
              activeItem={activeQuestionItem}
              savedAnswer={session.answersByIndex?.[activeQuestionItem.index]}
              onSaveAnswer={(ansPayload) =>
                setSession((prev) => ({
                  ...prev,
                  answersByIndex: {
                    ...(prev.answersByIndex || {}),
                    [activeQuestionItem.index]: ansPayload,
                  },
                }))
              }
              darkMode={darkMode}
            />
          )
        )}
      </main>

      {/* Bottom Footer Bar with Vertical White Divider and Next Button */}
      {!completedScore && (
        <footer className={`h-12 flex items-stretch justify-between border-t shrink-0 ${chromeBarClass}`}>
          <div className="flex-1 px-4 sm:px-6 flex items-center justify-between text-[11px]">
            <span className="opacity-80">
              {session.stage === 'questions'
                ? `Writing Evaluation Style: ${session.writingStyle}`
                : 'Read the instructions carefully before proceeding.'}
            </span>
          </div>

          <div className="border-l-2 border-white/85 px-4 sm:px-6 flex items-center">
            <button
              type="button"
              onClick={handleNextStep}
              disabled={session.modalStep < 2}
              className="min-w-[84px] rounded-full border border-[#0b4a7b] bg-linear-to-b from-[#49a0c4] to-[#125a82] hover:from-[#3d92b6] hover:to-[#0d4c6e] px-5 py-1 text-xs font-bold text-white shadow-sm disabled:opacity-50 cursor-pointer transition"
            >
              {session.stage === 'questions' && session.currentQuestionIndex === questionQueue.length - 1
                ? 'Finish Test'
                : 'Next'}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
