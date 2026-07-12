import React from 'react';
import type { Chapter, GameProgress } from '../types';
import { Mascot } from './Mascot';
import { TransparentImage } from './TransparentImage';
import { asset } from '../services/assets';

interface ChapterHubProps {
  chapters: Chapter[];
  progress: GameProgress;
  onSelectChapter: (chapterId: string) => void;
  progressMap: { [chapterId: string]: { completed: number, total: number } };
  onBackToLanding: () => void;
  // Remédiation : nombre de cartes d'erreurs en attente et lancement de la révision.
  mistakesCount: number;
  onStartReview: () => void;
}

// Emblème et ambiance de chaque salle (chapitres sans illustration dédiée).
const CHAPTER_EMBLEMS: Record<string, { emoji: string; gradient: string }> = {
  imperatif: { emoji: '⚔️', gradient: 'from-red-100 to-orange-50' },
  futur: { emoji: '🔮', gradient: 'from-violet-100 to-indigo-50' },
  passe_compose: { emoji: '📚', gradient: 'from-amber-100 to-yellow-50' },
  imparfait: { emoji: '🌫️', gradient: 'from-slate-200 to-slate-50' },
  passe_simple: { emoji: '🗿', gradient: 'from-stone-200 to-stone-50' },
  gerondif: { emoji: '🌀', gradient: 'from-cyan-100 to-sky-50' },
  genre_nombre: { emoji: '⚖️', gradient: 'from-emerald-100 to-green-50' },
  articles: { emoji: '🏷️', gradient: 'from-sky-100 to-blue-50' },
  demonstratifs_possessifs: { emoji: '👁️', gradient: 'from-fuchsia-100 to-pink-50' },
  pronoms: { emoji: '🐉', gradient: 'from-lime-100 to-emerald-50' },
  numeraux: { emoji: '🧮', gradient: 'from-orange-100 to-amber-50' },
  indefinis: { emoji: '👻', gradient: 'from-indigo-100 to-violet-50' },
  style_indirect: { emoji: '🗣️', gradient: 'from-rose-100 to-red-50' },
};

