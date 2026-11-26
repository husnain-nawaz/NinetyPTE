import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Upload, X } from 'lucide-react';

const TICKET_CATEGORIES = [
  'Technical',
  'Billing & Payment',
  'Subscription Access',
  'Bulk & Partner Inquiry',
  'Mock Tests',
  'Other',
];

/**
 * Raise A Ticket / Contact Us dialog featuring Title, Category select,
 * Message textarea, and optional dashed file attachment upload zone.
 */
export default function RaiseTicketModal({ isOpen, initialCategory = 'Technical', onClose }) {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [submittedNotice, setSubmittedNotice] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory || 'Technical');
      setSubmittedNotice('');
    }
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    setSubmittedNotice(
      `Your ${category.toLowerCase()} message has been sent to the NinetyPTE support team.`
    );
    setTimeout(() => {
      setSubmittedNotice('');
      setTitle('');
      setMessage('');
      setAttachedFile(null);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="raise-ticket-modal-title"
        className="w-full max-w-[540px] rounded-2xl bg-white p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="raise-ticket-modal-title" className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]">
              Contact Us
            </h2>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Need help or found an issue? Send us your message and our team will get back to you
              soon.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket dialog"
            className="w-6 h-6 rounded-full border border-[#0b4a7b]/40 text-[#0b4a7b] hover:bg-slate-50 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            aria-label="Ticket title"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0b4a7b]"
          />

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Ticket category"
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-xs sm:text-[13px] text-slate-700 focus:outline-none focus:border-[#0b4a7b] cursor-pointer"
            >
              {TICKET_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#0b4a7b] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            aria-label="Ticket message"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0b4a7b]"
          />

          {/* Dashed Optional File Upload Box */}
          <div className="rounded-xl border border-dashed border-[#4e86b7] bg-white px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-[#eff6fc] text-[#0b4a7b] flex items-center justify-center shrink-0">
                <Upload className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0b4a7b] truncate">
                  {attachedFile ? attachedFile.name : 'Upload File (Optional)'}
                </p>
                <p className="text-[10.5px] text-slate-400 mt-0.5">
                  Images (Max 1MB) • Docs (Max 2MB) • Videos (Max 10MB)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {attachedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setAttachedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  aria-label="Remove attached file"
                  className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-5 py-1.5 text-xs font-semibold text-[#0b4a7b] shadow-2xs transition cursor-pointer"
              >
                Browse
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt,video/*"
                onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                className="sr-only"
              />
            </div>
          </div>

          {submittedNotice && (
            <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-semibold text-emerald-700">
              {submittedNotice}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-w-[130px] rounded-full border border-[#0b4a7b] bg-white hover:bg-slate-50 px-6 py-2.5 text-xs font-bold text-[#0b4a7b] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-w-[130px] rounded-full bg-[#0b4a7b] hover:bg-[#08385f] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
