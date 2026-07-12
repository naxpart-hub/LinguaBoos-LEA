import React, { useMemo, useState } from 'react';
import { LearningPath } from './components/LearningPath';
import { LessonView } from './components/LessonView';
import { CardBattle } from './components/CardBattle';
import { TheoryView } from './components/TheoryView';
import { ChapterHub } from './components/ChapterHub';
import { LandingPage } from './components/LandingPage';
import {
  buildUnits,
  loadProgress,
  completeNode,
  loseHeart,
  refillHearts,
  recordMistake,
  clearReviewedMistakes,
  buildReviewNode,
  saveProgress,
} from './services/gameLogic';
import type { Unit, LessonNode, GameProgress, LessonQuestion } from './types';

type Screen =
  | { name: 'path' }
  | { name: 'lesson'; unit: Unit; node: LessonNode }
  | { name: 'theory'; unit: Unit; node: LessonNode }
  | { name: 'review'; node: LessonNode };

const App: React.FC = () => {
  const units = useMemo(buildUnits, []);
  const [progress, setProgress] = useState<GameProgress>(loadProgress);
  const [screen, setScreen] = useState<Screen>({ name: 'path' });

  // Routing states
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

  const activeUnit = useMemo(() => {
    if (!activeChapterId) return null;
    return units.find(u => u.id === activeChapterId) || null;
  }, [activeChapterId, units]);

  // Compute progress for each unit/chapter
  const progressMap = useMemo(() => {
    return units.reduce((acc, unit) => {
      const nodesTotal = unit.nodes.length;
      const nodesCompleted = unit.nodes.filter(n => !!progress.completed[n.id]).length;
      acc[unit.id] = {
        completed: nodesCompleted,
        total: nodesTotal
      };
      return acc;
    }, {} as { [unitId: string]: { completed: number, total: number } });
  }, [units, progress]);

  const handleSelectNode = (unit: Unit, node: LessonNode) => {
    if (node.type === 'theory') {
      setScreen({ name: 'theory', unit, node });
    } else {
      setScreen({ name: 'lesson', unit, node });
    }
  };

  const handleCompleteNode = (unit: Unit, node: LessonNode, perfect: boolean) => {
    const { progress: next } = completeNode(progress, node, perfect);
    setProgress(next);
    setScreen({ name: 'path' });
  };

  const handleLoseHeart = (): number => {
    const next = loseHeart(progress);
    setProgress(next);
    return next.hearts;
  };

  // Remédiation : chaque question ratée rejoint le deck de cartes d'erreurs.
  const handleMistake = (question: LessonQuestion) => {
    setProgress(prev => recordMistake(prev, question));
  };

  const handleStartReview = () => {
    const node = buildReviewNode(progress);
    if (node) setScreen({ name: 'review', node });
  };

  // Fin d'une session de révision : les cartes revues quittent le deck (+10 XP).
  const handleCompleteReview = (node: LessonNode) => {
    setProgress(prev => {
      const cleared = clearReviewedMistakes(prev, node.questions);
      const next = { ...cleared, xp: cleared.xp + 10 };
      saveProgress(next);
      return next;
    });
    setScreen({ name: 'path' });
  };

  // Unité fictive portant la salle de révision (pas de chapitre dédié).
  const reviewUnit: Unit | null = useMemo(() => {
    if (units.length === 0) return null;
    return {
      id: 'review',
      title: 'Salle de Révision',
      color: 'purple',
      chapter: units[0].chapter,
      nodes: [],
    };
  }, [units]);

  const openTheoryOf = (unit: Unit) => {
    const theoryNode = unit.nodes.find(n => n.type === 'theory');
    if (theoryNode) setScreen({ name: 'theory', unit, node: theoryNode });
  };

  // 0. Landing Page Route
  if (showLanding) {
    return <LandingPage onEnterGame={() => setShowLanding(false)} />;
  }

  // 0bis. Salle de Révision (remédiation par cartes d'erreurs)
  if (screen.name === 'review' && reviewUnit) {
    return (
      <LessonView
        key={`review-${screen.node.questions.length}`}
        unit={reviewUnit}
        node={screen.node}
        hearts={progress.hearts}
        onLoseHeart={handleLoseHeart}
        onQuit={() => setScreen({ name: 'path' })}
        onComplete={() => handleCompleteReview(screen.node)}
        onReviewTheory={() => setScreen({ name: 'path' })}
        onRefillHearts={() => setProgress(prev => refillHearts(prev))}
      />
    );
  }

  // 1. Hub Route
  if (!activeChapterId || !activeUnit) {
    return (
      <ChapterHub
        chapters={units.map(u => u.chapter)}
        progress={progress}
        onSelectChapter={setActiveChapterId}
        progressMap={progressMap}
        onBackToLanding={() => setShowLanding(true)}
        mistakesCount={(progress.mistakes ?? []).length}
        onStartReview={handleStartReview}
      />
    );
  }

  // 2. Gameplay Routes
  switch (screen.name) {
    case 'theory':
      return (
        <TheoryView
          unit={screen.unit}
          alreadyCompleted={!!progress.completed[screen.node.id]}
          onQuit={() => setScreen({ name: 'path' })}
          onComplete={() => handleCompleteNode(screen.unit, screen.node, true)}
        />
      );
    case 'lesson':
      // Les nœuds « boss » lancent le vrai jeu de cartes RPG (deckbuilder).
      if (screen.node.type === 'boss') {
        return (
          <CardBattle
            key={screen.node.id}
            unit={screen.unit}
            node={screen.node}
            onQuit={() => setScreen({ name: 'path' })}
            onComplete={perfect => handleCompleteNode(screen.unit, screen.node, perfect)}
            onReviewTheory={() => openTheoryOf(screen.unit)}
          />
        );
      }
      return (
        <LessonView
          key={screen.node.id}
          unit={screen.unit}
          node={screen.node}
          hearts={progress.hearts}
          onLoseHeart={handleLoseHeart}
          onQuit={() => setScreen({ name: 'path' })}
          onComplete={perfect => handleCompleteNode(screen.unit, screen.node, perfect)}
          onReviewTheory={() => openTheoryOf(screen.unit)}
          onRefillHearts={() => setProgress(prev => refillHearts(prev))}
          onMistake={handleMistake}
        />
      );
    default:
      return (
        <div className="relative">
          {/* Back to Hub button overlay */}
          <div className="max-w-2xl mx-auto px-4 pt-6">
            <button
              onClick={() => setActiveChapterId(null)}
              className="btn-3d bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-700 font-extrabold uppercase tracking-wide py-2.5 px-5 rounded-xl text-xs font-gothic flex items-center gap-1.5"
              style={{ ['--btn-shadow' as string]: '#cbd5e1' }}
            >
              ← Retour au Hub
            </button>
          </div>
          <LearningPath
            units={[activeUnit]} // pass only active unit to isolate the path
            progress={progress}
            onSelectNode={handleSelectNode}
          />
        </div>
      );
  }
};

export default App;
