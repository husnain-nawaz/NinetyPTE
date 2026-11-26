import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Headphones,
  Mail,
  MessageCircle,
  MessageSquare,
  Minus,
  Monitor,
  Phone,
  Plus,
  Send,
} from 'lucide-react';
import PTEDashboardHeader from '../PTEDashboardHeader';
import PTEDashboardTealFooter from '../PTEDashboardTealFooter';
import { usePortal } from '../portalContext';
import QuerySupportModal from '../subscription/QuerySupportModal';
import RaiseTicketModal from '../subscription/RaiseTicketModal';
import InstituteSalesModal from '../subscription/InstituteSalesModal';
import {
  DIRECT_CONTACT_DETAILS,
  HELP_DESK_CHANNELS,
  HELP_DESK_FAQS,
  HELP_DESK_FAQ_TABS,
} from './helpDeskData';

const CHANNEL_ICONS = {
  chat: MessageCircle,
  mail: MessageSquare,
  monitor: Monitor,
};

/**
 * In-portal Help Desk & Contact workspace (/v1/contact & /v1/core/contact),
 * presenting direct support channels, Telegram/WhatsApp communities, and categorized FAQs.
 */
export default function PortalHelpDeskPage({ syncCoreMode = false }) {
  const { portalMode, setPortalMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const faqLinks = {
    vocab: isCoreMode ? '/v1/core/vocab-bank' : '/v1/vocab-bank',
    'mock-tests': isCoreMode ? '/pte-core-mock-test' : '/mock-tests',
    subscription: isCoreMode ? '/v1/core/buy-subscription' : '/v1/buy-subscription',
  };

  const [activeFaqTab, setActiveFaqTab] = useState('Practice');
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [ticketCategory, setTicketCategory] = useState(null);
  const [salesModalOpen, setSalesModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [setPortalMode, syncCoreMode]);

  const currentFaqs = HELP_DESK_FAQS[activeFaqTab] || [];

  const handleChannelClick = (channelId) => {
    if (channelId === 'sales') {
      setSalesModalOpen(true);
    } else {
      setTicketCategory('Technical');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Page Heading */}
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
            <Headphones className="w-4 h-4" />
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">Help Desk</h1>
        </div>

        {/* 3 Support Channel Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HELP_DESK_CHANNELS.map((channel) => {
            const ChannelIcon = CHANNEL_ICONS[channel.icon] || MessageSquare;
            return (
              <div
                key={channel.id}
                className={`rounded-2xl border p-5 sm:p-6 flex flex-col justify-between gap-6 shadow-2xs relative overflow-hidden ${channel.cardClass}`}
              >
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${channel.iconClass}`}
                    >
                      <ChannelIcon className="w-4 h-4" />
                    </span>
                    <h2 className={`text-sm sm:text-base font-extrabold ${channel.titleClass}`}>
                      {channel.title}
                    </h2>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-[260px]">
                    {channel.desc}
                  </p>
                </div>

                <div className="relative z-10">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block rounded-full px-5 py-2 text-xs font-bold shadow-2xs transition ${channel.btnClass}`}
                    >
                      {channel.buttonLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleChannelClick(channel.id)}
                      className={`rounded-full px-5 py-2 text-xs font-bold shadow-2xs transition cursor-pointer ${channel.btnClass}`}
                    >
                      {channel.buttonLabel}
                    </button>
                  )}
                </div>

                <ChannelIcon
                  aria-hidden="true"
                  className="w-24 h-24 text-slate-400/10 absolute -right-3 -bottom-4 pointer-events-none"
                />
              </div>
            );
          })}
        </section>

        {/* Direct Phone & E-mail Pills */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <a
            href={DIRECT_CONTACT_DETAILS.phoneHref}
            className="rounded-xl border border-[#dbe8f5] bg-[#f4f8fc] hover:border-[#00b4c6] px-5 py-3.5 flex items-center justify-between gap-4 shadow-2xs transition"
          >
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-[#0b4a7b]">
              <span className="w-7 h-7 rounded-lg bg-[#e4edf7] text-[#0b4a7b] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span>Phone</span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              {DIRECT_CONTACT_DETAILS.phone}
            </span>
          </a>

          <a
            href={DIRECT_CONTACT_DETAILS.emailHref}
            className="rounded-xl border border-[#f5ddca] bg-[#fdf7f2] hover:border-[#eb8c44] px-5 py-3.5 flex items-center justify-between gap-4 shadow-2xs transition"
          >
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold text-[#d97736]">
              <span className="w-7 h-7 rounded-lg bg-[#fcebd9] text-[#d97736] flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <span>E-mail</span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              {DIRECT_CONTACT_DETAILS.email}
            </span>
          </a>
        </section>

        {/* Join Our Community Section */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-4 flex flex-col justify-between p-2 relative">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b4a7b]">
                  Join Our <span className="text-[#22b5b0]">Community</span>
                </h2>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed max-w-[240px]">
                  Connect with PTE aspirants and trainers, wherever you already are.
                </p>
              </div>

              <svg
                aria-hidden="true"
                className="hidden lg:block w-24 h-16 text-slate-300 mt-4"
                viewBox="0 0 110 70"
                fill="none"
              >
                <path
                  d="M6 12 C 18 46, 52 54, 96 42"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <path
                  d="M89 35 L98 42 L91 50"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="lg:col-span-4 rounded-xl border border-[#d3e7f7] bg-[#f2f8fd] p-5 flex flex-col justify-between gap-5 relative overflow-hidden">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center gap-2 text-[#0284c7] font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-[#dff0fc] flex items-center justify-center shrink-0">
                    <Send className="w-3.5 h-3.5" />
                  </span>
                  <span>Telegram</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Become part of a thriving community of thousands of PTE aspirants and expert
                  trainers ready to support you with all your exam-related questions. Get insights,
                  and access tips for success in your PTE journey.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 relative z-10">
                <a
                  href="#telegram-academic"
                  onClick={(e) => {
                    e.preventDefault();
                    setQueryModalOpen(true);
                  }}
                  className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-1.5 text-[11px] font-bold transition"
                >
                  PTE Academic / UKVI
                </a>
                <a
                  href="#telegram-core"
                  onClick={(e) => {
                    e.preventDefault();
                    setQueryModalOpen(true);
                  }}
                  className="rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-1.5 text-[11px] font-bold transition"
                >
                  PTE Core
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl border border-[#ccefd8] bg-[#effaf3] p-5 flex flex-col justify-between gap-5 relative overflow-hidden">
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center gap-2 text-[#16a34a] font-bold text-sm">
                  <span className="w-7 h-7 rounded-lg bg-[#d9f5e3] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </span>
                  <span>Whatsapp</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Stay up-to-date with PTE news, study resources, and guidance from experienced
                  trainers.
                </p>
              </div>

              <div className="relative z-10">
                <a
                  href={DIRECT_CONTACT_DETAILS.whatsappChannelHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-1.5 text-[11px] font-bold transition"
                >
                  WhatsApp Channel
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-5">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0b4a7b]">FAQs</h2>

          <div className="flex flex-wrap items-center gap-2">
            {HELP_DESK_FAQ_TABS.map((tab) => {
              const active = activeFaqTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveFaqTab(tab);
                    setOpenFaqIdx(0);
                  }}
                  className={`rounded-full px-5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-[#38c6bd] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {currentFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200/90 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-[13px] font-semibold text-slate-700 hover:bg-slate-50/70 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-500 leading-relaxed space-y-1.5">
                      <p>{faq.a}</p>
                      {faq.linkType && faqLinks[faq.linkType] && (
                        <Link
                          to={faqLinks[faq.linkType]}
                          className="inline-block font-bold text-[#0b4a7b] underline hover:text-[#00a8bd]"
                        >
                          {faq.linkLabel}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />

      {ticketCategory && (
        <RaiseTicketModal
          key={ticketCategory}
          initialCategory={ticketCategory}
          onClose={() => setTicketCategory(null)}
        />
      )}

      <InstituteSalesModal isOpen={salesModalOpen} onClose={() => setSalesModalOpen(false)} />

      <QuerySupportModal isOpen={queryModalOpen} onClose={() => setQueryModalOpen(false)} />
    </div>
  );
}
