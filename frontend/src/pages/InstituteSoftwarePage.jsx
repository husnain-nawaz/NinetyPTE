import { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Sparkles, 
  Award, 
  BarChart3, 
  FileText, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Headphones, 
  Monitor, 
  Smartphone, 
  Globe2, 
  Download, 
  Send, 
  Building2, 
  Layers, 
  FileCheck2, 
  Video, 
  BookOpen, 
  Cpu, 
  Sliders, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Laptop
} from 'lucide-react';

export default function InstituteSoftwarePage() {
  // Lead Generation Form State
  const [formData, setFormData] = useState({
    fullName: '',
    instituteName: '',
    emailId: '',
    country: 'Pakistan',
    phoneCode: '+92',
    phone: '',
    whatsappCode: '+92',
    whatsapp: '',
    isBusinessConfirmed: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Brochure Download State
  const [brochureRequested, setBrochureRequested] = useState(false);

  // FAQ Accordion State
  const [activeFaqTab, setActiveFaqTab] = useState('general'); // 'general' | 'tutorial'
  const [openFaq, setOpenFaq] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        instituteName: '',
        emailId: '',
        country: 'Pakistan',
        phoneCode: '+92',
        phone: '',
        whatsappCode: '+92',
        whatsapp: '',
        isBusinessConfirmed: false
      });
    }, 4000);
  };

  // 10 Benefits of Partnering (Page 5)
  const partnershipBenefits = [
    {
      title: 'AI Clicks',
      desc: 'Unlimited AI Clicks for scoring in all Speaking & Writing questions with real-time feedback.',
      icon: <Cpu className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Score Checks',
      desc: 'Unlimited Score Checks to know exactly how PTE marks are distributed across enabling skills.',
      icon: <BarChart3 className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Full Mock Tests',
      desc: 'Unlimited access to simulated Scored Mock Tests with 95%+ real exam scoring report & analytics.',
      icon: <Award className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Sectional Mock Tests',
      desc: 'Unlimited access to module-wise mock exams giving trainers an accurate diagnostic breakdown.',
      icon: <FileCheck2 className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Create Your Own Mock Tests',
      desc: 'First-of-its-kind feature allowing coaching faculties to create custom tests matching internal curricula.',
      icon: <Sliders className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Latest Exam Questions',
      desc: 'Access to the freshest question bank with frequent weekly updates of Pearson-frequency items.',
      icon: <FileText className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Study Files',
      desc: 'Upload custom institute branding, PDF study guides, and worksheets for your enrolled students.',
      icon: <BookOpen className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Templates',
      desc: 'Our proven high-scoring templates for Essay, Describe Image & Summarize Spoken Text.',
      icon: <Layers className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Strategy Videos',
      desc: 'Multi-lingual masterclass videos covering high-yield test strategies, tips & question tricks.',
      icon: <Video className="w-6 h-6 text-cyan-600" />
    },
    {
      title: 'Target Wise Study-plan',
      desc: 'Tailored study plans created specifically for 65+, 79+, or 90 target band aspirants.',
      icon: <Calendar className="w-6 h-6 text-cyan-600" />
    }
  ];

  // Global Partner Offices (Page 5)
  const globalOffices = [
    {
      country: 'Australia',
      name: 'NinetyPTE Australia Hub',
      address: 'Level 19, 263 William Street, Melbourne VIC 3000, Australia',
      phone: '+61 470 260 221',
      flag: '🇦🇺'
    },
    {
      country: 'Pakistan',
      name: 'NinetyPTE Pakistan Head Office',
      address: 'Blue Area, Sector G-7/1, Islamabad & DHA Phase 5, Lahore, Pakistan',
      phone: '+92 300 1234567',
      flag: '🇵🇰'
    },
    {
      country: 'United Arab Emirates',
      name: 'NinetyPTE Middle East',
      address: 'Business Bay, Iris Bay Tower, Dubai, United Arab Emirates',
      phone: '+971 4 234 5678',
      flag: '🇦🇪'
    },
    {
      country: 'India',
      name: 'NinetyPTE Tech Center',
      address: 'Suite 514, SBR CV Towers, Madhapur, Hyderabad, Telangana 500081',
      phone: '+91 99980 88235',
      flag: '🇮🇳'
    }
  ];

  // FAQs (Page 6)
  const generalFaqs = [
    {
      q: 'What subscription plans are available for coaching institutes?',
      a: 'We offer flexible pay-as-you-go credit packages and monthly/annual tiered enterprise licenses. Credits never expire and can be allocated dynamically across enrolled students.'
    },
    {
      q: 'What is the minimum account purchase requirement?',
      a: 'You can begin with our starter batch of just 10 student accounts or custom enterprise bundles of 50, 100, 500+ student seats with tiered volume discounts.'
    },
    {
      q: 'How many users can access a single student account simultaneously?',
      a: 'Each student account is equipped with secure single-session authorization to ensure dedicated practice tracking, prevent credential misuse, and maintain authentic score records.'
    },
    {
      q: 'Do the purchased credits have an expiration date?',
      a: 'No! Institutional credits purchased under our business tier have Lifetime Validity with No Expiry, allowing your coaching center complete flexibility across semesters.'
    },
    {
      q: 'Can trainers track student performance and mock test scores in real time?',
      a: 'Yes, the Self-Managed Admin Panel provides live telemetry, diagnostic score breakdowns across all 4 communicative skills and enabling skills, and downloadable PDF score reports.'
    },
    {
      q: 'How accurate is the AI scoring compared to Pearson PTE?',
      a: 'Our proprietary speech-recognition and natural language evaluation engine is calibrated against millions of official Pearson test attempts, achieving a 95%+ correlation with certified exam scoring.'
    },
    {
      q: 'Can we use the same purchased credits for IELTS students?',
      a: 'Yes! Our unified partner panel allows you to seamlessly switch and allocate credits between PTE Academic, PTE Core, PTE UKVI, and IELTS practice modules.'
    }
  ];

  const tutorialFaqs = [
    {
      q: 'How quickly can our institute get white-labeled software set up?',
      a: 'Standard deployment takes under 24 hours. Your custom subdomain (e.g. portal.yourinstitute.com), logo, color scheme, and initial trainer seats are configured immediately.'
    },
    {
      q: 'Can our teachers upload custom study notes and institutional videos?',
      a: 'Yes, faculties have full permissions to add custom strategy videos, downloadable lecture notes, grammar templates, and custom vocabulary lists directly from the console.'
    },
    {
      q: 'Is technical training provided for our trainers and administrative staff?',
      a: 'Yes! Every partner institute receives dedicated onboarding sessions, complete video tutorial documentation, and a priority WhatsApp support manager.'
    }
  ];

  const currentFaqs = activeFaqTab === 'general' ? generalFaqs : tutorialFaqs;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* Floating Vertical Right-Edge Tab: "Download Brochure"                    */}
      {/* ========================================================================= */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <button 
          onClick={() => {
            setBrochureRequested(true);
            setTimeout(() => setBrochureRequested(false), 3500);
          }}
          className="bg-[#00c2cb] hover:bg-[#00a8b5] text-white px-3 py-6 rounded-l-2xl font-extrabold text-xs shadow-xl transition-all flex flex-col items-center gap-2 group cursor-pointer"
          style={{ writingMode: 'vertical-rl' }}
          title="Download Institute Partnership Brochure"
        >
          <span className="tracking-widest uppercase text-[11px] group-hover:tracking-wider transition-all">
            Download brochure
          </span>
          <Download className="w-4 h-4 rotate-90 text-white" />
        </button>
      </div>

      {/* Brochure Download Notification Toast */}
      {brochureRequested && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-cyan-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
            ✓
          </div>
          <div className="text-xs">
            <div className="font-extrabold text-cyan-300">Brochure Request Received!</div>
            <div className="text-slate-300">NinetyPTE Institute Overview PDF will download shortly.</div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION & LEAD GENERATION FORM (Page 1)                          */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-cyan-50/40 via-white to-white">
        
        {/* Soft Background Accents */}
        <div className="absolute top-12 left-1/4 w-[500px] h-[300px] bg-cyan-200/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          
          {/* Main Title */}
          <div className="text-center space-y-2 mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              PTE <span className="text-cyan-500">Software</span> for{' '}
              <span className="text-cyan-500">Institutes</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto">
              Boost your business with the most advanced & accurate{' '}
              <strong className="text-slate-900 font-bold underline decoration-cyan-400">PTE Practice</strong>{' '}
              & Mock Test tool for Institutes
            </p>
          </div>

          {/* 2-Column Grid: Visual Classroom Card + Enquiry Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Video / Classroom Illustration Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900 bg-slate-900 aspect-4/3 group">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" 
                  alt="Coaching Classroom Faculty and Students"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Video Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-white flex items-center justify-center shadow-xl backdrop-blur-xs transition-transform transform group-hover:scale-110 cursor-pointer">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between shadow-lg text-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">NinetyPTE White-Label Suite</div>
                      <div className="text-[10px] text-slate-500">Your Brand, Your URL, Your Students</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                    Live Demo
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Lead Generation Enquiry Form matching Page 1 */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 relative">
                
                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                  Request an Institute Demo & Pricing
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Get personalized white-label portal access and volume pricing tailored for your academy.
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center font-bold text-xl">
                      ✓
                    </div>
                    <div className="text-sm font-black">Thank You for Your Enquiry!</div>
                    <p className="text-xs text-emerald-700">
                      Our institutional partnership manager will contact you within 2 business hours with a demo login and pricing proposal.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                    
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                      />
                    </div>

                    {/* Institute Name */}
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Institute Name"
                        value={formData.instituteName}
                        onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                      />
                    </div>

                    {/* Email Id */}
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Id"
                        value={formData.emailId}
                        onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                      />
                    </div>

                    {/* Select Country */}
                    <div>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white text-slate-700"
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="India">India</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Australia">Australia</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Phone Number with Country Code */}
                    <div className="flex gap-2">
                      <div className="w-28 shrink-0">
                        <select
                          value={formData.phoneCode}
                          onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white text-slate-700 font-mono text-xs"
                        >
                          <option value="+92">🇵🇰 +92</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+1">🇨🇦 +1</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Enter Your Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                      />
                    </div>

                    {/* WhatsApp Number with Country Code */}
                    <div className="flex gap-2">
                      <div className="w-28 shrink-0">
                        <select
                          value={formData.whatsappCode}
                          onChange={(e) => setFormData({ ...formData, whatsappCode: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white text-slate-700 font-mono text-xs"
                        >
                          <option value="+92">🇵🇰 +92</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+1">🇨🇦 +1</option>
                        </select>
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter Your WhatsApp Number"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800"
                      />
                    </div>

                    <div className="text-[11px] text-slate-400 font-medium">
                      Note: Please provide either phone number or WhatsApp number
                    </div>

                    {/* Confirmation Checkbox */}
                    <label className="flex items-start gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.isBusinessConfirmed}
                        onChange={(e) => setFormData({ ...formData, isBusinessConfirmed: e.target.checked })}
                        className="mt-0.5 rounded-sm border-slate-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span className="text-[11px] text-slate-600 font-semibold leading-tight">
                        I confirm this enquiry is for a business, not for personal or student use
                      </span>
                    </label>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-black text-xs sm:text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
                    >
                      Submit
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* Features Highlights Box (Page 1)                                      */}
          {/* ===================================================================== */}
          <div className="mt-16 bg-slate-50/80 rounded-3xl p-8 sm:p-10 border border-slate-200/80 space-y-8">
            
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Get your own personalized version of NinetyPTE Software
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                for institutes with the following features:
              </p>
            </div>

            {/* 8 Feature Bullets in 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
              {[
                'PTE practice portal with personalized URL, business name & logo.',
                'Full access to create & control unlimited student logins.',
                'Self-managed admin panel/console.',
                'Premium credits never expire – use them anytime on PTE or IELTS platforms.',
                'Access to Full & Sectional PTE Mock Tests.',
                'Access to add your own templates, grammar rules, study files & strategy videos',
                'Same AI-powered scoring as NinetyPTE',
                'Dedicated customer support for businesses'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <span className="shrink-0 text-cyan-500 font-black text-sm group-hover:translate-x-1 transition-transform">
                    ➤
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-normal">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2 space-y-4">
              <p className="text-xs text-slate-500 font-semibold max-w-xl mx-auto">
                Get all these amazing features at the best PTE software price. Your personalized business software is just a click away.
              </p>
              <a
                href="#demo-form"
                onClick={() => window.scrollTo({ top: 150, behavior: 'smooth' })}
                className="inline-block px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition"
              >
                Contact Us
              </a>
            </div>

          </div>

          {/* Middle Callout Banner */}
          <div className="mt-12 text-center space-y-3 max-w-3xl mx-auto py-6">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Boost your business with the most advanced & accurate PTE practice tool - <strong className="text-slate-900">NinetyPTE</strong>, a trusted name among the student fraternity globally.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This is an excellent opportunity for businesses as this practice platform will help students in PTE preparation and in turn will further grow the business.
            </p>
            <div>
              <a
                href="#demo-form"
                onClick={() => window.scrollTo({ top: 150, behavior: 'smooth' })}
                className="inline-block px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition"
              >
                Sign Up for Free Trial
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PERSONALIZED PRACTICE PORTAL (Page 2)                                 */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Personalized Practice Portal for <span className="text-cyan-500">PTE Academic & PTE Core</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gain access to our PTE software, customized with your branding and a unique URL. It includes a wide range of practice content for <strong className="text-slate-900 font-semibold">PTE Academic</strong> and <strong className="text-slate-900 font-semibold">PTE Core</strong> ensuring your students are well-prepared for success.
            </p>
          </div>

          {/* High Fidelity Web Dashboard Mockup (Matching Page 2) */}
          <div className="bg-slate-900 rounded-3xl p-3 sm:p-5 shadow-2xl border border-slate-800 max-w-5xl mx-auto">
            
            {/* Top Browser Toolbar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-mono text-[11px] text-slate-300">portal.yourinstitute.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 text-[10px] font-bold">White-Label Client</span>
              </div>
            </div>

            {/* Simulated Student Portal Interior */}
            <div className="bg-[#f0f4f9] rounded-2xl p-4 sm:p-6 text-slate-800 space-y-5 text-xs">
              
              {/* Top Nav & Stats */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-3 font-bold text-xs">
                  <span className="px-3 py-1 rounded-full bg-cyan-500 text-white shadow-xs">Practice Progress</span>
                  <span className="px-3 py-1 rounded-full bg-white text-slate-600 hover:text-slate-900">Performance Progress</span>
                </div>
                
                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-white px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 font-medium">
                    🔍 Find what interests you
                  </div>
                  <div className="bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-xl text-center">
                    <span className="block font-black text-cyan-700 text-sm">79+</span>
                    <span className="text-[9px] text-slate-400 uppercase">Target</span>
                  </div>
                  <div className="bg-white border border-slate-200 px-3 py-1 rounded-xl text-center font-mono">
                    <span className="block font-bold text-slate-800 text-xs">10d 11h 57m</span>
                    <span className="text-[9px] text-slate-400 uppercase">Countdown</span>
                  </div>
                </div>
              </div>

              {/* 5 KPI Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-base font-black text-slate-900">1747</div>
                  <div className="text-[10px] text-slate-400">Prediction Questions</div>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-base font-black text-amber-600">4854</div>
                  <div className="text-[10px] text-slate-400">Speaking Questions</div>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-base font-black text-sky-600">577</div>
                  <div className="text-[10px] text-slate-400">Writing Questions</div>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-base font-black text-emerald-600">1761</div>
                  <div className="text-[10px] text-slate-400">Reading Questions</div>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-base font-black text-purple-600">2952</div>
                  <div className="text-[10px] text-slate-400">Listening Questions</div>
                </div>
              </div>

              {/* Study Tools Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { name: 'Templates', icon: '📝', color: 'bg-emerald-50 text-emerald-700' },
                  { name: 'Marking', icon: '🎯', color: 'bg-amber-50 text-amber-700' },
                  { name: 'Grammar', icon: '🔤', color: 'bg-sky-50 text-sky-700' },
                  { name: 'Vocab-Bank', icon: '📖', color: 'bg-rose-50 text-rose-700' },
                  { name: 'Score Feedback', icon: '📊', color: 'bg-cyan-50 text-cyan-700' },
                  { name: 'Mock Tests', icon: '📋', color: 'bg-purple-50 text-purple-700' }
                ].map((tool, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl text-center border border-slate-200/80 shadow-xs ${tool.color}`}>
                    <div className="text-xl mb-1">{tool.icon}</div>
                    <div className="text-[10px] font-bold">{tool.name}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ===================================================================== */}
          {/* Personalized Practice Mobile App Section (Page 2)                     */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            
            {/* Left Mobile Mockup Screen */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-[280px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800">
                <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />
                <div className="bg-white rounded-[30px] p-3.5 space-y-3 text-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center text-xs">
                      ST
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">Student Name</div>
                      <div className="text-[9px] text-slate-400">#0000125678</div>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">AI Scored Full Mock</div>
                    <div className="text-2xl font-black text-cyan-600">84/90</div>
                    <div className="text-[9px] text-emerald-600 font-bold">Exam Ready</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                    <div className="p-2 bg-slate-50 rounded-xl">Speaking: 86</div>
                    <div className="p-2 bg-slate-50 rounded-xl">Writing: 82</div>
                    <div className="p-2 bg-slate-50 rounded-xl">Reading: 80</div>
                    <div className="p-2 bg-slate-50 rounded-xl">Listening: 88</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Info */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Personalized Practice Mobile App
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Your students will get access to a personalized <strong className="text-slate-900 font-semibold">PTE mobile app</strong>, enabling them to practice & prepare on the go.
              </p>

              {/* Store Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-black text-white rounded-xl shadow-xs text-xs">
                  <span className="text-xl leading-none"></span>
                  <div className="text-left">
                    <div className="text-[8px] uppercase text-slate-300">Download on the</div>
                    <div className="text-xs font-bold font-sans">App Store</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 bg-black text-white rounded-xl shadow-xs text-xs">
                  <span className="text-lg leading-none">▶</span>
                  <div className="text-left">
                    <div className="text-[8px] uppercase text-slate-300">GET IT ON</div>
                    <div className="text-xs font-bold font-sans">Google Play</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ADMIN PANEL & STUDENT LOGINS CONTROL (Page 3)                         */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Row 1: Self-Managed Admin Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 flex justify-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-cyan-100/80 border-4 border-cyan-200 flex items-center justify-center text-cyan-600 shadow-inner">
                <Laptop className="w-14 h-14 sm:w-16 sm:h-16 stroke-[2]" />
              </div>
            </div>

            <div className="md:col-span-7 space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Self-Managed Admin Panel
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Gives you full administrative control over your personalized students' practice website allowing you to manage it effectively.
              </p>
            </div>

          </div>

          {/* Row 2: Access To Create & Control Student Logins */}
          <div className="space-y-6">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Access To Create & Control Student Logins
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Allows you control over the student's database where you can create, edit, upgrade & delete accounts of your students.
              </p>
            </div>

            {/* Admin Console Table Mockup (Page 3) */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90 max-w-5xl mx-auto overflow-x-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 min-w-[650px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    LOGO
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">Students Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-xs font-bold">Active Filter</span>
                  <button className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs transition">
                    + Add Student
                  </button>
                </div>
              </div>

              {/* Table */}
              <table className="w-full text-left text-xs min-w-[650px] mt-4">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5">User ID</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Subscription</th>
                    <th>Expiry Date</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {[
                    { id: '000849833', name: 'student333', status: 'ACTIVE', plan: 'VIP 90-DAYS', expiry: '13-05-2026', logged: 'YES' },
                    { id: '000837635', name: 'student007', status: 'ACTIVE', plan: 'VIP 60-DAYS', expiry: '11-04-2026', logged: 'YES' },
                    { id: '000837633', name: 'student006', status: 'ACTIVE', plan: 'VIP 30-DAYS', expiry: '29-03-2026', logged: 'NO' },
                    { id: '000836858', name: 'student005', status: 'ACTIVE', plan: 'VIP 30-DAYS', expiry: '24-03-2026', logged: 'YES' },
                    { id: '000836853', name: 'student002', status: 'ACTIVE', plan: 'MOCK UNIT PACK', expiry: 'NO EXPIRY', logged: 'NO' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-2.5 font-mono text-cyan-700 font-bold">{row.id}</td>
                      <td className="font-bold text-slate-900">{row.name}</td>
                      <td>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                          {row.status}
                        </span>
                      </td>
                      <td className="font-semibold text-slate-600">{row.plan}</td>
                      <td className="font-mono text-[11px] text-slate-500">{row.expiry}</td>
                      <td>
                        <span className={`text-[11px] font-bold ${row.logged === 'YES' ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {row.logged}
                        </span>
                      </td>
                      <td>
                        <button className="text-cyan-600 hover:text-cyan-800 font-bold mr-2">Edit</button>
                        <button className="text-slate-400 hover:text-rose-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>

          {/* Row 3: View & Manage Student's Analytics & Performance */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
            
            <div className="md:col-span-7 bg-white rounded-3xl p-5 shadow-lg border border-slate-200/90">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div>
                  <span className="font-extrabold text-slate-900">Gurwinder Singh</span>
                  <span className="text-[10px] text-slate-400 ml-2">ID: 000471622</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-black text-[10px]">
                  Average Score: 71/90
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center py-4">
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-xs font-bold text-slate-900">72</div>
                  <div className="text-[9px] text-slate-400">Speaking</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-xs font-bold text-slate-900">68</div>
                  <div className="text-[9px] text-slate-400">Writing</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-xs font-bold text-slate-900">74</div>
                  <div className="text-[9px] text-slate-400">Reading</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-xs font-bold text-slate-900">70</div>
                  <div className="text-[9px] text-slate-400">Listening</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                Full test breakdown and scorecard exports available in 1 click.
              </div>
            </div>

            <div className="md:col-span-5 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                View & Manage Student's Analytics & Performance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                You will be able to access all full & sectional mock tests attempted by your students with instant diagnostic heatmaps.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CUSTOMIZATION & UNIFIED IELTS/PTE PANEL (Page 4)                      */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Customization of the Student Practice Platform */}
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Customization of the Student Practice Platform
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Allows you to add your own templates, grammar rules, study files & <strong className="text-slate-900 font-semibold underline decoration-cyan-400">Strategy Videos</strong> for your students.
            </p>
          </div>

          {/* Video Management UI Mockup */}
          <div className="bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-800 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-5 text-slate-800 text-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Manage Strategy Videos</span>
                <button className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition">
                  + Add Video
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold">Show NinetyPTE Official Strategy Videos</span>
                  <span className="px-2 py-0.5 bg-emerald-500 text-white rounded-full font-bold text-[10px]">ON</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold">Add Custom Faculty Video Lessons</span>
                  <span className="px-2 py-0.5 bg-cyan-500 text-white rounded-full font-bold text-[10px]">ENABLED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unified Panel for IELTS & PTE Management */}
          <div className="text-center space-y-2 max-w-3xl mx-auto pt-6">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Unified Panel for IELTS & PTE Management
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Easily manage both your <strong className="text-slate-900 font-semibold">IELTS</strong> and PTE student platforms from a single integrated partner panel—making administration seamless and efficient for your team.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 10 PARTNERSHIP BENEFITS (Page 5)                                      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50/60 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Benefits of Partnering with Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              An institute that partners with NinetyPTE for its software will offer students a range of powerful features to enhance their PTE preparation:
            </p>
          </div>

          {/* 10 Benefit Cards Grid (5x2 on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {partnershipBenefits.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-cyan-300 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Our Partners Global Offices Section (Page 5) */}
          <div className="pt-12 space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-center tracking-tight">
              Our Partners & Global Offices
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {globalOffices.map((office, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition text-center space-y-2"
                >
                  <div className="text-3xl mb-1">{office.flag}</div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider">{office.country}</div>
                  <div className="text-xs font-bold text-cyan-600">{office.name}</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{office.address}</p>
                  <div className="font-mono text-xs font-bold text-slate-700 pt-1">{office.phone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Elevate Results CTA */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Elevate Your PTE Results!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Improve your institute's PTE preparation with NinetyPTE's PTE Practice Software.
            </p>
            <div className="pt-2">
              <button
                onClick={() => window.scrollTo({ top: 150, behavior: 'smooth' })}
                className="px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
              >
                Become a Partner
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRUSTED BY 2000+ INSTITUTES & MAP (Page 6)                            */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="text-center space-y-1">
            <div className="text-xs font-black uppercase tracking-widest text-cyan-600">Global Footprint</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Trusted by <span className="text-cyan-500">2000+</span> Institutes
            </h2>
            <div className="text-xl sm:text-2xl font-bold text-slate-700">
              Spread Across <span className="text-cyan-600 font-black">28+</span> Countries Globally
            </div>
          </div>

          {/* Global Reach Interactive Visual */}
          <div className="relative rounded-3xl p-8 bg-gradient-to-b from-slate-50 to-cyan-50/20 border border-slate-200/80 overflow-hidden text-center">
            
            {/* World Map Dots / Marker Pins */}
            <div className="flex flex-wrap justify-center gap-4 py-8">
              {[
                '🇵🇰 Pakistan (Islamabad, Lahore, Karachi, Faisalabad)',
                '🇦🇺 Australia (Melbourne, Sydney, Brisbane, Adelaide)',
                '🇦🇪 United Arab Emirates (Dubai, Abu Dhabi, Sharjah)',
                '🇬🇧 United Kingdom (London, Manchester, Birmingham)',
                '🇨🇦 Canada (Toronto, Vancouver, Calgary)',
                '🇮🇳 India (Delhi, Hyderabad, Ahmedabad, Bangalore)',
                '🇸🇦 Saudi Arabia (Riyadh, Jeddah)',
                '🇳🇿 New Zealand (Auckland, Wellington)'
              ].map((loc, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs hover:border-cyan-400 transition"
                >
                  {loc}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-500 font-medium max-w-lg mx-auto">
              Empowering over 3,000,000+ candidates through authorized institutional centers worldwide.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FAQs (Page 6)                                                         */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Here are answers to some of the frequently asked questions.
            </p>

            {/* Segmented Switch: General vs Software Tutorial */}
            <div className="pt-2">
              <div className="inline-flex p-1 bg-slate-200/80 rounded-full border border-slate-300 text-xs font-bold">
                <button
                  onClick={() => { setActiveFaqTab('general'); setOpenFaq(0); }}
                  className={`px-6 py-2 rounded-full transition ${
                    activeFaqTab === 'general'
                      ? 'bg-[#00c2cb] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => { setActiveFaqTab('tutorial'); setOpenFaq(0); }}
                  className={`px-6 py-2 rounded-full transition ${
                    activeFaqTab === 'tutorial'
                      ? 'bg-[#00c2cb] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Software Tutorial
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {currentFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-cyan-600 transition"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
