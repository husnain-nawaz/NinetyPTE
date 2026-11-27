import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Headphones,
  Info,
  Mic,
  Pencil,
  Sparkles,
  Target,
} from 'lucide-react';
import PTEDashboardHeader from '../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../shared/PTEDashboardTealFooter';
import { usePortal } from '../shared/portalContext';
import { getMockTestsDataset, readMockAttemptById } from './mockTestsData';

const FEEDBACK_SECTIONS = [
  {
    key: 'Speaking',
    field: 'speaking',
    activeBg: 'bg-[#c96b27] text-white',
    bannerBg: 'bg-[#fff7f0] border-[#f9dcc4]',
    accentColor: '#eb8c44',
    Icon: Mic,
    headline:
      'Focus on clear pronunciation, steady oral fluency, and full content capture without hesitation.',
    detail:
      'Focus on high-scoring tasks in your daily routine like Repeat Sentence (speak cleanly while tracking phrase grouping and fluency), Describe Image (cover main trend, peak values, and conclusion within 25-32 seconds), Summarize Group Discussion / Re-Tell Lecture (capture key speaker arguments), and Read Aloud (read the complete passage with natural intonation).',
    closing:
      'Maintain microphone proximity consistently and avoid repeating fillers or abrupt pauses so automated speech scoring registers every word cleanly.',
  },
  {
    key: 'Writing',
    field: 'writing',
    activeBg: 'bg-[#2563eb] text-white',
    bannerBg: 'bg-[#f0f7ff] border-[#cce0ff]',
    accentColor: '#4ea5f5',
    Icon: Pencil,
    headline:
      'Ensure every Summarize Written Text and Essay/Email response meets strict PTE word limits and sentence structure.',
    detail:
      'Practice crafting a single grammatically complete sentence between 5 and 75 words for Summarize Written Text covering main claims and supporting ideas. For Write Essay (200-300 words) or Write Email (50-120 words), plan an introduction, two concise supporting paragraphs, and a clear conclusion while minimizing typing errors.',
    closing:
      'Reserve 60 seconds at the end of each prompt to audit spelling, punctuation, and subject-verb agreement.',
  },
  {
    key: 'Reading',
    field: 'reading',
    activeBg: 'bg-[#16a34a] text-white',
    bannerBg: 'bg-[#f0fdf4] border-[#bbf7d0]',
    accentColor: '#22c55e',
    Icon: BookOpen,
    headline: 'You need to strengthen collocation accuracy and contextual skimming speed.',
    detail:
      'Focus on high-scoring Reading and cross-module tasks: practice Reading & Writing Fill in the Blanks (check surrounding grammar and contextual clues before choosing options), Drag & Drop Fill in the Blanks (match parts of speech rapidly), Re-order Paragraphs (identify standalone topic sentences and pronoun links), and Highlight Incorrect Words (track audio closely).',
    closing:
      'Consistent collocation and grammar review accelerates both Reading accuracy and Writing vocabulary scores.',
  },
  {
    key: 'Listening',
    field: 'listening',
    activeBg: 'bg-[#0b4a7b] text-white',
    bannerBg: 'bg-[#f0f6fc] border-[#c7ddf2]',
    accentColor: '#0b4a7b',
    Icon: Headphones,
    headline:
      'Prioritize exact word capture on Write from Dictation and accurate summarization on Summarize Spoken Text.',
    detail:
      'Allocate steady pacing across Part 3: practice 25-40 daily Write from Dictation sentences (double-check plural endings, prepositions, capitalization, and full stops), summarize spoken lectures inside 50-70 words (20-30 words in PTE Core), and keep eyes one word ahead of the speaker in Highlight Incorrect Words.',
    closing:
      'Strong dictation accuracy and typed Fill in the Blanks precision unlock top Listening scores on exam day.',
  },
];

function SkillMiniRing({ value, color }) {
  const pct = Math.max(0, Math.min(100, Math.round(((value || 0) / 90) * 100)));
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-[11px] font-extrabold text-[#0b4a7b]">{value}</span>
    </div>
  );
}

/**
 * Guided 4-skill AI Feedback recommendation wizard
 * (/v1/mock-test/mock-test-result-list/ai-feedback).
 */
export default function PortalMockAiFeedbackPage({ syncCoreMode = false }) {
  const { attemptId } = useParams();
  const { portalMode, setPortalMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) setPortalMode('core');
  }, [syncCoreMode, setPortalMode]);

  const dataset = useMemo(() => getMockTestsDataset(activeTrack), [activeTrack]);
  const attempt = useMemo(
    () => readMockAttemptById(activeTrack, attemptId),
    [activeTrack, attemptId]
  );

  const [stepIdx, setStepIdx] = useState(0);
  const current = FEEDBACK_SECTIONS[stepIdx] || FEEDBACK_SECTIONS[0];
  const scoreVal = typeof attempt?.[current.field] === 'number' ? attempt[current.field] : 10;

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[#e6eef6] text-[#0b4a7b] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0b4a7b] inline-flex items-center gap-1.5">
              <span>AI Feedback</span>
              <Info className="w-4 h-4 text-slate-400" />
            </h1>
          </div>

          <Link
            to={dataset.routes.scores}
            className="text-xs font-semibold text-[#0b4a7b] hover:text-[#1ea7a1]"
          >
            &larr; Back to Scores
          </Link>
        </div>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
          <h2 className="text-sm sm:text-base font-extrabold text-[#0b4a7b] border-b border-slate-100 pb-3">
            AI Score Report Analysis
          </h2>

          {/* Skill Switch Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {FEEDBACK_SECTIONS.map((sec, idx) => {
              const Icon = sec.Icon;
              const active = idx === stepIdx;
              return (
                <button
                  key={sec.key}
                  type="button"
                  onClick={() => setStepIdx(idx)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                    active
                      ? sec.activeBg
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.key}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-100 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#0b4a7b]">Feedback</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b4a7b]">
                <Target className="w-3.5 h-3.5 text-[#1ea7a1]" />
                Target Score: <strong className="text-[#1ea7a1]">Superior</strong>
              </span>
            </div>

            <div
              className={`rounded-xl border px-4 py-3 flex items-center justify-between gap-4 ${current.bannerBg}`}
            >
              <span className="text-sm font-extrabold" style={{ color: current.accentColor }}>
                {current.key}
              </span>
              <SkillMiniRing value={scoreVal} color={current.accentColor} />
            </div>

            <div className="space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed pt-1">
              <p>{current.headline}</p>
              <p>{current.detail}</p>
              <p>{current.closing}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-45 px-5 py-2 text-xs font-bold text-slate-600 cursor-pointer transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-bold text-[#0b4a7b]">
              {stepIdx + 1} of {FEEDBACK_SECTIONS.length}
            </span>

            <button
              type="button"
              onClick={() => setStepIdx((i) => Math.min(FEEDBACK_SECTIONS.length - 1, i + 1))}
              disabled={stepIdx === FEEDBACK_SECTIONS.length - 1}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0b4a7b] hover:bg-[#08385f] disabled:opacity-45 px-5 py-2 text-xs font-bold text-white cursor-pointer transition"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />
    </div>
  );
}
