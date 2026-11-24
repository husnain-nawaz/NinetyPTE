import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import BlogCover from './BlogCover';
import BlogSidebar from './BlogSidebar';
import { BLOG_CATEGORIES, BLOG_POSTS } from './blogData';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sidebarSearch, setSidebarSearch] = useState('');

  const post = useMemo(
    () => BLOG_POSTS.find((entry) => entry.slug === slug),
    [slug]
  );

  const categoryCounts = useMemo(() => {
    const counts = { 'All Articles': BLOG_POSTS.length };
    for (const category of BLOG_CATEGORIES) {
      if (category === 'All Articles') continue;
      counts[category] = BLOG_POSTS.filter((item) =>
        item.categories.includes(category)
      ).length;
    }
    return counts;
  }, []);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const sameCategory = BLOG_POSTS.filter(
      (item) =>
        item.slug !== post.slug &&
        item.categories.some((category) => post.categories.includes(category))
    );
    const fallback = BLOG_POSTS.filter(
      (item) => item.slug !== post.slug && !sameCategory.includes(item)
    );
    return [...sameCategory, ...fallback].slice(0, 2);
  }, [post]);

  const handleCategoryRedirect = (category) => {
    if (category === 'All Articles') {
      navigate('/blog');
    } else {
      navigate(`/blog?category=${encodeURIComponent(category)}`);
    }
  };

  const handleSearchRedirect = (query) => {
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/blog?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/blog');
    }
  };

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Article Not Found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The blog guide you requested could not be found or may have moved.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#00a8bd] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0093a6]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to NinetyPTE Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-16 pt-8 sm:pt-10">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#00a8bd]">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[#00a8bd]">
            Blogs
          </Link>
          <span>/</span>
          <span className="font-medium text-slate-700">{post.primaryCategory}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Article Content Column */}
          <article className="lg:col-span-8 xl:col-span-9">
            <header>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {post.categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryRedirect(category)}
                    className="inline-flex items-center gap-1 rounded-full bg-[#e6f7fa] px-3 py-1 text-[11px] font-semibold text-[#008b9e] transition-colors hover:bg-[#cff0f6]"
                  >
                    <Tag className="h-3 w-3" />
                    {category}
                  </button>
                ))}
              </div>

              <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                {post.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="inline-flex items-center gap-2 font-semibold text-slate-800">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${post.coverTheme.accentBadge}`}
                  >
                    {post.authorInitial}
                  </span>
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {post.readTime}
                </span>
              </div>
            </header>

            <div className="mt-6">
              <BlogCover post={post} size="hero" />
            </div>

            {/* Lead Summary */}
            <p className="mt-7 rounded-xl border-l-4 border-[#00a8bd] bg-slate-50 px-5 py-4 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              {post.excerpt}
            </p>

            {/* Body Sections */}
            <div className="mt-8 space-y-7">
              {post.sections.map((section) => (
                <section key={section.heading} className="space-y-2.5">
                  <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                    {section.heading}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {section.body}
                  </p>
                  {section.bullets && (
                    <ul className="mt-3 space-y-2 pl-5 text-sm leading-relaxed text-slate-600 list-disc sm:text-[15px]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Practice Callout Banner */}
            <div className="mt-10 flex flex-col justify-between gap-4 rounded-xl border border-[#bde8f2] bg-gradient-to-r from-[#effaff] to-[#e0f5fb] p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Ready to Apply These Tips in Real Exam Conditions?
                </h3>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                  Practice with AI speech &amp; writing feedback on NinetyPTE before your test date.
                </p>
              </div>
              <Link
                to="/pte-speaking-practice"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#00a8bd] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#0093a6]"
              >
                Start Free Practice
              </Link>
            </div>

            {/* Back link + Related Posts */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Related Articles</h2>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a8bd] hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  All Articles
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <BlogCover post={related} />
                    <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900 group-hover:text-[#00a8bd]">
                      {related.title}
                    </h3>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-slate-500">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {related.date}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Right Sticky Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <BlogSidebar
              searchQuery={sidebarSearch}
              onSearchChange={setSidebarSearch}
              onSubmitSearch={handleSearchRedirect}
              activeCategory={post.primaryCategory}
              onSelectCategory={handleCategoryRedirect}
              categoryCounts={categoryCounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
