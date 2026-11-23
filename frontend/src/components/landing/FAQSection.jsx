import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_LIST } from '../../data/landingData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Everything you need to know about the PTE Academic and PTE Core exams.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-3xl bg-white shadow-xs overflow-hidden">
          {FAQ_LIST.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="transition-colors">
                <button
                  onClick={() => toggle(i)}
                  className="w-full py-4 sm:py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span className="font-extrabold text-slate-800 text-xs sm:text-sm">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-full text-slate-400 bg-slate-100 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-5 text-xs text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
