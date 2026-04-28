/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  History, 
  Languages, 
  SquarePlay,
  LayoutGrid,
  PenTool,
  CheckCircle2,
  Trash2,
  Sun,
  Moon,
  Home,
  Brain,
  Globe,
  Settings,
  ChevronRight,
  RefreshCw,
  BookOpen,
  MessageSquare,
  MapPin,
  Train,
  User,
  Plane,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KANA_DATA, ROWS, COLS, KanaInfo } from './data';
import { PHRASE_CHAPTERS, Chapter, Phrase } from './data/phrases';

// --- Types & Constants ---

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';
type View = 'learn' | 'quiz' | 'phrases';

const navigateKana = (dir: 'next' | 'prev', current: KanaInfo | null, setter: (k: KanaInfo) => void) => {
  if (!current) {
    setter(KANA_DATA[0]);
    return;
  }
  const idx = KANA_DATA.findIndex(k => k.id === current.id);
  if (idx === -1) return;
  let nextIdx = dir === 'next' ? idx + 1 : idx - 1;
  if (nextIdx >= KANA_DATA.length) nextIdx = 0;
  if (nextIdx < 0) nextIdx = KANA_DATA.length - 1;
  setter(KANA_DATA[nextIdx]);
};

interface MasteryRecord {
  correct: number;
  wrong: number;
  score: number; // calculated weight
}

const TRANSLATIONS = {
  en: {
    appTitle: 'Miyabi Japanese',
    version: 'Gojuuon Master 1.2',
    learn: 'Fifty Sounds',
    quiz: 'Quiz',
    hiragana: 'Hiragana',
    katakana: 'Katakana',
    ipa: 'IPA',
    origin: 'Origin',
    listen: 'Listen Pronunciation',
    clear: 'Clear',
    check: 'Check',
    next: 'Next',
    previous: 'Previous',
    correct: 'Correct!',
    wrong: 'Incorrect!',
    score: 'Score',
    submit: 'Submit',
    res: 'Resources',
    writingGuide: 'Handwriting Practice',
    drawingTip: 'Follow the stroke guide below',
    selectChar: 'Select a character to practice',
    quizType: 'Practice Mode',
    quizModeChoice: 'Choice (Kana → Romaji)',
    quizModeInput: 'Input (Type Romaji)',
    quizModeReverse: 'Reverse (Romaji → Kana)',
    startQuiz: 'Start Quiz',
    restart: 'Restart',
    mastery: 'Mastery',
    weakPoints: 'Weak Points',
    allMastered: 'Excellent! Keep it up.',
    mixed: 'Mixed',
    phrases: 'Survival Phrases',
    chapters: 'Chapters',
  },
  zh: {
    appTitle: '雅·日語學習',
    version: '五十音大師 1.2',
    learn: '五十音',
    quiz: '測驗',
    hiragana: '平假名',
    katakana: '片假名',
    ipa: 'IPA / 讀音',
    origin: '字源',
    listen: '聽力發音',
    clear: '清除',
    check: '檢查',
    next: '下一個',
    previous: '上一個',
    correct: '正確!',
    wrong: '錯誤!',
    score: '得分',
    submit: '提交',
    res: '資源',
    writingGuide: '五十音手寫練習',
    drawingTip: '請參考描紅進行書寫',
    selectChar: '選擇一個假名開始練習',
    quizType: '練習模式',
    quizModeChoice: '選擇題 (假名 → 羅馬音)',
    quizModeInput: '填空題 (拼音輸入)',
    quizModeReverse: '聽音辨字 (羅馬音 → 假名)',
    startQuiz: '開始測驗',
    restart: '重新開始',
    mastery: '掌握度',
    weakPoints: '薄弱項',
    allMastered: '太棒了！請繼續保持。',
    mixed: '混合模式',
    phrases: '生存日語',
    chapters: '單元章節',
  }
};

// --- Components ---

