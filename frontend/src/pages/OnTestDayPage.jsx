import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  ShieldCheck, 
  Laptop, 
  Scan, 
  Camera, 
  Lock, 
  Keyboard, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  UserCheck,
  FileText
} from 'lucide-react';

export default function OnTestDayPage() {
  const [activeFaq, setActiveFaq] = useState({
    0: true, // PTE Academic open by default
    1: false,
    2: false,
    3: false
  });

  const toggleFaq = (idx) => {
    setActiveFaq(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const idAccordions = [
    {
      title: 'PTE Academic',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            A <strong>valid, unexpired international passport</strong> is the primary and universally accepted identification document for PTE Academic test-takers worldwide.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Your name on your Pearson VUE registration must match your passport exactly (including first, middle, and last names).</li>
            <li>No photocopies, expired documents, or digital photos on smartphones will be accepted under any circumstances.</li>
            <li>Specific country allowances (e.g. government photo cards in home countries) only apply where explicitly authorized by Pearson policy.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'PTE Core',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            For candidates sitting <strong>PTE Core</strong> for Canadian immigration (IRCC Express Entry, PNPs, and work permits), a <strong>valid passport</strong> is mandatory.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>All personal biographical data (Full Name, Date of Birth, Nationality) must precisely match your test confirmation letter.</li>
            <li>If testing within Canada, consult Pearson's official local ID matrix for approved domestic provincial photo identity options.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'SELT Tests: PTE Academic UKVI and PTE Home',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            For <strong>UK Visas and Immigration (UKVI)</strong> SELT applications, security compliance is strictly audited:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>A valid passport or official UK Home Office travel document is required.</li>
            <li>Candidates must consent to biometric capture (digital photo, digital signature, and electronic palm vein scan) for verification by the UK Home Office.</li>
            <li>Ensure you have your UKVI reference details ready at check-in.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Rules for All Identification Documents:',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">
            Every identification document presented at the test center must fulfill all of the following criteria:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong>Original:</strong> Must be an original physical document, not a digital image or photocopy.</li>
            <li><strong>Valid & Current:</strong> Must not be expired on the date of your exam.</li>
            <li><strong>Latin/Roman Characters:</strong> Name must be printed in Roman script.</li>
            <li><strong>Recognizable Photo:</strong> Must feature a recent, clear, recognizable photograph of you.</li>
            <li><strong>Signature:</strong> Must contain your handwritten signature matching your check-in signature.</li>
          </ul>
        </div>
      )
    }
  ];

  const top10Tips = [
    {
      title: 'Prepare Like a Pro:',
      desc: 'Feeling confident in your abilities is key. Make sure you study and practice beforehand to solidify your skills.'
    },
    {
      title: 'Rest Up for Success:',
      desc: 'A good night\'s sleep is crucial. Being well-rested will help you concentrate throughout the PTE.'
    },
    {
      title: 'Calm Your Mind and Body:',
      desc: 'Practice relaxation techniques like deep breathing or meditation before the exam to ease anxiety.'
    },
    {
      title: 'Arrive Early, Avoid Stress:',
      desc: 'Leave enough travel time to arrive at the test center comfortably. Don\'t let last-minute rushing add to your stress.'
    },
    {
      title: 'Positive Vibes Only:',
      desc: 'Focus on positive thoughts and affirmations. Remind yourself of your preparation and skills to boost your confidence.'
    },
    {
      title: 'Fuel Up for Focus:',
      desc: 'Drink plenty of water and eat a healthy meal before the PTE. Staying hydrated and nourished helps maintain energy and focus.'
    },
    {
      title: 'Take Short Breaks (if allowed):',
      desc: 'If permitted during the test, take short breaks to stretch and clear your head. This can prevent mental fatigue and keep you refreshed.'
    },
    {
      title: 'Adapt and Move On:',
      desc: 'Don\'t get hung up on challenging questions. Stay flexible, move on, and come back later if time allows.'
    },
    {
      title: 'Be Here Now:',
      desc: 'Focus on the present moment. Don\'t worry about the outcome. Concentrate on each question as it appears and do your best.'
    },
    {
      title: 'Celebrate Your Journey:',
      desc: 'Regardless of the score, acknowledge and celebrate your effort. You took a crucial step towards your goals - that\'s worth celebrating!'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-[#00c2cb] selection:text-white pb-16">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER WITH OVERLAY TITLE (Page 1)                                */}
      {/* ========================================================================= */}
      <section className="pt-8 sm:pt-12 pb-8 bg-gradient-to-b from-sky-50/40 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Main Hero Photo Container with Text Overlay matching Page 1 */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] sm:aspect-[21/9]">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80" 
              alt="Students smiling during PTE test preparation" 
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-black/20" />

            {/* Centered Headline Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12 px-4 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md leading-tight">
                Ultimate Guide to Having a<br />
                Hassle-free PTE Test Day
              </h1>
            </div>
          </div>

          {/* Carousel Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c2cb]"></span>
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          </div>

          {/* Intro Paragraph */}
          <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-4xl mx-auto">
            <p>
              Many test-takers may feel anxious about what to expect on the day of the PTE test, despite being well-prepared with the types of questions and exam patterns. Generally, 15-20 people give this test at a time. Based on our observations, most newcomers to the test hall feel anxious despite their diligent preparation and comprehensive understanding of the material. This anxiety typically arises from a combination of nerves and a hint of fear. So here we bring you a comprehensive guide on how you can pass your PTE test day with flying colors.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "Arrival at the Center" (Page 1)                                       */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Arrival <span className="text-[#00c2cb]">at the Center</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            It's crucial to arrive at the test center at least 30 minutes before your exam time. This allows ample time for the check-in process and familiarizing yourself with the center's rules. Upon arrival, a friendly PTE Test Center Administrator will greet you and guide you through the check-in procedures, ensuring you understand everything clearly.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "What to Bring and Expect" - 3 Cards (Page 1)                          */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            What to <span className="text-[#00c2cb]">Bring and Expect</span>
          </h2>

          {/* 3 Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: Identification */}
            <div className="bg-[#f0f9fa] rounded-2xl p-5 border border-cyan-100 flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-cyan-200 text-[#00c2cb] flex items-center justify-center shrink-0 shadow-2xs">
                <FileText className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  Identification
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                  Make sure you have your valid ID (passport) and booking confirmation readily available.
                </p>
              </div>
            </div>

            {/* Card 2: Digital Signature and Photo */}
            <div className="bg-[#f0f9fa] rounded-2xl p-5 border border-cyan-100 flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-cyan-200 text-[#00c2cb] flex items-center justify-center shrink-0 shadow-2xs">
                <Camera className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  Digital Signature and Photo
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                  You'll be required to digitally sign in and have your picture taken for the score report.
                </p>
              </div>
            </div>

            {/* Card 3: Palm Scan */}
            <div className="bg-[#f0f9fa] rounded-2xl p-5 border border-cyan-100 flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-cyan-200 text-[#00c2cb] flex items-center justify-center shrink-0 shadow-2xs">
                <Scan className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  Palm Scan
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-snug">
                  As part of the security measures, a digital palm scan will be conducted.
                </p>
              </div>
            </div>

          </div>

          {/* Concluding Check-in Notes */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-2">
            <p>
              After completing the check-in process, the administrator will safely store your belongings and ensure you're comfortable and prepared to take the test.
            </p>
            <p>
              By following these tips and arriving early, you can minimize test day stress and focus on showcasing your English language skills.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "Rules and Guidelines to be followed at the Center" (Page 1)            */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Rules and Guidelines to be followed <span className="text-[#00c2cb]">at the Center</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            No electronic devices of any kind (mobile phones, smartwatches, laptops, etc.) are allowed at the PTE test center. You'll be provided with a personal locker to store your belongings. However, keeping any extra or precious belongings at home is always preferable as the test center is not responsible for lost items. Staff from the test center will lead you step-by-step, and you will follow them to avoid any problems.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. "During the Test" (Page 1)                                             */}
      {/* ========================================================================= */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            During the <span className="text-[#00c2cb]">Test</span>
          </h2>
          
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              Test takers are typically seated next to each other with partitions separating the cubicles. Sometimes, you might even hear your neighbour saying answers or something, but you must focus on your own test, as each question set is slightly different. A chair, computer with a wired microphone, and other necessary equipment will be provided. Be sure to check everything is functioning properly before the test starts.
            </p>
            <p>
              To optimize your typing speed and accuracy during the test, consider practicing with a QWERTY keyboard if it's not your typical input method. We advise practicing with one to optimize your performance.
            </p>
            <p>
              The PTE Academic, PTE Academic UKVI, and PTE Core tests are allocated two hours for completion. The PTE Home test is allocated 30 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. "Forms of Identification" Accordions (Page 1 & 2)                      */}
      {/* ========================================================================= */}
      <section className="py-12 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Select Your Exam Type to View Accepted <span className="text-[#00c2cb]">Forms of Identification</span>
          </h2>

          {/* Accordion List */}
          <div className="space-y-3">
            {idAccordions.map((item, idx) => {
              const isOpen = activeFaq[idx];
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00c2cb] transition-colors cursor-pointer"
                  >
                    <span>{item.title}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#00c2cb]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 animate-in fade-in duration-150">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. "Conquer Test Anxiety: Top 10 Tips for PTE Success" (Page 2)            */}
      {/* ========================================================================= */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Conquer Test Anxiety: <span className="text-[#00c2cb]">Top 10 Tips for PTE Success</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Feeling nervous before the PTE is normal! But with the right approach, you can manage your stress and perform your best. Here are 10 tips to help you stay calm and focused on test day:
            </p>
          </div>

          {/* 10 Arrow Bullet Points */}
          <div className="space-y-4 pt-2">
            {top10Tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <span className="shrink-0 text-[#00c2cb] font-black text-sm group-hover:translate-x-0.5 transition-transform mt-0.5">
                  ➤
                </span>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <strong className="text-slate-900 font-bold mr-1.5">{tip.title}</strong>
                  <span>{tip.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Follow-up Note */}
          <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              By utilizing these resources, you can ensure a well-rounded preparation for the PTE Academic UKVI, aiming to achieve the score required for your UK visa application. Remember to regularly engage in{' '}
              <Link to="/pte-practice" className="underline font-bold text-slate-900 decoration-[#00c2cb] hover:text-[#00c2cb] transition-colors">
                PTE practice
              </Link>{' '}
              and make the most of the feedback and tools provided by NinetyPTE to refine your English language skills.
            </p>
          </div>

          {/* Action Buttons matching Page 2 */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/pte-academic-ukvi-exam"
              className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95"
            >
              Practice PTE Academic / UKVI
            </Link>
            <Link
              to="/pte-practice"
              className="px-6 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-md transition active:scale-95"
            >
              Practice PTE Core
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. "Don't miss out on essential test tips!" Banner (Page 2)                */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Don't miss out on essential test tips!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Sign up now to receive exclusive tips and strategies for mastering your test
          </p>
          <div className="pt-2">
            <Link
              to="/auth"
              className="inline-block px-8 py-3 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95"
            >
              Signup for Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}