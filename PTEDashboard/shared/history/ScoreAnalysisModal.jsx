import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Info,
  Monitor,
  Pause,
  Play,
  Volume2,
  X,
} from 'lucide-react';

const WAVEFORM_BARS = [
  14, 24, 18, 32, 46, 28, 38, 52, 22, 44, 58, 30, 48, 26, 54, 42, 34, 56, 40, 28,
  50, 36, 44, 22, 48, 54, 30, 40, 26, 36, 52, 28, 42, 18, 30, 46, 24, 34, 20, 16,
];

function ScoreRingCard({ label, score, max = 90, accentClass, ringColor, wideLabel }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((score / max) * 100))) : 0;
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs flex flex-col">
      <div className={`${accentClass} py-1.5 text-center text-xs font-bold text-white`}>
        {label}
      </div>
      <div className="flex-1 py-4 px-3 flex flex-col items-center justify-center gap-1.5">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r={radius} fill="none" stroke="#e9eef4" strokeWidth="5" />
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke={score > 0 ? ringColor : '#e9eef4'}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-base font-extrabold text-slate-800">{score}</span>
        </div>
        <span className="text-[11px] font-medium text-slate-500">
          {wideLabel || `Out of ${max}`}
        </span>
      </div>
    </div>
  );
}

function TimeTakenCard({ timeTaken }) {
  const mins = (timeTaken?.min || '00').split('');
  const secs = (timeTaken?.sec || '00').split('');
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs flex flex-col">
      <div className="bg-[#45d0c7] py-1.5 text-center text-xs font-bold text-white">
        Time Taken
      </div>
      <div className="flex-1 py-5 px-4 flex items-center justify-center gap-6">
        <div className="text-center space-y-1.5">
          <p className="text-xs font-medium text-[#15a39b]">Minute</p>
          <div className="flex items-center gap-1.5">
            {mins.map((d, i) => (
              <span
                key={`m-${i}`}
                className="w-7 h-7 rounded-md bg-[#45d0c7] text-white font-bold text-xs flex items-center justify-center"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center space-y-1.5">
          <p className="text-xs font-medium text-[#15a39b]">Second</p>
          <div className="flex items-center gap-1.5">
            {secs.map((d, i) => (
              <span
                key={`s-${i}`}
                className="w-7 h-7 rounded-md bg-[#45d0c7] text-white font-bold text-xs flex items-center justify-center"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleTealSection({ title, defaultOpen = false, rightIcon = null, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-[#45d0c7] px-4 py-2 text-xs sm:text-[13px] font-bold text-white flex items-center justify-between cursor-pointer"
      >
        <span className="w-4" />
        <span>{title}</span>
        <span className="inline-flex items-center gap-1.5">
          {rightIcon}
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      {open && <div className="p-4 text-xs text-slate-600 leading-relaxed">{children}</div>}
    </div>
  );
}

function AudioWaveformBar({ durationLabel = '00:04', compact = false }) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState('1.0');

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setTimeout(() => setPlaying(false), 3000);
    return () => clearTimeout(timer);
  }, [playing]);

  return (
    <div className="space-y-2.5">
      {!compact && (
        <div className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 flex items-center justify-center gap-1.5 h-20 overflow-hidden">
          {WAVEFORM_BARS.map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-colors ${
                playing && i < 18 ? 'bg-[#eb8c44]' : 'bg-slate-300'
              }`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause recording' : 'Play recording'}
            className="w-7 h-7 rounded-full bg-[#45d0c7] hover:bg-[#32b9b0] text-white flex items-center justify-center transition cursor-pointer"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <span className="text-[11px] font-medium text-slate-500 tabular-nums">
            {playing ? '00:02' : '00:00'} / {durationLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setSpeed((s) => (s === '1.0' ? '1.2' : s === '1.2' ? '1.5' : s === '1.5' ? '0.8' : '1.0'))
            }
            className="rounded-full bg-[#45d0c7] px-2.5 py-0.5 text-[11px] font-bold text-white cursor-pointer"
          >
            {speed}x
          </button>
          <div className="inline-flex items-center gap-1.5 text-[#45d0c7]">
            <Volume2 className="w-4 h-4" />
            <div className="w-16 h-1.5 rounded-full bg-[#c9f1ee] relative">
              <div className="w-14 h-full rounded-full bg-[#45d0c7]" />
              <span className="w-3 h-3 rounded-full bg-white border-2 border-[#45d0c7] absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderHighlightedKeywords(text, keywords = []) {
  if (!keywords.length) return text;
  const escaped = keywords.map((kw) => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const parts = text.split(new RegExp(`(\\b(?:${escaped})\\b)`, 'gi'));
  return parts.map((part, idx) => {
    const matched = keywords.some((kw) => kw.toLowerCase() === part.toLowerCase());
    return matched ? (
      <span key={idx} className="underline decoration-slate-600 font-semibold text-slate-700">
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    );
  });
}

function getHeaderSkillStyle(skillLabel) {
  if (skillLabel === 'Speaking') return { bg: 'bg-[#ef944a]', ring: '#ef944a' };
  if (skillLabel === 'Reading') return { bg: 'bg-[#40d957]', ring: '#40d957' };
  if (skillLabel === 'Writing') return { bg: 'bg-[#3b82f6]', ring: '#3b82f6' };
  return { bg: 'bg-[#1c4b82]', ring: '#1c4b82' };
}

/**
 * Unified AI Score & Score Analysis modal matching every task type across Speaking,
 * Reading, and Listening Section Practice History rows.
 */
export default function ScoreAnalysisModal({ taskMeta, row, onClose }) {
  const [dictationTab, setDictationTab] = useState('your');
  const modalTitle = taskMeta.buttonLabel === 'Score' ? 'Score Analysis' : 'AI Score';

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#38c6bd] px-5 py-3 text-white flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Monitor className="w-4 h-4" />
            <span>{row.qid}</span>
          </div>

          <div className="text-center leading-tight">
            <p className="text-sm sm:text-base font-extrabold">{modalTitle}</p>
            <p className="text-[11px] text-white/85">ninetypte.com</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-6 h-6 rounded-full bg-white text-[#38c6bd] hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Body by Task Variant */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          {taskMeta.modalType === 'speaking' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div
                  className={`${
                    taskMeta.scoreLabels.length > 1 ? 'md:col-span-5 grid-cols-2' : 'md:col-span-3 grid-cols-1'
                  } grid gap-3`}
                >
                  {taskMeta.scoreLabels.map((lbl) => {
                    const st = getHeaderSkillStyle(lbl);
                    return (
                      <ScoreRingCard
                        key={lbl}
                        label={lbl}
                        score={row.scores?.[lbl] ?? 0}
                        max={90}
                        accentClass={st.bg}
                        ringColor={st.ring}
                      />
                    );
                  })}
                </div>

                <div
                  className={`${
                    taskMeta.scoreLabels.length > 1 ? 'md:col-span-7' : 'md:col-span-9'
                  } rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs`}
                >
                  <div className="bg-[#45d0c7] py-1.5 text-center text-xs font-bold text-white">
                    Enabling Skills
                  </div>
                  <div className="p-4 space-y-3">
                    {(row.enablingSkills || []).map((item) => (
                      <div key={item.label} className="grid grid-cols-12 items-center gap-3 text-xs">
                        <span className="col-span-4 sm:col-span-3 font-medium text-slate-600">
                          {item.label}
                        </span>
                        <div className="col-span-6 sm:col-span-7 h-2 rounded-full bg-[#e6f0f8] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#7dbff7]"
                            style={{ width: `${Math.round((item.score / 90) * 100)}%` }}
                          />
                        </div>
                        <span className="col-span-2 text-right font-semibold text-slate-700">
                          {item.score}/90
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <CollapsibleTealSection title="Question">
                <p>{row.questionText}</p>
              </CollapsibleTealSection>

              <AudioWaveformBar durationLabel={row.duration} />

              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="bg-[#45d0c7] px-4 py-2 text-xs font-bold text-white flex items-center justify-between">
                  <span className="w-4" />
                  <span>AI Speech to Text</span>
                  <Info className="w-4 h-4" />
                </div>

                <div className="p-4 text-xs sm:text-[13px] leading-relaxed text-slate-600 space-y-3">
                  {row.speechTokens && (
                    <>
                      <p className="space-x-1">
                        {row.speechTokens.map((tok, i) => (
                          <span
                            key={i}
                            className={
                              tok.status === 'good'
                                ? 'text-emerald-600'
                                : tok.status === 'avg'
                                ? 'text-amber-500'
                                : 'text-rose-500'
                            }
                          >
                            {tok.text}
                          </span>
                        ))}
                      </p>
                      <div className="border-t border-slate-100 pt-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold">
                        <span className="text-emerald-600">Good: {row.wordStats?.good ?? 0} words</span>
                        <span className="text-amber-500">Average: {row.wordStats?.avg ?? 0} word</span>
                        <span className="text-rose-500">Bad/Missed: {row.wordStats?.bad ?? 0} word</span>
                        {row.wordStats?.pauses && (
                          <span className="text-slate-700">Pauses: {row.wordStats.pauses}</span>
                        )}
                      </div>
                    </>
                  )}

                  {row.keywordTranscript && (
                    <div className="space-y-2">
                      <p>{renderHighlightedKeywords(row.keywordTranscript, row.keywords)}</p>
                      <div className="text-right">
                        <span className="text-[11px] font-medium underline text-slate-600">
                          Keywords
                        </span>
                      </div>
                    </div>
                  )}

                  {row.plainTranscript && <p>{row.plainTranscript}</p>}
                </div>
              </div>

              {row.aiFeedbackComment && (
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="bg-[#45d0c7] py-2 text-center text-xs font-bold text-white">
                    AI Feedback
                  </div>
                  <div className="p-4 space-y-1 text-xs">
                    <p className="font-bold text-slate-800">Comment</p>
                    <p className="text-slate-500">{row.aiFeedbackComment}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {taskMeta.modalType === 'objective' && (
            <>
              <CollapsibleTealSection title="Question" defaultOpen>
                {row.audioDuration && (
                  <div className="mb-3 rounded-lg bg-[#f3fbfb] px-3 py-2">
                    <AudioWaveformBar durationLabel={row.audioDuration} compact />
                  </div>
                )}

                {row.promptItems && (
                  <div className="space-y-1">
                    {row.promptItems.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}

                {row.questionPassage && <p>{row.questionPassage}</p>}

                {row.questionSegments && (
                  <p>
                    {row.questionSegments.map((seg, i) =>
                      seg.wrong ? (
                        <span key={i}>
                          {seg.wrong} <strong className="text-slate-800">({seg.right})</strong>
                        </span>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )}
                  </p>
                )}
              </CollapsibleTealSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`grid gap-3 ${
                    (row.scoreCards?.length || 1) > 1 ? 'grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {(row.scoreCards || []).map((sc) => {
                    const st = getHeaderSkillStyle(sc.label);
                    return (
                      <ScoreRingCard
                        key={sc.label}
                        label={sc.label}
                        score={sc.score}
                        max={sc.max}
                        accentClass={st.bg}
                        ringColor={st.ring}
                      />
                    );
                  })}
                </div>
                <TimeTakenCard timeTaken={row.timeTaken} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="bg-[#45d0c7] py-1.5 text-center text-xs font-bold text-white">
                    Correct Answer
                  </div>
                  <div className="p-5 flex items-center justify-center min-h-[110px]">
                    {row.correctOrder ? (
                      <div className="flex flex-wrap items-center gap-2.5">
                        {row.correctOrder.map((letter) => (
                          <span
                            key={letter}
                            className="w-10 h-10 rounded-lg bg-[#047806] text-white font-bold text-sm flex items-center justify-center"
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-1 text-xs font-semibold text-emerald-700 list-disc">
                        {(row.correctList || []).map((word, idx) => (
                          <li key={idx}>{word}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="bg-[#45d0c7] py-1.5 text-center text-xs font-bold text-white">
                    User&apos;s Response
                  </div>
                  <div className="p-5 flex items-center justify-center min-h-[110px]">
                    {row.userOrder ? (
                      <div className="flex flex-wrap items-center gap-2.5">
                        {row.userOrder.map((letter, idx) => {
                          const prevBad = idx > 0 && row.pairStatuses?.[idx - 1] === 'bad';
                          const nextGood = row.pairStatuses?.[idx] === 'good';
                          const borderAccent = prevBad
                            ? 'border-t-2 border-t-rose-500'
                            : nextGood
                            ? 'border-b-2 border-b-emerald-500'
                            : '';
                          return (
                            <span
                              key={`${letter}-${idx}`}
                              className={`w-10 h-10 rounded-lg border border-[#7ce0d9] text-[#1ea7a1] font-bold text-sm flex items-center justify-center ${borderAccent}`}
                            >
                              {letter}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <ul className="space-y-1 text-xs font-semibold list-disc">
                        {(row.userList || []).map((entry, idx) => (
                          <li
                            key={idx}
                            className={entry.correct ? 'text-emerald-700' : 'text-rose-500'}
                          >
                            {entry.word}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {taskMeta.modalType === 'dictation' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(row.scoreCards || []).map((sc) => {
                  const st = getHeaderSkillStyle(sc.label);
                  return (
                    <ScoreRingCard
                      key={sc.label}
                      label={sc.label}
                      score={sc.score}
                      max={sc.max}
                      accentClass={st.bg}
                      ringColor={st.ring}
                    />
                  );
                })}
                <TimeTakenCard timeTaken={row.timeTaken} />
              </div>

              <CollapsibleTealSection title="Question" defaultOpen>
                <AudioWaveformBar durationLabel={row.audioDuration} compact />
              </CollapsibleTealSection>

              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="bg-[#45d0c7] py-1.5 text-center text-xs font-bold text-white">
                  Correct Answer
                </div>
                <div className="p-4 text-xs sm:text-[13px] text-slate-700 font-medium">
                  {row.correctSentence}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="grid grid-cols-2 text-xs font-bold border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setDictationTab('your')}
                    className={`py-2 transition cursor-pointer ${
                      dictationTab === 'your'
                        ? 'bg-[#45d0c7] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Your Response
                  </button>
                  <button
                    type="button"
                    onClick={() => setDictationTab('analyzed')}
                    className={`py-2 transition cursor-pointer ${
                      dictationTab === 'analyzed'
                        ? 'bg-[#45d0c7] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Analyzed Response
                  </button>
                </div>

                <div className="p-4 space-y-3 text-xs sm:text-[13px]">
                  {dictationTab === 'analyzed' ? (
                    <p className="text-slate-700">{row.userResponseText}</p>
                  ) : (
                    <>
                      <p className="space-x-1.5">
                        {(row.analyzedTokens || []).map((tok, idx) => (
                          <span
                            key={idx}
                            className={
                              tok.status === 'correct'
                                ? 'text-emerald-600 font-medium'
                                : tok.status === 'missed'
                                ? 'text-indigo-600 font-medium'
                                : 'text-amber-500 font-semibold'
                            }
                          >
                            {tok.text}
                          </span>
                        ))}
                      </p>
                      <div className="border-t border-slate-100 pt-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold">
                        <span className="text-emerald-600">Correct Words</span>
                        <span className="text-indigo-600">Missed Words</span>
                        <span className="text-amber-500">Misspelled / Extra Words</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <CollapsibleTealSection title="Suggestions" defaultOpen>
                <p className="font-semibold text-slate-700">{row.suggestions}</p>
              </CollapsibleTealSection>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
