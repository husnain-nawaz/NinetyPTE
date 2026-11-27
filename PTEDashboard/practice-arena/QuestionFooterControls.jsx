import { useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
  Shuffle,
} from 'lucide-react';

const DIFFICULTY_OPTIONS = [
  { id: 'Easy', activeClass: 'border-emerald-300 bg-emerald-50 text-emerald-700', dotClass: 'bg-emerald-500' },
  { id: 'Medium', activeClass: 'border-amber-300 bg-amber-50 text-amber-700', dotClass: 'bg-amber-500' },
  { id: 'Difficult', activeClass: 'border-rose-300 bg-rose-100 text-rose-700', dotClass: 'bg-rose-500' },
];

/**
 * Shared difficulty poll, Submit/Redo/Translate/Answer action row,
 * Shuffle + Prev + Numbered Jump Pill + Next controls, and AI Scoring tip lines.
 */
export default function QuestionFooterControls({
  difficultyVote,
  onVoteDifficulty,
  isSubmitting,
  canShowAnswer,
  showAnswer,
  onSubmit,
  onRedo,
  onOpenTranslate,
  onToggleAnswer,
  onShuffle,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
  onJumpToIndex,
}) {
  const [jumpMenuOpen, setJumpMenuOpen] = useState(false);
  const [headsetHelpOpen, setHeadsetHelpOpen] = useState(false);

  const pageChoices = Array.from({ length: Math.min(totalCount, 20) }, (_, idx) => idx);

  return (
    <div className="space-y-4 pt-1">
      {/* Row 1: Difficulty Poll */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-800 mr-1">How difficult was this question?</span>
        {DIFFICULTY_OPTIONS.map((lvl) => {
          const active = difficultyVote === lvl.id;
          return (
            <button
              key={lvl.id}
              type="button"
              onClick={() => onVoteDifficulty(lvl.id)}
              className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-0.5 text-[11px] font-medium transition cursor-pointer ${
                active
                  ? lvl.activeClass
                  : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
              }`}
            >
              {active && <span className={`w-1.5 h-1.5 rounded-full ${lvl.dotClass}`} />}
              <span>{lvl.id}</span>
            </button>
          );
        })}
      </div>

      {/* Row 2: Action Buttons (Left) + Shuffle/Prev/Jump/Next (Right) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className={`inline-flex items-center gap-1.5 rounded-full px-5 py-1.5 text-xs font-bold transition cursor-pointer ${
              isSubmitting
                ? 'bg-[#e35c4b] text-white'
                : 'border border-[#efb1aa] bg-white text-[#e0564b] hover:bg-rose-50'
            }`}
          >
            {isSubmitting ? (
              <>
                <span>Submitting</span>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>

          <button
            type="button"
            onClick={onRedo}
            className="rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-5 py-1.5 text-xs font-semibold text-slate-700 transition cursor-pointer"
          >
            Redo
          </button>

          <button
            type="button"
            onClick={onOpenTranslate}
            className="rounded-full border border-[#f2be96] bg-white hover:bg-orange-50 px-5 py-1.5 text-xs font-semibold text-[#e6843c] transition cursor-pointer"
          >
            Translate
          </button>

          {canShowAnswer && (
            <button
              type="button"
              onClick={onToggleAnswer}
              className="rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-4 py-1.5 text-xs font-semibold text-[#0b4a7b] transition cursor-pointer"
            >
              {showAnswer ? 'Hide Answer' : 'Answer'}
            </button>
          )}
        </div>

        {/* Question Jump & Step Controls */}
        <div className="flex items-center gap-2 ml-auto relative">
          <button
            type="button"
            onClick={onShuffle}
            title="Shuffle random question"
            aria-label="Jump to random question"
            className="w-8 h-8 rounded-full bg-slate-300 hover:bg-slate-400 text-white flex items-center justify-center transition cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex <= 0}
            aria-label="Previous question"
            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center rounded-full bg-[#1db3a8] p-0.5 text-xs font-bold text-white shadow-2xs relative">
            <button
              type="button"
              onClick={() => setJumpMenuOpen((prev) => !prev)}
              aria-label="Select question number"
              className="inline-flex items-center gap-1 rounded-full bg-white text-slate-700 px-2.5 py-1 text-xs font-semibold cursor-pointer"
            >
              <span>{currentIndex + 1}</span>
              <ChevronDown className="w-3 h-3 text-[#1db3a8]" />
            </button>
            <span className="px-2.5">{totalCount}</span>

            {jumpMenuOpen && (
              <div className="absolute right-0 bottom-10 z-30 w-28 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl text-slate-700">
                {pageChoices.map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onJumpToIndex(idx);
                      setJumpMenuOpen(false);
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-cyan-50 cursor-pointer ${
                      idx === currentIndex ? 'bg-[#ebfbfa] text-[#1db3a8] font-bold' : ''
                    }`}
                  >
                    # {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onNext}
            disabled={currentIndex >= totalCount - 1}
            aria-label="Next question"
            className="w-8 h-8 rounded-full bg-[#1db3a8] hover:bg-[#179b91] disabled:opacity-40 text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 3: Scoring Info & Headset Tip */}
      <div className="space-y-1.5 text-[11px] text-slate-500 pt-1 relative">
        <p className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#38c6bd] shrink-0" />
          <span>AI Scoring is available once you submit your response.</span>
        </p>
        <p className="flex flex-wrap items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#38c6bd] shrink-0" />
          <span>Are you using headsets? Always use headsets with microphone to get an accurate AI score.</span>
          <button
            type="button"
            onClick={() => setHeadsetHelpOpen((prev) => !prev)}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Learn More
          </button>
        </p>

        {headsetHelpOpen && (
          <div className="rounded-xl border border-[#bceee9] bg-[#f1fcfb] p-3 text-slate-600 text-[11px] leading-relaxed">
            Position your boom microphone about 2 cm below your lower lip at a slight side angle to
            prevent breathing plosives and ensure crisp phoneme recognition.
          </div>
        )}
      </div>
    </div>
  );
}
