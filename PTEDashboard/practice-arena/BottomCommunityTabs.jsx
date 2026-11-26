import { useState } from 'react';
import {
  Calendar,
  Check,
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
import { INITIAL_FORUM_POSTS } from './practiceTaskCatalog';

const TABS = [
  { id: 'forum', label: 'Forum' },
  { id: 'my-score', label: 'My Score' },
  { id: 'community-score', label: 'Community Score' },
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
      duration: scoreItem.durationLabel || '00:24',
      questionText: activeQuestion.contentSnippet || taskMeta.promptText,
      scores: { Speaking: scoreItem.score },
      enablingSkills: [
        { label: 'Content', score: scoreItem.content },
        { label: 'Fluency', score: scoreItem.fluency },
        { label: 'Pronunciation', score: scoreItem.pronunciation },
      ],
      speechTokens: [{ text: activeQuestion.contentSnippet || taskMeta.promptText, status: 'good' }],
      wordStats: { good: 14, avg: 1, bad: 0, pauses: '/' },
    },
  };
}

/**
 * Shared Forum, My Score, and Community Score panel beneath every practice question,
 * including Share Link, Delete Confirm, Score Comment, and Categorized Forum Comment modals.
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
  const [showAllForum, setShowAllForum] = useState(false);
  const [likedPostIds, setLikedPostIds] = useState([]);

  const [shareModalRow, setShareModalRow] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [scoreCommentTarget, setScoreCommentTarget] = useState(null);
  const [scoreCommentText, setScoreCommentText] = useState('');
  const [forumCommentOpen, setForumCommentOpen] = useState(false);
  const [forumCategory, setForumCategory] = useState('Forum');
  const [forumDraft, setForumDraft] = useState('');
  const [aiScorePreview, setAiScorePreview] = useState(null);

  const visibleForumPosts = showAllForum ? forumPosts : forumPosts.slice(0, 5);

  const communityDemoScores = [
    {
      id: 'comm-1',
      author: 'Jacobs Chow',
      timestamp: '09:14 23/11/2026',
      score: 82,
      content: 84,
      fluency: 82,
      pronunciation: 80,
      likes: 4,
      liked: false,
    },
    {
      id: 'comm-2',
      author: 'HAZEL JEAN',
      timestamp: '11:42 21/11/2026',
      score: 76,
      content: 78,
      fluency: 75,
      pronunciation: 74,
      likes: 2,
      liked: false,
    },
  ];

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

  const handleAddForumPost = (e) => {
    e.preventDefault();
    if (!forumDraft.trim()) return;
    const now = new Date();
    const dateStamp = now.toLocaleDateString('en-GB');
    setForumPosts((prev) => [
      {
        id: `fp-${Date.now()}`,
        author: 'Student',
        createdAt: `${dateStamp} ${now.toTimeString().slice(0, 5)}`,
        dateOnly: dateStamp,
        badge: forumCategory === 'Error' ? 'Reported' : 'Appeared',
        text: forumDraft.trim(),
        likes: 0,
      },
      ...prev,
    ]);
    setForumDraft('');
    setForumCommentOpen(false);
  };

  const renderScoreRows = (rows, allowDelete = false) => (
    <div className="rounded-2xl bg-[#effbfc] p-4 space-y-2.5">
      {rows.map((item) => (
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
              onClick={() => setAiScorePreview(buildModalPayload(taskMeta, activeQuestion, item))}
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
              title="Download report"
              aria-label="Download report"
              className="p-1 hover:text-[#1db3a8] cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShareModalRow(item)}
              title="Share answer link"
              aria-label="Share answer link"
              className="p-1 hover:text-[#1db3a8] cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {allowDelete && (
              <button
                type="button"
                onClick={() => setDeleteTargetId(item.id)}
                title="Delete attempt"
                aria-label="Delete attempt"
                className="p-1 hover:text-rose-500 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setScoreCommentTarget(item);
                setScoreCommentText('');
              }}
              title="Add comment"
              aria-label="Comment on attempt"
              className="p-1 hover:text-[#1db3a8] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onToggleLikeScore?.(item.id)}
              title="Like response"
              aria-label="Like response"
              className={`inline-flex items-center gap-1 p-1 cursor-pointer ${
                item.liked ? 'text-[#28b5ac] font-bold' : 'text-slate-400 hover:text-[#28b5ac]'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {item.likes > 0 && <span className="text-xs">{item.likes}</span>}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="pt-2 space-y-4">
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

      {/* Tab Content Panel */}
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
            renderScoreRows(myScores, true)
          )}
        </div>
      )}

      {activeTab === 'forum' && (
        <div className="rounded-2xl bg-[#effbfc] p-5 space-y-3">
          <div className="flex justify-center pb-1">
            <button
              type="button"
              onClick={() => setForumCommentOpen(true)}
              className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] px-7 py-1.5 text-xs font-bold text-white shadow-2xs transition cursor-pointer"
            >
              Comment
            </button>
          </div>

          <div className="space-y-2">
            {visibleForumPosts.map((post) => {
              const liked = likedPostIds.includes(post.id);
              return (
                <div
                  key={post.id}
                  className="rounded-xl border border-[#bceee9] bg-white px-4 py-2.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-[#4bd5cc] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-slate-800">{post.author}</span>
                        <span className="text-[11px] text-slate-400">{post.createdAt}</span>
                        <span className="rounded bg-[#34d364] px-2 py-0.5 text-[10px] font-bold text-white">
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

                  <div className="flex items-center gap-2 text-slate-400 shrink-0">
                    <button
                      type="button"
                      onClick={() => setForumCommentOpen(true)}
                      aria-label="Reply in forum"
                      className="p-1 hover:text-[#1db3a8] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLikedPostIds((prev) =>
                          prev.includes(post.id) ? prev.filter((x) => x !== post.id) : [...prev, post.id]
                        )
                      }
                      aria-label="Like forum post"
                      className={`p-1 cursor-pointer ${
                        liked ? 'text-[#28b5ac]' : 'hover:text-[#28b5ac]'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                  </div>
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

      {activeTab === 'community-score' && renderScoreRows(communityDemoScores, false)}

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

      {/* Score Row Comment Modal */}
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

      {/* Forum Category Comment Modal */}
      {forumCommentOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setForumCommentOpen(false)}
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
                onClick={() => setForumCommentOpen(false)}
                aria-label="Close forum comment modal"
                className="w-6 h-6 rounded-full bg-white text-[#45d0c7] flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
            <form onSubmit={handleAddForumPost} className="p-5 space-y-4">
              <textarea
                rows={5}
                value={forumDraft}
                onChange={(e) => setForumDraft(e.target.value)}
                placeholder="Comment Here.."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#45d0c7]"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-700">Category :</span>
                  {['Forum', 'Error', 'New Ques'].map((cat) => {
                    const active = forumCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setForumCategory(cat)}
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
