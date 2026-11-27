import { useMemo, useRef, useState } from 'react';
import {
  ArrowUpDown,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  Info,
  MessageCircle,
  Share2,
  Sparkles,
  ThumbsUp,
  Trash2,
  User,
  X,
} from 'lucide-react';
import CyanBarsLoader from '../shared/CyanBarsLoader';
import ScoreAnalysisModal from '../shared/history/ScoreAnalysisModal';
import { emitPortalNotification } from '../shared/notificationsData';
import { COMMUNITY_SCORE_SEEDS, INITIAL_FORUM_POSTS } from './practiceTaskCatalog';

const TABS = [
  { id: 'forum', label: 'Forum' },
  { id: 'my-score', label: 'My Score' },
  { id: 'community-score', label: 'Community Score' },
];

const SCORE_TIER_FILTERS = ['All Scores', 'Superior', 'Proficient', 'Competent', 'Vocational'];

const COMMUNITY_SORT_OPTIONS = [
  { id: 'highest', label: 'Highest first', pillLabel: 'Sort: Highest' },
  { id: 'latest', label: 'Latest first', pillLabel: 'Sort: Latest' },
];

function buildModalPayload(taskMeta, activeQuestion, scoreItem) {
  return {
    meta: {
      code: taskMeta.code,
      title: taskMeta.title,
      skill: taskMeta.skill,
      buttonLabel: 'AI Score',
      modalType: taskMeta.skill === 'speaking' ? 'speaking' : 'objective',
      scoreLabels: ['Speaking'],
    },
    row: {
      id: scoreItem.id,
      qid: `#${activeQuestion.id}`,
      title: activeQuestion.title,
      duration: scoreItem.durationLabel || '00:00',
      questionText: activeQuestion.contentSnippet || taskMeta.promptText,
      scores: { Speaking: scoreItem.score },
      enablingSkills: [
        { label: 'Content', score: scoreItem.content },
        { label: 'Fluency', score: scoreItem.fluency },
        { label: 'Pronunciation', score: scoreItem.pronunciation },
      ],
      speechTokens: [
        {
          text: activeQuestion.contentSnippet || taskMeta.promptText,
          status: 'good',
        },
      ],
      wordStats: { good: 59, avg: 5, bad: 0 },
    },
  };
}

