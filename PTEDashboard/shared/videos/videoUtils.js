const VIDEO_THUMBNAIL_PALETTES = [
  { bg: 'from-slate-900 via-[#0e2d47] to-[#1e1b4b]', accent: 'bg-red-600' },
  { bg: 'from-[#1a1033] via-[#2c1654] to-[#0f172a]', accent: 'bg-sky-500' },
  { bg: 'from-slate-950 via-slate-900 to-[#3f1414]', accent: 'bg-amber-500' },
  { bg: 'from-[#06283d] via-[#133b5c] to-[#0c1b2a]', accent: 'bg-cyan-500' },
  { bg: 'from-[#1f0d2b] via-[#361047] to-[#0f172a]', accent: 'bg-rose-600' },
  { bg: 'from-[#0d2238] via-[#173654] to-[#2e1a12]', accent: 'bg-orange-500' },
  { bg: 'from-[#072b28] via-[#0c4a43] to-[#0f172a]', accent: 'bg-emerald-600' },
  { bg: 'from-[#1e1b4b] via-[#312e81] to-[#0f172a]', accent: 'bg-indigo-600' },
];

export function hydrateStrategyVideo(
  [title, timeAgo, badgeText, category, duration],
  index,
  idPrefix
) {
  const palette = VIDEO_THUMBNAIL_PALETTES[index % VIDEO_THUMBNAIL_PALETTES.length];
  return {
    id: `${idPrefix}-${index + 1}`,
    title,
    timeAgo,
    badgeText,
    category,
    duration,
    bg: palette.bg,
    accent: palette.accent,
  };
}
