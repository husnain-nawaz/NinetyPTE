import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Clock, 
  Laptop, 
  ExternalLink,
  GraduationCap,
  Building2,
  Search,
  DollarSign,
  FileText
} from 'lucide-react';

export default function PTEAcceptancePage() {
  const [activeCountry, setActiveCountry] = useState('australia');
  const [expandedRegions, setExpandedRegions] = useState({
    0: true, // Australasia open by default
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const toggleRegion = (idx) => {
    setExpandedRegions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Country Test Center Data matching Page 2 of PDF
  const testCenterData = {
    australia: {
      country: 'Australia',
      flag: '🇦🇺',
      currency: 'AUD',
      price: 'A$475',
      centers: [
        'Adelaide',
        'Brisbane',
        'Canberra',
        'Gold Coast',
        'Melbourne',
        'Perth',
        'Sydney'
      ],
      idPolicy: 'You are required to present acceptable identification documents when taking the PTE Academic exam, usually your passport. For detailed information regarding the identification requirements applicable to you, please refer to the Acceptable ID Policy.'
    },
    canada: {
      country: 'Canada',
      flag: '🇨🇦',
      currency: 'CAD',
      price: 'C$340',
      centers: [
        'Toronto',
        'Vancouver',
        'Montreal',
        'Calgary',
        'Ottawa',
        'Edmonton',
        'Winnipeg'
      ],
      idPolicy: 'A valid, unexpired passport is the primary required identification document for all test-takers in Canada. Government-issued Canadian photo ID may be accepted under specific regional exemptions.'
    },
    newzealand: {
      country: 'New Zealand',
      flag: '🇳🇿',
      currency: 'NZD',
      price: 'NZ$445',
      centers: [
        'Auckland',
        'Wellington',
        'Christchurch',
        'Hamilton',
        'Dunedin',
        'Palmerston North'
      ],
      idPolicy: 'Valid international passport required on test day. Name and date of birth on your booking must strictly match your passport details exactly.'
    },
    uae: {
      country: 'UAE',
      flag: '🇦🇪',
      currency: 'AED',
      price: 'AED 1,210',
      centers: [
        'Dubai',
        'Abu Dhabi',
        'Sharjah',
        'Al Ain',
        'Ras Al Khaimah'
      ],
      idPolicy: 'Original passport is mandatory for all test-takers in the United Arab Emirates. Emirates ID alone is not accepted for PTE Academic international reporting.'
    },
    china: {
      country: 'China',
      flag: '🇨🇳',
      currency: 'CNY',
      price: '¥2,100',
      centers: [
        'Beijing',
        'Shanghai',
        'Guangzhou',
        'Shenzhen',
        'Chengdu',
        'Wuhan',
        'Hangzhou',
        'Nanjing'
      ],
      idPolicy: 'Chinese citizens may present a valid Second Generation Resident Identity Card or a valid original passport. Foreign nationals must present an original passport.'
    },
    uk: {
      country: 'United Kingdom',
      flag: '🇬🇧',
      currency: 'GBP',
      price: '£215',
      centers: [
        'London',
        'Manchester',
        'Birmingham',
        'Edinburgh',
        'Glasgow',
        'Leeds',
        'Bristol'
      ],
      idPolicy: 'Valid original passport required. For UKVI SELT exams, biometric identification checks will be completed at the test centre.'
    },
    usa: {
      country: 'USA',
      flag: '🇺🇸',
      currency: 'USD',
      price: '$245',
      centers: [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'San Francisco',
        'Boston',
        'Seattle',
        'Dallas'
      ],
      idPolicy: 'Valid passport is required for non-US citizens. US citizens may present a valid state driver license or US passport.'
    },
    india: {
      country: 'India',
      flag: '🇮🇳',
      currency: 'INR',
      price: '₹17,000',
      centers: [
        'Delhi NCR',
        'Mumbai',
        'Bangalore',
        'Hyderabad',
        'Chennai',
        'Pune',
        'Ahmedabad',
        'Chandigarh'
      ],
      idPolicy: 'Original, valid passport is mandatory for all test-takers in India. Aadhaar card or PAN card are not accepted for test center entry.'
    }
  };

  // 7 Global Regions Accordion Data (Page 1 & 2)
  const regionalAcceptance = [
    {
      region: 'Countries who accept PTE in Australasia',
      countries: [
        { name: 'Australia', note: '100% of universities, TAFE institutes, and Department of Home Affairs (DHA) for all visa subclasses (189, 190, 491, 482, 500, 485).' },
        { name: 'New Zealand', note: '100% of universities, institutes of technology, and Immigration New Zealand (INZ) for student and skilled migrant visas.' },
        { name: 'Fiji & South Pacific', note: 'University of the South Pacific, regional academic and professional licensing bodies.' }
      ]
    },
    {
      region: 'Countries who accept PTE in Europe',
      countries: [
        { name: 'United Kingdom', note: '99% of UK universities (including Oxford, Cambridge, Russell Group) and UKVI for Student, Skilled Worker, and Health and Care visas.' },
        { name: 'Ireland', note: '100% of universities and colleges, including Trinity College Dublin, University College Dublin (UCD), and Irish Naturalisation and Immigration Service.' },
        { name: 'Germany', note: 'Over 75+ universities including Technical University of Munich (TUM), LMU Munich, and RWTH Aachen for English-taught master programs.' },
        { name: 'France', note: 'Leading grandes écoles and business schools including HEC Paris, INSEAD, ESSEC, and Sciences Po.' },
        { name: 'Netherlands', note: 'University of Amsterdam, TU Delft, Erasmus University Rotterdam, and Leiden University.' },
        { name: 'Sweden, Spain & Italy', note: 'Lund University, KTH Royal Institute, IE University, Bocconi University, and Politecnico di Milano.' }
      ]
    },
    {
      region: 'Countries who accept PTE in Americas',
      countries: [
        { name: 'United States', note: 'Over 2,000+ universities and colleges including Harvard University, Yale, Stanford, Columbia, NYU, USC, and State University systems.' },
        { name: 'Canada', note: 'Accepted for Student Direct Stream (SDS) by IRCC, Express Entry economic immigration (PTE Core), UBC, McGill University, and University of Toronto.' },
        { name: 'Latin America', note: 'Top institutions in Brazil (USP, FGV), Mexico (Tec de Monterrey, UNAM), Colombia (Universidad de los Andes), and Argentina.' }
      ]
    },
    {
      region: 'Countries who accept PTE in Africa',
      countries: [
        { name: 'South Africa', note: 'University of Cape Town, University of the Witwatersrand (Wits), Stellenbosch University.' },
        { name: 'Nigeria & Ghana', note: 'Accepted by federal ministries, international scholarship boards, and academic exchange programs.' },
        { name: 'Egypt & Kenya', note: 'The American University in Cairo, University of Nairobi, and regional research institutes.' }
      ]
    },
    {
      region: 'Countries who accept PTE in East & Central Asia',
      countries: [
        { name: 'China & Hong Kong', note: 'Tsinghua University, Peking University, University of Hong Kong (HKU), HKUST, Chinese University of Hong Kong (CUHK).' },
        { name: 'Japan', note: 'University of Tokyo, Kyoto University, Waseda University, and Sophia University English-degree programs.' },
        { name: 'South Korea', note: 'Seoul National University, KAIST, Korea University, Yonsei University, and Sungkyunkwan University.' },
        { name: 'Taiwan & Kazakhstan', note: 'National Taiwan University (NTU), National Cheng Kung University, Nazarbayev University.' }
      ]
    },
    {
      region: 'Countries who accept PTE in South & South-East Asia',
      countries: [
        { name: 'Singapore', note: 'National University of Singapore (NUS), Nanyang Technological University (NTU), Singapore Management University (SMU).' },
        { name: 'Malaysia', note: 'Universiti Malaya (UM), Universiti Sains Malaysia, Monash University Malaysia, Curtin Malaysia.' },
        { name: 'India', note: 'Indian School of Business (ISB), SPJIMR, Ashoka University, and management programs accepting international scores.' },
        { name: 'Thailand & Vietnam', note: 'Chulalongkorn University, Mahidol University, RMIT University Vietnam, VinUniversity.' }
      ]
    },
    {
      region: 'Countries who accept PTE in the Middle East',
      countries: [
        { name: 'United Arab Emirates', note: 'NYU Abu Dhabi, American University of Sharjah, University of Wollongong in Dubai, Middlesex Dubai.' },
        { name: 'Saudi Arabia & Qatar', note: 'KAUST, King Fahd University of Petroleum and Minerals, Qatar University, Georgetown University in Qatar.' },
        { name: 'Turkey, Jordan & Oman', note: 'Middle East Technical University, Bilkent University, Sultan Qaboos University.' }
      ]
    }
  ];

  const currentCountryData = testCenterData[activeCountry] || testCenterData.australia;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c2cb] selection:text-white pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="pt-10 sm:pt-14 pb-12 bg-gradient-to-b from-sky-50/50 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          
          {/* Main Title matching Page 1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            PTE Test Centres <span className="text-[#00c2cb]">& PTE Academic Acceptance</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed">
            Empower yourself to make informed decisions about your academic journey with our comprehensive acceptance resources
          </p>

          {/* Hero Banner Image matching Reference PDF */}
          <div className="pt-4 max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] sm:aspect-[21/9]">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80" 
                alt="Student writing PTE Academic exam" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "PTE Academic: Accepted Worldwide for Study Abroad" (Page 1)          */}
      {/* ========================================================================= */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            PTE Academic: <span className="text-[#00c2cb]">Accepted Worldwide for Study Abroad</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            PTE Academic has emerged as a widely recognized English language proficiency test, opening doors to education and career prospects around the world.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "Why Choose PTE Academic for Your Dream Study Abroad?" (Page 1)        */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose PTE Academic for <span className="text-[#00c2cb]">Your Dream Study Abroad?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Embarking on a journey of international study opens doors to endless possibilities and opportunities for personal and professional growth. As you pursue your dream study destination around the world, selecting the right English language proficiency test is crucial. Here's why <strong className="text-slate-900 underline font-semibold decoration-[#00c2cb]">PTE Academic</strong> stands out as the preferred choice for aspiring students like you:
            </p>
          </div>

          {/* 6 Arrow Bullet Points matching Page 1 */}
          <div className="space-y-4 pt-2">
            {[
              {
                title: 'Globally Recognized:',
                desc: 'PTE Academic is accepted by thousands of universities, colleges and institutions in over 200 countries worldwide, spanning across North America, Europe, Australia, Asia and beyond. Its widespread recognition ensures that your PTE Academic score is valued and respected by top-ranking institutions in your desired study destination.'
              },
              {
                title: 'Fast Results & Fair Assessment:',
                desc: 'With PTE Academic, you can expect fast and reliable results, typically available within five business days. Its computer-based format ensures accurate scoring and eliminates human bias, providing a fair assessment of your English language proficiency.'
              },
              {
                title: 'Comprehensive Skills Evaluation:',
                desc: 'PTE Academic evaluates your English language skills across four key areas: Speaking, Writing, Reading and Listening. Through a series of integrated tasks and questions, the test assesses your ability to communicate effectively in real-life academic and professional settings.'
              },
              {
                title: 'Convenient Test Format:',
                desc: 'The computer-based format of PTE Academic offers flexibility and convenience for test takers. You can choose from multiple test dates and locations worldwide, allowing you to schedule your exam at a time and place that suits your needs.'
              },
              {
                title: 'Secure and Fair Testing Environment:',
                desc: 'PTE Academic is conducted in secure test centers equipped with state-of-the-art technology to ensure a fair and standardized testing environment. Your test experience is monitored closely to maintain the integrity and validity of your results.'
              },
              {
                title: 'Trusted by Top Institutions:',
                desc: 'Leading universities, colleges, and professional organizations, including Ivy League institutions and renowned business schools, accept PTE Academic scores for admission to their academic programs. Your PTE Academic qualification opens doors to world-class education and career opportunities.'
              }
            ].map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="shrink-0 text-[#00c2cb] font-black text-sm group-hover:translate-x-0.5 transition-transform mt-0.5">
                  ➤
                </span>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <strong className="text-slate-900 font-bold mr-1.5">{bullet.title}</strong>
                  <span>{bullet.desc}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Which Countries Could PTE Take You To?" (Page 1 & 2)                  */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Which Countries Could <span className="text-[#00c2cb]">PTE Take You To?</span>
          </h2>

          {/* 7 Regional Accordions matching Page 1 & 2 */}
          <div className="space-y-3">
            {regionalAcceptance.map((reg, idx) => {
              const isOpen = expandedRegions[idx];
              return (
                <div 
                  key={idx}
                  className="bg-[#f0f4f9] rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleRegion(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c2cb] transition-colors cursor-pointer"
                  >
                    <span>{reg.region}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#00c2cb]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 bg-white border-t border-slate-200/70 space-y-3 text-xs sm:text-sm animate-in fade-in duration-150">
                      {reg.countries.map((c, cIdx) => (
                        <div key={cIdx} className="pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                          <div className="font-extrabold text-slate-900 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb]"></span>
                            <span>{c.name}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 pl-3.5 leading-relaxed font-normal">
                            {c.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. "Test Centers for PTE Exam" (Page 2)                                   */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Test Centers for <span className="text-[#00c2cb]">PTE Exam</span>
            </h2>
          </div>

          {/* Country Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {Object.keys(testCenterData).map(key => {
              const item = testCenterData[key];
              const active = activeCountry === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCountry(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer shadow-2xs ${
                    active
                      ? 'bg-[#00c2cb] text-white shadow-md scale-105'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-[#00c2cb]'
                  }`}
                >
                  <span className="text-base leading-none">{item.flag}</span>
                  <span>{item.country}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Test Centers & Fees Table Card matching Page 2 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl">
            
            {/* Table Header in Cyan matching Page 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 bg-[#00c2cb] text-white font-extrabold text-xs sm:text-sm text-center py-3.5 px-4">
              <div className="md:col-span-4">Test Centers</div>
              <div className="md:col-span-3 border-y md:border-y-0 md:border-x border-cyan-300/40 py-1 md:py-0">
                Price
              </div>
              <div className="md:col-span-5">Required Identification</div>
            </div>

            {/* Table Body Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch p-6 sm:p-8 gap-6 md:gap-0">
              
              {/* Column 1: Test Centers List in 2-cols */}
              <div className="md:col-span-4 pr-0 md:pr-6 space-y-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {currentCountryData.centers.map((center, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                      <span className="text-[#00c2cb] font-black text-xs">➤</span>
                      <span>{center}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Standard Price in AUD / Local Currency */}
              <div className="md:col-span-3 px-0 md:px-6 border-y md:border-y-0 md:border-x border-slate-200 py-6 md:py-0 flex flex-col items-center justify-center text-center space-y-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Standard Price
                </div>
                <div className="text-[11px] font-bold text-slate-400 font-mono">
                  {currentCountryData.currency}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                  {currentCountryData.price}
                </div>
                <Link
                  to="/book-exam"
                  className="text-[11px] font-bold text-[#00c2cb] hover:underline pt-2 inline-flex items-center gap-1"
                >
                  Book with Discount Voucher →
                </Link>
              </div>

              {/* Column 3: Required Identification */}
              <div className="md:col-span-5 pl-0 md:pl-6 flex items-center">
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {currentCountryData.idPolicy}
                </p>
              </div>

            </div>

          </div>

          {/* Action CTA Button matching Page 2 */}
          <div className="text-center pt-2">
            <Link
              to="/book-exam"
              className="inline-block px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              Find more Test Centers and Fees
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}