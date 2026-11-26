import { useState } from 'react';
import { X } from 'lucide-react';
import PhoneDialField from './PhoneDialField';

/**
 * Institute Software Sales / Bulk Purchase Inquiry "Contact Us" modal featuring
 * Business Name, Email Address, Phone Number (with country dial selector), and Message.
 */
export default function InstituteSalesModal({ isOpen, onClose }) {
  const [businessName, setBusinessName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [countryCode, setCountryCode] = useState('+92');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submittedNote, setSubmittedNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!businessName.trim() || !emailAddress.trim() || !phoneNumber.trim() || !message.trim()) {
      return;
    }
    setSubmittedNote(
      `Thank you, ${businessName.trim()}! Our NinetyPTE software sales team will contact you shortly.`
    );
    setTimeout(() => {
      setSubmittedNote('');
      setBusinessName('');
      setEmailAddress('');
      setPhoneNumber('');
      setMessage('');
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
        aria-labelledby="institute-sales-modal-title"
        className="w-full max-w-[540px] rounded-2xl bg-white p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="institute-sales-modal-title"
            className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]"
          >
            Contact Us
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sales dialog"
            className="w-6 h-6 rounded-full border border-[#0b4a7b]/40 text-[#0b4a7b] hover:bg-slate-50 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
            aria-label="Business Name"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0b4a7b]"
          />

          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Email Address"
            aria-label="Email Address"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0b4a7b]"
          />

          <PhoneDialField
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            phoneNumber={phoneNumber}
            onPhoneNumberChange={setPhoneNumber}
          />

          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            aria-label="Sales inquiry message"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0b4a7b]"
          />

          {submittedNote && (
            <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-semibold text-emerald-700">
              {submittedNote}
            </p>
          )}

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
