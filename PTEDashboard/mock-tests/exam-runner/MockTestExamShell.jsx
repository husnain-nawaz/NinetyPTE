import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AudioLines, BookOpen, Clock, Maximize2, Minimize2, Moon, Sun } from 'lucide-react';
import ExamCentreNoiseModal from './ExamCentreNoiseModal';
import { ExamNextConfirmDialog, ExamNoticeDialog } from './ExamDialogs';
import {
  HeadphoneCheckScreen,
  HeadphoneReminderScreen,
  ImportantExamModal,
  MicrophoneCheckScreen,
  PartIntroScreen,
  PartsOverviewScreen,
  PersonalIntroductionScreen,
  ReadyToStartTestScreen,
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
  getPartIntroSpec,
} from './mockTestSessionStore';

const DEFAULT_EXAM_NOISE = { enabled: false, scope: 'question', volume: 65 };

/**
 * Full-screen Pearson-style single mock test runner supporting onboarding alerts,
 * Personal Introduction, Part tables, Speaking countdown & waveform capture, Exam Centre
 * Noise modal, Light/Dark theme toggle, validation/confirmation dialogs, and Save & Exit.
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
  const [noticeMessage, setNoticeMessage] = useState('');
  const [confirmNextOpen, setConfirmNextOpen] = useState(false);
  const [noiseModalOpen, setNoiseModalOpen] = useState(false);
  const [personalIntroSeconds, setPersonalIntroSeconds] = useState(25);
  const [partIntroSeconds, setPartIntroSeconds] = useState(116);
  const [pendingPartIntro, setPendingPartIntro] = useState(null);
  const [speakingStatus, setSpeakingStatus] = useState({ phase: 'prep', recordingElapsed: 0 });
  const ambientAudioRef = useRef({ ctx: null, source: null, gain: null });

  const testItem = session.testItem;
  const darkMode = Boolean(session.darkMode);
  const examNoise = session.examNoise || DEFAULT_EXAM_NOISE;

  const breakdown = useMemo(() => getMockTestPartBreakdown(testItem, isCore), [testItem, isCore]);
  const questionQueue = useMemo(() => buildMockExamQueue(testItem, isCore), [testItem, isCore]);
  const part1Spec = useMemo(() => getPartIntroSpec(1, testItem, isCore), [testItem, isCore]);
  const part2Spec = useMemo(() => getPartIntroSpec(2, testItem, isCore), [testItem, isCore]);
  const part3Spec = useMemo(() => getPartIntroSpec(3, testItem, isCore), [testItem, isCore]);

  const activeQuestionItem =
    questionQueue[Math.min(session.currentQuestionIndex || 0, Math.max(0, questionQueue.length - 1))];

  const sectionCounterLabel = useMemo(() => {
    if (!activeQuestionItem) return '1 of 1';
    const sameGroup = questionQueue.filter((q) => q.skillGroup === activeQuestionItem.skillGroup);
    const idxInGroup = sameGroup.findIndex((q) => q.index === activeQuestionItem.index);
    return `${idxInGroup >= 0 ? idxInGroup + 1 : 1} of ${sameGroup.length || 1}`;
  }, [activeQuestionItem, questionQueue]);

  useEffect(() => {
    if (session.stage === 'completed' || completedScore) return;
    onPersistSession(session);
  }, [session, completedScore, onPersistSession]);

  // Live exam countdown during question stage
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

  // Personal Introduction & Part Intro short header countdowns
  useEffect(() => {
    if (session.modalStep < 2) return undefined;
    const isPersonalIntro = session.stage === 'onboarding' && session.onboardingStep === 6;
    const isPartIntro =
      (session.stage === 'onboarding' && session.onboardingStep === 8) || Boolean(pendingPartIntro);
    if (!isPersonalIntro && !isPartIntro) return undefined;

    const timer = setInterval(() => {
      if (isPersonalIntro) {
        setPersonalIntroSeconds((s) => Math.max(0, s - 1));
      } else {
        setPartIntroSeconds((s) => Math.max(0, s - 1));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [session.stage, session.modalStep, session.onboardingStep, pendingPartIntro]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Determine whether background Exam Centre Noise should play for current screen
  const isNoiseActiveHere = useMemo(() => {
    if (!examNoise.enabled || session.stage !== 'questions' || !activeQuestionItem) return false;
    if (examNoise.scope === 'module') return activeQuestionItem.skillGroup === 'Speaking';
    if (examNoise.scope === 'type') {
      return !examNoise.targetTaskSlug || examNoise.targetTaskSlug === activeQuestionItem.taskMeta.slug;
    }
    return examNoise.targetQuestionIndex === session.currentQuestionIndex;
  }, [examNoise, session.stage, session.currentQuestionIndex, activeQuestionItem]);

  useEffect(() => {
    const stopAmbient = () => {
      try {
        ambientAudioRef.current.source?.stop();
        ambientAudioRef.current.ctx?.close();
      } catch {
        // Ignore cleanup errors
      }
      ambientAudioRef.current = { ctx: null, source: null, gain: null };
    };

    if (!isNoiseActiveHere) {
      stopAmbient();
      return undefined;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i += 1) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.03 * white) / 1.03;
          lastOut = data[i];
          data[i] *= 1.6;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const gain = ctx.createGain();
        gain.gain.value = ((examNoise.volume ?? 65) / 100) * 0.06;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start();

        ambientAudioRef.current = { ctx, source, gain };
      }
    } catch {
      // Ignore blocked audio context
    }

    return stopAmbient;
  }, [isNoiseActiveHere, examNoise.volume]);

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

  const handleSpeakingPhaseChange = useCallback((statusObj) => {
    setSpeakingStatus(statusObj);
  }, []);

  const performAdvanceStep = () => {
    setConfirmNextOpen(false);
    setSpeakingStatus({ phase: 'prep', recordingElapsed: 0 });

    if (pendingPartIntro) {
      if (pendingPartIntro === '3-headset') {
        setPendingPartIntro(3);
        return;
      }
      setPendingPartIntro(null);
      return;
    }

    if (session.stage === 'onboarding') {
      if (session.onboardingStep < 8) {
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
        const currentItem = questionQueue[session.currentQuestionIndex];
        const nextIdx = session.currentQuestionIndex + 1;
        const nextItem = questionQueue[nextIdx];

        if (currentItem && nextItem && currentItem.partLabel !== nextItem.partLabel) {
          setPartIntroSeconds(119);
          setPendingPartIntro(nextItem.skillGroup === 'Reading' ? 2 : '3-headset');
        }

        setSession((prev) => ({
          ...prev,
          currentQuestionIndex: nextIdx,
          answersByIndex: {
            ...(prev.answersByIndex || {}),
            [prev.currentQuestionIndex]: {
              ...(prev.answersByIndex?.[prev.currentQuestionIndex] || {}),
              visited: true,
            },
          },
        }));
        return;
      }

      const finalPayload = buildMockAttemptScore(testItem, session, trackLabel);
      setCompletedScore(finalPayload);
      setSession((prev) => ({ ...prev, stage: 'completed' }));
      onFinishAttempt(finalPayload);
    }
  };

  const handleClickNextButton = () => {
    if (pendingPartIntro) {
      performAdvanceStep();
      return;
    }

    if (session.stage === 'onboarding') {
      if (session.onboardingStep === 5 && !session.writingStyle) {
        setNoticeMessage('Please select a writing style before continuing.');
        return;
      }
      if (session.onboardingStep === 6) {
        if (
          speakingStatus.phase === 'prep' ||
          speakingStatus.phase === 'loading' ||
          (speakingStatus.phase === 'recording' && speakingStatus.recordingElapsed < 2)
        ) {
          setNoticeMessage('Please finish answering this question before moving to the next.');
          return;
        }
        setConfirmNextOpen(true);
        return;
      }
      performAdvanceStep();
      return;
    }

    if (session.stage === 'questions' && activeQuestionItem) {
      const currentAns = session.answersByIndex?.[session.currentQuestionIndex];
      const isTooEarlyOnSpeaking =
        speakingStatus.phase === 'prep' ||
        speakingStatus.phase === 'loading' ||
        (speakingStatus.phase === 'recording' && speakingStatus.recordingElapsed < 2);

      if (activeQuestionItem.skillGroup === 'Speaking' && isTooEarlyOnSpeaking && !currentAns?.recorded) {
        setNoticeMessage('Please finish answering this question before moving to the next.');
        return;
      }

      if (activeQuestionItem.skillGroup === 'Writing' && !currentAns?.responseText?.trim()) {
        setNoticeMessage('Please finish answering this question before moving to the next.');
        return;
      }

      if (activeQuestionItem.skillGroup === 'Listening') {
        const slug = activeQuestionItem.taskMeta?.slug;
        const hasListeningAnswer =
          slug === 'summarize-spoken-text' || slug === 'write-from-dictation'
            ? Boolean(currentAns?.responseText?.trim())
            : slug === 'fill-in-the-blanks'
              ? Object.values(currentAns?.blankSelections || {}).some((v) => String(v || '').trim())
              : slug === 'highlight-incorrect-words'
                ? (currentAns?.highlightedWords || []).length > 0
                : (currentAns?.selectedChoices || []).length > 0;

        if (!hasListeningAnswer) {
          setNoticeMessage('Please finish answering this question before moving to the next.');
          return;
        }
      }

      if (
        (activeQuestionItem.taskMeta?.hasDropdownBlanks ||
          activeQuestionItem.taskMeta?.dragDropWordBank) &&
        Object.keys(currentAns?.blankSelections || {}).length === 0
      ) {
        setNoticeMessage('Please finish answering this question before moving to the next.');
        return;
      }

      if (
        activeQuestionItem.skillGroup === 'Reading' &&
        Array.isArray(activeQuestionItem.taskMeta?.mcqOptions) &&
        (currentAns?.selectedChoices || []).length === 0
      ) {
        setNoticeMessage('Please finish answering this question before moving to the next.');
        return;
      }

      if (
        activeQuestionItem.skillGroup === 'Reading' &&
        Array.isArray(activeQuestionItem.taskMeta?.reorderParagraphs) &&
        (currentAns?.reorderTargetIds || []).length === 0
      ) {
        setNoticeMessage('Please finish answering this question before moving to the next.');
        return;
      }

      setConfirmNextOpen(true);
    }
  };

  const handleUpdateNoise = (nextNoise) => {
    setSession((prev) => ({
      ...prev,
      examNoise: {
        ...nextNoise,
        targetQuestionIndex: prev.currentQuestionIndex,
        targetTaskSlug: activeQuestionItem?.taskMeta?.slug || null,
      },
    }));
  };

  const chromeBarClass = darkMode
    ? 'bg-[#2b2b2b] text-zinc-100 border-zinc-700'
    : 'bg-[#bdbdbd] text-slate-900 border-white/70';

  const bodySurfaceClass = darkMode ? 'bg-[#333333] text-zinc-100' : 'bg-white text-slate-800';

  const showTopCounterHUD =
    session.stage === 'questions' ||
    Boolean(pendingPartIntro) ||
    (session.stage === 'onboarding' &&
      (session.onboardingStep === 6 || session.onboardingStep === 8));

  const topTimerDisplay =
    pendingPartIntro
      ? formatCountdownHMS(partIntroSeconds)
      : session.stage === 'questions'
        ? formatCountdownHMS(session.remainingSeconds)
        : session.onboardingStep === 6
          ? formatCountdownHMS(personalIntroSeconds)
          : formatCountdownHMS(partIntroSeconds);

  const topCounterLabel =
    pendingPartIntro
      ? null
      : session.stage === 'questions'
        ? sectionCounterLabel
        : session.onboardingStep === 6
          ? '1 of 1'
          : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-sans select-none">
      {/* Pre-Exam Important Alert Popups */}
      {session.modalStep < 2 && (
        <ImportantExamModal modalStep={session.modalStep} onAcknowledge={handleAcknowledgeModal} />
      )}

      {/* Validation Notice / Question Confirmation Popups */}
      {noticeMessage && (
        <ExamNoticeDialog
          message={noticeMessage}
          onClose={() => setNoticeMessage('')}
          darkMode={darkMode}
        />
      )}

      {confirmNextOpen && (
        <ExamNextConfirmDialog
          onClose={() => setConfirmNextOpen(false)}
          onConfirmNext={performAdvanceStep}
          darkMode={darkMode}
        />
      )}

      {noiseModalOpen && (
        <ExamCentreNoiseModal
          noiseState={examNoise}
          onUpdateNoise={handleUpdateNoise}
          onClose={() => setNoiseModalOpen(false)}
          darkMode={darkMode}
        />
      )}

      {/* Top Grey Title Bar (Test Name on Left + Time Remaining / Item Counter on Right) */}
      <header className={`h-11 px-4 sm:px-6 flex items-center justify-between border-b shrink-0 ${chromeBarClass}`}>
        <span className="text-sm sm:text-base font-medium truncate">
          NinetyPTE - {testItem.title}
        </span>

        {showTopCounterHUD && !completedScore && (
          <div className="text-right text-[11px] leading-tight shrink-0">
            <p className="inline-flex items-center justify-end gap-1.5 font-medium">
              <Clock className="w-3 h-3 opacity-80" />
              <span>
                Time Remaining:{' '}
                <span className="text-[#0c6c8a] dark:text-[#4dd0e1] font-semibold">
                  {topTimerDisplay}
                </span>
              </span>
            </p>
            {topCounterLabel && (
              <p className="flex items-center justify-end gap-1.5 font-medium mt-0.5">
                <BookOpen className="w-3 h-3 opacity-75" />
                <span>{topCounterLabel}</span>
              </p>
            )}
          </div>
        )}
      </header>

      {/* Deep Teal Exam Sub-Header Bar (Noise + Fullscreen + Dark/Light Mode) */}
      <div className="h-9 bg-[#00738e] text-white px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
        <span className="text-[11px] font-medium opacity-95 truncate">
          {session.stage === 'questions' && activeQuestionItem
            ? `${activeQuestionItem.partLabel}`
            : session.stage === 'completed'
              ? 'Score Summary'
              : ''}
        </span>

        <div className="flex items-center gap-3.5">
          {!completedScore &&
            !pendingPartIntro &&
            session.stage === 'questions' &&
            activeQuestionItem?.skillGroup === 'Speaking' && (
              <button
                type="button"
                onClick={() => setNoiseModalOpen(true)}
                aria-label="Configure Exam Centre Noise"
                title="Exam Centre Noise"
                className="relative w-7 h-7 rounded-full border border-white/60 bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition"
              >
                <AudioLines className="w-3.5 h-3.5" />
                <span
                  className={`absolute -top-1.5 -left-2.5 rounded-full px-1 text-[8px] font-extrabold leading-tight ${
                    examNoise.enabled ? 'bg-[#3dc8c1] text-white' : 'bg-[#e0f7fa] text-[#00738e]'
                  }`}
                >
                  {examNoise.enabled ? 'On' : 'Off'}
                </span>
              </button>
            )}

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

      {/* Main Exam Content Viewport */}
      <main className={`flex-1 overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 ${bodySurfaceClass}`}>
        {completedScore ? (
          <MockExamCompletedScreen
            scorePayload={completedScore}
            scoreHistoryRoute={scoreHistoryRoute}
            onExit={() => onSaveAndExit(null)}
            darkMode={darkMode}
          />
        ) : pendingPartIntro === '3-headset' ? (
          <HeadphoneReminderScreen darkMode={darkMode} />
        ) : pendingPartIntro ? (
          <PartIntroScreen
            partSpec={pendingPartIntro === 2 ? part2Spec : part3Spec}
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
            {session.onboardingStep === 6 && (
              <PersonalIntroductionScreen
                darkMode={darkMode}
                onPhaseChange={handleSpeakingPhaseChange}
              />
            )}
            {session.onboardingStep === 7 && <ReadyToStartTestScreen darkMode={darkMode} />}
            {session.onboardingStep === 8 && (
              <PartIntroScreen partSpec={part1Spec} darkMode={darkMode} />
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
              onSpeakingPhaseChange={handleSpeakingPhaseChange}
              darkMode={darkMode}
            />
          )
        )}
      </main>

      {/* Bottom Grey Footer Bar (Save & Exit on Left + Vertical Dividers + Next on Right) */}
      {!completedScore && (
        <footer className={`h-12 flex items-stretch justify-between border-t shrink-0 ${chromeBarClass}`}>
          <div className="border-r-2 border-white/85 px-4 sm:px-5 flex items-center">
            <button
              type="button"
              onClick={() => onSaveAndExit(session)}
              className={`rounded-full border px-4 py-1 text-xs font-medium shadow-2xs transition cursor-pointer ${
                darkMode
                  ? 'border-zinc-500 bg-zinc-700 text-zinc-100 hover:bg-zinc-600'
                  : 'border-slate-300 bg-[#e9e9e9] text-slate-600 hover:bg-white'
              }`}
            >
              Save &amp; Exit
            </button>
          </div>

          <div className="flex-1 px-4 flex items-center text-[11px] opacity-80 truncate">
            {session.stage === 'questions' && session.writingStyle
              ? `Writing Style: ${session.writingStyle}`
              : ''}
          </div>

          <div className="border-l-2 border-white/85 px-4 sm:px-6 flex items-center">
            <button
              type="button"
              onClick={handleClickNextButton}
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
