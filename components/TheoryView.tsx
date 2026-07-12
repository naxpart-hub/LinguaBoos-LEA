import React from 'react';
import type { Unit } from '../types';

interface TheoryViewProps {
  unit: Unit;
  alreadyCompleted: boolean;
  onQuit: () => void;
  onComplete: () => void;
}

export const TheoryView: React.FC<TheoryViewProps> = ({
  unit, alreadyCompleted, onQuit, onComplete,
}) => {
  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-6 md:p-8 flex flex-col justify-between">
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between border-b-3 border-slate-300 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 font-gothic tracking-wide uppercase">Grimoire de Théorie</h2>
          <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mt-0.5">{unit.title}</p>
        </div>
        <button 
          onClick={onQuit} 
          className="text-slate-400 hover:text-slate-600 text-xl font-bold font-gothic bg-white border-2 border-slate-350 rounded-xl w-10 h-10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xs"
        >
          ✕
        </button>
      </header>

      <main className="max-w-2xl w-full mx-auto flex-1 stone-panel p-6 sm:p-8 overflow-y-auto max-h-[70vh] shadow-md">
        <div 
          className="prose prose-slate max-w-none text-slate-755 leading-relaxed font-medium" 
          dangerouslySetInnerHTML={{ __html: unit.chapter.theory }} 
        />
      </main>

      <footer className="max-w-2xl w-full mx-auto pt-6 flex justify-between items-center">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 italic">
          Restaure tous les PV à la fermeture ❤️
        </span>
        <button
          onClick={onComplete}
          className="btn-3d bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-3 px-10 rounded-2xl font-gothic text-base"
          style={{ ['--btn-shadow' as string]: '#d97706' }}
        >
          {alreadyCompleted ? 'Fermer le grimoire' : 'Formules apprises !'}
        </button>
      </footer>
    </div>
  );
};
