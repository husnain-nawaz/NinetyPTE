import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const DROPDOWN_PASSAGE_BANK = [
  {
    segments: [
      'Sound depressing, even apocalyptic? Well, it could be the future. If government ',
      { id: 'b1', options: ['forecasts', 'opinions', 'estimates', 'reports'] },
      ' are right, about 20 years from now, two out of five households will be single ',
      { id: 'b2', options: ['occupancy', 'person', 'resident', 'member'] },
      '. And there is evidence the situation is already ',
      { id: 'b3', options: ['unfolding', 'developing', 'shifting', 'increasing'] },
      '. According to a report, Social Isolation in America, the average American today has only two close friends. While some are ',
      { id: 'b4', options: ['proclaiming', 'declaring', 'noticing', 'expecting'] },
      ' a crisis in our ability to make friends, others argue that modern friendships take ',
      { id: 'b5', options: ['spectacular', 'amazing', 'special', 'applausive'] },
      ' new forms through online connectivity, marking a 64 percent rise since 2003.',
    ],
  },
  {
    segments: [
      'In the literary world, it was an accepted assumption that the 1970s was a time of unprecedented growth in homegrown Australian fiction. But it was ',
      { id: 'b1', options: ['impossible', 'not', 'only', 'simply'] },
      ' recently that a researcher was able to measure just how many novels were published in that decade. It is this sort of research — testing ideas about literary history — that ',
      { id: 'b2', options: ['has become', 'became', 'was made', 'remained'] },
      ' possible with the spread of Digital Humanities. The intersection of humanities and digital technologies ',
      { id: 'b3', options: ['opens up', 'closes', 'limits', 'delays'] },
      ' opportunities in the fields of literature, linguistics, and history that ',
      { id: 'b4', options: ['would not exist', 'cannot remain', 'did not start', 'must appear'] },
      ' without computational methods as the field really takes ',
      { id: 'b5', options: ['in', 'off', 'on', 'over'] },
      '.',
    ],
  },
  {
    segments: [
      'Since nutrition scientists are constantly making new discoveries, we need to ',
      { id: 'b1', options: ['modify', 'repeat', 'abandon', 'store'] },
      ' our recommendations for healthy eating from time to time. However, nutrition is an art ',
      { id: 'b2', options: ['as much as', 'more than', 'rather than', 'less than'] },
      ' a science. It is an art because it requires ',
      { id: 'b3', options: ['creativity', 'patience', 'flexibility', 'training'] },
      ' to develop a healthy eating plan for people who differ in their food preferences, beliefs, and culture. ',
      { id: 'b4', options: ['As', 'Since', 'While', 'Before'] },
      ' we discover more about how our genes and environment interact, it is becoming increasingly difficult to provide a single ',
      { id: 'b5', options: ['pack', 'set', 'lot', 'bunch'] },
      ' of dietary recommendations suitable for everyone.',
    ],
  },
  {
    segments: [
      'Scientists have discovered the oldest direct evidence of oxygenic photosynthesis, the process by which cells use sunlight, water and carbon dioxide to produce energy and oxygen. The evidence consists of fossils of microscopic structures called stromatolites, which ',
      { id: 'b1', options: ['were formed', 'have stayed', 'had broken', 'kept growing'] },
      ' by layers of cyanobacteria and sediment. The fossils ',
      { id: 'b2', options: ['date', 'move', 'look', 'stretch'] },
      ' back to billions of years ago, marking the Great Oxygenation Event, a crucial period in which oxygen levels in the atmosphere increased ',
      { id: 'b3', options: ['dramatically', 'slightly', 'hardly', 'rarely'] },
      '. Researchers concluded that ancient microbes were already ',
      { id: 'b4', options: ['capable', 'able', 'likely', 'suitable'] },
      ' of oxygenic photosynthesis.',
    ],
  },
];

/**
 * Inline passage dropdown blanks widget for Reading Fill in the Blanks (Dropdown),
 * supporting Light and Dark mode floating menus.
 */
export default function PearsonDropdownBlanksStage({
  instruction,
  questionIndex,
  blankSelections = {},
  onSelectBlank,
  darkMode = false,
}) {
  const [openBlankId, setOpenBlankId] = useState(null);
  const passage = DROPDOWN_PASSAGE_BANK[questionIndex % DROPDOWN_PASSAGE_BANK.length];

  return (
    <div className="max-w-5xl space-y-6">
      <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {instruction}
      </p>

      {openBlankId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenBlankId(null)}
          aria-hidden="true"
        />
      )}

      <div
        className={`text-xs sm:text-[14px] leading-[2.3] ${
          darkMode ? 'text-zinc-200' : 'text-slate-700'
        }`}
      >
        {passage.segments.map((seg, idx) => {
          if (typeof seg === 'string') {
            return <span key={idx}>{seg}</span>;
          }

          const chosen = blankSelections[seg.id] || '';
          const isOpen = openBlankId === seg.id;

          return (
            <span key={seg.id} className="relative inline-block mx-1 align-middle">
              <button
                type="button"
                onClick={() => setOpenBlankId((prev) => (prev === seg.id ? null : seg.id))}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={`min-w-[145px] inline-flex items-center justify-between gap-3 rounded-xs border px-3 py-1 text-xs font-medium transition cursor-pointer ${
                  darkMode
                    ? 'border-zinc-500 bg-[#3a3a3a] text-zinc-100 hover:border-zinc-300'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
                }`}
              >
                <span className="truncate">{chosen || 'Select...'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  role="listbox"
                  className={`absolute left-0 top-full mt-1 w-full min-w-[155px] rounded-xs border shadow-xl z-20 py-1 ${
                    darkMode
                      ? 'border-zinc-600 bg-[#2b2b2b] text-zinc-100'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {seg.options.map((opt) => {
                    const active = chosen === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onSelectBlank(seg.id, opt);
                          setOpenBlankId(null);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs transition cursor-pointer ${
                          active
                            ? darkMode
                              ? 'bg-zinc-700 font-bold text-white'
                              : 'bg-sky-50 font-bold text-[#0b4a7b]'
                            : darkMode
                              ? 'hover:bg-zinc-700/70'
                              : 'hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
