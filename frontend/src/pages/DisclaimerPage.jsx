import { Link, useLocation } from 'react-router-dom';

export default function DisclaimerPage({ pageType = 'disclaimer' }) {
  const location = useLocation();

  // Determine current active legal view based on URL or prop
  const currentPath = location.pathname;
  const isDisclaimer = pageType === 'disclaimer' || currentPath.includes('disclaimer');
  const isTerms = pageType === 'terms' || currentPath.includes('terms');
  const isPrivacy = pageType === 'privacy' || currentPath.includes('privacy');
  const isRefund = pageType === 'refund' || currentPath.includes('refund');

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. MINIMAL HEADER (White bar with NinetyPTE Logo on left)                 */}
      {/* ========================================================================= */}
      <header className="w-full bg-white px-6 sm:px-12 py-4 border-b border-slate-100 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group shrink-0">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900">
              ninety<span className="text-cyan-500 font-extrabold">pte</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-500 mb-2"></span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN LEGAL CONTENT CONTAINER                                          */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-12 py-10 sm:py-16">
        
        {isDisclaimer && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Disclaimer
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              This practice portal has been developed by NinetyPTE to help the students prepare for Pearson's Test of English. The material available on this portal has been collected only to assist PTE aspirants in their preparation & NinetyPTE does not guarantee a score only on the basis of this portal.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              This material has been collected from various sources which were openly available on several information media & NinetyPTE neither claims ownership nor accepts any liability for the content of this site, nor for the consequences of any actions taken on the basis of the information provided. Any views or opinions presented on this site are solely those of the author and do not necessarily represent those of the company. Viewers are expressly required not to make defamatory statements and not to infringe or authorize any infringement of copyright or any other legal right. Any such communication is contrary to company policy and outside the scope of the task of the individual concerned. The company will not accept any liability in respect of such communication, and the individual responsible will be personally liable for any damages or other liability arising.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              If you are not the intended recipient, you are notified that disclosing, copying, distributing, or taking any action in reliance on the contents of this information is strictly prohibited.
            </p>
          </div>
        )}

        {isTerms && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Terms & Conditions
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Welcome to NinetyPTE. By accessing our platform, practicing questions, subscribing to plans, or using our institute software, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              NinetyPTE provides educational practice resources, AI diagnostic scoring, and study aids. All subscriptions and voucher codes are licensed for individual preparation purposes only and may not be resold or duplicated without express authorization.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Users agree not to misuse automated scraping tools or attempt to bypass security layers. NinetyPTE reserves the right to terminate accounts that violate terms of use.
            </p>
          </div>
        )}

        {isPrivacy && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              At NinetyPTE, your privacy is paramount. This policy outlines how we collect, handle, and protect your personal information, practice audio recordings, and evaluation scorecards.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              We collect user details (such as email, name, and study preferences) strictly to facilitate account access, sync mobile app performance, and deliver diagnostic test analytics. Audio responses recorded during practice are processed solely for speech recognition and acoustic scoring.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              We do not sell personal data to third parties. All stored data is encrypted using standard cloud security protocols.
            </p>
          </div>
        )}

        {isRefund && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Refund & Cancellation Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Due to the immediate digital provisioning of NinetyPTE online mock tests, question bank access, and automated AI scoring credits, digital subscriptions are non-refundable once activated.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              For PTE exam voucher bookings, cancellations and rescheduling are subject to official Pearson test center policies. If you experience an unresolvable technical disruption on our portal, contact support at info@ninetypte.com for investigation and credit adjustment.
            </p>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 3. CYAN BOTTOM BAR FOOTER (1:1 Match with user screenshot)                */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#00c2cb] text-white py-4 px-6 sm:px-12 text-xs font-semibold">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 sm:gap-7">
            <Link to="/contact" className="hover:text-cyan-100 transition">
              Contact
            </Link>
            <Link 
              to="/disclaimer" 
              className={`transition ${isDisclaimer ? 'font-black underline underline-offset-4 text-white' : 'hover:text-cyan-100'}`}
            >
              Disclaimer
            </Link>
            <Link 
              to="/refund-policy" 
              className={`transition ${isRefund ? 'font-black underline underline-offset-4 text-white' : 'hover:text-cyan-100'}`}
            >
              Refund & Cancellation Policy
            </Link>
            <Link 
              to="/privacy-policy" 
              className={`transition ${isPrivacy ? 'font-black underline underline-offset-4 text-white' : 'hover:text-cyan-100'}`}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-conditions" 
              className={`transition ${isTerms ? 'font-black underline underline-offset-4 text-white' : 'hover:text-cyan-100'}`}
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Right Copyright Notice */}
          <div className="text-center md:text-right text-[11px] sm:text-xs font-medium text-white/90 shrink-0">
            All rights reserved © NinetyPTE, 2026
          </div>

        </div>
      </footer>

    </div>
  );
}
