import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Volume2, 
  Clock, 
  CheckCircle, 
  Bookmark, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  HelpCircle,
  FileText,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { TASK_LOOKUP } from '../config/pteModules';
import { getQuestionsByTaskId } from '../services/mockQuestionData';

export default function PracticeArena() {
  const { taskId = 'read-aloud' } = useParams();
  const taskMeta = TASK_LOOKUP[taskId] || TASK_LOOKUP['read-aloud'];
  const questions = getQuestionsByTaskId(taskId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex] || {
    id: `${taskMeta?.code || 'PTE'}-1001`,
    title: 'Standard Academic Practice',
    text: 'Modern scientific research demonstrates that consistent practice in language acquisition significantly enhances cognitive plasticity and oral fluency under timed examination conditions.',
    prepTime: taskMeta?.prepTime || 35,
    recordTime: taskMeta?.recordTime || 40,
    difficulty: taskMeta?.difficulty || 'Medium',
    predicted: true
  };

  // Timers and Recording States
  const [phase, setPhase] = useState('idle'); // 'idle' | 'preparing' | 'recording' | 'completed' | 'scoring'
  const [timeLeft, setTimeLeft] = useState(currentQuestion.prepTime || 35);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [userText, setUserText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('practice'); // 'practice' | 'solution' | 'discussion'
  const [aiScore, setAiScore] = useState(null);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (phase === 'preparing') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        // Start recording phase automatically
        setPhase('recording');
        setTimeLeft(currentQuestion.recordTime || 40);
      }
    } else if (phase === 'recording') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        // Complete recording automatically
        setPhase('completed');
      }
    }
    return () => clearTimeout(timer);
  }, [phase, timeLeft, currentQuestion]);

  // Handle Start Practice
  const handleStartPractice = () => {
    setAiScore(null);
    setRecordedAudio(null);
    setPhase('preparing');
    setTimeLeft(currentQuestion.prepTime || 35);
  };

  // Handle Stop Recording
  const handleStopRecording = () => {
    setPhase('completed');
    setRecordedAudio('simulated_audio_recording.wav');
  };

  // Handle Reset
  const handleReset = () => {
    setPhase('idle');
    setTimeLeft(currentQuestion.prepTime || 35);
    setRecordedAudio(null);
    setAiScore(null);
  };

  // Trigger AI Scoring
  const handleEvaluateAI = () => {
    setPhase('scoring');
    setTimeout(() => {
      setPhase('completed');
      setAiScore({
        overall: Math.floor(Math.random() * 12) + 78,
        content: 84,
        fluency: 82,
        pronunciation: 86,
        grammar: 88,
        spelling: 90,
        wordCount: userText ? userText.trim().split(/\s+/).length : undefined,
        feedback: 'Exceptional oral delivery with steady rhythm. Natural pauses matched syntactic clauses. Minor intonation variation on technical terms.',
        wordScores: (currentQuestion.text || '').split(' ').map((word) => ({
          word,
          score: Math.random() > 0.15 ? 'good' : Math.random() > 0.5 ? 'warning' : 'bad'
        }))
      });
    }, 1200);
  };

  const isWritingTask = ['summarize-written-text', 'write-essay', 'write-email'].includes(taskId);

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/practice" className="hover:text-indigo-600 font-semibold">Practice Hub</Link>
            <span>/</span>
            <span className="text-slate-800 font-bold capitalize">{taskMeta?.id}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-mono font-bold text-xs rounded-lg">
              {taskMeta?.code}
            </span>
            <h1 className="text-xl font-extrabold text-slate-900">{taskMeta?.name}</h1>
            {currentQuestion.predicted && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded-full">
                ★ Exam Predicted
              </span>
            )}
          </div>
        </div>

        {/* Question Switcher & Hostinger Shard Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-500">Hostinger:</span>
            <span className="font-mono text-indigo-600 font-bold">{taskMeta?.shardedDb}</span>
          </div>

          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl border transition ${
              isBookmarked 
                ? 'bg-amber-50 border-amber-300 text-amber-600' 
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title="Bookmark Question"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-800 px-2 font-mono">
              {currentIndex + 1} / {Math.max(questions.length, 1)}
            </span>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex >= questions.length - 1}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Practice Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Real Exam Status Strip */}
        <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">Exam Simulator</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono font-bold text-indigo-300">ID: {currentQuestion.id}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">{currentQuestion.title}</span>
          </div>

          <div className="flex items-center gap-3 font-semibold">
            {phase === 'preparing' && (
              <span className="flex items-center gap-1.5 text-amber-300 animate-pulse">
                <Clock className="w-4 h-4" /> Preparing: {timeLeft}s
              </span>
            )}
            {phase === 'recording' && (
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                Recording in Progress: {timeLeft}s
              </span>
            )}
            {phase === 'completed' && (
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-4 h-4" /> Finished Attempt
              </span>
            )}
            {phase === 'idle' && (
              <span className="text-slate-400">Ready to start</span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 px-6 border-b border-slate-200 text-xs font-bold bg-slate-50/50">
          <button
            onClick={() => setActiveTab('practice')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'practice' 
                ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Practice Arena
          </button>
          <button
            onClick={() => setActiveTab('solution')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'solution' 
                ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Model Answer & Tips
          </button>
          <button
            onClick={() => setActiveTab('discussion')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'discussion' 
                ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Discussion (Hostinger Forum DB)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'practice' && (
            <div className="space-y-6">
              {/* Question Instructions */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                <strong>Instructions:</strong> {taskMeta?.desc} Speak clearly into the microphone. You will hear a short tone before recording starts.
              </div>

              {/* Question Body */}
              {currentQuestion.imageUrl && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentQuestion.imageUrl} 
                    alt={currentQuestion.title} 
                    className="max-h-72 rounded-xl shadow-xs border border-slate-200 object-contain"
                  />
                </div>
              )}

              {currentQuestion.text && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-lg leading-relaxed font-medium">
                  {currentQuestion.text}
                </div>
              )}

              {currentQuestion.passage && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-base leading-relaxed">
                  {currentQuestion.passage}
                </div>
              )}

              {/* Writing Task Textarea */}
              {isWritingTask && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Your Written Response:</span>
                    <span className="font-mono text-indigo-600">
                      Words: {userText.trim() ? userText.trim().split(/\s+/).length : 0}
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    placeholder="Type your response here. Observe proper punctuation, grammar, and formal vocabulary..."
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-sm leading-relaxed text-slate-800"
                  />
                </div>
              )}

              {/* Action Controls & Mic Section */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {phase === 'idle' && (
                    <button
                      onClick={handleStartPractice}
                      className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow hover:bg-indigo-700 transition flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4" /> Start Preparation
                    </button>
                  )}

                  {phase === 'preparing' && (
                    <button
                      onClick={() => {
                        setPhase('recording');
                        setTimeLeft(currentQuestion.recordTime || 40);
                      }}
                      className="px-6 py-3 rounded-xl bg-amber-500 text-white font-bold text-sm shadow hover:bg-amber-600 transition flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4 animate-bounce" /> Skip Prep & Record Now
                    </button>
                  )}

                  {phase === 'recording' && (
                    <button
                      onClick={handleStopRecording}
                      className="px-6 py-3 rounded-xl bg-rose-600 text-white font-bold text-sm shadow hover:bg-rose-700 transition flex items-center gap-2 animate-pulse"
                    >
                      <MicOff className="w-4 h-4" /> Stop & Submit Audio
                    </button>
                  )}

                  {phase === 'completed' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleReset}
                        className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                        title="Re-record Question"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleEvaluateAI}
                        disabled={phase === 'scoring'}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:from-indigo-700 hover:to-purple-700 transition flex items-center gap-2 disabled:opacity-50"
                      >
                        <Sparkles className="w-4 h-4" />
                        {phase === 'scoring' ? 'Evaluating with Pearson AI...' : 'Instant AI Scoring'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>Question Difficulty:</span>
                  <span className="font-bold text-slate-800">{currentQuestion.difficulty}</span>
                </div>
              </div>

              {/* AI Scorecard Result Display */}
              {aiScore && (
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-white border border-indigo-100 shadow-md animate-fadeIn">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-indigo-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center shadow-md font-black">
                        <span className="text-xl leading-none">{aiScore.overall}</span>
                        <span className="text-[9px] uppercase font-bold text-indigo-200">/ 90</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-slate-900">Pearson VUE Aligned AI Score</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Superior (Band 8+)
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Result saved to Hostinger Shard (db_attempts_shard_1)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5" /> Share Scorecard
                      </button>
                    </div>
                  </div>

                  {/* Enabling Skills Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Fluency</span>
                      <span className="text-lg font-black text-indigo-600">{aiScore.fluency} / 90</span>
                      <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(aiScore.fluency / 90) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Pronunciation</span>
                      <span className="text-lg font-black text-purple-600">{aiScore.pronunciation} / 90</span>
                      <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(aiScore.pronunciation / 90) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Content</span>
                      <span className="text-lg font-black text-emerald-600">{aiScore.content} / 90</span>
                      <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${(aiScore.content / 90) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Grammar / Discourse</span>
                      <span className="text-lg font-black text-blue-600">{aiScore.grammar} / 90</span>
                      <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(aiScore.grammar / 90) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Word by word speech clarity highlight */}
                  {aiScore.wordScores && (
                    <div className="mt-4 p-4 rounded-xl bg-white border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700">Pronunciation Acoustic Breakdown:</span>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Clear</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Muffled/Missed</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-sm">
                        {aiScore.wordScores.map((w, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.5 rounded transition ${
                              w.score === 'good' ? 'bg-emerald-50 text-emerald-800 font-medium' :
                              w.score === 'warning' ? 'bg-amber-100 text-amber-800 font-medium' :
                              'bg-rose-100 text-rose-800 font-bold underline decoration-rose-400'
                            }`}
                          >
                            {w.word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 mt-4 leading-relaxed bg-white/70 p-3 rounded-xl">
                    <strong>AI Examiner Feedback:</strong> {aiScore.feedback}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-base text-slate-900">Standard Band 9 Solution & Keyword Mapping</h3>
              <p className="text-xs text-slate-500">These key phrases trigger maximum content points in Pearson's scoring algorithm:</p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 mb-2">Core Expected Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {(currentQuestion.expectedKeywords || ['transition', 'renewable', 'capital expenditure', 'photovoltaic', 'generation']).map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-semibold text-indigo-700">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              {currentQuestion.modelSummary && (
                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-900 mb-1">Official Model Summary:</h4>
                  <p className="text-xs text-indigo-950 leading-relaxed">{currentQuestion.modelSummary}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">Community Tips & Discussion</h3>
                <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Connected: Hostinger db_community_forum
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">AussiePTE_Master</span>
                    <span className="text-slate-400">3 days ago</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Be careful with the word "photovoltaic" – stress the second syllable (pho-to-VOL-ta-ic) to ensure the AI acoustic model doesn't mark it as missed.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Rajesh_90Target</span>
                    <span className="text-slate-400">5 days ago</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Got this exact question in my exam last Wednesday in Parramatta, Sydney! Scored 88 in Speaking using the 1-second pause rule.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
