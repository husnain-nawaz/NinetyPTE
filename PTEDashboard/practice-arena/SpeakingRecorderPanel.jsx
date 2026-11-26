import { useState } from 'react';
import {
  ChevronDown,
  Download,
  Info,
  Mic,
  Pause,
  Play,
  Square,
  Volume2,
} from 'lucide-react';

const VOICE_OPTIONS = [
  { id: 'female-in', label: 'Female (IN)', lang: 'en-IN', pitch: 1.08 },
  { id: 'male-au', label: 'Male (AU)', lang: 'en-AU', pitch: 0.92 },
  { id: 'male-us', label: 'Male (US)', lang: 'en-US', pitch: 0.9 },
  { id: 'female-uk', label: 'Female (UK)', lang: 'en-GB', pitch: 1.1 },
];

const WAVEFORM_BARS = [
  4, 4, 6, 12, 22, 18, 28, 36, 20, 44, 52, 26, 38, 16, 12, 8, 18, 26, 20, 32,
  40, 24, 34, 18, 28, 16, 22, 30, 14, 10, 16, 20, 12, 8, 6, 4, 4, 4,
];

function formatTimer(sec) {
  const s = Math.max(0, Math.floor(sec));
  const mins = String(Math.floor(s / 60)).padStart(2, '0');
  const rem = String(s % 60).padStart(2, '0');
  return `${mins}:${rem}`;
}

/**
 * Shared Speaking prompt card (accent speaker dropdown + passage/audio/image)
 * and interactive 3-state Warm Mic Recorder / Cyan Waveform Playback bar.
 */