function NestedReplyList({ replies, likedIds, onToggleLike, onReply, onDeleteOwn }) {
  if (!replies?.length) return null;
  return (
    <div className="mt-2.5 ml-8 sm:ml-10 divide-y divide-slate-200/80 border-t border-slate-200/80">
      {replies.map((reply) => {
        const liked = likedIds.includes(reply.id);
        const totalLikes = (reply.likes || 0) + (liked ? 1 : 0);
        return (
          <div key={reply.id} className="pt-2.5 pb-1.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <span className="w-7 h-7 rounded-full bg-[#4bd5cc] text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0 text-xs">
                <p>
                  <span className="font-bold text-slate-800 mr-2">{reply.author}</span>
                  <span className="text-[11px] text-slate-400">{reply.createdAt}</span>
                </p>
                <p className="text-slate-700 mt-0.5">{reply.text}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 shrink-0 text-xs">
              {reply.isOwn && onDeleteOwn && (
                <button
                  type="button"
                  onClick={() => onDeleteOwn(reply.id)}
                  aria-label="Delete reply"
                  className="p-1 hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onReply}
                aria-label="Reply to comment"
                className="p-1 hover:text-[#1db3a8] cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onToggleLike(reply.id)}
                aria-label="Like reply"
                className={`inline-flex items-center gap-1 p-1 cursor-pointer ${
                  liked ? 'text-[#28b5ac] font-bold' : 'hover:text-[#28b5ac]'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                {totalLikes > 0 && <span>{totalLikes}</span>}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Shared Forum, My Score, and Community Score panel beneath every practice question,
 * supporting nested replies, View All threads, tier/sort filtering, Share Link,
 * Delete Confirm, Score Comment, and detailed AI Score modal preview.
 */
export default function BottomCommunityTabs({
  activeTab,
  onChangeTab,
  isSubmitting,
  taskMeta,
  activeQuestion,
  myScores,
  onDeleteMyScore,
  onToggleLikeScore,
}) {
  const [forumPosts, setForumPosts] = useState(INITIAL_FORUM_POSTS);
  const [communityRows, setCommunityRows] = useState(COMMUNITY_SCORE_SEEDS);
  const [showAllForum, setShowAllForum] = useState(false);
  const [showAllCommunity, setShowAllCommunity] = useState(false);
  const [likedIds, setLikedIds] = useState([]);

  const [communityTier, setCommunityTier] = useState('Superior');
  const [communitySort, setCommunitySort] = useState('highest');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [communityLoading, setCommunityLoading] = useState(false);

  const [shareModalRow, setShareModalRow] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [scoreCommentTarget, setScoreCommentTarget] = useState(null);
  const [scoreCommentText, setScoreCommentText] = useState('');

  // Unified Comment Modal: mode 'new-post' (shows Category pills) vs 'forum-reply' vs 'community-reply'
  const [commentDialog, setCommentDialog] = useState(null);
  const [commentCategory, setCommentCategory] = useState('Forum');
  const [commentDraft, setCommentDraft] = useState('');
  const [viewAllThreadId, setViewAllThreadId] = useState(null);
  const [aiScorePreview, setAiScorePreview] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const toastTimerRef = useRef(null);
  const loadingTimerRef = useRef(null);

  const triggerToast = (msg = 'Posted successfully!') => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(''), 2600);
  };

  const triggerCommunityLoading = () => {
    setCommunityLoading(true);
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = setTimeout(() => setCommunityLoading(false), 220);
  };

  const toggleLikedId = (id) => {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filteredCommunityRows = useMemo(() => {
    const base =
      communityTier === 'All Scores'
        ? communityRows
        : communityRows.filter((r) => r.tier === communityTier);
    const sorted = [...base].sort((a, b) =>
      communitySort === 'latest' ? b.sortTime - a.sortTime : b.score - a.score
    );
    return sorted;
  }, [communityRows, communityTier, communitySort]);

  const visibleForumPosts = showAllForum ? forumPosts : forumPosts.slice(0, 6);
  const visibleCommunityRows = showAllCommunity
    ? filteredCommunityRows
    : filteredCommunityRows.slice(0, 5);
  const activeSortObj =
    COMMUNITY_SORT_OPTIONS.find((s) => s.id === communitySort) || COMMUNITY_SORT_OPTIONS[0];
  const viewAllThread = forumPosts.find((p) => p.id === viewAllThreadId) || null;

  const handleCopyShareLink = (url) => {
    try {
      navigator.clipboard?.writeText(url);
    } catch {
      // Ignore clipboard failures
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  };

  const handleDownloadScore = (entry) => {
    const summary = [
      `NinetyPTE Score Report`,
      `Question: #${activeQuestion.id} — ${activeQuestion.title}`,
      `Score: ${String(entry.score).padStart(2, '0')}/90`,
      `Recorded: ${entry.timestamp}`,
    ].join('\n');
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${taskMeta.code}-${activeQuestion.id}-score.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmitCommentModal = (e) => {
    e.preventDefault();
    const text = commentDraft.trim();
    if (!text || !commentDialog) return;

    const now = new Date();
    const dateOnly = now.toLocaleDateString('en-GB');
    const createdAt = `${dateOnly} ${now.toTimeString().slice(0, 5)}`;

    if (commentDialog.mode === 'new-post') {
      setForumPosts((prev) => [
        {
          id: `fp-${Date.now()}`,
          author: 'Student',
          isOwn: true,
          createdAt,
          dateOnly,
          badge: commentCategory,
          text,
          likes: 0,
          replies: [],
        },
        ...prev,
      ]);
      if (commentCategory === 'Error') {
        emitPortalNotification({
          title: 'You: reported an ERROR',
          refTag: `${taskMeta.code} #${activeQuestion.id}`,
          kind: 'alert-chat',
        });
      }
    } else if (commentDialog.mode === 'forum-reply') {
      const targetPost = forumPosts.find((p) => p.id === commentDialog.targetId);
      const replyEntry = {
        id: `fpr-${Date.now()}`,
        author: 'Student',
        isOwn: true,
        createdAt,
        text,
        likes: 0,
      };
      setForumPosts((prev) =>
        prev.map((post) =>
          post.id === commentDialog.targetId
            ? { ...post, replies: [...(post.replies || []), replyEntry] }
            : post
        )
      );
      if (targetPost) {
        emitPortalNotification({
          title: `You: replied on ${targetPost.author}'s post for ${targetPost.badge.toUpperCase()}`,
          refTag: `${taskMeta.code} #${activeQuestion.id}`,
          kind: 'alert-chat',
        });
      }
    } else if (commentDialog.mode === 'community-reply') {
      const targetRow = communityRows.find((r) => r.id === commentDialog.targetId);
      const replyEntry = {
        id: `csr-${Date.now()}`,
        author: 'Student',
        isOwn: true,
        createdAt,
        text,
        likes: 0,
      };
      setCommunityRows((prev) =>
        prev.map((row) =>
          row.id === commentDialog.targetId
            ? { ...row, replies: [...(row.replies || []), replyEntry] }
            : row
        )
      );
      if (targetRow) {
        emitPortalNotification({
          title: `You: replied on ${targetRow.author}'s post`,
          refTag: `${taskMeta.code} #${activeQuestion.id}`,
          kind: 'reply',
        });
      }
    }

    setCommentDraft('');
    setCommentDialog(null);
    triggerToast('Posted successfully!');
  };

  return (
    <section className="pt-2 space-y-4 relative">
      {/* Posted Successfully Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 w-64 rounded-lg bg-white shadow-xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span className="text-xs font-semibold text-slate-600">{toastMessage}</span>
          </div>
          <div className="h-1 bg-emerald-500 w-2/3" />
        </div>
      )}

      {/* Tab Headers */}
      <div className="flex flex-wrap items-center gap-7 text-xs sm:text-sm font-bold">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`pb-1.5 transition cursor-pointer ${
                active
                  ? 'text-[#e07a32] border-b-2 border-[#e07a32]'
                  : 'text-slate-800 hover:text-[#0b4a7b]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MY SCORE TAB */}
      {activeTab === 'my-score' && (
        <div className="rounded-2xl bg-[#f3fbfb] p-5">
          {isSubmitting ? (
            <div className="py-5 flex flex-col items-center gap-2">
              <CyanBarsLoader label="Scoring your response" />
              <p className="text-xs text-slate-500">Generating AI Score breakdown...</p>
            </div>
          ) : myScores.length === 0 ? (
            <p className="py-2 text-center text-xs text-slate-600">No Record Available</p>
          ) : (
            <div className="space-y-2.5">
              {myScores.map((item) => (
                <div
                  key={item.id}
                  className="rounded-full border border-[#8ce2dc] bg-white px-4 py-2 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-linear-to-br from-[#0b4a7b] to-[#38c6bd] text-white flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-medium text-slate-600 tabular-nums">
                      {item.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#8ce2dc] pl-1 pr-3 py-0.5 text-xs font-bold text-[#1db3a8]">
                      <span className="w-5 h-5 rounded-full bg-[#38c6bd] text-white text-[10px] font-extrabold flex items-center justify-center">
                        {taskMeta.skill[0].toUpperCase()}
                      </span>
                      <span>{String(item.score).padStart(2, '0')}/90</span>
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setAiScorePreview(buildModalPayload(taskMeta, activeQuestion, item))
                      }
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#e39660] hover:bg-[#d78349] px-3.5 py-1 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Score</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <button
                      type="button"
                      onClick={() => handleDownloadScore(item)}
                      aria-label="Download report"
                      className="p-1 hover:text-[#1db3a8] cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShareModalRow(item)}
                      aria-label="Share answer link"
                      className="p-1 hover:text-[#1db3a8] cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(item.id)}
                      aria-label="Delete attempt"
                      className="p-1 hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setScoreCommentTarget(item);
                        setScoreCommentText('');
                      }}
                      aria-label="Comment on attempt"
                      className="p-1 hover:text-[#1db3a8] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleLikeScore?.(item.id)}
                      aria-label="Like response"
                      className={`inline-flex items-center gap-1 p-1 cursor-pointer ${
                        item.liked
                          ? 'text-[#28b5ac] font-bold'
                          : 'text-slate-400 hover:text-[#28b5ac]'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {item.likes > 0 && <span className="text-xs">{item.likes}</span>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FORUM TAB */}
      {activeTab === 'forum' && (
        <div className="rounded-2xl bg-[#effbfc] p-5 space-y-3">
          <div className="flex justify-center pb-1">
            <button
              type="button"
              onClick={() => {
                setCommentCategory('Forum');
                setCommentDraft('');
                setCommentDialog({ mode: 'new-post' });
              }}
              className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] px-7 py-1.5 text-xs font-bold text-white shadow-2xs transition cursor-pointer"
            >
              Comment
            </button>
          </div>

          <div className="space-y-2.5">
            {visibleForumPosts.map((post) => {
              const liked = likedIds.includes(post.id);
              const likesTotal = (post.likes || 0) + (liked ? 1 : 0);
              const replies = post.replies || [];
              const previewReplies = replies.slice(0, 2);

              return (
                <div
                  key={post.id}
                  className="rounded-xl border border-[#bceee9] bg-white px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-full bg-[#4bd5cc] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </span>
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-bold text-slate-800">{post.author}</span>
                          <span className="text-[11px] text-slate-400">{post.createdAt}</span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold text-white ${
                              post.badge === 'Error' ? 'bg-[#ef3c2d]' : 'bg-[#34d364]'
                            }`}
                          >
                            {post.badge}
                          </span>
                        </div>
                        {post.text && <p className="text-xs text-slate-700">{post.text}</p>}
                        <p className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                          <Calendar className="w-3 h-3" />
                          <span>{post.dateOnly}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 shrink-0 text-xs">
                      {post.isOwn && (
                        <button
                          type="button"
                          onClick={() =>
                            setForumPosts((prev) => prev.filter((item) => item.id !== post.id))
                          }
                          aria-label="Delete forum post"
                          className="p-1 hover:text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setCommentDraft('');
                          setCommentDialog({ mode: 'forum-reply', targetId: post.id });
                        }}
                        aria-label="Reply in forum"
                        className="p-1 hover:text-[#1db3a8] cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleLikedId(post.id)}
                        aria-label="Like forum post"
                        className={`inline-flex items-center gap-1 p-1 cursor-pointer ${
                          liked ? 'text-[#28b5ac] font-bold' : 'hover:text-[#28b5ac]'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {likesTotal > 0 && <span>{likesTotal}</span>}
                      </button>
                    </div>
                  </div>

                  <NestedReplyList
                    replies={previewReplies}
                    likedIds={likedIds}
                    onToggleLike={toggleLikedId}
                    onReply={() => {
                      setCommentDraft('');
                      setCommentDialog({ mode: 'forum-reply', targetId: post.id });
                    }}
                    onDeleteOwn={(replyId) =>
                      setForumPosts((prev) =>
                        prev.map((p) =>
                          p.id === post.id
                            ? { ...p, replies: p.replies.filter((r) => r.id !== replyId) }
                            : p
                        )
                      )
                    }
                  />

                  {replies.length > 2 && (
                    <div className="mt-2 ml-8 sm:ml-10">
                      <button
                        type="button"
                        onClick={() => setViewAllThreadId(post.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1db3a8] hover:underline cursor-pointer"
                      >
                        <span>View All</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {forumPosts.length > 5 && (
            <div className="pt-1 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllForum((p) => !p)}
                className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] px-7 py-1.5 text-xs font-bold text-white cursor-pointer"
              >
                {showAllForum ? 'Show Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* COMMUNITY SCORE TAB */}
      {activeTab === 'community-score' && (
        <div className="rounded-2xl bg-[#effbfc] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {SCORE_TIER_FILTERS.map((tier) => {
                const active = communityTier === tier;
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => {
                      setCommunityTier(tier);
                      setShowAllCommunity(false);
                      triggerCommunityLoading();
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? 'bg-[#4bd5cc] text-white shadow-2xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-[#4bd5cc]'
                    }`}
                  >
                    {tier}
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setSortMenuOpen((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full border border-[#8ce2dc] bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#4bd5cc]" />
                <span>{activeSortObj.pillLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {sortMenuOpen && (
                <div className="absolute right-0 top-10 z-30 w-40 rounded-xl border border-slate-100 bg-white py-1 shadow-xl text-xs">
                  {COMMUNITY_SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setCommunitySort(opt.id);
                        setSortMenuOpen(false);
                        triggerCommunityLoading();
                      }}
                      className={`block w-full px-4 py-2.5 text-left border-b last:border-b-0 border-slate-100 cursor-pointer ${
                        communitySort === opt.id
                          ? 'font-bold text-[#0b4a7b]'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {communityLoading ? (
            <div className="py-10 flex items-center justify-center">
              <CyanBarsLoader label="Loading community scores" />
            </div>
          ) : (
            <div className="space-y-2.5">
              {visibleCommunityRows.map((item) => {
                const liked = likedIds.includes(item.id);
                const likesTotal = (item.likes || 0) + (liked ? 1 : 0);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#8ce2dc] bg-white px-4 py-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-[180px]">
                        <span className="w-8 h-8 rounded-full bg-[#4bd5cc] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </span>
                        <div className="leading-tight">
                          <p className="text-xs font-bold text-slate-800">{item.author}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 tabular-nums">
                            {item.timestamp}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#8ce2dc] pl-1 pr-3 py-0.5 text-xs font-bold text-[#1db3a8]">
                          <span className="w-5 h-5 rounded-full bg-[#38c6bd] text-white text-[10px] font-extrabold flex items-center justify-center">
                            {taskMeta.skill[0].toUpperCase()}
                          </span>
                          <span>{item.score}/90</span>
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setAiScorePreview(buildModalPayload(taskMeta, activeQuestion, item))
                          }
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#e39660] hover:bg-[#d78349] px-3.5 py-1 text-xs font-bold text-white transition cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Score</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setCommentDraft('');
                            setCommentDialog({ mode: 'community-reply', targetId: item.id });
                          }}
                          aria-label="Comment on community score"
                          className="p-1 hover:text-[#1db3a8] cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleLikedId(item.id)}
                          aria-label="Like community score"
                          className={`inline-flex items-center gap-1 p-1 cursor-pointer ${
                            liked ? 'text-[#28b5ac] font-bold' : 'hover:text-[#28b5ac]'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {likesTotal > 0 && <span>{likesTotal}</span>}
                        </button>
                      </div>
                    </div>

                    <NestedReplyList
                      replies={item.replies}
                      likedIds={likedIds}
                      onToggleLike={toggleLikedId}
                      onReply={() => {
                        setCommentDraft('');
                        setCommentDialog({ mode: 'community-reply', targetId: item.id });
                      }}
                      onDeleteOwn={(replyId) =>
                        setCommunityRows((prev) =>
                          prev.map((row) =>
                            row.id === item.id
                              ? { ...row, replies: row.replies.filter((r) => r.id !== replyId) }
                              : row
                          )
                        )
                      }
                    />
                  </div>
                );
              })}

              {filteredCommunityRows.length > 5 && (
                <div className="pt-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllCommunity((p) => !p)}
                    className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] px-7 py-1.5 text-xs font-bold text-white cursor-pointer"
                  >
                    {showAllCommunity ? 'Show Less' : 'View More'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* View All Forum Thread Modal */}
      {viewAllThread && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setViewAllThreadId(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#45d0c7] px-5 py-3 text-white flex items-center justify-between">
              <span className="w-6" />
              <h3 className="text-base font-extrabold">View All</h3>
              <button
                type="button"
                onClick={() => setViewAllThreadId(null)}
                aria-label="Close View All modal"
                className="w-6 h-6 rounded-full bg-white text-[#45d0c7] flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                <span
                  className="w-8 h-8 rounded-full text-white text-xs font-extrabold flex items-center justify-center"
                  style={{ backgroundColor: taskMeta.badgeColor }}
                >
                  {taskMeta.code}
                </span>
                <span className="text-sm font-bold text-slate-800">
                  #{activeQuestion.id} &nbsp; {activeQuestion.title}
                </span>
              </div>

              <div className="rounded-xl border border-[#8ce2dc] bg-white p-4">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#4bd5cc] text-white flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{viewAllThread.author}</span>
                        <span className="text-[11px] text-slate-400">{viewAllThread.createdAt}</span>
                        <span className="rounded bg-[#34d364] px-2 py-0.5 text-[10px] font-bold text-white">
                          {viewAllThread.badge}
                        </span>
                      </div>
                      {viewAllThread.text && <p className="text-slate-700">{viewAllThread.text}</p>}
                    </div>
                  </div>
                </div>

                <NestedReplyList
                  replies={viewAllThread.replies}
                  likedIds={likedIds}
                  onToggleLike={toggleLikedId}
                  onReply={() => {
                    setCommentDraft('');
                    setCommentDialog({ mode: 'forum-reply', targetId: viewAllThread.id });
                  }}
                  onDeleteOwn={(replyId) =>
                    setForumPosts((prev) =>
                      prev.map((p) =>
                        p.id === viewAllThread.id
                          ? { ...p, replies: p.replies.filter((r) => r.id !== replyId) }
                          : p
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unified Comment / Reply Modal */}
      {commentDialog && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setCommentDialog(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#45d0c7] px-5 py-3 text-white flex items-center justify-between">
              <span className="w-6" />
              <h3 className="text-base font-extrabold">Comment</h3>
              <button
                type="button"
                onClick={() => setCommentDialog(null)}
                aria-label="Close comment modal"
                className="w-6 h-6 rounded-full bg-white text-[#45d0c7] flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
            <form onSubmit={handleSubmitCommentModal} className="p-5 space-y-4">
              <textarea
                rows={5}
                value={commentDraft}
                onChange={(e) => setCommentDraft(e.target.value)}
                placeholder="Comment Here.."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#45d0c7]"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                {commentDialog.mode === 'new-post' ? (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-700">Category :</span>
                    {['Forum', 'Error', 'New Ques'].map((cat) => {
                      const active = commentCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCommentCategory(cat)}
                          className={`rounded-full px-4 py-1 text-xs font-semibold transition cursor-pointer ${
                            active
                              ? 'bg-slate-500 text-white'
                              : 'border border-[#7ce0d9] text-[#2cc3b9] hover:bg-[#effbfa]'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  className="rounded-full border border-[#7ce0d9] text-[#2cc3b9] hover:bg-[#effbfa] px-8 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Answer Link Modal */}
      {shareModalRow && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShareModalRow(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-[#e6f9f8] border-2 border-[#4bd5cc] text-[#4bd5cc] flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Answer Link Generated</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-sm mx-auto leading-relaxed">
              By sharing this, you are allowing others to access this score report with all your
              recorded responses.
            </p>
            <p className="text-xs text-slate-600 break-all px-2">
              {`https://ninetypte.com/v1/shared-user-score/${taskMeta.skill}/1/${shareModalRow.shareToken}`}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() =>
                  handleCopyShareLink(
                    `https://ninetypte.com/v1/shared-user-score/${taskMeta.skill}/1/${shareModalRow.shareToken}`
                  )
                }
                className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] py-2 text-xs font-bold text-white cursor-pointer"
              >
                {linkCopied ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                type="button"
                onClick={() => setShareModalRow(null)}
                className="rounded-full bg-[#ef3c2d] hover:bg-[#d82d1f] py-2 text-xs font-bold text-white cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl text-center space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#eb8c44] text-[#eb8c44] flex items-center justify-center">
              <Info className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Are you sure ?</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  onDeleteMyScore(deleteTargetId);
                  setDeleteTargetId(null);
                }}
                className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] py-2 text-xs font-bold text-white cursor-pointer"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="rounded-full bg-[#ef3c2d] hover:bg-[#d82d1f] py-2 text-xs font-bold text-white cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Score Row Note Modal */}
      {scoreCommentTarget && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setScoreCommentTarget(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#45d0c7] px-5 py-3 text-white flex items-center justify-between">
              <span className="w-6" />
              <h3 className="text-base font-extrabold">Comment</h3>
              <button
                type="button"
                onClick={() => setScoreCommentTarget(null)}
                aria-label="Close comment modal"
                className="w-6 h-6 rounded-full bg-white text-[#45d0c7] flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setScoreCommentTarget(null);
                triggerToast('Posted successfully!');
              }}
              className="p-5 space-y-4"
            >
              <textarea
                rows={4}
                value={scoreCommentText}
                onChange={(e) => setScoreCommentText(e.target.value)}
                placeholder="Comment Here.."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#45d0c7]"
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded-full border border-[#7ce0d9] text-[#2cc3b9] hover:bg-[#effbfa] px-10 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detailed AI Score Modal */}
      {aiScorePreview && (
        <ScoreAnalysisModal
          taskMeta={aiScorePreview.meta}
          row={aiScorePreview.row}
          onClose={() => setAiScorePreview(null)}
        />
      )}
    </section>
  );
}