const HandwritingCanvas = ({ kana }: { kana: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Clear canvas when kana changes
  useEffect(() => {
    clearCanvas();
  }, [kana, clearCanvas]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.globalAlpha = 1;
    ctx.strokeStyle = document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-3xl shadow-xl cursor-crosshair drawing-canvas"
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 select-none">
          <span className="text-[200px] font-serif text-stone-900 dark:text-stone-100">{kana}</span>
        </div>
        <div className="absolute inset-0 pointer-events-none border border-stone-100 dark:border-stone-700 border-dashed m-4" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none border-t border-stone-100 dark:border-stone-700 border-dashed mx-4" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none border-l border-stone-100 dark:border-stone-700 border-dashed my-4" />
      </div>
      <div className="flex gap-4">
        <button 
          onClick={clearCanvas}
          className="flex items-center gap-2 px-8 py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-full transition-all font-bold"
        >
          <Trash2 size={18} /> Clear
        </button>
      </div>
    </div>
  );
};

type QuizMode = 'hiragana' | 'katakana' | 'mixed';
type ChallengeType = 'choice' | 'input' | 'reverse';

const QuizModule = ({ t, mastery, onRecordResult, speak }: { t: any, mastery: Record<string, MasteryRecord>, onRecordResult: (id: string, correct: boolean) => void, speak: (text: string) => void }) => {
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [challengeType, setChallengeType] = useState<ChallengeType | null>(null);
  const [questionLimit, setQuestionLimit] = useState<number | null>(null);
  const [currentKana, setCurrentKana] = useState<KanaInfo | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showType, setShowType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [userInput, setUserInput] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestion = useCallback(() => {
    if (questionLimit && sessionTotal >= questionLimit) {
      setIsFinished(true);
      return;
    }

    // Weighted selection
    const weightedPool: KanaInfo[] = [];
    KANA_DATA.forEach(k => {
      const rec = mastery[k.id] || { correct: 0, wrong: 0, score: 0 };
      const weight = Math.max(1, 1 + (rec.wrong * 3) - (rec.correct));
      for (let i = 0; i < weight; i++) weightedPool.push(k);
    });

    const kana = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    setCurrentKana(kana);
    setUserInput('');

    let type: 'hiragana' | 'katakana';
    if (quizMode === 'hiragana') type = 'hiragana';
    else if (quizMode === 'katakana') type = 'katakana';
    else type = Math.random() > 0.5 ? 'hiragana' : 'katakana';
    setShowType(type);

    if (challengeType === 'choice') {
      const others = KANA_DATA.filter(k => k.id !== kana.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(k => k.romaji);
      setOptions([kana.romaji, ...others].sort(() => 0.5 - Math.random()));
    } else if (challengeType === 'reverse') {
      const others = KANA_DATA.filter(k => k.id !== kana.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(k => type === 'hiragana' ? k.hiragana : k.katakana);
      const correctChar = type === 'hiragana' ? kana.hiragana : kana.katakana;
      setOptions([correctChar, ...others].sort(() => 0.5 - Math.random()));
    }
    
    setFeedback(null);
  }, [mastery, quizMode, questionLimit, sessionTotal, challengeType]);

  useEffect(() => {
    if (quizMode && challengeType && questionLimit && !isFinished && !currentKana) {
      generateQuestion();
    }
  }, [quizMode, challengeType, questionLimit, isFinished, currentKana, generateQuestion]);

  useEffect(() => {
    if (challengeType === 'input' && currentKana && !feedback) {
      inputRef.current?.focus();
    }
  }, [challengeType, currentKana, feedback]);

  const handleAnswer = (answer: string) => {
    if (feedback || !currentKana) return;
    
    setSessionTotal(prev => prev + 1);
    
    let isCorrect = false;
    if (challengeType === 'choice' || challengeType === 'input') {
      isCorrect = answer.toLowerCase().trim() === currentKana.romaji.toLowerCase();
    } else {
      const correctChar = showType === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
      isCorrect = answer === correctChar;
    }

    onRecordResult(currentKana.id, isCorrect);

    if (isCorrect) {
      setSessionScore(prev => prev + 1);
      setFeedback('correct');
      // Speak on correct answer
      speak(showType === 'hiragana' ? currentKana.hiragana : currentKana.katakana);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      setTimeout(generateQuestion, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        generateQuestion();
      }, 1500);
    }
  };

  const reset = () => {
    setQuizMode(null);
    setChallengeType(null);
    setQuestionLimit(null);
    setSessionTotal(0);
    setSessionScore(0);
    setIsFinished(false);
    setCurrentKana(null);
  };

  if (!quizMode) {
    return (
      <div className="max-w-xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-serif font-black">{t.startQuiz}</h3>
          <p className="text-stone-500 font-medium">Select target character set</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuizModeCard title={t.hiragana} subtitle="あいうえお" active={false} onClick={() => setQuizMode('hiragana')} />
          <QuizModeCard title={t.katakana} subtitle="アイウエオ" active={false} onClick={() => setQuizMode('katakana')} />
          <QuizModeCard title={t.mixed} subtitle="あ & ア" active={false} onClick={() => setQuizMode('mixed')} />
        </div>
      </div>
    );
  }

  if (!challengeType) {
    return (
      <div className="max-w-xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-4">
          <button onClick={() => setQuizMode(null)} className="text-stone-400 hover:text-stone-900 mb-4 inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
            <RefreshCw size={12} /> Back
          </button>
          <h3 className="text-3xl font-serif font-black">{t.quizType}</h3>
          <p className="text-stone-500 font-medium">How would you like to practice?</p>
        </div>
        <div className="space-y-4">
          <button onClick={() => setChallengeType('choice')} className="w-full p-8 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl hover:border-stone-950 dark:hover:border-stone-100 transition-all text-left flex items-center justify-between group">
            <div className="space-y-1">
              <p className="text-xl font-black">{t.quizModeChoice}</p>
              <p className="text-stone-400 text-sm">Multiple choice questions</p>
            </div>
            <ChevronRight className="text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors" />
          </button>
          <button onClick={() => setChallengeType('input')} className="w-full p-8 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl hover:border-stone-950 dark:hover:border-stone-100 transition-all text-left flex items-center justify-between group">
            <div className="space-y-1">
              <p className="text-xl font-black">{t.quizModeInput}</p>
              <p className="text-stone-400 text-sm">Type the romaji sound</p>
            </div>
            <ChevronRight className="text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors" />
          </button>
          <button onClick={() => setChallengeType('reverse')} className="w-full p-8 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl hover:border-stone-950 dark:hover:border-stone-100 transition-all text-left flex items-center justify-between group">
            <div className="space-y-1">
              <p className="text-xl font-black">{t.quizModeReverse}</p>
              <p className="text-stone-400 text-sm">Recognize Kana from Romaji</p>
            </div>
            <ChevronRight className="text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors" />
          </button>
        </div>
      </div>
    );
  }

  if (!questionLimit) {
    return (
      <div className="max-w-xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-4">
          <button onClick={() => setChallengeType(null)} className="text-stone-400 hover:text-stone-900 mb-4 inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
            <RefreshCw size={12} /> Back
          </button>
          <h3 className="text-3xl font-serif font-black">Choose Session Length</h3>
          <p className="text-stone-500 font-medium">How many questions would you like to answer?</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[10, 15, 20, 30].map(n => (
            <button
              key={n}
              onClick={() => setQuestionLimit(n)}
              className="p-8 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl hover:border-stone-950 dark:hover:border-stone-100 transition-all font-black text-2xl shadow-sm hover:scale-105 active:scale-95"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isFinished) {
    const accuracy = Math.round((sessionScore / (questionLimit || 1)) * 100);
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-stone-900 p-12 rounded-[48px] border-2 border-stone-100 dark:border-stone-800 shadow-2xl space-y-8"
        >
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Trophy size={48} className="text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl font-serif font-black">Quiz Results</h3>
            <p className="text-stone-500 font-medium text-xl">Keep up the great progress!</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 py-4">
            <div className="p-6 bg-stone-50 dark:bg-stone-800 rounded-3xl">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Score</p>
              <p className="text-3xl font-black text-green-600">{sessionScore}</p>
            </div>
            <div className="p-6 bg-stone-50 dark:bg-stone-800 rounded-3xl">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Total</p>
              <p className="text-3xl font-black text-stone-900 dark:text-stone-100">{questionLimit}</p>
            </div>
            <div className="p-6 bg-stone-50 dark:bg-stone-800 rounded-3xl">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Accuracy</p>
              <p className="text-3xl font-black text-blue-600">{accuracy}%</p>
            </div>
          </div>

          <button onClick={reset} className="w-full py-6 bg-stone-950 dark:bg-stone-50 text-stone-50 dark:text-stone-950 rounded-[32px] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
            Restart Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentKana) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-12 relative z-10">
      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <button onClick={reset} className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg transition-colors text-stone-400">
              <RefreshCw size={16} />
            </button>
            <div className="space-y-1 text-left">
              <span className="text-stone-400 dark:text-stone-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">Progress</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-48 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-stone-950 dark:bg-stone-50" 
                    initial={{ width: 0 }}
                    animate={{ width: `${(sessionTotal / (questionLimit || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-black text-stone-500">{sessionTotal}/{questionLimit}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Current Score</span>
             <span className="text-3xl font-serif font-black text-stone-900 dark:text-stone-50">{sessionScore}</span>
          </div>
        </div>
      </div>

      <motion.div 
        key={currentKana.id + showType + challengeType}
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className={`leading-none h-64 flex flex-col items-center justify-center bg-white dark:bg-stone-900 border-2 border-stone-100 dark:border-stone-800 rounded-[64px] shadow-2xl text-stone-900 dark:text-stone-50 ${challengeType === 'reverse' ? 'gap-2' : ''}`}
      >
        {challengeType === 'reverse' ? (
          <>
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.5em] mb-4">Identify This Sound</span>
            <span className="text-8xl font-black uppercase tracking-tighter">{currentKana.romaji}</span>
          </>
        ) : (
          <span className="text-[160px] font-serif uppercase">
            {showType === 'hiragana' ? currentKana.hiragana : currentKana.katakana}
          </span>
        )}
      </motion.div>

      {challengeType === 'input' ? (
        <div className="space-y-6">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && userInput.trim() && !feedback) {
                handleAnswer(userInput);
              }
            }}
            disabled={feedback !== null}
            placeholder="Type romaji sound..."
            className="w-full py-8 px-12 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-[40px] text-4xl font-black text-center focus:border-stone-900 dark:focus:border-stone-50 outline-none transition-all shadow-xl placeholder:text-stone-200 dark:placeholder:text-stone-800"
          />
          <button
            onClick={() => handleAnswer(userInput)}
            disabled={!userInput.trim() || feedback !== null}
            className="w-full py-6 bg-stone-950 dark:bg-stone-50 text-stone-50 dark:text-stone-950 rounded-[32px] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:scale-100"
          >
            {t.submit}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {options.map((opt) => {
            const isCorrectOption = challengeType === 'choice' 
              ? opt === currentKana.romaji 
              : opt === (showType === 'hiragana' ? currentKana.hiragana : currentKana.katakana);

            return (
              <button 
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={feedback !== null}
                className={`p-10 text-3xl font-black rounded-[40px] border-2 transition-all transform active:scale-95 shadow-sm ${
                  feedback === 'correct' && isCorrectOption 
                    ? 'bg-green-500 border-green-500 text-white dark:text-stone-900 shadow-green-500/20 shadow-2xl scale-105'
                    : feedback === 'wrong' && isCorrectOption
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10 text-green-600'
                    : feedback === 'wrong' && !isCorrectOption
                    ? 'opacity-30 grayscale scale-95'
                    : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-500 text-stone-900 dark:text-stone-100'
                } ${challengeType === 'reverse' ? 'font-serif text-5xl' : ''}`}
              >
                {challengeType === 'choice' ? opt.toUpperCase() : opt}
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={`text-2xl font-black flex items-center justify-center gap-3 ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}
          >
            {feedback === 'correct' ? <CheckCircle2 /> : <X />}
            {feedback === 'correct' ? t.correct : `${t.wrong} (${currentKana.romaji.toUpperCase()})`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuizModeCard = ({ title, subtitle, active, onClick }: { title: string, subtitle: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-12 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-[32px] hover:border-stone-900 dark:hover:border-stone-100 transition-all group hover:shadow-xl hover:scale-[1.02]"
  >
    <span className="text-4xl font-serif mb-4 group-hover:scale-110 transition-transform">{subtitle}</span>
    <span className="text-lg font-black text-stone-900 dark:text-stone-100 uppercase tracking-widest">{title}</span>
  </button>
);

const StrokeOrder = ({ kana }: { kana: string }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSvg = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const charCode = kana.charCodeAt(0).toString(16).padStart(5, '0');
      const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${charCode}.svg`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Not found');
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const pathElements = Array.from(doc.querySelectorAll('path'));
      setPaths(pathElements.map(p => p.getAttribute('d') || ''));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [kana]);

  useEffect(() => {
    fetchSvg();
  }, [fetchSvg]);

  if (loading) return <div className="h-48 flex items-center justify-center italic text-stone-400">...</div>;
  if (error) return <div className="h-48 flex items-center justify-center italic text-stone-400">?</div>;

  return (
    <div className="relative w-full aspect-square max-w-[140px] mx-auto bg-stone-100 dark:bg-stone-800/50 rounded-2xl flex items-center justify-center overflow-hidden border border-stone-200/50 dark:border-stone-700/50">
      <svg viewBox="0 0 109 109" className="w-3/4 h-3/4 text-stone-900 dark:text-stone-100">
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: i * 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
};

const KanaModal = ({ kana, onClose, t, onNext, onPrev }: { kana: KanaInfo, onClose: () => void, t: any, onNext: () => void, onPrev: () => void }) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Navigation Arrows */}
      <div className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
        <motion.button 
          whileHover={{ scale: 1.1, x: -5 }} 
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="p-4 md:p-6 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-full shadow-2xl pointer-events-auto border border-stone-200 dark:border-stone-700"
        >
          <ChevronRight className="rotate-180" size={32} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, x: 5 }} 
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="p-4 md:p-6 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-full shadow-2xl pointer-events-auto border border-stone-200 dark:border-stone-700"
        >
          <ChevronRight size={32} />
        </motion.button>
      </div>

      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-stone-800 dark:text-stone-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-6xl font-serif font-black tracking-tighter mb-2">{kana.romaji.toUpperCase()}</h2>
            <p className="text-stone-400 font-mono text-sm tracking-widest">{t.ipa}: {kana.ipa}</p>
          </div>
          <button onClick={onClose} className="p-3 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-end gap-4">
              <span className="text-8xl font-serif">{kana.hiragana}</span>
              <div className="pb-4">
                <p className="text-xs font-bold text-stone-400 uppercase mb-1">{t.hiragana}</p>
                <p className="text-sm font-serif">{t.origin}: <span className="font-bold">{kana.hiraganaOrigin}</span></p>
              </div>
            </div>
            <StrokeOrder kana={kana.hiragana} />
          </div>
          <div className="space-y-6">
            <div className="flex items-end gap-4">
              <span className="text-8xl font-serif">{kana.katakana}</span>
              <div className="pb-4">
                <p className="text-xs font-bold text-stone-400 uppercase mb-1">{t.katakana}</p>
                <p className="text-sm font-serif">{t.origin}: <span className="font-bold">{kana.katakanaOrigin}</span></p>
              </div>
            </div>
            <StrokeOrder kana={kana.katakana} />
          </div>
        </div>

        <button 
          onClick={() => speak(kana.hiragana)}
          className="w-full py-6 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-[20px] flex items-center justify-center gap-4 text-lg font-bold hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <Volume2 size={24} /> {t.listen}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('learn');
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<Theme>('light');
  const [kanaType, setKanaType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [selectedKana, setSelectedKana] = useState<KanaInfo | null>(null);
  const [activeKana, setActiveKana] = useState<KanaInfo | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(PHRASE_CHAPTERS[0]);
  const [mastery, setMastery] = useState<Record<string, MasteryRecord>>(() => {
    const saved = localStorage.getItem('kana-mastery-v2');
    return saved ? JSON.parse(saved) : {};
  });

  const t = TRANSLATIONS[lang];

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    localStorage.setItem('kana-mastery-v2', JSON.stringify(mastery));
  }, [mastery]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleLang = () => setLang(l => l === 'en' ? 'zh' : 'en');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const handleSelectKana = useCallback((kana: KanaInfo) => {
    setActiveKana(kana);
    speak(kana.hiragana);
  }, [speak]);

  const recordResult = useCallback((id: string, correct: boolean) => {
    setMastery(prev => {
      const record = prev[id] || { correct: 0, wrong: 0, score: 0 };
      const updated = {
        correct: record.correct + (correct ? 1 : 0),
        wrong: record.wrong + (correct ? 0 : 1),
        score: record.score // placeholder
      };
      return { ...prev, [id]: updated };
    });
  }, []);

  return (
    <div className={`min-h-screen flex transition-colors duration-700 ${theme === 'dark' ? 'dark bg-stone-950' : 'bg-[#fdfaf6]'} relative overflow-hidden`}>
      
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl border-r border-stone-200 dark:border-stone-800 flex flex-col h-screen sticky top-0 overflow-hidden transition-all duration-300 shadow-sm z-30">
        <div className="p-6 md:p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-stone-900 dark:bg-stone-100 rounded-xl flex items-center justify-center text-white dark:text-black shadow-lg">
            <span className="text-xl font-serif">雅</span>
          </div>
          <span className="hidden md:block font-serif font-black text-xl tracking-tighter text-stone-900 dark:text-stone-50">{t.appTitle}</span>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          <NavBtn icon={<LayoutGrid size={20} />} label={t.learn} active={view === 'learn'} onClick={() => setView('learn')} />
          <NavBtn icon={<Brain size={20} />} label={t.quiz} active={view === 'quiz'} onClick={() => setView('quiz')} />
          <NavBtn icon={<BookOpen size={20} />} label={t.phrases} active={view === 'phrases'} onClick={() => setView('phrases')} />
        </div>

        <div className="p-4 border-t border-stone-200 dark:border-stone-800 space-y-2 relative z-10">
          <button onClick={toggleLang} className="w-full flex items-center gap-3 p-3 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-xl transition-all font-bold">
            <Globe size={20} />
            <span className="hidden md:block text-sm leading-none">{lang === 'en' ? '中文' : 'English'}</span>
          </button>
          <button onClick={toggleTheme} className="w-full flex items-center gap-3 p-3 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-xl transition-all font-bold">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span className="hidden md:block text-sm leading-none">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative z-20">
        <header className="p-8 md:p-12 flex justify-between items-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-900 dark:text-stone-50 tracking-tighter">{t[view]}</h1>
          
          {view === 'learn' && (
            <div className="flex bg-stone-200/50 dark:bg-stone-800 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <button 
                onClick={() => setKanaType('hiragana')}
                className={`px-6 md:px-10 py-2.5 rounded-xl text-sm font-black transition-all ${kanaType === 'hiragana' ? 'bg-white dark:bg-stone-700 shadow-lg scale-[1.02] text-stone-900 dark:text-stone-50' : 'text-stone-500'}`}
              >
                {t.hiragana}
              </button>
              <button 
                onClick={() => setKanaType('katakana')}
                className={`px-6 md:px-10 py-2.5 rounded-xl text-sm font-black transition-all ${kanaType === 'katakana' ? 'bg-white dark:bg-stone-700 shadow-lg scale-[1.02] text-stone-900 dark:text-stone-50' : 'text-stone-500'}`}
              >
                {t.katakana}
              </button>
            </div>
          )}
        </header>

        <section className="px-8 md:px-12 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {view === 'learn' && (
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-12">
                  <div className="space-y-12 order-2 xl:order-1">
                    {/* Weak Points section */}
                    {Object.values(mastery).some((m) => (m as MasteryRecord).wrong > 0) && (
                      <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-stone-400 dark:text-stone-600 uppercase tracking-[0.3em]">{t.weakPoints}</h3>
                        <div className="flex flex-wrap gap-3">
                          {KANA_DATA.filter(k => (mastery[k.id]?.wrong || 0) > (mastery[k.id]?.correct || 0))
                            .sort((a, b) => (mastery[b.id]?.wrong || 0) - (mastery[a.id]?.wrong || 0))
                            .slice(0, 10)
                            .map(k => (
                              <motion.button
                                key={k.id}
                                whileHover={{ scale: 1.1, y: -2 }}
                                onClick={() => handleSelectKana(k)}
                                className="w-12 h-12 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center justify-center text-xl font-serif text-red-600 dark:text-red-400 shadow-sm"
                              >
                                {kanaType === 'hiragana' ? k.hiragana : k.katakana}
                              </motion.button>
                            ))}
                        </div>
                      </div>
                    )}
                    <DictionaryView type={kanaType} onSelect={handleSelectKana} mastery={mastery} activeId={activeKana?.id} />
                  </div>

                  <div className="order-1 xl:order-2">
                    <div className="xl:sticky xl:top-8">
                      <AnimatePresence mode="wait">
                        {activeKana ? (
                          <motion.div
                            key={activeKana.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-stone-900 p-8 md:p-10 rounded-[40px] border border-stone-200 dark:border-stone-800 shadow-2xl space-y-10"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h2 className="text-6xl font-serif font-black tracking-tighter mb-2">{activeKana.romaji.toUpperCase()}</h2>
                                <p className="text-stone-400 font-mono text-sm tracking-widest">{t.ipa}: {activeKana.ipa}</p>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => navigateKana('prev', activeKana, handleSelectKana)} className="p-3 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                                  <ChevronRight className="rotate-180" size={20} />
                                </button>
                                <button onClick={() => navigateKana('next', activeKana, handleSelectKana)} className="p-3 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                                  <ChevronRight size={20} />
                                </button>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <HandwritingCanvas kana={kanaType === 'hiragana' ? activeKana.hiragana : activeKana.katakana} />
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col">
                                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">{t.writingGuide}</p>
                                  <div className="flex-1 flex items-center justify-center">
                                    <StrokeOrder kana={kanaType === 'hiragana' ? activeKana.hiragana : activeKana.katakana} />
                                  </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                  <div className="p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800 h-full">
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">{t.origin}</p>
                                    <p className="text-3xl font-serif font-black text-stone-900 dark:text-stone-50">
                                      {kanaType === 'hiragana' ? activeKana.hiraganaOrigin : activeKana.katakanaOrigin}
                                    </p>
                                  </div>
                                  <button 
                                    onClick={() => speak(kanaType === 'hiragana' ? activeKana.hiragana : activeKana.katakana)}
                                    className="w-full py-5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-2xl flex flex-col items-center justify-center gap-1 font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all shadow-xl group"
                                  >
                                    <Volume2 size={24} className="group-hover:scale-110 transition-transform mb-1" />
                                    {t.listen}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-stone-100/50 dark:bg-stone-900/50 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-[40px] p-12 text-center flex flex-col items-center justify-center min-h-[500px] space-y-6"
                          >
                            <div className="w-20 h-20 bg-stone-200 dark:bg-stone-800 rounded-3xl flex items-center justify-center text-stone-400">
                              <PenTool size={40} />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xl font-serif font-black">{t.selectChar}</p>
                              <p className="text-stone-400 text-sm max-w-xs">{t.drawingTip}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}
              {view === 'quiz' && <QuizModule t={t} mastery={mastery} onRecordResult={recordResult} speak={speak} />}
              {view === 'phrases' && <PhrasesView t={t} currentChapter={selectedChapter} onSelectChapter={setSelectedChapter} lang={lang} speak={speak} />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <AnimatePresence>
        {selectedKana && <KanaModal kana={selectedKana} onClose={() => setSelectedKana(null)} t={t} onNext={() => navigateKana('next', selectedKana, setSelectedKana)} onPrev={() => navigateKana('prev', selectedKana, setSelectedKana)} />}
      </AnimatePresence>
    </div>
  );
}

// --- Sub Views ---

const DictionaryView = ({ type, onSelect, mastery, activeId }: { type: 'hiragana' | 'katakana', onSelect: (k: KanaInfo) => void, mastery: Record<string, MasteryRecord>, activeId?: string }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-[60px_repeat(5,1fr)] mb-4">
      <div />
      {COLS.map(c => <div key={c} className="text-center font-mono font-black text-stone-300 dark:text-stone-800 uppercase tracking-[0.4em]">{c}</div>)}
    </div>
    <div className="space-y-6">
      {ROWS.map(row => (
        <div key={row} className="grid grid-cols-[60px_repeat(5,1fr)] items-center">
          <div className="font-mono font-black text-stone-300 dark:text-stone-800 uppercase text-sm">{row === 'n_final' ? 'N' : row || '-'}</div>
          {COLS.map(col => {
            const item = (row === 'n_final') 
              ? (col === 'a' ? KANA_DATA.find(k => k.id === 'n') : null)
              : KANA_DATA.find(k => k.row === row && k.col === col);
            
            const rec = item ? mastery[item.id] : null;
            const masteryLevel = rec ? Math.min(100, Math.max(0, (rec.correct - rec.wrong) * 20)) : 0;
            const isActive = item?.id === activeId;

            return (
              <div key={col} className="px-2">
                {item ? (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(item)}
                    className={`w-full aspect-square border-2 rounded-3xl flex flex-col items-center justify-center shadow-sm transition-all relative overflow-hidden ${
                      isActive 
                        ? 'bg-stone-900 border-stone-900 dark:bg-stone-100 dark:border-stone-100 text-white dark:text-stone-900 shadow-xl scale-105 z-10' 
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-50 hover:border-stone-400 dark:hover:border-stone-600 shadow-sm'
                    }`}
                  >
                    <span className="text-3xl md:text-4xl font-serif font-medium">{type === 'hiragana' ? item.hiragana : item.katakana}</span>
                    <span className={`text-[11px] font-mono font-bold mt-1 uppercase tracking-tighter ${isActive ? 'text-stone-400' : 'text-stone-400'}`}>{item.romaji}</span>
                    
                    {/* Mastery Indicator */}
                    {rec && (
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-stone-100 dark:bg-stone-800">
                        <div 
                          className={`h-full transition-all duration-500 ${masteryLevel > 50 ? 'bg-green-500' : 'bg-red-400'}`} 
                          style={{ width: `${Math.abs(masteryLevel)}%` }} 
                        />
                      </div>
                    )}
                  </motion.button>
                ) : <div className="aspect-square" />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

const NavBtn = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-[20px] transition-all group ${
      active 
        ? 'bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 shadow-xl' 
        : 'text-stone-500 hover:bg-stone-200/50 dark:hover:bg-stone-900'
    }`}
  >
    <span className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform shrink-0`}>{icon}</span>
    <span className="hidden md:block font-bold text-sm tracking-wide text-left">{label}</span>
    {active && <motion.div layoutId="active" className="hidden md:ml-auto w-1.5 h-1.5 rounded-full bg-current" />}
  </button>
);

const PhrasesView = ({ t, currentChapter, onSelectChapter, lang, speak }: { t: any, currentChapter: Chapter, onSelectChapter: (c: Chapter) => void, lang: string, speak: (text: string) => void }) => {
  return (
    <div className="space-y-12">
      {/* Chapter Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PHRASE_CHAPTERS.map((chapter) => {
          const Icon = chapter.id === 'intro' ? User : chapter.id === 'travel' ? Plane : Train;
          const active = currentChapter.id === chapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter)}
              className={`p-6 rounded-3xl border-2 transition-all flex items-center gap-4 ${
                active 
                  ? 'bg-stone-900 dark:bg-stone-100 border-stone-900 dark:border-stone-100 text-stone-50 dark:text-stone-900 shadow-xl' 
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-500 hover:border-stone-400'
              }`}
            >
              <div className={`p-3 rounded-2xl ${active ? 'bg-white/20' : 'bg-stone-100 dark:bg-stone-800'}`}>
                <Icon size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Chapter</p>
                <p className="font-bold text-lg">{lang === 'en' ? chapter.titleEn : chapter.titleZh}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Phrases List */}
      <div className="grid grid-cols-1 gap-8 md:gap-12">
        <AnimatePresence mode="popLayout">
          {currentChapter.phrases.map((phrase, index) => (
            <motion.div
              key={phrase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white dark:bg-stone-900 p-10 md:p-12 rounded-[40px] border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-6 flex-1">
                  <div className="space-y-3">
                    <p className="text-stone-400 dark:text-stone-600 font-mono text-sm uppercase tracking-[0.4em] font-black bg-stone-100 dark:bg-stone-800/50 py-1 px-3 rounded-lg inline-block">{phrase.romaji}</p>
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      {phrase.japanese.split('').map((char, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => speak(char)}
                          className="text-5xl md:text-6xl font-serif font-black text-stone-900 dark:text-stone-50 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                          title="Click to hear individual character"
                        >
                          {char}
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-stone-400 dark:text-stone-600 font-medium italic tracking-widest text-lg">{phrase.kana}</p>
                  </div>
                  <div className="h-0.5 w-16 bg-stone-100 dark:bg-stone-800" />
                  <p className="text-2xl font-bold text-stone-800 dark:text-stone-200 leading-relaxed">
                    {lang === 'en' ? phrase.en : phrase.zh}
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={() => speak(phrase.japanese)}
                    className="p-8 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-xl group/btn overflow-hidden relative"
                  >
                    <div className="relative z-10 flex flex-col items-center gap-1">
                      <Volume2 size={40} />
                      <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">Sentence</span>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-red-600 dark:bg-red-400"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
