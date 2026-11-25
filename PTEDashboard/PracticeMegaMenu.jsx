import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Headphones,
  Mic,
  Monitor,
  PenLine,
  Search,
  Sparkles,
} from 'lucide-react';
import { SKILL_COLORS } from './pteAnalyticsData';

const SKILL_COLOR_CLASSES = {
  Speaking: 'text-[#eb8c44]',
  Writing: 'text-[#5ba4f5]',
  Reading: 'text-[#36c959]',
  Listening: 'text-[#12487a]',
};

const STUDY_TOOL_LINKS = [
  { label: 'Templates', to: '/best-pte-practice-preparation-material' },
  { label: 'Predictions', to: '/best-pte-practice-preparation-material' },
  { label: 'Grammar', to: '/pte-writing-practice' },
  { label: 'Vocab Bank', to: '/best-pte-practice-preparation-material' },
  { label: 'Strategy Videos', to: '/pte-online-course' },
  { label: 'Practice History', to: '/v1/practice-history' },
  { label: 'Question Weightage', to: '/v1/question-weightage' },
];

function getPracticeColumns(examVariant) {
  const isCore = examVariant === 'core';
  const speakPath = isCore ? '/pte-core-speaking-practice' : '/pte-speaking-practice';
  const writePath = isCore ? '/pte-core-writing-practice' : '/pte-writing-practice';
  const readPath = isCore ? '/pte-core-reading-practice' : '/pte-reading-practice';
  const listenPath = isCore ? '/pte-core-listening-practice' : '/pte-listening-practice';

  const speakingItems = [
    { name: 'Read Aloud', to: speakPath, ai: true, weights: [{ pct: '9%', color: 'Speaking' }] },
    {
      name: 'Repeat Sentence',
      to: speakPath,
      ai: true,
      weights: [
        { pct: '16%', color: 'Speaking' },
        { pct: '17%', color: 'Listening' },
      ],
    },
    { name: 'Describe Image', to: speakPath, ai: true, weights: [{ pct: '31%', color: 'Speaking' }] },
    !isCore && {
      name: 'Re-Tell Lecture',
      to: speakPath,
      ai: true,
      weights: [
        { pct: '13%', color: 'Speaking' },
        { pct: '13%', color: 'Listening' },
      ],
    },
    { name: 'Answer Short Question', to: speakPath, ai: true, weights: [{ pct: '4%', color: 'Listening' }] },
    !isCore && {
      name: 'Summarize Group Discussion',
      to: speakPath,
      ai: true,
      weights: [
        { pct: '19%', color: 'Speaking' },
        { pct: '20%', color: 'Listening' },
      ],
    },
    {
      name: 'Respond to a Situation',
      to: speakPath,
      ai: true,
      weights: [{ pct: '13%', color: 'Speaking' }],
    },
  ].filter(Boolean);

  const writingItems = [
    {
      name: 'Summarize Written Text',
      to: writePath,
      ai: true,
      weights: [
        { pct: '23%', color: 'Reading' },
        { pct: '28%', color: 'Writing' },
      ],
    },
    {
      name: isCore ? 'Write Email' : 'Write Essay',
      to: writePath,
      ai: true,
      weights: [{ pct: '31%', color: 'Writing' }],
    },
  ];

  const readingItems = [
    { name: 'Fill in the Blanks (Dropdown)', to: readPath, ai: false, weights: [{ pct: '25%', color: 'Reading' }] },
    { name: 'Multiple Choice, Multiple Answers', to: readPath, ai: false, weights: [{ pct: '5%', color: 'Reading' }] },
    { name: 'Re-order Paragraphs', to: readPath, ai: false, weights: [{ pct: '9%', color: 'Reading' }] },
    { name: 'Fill in the Blanks (Drag & Drop)', to: readPath, ai: false, weights: [{ pct: '20%', color: 'Reading' }] },
    { name: 'Multiple Choice, Single Answer', to: readPath, ai: false, weights: [{ pct: '3%', color: 'Reading' }] },
  ];

  const listeningItems = [
    {
      name: 'Summarize Spoken Text',
      to: listenPath,
      ai: true,
      weights: [
        { pct: '10%', color: 'Listening' },
        { pct: '18%', color: 'Writing' },
      ],
    },
    { name: 'Multiple Choice, Multiple Answers', to: listenPath, ai: false, weights: [{ pct: '3%', color: 'Listening' }] },
    { name: 'Fill in the Blanks', to: listenPath, ai: false, weights: [{ pct: '8%', color: 'Listening' }] },
    !isCore && {
      name: 'Highlight Correct Summary',
      to: listenPath,
      ai: false,
      weights: [
        { pct: '2%', color: 'Reading' },
        { pct: '3%', color: 'Listening' },
      ],
    },
    { name: 'Multiple Choice, Single Answer', to: listenPath, ai: false, weights: [{ pct: '2%', color: 'Listening' }] },
    { name: 'Select Missing Word', to: listenPath, ai: false, weights: [{ pct: '1%', color: 'Listening' }] },
    {
      name: 'Highlight Incorrect Words',
      to: listenPath,
      ai: false,
      weights: [
        { pct: '8%', color: 'Reading' },
        { pct: '13%', color: 'Listening' },
      ],
    },
    {
      name: 'Write from Dictation',
      to: listenPath,
      ai: true,
      weights: [
        { pct: '13%', color: 'Listening' },
        { pct: '23%', color: 'Writing' },
      ],
    },
  ].filter(Boolean);

  return [
    { title: 'Speaking', Icon: Mic, items: speakingItems },
    { title: 'Writing', Icon: PenLine, items: writingItems },
    { title: 'Reading', Icon: BookOpen, items: readingItems },
    { title: 'Listening', Icon: Headphones, items: listeningItems },
  ];
}

