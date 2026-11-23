import { ChevronRight, ShieldCheck, Users, BarChart3, Smartphone } from 'lucide-react';

export default function InstituteSoftwareSection() {
  const pillars = [
    {
      title: 'Custom Branding & White-Label Portals',
      desc: 'Launch your coaching academy with your own custom domain, logo, and brand theme while scaling smoothly across thousands of concurrent learners.',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-600" />
    },
    {
      title: 'Comprehensive Student & Batch Management',
      desc: 'Monitor individual student progress, assign mock test homework, review audio recordings, and generate branded PDF progress certificates.',
      icon: <Users className="w-5 h-5 text-indigo-600" />
    },
    {
      title: 'Integrated Question Bank & Analytics',
      desc: 'Pre-loaded with over 15,000 real exam questions, band 9 strategy videos, and detailed performance diagnostic dashboards for tutors.',
      icon: <BarChart3 className="w-5 h-5 text-purple-600" />
    },
    {
      title: 'Native Mobile Applications (iOS & Android)',
      desc: 'Equip your enrolled students with full access to speech practice and timed mock exams on smartphones and tablets anywhere, anytime.',
      icon: <Smartphone className="w-5 h-5 text-emerald-600" />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
            For Language Academies & Coaching Institutes
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Manage Students, Courses, and AI Practice in One Unified Platform
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Trusted by over 450+ educational centers worldwide, our B2B institutional software streamlines curriculum delivery, exam simulation, and batch reporting.
          </p>
        </div>

        {/* 4 Pillars Grid & Dashboard Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left 4 Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="p-2 rounded-xl bg-white w-fit shadow-xs">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#partner-program"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition"
              >
                <span>Request Institute Demo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Laptop / Partner Portal Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl bg-slate-950 p-4 shadow-2xl border border-slate-800 text-white">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Partner Portal • Master Admin</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-black text-cyan-400">Welcome to Institute Command Center</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Manage student cohorts, allocate scored mock test credits, configure question bank difficulty, and export performance transcripts.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <div className="font-black text-cyan-400 text-base">1,420</div>
                      <div className="text-[10px] text-slate-400">Active Students</div>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <div className="font-black text-emerald-400 text-base">98.4%</div>
                      <div className="text-[10px] text-slate-400">Target Pass Rate</div>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                      <div className="font-black text-purple-400 text-base">24</div>
                      <div className="text-[10px] text-slate-400">Batches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