export default function SpeakingRecorderPanel({
  taskMeta,
  activeQuestion,
  showAnswer,
  recorderState,
  prepSecondsLeft,
  recordElapsed,
  totalRecordSeconds = 35,
  onStartRecording,
  onStopRecording,
}) {
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0]);
  const [voiceMenuOpen, setVoiceMenuOpen] = useState(false);
  const [promptPlaying, setPromptPlaying] = useState(false);
  const [playbackPlaying, setPlaybackPlaying] = useState(false);
  const [volumePct, setVolumePct] = useState(85);
  const [difficultyInfoOpen, setDifficultyInfoOpen] = useState(false);

  const promptContent = activeQuestion.contentSnippet || taskMeta.promptText;

  const handleSpeakPrompt = (voiceOpt = selectedVoice) => {
    setVoiceMenuOpen(false);
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(promptContent);
        utterance.lang = voiceOpt.lang;
        utterance.pitch = voiceOpt.pitch;
        utterance.rate = 0.96;
        utterance.volume = volumePct / 100;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Ignore speech synthesis errors on unsupported browsers
    }
  };

  const handleDownloadRecording = () => {
    const content = [
      `NinetyPTE Practice Recording Summary`,
      `Task: ${taskMeta.title} (${taskMeta.code})`,
      `Question: #${activeQuestion.id} — ${activeQuestion.title}`,
      `Duration: ${formatTimer(recordElapsed || 8)}`,
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${taskMeta.code}-${activeQuestion.id}-recording-summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const statusLabel =
    recorderState === 'recording'
      ? 'Recording'
      : recorderState === 'recorded'
      ? 'Recording Finished'
      : 'Recording in ';

  const progressPct =
    recorderState === 'recording'
      ? Math.min(100, Math.round((recordElapsed / totalRecordSeconds) * 100))
      : 0;

  return (
    <div className="space-y-3.5">
      {/* Meta Status Row: Countdown / Recording Status + Difficulty & Practiced Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="font-semibold text-slate-600">
          {recorderState === 'idle' ? (
            <>
              <span>Recording in </span>
              <span className="font-bold text-[#1db3a8] tabular-nums">{prepSecondsLeft} sec</span>
            </>
          ) : (
            <span className="font-semibold text-slate-700">{statusLabel}</span>
          )}
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={() => setDifficultyInfoOpen((p) => !p)}
            className="inline-flex items-center gap-1 rounded bg-[#fdf2e6] px-2.5 py-0.5 text-[11px] font-semibold text-[#e67e22] cursor-pointer"
          >
            <span>{activeQuestion.difficulty || 'Medium'}</span>
            <Info className="w-3 h-3" />
          </button>

          {difficultyInfoOpen && (
            <div className="absolute right-16 top-6 z-20 w-56 rounded-lg border border-slate-200 bg-white p-2.5 text-[11px] text-slate-600 shadow-lg">
              Difficulty rating is aggregated from recent student attempts on #{activeQuestion.id}.
            </div>
          )}

          <span className="rounded bg-[#dff5e3] px-2.5 py-0.5 text-[11px] font-semibold text-[#289c46]">
            Practiced ({activeQuestion.practicedCount || 0})
          </span>
        </div>
      </div>

      {/* Audio / Image Prompt Extras when task requires them */}
      {taskMeta.hasAudioPrompt && (
        <div className="rounded-xl border border-slate-200/90 bg-slate-50 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setPromptPlaying((p) => !p);
              if (!promptPlaying) handleSpeakPrompt();
            }}
            aria-label={promptPlaying ? 'Pause prompt audio' : 'Play prompt audio'}
            className="w-8 h-8 rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white flex items-center justify-center shrink-0 cursor-pointer"
          >
            {promptPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <span className="text-[11px] font-mono font-semibold text-slate-600 shrink-0">00:00</span>
          <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
            <div className={`h-full rounded-full bg-[#00b4c6] transition-all ${promptPlaying ? 'w-1/2' : 'w-0'}`} />
          </div>
          <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      )}

      {taskMeta.hasImagePrompt && (
        <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-5 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-end gap-3 h-28 px-4 pt-4 pb-2 border-l-2 border-b-2 border-slate-300">
            <div className="w-8 h-12 rounded-t bg-[#0d5488]" />
            <div className="w-8 h-20 rounded-t bg-[#00b4c6]" />
            <div className="w-8 h-16 rounded-t bg-[#eb8c44]" />
            <div className="w-8 h-24 rounded-t bg-[#22c55e]" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-block rounded-full bg-[#e5f0fa] px-2.5 py-0.5 text-[11px] font-bold text-[#0c4a7e]">
              {activeQuestion.imageType || 'Chart Visual'}
            </span>
            <h3 className="text-sm font-bold text-slate-800">{activeQuestion.title}</h3>
            <p className="text-xs text-slate-500 max-w-md">{taskMeta.promptText}</p>
          </div>
        </div>
      )}

      {/* Main Prompt Card with Bottom-Right Speaker Accent Selector */}
      {((!taskMeta.hasAudioPrompt && !taskMeta.hasImagePrompt) || showAnswer) && (
        <div className="rounded-xl border border-[#8ce2dc] bg-white px-5 pt-5 pb-4 space-y-4">
          <p className="text-sm sm:text-[15px] leading-relaxed text-slate-800">{promptContent}</p>

          <div className="flex justify-end">
            <div className="relative inline-flex items-center rounded-full bg-[#24b9ae] pl-2.5 pr-1 py-1 gap-1.5 shadow-2xs">
              <button
                type="button"
                onClick={() => handleSpeakPrompt(selectedVoice)}
                aria-label="Listen to model reading"
                className="text-white hover:opacity-90 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setVoiceMenuOpen((p) => !p)}
                className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-700 cursor-pointer"
              >
                <span>{selectedVoice.label}</span>
                <ChevronDown className="w-3 h-3 text-[#24b9ae]" />
              </button>

              {voiceMenuOpen && (
                <div className="absolute right-0 top-9 z-30 w-36 rounded-xl border border-slate-100 bg-white py-1 shadow-xl text-xs">
                  {VOICE_OPTIONS.map((opt) => {
                    const active = opt.id === selectedVoice.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedVoice(opt);
                          handleSpeakPrompt(opt);
                        }}
                        className={`block w-full px-3.5 py-2 text-left transition cursor-pointer ${
                          active
                            ? 'bg-[#45d0c7] text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recorder Box: Idle / Recording vs Post-Record Waveform Player */}
      {recorderState === 'recorded' ? (
        <div className="rounded-xl border border-[#8ce2dc] bg-white overflow-hidden">
          <div className="h-24 px-5 flex items-center justify-center gap-1.5 border-b border-[#ccf0ed]">
            {WAVEFORM_BARS.map((height, idx) => (
              <span
                key={idx}
                className={`w-1 rounded-full transition-colors ${
                  playbackPlaying && idx < 22 ? 'bg-[#1db3a8]' : 'bg-slate-300'
                }`}
                style={{ height: `${height}px` }}
              />
            ))}
          </div>

          <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPlaybackPlaying((p) => !p)}
              aria-label={playbackPlaying ? 'Pause recorded audio' : 'Play recorded audio'}
              className="w-7 h-7 rounded-full bg-[#45d0c7] hover:bg-[#2bb4ab] text-white flex items-center justify-center transition cursor-pointer"
            >
              {playbackPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadRecording}
                aria-label="Download recording"
                className="w-6 h-6 rounded-full border border-[#7ce0d9] text-[#2cc3b9] hover:bg-[#effbfa] flex items-center justify-center cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              <Volume2 className="w-4 h-4 text-[#45d0c7]" />

              <input
                type="range"
                min={0}
                max={100}
                value={volumePct}
                onChange={(e) => setVolumePct(Number(e.target.value))}
                aria-label="Playback volume"
                className="w-20 accent-[#45d0c7] cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#f5d8ca] bg-[#fdf3ee] px-5 py-4 space-y-2.5">
          <p className="text-center text-xs font-bold text-slate-700">
            {recorderState === 'recording' ? 'Click to Stop' : 'Click to Start'}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={recorderState === 'recording' ? onStopRecording : onStartRecording}
              aria-label={recorderState === 'recording' ? 'Stop recording' : 'Start recording'}
              className="w-8 h-8 rounded-full bg-[#eb8c44] hover:bg-[#d97736] text-white flex items-center justify-center shrink-0 shadow-xs transition cursor-pointer"
            >
              {recorderState === 'recording' ? (
                <Square className="w-3.5 h-3.5 fill-white" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 tabular-nums">
                <span>{formatTimer(recorderState === 'recording' ? recordElapsed : 0)}</span>
                <span>{formatTimer(totalRecordSeconds)}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#24b9ae] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
