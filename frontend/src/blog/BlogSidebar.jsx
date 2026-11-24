import { Link } from 'react-router-dom';
import { BookOpen, Headphones, Mic, PenLine, Search, X } from 'lucide-react';
import { BLOG_CATEGORIES } from './blogData';

const PRACTICE_SHORTCUTS = [
  {
    label: 'Speaking',
    to: '/pte-speaking-practice',
    bg: 'bg-[#ff8a00] hover:bg-[#ea7f00]',
    Icon: Mic,
  },
  {
    label: 'Writing',
    to: '/pte-writing-practice',
    bg: 'bg-[#4f8df9] hover:bg-[#3b7be6]',
    Icon: PenLine,
  },
  {
    label: 'Reading',
    to: '/pte-reading-practice',
    bg: 'bg-[#4caf50] hover:bg-[#419d45]',
    Icon: BookOpen,
  },
  {
    label: 'Listening',
    to: '/pte-listening-practice',
    bg: 'bg-[#395591] hover:bg-[#2f477a]',
    Icon: Headphones,
  },
];

/**
 * Sticky blog sidebar with search, Free PTE Practice shortcuts, Category filters, and Mock Test CTA.
 */
export default function BlogSidebar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  categoryCounts,
  onSubmitSearch,
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmitSearch) {
      onSubmitSearch(searchQuery);
    }
  };

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 self-start">
      {/* 1. Search Box */}
      <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
        <form onSubmit={handleFormSubmit} className="flex items-stretch">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search here..."
              aria-label="Search blog articles"
              className="w-full rounded-l-md bg-[#eef2f6] px-3 py-2.5 pr-7 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a8bd]/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            aria-label="Search articles"
            className="flex items-center justify-center rounded-r-md bg-[#00a8bd] px-3.5 text-white transition-colors hover:bg-[#0093a6]"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* 2. Free PTE Practice Shortcuts */}
      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <h3 className="border-b border-slate-100 pb-2.5 text-sm font-bold text-slate-800">
          Free PTE Practice
        </h3>
        <div className="mt-3.5 grid grid-cols-4 gap-2 text-center">
          {PRACTICE_SHORTCUTS.map(({ label, to, bg, Icon }) => (
            <Link
              key={label}
              to={to}
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-xs transition-transform group-hover:scale-105 ${bg}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#00a8bd]">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Categories Filter List */}
      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <h3 className="border-b border-slate-100 pb-2.5 text-sm font-bold text-slate-800">
          Categories
        </h3>
        <ul className="mt-2.5 space-y-1">
          {BLOG_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            const count = categoryCounts?.[category];
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-[#e6f7fa] font-semibold text-[#008b9e]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{category}</span>
                  {typeof count === 'number' && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                        isSelected
                          ? 'bg-[#00a8bd] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 4. Try a Free Mock Test CTA */}
      <div className="relative overflow-hidden rounded-xl border border-[#bde8f2] bg-gradient-to-br from-[#f2fbfe] via-[#e4f6fc] to-[#d6f0f9] p-5 text-center shadow-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#00a8bd]/15"
        />
        <h3 className="relative text-base font-extrabold text-slate-800">
          Try a Free Mock Test
        </h3>
        <p className="relative mt-1.5 text-xs leading-relaxed text-slate-600">
          Experience AI-scored PTE Academic &amp; PTE Core full mock tests with real exam timing.
        </p>
        <Link
          to="/mock-tests"
          className="relative mt-4 inline-flex items-center justify-center rounded-lg bg-[#00a8bd] px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#0093a6]"
        >
          Start Free Mock Test
        </Link>
      </div>
    </aside>
  );
}
