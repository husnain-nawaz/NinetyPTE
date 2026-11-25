import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Check,
  Copy,
  Crown,
  Gift,
  Globe,
  Link2,
  Minus,
  Plus,
  Send,
  Star,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  REFERRAL_CODE,
  REFERRAL_LINK,
  SHARE_EARN_FAQS,
  SHARE_EARN_TIERS,
} from './profileData';

const SHARE_STEPS = [
  {
    step: '1. Share Link',
    desc: 'Send your unique referral link to your friends',
    Icon: Link2,
    iconBg: 'bg-sky-100 text-sky-600',
  },
  {
    step: '2. Friends Joins',
    desc: 'They sign up & subscribe plan',
    Icon: Users,
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  {
    step: '3. You Earn',
    desc: 'Get FREE Credit Points',
    Icon: Gift,
    iconBg: 'bg-purple-100 text-purple-600',
  },
];

function RewardTierGrid({ tiers, Icon, iconClassName }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
      {tiers.map((tier) => (
        <div
          key={tier.label}
          className="rounded-xl border border-slate-200/80 bg-[#f8fbff] px-3.5 py-3 flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${iconClassName}`}>
              <Icon className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-medium text-slate-700 leading-snug">{tier.label}</span>
          </div>
          <span className="text-xs font-extrabold text-[#0c4a7e] shrink-0">{tier.points}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Share & Earn referral dashboard section inside /v1/profile/share-and-earn.
 */
export default function ShareAndEarnSection() {
  const [copied, setCopied] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [redeemNotice, setRedeemNotice] = useState('');

  const handleCopyReferral = () => {
    try {
      navigator.clipboard?.writeText(REFERRAL_LINK);
    } catch {
      // Ignore clipboard permission denial silently
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Main Referral Panel */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
          <div className="xl:col-span-6 space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                Share Your Referral Link
                <br />
                with Friends
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Share your referral link with friends. When they purchase a plan, you&apos;ll earn credit points based on their subscription.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Referral URL</span>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#eff6fc] px-3.5 py-2.5">
                <span className="text-xs font-semibold text-[#0c4a7e] truncate">{REFERRAL_LINK}</span>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  aria-label="Copy referral URL"
                  className="text-[#0c4a7e] hover:text-[#0097a7] shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {SHARE_STEPS.map(({ step, desc, Icon, iconBg }) => (
                <div
                  key={step}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2.5 flex items-center gap-3"
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{step}</p>
                    <p className="text-[11px] text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyReferral}
              className="w-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] py-2.5 px-6 text-xs sm:text-sm font-bold text-white shadow-sm transition cursor-pointer"
            >
              {copied ? 'Referral Link Copied!' : 'Share Referral Link'}
            </button>
          </div>

          <div className="xl:col-span-6 flex flex-col items-center text-center px-4 py-4">
            <div className="relative w-52 h-44 rounded-3xl bg-gradient-to-br from-[#eef7ff] via-[#f5f3ff] to-[#ecfeff] border border-sky-100 flex items-center justify-center shadow-2xs">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-sky-100 flex items-center justify-center text-[#0c4a7e]">
                <Gift className="w-8 h-8 text-[#7c3aed]" />
              </div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#6d28d9] text-white flex items-center justify-center shadow">
                <Check className="w-4 h-4" />
              </span>
              <span className="absolute right-4 top-5 w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-2xs">
                <Send className="w-4 h-4" />
              </span>
              <span className="absolute left-4 bottom-5 w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs">
                <UserPlus className="w-4 h-4" />
              </span>
            </div>
            <h3 className="mt-4 text-sm sm:text-base font-extrabold text-slate-800">
              Refer Friends &amp; Earn More Rewards
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm leading-relaxed">
              Share your referral link with friends and earn reward points whenever they purchase a plan. The more friends you invite, the more rewards you unlock.
            </p>
          </div>
        </div>

        {/* Points Summary */}
        <div className="rounded-xl bg-gradient-to-r from-[#e5f8f9] to-[#eef8fc] border border-cyan-100 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-white text-[#00a8bd] flex items-center justify-center shadow-2xs">
              <Star className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-slate-500">Available Points</p>
              <p className="text-sm font-extrabold text-[#0c4a7e]">0 Points</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRedeemNotice('Earn at least 4 points from a referral or renewal to redeem plan credit.')}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#00a8bd] hover:bg-[#008fa1] px-4 py-2 text-xs font-bold text-white transition cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Redeem Now</span>
          </button>
        </div>

        {redeemNotice && (
          <p className="rounded-lg bg-cyan-50 border border-cyan-200 px-3.5 py-2 text-xs font-medium text-[#0c4a7e]">
            {redeemNotice}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-[#0c4a7e]">0</p>
              <p className="text-[11px] text-slate-500">Used Points</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-[#0c4a7e]">0</p>
              <p className="text-[11px] text-slate-500">Total Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-800">Referral Reward</h3>
              <p className="text-[11px] text-slate-500">
                Earn credit points when your friend purchases a plan.
              </p>
            </div>
            <span className="rounded-lg bg-[#eef6fd] px-3 py-1 text-[11px] font-bold text-[#0c4a7e]">
              Referral Code: {REFERRAL_CODE}
            </span>
          </div>
          <RewardTierGrid tiers={SHARE_EARN_TIERS} Icon={Gift} iconClassName="bg-sky-100 text-[#0c4a7e]" />
        </section>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-2">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800">Self-Purchase Reward</h3>
            <p className="text-[11px] text-slate-500">
              Credit points you&apos;ll receive when purchasing a plan.
            </p>
          </div>
          <RewardTierGrid tiers={SHARE_EARN_TIERS} Icon={Crown} iconClassName="bg-cyan-100 text-[#00a8bd]" />
        </section>
      </div>

      {/* Point History */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-800">Point History</h3>
        <div className="py-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <Gift className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-700">Record Not Found</p>
          <p className="text-[11px] text-slate-400 mt-1">
            There are currently no point history available in this section.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-800">FAQs</h3>
        <div className="space-y-2.5">
          {SHARE_EARN_FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200/90 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-[13px] font-semibold text-slate-700 hover:bg-slate-50/70 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2.5 bg-slate-50/50">
                    {faq.a}{' '}
                    {idx === 6 && (
                      <Link to="/pricing" className="text-[#00a8bd] font-semibold hover:underline">
                        View Plans
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
