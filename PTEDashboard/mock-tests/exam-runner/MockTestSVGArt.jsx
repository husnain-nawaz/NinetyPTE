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
