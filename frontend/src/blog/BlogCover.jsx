/**
 * Editorial SVG/CSS cover artwork shared by blog grid cards and article detail hero headers.
 * Keeps every graphic crisp, accessible, and 100% NinetyPTE-branded without external stock images.
 */
export default function BlogCover({ post, size = 'card' }) {
  const isHero = size === 'hero';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br ${post.coverTheme.bg} ${
        isHero ? 'aspect-[16/8.5] sm:aspect-[16/7.5] p-6 sm:p-10' : 'aspect-[16/10] p-4 sm:p-5'
      } flex flex-col justify-between select-none shadow-sm`}
    >
      {/* Subtle geometric background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20"
        style={{ backgroundColor: post.coverTheme.patternColor }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-1/3 h-36 w-36 rounded-full opacity-10"
        style={{ backgroundColor: post.coverTheme.patternColor }}
      />

      {/* Top Brand + Category Tag Row */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1 rounded-md bg-white/90 px-2.5 py-1 shadow-xs backdrop-blur-xs">
          <span className="text-xs font-extrabold tracking-tight text-slate-900">ninety</span>
          <span className="text-xs font-extrabold tracking-tight text-[#00a8bd]">pte</span>
        </div>
        <span
          className={`rounded-full font-bold uppercase tracking-wider ${
            isHero ? 'px-3 py-1 text-[11px]' : 'px-2.5 py-0.5 text-[10px]'
          } bg-white/85 text-slate-700 shadow-xs`}
        >
          {post.coverTheme.tagText}
        </span>
      </div>

      {/* Center Editorial Headline */}
      <div className="relative z-10 my-auto py-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`font-extrabold leading-tight tracking-tight ${post.coverTheme.headlineColor} ${
              isHero ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-lg sm:text-xl'
            }`}
          >
            {post.bannerTitle}
          </span>
          <span
            className={`inline-block rounded-md font-extrabold tracking-tight shadow-xs ${post.coverTheme.accentBadge} ${
              isHero ? 'px-3 py-1 text-lg sm:text-xl' : 'px-2 py-0.5 text-xs sm:text-sm'
            }`}
          >
            {post.bannerYear}
          </span>
        </div>
        <p
          className={`mt-1.5 font-semibold text-slate-600 leading-snug ${
            isHero ? 'max-w-2xl text-sm sm:text-base' : 'max-w-[92%] text-[11.5px] line-clamp-2'
          }`}
        >
          {post.bannerSub}
        </p>
      </div>

      {/* Bottom NinetyPTE Footer Strip */}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-1">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md bg-slate-900/85 text-white font-semibold ${
            isHero ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4eb]" />
          Web &amp; Mobile Prep
        </span>
        <span className={`font-bold text-slate-700 ${isHero ? 'text-xs' : 'text-[10.5px]'}`}>
          ninetypte.com
        </span>
      </div>
    </div>
  );
}
