/**
 * Headset illustration shown at bottom-center of the Headphone Check screen.
 */
export function HeadphonePersonSVG({ className = 'w-16 h-20' }) {
  return (
    <svg viewBox="0 0 80 96" className={className} fill="none" aria-hidden="true">
      {/* Torso/neck & head profile */}
      <circle cx="42" cy="40" r="22" fill="#f5a25d" />
      <path d="M22 36 C22 18, 60 15, 62 34 C54 28, 30 28, 22 36 Z" fill="#0d3158" />
      <path d="M20 34 C20 50, 26 62, 34 62 L24 62 Z" fill="#0d3158" />
      {/* Headset band */}
      <path
        d="M19 42 C19 18, 63 18, 63 42"
        stroke="#4f8fc0"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Earcup */}
      <rect x="26" y="34" width="12" height="18" rx="6" fill="#7acbe0" />
      {/* Boom mic */}
      <path d="M32 50 L20 58" stroke="#7acbe0" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="19" cy="59" r="3" fill="#7acbe0" />
    </svg>
  );
}

/**
 * Pair of headset speaker profile vectors shown on the Microphone Check screen.
 */
export function MicrophoneCheckAvatarsSVG({ className = 'w-44 h-28' }) {
  return (
    <svg viewBox="0 0 180 110" className={className} fill="none" aria-hidden="true">
      {/* Left speaker avatar */}
      <g transform="translate(8, 12)">
        <circle cx="38" cy="42" r="23" fill="#f5a25d" />
        <path
          d="M15 39 C15 16, 61 16, 61 42 C61 52, 55 62, 42 63 C40 53, 35 48, 26 46 C20 44, 15 41, 15 39 Z"
          fill="#0d2a4a"
        />
        <path d="M28 19 C45 14, 57 26, 56 44" stroke="#7ecae0" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="44" y="34" width="11" height="17" rx="5.5" fill="#7ecae0" />
        <path d="M46 49 L24 58" stroke="#7ecae0" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="23" cy="59" r="3" fill="#7ecae0" />
      </g>

      {/* Right speaker avatar */}
      <g transform="translate(92, 10)">
        <path d="M26 24 C20 34, 19 54, 29 66 L44 66 C58 64, 66 50, 62 32 C56 16, 36 14, 26 24 Z" fill="#f5a25d" />
        <path d="M24 26 C32 10, 62 12, 64 36 C64 46, 59 58, 52 60 C52 44, 43 34, 24 26 Z" fill="#0d2a4a" />
        <path d="M32 16 C50 14, 58 26, 56 42" stroke="#7ecae0" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="44" y="32" width="11" height="17" rx="5.5" fill="#7ecae0" />
        <path d="M46 48 L24 57" stroke="#7ecae0" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="23" cy="58" r="3" fill="#7ecae0" />
      </g>
    </svg>
  );
}

/**
 * Illustration shown on the "You are now about to start your test" screen.
 */
export function StartTestPersonSVG({ className = 'w-28 h-28' }) {
  return (
    <svg viewBox="0 0 130 130" className={className} fill="none" aria-hidden="true">
      <path
        d="M22 45 C12 65, 25 96, 62 96 C96 96, 118 76, 110 50 C104 32, 72 44, 52 36 C36 30, 26 36, 22 45 Z"
        fill="#fef0d1"
      />
      <rect x="16" y="34" width="38" height="24" rx="2" fill="#e6f2fa" stroke="#c3ddf0" strokeWidth="1.5" />
      <line x1="22" y1="42" x2="46" y2="42" stroke="#9fc5e2" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="49" x2="38" y2="49" stroke="#bad6ec" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="72" cy="40" r="8" fill="#1e293b" />
      <circle cx="71" cy="41" r="6" fill="#f3b28c" />
      <path d="M66 36 C70 31, 79 34, 78 44" fill="#1e293b" />
      <path d="M60 52 L80 52 L84 78 L58 78 Z" fill="#1f8a96" />
      <path d="M60 54 L44 50" stroke="#f3b28c" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M80 54 L94 64 L84 68" stroke="#f3b28c" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M62 78 L57 110" stroke="#0c3454" strokeWidth="6" strokeLinecap="round" />
      <path d="M77 78 L81 110" stroke="#0c3454" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
