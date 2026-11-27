import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Bookmark,
  BookOpen,
  Info,
  Mic,
  PlaySquare,
  StickyNote,
  Type,
  Users,
  Volume2,
} from 'lucide-react';

const BOOKMARK_COLORS = [
  { id: 'red', label: 'Red', swatch: '#ef4444' },
  { id: 'purple', label: 'Purple', swatch: '#a855f7' },
  { id: 'blue', label: 'Blue', swatch: '#2563eb' },
  { id: 'green', label: 'Green', swatch: '#65d000' },
];

/**
 * Shared top task header, action toolbar, instruction banner, and teal active question bar
 * with Mic Setup, Exam Noise, Dictionary, Note, Color Bookmark dropdown, and Appeared triggers.
 */
export default function QuestionToolbarHeader({
  taskMeta,
  activeQuestion,
  isCoreMode,
  noiseEnabled,
  onOpenMicModal,
  onOpenNoiseModal,
  onOpenDictionary,
  onOpenNoteModal,
  onSelectBookmarkColor,
  onOpenAppearedModal,
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [bookmarkMenuOpen, setBookmarkMenuOpen] = useState(false);

  const strategyPath = isCoreMode ? '/v1/core/templates' : '/v1/templates';
  const weightagePath = isCoreMode ? '/v1/core/exam-pattern' : '/v1/question-weightage';
  const videosPath = isCoreMode ? '/v1/core/youtube-videos' : '/v1/youtube-videos/1';

  const activeColorMeta = BOOKMARK_COLORS.find((c) => c.id === activeQuestion.bookmarkColor);

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
            onClick={onOpenMicModal}
            title="Choose a microphone"
            aria-label="Choose a microphone"
            className="w-7 h-7 rounded-full border border-white/50 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onOpenNoiseModal}
            title="Exam Centre Noise settings"
            aria-label="Open Exam Centre Noise settings"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-2.5 py-1 text-white transition cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-extrabold">{noiseEnabled ? 'On' : 'Off'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenDictionary}
            title="Open word dictionary"
            aria-label="Open word dictionary"
            className="w-7 h-7 rounded-lg border border-white/60 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <Type className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onOpenNoteModal}
            title="Personal study note"
            aria-label="Open personal note"
            className="w-7 h-7 rounded-lg hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <StickyNote className="w-4 h-4" />
          </button>

          {/* Bookmark Ribbon with Color Picker Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setBookmarkMenuOpen((p) => !p)}
              aria-label="Bookmark question"
              className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
              style={{ color: activeColorMeta ? activeColorMeta.swatch : '#ffffff' }}
            >
              <Bookmark
                className="w-4 h-4"
                fill={activeQuestion.bookmarked ? 'currentColor' : 'none'}
              />
            </button>

            {bookmarkMenuOpen && (
              <div className="absolute right-0 top-9 z-30 w-36 rounded-xl bg-[#dff7f6] border border-[#b4ece8] p-1.5 shadow-xl text-slate-800 space-y-0.5">
                {BOOKMARK_COLORS.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => {
                      onSelectBookmarkColor(activeQuestion.id, color.id);
                      setBookmarkMenuOpen(false);
                    }}
                    className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs font-medium flex items-center gap-2.5 transition cursor-pointer ${
                      activeQuestion.bookmarkColor === color.id
                        ? 'bg-white font-bold shadow-2xs'
                        : 'hover:bg-white/70'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 shrink-0" style={{ color: color.swatch, fill: color.swatch }} />
                    <span>{color.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenAppearedModal}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/60 bg-white/10 hover:bg-white/20 px-3 py-1 transition cursor-pointer"
          >
            <Users className="w-3 h-3" />
            <span>Appeared ({activeQuestion.appearedCount || 0})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
