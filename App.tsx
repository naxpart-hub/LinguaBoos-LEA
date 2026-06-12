import React, { useMemo, useState } from 'react';
import { LearningPath } from './components/LearningPath';
import { LessonView } from './components/LessonView';
import { TheoryView } from './components/TheoryView';
import {
  buildUnits,
  loadProgress,
  completeNode,
  loseHeart,
} from './services/gameLogic';
import type { Unit, LessonNode, GameProgress } from './types';

type Screen =
  | { name: 'path' }
  | { name: 'lesson'; unit: Unit; node: LessonNode }
  | { name: 'theory'; unit: Unit; node: LessonNode };

const App: React.FC = () => {
  const units = useMemo(buildUnits, []);
  const [progress, setProgress] = useState<GameProgress>(loadProgress);
  const [screen, setScreen] = useState<Screen>({ name: 'path' });

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

  // Renvoie le nombre de cœurs restants pour que la leçon sache si c'est perdu.
  const handleLoseHeart = (): number => {
    const next = loseHeart(progress);
    setProgress(next);
    return next.hearts;
  };

  const openTheoryOf = (unit: Unit) => {
    const theoryNode = unit.nodes.find(n => n.type === 'theory');
    if (theoryNode) setScreen({ name: 'theory', unit, node: theoryNode });
  };

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
        />
      );
    default:
      return (
        <LearningPath
          units={units}
          progress={progress}
          onSelectNode={handleSelectNode}
        />
      );
  }
};

export default App;
