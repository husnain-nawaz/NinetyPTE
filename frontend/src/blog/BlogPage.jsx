import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import BlogCover from './BlogCover';
import BlogSidebar from './BlogSidebar';
import { BLOG_CATEGORIES, BLOG_POSTS } from './blogData';

const POSTS_PER_PAGE = 10;

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') ?? '';
  const activeCategory = searchParams.get('category') || 'All Articles';
  const rawPage = Number.parseInt(searchParams.get('page') || '1', 10);

  const categoryCounts = useMemo(() => {
    const counts = { 'All Articles': BLOG_POSTS.length };
    for (const category of BLOG_CATEGORIES) {
      if (category === 'All Articles') continue;
      counts[category] = BLOG_POSTS.filter((post) =>
        post.categories.includes(category)
      ).length;
    }
    return counts;
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === 'All Articles' ||
        post.categories.includes(activeCategory);
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      return (
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.author.toLowerCase().includes(normalizedQuery) ||
        post.categories.some((cat) => cat.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Number.isNaN(rawPage)
    ? 1
    : Math.min(Math.max(1, rawPage), totalPages);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || (key === 'category' && value === 'All Articles') || (key === 'page' && value === 1)) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });
    setSearchParams(next, { replace: true });
  };

  const handleSearchChange = (value) => {
    updateParams({ q: value, page: 1 });
  };

  const handleSelectCategory = (category) => {
    updateParams({ category, page: 1 });
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    updateParams({ page: nextPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="bg-white pb-16 pt-10 sm:pt-12">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* Top Centered Title & Subtitle */}
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#334155] sm:text-4xl">
            NinetyPTE <span className="text-[#00a8bd]">Blogs</span>
          </h1>
          <p className="mt-2.5 text-sm text-slate-600 sm:text-base">
            Check Expert Tips and Resources for PTE Exam Preparation
          </p>
        </header>

        {/* Active filter bar when searching or filtering by category */}
        {(activeCategory !== 'All Articles' || searchQuery.trim() !== '') && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-slate-900">{filteredPosts.length}</span>{' '}
              article{filteredPosts.length === 1 ? '' : 's'}
              {activeCategory !== 'All Articles' && (
                <>
                  {' '}
                  in <span className="font-semibold text-[#008b9e]">{activeCategory}</span>
                </>
              )}
              {searchQuery.trim() !== '' && (
                <>
                  {' '}
                  matching <span className="font-semibold text-slate-900">&ldquo;{searchQuery.trim()}&rdquo;</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="font-semibold text-[#00a8bd] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Main 2-Column Layout: Left 2-Column Card Grid + Right Sticky Sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="lg:col-span-8 xl:col-span-9" aria-label="Blog articles">
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-9 md:grid-cols-2">
                {paginatedPosts.map((post) => (
                  <article key={post.id} className="group flex flex-col">
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
                        <BlogCover post={post} />
                      </div>
                      <h2 className="mt-3.5 text-[15.5px] font-bold leading-snug text-[#1e293b] transition-colors group-hover:text-[#00a8bd]">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Author & Date Meta */}
                    <div className="mt-2.5 flex items-center gap-3 text-[11.5px] text-slate-600">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[9.5px] font-bold text-white ${post.coverTheme.accentBadge}`}
                        >
                          {post.authorInitial}
                        </span>
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {post.date}
                      </span>
                    </div>

                    <p className="mt-2.5 line-clamp-3 text-[12.5px] leading-relaxed text-slate-500">
                      {post.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-10 text-center">
                <h2 className="text-lg font-bold text-slate-800">No matching articles found</h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Try another keyword or clear your selected category filter.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center rounded-lg bg-[#00a8bd] px-4 py-2 text-xs font-bold text-white hover:bg-[#0093a6]"
                >
                  Show All Articles
                </button>
              </div>
            )}

            {/* Pagination Bar */}
            {filteredPosts.length > 0 && (
              <nav
                aria-label="Blog pagination"
                className="mt-10 flex items-center justify-between border-t border-slate-200 pt-5 text-xs"
              >
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-500 transition-colors hover:text-[#00a8bd] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {pageNumbers.map((pageNumber) => {
                    const isActive = pageNumber === currentPage;
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                          isActive
                            ? 'bg-[#00a8bd] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-500 transition-colors hover:text-[#00a8bd] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </nav>
            )}
          </section>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <BlogSidebar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              categoryCounts={categoryCounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
