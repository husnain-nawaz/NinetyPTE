import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Headphones, 
  MessageSquare, 
  Percent, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Smartphone,
  ShieldCheck,
  Building2,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [activeModal, setActiveModal] = useState(null); // null | 'message' | 'sales'
  
  // Support Form State
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'PTE Academic Support',
    message: ''
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setActiveModal(null);
      setSupportForm({ name: '', email: '', phone: '', category: 'PTE Academic Support', message: '' });
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER                                                            */}
      {/* ========================================================================= */}
      <section className="pt-12 pb-10 bg-gradient-to-b from-cyan-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Contact us
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Get in touch and let us know how we can help.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THREE CONTACT CHANNELS (3-Card Grid matching PDF Screenshot)           */}
      {/* ========================================================================= */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Chat with Us */}
            <div className="bg-white rounded-3xl p-7 border-2 border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-xs group-hover:scale-105 transition-transform">
                  <Headphones className="w-6 h-6 stroke-[2.2]" />
                </div>
                
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Chat with Us
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Get in touch and let us know how we can help.
                </p>
              </div>

              <div>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-xs transition active:scale-95"
                >
                  <span>Chat Now</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* Card 2: Leave a Message */}
            <div className="bg-white rounded-3xl p-7 border-2 border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6 stroke-[2.2]" />
                </div>
                
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Leave a Message
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Feel free to send us your queries or leave a message, and we'll get back to you.
                </p>
              </div>

              <div>
                <button
                  onClick={() => setActiveModal(activeModal === 'message' ? null : 'message')}
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <span>Get Support</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Card 3: Institute Software Sales */}
            <div className="bg-white rounded-3xl p-7 border-2 border-slate-100 hover:border-cyan-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-xs group-hover:scale-105 transition-transform">
                  <Percent className="w-6 h-6 stroke-[2.2]" />
                </div>
                
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Institute Software Sales
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  We'd love to talk about how we can work together.
                </p>
              </div>

              <div>
                <Link
                  to="/business"
                  className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-[#00c2cb] hover:bg-[#00a8b5] text-white font-extrabold text-xs shadow-xs transition active:scale-95"
                >
                  <span>Contact Sales</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

          </div>

          {/* Expandable Support Query Form when "Leave a Message" clicked */}
          {activeModal === 'message' && (
            <div className="mt-8 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-cyan-200/90 shadow-lg max-w-2xl mx-auto animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-extrabold text-slate-900">Send us your support query</h4>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
              </div>

              {supportSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                  ✓ Thank you! Your support ticket has been received. Our team will get back to you within 2 business hours.
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name*"
                      value={supportForm.name}
                      onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address*"
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (Optional)"
                      value={supportForm.phone}
                      onChange={(e) => setSupportForm({ ...supportForm, phone: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white"
                    />
                    <select
                      value={supportForm.category}
                      onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                      className="p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white text-slate-700"
                    >
                      <option value="PTE Academic Support">PTE Academic Support</option>
                      <option value="PTE Core Support">PTE Core Support</option>
                      <option value="PTE Voucher Support">PTE Voucher Support</option>
                      <option value="Mock Test & AI Scoring">Mock Test & AI Scoring</option>
                      <option value="Account & Billing">Account & Billing</option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="How can we help you? Describe your question or issue in detail..."
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition"
                  >
                    Submit Query
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. JOIN OUR COMMUNITY SECTION (Matching PDF Screenshot Bottom)            */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50/60 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Join Our Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            
            {/* Left Column: Telegram */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Telegram
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Become part of a thriving community of thousands of PTE aspirants and expert trainers ready to support you with all your exam-related questions. Get insights, and access tips for success in your PTE journey.
              </p>

              <ul className="space-y-2 pt-1 text-xs font-bold text-cyan-600">
                <li>
                  <a href="#telegram-academic" className="hover:underline flex items-center gap-1">
                    <span>•</span>
                    <span>PTE Academic / UKVI</span>
                  </a>
                </li>
                <li>
                  <a href="#telegram-core" className="hover:underline flex items-center gap-1">
                    <span>•</span>
                    <span>PTE Core</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: WhatsApp Channel */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  WhatsApp Channel
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Stay up-to-date with PTE news, study resources, and guidance from experienced trainers.
              </p>

              <div className="pt-1 text-xs font-bold text-cyan-600">
                <a 
                  href="https://whatsapp.com/channel/ninetypte" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline flex items-center gap-1"
                >
                  <span>•</span>
                  <span>To join the WhatsApp channel</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
