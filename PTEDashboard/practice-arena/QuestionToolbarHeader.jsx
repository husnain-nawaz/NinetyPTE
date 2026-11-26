import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Bookmark,
  BookOpen,
  Info,
  Mic,
  PlaySquare,
  Type,
  Users,
} from 'lucide-react';

/**
 * Shared top task header, action toolbar, instruction banner, and teal active question bar
 * reused across every question workspace from Read Aloud through Write from Dictation.
 */
export default function QuestionToolbarHeader({
  taskMeta,
  activeQuestion,
  isCoreMode,
  micAutoStart,
  onToggleMicMode,
  onToggleBookmark,
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [dictOpen, setDictOpen] = useState(false);

  const strategyPath = isCoreMode ? '/v1/core/templates' : '/v1/templates';
  const weightagePath = isCoreMode ? '/v1/core/exam-pattern' : '/v1/question-weightage';
  const videosPath = isCoreMode ? '/v1/core/youtube-videos' : '/v1/youtube-videos/1';

  return (
    <div className="space-y-3.5 relative">
      {/* Row 1: Task Title + 4 Utility Icon Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-full text-white text-xs font-extrabold flex items-center justify-center shadow-2xs shrink-0"
            style={{ backgroundColor: taskMeta.badgeColor }}
          >
            {taskMeta.code}
          </span>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
            {taskMeta.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 relative">
          <Link
            to={strategyPath}
            title="Templates & Strategy"
            aria-label="Open templates and strategy guide"
            className="w-8 h-8 rounded-full bg-[#e8913a] hover:bg-[#d87c24] text-white flex items-center justify-center transition shadow-2xs"
          >
            <BookOpen className="w-4 h-4" />
          </Link>
          <Link
            to={weightagePath}
            title="Score Weightage"
            aria-label="Open question score weightage"
            className="w-8 h-8 rounded-full bg-[#e8913a] hover:bg-[#d87c24] text-white flex items-center justify-center transition shadow-2xs"
          >
            <BarChart2 className="w-4 h-4" />
          </Link>
          <Link
            to={videosPath}
            title="Strategy Videos"
            aria-label="Watch task strategy video"
            className="w-8 h-8 rounded-full bg-[#e8913a] hover:bg-[#d87c24] text-white flex items-center justify-center transition shadow-2xs"
          >
            <PlaySquare className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => setInfoOpen((prev) => !prev)}
            title="Task Scoring & Timing Tips"
            aria-label="Toggle task tips"
            className="w-8 h-8 rounded-full bg-[#e8913a] hover:bg-[#d87c24] text-white flex items-center justify-center transition shadow-2xs cursor-pointer"
          >
            <Info className="w-4 h-4" />
          </button>

          {infoOpen && (
            <div className="absolute right-0 top-10 z-30 w-72 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 shadow-xl space-y-1.5">
              <p className="font-bold text-[#0b4a7b]">{taskMeta.title} Guidelines</p>
              <p className="leading-relaxed">{taskMeta.instruction}</p>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Task Instruction Text */}
      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{taskMeta.instruction}</p>

      {/* Row 3: Teal Question Title Bar */}
      <div className="rounded-xl bg-[#1db3a8] text-white px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 relative shadow-2xs">
        <span className="text-xs sm:text-sm font-bold tracking-tight">
          #{activeQuestion.id} | {activeQuestion.title}
        </span>

        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
          <button
            type="button"
            onClick={onToggleMicMode}
            title="Toggle auto-recording prep mode"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-2.5 py-1 text-white transition cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="text-[10px] font-extrabold">{micAutoStart ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            onClick={() => setDictOpen((prev) => !prev)}
            title="Quick vocabulary & pronunciation hint"
            aria-label="Toggle quick dictionary hint"
            className="w-7 h-7 rounded-full border border-white/50 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <Type className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onToggleBookmark(activeQuestion.id)}
            aria-label={activeQuestion.bookmarked ? 'Remove bookmark' : 'Bookmark question'}
            className="w-7 h-7 rounded-full border border-white/50 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <Bookmark
              className="w-3.5 h-3.5"
              fill={activeQuestion.bookmarked ? 'currentColor' : 'none'}
            />
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/10 px-3 py-1">
            <Users className="w-3 h-3" />
            <span>Appeared ({activeQuestion.appearedCount || 0})</span>
          </span>
        </div>

        {dictOpen && (
          <div className="absolute right-4 top-12 z-30 w-72 rounded-xl border border-slate-200 bg-white p-3.5 text-slate-700 shadow-xl space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0b4a7b]">Vocab &amp; Keyword Note</span>
              <button
                type="button"
                onClick={() => setDictOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
            <p className="leading-relaxed text-slate-500">
              Pause briefly at commas and stress multi-syllable keywords clearly on first reading.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
