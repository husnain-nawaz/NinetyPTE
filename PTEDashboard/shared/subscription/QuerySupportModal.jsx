import { useState } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';
import { COUNTRY_DIAL_CODES } from '../profile/profileData';

const DIAL_FLAG_LABELS = {
  '+92': '🇵🇰 +92',
  '+91': '🇮🇳 +91',
  '+61': '🇦🇺 +61',
  '+44': '🇬🇧 +44',
  '+1': '🇺🇸 +1',
  '+971': '🇦🇪 +971',
  '+65': '🇸🇬 +65',
};

/**
 * Interactive "I Have a Query" modal opened after multiple scroll interactions on the
 * portal Buy Subscription page, supporting WhatsApp/Call or Email callback submission.
 */
export default function QuerySupportModal({ isOpen, onClose }) {
  const [contactMethod, setContactMethod] = useState('whatsapp'); // 'whatsapp' | 'email'
  const [countryCode, setCountryCode] = useState('+92');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [submittedNote, setSubmittedNote] = useState('');

  if (!isOpen) return null;

  const isWhatsApp = contactMethod === 'whatsapp';

  const handleSubmit = (e) => {
    e.preventDefault();
    const detail = isWhatsApp ? phoneNumber.trim() : emailAddress.trim();
    if (!detail) return;
    setSubmittedNote(
      isWhatsApp
        ? `Thanks! Our team will contact you shortly on ${countryCode} ${detail}.`
        : `Thanks! Our team will email you shortly at ${detail}.`
    );
    setTimeout(() => {
      setSubmittedNote('');
      setPhoneNumber('');
      setEmailAddress('');
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
        aria-labelledby="buy-query-modal-title"
        className="w-full max-w-[520px] rounded-2xl bg-white p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="buy-query-modal-title" className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]">
              I Have a Query
            </h2>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Need help or have a question? Choose your preferred contact method, and our team will
              get back to you soon.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close query dialog"
            className="w-6 h-6 rounded-full border border-[#0b4a7b]/40 text-[#0b4a7b] hover:bg-slate-50 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contact Method Picker */}
          <div className="space-y-2.5">
            <p className="text-xs sm:text-[13px] font-medium text-slate-600">
              Please connect me via:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setContactMethod('whatsapp')}
                className={`rounded-xl border px-4 py-3 flex items-center gap-3 text-left transition cursor-pointer ${
                  isWhatsApp
                    ? 'border-[#38c6bd] bg-white text-[#22b5b0]'
                    : 'border-slate-200 bg-slate-50/70 text-slate-500 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isWhatsApp ? 'bg-[#38c6bd] text-white' : 'bg-white border border-slate-200 text-slate-400'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-[13px] font-semibold">Whatsapp / Call</span>
              </button>

              <button
                type="button"
                onClick={() => setContactMethod('email')}
                className={`rounded-xl border px-4 py-3 flex items-center gap-3 text-left transition cursor-pointer ${
                  !isWhatsApp
                    ? 'border-[#38c6bd] bg-white text-[#22b5b0]'
                    : 'border-slate-200 bg-slate-50/70 text-slate-500 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    !isWhatsApp ? 'bg-[#38c6bd] text-white' : 'bg-white border border-slate-200 text-slate-400'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-[13px] font-semibold">Email Address</span>
              </button>
            </div>
          </div>

          {/* Phone Number or Email Address Input */}
          {isWhatsApp ? (
            <div className="relative rounded-xl border border-slate-200 bg-white flex items-center focus-within:border-[#38c6bd] transition">
              <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-400">
                Phone Number
              </span>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                aria-label="Country dial code"
                className="bg-transparent pl-3 pr-2 py-3 text-xs sm:text-[13px] font-semibold text-slate-700 focus:outline-none border-r border-slate-100 cursor-pointer"
              >
                {COUNTRY_DIAL_CODES.map((code) => (
                  <option key={code} value={code}>
                    {DIAL_FLAG_LABELS[code] || code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Your Phone Number"
                required
                className="flex-1 bg-transparent px-3.5 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          ) : (
            <div className="relative rounded-xl border border-slate-200 bg-white focus-within:border-[#38c6bd] transition">
              <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-400">
                Email Address
              </span>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter Your Email Address"
                required
                className="w-full bg-transparent px-3.5 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          )}

          {submittedNote && (
            <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-semibold text-emerald-700">
              {submittedNote}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="min-w-[130px] rounded-full border border-[#0b4a7b]/40 bg-white hover:bg-slate-50 px-6 py-2.5 text-xs font-bold text-slate-600 transition cursor-pointer"
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
