import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Info,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatMMSS } from './exam-runner/mockTestSessionStore';

const SKILL_RING_META = {
  S: { label: 'Speaking', headerBg: 'bg-[#f49d56]', stroke: '#f49d56', border: 'border-[#f49d56]' },
  W: { label: 'Writing', headerBg: 'bg-[#4ea5f5]', stroke: '#4ea5f5', border: 'border-[#4ea5f5]' },
  R: { label: 'Reading', headerBg: 'bg-[#22c55e]', stroke: '#22c55e', border: 'border-[#22c55e]' },
  L: { label: 'Listening', headerBg: 'bg-[#0b4a7b]', stroke: '#0b4a7b', border: 'border-[#0b4a7b]' },
};

const WORD_STATUS_STYLE = {
  good: 'text-emerald-600 hover:bg-emerald-50',
  average: 'text-amber-500 hover:bg-amber-50',
  missed: 'text-rose-500 hover:bg-rose-50',
};

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5];

function ModalSkillRingCard({ skillKey, score, max }) {
  const meta = SKILL_RING_META[skillKey] || SKILL_RING_META.S;
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((score / max) * 100))) : 0;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div
      className={`w-[120px] rounded-lg border ${meta.border} bg-white overflow-hidden flex flex-col items-center shrink-0`}
    >
      <div className={`w-full ${meta.headerBg} text-white text-xs font-bold py-1.5 text-center`}>
        {meta.label}
      </div>
      <div className="py-3 px-2 flex flex-col items-center gap-1.5">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60" aria-hidden="true">
            <circle cx="30" cy="30" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="5" />
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke={meta.stroke}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-sm font-extrabold" style={{ color: meta.stroke }}>
            {score}
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-500">Out of {max}</span>
      </div>
    </div>
  );
}

/**
 * Per-question AI Score diagnostic modal matching Speaking (RA/RS/DI/RL/ASQ/SGD/RTS),
 * Writing, Reading, and Listening views with collapsible prompt/audio, waveform playback,
 * AI Speech-to-Text word accuracy breakdown, Re-do navigation, and Annotation/AI Feedback.
 */