export const ChapterHub: React.FC<ChapterHubProps> = ({
  chapters,
  progress,
  onSelectChapter,
  progressMap,
  onBackToLanding,
  mistakesCount,
  onStartReview
}) => {

  // RPG stats
  const level = Math.floor(progress.xp / 100) + 1;
  const xpInCurrentLevel = progress.xp % 100;

  // Visual scenery helper for each chapter
  const getScene = (chapterId: string) => {
    let imgSrc = '';
    let imgAlt = '';
    
    switch (chapterId) {
      case 'orthographe':
        imgSrc = '/chapter_orthographe.jpg';
        imgAlt = 'Orthographe et Accentuation';
        break;
      case 'present_indicatif':
        imgSrc = '/chapter_present.png';
        imgAlt = "Le Présent de l'Indicatif";
        break;
      case 'subjonctif':
        imgSrc = '/chapter_subjonctif.png';
        imgAlt = 'Le Subjonctif Présent';
        break;
      default:
        imgSrc = '';
        imgAlt = '';
    }

    if (!imgSrc) {
      const emblem = CHAPTER_EMBLEMS[chapterId];
      if (emblem) {
        return (
          <div className={`relative w-full h-32 bg-gradient-to-b ${emblem.gradient} rounded-t-xl overflow-hidden border-b-2 border-slate-300/60 flex items-center justify-center`}>
            <span className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-300 select-none">
              {emblem.emoji}
            </span>
            <Mascot mood="idle" className="absolute bottom-1 right-2 w-12 h-12 opacity-80" />
          </div>
        );
      }
      return (
        <div className="relative w-full h-32 bg-gradient-to-b from-slate-100 to-slate-50 rounded-t-xl overflow-hidden border-b-2 border-slate-300/60 flex items-end justify-center">
          <Mascot mood="idle" className="w-20 h-20 pb-2" />
        </div>
      );
    }

    return (
      <div className="relative w-full h-32 overflow-hidden border-b-2 border-slate-300/60">
        <img 
          src={asset(imgSrc)} 
          alt={imgAlt} 
          className="w-full h-full object-cover rounded-t-xl select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent pb-16 font-sans">
      
      {/* RPG Stats Hub Header */}
      <header className="bg-white/95 backdrop-blur border-b-4 border-slate-350 shadow-xs mb-10 py-5">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left animate-pop-in">
            <h1 className="text-3xl font-black text-slate-800 font-gothic tracking-wide">EL SANTUARIO DE LA GÁRGOLA</h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Choisissez votre salle d'apprentissage RPG</p>
            <button
              onClick={onBackToLanding}
              className="mt-2 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1 font-gothic uppercase tracking-wider"
            >
              ← Retour à l'accueil
            </button>
          </div>

          {/* Stats Box */}
          <div className="flex items-center gap-6 font-extrabold text-sm bg-slate-50 border-3 border-slate-200 p-3.5 rounded-2xl shadow-2xs">
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-gothic">Votre Niveau</span>
              <span className="text-base text-slate-800">Niv. {level}</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-gothic">Combo Quête</span>
              <span className="text-base text-orange-500">🔥 {progress.streak}j</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-gothic">Santé (PV)</span>
              <span className="text-base text-red-500">❤️ {progress.hearts}/5</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chapters Cards Grid */}
      <main className="max-w-4xl mx-auto px-6">

        {/* Salle de Révision : remédiation par cartes d'erreurs */}
        <div className={`mb-10 rounded-2xl border-3 shadow-md overflow-hidden flex flex-col sm:flex-row items-center gap-4 p-5 transition-all ${
          mistakesCount > 0
            ? 'bg-violet-50/90 border-violet-300 hover:shadow-lg'
            : 'bg-white/60 border-slate-200'
        }`}>
          <div className="relative flex-shrink-0">
            {/* Petit deck de cartes empilées */}
            <div className="relative w-16 h-20">
              <div className="absolute inset-0 bg-violet-200 border-2 border-violet-400 rounded-lg rotate-[-8deg]" />
              <div className="absolute inset-0 bg-violet-100 border-2 border-violet-400 rounded-lg rotate-[4deg]" />
              <div className="absolute inset-0 bg-white border-2 border-violet-500 rounded-lg flex items-center justify-center text-3xl">
                🃏
              </div>
            </div>
            {mistakesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 border-2 border-white text-white text-xs font-black rounded-full w-7 h-7 flex items-center justify-center shadow-md animate-pulse">
                {mistakesCount}
              </span>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-black text-slate-800 font-gothic uppercase tracking-wide">
              🏰 Salle de Révision
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {mistakesCount > 0
                ? `${mistakesCount} carte${mistakesCount > 1 ? 's' : ''} d'erreur${mistakesCount > 1 ? 's' : ''} attend${mistakesCount > 1 ? 'ent' : ''} d'être exorcisée${mistakesCount > 1 ? 's' : ''}. Rejouez vos fautes pour les bannir du deck !`
                : "Aucune erreur en attente — le deck est vide. Les questions ratées en quête apparaîtront ici pour être rejouées."}
            </p>
          </div>
          <button
            onClick={onStartReview}
            disabled={mistakesCount === 0}
            className={`btn-3d border-2 font-extrabold uppercase tracking-widest py-2.5 px-6 rounded-xl text-xs font-gothic flex-shrink-0 ${
              mistakesCount > 0
                ? 'bg-violet-500 hover:bg-violet-600 border-violet-600 text-white'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            style={{ ['--btn-shadow' as string]: mistakesCount > 0 ? '#7c3aed' : '#e2e8f0' }}
          >
            {mistakesCount > 0 ? 'Exorciser les erreurs 🕯️' : 'Deck vide'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chapters.map((chapter) => {
            const chProgress = progressMap[chapter.id] || { completed: 0, total: 0 };
            const isCompleted = chProgress.total > 0 && chProgress.completed === chProgress.total;
            const percent = chProgress.total > 0 ? Math.round((chProgress.completed / chProgress.total) * 100) : 0;

            return (
              <div 
                key={chapter.id}
                className="bg-white/80 border-3 border-slate-300 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Dynamic Scene */}
                  {getScene(chapter.id)}

                  {/* Card Info */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 font-gothic leading-tight uppercase group-hover:text-amber-600 transition-colors">
                        {chapter.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                        Étage de Quête
                      </p>
                    </div>

                    {/* Progress details */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
                        <span>Progression</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 border border-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Entry Action Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectChapter(chapter.id)}
                    className="w-full btn-3d bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-extrabold uppercase tracking-widest py-2.5 px-4 rounded-xl text-xs font-gothic flex items-center justify-center gap-2"
                    style={{ ['--btn-shadow' as string]: '#d97706' }}
                  >
                    {isCompleted ? 'Rejouer la salle 🏰' : 'Pénétrer la salle ⚔️'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

    </div>
  );
};
