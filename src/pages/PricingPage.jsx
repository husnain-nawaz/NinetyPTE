import { Link } from 'react-router-dom';
import { Check, Sparkles, Award, Shield, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: '$0',
      period: 'Forever',
      desc: 'Basic PTE practice to evaluate system features',
      features: [
        '5 AI evaluations daily',
        'Access to 200 sample questions',
        '1 Scored Mock Test (Mock A)',
        'Standard vocabulary list',
        'Hostinger Community Forum access'
      ],
      current: false,
      cta: 'Current Basic'
    },
    {
      id: 'pro-month',
      name: 'VIP Pro (1 Month)',
      price: '$29',
      period: '/ month',
      desc: 'Ideal for candidates taking the test within 30 days',
      popular: true,
      features: [
        'Unlimited AI Precision Evaluations',
        'All 10,000+ Real Question Banks',
        '5 Full Pearson VUE Mock Tests',
        'Weekly High-Frequency Predictions',
        'Detailed Fluency & Acoustic Analysis',
        'Describe Image & Essay Templates',
        'Continuous MP3 audio training'
      ],
      current: true,
      cta: 'Your Active Plan (teglobehistory)'
    },
    {
      id: 'pro-quarter',
      name: 'VIP Superior (3 Months)',
      price: '$69',
      period: '/ 3 months',
      desc: 'Most chosen by candidates targeting 79+ Superior English',
      features: [
        'Everything in 1 Month VIP',
        '15 Full Pearson VUE Mock Tests',
        'Personalized Weakness Analytics',
        'PTE Academic + PTE Core Access',
        'VIP WhatsApp / Telegram Study Group',
        'One-on-one Scorecard Diagnostic'
      ],
      current: false,
      cta: 'Upgrade to Superior'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> High Precision Pearson AI Calibration
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Simple, Transparent VIP Plans
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Get unlimited AI scoring, full question bank access, and exact Pearson mock exams to secure your target score of 79+ or 65+ on the first attempt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`bg-white rounded-2xl border p-6 shadow-xs flex flex-col justify-between relative ${
              plan.popular 
                ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-lg' 
                : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 text-white text-[10px] font-extrabold uppercase rounded-full shadow-xs">
                Active VIP Plan
              </span>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-extrabold text-lg text-slate-900">{plan.name}</h3>
                {plan.current && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-4">{plan.desc}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={plan.current}
              className={`w-full mt-8 py-2.5 rounded-xl font-bold text-xs transition ${
                plan.current 
                  ? 'bg-slate-100 text-slate-400 cursor-default' 
                  : plan.popular 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
