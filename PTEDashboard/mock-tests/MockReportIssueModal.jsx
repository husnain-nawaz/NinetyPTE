import { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { getStoredUser } from '../../frontend/src/utils/auth';

/**
 * Floating confirmation toast displayed after submitting an issue report
 * or copying a shareable Mock Test Score Report link.
 */
export function MockActionToast({ message }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 right-4 z-[90] w-[300px] rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2"
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </span>
        <p className="text-xs sm:text-[13px] font-medium text-slate-700">{message}</p>
      </div>
      <div className="h-1 w-full bg-slate-100">
        <div className="h-full w-2/5 bg-emerald-500" />
      </div>
    </div>
  );
}

/**
 * Modal form allowing candidates to submit issue reports or feedback from the
 * end-of-mock-test completion screen or the Mock Test Score Report header.
 */
export default function MockReportIssueModal({ contextTitle = '', onClose, onSubmitted }) {
  const storedUser = getStoredUser() || {};
  const [email, setEmail] = useState(storedUser.email || 'student@ninetypte.com');
  const [issueText, setIssueText] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issueText.trim()) {
      setErrorText('Please enter your issue');
      return;
    }

    setErrorText('');
    onSubmitted?.({
      email: email.trim() || 'student@ninetypte.com',
      issue: issueText.trim(),
      contextTitle,
      submittedAt: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mock-report-modal-title"
    >
      <div
        className="relative w-full max-w-[520px] rounded-2xl bg-white p-6 sm:p-8 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 id="mock-report-modal-title" className="text-lg font-bold text-[#0b4a7b]">
              Report
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Report any issue or feedback to help us improve your experience.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report modal"
            className="w-7 h-7 rounded-full border border-[#0b4a7b]/40 text-[#0b4a7b] hover:bg-slate-50 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-1">
          <div className="relative">
            <label
              htmlFor="report-email-input"
              className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-500"
            >
              Email Address
            </label>
            <input
              id="report-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0b4a7b]"
            />
          </div>

          <div className="space-y-1">
            <div className="relative">
              <label
                htmlFor="report-issue-input"
                className={`absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium ${
                  errorText ? 'text-rose-500' : 'text-slate-500'
                }`}
              >
                Issue
              </label>
              <textarea
                id="report-issue-input"
                rows={4}
                value={issueText}
                onChange={(e) => {
                  setIssueText(e.target.value);
                  if (errorText) setErrorText('');
                }}
                placeholder="Describe what happened..."
                className={`w-full rounded-xl border px-3.5 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none resize-none ${
                  errorText
                    ? 'border-rose-500 focus:border-rose-600'
                    : 'border-slate-200 focus:border-[#0b4a7b]'
                }`}
              />
            </div>
            {errorText && <p className="text-[11px] font-medium text-rose-500 pl-1">{errorText}</p>}
          </div>

          <div className="flex justify-center pt-1">
            <button
              type="submit"
              className="min-w-[160px] rounded-full bg-[#0b4a7b] hover:bg-[#08385f] px-8 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
