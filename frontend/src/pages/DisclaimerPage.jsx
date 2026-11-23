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
              Unless restricted by applicable law, by using the Website, mobile applications, and services, you agree that personal data relating to you collected by us or provided by you from time to time may be used, processed, and disclosed in accordance with this Privacy Policy.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              As part of our commitment to safeguarding user data, we regularly review our policies and security protocols. We may amend this Privacy Policy at any time by posting an updated version on the Website. Continued use of our platform or applications after changes become effective signifies your acknowledgment and acceptance of the revised terms.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              You may browse the Website without disclosing personal data. You are not required to provide personal information as a condition of browsing, except where necessary to provide personalized practice services, create accounts, process exam vouchers, or respond to direct support inquiries.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              When you use our services, we collect information relating to you, your devices, and your platform interactions. This includes directly identifiable information (such as your full name, email address, phone number, and profile details) as well as technical data (such as browser type, operating system, and IP address) utilized to protect network integrity.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              We compile aggregated, anonymized analytical insights regarding user demographics, module engagement, and test completion trends. This helps our academic and technical teams optimize portal performance, refine AI scoring algorithms, and improve learning usability.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              If you post reviews, submit messages, or provide feedback, we collect that information as necessary to troubleshoot issues, provide academic assistance, and maintain customer support records.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              We collect user details when you register an account. We may use your contact details to provide diagnostic score reports, subscription reminders, and practice tips. While you may opt out of promotional communications, essential transactional and account administrative notices will still be delivered.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Users are responsible for ensuring that all submitted personal data is complete, accurate, and current. You may update your profile information at any time within your student account dashboard.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              We implement robust technical and organizational measures to prevent the unauthorized loss, alteration, or disclosure of personal data. Stored data is hosted on secure cloud servers utilizing industry-standard encryption protocols.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              You acknowledge that transmission of data across the public internet cannot be guaranteed 100% secure. While we take rigorous measures to safeguard your information, any online transmission is performed with appropriate user awareness. We advise choosing strong passwords and logging out when accessing services from shared workstations.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              NinetyPTE grants all users complete freedom to manage or delete their account data. Users may delete their profile and associated practice history through account settings or by contacting <span className="font-semibold text-cyan-600">support@ninetypte.com</span>. We will delete stored profile data from active systems and confirm completion upon verification.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              By accessing the platform, you consent to the collection and handling of your data in accordance with this Privacy Policy.
            </p>
          </div>
        )}

        {/* REFUND / CANCELLATION POLICY VIEW */}
        {isRefund && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
              Refund / Cancellation Policy
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Thanks for registering on NinetyPTE.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              All the products/services that we offer on our website come with a free trial of each of them. Given the nature of digital goods, it becomes very difficult for us to offer a refund or credit on a purchase.
            </p>

            <div className="space-y-3">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Hence, we advise users to first go for the free trials of the below-mentioned products/services for their satisfaction:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>
                  <strong>Subscription</strong> – we offer free AI evaluations for users to get satisfied & accustomed to the AI scoring system before purchasing the subscription.
                </li>
                <li>
                  <strong>Mock Tests</strong> – both full & sectional mock tests offer a one-time completely free, fully scored test for users to check for the AI scoring system, pattern & their system compatibility ruling out all issues they could face after purchasing the tests or subscription.
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                However, we do understand that there could sometimes be a situation where the user would want to cancel the purchase & get a refund. For such an instance, we offer a cancellation/refund where the user will need to intimate us within 30 minutes of making the purchase. The following need to be taken care of while proceeding for cancellation/refund:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>The cancellation request must only be sent to <span className="font-semibold text-cyan-600">support@ninetypte.com</span> strictly within 30 minutes of the purchase/making the payment.</li>
                <li>Cancellation requests sent only to the mentioned email will be considered.</li>
                <li>Any email received after 30 minutes of making the payment will not be considered for cancellation & no refund will be processed for any such request.</li>
                <li>Any mock tests purchased will not be cancelled/refunded as the access once given cannot be revoked.</li>
                <li>Mock tests that have been unlocked using codes will not be refunded. In such an instance, the unlock code provided by the NinetyPTE team must not have been used by the user or any other party to unlock any of the available mock tests.</li>
                <li>Once your cancellation request has been accepted & processed, it might take up to 5 business days for the refunded amount to reach you.</li>
                <li>Please understand that we will process a refund only on the received amount, but there is no guarantee that you will get the same amount back into your account as there are 3rd party payment merchants involved who would charge a fee or commissions on any refund request.</li>
                <li>NinetyPTE is not responsible for any other fees (bank fee, international transaction fee etc.) incurred by the user while making the payment & hence, this amount will not be included in the refund request.</li>
                <li><strong>Note:</strong> Please be advised that refunds will not be processed for missing out on active promotions. Thank you for your understanding.</li>
              </ul>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal pt-2">
              It is understood that the user has gone through the refund & cancellation policy provided on <span className="font-semibold text-cyan-600">www.ninetypte.com</span> & has agreed to it before proceeding with the payment.
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
