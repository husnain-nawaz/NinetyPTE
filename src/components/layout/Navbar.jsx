import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Bell, 
  User, 
  Database, 
  Award, 
  ChevronDown, 
  Menu, 
  X,
  BookOpen,
  Laptop
} from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const [examType, setExamType] = useState('PTE Academic');
  const [userDropdown, setUserDropdown] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Practice Hub', path: '/practice' },
    { label: 'Mock Tests', path: '/mock-tests' },
    { label: 'Predictions', path: '/predictions' },
    { label: 'Study Tools', path: '/tools' },
    { label: 'DB Shards (10x)', path: '/db-shards', badge: 'Hostinger' },
    { label: 'VIP Pricing', path: '/pricing' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                90
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition">NinetyPTE</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 rounded-md flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> AI 2.0
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">Alfa PTE Clone</span>
              </div>
            </Link>

            {/* Exam Type Toggle Pill */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg ml-3 border border-slate-200">
              {['PTE Academic', 'PTE Core'].map((type) => (
                <button
                  key={type}
                  onClick={() => setExamType(type)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                    examType === type
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 text-sm font-semibold rounded-lg transition ${
                    isActive 
                      ? 'text-indigo-600 bg-indigo-50/80 font-bold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[9px] uppercase font-bold bg-emerald-100 text-emerald-800 rounded">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right section: User Status, Streak, Profile */}
          <div className="flex items-center gap-3">
            {/* Daily Streak */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-amber-700 text-xs font-bold" title="12 Days Continuous Study Streak!">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>12d Streak</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition" title="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* User Account / Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  TG
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">teglobehistory</span>
                  <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                    <Award className="w-2.5 h-2.5" /> VIP Premium
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-800">teglobehistory</p>
                    <p className="text-xs text-slate-500 truncate">user@teglobehistory.com</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                      VIP Active (Unlimited AI Scoring)
                    </span>
                  </div>
                  <Link 
                    to="/profile" 
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
                  >
                    <User className="w-4 h-4 text-slate-400" /> My Account & Target Score
                  </Link>
                  <Link 
                    to="/db-shards" 
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Database className="w-4 h-4 text-slate-400" /> Hostinger DB Shards Health
                  </Link>
                  <Link 
                    to="/mock-tests" 
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Laptop className="w-4 h-4 text-slate-400" /> My Mock Test Reports
                  </Link>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button 
                    onClick={() => setUserDropdown(false)}
                    className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
