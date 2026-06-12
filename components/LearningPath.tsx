import React from 'react';
import type { Unit, LessonNode, GameProgress, UnitColor } from '../types';
import { isNodeUnlocked, findCurrentNodeId } from '../services/gameLogic';
import { Mascot } from './Mascot';

interface LearningPathProps {
  units: Unit[];
  progress: GameProgress;
  onSelectNode: (unit: Unit, node: LessonNode) => void;
}

const unitStyles: Record<UnitColor, { bg: string; bgDark: string; text: string; shadow: string; light: string }> = {
  green: { bg: 'bg-primary', bgDark: 'bg-primary-dark', text: 'text-primary-dark', shadow: '#46a302', light: 'bg-green-100' },
  blue: { bg: 'bg-brandblue', bgDark: 'bg-brandblue-dark', text: 'text-brandblue-dark', shadow: '#1899d6', light: 'bg-sky-100' },
  purple: { bg: 'bg-brandpurple', bgDark: 'bg-brandpurple-dark', text: 'text-brandpurple-dark', shadow: '#a560e8', light: 'bg-purple-100' },
};

const nodeIcon = (node: LessonNode, completed: boolean): string => {
  if (node.type === 'theory') return '📖';
  if (node.type === 'boss') return '🏆';
  return completed ? '⭐' : '★';
};

const encouragements = [
  '¡Hola! On continue l\'aventure ?',
  '¡Vamos! Une petite leçon ?',
  'Prêt·e à cracher du feu ? 🔥',
  '¡Tú puedes! Je crois en toi !',
  'Une leçon par jour, et je grandis !',
];

export const LearningPath: React.FC<LearningPathProps> = ({ units, progress, onSelectNode }) => {
  const currentNodeId = findCurrentNodeId(units, progress);
  const bubbleText = currentNodeId
    ? encouragements[progress.xp % encouragements.length]
    : '¡Increíble! Tu as tout terminé ! 🎉';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Barre de statistiques */}
      <header className="sticky top-0 z-40 bg-background-light/95 backdrop-blur border-b-2 border-slate-200">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10"><Mascot mood="idle" className="w-10 h-10" /></div>
            <span className="font-extrabold text-lg text-secondary-dark hidden sm:inline">LinguaBoost LEA</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 font-extrabold">
            <div className="flex items-center gap-1.5 text-orange-500" title="Jours d'affilée">
              <span className="text-xl">🔥</span>{progress.streak}
            </div>
            <div className="flex items-center gap-1.5 text-red-500" title="Cœurs restants">
              <span className="text-xl">❤️</span>{progress.hearts}
            </div>
            <div className="flex items-center gap-1.5 text-amber-500" title="Points d'expérience">
              <span className="text-xl">⚡</span>{progress.xp} XP
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4">
        {/* Chispa accueille le joueur */}
        <div className="flex items-end justify-center gap-2 mt-6 mb-2">
          <Mascot mood="happy" className="w-28 h-28 sm:w-36 sm:h-36" />
          <div className="animate-bubble-in relative bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 mb-8 shadow-sm max-w-[230px]">
            <p className="font-bold text-secondary-dark text-sm">{bubbleText}</p>
            <div className="absolute -left-2 bottom-3 w-4 h-4 bg-white border-l-2 border-b-2 border-slate-200 rotate-45"></div>
          </div>
        </div>

        {units.map(unit => {
          const styles = unitStyles[unit.color];
          return (
            <section key={unit.id} className="mb-10">
              {/* Bandeau d'unité */}
              <div className={`${styles.bg} rounded-2xl p-5 text-white shadow-md mb-8`}>
                <p className="uppercase text-xs font-extrabold tracking-wider opacity-80">Unité</p>
                <h2 className="text-xl font-extrabold">{unit.title}</h2>
              </div>

              {/* Chemin de nœuds en zigzag */}
              <div className="flex flex-col items-center gap-5">
                {unit.nodes.map((node, i) => {
                  const completed = !!progress.completed[node.id];
                  const unlocked = isNodeUnlocked(units, progress, node.id);
                  const isCurrent = node.id === currentNodeId;
                  // Décalage sinusoïdal pour dessiner un chemin qui serpente
                  const offset = Math.round(Math.sin((i * Math.PI) / 3) * 70);

                  const base = 'w-[70px] h-[64px] rounded-[50%] flex items-center justify-center text-2xl font-extrabold transition-transform';
                  let look: string;
                  let shadow = '#94a3b8';
                  if (!unlocked) {
                    look = 'bg-slate-200 text-slate-400 cursor-not-allowed';
                    shadow = '#cbd5e1';
                  } else if (completed) {
                    look = `${styles.bg} text-white hover:scale-105`;
                    shadow = styles.shadow;
                  } else {
                    look = `${styles.bg} text-white hover:scale-105 ${isCurrent ? 'node-pulse' : ''}`;
                    shadow = styles.shadow;
                  }

                  return (
                    <div key={node.id} style={{ transform: `translateX(${offset}px)` }} className="relative">
                      {isCurrent && (
                        <div className={`absolute -top-9 left-1/2 -translate-x-1/2 ${styles.text} bg-white border-2 border-slate-200 rounded-xl px-3 py-1 text-xs font-extrabold uppercase tracking-wide animate-bounce whitespace-nowrap z-10`}>
                          Commencer
                        </div>
                      )}
                      <button
                        onClick={() => unlocked && onSelectNode(unit, node)}
                        disabled={!unlocked}
                        title={node.title}
                        className={`${base} ${look} btn-3d`}
                        style={{ ['--btn-shadow' as string]: shadow }}
                      >
                        {unlocked ? nodeIcon(node, completed) : '🔒'}
                      </button>
                      <p className={`text-center text-xs font-bold mt-1.5 ${unlocked ? 'text-secondary' : 'text-slate-400'}`}>
                        {node.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <footer className="text-center text-xs text-slate-400 font-semibold pb-8">
          Pratique de la Grammaire Espagnole · Fait par Ignacio Collado Rojas · avec Chispa 🐲
        </footer>
      </main>
    </div>
  );
};
