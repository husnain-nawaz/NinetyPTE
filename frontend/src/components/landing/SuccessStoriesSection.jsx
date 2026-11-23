import { useState } from 'react';
import { Play, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function SuccessStoriesSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const stories = [
    {
      name: "Fatima Z.",
      location: "Melbourne, Australia",
      target: "Superior English (79+)",
      achieved: "Overall 86 (Speaking 90, Listening 84)",
      quote: "NinetyPTE's acoustic speech analysis completely transformed my oral fluency score. By identifying awkward hesitations in Read Aloud and practicing with the weekly prediction files, I improved from 62 to 90 on my very next official exam!",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Rajesh K.",
      location: "Toronto, Canada",
      target: "PTE Core CLB 9+",
      achieved: "Overall 88 (Writing 86, Reading 88)",
      quote: "The timed essay editor and automated lexical checking made all the difference for my Canadian permanent residency application. The AI scoring was spot on with the actual exam result.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Liam O'Connor",
      location: "London, UK",
      target: "PTE Academic UKVI (70+)",
      achieved: "Overall 82 (Listening 86, Speaking 80)",
      quote: "The full 2-hour scored mock tests prepared me for the real test pressure. I walked into the Pearson testing center confident and ready. Highly recommended for any serious candidate.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const current = stories[currentIdx];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
            Real Student Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover How Candidates Achieved Their Target Scores
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Quote and Profile */}
            <div className="lg:col-span-7 space-y-6">
              <Quote className="w-10 h-10 text-cyan-400 opacity-60" />

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                "{current.quote}"
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">{current.name}</h4>
                  <span className="text-xs text-slate-500">{current.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-600 block">{current.achieved}</span>
                  <span className="text-[10px] text-slate-400">Target: {current.target}</span>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2 pt-2">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-2 rounded-full transition-all ${
                      currentIdx === i ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Video Thumbnail */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs h-72 rounded-2xl overflow-hidden shadow-md group">
                <img 
                  src={current.img} 
                  alt={current.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/25 flex items-center justify-center">
                  <button className="w-14 h-14 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-xs rounded-xl p-2 text-center text-white text-xs font-bold">
                  {current.name} Video Feedback
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
