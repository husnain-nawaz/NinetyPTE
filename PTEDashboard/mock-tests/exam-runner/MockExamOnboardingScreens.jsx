import { useEffect, useRef, useState } from 'react';
import { BookOpen, Clock, Headphones, Info, Play, Square, Volume2 } from 'lucide-react';
import {
  HeadphonePersonSVG,
  MicrophoneCheckAvatarsSVG,
  StartTestPersonSVG,
} from './MockTestSVGArt';
import SpeakingRecorderWidget from './SpeakingRecorderWidget';
import { formatExamDurationLabel } from './mockTestSessionStore';

const ALERT_VARIANTS = {
  0: {
    icon: Headphones,
    body: 'Always use a USB headset with a microphone to get an accurate AI score',
  },
  1: {
    icon: Info,
    body: 'Please make sure that you do not have any other window of NinetyPTE open while taking the mock test.',
  },
};

/**
 * Centered pre-test alert popups shown sequentially when launching a mock test.
 */
export function ImportantExamModal({ modalStep, onAcknowledge }) {
  const variant = ALERT_VARIANTS[modalStep];
  if (!variant) return null;
  const Icon = variant.icon;

  return (
    <div
      className="fixed inset-0 z-60 bg-slate-900/45 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="important-exam-alert"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white px-7 py-8 shadow-2xl text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full border-2 border-[#ef8f52] bg-[#fff5ee] text-[#ef8f52] flex items-center justify-center">
          <Icon className="w-7 h-7" />
        </div>
        <h3 id="important-exam-alert" className="text-base font-extrabold tracking-wide text-slate-900">
          IMPORTANT
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">{variant.body}</p>
        <div className="pt-1">
          <button
            type="button"
            onClick={onAcknowledge}
            className="min-w-[120px] rounded-lg bg-[#49d0c9] hover:bg-[#36bcb5] px-8 py-2 text-xs font-bold text-white shadow-2xs transition cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Onboarding Step 0: Parts & Time Allowed table.
 */
export function PartsOverviewScreen({ breakdown, darkMode }) {
  const durationLabel = formatExamDurationLabel(breakdown.totalMinutes);
  const partCount = breakdown.rows.length;

  return (
    <div className="space-y-6 max-w-2xl">
      <p className={`text-sm font-bold ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
        This test is divided into {partCount} {partCount === 1 ? 'part' : 'parts'} and is approximately{' '}
        {durationLabel} long
      </p>

      <table
        className={`w-full max-w-[440px] border-collapse border-2 text-xs ${
          darkMode ? 'border-zinc-500 text-zinc-100' : 'border-black text-slate-900'
        }`}
      >
        <thead>
          <tr className={darkMode ? 'bg-zinc-700' : 'bg-[#e5e5e5]'}>
            <th
              className={`border px-3 py-1.5 text-center font-semibold italic ${
                darkMode ? 'border-zinc-500' : 'border-black'
              }`}
            >
              Part
            </th>
            <th
              className={`border px-3 py-1.5 text-center font-semibold italic ${
                darkMode ? 'border-zinc-500' : 'border-black'
              }`}
            >
              Content
            </th>
            <th
              className={`border px-3 py-1.5 text-center font-semibold italic ${
                darkMode ? 'border-zinc-500' : 'border-black'
              }`}
            >
              Time Allowed
            </th>
          </tr>
        </thead>
        <tbody>
          {breakdown.rows.map((row) => (
            <tr key={row.part}>
              <td
                className={`border px-3 py-1.5 italic ${
                  darkMode ? 'border-zinc-500' : 'border-black'
                }`}
              >
                {row.part}
              </td>
              <td
                className={`border px-3 py-1.5 italic ${
                  darkMode ? 'border-zinc-500' : 'border-black'
                }`}
              >
                {row.content}
              </td>
              <td
                className={`border px-3 py-1.5 italic ${
                  darkMode ? 'border-zinc-500' : 'border-black'
                }`}
              >
                {row.minutes} minutes
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Onboarding Step 1: Test Introduction with preview status badge.
 */
export function TestIntroductionScreen({ isCore, totalQuestions, darkMode }) {
  const mutedText = darkMode ? 'text-zinc-200' : 'text-slate-700';

  return (
    <div className={`space-y-5 max-w-3xl text-xs sm:text-[13px] leading-relaxed ${mutedText}`}>
      <h2 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        Test Introduction
      </h2>

      <p>
        This test will assess your English Reading, Writing, Listening, and Speaking skills as used in an{' '}
        {isCore ? 'everyday general' : 'academic'} environment.
      </p>

      <ul className="list-disc pl-5 space-y-3">
        <li className="space-y-2.5">
          <span>
            The test is divided into three parts, each containing one or more sections. Each section is
            individually timed, and a timer will be visible in the top-right corner of your screen. The
            number of items in the section will also be displayed.
          </span>

          <div className="w-fit min-w-[190px] bg-[#b5b5b5] text-slate-900 px-3 py-2 text-right font-medium text-[11px] space-y-0.5 rounded-xs">
            <p className="inline-flex items-center justify-end gap-1.5 w-full">
              <Clock className="w-3 h-3" />
              <span>Time Remaining: 00:27:22</span>
            </p>
            <p className="inline-flex items-center justify-end gap-1.5 w-full">
              <BookOpen className="w-3 h-3" />
              <span>1 of {totalQuestions}</span>
            </p>
          </div>
        </li>

        <li>At the start of each part, you will receive instructions explaining what to expect.</li>

        <li>
          To confirm your answer and move to the next question, click the Next button at the bottom of
          the screen. Once you click Next, you cannot return to the previous question. You will not be
          able to revisit any questions after completing the test.
        </li>

        <li>
          The test includes various English accents, such as British, American, and Australian. You may
          respond using the standard English variety you are most comfortable with.
        </li>
      </ul>
    </div>
  );
}

/**
 * Onboarding Step 2: Interactive Headphone Check with playable sound sample and volume slider.
 */
export function HeadphoneCheckScreen({ darkMode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [volume, setVolume] = useState(85);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  const stopSampleAudio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    try {
      audioCtxRef.current?.close();
    } catch {
      // Ignore AudioContext cleanup issues
    }
    audioCtxRef.current = null;
    gainNodeRef.current = null;
    setIsPlaying(false);
  };

  useEffect(() => () => stopSampleAudio(), []);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime((volume / 100) * 0.14, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSampleAudio();
      return;
    }

    setElapsedSeconds(0);
    setIsPlaying(true);

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const gain = ctx.createGain();
        gain.gain.value = (volume / 100) * 0.14;
        gain.connect(ctx.destination);

        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(523.25, ctx.currentTime + 1.5);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 3);
        osc.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 8);

        audioCtxRef.current = ctx;
        gainNodeRef.current = gain;
      }
    } catch {
      // Proceed with visual timer fallback even if AudioContext is blocked
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= 7) {
          stopSampleAudio();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const progressPct = isPlaying ? Math.min(100, ((elapsedSeconds + 1) / 8) * 100) : 0;

  return (
    <div className="space-y-8 max-w-3xl">
      <div className={`space-y-4 text-xs sm:text-[13px] leading-relaxed ${darkMode ? 'text-zinc-200' : 'text-slate-700'}`}>
        <h2 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Headphone Check
        </h2>
        <p>This is your chance to ensure your headset is working properly.</p>

        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Put on your headset and adjust it for a comfortable fit over your ears.</li>
          <li>When you&apos;re ready, click the [Play] button to hear a short audio sample.</li>
          <li>
            If you don&apos;t hear any sound while the status shows [Playing], please raise your hand to
            alert the Test Administrator.
          </li>
          <li>
            During the test, you will not have access to the [Play] or [Stop] buttons. The audio will play
            automatically when each question begins.
          </li>
          <li>Please keep your headset on at all times — it must be worn throughout the entire test.</li>
        </ol>
      </div>

      <div className="w-[270px] rounded-xs bg-[#3792b5] text-white px-5 py-4 space-y-5 shadow-md">
        <div className="text-right text-xs font-mono h-4">
          {isPlaying ? `00:${String(elapsedSeconds + 1).padStart(2, '0')}` : ''}
        </div>

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Stop headphone check audio' : 'Play headphone check audio'}
            className="text-white hover:opacity-85 cursor-pointer pt-0.5 shrink-0"
          >
            {isPlaying ? (
              <Square className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white" />
            )}
          </button>

          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-full bg-white border border-white/80 overflow-hidden">
              <div
                className="h-full bg-[#0997d6] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[11px] text-white/95">
              {isPlaying ? 'Playing sample audio...' : 'Click the play button to start'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-1">
          <Volume2 className="w-5 h-5 text-white shrink-0" />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Headphone volume slider"
            className="w-32 h-1.5 accent-white cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <HeadphonePersonSVG />
      </div>
    </div>
  );
}

const WAVE_BAR_HEIGHTS = [14, 20, 10, 18, 22, 12, 16, 20, 12, 18, 10, 16, 22, 14, 18, 10, 15, 19, 12];

/**
 * Onboarding Step 3: Interactive Microphone Check with Ready / Recording / Complete / Playback states.
 */
export function MicrophoneCheckScreen({ darkMode }) {
  const [micStatus, setMicStatus] = useState('ready'); // 'ready' | 'recording' | 'complete' | 'playing'
  const [tick, setTick] = useState(0);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const recordedUrlRef = useRef('');
  const playbackAudioRef = useRef(null);

  useEffect(() => {
    if (micStatus !== 'recording') return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 160);
    return () => clearInterval(id);
  }, [micStatus]);

  useEffect(
    () => () => {
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
      playbackAudioRef.current?.pause();
      if (recordedUrlRef.current) URL.revokeObjectURL(recordedUrlRef.current);
    },
    []
  );

  const handleStartRecord = async () => {
    playbackAudioRef.current?.pause();
    if (recordedUrlRef.current) {
      URL.revokeObjectURL(recordedUrlRef.current);
      recordedUrlRef.current = '';
    }
    setMicStatus('recording');

    try {
      if (navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const chunks = [];
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (ev) => {
          if (ev.data.size > 0) chunks.push(ev.data);
        };
        recorder.onstop = () => {
          if (chunks.length > 0) {
            const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
            recordedUrlRef.current = URL.createObjectURL(blob);
          }
          stream.getTracks().forEach((tr) => tr.stop());
          streamRef.current = null;
        };
        recorder.start();
        recorderRef.current = recorder;
      }
    } catch {
      // Allow interactive UI check state even without physical microphone permissions
    }
  };

  const handleStopAll = () => {
    if (micStatus === 'recording') {
      try {
        if (recorderRef.current && recorderRef.current.state !== 'inactive') {
          recorderRef.current.stop();
        }
      } catch {
        // Ignore recorder stop exceptions
      }
      setMicStatus('complete');
      return;
    }

    if (micStatus === 'playing') {
      playbackAudioRef.current?.pause();
      playbackAudioRef.current = null;
      setMicStatus('complete');
    }
  };

  const handlePlayBack = () => {
    setMicStatus('playing');
    if (recordedUrlRef.current) {
      try {
        const audio = new Audio(recordedUrlRef.current);
        playbackAudioRef.current = audio;
        audio.onended = () => setMicStatus('complete');
        audio.play().catch(() => {
          setTimeout(() => setMicStatus('complete'), 2000);
        });
        return;
      } catch {
        // Fallback below
      }
    }
    setTimeout(() => setMicStatus('complete'), 2200);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div
          className={`space-y-4 max-w-xl text-xs sm:text-[13px] leading-relaxed ${
            darkMode ? 'text-zinc-200' : 'text-slate-700'
          }`}
        >
          <h2 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Microphone Check
          </h2>
          <p>This is your chance to ensure your microphone is working properly.</p>

          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Ensure your headset is on, with the microphone positioned close to your mouth.</li>
            <li>
              When ready, click the [Record] button and say:{' '}
              <strong className={darkMode ? 'text-white' : 'text-slate-900'}>
                “Testing, testing, one, two, three.”
              </strong>
            </li>
            <li>Click the [Stop] button once you&apos;ve finished speaking</li>
            <li>Then, click [Playback] to listen to your recording.</li>
            <li>
              If you cannot hear your voice clearly, please raise your hand to alert the Test Administrator.
            </li>
            <li>
              During the test, the recording will start automatically. You will not have access to the Record,
              Playback, or Stop buttons.
            </li>
          </ol>
        </div>

        <MicrophoneCheckAvatarsSVG className="w-44 h-28 shrink-0" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        {micStatus === 'complete' && (
          <button
            type="button"
            onClick={handlePlayBack}
            className="min-w-[140px] rounded-sm bg-[#4aa2c6] hover:bg-[#3a8eaf] px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition"
          >
            Play Back
          </button>
        )}

        {micStatus === 'recording' || micStatus === 'playing' ? (
          <button
            type="button"
            onClick={handleStopAll}
            className="min-w-[140px] rounded-sm bg-[#4aa2c6] hover:bg-[#3a8eaf] px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition"
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStartRecord}
            className="min-w-[140px] rounded-sm bg-[#4aa2c6] hover:bg-[#3a8eaf] px-5 py-2.5 text-xs font-bold text-white cursor-pointer transition"
          >
            Record
          </button>
        )}

        <div className="flex items-center gap-3">
          <span
            className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center ${
              micStatus === 'recording' ? 'border-[#f25c5c]' : 'border-zinc-400'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full ${
                micStatus === 'recording' ? 'bg-[#f25c5c] animate-pulse' : 'bg-zinc-400'
              }`}
            />
          </span>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
                {micStatus === 'recording'
                  ? 'Recording'
                  : micStatus === 'complete' || micStatus === 'playing'
                    ? 'Complete'
                    : 'Ready'}
              </span>
              {(micStatus === 'complete' || micStatus === 'playing') && (
                <span className="h-[1px] w-16 bg-zinc-400 inline-block" />
              )}
            </div>

            {micStatus === 'recording' && (
              <div className="flex items-center gap-0.5 h-5">
                {WAVE_BAR_HEIGHTS.map((baseH, idx) => {
                  const modH = ((baseH + ((tick + idx) % 4) * 3) % 18) + 4;
                  return (
                    <span
                      key={idx}
                      className="w-[2.5px] rounded-full bg-[#176e93] transition-all duration-150"
                      style={{ height: `${modH}px` }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Onboarding Step 4: Speaking Tips.
 */
export function SpeakingTipsScreen({ darkMode }) {
  return (
    <div className={`space-y-4 max-w-2xl text-xs sm:text-[13px] leading-relaxed ${darkMode ? 'text-zinc-200' : 'text-slate-700'}`}>
      <h2 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        Speaking Tips
      </h2>

      <ul className="list-disc pl-5 space-y-1.5">
        <li>Focus on clear, natural expression with accurate pronunciation and correct grammar.</li>
        <li>Avoid long pauses or filler words like &quot;um&quot; or &quot;uh&quot;.</li>
        <li>Fluency is key — speak confidently and without hesitation.</li>
      </ul>
    </div>
  );
}

/**
 * Onboarding Step 5: Writing Instructions & US/UK spelling preference selector.
 */
export function WritingInstructionsScreen({ writingStyle, onSelectWritingStyle, darkMode }) {
  return (
    <div className={`space-y-5 max-w-2xl text-xs sm:text-[13px] leading-relaxed ${darkMode ? 'text-zinc-200' : 'text-slate-700'}`}>
      <h2 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        Writing Instructions
      </h2>

      <p>
        This is your chance to select the writing style you would like us to use for scoring your Writing
        section responses.
      </p>

      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Please choose either American (US) or British (UK) English for your writing score evaluation.</li>
        <li>
          It is strongly advised to use the same writing style consistently in all your responses throughout
          this test.
        </li>
        <li>This selection will only apply for scoring purposes in this mock test.</li>
        <li>
          Note that in the official PTE exam, you will not see this screen – it is only for practice purposes
          on this platform.
        </li>
        <li>Once selected, the chosen writing style will be applied throughout the test.</li>
      </ol>

      <div className="space-y-2.5 pt-1">
        <p className="font-medium">Select your preferred option below:</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {['American (US)', 'British (UK)'].map((option) => {
            const active = writingStyle === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelectWritingStyle(option)}
                className={`rounded-xs border px-4 py-2 text-xs font-medium transition cursor-pointer ${
                  active
                    ? 'border-[#12738b] bg-[#12738b] text-white shadow-2xs'
                    : darkMode
                      ? 'border-[#3792b5] text-[#64c5e8] hover:bg-zinc-700'
                      : 'border-[#54a6cb] text-[#3a8eaf] bg-white hover:bg-sky-50'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Onboarding Step 6: Personal Introduction prompt with 25-second recorder widget.
 */
export function PersonalIntroductionScreen({ darkMode, onPhaseChange }) {
  const mutedText = darkMode ? 'text-zinc-200' : 'text-slate-600';

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-4">
        <p className={`text-xs sm:text-[13px] font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Read the prompt below. In 25 seconds, you must reply in your own words, as naturally and
          clearly as possible. You have 25 seconds to record your response.
        </p>

        <p className={`text-xs sm:text-[13px] ${mutedText}`}>
          Please introduce yourself. For example, you could talk about one of the following:
        </p>

        <ul className={`list-disc pl-8 space-y-1 text-xs sm:text-[13px] ${mutedText}`}>
          <li>Your interests</li>
          <li>Your plans for future study</li>
          <li>Why you want to study abroad</li>
          <li>Why you need to learn English</li>
          <li>Why you chose this test</li>
        </ul>
      </div>

      <div className="pt-8">
        <SpeakingRecorderWidget
          prepSeconds={5}
          recordSeconds={25}
          darkMode={darkMode}
          onPhaseChange={onPhaseChange}
        />
      </div>
    </div>
  );
}

/**
 * Onboarding Step 7: Transition screen right before Part 1 breakdown.
 */
export function ReadyToStartTestScreen({ darkMode }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <p className={`text-xs sm:text-[13px] font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        You are now about to start your test. Click &quot;Next&quot; to proceed.
      </p>

      <div className="pl-2">
        <StartTestPersonSVG />
      </div>
    </div>
  );
}

/**
 * Onboarding Step 8 (and inter-part transition): Detailed Content / Time Allowed rowspan table.
 */
export function PartIntroScreen({ partSpec, darkMode }) {
  const borderColor = darkMode ? 'border-zinc-500' : 'border-black';

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="space-y-3 text-xs sm:text-[13px]">
        <p className={darkMode ? 'text-zinc-100' : 'text-slate-900'}>
          You are about to begin {partSpec.partLabel} of the exam:{' '}
          <strong>{partSpec.partTitle}</strong>
        </p>
        <p className={darkMode ? 'text-zinc-200' : 'text-slate-800'}>
          Remember to put your headphones on before beginning this section
        </p>
      </div>

      <table className={`w-full max-w-[440px] border-collapse border-2 text-xs ${borderColor}`}>
        <thead>
          <tr className={darkMode ? 'bg-zinc-700 text-zinc-100' : 'bg-[#e5e5e5] text-slate-900'}>
            <th className={`border px-3 py-1.5 text-center font-semibold italic ${borderColor}`}>
              Content
            </th>
            <th className={`border px-3 py-1.5 text-center font-semibold italic ${borderColor}`}>
              Time Allowed
            </th>
          </tr>
        </thead>
        <tbody className={darkMode ? 'text-zinc-100' : 'text-slate-900'}>
          {partSpec.groups.map((group) =>
            group.tasks.map((taskName, tIdx) => (
              <tr key={taskName}>
                <td className={`border px-4 py-1 text-center italic ${borderColor}`}>
                  {taskName}
                </td>
                {tIdx === 0 && (
                  <td
                    rowSpan={group.tasks.length}
                    className={`border px-4 py-1 text-center italic align-middle ${borderColor}`}
                  >
                    {group.minutes} minutes
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
