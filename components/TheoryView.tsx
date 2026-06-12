import React from 'react';
import type { Unit, UnitColor } from '../types';
import { Mascot } from './Mascot';

interface TheoryViewProps {
  unit: Unit;
  alreadyCompleted: boolean;
  onQuit: () => void;
  onComplete: () => void;
}

const headerColors: Record<UnitColor, string> = {
  green: 'bg-primary',
  blue: 'bg-brandblue',
  purple: 'bg-brandpurple',
};

export const TheoryView: React.FC<TheoryViewProps> = ({ unit, alreadyCompleted, onQuit, onComplete }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* En-tête coloré */}
      <header className={`${headerColors[unit.color]} text-white`}>
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-4">
          <button onClick={onQuit} title="Retour au parcours" className="text-white/80 hover:text-white text-2xl font-extrabold">
            ✕
          </button>
          <div className="flex-1">
            <p className="uppercase text-xs font-extrabold tracking-wider opacity-80">Théorie 📖</p>
            <h1 className="text-xl sm:text-2xl font-extrabold">{unit.title}</h1>
          </div>
          <Mascot mood="happy" className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Chispa introduit la leçon */}
        <div className="flex items-start gap-3 mb-6">
          <Mascot mood="idle" className="w-20 h-20 flex-shrink-0" />
          <div className="animate-bubble-in relative bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 mt-2 shadow-sm">
            <p className="font-bold text-secondary-dark text-sm">
              ¡Hola! Lis bien cette théorie : tout est expliqué avec des couleurs pour t'aider à mémoriser.
              Et bonne nouvelle, la lecture recharge tous tes cœurs ! ❤️
            </p>
            <div className="absolute -left-2 top-5 w-4 h-4 bg-white border-l-2 border-b-2 border-slate-200 rotate-45"></div>
          </div>
        </div>

        {/* Légende du code couleur */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 mb-6">
          <p className="font-extrabold text-secondary-dark text-sm uppercase tracking-wide mb-2">🎨 Code couleur des exemples</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-bold">
            <span className="text-rose-600">■ Syllabe tonique / accent</span>
            <span className="text-blue-600">■ Terminaisons</span>
            <span className="text-violet-600">■ Irrégularités</span>
            <span className="text-green-700">■ Exemples corrects</span>
            <span className="text-red-500">■ Erreurs à éviter</span>
          </div>
        </div>

        {/* Contenu théorique */}
        <article
          className="prose prose-slate max-w-none bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-7"
          dangerouslySetInnerHTML={{ __html: unit.chapter.theory }}
        />

        {/* Validation */}
        <div className="flex flex-col items-center mt-8 pb-12">
          <button
            onClick={onComplete}
            className="btn-3d bg-primary text-white font-extrabold uppercase tracking-wide py-4 px-10 rounded-2xl text-lg"
            style={{ ['--btn-shadow' as string]: '#46a302' }}
          >
            {alreadyCompleted ? "J'ai relu ! Recharge mes cœurs ❤️" : "J'ai compris ! C'est parti 🚀"}
          </button>
          <p className="text-xs text-slate-400 font-bold mt-3">
            {alreadyCompleted ? 'Cœurs rechargés à fond + un peu d\'XP' : '+5 XP · cœurs rechargés ❤️❤️❤️❤️❤️'}
          </p>
        </div>
      </main>
    </div>
  );
};
