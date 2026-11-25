import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Search, Video, X } from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';
import { ALL_STRATEGY_VIDEOS, STRATEGY_VIDEOS_BY_PAGE } from './videosData';

/**
 * PTE Academic Strategy Videos / PTE Video Guide library (/v1/youtube-videos/:page).
 */
export default function AcademicStrategyVideosPage() {
  const { page } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const parsedPage = Number.parseInt(page || '1', 10);
  const currentPage = Number.isNaN(parsedPage) ? 1 : Math.min(Math.max(1, parsedPage), 2);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleVideos = useMemo(() => {
    if (normalizedQuery) {
      return ALL_STRATEGY_VIDEOS.filter(
        (v) =>
          v.title.toLowerCase().includes(normalizedQuery) ||
          v.category.toLowerCase().includes(normalizedQuery) ||
          v.badgeText.toLowerCase().includes(normalizedQuery)
      );
    }
    return STRATEGY_VIDEOS_BY_PAGE[currentPage] || STRATEGY_VIDEOS_BY_PAGE[1];
  }, [currentPage, normalizedQuery]);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
              <Video className="w-4 h-4" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">PTE Video Guide</h1>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-[13px] font-semibold text-slate-600 hover:border-[#00b4c6] hover:text-[#0097a7] transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
              PTE Academic Tutorials
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  aria-label="Search strategy videos"
                  className="w-full rounded-full border border-slate-200 bg-[#f8fafc] pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00b4c6]"
                />
              </div>

              <div className="inline-flex items-center rounded-lg border border-slate-200 overflow-hidden shadow-2xs text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 bg-[#ff0000] text-white px-2.5 py-1.5">
                  <Play className="w-3 h-3 fill-white" />
                  <span>YouTube</span>
                </span>
                <span className="bg-white text-slate-700 px-2.5 py-1.5">214K</span>
              </div>
            </div>
          </div>

          {visibleVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-7">
              {visibleVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setSelectedVideo(video)}
                  className="group text-left flex flex-col cursor-pointer"
                >
                  <div
                    className={`relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${video.bg} p-3.5 flex flex-col justify-between text-white shadow-xs`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-black tracking-wide uppercase">
                      <span className="text-cyan-300">ninetypte</span>
                      <span className="rounded bg-black/55 px-1.5 py-0.5 text-[10px]">{video.duration}</span>
                    </div>

                    <div className="space-y-1 pr-6">
                      <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-tight shadow-xs ${video.accent}`}>
                        {video.category}
                      </span>
                      <p className="text-sm sm:text-base font-black uppercase tracking-tight leading-tight text-white drop-shadow-xs line-clamp-2">
                        {video.badgeText}
                      </p>
                    </div>

                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition">
                      <span className="w-12 h-8 rounded-lg bg-[#ff0000]/95 group-hover:scale-110 transition-transform flex items-center justify-center shadow-md">
                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                      </span>
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#0097a7] transition-colors">
                    {video.title}
                  </h3>
                  <span className="mt-1 text-[11px] font-medium text-slate-400">{video.timeAgo}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-slate-500">
              No tutorial videos found matching &ldquo;{searchQuery}&rdquo;.
            </div>
          )}

          {!normalizedQuery && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <Link
                to="/v1/youtube-videos/1"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 transition ${
                  currentPage === 1
                    ? 'text-slate-300 pointer-events-none'
                    : 'text-slate-600 hover:border-[#00b4c6] hover:text-[#0097a7]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Link>

              <div className="flex items-center gap-2">
                {[1, 2].map((num) => (
                  <Link
                    key={num}
                    to={`/v1/youtube-videos/${num}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                      currentPage === num ? 'bg-[#00b4c6] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </Link>
                ))}
              </div>

              <Link
                to="/v1/youtube-videos/2"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 transition ${
                  currentPage === 2
                    ? 'text-slate-300 pointer-events-none'
                    : 'text-slate-600 hover:border-[#00b4c6] hover:text-[#0097a7]'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>
      </main>

      <PTEDashboardTealFooter />

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className={`h-60 bg-gradient-to-br ${selectedVideo.bg} p-6 flex flex-col justify-between text-white`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wide text-cyan-300 uppercase">
                  NinetyPTE · {selectedVideo.category} · {selectedVideo.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  aria-label="Close video player"
                  className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <span className={`inline-block rounded px-2.5 py-0.5 text-[11px] font-bold uppercase ${selectedVideo.accent}`}>
                  {selectedVideo.badgeText}
                </span>
                <h3 className="text-lg font-extrabold leading-snug">{selectedVideo.title}</h3>
              </div>
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-600">
                Uploaded {selectedVideo.timeAgo} · Apply these strategies directly inside NinetyPTE practice sets.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to="/pte-speaking-practice"
                  className="rounded-lg bg-[#0d5488] px-4 py-2 text-xs font-bold text-white hover:bg-[#093e66]"
                >
                  Practice Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
