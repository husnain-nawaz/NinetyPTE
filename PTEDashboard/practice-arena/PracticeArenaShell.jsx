import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronsLeft } from 'lucide-react';
import PTEDashboardHeader from '../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../shared/PTEDashboardTealFooter';
import BottomCommunityTabs from './BottomCommunityTabs';
import QuestionBankSidebarDrawer from './QuestionBankSidebarDrawer';
import QuestionFooterControls from './QuestionFooterControls';
import QuestionToolbarHeader from './QuestionToolbarHeader';
import SpeakingRecorderPanel from './SpeakingRecorderPanel';
import TaskResponseInputs from './TaskResponseInputs';
import {
  AppearedInExamModal,
  DictionaryModal,
  ExamCentreNoiseModal,
  MicrophoneSetupModal,
  QuestionNoteModal,
} from './ToolbarFeatureModals';
import { emitPortalNotification } from '../shared/notificationsData';
import TranslateModal from './TranslateModal';
import { buildTaskQuestionList, resolvePracticeTask } from './practiceTaskCatalog';

const DEFAULT_PREP_SECONDS = 34;
const DEFAULT_RECORD_SECONDS = 35;

/**
 * Unified Practice Arena shell rendering every task from Read Aloud through Write from Dictation
 * with shared top controls, speaking/writing/reading/listening modules, translate dialog,
 * Forum/My Score/Community Score tabs, and collapsible right Question Bank drawer.
 */
