import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Video, 
  Building2, 
  Award, 
  X,
  Share2,
  ExternalLink,
  Tag
} from 'lucide-react';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegisteredSuccess, setIsRegisteredSuccess] = useState(false);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    institute: '',
    city: '',
    role: 'Trainer / Educator'
  });

  // Featured Event (1:1 with user reference PDF)
  const featuredEvent = {
    id: 'conclave-2026',
    title: 'IELTS & PTE Excellence Conclave — 2026',
    tagline: 'Elevating Trainers. Empowering Institutes. Transforming Student Outcomes.',
    category: 'Conclave',
    date: 'Saturday, 21st March 2026',
    dateDisplay: {
      day: '21',
      weekday: 'Saturday',
      monthYear: 'March 2026'
    },
    time: '04:00 PM - 07:00 PM',
    venue: 'Hotel Park Plaza, Ludhiana, Punjab',
    locationType: 'In-Person & Live Stream',
    organizer: 'Organized by NinetyPTE',
    description:
      'Join industry leaders and senior AI researchers from OpenAI, Google, and Microsoft as they discuss the future of Generative AI in PTE and English language assessments, next-gen automated scoring, and institutional training excellence.',
    highlights: [
      'Future of AI in English Language Testing & Automated Scoring',
      'Hands-on Masterclass: Real-time PTE Algorithm Updates',
      'Exclusive Networking with 500+ Top Institute Directors',
      'Free CPD & NinetyPTE Master Trainer Accreditation Certificate'
    ],
    speakers: [
      { name: 'Dr. Sarah Mitchell', role: 'Head of AI Assessment, Global EdTech', org: 'Ex-Google Research' },
      { name: 'Rajesh Sharma', role: 'Lead Academic Director', org: 'NinetyPTE Education' },
      { name: 'Marcus Vance', role: 'Principal Speech Scientist', org: 'Language AI Lab' }
    ]
  };

  // Additional Events Directory
  const eventsList = [
    {
      id: 'webinar-ai-scoring',
      title: 'Mastering AI-Driven PTE Scoring & Algorithm Insights',
      category: 'Webinar',
      badge: 'Live Webinar',
      date: 'Thursday, April 9, 2026',
      dateDisplay: {
        day: '09',
        weekday: 'Thursday',
        monthYear: 'April 2026'
      },
      time: '05:00 PM - 06:30 PM (AEST)',
      venue: 'Online Interactive Stream (Zoom)',
      locationType: 'Online Stream',
      description:
        'A comprehensive deep dive into the internal acoustic modeling, phonetic scoring, and written discourse evaluation matrices used in PTE mock scoring engines.',
      seats: 'Limited to 1,000 attendees'
    },
    {
      id: 'train-the-trainer-sydney',
      title: 'Train-The-Trainer: 3-Day Certified Coaching Bootcamp',
      category: 'Training',
      badge: 'Certification Workshop',
      date: 'April 18 - 20, 2026',
      dateDisplay: {
        day: '18',
        weekday: 'Fri - Sun',
        monthYear: 'April 2026'
      },
      time: '10:00 AM - 04:00 PM',
      venue: 'NinetyPTE Innovation Hub, Melbourne & Online Hybrid',
      locationType: 'Hybrid',
      description:
        'Empower your coaching faculty with official NinetyPTE teaching frameworks, automated diagnostics, question bank curriculum curation, and classroom management tools.',
      seats: 'Only 50 seats per cohort'
    },
    {
      id: 'global-edtech-hyderabad',
      title: 'Global EdTech & Language Assessment Expo 2026',
      category: 'Exhibition',
      badge: 'Global Exhibition',
      date: 'May 12 - 13, 2026',
      dateDisplay: {
        day: '12',
        weekday: 'Tue - Wed',
        monthYear: 'May 2026'
      },
      time: '09:00 AM - 06:00 PM',
      venue: 'Hyderabad International Convention Centre (HICC), India',
      locationType: 'In-Person Exhibition',
      description:
        'Visit NinetyPTE at Booth #C-42 to experience live product demos of our White-Label Institute Software, AI scoring APIs, and IELTS practice ecosystem.',
      seats: 'Open registration'
    },
    {
      id: 'pte-core-summit',
      title: 'PTE Core vs PTE Academic: Strategic Migration Insights',
      category: 'Webinar',
      badge: 'Strategic Webinar',
      date: 'Wednesday, May 27, 2026',
      dateDisplay: {
        day: '27',
        weekday: 'Wednesday',
        monthYear: 'May 2026'
      },
      time: '04:00 PM - 05:30 PM (IST)',
      venue: 'Online Broadcast & Q&A',
      locationType: 'Online Stream',
      description:
        'Learn the structural differences between PTE Core (Canada CLB benchmarks) and PTE Academic, with score concordance charts, strategy guides, and student advisory tips.',
      seats: 'Free access'
    },
    {
      id: 'past-summit-sydney',
      title: 'Australasian Language Educators Conclave 2025',
      category: 'Past',
      badge: 'Past Event Recording',
      date: 'November 14, 2025',
      dateDisplay: {
        day: '14',
        weekday: 'Friday',
        monthYear: 'Nov 2025'
      },
      time: 'Full Day Event',
      venue: 'International Convention Centre (ICC), Sydney',
      locationType: 'Archived Recording Available',
      description:
        'Over 1,200 delegates gathered in Sydney to examine modern language assessment trends. Watch keynotes on neural speech recognition and adaptive testing.',
      seats: 'Recording available on demand'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'conclave', label: 'Conclaves & Summits' },
    { id: 'webinar', label: 'Live Webinars' },
    { id: 'training', label: 'Train-The-Trainer' },
    { id: 'exhibition', label: 'Exhibitions' },
    { id: 'past', label: 'Past Events' }
  ];

  const filteredEvents = eventsList.filter(ev => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'conclave') return ev.category.toLowerCase().includes('conclave');
    if (activeCategory === 'webinar') return ev.category.toLowerCase().includes('webinar');
    if (activeCategory === 'training') return ev.category.toLowerCase().includes('training');
    if (activeCategory === 'exhibition') return ev.category.toLowerCase().includes('exhibition');
    if (activeCategory === 'past') return ev.category.toLowerCase().includes('past');
    return true;
  });

  const handleOpenRegister = (eventItem) => {
    setSelectedEvent(eventItem);
    setIsRegisteredSuccess(false);
    setIsRegisterModalOpen(true);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsRegisteredSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (1:1 with user reference PDF)                          */}
      {/* ========================================================================= */}
      <section className="pt-10 pb-12 bg-gradient-to-b from-cyan-50/40 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold tracking-wider uppercase border border-cyan-100 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00c2cb] animate-pulse"></span>
            <span>GLOBAL EVENTS • WEBINARS • CONCLAVES</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Events &amp; Webinars
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="max-w-3xl mx-auto text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed font-normal">
            Explore NinetyPTE&apos;s global events including exhibitions, webinars, Train-the-Trainer programs and industry conclaves designed to elevate educators, empower institutes and transform student outcomes.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED EVENT SECTION (1:1 with user reference PDF)                  */}
      {/* ========================================================================= */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          
          {/* Featured Event Section Label */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>FEATURED EVENT</span>
            </div>
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Limited Seats Available • Early Registration Recommended
            </span>
          </div>

          {/* Master Featured Card Container */}
          <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-2xl">
            
            {/* ------------------------------------------------------------------- */}
            {/* Left Poster (Visual Representation matching the reference PDF)     */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-[#0f2942] to-[#003847] p-8 sm:p-10 text-white relative flex flex-col justify-between overflow-hidden">
              
              {/* Subtle Glowing Radial Background Overlays */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Top Meta within Poster */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-[11px] font-bold border border-white/15">
                    {featuredEvent.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Registrations Open</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs tracking-wider uppercase text-cyan-300 font-bold mb-1">
                    {featuredEvent.organizer}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    {featuredEvent.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-normal italic">
                  &ldquo;{featuredEvent.tagline}&rdquo;
                </p>
              </div>

              {/* Bottom Schedule Card within Poster */}
              <div className="relative z-10 pt-8 mt-6 border-t border-white/15 space-y-4">
                
                {/* Date Highlight Badge */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                  <div className="w-12 h-12 rounded-xl bg-[#00c2cb] text-white flex flex-col items-center justify-center font-black shrink-0 shadow-md">
                    <span className="text-[10px] uppercase font-bold leading-none">{featuredEvent.dateDisplay.monthYear.split(' ')[0]}</span>
                    <span className="text-lg leading-tight">{featuredEvent.dateDisplay.day}</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">
                      {featuredEvent.dateDisplay.weekday}, {featuredEvent.dateDisplay.monthYear}
                    </div>
                    <div className="text-[11px] text-cyan-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-300" />
                      <span>{featuredEvent.time}</span>
                    </div>
                  </div>
                </div>

                {/* Venue Line */}
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <MapPin className="w-4 h-4 text-[#00c2cb] shrink-0" />
                  <span className="font-semibold">{featuredEvent.venue}</span>
                </div>

              </div>

            </div>

            {/* ------------------------------------------------------------------- */}
            {/* Right Information & Action Panel                                   */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-5">
                
                {/* Date & Time Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold border border-cyan-100">
                    <Calendar className="w-3.5 h-3.5 text-[#00c2cb]" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hotel Park Plaza, Ludhiana</span>
                  </div>
                </div>

                {/* Event Heading */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-xs text-[#00c2cb] font-bold uppercase tracking-wider mt-1">
                    Elevating Trainers • Empowering Institutes • Transforming Student Outcomes
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {featuredEvent.description}
                </p>

                {/* Key Takeaways Checklist */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                    Conclave Highlights:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {featuredEvent.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00c2cb] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Speakers Row */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                    Distinguished Keynotes &amp; Panellists:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {featuredEvent.speakers.map((spk, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="font-bold text-xs text-slate-900">{spk.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{spk.role}</div>
                        <div className="text-[10px] text-[#00c2cb] font-extrabold">{spk.org}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons (1:1 with user reference PDF) */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleOpenRegister(featuredEvent)}
                  className="px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Register Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleOpenRegister(featuredEvent)}
                  className="px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs sm:text-sm border border-slate-300 shadow-2xs transition cursor-pointer"
                >
                  View Details
                </button>

                <div className="text-xs text-slate-400 font-medium ml-auto hidden sm:block">
                  Free pass for educators &amp; institute representatives
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EVENT CATEGORY TABS & DIRECTORY GRID                                  */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Upcoming &amp; Past Sessions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Filter by format, workshop series, or educational conference
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#00c2cb] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => (
              <div 
                key={ev.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top Banner */}
                <div className="p-6 space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#00c2cb] text-[10px] font-black uppercase tracking-wider border border-cyan-100">
                      {ev.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {ev.locationType}
                    </span>
                  </div>

                  {/* Date Tile */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center font-black shrink-0 shadow-xs">
                      <span className="text-[9px] uppercase font-bold text-cyan-400 leading-none">{ev.dateDisplay.monthYear.split(' ')[0]}</span>
                      <span className="text-base leading-tight">{ev.dateDisplay.day}</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{ev.date}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{ev.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#00c2cb] transition-colors leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {ev.description}
                    </p>
                  </div>

                  {/* Venue / Location */}
                  <div className="pt-2 flex items-start gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#00c2cb] shrink-0 mt-0.5" />
                    <span className="font-medium line-clamp-1">{ev.venue}</span>
                  </div>

                </div>

                {/* Card Bottom Actions */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    {ev.seats}
                  </span>

                  <button
                    onClick={() => handleOpenRegister(ev)}
                    className="px-4 py-1.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-2xs transition active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    <span>{ev.category === 'Past' ? 'View Archive' : 'Register Free'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY PARTICIPATE IN NINETYPTE EVENTS                                    */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Why Join <span className="text-[#00c2cb]">NinetyPTE Global Events?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Whether you are an aspiring trainer, institute principal, or language school founder, our events bring together the best minds in technology and test preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/90 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Pioneering AI Assessment Tech
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Gain direct access to cutting-edge research in speech recognition, automatic essay scoring, and AI diagnostic engines that replicate Pearson standards with 99.2% accuracy.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/90 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Accredited Trainer Certification
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Receive official NinetyPTE Master Trainer badges and certificates to elevate your coaching pedigree and boost your institute&apos;s enrollment credibility.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/90 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Global Institute Networking
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Connect with an international network of over 2,000 partner institutes, education agents, and university pathway counselors across Australia, India, and beyond.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOST / SPONSOR AN EVENT CALLOUT BANNER                                */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
            
            <div className="space-y-3 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>Host or Partner</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Want to Host a <span className="text-[#00c2cb]">NinetyPTE Conclave</span> in Your City?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                We regularly collaborate with regional coaching hubs, universities, and education franchises to deliver localized workshops and technology expos.
              </p>
            </div>

            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 shrink-0 relative z-10 flex items-center gap-2"
            >
              <span>Contact Events Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. REGISTRATION MODAL                                                     */}
      {/* ========================================================================= */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isRegisteredSuccess ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00c2cb]">
                    Registration Pass
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    {selectedEvent?.title || 'Event Registration'}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-3 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedEvent?.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {selectedEvent?.time}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-1 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 / +61..."
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Institute / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Academy"
                        value={regForm.institute}
                        onChange={(e) => setRegForm({ ...regForm, institute: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City / Region</label>
                      <input
                        type="text"
                        placeholder="e.g. Ludhiana, Melbourne"
                        value={regForm.city}
                        onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Role</label>
                    <select
                      value={regForm.role}
                      onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb]"
                    >
                      <option value="Trainer / Educator">Trainer / Educator</option>
                      <option value="Institute Director / Owner">Institute Director / Owner</option>
                      <option value="Education Agent / Counselor">Education Agent / Counselor</option>
                      <option value="Student / Test Aspirant">Student / Test Aspirant</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-sm shadow-md transition active:scale-95 cursor-pointer"
                >
                  Confirm Free Registration
                </button>

              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{regForm.fullName || 'Attendee'}</strong>. Your complimentary seat for <strong className="text-slate-900">{selectedEvent?.title}</strong> has been reserved.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ticket Pass ID:</span>
                    <span className="font-mono font-bold text-slate-900">NPTE-EVT-2026-9812</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Venue:</span>
                    <span className="font-semibold text-slate-900">{selectedEvent?.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time:</span>
                    <span className="font-semibold text-[#00c2cb]">{selectedEvent?.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
