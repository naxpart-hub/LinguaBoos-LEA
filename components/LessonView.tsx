import React, { useMemo, useState } from 'react';
import type { LessonNode, LessonQuestion, Unit, UnitColor } from '../types';
import { checkQuestion, correctAnswerText, MAX_HEARTS } from '../services/gameLogic';
import { Mascot, MascotMood } from './Mascot';

interface LessonViewProps {
  unit: Unit;
  node: LessonNode;
  hearts: number;
  onLoseHeart: () => number; // renvoie le nombre de cœurs restants
  onQuit: () => void;
  onComplete: (perfect: boolean) => void;
  onReviewTheory: () => void;
}

type Phase = 'answering' | 'correct' | 'incorrect' | 'finished' | 'failed';

const colorClasses: Record<UnitColor, { bg: string; shadow: string }> = {
  green: { bg: 'bg-primary', shadow: '#46a302' },
  blue: { bg: 'bg-brandblue', shadow: '#1899d6' },
  purple: { bg: 'bg-brandpurple', shadow: '#a560e8' },
};

const praise = ['¡Genial!', '¡Muy bien!', '¡Perfecto!', '¡Excelente!', '¡Fenomenal!', '¡Olé!'];

const CONFETTI_COLORS = ['#58cc02', '#1cb0f6', '#ce82ff', '#ffc800', '#ff4b4b', '#ff9600'];

