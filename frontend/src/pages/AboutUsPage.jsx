import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Rocket, 
  Users, 
  Building2, 
  Globe2, 
  Award, 
  Smartphone, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Quote
} from 'lucide-react';

export default function AboutUsPage() {
  const milestones = [
    {
      date: 'December 2018',
      title: 'The Seed is Sown',
      desc: 'NinetyPTE is born with the vision of transforming language preparation through cutting-edge technology, accessible e-learning, and student-first pedagogy.',
      tag: 'Foundation',
      icon: <Sparkles className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'July 2019',
      title: 'Launching Our Learning Platform',
      desc: 'We unveil our groundbreaking learning platform, offering an array of cutting-edge resources and tools to empower our in-house students.',
      tag: 'Platform V1',
      icon: <Rocket className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'April 2020',
      title: 'Making Our Platform Open to All',
      desc: 'We democratize access to our platform, extending our innovative learning solutions to learners of all backgrounds and locations globally.',
      tag: 'Global Access',
      icon: <Globe2 className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'August 2020',
      title: '1,000 Strong Community',
      desc: 'We celebrate our first 1,000 registered users, marking the beginning of a vibrant, supportive global learning community.',
      tag: 'Community',
      icon: <Users className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'June 2021',
      title: 'Institute Software Launched',
      desc: 'We introduce our innovative White-label Institute Software, revolutionizing how educational institutes manage and enhance their PTE preparation programs.',
      tag: 'B2B Software',
      icon: <Building2 className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'January 2022',
      title: '100,000 Dreams Take Flight',
      desc: 'Our user base explodes to 100,000, empowering countless individuals on their PTE preparation, university admission, and migration journeys.',
      tag: 'Growth',
      icon: <Award className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'October 2023',
      title: '1,200+ Institutes Partnered for Success',
      desc: 'Our Institute Software achieves remarkable success, with over 1,200 institutes leveraging our technology to elevate their students learning experiences.',
      tag: 'Partnerships',
      icon: <Building2 className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'March 2024',
      title: '1 Million Milestones Achieved!',
      desc: 'We reach an incredible milestone — 1 million registered users! This signifies the trust and success students have found with NinetyPTE.',
      tag: '1M Users',
      icon: <Award className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'August 2024',
      title: '1 Million Mobile App Downloads',
      desc: 'Our mobile app reaches 1 million downloads — a testament to the trust students place in learning on the go, anytime, anywhere.',
      tag: 'Mobile Milestone',
      icon: <Smartphone className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'January 2025',
      title: '2,000+ Institutes and Growing',
      desc: 'Over 2,000 institutes now rely on our powerful software to deliver top-tier language preparation. Together, were reshaping the future of test training globally.',
      tag: 'Institutional Scale',
      icon: <Building2 className="w-5 h-5 text-cyan-600" />
    },
    {
      date: 'June 2025',
      title: 'IELTS Practice Platform Launched',
      desc: 'Expanding beyond PTE, we launch our IELTS practice platform, helping students unlock success in another high-stakes English exam with the same trusted innovation.',
      tag: 'Multi-Exam Ecosystem',
      icon: <BookOpen className="w-5 h-5 text-cyan-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-cyan-500 selection:text-white">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Page 1)                                                  */}
      {/* ========================================================================= */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-cyan-50/50 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 text-[#00c2cb] text-xs font-bold border border-cyan-100">
                <Sparkles className="w-3.5 h-3.5 fill-[#00c2cb]" />
                <span>Our Mission & Vision</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
                Revolutionizing PTE preparation <br />
                <span className="text-[#00c2cb]">through technology</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
                At NinetyPTE, our mission is to revolutionize language preparation by providing innovative, accessible, and effective tools and resources for all learners. We are committed to empowering individuals worldwide to achieve their language goals and unlock new opportunities for personal and professional growth.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/business"
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-xs transition"
                >
                  For Institutes
                </Link>
              </div>
            </div>

            {/* Right Metric Cards Preview */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center font-black">
                  8+
                </div>
                <div className="text-2xl font-black text-slate-900">8+ Years</div>
                <div className="text-xs text-slate-500 font-medium">Industry Expertise</div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                  1M+
                </div>
                <div className="text-2xl font-black text-slate-900">1.2M+</div>
                <div className="text-xs text-slate-500 font-medium">Active Learners</div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                  2K+
                </div>
                <div className="text-2xl font-black text-slate-900">2,000+</div>
                <div className="text-xs text-slate-500 font-medium">Partner Institutes</div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                  50M
                </div>
                <div className="text-2xl font-black text-slate-900">50M+</div>
                <div className="text-xs text-slate-500 font-medium">Questions Scored</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CHRONOLOGICAL JOURNEY TIMELINE (Pages 1 & 2)                          */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              A Journey of <span className="text-[#00c2cb]">Empowering PTE Success</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              NinetyPTE, born from an established Australian training school, has transformed into a leading e-learning platform for PTE preparation. Our team of experts leverages over 8 years of PTE industry experience to create innovative and effective learning resources.
            </p>
          </div>

          {/* Timeline Stream */}
          <div className="relative border-l-2 border-cyan-200 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-10">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative group">
                
                {/* Glowing Dot on Line */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#00c2cb] shadow-xs group-hover:scale-125 transition-transform"></div>

                {/* Date Label on Left for Desktop */}
                <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-black text-[#00c2cb] tracking-wider uppercase mb-1 sm:mb-0">
                  {item.date}
                </div>

                {/* Milestone Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#00c2cb] text-[10px] font-extrabold uppercase border border-cyan-100">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MESSAGE FROM OUR FOUNDER (Page 2)                                      */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md space-y-6 relative overflow-hidden">
            
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#00c2cb] flex items-center justify-center">
              <Quote className="w-6 h-6 fill-[#00c2cb]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Message from Our Founder
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <p>
                <strong>Welcome to NinetyPTE!</strong> When we started NinetyPTE in December 2018, our vision was clear: to empower individuals from all walks of life with the tools, knowledge, and confidence they need to succeed in their PTE journey.
              </p>
              <p>
                We believe that success in language proficiency can open doors to incredible opportunities, whether it is for international education, career advancement, or migration aspirations.
              </p>
              <p>
                From our humble beginnings to building a thriving community of over 1.2 million users and partnering with 2,000+ institutes worldwide, our mission has remained unchanged — to make high-quality, accessible, and smart learning solutions available to every student.
              </p>
              <p>
                Each milestone achieved reflects our commitment to educational excellence and the trust you have placed in us. Whether you are a student, educator, or institutional partner, we are honored to support you every step of the way.
              </p>
              <p>
                Thank you for being part of our journey. Together, we are not just preparing for exams — we are shaping futures.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-black text-sm text-slate-900">Co-Founder & Academic Lead</div>
                <div className="text-xs text-[#00c2cb] font-extrabold">NinetyPTE Education</div>
              </div>
              <div className="text-xs font-mono font-bold text-slate-400">
                Melbourne • Adelaide • Global
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION BANNER                                                  */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Ready to Experience <span className="text-[#00c2cb]">NinetyPTE?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Join over 1.2 million test takers preparing with real exam-style practice, AI scoring, and full-length mock tests.
              </p>
            </div>
            <Link
              to="/signup"
              className="px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 shrink-0"
            >
              Start Free Trial Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
