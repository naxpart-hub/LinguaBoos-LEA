import React from 'react';
import type { Unit, LessonNode, GameProgress } from '../types';
import { isNodeUnlocked, findCurrentNodeId } from '../services/gameLogic';
import { Mascot } from './Mascot';
import { TransparentImage } from './TransparentImage';

interface LearningPathProps {
  units: Unit[];
  progress: GameProgress;
  onSelectNode: (unit: Unit, node: LessonNode) => void;
}

const nodeIcon = (node: LessonNode, completed: boolean): string => {
  if (node.type === 'theory') return '📜'; // Scroll for theory grimoire
  if (node.type === 'boss') return '🏰'; // Castle for boss stage
  return completed ? '🛡️' : '⚔️'; // Shield when beaten, Swords during battle
};

const encouragements = [
  "L'esprit du château murmure : prêt pour la quête ?",
  "Gargui déploie ses ailes de pierre : révisons nos formules !",
  "Un pas de plus vers le sommet du Donjon ! 🏰",
  "Restaure tes points de vie en lisant les grimoires.",
  "Chaque salle conquise renforce ta puissance !",
];

export const LearningPath: React.FC<LearningPathProps> = ({ units, progress, onSelectNode }) => {
  const currentNodeId = findCurrentNodeId(units, progress);
  const bubbleText = currentNodeId
    ? encouragements[progress.xp % encouragements.length]
    : "Le château est conquis ! Tu as vaincu tous les gardiens ! 🎉";

  const level = Math.floor(progress.xp / 100) + 1;
  const xpInCurrentLevel = progress.xp % 100;

  return (
    <div className="min-h-screen bg-transparent pb-24 font-sans">
      
      {/* RPG Stats Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-slate-300/60 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 overflow-hidden"><Mascot mood="idle" className="w-10 h-10" /></div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-sm text-slate-800 font-gothic block">El Grimorio de la Gárgola</span>
              <span className="text-[10px] font-bold text-slate-450 tracking-wider">RPG DE GRAMMAIRE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 font-extrabold text-xs sm:text-sm">
            <div className="bg-slate-100 border-2 border-slate-300 rounded-xl px-2.5 py-1 text-slate-700 font-gothic shadow-2xs">
              Niv. {level}
            </div>
            <div className="flex items-center gap-1.5 text-orange-500">
              <span className="text-lg">🔥</span> {progress.streak}
            </div>
            <div className="flex items-center gap-1.5 text-red-500">
              <span className="text-lg">❤️</span> {progress.hearts}/5 PV
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-wide">⚡ {progress.xp} XP</span>
              <div className="hidden min-[450px]:block w-16 sm:w-20 h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300/50">
                <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: `${xpInCurrentLevel}%` }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4">
        
        {/* Gargouille Gargui welcomes the player */}
        <div className="flex items-end justify-center gap-2 mt-8 mb-4">
          <Mascot mood="happy" className="w-28 h-28 sm:w-32 sm:h-32 filter drop-shadow-md" />
          <div className="animate-bubble-in relative bg-white/95 border-2 border-slate-300 rounded-2xl px-5 py-3 mb-6 shadow-md max-w-[250px]">
            <p className="font-bold text-slate-800 text-sm leading-relaxed">{bubbleText}</p>
            <div className="absolute -left-2 bottom-3 w-4 h-4 bg-white border-l-2 border-b-2 border-slate-300 rotate-45"></div>
          </div>
        </div>

        {/* Level Stages Map */}
        {units.map((unit, index) => {
          return (
            <section key={unit.id} className="mb-14">
              
              {/* Unit Title Scroll Banner (Text completely fitted and styled in shiny gold-mirror) */}
              <div className="relative flex items-center justify-center h-24 my-6 max-w-sm mx-auto">
                <TransparentImage 
                  src="/scroll_banner.png" 
                  alt="Parchemin Médiéval" 
                  className="absolute inset-0 w-full h-full object-fill scale-y-110" 
                />
                <div className="relative text-center px-10 py-3 z-10 w-full max-w-[260px]">
                  <p className="uppercase text-[9px] font-black tracking-widest text-amber-900/80 font-gothic">Étage {index + 1}</p>
                  <h2 className="text-xs sm:text-sm font-black font-gothic tracking-wide uppercase leading-tight text-gold-mirror truncate">
                    {unit.title}
                  </h2>
                </div>
              </div>

              {/* Castle Winding stair path in zigzag with central staircase connector line */}
              <div className="relative flex flex-col items-center gap-8 py-4">
                
                {/* Vertical Staircase Line shaft behind shields */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-[calc(100%-80px)] bg-slate-300/40 border-x-3 border-slate-400/20 rounded-full -z-10"></div>

                {unit.nodes.map((node, i) => {
                  const completed = !!progress.completed[node.id];
                  const unlocked = isNodeUnlocked(units, progress, node.id);
                  const isCurrent = node.id === currentNodeId;
                  
                  // Zigzag offsets representing climbing around a cylindrical tower tower shaft
                  const offset = Math.round(Math.sin((i * Math.PI) / 2) * 55);

                  // Medieval heater shield shape
                  const base = 'w-[64px] h-[68px] rounded-b-3xl rounded-t-lg flex items-center justify-center text-xl font-bold transition-all duration-200 border-3 shadow-md ';
                  
                  let lookClass = '';
                  let shadowColor = '#94a3b8';
                  
                  if (!unlocked) {
                    lookClass = 'bg-slate-200/95 border-slate-350 text-slate-400 cursor-not-allowed';
                    shadowColor = '#cbd5e1';
                  } else if (completed) {
                    // Golden bordered green shield for conqured levels
                    lookClass = 'bg-emerald-50 border-emerald-400 text-emerald-700 hover:bg-emerald-100 hover:scale-105 active:scale-95';
                    shadowColor = '#86efac';
                  } else {
                    // Active yellow/amber shield
                    lookClass = `bg-amber-50 border-amber-400 text-amber-800 hover:bg-amber-100 hover:scale-105 active:scale-95 ${
                      isCurrent ? 'node-pulse border-amber-500' : ''
                    }`;
                    shadowColor = '#fcd34d';
                  }

                  return (
                    <div key={node.id} style={{ transform: `translateX(${offset}px)` }} className="relative z-10">
                      {isCurrent && (
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-amber-500 border-2 border-amber-600 text-white rounded-lg px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider animate-bounce whitespace-nowrap z-20 font-gothic shadow-xs">
                          Entrer ⚔
                        </div>
                      )}
                      
                      <button
                        onClick={() => unlocked && onSelectNode(unit, node)}
                        disabled={!unlocked}
                        title={node.title}
                        className={`${base} ${lookClass}`}
                        style={{ boxShadow: `0 4px 0 0 ${shadowColor}` }}
                      >
                        {unlocked ? nodeIcon(node, completed) : '🔒'}
                      </button>
                      <p className={`text-center text-xs font-bold mt-2 ${unlocked ? 'text-slate-700 font-gothic' : 'text-slate-400'}`}>
                        {node.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <footer className="text-center text-[10px] text-slate-455 font-semibold pb-8 mt-12">
          El Grimorio de la Gárgola · Par Ignacio Collado Rojas · avec Gargui 🏰
        </footer>
      </main>
    </div>
  );
};