export default function MockQuestionAiScoreModal({ questionResult, isCore, onClose }) {
  const navigate = useNavigate();
  const [questionOpen, setQuestionOpen] = useState(
    questionResult.code === 'DI' ||
      questionResult.code === 'RL' ||
      questionResult.code === 'ASQ' ||
      questionResult.code === 'SGD' ||
      questionResult.code === 'RTS' ||
      questionResult.skillGroup !== 'Speaking'
  );
  const [annotationOpen, setAnnotationOpen] = useState(true);
  const [promptPlaying, setPromptPlaying] = useState(false);
  const [respPlaying, setRespPlaying] = useState(false);
  const [respSec, setRespSec] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(85);
  const [selectedWordInfo, setSelectedWordInfo] = useState(null);

  const isSpeaking = questionResult.skillGroup === 'Speaking';
  const hasWordAccuracy = questionResult.code === 'RA' || questionResult.code === 'RS';
  const showAnnotationCard =
    questionResult.code === 'RA' || questionResult.code === 'ASQ';
  const showQuestionAccordion = questionResult.code !== 'RA';
  const respDuration = questionResult.code === 'RS' ? 16 : questionResult.code === 'ASQ' ? 10 : 36;
  const promptAudioDuration =
    questionResult.code === 'SGD'
      ? 125
      : questionResult.code === 'RL'
        ? 100
        : questionResult.code === 'ASQ'
          ? 6
          : 7;

  useEffect(() => {
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        // Ignore cleanup errors
      }
    };
  }, []);

  useEffect(() => {
    if (!respPlaying) return undefined;
    const timer = setInterval(() => {
      setRespSec((prev) => {
        if (prev + 1 >= respDuration) {
          setRespPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, Math.round(1000 / playbackRate));
    return () => clearInterval(timer);
  }, [respPlaying, respDuration, playbackRate]);

  const togglePromptAudio = () => {
    if (promptPlaying) {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        // Ignore speech cleanup
      }
      setPromptPlaying(false);
      return;
    }
    setPromptPlaying(true);
    try {
      if ('speechSynthesis' in window && questionResult.promptText) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(questionResult.promptText);
        utter.volume = Math.max(0.1, volume / 100);
        utter.onend = () => setPromptPlaying(false);
        window.speechSynthesis.speak(utter);
      } else {
        setTimeout(() => setPromptPlaying(false), 3000);
      }
    } catch {
      setTimeout(() => setPromptPlaying(false), 2000);
    }
  };

  const handleCycleSpeed = () => {
    const idx = SPEED_OPTIONS.indexOf(playbackRate);
    setPlaybackRate(SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length]);
  };

  const handleRedo = () => {
    onClose();
    const skillLower = (questionResult.skillGroup || 'speaking').toLowerCase();
    const base = isCore ? '/v1/core/practice' : '/v1/practice';
    navigate(`${base}/${skillLower}/${questionResult.slug}`, {
      state: { questionId: questionResult.id },
    });
  };

  const primarySkillScore = questionResult.skillPills?.[0]?.score || 0;
  const wordTokens = questionResult.speechTokens || [];
  const goodCount = wordTokens.filter((w) => w.status === 'good').length;
  const avgCount = wordTokens.filter((w) => w.status === 'average').length;
  const missedCount = wordTokens.filter((w) => w.status === 'missed').length;

  const waveHeights = isSpeaking
    ? primarySkillScore > 0
      ? [10, 26, 18, 34, 42, 24, 30, 14, 38, 22, 40, 18, 28, 12, 34, 24, 16, 28, 20, 10]
      : [4, 4, 5, 4, 8, 18, 28, 14, 6, 4, 4, 4, 5, 4, 12, 22, 8, 4, 4, 4]
    : [];

  return (
    <div
      className="fixed inset-0 z-[85] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-score-modal-title"
    >
      <div
        className="w-full max-w-[820px] max-h-[92vh] rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#2ac0cb] text-white px-5 py-3 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Monitor className="w-4 h-4 shrink-0" />
            <span>#{questionResult.id}</span>
          </div>

          <div className="text-center leading-tight">
            <p id="ai-score-modal-title" className="text-sm sm:text-base font-extrabold">
              AI Score
            </p>
            <p className="text-[10px] opacity-90">ninetypte.com</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI Score modal"
            className="w-6 h-6 rounded-full bg-white text-[#2ac0cb] hover:bg-slate-100 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-700">
          {/* Top Score Box(es) & Enabling Skills */}
          {questionResult.code === 'ASQ' ? (
            <div className="flex justify-center">
              <ModalSkillRingCard
                skillKey="L"
                score={questionResult.skillPills?.[0]?.score ?? 0}
                max={1}
              />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex items-stretch justify-center gap-3 shrink-0">
                {(questionResult.skillPills || []).map((pill) => (
                  <ModalSkillRingCard
                    key={pill.key}
                    skillKey={pill.key}
                    score={pill.score}
                    max={pill.max}
                  />
                ))}
              </div>

              <div className="flex-1 rounded-lg border border-slate-200 overflow-hidden bg-white">
                <div className="bg-[#2ac0cb] text-white text-xs font-bold py-1.5 px-4 text-center">
                  Enabling Skills
                </div>
                <div className="p-4 space-y-3 text-xs">
                  {(questionResult.enablingRows || []).map((row) => {
                    const pct =
                      row.max > 0 ? Math.max(0, Math.min(100, (row.score / row.max) * 100)) : 0;
                    return (
                      <div key={row.label} className="flex items-center gap-3">
                        <span className="w-28 text-slate-600 font-medium shrink-0">{row.label}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-[#e2f5f7] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#2ac0cb]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-12 text-right font-semibold text-slate-600 shrink-0">
                          {row.score}/{row.max}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Collapsible Question Strip */}
          {showQuestionAccordion && (
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setQuestionOpen((prev) => !prev)}
                className="w-full bg-[#2ac0cb] text-white px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-between cursor-pointer"
              >
                <span className="flex-1 text-center">Question</span>
                {questionOpen ? (
                  <ChevronUp className="w-4 h-4 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0" />
                )}
              </button>

              {questionOpen && (
                <div className="p-4 bg-white space-y-3">
                  {questionResult.imageUrl && (
                    <div className="flex justify-center">
                      <img
                        src={questionResult.imageUrl}
                        alt={questionResult.title}
                        className="max-h-48 rounded-md object-contain border border-slate-100"
                      />
                    </div>
                  )}

                  {questionResult.showPromptTextInModal && questionResult.promptText && (
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {questionResult.promptText}
                    </p>
                  )}

                  {questionResult.hasPromptAudio && (
                    <div className="flex items-center gap-3 px-2">
                      <button
                        type="button"
                        onClick={togglePromptAudio}
                        aria-label="Play question prompt audio"
                        className="w-8 h-8 rounded-full bg-[#eb8c44] hover:bg-[#d97b34] text-white flex items-center justify-center shrink-0 cursor-pointer transition"
                      >
                        {promptPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-white" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        )}
                      </button>
                      <span className="text-[11px] font-mono text-slate-500">00:00</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full bg-[#eb8c44] transition-all ${
                            promptPlaying ? 'w-1/2' : 'w-0'
                          }`}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        {formatMMSS(promptAudioDuration)}
                      </span>
                    </div>
                  )}

                  {!isSpeaking && (
                    <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs space-y-1.5">
                      <p className="font-bold text-[#0b4a7b]">Your Recorded Response:</p>
                      <p className="text-slate-600">
                        {questionResult.responseSummary || 'No response submitted for this question.'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Recorded Waveform & Playback Controls (Speaking items) */}
          {isSpeaking && (
            <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              <div className="h-16 px-4 flex items-center justify-around gap-1.5 border-b border-slate-100 bg-slate-50/40">
                {waveHeights.map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      respPlaying ? 'bg-[#2ac0cb]' : 'bg-slate-400/70'
                    }`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <div className="px-4 py-2.5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRespPlaying((prev) => !prev)}
                  aria-label="Play recorded response"
                  className="w-7 h-7 rounded-full bg-[#2ac0cb] hover:bg-[#1fa8b3] text-white flex items-center justify-center shrink-0 cursor-pointer transition"
                >
                  {respPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  )}
                </button>
                <span className="text-[11px] font-mono text-slate-500">
                  {formatMMSS(respSec)} / {formatMMSS(respDuration)}
                </span>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCycleSpeed}
                  className="rounded-full bg-[#2ac0cb] text-white px-2.5 py-0.5 text-[11px] font-bold cursor-pointer"
                >
                  {playbackRate.toFixed(1)} &#9662;
                </button>
                <Volume2 className="w-4 h-4 text-[#2ac0cb] shrink-0" />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Response volume"
                  className="w-20 h-1 accent-[#2ac0cb] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* AI Speech to Text Card (Speaking items) */}
          {isSpeaking && (
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
              <div className="bg-[#2ac0cb] text-white px-4 py-2 flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="flex-1 text-center">AI Speech to Text</span>
                <Info className="w-4 h-4 shrink-0" />
              </div>

              <div className="p-4 space-y-3 text-xs sm:text-[13px] leading-relaxed">
                {wordTokens.length > 0 ? (
                  <p className="flex flex-wrap items-center gap-x-1 gap-y-1">
                    {wordTokens.map((tok, idx) =>
                      tok.isPause ? (
                        <span key={idx} className="text-slate-400 font-bold">
                          /
                        </span>
                      ) : (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            hasWordAccuracy
                              ? setSelectedWordInfo({
                                  word: tok.word,
                                  status: tok.status,
                                  score:
                                    tok.status === 'good'
                                      ? 92
                                      : tok.status === 'average'
                                        ? 64
                                        : 0,
                                })
                              : undefined
                          }
                          className={`rounded px-0.5 ${
                            hasWordAccuracy ? 'cursor-pointer' : 'cursor-default'
                          } ${WORD_STATUS_STYLE[tok.status] || 'text-slate-700'}`}
                        >
                          {tok.word}
                        </button>
                      )
                    )}
                  </p>
                ) : (
                  <p className="text-slate-400 italic">No speech detected.</p>
                )}

                {selectedWordInfo && (
                  <div className="rounded-md bg-[#eefaf9] border border-[#b8ece9] px-3 py-1.5 text-[11px] text-[#0b4a7b] flex items-center justify-between">
                    <span>
                      Word <strong>“{selectedWordInfo.word}”</strong> accuracy:{' '}
                      <strong>{selectedWordInfo.score}%</strong> ({selectedWordInfo.status})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedWordInfo(null)}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}

                {hasWordAccuracy && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[11px] text-center font-semibold text-[#1ea7a1]">
                      Click any word to explore your pronunciation accuracy in detail.
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold">
                      <span className="text-emerald-600">Good: {goodCount} word</span>
                      <span className="text-amber-500">Average: {avgCount} word</span>
                      <span className="text-rose-500">Bad/Missed: {missedCount} words</span>
                      <span className="text-slate-500">Pauses: /</span>
                    </div>
                  </div>
                )}

                {!hasWordAccuracy && questionResult.code !== 'ASQ' && (
                  <div className="flex justify-end text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>Pauses: /</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Re-do Prompt */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 pt-1">
            <span>Do you want to re-do this question?</span>
            <button
              type="button"
              onClick={handleRedo}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#0275b8] hover:bg-[#015f97] px-3.5 py-1.5 text-xs font-bold text-white cursor-pointer transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-do</span>
            </button>
          </div>

          {/* Bottom Annotation OR AI Feedback */}
          {showAnnotationCard ? (
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setAnnotationOpen((prev) => !prev)}
                className="w-full bg-[#2ac0cb] text-white px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-between cursor-pointer"
              >
                <span className="flex-1 text-center">Annotation</span>
                {annotationOpen ? (
                  <ChevronUp className="w-4 h-4 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0" />
                )}
              </button>
              {annotationOpen && (
                <div className="p-4 text-[11px] sm:text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <p>The Overall Score Prediction is based only on your current response.</p>
                  <p className="font-bold text-slate-700">A low score could be due to below reasons:</p>
                  <p>
                    <strong>Microphone:</strong> A good microphone &amp; how it is positioned plays
                    an important role.
                  </p>
                  <p>
                    <strong>Browser:</strong> Any browser other than Google Chrome may affect your
                    score.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
              <div className="bg-[#2ac0cb] text-white px-4 py-2 text-xs sm:text-sm font-bold text-center">
                AI Feedback
              </div>
              <div className="p-4 space-y-1.5 text-xs">
                <p className="font-bold text-slate-800">Comment</p>
                <p className="text-slate-500">
                  {questionResult.feedbackComment ||
                    'Irrelevant or insufficient content provided. Please try again.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
