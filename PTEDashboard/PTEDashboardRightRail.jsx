import { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gift,
  Info,
  Link2,
  Mic,
  Play,
  RotateCcw,
  Settings,
  Target,
  Trophy,
  UserPlus,
} from 'lucide-react';
import {
  CALENDAR_WEEKS,
  TARGET_PRESETS,
  TODAYS_TASKS_BY_SKILL,
  VIDEO_GUIDES,
} from './pteDashboardData';

const pad2 = (num) => String(num).padStart(2, '0');

/**
 * Right-hand utility column of PTEDashboard containing video highlight,
 * score target, exam countdown, Refer & Earn, streak calendar, daily task pills,
 * real-time Pitch Analyzer gauge, quick Speech/Listening check, and social links.
 */
export default function PTEDashboardRightRail({ onSelectVideo }) {
  const [target, setTarget] = useState(TARGET_PRESETS[2]);
  const [editingTarget, setEditingTarget] = useState(false);

  const [examDateStr, setExamDateStr] = useState('');
  const [editingCountdown, setEditingCountdown] = useState(false);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const [copiedReferral, setCopiedReferral] = useState(false);
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const [taskSkill, setTaskSkill] = useState('Speaking');

  const [analyzingPitch, setAnalyzingPitch] = useState(false);
  const [pitchHz, setPitchHz] = useState(0);

  const [quickTestMode, setQuickTestMode] = useState('speech');
  const [speechResponse, setSpeechResponse] = useState('');
  const [listeningMicActive, setListeningMicActive] = useState(false);

  // Live countdown ticker when an exam date is set
  useEffect(() => {
    if (!examDateStr) {
      return undefined;
    }
    const tick = () => {
      const diffMs = Math.max(0, new Date(examDateStr).getTime() - Date.now());
      const totalSec = Math.floor(diffMs / 1000);
      setCountdown({
        d: Math.floor(totalSec / 86400),
        h: Math.floor((totalSec % 86400) / 3600),
        m: Math.floor((totalSec % 3600) / 60),
        s: totalSec % 60,
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [examDateStr]);

  // Smooth simulated pitch reading while analysis is running
  useEffect(() => {
    if (!analyzingPitch) return undefined;
    const interval = setInterval(() => {
      setPitchHz(Math.floor(115 + Math.random() * 65));
    }, 450);
    return () => clearInterval(interval);
  }, [analyzingPitch]);

  const handleTogglePitch = () => {
    if (analyzingPitch) {
      setAnalyzingPitch(false);
      setPitchHz(0);
    } else {
      setAnalyzingPitch(true);
      setPitchHz(138);
    }
  };

  const handleCopyReferral = () => {
    const shareUrl = `${window.location.origin}/signup?ref=002087161`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const heroVideo = VIDEO_GUIDES[0];
  const activeTasks = TODAYS_TASKS_BY_SKILL[taskSkill] || [];
  const shownCalendarDays = calendarExpanded
    ? CALENDAR_WEEKS
    : CALENDAR_WEEKS.slice(0, 14);

  return (
    <aside className="space-y-4">
      {/* 1. Featured Strategy Video Card */}
      <button
        type="button"
        onClick={() => onSelectVideo(heroVideo)}
        className="group relative w-full h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-[#06182c] via-[#0c3556] to-[#2c122e] p-4 text-left text-white shadow-sm cursor-pointer block"
      >
        <div className="flex items-center justify-between text-[10px] font-bold">
          <span className="text-cyan-300 tracking-tight">ninetypte</span>
          <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-amber-300 border border-amber-300/30">
            New Guide
          </span>
        </div>

        <div className="mt-3 space-y-1">
          <span className="inline-block bg-white text-slate-900 px-2 py-0.5 rounded font-black text-xs uppercase tracking-tight">
            PTE <span className="text-rose-600">AI SCORE</span>
          </span>
          <div>
            <span className="inline-block bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black text-xs uppercase tracking-tight">
              VS HUMAN SCORE
            </span>
          </div>
          <p className="text-[11px] text-slate-300 pt-1">Watch expert breakdown</p>
        </div>

        <span className="absolute right-4 bottom-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition">
          <Play className="w-4 h-4 fill-white text-white ml-0.5" />
        </span>
      </button>

      {/* 2. Your Target & Exam Countdown */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-4 bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-2xs relative">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-700">Your Target</span>
            <button
              type="button"
              onClick={() => setEditingTarget((prev) => !prev)}
              aria-label="Edit target score"
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2.5 flex flex-col items-center text-center">
            <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xs">
              <Trophy className="w-3.5 h-3.5" />
            </span>
            <p className="mt-2 text-sm font-extrabold text-orange-600">{target.range}</p>
            <p className="text-[10px] font-medium text-slate-400">{target.tier}</p>
          </div>

          {editingTarget && (
            <div className="absolute left-0 top-full mt-1.5 w-36 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-30 text-xs">
              {TARGET_PRESETS.map((preset) => (
                <button
                  key={preset.range}
                  type="button"
                  onClick={() => {
                    setTarget(preset);
                    setEditingTarget(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left hover:bg-cyan-50 text-slate-700"
                >
                  <strong className="text-orange-600">{preset.range}</strong> · {preset.tier}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-8 bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Exam Countdown</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                type="button"
                onClick={() => setEditingCountdown((prev) => !prev)}
                aria-label="Set exam date"
                className="hover:text-slate-700 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
              <Info className="w-3.5 h-3.5" />
            </div>
          </div>

          {editingCountdown ? (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="date"
                value={examDateStr}
                onChange={(e) => {
                  setExamDateStr(e.target.value);
                  setEditingCountdown(false);
                }}
                className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-700"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1 text-center pt-2">
              {[
                { val: pad2(countdown.d), label: 'Day' },
                { val: pad2(countdown.h), label: 'Hr' },
                { val: pad2(countdown.m), label: 'Min' },
                { val: pad2(countdown.s), label: 'Sec' },
              ].map((unit, idx) => (
                <div key={unit.label} className="relative">
                  <div className="text-xl font-black text-[#0f3554] leading-none">
                    {unit.val}
                    {idx < 3 && (
                      <span className="text-slate-300 font-normal ml-1">:</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{unit.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Refer & Earn Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-[#fdf5ed] via-[#faf4f7] to-[#f4f1fc] p-4 shadow-2xs relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-sm font-bold text-[#d97736] mb-3">Refer &amp; Earn</h3>

          <div className="space-y-3">
            {[
              {
                icon: Link2,
                bg: 'bg-[#4f8df9]',
                title: 'Share Link',
                desc: 'Share your referral link',
              },
              {
                icon: UserPlus,
                bg: 'bg-[#22c55e]',
                title: 'Friend Joins',
                desc: 'Friend signs up & subscribes',
              },
              {
                icon: Gift,
                bg: 'bg-[#0d5488]',
                title: 'You Earn',
                desc: 'Get FREE credit points',
              },
            ].map(({ icon: StepIcon, bg, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full ${bg} text-white flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <StepIcon className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#0f3554]">{title}</p>
                  <p className="text-[10.5px] text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleCopyReferral}
              className="rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white px-4 py-1.5 text-[11px] font-bold inline-flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
              <span>{copiedReferral ? 'Referral Link Copied!' : 'Share Referral Link Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Build Your First Streak + Calendar + Today's Task */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-4">
        <div className="rounded-xl border border-[#d5eef5] bg-[#f4fbfd] p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#00a896] font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-2xs">
                <Flame className="w-3.5 h-3.5" />
              </span>
              <span>Build Your First Streak</span>
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <p className="text-xs font-medium text-slate-600">
            Best Streak: <strong className="text-slate-900">0 days</strong> 🔥
          </p>

          <div className="rounded-xl bg-white border border-slate-100 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Target className="w-3.5 h-3.5 text-slate-500" />
              <span>Today&apos;s Target</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-800">0/97</span>
              <span className="w-6 h-6 rounded-full border-4 border-slate-200" />
            </div>
          </div>
        </div>

        {/* Month Calendar */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-3">
            <button type="button" aria-label="Previous week" className="p-1 text-slate-400 hover:text-slate-700">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span>November 2026</span>
            <button type="button" aria-label="Next week" className="p-1 text-slate-400 hover:text-slate-700">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-500 mb-1.5">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[11px]">
            {shownCalendarDays.map((day, idx) => (
              <div
                key={`${day.num}-${idx}`}
                className={`h-7 rounded-lg flex items-center justify-center font-semibold ${
                  day.status === 'pending'
                    ? 'bg-[#fef3c7] text-[#b45309]'
                    : 'bg-slate-50 text-slate-600'
                }`}
              >
                {day.num}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCalendarExpanded((prev) => !prev)}
            className="mt-3 w-full rounded-lg bg-[#f8fafc] border border-slate-100 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            {calendarExpanded ? 'Show less' : 'View more'}
          </button>

          <div className="mt-3 flex items-center justify-around text-[10.5px] text-slate-500 border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              Pending
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              Completed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              Not Opened
            </span>
          </div>
        </div>

        {/* Today's Task */}
        <div className="rounded-xl border border-slate-100 bg-[#fbfdfe] p-3">
          <h3 className="text-xs font-bold text-slate-800 mb-2.5">Today&apos;s Task</h3>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {Object.keys(TODAYS_TASKS_BY_SKILL).map((skill) => {
              const active = taskSkill === skill;
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setTaskSkill(skill)}
                  className={`rounded-full py-1 text-[10px] font-semibold border transition cursor-pointer ${
                    active
                      ? 'bg-[#d97736] text-white border-[#d97736]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeTasks.map((t) => (
              <div key={t.label}>
                <div className="flex items-center justify-between text-[10px] text-slate-600 mb-1">
                  <span className="truncate pr-1">{t.label}</span>
                  <span className="font-semibold text-slate-400">
                    {t.done}/{t.total}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Pitch Analyzer Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-800 mb-3">Pitch Analyzer</h3>
        <div className="flex items-center gap-4">
          <svg className="w-28 h-16 shrink-0" viewBox="0 0 120 70" aria-hidden="true">
            <path
              d="M 14 60 A 46 46 0 0 1 106 60"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
              strokeDasharray="3 3"
            />
            {analyzingPitch && (
              <path
                d="M 14 60 A 46 46 0 0 1 82 22"
                fill="none"
                stroke="#0d5488"
                strokeWidth="12"
                strokeDasharray="3 3"
              />
            )}
            <circle cx="60" cy="60" r="4" fill="#64748b" />
          </svg>

          <div>
            <p className="text-lg font-extrabold text-[#0d5488]">
              {pad2(pitchHz)} <span className="text-[10px] font-bold text-slate-400">HZ</span>
            </p>
            <p className="text-[10.5px] text-slate-400 leading-snug mt-0.5">
              Click to measure your exact pitch in real-time.
            </p>
            <button
              type="button"
              onClick={handleTogglePitch}
              className="mt-2.5 rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white px-4 py-1.5 text-[11px] font-bold transition cursor-pointer"
            >
              {analyzingPitch ? 'Stop Analysis' : 'Start Analysis'}
            </button>
          </div>
        </div>
      </div>

      {/* 6. Quick Speech Test / Listening Test Widget */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
        <div className="grid grid-cols-2 rounded-full border border-slate-200 p-0.5 mb-4">
          <button
            type="button"
            onClick={() => setQuickTestMode('speech')}
            className={`rounded-full py-1.5 text-xs font-bold transition cursor-pointer ${
              quickTestMode === 'speech'
                ? 'bg-[#634ce6] text-white shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Speech Test
          </button>
          <button
            type="button"
            onClick={() => setQuickTestMode('listening')}
            className={`rounded-full py-1.5 text-xs font-bold transition cursor-pointer ${
              quickTestMode === 'listening'
                ? 'bg-[#634ce6] text-white shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Listening Test
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setListeningMicActive((prev) => !prev);
              if (!speechResponse) {
                setSpeechResponse('Microphone signal clear.');
              }
            }}
            aria-label="Toggle microphone test"
            className={`relative w-20 h-20 rounded-full border flex items-center justify-center shrink-0 transition cursor-pointer ${
              listeningMicActive
                ? 'border-[#634ce6] bg-[#f4f1fe]'
                : 'border-indigo-100 bg-[#faf9ff]'
            }`}
          >
            <span className="w-12 h-12 rounded-full border border-indigo-200 flex items-center justify-center text-[#634ce6]">
              <Mic className="w-5 h-5" />
            </span>
          </button>

          <div className="flex-1 space-y-2">
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {quickTestMode === 'speech'
                  ? 'Click the microphone to start speaking.'
                  : 'Listen carefully and confirm playback clarity.'}
              </span>
            </p>
            <input
              type="text"
              value={speechResponse}
              onChange={(e) => setSpeechResponse(e.target.value)}
              placeholder="Your Response..."
              className="w-full rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400"
            />
            <button
              type="button"
              onClick={() => {
                setSpeechResponse('');
                setListeningMicActive(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-indigo-300 px-3.5 py-1 text-[11px] font-semibold text-[#634ce6] hover:bg-indigo-50 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7. Stay Connected */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-800 mb-3">Stay Connected</h3>
        <div className="flex items-center justify-between text-slate-600 px-1">
          {[
            { label: 'YouTube', short: 'YT', color: 'text-red-500' },
            { label: 'Telegram', short: 'TG', color: 'text-sky-500' },
            { label: 'Instagram', short: 'IG', color: 'text-pink-500' },
            { label: 'WhatsApp', short: 'WA', color: 'text-emerald-500' },
            { label: 'LinkedIn', short: 'in', color: 'text-blue-600' },
            { label: 'X', short: 'X', color: 'text-slate-900' },
            { label: 'Facebook', short: 'f', color: 'text-blue-700' },
          ].map((social) => (
            <a
              key={social.label}
              href={`#${social.label.toLowerCase()}`}
              aria-label={social.label}
              className={`w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-[11px] font-extrabold hover:scale-110 transition ${social.color}`}
            >
              {social.short}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
