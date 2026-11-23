import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

export default function LanguageDropdown({ variant = 'consumer' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (English)');
  const dropdownRef = useRef(null);

  // Exact 29 languages from the user's reference screenshots
  const languages = [
    'English (English)',
    'عربي (Arabic)',
    'বাংলা (Bangla)',
    'Nederlands (Dutch)',
    'Filipino (Filipino)',
    'Français (French)',
    'Deutsch (German)',
    'ગુજરાતી (Gujarati)',
    'हिन्दी (Hindi)',
    'Indonesia (Indonesian)',
    'Italiano (Italian)',
    '日本 (Japanese)',
    '한국인 (Korean)',
    'Melayu (Malay)',
    'മലയാളം (Malayalam)',
    'मराठी (Marathi)',
    '普通话 (Mandarin)',
    'नेपाली (Nepali)',
    'ਪੰਜਾਬੀ (Punjabi)',
    'Português (Portuguese)',
    'فارسی (Persian)',
    'සිංහල (Sinhalese)',
    'Español (Spanish)',
    'தமிழ் (Tamil)',
    'తెలుగు (Telugu)',
    'ไทย (Thai)',
    'Türk (Turkish)',
    'اردو (Urdu)',
    'Tiếng Việt (Vietnamese)'
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  const isBusiness = variant === 'business';

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Trigger Button: Chinese Character '文A' */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 transition cursor-pointer select-none ${
          isBusiness 
            ? 'text-cyan-500 hover:text-cyan-600 text-xs font-bold' 
            : 'text-white hover:text-cyan-200 text-xs font-semibold'
        }`}
        title="Select Language"
        aria-expanded={isOpen}
      >
        <span className="text-base tracking-tighter font-serif">文A</span>
      </button>

      {/* Language Dropdown Menu matching Reference Screenshots */}
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2.5 w-60 sm:w-64 max-h-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Scrollable list with custom cyan scrollbar */}
          <div className="cyan-scrollbar max-h-[380px] overflow-y-auto py-2">
            {languages.map((lang, idx) => {
              const isSelected = selectedLanguage === lang;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(lang)}
                  className={`px-5 py-2.5 text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'text-[#00c2cb] font-bold bg-slate-50'
                      : 'text-slate-800 hover:text-[#00c2cb] hover:bg-slate-50/80'
                  }`}
                >
                  <span className="leading-tight">{lang}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#00c2cb] stroke-[2.5]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
