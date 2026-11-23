import { MapPin, Phone } from 'lucide-react';
import { GLOBAL_OFFICES } from '../../data/landingData';

export default function GlobalPresenceSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-cyan-600">
            Our Global Presence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Supporting PTE Candidates Worldwide
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Reach out to our international support centers and affiliated training academies in your region.
          </p>
        </div>

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GLOBAL_OFFICES.map((office, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{office.flag}</span>
                  <h3 className="font-extrabold text-slate-900 text-base">{office.country}</h3>
                </div>

                <div className="text-xs font-bold text-slate-800 mb-2">{office.name}</div>
                
                <div className="flex items-start gap-2 text-xs text-slate-500 mb-4 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-cyan-600 mt-0.5" />
                  <span>{office.address}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-cyan-700">
                <Phone className="w-3.5 h-3.5" />
                <span>{office.phone}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
