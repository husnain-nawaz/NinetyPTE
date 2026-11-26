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
 * Reusable floating-label Phone Number control with country dial code selector.
 */
export default function PhoneDialField({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  focusBorderClass = 'focus-within:border-[#0b4a7b]',
}) {
  return (
    <div
      className={`relative rounded-xl border border-slate-200 bg-white flex items-center transition ${focusBorderClass}`}
    >
      <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-500">
        Phone Number
      </span>
      <select
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
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
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        placeholder="Enter Your Phone Number"
        required
        className="flex-1 bg-transparent px-3.5 py-3 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  );
}
