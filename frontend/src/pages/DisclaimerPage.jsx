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
        
        {/* DISCLAIMER VIEW */}
        {isDisclaimer && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Disclaimer
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              This practice portal has been developed by NinetyPTE to assist students preparing for the Pearson Test of English. The material available on this portal is compiled solely for preparation and learning purposes. NinetyPTE does not guarantee any specific test score solely based on using this platform.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Study resources and practice content are gathered from public educational materials. NinetyPTE makes no proprietary claims over third-party materials and disclaims liability for any actions taken in reliance on provided information. Views or opinions expressed on this platform represent those of individual contributors and do not necessarily reflect the official policies of NinetyPTE.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Unauthorized reproduction, copying, distribution, or misuse of practice materials, question items, or diagnostic reports without prior written authorization is strictly prohibited.
            </p>
          </div>
        )}

        {/* TERMS AND CONDITIONS VIEW */}
        {isTerms && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Terms and Conditions
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              These Terms and Conditions govern your access to and use of NinetyPTE websites, portals, and mobile applications ("Platform"). The Platform is owned and operated by NinetyPTE Education ("Company", "We", "Us", or "NinetyPTE"). By browsing, registering, or using the Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
            </p>

            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-slate-900">1. Nature of the Service</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                NinetyPTE is an independent e-learning practice portal providing practice materials, diagnostic AI evaluation, and scored mock tests for candidates preparing for English proficiency exams. NinetyPTE is not an authorized test delivery center and does not administer official exams.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-slate-900">2. NinetyPTE Responsibilities</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our commitments are limited to providing access to the online learning features, mock tests, and question banks as advertised, and offering technical customer support through official help channels.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-slate-900">3. User Eligibility and Warranties</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                By creating an account or purchasing subscriptions, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                <li>You are at least 18 years of age, or have obtained explicit parental or legal guardian consent.</li>
                <li>You are registering under your real legal identity and providing current, accurate contact information.</li>
                <li>You will maintain the confidentiality and security of your account credentials.</li>
              </ul>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-slate-900">4. Permitted Use and Prohibitions</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Users are granted a limited, personal, non-exclusive license to use the Platform for personal test preparation. You agree not to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                <li>Resell, share, sub-license, or redistribute your account access or practice content.</li>
                <li>Use automated scripts, bots, spiders, or scrapers to copy content or harvest data.</li>
                <li>Attempt to bypass security features, reverse-engineer proprietary algorithms, or disrupt server infrastructure.</li>
                <li>Post defamatory, abusive, infringing, unlawful, or offensive material on our community forums.</li>
              </ul>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-slate-900">5. Account Security and Administration</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                You are solely responsible for all activities conducted under your user credentials. In the event of suspected unauthorized access, you must notify NinetyPTE immediately. NinetyPTE reserves the right to suspend or terminate accounts that breach these conditions without prior notice.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-slate-900">6. Third-Party Links and Resources</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                The Platform may contain links to external educational resources, institutions, or partner websites. NinetyPTE does not endorse and assumes no legal responsibility for the practices or content of third-party platforms.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-bold text-slate-900">7. Electronic Communications & Inquiries</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                By using NinetyPTE, you consent to receive electronic communications regarding account updates, system maintenance, and service notifications. For questions regarding these Terms, contact us at: <span className="font-semibold text-cyan-600">support@ninetypte.com</span>.
              </p>
              <p className="text-xs text-slate-400 pt-2">
                Last updated: October 2026
              </p>
            </div>
          </div>
        )}

        {/* PRIVACY POLICY VIEW */}
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

        {/* REFUND POLICY VIEW */}
        {isRefund && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Refund & Cancellation Policy
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Due to the immediate digital provisioning of NinetyPTE online mock tests, question bank access, and automated AI scoring credits, digital subscriptions are non-refundable once activated.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              For PTE exam voucher bookings, cancellations and rescheduling are subject to official Pearson test center policies. If you experience an unresolvable technical disruption on our portal, contact support at support@ninetypte.com for investigation and credit adjustment.
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
