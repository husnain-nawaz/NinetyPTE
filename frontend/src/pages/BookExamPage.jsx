import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Headphones, 
  Users, 
  Gift, 
  ArrowRight, 
  Lock, 
  CreditCard, 
  FileText, 
  Send, 
  Calendar, 
  HelpCircle,
  GraduationCap,
  Briefcase,
  Shield,
  Star,
  CheckCircle2
} from 'lucide-react';

export default function BookExamPage() {
  const navigate = useNavigate();
  const [selectedExamTab, setSelectedExamTab] = useState('academic'); // 'academic' | 'core' | 'ukvi'
  const [openFaq, setOpenFaq] = useState(0);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    instituteName: '',
    emailId: '',
    country: 'Pakistan',
    phone: '',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  const voucherData = {
    academic: {
      name: 'PTE Academic',
      tag: 'PTE ACADEMIC VOUCHER CODE',
      subtext: 'For international study and eligible migration/work pathways',
      actualPrice: 'PKR 76,000',
      discountedPrice: 'PKR 68,900',
      savings: 'PKR 7,100 (9%) OFF',
      validity: '11 Mos Valid',
      btnText: 'Get PTE Academic Voucher',
      icon: <GraduationCap className="w-5 h-5 text-cyan-500" />
    },
    core: {
      name: 'PTE Core',
      tag: 'PTE CORE VOUCHER CODE',
      subtext: 'For Canadian PR, citizenship and eligible immigration pathways',
      actualPrice: 'PKR 76,000',
      discountedPrice: 'PKR 68,900',
      savings: 'PKR 7,100 (9%) OFF',
      validity: '11 Mos Valid',
      btnText: 'Get PTE Core Voucher',
      icon: <Briefcase className="w-5 h-5 text-cyan-500" />
    },
    ukvi: {
      name: 'PTE Academic UKVI',
      tag: 'PTE ACADEMIC UKVI VOUCHER CODE',
      subtext: 'For eligible UK work and study visa applications requiring a SELT',
      actualPrice: 'PKR 76,000',
      discountedPrice: 'PKR 68,900',
      savings: 'PKR 7,100 (9%) OFF',
      validity: '11 Mos Valid',
      btnText: 'Get PTE Academic UKVI Voucher',
      icon: <Shield className="w-5 h-5 text-cyan-500" />
    }
  };

  const activeVoucher = voucherData[selectedExamTab] || voucherData.academic;

  const faqs = [
    {
      q: 'How can I buy a PTE voucher in Pakistan?',
      a: 'You can purchase an authentic Pearson-authorized PTE voucher directly on NinetyPTE. Simply choose your exam type (Academic, UKVI, or Core), make a secure payment via bank transfer, card, JazzCash or EasyPaisa, and your redemption voucher code is delivered instantly to your email.'
    },
    {
      q: 'What is the PTE exam booking price in Pakistan?',
      a: 'The standard Pearson testing fee is PKR 76,000. By booking through NinetyPTE, you receive an authorized discounted rate of PKR 68,900 — saving PKR 7,100 (9% discount) plus 7 days of complimentary premium AI practice.'
    },
    {
      q: 'Can I book my PTE Academic exam through NinetyPTE in Pakistan?',
      a: 'Yes, NinetyPTE is an authorized Pearson partner. Our vouchers can be applied directly on the official myPTE Pearson website (pearsonpte.com) at the checkout stage to waive the full exam fee.'
    },
    {
      q: 'Is PTE Academic UKVI available for candidates in Pakistan?',
      a: 'Yes, PTE Academic UKVI vouchers are valid for test bookings at Pearson SELT test centers across Islamabad, Lahore, Karachi, and other certified hubs in Pakistan.'
    },
    {
      q: 'Can I book the PTE Core exam from Pakistan?',
      a: 'Yes! PTE Core is approved by IRCC for Canadian Express Entry and provincial nomination pathways. Our PTE Core vouchers can be used to book appointments at test centers across Pakistan.'
    },
    {
      q: 'Are discounts available on PTE exam bookings in Pakistan?',
      a: 'Yes, we provide instant PKR 7,100 discounts on every voucher. Bulk discounts are also available for language institutes, study abroad consultants, and universities.'
    },
    {
      q: 'How do I complete my PTE exam booking through NinetyPTE?',
      a: '1. Purchase your voucher here. 2. Receive the voucher code by email. 3. Visit pearsonpte.com, choose your date & test center. 4. Enter the voucher code on the payment page to complete your booking.'
    }
  ];

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setEnquiryForm({ fullName: '', instituteName: '', emailId: '', country: 'Pakistan', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-cyan-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span>Trusted by 3 Million+ Students</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                PTE Exam Vouchers for <span className="text-cyan-600">Pakistan</span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                Looking for a PTE voucher for Pakistan? Explore voucher options for PTE Academic/UKVI and PTE Core, and start preparing for your exam with <strong className="text-slate-900">7 days of FREE NinetyPTE practice</strong>.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-8 py-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-600" />
                  <div>
                    <span className="text-base font-black text-slate-900 block leading-none">3M+</span>
                    <span className="text-[10px] text-slate-500">Learners Trust NinetyPTE</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-600" />
                  <div>
                    <span className="text-base font-black text-slate-900 block leading-none">100%</span>
                    <span className="text-[10px] text-slate-500">Customer Satisfaction</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-cyan-600" />
                  <div>
                    <span className="text-base font-black text-slate-900 block leading-none">24/7</span>
                    <span className="text-[10px] text-slate-500">Dedicated Support</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <a
                  href="#select-voucher"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition group"
                >
                  <span>Get Your PTE Voucher</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Genuine PTE Vouchers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Fast Email Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>7-Day Free NinetyPTE Practice</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Safe & Secure Payments</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Voucher Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 space-y-5 relative">
                
                {/* 3 Tabs */}
                <div className="flex items-center justify-between p-1 bg-slate-100 rounded-full text-[11px] font-bold">
                  <button
                    onClick={() => setSelectedExamTab('academic')}
                    className={`px-3 py-1.5 rounded-full transition ${
                      selectedExamTab === 'academic' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    PTE Academic
                  </button>
                  <button
                    onClick={() => setSelectedExamTab('core')}
                    className={`px-3 py-1.5 rounded-full transition ${
                      selectedExamTab === 'core' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    PTE Core
                  </button>
                  <button
                    onClick={() => setSelectedExamTab('ukvi')}
                    className={`px-3 py-1.5 rounded-full transition ${
                      selectedExamTab === 'ukvi' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    PTE Academic UKVI
                  </button>
                </div>

                {/* Voucher Price Info */}
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    {activeVoucher.tag}
                  </span>
                  <div className="text-3xl font-black text-cyan-500 tracking-tight">
                    SAVE 9%
                  </div>
                </div>

                <div className="flex items-center justify-between border-y border-slate-100 py-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Actual Exam Price</span>
                    <span className="text-xs text-slate-400 line-through font-bold">{activeVoucher.actualPrice}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Discounted Price</span>
                    <span className="text-xl font-black text-slate-900">{activeVoucher.discountedPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-cyan-50 text-cyan-700 font-extrabold text-[10px] rounded-md block">
                      {activeVoucher.savings}
                    </span>
                  </div>
                </div>

                {/* Free Bonus Box */}
                <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-cyan-600" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">FREE COMPLIMENTARY BONUS</span>
                      <span className="font-extrabold text-slate-900">7 Days Unlimited Portal Access</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-md">
                    Included
                  </span>
                </div>

                {/* Buy Button */}
                <button className="w-full py-3 rounded-full bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5">
                  <span>{activeVoucher.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Sub Features */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold pt-1 border-t border-slate-100">
                  <span>Official PTE Voucher</span>
                  <span>•</span>
                  <span>Available for Pakistan</span>
                  <span>•</span>
                  <span>Quick Email Delivery</span>
                </div>

                {/* Payment Logos */}
                <div className="text-center pt-2 space-y-1.5">
                  <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" /> Accepted at all PTE test centers in Pakistan
                  </span>
                  <div className="flex items-center justify-center gap-3 text-xs font-black text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-100">VISA</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100">MasterCard</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100">AMEX</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. IN-PAGE STICKY NAVIGATION BAR                                          */}
      {/* ========================================================================= */}
      <div className="border-y border-slate-200 bg-white py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-slate-600">
          <a href="#select-voucher" className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200">
            Select Exam
          </a>
          <a href="#how-it-works" className="hover:text-cyan-600 transition">How to Buy & Use</a>
          <a href="#why-choose" className="hover:text-cyan-600 transition">Why Choose Our Voucher</a>
          <a href="#testimonials" className="hover:text-cyan-600 transition">Testimonials</a>
          <a href="#faqs" className="hover:text-cyan-600 transition">FAQs</a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. "Choose the Right PTE Voucher for Your Goals" 3 Cards                  */}
      {/* ========================================================================= */}
      <section id="select-voucher" className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            <span>PEARSON AUTHORISED VOUCHER PARTNER</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Choose the <span className="text-cyan-500">Right PTE Voucher</span> for Your Goals
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Explore PTE voucher options for Pakistan, including PTE Academic, PTE Academic UKVI, and PTE Core. Enjoy exclusive savings, secure payment, quick delivery, and 7 days of FREE NinetyPTE practice.
          </p>
        </div>

        {/* 3 Voucher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(voucherData).map(([key, item]) => (
            <div 
              key={key}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-50 border border-cyan-100">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">{item.name}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{item.subtext}</p>
                  </div>
                </div>

                {/* Navy Box */}
                <div className="rounded-2xl bg-slate-900 text-white p-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                    <span>OFFICIAL VOUCHER</span>
                    <span className="text-cyan-400">INSTANT SAVING PKR 7,100 OFF</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-300 border-t border-slate-800 pt-1.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> PEARSON AUTHORIZED
                    </span>
                    <span>✓ 11 Mos Valid</span>
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Actual Pearson Exam Fee</span>
                    <span className="line-through">{item.actualPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-700 uppercase">Your Discounted Price</span>
                    <span className="text-2xl font-black text-slate-900">{item.discountedPrice}</span>
                  </div>
                </div>

                {/* Savings Pill */}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>✓ You Save: {item.savings}</span>
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] rounded">APPLIED</span>
                </div>

                {/* Free 7 Days Bonus */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-700">
                  <Gift className="w-4 h-4 text-cyan-600 shrink-0" />
                  <div>
                    <strong className="block text-[11px] text-slate-900">BONUS: 7 DAYS FREE</strong>
                    <span className="text-[10px] text-slate-500">NinetyPTE Full Premium Access + Mock Test</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 rounded-full bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5">
                <span>{item.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Your PTE Voucher Comes with Extra Benefits" Deep Navy Banner          */}
      {/* ========================================================================= */}
      <section className="bg-slate-950 text-white py-16 my-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Your PTE Voucher Comes <span className="text-cyan-400">with Extra Benefits</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Get 7 days of FREE NinetyPTE practice with your eligible PTE voucher purchase in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-extrabold text-white text-base">Real Exam-Style Practice</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Practice with real exam questions that accurately reflect the Pearson test format and acoustic conditions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-extrabold text-white text-base">AI-Powered Mock Tests</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take scored mock tests with instantaneous Pearson-calibrated AI reports to judge your readiness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-extrabold text-white text-base">Monitor Your Progress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identify weak points across Enabling Skills (Fluency, Pronunciation, Grammar) and focus where it matters most.
              </p>
            </div>
          </div>

          <div>
            <a
              href="#select-voucher"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-lg hover:bg-slate-100 transition"
            >
              <span>Start Your FREE Practice</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. "How Does the NinetyPTE Voucher Work in Pakistan?" (Page 2)             */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How Does the NinetyPTE <span className="text-cyan-500">PTE Voucher Work in Pakistan?</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Looking for a PTE voucher in Pakistan? Choose from PTE Academic/UKVI, or PTE Core voucher options at special prices. Eligible voucher purchases also unlock 7 days of FREE NinetyPTE practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                ↓
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Use Your Exam Voucher</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Redeem your voucher towards an eligible PTE exam booking by following the official booking and redemption instructions.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 text-white text-[11px] font-bold text-center">
              3 PTE Test Options
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                🗓️
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Convenient Booking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select the appropriate PTE test for your requirements and follow the steps to apply your voucher during the booking process.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 text-white text-[11px] font-bold text-center">
              Hassle-Free Booking
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                🔒
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Get Special Voucher</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore exclusive pricing on eligible PTE vouchers and save on your official Pearson test booking.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 text-white text-[11px] font-bold text-center">
              Save on Your Exam
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-bold">
                ⚡
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">FREE Practice Access</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access 7 days of complimentary NinetyPTE practice with eligible voucher purchases, including practice questions and mock tests.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 text-white text-[11px] font-bold text-center">
              7 Days of FREE Practice
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. "How to Purchase and Use Your PTE Voucher in Pakistan" (4 Steps)        */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How to Purchase and Use Your <span className="text-cyan-500">PTE Voucher in Pakistan</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Get started by selecting your PTE test, purchasing the right voucher, and receiving your redemption code by email. Apply the code during your exam booking and unlock 7 days of FREE NinetyPTE practice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-600 text-white rounded-3xl p-6 space-y-3 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-blue-200">Step 1</span>
              <h3 className="text-base font-extrabold mt-1 mb-2">Select Your PTE Test</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Choose PTE Academic/UKVI or PTE Core according to your study, work, or immigration requirements, then purchase the appropriate voucher.
              </p>
            </div>
            <div className="text-right text-3xl opacity-30 font-black">01</div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-slate-400">Step 2</span>
              <h3 className="text-base font-extrabold mt-1 mb-2">Get Your Voucher Code</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Once your purchase is confirmed, check your registered email for your unique voucher code and instructions on how to use it.
              </p>
            </div>
            <div className="text-right text-3xl opacity-30 font-black">02</div>
          </div>

          <div className="bg-teal-700 text-white rounded-3xl p-6 space-y-3 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-teal-200">Step 3</span>
              <h3 className="text-base font-extrabold mt-1 mb-2">Apply Your Voucher</h3>
              <p className="text-xs text-teal-100 leading-relaxed">
                Visit the official PTE booking platform, select your eligible exam appointment, and enter your voucher code as directed during checkout.
              </p>
            </div>
            <div className="text-right text-3xl opacity-30 font-black">03</div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase text-slate-400">Step 4</span>
              <h3 className="text-base font-extrabold mt-1 mb-2">Unlock FREE Practice</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Activate your 7-day NinetyPTE practice access and prepare with online questions, PTE mock tests, AI-powered scoring, and performance insights.
              </p>
            </div>
            <div className="text-right text-3xl opacity-30 font-black">04</div>
          </div>
        </div>

        <div className="text-center pt-2">
          <a
            href="#select-voucher"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 transition"
          >
            <span>Buy Your PTE Voucher Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. "Why Choose NinetyPTE for Your PTE Voucher in Pakistan?" (Page 3)       */}
      {/* ========================================================================= */}
      <section id="why-choose" className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose NinetyPTE for Your <span className="text-cyan-500">PTE Voucher in Pakistan?</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Make your PTE exam booking easier with voucher options for Pakistan, convenient delivery, flexible test choices, and complimentary practice support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-2xl font-black text-cyan-500">01</span>
              <h3 className="font-extrabold text-slate-900 text-sm">Easy Voucher Purchase</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select the voucher for PTE Academic/UKVI or PTE Core that suits your requirements and follow a straightforward purchase process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-2xl font-black text-cyan-500">02</span>
              <h3 className="font-extrabold text-slate-900 text-sm">Quick Email Confirmation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get your voucher code and redemption instructions by email after your purchase is confirmed, so you can proceed with your exam booking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-2xl font-black text-cyan-500">03</span>
              <h3 className="font-extrabold text-slate-900 text-sm">Complimentary PTE Preparation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive 7 days of FREE NinetyPTE practice with eligible voucher purchases, including practice questions, mock tests, and performance feedback.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-2xl font-black text-cyan-500">04</span>
              <h3 className="font-extrabold text-slate-900 text-sm">Guidance at Every Step</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get assistance with voucher-related queries, redemption instructions, and PTE preparation resources whenever you need support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. Testimonials Section (Candidates from Islamabad, Karachi, Faisalabad)  */}
      {/* ========================================================================= */}
      <section id="testimonials" className="py-16 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Testimonials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real test-taker experiences with NinetyPTE vouchers and practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "I wanted a convenient way to arrange my PTE exam. Having the voucher steps explained clearly made the booking process completely stress-free. Saved PKR 7,100 instantly!"
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-slate-900">Ayesha Malik</strong>
                <span className="text-[10px] text-slate-400">Islamabad, Pakistan</span>
              </div>
              <span className="text-[10px] bg-cyan-50 text-cyan-700 font-bold px-2 py-0.5 rounded">PTE Academic</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "I like having practice materials available alongside my exam preparation. The 7 days of free NinetyPTE portal helped me organise my study routine and score 84 overall."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-slate-900">Usman Ali</strong>
                <span className="text-[10px] text-slate-400">Karachi, Pakistan</span>
              </div>
              <span className="text-[10px] bg-cyan-50 text-cyan-700 font-bold px-2 py-0.5 rounded">PTE Core</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Practising different question types in one place was so convenient. Received my code within 15 minutes of payment and booked my test in Lahore seamlessly."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-slate-900">Fatima Noor</strong>
                <span className="text-[10px] text-slate-400">Faisalabad, Pakistan</span>
              </div>
              <span className="text-[10px] bg-cyan-50 text-cyan-700 font-bold px-2 py-0.5 rounded">PTE Academic UKVI</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FAQs Accordion (Page 4)                                                */}
      {/* ========================================================================= */}
      <section id="faqs" className="py-16 max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Find answers to your questions about PTE vouchers in Pakistan, including available test options, pricing, purchase details, redemption, and FREE NinetyPTE practice access.
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
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
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
      </section>

      {/* ========================================================================= */}
      {/* 10. "Ready to start your preparation?" + Enquiry Form (Page 4)            */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Ready to start your <span className="text-cyan-500">preparation?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Practice real exam-style questions, take scored mock tests, and track your progress with instant AI feedback designed to help you improve faster and achieve your target score with confidence.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-500" /> AI Scoring</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-500" /> Real Exam Qs</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-cyan-500" /> 24/7 Support</span>
            </div>

            <div>
              <a
                href="#select-voucher"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-extrabold text-xs shadow hover:bg-slate-800 transition inline-block"
              >
                Start Now
              </a>
            </div>
          </div>

          {/* Right Enquiry Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="text-lg font-black text-slate-900">Enquiry Form</h3>

            {formSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                ✓ Thank you! Your inquiry has been submitted. Our team will contact you on WhatsApp / Email shortly.
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Full Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={enquiryForm.fullName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Institute Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="University / Academy"
                      value={enquiryForm.instituteName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, instituteName: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Email Id*</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={enquiryForm.emailId}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, emailId: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Country*</label>
                    <select
                      value={enquiryForm.country}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, country: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-hidden bg-white"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="UAE">UAE</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                  <div className="flex gap-2">
                    <span className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-mono font-bold text-xs">
                      🇵🇰 +92
                    </span>
                    <input
                      type="tel"
                      placeholder="300 1234567"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Message*</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Your Message..."
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
