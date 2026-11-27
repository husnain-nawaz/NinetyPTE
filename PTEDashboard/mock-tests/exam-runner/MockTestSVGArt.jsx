const HEADPHONE_CHECK_PHOTO_URL =
  'https://images.unsplash.com/photo-1714893656818-9bd2b65c11ba?auto=format&fit=crop&w=640&q=80';

const MIC_CHECK_PHOTO_LEFT_URL =
  'https://images.unsplash.com/photo-1682096222461-d5959baff593?auto=format&fit=crop&w=500&q=80';

const MIC_CHECK_PHOTO_RIGHT_URL =
  'https://images.unsplash.com/photo-1655947714947-451781994012?auto=format&fit=crop&w=500&q=80';

const START_TEST_PHOTO_URL =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=640&q=80';

/**
 * Embedded headset photograph shown on the Headphone Check screen.
 */
export function HeadphonePersonSVG({ className = 'w-44 h-28' }) {
  return (
    <img
      src={HEADPHONE_CHECK_PHOTO_URL}
      alt="Headset with microphone reference"
      className={`${className} rounded-xl object-cover shadow-md border border-slate-200/70`}
      loading="lazy"
    />
  );
}

/**
 * Embedded audio headset & studio microphone photographs shown on the Microphone Check screen.
 */
export function MicrophoneCheckAvatarsSVG({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={MIC_CHECK_PHOTO_LEFT_URL}
        alt="Candidate wearing headset with microphone"
        className="w-28 h-24 rounded-xl object-cover shadow-md border border-slate-200/70"
        loading="lazy"
      />
      <img
        src={MIC_CHECK_PHOTO_RIGHT_URL}
        alt="Studio headset and recording setup"
        className="w-28 h-24 rounded-xl object-cover shadow-md border border-slate-200/70"
        loading="lazy"
      />
    </div>
  );
}

/**
 * Embedded photograph shown on the "You are now about to start your test" screen.
 */
export function StartTestPersonSVG({ className = 'w-56 h-36' }) {
  return (
    <img
      src={START_TEST_PHOTO_URL}
      alt="Learner preparing to start mock test"
      className={`${className} rounded-xl object-cover shadow-md border border-slate-200/70`}
      loading="lazy"
    />
  );
}