const Confetti: React.FC = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.2 + Math.random() * 1.8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.random() * 360,
      })),
    []
  );
  return (
    <>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}vw`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </>
  );
};

const questionTitle = (q: LessonQuestion): string => {
  switch (q.kind) {
    case 'mc': return 'Choisis la bonne réponse';
    case 'fill': return 'Complète la phrase';
    case 'accent': return "Réécris le mot avec l'accent (si besoin !)";
    case 'classify': return 'Choisis la bonne catégorie';
    case 'translate': return 'Traduis en espagnol';
  }
};

export const LessonView: React.FC<LessonViewProps> = ({
  unit, node, hearts, onLoseHeart, onQuit, onComplete, onReviewTheory,
}) => {
  // File de questions : une question ratée est remise en fin de file (comme Duolingo).
  const [queue, setQueue] = useState<LessonQuestion[]>(node.questions);
  const [solvedCount, setSolvedCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');
  const [answers, setAnswers] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [praiseIndex, setPraiseIndex] = useState(0);

  const totalQuestions = node.questions.length;
  const question = queue[0];
  const progressPct = Math.round((solvedCount / totalQuestions) * 100);
  const colors = colorClasses[unit.color];

  const hasAnswer = useMemo(() => {
    if (!question) return false;
    if (question.kind === 'fill') {
      return question.solutions.every((_, i) => (answers[i] ?? '').trim() !== '');
    }
    return (answers[0] ?? '').trim() !== '';
  }, [question, answers]);

  const mascotMood: MascotMood =
    phase === 'correct' ? 'happy' :
    phase === 'incorrect' ? 'sad' :
    phase === 'finished' ? 'celebrate' :
    phase === 'failed' ? 'sad' :
    'thinking';

  const handleCheck = () => {
    if (!question || !hasAnswer) return;
    if (checkQuestion(question, answers)) {
      setPraiseIndex(Math.floor(Math.random() * praise.length));
      setPhase('correct');
    } else {
      const remaining = onLoseHeart();
      setMistakes(m => m + 1);
      if (remaining <= 0) {
        setPhase('failed');
      } else {
        setPhase('incorrect');
      }
    }
  };

  const handleContinue = () => {
    const [current, ...rest] = queue;
    if (phase === 'correct') {
      const newSolved = solvedCount + 1;
      if (rest.length === 0) {
        setSolvedCount(newSolved);
        setPhase('finished');
        return;
      }
      setQueue(rest);
      setSolvedCount(newSolved);
    } else {
      // Raté : on remet la question en fin de file pour la retravailler.
      setQueue([...rest, current]);
    }
    setAnswers([]);
    setPhase('answering');
  };

  const setAnswer = (index: number, value: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // ---- Écrans de fin ----

  if (phase === 'finished') {
    const perfect = mistakes === 0;
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Confetti />
        <Mascot mood="celebrate" className="w-52 h-52" />
        <h2 className="text-3xl font-extrabold text-secondary-dark mt-4 animate-pop-in">
          {node.type === 'boss' ? 'Unité validée ! 🏆' : 'Leçon terminée !'}
        </h2>
        <p className="text-secondary font-semibold mt-2">
          {perfect ? '¡Perfecto! Sans aucune erreur, Chispa est très fier de toi ! 🌟' : `Bien joué ! ${mistakes} erreur${mistakes > 1 ? 's' : ''} corrigée${mistakes > 1 ? 's' : ''} en chemin.`}
        </p>
        <div className="flex gap-4 mt-6">
          <div className="animate-xp bg-amber-100 border-2 border-amber-300 rounded-2xl px-6 py-3">
            <p className="text-xs font-extrabold uppercase text-amber-600">XP gagnés</p>
            <p className="text-2xl font-extrabold text-amber-500">⚡ +{node.type === 'boss' ? 20 : perfect ? 15 : 10}</p>
          </div>
          <div className="animate-xp bg-green-100 border-2 border-green-300 rounded-2xl px-6 py-3" style={{ animationDelay: '0.15s' }}>
            <p className="text-xs font-extrabold uppercase text-green-700">Précision</p>
            <p className="text-2xl font-extrabold text-green-600">
              {Math.round((totalQuestions / (totalQuestions + mistakes)) * 100)}%
            </p>
          </div>
        </div>
        <button
          onClick={() => onComplete(perfect)}
          className="btn-3d mt-8 bg-primary text-white font-extrabold uppercase tracking-wide py-3 px-12 rounded-2xl text-lg"
          style={{ ['--btn-shadow' as string]: '#46a302' }}
        >
          Continuer
        </button>
      </div>
    );
  }

  if (phase === 'failed') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Mascot mood="sad" className="w-52 h-52" />
        <h2 className="text-3xl font-extrabold text-secondary-dark mt-4">Plus de cœurs...</h2>
        <p className="text-secondary font-semibold mt-2 max-w-md">
          Chispa est épuisé ! 😢 Relis la théorie pour lui redonner des forces
          (et recharger tous tes cœurs ❤️).
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={onReviewTheory}
            className="btn-3d bg-brandblue text-white font-extrabold uppercase tracking-wide py-3 px-8 rounded-2xl"
            style={{ ['--btn-shadow' as string]: '#1899d6' }}
          >
            📖 Relire la théorie
          </button>
          <button
            onClick={onQuit}
            className="btn-3d bg-white text-secondary font-extrabold uppercase tracking-wide py-3 px-8 rounded-2xl border-2 border-slate-200"
            style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
          >
            Retour au parcours
          </button>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const isChecked = phase === 'correct' || phase === 'incorrect';

  // ---- Rendu de la question courante ----

  const renderQuestion = () => {
    switch (question.kind) {
      case 'mc':
      case 'classify': {
        const options = question.kind === 'mc' ? question.options : question.categories;
        const solution = question.kind === 'mc' ? question.answer : question.answer;
        return (
          <div className="space-y-4">
            {question.kind === 'classify' && (
              <p className="text-center text-3xl font-extrabold text-secondary-dark bg-white border-2 border-slate-200 rounded-2xl py-6">
                {question.word}
              </p>
            )}
            {question.kind === 'mc' && (
              <p className="text-xl font-bold text-secondary-dark text-center py-2">{question.prompt}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map(option => {
                const selected = answers[0] === option;
                let cls = 'bg-white border-slate-200 text-secondary-dark hover:bg-slate-50';
                let shadow = '#e2e8f0';
                if (isChecked) {
                  if (option === solution) { cls = 'bg-green-100 border-green-400 text-green-800'; shadow = '#86efac'; }
                  else if (selected) { cls = 'bg-red-100 border-red-400 text-red-700'; shadow = '#fca5a5'; }
                  else { cls = 'bg-white border-slate-200 text-slate-400'; }
                } else if (selected) {
                  cls = 'bg-sky-100 border-brandblue text-brandblue-dark';
                  shadow = '#7dd3fc';
                }
                return (
                  <button
                    key={option}
                    disabled={isChecked}
                    onClick={() => setAnswer(0, option)}
                    className={`btn-3d border-2 rounded-2xl py-3.5 px-4 font-bold text-lg transition-colors ${cls}`}
                    style={{ ['--btn-shadow' as string]: shadow }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }
      case 'accent':
        return (
          <div className="space-y-4 text-center">
            <p className="text-3xl font-extrabold text-secondary-dark bg-white border-2 border-slate-200 rounded-2xl py-6">
              {question.word}
            </p>
            <input
              type="text"
              autoFocus
              value={answers[0] ?? ''}
              disabled={isChecked}
              onChange={e => setAnswer(0, e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheck()}
              placeholder="Réécris le mot ici..."
              className="w-full text-center text-2xl font-bold px-4 py-3 border-2 border-slate-300 rounded-2xl bg-white focus:border-brandblue focus:ring-2 focus:ring-brandblue/30 outline-none"
            />
            <div className="flex justify-center gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked}
                  onClick={() => setAnswer(0, (answers[0] ?? '') + ch)}
                  className="btn-3d bg-white border-2 border-slate-200 rounded-xl w-11 h-11 font-extrabold text-lg text-brandblue-dark hover:bg-sky-50"
                  style={{ ['--btn-shadow' as string]: '#e2e8f0' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      case 'fill': {
        let inputIndex = -1;
        return (
          <div className="space-y-4">
            <p className="text-sm font-bold text-secondary uppercase tracking-wide">{question.instructions}</p>
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 text-lg leading-loose text-secondary-dark font-semibold">
              {question.parts.map((part, i) => {
                const showInput = i < question.solutions.length;
                if (showInput) inputIndex++;
                const idx = inputIndex;
                return (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {showInput && (
                      <input
                        type="text"
                        value={answers[idx] ?? ''}
                        disabled={isChecked}
                        onChange={e => setAnswer(idx, e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleCheck()}
                        className={`inline-block w-24 sm:w-28 mx-1 px-2 py-1 text-center border-b-4 rounded-lg outline-none font-bold transition-colors ${
                          isChecked
                            ? checkQuestion(question, answers)
                              ? 'border-green-400 bg-green-50 text-green-800'
                              : 'border-red-400 bg-red-50 text-red-700'
                            : 'border-slate-300 bg-slate-50 focus:border-brandblue'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="flex gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked}
                  onClick={() => {
                    const lastIdx = Math.max(0, answers.length - 1);
                    setAnswer(lastIdx, (answers[lastIdx] ?? '') + ch);
                  }}
                  className="btn-3d bg-white border-2 border-slate-200 rounded-xl w-10 h-10 font-extrabold text-brandblue-dark hover:bg-sky-50"
                  style={{ ['--btn-shadow' as string]: '#e2e8f0' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
      }
      case 'translate':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mascot mood="thinking" className="w-20 h-20 flex-shrink-0" />
              <div className="animate-bubble-in relative bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 mt-3 shadow-sm">
                <p className="font-bold text-secondary-dark">"{question.french}"</p>
                <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l-2 border-b-2 border-slate-200 rotate-45"></div>
              </div>
            </div>
            <textarea
              value={answers[0] ?? ''}
              disabled={isChecked}
              onChange={e => setAnswer(0, e.target.value)}
              placeholder="Écris ta traduction en espagnol..."
              rows={3}
              className="w-full text-lg font-semibold px-4 py-3 border-2 border-slate-300 rounded-2xl bg-white focus:border-brandblue focus:ring-2 focus:ring-brandblue/30 outline-none resize-none"
            />
            <div className="flex gap-2 flex-wrap">
              {['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ', '¿', '¡'].map(ch => (
                <button
                  key={ch}
                  disabled={isChecked}
                  onClick={() => setAnswer(0, (answers[0] ?? '') + ch)}
                  className="btn-3d bg-white border-2 border-slate-200 rounded-xl w-10 h-10 font-extrabold text-brandblue-dark hover:bg-sky-50"
                  style={{ ['--btn-shadow' as string]: '#e2e8f0' }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Barre du haut : quitter, progression, cœurs */}
      <header className="max-w-3xl w-full mx-auto px-4 pt-4">
        <div className="flex items-center gap-4">
          <button onClick={onQuit} title="Quitter la leçon" className="text-slate-400 hover:text-slate-600 text-2xl font-extrabold">
            ✕
          </button>
          <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`progress-bar-fill h-full rounded-full ${colors.bg}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex items-center gap-1 font-extrabold text-red-500">
            <span className="text-xl">❤️</span>{hearts}
          </div>
        </div>
      </header>

      {/* Question */}
      <main className={`flex-1 max-w-3xl w-full mx-auto px-4 py-6 ${phase === 'incorrect' ? 'animate-shake' : ''}`}>
        <div className="flex items-center gap-3 mb-5">
          {question.kind !== 'translate' && (
            <Mascot mood={mascotMood} className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0" />
          )}
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary-dark">
            {questionTitle(question)}
          </h2>
        </div>
        {renderQuestion()}
      </main>

      {/* Bandeau du bas : vérifier / feedback */}
      <footer
        className={`border-t-2 ${
          phase === 'correct' ? 'bg-green-100 border-green-200' :
          phase === 'incorrect' ? 'bg-red-100 border-red-200' :
          'bg-background-light border-slate-200'
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-5">
          {phase === 'answering' && (
            <div className="flex justify-end">
              <button
                onClick={handleCheck}
                disabled={!hasAnswer}
                className="btn-3d bg-primary disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold uppercase tracking-wide py-3 px-10 rounded-2xl text-lg disabled:cursor-not-allowed"
                style={{ ['--btn-shadow' as string]: hasAnswer ? '#46a302' : '#cbd5e1' }}
              >
                Vérifier
              </button>
            </div>
          )}
          {isChecked && (
            <div className="animate-slide-up flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 flex items-start gap-3">
                <span className="text-3xl animate-pop-in">{phase === 'correct' ? '✅' : '❌'}</span>
                <div>
                  {phase === 'correct' ? (
                    <p className="font-extrabold text-green-700 text-lg">{praise[praiseIndex]}</p>
                  ) : (
                    <>
                      <p className="font-extrabold text-red-600 text-lg">Pas tout à fait...</p>
                      <p className="font-bold text-red-700 text-sm mt-0.5">
                        Bonne réponse : <span className="underline">{correctAnswerText(question)}</span>
                      </p>
                      <p className="text-red-700/80 text-sm mt-1 max-w-xl">{question.hint}</p>
                    </>
                  )}
                  {phase === 'correct' && question.kind === 'translate' && question.note && (
                    <div
                      className="text-green-800/90 text-sm mt-1 max-w-xl"
                      dangerouslySetInnerHTML={{ __html: `🌍 ${question.note}` }}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={handleContinue}
                autoFocus
                className={`btn-3d ${phase === 'correct' ? 'bg-primary' : 'bg-danger'} text-white font-extrabold uppercase tracking-wide py-3 px-10 rounded-2xl text-lg flex-shrink-0`}
                style={{ ['--btn-shadow' as string]: phase === 'correct' ? '#46a302' : '#cc3a3a' }}
              >
                Continuer
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
