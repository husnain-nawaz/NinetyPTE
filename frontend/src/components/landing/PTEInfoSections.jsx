import { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  GraduationCap, 
  Briefcase, 
  Shield, 
  Home, 
  Globe 
} from 'lucide-react';
import { COUNTRY_DATA } from '../../data/landingData';

export default function PTEInfoSections() {
  const [selectedCountry, setSelectedCountry] = useState('Australia');
  const country = COUNTRY_DATA[selectedCountry] || COUNTRY_DATA['Australia'];

  const testTypes = [
    {
      title: 'PTE Academic',
      icon: <GraduationCap className="w-5 h-5 text-cyan-500" />,
      desc: 'Ideal for candidates pursuing undergraduate, postgraduate, or professional degrees abroad, as well as skilled migration to Australia and New Zealand.',
      linkText: 'Learn More About Academic'
    },
    {
      title: 'PTE Core',
      icon: <Briefcase className="w-5 h-5 text-indigo-500" />,
      desc: 'Tailored specifically for Canadian permanent residency (Express Entry), provincial nominations, and Canadian citizenship applications.',
      linkText: 'Learn More About Core'
    },
    {
      title: 'PTE Academic UKVI',
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      desc: 'Designed for applicants needing a Secure English Language Test (SELT) with an official URN for UK study visas and direct employment routes.',
      linkText: 'Learn More About UKVI'
    },
    {
      title: 'PTE Home',
      icon: <Home className="w-5 h-5 text-emerald-500" />,
      desc: 'Pass/fail speaking and listening test approved for UK family visas, settlement, spouse visas, and British citizenship.',
      linkText: 'Learn More About Home'
    }
  ];

  return (
    <div className="space-y-24 py-16 bg-white">
      
      {/* 1. What Is the PTE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 rounded-3xl p-8 border border-cyan-100 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Official Exam Overview</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                What Is the <span className="text-cyan-600">PTE Exam</span>?
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                The Pearson Test of English (PTE) is an advanced computer-based language assessment evaluating real-world English proficiency across Speaking, Writing, Reading, and Listening. Recognized by thousands of leading academic institutions, professional associations, and immigration authorities globally, PTE utilizes sophisticated machine learning algorithms alongside human expertise to guarantee consistent, unbiased scoring with rapid turnaround times.
              </p>
            </div>
            
            <div className="pt-6">
              <a
                href="#practice"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition"
              >
                <span>Practice Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right 4-Card Visual Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'What is PTE Academic?', desc: 'University Admissions & Visas', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80' },
              { title: 'What is PTE Core?', desc: 'Canada Express Entry Pathway', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80' },
              { title: 'PTE Academic UKVI', desc: 'Secure UK Home Office Testing', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' },
              { title: 'Scoring & Band Mapping', desc: 'Detailed 10 to 90 Point Scale', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
            ].map((card, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs h-44">
                <img 
                  src={card.img} 
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-4 text-white">
                  <h4 className="text-sm font-extrabold group-hover:text-cyan-300 transition-colors">{card.title}</h4>
                  <span className="text-[10px] text-slate-300 font-medium">{card.desc}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Why Choose PTE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">The Modern Standard</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Why Choose the PTE Examination?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              PTE delivers a streamlined, stress-free testing experience. Tests can be scheduled up to 24 hours in advance, completed in a single 2-hour session, with official electronic score reports generally accessible within 48 hours.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Accepted worldwide for university study, skilled work, and migration visas',
                'Fully computer-scored by calibrated AI algorithms ensuring absolute fairness',
                'Flexible appointment slots available 365 days a year across hundreds of centers',
                'Practical, real-world communicative tasks reflecting contemporary English usage'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#learn-more"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition"
              >
                <span>Find Out More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Video Preview Thumbnail */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" 
                alt="Students walking together"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                <button 
                  className="w-16 h-16 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                  title="Play Explainer Video"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white/60 text-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold">Why Choose PTE for Immigration & Study?</h4>
                  <span className="text-[10px] text-slate-500">2-Minute Quick Video Guide</span>
                </div>
                <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 text-[10px] font-bold rounded">HD</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Which PTE Test Is Right for You? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Which PTE Test Is Right for You?
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Selecting the appropriate exam depends on your ultimate objective: academic admission, professional licensing, skilled migration, or citizenship. Verify the exact requirement with your target institution or visa authority.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testTypes.map((test, i) => (
            <div 
              key={i}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-cyan-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-2xl bg-slate-50 w-fit mb-4 border border-slate-100">
                  {test.icon}
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mb-2">{test.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{test.desc}</p>
              </div>

              <a 
                href="#test-details"
                className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 pt-3 border-t border-slate-100"
              >
                <span>{test.linkText}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Where can you go with PTE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Where Can You Go with PTE?
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            With thousands of institutions and national immigration departments endorsing PTE scores, your qualification provides seamless international mobility.
          </p>

          {/* Country Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {Object.keys(COUNTRY_DATA).map((cName) => (
              <button
                key={cName}
                onClick={() => setSelectedCountry(cName)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedCountry === cName
                    ? 'bg-cyan-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cName}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Country Details Card */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
                Destination Recognition
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                {country.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {country.desc}
              </p>

              <div className="space-y-2.5 pt-2">
                {country.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a 
                  href="#visa-info"
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1"
                >
                  <span>Find Out More About {country.title} Requirements</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <img 
                src={country.img} 
                alt={country.title}
                className="w-full max-w-sm h-64 object-cover rounded-2xl shadow-md border border-slate-200"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
