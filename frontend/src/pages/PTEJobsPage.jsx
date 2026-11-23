import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Share2, 
  Briefcase, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Send, 
  Building2, 
  PlusCircle, 
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

export default function PTEJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [postJobSuccess, setPostJobSuccess] = useState(false);

  // Application Form State
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '1-3 years',
    pteScore: 'Overall 79+',
    notes: ''
  });

  // Post Job Form State
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    company: '',
    location: 'Remote Work',
    type: 'Remote Work',
    email: '',
    phone: '',
    salary: '',
    description: ''
  });

  // Sample Real-world PTE Job Listings matching user screenshot 1:1
  const initialJobs = [
    {
      id: 1,
      title: 'PTE Instructor',
      company: 'Endynamocoaching',
      email: 'federica@endynamocoaching.com',
      phone: '439337050',
      description:
        'Endynamocoaching is looking for a remote PTE instructor - are you looking for a flexible, dynamic and innovative environment? This is the right place for you.',
      type: 'Remote Work',
      location: 'Remote Work',
      postedDate: '2 days ago',
      salary: '$35 - $50 / hr (AUD)',
      experience: '2+ years PTE teaching experience',
      requirements: [
        'Demonstrated PTE Academic score of 79+ or native English fluency',
        'Experience conducting interactive online speaking and writing feedback sessions',
        'Familiarity with AI scoring metrics, speech recognition, and diagnostic practice software',
        'Strong student mentoring skills and prompt feedback delivery'
      ],
      responsibilities: [
        'Deliver one-on-one and small group online PTE coaching sessions',
        'Review student mock test scores and formulate targeted score boost plans',
        'Conduct live diagnostic sessions for Speaking (RA, RS, DI, RL) and Writing (SWT, WE)',
        'Track learner milestone achievements and test readiness'
      ]
    },
    {
      id: 2,
      title: 'Field Sales Executive - B2B (SaaS & Software Solutions)',
      company: 'NinetyPTE Education',
      email: 'careers@ninetypte.com',
      phone: '+61 470260221',
      description:
        'We are looking for a proactive, target-driven Field Sales Executive to promote our SaaS products, software solutions, and digital services to corporate clients, educational institutions, training centres, and other business partners.',
      type: 'Full Time',
      location: 'Melbourne, Australia',
      postedDate: '4 days ago',
      salary: '$65,000 - $85,000 + Super + Uncapped Commission',
      experience: '3+ years B2B SaaS / EdTech Sales',
      requirements: [
        'Proven track record in selling enterprise software, institutional portals, or white-label solutions',
        'Strong network among language academies, study abroad agencies, and test prep institutes',
        'Excellent verbal communication, consultative pitching, and deal-closing capabilities',
        'Valid Australian driver’s license and work authorization'
      ],
      responsibilities: [
        'Prospect, demo, and onboard regional coaching institutes onto NinetyPTE White-Label Software',
        'Build long-term partnerships with directors of education agencies and overseas recruiters',
        'Achieve quarterly subscription targets and coordinate technical setup with support teams',
        'Represent NinetyPTE at regional educational summits, conclaves, and expos'
      ]
    },
    {
      id: 3,
      title: 'Field Sales Executive - B2B (SaaS & Software Solutions)',
      company: 'NinetyPTE Institutional Growth',
      email: 'careers@ninetypte.com',
      phone: '+61 470260221',
      description:
        'We are looking for a proactive, target-driven Field Sales Executive to promote our SaaS products, software solutions, and digital services to corporate clients, educational institutions, training centres, and other business partners.',
      type: 'Full Time',
      location: 'Sydney, Australia',
      postedDate: '1 week ago',
      salary: '$65,000 - $85,000 + Performance Bonus',
      experience: '2+ years in Education or SaaS partnerships',
      requirements: [
        'Energetic relationship builder with passion for educational technology',
        'Experience negotiating contract terms with training institute principals',
        'Proficiency with CRM tools and structured pipeline tracking',
        'Fluency in English (multilingual skills e.g. Punjabi/Hindi is an asset)'
      ],
      responsibilities: [
        'Drive business development across New South Wales educational institutions',
        'Host interactive software product demonstrations for prospective institute owners',
        'Collaborate with marketing teams to roll out localized voucher and test promotions'
      ]
    },
    {
      id: 4,
      title: 'Senior PTE Academic & Core Master Trainer',
      company: 'Apex Global Language Institute',
      email: 'hr@apexglobaledu.com',
      phone: '+91 9876543210',
      description:
        'Apex Global is seeking an experienced PTE Master Trainer for our flagship Ludhiana campus. Lead classroom cohorts, grade essays, and assist students in achieving 79+ scores.',
      type: 'Full Time',
      location: 'Ludhiana, India',
      postedDate: 'Just now',
      salary: '₹50,000 - ₹75,000 / month',
      experience: '3+ years classroom coaching',
      requirements: [
        'Official PTE score report showing 85+ in all communicative skills',
        'In-depth mastery of PTE Academic and PTE Core test patterns and templates',
        'Dynamic classroom delivery with student retention track record'
      ],
      responsibilities: [
        'Conduct daily batch lectures for Academic & Core cohorts',
        'Perform weekly full-length mock test score evaluations using AI tools',
        'Mentor struggling students on pronunciation, fluency, and grammar mechanics'
      ]
    },
    {
      id: 5,
      title: 'Online PTE Speaking & Pronunciation Coach',
      company: 'FluencyFirst Academy',
      email: 'recruitment@fluencyfirst.org',
      phone: '+61 391234567',
      description:
        'Part-time evening coaching role for native or high-proficiency English trainers specializing in PTE Read Aloud, Repeat Sentence, and oral fluency correction.',
      type: 'Part Time',
      location: 'Remote Work',
      postedDate: '3 days ago',
      salary: '$40 - $55 / hr (AUD)',
      experience: '1+ years speaking coaching',
      requirements: [
        'Clear acoustic diction and neutral accent comprehension',
        'Reliable high-speed broadband and professional studio microphone',
        'Patience and structured pedagogical feedback techniques'
      ],
      responsibilities: [
        'Host 45-minute 1-on-1 vocal coaching sessions via video call',
        'Provide actionable oral fluency tips and rhythm pacing strategies'
      ]
    },
    {
      id: 6,
      title: 'PTE Content Writer & Question Bank Creator',
      company: 'NinetyPTE R&D Lab',
      email: 'content@ninetypte.com',
      phone: '+61 470260221',
      description:
        'Develop authentic exam-standard question items for PTE Academic and PTE Core test banks, including Read Aloud passages, Summarize Spoken Text audios, and Fill in the Blanks.',
      type: 'Contract',
      location: 'Remote Work',
      postedDate: '5 days ago',
      salary: 'Competitive per-item / retainer fee',
      experience: 'PTE content creation or ESL curriculum design',
      requirements: [
        'Native-level command of academic and workplace English registers',
        'Strict adherence to Pearson word count, vocabulary bands, and CEFR levels',
        'Attention to detail and original, plagiarism-free item writing'
      ],
      responsibilities: [
        'Author 200+ original Reading and Listening question items monthly',
        'Provide standardized answer keys, collocation rationales, and grammar notes'
      ]
    }
  ];

  const [jobs, setJobs] = useState(initialJobs);

  // Filtered jobs logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = 
        locationFilter === 'All' || 
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesType = 
        typeFilter === 'All' || 
        job.type.toLowerCase().includes(typeFilter.toLowerCase());

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  // Selected Job Details Object
  const activeJob = jobs.find(j => j.id === selectedJobId);

  const handleShare = (job, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setApplySuccess(false);
    }, 2500);
  };

  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      title: newJobForm.title || 'PTE Coaching Specialist',
      company: newJobForm.company || 'Partner Academy',
      email: newJobForm.email || 'jobs@ninetypte.com',
      phone: newJobForm.phone || '+61 400000000',
      description: newJobForm.description || 'Exciting opportunity for a PTE trainer to join our expanding team.',
      type: newJobForm.type,
      location: newJobForm.location,
      postedDate: 'Just now',
      salary: newJobForm.salary || 'Negotiable',
      experience: '1+ years',
      requirements: [
        'PTE Academic or Core teaching experience',
        'Excellent student engagement and communication skills'
      ],
      responsibilities: [
        'Deliver structured mock tests and provide actionable diagnostics'
      ]
    };
    setJobs([newEntry, ...jobs]);
    setPostJobSuccess(true);
    setTimeout(() => {
      setIsPostJobModalOpen(false);
      setPostJobSuccess(false);
      setSelectedJobId(newEntry.id);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION (1:1 with user screenshot)                         */}
      {/* ========================================================================= */}
      <section className="pt-10 pb-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          
          {/* Main Title: PTE in Slate, Job Listing in Cyan */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            PTE <span className="text-[#00c2cb]">Job Listing</span>
          </h1>

          {/* Subtitle / Advisory Disclaimer matching user screenshot 1:1 */}
          <p className="max-w-4xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            If you&apos;re seeking a position as a PTE trainer, feel free to apply directly to any of the job opportunities listed below. Please note, this page is intended solely to help connect job seekers with institutes. NinetyPTE does not guarantee placements and cannot be held liable for any outcomes.
          </p>

          {/* Action Row for Recruiters */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 hover:bg-cyan-100 text-[#00c2cb] text-xs font-bold border border-cyan-200 transition cursor-pointer active:scale-95 shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Are you an Institute or Recruiter? Post a Job Free</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEARCH & FILTER BAR (1:1 with user screenshot)                         */}
      {/* ========================================================================= */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
            
            {/* Search Input */}
            <div className="flex-1 relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search PTE Job Listings"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb] focus:ring-1 focus:ring-[#00c2cb] text-xs sm:text-sm placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Location Dropdown */}
            <div className="w-full md:w-48">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:outline-hidden focus:border-[#00c2cb] cursor-pointer"
              >
                <option value="All">Location (All)</option>
                <option value="Remote Work">Remote Work</option>
                <option value="Melbourne">Melbourne, Australia</option>
                <option value="Sydney">Sydney, Australia</option>
                <option value="Ludhiana">Ludhiana, India</option>
              </select>
            </div>

            {/* Posted Date Dropdown */}
            <div className="w-full md:w-44">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 focus:outline-hidden focus:border-[#00c2cb] cursor-pointer"
              >
                <option value="All">Posted Date</option>
                <option value="Today">Past 24 Hours</option>
                <option value="Week">Past Week</option>
                <option value="Month">Past Month</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={() => {}}
              className="px-8 py-2.5 rounded-xl bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer shrink-0"
            >
              Search
            </button>

          </div>

          {/* Quick Filter Pills Row */}
          <div className="pt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter by:
            </span>
            {['All', 'Remote Work', 'Full Time', 'Part Time', 'Contract'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                  typeFilter === type
                    ? 'bg-[#00c2cb] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
            <span className="ml-auto text-slate-400 font-medium">
              Showing {filteredJobs.length} position{filteredJobs.length === 1 ? '' : 's'}
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TWO-COLUMN INTERACTIVE JOB DIRECTORY (1:1 with user screenshot)        */}
      {/* ========================================================================= */}
      <section className="py-6 bg-white pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: LIST OF JOB CARDS (1:1 styling from user screenshot)   */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 space-y-4">
              
              {filteredJobs.map((job) => {
                const isSelected = selectedJobId === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`rounded-2xl border p-5 transition-all cursor-pointer relative bg-white ${
                      isSelected
                        ? 'border-[#00c2cb] ring-2 ring-cyan-500/20 shadow-md'
                        : 'border-slate-200/90 hover:border-cyan-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Top Row: Job Title + Share Button */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                          {job.title}
                        </h2>
                        <div className="text-xs text-[#00c2cb] font-extrabold mt-0.5">
                          {job.company}
                        </div>
                      </div>

                      {/* Share Button with copy feedback */}
                      <button
                        onClick={(e) => handleShare(job, e)}
                        title="Share / Copy Link"
                        className="p-1.5 rounded-full text-cyan-600 hover:bg-cyan-50 transition cursor-pointer shrink-0"
                      >
                        {copiedId === job.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Contact Rows: Email + Phone matching screenshot 1:1 */}
                    <div className="space-y-1 text-xs text-slate-600 font-medium mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <a 
                          href={`mailto:${job.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-cyan-600 transition truncate"
                        >
                          {job.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <a 
                          href={`tel:${job.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-cyan-600 transition"
                        >
                          {job.phone}
                        </a>
                      </div>
                    </div>

                    {/* Job Snippet */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Bottom Row: Job Type Pill + View Button matching screenshot 1:1 */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-xs font-semibold text-slate-700">
                        {job.type}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJobId(job.id);
                        }}
                        className={`px-5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#00c2cb] text-white border-[#00c2cb] shadow-2xs'
                            : 'bg-white hover:bg-cyan-50 text-[#00c2cb] border-[#00c2cb]'
                        }`}
                      >
                        View
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* Pagination matching screenshot: ← Previous [1] 2 3 4 Next → */}
              <div className="pt-4 flex items-center justify-between text-xs font-bold text-slate-600">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="flex items-center gap-1 hover:text-cyan-600 cursor-pointer disabled:opacity-40"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map(p => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition cursor-pointer ${
                        currentPage === p
                          ? 'bg-[#00c2cb] text-white shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, 4))}
                  className="flex items-center gap-1 hover:text-cyan-600 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: DETAIL PREVIEW PANE (1:1 with user screenshot)        */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 sticky top-24">
              
              <div className="rounded-3xl border border-cyan-200/90 bg-white p-6 sm:p-8 min-h-[560px] shadow-sm flex flex-col justify-between relative overflow-hidden">
                
                {activeJob ? (
                  /* Full Detailed Job Description View */
                  <div className="space-y-6">
                    
                    {/* Header Controls */}
                    <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-50 text-[#00c2cb] text-[11px] font-black uppercase tracking-wider border border-cyan-100">
                          {activeJob.type}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {activeJob.title}
                        </h2>
                        <div className="text-xs sm:text-sm font-bold text-slate-700">
                          {activeJob.company} • <span className="text-slate-500 font-normal">{activeJob.location}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedJobId(null)}
                        className="text-xs text-slate-400 hover:text-slate-800 transition p-1"
                        title="Close preview"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Key Meta Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Compensation</div>
                        <div className="text-xs font-black text-slate-900 mt-0.5">{activeJob.salary}</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Experience</div>
                        <div className="text-xs font-black text-slate-900 mt-0.5">{activeJob.experience}</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Posted</div>
                        <div className="text-xs font-black text-slate-900 mt-0.5">{activeJob.postedDate}</div>
                      </div>
                    </div>

                    {/* About the Position */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                        Role Overview
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {activeJob.description}
                      </p>
                    </div>

                    {/* Key Responsibilities */}
                    {activeJob.responsibilities && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                          {activeJob.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00c2cb] shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Requirements */}
                    {activeJob.requirements && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                          Candidate Requirements:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                          {activeJob.requirements.map((r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recruiter Direct Contact Box */}
                    <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100 space-y-2">
                      <div className="text-xs font-black text-slate-900">Direct Recruiter Contact:</div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-cyan-600" />
                          <a href={`mailto:${activeJob.email}`} className="text-cyan-700 hover:underline">
                            {activeJob.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-cyan-600" />
                          <a href={`tel:${activeJob.phone}`} className="text-cyan-700 hover:underline">
                            {activeJob.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Application CTA Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Apply for this Job</span>
                      </button>

                      <a
                        href={`mailto:${activeJob.email}?subject=Application for ${activeJob.title} position on NinetyPTE`}
                        className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-2xs transition cursor-pointer"
                      >
                        Email Directly
                      </a>
                    </div>

                  </div>
                ) : (
                  /* Empty State Matching Screenshot 1:1 */
                  <div className="flex flex-col items-center justify-center flex-1 py-12 text-center space-y-6">
                    
                    {/* Top instruction line matching screenshot */}
                    <div className="w-full text-left space-y-0.5 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                        <ArrowRight className="w-4 h-4 text-[#00c2cb]" />
                        <span>Select a Job</span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        Display details here
                      </div>
                    </div>

                    {/* Center Job Phone Illustration representation */}
                    <div className="py-8 flex flex-col items-center justify-center space-y-4">
                      
                      {/* Stylized Phone & Recruiter Mockup */}
                      <div className="w-56 h-72 rounded-3xl border-4 border-slate-200 bg-slate-50/60 p-3 shadow-inner relative flex flex-col justify-between">
                        {/* Phone Camera Notch */}
                        <div className="w-16 h-2 rounded-full bg-slate-300 mx-auto"></div>
                        
                        {/* Mock Job Rows inside phone */}
                        <div className="space-y-2 py-4">
                          <div className="h-4 w-3/4 bg-slate-200 rounded-md animate-pulse"></div>
                          <div className="h-3 w-1/2 bg-slate-200 rounded-md"></div>
                          <div className="h-2 w-full bg-slate-100 rounded-md"></div>
                          <div className="h-2 w-5/6 bg-slate-100 rounded-md"></div>
                          
                          <div className="pt-2">
                            <div className="h-8 w-full bg-cyan-100/60 rounded-xl flex items-center justify-center">
                              <span className="text-[10px] font-bold text-[#00c2cb]">Active Job Postings</span>
                            </div>
                          </div>
                        </div>

                        {/* Phone Home Bar */}
                        <div className="w-12 h-1 rounded-full bg-slate-300 mx-auto"></div>
                      </div>

                      <div className="max-w-xs space-y-1">
                        <div className="text-xs font-bold text-slate-700">
                          Click on any job card from the left
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Review compensation, requirements, and submit applications directly to hiring institutes.
                        </div>
                      </div>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MODAL: APPLY FOR JOB                                                  */}
      {/* ========================================================================= */}
      {isApplyModalOpen && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-5">
            
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!applySuccess ? (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00c2cb]">
                    Direct Application
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Apply for {activeJob.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    To: {activeJob.company} ({activeJob.email})
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+61 / +91..."
                        value={appForm.phone}
                        onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">PTE Teaching Experience</label>
                      <select
                        value={appForm.experience}
                        onChange={(e) => setAppForm({ ...appForm, experience: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">PTE Score Band</label>
                      <select
                        value={appForm.pteScore}
                        onChange={(e) => setAppForm({ ...appForm, pteScore: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Overall 90">Overall 90 (Perfect Score)</option>
                        <option value="Overall 85+">Overall 85+</option>
                        <option value="Overall 79+">Overall 79+</option>
                        <option value="Overall 65+">Overall 65+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cover Note / Brief Pitch</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your coaching methodology or availability..."
                      value={appForm.notes}
                      onChange={(e) => setAppForm({ ...appForm, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-sm shadow-md transition active:scale-95 cursor-pointer"
                >
                  Submit Application to Recruiter
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Application Sent Successfully!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your credentials have been dispatched directly to <strong className="text-slate-900">{activeJob.company}</strong>. The hiring coordinator will review your profile and reach out via email or phone.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: POST A JOB (For Recruiters & Institutes)                         */}
      {/* ========================================================================= */}
      {isPostJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-5">
            
            <button
              onClick={() => setIsPostJobModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!postJobSuccess ? (
              <form onSubmit={handlePostJobSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#00c2cb]">
                    Institute Recruiter Portal
                  </span>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    Post a PTE Vacancy
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Connect with over 1.2M qualified PTE instructors and sales specialists.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PTE Instructor"
                        value={newJobForm.title}
                        onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Institute / Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pioneer Academy"
                        value={newJobForm.company}
                        onChange={(e) => setNewJobForm({ ...newJobForm, company: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Job Type</label>
                      <select
                        value={newJobForm.type}
                        onChange={(e) => setNewJobForm({ ...newJobForm, type: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Remote Work">Remote Work</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Melbourne / Remote"
                        value={newJobForm.location}
                        onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Recruiter Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="hiring@institute.com"
                        value={newJobForm.email}
                        onChange={(e) => setNewJobForm({ ...newJobForm, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+61 / +91..."
                        value={newJobForm.phone}
                        onChange={(e) => setNewJobForm({ ...newJobForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Salary / Compensation</label>
                    <input
                      type="text"
                      placeholder="e.g. $40 - $50 / hr or ₹60,000 / month"
                      value={newJobForm.salary}
                      onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description & Requirements *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Detail the coaching scope, target score bands, student batch size, and hours..."
                      value={newJobForm.description}
                      onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#00c2cb]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-sm shadow-md transition active:scale-95 cursor-pointer"
                >
                  Publish Job Free
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Job Published Successfully!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your job listing is now live on the NinetyPTE Job Board. Candidate applications will be routed directly to your inbox.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