export default function PracticeArenaShell({ skill, taskSlug, isCoreMode = false }) {
  const taskMeta = useMemo(
    () => resolvePracticeTask(skill, taskSlug, isCoreMode),
    [isCoreMode, skill, taskSlug]
  );

  const initialQuestions = useMemo(() => buildTaskQuestionList(taskMeta), [taskMeta]);

  const [questionsById, setQuestionsById] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(() => initialQuestions[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [micAutoStart] = useState(true);
  const [selectedMicId, setSelectedMicId] = useState('comm-realtek');
  const [micModalOpen, setMicModalOpen] = useState(false);
  const [noiseConfig, setNoiseConfig] = useState({ enabled: false, scope: 'question', volume: 72 });
  const [noiseModalOpen, setNoiseModalOpen] = useState(false);
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [notesById, setNotesById] = useState({});
  const [appearedModalOpen, setAppearedModalOpen] = useState(false);
  const [bannerToast, setBannerToast] = useState('');
  const [recorderState, setRecorderState] = useState('idle'); // 'idle' | 'recording' | 'recorded'
  const [prepSecondsLeft, setPrepSecondsLeft] = useState(DEFAULT_PREP_SECONDS);
  const [recordElapsed, setRecordElapsed] = useState(0);

  const [responseText, setResponseText] = useState('');
  const [blankSelections, setBlankSelections] = useState({});
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [paragraphOrder, setParagraphOrder] = useState(() => taskMeta.reorderParagraphs || []);
  const [highlightedWords, setHighlightedWords] = useState([]);

  const [difficultyVote, setDifficultyVote] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);

  const [activeBottomTab, setActiveBottomTab] = useState('my-score');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myScoresByQuestion, setMyScoresByQuestion] = useState({});
  const submitTimerRef = useRef(null);

  const questions = useMemo(
    () =>
      initialQuestions.map((q) => {
        const override = questionsById[q.id];
        return override ? { ...q, ...override } : q;
      }),
    [initialQuestions, questionsById]
  );

  const activeQuestion =
    questions.find((q) => q.id === selectedQuestion?.id) || selectedQuestion || questions[0];
  const currentIndex = Math.max(
    0,
    questions.findIndex((q) => q.id === activeQuestion.id)
  );

  const currentMyScores = myScoresByQuestion[activeQuestion.id] || [];

  // Prep countdown timer during idle Speaking state
  useEffect(() => {
    if (taskMeta.skill !== 'speaking' || recorderState !== 'idle' || !micAutoStart) {
      return undefined;
    }
    const timer = setInterval(() => {
      setPrepSecondsLeft((prev) => {
        if (prev <= 1) {
          setRecorderState('recording');
          setRecordElapsed(0);
          return DEFAULT_PREP_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [taskMeta.skill, recorderState, micAutoStart]);

  // Recording elapsed timer during active recording
  useEffect(() => {
    if (recorderState !== 'recording') return undefined;
    const timer = setInterval(() => {
      setRecordElapsed((prev) => {
        if (prev + 1 >= DEFAULT_RECORD_SECONDS) {
          setRecorderState('recorded');
          return DEFAULT_RECORD_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [recorderState]);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
    };
  }, []);

  const resetInputsForNewQuestion = (targetQuestion) => {
    setRecorderState('idle');
    setPrepSecondsLeft(DEFAULT_PREP_SECONDS);
    setRecordElapsed(0);
    setResponseText('');
    setBlankSelections({});
    setSelectedChoices([]);
    setParagraphOrder(taskMeta.reorderParagraphs || []);
    setHighlightedWords([]);
    setShowAnswer(false);
    setDifficultyVote('');
    if (targetQuestion) {
      setSelectedQuestion(targetQuestion);
    }
  };

  const handleToggleBookmark = (questionId, colorId = 'red') => {
    setQuestionsById((prev) => {
      const target = questions.find((q) => q.id === questionId);
      const isClearing =
        colorId ? target?.bookmarkColor === colorId && target?.bookmarked : target?.bookmarked;
      return {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          bookmarked: !isClearing,
          bookmarkColor: isClearing ? null : colorId || 'red',
        },
      };
    });
  };

  const handleResetPractice = () => {
    const resetMap = {};
    for (const q of initialQuestions) {
      resetMap[q.id] = { practicedCount: 0, bookmarked: false };
    }
    setQuestionsById(resetMap);
    setMyScoresByQuestion({});
    resetInputsForNewQuestion(initialQuestions[0]);
  };

  const handleStartRecording = () => {
    setRecorderState('recording');
    setRecordElapsed(0);
  };

  const handleStopRecording = () => {
    setRecorderState('recorded');
  };

  const handleSubmitAttempt = () => {
    if (!activeQuestion || isSubmitting) return;
    if (taskMeta.skill === 'speaking' && recorderState === 'recording') {
      setRecorderState('recorded');
    }

    setIsSubmitting(true);
    setActiveBottomTab('my-score');

    if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
    submitTimerRef.current = setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')} ${now.toLocaleDateString('en-GB')}`;
      const generatedScore =
        taskMeta.skill === 'speaking' && recordElapsed < 2
          ? 0
          : 74 + ((activeQuestion.appearedCount || 7) % 14);

      const newAttempt = {
        id: `score-${Date.now()}`,
        timestamp: timeStr,
        score: generatedScore,
        content: Math.min(90, generatedScore + 3),
        fluency: generatedScore,
        pronunciation: Math.max(0, generatedScore - 2),
        durationLabel: `00:${String(Math.max(recordElapsed || 12, 1)).padStart(2, '0')}`,
        shareToken: Math.random().toString(36).slice(2, 12) + Math.random().toString(36).slice(2, 12),
        likes: 0,
        liked: false,
      };

      setQuestionsById((prev) => ({
        ...prev,
        [activeQuestion.id]: {
          ...prev[activeQuestion.id],
          practicedCount: (activeQuestion.practicedCount || 0) + 1,
        },
      }));

      setMyScoresByQuestion((prev) => ({
        ...prev,
        [activeQuestion.id]: [newAttempt, ...(prev[activeQuestion.id] || [])],
      }));

      setIsSubmitting(false);
    }, 600);
  };

  const handleDeleteScore = (scoreId) => {
    setMyScoresByQuestion((prev) => ({
      ...prev,
      [activeQuestion.id]: (prev[activeQuestion.id] || []).filter((item) => item.id !== scoreId),
    }));
  };

  const handleToggleLikeScore = (scoreId) => {
    setMyScoresByQuestion((prev) => ({
      ...prev,
      [activeQuestion.id]: (prev[activeQuestion.id] || []).map((item) =>
        item.id === scoreId
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? Math.max(0, item.likes - 1) : item.likes + 1,
            }
          : item
      ),
    }));
  };

  const handleShuffleQuestion = () => {
    if (questions.length <= 1) return;
    const randIdx = (currentIndex + 3) % questions.length;
    resetInputsForNewQuestion(questions[randIdx]);
  };

  const canShowAnswer =
    taskMeta.hasAudioPrompt ||
    taskMeta.hasImagePrompt ||
    taskMeta.hasDropdownBlanks ||
    Boolean(taskMeta.dragDropWordBank) ||
    Boolean(taskMeta.highlightIncorrectWords) ||
    Array.isArray(taskMeta.typedBlanksAnswers) ||
    Array.isArray(taskMeta.mcqOptions) ||
    Array.isArray(taskMeta.reorderParagraphs);

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans relative">
      <PTEDashboardHeader />

      {/* Right-Edge Collapsible Drawer Trigger */}
      {!drawerOpen && (
        <div className="fixed right-0 top-[26%] z-30 flex flex-col gap-16">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label={`Open all ${taskMeta.totalQuestions} questions drawer`}
            title={`All ${taskMeta.totalQuestions} Questions`}
            className="w-8 h-9 rounded-l-lg bg-[#1db3a8] hover:bg-[#15978d] text-white flex items-center justify-center shadow-md cursor-pointer transition"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-1 w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        <QuestionToolbarHeader
          taskMeta={taskMeta}
          activeQuestion={activeQuestion}
          isCoreMode={isCoreMode}
          noiseEnabled={noiseConfig.enabled}
          onOpenMicModal={() => setMicModalOpen(true)}
          onOpenNoiseModal={() => setNoiseModalOpen(true)}
          onOpenDictionary={() => setDictionaryOpen(true)}
          onOpenNoteModal={() => setNoteModalOpen(true)}
          onSelectBookmarkColor={handleToggleBookmark}
          onOpenAppearedModal={() => setAppearedModalOpen(true)}
        />

        {taskMeta.skill === 'speaking' ? (
          <SpeakingRecorderPanel
            taskMeta={taskMeta}
            activeQuestion={activeQuestion}
            showAnswer={showAnswer}
            recorderState={recorderState}
            prepSecondsLeft={prepSecondsLeft}
            recordElapsed={recordElapsed}
            totalRecordSeconds={DEFAULT_RECORD_SECONDS}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        ) : (
          <TaskResponseInputs
            taskMeta={taskMeta}
            activeQuestion={activeQuestion}
            showAnswer={showAnswer}
            responseText={responseText}
            onChangeResponseText={setResponseText}
            blankSelections={blankSelections}
            onChangeBlankSelections={setBlankSelections}
            selectedChoices={selectedChoices}
            onChangeSelectedChoices={setSelectedChoices}
            paragraphOrder={paragraphOrder}
            onChangeParagraphOrder={setParagraphOrder}
            highlightedWords={highlightedWords}
            onChangeHighlightedWords={setHighlightedWords}
          />
        )}

        <QuestionFooterControls
          difficultyVote={difficultyVote}
          onVoteDifficulty={setDifficultyVote}
          isSubmitting={isSubmitting}
          canShowAnswer={canShowAnswer}
          showAnswer={showAnswer}
          onSubmit={handleSubmitAttempt}
          onRedo={() => resetInputsForNewQuestion(null)}
          onOpenTranslate={() => setTranslateOpen(true)}
          onToggleAnswer={() => setShowAnswer((prev) => !prev)}
          onShuffle={handleShuffleQuestion}
          onPrev={() =>
            currentIndex > 0 && resetInputsForNewQuestion(questions[currentIndex - 1])
          }
          onNext={() =>
            currentIndex < questions.length - 1 &&
            resetInputsForNewQuestion(questions[currentIndex + 1])
          }
          currentIndex={currentIndex}
          totalCount={taskMeta.totalQuestions}
          onJumpToIndex={(idx) => resetInputsForNewQuestion(questions[idx])}
        />

        <BottomCommunityTabs
          activeTab={activeBottomTab}
          onChangeTab={setActiveBottomTab}
          isSubmitting={isSubmitting}
          taskMeta={taskMeta}
          activeQuestion={activeQuestion}
          myScores={currentMyScores}
          onDeleteMyScore={handleDeleteScore}
          onToggleLikeScore={handleToggleLikeScore}
        />
      </main>

      <PTEDashboardTealFooter />

      {translateOpen && (
        <TranslateModal
          questionId={activeQuestion.id}
          promptText={activeQuestion.contentSnippet || taskMeta.promptText}
          onClose={() => setTranslateOpen(false)}
        />
      )}

      {noiseModalOpen && (
        <ExamCentreNoiseModal
          initialEnabled={noiseConfig.enabled}
          initialScope={noiseConfig.scope}
          onClose={() => setNoiseModalOpen(false)}
          onSave={setNoiseConfig}
        />
      )}

      {dictionaryOpen && (
        <DictionaryModal
          promptText={activeQuestion.contentSnippet || taskMeta.promptText}
          onClose={() => setDictionaryOpen(false)}
          onAddToVocabBank={(word) => {
            setBannerToast(`"${word}" saved to Vocab-Bank!`);
            setTimeout(() => setBannerToast(''), 2500);
          }}
        />
      )}

      {micModalOpen && (
        <MicrophoneSetupModal
          initialMicId={selectedMicId}
          onClose={() => setMicModalOpen(false)}
          onSelectMic={(id) => {
            setSelectedMicId(id);
            setBannerToast('Microphone selected!');
            setTimeout(() => setBannerToast(''), 2200);
          }}
        />
      )}

      {noteModalOpen && (
        <QuestionNoteModal
          initialNote={notesById[activeQuestion.id] || ''}
          onClose={() => setNoteModalOpen(false)}
          onSaveNote={(txt) => {
            setNotesById((prev) => ({ ...prev, [activeQuestion.id]: txt }));
            setBannerToast('Note saved!');
            setTimeout(() => setBannerToast(''), 2200);
          }}
        />
      )}

      {appearedModalOpen && (
        <AppearedInExamModal
          onClose={() => setAppearedModalOpen(false)}
          onSubmitAppeared={() => {
            setQuestionsById((prev) => ({
              ...prev,
              [activeQuestion.id]: {
                ...prev[activeQuestion.id],
                appearedCount: (activeQuestion.appearedCount || 0) + 1,
                prediction: true,
              },
            }));
            emitPortalNotification({
              title: 'You: confirmed APPEARED question',
              refTag: `${taskMeta.code} #${activeQuestion.id}`,
              kind: 'alert-chat',
            });
            setBannerToast('Posted successfully!');
            setTimeout(() => setBannerToast(''), 2500);
          }}
        />
      )}

      {bannerToast && (
        <div className="fixed top-20 right-6 z-50 w-64 rounded-lg bg-white shadow-xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
              ✓
            </span>
            <span className="text-xs font-semibold text-slate-600">{bannerToast}</span>
          </div>
          <div className="h-1 bg-emerald-500 w-2/3" />
        </div>
      )}

      <QuestionBankSidebarDrawer
        key={`${taskMeta.skill}-${taskMeta.slug}`}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        taskMeta={taskMeta}
        questions={questions}
        activeQuestionId={activeQuestion.id}
        onSelectQuestion={resetInputsForNewQuestion}
        onToggleBookmark={handleToggleBookmark}
        onResetPractice={handleResetPractice}
      />
    </div>
  );
}