/**
 * Full-width PTEDashboard Practice mega-menu displaying all PTE task types,
 * AI-scoring sparkle badges, dual-score skill weightages, search filtering, and Study Tools.
 */
export default function PracticeMegaMenu({ examVariant, onClose }) {
  const [query, setQuery] = useState('');
  const columns = useMemo(() => getPracticeColumns(examVariant), [examVariant]);
  const normalized = query.trim().toLowerCase();

  return (
    <div className="absolute left-0 right-0 top-full bg-[#f8fafc] border-b border-slate-200 shadow-2xl z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        {/* Top Row: Search Input & Skill Weightage Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search practice tasks"
              className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00b4c6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-[13px] font-medium text-slate-600">
            {Object.entries(SKILL_COLORS).map(([skill, hex]) => (
              <span key={skill} className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hex }} />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 4-Column Task Matrix Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {columns.map(({ title, Icon, items }) => {
              const filteredItems = normalized
                ? items.filter((item) => item.name.toLowerCase().includes(normalized))
                : items;

              return (
                <div key={title} className="space-y-3">
                  <div className="flex items-center gap-2 text-[#0c4a7e] font-bold text-sm pb-1">
                    <Icon className="w-4 h-4" />
                    <span>{title}</span>
                  </div>

                  {filteredItems.length > 0 ? (
                    <ul className="space-y-2.5">
                      {filteredItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.to}
                            onClick={onClose}
                            className="group flex items-start justify-between gap-2 text-xs sm:text-[13px] text-slate-600 hover:text-[#0c4a7e] transition"
                          >
                            <span className="inline-flex items-center gap-1.5 leading-snug group-hover:font-medium">
                              <span>{item.name}</span>
                              {item.ai && (
                                <Sparkles
                                  className="w-3.5 h-3.5 shrink-0 text-[#9333ea] fill-[#9333ea]"
                                  aria-label="AI Scored"
                                />
                              )}
                            </span>

                            <span className="inline-flex items-center gap-1.5 shrink-0 font-bold text-[11.5px] tabular-nums pt-0.5">
                              {item.weights.map((w, idx) => (
                                <span
                                  key={`${item.name}-${idx}`}
                                  className={SKILL_COLOR_CLASSES[w.color] || 'text-slate-700'}
                                >
                                  {w.pct}
                                </span>
                              ))}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400">No matching tasks</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Study Tools Strip */}
        <div className="rounded-2xl border border-slate-200/80 bg-white px-5 sm:px-6 py-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#0c4a7e] font-bold text-sm">
            <Monitor className="w-4 h-4" />
            <span>Study Tools</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs sm:text-[13px] font-medium text-slate-600">
            {STUDY_TOOL_LINKS.map((tool) => (
              <Link
                key={tool.label}
                to={tool.to}
                onClick={onClose}
                className="hover:text-[#00b4c6] transition"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
