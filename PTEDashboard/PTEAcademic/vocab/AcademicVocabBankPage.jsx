import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  BookmarkCheck,
  BookmarkPlus,
  CheckCircle2,
  Info,
  Plus,
  Search,
  Video,
  X,
} from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';
import { VOCAB_DECKS } from './vocabData';

/**
 * PTE Academic Vocab Bank page (/v1/vocab-bank, /vocab-bank).
 */
export default function AcademicVocabBankPage() {
  const [showInfoTip, setShowInfoTip] = useState(false);
  const [activeDeckId, setActiveDeckId] = useState(null);
  const [wordSearch, setWordSearch] = useState('');
  const [customWordInput, setCustomWordInput] = useState('');
  const [customMeaningInput, setCustomMeaningInput] = useState('');
  const [savedWords, setSavedWords] = useState([]);
  const [masteredKeys, setMasteredKeys] = useState([]);

  const deckSummaries = useMemo(
    () =>
      VOCAB_DECKS.map((deck) => {
        const wordsList = deck.id === 'my-list' ? savedWords : deck.sampleWords;
        const total = deck.id === 'my-list' ? savedWords.length : deck.baseTotal;
        const masteredInDeck = wordsList.filter((w) =>
          masteredKeys.includes(`${deck.id}:${w.word}`)
        ).length;
        const pct = total > 0 ? Math.min(100, Math.round((masteredInDeck / total) * 100)) : 0;
        return { ...deck, total, pct, wordsList };
      }),
    [masteredKeys, savedWords]
  );

  const activeDeckSummary = useMemo(
    () => deckSummaries.find((d) => d.id === activeDeckId) || null,
    [activeDeckId, deckSummaries]
  );

  const filteredModalWords = useMemo(() => {
    if (!activeDeckSummary) return [];
    const q = wordSearch.trim().toLowerCase();
    if (!q) return activeDeckSummary.wordsList;
    return activeDeckSummary.wordsList.filter(
      (entry) =>
        entry.word.toLowerCase().includes(q) || entry.meaning.toLowerCase().includes(q)
    );
  }, [activeDeckSummary, wordSearch]);

  const toggleMastered = (deckId, word) => {
    const key = `${deckId}:${word}`;
    setMasteredKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const toggleSaveToMyList = (wordObj) => {
    setSavedWords((prev) => {
      const exists = prev.some((item) => item.word.toLowerCase() === wordObj.word.toLowerCase());
      return exists
        ? prev.filter((item) => item.word.toLowerCase() !== wordObj.word.toLowerCase())
        : [wordObj, ...prev];
    });
  };

  const handleAddCustomWord = (e) => {
    e.preventDefault();
    const cleanedWord = customWordInput.trim();
    if (!cleanedWord) return;
    toggleSaveToMyList({
      word: cleanedWord,
      pos: 'custom',
      ipa: '',
      meaning: customMeaningInput.trim() || 'Added to personal study list.',
      example: '',
    });
    setCustomWordInput('');
    setCustomMeaningInput('');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
              <BookOpen className="w-4 h-4" />
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">Vocab Bank</h1>
              <button
                type="button"
                onClick={() => setShowInfoTip((prev) => !prev)}
                aria-label="About Vocab Bank"
                className="text-[#0c4a7e]/75 hover:text-[#0097a7] cursor-pointer"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {showInfoTip && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 shadow-lg z-30">
                Save unfamiliar terms from Reading Fill in the Blanks and Write From Dictation into
                <strong className="text-slate-800"> My List</strong>, and track mastered words across every high-frequency PTE deck.
              </div>
            )}
          </div>

          <Link
            to="/v1/youtube-videos/1"
            className="inline-flex items-center gap-2 rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white px-5 py-2 text-xs sm:text-[13px] font-bold shadow-xs transition"
          >
            <Video className="w-4 h-4" />
            <span>Video Guide</span>
          </Link>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deckSummaries.map((deck) => (
              <button
                key={deck.id}
                type="button"
                onClick={() => {
                  setActiveDeckId(deck.id);
                  setWordSearch('');
                }}
                className="group text-left rounded-xl border border-[#dce8f5] bg-white p-5 hover:border-[#00b4c6] hover:shadow-sm transition flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm sm:text-[15px] font-bold text-[#1e3a5f] group-hover:text-[#0097a7] transition-colors">
                      {deck.title}
                    </h2>
                    <span className="text-xs sm:text-sm font-extrabold text-[#1e3a5f] shrink-0">
                      {deck.pct}%
                    </span>
                  </div>

                  <div className="mt-3.5 flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500 shrink-0">
                      Total Words: <strong className="text-slate-700">{deck.total}</strong>
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#00b4c6] transition-all" style={{ width: `${deck.pct}%` }} />
                    </div>
                  </div>
                </div>

                <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                  {deck.description}
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />

      {activeDeckSummary && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveDeckId(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0c4a7e]">{activeDeckSummary.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Total Words: {activeDeckSummary.total} · {activeDeckSummary.pct}% Mastered
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveDeckId(null)}
                aria-label="Close vocabulary deck"
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {activeDeckSummary.id === 'my-list' && (
                <form
                  onSubmit={handleAddCustomWord}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2.5"
                >
                  <input
                    type="text"
                    required
                    value={customWordInput}
                    onChange={(e) => setCustomWordInput(e.target.value)}
                    placeholder="Add word (e.g. ubiquitous)"
                    className="sm:col-span-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800"
                  />
                  <input
                    type="text"
                    value={customMeaningInput}
                    onChange={(e) => setCustomMeaningInput(e.target.value)}
                    placeholder="Meaning / note (optional)"
                    className="sm:col-span-6 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800"
                  />
                  <button
                    type="submit"
                    className="sm:col-span-2 inline-flex items-center justify-center gap-1 rounded-lg bg-[#0d5488] hover:bg-[#093e66] text-white px-3 py-2 text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </form>
              )}

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={wordSearch}
                  onChange={(e) => setWordSearch(e.target.value)}
                  placeholder="Filter deck words..."
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-700"
                />
              </div>

              {filteredModalWords.length > 0 ? (
                <div className="space-y-3">
                  {filteredModalWords.map((item) => {
                    const isMastered = masteredKeys.includes(`${activeDeckSummary.id}:${item.word}`);
                    const inMyList = savedWords.some(
                      (saved) => saved.word.toLowerCase() === item.word.toLowerCase()
                    );

                    return (
                      <div
                        key={item.word}
                        className="rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900">{item.word}</span>
                            {item.pos && (
                              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 uppercase">
                                {item.pos}
                              </span>
                            )}
                            {item.ipa && (
                              <span className="text-xs text-slate-400 font-mono">{item.ipa}</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600">{item.meaning}</p>
                          {item.example && (
                            <p className="text-[11px] text-slate-400 italic">&ldquo;{item.example}&rdquo;</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleMastered(activeDeckSummary.id, item.word)}
                            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-bold border transition cursor-pointer ${
                              isMastered
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isMastered ? 'Mastered' : 'Mark Learned'}</span>
                          </button>

                          {activeDeckSummary.id !== 'my-list' && (
                            <button
                              type="button"
                              onClick={() => toggleSaveToMyList(item)}
                              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-bold border transition cursor-pointer ${
                                inMyList
                                  ? 'bg-cyan-50 border-cyan-300 text-[#008b9e]'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
                              }`}
                            >
                              {inMyList ? (
                                <BookmarkCheck className="w-3.5 h-3.5" />
                              ) : (
                                <BookmarkPlus className="w-3.5 h-3.5" />
                              )}
                              <span>{inMyList ? 'Saved' : 'Save'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="py-8 text-center text-xs text-slate-400">
                  {activeDeckSummary.id === 'my-list'
                    ? 'Your saved word list is empty. Add custom words above or save words from any deck.'
                    : 'No matching words found in this preview set.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
