import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  FileCheck2, 
  Sparkles, 
  HelpCircle, 
  Check, 
  Globe2, 
  Star,
  ChevronDown
} from 'lucide-react';
import LanguageDropdown from '../components/navbar/LanguageDropdown';
import {
  authenticateUser,
  fetchAuthConfig,
  loadGoogleIdentityScript,
  requestPasswordResetEmail,
  startGoogleDirectLogin,
} from '../utils/auth';

export default function AuthPage({ initialMode = 'signin' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneCode: '+92',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
    agreeTerms: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [authConfig, setAuthConfig] = useState({
    googleEnabled: false,
    googleClientId: '',
    allowRegistration: true,
  });

  useEffect(() => {
    let active = true;
    fetchAuthConfig().then((cfg) => {
      if (!active) return;
      setAuthConfig(cfg);
      if (cfg.googleClientId) {
        loadGoogleIdentityScript().catch(() => {});
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const completeAuthSuccess = (result) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      const requestedFrom = location.state?.from?.pathname;
      const isSuperRoute =
        requestedFrom?.startsWith('/super-dashboard') ||
        requestedFrom?.startsWith('/superadmin');
      const destination =
        result.user.role === 'superadmin'
          ? requestedFrom || result.redirectPath
          : isSuperRoute
            ? result.redirectPath
            : requestedFrom || result.redirectPath;
      navigate(destination);
    }, 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthNotice('');
    setIsSubmitting(true);

    try {
      const result = await authenticateUser({
        mode,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        name: formData.name,
        phoneCode: formData.phoneCode,
        phone: formData.phone,
        rememberMe: formData.rememberMe ?? true,
      });

      if (result.error) {
        setAuthError(result.error);
        return;
      }

      completeAuthSuccess(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError('');
    setAuthNotice('');
    setIsSubmitting(true);

    try {
      const result = await startGoogleDirectLogin({
        googleClientId: authConfig.googleClientId,
        rememberMe: formData.rememberMe ?? true,
      });

      if (result.error) {
        setAuthError(result.error);
        return;
      }

      completeAuthSuccess(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    setAuthError('');
    setAuthNotice('');
    if (!formData.email || !formData.email.trim()) {
      setAuthError('Enter your email address first, then click Forgot password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await requestPasswordResetEmail(formData.email.trim());
      if (result.error) {
        setAuthError(result.error);
        return;
      }
      setAuthNotice(result.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSignUp = mode === 'signup';

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* Main Content Split: Form on Left, Dark Visual Card on Right              */}
      {/* ========================================================================= */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: AUTH FORM                                                  */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto space-y-6">
          
          {/* Top Brand Logo */}
          <Link to="/" className="inline-flex items-center gap-1.5 group">
            <span className="text-3xl font-black tracking-tighter text-slate-900">
              ninety<span className="text-cyan-500 font-extrabold">pte</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-500 mb-2"></span>
          </Link>

          {/* Title & Subtitle matching Reference */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome to NinetyPTE
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Start your experience with NinetyPTE by Signing in or Signing Up.
            </p>
          </div>

          {/* Segmented Switch: Sign In vs Sign Up Pill */}
          <div className="p-1 bg-slate-100/90 rounded-full border border-slate-200 flex text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('signin'); setSubmitted(false); setAuthError(''); }}
              className={`flex-1 py-2.5 rounded-full transition-all text-center ${
                !isSignUp
                  ? 'bg-[#00c2cb] text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setSubmitted(false); setAuthError(''); }}
              className={`flex-1 py-2.5 rounded-full transition-all text-center ${
                isSignUp
                  ? 'bg-[#00c2cb] text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {authError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
            >
              {authError}
            </div>
          )}

          {/* Form */}
          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-in fade-in">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold text-lg">
                ✓
              </div>
              <div className="text-sm font-black text-emerald-900">
                {isSignUp ? 'Account Created Successfully!' : 'Signed In Successfully!'}
              </div>
              <p className="text-xs text-emerald-700">
                Welcome to NinetyPTE. Loading your dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Sign Up Specific: Name & Email Row */}
              {isSignUp ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 text-xs shadow-2xs"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 text-xs shadow-2xs"
                    />
                  </div>
                </div>
              ) : (
                /* Sign In Specific: Email Address Single Field */
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 text-xs shadow-2xs"
                  />
                </div>
              )}

              {/* Sign Up Specific: Phone Number Field */}
              {isSignUp && (
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <div className="w-24 shrink-0">
                      <select
                        value={formData.phoneCode}
                        onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                        className="w-full px-2 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden bg-white text-slate-700 font-mono text-xs shadow-2xs"
                      >
                        <option value="+92">🇵🇰 +92</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+1">🇨🇦 +1</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Enter Your Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 text-xs shadow-2xs"
                    />
                  </div>
                </div>
              )}

              {/* Password Field with Show/Hide toggle */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 text-xs pr-14 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-600 hover:text-cyan-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Sign Up Specific: Confirm Password Field */}
              {isSignUp && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:outline-hidden text-slate-800 text-xs pr-14 shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-600 hover:text-cyan-600"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              )}

              {/* Checkboxes Row */}
              {isSignUp ? (
                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-0.5 rounded-sm border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-[11px] text-slate-500 leading-tight">
                    By clicking Sign Up, you are agreeing to the{' '}
                    <a href="#terms" className="text-slate-900 font-semibold underline">T&Cs</a> and{' '}
                    <a href="#privacy" className="text-slate-900 font-semibold underline">Privacy Policy</a>
                  </span>
                </label>
              ) : (
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="rounded-sm border-slate-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isSubmitting}
                    className="text-cyan-600 hover:underline font-bold disabled:opacity-60"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {authNotice && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-medium text-emerald-700">
                  {authNotice}
                </div>
              )}

              {/* Submit Button (Dark Navy Pill matching Reference) */}
              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full py-3.5 rounded-full bg-[#14324f] hover:bg-[#0c2338] text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              {/* Switch View Link */}
              <div className="text-center pt-1 text-xs text-slate-500">
                {isSignUp ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('signin'); setAuthError(''); }}
                      className="font-extrabold text-[#14324f] hover:text-cyan-600 underline"
                    >
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); setAuthError(''); }}
                      className="font-extrabold text-[#14324f] hover:text-cyan-600 underline"
                    >
                      Sign Up
                    </button>
                  </span>
                )}
              </div>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-slate-200"></div>
                <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
                  OR
                </span>
              </div>

              {/* Social Login Buttons: Google & Apple */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isSubmitting || submitted}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.15z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.1-6.67-4.93H1.27v3.13C3.25 21.3 7.31 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.33 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.27C.46 8.22 0 10.06 0 12s.46 3.78 1.27 5.4l4.06-3.13z"/>
                    <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.6l4.06 3.13c.94-2.83 3.57-4.96 6.67-4.96z"/>
                  </svg>
                  <span className="truncate">Continue With Google</span>
                </button>

                {/* Apple Button */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs transition active:scale-95"
                >
                  <span className="text-base leading-none"></span>
                  <span className="truncate">Continue With Apple</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: DARK HERO CARD WITH DASHBOARD PREVIEW                     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-6 h-full min-h-[520px] bg-gradient-to-br from-[#0a2f42] via-[#072433] to-[#04151f] rounded-[36px] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: Carousel Indicators + Language Selector */}
          <div className="flex items-center justify-between relative z-10">
            {/* 3 Indicators (First active) */}
            <div className="flex items-center gap-1.5">
              <span className="w-8 h-1 bg-cyan-400 rounded-full" />
              <span className="w-5 h-1 bg-white/20 rounded-full" />
              <span className="w-5 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Language Selector Dropdown on Dark Card */}
            <div className="bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
              <LanguageDropdown variant="consumer" />
            </div>
          </div>

          {/* Middle Content */}
          <div className="space-y-6 relative z-10 my-6">
            
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                Everything You Need for <br />
                <span className="text-cyan-300">PTE Success</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-md">
                Prepare smarter with powerful PTE practice tools designed to help you improve your skills and achieve your target score.
              </p>
            </div>

            {/* 3 Feature Bullets with Cyan Outline Icons */}
            <div className="space-y-3 pt-2 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <span>Free Scored Mock Test</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Accurate AI Scoring</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span>20,000+ Practice Questions</span>
              </div>
            </div>

          </div>

          {/* Bottom Card Mockup + Laurel Badge */}
          <div className="relative z-10 pt-4 flex items-end justify-between gap-4">
            
            {/* Laurel Wreath Badge matching reference */}
            <div className="shrink-0 space-y-1 text-center">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Trusted By</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                3 Million+
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Users Globally</div>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 text-xs pt-0.5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>

            {/* Cut-off Preview of Portal Dashboard Mockup on Right */}
            <div className="w-[260px] bg-white rounded-t-2xl p-3 shadow-2xl text-slate-800 -mr-12 -mb-10 text-[10px] space-y-2 border border-slate-200 opacity-90 hidden sm:block">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 font-bold text-slate-700">
                <span className="text-cyan-600">Practice Progress</span>
                <span className="text-slate-400 text-[8px]">80/90 Target</span>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 text-center">
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  <div className="font-black text-slate-900 text-xs">1,441</div>
                  <div className="text-[7px] text-slate-400">Prediction Qs</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  <div className="font-black text-cyan-600 text-xs">8,862</div>
                  <div className="text-[7px] text-slate-400">Speaking Qs</div>
                </div>
              </div>

              <div className="p-1.5 bg-cyan-50 rounded-lg text-cyan-800 text-[8px] font-bold text-center">
                Average Score: 80/90 Passed
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* Bottom Minimalist Auth Footer matching Reference                          */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <Link to="/" className="font-black text-slate-900 text-sm">
              ninety<span className="text-cyan-500">pte</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-[11px] text-slate-400">
              All rights reserved © NinetyPTE Education, 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-600">
            <Link to="/contact" className="hover:text-cyan-600 transition">Contact</Link>
            <a href="#disclaimer" className="hover:text-cyan-600 transition">Disclaimer</a>
            <a href="#refund" className="hover:text-cyan-600 transition">Refund & Cancellation Policy</a>
            <a href="#privacy" className="hover:text-cyan-600 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-cyan-600 transition">Terms & Conditions</a>
          </div>

        </div>
      </footer>

    </div>
  );
}
