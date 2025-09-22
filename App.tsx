import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChapterView } from './components/ChapterView';
import { TheoryModal } from './components/TheoryModal';
import { grammarData } from './services/grammarData';
import type { Chapter, Exercise } from './types';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>(grammarData);
  const [currentChapterId, setCurrentChapterId] = useState<string>('orthographe');
  const [isTheoryVisible, setIsTheoryVisible] = useState(false);

  const currentChapter = chapters.find(c => c.id === currentChapterId);

  const handleAddExercise = useCallback((newExercise: Exercise) => {
    setChapters(prevChapters => 
      prevChapters.map(chapter => {
        if (chapter.id === currentChapterId) {
          // Avoid adding duplicates
          if (chapter.exercises.some(ex => ex.id === newExercise.id)) {
            return chapter;
          }
          return {
            ...chapter,
            exercises: [...chapter.exercises, newExercise],
          };
        }
        return chapter;
      })
    );
  }, [currentChapterId]);

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        chapters={chapters} 
        currentChapterId={currentChapterId} 
        onSelectChapter={setCurrentChapterId} 
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8 p-4 bg-background-light rounded-xl border border-slate-200 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                    <LogoIcon className="h-10 w-10" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-secondary-dark">LinguaBoost LEA</h1>
                    <p className="text-secondary">Pratique de la Grammaire Espagnole. Fait par Ignacio Collado Rojas.</p>
                </div>
            </div>
          {currentChapter && (
            <ChapterView 
              key={currentChapter.id}
              chapter={currentChapter} 
              onShowTheory={() => setIsTheoryVisible(true)}
              onAddExercise={handleAddExercise}
            />
          )}
        </div>
      </main>
      {currentChapter && (
        <TheoryModal 
          isOpen={isTheoryVisible} 
          onClose={() => setIsTheoryVisible(false)}
          title={currentChapter.title}
          content={currentChapter.theory}
        />
      )}
    </div>
  );
};

export default App;