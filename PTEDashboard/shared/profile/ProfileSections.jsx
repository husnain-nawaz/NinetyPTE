import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart2,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  LayoutGrid,
  Mail,
  MessageCircle,
  Mic,
  PenLine,
  Sparkles,
  TrendingUp,
  Video,
} from 'lucide-react';
import { getStoredUser } from '../../../frontend/src/utils/auth';
import PaymentReceiptModal from './PaymentReceiptModal';
import {
  COUNTRY_DIAL_CODES,
  FREE_PLAN_FEATURES,
  PAYMENT_HISTORY_RECORDS,
  PREMIUM_PLAN_FEATURES,
  PROFILE_USER_DEFAULTS,
} from './profileData';

const PROFILE_PREFS_KEY = 'ninetypte_student_profile_prefs';

const FEATURE_ICONS = {
  file: FileText,
  sparkles: Sparkles,
  chart: TrendingUp,
  grid: LayoutGrid,
  video: Video,
  doc: FileText,
  calendar: Calendar,
  layout: LayoutGrid,
  pen: PenLine,
  clock: Clock,
};

function loadSavedPrefs() {
  try {
    const raw = localStorage.getItem(PROFILE_PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePrefs(patch) {
  try {
    const next = { ...loadSavedPrefs(), ...patch };
    localStorage.setItem(PROFILE_PREFS_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures
  }
}

function TogglePreferenceRow({ Icon, label, enabled, onToggle }) {
  return (
    <div className="rounded-xl border border-slate-200/90 px-4 sm:px-5 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-xs sm:text-[13.5px] font-medium text-slate-600">
        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
        <span>{label}</span>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
          enabled ? 'bg-[#0d5488]' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
            enabled ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function PlanComparisonCard({ title, badgeLabel, features, isActivePlan, ctaLabel }) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col justify-between space-y-5 ${
        isActivePlan
          ? 'border-2 border-[#d946ef] bg-[#fdf6fc]'
          : 'border border-slate-200/90 bg-white'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={`text-sm font-extrabold uppercase tracking-wide ${
              isActivePlan ? 'text-[#a21caf]' : 'text-slate-700'
            }`}
          >
            {title}
          </h3>
          {badgeLabel && (
            <span className="rounded-full bg-[#a21caf] px-3 py-0.5 text-[11px] font-bold text-white">
              {badgeLabel}
            </span>
          )}
        </div>

        <ul className="space-y-3 text-xs text-slate-600">
          {features.map((feat) => {
            const Icon = FEATURE_ICONS[feat.icon] || FileText;
            return (
              <li key={feat.key} className="flex items-center gap-2.5">
                <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  {feat.label}
                  {feat.highlight && (
                    <strong className="text-[#c026d3] ml-1">{feat.highlight}</strong>
                  )}
                  {feat.boldValue && (
                    <strong className="text-slate-900 ml-1">{feat.boldValue}</strong>
                  )}
                  {feat.suffix}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {ctaLabel && (
        <div>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#a21caf] to-[#c026d3] hover:from-[#86198f] hover:to-[#a21caf] px-7 py-2 text-xs font-bold text-white shadow-sm transition"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

export function ProfileDetailsSection() {
  const user = getStoredUser() || {};
  const saved = loadSavedPrefs();

  const [name, setName] = useState(saved.name ?? user.name ?? 'NinetyPTE Student');
  const [countryCode, setCountryCode] = useState(saved.countryCode || PROFILE_USER_DEFAULTS.countryCode);
  const [phone, setPhone] = useState(saved.phone ?? PROFILE_USER_DEFAULTS.phoneNumber);
  const [email, setEmail] = useState(saved.email ?? user.email ?? 'student@ninetypte.com');
  const [address, setAddress] = useState(saved.address ?? PROFILE_USER_DEFAULTS.address);
  const [savedMessage, setSavedMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    savePrefs({ name, countryCode, phone, email, address });
    setSavedMessage('Profile details updated successfully.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#d2e7f7] to-[#e9f4fc] p-5 flex flex-wrap items-center gap-4">
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-xl font-extrabold shadow-sm border-2 border-white">
          {(name || 'N').charAt(0).toUpperCase()}
          <span className="absolute right-0 bottom-0 w-5 h-5 rounded-full bg-white text-[#0c4a7e] flex items-center justify-center shadow">
            <PenLine className="w-3 h-3" />
          </span>
        </div>

        <div className="leading-snug">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0c4a7e]">{name || 'Student'}</h2>
          <p className="text-xs text-slate-600 mt-0.5">User {PROFILE_USER_DEFAULTS.studentId}</p>
          <p className="text-xs text-slate-500">Expiry Date: {PROFILE_USER_DEFAULTS.expiryDate}</p>
          <p className="text-xs text-slate-500">Login Type: {PROFILE_USER_DEFAULTS.loginType}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="profile-name" className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-500">
              Your Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
            />
          </div>

          <div className="flex items-stretch gap-2.5">
            <div className="relative w-32 shrink-0">
              <label htmlFor="profile-country-code" className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-500">
                Your Number
              </label>
              <select
                id="profile-country-code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full h-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
              >
                {COUNTRY_DIAL_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="tel"
              aria-label="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="profile-email" className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-500">
              Email Address
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-500 focus:outline-none focus:border-[#00b4c6]"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="profile-address" className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-slate-500">
            Address
          </label>
          <textarea
            id="profile-address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
          />
        </div>

        {savedMessage && (
          <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-semibold text-emerald-700">
            {savedMessage}
          </p>
        )}

        <button
          type="submit"
          className="rounded-full bg-[#0d5488] hover:bg-[#093e66] px-8 py-2 text-xs sm:text-sm font-bold text-white transition cursor-pointer"
        >
          Update
        </button>
      </form>
    </section>
  );
}

export function ProfileNotificationSection() {
  const saved = loadSavedPrefs();
  const [whatsappEnabled, setWhatsappEnabled] = useState(saved.whatsappNotif ?? true);
  const [emailEnabled, setEmailEnabled] = useState(saved.emailNotif ?? true);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-4">
      <h2 className="text-base font-extrabold text-slate-800">Notification</h2>
      <TogglePreferenceRow
        Icon={MessageCircle}
        label="WhatsApp Notification"
        enabled={whatsappEnabled}
        onToggle={() => {
          const next = !whatsappEnabled;
          setWhatsappEnabled(next);
          savePrefs({ whatsappNotif: next });
        }}
      />
      <TogglePreferenceRow
        Icon={Mail}
        label="Email Notification"
        enabled={emailEnabled}
        onToggle={() => {
          const next = !emailEnabled;
          setEmailEnabled(next);
          savePrefs({ emailNotif: next });
        }}
      />
    </section>
  );
}

export function ProfilePlanInfoSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-5">
      <h2 className="text-base font-extrabold text-slate-800">Plan Information</h2>

      <div className="rounded-xl bg-gradient-to-r from-[#d2e7f7] to-[#e9f4fc] px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-slate-600">Active Plan</p>
          <p className="text-sm sm:text-base font-extrabold text-[#0c4a7e]">
            {PROFILE_USER_DEFAULTS.planName}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-medium text-slate-600">
            Expiry On {PROFILE_USER_DEFAULTS.expiryDate}
          </p>
          <span className="mt-1 inline-block rounded-lg bg-white px-3 py-0.5 text-xs font-extrabold text-[#0c4a7e] shadow-2xs">
            {PROFILE_USER_DEFAULTS.daysRemaining}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PlanComparisonCard
          title="PREMIUM"
          badgeLabel="Active Plan"
          features={PREMIUM_PLAN_FEATURES}
          isActivePlan
          ctaLabel="Renew Now"
        />
        <PlanComparisonCard
          title="FREE"
          features={FREE_PLAN_FEATURES}
          isActivePlan={false}
        />
      </div>
    </section>
  );
}

export function ProfilePaymentHistorySection() {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  return (
    <>
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-4">
        <h2 className="text-base font-extrabold text-slate-800">Payment History</h2>

        <div className="space-y-3">
          {PAYMENT_HISTORY_RECORDS.map((record) => (
            <button
              key={record.id}
              type="button"
              onClick={() => setSelectedReceipt(record)}
              className="w-full rounded-xl border border-slate-200/90 px-4 sm:px-5 py-4 hover:border-[#00b4c6] hover:bg-slate-50/50 transition flex flex-wrap items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-lg font-black tracking-tight text-[#635bff] shrink-0">
                  stripe
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#0c4a7e] truncate">{record.displayId}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{record.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-xs">
                <span className="text-slate-500">{record.item}</span>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                  {record.status}
                </span>
                <span className="font-extrabold text-[#0c4a7e]">{record.amountDisplay}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <PaymentReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
    </>
  );
}

export function ProfileSettingsSection() {
  const saved = loadSavedPrefs();
  const [audioPrivacy, setAudioPrivacy] = useState(saved.audioPrivacy ?? false);
  const [displayDifficulty, setDisplayDifficulty] = useState(saved.displayDifficulty ?? true);

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-4">
      <h2 className="text-base font-extrabold text-slate-800">Settings</h2>
      <TogglePreferenceRow
        Icon={Mic}
        label="Audio Privacy Control"
        enabled={audioPrivacy}
        onToggle={() => {
          const next = !audioPrivacy;
          setAudioPrivacy(next);
          savePrefs({ audioPrivacy: next });
        }}
      />
      <TogglePreferenceRow
        Icon={BarChart2}
        label="Display Difficult Level (Practice Questions)"
        enabled={displayDifficulty}
        onToggle={() => {
          const next = !displayDifficulty;
          setDisplayDifficulty(next);
          savePrefs({ displayDifficulty: next });
        }}
      />
    </section>
  );
}

export function ProfileResetSection() {
  const [confirmText, setConfirmText] = useState('');
  const [includeMockTests, setIncludeMockTests] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const canReset = confirmText.trim() === 'RESET';

  const handleReset = (e) => {
    e.preventDefault();
    if (!canReset) return;
    setConfirmText('');
    setResetMessage(
      includeMockTests
        ? 'Account practice history and mock test records have been reset.'
        : 'Account practice history has been reset.'
    );
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-4">
      <h2 className="text-base font-extrabold text-slate-800">Reset Profile</h2>

      <form onSubmit={handleReset} className="space-y-4 max-w-lg">
        <p className="text-xs text-slate-600">To reset your account, Type &ldquo;RESET&rdquo; here.</p>

        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="RESET"
          aria-label="Type RESET to confirm"
          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
        />

        <div className="flex items-center gap-2 text-xs font-medium text-rose-500">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>This will delete all your practice history. You cannot undo this action.</span>
        </div>

        <label className="inline-flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={includeMockTests}
            onChange={(e) => setIncludeMockTests(e.target.checked)}
            className="rounded border-slate-300 text-[#0d5488] focus:ring-[#0d5488]"
          />
          <span>Include mock tests</span>
        </label>

        {resetMessage && (
          <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-semibold text-emerald-700">
            {resetMessage}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={!canReset}
            className={`rounded-full px-6 py-2 text-xs sm:text-sm font-bold text-white transition ${
              canReset
                ? 'bg-[#0d5488] hover:bg-[#093e66] cursor-pointer'
                : 'bg-[#94adc2] cursor-not-allowed'
            }`}
          >
            Reset Account
          </button>
        </div>
      </form>
    </section>
  );
}

export function ProfileDeleteSection() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-3">
      <h2 className="text-base font-extrabold text-slate-800">Delete Profile</h2>
      <p className="text-xs sm:text-sm text-slate-600">
        You cannot delete this profile as it has an active subscription.
      </p>
    </section>
  );
}
