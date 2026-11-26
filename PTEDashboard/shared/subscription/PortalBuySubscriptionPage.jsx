import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  HelpCircle,
  MessageSquarePlus,
  Minus,
  Phone,
  Plus,
  PlusCircle,
  Sparkles,
  Star,
  Target,
  Ticket,
  X,
} from 'lucide-react';
import PTEDashboardHeader from '../PTEDashboardHeader';
import PTEDashboardTealFooter from '../PTEDashboardTealFooter';
import { usePortal } from '../portalContext';
import PaymentReceiptModal from '../profile/PaymentReceiptModal';
import { PAYMENT_HISTORY_RECORDS } from '../profile/profileData';
import QuerySupportModal from './QuerySupportModal';
import RaiseTicketModal from './RaiseTicketModal';
import {
  BUY_SUBSCRIPTION_FAQS,
  MOCK_TEST_PACKS,
  PREMIUM_FEATURES_LEFT,
  PREMIUM_FEATURES_RIGHT,
  SUBSCRIPTION_PLANS,
} from './buySubscriptionData';

const PLAN_THEME_STYLES = {
  teal: {
    card: 'border-[#96e3dc] bg-gradient-to-b from-white via-[#f7fdfd] to-[#ebf9f8]',
    pill: 'bg-[#38c6bd] text-white',
    check: 'text-[#38c6bd]',
    button: 'bg-[#38c6bd] hover:bg-[#2bb4ab] text-white',
  },
  indigo: {
    card: 'border-[#c5bff6] bg-gradient-to-b from-white via-[#f9f8fe] to-[#efecfd]',
    pill: 'bg-[#6e63e8] text-white',
    check: 'text-[#6e63e8]',
    button: 'bg-[#6e63e8] hover:bg-[#5b50d6] text-white',
  },
  navy: {
    card: 'border-2 border-[#0b4a7b] bg-white shadow-xl',
    pill: 'bg-[#edf5fb] text-[#0b4a7b]',
    check: 'text-[#4f86b8]',
    button: 'bg-[#0b4a7b] hover:bg-[#08385f] text-white',
  },
  magenta: {
    card: 'border-[#f1b6ea] bg-gradient-to-b from-white via-[#fef7fd] to-[#fbeafd]',
    pill: 'bg-[#e458d6] text-white',
    check: 'text-[#e458d6]',
    button: 'bg-[#e458d6] hover:bg-[#ce42c0] text-white',
  },
};

const FEATURE_ICON_MAP = {
  sparkles: { Icon: Sparkles, cls: 'bg-[#e9f8fb] text-[#00a8bd]' },
  score: { Icon: FileCheck2, cls: 'bg-[#fdeef2] text-[#e14d67]' },
  award: { Icon: Award, cls: 'bg-[#f1edfe] text-[#7c5dfa]' },
  checklist: { Icon: ClipboardCheck, cls: 'bg-[#ebf9ef] text-[#2da44e]' },
  plus: { Icon: PlusCircle, cls: 'bg-[#fdeef8] text-[#d946a8]' },
  file: { Icon: FileText, cls: 'bg-[#e9f8f6] text-[#17a89a]' },
  doc: { Icon: FileText, cls: 'bg-[#edf4fb] text-[#0b4a7b]' },
  target: { Icon: Target, cls: 'bg-[#fef3ea] text-[#e07a2f]' },
};

