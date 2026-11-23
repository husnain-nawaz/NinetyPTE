import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  Laptop, 
  HelpCircle, 
  FileSpreadsheet, 
  Bookmark, 
  Music, 
  Database, 
  ChevronRight, 
  ChevronDown,
  Sparkles,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { PTE_MODULES } from '../../config/pteModules';

export default function Sidebar({ isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    speaking: true,
    writing: true,
    reading: false,
    listening: false,
    mockTests: false,
    tools: false
  });

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const getModuleIcon = (id) => {
    switch (id) {
      case 'speaking': return <Mic className="w-4 h-4 text-amber-500" />;
      case 'writing': return <PenTool className="w-4 h-4 text-blue-500" />;
      case 'reading': return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'listening': return <Headphones className="w-4 h-4 text-purple-500" />;
      default: return <BookOpen className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-3 space-y-5">
          {/* Main Primary Links */}
          <div className="space-y-1">
            <NavLink
              to="/"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-600" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/practice"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Practice Hub</span>
              </div>
              <span className="px-1.5 py-0.5 text-[10px] bg-indigo-100 text-indigo-700 rounded-md font-bold">20+ Tasks</span>
            </NavLink>

            <NavLink
              to="/mock-tests"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <div className="flex items-center gap-2.5">
                <Laptop className="w-4 h-4 text-rose-500" />
                <span>Full Mock Tests</span>
              </div>
              <span className="px-1.5 py-0.5 text-[10px] bg-rose-100 text-rose-700 rounded-md font-bold">Pearson VUE</span>
            </NavLink>

            <NavLink
              to="/predictions"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Weekly Prediction</span>
              </div>
              <span className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-700 rounded-md font-bold">Hot</span>
            </NavLink>
          </div>

          <div className="border-t border-slate-100 pt-2">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Question Banks By Module
            </p>

            {/* PTE Modules Accordions */}
            <div className="space-y-1">
              {PTE_MODULES.map((module) => {
                const isExpanded = expandedSections[module.id];
                return (
                  <div key={module.id} className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(module.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition"
                    >
                      <div className="flex items-center gap-2">
                        {getModuleIcon(module.id)}
                        <span>{module.name} ({module.tasks.length})</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-slate-100 ml-4 my-1">
                        {module.tasks.map((task) => (
                          <NavLink
                            key={task.id}
                            to={`/practice/${task.id}`}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className={({ isActive }) => `
                              flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition
                              ${isActive 
                                ? 'bg-indigo-50 text-indigo-700 font-bold' 
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}
                            `}
                          >
                            <span className="truncate">{task.name}</span>
                            <span className="text-[10px] px-1 py-0.2 bg-slate-100 text-slate-500 rounded font-mono">
                              {task.code}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Study Tools & Hostinger DB Section */}
          <div className="border-t border-slate-100 pt-2 space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Advanced Tools & Server
            </p>

            <NavLink
              to="/tools/vocab"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition
                ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              <Bookmark className="w-3.5 h-3.5 text-teal-600" />
              <span>Vocab & Collocation Bank</span>
            </NavLink>

            <NavLink
              to="/tools/templates"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition
                ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />
              <span>DI & Essay Templates</span>
            </NavLink>

            <NavLink
              to="/tools/mp3-player"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition
                ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              <Music className="w-3.5 h-3.5 text-purple-600" />
              <span>Continuous MP3 Practice</span>
            </NavLink>

            <NavLink
              to="/db-shards"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition
                ${isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hostinger Sharded DB</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </NavLink>
          </div>

          {/* Quick Target Score Box */}
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-indigo-100">Target Score</span>
              <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-bold">79+</span>
            </div>
            <p className="text-base font-extrabold">Superior English</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-indigo-100 mt-1">
              <span>Current: 71</span>
              <span>Need: +8 pts</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
