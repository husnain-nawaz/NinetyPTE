import { Link } from 'react-router-dom';

/**
 * Shared teal footer bar rendered at the bottom of PTEDashboard secondary pages
 * (/v1/analytics and /v1/question-weightage).
 */
export default function PTEDashboardTealFooter() {
  return (
    <footer className="bg-[#38c6bd] text-white px-6 py-5 mt-8">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/disclaimer" className="hover:underline">
            Disclaimer
          </Link>
          <Link to="/refund-policy" className="hover:underline">
            Refund &amp; Cancellation Policy
          </Link>
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-conditions" className="hover:underline">
            Terms &amp; Conditions
          </Link>
        </div>

        <p className="text-xs sm:text-[13px] font-medium text-white/95">
          All rights reserved &copy; NinetyPTE Education, 2026
        </p>
      </div>
    </footer>
  );
}
