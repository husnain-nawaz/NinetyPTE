import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Check, 
  X, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Sparkles, 
  Edit3, 
  FileCheck2, 
  Zap, 
  BookOpen, 
  Award,
  ArrowUpRight,
  Info,
  Smartphone,
  BarChart3,
  Search,
  Monitor
} from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('subscription'); // 'subscription' | 'mock-test'
  const [currency, setCurrency] = useState('PKR');
  const [openFaq, setOpenFaq] = useState(null);

  // Sync tab with URL search params (e.g. /pricing?tab=mock-test)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'mock-test' || tabParam === 'mocktest') {
      setActiveTab('mock-test');
    } else if (tabParam === 'subscription') {
      setActiveTab('subscription');
    }
  }, [location.search]);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    emailId: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Subscription Plans (Page 1 in Subscription PDF)
  const subscriptionPlans = [
    {
      days: '10 Days',
      price: '2195.00',
      popular: false,
    },
    {
      days: '30 Days',
      price: '4395.00',
      popular: false,
    },
    {
      days: '60 Days',
      price: '6595.00',
      popular: true,
      badge: 'Most Popular'
    },
    {
      days: '90 Days',
      price: '8795.00',
      popular: false,
    }
  ];

  // Mock Test Unit Plans (Page 1 in Mock Test PDF)
  const mockTestPlans = [
    {
      units: '3 x Mock test in units',
      price: '1695.00',
      popular: true,
      badge: 'Most Popular',
      expiry: 'No Expiry'
    },
    {
      units: '5 x Mock test in units',
      price: '2495.00',
      popular: false,
      expiry: 'No Expiry'
    },
    {
      units: '1 x Mock test in units',
      price: '695.00',
      popular: false,
      expiry: 'No Expiry'
    }
  ];

  const comparisonRows = [
    { feature: 'Practice Questions', free: '20000', premium: '20000', type: 'text' },
    { feature: 'AI Scoring', free: 'Limited', premium: 'Unlimited', type: 'text' },
    { feature: 'Full Mock Tests', free: 'One', premium: 'Unlimited', type: 'text' },
    { feature: 'Sectional Mock Tests', free: 'One', premium: 'Unlimited', type: 'text' },
    { feature: 'Timed Sectional Mock Test', free: false, premium: 'Unlimited', type: 'hybrid' },
    { feature: 'CYO Mock Tests*', free: false, premium: 'Unlimited', type: 'hybrid' },
    { feature: 'Templates', free: 'Limited', premium: 'All', type: 'text' },
    { feature: 'Study Plan', free: false, premium: true, type: 'boolean' },
    { feature: 'Detailed Performance Progress', free: false, premium: true, type: 'boolean' },
    { feature: 'Strategy Videos', free: true, premium: true, type: 'boolean' },
  ];

  const faqs = [
    {
      q: 'What are the different plans offered by NinetyPTE?',
      a: 'NinetyPTE offers flexible Premium subscription plans ranging from 10 Days, 30 Days, 60 Days, to 90 Days, alongside standalone Mock Test unit packs (1x, 3x, 5x) with No Expiry. Each plan includes Pearson-aligned AI scoring and instant score breakdowns.'
    },
    {
      q: 'How can I pay for the plan?',
      a: 'You can pay securely using Visa, MasterCard, UnionPay, JazzCash, EasyPaisa, international credit/debit cards, or direct online banking. Transactions are encrypted with 256-bit SSL security.'
    },
    {
      q: 'Is there an option to pay through local payment merchants?',
      a: 'Yes! We support local payment gateways, bank transfers, and mobile wallets for candidates across Pakistan, India, Bangladesh, UAE, Australia, and worldwide.'
    },
    {
      q: 'Can I try the plan for free before buying?',
      a: 'Yes, absolutely. Our Free Trial gives you immediate access to sample practice questions across all modules and 1 full scored mock test with instant AI feedback — no credit card required.'
    },
    {
      q: 'Can I cancel or change my plan anytime?',
      a: 'Yes, you can upgrade your plan or extend your subscription duration at any time directly through your account dashboard.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ fullName: '', subject: '', emailId: '', message: '' });
    }, 3000);
  };

  const isMockTest = activeTab === 'mock-test';

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative">
      
      {/* Floating Right-Edge Tab: "Start Your Free Trial" */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <a
          href="#free-trial"
          className="bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold py-3 px-1.5 rounded-l-xl shadow-lg transition tracking-wider flex items-center gap-1 shadow-cyan-500/20"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Start Your Free Trial
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. Header & Tab Switcher (Subscription / Mock Test / Book Exam)           */}
        {/* ========================================================================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            PTE {isMockTest ? 'Mock Test' : 'Subscription'} <span className="text-cyan-500">Plans</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {isMockTest 
              ? 'Choose the best plan for your PTE preparation and unlock any mock test of your choice with AI scoring, instant score feedback and more'
              : 'Choose the best plan for your PTE preparation and get access to unlimited mock tests, AI scoring, instant score feedback, and more.'
            }
          </p>

          {/* 3 Segmented Tabs */}
          <div className="flex items-center justify-center pt-3">
            <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('subscription')}
                className={`px-6 py-2 rounded-full transition ${
                  activeTab === 'subscription'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Subscription
              </button>
              <button
                onClick={() => setActiveTab('mock-test')}
                className={`px-6 py-2 rounded-full transition ${
                  activeTab === 'mock-test'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mock Test
              </button>
              <button
                onClick={() => navigate('/book-exam')}
                className="px-6 py-2 rounded-full transition flex items-center gap-1.5 text-slate-600 hover:text-cyan-600 hover:bg-white"
                title="Go to PTE Exam Voucher Booking"
              >
                <span>Book Exam</span>
                <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[10px] rounded font-black">
                  Rs 7,100
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. Top Banner (Dynamic: Free Trial vs Free Mock Test)                      */}
        {/* ========================================================================= */}
        <div 
          id="free-trial"
          className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-100/90 via-teal-100/70 to-emerald-100/80 border border-cyan-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {isMockTest ? 'Try an AI-Scored Free Mock Test!' : 'Get Our Free Trial Today!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {isMockTest 
                ? 'Practice with real exam format & check your exam readiness'
                : 'Access practice questions, full & sectional mock tests with AI scoring'
              }
            </p>
          </div>

          <a
            href="#trial-signup"
            className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-cyan-600 font-extrabold text-xs shadow-sm border border-cyan-200/60 transition whitespace-nowrap"
          >
            {isMockTest ? 'Start Free Mock' : 'Get Free Trial'}
          </a>
        </div>

        {/* ========================================================================= */}
        {/* 3. Pricing Cards Grid (Dynamic: 4 Subscription Cards vs 3 Mock Cards)     */}
        {/* ========================================================================= */}
        {isMockTest ? (
          /* MOCK TEST VIEW: 3 Cards (3x, 5x, 1x) as shown in mocktest button.pdf */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
              {mockTestPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl bg-white border p-6 flex flex-col justify-between text-center relative transition-all ${
                    plan.popular
                      ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Most Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-3.5 py-1 bg-cyan-500 text-white text-[10px] font-black uppercase rounded-full shadow-xs tracking-wider">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    {/* Units Pill */}
                    <div className="inline-block px-4 py-1.5 rounded-xl border border-cyan-400 text-cyan-600 font-extrabold text-xs sm:text-sm">
                      {plan.units}
                    </div>

                    {/* Price Display */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                        {currency}
                      </span>
                      <div className="text-3xl font-black text-slate-900 tracking-tight">
                        {plan.price}
                      </div>
                    </div>

                    {/* Validity Info */}
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
                      <span>{plan.expiry}</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div className="pt-6">
                    <button className="w-full py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs tracking-wide shadow-md shadow-cyan-500/20 transition">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Buy in Bulk? Strip from PDF */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cyan-50/50 border border-cyan-100 flex items-center justify-between gap-4 max-w-4xl mx-auto">
              <div className="text-base sm:text-lg font-black text-slate-900">
                Buy in Bulk?
              </div>
              <button className="px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-xs transition">
                Contact Us
              </button>
            </div>
          </div>
        ) : (
          /* SUBSCRIPTION VIEW: 4 Cards (10, 30, 60, 90 Days) */
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              {subscriptionPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl bg-white border p-6 flex flex-col justify-between text-center relative transition-all ${
                    plan.popular
                      ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Most Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-3.5 py-1 bg-cyan-500 text-white text-[10px] font-black uppercase rounded-full shadow-xs tracking-wider">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    <span className="text-xs font-bold text-slate-500 block">
                      Premium Plan
                    </span>

                    {/* Duration Outlined Pill */}
                    <div className="inline-block px-5 py-1.5 rounded-full border border-cyan-400 text-cyan-600 font-extrabold text-sm">
                      {plan.days}
                    </div>

                    {/* Price Display */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                        {currency}
                      </span>
                      <div className="text-3xl font-black text-slate-900 tracking-tight">
                        {plan.price}
                      </div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div className="pt-6">
                    <button className="w-full py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs tracking-wide shadow-md shadow-cyan-500/20 transition">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PTE Institute Strip */}
            <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 text-center text-xs text-slate-700 font-medium">
              Are you a PTE Institute?{' '}
              <a href="#institute" className="font-extrabold text-slate-900 underline hover:text-cyan-600">
                Click here
              </a>{' '}
              for an institute software solution
            </div>

            {/* Features Comparison Matrix */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-extrabold">
                      <th className="py-4 px-6 w-2/5">Features</th>
                      <th className="py-4 px-6 text-center w-3/10">Free Plan</th>
                      <th className="py-4 px-6 text-center w-3/10 bg-cyan-50/40 text-cyan-900">Premium Plan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 px-6 font-bold text-slate-800">
                          {row.feature}
                        </td>

                        <td className="py-3.5 px-6 text-center text-slate-600 font-medium">
                          {row.type === 'text' && <span>{row.free}</span>}
                          {row.type === 'hybrid' && (
                            row.free === false ? (
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black">✕</span>
                            ) : (
                              <span>{row.free}</span>
                            )
                          )}
                          {row.type === 'boolean' && (
                            row.free ? (
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-black">✓</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black">✕</span>
                            )
                          )}
                        </td>

                        <td className="py-3.5 px-6 text-center bg-cyan-50/30 font-bold text-slate-900">
                          {row.type === 'text' && <span>{row.premium}</span>}
                          {row.type === 'hybrid' && <span>{row.premium}</span>}
                          {row.type === 'boolean' && (
                            row.premium ? (
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-black">✓</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black">✕</span>
                            )
                          )}
                        </td>
                      </tr>
                    ))}

                    <tr className="bg-slate-50/40 border-t border-slate-200">
                      <td className="py-4 px-6"></td>
                      <td className="py-4 px-6 text-center">
                        <button className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-xs transition">
                          Choose Plan
                        </button>
                      </td>
                      <td className="py-4 px-6 text-center bg-cyan-50/30">
                        <button className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-xs transition">
                          Choose Plan
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 text-[11px] text-slate-400 italic border-t border-slate-100">
                * Create Your Own Mock Tests (NinetyPTE's Unique Product)
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. "What is a..." Section (Dynamic: Subscription vs Mock Test)             */}
        {/* ========================================================================= */}
        <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-12 border border-slate-200/80 text-center space-y-10">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What is a <span className="text-cyan-500">{isMockTest ? 'PTE Mock Test?' : 'Premium PTE Subscription Plan?'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isMockTest 
                ? "NinetyPTE's offer full mock tests for users to get used to the exam pattern & judge their performance along with the following features:"
                : "NinetyPTE's Premium plan will give you unlimited access to all the features like"
              }
            </p>
          </div>

          {/* 5 Icons Row */}
          {isMockTest ? (
            /* Mock Test Specific 5 Icons */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Real Exam Simulation</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">AI-Powered Scoring</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Instant Score Report</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Detailed Score Analysis</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 col-span-2 sm:col-span-1">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Detailed Analytics</span>
              </div>
            </div>
          ) : (
            /* Subscription Specific 5 Icons */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <Edit3 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">PTE Practice Tests</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Full & Sectional Mock Tests</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Instant AI Scoring</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Templates</span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 col-span-2 sm:col-span-1">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-cyan-600">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">And many more amazing features.</span>
              </div>
            </div>
          )}

          <p className="text-[11px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            All the various plans offered will give you access to all the available features but for the selected time duration only.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 5. "How to Buy?" 5-Step Stepper                                            */}
        {/* ========================================================================= */}
        <div className="text-center space-y-10 py-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to <span className="text-cyan-500">Buy?</span>
          </h2>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-4 left-12 right-12 h-0.5 bg-cyan-200 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              {[
                'Register on our website by creating your account',
                'Go to the Buy page',
                'Select any of the suitable plans',
                'Proceed with the payment',
                isMockTest ? 'Mock tests get unlocked immediately' : 'Plan gets activated instantly'
              ].map((stepText, sIdx) => (
                <div key={sIdx} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-cyan-400 text-cyan-600 font-extrabold text-xs flex items-center justify-center shadow-xs">
                    {sIdx + 1}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-[170px]">
                    {stepText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button className="px-8 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 transition">
              Buy Now
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. "Ready to Start?" CTA Box                                               */}
        {/* ========================================================================= */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-cyan-100 to-indigo-100 flex items-center justify-center p-6 border-2 border-dashed border-cyan-300">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md mx-auto flex items-center justify-center text-cyan-600 font-black text-2xl">
                    ✓
                  </div>
                  <span className="text-xs font-black text-slate-800 block">Instant Setup</span>
                  <span className="text-[10px] text-slate-500 block">No Credit Card Needed</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Ready to <span className="text-cyan-500">Start?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                Sign up now and get a <strong className="text-slate-900 underline decoration-cyan-400">free PTE mock test</strong> with instant AI scoring and feedback. No credit card is required.
              </p>
              <div className="pt-2">
                <button className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 transition">
                  Start Your Free Trial Today
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. "Why choose NinetyPTE?" Section                                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why choose <span className="text-cyan-500">NinetyPTE?</span>
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-black mt-0.5">&gt;</span>
                <p>
                  NinetyPTE is a PTE tutorial platform offering <strong className="text-slate-900 underline">practice for PTE exams</strong> like Academic / UKVI & Core. It has AI-powered full & sectional tests and lots of other PTE preparation tools.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-black mt-0.5">&gt;</span>
                <p>
                  NinetyPTE's AI offers a 95% accuracy & similar to PTE algorithms that give an accurate picture of a student's performance.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-black mt-0.5">&gt;</span>
                <p>
                  More than a million users across the globe have already utilized the services & benefitted from it.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 transition">
                Try Now
              </button>
            </div>
          </div>

          {/* Right Tablet Mockup (Displays Mock Test Score Card when on Mock Test tab) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-slate-900 p-3 shadow-2xl border-4 border-slate-800 relative group">
              <div className="bg-slate-950 rounded-2xl p-4 text-white space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                  <span>{isMockTest ? 'Mock Test Report Card' : 'NinetyPTE Dashboard Practice'}</span>
                  <span className="text-cyan-400 font-bold">{isMockTest ? 'Official 10-90 Scale' : 'Live AI Engine'}</span>
                </div>
                
                {isMockTest ? (
                  /* Official-Style Scorecard View matching Mock Test PDF */
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400">Candidate Score Card</span>
                        <div className="text-xs font-bold text-white">Mock Test - Full Exam</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500 text-slate-950 flex flex-col items-center justify-center font-black">
                        <span className="text-base leading-none">83</span>
                        <span className="text-[8px] uppercase">Overall</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-center">
                      <div className="bg-slate-800/80 p-1.5 rounded-lg">
                        <span className="text-[9px] text-slate-400 block">Listening</span>
                        <span className="text-xs font-extrabold text-cyan-400">81</span>
                      </div>
                      <div className="bg-slate-800/80 p-1.5 rounded-lg">
                        <span className="text-[9px] text-slate-400 block">Reading</span>
                        <span className="text-xs font-extrabold text-emerald-400">83</span>
                      </div>
                      <div className="bg-slate-800/80 p-1.5 rounded-lg">
                        <span className="text-[9px] text-slate-400 block">Speaking</span>
                        <span className="text-xs font-extrabold text-amber-400">83</span>
                      </div>
                      <div className="bg-slate-800/80 p-1.5 rounded-lg">
                        <span className="text-[9px] text-slate-400 block">Writing</span>
                        <span className="text-xs font-extrabold text-purple-400">87</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Practice UI */
                  <div className="h-44 rounded-xl bg-slate-800 flex items-center justify-center relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" 
                      alt="Platform UI"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <button className="w-12 h-12 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-1.5 text-center text-[9px]">
                  <div className="p-1.5 rounded bg-slate-800 text-amber-300 font-bold">Speaking</div>
                  <div className="p-1.5 rounded bg-slate-800 text-blue-300 font-bold">Writing</div>
                  <div className="p-1.5 rounded bg-slate-800 text-emerald-300 font-bold">Reading</div>
                  <div className="p-1.5 rounded bg-slate-800 text-purple-300 font-bold">Listening</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 8. Testimonials Card                                                      */}
        {/* ========================================================================= */}
        <div className="bg-slate-50/70 rounded-3xl p-8 sm:p-12 border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Testimonials
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Trusted by over 3 million users around the globe
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  {isMockTest 
                    ? '"Very very useful app...if your getting less scores here you will definitely get better scores in the real exam...that\'s my experience....thank you"'
                    : '"I used this app for 5 months ago. It is still working good with full accuracy. The mock test and speaking feedback helped me identify exactly what I needed to pass. I contacted the support team and they responded quickly. I appreciate the NinetyPTE team!"'
                  }
                </p>

                <div className="text-right pt-2 border-t border-slate-100">
                  <span className="font-extrabold text-slate-900 text-xs block">
                    {isMockTest ? 'Sherihan Anver' : 'Ikram Ali'}
                  </span>
                  <span className="text-[10px] text-slate-400">PTE Academic Candidate</span>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-1.5 pt-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 9. FAQs Accordion                                                         */}
        {/* ========================================================================= */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              FAQs
            </h2>
            <p className="text-xs text-slate-500">
              Here are answers to some of the frequently asked questions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div 
                  key={fIdx}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:text-cyan-600 transition"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-slate-50 text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
            If you have any questions or need more information, please contact us at{' '}
            <strong className="text-slate-800">support@ninetypte.com</strong> or chat with our support team on WhatsApp. We are happy to help you.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 10. Enquiry Form                                                          */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Enquiry <span className="text-cyan-500">Form</span>
            </h2>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 text-xs font-bold">
              ✓ Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full py-2 border-b border-slate-300 focus:border-cyan-500 focus:outline-hidden text-slate-800 font-medium bg-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full py-2 border-b border-slate-300 focus:border-cyan-500 focus:outline-hidden text-slate-800 font-medium bg-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Email Id</label>
                  <input
                    type="email"
                    required
                    value={formData.emailId}
                    onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                    className="w-full py-2 border-b border-slate-300 focus:border-cyan-500 focus:outline-hidden text-slate-800 font-medium bg-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Message</label>
                <textarea
                  rows={2}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full py-2 border-b border-slate-300 focus:border-cyan-500 focus:outline-hidden text-slate-800 font-medium bg-transparent transition resize-none"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