function PlanOptionCard({ plan, onSelect }) {
  const theme = PLAN_THEME_STYLES[plan.theme] || PLAN_THEME_STYLES.teal;

  return (
    <div className="relative pt-4 flex flex-col">
      {plan.popular && (
        <div className="mx-auto -mb-2.5 z-10 w-4/5 rounded-t-xl bg-[#f25c54] py-1.5 px-4 text-center text-xs font-bold text-white inline-flex items-center justify-center gap-1.5 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-white" />
          <span>{plan.popularLabel}</span>
        </div>
      )}

      <div
        className={`flex-1 rounded-2xl border px-5 flex flex-col justify-between transition-all ${theme.card} ${
          plan.popular ? 'pt-7 pb-6' : 'py-5 shadow-xs'
        }`}
      >
        <div>
          <div className="flex justify-center">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-bold ${theme.pill}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-85" />
              <span>{plan.badge}</span>
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-center gap-1 text-slate-700">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              PKR
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-slate-800">
              {plan.whole}
            </span>
            <span className="text-xs font-bold text-slate-500">{plan.cents}</span>
          </div>

          <div
            className={`mt-5 space-y-2.5 text-xs text-slate-600 ${
              plan.popular ? 'rounded-xl bg-[#f4f8fc] p-4 border border-slate-100' : ''
            }`}
          >
            {plan.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2.5">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${theme.check}`} />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => onSelect(plan)}
            className={`w-full rounded-full py-2.5 px-4 text-xs sm:text-[13px] font-bold shadow-xs transition inline-flex items-center justify-center gap-2 cursor-pointer ${theme.button}`}
          >
            <span>{plan.ctaLabel}</span>
            {plan.popular && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCallout({ item, align = 'left' }) {
  const { Icon, cls } = FEATURE_ICON_MAP[item.icon] || FEATURE_ICON_MAP.sparkles;
  const isLeft = align === 'left';

  return (
    <div
      className={`flex items-start gap-3 ${
        isLeft ? 'lg:flex-row-reverse lg:text-right' : 'text-left'
      }`}
    >
      <div className="hidden lg:flex items-center pt-3 shrink-0 text-slate-300">
        {isLeft ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
      </div>

      <div className={`space-y-1 flex-1 ${isLeft ? 'lg:items-end lg:flex lg:flex-col' : ''}`}>
        <span className={`w-9 h-9 rounded-full flex items-center justify-center shadow-2xs ${cls}`}>
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-xs sm:text-[13px] font-bold text-slate-700 pt-1">{item.title}</h3>
        <p className="text-[11px] leading-relaxed text-slate-400 max-w-[240px]">{item.desc}</p>
      </div>
    </div>
  );
}

function ActionDialog({ title, subtitle, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[#0c4a7e]">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/**
 * In-portal Buy Subscription workspace (/v1/buy-subscription & /v1/core/buy-subscription),
 * matching the student portal subscription plans, mock packs, voucher redemption,
 * premium feature showcase, Stripe payment history, and FAQ layout.
 */
export default function PortalBuySubscriptionPage({ syncCoreMode = false }) {
  const { setPortalMode } = usePortal();
  const [activeTab, setActiveTab] = useState('subscription');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherStatus, setVoucherStatus] = useState('');
  const [ticketModalCategory, setTicketModalCategory] = useState(null);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [queryModalOpen, setQueryModalOpen] = useState(false);

  const hasShownQueryModalRef = useRef(false);
  const scrollBurstCountRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [setPortalMode, syncCoreMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        hasShownQueryModalRef.current ||
        selectedPlan ||
        voucherModalOpen ||
        ticketModalCategory ||
        selectedReceipt
      ) {
        return;
      }

      if (window.scrollY < 140) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current >= 250) {
        lastScrollTimeRef.current = now;
        scrollBurstCountRef.current += 1;
      }

      if (scrollBurstCountRef.current >= 3 || (scrollBurstCountRef.current >= 2 && window.scrollY >= 360)) {
        hasShownQueryModalRef.current = true;
        setQueryModalOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPlan, selectedReceipt, ticketModalCategory, voucherModalOpen]);

  const plans = activeTab === 'mock-tests' ? MOCK_TEST_PACKS : SUBSCRIPTION_PLANS;

  const handleVoucherSubmit = (e) => {
    e.preventDefault();
    const trimmed = voucherCode.trim();
    if (!trimmed) return;
    setVoucherStatus(`Voucher "${trimmed.toUpperCase()}" validated and ready to apply at checkout.`);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
        {/* Top Support Pill Actions */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setTicketModalCategory('Technical')}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0b4a7b] hover:bg-[#08385f] text-white px-4 py-1.5 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Raise A Ticket</span>
          </button>
          <button
            type="button"
            onClick={() => setTicketModalCategory('Billing & Payment')}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0b4a7b] hover:bg-[#08385f] text-white px-4 py-1.5 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>
        </div>

        {/* Hero Heading + Segmented Tabs + Pricing Cards */}
        <section className="space-y-6">
          <div className="relative text-center max-w-2xl mx-auto space-y-2.5">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-700">
              Your <span className="text-[#22b5b0]">PTE Success</span> Starts Here
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
              Choose a plan tailored to your target score and timeline, featuring flexible durations,
              unlimited practice, and AI-powered feedback.
            </p>

            {/* Decorative Curved Guide Arrow */}
            <svg
              aria-hidden="true"
              className="hidden md:block w-16 h-16 text-[#7c5dfa] absolute -right-10 top-8 pointer-events-none"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M10 12 C 52 10, 62 38, 60 66"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <path
                d="M54 58 L60 68 L67 59"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-2xs text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('subscription')}
                className={`rounded-full px-5 py-2 transition cursor-pointer ${
                  activeTab === 'subscription'
                    ? 'bg-[#0b4a7b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0b4a7b]'
                }`}
              >
                Subscription
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mock-tests')}
                className={`rounded-full px-5 py-2 transition cursor-pointer ${
                  activeTab === 'mock-tests'
                    ? 'bg-[#0b4a7b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0b4a7b]'
                }`}
              >
                Mock Tests
              </button>
              <Link
                to="/book-exam"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-slate-600 hover:text-[#0b4a7b] transition"
              >
                <Ticket className="w-3.5 h-3.5 text-[#0b4a7b]" />
                <span>Book Exam</span>
                <span className="rounded-full bg-[#38c6bd] px-2 py-0.5 text-[10px] font-extrabold text-white">
                  Save Rs 7,100
                </span>
              </Link>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              activeTab === 'subscription' ? 'lg:grid-cols-4' : 'lg:grid-cols-3 max-w-4xl mx-auto'
            } gap-5 items-stretch pt-2`}
          >
            {plans.map((plan) => (
              <PlanOptionCard
                key={plan.id}
                plan={plan}
                onSelect={(chosen) => {
                  setCheckoutDone(false);
                  setSelectedPlan(chosen);
                }}
              />
            ))}
          </div>

          {/* Voucher Strip */}
          <div className="max-w-3xl mx-auto rounded-xl border border-dashed border-[#6ee7de] bg-[#effbfa] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0c4a7e]">
              <Ticket className="w-4 h-4 text-[#0c4a7e]" />
              <span>Have a voucher?</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setVoucherStatus('');
                setVoucherModalOpen(true);
              }}
              className="rounded-full bg-[#0b4a7b] hover:bg-[#08385f] text-white px-5 py-1.5 text-xs font-bold transition cursor-pointer"
            >
              Pay With Voucher
            </button>
          </div>
        </section>

        {/* Bulk Purchase Business Banner */}
        <section className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#cfeff0] via-[#ddeefc] to-[#d9ebfd] px-6 sm:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs relative overflow-hidden">
          <div className="space-y-4 relative z-10 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-700 leading-snug">
              Are You a Business Looking
              <br />
              to <span className="text-[#20b5b0]">Purchase in Bulk?</span>
            </h2>
            <button
              type="button"
              onClick={() => setTicketModalCategory('Bulk & Partner Inquiry')}
              className="rounded-full bg-[#0b4a7b] hover:bg-[#08385f] text-white px-6 py-2 text-xs font-bold transition cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-white/75 backdrop-blur-xs border border-white rounded-2xl px-5 py-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-[#0b4a7b] text-white flex items-center justify-center shrink-0">
              <MessageSquarePlus className="w-5 h-5" />
            </span>
            <div className="text-left">
              <p className="text-xs font-extrabold text-[#0c4a7e]">Institute &amp; Trainer Packs</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Custom seat volumes &amp; voucher billing
              </p>
            </div>
          </div>
        </section>

        {/* Unlock Premium Features Hub */}
        <section className="py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-6">
              {PREMIUM_FEATURES_LEFT.map((item) => (
                <FeatureCallout key={item.id} item={item} align="left" />
              ))}
            </div>

            <div className="lg:col-span-4 flex justify-center py-4">
              <div className="w-52 h-52 rounded-full bg-gradient-to-b from-[#d8f3f9] via-[#eaf8fc] to-white p-5 shadow-[0_0_50px_rgba(56,198,189,0.22)] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white border border-cyan-100 flex flex-col items-center justify-center text-center shadow-inner px-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    UNLOCK
                  </span>
                  <span className="text-lg font-extrabold text-[#22b5b0] leading-tight mt-0.5">
                    PREMIUM
                  </span>
                  <span className="text-lg font-extrabold text-[#0b4a7b] leading-tight">
                    FEATURES
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {PREMIUM_FEATURES_RIGHT.map((item) => (
                <FeatureCallout key={item.id} item={item} align="right" />
              ))}
            </div>
          </div>
        </section>

        {/* Payment History */}
        <section className="max-w-3xl mx-auto space-y-4">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-700">Payment History</h2>
            <p className="text-xs text-slate-400 mt-1">Your PTE Plan Transactions</p>
          </div>

          <div className="space-y-3">
            {PAYMENT_HISTORY_RECORDS.map((record) => (
              <button
                key={record.id}
                type="button"
                onClick={() => setSelectedReceipt(record)}
                className="w-full rounded-xl border border-slate-200/90 bg-white px-5 py-4 hover:border-[#00b4c6] transition flex flex-wrap items-center justify-between gap-4 text-left shadow-2xs cursor-pointer"
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

        {/* Frequently Asked Questions */}
        <section className="max-w-3xl mx-auto space-y-5 pb-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-700">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Get clear answers about pricing, access, features, upgrades, and how each plan works.
            </p>
            <div className="w-16 h-0.5 bg-[#38c6bd] mx-auto rounded-full pt-0.5" />
          </div>

          <div className="space-y-3">
            {BUY_SUBSCRIPTION_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-[13px] font-semibold text-slate-700 hover:bg-slate-50/70 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />

      <PaymentReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />

      {selectedPlan && (
        <ActionDialog
          title={`Confirm ${selectedPlan.badge}`}
          subtitle="NinetyPTE Instant Activation Checkout"
          onClose={() => setSelectedPlan(null)}
        >
          <div className="rounded-xl bg-[#f4f8fc] border border-slate-200/80 p-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">{selectedPlan.badge}</span>
            <span className="text-base font-extrabold text-[#0b4a7b]">
              PKR {selectedPlan.whole}
              {selectedPlan.cents}
            </span>
          </div>
          {checkoutDone ? (
            <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-semibold text-emerald-700">
              Checkout session initialized for {selectedPlan.badge}. Your plan summary is ready.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setCheckoutDone(true)}
              className="w-full rounded-full bg-[#0b4a7b] hover:bg-[#08385f] py-2.5 text-xs font-bold text-white transition cursor-pointer"
            >
              Proceed to Payment
            </button>
          )}
        </ActionDialog>
      )}

      {voucherModalOpen && (
        <ActionDialog
          title="Pay With Voucher"
          subtitle="Enter your NinetyPTE plan or partner voucher code."
          onClose={() => setVoucherModalOpen(false)}
        >
          <form onSubmit={handleVoucherSubmit} className="space-y-3">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Enter voucher code (e.g. NP60DAYS)"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
            />
            {voucherStatus && (
              <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-xs font-semibold text-emerald-700">
                {voucherStatus}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-[#0b4a7b] hover:bg-[#08385f] py-2.5 text-xs font-bold text-white transition cursor-pointer"
            >
              Apply Voucher
            </button>
          </form>
        </ActionDialog>
      )}

      <RaiseTicketModal
        isOpen={Boolean(ticketModalCategory)}
        initialCategory={ticketModalCategory || 'Technical'}
        onClose={() => setTicketModalCategory(null)}
      />

      <QuerySupportModal isOpen={queryModalOpen} onClose={() => setQueryModalOpen(false)} />
    </div>
  );
}
