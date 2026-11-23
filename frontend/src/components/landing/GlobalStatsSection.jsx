import { Users, HelpCircle, FileText, Layers, Clock } from 'lucide-react';

export default function GlobalStatsSection() {
  const stats = [
    { value: '3M+', label: 'Users', icon: <Users className="w-5 h-5 text-cyan-400" /> },
    { value: '20,000+', label: 'Total Question', icon: <HelpCircle className="w-5 h-5 text-cyan-400" /> },
    { value: '300+', label: 'Full Tests', icon: <FileText className="w-5 h-5 text-cyan-400" /> },
    { value: '516', label: 'Sectional Tests', icon: <Layers className="w-5 h-5 text-cyan-400" /> },
    { value: '120', label: 'Timed Mock Tests', icon: <Clock className="w-5 h-5 text-cyan-400" /> },
  ];

  return (
    <section className="relative bg-[#0a1128] text-white py-24 overflow-hidden border-t border-slate-800">
      {/* Background digital grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-400">
              Global PTE Network
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              NinetyPTE's Practice Questions & User Insights
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              NinetyPTE stands out by offering the most extensive collection of practice questions and mock tests available, ensuring that every aspect of your preparation is covered. Explore the world of learning with NinetyPTE. Our platform connects you with a diverse community of learners, providing insights into study trends, success rates, and collective progress. Join us and be part of a global movement towards PTE excellence, equipped with the best resources for success.
            </p>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-5 hover:border-cyan-400/50 transition flex flex-col justify-between"
                >
                  <div className="mb-3">{stat.icon}</div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Realistic Glowing Earth Wireframe Illustration Curve */}
        <div className="relative mt-16 pt-10 flex justify-center">
          <div className="w-full max-w-4xl h-36 border-t-2 border-cyan-400/40 rounded-[100%] shadow-[0_-20px_50px_rgba(6,182,212,0.25)] flex items-center justify-center">
            <div className="text-[11px] font-mono tracking-widest uppercase text-cyan-400/80 animate-pulse">
              • • • Connecting Over 1 Million PTE Aspirants Worldwide • • •
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
